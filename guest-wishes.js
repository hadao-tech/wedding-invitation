(()=>{
 const host=document.querySelector('#wishes');if(!host)return;
 host.hidden=false;host.replaceChildren();host.className='shared-wishes';
 const title=document.createElement('h3');title.textContent='Lời chúc yêu thương';
 const note=document.createElement('p');note.setAttribute('role','status');note.textContent='Đang đón những lời chúc…';
 const card=document.createElement('article');card.className='shared-wish-card';card.tabIndex=0;
 const name=document.createElement('strong'),message=document.createElement('p');card.append(name,message);card.hidden=true;
 const controls=document.createElement('div');controls.className='wish-controls';
 const button=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;return b};
 let wishes=[],index=0,paused=false,timer,request=null,frame,timeout,script,callback;
 const counter=document.createElement('span');
 function show(i){if(!wishes.length)return;index=(i+wishes.length)%wishes.length;name.textContent=wishes[index].name;message.textContent=wishes[index].message;counter.textContent=`${index+1} / ${wishes.length}`;card.hidden=false;card.classList.remove('wish-enter');void card.offsetWidth;card.classList.add('wish-enter')}
 function schedule(){clearInterval(timer);if(!paused&&!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>{if(!document.hidden&&!floating.matches(':hover')&&!floating.contains(document.activeElement)&&wishes.length>1)show(index+1)},7000)}
 const prev=button('‹',()=>{show(index-1);schedule()}),next=button('›',()=>{show(index+1);schedule()});prev.setAttribute('aria-label','Lời chúc trước');next.setAttribute('aria-label','Lời chúc tiếp theo');
 const pause=button('Tạm dừng',()=>{paused=!paused;pause.textContent=paused?'Tự chuyển':'Tạm dừng';pause.setAttribute('aria-pressed',String(paused));schedule()});pause.setAttribute('aria-pressed','false');
 controls.append(prev,counter,next,pause);controls.hidden=true;
 const details=document.createElement('details'),summary=document.createElement('summary'),list=document.createElement('div');summary.textContent='Đọc tất cả lời chúc';details.append(summary,list);details.hidden=true;
 let rendered=0;const more=button('Xem thêm lời chúc',renderMore);
 function renderMore(){more.remove();wishes.slice(rendered,rendered+30).forEach(w=>{const a=document.createElement('article'),n=document.createElement('strong'),m=document.createElement('p');n.textContent=w.name;m.textContent=w.message;a.append(n,m);list.append(a)});rendered=Math.min(rendered+30,wishes.length);if(rendered<wishes.length)list.append(more)}
 details.addEventListener('toggle',()=>{if(details.open&&!rendered)renderMore()});
 const retry=button('Thử lại',load);retry.hidden=true;host.append(title,note,details,retry);
 const floating=document.createElement('aside');floating.className='floating-wishes';floating.setAttribute('aria-label','Lời chúc gửi Đại và Hà');floating.hidden=true;
 const close=button('×',()=>{floating.hidden=true;userHidden=true;reopen.hidden=false;paused=true;schedule()});close.className='wish-float-close';close.setAttribute('aria-label','Ẩn lời chúc');
 const reopen=button('♡ Lời chúc',()=>{floating.hidden=false;userHidden=false;reopen.hidden=true;paused=false;pause.textContent='Tạm dừng';pause.setAttribute('aria-pressed','false');schedule()});reopen.className='wish-reopen';reopen.hidden=true;
 floating.append(close,card,controls);document.body.append(floating,reopen);
 let received=false,userHidden=false;

 function cleanup(){clearTimeout(timeout);frame?.remove();script?.remove();if(callback)delete window[callback];frame=null;script=null;callback=null;request=null}
 function fail(){cleanup();note.textContent=wishes.length?'Chưa cập nhật được lời chúc mới.':'Chưa tải được lời chúc. Nếu vừa cập nhật thiệp, chủ thiệp cần triển khai phiên bản Apps Script mới.';retry.hidden=false}
 function load(){
  if(request)return;
  const endpoint=window.DAIHA_GUEST_CONFIG?.endpoint||'';
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(endpoint)){fail();return}
  retry.hidden=true;note.textContent='Đang tải lời chúc…';
  request=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
  callback='daihaWishes_'+request.replace(/[^a-zA-Z0-9_]/g,'');
  window[callback]=receive;
  script=document.createElement('script');script.src=endpoint+'?action=wishes&requestId='+encodeURIComponent(request)+'&callback='+callback;
  let fallbackStarted=false;
  function fallback(){if(!request||fallbackStarted)return;fallbackStarted=true;clearTimeout(timeout);frame=document.createElement('iframe');frame.hidden=true;frame.title='Tải lời chúc';frame.src=endpoint+'?action=wishes&requestId='+encodeURIComponent(request);timeout=setTimeout(fail,20000);document.body.append(frame)}
  script.onerror=fallback;timeout=setTimeout(fallback,8000);document.body.append(script);
 }
 window.addEventListener('message',e=>{
  if(!/^https:\/\/(?:script\.google\.com|[a-z0-9-]+\.googleusercontent\.com)$/.test(e.origin))return;
  receive(e.data);
 });
 function receive(d){
  if(!request||!d||d.type!=='daiha-wishes'||d.requestId!==request)return;
  if(!d.ok||!Array.isArray(d.wishes)){fail();return}cleanup();
  const oldCurrent=wishes[index];wishes=d.wishes.filter(w=>w&&typeof w.name==='string'&&typeof w.message==='string'&&w.message.trim()).map(w=>({name:w.name.slice(0,80),message:w.message.slice(0,1000)}));
  note.textContent=wishes.length?`${wishes.length} lời chúc gửi đến Đại & Hà`:'Hãy là người đầu tiên gửi lời chúc đến Đại & Hà!';
  card.hidden=controls.hidden=details.hidden=!wishes.length;list.replaceChildren();rendered=0;if(details.open)renderMore();if(wishes.length&&!userHidden){floating.hidden=false;received=true}if(!wishes.length){floating.hidden=true;reopen.hidden=true}const keep=oldCurrent?wishes.findIndex(w=>w.name===oldCurrent.name&&w.message===oldCurrent.message):-1;show(keep>=0?keep:0);schedule();
 }
 window.addEventListener('daiha-wish-sent',()=>{cleanup();load()});
 setInterval(()=>{if(!document.hidden)load()},60000);load();
})();
