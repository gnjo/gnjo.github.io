/*usage: sys.trigger('join',me)*/
;(function(root){
 var de=(function(root){
  var _={}; 
  /*original by underscore.js*/
  //line 1457
  _.now = Date.now || function() {
   return new Date().getTime();
  };
  //line 883
  _.debounce = function(func, wait, immediate) {
   var timeout, args, context, timestamp, result;

   var later = function() {
    var last = _.now() - timestamp;

    if (last < wait && last >= 0) {
     timeout = setTimeout(later, wait - last);
    } else {
     timeout = null;
     if (!immediate) {
      result = func.apply(context, args);
      if (!timeout) context = args = null;
     }
    }
   };

   return function() {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
     result = func.apply(context, args);
     context = args = null;
    }

    return result;
   };
  };
  //root._ =_;
  return _.debounce
 })(this)
 ;//de
 var ls=(function(root){
  var ls={};
  if(localStorage){
   //var ls={};
   ls.setI=(k,v)=>{return localStorage.setItem(k,JSON.stringify(v))}
   ls.getI=(k)=>{return JSON.parse(localStorage.getItem(k)||null)}
   ls.delI=(k)=>{return localStorage.removeItem(k)}
   ls.keys=()=>{return Object.keys(localStorage)}
   //root.ls=ls;
   //return ls
  }
  return ls;
 })(this)
 ;//ls
 var is={}
 is.object = function(obj){var type = typeof obj;return type === 'function' || type === 'object' && !!obj}
 ;
 var sys= riot.observable();
 sys.data={};
 sys.time=700;
 sys.key='systemxyz'
 sys.autosave=true;
 sys.save=()=>{ ls.setI(sys.key,sys.data); sys.trigger('saved')}
 sys.savede=de(sys.save,sys.time)
 sys.load=()=>{ sys.data=ls.getI(sys.key)||{}; sys.trigger('loaded') }
 sys.on('load',function(){ sys.load()})
 sys.on('save',function(){ sys.save()})
 sys.on('savede',function(){ /*console.log('in savede');*/ if(sys.autosave) sys.savede() })
 let cs=[],share=()=>{ cs.filter(d=>d).map(d=>d.trigger('changed',sys.data))}
 ,init =(d)=>{d.on('change',(o)=>{ Object.assign(sys.data,o);/**/sys.trigger('savede');/**/ share() })}
 ;
 sys.on('join',(me)=>{ cs.push(me); init(me); share(); })
 /*usage: sys.trigger('join',me)*/
 
 root.sys=sys;
 
})(this);
/*base
;(function(root){
var sys=new function(){
 riot.observable(this); 
 let self=this,cs=[],share=()=>{ cs.filter(d=>d).map(d=>d.trigger('changed',self.store))}
 //cs.filter mean fall the child.
 ,init =(d)=>{d.on('change',(o)=>{ Object.assign(self.store,o); share() })} 
 self.store={}
 self.on('join',(me)=>{ cs.push(me); init(me); share(); })
}
})(this);
*/
