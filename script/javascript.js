var keysDown = {}
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var prevTimePoint = new Date();
var degrees = 0;
var canvasW = window.innerWidth/1.1;
var canvasH = window.innerHeight-150;
var n = 3;

function Car(x, y, speed, angle, imgSrc){
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.rotate = angle;
  this.img = imgSrc;
}

function Flag(x, y, name){
  this.name = name;
  this.x = x;
  this.y = y;
  this.flagsCount = 0;
}

//game objects: 2 cars
var car1 = new Car(canvasW/2-100, canvasH/2-50, 256, 0, "imgs/Audi.png");
var car2 = new Car(canvasW/2, canvasH/2-50, 256, 0, "imgs/Police.png");

var flag1 = new Flag(Math.random()*(canvasW - 40), Math.random()*(canvasH - 80), "red");//Math.random()*canvas.width, Math.random()*canvas.height
var flag2 = new Flag(Math.random()*(canvasW - 40), Math.random()*(canvasH - 80), "blue");

$(document).ready(function(){
  $('.button').on('click', function(){
    document.addEventListener("keydown", function (e) {
    	keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
    	delete keysDown[e.keyCode];
    }, false);

    $('.message').css('height', '0');
  });

  appendCanvas();
  main();
});

var carImage1 = new Image();
carImage1.src = car1.img;

var carImage2 = new Image();
carImage2.src = car2.img;

var flagImage = new Image();
flagImage.src = "imgs/flags.png";


function appendCanvas(){
  canvas.width = window.innerWidth/1.1;
  canvas.height = window.innerHeight-150;
  $('body').append(canvas);
}


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

  detectCollision(car1, flag1);
  detectCollision(car2, flag2);

}

function detectCollision(car, flag){
  if(car.x <= flag.x + 40 &&
    flag.x <= car.x + 100 &&
    car.y <= flag.y + 80 &&
    flag.y <= car.y + 100
    ){
      flag.flagsCount++;
      if(flag.flagsCount === n){
        reset(flag);
      }
      placeFlag(flag);
  }
}

function placeFlag(flag){
  flag.x = Math.random()*(canvasW - 40);
  flag.y = Math.random()*(canvasH - 80);
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

    ctx.drawImage(flagImage, 320, 320, 160, 320, 10, 30, 20, 40);
    ctx.font = "28px Helverica";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.textAlign = "left";
    ctx.fillText(": "+flag1.flagsCount, 33, 55);

    ctx.drawImage(flagImage, 320, 0, 160, 320, 10, 75, 20, 40);
    ctx.font = "28px Helverica";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.textAlign = "left";
    ctx.fillText(": "+flag2.flagsCount, 33, 100);


    ctx.drawImage(flagImage, 320, 320, 160, 320, flag1.x, flag1.y, 40, 80);
    ctx.drawImage(flagImage, 320, 0, 160, 320, flag2.x, flag2.y, 40, 80);

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

function reset(flag){
  if(flag.name === "red"){
    console.log("Red car has won!");
  }
  else{
    console.log("Black car has won!");
  }
  car1.x = canvasW/2-100;
  car1.y = canvasH/2-50;
  car1.rotate = 0;
  flag1.flagsCount = 0;

  car2.x = canvasW/2;
  car2.y = canvasH/2-50;
  car2.rotate = 0;
  flag2.flagsCount = 0;

  $('.message').css('height', '100%');
}


function main(){
  var currTimePoint = new Date();
  var time = currTimePoint - prevTimePoint;

  updatePosition(time/1000);
  displayPosition();

  prevTimePoint = currTimePoint;

  requestAnimationFrame(main);
}
