;(function(root){
 var keyCmd=root.keyCmd,fn={}
 ;
fn.q=(s,doc=document)=>{return doc.querySelector(s)};
fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))} 
 //need keyCmd.js
 let css=`.none{display:none;}
.modal{position:fixed;top:0;right:0;
width:60vw;height:100vh; z-index:100;
background-color:black;
}`
 function init(){
  let flg=document.querySelector('style .modalstyle')
  if(!flg){
   let sc=document.createElement('style')
   sc.classList.add('modalstyle')
   sc.innerHTML=css
   document.head.appendChild(sc);
   keyCmd(document.body)
    .input({27:(e)=>{e.preventDefault();fn.qa('.modal').map(d=>d.classList.add('none'))  }})
    .end();
  }
 }
 
 function entry(key,el){
  if(!key||!el) return;
  init();
  let modal=document.createElement('div')
  modal.classList.add('none')
  modal.classList.add('modal')
  modal.appendChild(el)
  document.body.appendChild(modal)
  let f=(e)=>{ e.preventDefault(); modal.classList.toggle('none') }
  keyCmd(document.body).ctrl({[key]:f}).end();
  return modal;
 }
 root.mo=entry
 /*usage
 mo(37,fn.q('#a'))
 */
})(this);
