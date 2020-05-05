var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
       //Types of things to use spike, sawblade enemy, reward. use x and y to change the objects coordinents (in blue)
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "spike", "x": 300, "y": groundY },
                { "type": "spike", "x": 600, "y": groundY },
                { "type": "spike", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 450, "y": groundY - 110},
                { "type": "sawblade", "x": 750, "y": groundY - 110},
                { "type": "sawblade", "x": 1050, "y": groundY - 110},
                { "type": "spike", "x": 1200, "y": groundY },
                { "type": "spike", "x": 1400, "y": groundY },
                { "type": "spike", "x": 1600, "y": groundY },
                { "type": "enemy", "x": 1200, "y": groundY - 50},
                { "type": "enemy", "x": 1400, "y": groundY - 100},
                { "type": "enemy", "x": 1600, "y": groundY - 50},
                { "type": "reward", "x": 1800, "y": groundY - 100},
            
            
            /---add things above here--- /
            
            ]
        };
         for (var i = 0; i < levelData.gameItems.length; i++) {
        var firstGameItemObject = levelData.gameItems[i];
        var firstX = firstGameItemObject.x;
        var firstY = firstGameItemObject.y;
         if ( firstGameItemObject.type === "sawblade") {
         createSawBlade(firstX, firstY);
         }
        else if ( firstGameItemObject.type === "spike") {
            createSpike(firstX, firstY);
          }
        else if ( firstGameItemObject.type === "enemy" ) {
            createEnemy(firstX, firstY);
            } 
            else if ( firstGameItemObject.type === "reward"){
                createReward(firstX, firstY);
            }
        }
         
        
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
   function createSawBlade(x, y){
    var hitZoneSize = 25;
    var damageFromObstacle = 15;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
       sawBladeHitZone.x = x;
       sawBladeHitZone.y = y; 
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
   }
      function createSpike(x, y){
     var hitZoneSize = 17;
     var damageFromObstacle = 5;
     var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        spikeHitZone.x = x;
        spikeHitZone.y = y; 
        game.addGameItem(spikeHitZone);
        var obstacleImage = draw.bitmap('img/41-411572_triangle-white-outline-of-a-triangle-hd-png.png');
        spikeHitZone.addChild(obstacleImage);
        obstacleImage.x = -15;
        obstacleImage.y = -25;
      }
        function createEnemy(x, y) {
        var enemy =  game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = groundY-50;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;
        
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
        game.changeIntegrity(-10);
        enemy.fadeOut();
        };
        enemy.onProjectileCollision = function() {
            console.log("Halle has hit an enemy");
            game.increaseScore(100);
            enemy.fadeOut();
        }; 
        }
       function createReward(x, y) {
           var reward = game.createGameItem('reward',25);
           var goldSquare = draw.rect(50,50,'gold');
          goldSquare.x = -25;
          goldSquare.y = -25;
          reward.addChild(goldSquare);
          reward.x = x;
          reward.y = y;
          game.addGameItem(reward);
          reward.velocityX = -1;
          reward.rotationalVelocity = 1;
          reward.onPlayerCollision = function() {
              console.log("Halle has collected the reward");
              game.increaseScore(9700);
              reward.fadeOut();
          };
       }
       
        // DO NOT EDIT CODE BELOW HERE
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
