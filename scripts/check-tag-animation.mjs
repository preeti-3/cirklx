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
 await viewport(1440,false);await navigate('/service');
 await evaluate(`document.querySelector('.project-tags-stage').scrollIntoView({block:'center',behavior:'instant'})`);await wait(1700);
 const point=await evaluate(`(()=>{const r=document.querySelector('.project-tag-drag').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
 const before=await evaluate(`document.querySelector('.project-tag').getBoundingClientRect().x`);
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x-30,y:point.y});await wait(400);
 const after=await evaluate(`document.querySelector('.project-tag').getBoundingClientRect().x`);
 assert.ok(after-before>15,'Cursor should repel tag');
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});await wait(650);
 assert.ok(Math.abs(await evaluate(`document.querySelector('.project-tag').getBoundingClientRect().x`)-before)<1,'Tag should spring home');
 console.log('PASS cursor repulsion and return');await screenshot('reference-tags-desktop');
 for(const width of [320,390,768,1440]) {
  await viewport(width,width<768);await evaluate(`document.querySelector('.project-tags-stage').scrollIntoView({block:'center',behavior:'instant'})`);await wait(400);
  assert.ok(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));
  assert.equal(await evaluate(`document.querySelectorAll('.project-tag').length`),14);
  assert.ok(await evaluate(`[...document.querySelectorAll('.project-tag-slot')].every(e=>getComputedStyle(e).opacity==='1')`));
  console.log('PASS layout',width);
  if(width===390)await screenshot('reference-tags-mobile');
 }
 await viewport(390);await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 const p=await evaluate(`(()=>{const r=document.querySelector('.project-tag-drag').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
 const dragBefore=await evaluate(`document.querySelector('.project-tag-drag').getBoundingClientRect().x`);
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});
 for(let i=1;i<=8;i++){await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.x+i*5,y:p.y+i*3}]});await wait(25);}
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(300);
 assert.ok(await evaluate(`document.querySelector('.project-tag-drag').getBoundingClientRect().x`)>dragBefore+25);
 console.log('PASS touch drag with reduced motion');
}finally {await send('Emulation.setEmulatedMedia',{features:[]});socket.close();}
