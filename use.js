/* script onload="use(this)" src="//gnjo.github.io/use.js?q=monocc.css"> */

function use(el){
 var v=el.src;
 var data= v.match(/(.+)\?.+=(.+)$/)||v.match(/(.+)\?(.+)$/);
 if(data){data=data.slice(1);}
 else{console.error('adds file not'); return}
 var baseurl =data[0].slice(0, data[0].lastIndexOf('/')+1 );

 var target =document.createElement('span');
 target.style.display='none';
 el.parentNode.insertBefore( target , el.parentNode.firstElementChild); 

 var ary = data[1].trim().split('|');
 ary.forEach((d)=>{
  var url=d.split('?')[0];

  if(~url.indexOf('.js')){
   var el= target.appendChild( document.createElement('script') );
   el.src=baseurl+d;
  }else if(~url.indexOf('.css')){
   var el = target.appendChild( document.createElement('link') );
   el.setAttribute('rel','stylesheet');
   el.setAttribute('href',baseurl+d);  
  }
 })
}
/**/

var fn=this.fn||{},is=this.is||{}
fn.i3=function(html){
 if(typeof html !=='string') return html
 var el=document.createElement('table'); el.innerHTML=html.trim();
 return el.childNodes[0];
}
fn.g=(s)=>{return document.getElementById(s)};
fn.q=(s,doc=document)=>{return doc.querySelector(s)};
fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
fn.r=(d=>d.parentNode.removeChild(d))
fn.ce=(d=>document.createElement(d))
fn.range=(l=0)=>{return Array.from({length:l})}
fn.urlcnk=(u)=>{
 let cep = /.+\?/.test(u)? '&' :'?',v =`__${performance.now()}__=`.replace('.','')
 return u + cep + v + Date.now()
}
fn.choiceone=(o,name,v=true)=>{ Object.keys(o).map(d=>{ o[d]=(d===name)?v:!v });return o}

fn.rhash=()=>{return Math.random().toString(36).slice(-8)}
fn.timeToOrder=(time)=>{return 2147483647 - parseInt( time/1000 )}
fn.hashCode =(s)=>{var h=0;for(var i=0;i < s.length; i++) h = h * 31 + s.charCodeAt(i)|0;return h}
fn.mic12 =(s)=>{var d= fn.hashCode('GGGGGG'+s),a =d.toString(16).slice(-6);return a+a}
fn.hash12=(s)=>{
  let rec=((k,v)=>(toString.call(v)==="[object Function]")?v.toString():v)
  ,a=fn.hashCode(toString.call(s)+JSON.stringify(s,rec)).toString(16).slice(-6);
  return a+a;
}
fn.gistdesc =(u)=>{return new Date().toISOString().slice(0,"YYYY-MM".length) +'-'+fn.mic12(u)}
fn.gistinfo=(r)=>{
 let ma =/https:\/\/gist.githubusercontent.com\/(.+)\/(.+)\/raw\/(.+)\/(.+)$/
 ,a=r.match(ma)
 ;
 return {url:r,user:a[1],id:a[2],filename:a[4]}  
}
fn.scv=(el,type='top')=>{
 if(type=='top') return el.scrollIntoView({ behavior: 'smooth',block: "start", inline: "nearest" })
 if(type=='bottom') return el.scrollIntoView({ behavior: 'smooth',block: "end", inline: "nearest" })
 /*if(type=='center')*/ return el.scrollIntoView({ behavior: 'smooth'}) 
}

fn.menum=(me,q)=>{let num=-1;[].slice.call(document.querySelectorAll(q)).forEach((d,i)=>{if(d === me) num = i});return num}

fn.lay=(q,flg)=>{
  var o={},t='lay',qt='[lay]',el=(!!(q && q.nodeType === 1))?q:document.querySelector(q)
  o.el =(flg)?el.cloneNode(true):el;
  ;[].slice.call(o.el.querySelectorAll(qt)).forEach(d=>{o[d.getAttribute(t)]=d});
  return o;
 }

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
 is.imgurl=(d)=>{return /(.+:\/\/.+\.jpeg)|(.+:\/\/.+\.png)|(.+:\/\/.+\.jpg)/i.test(d)}
 
 fn.biglex=(d)=>{
  return d.split('\n＃').map((d,i)=>(i===0)?d:'＃'+d)
 } 
 
 fn.lex=(str)=>{
  let title='',url='',line=0,c=44;
  let a =str.split('\n').forEach((d)=>{
   if( d.charAt(0) === '＃' ) title = d;
   else if(d.charAt(0) === '＠' && is.imgurl(d.slice(1))) url =d.slice(1);
   line += Math.ceil((d.length+0.1)/c)
  });
  return {t:title,u:url,l:line,s:str}
 }
 
