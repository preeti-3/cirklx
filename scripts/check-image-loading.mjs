import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.CHECK_URL || 'http://localhost:3001';
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
 await viewport(1440,false);await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 await navigate('/');await wait(1000);
 const hero=await evaluate(`Promise.all([...document.querySelectorAll('.hero-orbit img')].map(async img=>{await img.decode();return {src:img.getAttribute('src'),loading:img.loading,loaded:img.naturalWidth>0}}))`);
 assert.ok(hero.every(i=>i.loaded && i.loading !== 'lazy'));console.log('PASS hero icons: eager and loaded',hero.length);
 assert.ok(await evaluate(`[...document.querySelectorAll('video')].filter(v=>!v.autoplay).every(v=>v.preload==='none')`));
 const media=await evaluate(`performance.getEntriesByType('resource').filter(r=>r.name.includes('.mp4')).map(r=>r.name)`);console.log('Initial video requests',media);assert.ok(media.every(url=>url.endsWith('/video-opt.mp4')));
 await screenshot('hero-loading');
 await evaluate(`document.querySelector('.home-reels').scrollIntoView({block:'center',behavior:'instant'})`);await wait(300);
 await evaluate(`document.querySelector('[aria-label="Play featured reel"]').click()`);await wait(1000);
 assert.ok(await evaluate(`[...document.querySelectorAll('video')].some(v=>!v.autoplay && !v.paused)`));console.log('PASS deferred video starts on play');
 await navigate('/service');
 const images=await evaluate(`Promise.all([...document.querySelectorAll('.service-pillar-grid img')].map(async img=>{img.loading='eager';await img.decode();return img.naturalWidth>0 && img.getAttribute('src').includes('.webp')}))`);
 assert.ok(images.every(Boolean));console.log('PASS service WebP images loaded');
} finally {await send('Network.setCacheDisabled',{cacheDisabled:false});socket.close();}
