
;(function(root){
  function frame(c1,c2){
return `
<style>
.bt-spinner {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: transparent;
  border: 3px solid #222;
  border-top-color: ${c1};  
  animation: 4s spin linear infinite;
  transition:all 0.5s linear;
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/*.pos{
  position:fixed;
  top:0.5rem;right:0.5rem;
}*/
.run{
  border-top-color: ${c2};
  animation-duration: 1s!important;  
}
</style>
<div class="bt-spinner"></div>
`.replace(/\n/g,' ').trim()
  }
  function entry(tar,c1,c2){
    var o={}
    tar.innerHTML=frame(c1||'#2cc',c2||'#f26');
    o.spiner=tar.querySelector('.bt-spinner')
    o.cls='run'
    o.run=(d)=>{
      if(d) return o.spiner.classList.remove(o.cls)
      return o.spiner.classList.add(o.cls)
    }
    return o;
  }
  root.spiner=root.spinner =entry;
  /*usage
let sp=spiner(document.querySelector('.pos'));
sp.run()
setInterval(()=>{
  sp.run(-1)
},3000)  
  */
})(this);
