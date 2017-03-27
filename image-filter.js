var image = null;
var grayimage = null;
var redimage = null;
var reverseimage = null;
var prisonimage=null;
var rainbowimage=null;
var canvas;

function upload() {
  canvas = document.getElementById("cvs");
  var file = document.getElementById("imgFile");
  image = new SimpleImage(file);
  greyimage = new SimpleImage(file);
  redimage = new SimpleImage(file);
  reverseimage = new SimpleImage(file);
  prisonimage= new SimpleImage(file);
  rainbowimage=new SimpleImage(file);
  image.drawTo(canvas);  
}

function checkLoaded(img) {
  if (image==null || !image.complete()) 
    isLoaded=false;
  else
    isLoaded=true;
  return isLoaded;
}

function filterGrey() {
  for (var pixel of greyimage.values()) { 
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  return greyimage;
}

function makeGrey() {
  if (checkLoaded(greyimage)) {
    var greyImage = filterGrey();
    greyImage.drawTo(canvas);
  }
  else {
    alert("Image has not loaded");
    return;
  }
}

function filterRed() {
  for (var pixel of redimage.values()) { 
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if (avg < 128){
      pixel.setRed(2 * avg)
      pixel.setBlue(0);
      pixel.setGreen(0);
    }
    else {
      pixel.setRed(255);
      pixel.setGreen((2*avg)-255);
      pixel.setBlue((2*avg)-255);
    }
  }
  return redimage;
}

function makeRed() {
  if (checkLoaded(redimage)) {
    var redImage = filterRed();
    redImage.drawTo(canvas);
  }
  else {
    alert("Image has not loaded");
    return;
  }
}

function filterReverse() {
  for (var pixel of reverseimage.values())
    {pixel.setRed(255-pixel.getRed());
     pixel.setGreen(255-pixel.getGreen());
     pixel.setBlue(255-pixel.getBlue());
    }
  return reverseimage;
 }

function makeReverse() {
  if (checkLoaded(reverseimage)) {
    var reverseImage = filterReverse();
    reverseImage.drawTo(canvas);
  }
  else {
    alert("Image has not loaded");
    return;
  }
}

function setGrey(pixel){
    pixel.setGreen(100);
    pixel.setRed(100);
    pixel.setBlue(100);
  return pixel;
}  

function createBars(width) {
  var widthdiv= width/10;
  var widthbar = width/30;
  var widtharray = [];
  
  for (var i=1; i< widthbar; i++) {
    for (var x=0; x <= width; x ++) {
    if (x > ((i*widthdiv) + ((i-1) * widthbar)) && x < (i*(widthdiv + widthbar))) {
   widtharray.push(x); }}
  }
  return widtharray;

}

function drawBars() {
  var width = prisonimage.getWidth();
  var array = createBars(width);
  for (var pixel of prisonimage.values()) {
    var x = pixel.getX(); 
    if (array.includes(x)) 
      {setGrey(pixel)}
    }
    return prisonimage;
}

function makePrisonBars() {
  if (checkLoaded(prisonimage)) {
    var prisonImage = drawBars();
    prisonImage.drawTo(canvas);
  }
  else {
    alert("Image has not loaded");
    return;
  }

}

function rainbowFilter() {
  var height=rainbowimage.getHeight()
  var colorHeight=height/7;
  for (var pixel of rainbowimage.values()){
     var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() +  pixel.getBlue())/3;
    if (y <= colorHeight)
    {if (avg < 128)
       { pixel.setRed(255);
        pixel.setBlue(0);
        pixel.setGreen(0); }
      else
        {pixel.setRed(255)
          pixel.setGreen((2*avg) - 255)
          pixel.setBlue((2*avg) - 255)}}
      else if (y >= colorHeight && y < 2 * colorHeight)
      { if (avg < 128)
         { pixel.setRed(2*avg);
          pixel.setGreen(.8*avg);
          pixel.setBlue(0);}
      else 
        {pixel.setRed(255)
          pixel.setGreen((1.2*avg) - 51)
          pixel.setBlue((2*avg) - 255)}}
    
    else if (y >= (2 * colorHeight) && (y < 3 * colorHeight)) {
       if (avg < 128)
         { pixel.setRed(2*avg);
          pixel.setGreen(2*avg);
          pixel.setBlue(0);}
      else 
        {pixel.setRed(255)
          pixel.setGreen(255)
          pixel.setBlue((2*avg) - 255)}
      }
    else if (y >= (3 * colorHeight) && (y < 4 * colorHeight)) {
       if (avg < 128)
         { pixel.setRed(0);
          pixel.setGreen(2*avg);
          pixel.setBlue(0);}
      else 
        {pixel.setRed((2*avg) - 255)
          pixel.setGreen(255)
          pixel.setBlue((2*avg) - 255)}
      }
       else if (y >= (4 * colorHeight) && (y < 5 * colorHeight)) {
       if (avg < 128)
         { pixel.setRed(0);
          pixel.setGreen(0);
          pixel.setBlue(2 * avg);}
      else 
        {pixel.setRed((2*avg) - 255)
          pixel.setGreen((2*avg) - 255)
          pixel.setBlue(255)}
      }
    else if (y >= (5 * colorHeight) && (y < 6 * colorHeight)) {
       if (avg < 128)
         { pixel.setRed(.8 * avg);
          pixel.setGreen(0);
          pixel.setBlue(2 * avg);}
      else 
        {pixel.setRed((1.2*avg) - 51)
          pixel.setGreen((2*avg) - 255)
          pixel.setBlue(255)}
      }
    else if (y >= (6 * colorHeight) && (y < 7 * colorHeight)) {
       if (avg < 128)
         { pixel.setRed(1.6 * avg);
          pixel.setGreen(0);
          pixel.setBlue(1.6 * avg);}
      else 
        {pixel.setRed((.4*avg) + 153)
          pixel.setGreen((2*avg) - 255)
          pixel.setBlue((.4*avg) + 153)}
      }
}
  return rainbowimage;
}

function makeRainbow() {
  if (checkLoaded(rainbowimage)) {
    var rainbowImage = rainbowFilter();
    rainbowImage.drawTo(canvas);
  }
  else {
    alert("Image has not loaded");
    return;
  }
  
}

function makeClear() {
  image.drawTo(canvas);
}



