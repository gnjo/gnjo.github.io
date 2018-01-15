# gnjo.github.io
web site

# promise
this files need usage. filename have lowerCamelCase, mostly.

### quick start
```
<link rel="stylesheet" href="//gnjo.github.io/layout.css">
<link rel="stylesheet" href="//gnjo.github.io/githubtheme.css">
<script src="//gnjo.github.io/use.js"></script>
<script src="//gnjo.github.io/base64.min.js"></script>
<script src="//gnjo.github.io/underscore.min.js"></script>
<script src="//gnjo.github.io/randomColor.min.js"></script>
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
```

### githubtheme.css
github theme
```
<body class="githubtheme" ...
```
or
```
document.body.classList.add('githubtheme')
```

### layout.css
under 30 line. minimum grid system
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
