

/*Sets up game canvas*/
var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.start('Game');
var Game = {};


/*Allows for game to receive messages from the server even when the window is not open*/
Game.init = function(){
    game.stage.disableVisibilityChange = true;
};


/*Loads the assets to be displayed to the user*/
Game.preload = function() {
    game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png'); 
};


/*Function creates and displays the map*/
Game.create = function(){
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); 
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows for clicking on the map
};

/*Adds new player to the game*/
Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

/*Removes player from the game*/
Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};