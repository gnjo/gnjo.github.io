;(function(root){
 'use strict';
 ;
 function entry(_target,_cls){
  if(!_target)return console.log('target empty')
  let target =_target.replace(/\./g,'').split(',')
  ,cls=(_cls)?_cls.replace('.',''):void 0
  ,body=document.body
  ,remove=function(e){
   e.target.removeAttribute('contenteditable')   
  }
  ,hasClass=function(el){
   let l=target.filter(d=>el.classList.contains(d)).length
   return (l>0)?true:false;
  }
  ,add=function(e){
   //console.log(e,target)
   //console.log(e.target.classList.contains(target))
   if(!hasClass(e.target))return
   let el=e.target
   el.setAttribute('contenteditable','plaintext-only')
   el.focus()
   if(el.dataset.editable)return
   el.addEventListener('blur',remove)
   el.dataset.editable=true
   if(cls)el.classList.add(cls)
   el=void 0
   ;
  }
  ;
  body.addEventListener('click',add)///
 }
 root.editable=entry;
 /*usage
 editable('.xyz','editable') //target,addclass
 //
[data-editable]{
 white-space:pre-wrap;
 word-break:break-all;
} 
 */
})(this);

//editable('.xyz','.blue')
