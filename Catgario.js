/**
 * Created by user on 2015-07-31.
 */
var game;

game = new Phaser.Game(1000, 600, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.start('Menu');
//game.state.start('Game');

//game.state.start('Menu');
