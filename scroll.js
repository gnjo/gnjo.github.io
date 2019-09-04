;(function(root){
 //console.log('in')
 if(!document.body.dataset.scroll){
  let el=document.createElement('style')
  el.classList.add('scroll')
  document.head.appendChild(el)
  document.body.dataset.scroll='true';  
 }
 //console.log('a')

 let css=`
body{
background:%%bg%%;
color:%%c%%;
}

::-webkit-scrollbar-thumb {
  background: %%c%%;
  border-radius: 0px;
}

.hidescrollbar::-webkit-scrollbar
,.hidescroll::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar {
  background-color: %%bg%%;
  width: 8px;
}

::-webkit-scrollbar-button {
  background-color: %%bg%%;
  height: 0px;
  width: 0px;
  border-radius: 0px;
}
`
 
 function entry(bg,c){
  let el=document.querySelector('style.scroll')
  el.innerHTML=css.replace(/%%bg%%/g,bg).replace(/%%c%%/g,c)
 }
 root.scroll=entry
})(this);

//scroll('#000','#aaa')
