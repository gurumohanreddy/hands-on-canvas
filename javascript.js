var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX =10;
var ballSpeedY =4;

var paddle1 = 250;
const PADDLE_HEIGHT = 100;
var paddle2 = 250;


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
              paddle1 = mousePos.y-(PADDLE_HEIGHT/2);
      });


}


function moveEverything(){
  ballX = ballX +ballSpeedX;
  ballY = ballY +ballSpeedY;
  if (ballX >canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX <0) {
    ballSpeedX = -ballSpeedX;
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

  //paddle
  colorRect(0,paddle1,10,PADDLE_HEIGHT,'white');
  // colorRect(0,paddle2,10,100,'white');


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
