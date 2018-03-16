(function(root){
  let is={},fn={}
  is.element = function(obj){return !!(obj && obj.nodeType === 1)}
  ;
  fn.i3=(d)=>{
   if(typeof d !=='string') return d
   var el=document.createElement('table'); el.innerHTML=d.trim();
   return el.childNodes[0];
  }
  fn.effect=(el,o)=>{
   let p =(d)=>{return isNaN( parseFloat(d))? 0 : parseFloat(d)*1000 }
   Object.keys(o).forEach((k)=>{el.classList.add(k); 
   setTimeout(()=>{ el.classList.remove(k) }, p(o[k]) )   
   })
  }
   fn.r=(d=>d.parentNode.removeChild(d))
   fn.q=(s,doc=document)=>{return doc.querySelector(s)};
   fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
  ;   
 function entry(obj){
    var e={};
    e.is =is; e.fn=fn
    e.el =is.element(obj)?obj:fn.i3(obj);
    e.aTo =(p)=>{p.appendChild(e.el);return e.el}
    e.pTo =(p)=>{p.insertBefore(e.el,p.firstChild); return e.el}
    e.asTo =(p)=>{p.parentNode.insertBefore(e.el,p.nextSibling);return e.el}
    e.psTo =(p)=>{p.parentNode.insertBefore(e.el,p);return e.el}
    e.effect =(o)=>{return fn.effect(e.el,o)}
    e.remove=()=>{return fn.r(e.el)}
    e.q=(s)=>{return fn.q(s,e.el)}
    e.qa=(s)=>{return fn.qa(s,e.el)}
    e.log=()=>{console.log(e)}
    /*same*/
    e.a2=e.aTo; e.p2=e.pTo; e.as2=e.asTo; e.psTo=e.ps2;
    e.ef=e.effect; e.r=e.remove;
    return e;
  };
  root.SQuery =entry;
  if(!root.$) root.$=entry; //JQuery confix
})(this);
