/* <script onload="use(this)" src="//gnjo.github.io/use.js?q=monocc.css"></script> */

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

var fn=this.fn||{};
 fn.g=(s)=>{return document.getElementById(s)};
 fn.q=(s)=>{return document.querySelector(s)};
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
  var c = "abcdefghijklmnopqrstuvwxyz0123456789";
  var cl=c.length;
  var r = "";
  for(var i=0; i<l; i++){
      r += c[Math.floor(Math.random()*cl)];
  } 
   return r;
 };
fn.rkana=(l=8)=>{
  var c = "abcdefghijklmnopqrstuvwxyz",cl=c.length;
  var b = "aiueo",bl=b.length;
  var r="";
  for(var i=0;i<l;i++){
   r+=(i%2)? b[Math.floor(Math.random()*bl)]:c[Math.floor(Math.random()*cl)];
  }
  return r;   
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

if(this.md5){ 
 var hashColor=((s)=>{ return '#'+md5(s).slice(0,6) });
 fn.hashColor=hashColor;
}
if(this.invert) fn.invertColor=invert;

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

