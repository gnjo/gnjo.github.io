function run(el){
 var data= el.src.split('?q=');
 var baseurl =data[0].slice(0, data[0].lastIndexOf('/')+1 );
 var t =el.parentNode; 
 var ary = data[1].trim().split('|');
 
 ary.forEach((d)=>{
 var url=d.split('?')[0];
 if(~url.indexOf('.js')){
  var el= document.createElement('script');
  t.appendChild(el);
  el.src=baseurl+d;
 }else if(~url.indexOf('.css')){
  var el = document.createElement('link');
  el.setAttribute('rel','stylesheet');
  t.appendChild(el);
  el.setAttribute('href',baseurl+d);  
 }
 
})
 
 
 
}
