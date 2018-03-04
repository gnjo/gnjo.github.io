
(function(root){
  /*
<div class="card">
  <div class="nav"><label class="tag">tag</label><label  class="time">YYYY/MM/DD mm:hh</label><label class="btn">btn</label></div>
  <div class="title">title</div>
  <div class="desc">アグレロは独り荒野にいた。仲間は少なくなった。それでもついてきてくれていた。期待を裏切ることはできない。アグレロはまだ走っていた。休むわけにはいかない。
</div>  
</div>  
  */
  let fn={};
  fn.q=(d=>document.querySelector(d))
  fn.ce=(d=>document.createElement)
  fn.jpTime=(timestamp=Date.now())=>{
      return new Date(timestamp+1000*60*60*9)
        .toISOString()
        .replace(/-/g,'/')
        .replace('T',' ')
        .slice(0,'YYYY/MM/DD hh:mm'.length)
      ;
  }
  fn.i=function(html,f,doc=document){
    var _f =(f)?f:(el)=>{return el};
    if(typeof html !=='string') return _f(html);
    //
    var el=doc.createElement('table');
    el.innerHTML=html.trim();
    var me=el.childNodes[0];
    return _f(me);
  }
  
  function fac(size){
    return fn.i(`
<div class="card ${size}">
  <div class="nav"><label class="tag"></label><label class="time"></label><label class="btn"></label></div>
  <div class="title"></div>
  <div class="desc"></div> 
</div>
`);
  }
  function entry(size){
    let o={}
    o.fn=fn;
    o.el = fac((size)?'min':'')
    ;['nav','tag','time','btn','title','desc'].forEach(d=>o[d]=o.el.querySelector('.'+d))
    ;
    return o;
  }
  root.card =entry
})(this);
