/*
license: http://www.edrdg.org/jmdict/edict.html
edict.set({url:'https://gnjo.github.io/edictutf8',caller:a,max:20}).load()
edict.one(word).then(d=>console.log(d)); //one is a string
edict.lex(word).then(d=>console.log(d)); //lex is data array
*/
;(function(root){
 let o={};
 o.data=null;
 o.url='https://gnjo.github.io/edictutf8'
 o.max=50;
 o.caller=(obj=>obj)
 o.set=(obj=>{Object.assign(o,obj);return o})
 o.load=(word)=>{return new Promise(sol=>{
  if(o.data) return sol(word);
  return fetch(o.url).then(d=>d.text())
   .then(d=>{
   o.data=d.split('\n');
   o.caller({type:'load',ret:o.data.length,word:word})  
   return sol(word)
  })
  ;
 })}
 o._calc=(word,type)=>{return new Promise(sol=>{
  let _word =word.toLowerCase(),ret=o.data.filter(d=>~d.toLowerCase().indexOf(_word))
  ret=(type==='one')?ret.slice(0,1).toString():ret.slice(0,o.max)
  o.caller({type:type,ret:ret,word:word})
  return sol(ret);
 })}
 o.one=(word=>(!o.data)?o.load(word).then(o.one):o._calc(word,'one'))
 o.lex=(word=>(!o.data)?o.load(word).then(o.lex):o._calc(word,'lex'))
 ;
 root.edict =o;
})(this);
