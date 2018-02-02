(function(root){ 
 
 var entry =function(u,p){
  let gists ={}
  //
  gists.jsy =JSON.stringify;
  gists.authstring = window.btoa(u + ":" + p);
  gists.username = u;
  gists.password  =p;
  gists.headers ={
     "Authorization":"Basic " + gists.authstring
     ,'Accept': 'application/json'
     ,'Content-Type': 'application/json'
    }
  
  gists.f =function(url,o){
   return fetch(url,o).then((d)=>{
    if(d.ok) return Promise.resolve(d).then(d=>d.json())
    else return Promise.reject(d.status)
   })
  }
  
  gists.auth =function(){
   let url="https://api.github.com/authorizations"
   ,o={
    method:'GET'
    ,headers: gists.headers
    //,body:JSON.stringify(b)
   }
   ;
   return gists.f(url,o)
  }
  gists.create =function(data){
   let url="https://api.github.com/gists"
   ,o={
    method:'POST'
    ,headers: gists.headers
    ,body: gists.jsy(data)
   }
   ;   
   return gists.f(url,o)  
  }
  //https://api.github.com/gists/
  gists.update =function(id,data){
   let url="https://api.github.com/gists/" + id
   ,o={
    method:'PATCH'
    ,headers: gists.headers
    ,body: gists.jsy(data)
   }
   ;   
   return gists.f(url,o)  
  }
  gists.get =function(id){
   let url="https://api.github.com/gists/" + id
   ,o={
     method:'GET'
    ,headers: gists.headers
    //,body:JSON.stringify(data)
   }
   ;   
   return gists.f(url,o)  
  }
  // "https://api.github.com/users/"+gs.u+"/gists";
  gists.search =function(){
   let url=`https://api.github.com/users/${ gists.username }/gists`
   ,o={
     method:'GET'
    ,headers:gists.headers
    //,body: gists.jsy(data)
   }
   ;
   return gists.f(url,o)  
  }

  //
  gists.getFile=function(id,fname){
   return gists.get(id).then((d)=>{
    return (fname in d.files)? d.files[fname] : Promise.reject(404)
   })
  }
  gists.updateFile=function(id,fname,content){
   let data={"files": { } }
   data.files[fname] = {"content": content}
   //console.log(data)
   return gists.update(id,data)
  }
  gists.searchId =function(desc){
   let url=`https://api.github.com/users/${ gists.username }/gists`
   ,o={
    method:'GET'
    ,headers:gists.headers
    //,body:gists.jsy(data)
   }
   ;
   //console.log(u)
   return gists.f(url,o)
    .then((d)=>{return d.filter(d=> ~d.description.indexOf(desc) ).map(d=>d.id).slice(0,1) })
    .then((d)=>{return (d.length===1)? d: Promise.reject(404) })
  }
  
  /////need md5
   gists.md5 =md5||function(d){return d};
   gists.now =function(time){
    if(time) return new Date(time).toISOString().split('.')[0] +'Z';
    else return new Date( Date.now() ).toISOString().split('.')[0] +'Z';
   }
   gists.place =function(obj){
    //return gists.id
    var o=obj;
    if(o.id){ 
     return gists.get(o.id).then((d)=>{
       gists.id=o.id;
       return gists.id;
     });
    }else if(o.desc){
     return gists.searchId(o.desc).then((d)=>{
      gists.id = d;
      return gists.id;
     }).catch((d)=>{
      console.log(`create place=>${o.desc}`);

      var data={
       "description": `${gists.md5(o.desc)}  ${o.desc}`,
       "public": o.public||false,
       "files": {
         "___gists.place___": {
           "content": gists.now()
         }
       } 
     };
      return gists.create(data).then((d)=>{
       console.log(d,'create',d.id)
       gists.id = d.id;
       return gists.id;
      })

     })
    }else{
     //create place
     console.log('need desc name. if decide, create the place on gist.');
      return Promise.reject(400)
    }

   }
   gists.placeGet =function(ary){
     let id =gists.id
     ;
     gists.get(id).then((d)=>{ 
      return ary.filter(f=>(f in d.files)).map(f=>d.files[f]) || Promise.reject(404)
     })
   }
   gists.sharrow =function(ary){ 
     let data={"files":{} }
     ,id =gists.id
     ;
     ary.forEach((d)=>{ data.files[ary] = {"content":localStorage.getItem(d)};  })
     //console.log(id,data)
     return gists.update(id,data);
   }
  
  /////
   return gists;
 }
 
 root.gs = entry;
})(this)
