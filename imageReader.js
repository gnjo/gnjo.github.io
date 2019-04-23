
//image reader
;(function(root){
  //need
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  function handleFileSelect(caller) {return function(evt){
    evt.stopPropagation();
    evt.preventDefault();
    //both ondrop and input type=file
    var files = evt.target.files||evt.dataTransfer.files;
    // Loop through the FileList and render image files as thumbnails.
    readFile(files,caller);
  }}
  function readFile(files,caller){
    if(files.length==0) return;
    if(files.length>5) console.log('max 5files ');
    ;[].slice.call(files)
      .filter(f=>f.type.match('image.*'))
      .slice(0,5)
      .map(file=>{
      var reader = new FileReader();
      reader.onload = (function (thefile,thecaller) {
        return function(e) {		        		
          var text = e.target.result;
          thecaller(text,thefile);
        };
      })(file,caller); 
      reader.readAsDataURL(file);
    })    
    }  
  function imageReader(el,caller){
    var o={};
    o.el=el;
    o.caller=caller||function(ev){/**/};
    o.el.ondragover =handleDragOver;//
    o.el.ondrop=handleFileSelect(o.caller);//
  }
  root.imageReader=imageReader;
 /*usage
 imageReader(document.body,(d,f)=>{
 console.log(f)
 //f.name f.size ...
 //d is base64 ...
 
})
 */
})(this);
