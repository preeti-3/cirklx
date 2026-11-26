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
  for (const width of [320, 390, 640, 768, 1024, 1440]) {
    await viewport(width, width < 768);
    await navigate('/service');
    const heights = await evaluate(`[...document.querySelectorAll('.service-pillar-grid .process-image')].map(e => e.getBoundingClientRect().height)`);
    assert.ok(Math.max(...heights) - Math.min(...heights) < 1, 'Service images must be equal height');
    await evaluate(`document.querySelector('.project-tags-stage').scrollIntoView({block:'center',behavior:'instant'})`);
    await wait(500);
    assert.ok(await evaluate(`[...document.querySelectorAll('.project-tag')].every(e=>getComputedStyle(e).opacity==='1')`));
    assert.ok(await evaluate(`document.documentElement.scrollWidth <= innerWidth`));
    if(width===390 || width===1440) {
      const point = await evaluate(`(()=>{const r=[...document.querySelectorAll('.project-tag')].find(e=>e.textContent==='Website Design').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
      await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
      await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
      for(let i=1;i<=8;i++) {await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x+i*(width<768?-6:6),y:point.y-4*i,button:'left',buttons:1});await wait(20);}
      await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x+(width<768?-48:48),y:point.y-32,button:'left',clickCount:1});
      await wait(250);
      const moved=await evaluate(`(()=>{const r=[...document.querySelectorAll('.project-tag')].find(e=>e.textContent==='Website Design').getBoundingClientRect();return r.x+r.width/2})()`);
      assert.ok(Math.abs(moved-point.x)>15,'Tag should stay at its dragged position');
      await screenshot('tags-'+width);
    }
    await navigate('/'); await wait(2000);
    if(width<768) {
      const cards=await evaluate(`[...document.querySelectorAll('.graphics-slider .graphic-card')].slice(0,2).map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right}})`);
      assert.ok(cards[0].left>=0 && cards[1].right<=width,'Two graphics cards should fit');
      await evaluate(`document.querySelector('#testimonials').scrollIntoView({behavior:'instant'})`);
      await wait(300);
      assert.ok(await evaluate(`document.querySelector('.testimonial-rail').scrollLeft > 100`),'Start on video');
      if(width===390) await screenshot('testimonial-video-390');
      const before=await evaluate(`document.querySelector('.testimonial-rail').scrollLeft`);
      await evaluate(`document.querySelector('[aria-label="Next testimonial"]').click()`);
      await wait(700);
      assert.ok(await evaluate(`document.querySelector('.testimonial-rail').scrollLeft`)>before,'Next testimonial advances');
      if(width===390) {
        await screenshot('testimonials-390');
        await evaluate(`document.querySelector('.graphics-slider').scrollIntoView({block:'center',behavior:'instant'})`);await screenshot('graphics-390');
        await evaluate(`document.querySelector('.footer-grid').scrollIntoView({block:'center',behavior:'instant'})`);await screenshot('footer-390');
      }
    }
    assert.ok(await evaluate(`document.documentElement.scrollWidth <= innerWidth`),'Page must not overflow');
    console.log('PASS width',width);
  }
} finally { socket.close(); }



