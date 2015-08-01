/**
 * Created by user on 2015-07-31.
 */
var snake, apple, catSize, score, speed, squareSize,scalingFactor,
    updateDelay, direction, new_direction, cat, asteroid,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.audio("catMusic", "./assets/audio/MeowMix.mp3");
        game.load.image('asteroid', './assets/images/a10000.png');
        game.load.image('cat', './assets/images/uglyCat.png');
        game.load.image("background", "./assets/images/space6.jpg");
    },

    create : function() {
        cat = {};
        scalingFactor = 0;
        catSize = 1;
        /*asteroids = game.add.group();
        asteroids.enableBody = true;
        asteroids.physicsBodyType = Phaser.Physics.ARCADE;*/
        accumulateSize = 0;
        game.stage.backgroundColor = '#71c5cf';
        game.add.tileSprite(0,0,1000,600,'background');
        score = 0;

        this.generateAsteroids();
        //this.generateCat();

        game.add.text(30, 20, "SCORE" + score, textStyle_Key);
        music = game.add.audio('catMusic');
        music.loopFull();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cat = new Follower(this.game, this.game.width/2, this.game.height/2, this.game.input);
        this.game.add.existing(cat);
        cat.scale.setTo(0.5,0.5);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
    },

    update :function(){
        cat.rotation = game.physics.arcade.angleToPointer(cat);
        game.physics.arcade.overlap(cat, asteroids, Game.collisionHandler, null, this);
        cat.scale.setTo(0.5+scalingFactor,0.5+scalingFactor);
    },

    collisionHandler: function(asteroid, cat){
        console.log("Collision!");
        //asteroid.kill();

        if(accumulateSize>2){
            scalingFactor+=0.3;
            accumulateSize = 0;
        }else{
            accumulateSize++;
        }
        score+=10;
        cat.kill();

    },

    generateCat : function () {
        // X is between 0 and 585 (39*15)
        // Y is between 0 and 435 (29*15)
      var posY = game.height/2,
          posX = game.width/2;
        console.log(posY, posX);
        //add a new catgame.world.x = canvas.width/2;
        cat = game.add.sprite(posX, posY, 'cat', 2);
        cat.anchor.setTo(0.5);
        cat.smoothed = false;
        game.add.tween(cat.scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    },

    generateAsteroids : function () {


        // Make random asteroids initially of the same size in random positions
        asteroids = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for(var i = 0; i < game.rnd.integerInRange(2,10); i++){
            var s = asteroids.create(game.rnd.integerInRange(200, 0), game.rnd.integerInRange(200, 0), 'asteroid');
            s.scale.setTo((game.rnd.integerInRange(1,10))/10,(game.rnd.integerInRange(1,10))/10);
            s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
        }

        asteroids.setAll('body.collideWorldBounds', true);
        asteroids.setAll('body.bounce.x', 1);
        asteroids.setAll('body.bounce.y', 1);
        asteroids.setAll('body.immovable', true);

    }

    }

// Follower constructor
var Follower = function(game, x, y, target) {


    Phaser.Sprite.call(this, game, x, y, 'cat');

    this.game.physics.enable(this, Phaser.Physics.ARCADE);


    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);


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
        this.rotation =  game.physics.arcade.angleToPointer(this);


        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }

    game.physics.arcade.collide(asteroids);
};



