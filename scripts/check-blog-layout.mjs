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
 await viewport(1440,false);await navigate('/blog/the-power-of-branding');
 for(const width of [320,390,768,1440]) {
  await viewport(width,width<768);
  const g=await evaluate(`(()=>{const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};return {toc:rect('.blog-toc'),heading:rect('.blog-heading'),image:rect('.blog-cover'),author:rect('.blog-byline'),overflow:document.documentElement.scrollWidth>innerWidth}})()`);
  assert.ok(!g.overflow);
  if(width<768){assert.ok(g.toc.y>=g.heading.bottom && g.image.y>=g.toc.bottom);assert.ok(g.image.height>g.image.width);}else{assert.ok(g.toc.x>=g.image.right);assert.ok(g.image.width/g.image.height>2);}
  assert.ok(g.author.y>=g.image.bottom);
  assert.ok(await evaluate(`[...document.querySelectorAll('.blog-toc a')].every(a=>document.querySelector(a.getAttribute('href'))?.tagName==='SECTION')`));
  if(width===390 || width===1440)await screenshot('blog-figma-'+width);
  console.log('PASS blog layout',width);
 }
 await evaluate(`document.querySelector('.blog-toc a').click()`);await wait(700);
 assert.equal(await evaluate('location.hash'),'#article-section-1');
 assert.ok(await evaluate(`document.querySelector('#article-section-1').getBoundingClientRect().top>=120`));
 console.log('PASS table of contents navigation');
}finally{socket.close();}
