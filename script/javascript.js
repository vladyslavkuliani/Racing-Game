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
  speed: 256,
  x:200,
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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  $('body').append(canvas);
}


addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function updatePosition(timeModifier){

  var sinCar1 = Math.sin((90-car1.rotate)*Math.PI/180);
  var cosCar1 = Math.cos((90-car1.rotate)*Math.PI/180);
  var sinCar2 = Math.sin((90-car2.rotate)*Math.PI/180);
  var cosCar2 = Math.cos((90-car2.rotate)*Math.PI/180);

  //button right
  if(39 in keysDown){
    car1.rotate += 3;
    // car1.x += car1.speed*timeModifier;
  }
  //button left
  if(37 in keysDown){
    car1.rotate -= 3;
  }
  //button up
  if(38 in keysDown){
    calculateMovements(sinCar1, cosCar1, car1, timeModifier);
  }

  //button A
  if(65 in keysDown){
    car2.rotate -= 3;
  }
  //button D
  if(68 in keysDown){
    car2.rotate += 3;
  }
  //button W
  if(87 in keysDown){
    calculateMovements(sinCar2, cosCar2, car2, timeModifier);
  }
}

function calculateMovements(sin, cos, car, timeModifier){
  if(sin > 0){
    if(sin != 1){
      if(cos>0){
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
      else{
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
    }
    else{
      car.y -= (car.speed)*timeModifier;
    }
  }
  if(sin<0){
    if(sin != -1){
      if(cos>0){
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
      else{
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
    }
    else{
      car.y += (car.speed)*timeModifier;
    }
  }
  if(sin===0){
    if(cos===1){
      car.x += (car.speed)*timeModifier;
    }
    else{
      car.x -= (car.speed)*timeModifier;
    }
  }
}

function displayPosition(){
    canvas.width = canvas.width;
    ctx.save();
    ctx.translate(car1.x+100/2, car1.y+100/2);
    ctx.rotate(car1.rotate * (Math.PI/180));
    ctx.translate(-(car1.x+100/2),-(car1.y+100/2));
    ctx.drawImage(carImage1, car1.x, car1.y, 100, 100);
    ctx.restore();

    ctx.translate(car2.x+100/2, car2.y+100/2);
    ctx.rotate(car2.rotate * (Math.PI/180));
    ctx.translate(-(car2.x+100/2),-(car2.y+100/2));
    ctx.drawImage(carImage2, car2.x, car2.y, 100, 100);
}

function main(){
  var currTimePoint = new Date();
  var time = currTimePoint - prevTimePoint;

  updatePosition(time/1000);
  displayPosition();

  prevTimePoint = currTimePoint;

  requestAnimationFrame(main);
}
