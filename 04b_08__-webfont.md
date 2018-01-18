# digital font usage
css this
```
@font-face {
    font-family: 'digital';
    src: url('//gnjo.github.io/04b_08__-webfont.eot');
    src: url('//gnjo.github.io//04b_08__-webfont.eot?#iefix') format('embedded-opentype'),
         url('//gnjo.github.io//04b_08__-webfont.woff2') format('woff2'),
         url('//gnjo.github.io//04b_08__-webfont.woff') format('woff'),
         url('//gnjo.github.io//04b_08__-webfont.ttf') format('truetype');
}

body{ font-family:'digital'}

.picfont{
    font-weight: 500;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    -webkit-transform-origin: 0% 0%;
    -ms-transform: scale(0.8);
    -ms-transform-origin: 0% 0%;
    transform: scale(0.8);
    transform-origin: 0% 0%;
    zoom: 0.8;
    font-family:'digital';
}
.picfont:not(:target){
    zoom: 1;
}
```
