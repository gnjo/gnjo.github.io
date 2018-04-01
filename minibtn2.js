;(function(root){
 /*v1.1 add element; v1.2 add cc; v1.3 query bug fix*/
 /* needs attention the version
 https://gnjo.github.io/e3.js  ///
 https://gnjo.github.io/minibtn.css  
 https://gnjo.github.io/minibtn2.js /// 
 */
 /*usage minibtn(target).[pos]({}).end()
 // pos is  .rb .rt .lt .lb .ct .cb .cr .cl
 minibtn(document.querySelector('#test2'))
 .rt({textContent:'a',onclick:on})
 .rt({textContent:'b',class:'aclass',onclick:on})
 .rt({textContent:'c',class:'aclass',onclick:on})
 .rt({textContent:'d',class:'aclass',onclick:on})
 .lt({textContent:'x',class:'aclass',onclick:on})
 .end();
 //or text
 //.lt('xyz')
 //or element
 //.lt(fn.i3('<div>xyz</div>'))
 */
 'use strict'
 let is=root.is||{},fn=root.fn||{}
 is.element = function(obj){return !!(obj && obj.nodeType === 1)}
 is.string = function(obj){return toString.call(obj) === '[object String]'}
 ;
 function entry(target){
  let o={};
  o._={};
  o._['target'] = target;
  ;['rb','rt','lt','lb','ct','cb','cr','cl','cc'].forEach((d)=>{ /*add cc*/
   o._[d]=[];
   o[d]=(obj)=>{o._[d].push(obj);return o}
  })
  ;
  o._f=(tar,pos,ary)=>{
   let cls =' c '+pos ,query ='.c.'+pos
   ,nav =tar.q(query) || fn.ce('nav').set({class:cls}).a2(tar); //bug fix cls query
   ary.forEach((d)=>{
    /*add element*/
    if(is.element(d))return d.a2(nav)
    if(is.string(d))return fn.ce('label').set({textContent:d}).a2(nav)
    return fn.ce('label').set(d).a2(nav)
   })
  }
  o.end=(log)=>{
   if(log) console.log(log);
   let el=is.element(o._['target'])?o._['target']:fn.q(o._['target']);
   el.classList.add('minibtn-p');
   Object.keys(o._).filter(d=>d!='target')
    .forEach((pos)=>{ if(o._[pos].length!=0) o._f(el,pos,o._[pos]);})
   ;
   return el;
  }
  return o;
 }
 root.minibtn=entry;
})(this);
