var keysDown = {}
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var prevTimePoint = new Date();
var degrees = 0;

// //game objects: 2 cars
var car1 = {
  speed: 256,
  x:100,
  y:100,
  rotate: 0,
  img: "imgs/Audi.png"
}

var car2 = {
  speed: 128,
  x:100,
  y:100,
  rotate: 0,
  img: "imgs/Police.png"
}

$(document).ready(function(){
  appendCanvas();

  main();
});

var carImage1 = new Image();
carImage1.src = car1.img;

var carImage2 = new Image();
carImage2.src = car2.img;


function appendCanvas(){
  canvas.width = 1000;
  canvas.height = 600;
  $('body').append(canvas);
}


addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function updatePosition(timeModifier){

  var sin = Math.sin((90-car1.rotate)*Math.PI/180);
  var cos = Math.cos((90-car1.rotate)*Math.PI/180);

  // console.log(cos);
  // alert(sin);

  if(39 in keysDown){
    car1.rotate += 3;
    // car1.x += car1.speed*timeModifier;
  }
  if(37 in keysDown){
    car1.rotate -= 3;
  }
  //button up
  if(38 in keysDown){
    if(sin > 0){
      if(sin != 1){
        if(cos>0){
          car1.y -= (car1.speed*sin)*timeModifier;
          car1.x += (car1.speed*cos)*timeModifier;
        }
        else{
          car1.y -= (car1.speed*sin)*timeModifier;
          car1.x += (car1.speed*cos)*timeModifier;
        }
      }
      else{
        car1.y -= (car1.speed)*timeModifier;
      }
    }
    if(sin<0){
      if(sin != -1){
        if(cos>0){
          car1.y -= (car1.speed*sin)*timeModifier;
          car1.x += (car1.speed*cos)*timeModifier;
        }
        else{
          car1.y -= (car1.speed*sin)*timeModifier;
          car1.x += (car1.speed*cos)*timeModifier;
        }
      }
      else{
        car1.y += (car1.speed)*timeModifier;
      }
    }
    if(sin===0){
      if(cos===1){
        car1.x += (car1.speed)*timeModifier;
      }
      else{
        car1.x -= (car1.speed)*timeModifier;
      }
    }
  }
  //button down
  if(40 in keysDown){
    car1.y += car1.speed*timeModifier;
  }

}

function displayPosition(){
    canvas.width = canvas.width;
    // ctx.save();
    ctx.translate(car1.x+100/2, car1.y+100/2);
    ctx.rotate(car1.rotate * (Math.PI/180));
    ctx.translate(-(car1.x+100/2),-(car1.y+100/2));
    ctx.drawImage(carImage1, car1.x, car1.y, 100, 100);
    // ctx.restore();
}

function main(){
  var currTimePoint = new Date();
  var time = currTimePoint - prevTimePoint;

  updatePosition(time/1000);
  displayPosition();

  prevTimePoint = currTimePoint;

  requestAnimationFrame(main);
}
