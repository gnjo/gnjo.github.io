(function(root){
 var md5 = root.md5
 ,JSON =root.JSON
 ,localStorage = root.localStorage
 ,location = root.location
 ;
 var entry = function(){
  let o = {}
  ;
  o.jsy =( (s)=>JSON.stringify(s) );
  o.jps =( (s)=> JSON.parse(s) );
  o.g =( (k)=>localStorage.getItem(k));
  o.s =( (k,v)=>localStorage.setItem(k,v));
  o.hash = md5(location.origin + location.pathname);
  //o.data = null;
  o.load =(k)=>{return (k)? o.data[k] :o.jps( o.g(o.hash) ) }
  o.save =(k,v)=>{
    //console.log(o.data)
    o.data[k] =v;
    o.s(o.hash, o.jsy(o.data));
    return o.jps( o.g(o.hash) );
  }
  o.isKey=(k)=>{return (o.data[k])?true:false }
  
  if( !o.g(o.hash) ){
   o.s(o.hash, o.jsy( {}))
  }
  o.data = o.load();
  
  return o;
 }
 
 root.lohash = entry;
 
 })(this);
