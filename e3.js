;(function(root){
/*v0.1 _update()
 v0.2 null read
 v1.0 launched!
 v1.1 delete 
 v1.2 data user define null
 v1.3 treat 
 v1.4 deleteMe
 v1.5 bugfix e.as2 nextElementSibling
*/
var fn=root.fn||{},is=root.is||{};
is.jsonString =function(d){ try{JSON.parse(d);return true}catch(e){return false} } 
;
fn.hashCode =(s)=>{var h=0;for(var i=0;i < s.length; i++) h = h * 31 + s.charCodeAt(i)|0;return h}
fn.mic12 =(s)=>{var d= fn.hashCode('GGGGGG'+s),a =d.toString(16).slice(-6);return a+a}
fn.jpTime=(timestamp=Date.now())=>{
 return new Date(timestamp+1000*60*60*9)
  .toISOString().replace(/-/g,'/').replace('T',' ').slice(0,'YYYY/MM/DD hh:mm'.length)
}
fn.gistinfo=(r)=>{
 let ma =/https:\/\/gist.githubusercontent.com\/(.+)\/(.+)\/raw\/(.+)\/(.+)$/,a=r.match(ma)
 return {url:r,user:a[1],id:a[2],filename:a[4]}  
}
fn.deleteMe=function(el){
let is={}; 
is.element=function(o){return !!(o && o.nodeType === 1)}
;
if(!is.element(el)){
 console.log('delemteMe not element',el)
 return el;
}
el.setAttribute('tabindex','-1') //interactive-able
el.style.outline='none'
el.onkeydown=(e)=>{
 if(e.which===46) e.target.remove();//46 delete
}
return el;
} 
;

var o={
 sysname:'___qgist___',public:false
 ,user:null,data:null,micdesc:null,authstr:null,desc:null,targeturl:null
 ,fn:fn,is:is
}
;
o._update=()=>{
 if(!o.targeturl) return console.log('not targeturl')
 ;
 let url =o.targeturl
 ,opt={method:'GET',mode:'cors',headers:{"Authorization":o.authstr}}
 ,calc=(d)=>{o.data=d;return o.data}
 ;
 return fetch(url,opt).then(d=>d.json()).then(calc)
}
//creation helper
o._createhelper=()=>{
 return JSON.stringify({
  public: o.publicc
  ,description: `${o.micdesc}  ${o.desc}`
  ,files:{[o.sysname]:{content: o.fn.jpTime()}}
 })
}
o._create=()=>{
 let body =o._createhelper()
 ,url="https://api.github.com/gists"
 ,opt={method:'POST',mode:'cors',headers:{"Authorization":o.authstr},body:body}
 ,calc=(d)=>{o.data=d;o.targeturl=d.url;return o.data}
 ;
 return fetch(url,opt).then(d=>d.json()).then(calc)
}
o._searchall=(max=20)=>{return new Promise(sol=>{
 let ary=[],i=1
 ,str =o.authstr
 ,url =`https://api.github.com/users/${o.user.login}/gists`
 ,opt={method:'GET',mode:'cors',headers:{"Authorization":str}}
 ,f=()=>{
  let u=`${url}?page=${i}`
  ,loop =(d)=>{
     if(d.length==0) return sol(ary)
     ;[].push.apply(ary,d);
     if(i>max) return sol(ary)
     i++;
     return f()
  }
  ;
  return fetch(u,opt).then(res=>res.json()).then(loop)
}
;
f()///
;
})} 
o._user=function(){
 let url='https://api.github.com/user'
 ,opt={headers:{'authorization':o.authstr}}
 ,calc=(d)=>{o.user=d; return d}
 ;
 return fetch(url,opt).then(d=>d.json()).then(calc)
}
o._auth=function(){
 let url='https://api.github.com/gists/public'
 ,opt={method:"HEAD",mode:"cors",headers:{"Authorization":o.authstr}}
 ,check=(d=>d.status!=401&&d.ok)
 ,_check=(d=>d.headers.get('X-RateLimit-Limit')!=60)
 ;
 return fetch(url,opt).then(_check).then(o._user)
 ;
}
;/*common*/
o.set=async (desc,authstr)=>{
 o.desc=desc;
 o.micdesc=o.fn.mic12(desc);
 o.authstr=authstr;
 if(!o.desc || !o.authstr){console.log('desc or authstr not');return}
 ;
 let d=await o._auth().then(o._searchall)
 ,a=d.filter(d=>~d.description.indexOf(o.micdesc))
 if(a.length==0) return o._create();///
 o.data=a[0];
 o.targeturl=a[0].url;
 return o._update()///
} 
o.read=(file)=>{
 //file or url
 let url= (o.data.files[file])?o.data.files[file].raw_url:null
 if(!url) return Promise.resolve(null) //bug fix;
 return fetch(url).then(d=>d.text())
}
o.write=(file,data)=>{
 let filename=file
 ,content=data||''
 ,body =JSON.stringify({ files:{ [filename]:{content: content}} })
 ,url=o.targeturl
 ,opt={method:'PATCH',mode:'cors',headers:{"Authorization":o.authstr},body:body}
 ,calc=(d)=>{o.data=d;return o.data}
 ;
 return fetch(url,opt).then(d=>d.json()).then(calc)     
}
o.delete=(file)=>{
 if(!o.data.files[file]) return Promise.resolve(null)
 let filename=file
 ,body =JSON.stringify({ files:{[filename]:null} })
 ,url=o.targeturl
 ,opt={method:'PATCH',mode:'cors',headers:{"Authorization":o.authstr},body:body}
 ,calc=(d)=>{o.data=d;return o.data}
 ;
 return fetch(url,opt).then(d=>d.json()).then(calc)     
} 
;
root.qgist=o;
})(this); 

;(function(root){
var localStorage=this.localStorage||window.localStorage;
var Element=this.Element||window.Element;
 
var is=root.is||{};
is.jsonString =function(d){ try{JSON.parse(d);return true}catch(e){return false} } 
; 
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
//qg.getI=(k)=>{return qgist.read(k).then(d=>{return JSON.parse(d||null) })}
qg.getI=(k)=>{return qgist.read(k).then(d=>{
return is.jsonString(d)?JSON.parse(d||null):d
})}
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
 e.asTo =function(p){p.parentNode.insertBefore(this,p.nextElementSibling/*nextSibling*/);return this}
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

/*
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

*/
})(this);

/*
document.body.setI('aaa','bbbb');
let a=document.body.getI('aaa');
console.log(a)

fn.ce('div').set({textContent:'yyyyy'}).a2(document.body)
*/
