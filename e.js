(function(root){
 /*v1.5 fragment*/
 var entry =function(obj){
 
  let e={}
  ;
  e.isProp =function(o,p){for(const a in o){if(p === a) return true};return false};
  e.isAttr=function(o,a){return e.isElement(o)?o.hasAttribute(a):false}
  e.isElement = function(obj){return !!(obj && obj.nodeType === 1)}
  e.isQuery =function(obj){return !( /^</.test(obj.trim()) )}
  e.isDocumentFragment=function(obj){return obj.toString() ==='[object DocumentFragment]' } /*if target document fragment*/
  e.elcopy=function(el,flg=true){
  let obj={}
  ;
   for(const d in el){ if( /^on(.*)/.test(d) && el[d]) obj[d]=el[d] }
   return Object.assign( el.cloneNode(flg) ,obj);
}
  ;///
  e._ ={};
  e.copy =function(obj){e._['copy'] =obj;return this;}
  e.on =function(obj){e._['on'] =Object.assign({},e._['on'],obj);return this;}
  e.attr =function(obj){e._['attr'] =Object.assign({},e._['attr'],obj);return this;}
  e.data =function(obj){e._['data'] =Object.assign({},e._['data'],obj);return this;}
  
  e.set=function(obj){
   let attr={},prop={},el =document.createElement('table');
   Object.keys(obj).forEach((key)=>{
     if(e.isProp(el,key)) prop[key]=obj[key];
     else attr[key]=obj[key];
   });
   e._['prop'] =Object.assign({},e._['prop'],prop);
   e._['attr'] =Object.assign({},e._['attr'],attr);
   return this
  }
  e.get=function(obj){
    let el=e.ce();
    if(obj==='value'){return el[obj]} //bug fix value
    if(obj){return e.isProp(el,obj)? el[obj]: el.getAttribute(obj)}
    else{
     let da={};
     for(const a in el){
      if( e.isAttr(el,a)) da[a] =el.getAttribute(a); 
      else if(a==='value') da[a] =el[a];//bug fix value
     }
     return da;
    }
  }
  e.appendTo =function(obj){e._['appendTo'] =obj;return this;}
  e.prependTo =function(obj){e._['prependTo'] =obj;return this;}
  e.siblTo =function(obj){e._['siblTo'] =obj;return this;}
  e.presiblTo =function(obj){e._['presiblTo'] =obj;return this;}
  e.effect =function(obj){e._['effect'] =obj;return this;}
  e.ce=function(){
   let o= this._
   ,el=document.createElement('table');
   if( e.isElement(o['e']) || e.isDocumentFragment(obj) ) el=o['e']  //fragment
   else if( e.isQuery(o['e'])) el =document.querySelector(o['e'])
   else {el.innerHTML= o['e'].trim(); el= el.firstChild;} //bug fix. if o['e'] str head be empty, firstChild the textnode. cuz,.trim() 
   return el;   
  }
  e.end=function(log){
   //console.log(e._)
   if(log) console.log(log);
   let o = this._
   ,el = e.ce();
   ;

   if(o['copy']) el = e.elcopy(el,o['copy'])
   if(o['on']) Object.keys(o['on']).forEach((k)=>{ el['on'+k ]= o['on'][k]})
   if(o['prop']) Object.keys(o['prop']).forEach((k)=>{ el[k]= o['prop'][k]}) //
   
   if(o['attr']) Object.keys(o['attr']).forEach((k)=>{ 
    if(k ==='value') el[k] = o['attr'][k];//bug fix value to prop
    else el.setAttribute(k,o['attr'][k]);
   })
   if(o['data']) Object.keys(o['data']).forEach((k)=>{ el.setAttribute('data-'+k,o['data'][k]) })
   //
   if(o['effect']){
     let p =(d)=>{return isNaN( parseFloat(d))? 0 : parseFloat(d)*1000 }
     Object.keys(o['effect']).forEach((k)=>{ 
      el.classList.add(k); 
      setTimeout(()=>{ el.classList.remove(k) }, p(o['effect'][k]) )   
     })
   } 
   //
   ;
   let tar =(obj)=>{return ( e.isElement(obj) || e.isDocumentFragment(obj) )?obj:document.querySelector(obj)} //fragment
   ,fr=(elm)=>{let f=document.createDocumentFragment();f.appendChild(elm);return f}
   ;
   if(o['appendTo']){
    let parent=tar(o['appendTo']);
    parent.appendChild( fr(el) );
    return el;
   }
   if(o['prependTo']){
    //parent.insertBefore(el, parent.firstChild);
    let parent =tar(o['prependTo']);  
    parent.insertBefore( fr(el) , parent.firstChild);   
    return el;
   }
   if(o['siblTo']){
    let parent =tar(o['siblTo'])
     parent.parentNode.insertBefore( fr(el) , parent.nextSibling); 
     //parent.nextElementSibling().appendChild(el);
    return el;
   }
   if(o['presiblTo']){
    let parent =tar(o['presiblTo'])
     parent.parentNode.insertBefore( fr(el) ,parent)   
     //parent.previousElementSibling().appendChild(el)
    return el;
   }
   //
   //console.log('el is alone')

   return el;
  }
  ;
  ////
  e._['e'] = obj
  ;
  return e;
 }

 root.e = entry;
 
})(this)
