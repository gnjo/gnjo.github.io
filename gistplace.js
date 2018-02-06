(function(root){
 var req =root.superagent
 ,md5 = root.md5
 ,btoa =root.btoa
 ,now =function(time){
    if(time) return new Date(time).toISOString().split('.')[0] +'Z';
    else return new Date( Date.now() ).toISOString().split('.')[0] +'Z';
   }
 ;
 function gistauth(info){
   let url="https://api.github.com/authorizations"
   ;
  return req.get(url).set(info.h)
    .then((res)=>{console.log(res.ok);return info})
   ;
}
 function desccheck(info){
  let url=`https://api.github.com/users/${ info.u }/gists`
  ;
  return req.get(url).set(info.h)
    .then(res=>res.body)
    .then((d)=>{return d.filter(d=> ~d.description.indexOf(info.desc) ).slice(0,1) }) //bug fix
    .then((d)=>{return (d.length===1)? d[0]: creategist(info) })
    .then((d)=>{  info.id =d.id; info.d=d; return info})
   ;
  
 }
 function creategist(info){
 let url="https://api.github.com/gists"
 ,data={
       "description": `${info.hash}  ${info.desc}`,
       "public": info.public,
       "files": {
         "___gistplace___": {
           "content": now()
         }
       }
  }
 ;   
 return req.post(url).set(info.h)
  .send(data)
  .then(res=>res.body)
 }
 
 function search(info){
   let url="https://api.github.com/gists/" + info.id
   ;
   return req.get(url).set(info.h)
   .then(res=>res.body)
 }
 
 function modload(info){
  let o={};
    o.info =info;
    o.files = info.d.files;
    o.data =info.d;
    o.read = function(f){
     return (f in o.files)?o.files[f]:null
    }
    
    o.write= function(f,d){     
     let data={"files": { } }
      //data.files[f] = {"content": d}  //multi write
     ;
     if(Array.isArray(f)){
       f.forEach((a)=>{ data.files[ a[0] ] ={"content":a[1] } })
     }else if(f && d){
      data.files[f] = {"content": d}
     }else{ 
      console.log('write param differ') ;return;
     }
     ;//multi write
     let info =o.info
     ,url="https://api.github.com/gists/" + info.id
     ;
     return req.patch(url).set(info.h).send(data)
      .then(o._update)
    }
    
    o._update =function(){
      return search(o.info).then((d)=>{ 
       console.log('update');
       o.data=d; //
       o.files=d.files; //  
       return o.files
      })
    }
    o.isSame = function(f,cdata){
     return (f in o.files)? (md5(o.files[f]) == md5(cdata)) : false;
    }  
    
    //first update be need;
    return o._update().then(()=>o);
 }
 
 function entry(u,p,desc,public=false){
  let h ={
   'authorization':`Basic ${btoa(u +':' +p)}`
   ,'accept':'application/json'
   ,'content-type':'application/json'
  }
  ,info = {
   u:u
   ,p:p
   ,desc:desc
   ,hash:md5(desc)
   ,id:''
   ,h:h,public:public}
  ;
  return gistauth(info)
   .then(desccheck)
   .then(modload)
   .catch((d)=>null)
  }
 
 root.gistplace =entry;///
 
})(this);

/*
var g=null
,u='gnjo'
,p='XXXXXXX'
,desc ='testdemo'
,flg =false
;
gistplace(u,p,desc,flg).then((d)=>{
  g = d;
  console.log(d);
  log(g.files)
  //g.write('xxxx','aiuewo kakikukeko').then((d)=>{
  // log(g.files)
  //})
  
})
*/
