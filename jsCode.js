;(function(root){
let jsConsole={
 formatArray: function(e) {
  "use strict";
  for (var t = "", n = 0, r = e.length; n < r; n++) "string" == typeof e[n] ? t += '"' + e[n] + '"' : Array.isArray(e[n]) ? (t += "Array [", t += this.formatArray(e[n]), t += "]") : t += this.formatOutput(e[n]), n < e.length - 1 && (t += ", ");
  return t
 },
 formatObject: function(e) {
  "use strict";
  var t = e.constructor.name;
  if ("String" === t) return `String { "${e.valueOf()}" }`;
  if (t.match(/^(ArrayBuffer|SharedArrayBuffer|DataView)$/)) return t + " {}";
  if (t.match(/^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array)$/)) return e.length > 0 ? t + " [" + this.formatArray(e) + "]" : t + " []";
  if ("Symbol" === t && void 0 !== e) return e.toString();
  if ("Object" === t) {
   var n = "",
       r = !0;
   for (var i in e) e.hasOwnProperty(i) && (r ? r = !1 : n += ", ", n = n + i + ": " + this.formatOutput(e[i]));
   return t + " { " + n + " }"
  }
  return e
 },
 formatOutput: function(e) {
  "use strict";
  return void 0 === e || null === e || "boolean" == typeof e ? String(e) : "number" == typeof e ? Object.is(e, -0) ? "-0" : String(e) : "string" == typeof e ? '"' + e + '"' : Array.isArray(e) ? "Array [" + this.formatArray(e) + "]" : this.formatObject(e)
 },
 writeOutput: function(e) {
  "use strict";
  let r="> " + e
  jsConsole.logbuffer.push(r)
  /*
  var t = document.querySelector("#console code"),
      n = t.textContent,
      r = "> " + e + "\n";
  t.textContent = n + r
  */
 }
}
jsConsole.logbuffer=[];
jsConsole.errorbuffer=[];
let logdump= function() {
 "use strict";
 var t = jsConsole,//e("./console-utils"),
 n = console.log,
  r = console.error;
 console.error = function(e) {
  t.writeOutput(e), r.apply(console, arguments)
 }, console.log = function() {
  for (var e = [], r = 0, i = arguments.length; r < i; r++) {
   var o = t.formatOutput(arguments[r]);
   e.push(o)
  }
  var a = e.join(" ");
  t.writeOutput(a), n.apply(console, arguments)
 }
}
logdump();
root.jsCode=function(code,caller){
 try {
  jsConsole.logbuffer=[];
  jsConsole.errorbuffer=[];  
  new Function(code)()
  let log=Array.from(jsConsole.logbuffer)
  ,error=Array.from(jsConsole.errorbuffer)
  caller({log:log,error:error})
  jsConsole.logbuffer=[];
  jsConsole.errorbuffer=[];
 }
 catch (e) {
  let str="Error: " + e.message
  jsConsole.errorbuffer.push(str)
  let log=Array.from(jsConsole.logbuffer)
  ,error=Array.from(jsConsole.errorbuffer)
  caller({log:log,error:error})
  jsConsole.logbuffer=[];
  jsConsole.errorbuffer=[];
 }
  
 }
 /*usage
 jsCode(code,onload)//onload is caller // d.log d.error 
 */
})(this);
