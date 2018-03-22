/*
let a=autoWorker('edict','url');
if(a.edict) ...
*/
(function(root){
 var fn={}
 fn.worker=(src)=>{
  //inner.js or text or element
  let is={},f=(d=>URL.createObjectURL(new Blob( [d], {type:"text\/javascript"} )));
  is.element=function(o){return !!(o && o.nodeType === 1)};
  is.url=(d=>!/\n|;/.test(d));
  return new Worker( is.element(src)?f(src.textContent):is.url(src)?src:f(src) );
 }
 ;
 let addstr=function(name){return `
;let is=this.is||{};
is.has = function(obj, key) {return obj != null && hasOwnProperty.call(obj, key)};
is.function = function(obj){return toString.call(obj) === '[object Function]'}
let obj=${name},objkeys=Object.keys(obj).map(d=>{
return is.function(obj[d])?{name:d,type:'function'}:{name:d,type:'value'}
})
//special
postMessage(['___special___',objkeys]);
//
;onmessage =function(e){
let key=e.data[0],args=e.data.slice(1),f=(d)=>{return JSON.parse(JSON.stringify(d))}
Promise.resolve().then(()=>{
if(!is.has(obj,key)) return   
if(is.function(obj[key])) return obj[key].apply(obj,args)
return obj[key]=args[0];
}).then(ret=>{postMessage([key,f(ret)]) });
}
`;  
                          }

 function entry(name,str){
  let o={}
  o[name] =null;
  o.___addstr___  =addstr(name); 
  o.___worker___  = fn.worker(str+';'+o.___addstr___)
  o.___worker___.onmessage =function(e){
   let key=e.data[0]
   let ret=e.data.slice(1);
   if(key==='___special___'){
    let fns = ret[0].filter(d=>d.type==='function').map(d=>d.name);
    let vls = ret[0].filter(d=>d.type==='value').map(d=>d.name);
    o[name]=new Proxy({},{set:(obj,prop,value)=>{
     if(vls.includes(prop)) o.___worker___.postMessage([].concat(prop,value));
     obj[prop] = value;
    }})
    ;
    fns.forEach(k=>{
     o[name][k] = function(){
      let arg=[].slice.call(arguments);
      return new Promise(sol=>{ o.___worker___.postMessage([].concat(k,arg)); o[name]['___'+k+'___'] =sol;})
     }
    })
   }
   if(o[name]['___'+key+'___']) o[name]['___'+key+'___'](ret[0]);
  }
  o.___worker___.onerror =function(e){
   console.log(e)
  }
  return o;
 }
 ;
 root.autoWorker = entry
})(this);
