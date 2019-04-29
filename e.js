/*history
v1 reverse back
*/
;(function(root){
 'use strict';
 var Element=root.Element||window.Element;
 var fn=root.fn||{}
 fn.effect=(el,o,time)=>{el.classList.add(o);setTimeout(()=>{el.classList.remove(o)},time||0)}
 fn.ef=fn.effect;
 fn.r=(d=>d.parentNode.removeChild(d))
 fn.q=(s,doc=document)=>{return doc.querySelector(s)}
 fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
 fn.ce=(d=>document.createElement(d))
 fn.fra=(()=>document.createDocumentFragment())
 ;
 fn.i3=(d)=>{
  if(typeof d !=='string') return d
  var el=document.createElement('table'); el.innerHTML=d.trim();
  var me=el.childNodes[0]
  el=void 0;
  return me
 } 
 ;
 /**/
 //console.log(Element.prototype)
 var e=Element.prototype
 e.aTo =function(p){p.appendChild(this);return this}
 e.pTo =function(p){p.insertBefore(e.el,p.firstChild); return this}
 e.asTo =function(p){p.parentNode.insertBefore(this,p.nextElementSibling/*nextSibling*/);return this}
 e.psTo =function(p){p.parentNode.insertBefore(this,p);return this}
 e.effect=function(o,t){fn.effect(this,o,t);return this}
 e.remove=function(){return fn.r(this)}
 e.q=function(s){return fn.q(s,this)}
 e.qa=function(s){return fn.qa(s,this)}
 /*same*/
 e.a2=e.aTo; e.p2=e.pTo; e.as2=e.asTo; e.ps2=e.psTo;
 e.ef=e.effect; e.r=e.remove;

 root.fn=fn;
})(this);
