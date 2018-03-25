
;(function(root){
 let fn={};
fn.i3=function(html){
 if(typeof html !=='string') return html
 var el=document.createElement('table'); el.innerHTML=html.trim();
 return el.childNodes[0];
}
fn.copy=function(textVal){
 var copyFrom = document.createElement("textarea");
 copyFrom.textContent = textVal;
 var bodyElm = document.getElementsByTagName("body")[0];
 bodyElm.appendChild(copyFrom);
 copyFrom.select();
 var retVal = document.execCommand('copy');
 bodyElm.removeChild(copyFrom);
 return retVal;
}
fn.q=(s,doc=document)=>{return doc.querySelector(s)};
fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
fn.ce=(d=>document.createElement(d))
fn.r=(d=>d.parentNode.removeChild(d)) 
 ;function entry(str='#0a2133,#d1dec6,#961241,#6d8b89,#586c6c'){
  let a=str.split(',');
  let layout=`
<div data-palette>
 <style>
[data-palette]{position:fixed;bottom:0;right:25px;font-size:0}
[data-palette]>b{font-family:monospace;font-size:10px;font-weight:400;padding:0 4px;}
[data-palette]>b{width:50px;height:50px;display:inline-block;text-align:center;color:white}
[data-palette]>b:hover{color:black;cursor:pointer}
 </style>
 <b style="background:${a[0]}">${a[0]}</b>
 <b style="background:${a[1]}">${a[1]}</b>
 <b style="background:${a[2]}">${a[2]}</b>
 <b style="background:${a[3]}">${a[3]}</b>
 <b style="background:${a[4]}">${a[4]}</b>
</div>
`;
  if(fn.q('[data-palette]')) fn.r(fn.q('[data-palette]'));
  let x=fn.i3(layout);
  fn.qa('b',x).forEach(d=>{ d.onclick=()=>{ fn.copy(d.textContent) }})
  document.body.appendChild(x);  
 };
 root.palette =entry;
 root.palett=entry;
//palette('#2b2515,#c6be62,#877e3f,#9fa04c,#6c5c64,https://i.imgur.com/zgXwPWM.jpg')
})(this);

