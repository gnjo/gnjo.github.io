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
background:%%c1%%;
color:%%c2%%;
}

::-webkit-scrollbar-thumb {
background: %%c2%%;
border-radius: 0px;
}

.hidescrollbar::-webkit-scrollbar
,.hidescroll::-webkit-scrollbar {
width: 0px;
}

::-webkit-scrollbar {
background-color: %%c1%%;
width: 8px;
}

::-webkit-scrollbar-button {
background-color: %%c1%%;
height: 0px;
width: 0px;
border-radius: 0px;
}
.bg1{background-color:%%c1%%;}
.b1{border:2px solid %%c1%%;}
.c1{color:%%c1%%;}

.bg2{background-color:%%c2%%;}
.b2{border:2px solid %%c2%%;}
.c2{color:%%c2%%;}

.bg3{ background-color:%%c3%%;}
.b3{border:2px solid %%c3%%;}
.c3{color:%%c3%%;}
`

 function entry(c1,c2,c3){
  let el=document.querySelector('style.scroll');
  el.innerHTML=css.replace(/%%c1%%/g,c1).replace(/%%c2%%/g,c2).replace(/%%c3%%/g,c3)
 }
 root.scroll=entry
})(this);
//.bg1,.c1,.b1,.bg2 ...
//scroll('#000','#aaa','#000')
