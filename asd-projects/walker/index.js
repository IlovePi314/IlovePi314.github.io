/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var boardHeight = $(".board").width() - 1;
  var boardWidth = $(window).height() - 16;
  //object for all key presses needed for both players
  var key = {
    "DOWN": 40,
    "UP": 38,
    "LEFT": 37,
    "RIGHT": 39,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68
  }
  //Player Variables//
  //PLAYER 1//
  var positionX = 0
  var positionY = 0
  var speedX = 0
  var speedY = 0
  //PLAYER 2//
  var positionX2 = 0
  var positionY2 = 0
  var speedX2 = 0
  var speedY2 = 0



  $("#info").text(`${boardHeight} ${boardWidth}`)
  // Game Item Objects    remember to add an id for player 1 and player 2


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionWalker();
    redrawWalker();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === key.DOWN) {
      console.log("down pressed")
    } 
    console.log(event)
  }








  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionWalker() {
    positionX += speedX;
    positionX2 += speedX2;
    positionY += speedY;
    positionY2 += speedY2
  }
  function redrawWalker() {
    $("p1").css("left", positionX);
    $("p1").css("top", positionY);
    $("p2").css("left", positionX2);
    $("p2").css("top", positionY2);
  }


  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
