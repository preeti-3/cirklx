import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.CHECK_URL || 'http://127.0.0.1:3002';
const tabs = await (await fetch('http://127.0.0.1:9224/json')).json();
const socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const request = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  const timer = setTimeout(() => reject(new Error(`Timeout: ${method}`)), 20000);
  pending.set(requestId, { resolve: value => { clearTimeout(timer); resolve(value); }, reject });
  socket.send(JSON.stringify({ id: requestId, method, params }));
});
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const evaluate = async expression => {
  const response = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
  return response.result?.value;
};
const viewport = async width => {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: width < 1024 });
  await wait(200);
};
const navigate = async route => {
  await send('Page.navigate', { url: base + route });
  for (let i = 0; i < 40; i++) {
    if (await evaluate(`location.pathname === ${JSON.stringify(route)} && document.readyState === 'complete'`)) break;
    await wait(250);
  }
  await evaluate('document.fonts.ready.then(() => true)');
  await wait(350);
};
const screenshot = async name => {
  const { data } = await send('Page.captureScreenshot');
  const path = join(tmpdir(), `cirklx-${name}.png`);
  await writeFile(path, Buffer.from(data, 'base64'));
  console.log('Screenshot:', path);
};

try {
  await viewport(390);
  await navigate('/blog');
  const links = await evaluate(`[...new Set([...document.querySelectorAll('main a[href^="/blog/"]')].map(a => a.getAttribute('href')))]`);
  assert.equal(links.length, 6);
  for (const route of links) {
    assert.equal((await fetch(base + route)).status, 200);
    await navigate(route);
    const content = await evaluate(`({title:document.querySelector('main h1')?.textContent, canonical:document.querySelector('link[rel="canonical"]')?.href, paragraphs:document.querySelectorAll('main article section p').length})`);
    assert.ok(content.title && content.canonical.endsWith(route) && content.paragraphs >= 3);
    for (const width of [360, 390, 850, 1440]) {
      await viewport(width);
      assert.ok(await evaluate(`document.documentElement.scrollWidth <= ${width + 1} && innerWidth <= ${width + 1}`), `${route} overflows at ${width}`);
    }
    console.log('Article:', route, 'metadata, body and responsive widths passed');
  }
  assert.equal((await fetch(base + '/blog/not-an-article')).status, 404);
  await navigate('/blog/the-power-of-branding');
  await screenshot('blog-detail-desktop');
  await viewport(390);
  await screenshot('blog-detail-mobile');
  const images = await evaluate(`Promise.all([...document.querySelectorAll('main img')].map(async img => {img.loading='eager';try {await img.decode();} catch {} return img.naturalWidth > 0}))`);
  assert.ok(images.every(Boolean));
  await send('Browser.grantPermissions', { origin: base, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
  await send('Page.bringToFront');
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  await send('Runtime.evaluate', { expression: `document.querySelector('main button').click()`, userGesture: true });
  await wait(300);
  assert.equal(await evaluate(`document.querySelector('main button').textContent`), 'Link copied');
  assert.equal(await evaluate('navigator.clipboard.readText()'), base + '/blog/the-power-of-branding');

  await navigate('/work');
  await viewport(1440);
  await evaluate(`document.querySelector('.growth-impact').scrollIntoView({block:'center',behavior:'instant'})`);
  assert.equal(await evaluate(`document.querySelector('.growth-particle-rotation').children.length`), 180);
  const before = await evaluate(`getComputedStyle(document.querySelector('.growth-particle-rotation')).transform`);
  await wait(500);
  assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.growth-particle-rotation')).transform`), before);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.growth-particle-rotation')).animationDuration`), '22s');
  await screenshot('original-center-particles');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await wait(100);
  const still = await evaluate(`getComputedStyle(document.querySelector('.growth-particle-rotation')).transform`);
  await wait(200);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.growth-particle-rotation')).transform`), still);
  console.log('PASS: six article routes, invalid-slug 404, mobile/desktop layouts, images, copy link, 180 particles, original 22s timing and reduced motion.');
} finally {
  await send('Browser.resetPermissions');
  await send('Emulation.setFocusEmulationEnabled', { enabled: false });
  await send('Emulation.clearDeviceMetricsOverride');
  await send('Emulation.setEmulatedMedia', { features: [] });
  socket.close();
}
