this.fn=this.fn||{},this.is=this.is||{};
fn.rkana=(l=8)=>{/*#014 cut c aiueo*/
 var c = "bcdfghjklmnpqrstvwxyz",cl=c.length,b = "aiueo",bl=b.length
 ,mf=Math.floor,mr=Math.random,r="";
 for(var i=0;i<l;i++){ r+=(i%2)? b[mf(mr()*bl)]:c[mf(mr()*cl)]}
 return r;   
}  
fn.pnt=(str)=>{document.execCommand('inserttext', false,str)}
fn.pnt2=(str)=>{document.execCommand('inserthtml', false,str)}
fn.time=(timestamp=Date.now())=>{
 return new Date( timestamp+ 1000*60*60*9  )
  .toISOString().replace(/-/g,'/').replace('T',' ')
  .slice(0,'YYYY/MM/DD hh:mm'.length);
}
fn.time2=(timestamp=Date.now())=>{//hh:mm:ss
 //console.log(timestamp)
 return new Date( timestamp+ 1000*60*60*9  )
  .toISOString().replace(/-/g,'/').replace('T',' ')
  .slice('YYYY/MM/DD '.length,'YYYY/MM/DD hh:mm:ss'.length);
} 
;
is.imgurl=(d)=>{return /(.+:\/\/.+\.jpeg)|(.+:\/\/.+\.png)|(.+:\/\/.+\.jpg)/i.test(d)}
is.array = Array.isArray || function(obj){return toString.call(obj) === '[object Array]'}
fn.lex=(str)=>{
 let title,url,line=0,c=44,cnk;
 ;str.split('\n').forEach((d)=>{
  cnk=d.charAt(0);
  if(cnk==='＃'&&(!title)) title = d;
  else if(cnk==='＠'&&is.imgurl(d.slice(1))&&(!url)) url =d.slice(1);
  line += Math.ceil((d.length+0.1)/c)
 });
 return {t:title||'',u:url||'',l:line}
}
fn.biglex=(data,bo)=>{
 let ary=(bo)?data.split(bo):[data,''];
 return {d:ary[0].split('＃').filter(d=>d).map(d=>'＃'+d),b:ary[1]}
}
fn.pad=( (d,l)=>('000000000000000000'+d).slice(-1*l))
;
//console.log(fn.time2());
fn.sol=(d=>Promise.resolve(d))
fn.lay=(q,flg)=>{
 var o={},t='lay',qt='[lay]',el=(!!(q && q.nodeType === 1))?q:document.querySelector(q)
 o.el =(flg)?el.cloneNode(true):el;
 ;[].slice.call(o.el.querySelectorAll(qt)).forEach(d=>{o[d.getAttribute(t)]=d});
 return o;
} 
fn.cmd=function(imap){return function(ev){
 if(!((ev.ctrlKey||ev.metaKey)&&imap[ev.keyCode])) return
 ev.preventDefault();return imap[ev.keyCode].call(this,ev);
}};

fn.scv=(el,type='top')=>{
 if(type=='top') return el.scrollIntoView({ behavior: 'smooth',block: "start", inline: "nearest" })
 if(type=='bottom') return el.scrollIntoView({ behavior: 'smooth',block: "end", inline: "nearest" })
 /*if(type=='center')*/ return el.scrollIntoView({ behavior: 'smooth'}) 
}
;
fn.shortlex=(str)=>{
  /*ru=/＠.+/ => ru=/＠http.+/ */
  let rt=/＃.+/,ru=/＠http.+/,rd=/[：；].+/,len=/\r?\n/g,rti=/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}/,data=str||''
  ,f =(ma,flg)=>{return (flg)?(data.match(ma)||[]).length : (data.match(ma)||'').toString()}
  ,ti=f(rti)
//  ,tima=/"timestamp".*:(.*\d)/
  ;
  //plus alpha
//   if(ti==''&&tima.test(str)) ti=str.match(tima)[1];
   return {t:f(rt),u:f(ru).slice(1),d:f(rd),l:f(len,'is'),ti:ti}
 }
fn.shortlex2=(data)=>{
 let is={},one=data.slice(data.indexOf('{',2),data.indexOf('}')+1)
 is.jsonString =function(d){ try{JSON.parse(d);return true}catch(e){return false} }
 let ret= is.jsonString(one)?JSON.parse(one):null;
 if(ret) ret.ti=ret.timestamp;
 return ret;
}
fn.timeToOrder=(time)=>{return 2147483647 - parseInt( time/1000 )}

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

