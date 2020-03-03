(function(root){ 
//----------------------------------------------
  // フィルタ関数
  //----------------------------------------------

  /**
   * フィルタなし
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _nofilter(data,w,h) {
    /* nop */
    return data;
  }

  /**
   * グレースケール
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _grayscale(data,w,h) {
    for (let i = 0; i < data.length; i += 4) {
      // (r+g+b)/3
      const color = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = data[i+1] = data[i+2] = color;
    }

    return data;
  }

  /**
   * 階調反転
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _inversion(data,w,h) {
    for (let i = 0; i < data.length; i += 4) {
      // 255-(r|g|b)
      data[i]   = Math.abs(255 - data[i])  ;
      data[i+1] = Math.abs(255 - data[i+1]);
      data[i+2] = Math.abs(255 - data[i+2]);
    }

    return data;
  }

  /**
   * 二値化
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
 function _binarization(data,w,h) {
    const threshold = 255 / 2;

    const getColor = (data, i) => {
      // threshold < rgbの平均
      const avg = (data[i] + data[i+1] + data[i+2]) / 3;
      if (threshold < avg) {
        // white
        return 255;
      } else {
        // black
        return 0;
      }
    };

    for (let i = 0; i < data.length; i += 4) {
      const color = getColor(data, i);
      data[i] = data[i+1] = data[i+2] = color;
    }

    return data;
  }

  /**
   * ガンマ補正
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _gamma(data,w,h) {
    // 補正値（1より小さい:暗くなる、1より大きい明るくなる）
    const gamma = 2.0;
    // 補正式
    const correctify = val => 255 * Math.pow(val / 255, 1 / gamma);

    for (let i = 0; i < data.length; i += 4) {
      data[i]   = correctify(data[i]);
      data[i+1] = correctify(data[i+1]);
      data[i+2] = correctify(data[i+2]);
    }

    return data;
  }

  /**
   * ぼかし(3x3)
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _blur(data,w,h) {
    const _data = data.slice();
    const avgColor = (color, i) => {
      const prevLine = i - (w/*this.canvasWidth*/ * 4);
      const nextLine = i + (w/*this.canvasWidth*/ * 4);

      const sumPrevLineColor = _data[prevLine-4+color] + _data[prevLine+color] + _data[prevLine+4+color];
      const sumCurrLineColor = _data[i       -4+color] + _data[i       +color] + _data[i       +4+color];
      const sumNextLineColor = _data[nextLine-4+color] + _data[nextLine+color] + _data[nextLine+4+color];

      return (sumPrevLineColor + sumCurrLineColor + sumNextLineColor) / 9
    };

    // 2行目〜n-1行目
    for (let i = w/*this.canvasWidth*/ * 4; i < data.length - (w/*this.canvasWidth*/ * 4); i += 4) {
      // 2列目〜n-1列目
      if (i % (w/*this.canvasWidth*/ * 4) === 0 || i % ((w/*this.canvasWidth*/ * 4) + 300) === 0) {
        // nop
      } else {
        data[i]   = avgColor(0, i);
        data[i+1] = avgColor(1, i);
        data[i+2] = avgColor(2, i);
      }
    }

    return data;
  }

  /**
   * シャープ化
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _sharpen(data,w,h) {
    const _data = data.slice();
    const sharpedColor = (color, i) => {
      // 係数
      //  -1, -1, -1
      //  -1, 10, -1
      //  -1, -1, -1
      const sub = -1;
      const main = 10;

      const prevLine = i - (w/*this.canvasWidth*/ * 4);
      const nextLine = i + (w/*this.canvasWidth*/ * 4);

      const sumPrevLineColor = (_data[prevLine-4+color] * sub)  +  (_data[prevLine+color] * sub )  +  (_data[prevLine+4+color] * sub);
      const sumCurrLineColor = (_data[i       -4+color] * sub)  +  (_data[i       +color] * main)  +  (_data[i       +4+color] * sub);
      const sumNextLineColor = (_data[nextLine-4+color] * sub)  +  (_data[nextLine+color] * sub )  +  (_data[nextLine+4+color] * sub);

      return (sumPrevLineColor + sumCurrLineColor + sumNextLineColor) / 2
    };

    // 2行目〜n-1行目
    for (let i = w/*this.canvasWidth*/ * 4; i < data.length - (w/*this.canvasWidth*/ * 4); i += 4) {
      // 2列目〜n-1列目
      if (i % (w/*this.canvasWidth*/ * 4) === 0 || i % ((w/*this.canvasWidth*/ * 4) + 300) === 0) {
        // nop
      } else {
        data[i]   = sharpedColor(0, i);
        data[i+1] = sharpedColor(1, i);
        data[i+2] = sharpedColor(2, i);
      }
    }

    return data;
  }

  /**
   * メディアンフィルタ
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
 function _median(data,w,h) {
    const _data = data.slice();
    const getMedian = (color, i) => {
      // 3x3の中央値を取得
      const prevLine = i - (w/*this.canvasWidth*/ * 4);
      const nextLine = i + (w/*this.canvasWidth*/ * 4);

      const colors = [
        _data[prevLine-4+color], _data[prevLine+color], _data[prevLine+4+color],
        _data[i       -4+color], _data[i       +color], _data[i       +4+color],
        _data[nextLine-4+color], _data[nextLine+color], _data[nextLine+4+color],
      ];

      colors.sort((a, b) => a - b);
      return colors[Math.floor(colors.length / 2)];
    };

    // 2行目〜n-1行目
    for (let i = w/*this.canvasWidth*/ * 4; i < data.length - (w/*this.canvasWidth*/ * 4); i += 4) {
      // 2列目〜n-1列目
      if (i % (w/*this.canvasWidth*/ * 4) === 0 || i % ((w/*this.canvasWidth*/ * 4) + 300) === 0) {
        // nop
      } else {
        data[i]   = getMedian(0, i);
        data[i+1] = getMedian(1, i);
        data[i+2] = getMedian(2, i);
      }
    }

    return data;
  }

  /**
   * エンボス
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
 function _emboss(data,w,h) {
    const _data = data.slice();
    const embossColor = (color, i) => {
      // 係数
      //  -1,  0,  0
      //   0,  1,  0
      //   0,  0,  0
      // → + (255 / 2)

      const prevLine = i - (w/*this.canvasWidth*/ * 4);
      return ((_data[prevLine-4+color] * -1) + _data[i+color]) + (255 / 2);
    };

    // 2行目〜n-1行目
    for (let i = w/*this.canvasWidth*/ * 4; i < data.length - (w/*this.canvasWidth*/ * 4); i += 4) {
      // 2列目〜n-1列目
      if (i % (w/*this.canvasWidth*/ * 4) === 0 || i % ((w/*this.canvasWidth*/ * 4) + 300) === 0) {
        // nop
      } else {
        data[i]   = embossColor(0, i);
        data[i+1] = embossColor(1, i);
        data[i+2] = embossColor(2, i);
      }
    }

    return data;
  }

  /**
   * モザイク
   * @param {Array<Number>} data ImageData.dataの配列（dataを書き換える）
   */
