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


var player1Score = 0;
var player2Score = 0;
const WINNIG_SCORE =3;

var showingWinScreen = false;

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

function handleMouseClick(evt){
    if (showingWinScreen) {
      player1Score=0;
      player2Score=0;
      showingWinScreen = false;
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

          canvas.addEventListener('mousedown',handleMouseClick);


          canvas.addEventListener('mousemove',function(evt){
                  var mousePos = calculateMousePos(evt);
                  paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
          });


}


function ballReset(){

  if (player1Score >= WINNIG_SCORE || player2Score >= WINNIG_SCORE) {
        showingWinScreen = true;
        // player1Score = 0;
        // player2Score = 0;
  }

  //changing direction when it resets
  ballSpeedX = -ballSpeedX;

  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement(){

  var paddle2YCenter = paddle2Y+(PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY-35) {
        paddle2Y += 6;
    }else if(paddle2YCenter > ballY+35){
      paddle2Y -= 6;
    }
}


function moveEverything(){

  if (showingWinScreen) {
      return;
  }

  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX >canvas.width) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2);
        ballSpeedY = deltaY*0.35;
    }else {
      player1Score ++;
      ballReset();
    }
  }
  if (ballX <0) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;

        var deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2);
        ballSpeedY = deltaY*0.35;

    }else {
      player2Score ++;
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

function drawNet(){
  for (var i = 0; i < canvas.height; i+=40) {
    colorRect(canvas.width/2,i,2,20,'white');
  }
}

function drawEverything(){
  //canvas ground
  colorRect(0,0,canvas.width,canvas.height,'black');

  if (showingWinScreen) {
          canvasContext.fillStyle = 'white';
          // canvasContext.font="30px Arial";

          if (player1Score >= WINNIG_SCORE){
            canvasContext.fillText("You Won!",350,200);
          } else if (player2Score >= WINNIG_SCORE) {
            canvasContext.fillText("Computer Won!",350,200);
          }
          canvasContext.fillText("Click to continue",350,500);
            return;
  }

  drawNet();

  //player paddle left side
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  // computer paddle
  colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');


  //ball
  colorCircle(ballX,ballY,10,'white');

  //score stuff
  canvasContext.fillText(player1Score,100,100);
  canvasContext.fillText(player2Score,canvas.width-100,100);



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
