/**
 * Created by user on 2015-07-31.
 */
var snake, apple, catSize, score, speed, squareSize,
    updateDelay, direction, new_direction, cat,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('asteroid', './assets/images/a10000.png');
        game.load.image('cat', './assets/images/uglyCat.png');
        game.load.image("background", "./assets/images/space6.jpg");
    },

    create : function() {
        cat = {};

        catSize = 1;
        asteroids = [];
        accumulateSize = 0;
        game.stage.backgroundColor = '#71c5cf';
        game.add.tileSprite(0,0,1000,600,'background');
        this.generateAsteroids();
        //this.generateCat();
        game.add.text(30, 20, "SCORE", textStyle_Key);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.existing(
            new Follower(this.game, this.game.width/2, this.game.height/2, this.game.input)
        );
        //scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
    },

    update :function(){
        cat.rotation = game.physics.arcade.angleToPointer(cat);
    },

    generateCat : function () {
        // X is between 0 and 585 (39*15)
        // Y is between 0 and 435 (29*15)
      var posY = game.height/2,
          posX = game.width/2;
        console.log(posY, posX);
        //add a new catgame.world.x = canvas.width/2;
        cat = game.add.sprite(posX, posY, 'cat');
        cat.anchor.setTo(0.5, 0.5);
    },

    generateAsteroids : function () {
        // Make random asteroids initially of the same size in random positions


        for(var i = 0; i < 5; i++){
            var posX = Math.floor(Math.random)*squareSize,
                posY = Math.floor(Math.random);
            // Add a new asteroid
            asteroid = game.add.sprite(posX, posY, 'asteroid');
        }
    }

}

// Follower constructor
var Follower = function(game, x, y, target) {
    Phaser.Sprite.call(this, game, x, y, 'cat');

    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on this object
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.MAX_SPEED = 250; // pixels/second
    this.MIN_DISTANCE = 32; // pixels
};

// Followers are a type of Phaser.Sprite
Follower.prototype = Object.create(Phaser.Sprite.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.update = function() {
    // Calculate distance to target
    var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

    // If the distance > MIN_DISTANCE then move
    if (distance > this.MIN_DISTANCE) {
        // Calculate the angle to the target
        var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
        this.rotation = game.physics.arcade.angleToPointer(this);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }
};

