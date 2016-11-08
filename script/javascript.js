var keysDown = {} //object that keeps codes of just pressed button
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var prevTimePoint = new Date(); //initialize prevTimePoint to the current Date when the game starts
var canvasW = window.innerWidth/1.1; //set canvas width
var canvasH = window.innerHeight-150; //set canvas height
var n = 5; //set the number of flags that player has to gather to WIN
var isAllowToMove = false; //if false don't make anythig on key press

//car object
function Car(x, y, speed, angle, imgSrc){
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.rotate = angle;
  this.img = imgSrc;
}

//flag object
function Flag(x, y, name){
  this.name = name;
  this.x = x;
  this.y = y;
  this.flagsCount = 0;
}

//game objects: 2 cars
var car1 = new Car(canvasW/2-100, canvasH/2-50, 256, 0, "imgs/Audi.png");
var car2 = new Car(canvasW/2, canvasH/2-50, 256, 0, "imgs/Police.png");

//game objects: 2 flags
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

    //when the game stars allow to read key press
    isAllowToMove = true;

    //clear winning message
    $('h1').html("");
    //slide start menu down
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
  //90 - rotate angle to get the right angle (see the sin/cos circle)
  var sinCar1 = Math.sin((90-car1.rotate)*Math.PI/180);
  var cosCar1 = Math.cos((90-car1.rotate)*Math.PI/180);
  var sinCar2 = Math.sin((90-car2.rotate)*Math.PI/180);
  var cosCar2 = Math.cos((90-car2.rotate)*Math.PI/180);

  //if it's allowed to make movements
  if(isAllowToMove){
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

    //detect when car reached the flag
    detectCollision(car1, flag1);
    detectCollision(car2, flag2);
  }
}

function detectCollision(car, flag){
  //condition of collision
  if(car.x <= flag.x + 40 &&
    flag.x <= car.x + 100 &&
    car.y <= flag.y + 80 &&
    flag.y <= car.y + 100
    ){
      flag.flagsCount++;

      //if one of the players gathered all flags
      if(flag.flagsCount === n){
        reset(flag);
      }
      //put flag into new random position
      placeFlag(flag);
  }
}

function placeFlag(flag){
  flag.x = Math.random()*(canvasW - 40);
  flag.y = Math.random()*(canvasH - 80);
}

//calculate movements...see circle sin/cos
function calculateMovements(sin, cos, car, timeModifier){
  if(sin > 0){
    if(car.y<=-20){
      car.y = canvasH-20;
    }
    if(sin != 1){
      if(cos>0){
        if(car.x >= canvasW+20){
          car.x = -80;
        }
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
      else{
        if(car.x <= -20){
          car.x = canvasW - 20;
        }
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
    }
    else{
      car.y -= (car.speed)*timeModifier;
    }
  }
  if(sin<0){
    if(car.y >= canvasH-80){
      car.y = -80;
    }
    if(sin != -1){
      if(cos>0){
        if(car.x >= canvasW+20){
          car.x = -80;
        }
        car.y -= (car.speed*sin)*timeModifier;
        car.x += (car.speed*cos)*timeModifier;
      }
      else{
        if(car.x <= -20){
          car.x = canvasW - 20;
        }
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
    //renew canvas
    canvas.width = canvas.width;

    //place logo of the flag in left corner
    ctx.drawImage(flagImage, 320, 320, 160, 320, 10, 30, 20, 40);
    ctx.font = "28px Helverica";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.textAlign = "left";
    ctx.fillText(": "+flag1.flagsCount, 33, 55);

    //place logo of different flag in the left corner
    ctx.drawImage(flagImage, 320, 0, 160, 320, 10, 75, 20, 40);
    ctx.font = "28px Helverica";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.textAlign = "left";
    ctx.fillText(": "+flag2.flagsCount, 33, 100);

    //draw both flags
    ctx.drawImage(flagImage, 320, 320, 160, 320, flag1.x, flag1.y, 40, 80);
    ctx.drawImage(flagImage, 320, 0, 160, 320, flag2.x, flag2.y, 40, 80);

    //rotate and redraw car1
    ctx.save();
    ctx.translate(car1.x+100/2, car1.y+100/2);
    ctx.rotate(car1.rotate * (Math.PI/180));
    ctx.translate(-(car1.x+100/2),-(car1.y+100/2));
    ctx.drawImage(carImage1, car1.x, car1.y, 100, 100);
    ctx.restore();

    //rotate and redraw car2
    ctx.translate(car2.x+100/2, car2.y+100/2);
    ctx.rotate(car2.rotate * (Math.PI/180));
    ctx.translate(-(car2.x+100/2),-(car2.y+100/2));
    ctx.drawImage(carImage2, car2.x, car2.y, 100, 100);
}

//reset the board
function reset(flag){
  if(flag.name === "red"){
    $('h1').html("<h1><span class='red'>RED</span> player has won!</h1><br>");
  }
  else{
    $('h1').html("<h1><span class='blue'>BLACK</span> player has won!</h1><br>");
  }

  //put car1 in the middle of the board
  car1.x = canvasW/2-100;
  car1.y = canvasH/2-50;
  car1.rotate = 0;
  flag1.flagsCount = 0;

  //put car2 in the middle of the board
  car2.x = canvasW/2;
  car2.y = canvasH/2-50;
  car2.rotate = 0;
  flag2.flagsCount = 0;

  isAllowToMove = false;
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
