import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.CHECK_URL || 'http://127.0.0.1:3000';
const tabs = await (await fetch('http://127.0.0.1:9224/json')).json();
const tab = tabs.find(tab => tab.type === 'page');
const socket = new WebSocket(tab.webSocketDebuggerUrl);
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
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ': ' + result.exceptionDetails.exception?.description);
  return result.result?.value;
};
const viewport = async (width, mobile = true) => {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile });
  await send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
  await wait(150);
};
const navigate = async route => {
  await send('Page.navigate', { url: base + route });
  for (let i = 0; i < 50; i++) {
    if (await evaluate(`location.pathname === ${JSON.stringify(route.split('?')[0])} && document.readyState === 'complete' && !!document.querySelector('main h1')`)) break;
    await wait(300);
  }
  await evaluate('document.fonts.ready.then(() => true)');
  await wait(400);
};
const screenshot = async name => {
  const { data } = await send('Page.captureScreenshot');
  const path = join(tmpdir(), `cirklx-${name}.png`);
  await writeFile(path, Buffer.from(data, 'base64'));
  console.log('Screenshot:', path);
};

try {
  for (const route of ['/', '/about', '/service', '/events', '/work', '/blog', '/contact']) {
    await viewport(390);
    await navigate(route);
    for (const width of [360, 390, 850, 1024, 1440]) {
      await viewport(width, width < 1024);
      const bounds = await evaluate(`({width: innerWidth, scroll: document.documentElement.scrollWidth, nav: document.querySelector('header nav').getBoundingClientRect().right})`);
      assert.ok(bounds.scroll <= width + 1 && bounds.width <= width + 1 && bounds.nav <= width, `${route} overflows at ${width}: ${JSON.stringify(bounds)}`);
    }
    console.log('Responsive:', route, '360, 390, 850, 1024, 1440');
  }

  await viewport(390);
  await navigate('/');
  await evaluate(`document.querySelector('header button').click()`);
  await wait(350);
  assert.equal(await evaluate(`document.querySelector('header button').getAttribute('aria-expanded')`), 'true');
  assert.ok(await evaluate(`document.querySelector('#mobile-menu').getBoundingClientRect().right <= innerWidth`));
  await evaluate(`document.querySelector('header button').click()`);

  for (const selector of ['.continuous-track--reels', '.continuous-track--graphics']) {
    const rail = `${JSON.stringify(selector)}`;
    await evaluate(`document.querySelector(${rail}).closest('.touch-slider').scrollIntoView({block:'center', behavior:'instant'})`);
    await wait(250);
    assert.equal(await evaluate(`getComputedStyle(document.querySelector(${rail})).animationName`), 'none');
    const point = await evaluate(`(() => {const r = document.querySelector(${rail}).closest('.touch-slider').getBoundingClientRect(); return {x: 320, y: Math.max(130, Math.min(650, r.top + r.height / 2))}})()`);
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
    for (let step = 1; step <= 8; step++) {
      await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x - step * 28, y: point.y }] });
      await wait(30);
    }
    await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await wait(700);
    const offset = await evaluate(`document.querySelector(${rail}).closest('.touch-slider').scrollLeft`);
    assert.ok(offset > 100, `Swipe did not move ${selector}: ${offset}`);
    console.log('Touch swipe:', selector, offset);
  }
  await screenshot('mobile-graphics');

  await navigate('/service');
  await evaluate(`document.querySelector('.project-tags-stage').scrollIntoView({block:'center', behavior:'instant'})`);
  await wait(2200);
  assert.equal(await evaluate(`document.querySelectorAll('.project-tag').length`), 14);
  assert.ok(await evaluate(`[...document.querySelectorAll('.project-tag')].every(e => Number(getComputedStyle(e).opacity) === 1)`));
  await screenshot('mobile-project-tags');
  await viewport(1440, false);
  await evaluate(`document.querySelector('.project-tags-stage').scrollIntoView({block:'center', behavior:'instant'})`);
  await wait(500);
  await screenshot('desktop-project-tags');

  await navigate('/work');
  await evaluate(`document.querySelector('.growth-impact').scrollIntoView({block:'center', behavior:'instant'})`);
  const neonBefore = await evaluate(`getComputedStyle(document.querySelector('.growth-neon')).strokeDashoffset`);
  await wait(400);
  const neonAfter = await evaluate(`getComputedStyle(document.querySelector('.growth-neon')).strokeDashoffset`);
  assert.notEqual(neonBefore, neonAfter);
  await screenshot('desktop-neon');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await wait(150);
  const reducedBefore = await evaluate(`getComputedStyle(document.querySelector('.growth-neon')).strokeDashoffset`);
  await wait(150);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.growth-neon')).strokeDashoffset`), reducedBefore);
  await send('Emulation.setEmulatedMedia', { features: [] });

  await viewport(390);
  await navigate('/events');
  await evaluate(`document.querySelector('main .section-pad').scrollIntoView({behavior:'instant'})`);
  await wait(600);
  await screenshot('mobile-events');
  assert.ok(await evaluate(`document.querySelector('main img[alt="CirklX Creator Connect"]').naturalWidth > 0`));
  await navigate('/contact?subject=Event%20registration%3A%20CirklX%20Creator%20Connect');
  assert.equal(await evaluate(`document.querySelector('[name="subject"]').value`), 'Event registration: CirklX Creator Connect');
  for (const route of ['/about', '/events', '/blog']) {
    await navigate(route);
    const assets = await evaluate(`Promise.all([...document.querySelectorAll('main img')].map(async img => {
      img.loading = 'eager';
      try { await img.decode(); } catch {}
      const r = img.getBoundingClientRect();
      return {src: img.getAttribute('src'), loaded: img.naturalWidth > 0, width: r.width, height: r.height};
    }))`);
    assert.ok(assets.every(image => image.loaded && image.width > 0 && image.height > 0), `Missing or collapsed images on ${route}: ${JSON.stringify(assets.filter(image => !image.loaded || !image.width || !image.height))}`);
    console.log('Images:', route, assets.length, 'loaded with nonzero geometry');
    if (route === '/about') {
      await evaluate(`document.querySelector('.about-story').scrollIntoView({behavior:'instant'})`);
      await wait(250);
      await screenshot('mobile-about');
    }
    if (route === '/blog') {
      await evaluate(`document.querySelector('main .section-pad').scrollIntoView({behavior:'instant'})`);
      await wait(250);
      await screenshot('mobile-blog');
    }
  }
  console.log('PASS: responsive widths, menu, touch swipes, tags, neon, reduced motion, event image, and registration subject.');
} finally {
  await send('Emulation.clearDeviceMetricsOverride');
  await send('Emulation.setTouchEmulationEnabled', { enabled: false });
  await send('Emulation.setEmulatedMedia', { features: [] });
  socket.close();
}
