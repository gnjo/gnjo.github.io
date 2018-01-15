;(function(root){
   var signal=function(opt){
    var o={interval:300,status:true,title:'ok',el:document.createElement('span'),debug:false};
    o.done=(s='done')=>{ o.status=true;o.title=s;o._debug(s)}
    o.doing=(s='doing')=>{ o.status=false;o.title=s;o._debug(s)}
    o._debug=(s)=>{ if(o.debug===true)console.log(o.status,s) }

    o.colors=["#ce6c48", "#e02629", "#ffa8c6", "#a02a10", "#ed534e", "#fca899", "#f2b3ca", "#fcd5c7", "#e8280b", "#e0829b"];
    o.count=0;
    o.intervalId =setInterval(()=>{  
     o.el.title=o.title;
      if(o.status===false){
        o.el.style.color =o.colors[o.count%o.colors.length]
        o.count++;
      }else{
       o.el.style.color ='';
      }
    } ,o.interval);
    o=Object.assign(o,opt);
    return o;
   }
  
   root.signal=signal;
})(this);
