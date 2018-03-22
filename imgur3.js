(function(root){
 /*v0.1 bugfix order rate
 v0.2 add .if-story
 v0.3 md5 change mic12
 v0.4 change superagent to fetch
 v0.4.1 img loading size is .card
 name imgur3.js
*/

 let FormData=root.FormData
 ,fn=root.fn||{}
 ;
 fn.hashCode =(s)=>{var h=0;for(var i=0;i < s.length; i++) h = h * 31 + s.charCodeAt(i)|0;return h;}
 fn.mic12 =(s)=>{var d= fn.hashCode('GGGGGG'+s),a =d.toString(16).slice(-6);return a+a;} 
 let md5=fn.mic12///
 ;
 fn.ce=(d=>document.createElement(d))
 fn.q=(d=>document.querySelector(d))
 fn.i=function(html,f,doc=document){
  var _f =(f)?f:(el)=>{return el};
  if(typeof html !=='string') return _f(html);
  //
  var el=doc.createElement('table');
  el.innerHTML=html;
  var me=el.childNodes[0];
  return _f(me);
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
 }
 fn.imup=function(cid,base64){
  //base64 is data:image/jpeg...,....
  let blob = fn.toBlob(base64)
  ,c =cid
  ,formData = new FormData()
  formData.append('type', 'file')
  formData.append('image', blob)
  ;
  let headers={Accept: 'application/json',Authorization: `Client-ID ${c}`}
  ,url='https://api.imgur.com/3/upload.json'
  ,opt={method: 'POST',headers:headers,body:formData}
  return fetch(url,opt)
   .then(d=>d.json())
 }
 fn.dnd=(caller=>function(ev){
  let type=ev.type,mark ='drag'  //mark is .drag the custom class
  ;
  ev.stopPropagation();
  ev.preventDefault();
  if(type==='drop'||type==='paste'){
   //this paste hack, allow the chrome only.
   const flg= (type==='paste')
   ,files=(flg)?ev.clipboardData.items:ev.target.files||ev.dataTransfer.files
   ;
   ;[].slice.call(files)
    .filter(f=>f.type.match('image.*')) 
    .slice(0,10) //10 is limit
    .map((f)=>{ let r=new FileReader(); r.onloadend=caller;  r.readAsDataURL((flg)?f.getAsFile():f); })
   ;
   this.classList.remove(mark)
   return;
  }     
  if(type==='dragover'){ this.classList.add(mark);ev.dataTransfer.dropEffect = 'copy';return}
  if(type==='dragleave'){ this.classList.remove(mark);return}
 })
 fn.jpTime=(timestamp=Date.now())=>{
  return new Date(timestamp+1000*60*60*9)
   .toISOString()
   .replace(/-/g,'/')
   .replace('T',' ')
   .slice(0,'YYYY/MM/DD hh:mm'.length)
  ;
 }
 fn.copy=function(text){
  //console.log(text)
  let cf = document.createElement("textarea")
  ,el = document.getElementsByTagName("body")[0]
  ;
  cf.textContent = text;
  el.appendChild(cf);
  cf.select();
  document.execCommand('copy');
  el.removeChild(cf); //copy next remove
 }
 fn.jsy=(d=>JSON.stringify(d))
 fn.jps=(d=>JSON.parse(d))
 fn.getBgi=(el)=>{let u=el.style.backgroundImage;return u.replace(/["\']|\)|url\(/g,'')}
 fn.setBgi=(el,url)=>{el.style.backgroundImage =`url(${url})`;return el}
 fn.timeToOrder=(time)=>{return 2147483647 - parseInt( time/1000 )}

 function entry(obj){
  //console.log(obj)
  var o={};
  o.frame=()=>{
   //css .lastorder{order:2147483647!important; /*bug fix order*/}
   return fn.i(`<div data-editer="imgur"></div>`)
  }
  o.target=o.frame()
  o.filename ='___imgur___'
  o.cid='c552bf3081f0790'
  o.loading='https://i.imgur.com/HUaAzml.gif';
  o.draw=()=>{
   ;['onpaste','ondragover','ondrop','ondragleave'].forEach(d=>o.target[d]=o.dnd)
   return o.target;
  }
  o.calc=(base64)=>{return base64}
  o=Object.assign({},o,obj)///
  //console.log(o.g)
  ;
  o.data={}
  o.imup =fn.imup.bind(this,o.cid)
  o.save=(src)=>{
   if(src) o.data[md5(src)] ={url:src,time:Date.now(),flg:1}   
   if(o.g.authflg){o.g.write(o.filename,fn.jsy(o.data))}
  }
  
  o.load=()=>{
   if(!o.g.authflg || !o.g.isFile(o.filename)) return;
   let calc=(d)=>{
    o.data=fn.jps( (d.content)?d.content:d );
    Object.keys(o.data).forEach((key)=>{
     let x =o.data[key],el=o.fac(x.url,x.time,x.flg)
     ;
     o.target.appendChild(el)
    })
   }
   ;
    o.g.read(o.filename).then(calc)
  }
  ;
  o.fac=(url,time=Date.now(),flg=1)=>{
   let c =card();//'nav','tag','time','btn','title','desc'
   let el =c.el,nav=fn.ce('nav'),ti=c.time,btn=c.btn
   ,la ='lastorder'
   ti.textContent = fn.jpTime(time);
   //btn.classList.add('rbtn')
   btn.onclick=()=>{
    el.classList.toggle(la);
    let url=fn.getBgi(el);
    o.data[md5(url)].flg = (el.classList.contains(la))? 0: 1;
    o.save();///
   }   
   el.classList.add('imgframe');
   el.classList.add('if-dark');//new
   el.onclick =()=>{ fn.copy(fn.getBgi(el))}
   if(flg===0) el.classList.add(la);
   fn.setBgi(el,url)
   el.style.order= fn.timeToOrder(time);//time;//bug fix. order is int //bug fix order
   //el.appendChild(nav);
   //[ti,btn].forEach(d=>nav.appendChild(d));
   return el;
  }   
  o.caller=function(ev){ //call by dnd
   let base64 = ev.target.result
   ,img =fn.ce('img');
   ;
   img.classList.add('card');img.classList.add('imgframe')
   img.src=o.loading;
   o.target.appendChild(img);

   Promise.resolve(base64)
    .then(o.calc)
    .then(o.imup)
    .then((d)=>{
    img.parentNode.removeChild(img);///
    let url=d.data.link
    ,el=o.fac(url);
    o.target.appendChild(el);
    return url
   })
    .then(o.save)
   ;
  }
  o.dnd=fn.dnd(o.caller);
  return o;
 }
 root.imgur =entry;
})(this);