fn.i=function(html,f,doc=document){
 var _f =(f)?f:(el)=>{return el};
 if(typeof html !=='string') return _f(html);
 //
 var el=doc.createElement('table');
 el.innerHTML=html.trim();
 var me=el.childNodes[0];
 return _f(me);
}

fn.i2=function(html,attr,style,doc=document){
 var f=(s)=>{var el=doc.createElement('table');el.innerHTML=html;return el.childNodes[0]}
 var me = (typeof html !=='string')? html:f(html);

 if(attr){
  Object.keys(attr).forEach((d)=>{ 
   if(typeof attr[d] !=='string'|| d in me) me[d]=attr[d];
   else me.setAttribute(d,attr[d]) 
  });
 }
 if(style){
  var st=doc.createElement('style');
  st.innerHTML = style;
  me.appendChild(st);
 }
 console.log(me)
 return me;
}

fn.rnum=(l=8)=>{
 var c = "123456789";//0を含めない方が都合が良い
 var cl=c.length;
 var r = "";
 for(var i=0; i<l; i++){
  r += c[Math.floor(Math.random()*cl)];
 } 
 return r;
};
fn.rword=(l=8)=>{
 var c = "abcdefghijklmnopqrstuvwxyz0123456789",cl=c.length,r = "";
 for(var i=0; i<l; i++) r += c[Math.floor(Math.random()*cl)];
 return r;
}
fn.rkana=(l=8)=>{
 var c = "bcdfghjklmnpqrstvwxyz",cl=c.length,b ="aiueo",bl=b.length,r=""
 ,mf=Math.floor,mr=Math.random
 ;for(var i=0;i<l;i++) r+=(i%2)? b[mf(mr()*bl)]:c[mf(mr()*cl)].toUpperCase();
 return r;
}
fn.aoimport=(d)=>{return d.replace(/［＃改ページ］\n　/g,'＃').replace(/［.+］/g,'');}

if(this.md5){ 
 var hashColor=((s)=>{ return '#'+md5(s).slice(0,6) });
 fn.hashColor=hashColor;
}
if(this.invert) fn.invertColor=invert;

fn.isJSON =function(d){ try{JSON.parse(d);return true}catch(e){return false} }

if(localStorage){
 fn.loId ='__loId__'; //project every change
 fn.loSave=(d,i=null)=>{var id=i||fn.loId;localStorage.setItem(id, JSON.stringify(d) ); return id}
 fn.loLoad =(i)=>{var id=i||fn.loId;var d=localStorage.getItem(id); return JSON.parse(d) }
 fn.loRemove=(i)=>{var id=i||fn.loId;localStorage.removeItem(id)}
}

//createDocument
fn.cd= function(markup, type='text/html') {
 //if (/^\s*text\/html\s*(?:;|$)/i.test(type)) 
 var doc = document.implementation.createHTMLDocument("");
 if (~markup.toLowerCase().indexOf('<!doctype') ) doc.documentElement.innerHTML = markup;
 else doc.body.innerHTML = markup;
 return doc;
};

fn.fragment =function(u,tt='body'){
 return new Promise((sol)=>{
  var f=fn.cd;
  //"Access-Control-Allow-Headers":"*","Access-Control-Allow-Origin":"*",
  var h={'content-type':'text/plain'};
  fetch(u,{method:'get',mode:'cors',headers:h})
   .then(d=>d.text())
   .then(text=>f(text))
   .then(doc=>doc.querySelector(tt))
   .then(el=> sol(el) )
 })
};

fn.debug=(o)=>{return Object.getOwnPropertyNames(o).concat(Object.getOwnPropertyNames(o.__proto__))}
//console.log(fn.debug(Math))
fn.check=(s)=>{try{return{s:s,o:new Function(';return '+s)()} }catch(e){return{s:s,o:null,error:e.message} }}

fn.pad=( (d,l)=>('000000000000000000'+d).slice(-1*l));
fn.rotation=(a,v,l)=>{a.unshift(v);a.splice(l);return a};

fn.hash =function(str){return str.split('').map(d=> d.charCodeAt(0).toString(16) ).join('')}
fn.fr=function(html=''){
 let flg = (typeof 'html' === 'string')
 ,e= (flg)?document.createElement('table'): html||document.createElement('table')
 ,fr=document.createDocumentFragment()
 ;
 if(flg) e.innerHTML= html||'';
 ;[].slice.call(e.childNodes).forEach(d=>fr.appendChild(d))
 return fr;
}

fn.rename =function(name,count=1){
 var join =`_${count}`;
 return (~name.indexOf('.'))? name.replace(/(.*)(\.)/,`$1${join}$2`) : `${name}${join}`;
}

