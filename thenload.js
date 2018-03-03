(function(root){
 /*v0.1 if caller not,then input the nullcaller*/
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
  function entry(ary,caller){return new Promise(sol=>{
    const length =ary.length,rate=(n=> 100*(length-n.length)/length);
    let a=ary.slice().reverse()
    ,c =(caller)?caller:function(){/**/return}
    ,on=function(ev){
      let old=a.slice()
      let url =a.pop();//
      c({url:url,ary:old,max:length,rate:rate(old),ev:ev});     
      if(url) adpt(url,on)
      else sol(ary) 
    }
    ;
    let old=a.slice()
    let url=a.pop();//
    if(url) adpt(url,on)
    else console.log('ary not!')
    ;
    c({url:url,ary:old,max:length,rate:rate(old)}); 
  })}
 ;
  root.thenload =entry
  ;
  /*usage
thenload([
   '//gnjo.github.io/md5.min.js'
  ,'//gnjo.github.io/use.js'
],caller).then(d=>{
  console.log('end',d)
})  
  */
})(this);
