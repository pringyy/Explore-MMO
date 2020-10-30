/*I used this tutorial to learn how to do this with Phasher: https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js*/
var game = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.start('Game');