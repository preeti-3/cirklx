import { writeFile } from 'node:fs/promises';
const tabs = await (await fetch('http://127.0.0.1:9223/json')).json();
const socket = new WebSocket(tabs[0].webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, {once:true}));
let id = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) { pending.get(message.id)?.(message.result); pending.delete(message.id); }
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const requestId = ++id; const timer = setTimeout(()=>reject(new Error('Timed out: '+method)),15000); pending.set(requestId, result=>{clearTimeout(timer);resolve(result)}); socket.send(JSON.stringify({id:requestId,method,params})); });
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const evaluate = async expression => (await send('Runtime.evaluate', {expression,returnByValue:true,awaitPromise:true})).result?.value;
await send('Emulation.setDeviceMetricsOverride', {width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate', {url:'http://localhost:3000/'});
await wait(6000);
console.log('hero', await evaluate(`JSON.stringify({nav:document.querySelector('nav').dataset.surface,blur:getComputedStyle(document.querySelector('nav')).backdropFilter, bg:getComputedStyle(document.querySelector('nav')).backgroundColor})`));
const screenshot = async name => { const shot = await send('Page.captureScreenshot'); await writeFile(process.env.TEMP + '/' + name + '.png', Buffer.from(shot.data,'base64')); };
await screenshot('cirklx-fixed-hero');
const button = await evaluate(`(()=>{const r=document.querySelector('a.group[href="/work"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
await send('Input.dispatchMouseEvent',{type:'mouseMoved',...button});await wait(400);
console.log('work hover',await evaluate(`JSON.stringify({background:getComputedStyle(document.querySelector('a.group[href="/work"]')).backgroundColor,iconFilter:getComputedStyle(document.querySelector('a.group[href="/work"] img')).filter})`));
await screenshot('cirklx-fixed-hover');
await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});
await evaluate(`window.scrollTo({top:1000,behavior:'instant'})`); await wait(800);
console.log('process', await evaluate(`JSON.stringify({nav:document.querySelector('nav').dataset.surface,blur:getComputedStyle(document.querySelector('nav')).backdropFilter,bg:getComputedStyle(document.querySelector('nav')).backgroundColor,tops:[...document.querySelectorAll('.process-grid h3')].map(e=>e.getBoundingClientRect().top)})`));
await screenshot('cirklx-fixed-process');
await evaluate(`document.querySelector('#testimonials').scrollIntoView({behavior:'instant'})`); await wait(800);
console.log('slider initial', await evaluate(`JSON.stringify({buttons:[...document.querySelectorAll('#testimonials button')].filter(e=>e.ariaLabel?.includes('testimonial')&&!e.ariaLabel.includes('video')).map(e=>({label:e.ariaLabel,disabled:e.disabled})),width:document.querySelector('#testimonials .rail').clientWidth,card:document.querySelector('#testimonials .rail').firstElementChild.clientWidth})`));
await evaluate(`document.querySelector('[aria-label="Next testimonial"]').click()`); await wait(900);
console.log('slider step',await evaluate(`document.querySelector('#testimonials .rail').scrollLeft`));
for(let i=0;i<4;i++){await evaluate(`document.querySelector('[aria-label="Next testimonial"]').click()`);await wait(700);}
console.log('slider end',await evaluate(`JSON.stringify({left:document.querySelector('#testimonials .rail').scrollLeft,disabled:document.querySelector('[aria-label="Next testimonial"]').disabled})`));
await screenshot('cirklx-fixed-testimonials');
await send('Emulation.setDeviceMetricsOverride',{width:375,height:812,deviceScaleFactor:1,mobile:true});
await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);await wait(800);
console.log('mobile',await evaluate(`JSON.stringify({width:innerWidth,scroll:document.documentElement.scrollWidth,nav:document.querySelector('nav').dataset.surface})`));
await screenshot('cirklx-fixed-mobile');
socket.close();
