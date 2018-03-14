(function(root){
  /*v0.1 radio.cheked trans the 0 1
    v0.2 style digital
    v0.3 kansuuji syou
    v0.4 list and image
    v0.5 description
    v0.6 create biglex
    v0.7 kansuuji > suji. color:white> a less gray
    接景序破急〆
    */
let fn={},is={},sys=root.sys||{},thenload=root.thenload;
is.url=(d)=>{return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(d)}
;
is.element=function(o){return !!(o && o.nodeType === 1)}
  
fn.blink=function(query,ms){
  let el=is.element(query)?query:document.querySelector(query);
  el.classList.add('blink');
  setTimeout(()=>{el.classList.remove('blink')},ms)
}
fn.mes =function(query,mes){
  let el=is.element(query)?query:document.querySelector(query);
  el.textContent =mes;
}
fn.jpTime=(timestamp=Date.now())=>{
    return new Date(timestamp+1000*60*60*9)
      .toISOString()
      .replace(/-/g,'/')
      .replace('T',' ')
      .slice(0,'YYYY/MM/DD hh:mm'.length)
    ;
}
fn.i=function(html,f,doc=document){
  var _f =(f)?f:(el)=>{return el};
  if(typeof html !=='string') return _f(html);
  //
  var el=doc.createElement('table');
  el.innerHTML=html;
  var me=el.childNodes[0];
  return _f(me);
}
fn.kansuji=(num,keta=2)=>{/*v0.3*/
  let c ='零壱弐参四伍六七八玖'.split('')
  ,a =('00000000'+num).slice(-1*keta).split('')
  ;
  return a.map(d=>c[parseInt(d)]).join('')
}
fn.suji=(num,keta=2)=>{/*v0.4*/
  let c ='０１２３４５６７８９'.split('')
  ,a =('00000000'+num).slice(-1*keta).split('')
  ;
  return a.map(d=>c[parseInt(d)]).join('')
}
fn.rkana=(l=8)=>{
  var c = "bcdfghjklmnpqrstvwxyz",cl=c.length
  ,b = "aiueo",bl=b.length
  ,f=Math.floor,r=Math.random,ret=""
  ;
  for(var i=0;i<l;i++)
   ret+=(i%2)? b[f(r()*bl)]:c[f(r()*cl)].toUpperCase()
  ;
  return ret;   
}
;

let fac =(obj)=>{
  let css=`@import url('https://fonts.googleapis.com/css?family=Armata|Share+Tech+Mono');
*{
 font-family: 'Armata',meiryo,sans-serif;
 background-repeat:no-repeat;
 background-position:center;
 background-size:cover;
}

html{
  font-size:14px;
}
.blink{
  animation:blink 0.3s 6 alternate;
}
@keyframes blink{
  0%{background-color:inherit}
  100%{background-color:#006b9f}   
}
.saveflg{
  animation:blink 3s infinite alternate;
}
[data-editer="frame"]{
  display:flex;
  flex-direction:row;
  min-height:10rem;
  background-color:rgba(0,0,0,0.7);  
}
[data-editer="left"]{
  width:44rem;min-height:100%;
  display:flex;flex-direction:column;
}
[data-editer="right"]{width:33rem;min-height:100%}
[data-editer="bar"]{
  width:100%;height:1.5rem;
  display:flex;flex-direction:row;
  justify-content:flex-end;
}
[data-editer="editer"]{width:100%;flex-grow:1}

[data-editer="left"]
,[data-editer="right"]{
  border:1px solid
}
[data-editer="right"]{border-left:0}
[data-editer="bar"]{border-bottom:1px solid}

[data-editer="editer"]
,[data-editer="right"]>div{
  box-sizing:border-box;
  padding:0.5rem 0.75rem;
}

/*tab setting*/
label.tab[for]{display:inline-block}
input.tab{display:none}
div.tab{display:none}

input.tab:checked + div.tab{
  display:flex;
  width:100%;height:100%;
}
[for="flg-title"]{flex-grow:1}
[for*="flg-"]{
  font-family:'share tech mono',monospace;
}
label.tab[for]{
  padding:0rem 0.5rem;padding-top:0.25rem;
  transition:width 0.3s ease-in-out;
}
label.tab[for]:first-child{
  padding-left:0.75rem;/*special*/
}
label.tab[for] + label.tab[for]{
  border-left:1px solid;
}
[for="flg-hide"]{order: 10000}

input#flg-hide:checked ~ [data-editer="right"]{
  display:none;
}

[contentEditable="plaintext-only"]{
  outline:none;
  line-height:1.15;
  font-size:1rem;
  
}
::-webkit-scrollbar{overflow:hidden;width:4px;background:transparent;}
::-webkit-scrollbar:horizontal{height:4px;}
::-webkit-scrollbar-button{display:none;}
::-webkit-scrollbar-piece{background:rgba(100,100,100,0.3);}
::-webkit-scrollbar-piece:start{background:rgba(100,100,100,0.3);}
::-webkit-scrollbar-thumb{background:#006b9f;}
::-webkit-scrollbar-corner{background:rgba(100,100,100,0.3);}

[data-editer="editer"] {
    width: 100%;
    /* flex-grow: 1; */
    overflow-y: auto;
    height: calc( 100% - 1.6rem );
}

[data-editer="imgur"]>.imgframe, [data-editer="imgur"]>img {
    width: 33.3333333%;
    height: 100px;
}


[data-editer="right"]>div {
    padding: 0;
}

.imgframe {
    margin: 0px!important;
}

[data-editer="imgur"] {
    overflow-y: auto;
}

body{
    margin-top: 4rem;
    margin-bottom: 5rem;
   overflow-y: hidden;
    background-image: url(https://i.imgur.com/yiGVR4r.png);
}


img.if-story,canvas.if-story{filter:brightness(60%) contrast(200%)}
.if-story:not(img):not(canvas){z-index:0;position:relative}
.if-story:not(img):not(canvas):before{z-index:-1;background:inherit;filter:brightness(60%) contrast(200%);
content:' ';position:absolute;width:100%;height:100%;
overflow:hidden;left:0;top:0}


* {
    font-family: 'Armata',meiryo,sans-serif;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-color: #006b9f!important;
    color: #f3f3f3; /*white;*/
}

.rbtn {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid /**/;
    border-radius: 0!important;
    cursor: pointer;
    box-sizing: border-box;
    margin-left: 4px;
}

.rbtn:hover {
    background-color: #006b9f!important;
}

/*list*/
li {
    /* width: 100%; */
    min-height: 3rem;
    padding: 0.5rem 0.75rem;
    background-position-y: 25%;
}
p.desc {
    padding: 0;
    margin: 0;
    font-size: 10px;
    color: rgba(255,255,255,0.9);
    margin-left: 4rem;
}

ol {
    list-style: none;
    /* padding-left: 1.5rem; */
    width: 100%;
    padding: 0;
    margin: 0;
   overflow-y: auto;
}
`;
  let layout =`
<div data-editer="frame">
  <style>${css}</style>
  <input type="checkbox"class="tab" id="flg-hide"></input>
  <div data-editer="left">
   <div data-editer="bar">
     <label for="flg-title" class="tab">title</label>
     <label for="flg-mes" class="tab">YYYY/MM/DD hh:mm</label>       
     <label for="flg-list" class="tab">L</label>
     <label for="flg-hide" class="tab">></label>     
    </div>
   <div data-editer="editer" contentEditable="plaintext-only"></div>
  </div>
  <div data-editer="right">
   <input type="radio" name="g1" class="tab" checked id="flg-list"></input>
   <div data-editer="list" class="tab">list</div>
  </div>
</div>
`;
  return fn.i(layout.trim())
}

function entry(obj){
  var o={};
  o.fn=fn;
  o.frame= fac()
  o.ed=o.frame.querySelector('[data-editer="editer"]')
  o.title=o.frame.querySelector('[for="flg-title"]')
  o.list=o.frame.querySelector('[data-editer="list"]')
  o.right=o.frame.querySelector('[data-editer="right"]')
  o.bar=o.frame.querySelector('[data-editer="bar"]')
  o._mes=o.frame.querySelector('[for="flg-mes"]')
  o.blink = fn.blink.bind(this,o._mes,3000)
  o.mes =fn.mes.bind(this,o._mes)
  o.time =fn.jpTime
  o.filename = fn.rkana(8); //
  o.saveflg =false;
  o.load =function(filename,data){
    if(o.saveflg){
      let fi =o.filename,da =o.ed.textContent;
      o._save(fi,da);
    }
    o.filename =filename;    
    o.ed.textContent =data||'';
    Promise.resolve(data).then(o.biglex)    
  }
  o._save=function(filename,data){
    o.saveflg=false;///write index.js
  }
  o.save =function(ev){
    if( (ev.ctrlKey||ev.metaKey) && ev.keyCode ==='S'.charCodeAt(0)){
      ev.preventDefault();
      let data =o.ed.textContent;
      o._save(o.filename,data);
      o.blink();
      o.mes(o.time())      
    } 
  }
  o.biglex =function(d){
      let a=d.split('＃').map(d=>o.lex('＃'+d)).filter(d=>d.t!='＃')
      ,info=Object.assign({},{t:'not',u:'not'},a[0])
      ;
      o.title.textContent = o.filename +' - '+info.t; //info.t +' - '+ info.u
      //title.style.backgroundImage=`url(${info.u})`;
      let ol=document.createElement('ol');
      o._mes.classList.add('saveflg');
      /*ol.innerHTML=a.map( (d,i)=>{return `<li>${fn.kansuji(i,2)}章　${d.t.slice(1)}</li>`}).join('\n');*/
      a.map( (d,i)=>o.listfac(d,i) ).forEach(el=>ol.appendChild(el))/*v0.4 list and image*/
      o.list.innerHTML='';o.list.appendChild(ol)    
  }
  o.lex= function lex(str){
    let title,url='',length,t2='',desc=''
    let a =str.split('\n');
    length=(a.length===1)?1:a.length-1;
    a.forEach((d,i)=>{
      if(i===0) t2=d;
      if( d.charAt(0) === '＃' ) title = d;
      else if(d.charAt(0) === '＠' && is.url(d.slice(1))) url =d.slice(1);
      else if(d.charAt(0) === '；' || d.charAt(0) === '：') desc =d;
    });
    if(!title) title=t2;
    //if(!a) a=[]
    return {t:title,u:url,l:length,d:desc}
  }
  o.listfac=function(info,i){
    let el=document.createElement('li'),p=document.createElement('p');
    el.style.backgroundImage = `url(${info.u})`;
    //el.textContent = `${fn.kansuji(i,2)}章　${info.t.slice(1)}`
    el.textContent = `＃${fn.suji(i,2)}　${info.t.slice(1)}`    /*change simple*/
    el.classList.add('if-story');
    p.textContent= info.d;
    p.classList.add('desc');
    el.appendChild(p);
    return el;
  }
  o.input=function(ev){
    let d=this.textContent,log=(d)=>{console.log(d);return d}
    ;
    Promise.resolve(d).then(o.biglex)
    o.saveflg=true;//
  }
  o.add=function(name,caller){    
    let btn=fn.i(`<label for="flg-${name}" class="tab">${name}</label>`)
    ,radio =fn.i(`<input type="radio" name="g1" class="tab" id="flg-${name}"></input>`)
    ,el =fn.i(`<div data-editer="${name}" class="tab">no load</div>`)
    ;
    o.bar.appendChild(btn);
    [radio,el].forEach(d=>o.right.appendChild(d))
    //(0 === false)? 0: 1
    btn.onclick =function(ev){caller(el,(radio.checked === false)?0:1,o)} /*v0.1 bug fix*/
    let first =o.right.querySelector('input.tab:first-child');
    if(first) first.checked=true;
    caller(el,-1,o);///    
  }
  ;
  ;
  o.ed.onkeydown =o.save;
  thenload([
    //'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.js'
    '//gnjo.github.io/deth.js'
  ]).then(d=>{
    o.ed.oninput =_.debounce(o.input,50); 
  })
  o=Object.assign({},o,obj)
  return o;
}
; 
root.editer=entry;
})(this);
