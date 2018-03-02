(function(root){
  /*v0.1 radio.cheked trans the 0 1*/
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
  100%{background-color:orange}   
}

[data-editer="frame"]{
  display:flex;
  flex-direction:row;
  min-height:10rem;
}
[data-editer="left"]{
  width:44rem;min-height:100%;
  display:flex;flex-direction:column;
}
[data-editer="right"]{width:22rem;min-height:100%}
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
  
}`;
  let layout =`
<div data-editer="frame">
  <style>${css}</style>
  <input type="checkbox"class="tab" checked id="flg-hide"></input>
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
  let o={};
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
  o.save =function(ev){
    if( (ev.ctrlKey||ev.metaKey) && ev.keyCode ==='S'.charCodeAt(0)){
      ev.preventDefault();
      o.blink();
      o.mes(o.time())
    } 
  }
  o.uplist =function(obj){
    
  }
  o.lex= function lex(str){
    let title,url='',length,t2='';
    let a =str.split('\n');
    length=(a.length===1)?1:a.length-1;
    a.forEach((d,i)=>{
      if(i===0) t2=d;
      if( d.charAt(0) === '＃' ) title = d;
      else if(d.charAt(0) === '＠' && is.url(d.slice(1))) url =d.slice(1);
    });
    if(!title) title=t2;
    if(!a) a=[]
    return {t:title,u:url,l:length}
  }
  o.input=function(ev){
    let d=this.textContent,log=(d)=>{console.log(d);return d}
    Promise.resolve(d).then((d)=>{
      let a=d.split('＃')
       .map(d=>o.lex('＃'+d)).filter(d=>d.t!='＃')
      let info=Object.assign({},{t:'not',u:'not'},a[0])
      o.title.textContent = info.t +' - '+ info.u
      //title.style.backgroundImage=`url(${info.u})`;
      let ol=document.createElement('ol');
      ol.innerHTML=a.map(d=>`<li>${d.t}</li>`).join('\n');
      o.list.innerHTML='';o.list.appendChild(ol)
    })
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
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.js'
  ]).then(d=>{
    o.ed.oninput =_.debounce(o.input,50); 
  })
  o=Object.assign({},o,obj)
  return o;
}
; 
root.editer=entry;
})(this);
