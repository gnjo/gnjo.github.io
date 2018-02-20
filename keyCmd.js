(function(root){
  'use strict'
  /*lent*/
  let sol =(d=>Promise.resolve(d))
  ,isElement = function(obj){return !!(obj && obj.nodeType === 1)}
  ;
  function entry(target){
    let o={};
    /*gather*/
    o._={};
    o._['target']=target;
    ['input','ctrl','meta','shift','alt'].forEach((d)=>{
      o[d] =(obj)=>{o._[d]=Object.assign({},o._[d],obj);return o}
    })

    /*main*/
    o._done=()=>{
      let el= isElement(o._['target'])?o._['target']:document.querySelector(o._['target'])
      ,input =o._['input']||{}
      ,ctrl=Object.assign({},o._['ctrl'],o._['meta'])
      ,shift=o._['shift']||{}
      ,alt=o._['alt']||{}
      ;
      if(input['input']||input['default'])
        el.oninput= input['input']||input['default'];
      el.onkeydown =function(ev){
        let k=ev.keyCode.toString();
        if( (ev.ctrlKey || ev.metaKey) && ctrl[k]){sol(k).then(d=>{ctrl[d].call(el,ev)});return}
        else if( ev.shiftKey && shift[k]){sol(k).then(d=>{shift[d].call(el,ev)});return}
        else if( ev.altKey && alt[k]){sol(k).then(d=>{alt[d].call(el,ev)});return}
        if( input[k] ){sol(k).then(d=>{input[d].call(el,ev)});return}
      }
      //something...
      return el;
    }    
    /*emit*/
    o.end=(log)=>{
      if(log) console.log(log);
      return o._done();
    }
    o.then=(caller)=>{return new Promise((sol)=>{
      let ret =o._done();
      sol(caller(ret))
     })      
    }
    return o;
  }
  ;
  root.keyCmd=entry;
  /*
let in1=function(ev){ console.log('in') }
,in2=function(ev){ ev.preventDefault() }
keyCmd(document.querySelector('textarea'))
 .input({'default':in1})
 .input({'13':in1})
 .ctrl({'83':in2}) //'S'
 .ctrl({'13':in2}) //'enter'
 .shift({'13':in2})
 .end();
  */
})(this);
