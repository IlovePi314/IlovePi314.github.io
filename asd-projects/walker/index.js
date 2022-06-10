/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

$("#competative").css("top", ($(window).height() / 2))
$("#competative").css("left", ($(".board").width() / 2 - 150))



  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var boardWidth = $(".board").width() - 1;
  var boardHeight = $(window).height() - 16;
   //Player Variables//
  //PLAYER 1//
  var positionX = 100;
  var positionY = $(window).height() / 2;
  var speedX = 0
  var speedY = 0
  //PLAYER 2//
  var positionX2 = $(".board").width() - 150;
  var positionY2 = $(window).height() / 2;
  var speedX2 = 0
  var speedY2 = 0
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
 

  // flag
  var paused = false;
  var it;
 
  /////////////////////////////////////////////////
  ////logic for restart and selecting who is it////
  /////////////////////////////////////////////////
      //with Math.celi could rarely give 0//
   var rng = Math.floor(Math.random() * 2) + 1

  if (rng === 1){
    $("#whoit").text("(☞ﾟヮﾟ)☞  Player 1 is it  ☜(ﾟヮﾟ☜)")
    it = 1
  }
  if (rng === 2){
    $("#whoit").text("(☞ﾟヮﾟ)☞  Player 2 is it  ☜(ﾟヮﾟ☜)")
    it = 2
  }
  $("#whoit").css("top", ($(window).height() / 2) - 200)
  $("#whoit").css('left', ($('.board').width() / 2) - 250)
  /*
 player identifications will remain in same place
  relatives to the players regardless of resolution
*/
  $('#start1').css('left', positionX - 10);
  $('#start2').css('left', positionX2 - 10);
  $('#start1').css('top', positionY - 35)
//positions of other things
  $("#info").text(`${boardHeight} ${boardWidth}`)
  
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
 // $(document).on('keydown', )
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // if (badRange > Math.sqrt(Math.sqr(positionX1 - positionX2) + Math.sqr(positionY1 - positionY2)))
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //code for tag when the player thats it touches the other
    var centerP1X = positionX + (55 / 2);
    var centerP1Y = positionY +(55 / 2);
    var centerP2X = positionX2 + (55 / 2);
    var centerP2Y = positionY2 + (55 / 2);
    
    if (50 > Math.sqrt(Math.pow(centerP1X - centerP2X, 2) + Math.pow(centerP1Y - centerP2Y, 2))) {
      $("#whoit").show();
      $("#whoit").css("left", ($(".board").width() / 2) - 100)
      $("#whoit").text("Player " + it + " wins");
      
      if (!paused){
        speedX2 = speedX = speedY2 = speedY = 0;
        clearInterval(interval);
        setTimeout(resume, 5000);
        paused = true;
      }
    }

    //keeps P1 within playing field//
    if (positionY > boardHeight - 50) {
      speedY = 0;
      positionY -= 1;
    }
    if (positionY < 0) {
      speedY = 0;
      positionY += 1;
    }
    if (positionX > boardWidth - 50) {
      speedX = 0;
      positionX -= 1;
    }
    if (positionX < 0) {
      speedX = 0;
      positionX += 1;
    }
    //keeps P2 in playing field//
    if (positionY2 > boardHeight - 50) {
      speedY2 = 0;
      positionY2 -= 1;
    }
    if (positionY2 < 0) {
      speedY2 = 0;
      positionY2 += 1;
    }
    if (positionX2 > boardWidth - 50) {
      speedX2 = 0;
      positionX2 -= 1;
    }
    if (positionX2 < 0) {
      speedX2 = 0;
      positionX2 += 1;
    }
    //calling the functions the reposition the walker as well as the css for them//
    repositionWalker();
    redrawWalker();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (!paused){
    $("#whoit").hide()
    $("#start1").hide()
    $("#start2").hide()
    if (event.which === key.DOWN && positionY < boardHeight - 56) {
      speedY = 5;
    }
    if (event.which === key.LEFT && positionX > 0) {
      speedX = -5;
    }
    if (event.which === key.RIGHT && positionX < boardWidth - 50) {
      speedX = 5
    }
    if (event.which === key.UP && positionY > 1) {
      speedY = -5;
    }
    if (event.which === key.S && positionY2 < boardHeight - 55) {
      speedY2 = 5;
    }
    if (event.which === key.A && positionX2 > 5) {
      speedX2 = -5;
    }
    if (event.which === key.D && positionX2 < boardWidth - 55) {
      speedX2 = 5
    }
    if (event.which === key.W && positionY2 > 6) {
      speedY2 = -5;
    }
  }
  }

  function handleKeyUp(event) {
    if (event.which === key.DOWN) {
      speedY = 0;
    }
    if (event.which === key.LEFT) {
      speedX = -0;
    }
    if (event.which === key.RIGHT) {
      speedX = 0
    }
    if (event.which === key.UP) {
      speedY = -0;
    }
    if (event.which === key.S) {
      speedY2 = 0;
    }
    if (event.which === key.A) {
      speedX2 = -0;
    }
    if (event.which === key.D) {
      speedX2 = 0
    }
    if (event.which === key.W) {
      speedY2 = -0;
    }
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
    $("#p1").css("left", positionX);
    $("#p1").css("top", positionY);
    $("#p2").css("left", positionX2);
    $("#p2").css("top", positionY2);
  }



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function resume(){
    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    setTimeout(restart, 1000);
  }

  function restart(){
    positionX2 = $(".board").width() - 150;
    positionX = 100
    positionY = $(window).height() / 2;
    positionY2 = $(window).height() / 2;
    var rng = Math.floor(Math.random() * 2) + 1

    if (rng === 1){
      $("#whoit").text("(☞ﾟヮﾟ)☞  Player 1 is it  ☜(ﾟヮﾟ☜)")
      it = 1
    }
    if (rng === 2){
      $("#whoit").text("(☞ﾟヮﾟ)☞  Player 2 is it  ☜(ﾟヮﾟ☜)")
      it = 2
    }
    
    $("#whoit").css("top", ($(window).height() / 2) - 200)
    $("#whoit").css('left', ($('.board').width() / 2) - 250)
    
    paused = false;

  }
  //helper helper function//

}


