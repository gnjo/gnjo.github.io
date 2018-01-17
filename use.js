var fn=this.fn||{};
 fn.g=(s)=>{return document.getElementById(s)};
 fn.q=(s)=>{return document.querySelector(s)};
 fn.rnum=(l=8)=>{
  var c = "123456789";//0を含めない方が都合が良い
  var cl=c.length;
  var r = "";
  for(var i=0; i<l; i++){
      r += c[Math.floor(Math.random()*cl)];
  } 
   return r;
 };
 fn.rword=(l=8)=>{
  var c = "abcdefghijklmnopqrstuvwxyz0123456789";
  var cl=c.length;
  var r = "";
  for(var i=0; i<l; i++){
      r += c[Math.floor(Math.random()*cl)];
  } 
   return r;
 };
fn.rkana=(l=8)=>{
  var c = "abcdefghijklmnopqrstuvwxyz",cl=c.length;
  var b = "aiueo",bl=b.length;
  var r="";
  for(var i=0;i<l;i++){
   r+=(i%2)? b[Math.floor(Math.random()*bl)]:c[Math.floor(Math.random()*cl)];
  }
  return r;   
 }

fn.i=function(html,f,doc=document){
  var _f =(f)?f:(el)=>{return el};
  if(typeof html !=='string') return _f(html);
  //
  var el=doc.createElement('table');
  el.innerHTML=html;
  var me=el.childNodes[0];
  return _f(me);
}

if(this.md5){ 
 var hashColor=((s)=>{ return '#'+md5(s).slice(0,6) });
 fn.hashColor=hashColor;
}
if(this.invert) fn.invertColor=invert;