;(function(root){
 var vw={};
 vw.rate=(now,max,l)=>{return fn.pad(now,l)+'/'+fn.pad(max,l) } // 04/50
 vw.rate2=(now,max,l)=>{
  let a=(now.toString().length>l)?now:fn.pad(now,l)
  return '['+a+'/'+fn.pad(max,l)+']'
 } //overflow [04/50] 
 vw.main=(o,el,flg=false)=>{
  //{t,u,l,f,d,timestamp} 
  let ed=el.q('[lay="ed"]'),info=el.q('[lay="info"]');
  o.data[el.id].num=(el.parentElement)?[].slice.call(el.parentElement.children).indexOf(el):0
  ;
  let data=o.data[el.id];
  if(flg) ed.textContent=data.d;  //flg true is first
  //$.flg afterelement
  //# or $ is after element
  //'✔001[20/34]'
  info.textContent=fn.pad(data.num,3)+vw.rate2(data.l,34,2);
  if(data.f==1) info.classList.add('checked');
  else info.classList.remove('checked')
 };
vw.list=(o,el,flg=false)=>{
  //{t,u,l,f,d,timestamp} 
  let id=el.get('for')
  ,data=o.data[id];
 ;
let a=minibtn(el)
.lt({textContent:fn.pad(data.num,3),class:(data.f==1)?"checked":""})
.lt(fn.i3(`<progress value="${(data.f==1)?34:data.l}" max="34" lay="prog"></progress>`))
//.rt('a').rt('b').rt('c')
.lb(fn.i3(`<label lay="title">${data.t}</label>`))
.rb(fn.time2(data.timestamp))
.end();
 /*
  $.prog.value=data.l||0;
  if(flg) $.ed.textContent=data.d;  //flg true is first
  //$.flg afterelement
  //# or $ is after element
  $.num.textContent=fn.pad(num,3)
  $.str.textContent=data.t.replace('＃','')
  $.line.textContent=vw.rate2(data.l,$.prog.max,$.prog.max.toString().length);
  $.time.textContent =fn.time2(data.timestamp);
  if(data.f==1) $.el.classList.add('checked');
  
  
  
  if(is.imgurl(data.u)){$.img.src=data.u; $.img.classList.remove('none')}
  else{$.img.classList.add('none')}
  
  
  */
 };
 
 var layout=`
<div class="b dot nohover" lay="f">
<div contenteditable="plaintext-only" lay="ed"></div>
</div>
`;
 function entry(obj){
  let def={
   main:fn.ce('div'),list:fn.ce('div'),layout:layout,fquery:'[lay="f"]'
   ,type:'boot',target: null, data:{}
   ,caller:()=>{}
   ,stockdef:()=>{return {d:'＃新',t:'＃新',u:'',l:0,f:0,timestamp:Date.now()}}
  }
  ;
  let o=Object.assign({},def,obj)
  ;
  if(!o.main&&!o.list) return console.log('main list not');
  o.target=o.main; o.caller(o)
  ;
  o.imap={
   '13':function(ev){
    let p=this.parentElement//,obj=o.data[p.id]
    let el=o.fac(o.stockdef(),'main');
    el.as2(p)//.parentElement)
    vw.main(o,el,true);//true is first    
    fn.scv(el);
    el.focus();
    o.uplist(p,'input');
   }
   ,'68':function(ev){/*D*/fn.pnt2(fn.time())}
   ,'72':function(ev){/*H*/fn.copy(Object.keys(o.data).map(d=>o.data[d].d).join("\n"))}
   ,'83':function(ev){/*S*/o.save('strong')}
   ,'8':function(ev){
    /*backspace*/
    if(this.textContent.length!=0) return;
    let p=this.parentElement;
    delete o.data[p.id];
    p.r();
    o.uplist(p,'input');//p is null
   }
   ,'98':function(ev){/**/}
   ,'100':function(ev){/**/}
   ,'102':function(ev){/**/}
   ,'104':function(ev){/**/}
  }
  o.save=(type)=>{
   o.type='save'; o.target=o.main; o.savedata=o.data
   o.caller(o);
   //qg.setI(d);
  }
  o.reset=(type)=>{
   if('load'){
    o.savedata=null;
    o.filename=null;
    o.data={};
    o.main.innerHTML='';
    o.list.innerHTML='';
    o.type='reset'; o.target=o.main; o.caller(o);
   }else{ //uplist
    o.list.innerHTML='';
    o.type='reset'; o.target=o.list; o.caller(o);    
   }
  }
  o.onlex=function(el){return function(ev){
   fn.sol(this.textContent).then(d=>{
    o.data[el.id] = Object.assign({},o.data[el.id],fn.lex(d),{timestamp:Date.now(),d:d})
    vw.main(o,el,false)
    o.uplist();
    o.save('auto');
   }) ;
  }}
  o.fac=(data,type)=>{
   if(type==='main'){
    //scroll into view は uplistで行う。event処理が基本
    let el=fn.i3(`<div class="b dot nohover" lay="f">
<div contenteditable="plaintext-only" lay="ed"></div>
</div>
`)
    ,ed=el.q('[lay="ed"]')
    ,info=fn.i3(`<label lay="info"></label>`)
    ,check=function(ev){
     this.classList.toggle('checked');
     o.data[el.id].f=this.classList.contains('checked')?1:0;
     o.uplist();
     //
    o.save('auto');
    }
    el.id=fn.rkana(14);
    o.data[el.id]=data;
    ed.onkeydown= fn.cmd(o.imap)
    ed.oninput =_.debounce(o.onlex(el),70);
    info.onclick=check;
    minibtn(el).rt(info).end();
    //{t,u,l,f,d,timestamp} 
    return el;
   }else{
    //list, but now o.list
 
   }
  }
  o.load=(filename,data)=>{
   if(!is.array(data)) return o.import(filename,data,'barl');
   o.reset('load');
   o.filename=filename;//filename change this func only.
   data.forEach(d=>{
    let el=o.fac(d,'main').a2(o.main);
    vw.main(o,el,true);//true is first
   });
   o.uplist();
  }
  o.import=(filename,data,type)=>{
   //version import
   //{t,u,l,f,d,timestamp,num}   
   let def=o.stockdef();
   if(type==='acidframe'||type==0){
    let a=fn.biglex(data,'<!----boundary---->')
    ,d=a.d.concat(a.b).map(d=>Object.assign({},def,fn.lex(d),{d:d}))
    ;
    o.load(filename,d);
   }else if(type==='new'||type==1){
    let d=[Object.assign({},def,fn.lex(data),{d:data})]
    o.load(filename,d)
   }else if(type==='barl'||type==2){
    let sorter=(a,b)=>{return a.num-b.num}
    ,d=Object.keys(data).map(d=>data[d]).sort(sorter);
    o.load(filename,d)
   }
  }
  o.uplist=(type)=>{
   o.list.innerHTML='';
   let num=fn.qa(o.fquery,o.main).map(d=>{
    vw.main(o,d,false)    
    let li=fn.i3(`<div class="a dot" for="${d.id}" lay="f"></div>`).a2(o.list);
    //codepen special
    //d.q('[lay="info"]').onclick=()=>{ fn.scv(li) }//
    d.onclick=()=>{
     ;(~location.href.indexOf('.codepen.io'))?fn.scv(li):fn.scv(li,'center')
     fn.qa(o.fquery,o.list)
      .forEach(d=>{return (d===li)?d.classList.add('blink-once'):d.classList.remove('blink-once') })   
    }//    
    li.onclick=()=>{
     let el=d;
     fn.scv(d);
     fn.qa(o.fquery,o.main)
      .forEach(d=>{return (d===el)?d.classList.add('blink-once'):d.classList.remove('blink-once') })        
    }
    vw.list(o,li,true);//true is first
    o.type='uplist'; o.target=o.list; o.caller(o);    
   });
  }
  ;
  return o;
 }
 root.barlediter =entry;
})(this);


