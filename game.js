/**
 * Catgar.io
 * Created by Carla Wilby and Shaaheen Sacoor
 * On the 31st July.
 */

    //Predefined variables
var catSize, score, speed, scalingFactor, cat, asteroid, scoreTextValue, textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
            //Loading imagery and audio for the game from the assets folder
        game.load.audio("catMusic", "./assets/audio/MeowMix.mp3");
        game.load.image('asteroid', './assets/images/a10000.png');
        game.load.image('cat', './assets/images/uglyCat.png');
        game.load.image("background", "./assets/images/space6.jpg");
    },

    create : function() {
        //Initialize variables
        scalingFactor = 0;      //Decides how much the cat must be scaled up by
        catSize = 1;            //Determines the current size of the cat
        accumulateSize = 0;     //Counter to track the amount of asteroids the cat has eaten
        score = 0;              //Tracks the score of the cat
        game.stage.backgroundColor = '#000000';
        game.add.tileSprite(0,0,1200,800,'background');

        this.generateAsteroids();
        //game.add.text(30, 20, "SCORE" + score, textStyle_Key);
        music = game.add.audio('catMusic');
        music.loopFull();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cat = new Follower(this.game, this.game.width/2, this.game.height/2, this.game.input);
        this.game.add.existing(cat);
        cat.scale.setTo(0.5,0.5);
        scoreTextValue = game.add.text(90, 18, "SCORE: " + score.toString(), textStyle_Value);
    },

    update :function(){
        scoreTextValue.text= "SCORE: " + score.toString();
        cat.rotation = game.physics.arcade.angleToPointer(cat);
        game.physics.arcade.overlap(cat, asteroids, Game.collisionHandler, null, this);
        cat.scale.setTo(0.5+scalingFactor,0.5+scalingFactor);
    },

    collisionHandler: function(asteroid, cat){
        /*
        If a cat is bigger than an asteroid, it can eat the asteroid
        But if the asteroid is bigger than the cat, it will be destroyed.
         */
        //asteroid.kill();
        //FIX THIS
        console.log("Asteroid Size: " + asteroid.s.name);
        console.log("Cat Size: " + (0.5 + scalingFactor));
        if ((0.5 + scalingFactor) < asteroid.s.name){
            asteroid.kill();
        }
        else{
            if(accumulateSize>2){
                scalingFactor+=0.3;
                accumulateSize = 0;
            }
            else{
                accumulateSize++;
            }
            score+=10;
            cat.kill();
        }
    },

    generateAsteroids : function () {
        // Make random asteroids of different sizes in random positions
        asteroids = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for(var i = 0; i <  10; i++){
            var s = asteroids.create(0, game.rnd.integerInRange(200, 0), 'asteroid');
            var size = game.rnd.integerInRange(1,10)*0.1;
            s.name = size;
            console.log(s.name);
            s.scale.setTo(size,size);
            s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
        }
        asteroids.setAll('body.collideWorldBounds', true);
        asteroids.setAll('body.bounce.x', 1);
        asteroids.setAll('body.bounce.y', 1);
        asteroids.setAll('body.immovable', true);
    }
    }

// Follower constructor to make the cat follow the cursor
var Follower = function(game, x, y, target) {
    Phaser.Sprite.call(this, game, x, y, 'cat');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;
    // Set the pivot point for this cat to the center
    this.anchor.setTo(0.5, 0.5);
    this.MAX_SPEED = 400;
    this.MIN_DISTANCE = 20;
};
Follower.prototype = Object.create(Phaser.Sprite.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.update = function() {
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



