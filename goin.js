 (function(root){
  var o={};
 
  o.lex=(str)=>{
   var cep='＃';
   var data= str.split(cep).slice(1).map(d=>cep+d)     //pack the ＃
     .map(s=>o.onecol(s))                              //main parse
   ;
   //total input
   var total=0;
   return data.map((d)=>{d.tl=total; total+=d.li; return d });
  };
  o.onecol=(d)=>{
   var cep='\n',ch='';
   var col={al:d, sp:'', at:'', as:[], se:'', pa:'' ,ws:0, li:0, tl:0 }
   var f=(co)=>{ var ary=co.split('：'); ary.push(''); return {dt:ary[0],dd:ary[1]} }
   
   //as is define. tl is total.
   d.split(cep)
    //.slice(1)
    .map(d=>d+cep).forEach((d)=>{
     ch=d.charAt(0);
     if(ch=='＃'){ col.sp = d} 
     else if(ch=='＠'){ col.at = d.slice(1)}
     else if(ch=='＊'){ col.as.push( f(d) )}
     else if(ch=='；'){ col.se+= d}
     else             { col.pa+= d}
   });
   
   //count input;
   col.li =col.al.split(cep).length;
   col.ws =col.pa.length;
   return col;
  }
  o.opt={};
  o.set=(opt)=>{ o.opt= Object.assign(o.opt,opt) };
 
  o.html=(obj,n=0)=>{
   let f=( (d)=>{
    d.pa=(n===0)? d.pa:'';
    return `<figure data-goin='${d.tl}' data-type='${n}' >
<img class="if-imagine" src="${d.at}">
<figcaption title="${d.ws}文字${d.tl}行 ${d.se}${d.as}">${d.sp}</figcaption>
<p>${d.pa}</p>
</figure>`})
   ,f1=((d)=>{return (d.as).map((x)=>{
    //console.log(x)
    return `<dt data-goin='${d.tl}' data-type='${n}' title="${d.ws}文字${d.tl}行  ${d.sp}">${x.dt}</dt><dd>${x.dd}</dd>`})
    .join('')
})
   ;
     return obj.map((d)=>{ return (n===2)?f1(d):f(d) }).join('');
  }
 //entry point
  root.goin ={};
  root.goin.set = o.set;
  root.goin.lex = o.lex;
  root.goin.html = o.html;
})(this);