function _mosaic(data,w,h) {
    const _data = data.slice();

    const avgColor = (i, j, color) => {
      // 3x3の平均値
      const prev = (((i - 1) * w/*this.canvasWidth*/) + j) * 4;
      const curr = (( i      * w/*this.canvasWidth*/) + j) * 4;
      const next = (((i + 1) * w/*this.canvasWidth*/) + j) * 4;

      const sumPrevLineColor = _data[prev-4+color] + _data[prev+color] + _data[prev+4+color];
      const sumCurrLineColor = _data[curr-4+color] + _data[curr+color] + _data[curr+4+color];
      const sumNextLineColor = _data[next-4+color] + _data[next+color] + _data[next+4+color];

      return (sumPrevLineColor + sumCurrLineColor + sumNextLineColor) / 9;
    };

    // 3x3ブロックずつ色をぬる
    for (let i = 1; i < w/*this.canvasWidth*/; i += 3) {
      for (let j = 1; j < h/*this.canvasHeight*/; j += 3) {

        const prev = (((i - 1) * w/*this.canvasWidth*/) + j) * 4;
        const curr = (( i      * w/*this.canvasWidth*/) + j) * 4;
        const next = (((i + 1) * w/*this.canvasWidth*/) + j) * 4;

        ['r', 'g', 'b'].forEach((_, color) => {
          data[prev-4+color] = data[prev+color] = data[prev+4+color] = avgColor(i, j, color);
          data[curr-4+color] = data[curr+color] = data[curr+4+color] = avgColor(i, j, color);
          data[next-4+color] = data[next+color] = data[next+4+color] = avgColor(i, j, color);
        });
      }
    }

    return data;
  }
