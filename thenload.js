(function(root){
 let isScript =(s)=>{return /.js$/.test( s.split('?')[0])}
 ,ce=(d=>document.createElement(d))
 ,q=(d=>document.querySelector(d))
 ,incss =(url,caller)=>{
   let el=ce('link');
   el.setAttribute('rel','stylesheet');
   el.onload=caller;el.onerror=caller;
   q('head').appendChild(el);
   el.href=url
 }
 ,inscript =(url,caller)=>{
   let el=ce('script');
   el.onload=caller;el.onerror=caller;
   q('head').appendChild(el);
   el.src=url
 }
 ,adpt =(url,caller)=>{
    isScript(url)?inscript(url,caller):incss(url,caller)   
 }
 ;
  function entry(ary){return new Promise(sol=>{
    let a=ary.slice().reverse()
    ,on=function(ev){
      let url =a.pop();//
      if(url) adpt(url,on)
      else sol(ary) 
    }
    ;
    let url=a.pop();//
    if(url) adpt(url,on)
    else console.log('ary not!')
    ;
  })}
 ;
  root.thenload =entry
  ;
  /*usage
thenload([
   '//gnjo.github.io/md5.min.js'
  ,'//gnjo.github.io/use.js'
]).then(d=>{
  console.log('end',d)
})  
  */
})(this);
