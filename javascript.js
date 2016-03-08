var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX =10;
var ballSpeedY =4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;



function calculateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
      x:mouseX,
      y:mouseY
    }
}

window.onload = function(){
  canvas = document.getElementById('gamecanvas');
  canvasContext = canvas.getContext('2d');
  var framepersecond = 30;
          setInterval(function(){
            moveEverything();
            drawEverything();
          },1000/framepersecond);

      canvas.addEventListener('mousemove',function(evt){
              var mousePos = calculateMousePos(evt);
              paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
      });


}


function ballReset(){

  //changing direction when it resets
  ballSpeedX = -ballSpeedX;

  ballX = canvas.width/2;
  ballY = canvas.height/2;
}


function moveEverything(){
  ballX = ballX +ballSpeedX;
  ballY = ballY +ballSpeedY;
  if (ballX >canvas.width) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }else {
      ballReset();
    }
  }
  if (ballX <0) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }else {
      ballReset();
    }
  }
  if (ballY >canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY <0) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything(){
  //canvas ground
  colorRect(0,0,canvas.width,canvas.height,'black');

  //player paddle left side
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  // computer paddle
  colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');


  //ball
  colorCircle(ballX,ballY,10,'white');
}

function colorRect(leftX,topY,width,height,drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle(centerX,centerY,radius,drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2);
  canvasContext.fill();
}