function _green(data,w,h) {
    let f=d=>Math.min(Math.floor(d),255)
    for (let i = 0; i < data.length; i += 4) {
      // (r+g+b)/3
      const color = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = color;
      data[i+1] =f(color+color*0.5) 
      data[i+2] =f(color+color*0.25) 
    }
    return data;
  }

function _blue(data,w,h) {
    let f=d=>Math.min(Math.floor(d),255)
    for (let i = 0; i < data.length; i += 4) {
      // (r+g+b)/3
      const color = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = color;
      data[i+1] =f(color+color*0.25) 
      data[i+2] =f(color+color*0.5) 
    }
    return data;
  }

function _sobel(data,w,h) {
 var width=w;
 var height=h;

 var kernelX = [
  [-1,0,1],
  [-2,0,2],
  [-1,0,1]
 ];

 var kernelY = [
  [-1,-2,-1],
  [0,0,0],
  [1,2,1]
 ];

 var sobelData = [];
 var grayscaleData = [];

 function bindPixelAt(data) {
  return function(x, y, i) {
   i = i || 0;
   return data[((width * y) + x) * 4 + i];
  };
 }

 //var data = _data //
 var pixelAt = bindPixelAt(data);
 var x, y;

 for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
   var r = pixelAt(x, y, 0);
   var g = pixelAt(x, y, 1);
   var b = pixelAt(x, y, 2);

   var avg = (r + g + b) / 3;
   grayscaleData.push(avg, avg, avg, 255);
  }
 }

 pixelAt = bindPixelAt(grayscaleData);

 for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
   var pixelX = (
    (kernelX[0][0] * pixelAt(x - 1, y - 1)) +
    (kernelX[0][1] * pixelAt(x, y - 1)) +
    (kernelX[0][2] * pixelAt(x + 1, y - 1)) +
    (kernelX[1][0] * pixelAt(x - 1, y)) +
    (kernelX[1][1] * pixelAt(x, y)) +
    (kernelX[1][2] * pixelAt(x + 1, y)) +
    (kernelX[2][0] * pixelAt(x - 1, y + 1)) +
    (kernelX[2][1] * pixelAt(x, y + 1)) +
    (kernelX[2][2] * pixelAt(x + 1, y + 1))
   );

   var pixelY = (
    (kernelY[0][0] * pixelAt(x - 1, y - 1)) +
    (kernelY[0][1] * pixelAt(x, y - 1)) +
    (kernelY[0][2] * pixelAt(x + 1, y - 1)) +
    (kernelY[1][0] * pixelAt(x - 1, y)) +
    (kernelY[1][1] * pixelAt(x, y)) +
    (kernelY[1][2] * pixelAt(x + 1, y)) +
    (kernelY[2][0] * pixelAt(x - 1, y + 1)) +
    (kernelY[2][1] * pixelAt(x, y + 1)) +
    (kernelY[2][2] * pixelAt(x + 1, y + 1))
   );

   var magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;

   sobelData.push(magnitude, magnitude, magnitude, 255);
  }
 }
 //hard write 
 sobelData.map((d,i)=>{data[i]=d})
 return data
}
  
