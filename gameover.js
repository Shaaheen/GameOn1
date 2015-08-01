/**
 * Created by user on 2015-07-31.
 */
var Game_Over = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('gameover', './assets/images/CatMenu.jpg');
    },

    create : function() {

        // Create button to start game similar to the main menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Last Score Info.
        game.add.text(430, 350, "LAST SCORE", { font: "bold 25px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(510, 400, score.toString(), { font: "bold 30px sans-serif", fill: "#fff", align: "center" });

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};