(function(root){
 /* 
https://cdnjs.cloudflare.com/ajax/libs/superagent/3.8.2/superagent.js
//gnjo.github.io/js-base64/base64.min.js
//gnjo.github.io/md5.min.js
 */
 var req =root.superagent
 ,md5 = root.md5
 //,btoa =root.btoa  //multi byte Base64 is good.
 ,Base64 =root.Base64
 ,JSON =root.JSON 
 ,performance=root.performance
 ,Date =root.Date
 ,now =function(time){
    if(time) return new Date(time).toISOString().split('.')[0] +'Z';
    else return new Date( Date.now() ).toISOString().split('.')[0] +'Z';
   }
 ,caesar = function(str, amount) {
    const a= (amount < 0)? amount + 26:amount
    ,fc=String.fromCharCode
    ,fn=( d=>((d >= 65) && (d <= 90))?fc(((d - 65 + a) % 26) + 65):fc(((d - 97 + a) % 26) + 97) )
    ;
    return str.split('').map( d=>(d.match(/[a-z]/i) )?fn(d.charCodeAt(0)):d ).join('')
   } 
 ,crypto =function(obj){
    return caesar( Base64.encodeURI( JSON.stringify(obj) ) ,21) ;
    //return str
   }
 ,decrypto=function(str){
    return JSON.parse( Base64.decode( caesar(str,-21) ) );
    //return obj
 }
 ,jsy =function(obj){return JSON.stringify(obj)}
 ,jps =function(str){return JSON.parse(str)}
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
    .query({_:Date.now() +''+performance.now().toString().replace('.','') }) //no-chash
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
   .query({_:Date.now() +''+performance.now().toString().replace('.','') }) //no-chash
   .then(res=>res.body)
 }
 
 function modload(info){
  let o={};
    //util
    o.caesar=caesar
    o.crypto=crypto 
    o.decrypto=decrypto
    o.jsy=jsy 
    o.jps=jps
    //
    o.caller =function(ev){ /*ev.type,ev.target,ev.data*/ }
    //
    o.info =info;
    o.files = info.d.files;
    o.data =info.d;
    o.read = function(f){
     o.caller({type:'read',target:f,data:o.data})//
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
      .then((d)=>{
        o.caller({type:'write',target:data,data:o.data})   
      ;return d
     })
    }
    
    o._update =function(){
      return search(o.info).then((d)=>{ 
       o.data=d; //
       o.files=d.files; //
       o.caller({type:'_update',target:o.files,data:o.data}) //
       return o.files
      })
    }
    o.isSame = function(f,cdata){
     let flg = (f in o.files)? (md5(o.files[f]) == md5(cdata)) : false;
     o.caller({type:'isSame',target:flg,data:o.data}) //
     return flg;
    } 
    
    //.query({_:Date.now() +''+performance.now().toString().replace('.','') }) //no-chash
    //first update be need;
    return o._update().then(()=>o);
 }
 
 function entry(u,p,desc,public=false){
  let h ={
//   'authorization':`Basic ${btoa(u +':' +p)}`
   'authorization':`Basic ${Base64.encodeURI(u +':' +p)}`   
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