function _dither2(data,w,h){
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
} 
const bayer = [
 shuffle([0*16+8, 8*16+8, 2*16+8, 10*16+8]),
 shuffle([12*16+8, 4*16+8, 14*16+8, 6*16+8]),
 shuffle([3*16+8, 11*16+8, 1*16+8, 9*16+8]),
 shuffle([15*16+8, 7*16+8, 13*16+8, 5*16+8])
]; 
  
/*const bayer = [
 [0*16+8, 8*16+8, 2*16+8, 10*16+8],
 [12*16+8, 4*16+8, 14*16+8, 6*16+8],
 [3*16+8, 11*16+8, 1*16+8, 9*16+8],
 [15*16+8, 7*16+8, 13*16+8, 5*16+8]
]; */
 let x,y,chk,wk
 for (let i = 0; i < data.length; i += 4) {
  wk=~~(i/4)
  y=~~(wk/w)
  x=~~(wk%w)
  //console.log(wk,x,y,w)
  chk=bayer[y%4][x%4]
  data[i]   = (data[i] >= chk)?0xff:0x00
  data[i+1] = (data[i+1] >= chk)?0xff:0x00
  data[i+2] = (data[i+2] >= chk)?0xff:0x00
 }
 return data;
}

function _dither3(data,w,h){
  let lrot = a => a[0].map((_, c) => a.map(r => r[c]).reverse());   
const bayer =lrot( [
 [0*16+8, 8*16+8, 2*16+8, 10*16+8],
 [12*16+8, 4*16+8, 14*16+8, 6*16+8],
 [3*16+8, 11*16+8, 1*16+8, 9*16+8],
 [15*16+8, 7*16+8, 13*16+8, 5*16+8]
] )
;
 let x,y,chk,wk
 for (let i = 0; i < data.length; i += 4) {
  wk=~~(i/4)
  y=~~(wk/w)
  x=~~(wk%w)
  //console.log(wk,x,y,w)
  chk=bayer[y%4][x%4]
  data[i]   = (data[i] >= chk)?0xff:0x00
  data[i+1] = (data[i+1] >= chk)?0xff:0x00
  data[i+2] = (data[i+2] >= chk)?0xff:0x00
 }
 return data;
}

  
  
function _dither(data,w,h){
  
const bayer = [
 [0*16+8, 8*16+8, 2*16+8, 10*16+8],
 [12*16+8, 4*16+8, 14*16+8, 6*16+8],
 [3*16+8, 11*16+8, 1*16+8, 9*16+8],
 [15*16+8, 7*16+8, 13*16+8, 5*16+8]
];
 let x,y,chk,wk
 for (let i = 0; i < data.length; i += 4) {
  wk=~~(i/4)
  y=~~(wk/w)
  x=~~(wk%w)
  //console.log(wk,x,y,w)
  chk=bayer[y%4][x%4]
  data[i]   = (data[i] >= chk)?0xff:0x00
  data[i+1] = (data[i+1] >= chk)?0xff:0x00
  data[i+2] = (data[i+2] >= chk)?0xff:0x00
 }
 return data;
}

  
 //pack
 var o ={};
o._nofilter =_nofilter;
o._grayscale=_grayscale;
o._inversion=_inversion;
o._binarization=_binarization;
o._gamma=_gamma;
o._blur =_blur;
o._sharpen=_sharpen;
o._median=_median;
o._emboss=_emboss;
o._mosaic=_mosaic;
//add
o._blue=_blue
o._green=_green
//add
o._sobel=_sobel  
//add
o._dither=_dither  
o._dither2=_dither2
o._dither3=_dither3
  
 root.filter =o;
 
 })(this);
