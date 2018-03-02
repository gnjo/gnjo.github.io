(function(root){
let req=root.superagent
,md5=root.md5
,FormData=root.FormData
,fn=root.fn||{}
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
  ;
   formData.append('type', 'file')
   formData.append('image', blob)  
   return req.post('https://api.imgur.com/3/upload.json')
    .set({ Accept: 'application/json', Authorization: `Client-ID ${c}`})
    .send(formData)
    .then(res=>res.body)
 }
//org
fn.dnd= function(ev){
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
}
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
 function getBgi(el){
   let u=el.style.backgroundImage;
   //return u.replace('url(','').replace(')','').replace(/["\']/g,'')
   return u.replace(/["\']|\)|url\(/g,'')
 }
 function setBgi(el,url){
   el.style.backgroundImage =`url(${url})`;
   return el;
 }
  function frame(){
    let css=`[data-editer="imgur"]{
    display: flex;
    flex-direction:row-reverse;/**/
    flex-wrap: wrap;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
}
.drag{
 border:3px dotted; 
}
.imgframe{
  width:250px;height:200px;
  position:relative;
  background-color: orange;
  margin: 1px;  
}
.imgframe>nav{
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  position:absolute;
  width:100%;
  top:0;left:0;
  font-size:12px;
  font-family:monospace;
}
.lastorder{
  order:-1000!important;
}
.rbtn{
  display:inline-block;
  width:12px;
  height:12px;
  border:1px solid rgba(0,0,0,0.7);
  border-radius:50%;
  cursor:pointer;
  box-sizing:border-box;
  margin-left:4px;
}
.rbtn:hover{
  background-color:rgba(0,0,0,0.3);  
}`
    let el=fn.i(`<div data-editer="imgur"><style>${css}</style></div>`)
    return el;
  }
  
  function entry(obj){
    let o={};
    o.target=frame()
    o.filename ='___imgur___'
    o.cid='c552bf3081f0790'
    o.loading='https://i.imgur.com/HUaAzml.gif';
    o.draw=()=>{
      ;['onpaste','ondragover','ondrop','ondragleave'].forEach(d=>o.target[d]=o.dnd)
      return o.target;
    }
    o.calc=(base64)=>{return base64}
    o=Object.assign({},o,obj)///
    ;
    o.data={}
    o.imup =fn.imup.bind(this,o.cid)
    o.gflg=()=>{return (root.sys)? ( (sys.g)? true :false) :false}
    o.save=(src)=>{
      if(src) o.data[md5(src)] ={url:src,time:Date.now(),flg:1}   
      if(o.gflg() ){
          /* md5(url):{u:url,ti:time,flg:flg} */
         sys.g.write(o.filename,sys.g.jsy(o.data))
      }
    }
    o.load=()=>{
      if(o.gflg() ){
        let d= sys.g.read(o.filename);
        if(d){
          o.target.innerHTML='';
          o.data=Object.assign({},sys.g.jps(d.content),o.data);
          o.data.map(d=>o.fac(d.url,d.time,d.flg))
            .forEach(el=>o.target.appendChild(el))
        }
      }
    }
    ;
   o.fac=(url,time=Date.now(),flg=1)=>{
     let el =fn.ce('div'),nav=fn.ce('nav'),ti=fn.ce('label'),btn=fn.ce('label')
     ,la ='lastorder'
     ti.textContent = fn.jpTime(time);
     btn.classList.add('rbtn')
     btn.onclick=()=>{
       el.classList.toggle(la);
       let url=getBgi(el);
       o.data[md5(url)].flg = (el.classList.contains(la))? 0: 1;
       o.save();///
     }   
     el.classList.add('imgframe');
     el.onclick =()=>{ fn.copy(getBgi(el))}
     if(flg===0) el.classList.add(la);
     setBgi(el,url)
     el.style.order=time;
     el.appendChild(nav);
     [ti,btn].forEach(d=>nav.appendChild(d));
     return el;
  }   
   o.caller=function(ev){ //call by dnd
      let base64 = ev.target.result
      ,img =fn.ce('img')
      ;
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
   o.dnd=function(ev){
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
     .map((f)=>{ let r=new FileReader(); r.onloadend=o.caller;  r.readAsDataURL((flg)?f.getAsFile():f); })
   ;
   this.classList.remove(mark)
   return;
  }     
  if(type==='dragover'){ this.classList.add(mark);ev.dataTransfer.dropEffect = 'copy';return}
  if(type==='dragleave'){ this.classList.remove(mark);return}
}

    return o;
  }
  root.imgur =entry;
})(this);
