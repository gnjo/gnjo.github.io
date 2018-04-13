;(function(root){
var o={bells:{}}
o.add=async function(name,caller){return o.bells[name]=caller}
o.call=async function(name,obj){return (o.bells[name])?o.bells[name](obj):console.warn('bell not add:',name)}
root.bell=o
})(this)
;