fn.jpTime=(timestamp=Date.now())=>{
 return new Date(timestamp+1000*60*60*9)
  .toISOString()
  .replace(/-/g,'/')
  .replace('T',' ')
  .slice(0,'YYYY/MM/DD hh:mm'.length)
 ;
} 
fn.now =function(time){
 /*add local time jp*/	 
 if(time=='jp'||time=='jpn') return new Date( Date.now()+ 1000*60*60*9  ).toISOString().split('.')[0] +'Z'
 if(time) return new Date(time).toISOString().split('.')[0] +'Z';
 else return new Date( Date.now() ).toISOString().split('.')[0] +'Z';
}

fn.toBlob =function(base64) {
 let ma = /^data:(.*);base64,(.*)$/
 ;
 if(!ma.test(base64)){ console.log('error base64 data'); return null}

 let ary = base64.match(ma)  //[0] base64, [1] type, [2] body
 ,type = ary[1]
 ,bin = atob(ary[2])
 ,buffer = new Uint8Array(bin.length).map( (d,i)=>{return bin.charCodeAt(i)})
 ,blob = new Blob([buffer.buffer], {type: type})
 ;
 return blob;
 //var debug = {hello: "world"};
 //var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
 //data:image/png;base64,... 
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

fn.gsl=(()=>window.getSelection().toString())
fn.gsl2=(el=>{
 let data = (el.value)?el.value:el.textContent;
 return data.slice(el.selectionStart,el.selectionEnd)
})
fn.pnt2=(str)=>{document.execCommand('inserthtml',false,str)}
fn.pnt=(str)=>{document.execCommand('inserttext',false,str)}
fn.paste=function(target, str){
 //if target have textarea or input, to focus and paste the str.
 let obj = target;
 obj.focus();
 if(navigator.userAgent.match(/MSIE/)){
  let r = document.selection.createRange();
  r.text = str;
  r.select();
 }else{
  let s = obj.value
  ,p = obj.selectionStart
  ,np = p + str.length
  ;
  obj.value= (s.substr(0, p) + str + s.substr(p));
  obj.setSelectionRange(np, np);
 }
}

fn.mes = (q,limit=15)=>{
 var el =document.querySelector(q)
 ,now = (time)=>{
  if(time) return new Date(time).toISOString().split('.')[0] +'Z';
  else return new Date( Date.now() ).toISOString().split('.')[0] +'Z';
 }
 ,rotation =(a,v,l)=>{a.unshift(v);a.splice(l);return a}
 ,stock =[]
 ;
 return function(str){
  let time = now().match(/T.*:(.*:.*)Z$/).slice(1)[0]
  ,mes = `${time}=>${str}`
  rotation(stock,mes,limit);
  el.innerText =stock[0];
  el.setAttribute('title',stock.join('\n'));
 }
 //usage:
 //var mes =fn.mes('#cm');
 //mes('xyz')
 //3e1105122428b873252c5cb4f05772b67a1f8077
}

;
fn.dragger=(el,caller)=>{

 var dnd=(caller=>function(ev){
  let type=ev.type,mark ='drag'  //mark is .drag the custom class
  ;
  if(type!='paste'){
   ev.stopPropagation();
   ev.preventDefault();
  }
  if(type==='drop'||type==='paste'){
   //this paste hack, allow the chrome only.
   const flg= (type==='paste')
   ,files=(flg)?ev.clipboardData.items:ev.target.files||ev.dataTransfer.files
   ;
   ;[].slice.call(files)
   //.filter(f=>f.type.match('*.*')) 
   //.slice(0,10) //10 is limit
    .map((f)=>{
    let r=new FileReader(); 
    r.onloadend=(function(f){return function(ev){
     ev.target.file=f/**/ ;
     caller(ev)
    };
                            })(f);

    if(flg&&f.kind ==='string'){
     var _f=JSON.parse(JSON.stringify({kind:f.kind,type:f.type}))
     return f.getAsString(function(str) {
      ev.target.result=str; ev.target.file=_f; caller(ev);
     });
    }    
    r.readAsDataURL((flg)?f.getAsFile():f); 
   })
   ;
   this.classList.remove(mark)
   return;
  }     
  if(type==='dragover'){ this.classList.add(mark);ev.dataTransfer.dropEffect = 'copy';return}
  if(type==='dragleave'){ this.classList.remove(mark);return}
 })

 var _dnd=dnd(caller)
 ;['onpaste','ondragover','ondrop','ondragleave'].forEach(d=>el[d]=_dnd)
 return el; 
 /*usage
document.body.set({'contenteditable':'plaintext-only'})
dragger(document.body,(ev)=>{
 console.log(ev,ev.target.result,ev.target.file)
}) 
 */

}
