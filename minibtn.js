(function(root){
 /*v1.1 add element; v1.2 add cc; v1.3 query bug fix*/
 /* needs
 https://gnjo.github.io/e.js 
 https://gnjo.github.io/minibtn.css  
 https://gnjo.github.io/minibtn.js 
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
 
 */
 'use strict'
 let e=root.e
 ,isElement = function(obj){return !!(obj && obj.nodeType === 1)}
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
   let cls =' c '+pos
   ,query ='.c.'+pos
   ,nav =tar.querySelector(query) || e('<nav></nav>').set({class:cls}).appendTo(tar).end(); //bug fix cls query
   ary.forEach((d)=>{
    /*add element*/
    if(isElement(d)) e(d).appendTo(nav).end()
    else e('<label></label>').set(d).appendTo(nav).end()
   })
  }
  
  o.end=(log)=>{
   if(log) console.log(log);
   let el=e(o._['target']).end();
   el.classList.add('minibtn-p');
   Object.keys(o._).filter(d=>d!='target').forEach((pos)=>{
    if(o._[pos].length!=0) o._f(el,pos,o._[pos])
   })
   
   return el;
  }
  return o;
 }
 root.minibtn=entry;
})(this)