;var sys=barl('xyz')
 .add(null,init)
 .add('top',drawTop)
 .add('right',drawEditerlist)
 .add('left',drawEditer)
 .add('right',drawAuth)
// .add('right',drawList3)
;
function init(name,o){
 o.data.desc='systembarl';
 o.data.authstr=localStorage.getItem('authstr');
 o.data.be=barlediter();
}
;
;function drawAuth(el,o){
 var be=o.data.be
 ,filefac=(filename,time,flg,data)=>{
  //let c =card('min');
  //console.log(c)
  let li = fn.i3(`<div class="a dot" lay="f"></div>`) 
  ,da=data.content||data||''
  ,fi=filename
  ,info=(flg==1)?fn.shortlex2(da):fn.shortlex(da)
  //,_time =new Date(info.ti||time).getTime()
  ;
  //debug
  //console.log(da);
  //console.log(info);
  let _time =new Date(info.ti||time).getTime()
  ;
  ;minibtn(li)
   .lt(filename)
   .lb(fn.i3(`<label lay="title">${info.t}</label>`))
   .rb(fn.time2(_time))
   .end();
//  c.tag.textContent =fi;
//  c.time.textContent =fn.time(_time);
//  c.title.textContent = info.t;
//  c.desc.textContent = info.d
//  el.classList.add('if-dark');
//  el.style.order =timeToOrder(_time)    
//  el.style.backgroundImage =`url(${info.u})`
  ;
  //console.log(data)
  li.onclick =function(ev){
   return (flg==1)?qg.getI(filename).then(d=>{ be.load(filename,d) }):be.import(filename,info.t,'new')
  }
  return li;
 }
 ,draw=(files)=>{
  let non =/___.+___/,li =qg.data.files //li is Object
  ,ary=Object.keys(li).filter(d=>!non.test(d))
   .map(key=>{
    let d=li[key];
    return filefac(d.filename,Date.now(),1,d)
   })
  ;
  //and new 
  let newt =Date.now() + 24*60*60*1000,newf='new story'
  ary.push(filefac(fn.rkana(8),newt,0,`＃${newf}\n`) )

  el.innerHTML='';
  ary.forEach(d=>el.appendChild(d))
 }
 ,f=function(ev){
   qg.auth(o.data.desc,o.data.authstr).then(draw);
 }
 ,f1=function(ev){
  if(ev.mes==='close'||(!qg.data)) return;
  draw(qg.keys())
 }
 el.addEventListener('barl',f,{once:true});
 el.addEventListener('barl',f1,false); 

 el.textContent='this is auth' 
}
;
function drawEditerlist(el,o){
 o.data.edlist=el;
 //console.log(o.data.prog3000.value)
}
function drawEditer(el,o){
 o.data.ed=el;
 let be=o.data.be
 ;be.main=o.data.ed;be.list=o.data.edlist;
 o.data.saveDe=_.debounce(function(ev){
  if(!qg.data) return;
  qg.setI(ev.filename,ev.savedata).then(d=>{
   //console.log(qg.keys())
  })
  //console.log(ev.filename,ev.savedata)
 },4000);
 
 be.caller=function(ev){
  //o.data.prog3000.value=300;
 //o.data.proglabel
  if(ev.type==='save') o.data.saveDe(ev)
  if(ev.type==='uplist') o.data.prog3000De(ev)
 }
// be.import(fn.rkana(8),'＃新','new');
// console.log(be.filename,be.data)
 //console.log(be)
}
function drawTop(el,o){
 let prog3000=fn.q('.c[lay="prog"]').cloneNode(true).set({value:30,max:100})
 ,proglabel=fn.ce('label').set({textContent:'Lv010[1000/3000]'})
 ,vw={}
 ;
  vw.rate2=(now,max,l)=>{
  let a=(now.toString().length>l)?now:fn.pad(now,l)
  return '['+a+'/'+fn.pad(max,l)+']'
 } //overflow [04/50] 
 ;
 let calc=function(ev){
  let l=Object.keys(ev.data).length;
   let sum=Object.keys(ev.data).map(d=>{return ev.data[d].l}).reduce((a,b)=>{return a+b});
   prog3000.value=l;//sum;
   proglabel.textContent='Lv'+fn.pad(l,3)+vw.rate2(sum,3000,4)
   //console.log(l,sum)//vw.rate2
 }
 ;
 minibtn(el)
  .cl('SYSTEM BARL')
  .rt(proglabel).rt(prog3000)
  .end()
 ;
 o.data.prog3000De =_.debounce(calc,300); 
}
function drawList1(el,o){
 fn.range(20).forEach((d,i)=>{
  fn.q(`.a[lay="f"]`).cloneNode(true)
   .set({textContent:i})
   .a2(el);  
 })
}
/*
function drawList2(el,o){
 fn.range(20).forEach((d,i)=>{
  fn.q(`.a[lay="f"]`).cloneNode(true)
   .set({textContent:'xxxxx'+i})
   .a2(el);  
 })
}
function drawList3(el,o){
 fn.range(20).forEach((d,i)=>{ 
  fn.q(`.a[lay="f"]`).cloneNode(true)
   .set({textContent:'yyyy'+'o'})
   .a2(el);  
 })
}
*/
