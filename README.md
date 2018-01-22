# gnjo.github.io
usefull scripts

# promise
this files need usage. filename have lowerCamelCase, mostly.


### quick start
- short
```
<script src="//gnjo.github.io/underscore.min.js"></script>
<script src="//gnjo.github.io/md5.min.js"></script>
<script onload="use(this)" src="//gnjo.github.io/use.js?q=normalize.min.css|use.css|filter.css"></script>
```
- all
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
<link rel="stylesheet" href="//gnjo.github.io/monocc.css">
<script src="//gnjo.github.io/marked.min.js"></script>
<link rel="stylesheet" href="//gnjo.github.io/digital.font.css">
<link rel="stylesheet" href="//gnjo.github.io/filter.css">

<!-- use.js need last load -->
<script onload="use(this)" src="//gnjo.github.io/use.js"></script>
<!-- if pack load  use.js?q=xxxx|yyyy|
<script onload="use(this)" src="//gnjo.github.io/use.js?q=use.css|monocc.css|filter.css"></script>
```

### template
:one line description
:usage the code

### fr.html 
css fragment getter demo https://gnjo.github.io/fg.html

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
fn.use()  package load. split is __|__
```
<script onload='use(this)' src="//gnjo.github.io/use.js?q=monocc.css|filter.css"></script>
```
and 
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
and fn.fragment fn.cd 
```
var u='//gnjo.github.io/article.css.test.html'
var t ='body>article:nth-child(3)';
fn.fragment(u,t)
 .then((el)=>{ 
 if(el) document.body.innerHTML=el.innerHTML;
 else console.log('not')
})

//if use fn.fragment on .js and .css, write the <body>, not the <head> 
/* article.css.test.html
<head></head>
<body>
<link .... href="xxxxx.css"...
<script src="xxxxxx.js"...
...
</body>
*/
```
and fn.rotation(a,v,l); v is push value. l is limit.
```
var ary=[];
...
 fn.g('l').innerHTML = fn.rotation(ary,'<li>'+fn.rkana(8)+'</li>',30).join(''); // ary limit the 30.
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
minimal application style. scss enviroment ~~https://codepen.io/kunigamaeno/pen/opQZvp~~ https://codepen.io/kunigamaeno/pen/eyxjjX/  
demo https://gnjo.github.io/  
```
//monocc use flex container
<nav class="monocc">
 ...
</nav>
```
- v2 release google material icon fit. material icon https://material.io/icons/
```
//usage simple the <i>
< ... class="monocc">
 ...
 <p><i>face</i></p>
 <p><a href="#"><i>launch</i>this is link</a></p> 
 <button><i>face</i>xxxxbtn</button>
 <label class="button"><i>face</i>xxxxbtn</label>
```

### marked.min.js
popular git hub flaver markdown. usage https://github.com/gnjo/marked   
demo https://gnjo.github.io/
```
marked(data); //quick
```

### digital.font.css
digital font demo https://gnjo.github.io/digital.font.css.test.html
```
<link rel="stylesheet" href="//gnjo.github.io/digital.font.css">
<style> body{ font-family:'digital'}</style>
```
### ~~~run.js~~~ colding... load sequence the panic.
url base package loader. url?q=xxxx.js|yyy.js|zzz.css|
```
<!-- dont forget onload='run(this)' -->
<script onload='run(this)' src="//gnjo.github.io/run.js?q=use.js|underscore.min.js"></script>
```
### split.min.js split.css
usually pattern demo https://gnjo.github.io/split.min.js.test.html

### filter.css
image filter class if-xxx
```
<!-- usage -->
<img class="if-dark" ...>

<!-- mix. but limit 2 -->
<img class="if-portrait if-smoke" ...>
```
pattern mix can the 2.
```
.if-none
.if-night
.if-dark
.if-flash
.if-shock
.if-past
.if-portrait
.if-wraith
.if-smoke
.if-poison
.if-hard

/*special not mix*/
.if-imagine
```
