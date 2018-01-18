# gnjo.github.io
usefull scripts

# promise
this files need usage. filename have lowerCamelCase, mostly.

### quick start
```
<link rel="stylesheet" href="//gnjo.github.io/layout.css">
<link rel="stylesheet" href="//gnjo.github.io/githubtheme.css">
<script src="//gnjo.github.io/base64.min.js"></script>
<script src="//gnjo.github.io/underscore.min.js"></script>
<script src="//gnjo.github.io/randomColor.min.js"></script>
<script src="//gnjo.github.io/signal.js"></script>
<script src="//gnjo.github.io/scrollIntoView.min.js"></script>
<link rel="stylesheet" href="//gnjo.github.io/article.css">
<script src="//gnjo.github.io/invert.min.js"></script>
<script src="//gnjo.github.io/md5.min.js"></script>
<!-- use.js need last load -->
<script src="//gnjo.github.io/use.js"></script>
<link rel="stylesheet" href="//gnjo.github.io/monocc.css">
<script src="//gnjo.github.io/marked.min.js"></script>
```

### template
:one line description
:usage the code

### underscore.min.js
version 1.8.3 http://underscorejs.org/
```
//exsample of one
textbox.oninput = _.debounce((ev)=>{console.log('hit')}, 300);
var temp=_.template('<h3><%= ti %></h3><p><%= pa %></p>')
temp({ti:'the title',pa:'the paragraph'}); //<h3>the title</h3><p>the paragraph</p>
_.range(5); //[0,1,2,3,4]
```
### randomColor.min.js
http://randomcolor.llllll.li/
```
//exsample of one
randomColor({hue: 'red'});//#aa3333
randomColor({hue: 'red',luminosity:'dark'});//#441111
randomColor({hue: 'red', count: 18});//[0]...[18]
//option 
//hue:[red,orange,yellow,green,blue,purple,pink,monochrome,random]
//luminosity:[dark,light,random]
//count: number
```

### base64.min.js
polyfill window.atob window.btoa
```
usage same
```

### use.js
always use funcitons
```
fn.g //document.getElementById //fn.g('ma') //HTMLElement
fn.q //document.queryString //fn.q('div[data-xyz]') //HTMLElement
fn.i //initer createElement apply// fn.i('<li>aaaa</li>') //HTMLElement
fn.rnum //randam number //fn.rnum(4) //'3383'
fn.rword //r.. word //fn.rword(4) //'ksyg'
fn.rkana //r.. kana //fn.rkana(4) //'gage'
fn.hashColor // need md5.min.js
fn.invertColor // need invert.min.js
```
and localStorage
```
fn.loId ='xyz'; //project unique is good. default '__loId__'
t.value= fn.loLoad()||'';
function pnt(){ fn.loSave(this.value) }
//fn.loRemove(); //if delete
```
and fn.i2 attr can compose the object.
```
//def
fn.i2=function(html,attr,style,doc=document)
```

### githubtheme.css
github theme. demo (within layout.css) https://gnjo.github.io/layout.css.test.html
```
<body class="githubtheme" ...
```
or
```
document.body.classList.add('githubtheme')
```

### layout.css
under 30 line. minimum grid system. demo https://gnjo.github.io/layout.css.test.html
- .c //container
- .r //raw
- .c1 //columun //.c2 ... c10 //total 10 can be the divide
- cl //clear fix within c1 ... c10


```
<style>.c{max-width:960px}/*max-width rewrite*/</style>
<div class="c">
 <div class="r">
  <div class="c10 cl">header</div>
 </div>
 <div class="r">
  <div class="c5 cl">left</div><div class="c5 cl">right</div>
 </div>
 <div class="r">
  <div class="c7 cl">left</div><div class="c3 cl">right</div> 
 </div> 
</div>
```


### signal.js
simple status by the signal. demo https://gnjo.github.io/signal.js.test.html
```
 var target = document.getElementById('signal');
 var si=signal({el: target })
 //var si=signal({el:target,interval:300,status:true,title:'ok',debug:true}); //full
 document.getElementById('done').onclick=()=>{ si.done('ok') }
 document.getElementById('doing').onclick=()=>{ si.doing('calcing') }
```
and util 
```
<style>
 .signalgreen{color:limegreen;cursor:pointer}
</style>
```
### scrollIntoView.min.js
target element to the top. demo https://gnjo.github.io/scrollIntoView.min.js.test.html
```
 var target=document.querySelectorAll('section')[0];//HTMLElement
 target.scrollIntoView({ behavior: 'smooth' });////
```

### article.css
minimal css for article write. demo https://gnjo.github.io/article.css.test.html
```
 <style>body{margin:auto;max-width:900px}/*max-width rewrite*/</style>
 <article>...</article>
 <!--or-->
 <div class="article">...</div>
```

### invert.min.js
invert color. other usage https://github.com/gnjo/invert-color
```
invert('#000')              // —> #ffffff
invert('#282b35')           // —> #d7d4ca

// amplify to black or white
invert('#282b35', true)     // —> #ffffff

// amplify to custom black or white color
invert('#282b35', { black: '#3a3a3a', white: '#fafafa' })     // —> #fafafa

// input color as RGB array or object
invert([69, 191, 189])              // —> #ba4042
invert({ r: 249, g: 119, b: 121 })  // —> #068886
```
and ___include use.js___    
fn.hashColor fn.invertColor demo https://gnjo.github.io/invert.min.js.test.html

### md5.min.js
string to hash https://github.com/gnjo/JavaScript-MD5
```
md5('aiuewo') //-> "55c97d5e7f66fb05f9c71d51bdba9c93"
```

### monocc.css monocc.scss
minimal application style. scss enviroment https://codepen.io/kunigamaeno/pen/opQZvp
```
//monocc use flex container
<nav class="monocc">
 ...
</nav>
```

### marked.min.js
popular git hub flaver markdown. usage https://github.com/gnjo/marked
```
marked(data); //quick
```
