/*
license: http://www.edrdg.org/jmdict/edict.html
*/
var ary=void 0
,url='https://gnjo.github.io/edictutf8'
,max=21
,wk=fetch(url).then(d=>d.text()).then(d=>{ ary=d.split("\n") })
; 
function calc(word='',max=20){
 if(!word) return []
 try{
  return ary.filter(d=>~d.toLowerCase().indexOf(word.toLowerCase())).slice(0,max)
 }catch(e){return []}
}
;
onmessage=function(e){
 if(!ary) return;
 postMessage(calc(e.data))
}
