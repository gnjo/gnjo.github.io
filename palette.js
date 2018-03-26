/*v0.1 if ctrl opacity:0.1*/
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
 fn.sq=(d,opt=2)=>{
 let f=(d)=>{return (d)?[
   d.tagName.toLowerCase()
   ,(d.classList.length!=0)?'.'+[].slice.call(d.classList).join('.'):''
   ,(d.id&&d.id!='')?('#'+d.id):''
   ,(d.name)?`[name="${d.name}"]`:''
  ].join(''):null;
 }
 ,now=d
 ;return Array.from({length:opt})
  .map((d,i)=>{now= (now)?(i===0)?now:now.parentElement:null;return now})
  .map(d=>f(d)).filter(d=>d).reverse().join('>')
 ;
} 
;function entry(str='#0a2133,#d1dec6,#961241,#6d8b89,#586c6c'){
  let a=str.split(',');
  let layout=`
<div data-palette>
<style>
[data-palette]{position:fixed;bottom:0;right:25px;font-size:0}
[data-palette] b{font-family:monospace;font-size:10px;font-weight:400;}
[data-palette] b{width:50px;height:50px;display:inline-block;text-align:center;color:white}
[data-palette] b:hover{color:black;cursor:pointer}
[data-palette] input{width:250px;box-sizing:border-box;outline:none;background:transparent;color:inherit;border:none;}
[data-palette]>div{display: flex}
[data-palette] .wisp{opacity:0.01}
</style>
<input>xxxx</input>
<div>
<b style="background:${a[0]}">${a[0]}</b>
<b style="background:${a[1]}">${a[1]}</b>
<b style="background:${a[2]}">${a[2]}</b>
<b style="background:${a[3]}">${a[3]}</b>
<b style="background:${a[4]}">${a[4]}</b>
</div>
</div>
`;
  if(fn.q('[data-palette]')) fn.r(fn.q('[data-palette]'));
  let x=fn.i3(layout);
  fn.qa('b',x).forEach(d=>{ d.onclick=()=>{ fn.copy(d.textContent) }})
  document.body.appendChild(x);
  query();
 };
 root.palette =entry;
 root.palett=entry;
 //palette('#2b2515,#c6be62,#877e3f,#9fa04c,#6c5c64,https://i.imgur.com/zgXwPWM.jpg');

 function query(){
  //ctrl clickで element のqueryをコピーする。
  let el=fn.q('[data-palette] input')
  ,caller=function(ev){if(ev.target!=el)el.value =fn.sq(ev.target,3)}
  el.onclick=()=>{fn.copy(el.value)}
  ;['contextmenu','click'].forEach(d=>{document.body.addEventListener(d,caller,false)})
  document.body.addEventListener('keydown',function(ev){ if(ev.ctrlKey) fn.q('[data-palette]').classList.toggle('wisp');},false);
 }
;
})(this);
//palette('#2b2515,#c6be62,#877e3f,#9fa04c,#6c5c64,https://i.imgur.com/zgXwPWM.jpg')
