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
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  positionstuff();



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {

  }
  function handleKeyUp(event) {
    
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
}
