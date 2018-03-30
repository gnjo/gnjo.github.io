(function(root){
/*
v1.0 filter is or not OK 
v1.1 filter not bug
*/
 let filter=root.filter||{}
// ,isFilter=(d)=>{
//  return (Object.keys(filter).filter(k=>d===k||d===k.slice(1)).length===0)?false:true
//}
 ,fits=(ow,oh,tw,th,fa=1)=>{
    // calc scale and calc clip
    let scale = (ow/oh > tw/th)? th/oh :tw/ow
    ,faceupRate =(fa<=0)?1 :fa
    ,clipW = tw / scale
    ,clipH = th / scale
    ,clipX = (ow - clipW) / 2
    ,clipY = (oh - clipH) / (2*faceupRate)
    ;
    
    return {clipX:clipX, clipY:clipY, clipW:clipW, clipH:clipH, tw:tw, th:th }
   //context.drawImage(img, s.clipX, s.clipY, s.clipW, s.clipH, 0, 0, s.tw, s.th);
}
,toCanvas=(url,opt)=>{return new Promise((sol)=>{ 
  let img =new Image()
  ,caller =function(){
    let canvas = document.createElement('canvas')
    ,context = canvas.getContext('2d')
    ,size = opt['fit']
    ,fil =opt['filter']
    ,s
    ;
    if(!size.w && size.h)
     s=fits(img.width,img.height,img.width*size.h/img.height ,size.h,size.fa||1)
    else if(size.w && !size.h)
     s=fits(img.width,img.height,size.w,img.height*size.w/img.width,size.fa||1)
    else //if(size.w && size.h)
     s=fits(img.width,img.height,size.w||img.width,size.h||img.height,size.fa||1)
    ;
    canvas.width = s.tw;
    canvas.height = s.th;
    context.drawImage(img, s.clipX, s.clipY, s.clipW, s.clipH, 0, 0, s.tw, s.th);
    
    let srcData = context.getImageData(0,0,s.tw,s.th);
     //filters
     fil.forEach(d=>filter[d](srcData.data,s.tw,s.th))
//      filter._grayscale(srcData.data,s.tw,s.th);
//      filter._median(srcData.data,s.tw,s.th);    
      context.putImageData(srcData,0,0);
      sol( canvas.toDataURL() ) //
    }
  ;
  
    img.onload =caller;
    img.src=url;   
  })
}

 function entry(base64){
  let o={};
  
  o._={filter:[],base64:base64};
  o.filter =(obj)=>{ /*if(isFilter(obj))*/ o._['filter'].push('_'+obj.replace('_','')); return o}
  o.fit=(obj)=>{ o._['fit']=obj; return o}
  o._calc=toCanvas;
  o.then=function(obj){return o._calc(o._['base64'],o._).then(obj) }
  
  
  return o;
 }
 
 root.imgc =entry;
})(this);
