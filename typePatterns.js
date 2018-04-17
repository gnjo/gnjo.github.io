//v1.1 base ture or not. base count 16
//[...,{n,v,s}]
var typePatterns=[
 {n:'Infinity',v:Infinity,b:true}
 ,{n:'NaN',v:NaN,b:true}
 ,{n:'undefined',v:undefined,s:'"undefined"',b:true}
 ,{n:'null',v:null,s:'"null"',b:true}
 ,{n:'Object',v:{},b:true}
 ,{n:'Function',v:new Function(';return;'),b:true}
 ,{n:'Boolean',v:new Boolean(true),b:true}
 /*,'Symbol':Symbol('Object')*/
 ,{n:'Error',v:new Error('dummy')}
 ,{n:'Number',v:new Number(1),b:true}
 ,{n:'MathE',v:Math.E}
 ,{n:'MathLN2',v:Math.LN2}
 ,{n:'MathLN10',v:Math.LN10}
 ,{n:'MathLOG2E',v:Math.LOG2E}
 ,{n:'MathLOG10E',v:Math.LOG10E}
 ,{n:'MathPI',v:Math.PI}
 ,{n:'MathSQRT1_2',v:Math.SQRT1_2}
 ,{n:'MathSQRT2',v:Math.SQRT2}
 ,{n:'MathRandom',v:Math.random()}
 ,{n:'Date',v:new Date(),b:true}
 ,{n:'DateNow',v:Date.now()}
 ,{n:'DateISO',v:new Date().toISOString()}
 ,{n:'String',v:new String('dummy'),b:true}
 ,{n:'RegExp',v:new RegExp('.+')}
 ,{n:'Array',v:new Array(),s:'"[]"',b:true}
 ,{n:'ArrayLike',v:{length:0},s:'"{length:0}"',b:true}
 ,{n:'ArrayEmpty',v:[],s:'"[]"'}
 ,{n:'ArrayInNumber',v:[0,1,2,3]}
 ,{n:'ArrayInString',v:['a','b','c','d'] }
 ,{n:'ArrayInObject',v:[{a:{}},{b:{}},{c:{}}],s:'"[{a:{}},{b:{}},{c:{}}]"'}
 ,{n:'ArrayInFunction',v:[()=>{},()=>{},()=>{}] }
 ,{n:'Map',v:new Map()}
 ,{n:'Set',v:new Set()}
 ,{n:'ArrayBuffer',v:new ArrayBuffer()}
 ,{n:'Proxy',v:new Proxy({},{})}
 ,{n:'Promise',v:new Promise(()=>{}),b:true}
 //promise reject is always born the error... so cut.
 //,{n:'PromiseResolve',v:Promise.resolve('dummy'),s:'Promise.resolve("dummy")'}
 //,{n:'PromiseReject',v:Promise.reject('dummy'),s:'Promise.reject("dummy")'}
 ,{n:'JSONString',v:JSON.stringify({ary:[0,1,2,3],x:{v:'dummy'}})}
 /*addition*/
 ,{n:'False',v:false,b:true}
 ,{n:'True',v:true,b:true}
 ,{n:'Number0',v:0}
 ,{n:'Number1',v:1}
 ,{n:'Number-1',v:-1}
 ,{n:'NumberMAX_SAFE_INTEGER',v:Number.MAX_SAFE_INTEGER}
 ,{n:'NumberMIN_SAFE_INTEGER',v:Number.MIN_SAFE_INTEGER}
 ,{n:'NumberMAX_VALUE',v:Number.MAX_VALUE}
 ,{n:'NumberMIN_VALUE',v:Number.MIN_VALUE}
 ,{n:'NumberNaN',v:Number.NaN}
 ,{n:'StringEmpty',v:'',s:'""',b:true}
 ,{n:'String0',v:'0'}
 ,{n:'String1',v:'1'}
 ,{n:'String-1',v:'-1'} 
 ,{n:'StringFalse',v:'false'} 
 ,{n:'StringTrue',v:'true'}
 ,{n:'StringCR',v:'\r',s:'\\r'}
 ,{n:'StringLF',v:'\n',s:'\\n'}
 ,{n:'StringCRLF',v:'\r\n',s:'\\r\\n'}
 ,{n:'StringCodePointASCII',v:'\u0041\u0042\u0043',s:'\\u0041\\u0042\\u0043'}
 ,{n:'StringCodePointCJK',v:'\u3053\u3093\u306B\u3061\u306F',s:'\\u3053\\u3093\\u306B\\u3061\\u306F'}
 ,{n:'StringHexMin',v:'0'}
 ,{n:'StringHexMax',v:'F'}
 ,{n:'Int8Min',v: -255}
 ,{n:'Int8Max',v: 255}
 ,{n:'Int16Min',v:-32768}
 ,{n:'Int16Max',v:32767}
 ,{n:'Int32Min',v: -2147483648}
 ,{n:'Int32Max',v:2147483647}
 // float is same NumberMAX_ALUE MIN_VALUE
 //,{n:'Float64Min',v:Number.MAX_VALUE}
 //,{n:'Float64Max',v:Number.MIN_VALUE}
]
