/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();
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

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp)                           // change 'eventType' to the type of event you want to handle
  positionstuff();
  startBall();


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(0);
    moveObject(1);
    moveObject(2);

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === key.W){
      gameItems[2].speedY = -5
    }
    if (event.which === key.S){
      gameItems[2].speedY = 5
    }
    if (event.which === key.UP){
      gameItems[1].speedY = -5
    }
    if (event.which === key.DOWN){
      gameItems[1].speedY = 5
    }
    if (event.which === key.T){
      gameItems[0].speedY *= -1
    }
    if (event.which === key.G){
      gameItems[0].speedY *= -1
    }
  }
  function handleKeyUp(event) {
    if (event.which === key.W){
      gameItems[2].speedY = 0
    }
    if (event.which === key.S){
      gameItems[2].speedY = 0
    }
    if (event.which === key.UP){
      gameItems[1].speedY = 0
    }
    if (event.which === key.DOWN){
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
  function positionstuff(){
    $("#board").css("width", $(window).width() - 19);
    $("#board").css("height", $(window).height() - 20);
    $("#midline").css("height", $(window).height() - 20)
    $("#midline").css("left", $("#board").width() / 2)
    $("#leftpaddle").css("top", $("#board").height() / 2 - 65)
    $("#rightpaddle").css("top", $("#board").height() / 2 - 65)
    $("#rightpaddle").css("left", $("#board").width() - 75)
    $("#leftpaddle").css("left", 65)
    $("#scoreP1").css ("left", ($("#board").width() / 2) - 200)
    $("#scoreP2").css ("left", ($("#board").width() / 2) + 150)
    $("#ball").css("left", $("#board").width() / 2 - 7)
    $("#ball").css("top", $("#board").height() / 2 - 7)
    gameItems[0].x = $("#ball").css("left")
    gameItems[0].y = $("#ball").css("top")
    gameItems[1].x = $("#rightpaddle").css("left")
    gameItems[1].y = $("#rightpaddle").css("top")
    gameItems[2].x = $("#leftpaddle").css("left")
    gameItems[2].y = $("#leftpaddle").css("top")
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
  function startBall(){
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    gameItems[0].speedX = randomNum
  }
  function moveObject(num){
    gameItems[num].x += gameItems[num].speedX
    gameItems[num].y += gameItems[num].speedY
    $(gameItems[num].name).css("left", gameItems[id].x);
    $(gameItems[num].name).css("top", gameItems[id].y);
  }


}
