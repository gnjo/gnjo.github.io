;(function(root){
if(localStorage){
var ls={};
ls.setI=(k,v)=>{return localStorage.setItem(k,JSON.stringify(v))}
ls.getI=(k)=>{return JSON.parse(localStorage.getItem(k)||null)}
ls.delI=(k)=>{return localStorage.removeItem(k)}
ls.keys=()=>{return Object.keys(localStorage)}
root.ls=ls;
} 
if(Element){
var e=Element.prototype;
e.setI=function(k,v){return this.setAttribute(k,JSON.stringify(v))}
e.getI=function(k){return JSON.parse(this.getAttribute(k)||null)}
e.delI=function(k){return this.removeAttribute(k)}
e.keys=function(flg){
 let ary=[];
 for(const d in this){if(this[d]) ary.push(d)}
 return (flg)?ary:ary.filter(d=>this.hasAttribute(d))
}
}
if(root.qgist){
 //https://gnjo.github.io/qgist.js 
var qg=qgist;
qg.auth=qgist.set;
qg.setI=(k,v)=>{return qgist.write(k,JSON.stringify(v))}
qg.getI=(k)=>{return qgist.read(k).then(d=>{return JSON.parse(d||null) })}
qg.delI=(k)=>{if(k)return qgist.delete(k)}
qg.keys=()=>{return Object.keys(qgist.data.files)}
root.qg=qg;
}
})(this);

;(function(root){
 this.is=this.is||{},this.fn=this.fn||{}
 is.element = function(obj){return !!(obj && obj.nodeType === 1)}
 is.prop =function(o,p){for(const a in o){if(p === a) return true};return false};
 is.attr=function(o,a){return is.element(o)?o.hasAttribute(a):false}
 is.query =function(obj){return !( /^</.test(obj.trim()) )}
 is.documentFragment=function(obj){return obj.toString() ==='[object DocumentFragment]' } /*if target document fragment*/
 ;
 fn.range=(l=0)=>{return Array.from({length:l})}
 fn.i3=(d)=>{
  if(typeof d !=='string') return d
  var el=document.createElement('table'); el.innerHTML=d.trim();
  return el.childNodes[0];
 }
 fn.effect=(el,o,time)=>{
  let p =(d)=>{return isNaN( parseFloat(d))? 0 : parseFloat(d)*1000 }
  if(!time) return Object.keys(o).forEach((k)=>{el.classList.add(k);setTimeout(()=>{ el.classList.remove(k) }, p(o[k]) ) })
  el.classList.add(o);setTimeout(()=>{el.classList.remove(o)},p(time));
 }
 fn.ef=fn.effect;
 fn.r=(d=>d.parentNode.removeChild(d))
 fn.q=(s,doc=document)=>{return doc.querySelector(s)};
 fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
 fn.ce=(d=>document.createElement(d))
 ;
 /**/
  var e=Element.prototype
  e.aTo =function(p){p.appendChild(this);return this}
  e.pTo =function(p){p.insertBefore(e.el,p.firstChild); return this}
  e.asTo =function(p){p.parentNode.insertBefore(this,p.nextSibling);return this}
  e.psTo =function(p){p.parentNode.insertBefore(this,p);return this}
  e.effect=function(o,t){fn.effect(this,o,t);return this}
  e.remove=function(){return fn.r(this)}
  e.q=function(s){return fn.q(s,this)}
  e.qa=function(s){return fn.qa(s,this)}
  /*if set return the el*/
  e.set=function(obj){
   let dmy =document.createElement('table')
   Object.keys(obj).map(key=>{
    if(key==='class')return obj[key].split(' ').filter(d=>d).map(d=>this.classList.add(d))
    if(key==='css'||key==='cssText'/*special*/) return this.style.cssText=obj[key]
    return (is.prop(dmy,key)||key==='value')?this[key]=obj[key]:this.setAttribute(key,obj[key])
   })
   return this;
  }
  e.get=function(obj){
   let el=this
   if(obj==='value') return el[obj] //bug fix value
   if(obj) return is.prop(el,obj)? el[obj]: el.getAttribute(obj)
   ;
   let da={};
     for(const a in el){
      if(is.attr(el,a)) da[a] =el.getAttribute(a); 
      else if(a==='value') da[a] =el[a];//bug fix value
     }
     return da;
  } 
  /*same*/
  e.a2=e.aTo; e.p2=e.pTo; e.as2=e.asTo; e.psTo=e.ps2;
  e.ef=e.effect; e.r=e.remove;
 if(window){
  //helper set; ctrl+f
  fn.ce('style').set({textContent:'.none{display:none}'}).a2(document.body);
  let css='position:fixed;top:0;right:0;width:22rem;color:#eee;background:rgba(0,0,0,0.5);font-family:monospace;padding:0.4rem'
  ,qg=root.qg
  ,helptext='element: '+Object.keys(e).filter(d=>d.length<5).join(',')+'\n'
  +'is: '+Object.keys(is).join(',')+'\n'
  +'fn: '+Object.keys(fn).join(',')+'\n'
  +'ls: '+Object.keys(ls).join(',')+'\n'
  ;
  if(qg) helptext+='qg: '+Object.keys(qg).join(',')+'\n'
  ;
  fn.ce('div').set({id:'debuging',contenteditable:'plaintext-only',css:css,textContent:helptext,class:'none'}).a2(document.body)  
  document.body.addEventListener('keydown',function(ev){
   if(!(ev.altKey))return;
   fn.q('#debuging').classList.toggle('none');
  },false);
 }
})(this);



/*
document.body.setI('aaa','bbbb');
let a=document.body.getI('aaa');
console.log(a)

fn.ce('div').set({textContent:'yyyyy'}).a2(document.body)
*/
