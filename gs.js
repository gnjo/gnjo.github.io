(function(root){ 
 
 var entry =function(u,p){
  let gists ={}
  //
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
   ,headers = this.headers
   ,o={
    method:'GET'
    ,headers:headers
    //,body:JSON.stringify(b)
   }
   ,f =this.f
   ;
   console.log(this.headers)
   return f(url,o)
  }
  gists.create =function(data){
   let url="https://api.github.com/gists"
   ,headers = this.headers
   ,o={
    method:'POST'
    ,headers:headers
    ,body:JSON.stringify(data)
   }
   ,f =this.f
   ;   
   return f(url,o)  
  }
  //https://api.github.com/gists/
  gists.update =function(id,data){
   let url="https://api.github.com/gists/" + id
   ,headers = this.headers
   ,o={
    method:'PATCH'
    ,headers:headers
    ,body:JSON.stringify(data)
   }
   ,f =this.f
   ;   
   return f(url,o)  
  }
  gists.get =function(id){
   let url="https://api.github.com/gists/" + id
   ,headers = this.headers
   ,o={
    method:'GET'
    ,headers:headers
    //,body:JSON.stringify(data)
   }
   ,f =this.f
   ;   
   return f(url,o)  
  }
  // "https://api.github.com/users/"+gs.u+"/gists";
  gists.search =function(){
   let u= this.username
   ,url=`https://api.github.com/users/${u}/gists`
   ,headers = this.headers
   ,o={
    method:'GET'
    ,headers:headers
    //,body:JSON.stringify(data)
   }
   ,f =this.f
   ;
   //console.log(u)
   return f(url,o)  
  }

  //
  //
  gists.getFile=function(id,fname){
   return this.get(id).then((d)=>{
    return (fname in d.files)? d.files[fname] : Promise.reject(404)
   })
  }
  gists.updateFile=function(id,fname,content){
   let data={"files": { } }
   data.files[fname] = {"content": content}
   //console.log(data)
   return this.update(id,data)
  }
  gists.searchId =function(desc){
   let u= this.username
   ,url=`https://api.github.com/users/${u}/gists`
   ,headers = this.headers
   ,o={
    method:'GET'
    ,headers:headers
    //,body:JSON.stringify(data)
   }
   ,f =this.f
   ;
   //console.log(u)
   return f(url,o)
    .then((d)=>{return d.filter(d=> ~d.description.indexOf(desc) ).map(d=>d.id).slice(0,1) })
    .then((d)=>{return (d.length===1)? d: Promise.reject(404) })
  }
  
   return gists;
 }
 
 root.gs = entry;
})(this)
