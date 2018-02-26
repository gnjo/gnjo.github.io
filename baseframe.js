(function(root){
  let fn={},is={};
  fn.i=function(html,f,doc=document){
    var _f =(f)?f:(el)=>{return el};
    if(typeof html !=='string') return _f(html);
    //
    var el=doc.createElement('table');
    el.innerHTML=html;
    var me=el.childNodes[0];
    return _f(me);
  }
  fn.ce=(d=>document.createElement(d))
  is.element=function(o){return !!(o && o.nodeType === 1)} 
  
  function resizer(l,g,r) {
    var left = is.element(l)? l: document.querySelector(l)
    ,right =is.element(r)? r: document.querySelector(r)
    ,handler = is.element(g)? g:document.querySelector(g)
    ,hammer = new Hammer(handler, {recognizers: [
        [Hammer.Pan, { threshold: 0}]
    ]})
    ,hw =handler.clientWidth
    ,startWidth,startWidth2
    ;
    handler.onmousedown= (e)=>{e.preventDefault()};
    hammer.on('panstart', function(e) {
        startWidth = left.clientWidth;
        startWidth2 =right.clientWidth;
    });

    hammer.on('panmove', function(e) {
        left.style.width = (startWidth + e.deltaX) + 'px';
        right.style.width = (startWidth2 - e.deltaX) +'px'
    })    
}

  function dialogcss(){
    return ``;
  }
  function dialogctrl(){
    let count =10000,search='modal',add='show';
    let p=document.body,dialog=document.getElementsByClassName(search);
    function next(flg=1){
      let a =[].slice.call(dialog);a.unshift(null),len=a.length;
      if( a[count%len]) a[count%len].classList.remove('show');  
      count += flg;
      if(count ==0) count =10000;
      if( a[count%len]) a[count%len].classList.add('show');
    }
    p.onkeydown =function(ev){
      if(ev.target === p && ev.ctrlKey){
        if(dialog.length===0) return;
        if(ev.keyCode ===37) next(-1);
        else if(ev.keyCode ===39) next(1);
      }
    }
    
  }
  
  function css(){
    return ``
  }
  function entry(target){
    let o={};
    o.src='https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js';
    o.t = is.element(target)? target : document.querySelector(target);
    o.css=css() +';'+ dialogcss(); 
    o.c =fn.ce('style'); o.c.innerHTML=o.css;
    o.s =fn.ce('script');
    o.f =fn.ce('div'); o.f.classList.add('frame')
    o.l =fn.ce('div'); o.l.classList.add('left')    
    o.r =fn.ce('div'); o.r.classList.add('right')
    o.g =fn.ce('div'); o.g.classList.add('gutter')
    ;let h =document.querySelector('head');
    ;[o.c].forEach(d=>h.appendChild(d))
    ;[o.s,o.l,o.g,o.r].forEach(d=>o.f.appendChild(d));
    o.s.onload =function(ev){resizer('.left','.gutter','.right')}
    o.s.src=o.src;
    o.t.appendChild(o.f);
    o.t.classList.add('baseframe')
    dialogctrl();
    o.add =(pos='left',element)=>{
      let my =is.element(element)? element : fn.i(element);
      if(pos ==='left'){
        o.l.appendChild(my);return my;
      }
      else{
        let el =fn.ce('dialog');el.classList.add('modal');
        el.appendChild(my);
        o.r.appendChild(el);return el;
      }
    }
    o.addToRight=(element)=>{return o.add('right',element)}
    o.addToLeft=(element)=>{return o.add('left',element)}
    return o;
  }
  root.baseframe=entry;
  root.sys =root.sys||{}
  /*usage
let o=baseframe(document.body)
,right=o.r
,left=o.l
,gutter=o.g
;
//right.classList.add('white-layer')
//right.classList.add('unborder')
//gutter.classList.add('white-layer')
//gutter.classList.add('unborder')

'1234567'.split('').map(d=>{
  let el =document.createElement('section')
  ,el2=document.createElement('dialog')
  ;el2.classList.add('modal')
  el2.innerHTML=d;
  right.appendChild(el2)
  left.appendChild(el)
})
  */
/*
'1234567'.split('').map(d=>{
  
  o.addToLeft('<section></section>')
  o.addToRight(`<div>${d}</div>`)
})
*/
  
})(this);
