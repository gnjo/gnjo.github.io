/*
v04:riot auto join
v03:_.debounce minify, ls minify
v02:autosave, key check
v01:first move
base: https://qiita.com/HadaGunjyo/items/2add1ef8e32323851b16
usage:
sys.load('riotsystest'); //if not key. disable the ls
sys.trigger('join',me)
*/
;(function(root){
  /*original by underscore.js*/
var de=(function(root){var _={};_.now=Date.now||function(){return new Date().getTime()};_.debounce=function(func,wait,immediate){var timeout,args,context,timestamp,result;var later=function(){var last=_.now()-timestamp;if(last<wait&&last>=0){timeout=setTimeout(later,wait-last)}else{timeout=null;if(!immediate){result=func.apply(context,args);if(!timeout)context=args=null}}};return function(){context=this;args=arguments;timestamp=_.now();var callNow=immediate&&!timeout;if(!timeout)timeout=setTimeout(later,wait);if(callNow){result=func.apply(context,args);context=args=null}
return result}};return _.debounce})(this);//de 
 /*ls*/
var ls=(function(root){var ls={};if(localStorage){ls.setI=(k,v)=>{return localStorage.setItem(k,JSON.stringify(v))}
ls.getI=(k)=>{return JSON.parse(localStorage.getItem(k)||null)}
ls.delI=(k)=>{return localStorage.removeItem(k)}
ls.keys=()=>{return Object.keys(localStorage)}}
return ls})(this);//ls
 var is={}
 is.object = function(obj){var type = typeof obj;return type === 'function' || type === 'object' && !!obj}
 ;
 var sys= riot.observable();
 sys.data={};
 sys.time=700;
 sys.key=null;//'systemxyz'
 sys.autosave=true;
 sys.save=()=>{if(!sys.key)return; ls.setI(sys.key,sys.data); sys.trigger('saved')}
 sys.savede=de(sys.save,sys.time)
 sys.load=(key)=>{if(!key)return; sys.key=key; sys.data=ls.getI(sys.key)||{}; sys.trigger('loaded') }
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
;riot.mixin({init:function(){ if(sys)sys.trigger('join',this) }});//auto join

