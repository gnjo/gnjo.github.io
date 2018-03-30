/*
v0.1 global data set
v0.2 null add
v0.3 3nd param navpos top || right
*/
(function(root){
 let fn={},is={}
 is.element=function(o){return !!(o && o.nodeType === 1)}
 fn.i3=function(html){
  if(typeof html !=='string') return html
  var el=document.createElement('table'); el.innerHTML=html.trim();
  return el.childNodes[0];
 }
 fn.q=(d,doc=document)=>{return doc.querySelector(d)}
 fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
 ;
 function entry(target,group='0',navpos='top'){
  let o={};
  o.fn=fn; o.is=is;
  o.is.new=(el)=>{return el.querySelector('[data-tab]')?false:true }
  o.el=is.element(target)?target:o.fn.q(target)
  o.el.classList.add('tab');
  o.el.classList.add((navpos=='top')?'top':'right');
  o.group=group;
  o._data={}
  o.data=function(key,obj){
   if(!key && !obj) return o._data;
   if(!obj) return o._data[key];
   o._data[key]=obj
   return o;
  }
  o.add=function(name,caller){
   if(!name){ caller(o);return o} /*null is special calc*/
   let i=o.fn.i3(`<input type="radio" name="tab-${o.group}" id="${name}" data-tab="${name}"></input>`)
   ,l=o.fn.i3(`<label class="pad" for="${name}" data-tab="${name}">${name.slice(0,1)}</label>`)
   ,f=o.fn.i3(`<section class="pos" data-tab="${name}"></section>`)
   ;
   if(o.is.new(o.el)) i.checked = true;   
   ;[i,l,f].forEach(d=>o.el.appendChild(d))
   caller(i,l,f,o);
   return o;
  }
  return o;
 };
 root.tab =entry;
})(this);
/*
//<div class="r"></div>
tab('.r')
 .data('test','dddeeeeeedd')
 .add('time',(input,label,frame,obj)=>{
 label.textContent="YYYY/DD/MM hh:mm"
 label.classList.add('time')
 frame.textContent=obj.data('test')
})
 .add('L',(input,label,frame,obj)=>{
 
 frame.textContent="this is L"

})
 .add('I',(input,label,frame,obj)=>{

 frame.textContent="this is I"

})
 .add('A',(input,label,frame,obj)=>{

 frame.textContent="this is A"

})
 .add('H',(input,label,frame,obj)=>{

 frame.textContent="this is H"

})
*/
