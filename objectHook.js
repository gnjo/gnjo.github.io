;(function(root){
 'use strict'
 ;
 function entry(obj,caller){
  var is={}
  is.function = function(obj){return toString.call(obj) === '[object Function]'}
  ;
  var o =obj,keys=Object.keys(o.__proto__).concat(Object.keys(o)).filter(d=>is.function(o[d]))
  console.log('hook object=>',o);console.log('hook functions=>',keys)
  ;
  keys.map(key=>{
   var dump= o[key]
   o[key]=function(){
    var args=Array.from(arguments)
    caller.apply(o,[key].concat(args))
    return dump.apply(o,args)
   }
  })
 }
 ;
 root.objectHook=entry
 ;
 /*usage
var obj=localStorage//console
objectHook(obj,function(){
 var type=arguments[0]
 var args=Array.from(arguments).slice(1)
 let x=document.createElement('pre');
 x.textContent=type+':'+JSON.stringify(args,null,'\t');
 document.body.appendChild(x)
 //
})
localStorage.setItem('xyz','bbbb')
 */
})(this);
