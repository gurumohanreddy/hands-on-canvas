var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX =5;
window.onload = function(){
  canvas = document.getElementById('gamecanvas');
  canvasContext = canvas.getContext('2d');
  var framepersecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  },1000/framepersecond);

}


function moveEverything(){
  ballX = ballX +ballSpeedX;
  if (ballX >canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX <0) {
    ballSpeedX = -ballSpeedX;
  }
}

function drawEverything(){
  //canvas ground
  colorRect(0,0,canvas.width,canvas.height,'black');

  //paddle
  colorRect(0,100,10,100,'white');

  //ball
  colorCircle(ballX,150,10,'white');
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
