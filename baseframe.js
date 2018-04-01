/*v1.1 addeventlistner fn.i */
;(function(root){
 let fn={},is={};
 fn.i3=function(html){
  if(typeof html !=='string') return html
  var el=document.createElement('table'); el.innerHTML=html.trim();
  return el.childNodes[0];
 } 
 fn.i=fn.i3;
 fn.ce=(d=>document.createElement(d))
 is.element=function(o){return !!(o && o.nodeType === 1)} 

 function resizer(l,g,r) {
  var left = is.element(l)? l: document.querySelector(l)
  ,right =is.element(r)? r: document.querySelector(r)
  ,handler = is.element(g)? g:document.querySelector(g)
  ,hammer = new Hammer(handler, {recognizers: [
   [Hammer.Pan, { threshold: 0}]
  ]})
  ,hw =handler.clientWidth
  ,startWidth,startWidth2
  ;
  handler.onmousedown= (e)=>{e.preventDefault()};
  hammer.on('panstart', function(e) {
   startWidth = left.clientWidth;
   startWidth2 =right.clientWidth;
  });
  hammer.on('panmove', function(e) {
   left.style.width = (startWidth + e.deltaX) + 'px';
   right.style.width = (startWidth2 - e.deltaX) +'px'
  })    
 }

 function dialogcss(){
  return ``;
 }
 function dialogctrl(){
  let count =10000,search='modal',add='show'
  ,p=document.body,dialog=document.getElementsByClassName(search)
  ,caller=function(ev){
   if(ev.target === p && ev.ctrlKey){
    if(dialog.length===0) return;
    if(ev.keyCode ===37) next(-1);
    else if(ev.keyCode ===39) next(1);
   }
  }
  function next(flg=1){
   let a =[].slice.call(dialog);a.unshift(null),len=a.length;
   if( a[count%len]) a[count%len].classList.remove('show');  
   count += flg;
   if(count ==0) count =10000;
   if( a[count%len]) a[count%len].classList.add('show');
  }
  p.addEventListener('keydown',caller,false)    
 }

 function css(){
  return ``
 }
 function entry(target){
  let o={};
  o.src='https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js';
  o.t = is.element(target)? target : document.querySelector(target);
  o.css=css() +';'+ dialogcss(); 
  o.c =fn.ce('style'); o.c.innerHTML=o.css;
  o.s =fn.ce('script');
  o.f =fn.ce('div'); o.f.classList.add('frame')
  o.l =fn.ce('div'); o.l.classList.add('left')    
  o.r =fn.ce('div'); o.r.classList.add('right')
  o.g =fn.ce('div'); o.g.classList.add('gutter')
  ;let h =document.querySelector('head');
  ;[o.c].forEach(d=>h.appendChild(d))
  ;[o.s,o.l,o.g,o.r].forEach(d=>o.f.appendChild(d));
  o.s.onload =function(ev){resizer('.left','.gutter','.right')}
  o.s.src=o.src;
  o.t.appendChild(o.f);
  o.t.classList.add('baseframe')
  dialogctrl();
  o.add =(pos='left',element)=>{
   let my =is.element(element)? element : fn.i(element);
   if(pos ==='left'){
    o.l.appendChild(my);return my;
   }
   else{
    let el =fn.ce('dialog');el.classList.add('modal');
    el.appendChild(my);
    o.r.appendChild(el);return el;
   }
  }
  o.addToRight=(element)=>{return o.add('right',element)}
  o.addToLeft=(element)=>{return o.add('left',element)}
  return o;
 }
 root.baseframe=entry;
 root.sys =root.sys||{}
 /*usage
 //<link rel="stylesheet" href="https://gnjo.github.io/baseframe.css"> 
let b=baseframe(document.body);
b.add('right','<div>this is 1. border drag is size change.</div>')
b.add('right',`<div>dialog have the padding and border. so that...<br> dialog.modal{
  padding:0;
  border:0;
}    
</div>`)
b.add('right','<div>this is 3</div>')
b.add('left','<div>ctrl <-- --> is right control</div>')  
*/
})(this);
