/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var key = {
    "DOWN": 40,
    "UP": 38,
    "LEFT": 37,
    "RIGHT": 39,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
    "T": 84,
    "G": 71
  }
  // Game Item Objects
  var gameItems = [
    CreateGameItem(ball), //[0]
    CreateGameItem(rightpaddle), //[1]
    CreateGameItem(leftpaddle) //[2]
  ]
paused = true
  // one-time setup

  if (paused === false){
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  }
  
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp)                           // change 'eventType' to the type of event you want to handle
  positionstuff();
  gameItems[0].height = 15
  gameItems[0].width = 15
  gameItems[1].height = $("#rightpaddle").css("height")
  gameItems[1].width = $("#rightpaddle").css("width")
  gameItems[2].height = $("#leftpaddle").css('height')
  gameItems[2].width = $("#leftpaddle").css("width")
  var p1score = 0;
  var p2score = 0;
  var paddlespeed = 5;
  var paddlenegspeed = -5;
  //must be called after things are positioned
  const boardWidth = $("#board").width();
  const boardHeight = $("#board").height();
  $("#start").on("click", start);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    //$("#scoreP1").text(paddlespeed)
    //$("#scoreP2").text(gameItems[0].speedY)             //custom debugger because school board is annoying and blocked inspect
    moveObject(0);
    moveObject(1);
    moveObject(2);
    collisionWithWall(0);
    collisionWithWall(1);
    collisionWithWall(2);
    doCollide(gameItems[0], gameItems[1])
    doCollide(gameItems[0], gameItems[2])
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === key.W && gameItems[2].y >= 5) {
      gameItems[2].speedY = paddlenegspeed
    }
    if (event.which === key.S && gameItems[2].y + 135 <= boardHeight) {
      gameItems[2].speedY = paddlespeed
    }
    if (event.which === key.UP && gameItems[1].y >= 5) {
      gameItems[1].speedY = paddlenegspeed
    }
    if (event.which === key.DOWN && gameItems[1].y + 135 <= boardHeight) {
      gameItems[1].speedY = paddlespeed
    }
    if (event.which === key.T) {
      gameItems[0].speedY *= -1
    }
    if (event.which === key.G) {
      gameItems[0].speedX *= -1
    }

  }
  function handleKeyUp(event) {
    if (event.which === key.W) {
      gameItems[2].speedY = 0
    }
    if (event.which === key.S) {
      gameItems[2].speedY = 0
    }
    if (event.which === key.UP) {
      gameItems[1].speedY = 0
    }
    if (event.which === key.DOWN) {
      gameItems[1].speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function positionstuff() {
    $("#board").css("width", $(window).width() - 19);
    $("#board").css("height", $(window).height() - 20);
    $("#midline").css("height", $(window).height() - 20)
    $("#midline").css("left", $("#board").width() / 2);
    $("#leftpaddle").css("top", $("#board").height() / 2 - 65);
    $("#rightpaddle").css("top", $("#board").height() / 2 - 65);
    $("#rightpaddle").css("left", $("#board").width() - 75);
    $("#leftpaddle").css("left", 65);
    $("#scoreP1").css("left", ($("#board").width() / 2) - 200);
    $("#scoreP2").css("left", ($("#board").width() / 2) + 150);
    $("#ball").css("left", $("#board").width() / 2 - 7);
    $("#ball").css("top", $("#board").height() / 2 - 7);
    gameItems[0].x = parseFloat($("#ball").css("left"))
    gameItems[0].y = parseFloat($("#ball").css("top"))
    gameItems[1].x = parseFloat($("#rightpaddle").css("left"))
    gameItems[1].y = parseFloat($("#rightpaddle").css("top"))
    gameItems[2].x = parseFloat($("#leftpaddle").css("left"))
    gameItems[2].y = parseFloat($("#leftpaddle").css("top"))
    $("#start").css("top", (($(window).height() / 2) + 50))
    $("#start").css("left", ($(window).width() / 2 - 80))
  }

  function CreateGameItem(item) {
    var purhaps = {};
    purhaps.name = item;
    purhaps.x = 0
    purhaps.y = 0
    purhaps.speedX = 0;
    purhaps.speedY = 0;
    return purhaps;
  }
  function startBall() {
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    var randomNum2 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    gameItems[0].speedX = randomNum
    gameItems[0].speedY = randomNum2
    
  }
  function moveObject(num) {
    gameItems[num].x += gameItems[num].speedX 
    gameItems[num].y += gameItems[num].speedY
    $(gameItems[num].name).css("left", gameItems[num].x);
    $(gameItems[num].name).css("top", gameItems[num].y);
  }
  function collisionWithWall(num) {
    if (gameItems[num].y + 15 >= boardHeight && num === 0) {
      gameItems[num].speedY *= -1
    }
    if (gameItems[num].y <= 0 && num === 0) {
      gameItems[num].speedY *= -1
    }
    if (gameItems[num].x <= 15) {
      p2score++
      $("#scoreP2").text(p2score)
      $("#ball").css("left", $("#board").width() / 2 - 7);
      $("#ball").css("top", $("#board").height() / 2 - 7);
      gameItems[0].x = parseFloat($("#ball").css("left"))
      gameItems[0].y = parseFloat($("#ball").css("top"))
      paddlenegspeed = -5
      paddlespeed = 5
      gameItems[0].speedX = 0
      gameItems[0].speedy = 0
      startBall();

     // setTimeout(resume, 1500);
     // paused = true;
    }
    if (gameItems[num].x >= boardWidth - 15) {
      p1score++
      $("#scoreP1").text(p1score)
      $("#ball").css("left", $("#board").width() / 2 - 7);
      $("#ball").css("top", $("#board").height() / 2 - 7);
      gameItems[0].x = parseFloat($("#ball").css("left"))
      gameItems[0].y = parseFloat($("#ball").css("top"))
      paddlenegspeed = -5
      paddlespeed = 5
      gameItems[0].speedX = 0
      gameItems[0].speedY = 0
      startBall();
     // setTimeout(resume, 1500);
    //  paused = true;
    }
    if (gameItems[1].y <= 0) {
      gameItems[1].speedY = 0
      gameItems[1].y += 1
    }
    if (gameItems[1].y + 130 >= boardHeight) {
      gameItems[1].speedY = 0
      gameItems[1].y -= 1
    }
    if (gameItems[2].y <= 0) {
      gameItems[2].speedY = 0
      gameItems[2].y += 1
    }
    if (gameItems[2].y + 130 >= boardHeight) {
      gameItems[2].speedY = 0
      gameItems[2].y -= 1
    }

  }
  function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.right = square1.x + square1.width;
    square1.bottom = square1.y + square1.height;

    // TODO: Do the same for square2
    square2.leftX = square2.x
    square2.topY = square2.y
    square2.right = square2.x + 20;
    square2.bottom = square2.y + 130;
    // TODO: Return true if they are overlapping, false otherwise
    if (square1.right > square2.leftX &&
      square1.leftX < square2.right &&
      square1.bottom > square2.topY &&
      square1.topY < square2.bottom && square2.name === rightpaddle) {
      square1.speedX += 1
      square1.speedX *= -1
      square1.x -=1
      paddlenegspeed -= 1
      paddlespeed += 1
    }
    if (square1.right > square2.leftX &&
      square1.leftX < square2.right &&
      square1.bottom > square2.topY &&
      square1.topY < square2.bottom && square2.name === leftpaddle) {
      square1.speedX -= 1
      square1.speedX *= -1
      square1.x += 1
      paddlenegspeed -= 1
      paddlespeed += 1
    }
  }
function start(){
  $("#start").hide();
  gameItems[0].speedX = 0
  gameItems[0].speedY = 0
  startBall();
  interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  paused = false
}
function resume() {
  interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  setTimeout(restart, 1000);
}
function  restart(){
  gameItems[0].speedX = 0
  gameItems[0].speedY = 0
  paddlenegspeed = -5
  paddlespeed = 5
  startBall();
  paused = false
}




}
