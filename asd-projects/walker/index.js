/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  $("#competitive").css("top", ($(window).height() / 2));
  $("#competitive").css("left", ($(".board").width() / 2 - 150));
  $("#classic").css("left", ($(".board").width() / 2 + 25));
  $("#classic").css("top", ($(window).height() / 2));


  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var boardWidth = $(".board").width() - 1;
  var boardHeight = $(window).height() - 16;
  //console.log(players[1].y); 
  //Player Variables//
  //PLAYER 1//
  var players = [
    {//p1
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0,
      it: false
    },
    {//p2
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0,
      it: false
    },
    {//p3 when in right mode will be used
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0,
      it: false
    },
    {//p4
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0,
      it: false
    }

  ]
  players[0].x = 100;
  players[0].y = $(window).height() / 2;
  //PLAYER 2//
  players[1].x = $(".board").width() - 150;
  players[1].y = $(window).height() / 2;
  //object for all key presses needed for both players
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
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76
  }


  // flag and misc
  var paused = true;
  var goodToTag = true;
  var it;
  //mode is set to competative so it shows who is it before a mode is selected//
  var mode = "competative";
  /////setup mode////
  $("#competitive").on("click", competitiveSelect);
  $("#classic").on("click", classicSelect);


  /////////////////////////////////////////////////
  ////logic for restart and selecting who is it////
  /////////////////////////////////////////////////
  //with Math.celi could rarely give 0//
  var rng = Math.floor(Math.random() * 2) + 1

  if (rng === 1 && mode === "competative") {
    $("#whoit").text("(☞ﾟヮﾟ)☞  Player 1 is it  ☜(ﾟヮﾟ☜)")
    it = 1
  }
  if (rng === 2 && mode === "competative") {
    $("#whoit").text("(☞ﾟヮﾟ)☞  Player 2 is it  ☜(ﾟヮﾟ☜)")
    it = 2
  }
  $("#whoit").css("top", ($(window).height() / 2) - 200)
  $("#whoit").css('left', ($('.board').width() / 2) - 250)
  /*
 player identifications will remain in same place
  relatives to the players regardless of resolution
*/
  $('#start1').css('left', players[0].x - 10);
  $('#start2').css('left', players[1].x - 10);
  $('#start1').css('top', players[0].y - 35)
  //positions of other things
  $("#info").text(`${boardHeight} ${boardWidth}`)

  // one-time setup
  if (paused != false) {
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
    $(document).on('keyup', handleKeyUp);
  }
  // $(document).on('keydown', )
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // if (badRange > Math.sqrt(Math.sqr(positionX1 - positionX2) + Math.sqr(positionY1 - positionY2)))
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  //if (paused === false) {
  function newFrame() {
    //code for tag when the player thats it touches the other
    var centerP1X = players[0].x + (55 / 2);
    var centerP1Y = players[0].y + (55 / 2);
    var centerP2X = players[1].x + (55 / 2);
    var centerP2Y = players[1].y + (55 / 2);

    ///////////////////////// 
    //code for classic mode//
    /////////////////////////
    if (goodToTag) {
      if (50 > Math.sqrt(Math.pow(centerP1X - centerP2X, 2) + Math.pow(centerP1Y - centerP2Y, 2)) && mode === "classic") {

        if (it === 1) {
          it = 2
          $("#whoit").show();
          $("#whoit").text("Player " + it + " is it");
          $("#whoit").css("left", ($(".board").width() / 2) - 100)
        }
        else if (it === 2) {
          it = 1
          $("#whoit").show();
          $("#whoit").text("Player " + it + " is it");
          $("#whoit").css("left", ($(".board").width() / 2) - 100)
        }
        goodToTag = false;
        setTimeout(() => { goodToTag = true; }, 2000);
      }
    }
    /////////////////////////////
    //code for competative mode//
    /////////////////////////////
    if (50 > Math.sqrt(Math.pow(centerP1X - centerP2X, 2) + Math.pow(centerP1Y - centerP2Y, 2)) && mode === "competitive") {
      $("#whoit").show();
      $("#whoit").css("left", ($(".board").width() / 2) - 100)
      $("#whoit").text("Player " + it + " wins");
      if (!paused) {
        players[1].speedX = players[1].speedY = players[0].speedX = players[0].speedY = 0;
        clearInterval(interval);
        setTimeout(resume, 4000);
        paused = true;
      }
    }
    ///////////////////////
    //code for freeze tag//
    ///////////////////////
    //if (50 > Math.sqrt(Math.pow(centerP1X - centerP2X, 2) + Math.pow(centerP1Y - centerP2Y, 2)) && mode === "freezetag"){

    //}
    //keeps P1 within playing field//
    if (players[0].y > boardHeight - 50) {
      players[0].speedY = 0;
      players[0].y -= 1;
    }
    if (players[0].y < 0) {
      players[0].speedY = 0;
      players[0].y += 1;
    }
    if (players[0].x > boardWidth - 50) {
      players[0].speedX = 0;
      players[0].x -= 1;
    }
    if (players[0].x < 0) {
      players[0].speedX = 0;
      players[0].x += 1;
    }
    //keeps P2 in playing field//
    if (players[1].y > boardHeight - 50) {
      players[1].speedY = 0;
      players[1].y -= 1;
    }
    if (players[1].y < 0) {
      players[1].speedY = 0;
      players[1].y += 1;
    }
    if (players[1].x > boardWidth - 50) {
      players[1].speedX = 0;
      players[1].x -= 1;
    }
    if (players[1].x < 0) {
      players[1].speedX = 0;
      players[1].x += 1;
    }
    //calling the functions the reposition the walker as well as the css for them//
    repositionWalker();
    redrawWalker();
  }
  //}
  /////////////
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (!paused) {
      if (mode === "competitive") {
        $("#whoit").hide()
      }
      $("#start1").hide()
      $("#start2").hide()
      if (event.which === key.DOWN && players[0].y < boardHeight - 56) {
        players[0].speedY = 5;
      }
      if (event.which === key.LEFT && players[0].x > 0) {
        players[0].speedX = -5;
      }
      if (event.which === key.RIGHT && players[0].x < boardWidth - 50) {
        players[0].speedX = 5
      }
      if (event.which === key.UP && players[0].y > 1) {
        players[0].speedY = -5;
      }
      if (event.which === key.S && players[1].y < boardHeight - 55) {
        players[1].speedY = 5;
      }
      if (event.which === key.A && players[1].x > 5) {
        players[1].speedX = -5;
      }
      if (event.which === key.D && players[1].x < boardWidth - 55) {
        players[1].speedX = 5
      }
      if (event.which === key.W && players[1].y > 6) {
        players[1].speedY = -5;
      }
    }
  }

  function handleKeyUp(event) {
    if (event.which === key.DOWN) {
      players[0].speedY = 0;
    }
    if (event.which === key.LEFT) {
      players[0].speedX = -0;
    }
    if (event.which === key.RIGHT) {
      players[0].speedX = 0
    }
    if (event.which === key.UP) {
      players[0].speedY = -0;
    }
    if (event.which === key.S) {
      players[1].speedY = 0;
    }
    if (event.which === key.A) {
      players[1].speedX = -0;
    }
    if (event.which === key.D) {
      players[1].speedX = 0
    }
    if (event.which === key.W) {
      players[1].speedY = -0;
    }
  }







  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionWalker() {
    players[0].x += players[0].speedX;
    players[1].x += players[1].speedX;
    players[0].y += players[0].speedY;
    players[1].y += players[1].speedY;
  }
  function redrawWalker() {
    $("#p1").css("left", players[0].x);
    $("#p1").css("top", players[0].y);
    $("#p2").css("left", players[1].x);
    $("#p2").css("top", players[1].y);
  }



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function resume() {
    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    setTimeout(restart, 1000);
  }

  function restart() {
    players[1].x = $(".board").width() - 150;
    players[0].x = 100
    players[0].y = $(window).height() / 2;
    players[1].y = $(window).height() / 2;
    var rng = Math.floor(Math.random() * 2) + 1

    if (rng === 1) {
      $("#whoit").text("(☞ﾟヮﾟ)☞  Player 1 is it  ☜(ﾟヮﾟ☜)")
      it = 1
    }
    if (rng === 2) {
      $("#whoit").text("(☞ﾟヮﾟ)☞  Player 2 is it  ☜(ﾟヮﾟ☜)")
      it = 2
    }

    $("#whoit").css("top", ($(window).height() / 2) - 200)
    $("#whoit").css('left', ($('.board').width() / 2) - 250)

    paused = false;

  }
  //mode select helper functions
  function competitiveSelect() {
    mode = "competitive"
    $("p").hide();
    $("#p3").hide();
    $("#p4").hide();
    paused = false
  }
  function classicSelect() {
    mode = "classic"
    $("p").hide();
    $("#p3").hide();
    $("#p4").hide();
    paused = false
  }


}


