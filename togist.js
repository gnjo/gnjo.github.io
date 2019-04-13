this.togist=(async (content,gistid,filename)=>{
 var gists={},am=9
 ;
 const caesar = function(str, amount) {
  const a= (amount < 0)? amount + 26:amount
  ,fc=String.fromCharCode
  ,fn=( d=>((d >= 65) && (d <= 90))?fc(((d - 65 + a) % 26) + 65):fc(((d - 97 + a) % 26) + 97) )
  ;
  return str.split('').map( d=>(d.match(/[a-z]/i) )?fn(d.charCodeAt(0)):d ).join('')
 }
 ;
 gists.authstring='I25zkiyWHGWqIwEcjCNhViZ='
 gists.headers ={
  "Authorization":"Basic " + caesar(gists.authstring,-1*am)
  ,'Accept': 'application/json'
  ,'Content-Type': 'application/json'
 }
 gists.jsy =JSON.stringify;
 gists.f =function(url,o){
  return fetch(url,o).then((d)=>{
   if(d.ok) return Promise.resolve(d).then(d=>d.json())
   else return Promise.reject(d.status)
  })
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
 ;
 let fname= filename||'anonymous'
 ,data={"files": { } }
 data.files[fname] = {"content": content}
 ;
 var ret =(gistid)?await gists.update(gistid,data) :await gists.create(data)
 ;
 console.log('gistid',ret.id)
 console.log('filename',fname)
 console.log('gist url',ret.html_url)
 return ret;
 });


this.togistsearch=(async (gistid,file)=>{
 //search id
  var gists={},am=9
 ;
 const caesar = function(str, amount) {
  const a= (amount < 0)? amount + 26:amount
  ,fc=String.fromCharCode
  ,fn=( d=>((d >= 65) && (d <= 90))?fc(((d - 65 + a) % 26) + 65):fc(((d - 97 + a) % 26) + 97) )
  ;
  return str.split('').map( d=>(d.match(/[a-z]/i) )?fn(d.charCodeAt(0)):d ).join('')
 }
 ;
 gists.authstring='I25zkiyWHGWqIwEcjCNhViZ='
 gists.headers ={
  "Authorization":"Basic " + caesar(gists.authstring,-1*am)
  ,'Accept': 'application/json'
  ,'Content-Type': 'application/json'
 }
 gists.jsy =JSON.stringify;
 gists.f =function(url,o){
  return fetch(url,o).then((d)=>{
   if(d.ok) return Promise.resolve(d).then(d=>d.json())
   else return Promise.reject(d.status)
  })
 }
 
 gists.searchid=function(url,o){
   return gists.f(url,o)    
 }
 
  let url ="https://api.github.com/gists/" + gistid
  ,o={method:'GET',mode:'cors',headers:gists.headers}
 var ret =await gists.searchid(url,o)
 ;
 console.log('url',url)
 if(!file) return ret;
 var ret2=ret.files[file].raw_url
 return ret2; 
})

this.togistpage=(async (num)=>{
 
  var gists={},am=9
 ;
 const caesar = function(str, amount) {
  const a= (amount < 0)? amount + 26:amount
  ,fc=String.fromCharCode
  ,fn=( d=>((d >= 65) && (d <= 90))?fc(((d - 65 + a) % 26) + 65):fc(((d - 97 + a) % 26) + 97) )
  ;
  return str.split('').map( d=>(d.match(/[a-z]/i) )?fn(d.charCodeAt(0)):d ).join('')
 }
 ;
 gists.authstring='I25zkiyWHGWqIwEcjCNhViZ='
 gists.headers ={
  "Authorization":"Basic " + caesar(gists.authstring,-1*am)
  ,'Accept': 'application/json'
  ,'Content-Type': 'application/json'
 }
 gists.jsy =JSON.stringify;
 gists.f =function(url,o){
  return fetch(url,o).then((d)=>{
   if(d.ok) return Promise.resolve(d).then(d=>d.json())
   else return Promise.reject(d.status)
  })
 }
 
 gists.search=function(url,o){
   return gists.f(url,o)    
 }
 
 let _num=num||'1'
  ,user='gnjo'
  let url =`https://api.github.com/users/${user}/gists?page=${_num}`
  ,o={method:'GET',mode:'cors',headers:gists.headers}
  ;
 var ret =await gists.search(url,o)
 ;
 console.log('url',url)
 return ret;
 
});


