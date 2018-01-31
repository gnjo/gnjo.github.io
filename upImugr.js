(function(root){
 var fn={};
 fn.atob = root.atob;
 fn.toBlob =function(base64) {
    let ma = /^data:(.*);base64,(.*)$/
    ;
    if(!ma.test(base64)){ console.log('error base64 data'); return null}

    let ary = base64.match(ma)  //[0] base64, [1] type, [2] body
    ,type = ary[1]
    ,bin = atob(ary[2])
    ,buffer = new Uint8Array(bin.length).map( (d,i)=>{return bin.charCodeAt(i)})
    ,blob = new Blob([buffer.buffer], {type: type})
    ;
    return blob;
//var debug = {hello: "world"};
//var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
//data:image/png;base64,... 
}
 
 root.upImugr = function(opt){
  let o={};
  o.fn =fn;
  o.clientId = '';
  o.entryUrl ='https://api.imgur.com/3/upload.json';
  o.up= function(base64){
    let formData = new FormData()
    ,u = this.entryUrl
    ,c = this.clientId
    ;
     formData.append('type', 'file')
     formData.append('image', this.fn.toBlob(base64) )
    return fetch(u,{
       method: 'POST',
       headers: {
         Accept: 'application/json'
        ,Authorization: `Client-ID ${c}` // imgur specific
       },
       body: formData
     })
   .then(d=>d.json())
 }
  
  return Object.assign(o,opt);
 }
 
})(this);
