/*history
v1.0 create
v1.1 data-length map
v1.2 bugfix add remove wrote element
*/
;(function(root){
 'use strict';
 ;
 function entry(_target,_flg=false){
  if(!_target)return console.log('target empty')
  let target =_target.replace(/\./g,'').split(',')
  ,flg=_flg
  ,body=document.body
  ,hasClass=function(el){
   let l=target.filter(d=>el.classList.contains(d)).length
   return (l>0)?true:false;
  }
  ,lmap=function(e){
   e.target.dataset.length=e.target.textContent.length
  }
  ,remove=function(e){
   let el=e.target
   el.removeAttribute('contenteditable')
   if(flg)el.removeEventListener('input',lmap)
   el.dataset.editable=false
  }  
  ,add=function(e){
   if(!hasClass(e.target))return
   let el=e.target
   el.setAttribute('contenteditable','plaintext-only')
   el.focus()
   //if(el.dataset.editable)return
   el.addEventListener('blur',remove,{once:true})
   if(flg)el.addEventListener('input',lmap)
   el.dataset.editable=true
   el=void 0
   ;
  }
  ;
  body.addEventListener('click',add)///
 }
 root.editable=entry;
 /*usage
 editable('.xyz,.eeee',true) //target,data-length write flg
 //
[data-editable]{
 white-space:pre-wrap;
 word-break:break-all;
} 
 */
})(this);
