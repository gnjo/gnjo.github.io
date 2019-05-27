/*history
v1.0 trim()
v1.1 comment-able //
*/
;(function(root){
 'use strict';
 function rkana(l=8){
  var c = "bcdfghjklmnpqrstvwxyz",cl=c.length,b ="aiueo",bl=b.length,r=""
  ,mf=Math.floor,mr=Math.random
  ;for(var i=0;i<l;i++) r+=(i%2)? b[mf(mr()*bl)]:c[mf(mr()*cl)].toUpperCase();
  return r;
 }
 function profile(target){
  let data=target.textContent.split('\n').filter(d=>d)
   .filter(d=>!/^\/\//.test(d)) //v1.1
  ;
  let rejs=/js\((.*)\)/
  ,recss=/css\((.*)\)/
  ,f=s=>s.replace(/'|"/g,'').trim()  
  ;
  return data.map(d=>{
   let s=d,t=void 0,calced=false
   //test wrap
   if(rejs.test(s)&&calced===false){
    s=f( s.match(rejs)[1] )
    t='js'
    calced=true
   }
   if(recss.test(s)&&calced===false){
    s=f( s.match(recss)[1] )
    t='css'
    calced=true
   }
   if(~s.split('/').pop().indexOf('js')&&calced===false){
    s=f( s )
    t='js'
    calced=true
   }
   if(~s.split('/').pop().indexOf('css')&&calced===false){
    s=f( s )
    t='css'
    calced=true
   }
   return {s:s,t:t,calced:calced}
  }).filter(d=>d.calced)
 }
 function chunk(s){
  return (~s.indexOf('?'))?`&___chunk__=${rkana()}`:`?___chunk__=${rkana()}`
 }
 let pr=(s,type)=>new Promise(sol=>{
  if(type==='js'){
   let js=document.createElement('script')
   js.onload=sol;
   document.body.appendChild(js) 
   js.src=s
  }else{
   let css=document.createElement('link')
   css.onload=sol;
   document.head.appendChild(css)
   css.rel='stylesheet'
   css.href=s 
  }
 })
 let sleep=t=>new Promise(d=> setTimeout(d,t));
 function entry(opt){
  let o={
   auto:true
   ,target:document.querySelector('script[data-loader]')
   ,sleep:0
   ,chunk:true
   ,onStart:(ret)=>{/**/}
   ,onEnd:(ret)=>{/**/}
   ,onLoading:(ret)=>{/**/}
   ,done:(ret)=>{/**/}
  }
  //done 
  o.done=()=>{
   let ary=profile(o.target)
   o.onStart({type:'onStart',ary:ary,now:0,nowsrc:'',nowobj:void 0})
   ;(async (theAry)=>{
    for(let i=0;i<ary.length;i++){
     let s=ary[i].s,t=ary[i].t
     o.onLoading({type:'onLoading',ary:theAry,now:i,nowsrc:s,nowobj:ary[i]})
     ;
     let cnk=(o.chunk)?chunk(s):'' 
     await pr(s+cnk,t)
     await sleep(o.sleep)
    }
    o.onEnd({type:'onEnd',ary:theAry,now:theAry.length,nowsrc:'',nowobj:void 0})
   })(ary);
  }

  //
  Object.assign(o,opt);
  if(o.auto) o.done()
  return o;
 }
 root.loader=entry;
 /*usage
;(function(root){
let calc=(obj)=>{
 console.log(obj)
}

loader({chunk:true,sleep:1000, onStart:calc,onLoading:calc,onEnd:calc })

})(this); 
 
 */
})(this);
