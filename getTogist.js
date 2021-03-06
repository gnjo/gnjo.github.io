;(function(root){
 /*history
 v1.0 multiple user 
 v1.1 to.togistdebug

 */

 function entry(u,a){
  'use strict';
  ;
  var to={}
  var gists={}
  gists.user=u
  gists.authstring=a //basic ...........
  gists.headers={
   "Authorization":gists.authstring
   ,'Accept': 'application/json'
   ,'Content-Type': 'application/json'
  }
  gists.jsy=JSON.stringify
  gists.f=function(url,o){return fetch(url,o).then((d)=>{
   if(d.ok) return Promise.resolve(d).then(d=>d.json())
   else return Promise.reject(d.status)
  })}
  gists.create=function(data){
   let url="https://api.github.com/gists"
   ,o={
    method:'POST'
    ,headers: gists.headers
    ,body: gists.jsy(data)
   }
   ;   
   return gists.f(url,o)  
  }
  gists.update=function(id,data){
   let url="https://api.github.com/gists/" + id
   ,o={
    method:'PATCH'
    ,headers: gists.headers
    ,body: gists.jsy(data)
   }
   ;   
   return gists.f(url,o)  
  }
  gists.searchid=function(url,o){return gists.f(url,o) }
  gists.search=gists.searchid;

  to.togistdebug=false;

  //ary=[[c,f],[c,f]]... c is content, f is filename
  to.togist2=(async (_ary,gistid,desc)=>{

   //let fname= filename||'anonymous'
   let ary =_ary
   ,data={"files": { } }
   if(desc) data.description=desc; //bug fix desc
   data.public=false
   ary.map(d=>{
    let content=d[0],fname=d[1];
    if(to.togistdebug){
     console.log('content length',content.length)
     console.log('fname',fname)
    }

    data.files[fname] = {"content": content}
   })
   ;
   var ret =(gistid)?await gists.update(gistid,data) :await gists.create(data)
   ;
   if(to.togistdebug){
    console.log('gistid',ret.id)
    console.log('gist url',ret.html_url)
   }
   return ret;
  });


  to.togist=(async (content,gistid,filename,desc)=>{

   let fname= filename||'anonymous'
   ,data={"files": { } }
   if(desc) data.description=desc; //bug fix desc
   data.public=false
   data.files[fname] = {"content": content}
   ;
   var ret =(gistid)?await gists.update(gistid,data) :await gists.create(data)
   ;
   if(to.togistdebug){
    console.log('gistid',ret.id)
    console.log('filename',fname)
    console.log('gist url',ret.html_url)
   }
   return ret;
  });

  to.togistsearch=(async (gistid,file)=>{
   //search id
   let url ="https://api.github.com/gists/" + gistid
   ,o={method:'GET',mode:'cors',headers:gists.headers}
   var ret =await gists.searchid(url,o)
   ;
   if(to.togistdebug) console.log('url',url);
   if(!file) return ret;
   return ret.files[file].raw_url 
  })
  to.togistpage=(async (num)=>{
   let _num=num||'1'
   ,user=gists.user
   ,url =`https://api.github.com/users/${user}/gists?page=${_num}`
   ,o={method:'GET',mode:'cors',headers:gists.headers}
   ;
   var ret =await gists.search(url,o)
   ;
   if(to.togistdebug) console.log('url',url)
   return ret;

  });

  return Object.assign({},to,gists)
 }

 root.getTogist=entry;
})(this);
