/*history
v1.0 create
v1.1 data-length map
v1.2 bugfix add remove wrote element
v1.3 callback
v1.4 input > keyup
v1.45 debounce def 70
v1.5 * wildcard
*/
;(function(root){
 //'use strict'; 
 //debounce
 ;(function(root){
  if(root._) return;
  var _={}; 
/*original by underscore.js*/
//line 1457
  _.now = Date.now || function() {
    return new Date().getTime();
   };
//line 850
 _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
 //line 883
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  root._ =_;
})(this)
 ;
 let is={}
 is.function = function(obj){return toString.call(obj) === '[object Function]'}
 ;
 function entry(_target,_flg=false,time=70){
  if(!_target)return console.log('target empty')
  let target =_target.replace(/\./g,'').split(',')
  ,wild=(_target==='*')?true:false
  ,caller=is.function(_flg)?_.debounce(_flg,time):void 0
  ,flg=(caller)?void 0:_flg
  ,hasClass=function(el){
    if(wild) return true;
    return !(target.filter(d=>el.classList.contains(d)).length===0)
   //let l=target.filter(d=>el.classList.contains(d)).length
   //return (l>0)?true:false;
  }
  ,lmap=function(e){
   e.target.dataset.length=e.target.textContent.length
  }
  ,remove=function(e){
   let el=e.target
   el.removeAttribute('contenteditable')
   if(flg)el.removeEventListener('keyup'/*'input'*/,lmap)
   if(caller)el.removeEventListener('keyup'/*'input'*/,caller)
   el.dataset.editable=false
   el=void 0
  }  
  ,add=function(e){
   if(!hasClass(e.target))return
   let el=e.target
   el.setAttribute('contenteditable','plaintext-only')
   el.focus()
   //if(el.dataset.editable)return
   el.addEventListener('blur',remove,{once:true})
   if(flg)el.addEventListener('keyup'/*'input'*/,lmap)
   if(caller)el.addEventListener('keyup'/*'input'*/,caller)   
   el.dataset.editable=true
   el=void 0
   ;
  }
  ;
  document.body.addEventListener('click',add)///
 }
 root.editable=entry;
 /*usage
 editable('.xyz,.eeee',true) //target,data-length write flg
 //
[data-editable]{
 white-space:pre-wrap;
 word-break:break-all;
} 
 */
})(this);
