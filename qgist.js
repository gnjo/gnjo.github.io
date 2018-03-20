(function(root){
 /*v0.1 _update()
  v0.2 null read
  v1.0 launched!
 */
 var fn={},is={}
 is.url=(d)=>{return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(d)}
 is.jsonString =function(d){ try{JSON.parse(d);return true}catch(e){return false} } 
 ;
 fn.hashCode =(s)=>{var h=0;for(var i=0;i < s.length; i++) h = h * 31 + s.charCodeAt(i)|0;return h}
 fn.mic12 =(s)=>{var d= fn.hashCode('GGGGGG'+s),a =d.toString(16).slice(-6);return a+a}
 fn.jpTime=(timestamp=Date.now())=>{
 return new Date(timestamp+1000*60*60*9)
  .toISOString().replace(/-/g,'/').replace('T',' ').slice(0,'YYYY/MM/DD hh:mm'.length)
 }
 fn.gistinfo=(r)=>{
  let ma =/https:\/\/gist.githubusercontent.com\/(.+)\/(.+)\/raw\/(.+)\/(.+)$/,a=r.match(ma)
  return {url:r,user:a[1],id:a[2],filename:a[4]}  
 }
 ;
 var o={}
 /*util*/
 o.fn=fn; o.is=is;
 ;/*data*/
 o.sysname='___qgist___'
 o.authflg=false;
 o.user={}
 o.data={}
 o.public=false;
 o.micdesc=null
 o.authstr=null
 o.desc=null
 o.targeturl=null
 ;/*inner*/
 o._update=()=>{
  if(!o.targeturl){console.log('not targeturl');return }
  ;
  let str =o.authstr
  ,url =o.targeturl
  ,opt={method:'GET',mode:'cors',headers:{"Authorization":str}}
  return fetch(url,opt).then(d=>d.json()).then(d=>{
   o.data =d;
   o.caller({url:url,opt:opt,type:'_update',ret:o.data})   
   return o.data;
  })
 }
 o._create=()=>{
 let filename=o.sysname
 ,content=o.fn.jpTime()
 ,desc =`${o.micdesc}  ${o.desc}`
 ,body =JSON.stringify({
  public: o.public
  ,description: desc
  ,files:{
   [filename]:{content: content}
  }
 })
 ,url="https://api.github.com/gists"
 ,opt={method:'POST',mode:'cors',headers:{"Authorization":o.authstr},body:body}
 ;
  return fetch(url,opt).then(d=>d.json()).then(d=>{
    o.data=d
    o.targeturl=d.url;
    o.caller({url:url,opt:opt,type:'_create',ret:o.data})
    return o.data;
  })
 }
 o._searchall=(max=20)=>{return new Promise(sol=>{
  let ary=[],i=1
  ,str =o.authstr
  ,url =`https://api.github.com/users/${o.user.login}/gists`
  ,opt={method:'GET',mode:'cors',headers:{"Authorization":str}}
  ,f=()=>{
   let u=`${url}?page=${i}`
   ,loop =(d)=>{
      if(d.length==0) return sol(ary)
      ;[].push.apply(ary,d);
      if(i>max) return sol(ary)
      i++;
      return f()
   }
   ;
   return fetch(u,opt).then(res=>res.json()).then(loop)
 }
 ;
 f()///
 ;
 })}
 o._user=function(){
   let url='https://api.github.com/user'
   ,opt={headers:{'authorization':o.authstr}}
   ,calc=(d)=>{
    o.user=d;
    o.caller({url:url,opt:opt,type:'_user',ret:o.user})    
    return d;
   }
   ;
   return fetch(url,opt).then(d=>d.json())
    .then(calc)
 }
 o._auth=function(){
  let url='https://api.github.com/gists/public'
  ,opt={method:"HEAD",mode:"cors",headers:{"Authorization":o.authstr}}
  ,check=(d=>d.status!=401&&d.ok)
  ,_check=(d=>d.headers.get('X-RateLimit-Limit')!=60)
  ,calc=(d=>{
     if(d) o.authflg=true;
     o.caller({url:url,opt:opt,type:'_auth',ret:o.authflg})
     return d;
  })
  ;
  return fetch(url,opt)
    .then(_check)
    .then(calc)
    .then(o._user)
  ;
}
 ;/*common*/
 o.caller=function(obj){}
 o.set=(desc,authstr)=>{
  o.desc=desc;
  o.micdesc=o.fn.mic12(desc);
  o.authstr=authstr;
  if(!o.desc || !o.authstr){console.log('desc or authstr not');return}
  ;
  let calc=(d=>{
     let a=d.filter(d=>~d.description.indexOf(o.micdesc))
     if(a&&a.length!=0){
      o.data=a[0]
      o.targeturl=a[0].url;
      o.caller({url:null,opt:null,type:'_searchall',ret:a[0]})
      return o._update()
     }else{
      return o._create()      
     }
  })
  ;
  return o._auth().then(o._searchall)
   .then(calc)
 } 
 o.isAuth=()=>{return o.authflg}
 o.isFile=(file)=>{
  if(!o.isAuth()){console.log('not auth');return false}
  return o.data.files[file]?true:false;
 }
 o.read=(file)=>{
  //file or url
  let url=o.is.url(file)?file: o.data.files[file]?o.data.files[file].raw_url:null
  ,calc=(d)=>{
   o.caller({url:url,opt:null,type:'read',ret:d})   
   return d;
  }
  if(!url) return Promise.resolve(null) //bug fix;
  return fetch(url).then(d=>d.text())
   .then(calc)
 }
 o.write=(file,data)=>{
  let filename=o.is.url(file)? o.fn.gistinfo(file).filename :file
  ,content=data
  ,body =JSON.stringify({
   files:{
   [filename]:{content: content}
  }
 })
 ,url=o.targeturl
 ,opt={method:'PATCH',mode:'cors',headers:{"Authorization":o.authstr},body:body}
 ;
  return fetch(url,opt).then(d=>d.json()).then(d=>{
    o.data=d
    o.caller({url:url,opt:opt,type:'write',ret:o.data})
    return o.data;
  })
      
 }
 ;
 root.qgist=o;
})(this)
