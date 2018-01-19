function run(el){
 var data= el.src.split('?q=');
 var baseurl =data[0].slice(0, data[0].lastIndexOf('/')+1 );
 var ary = data[1].trim().split('|');
 console.log(ary)
 
}
