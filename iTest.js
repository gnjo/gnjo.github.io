(function(root){
   root.iTest =function(fnc,mark=''){
     let str =fnc.toString()
     ,dc =(d=>document.createElement(d))
     ,ma = /^(.*)\((.*)\)/
     ,ary =str.trim().replace(/=>/g,'').match(ma)
     ,html =dc('fieldset')
     ,inps = ary[2].split(',').filter((d)=>d.length!=0).map((d)=>dc('input'))
     ,label=dc('label')
     ,ret =dc('pre')
     ,ftime =(time=>(time)?new Date(time).toISOString().split('.')[0] +'Z' : new Date( Date.now() ).toISOString().split('.')[0] +'Z')
     ,caller =function(){
       let a =inps.map(d=>d.value)
       ,d =fnc.apply(this,a)
       ;
       ret.innerHTML+= `${ftime()}:\n${JSON.stringify(a)} => ${JSON.stringify(d)}\n`;
     }
     ;
     inps.forEach(el=>html.appendChild(el));
     label.style.display='block'
     label.style.cursor='pointer'
     html.appendChild(label);
     label.innerHTML = `${mark} ${ary[0].split('\n')[0]}`;
     label.onclick =caller;
     ret.style.whiteSpace ='pre-line'
     ret.innerHTML='';
     html.appendChild(ret)

     document.body.appendChild(html);
  };//
})(this);
