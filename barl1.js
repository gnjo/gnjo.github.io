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
 fn.q=(s,doc=document)=>{return doc.querySelector(s)};
 fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))} 
 ;
 function frame(){
  return `
<div barl="base">
<div barl="top"></div>
<div barl="main"><div barl="left"></div><div barl="right"></div></div>
</div>
`
 }
 function layer(){
  return`<div barl="layer"></div>`
 }
 function entry(myname){
  let o={};
  o.data={};//user stock
  o.sysname='barl';
  o.p=document.body;
  ;[o.sysname,myname].forEach(d=>o.p.classList.add(d))
  o.p.appendChild(fn.i3(frame()))
  o.now=null; 
  ;
  o.b=fn.q('[barl="base"]',o.p)
  o.t=fn.q('[barl="top"]',o.p)
  o.m=fn.q('[barl="main"]',o.p)
  o.l=fn.q('[barl="left"]',o.p)
  o.r=fn.q('[barl="right"]',o.p)
  ;
  o.ctrl=function(ev){
   let ch=ev.keyCode
   if(!(ch===100||ch===102)) return;
   if(!o.now) return;
   o.now.style.display='none';
   o.now.dispatchEvent(Object.assign(new CustomEvent('barl'),{mes:'close'}));
   if(ch===100) o.now =o.now.previousElementSibling||fn.q('[barl="layer"]:last-child',o.r)
   if(ch===102) o.now =o.now.nextElementSibling||fn.q('[barl="layer"]',o.r)
   o.now.style.display=null;
   o.now.dispatchEvent(Object.assign(new CustomEvent('barl'),{mes:'open'}));   
  }
  ;
  o.add=(type,caller)=>{
   //right top left
   let el=fn.i3(layer());  
   if(type==='top') o.t.appendChild(el);
   else if(type==='right') o.r.appendChild(el);
   else if(type==='left') o.l.appendChild(el)
   else el=type;
   caller(el,o);
   fn.qa('[barl="layer"]',o.r).forEach((d,i)=>{
    //bug fix all show is NOT. .right is only one.
    if(i===0) o.now=d;
    else d.style.display='none'
   })
   return o;
  }
  o.p.addEventListener('keydown',o.ctrl,false);  
  return o;
 ;
 }
 root.barl=entry;
})(this);
;
/*
barl('xyz')
 .add(null,init)
 .add('top',drawtop)
 //.add('right',drawlist1)
 //.add('right',drawlist2)
 //.add('right',drawlist3)
;
function init(name,o){
 //console.log(name)
}
function drawtop(el,o){
 el.textContent='tetete'
 //console.log(el,o)
}
function drawlist1(el,o){
 fn.range(20).forEach((d,i)=>{
  fn.i3(`<div>${i}</div>`).a2(el);
 })
}

function drawlist2(el,o){
 fn.range(20).forEach((d,i)=>{
  fn.i3(`<div>xxxxxxxx${i}</div>`).a2(el);
 })
}
function drawlist3(el,o){
 fn.range(20).forEach((d,i)=>{
  fn.i3(`<div>zzzzzz${i}</div>`).a2(el);
 })
}
*/
