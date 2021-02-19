const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;
ctx.strokeStyle = "#BADASS";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = 1;

function draw(e){
  if(!isDrawing) return;
  // [lastX,lastY] = [e.offsetX,e.offsetY];
  let touches = e.changedTouches;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  // ctx.lineWidth = hue;
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  if(isMobile){
    ctx.lineTo(touches[0].pageX,touches[0].pageY);
    [lastX,lastY] = [touches[0].pageX,touches[0].pageY];
    hue += 3;
    if (direction){
      ctx.lineWidth += 2;
    }
    else {
      ctx.lineWidth -= 2;
    }
  }
  else{
    ctx.lineTo(e.offsetX,e.offsetY);
    [lastX,lastY] = [e.offsetX,e.offsetY];
    hue ++;
    if (direction){
      ctx.lineWidth++;
    }
    else {
      ctx.lineWidth--;
    }
  }
  ctx.stroke();
  if(hue >= 360){
    heu = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
  }
  console.log(ctx.lineWidth);
  // lastX = e.offsetX;
  // lastY = e.offsetY;
}

canvas.addEventListener('mousedown',(e) =>{
  isDrawing = true;
  [lastX,lastY] = [e.offsetX,e.offsetY];  
});
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup',() => isDrawing = false);
canvas.addEventListener('mouseout',() => isDrawing = false);

canvas.addEventListener('touchstart',(e) =>{
  let touches = e.changedTouches;
  isDrawing = true;
  if(isMobile){
    [lastX,lastY] = [touches[0].pageX,touches[0].pageY]; 
  }
  else{
    [lastX,lastY] = [e.offsetX,e.offsetY]; 
  }
});
canvas.addEventListener('touchmove',draw);
// canvas.addEventListener('touchcancel',() => isDrawing = false);
canvas.addEventListener('touchend',() => isDrawing = false);

