 /*usage
let sel=fn.q('.l'),ret=fn.q('.r'),w=fn.worker(fn.q('#edict'))
;
sel.onselect=function(ev){ w.postMessage(fn.gsl()) }
w.onmessage=function(ev){ ret.textContent = ev.data.map(d=>d[2]).join('/') } 
 */
var ary=void 0
,url='https://gnjo.github.io/wnjpn-ok.tab.json'
fetch(url).then(d=>d.json()).then(d=>{ary=d})
;
 
function calc(word='',max=5){
 if(word.length===0) return []
 try{
 return ary.filter(d=> ~d[2].indexOf(word) ).slice(0,max) //search the containts words
  .map(d=>d[0]).map(num=> ary.filter(d=>d[0]===num) ) //search syno...m
  .reduce((a,b)=> a.concat(b),[])  //flattan
 }catch(e){return []}
}
;
onmessage=function(e){ 
 console.log(e,ary.length)
 if(!ary) return;
 postMessage(calc(e.data))
}
;
