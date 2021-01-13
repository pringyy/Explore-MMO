class initialiseAssets extends Phaser.Scene {
    
    constructor() {
        super({
          key: "initialiseAssets",
          active: true,
        });
    }
    
    
    preload() {
      this.loadSprites();
      this.loadTileMap();
      this.loadImages();
    }
    
    loadSprites() {
      this.load.spritesheet("player", "assets/sprites/yoda.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("darthvader", "assets/sprites/darthvader.png", {frameWidth: 32,frameHeight: 48,});
    }

    loadTileMap(){
      this.load.tilemapTiledJSON("map", "assets/world/world.json");
    }

    loadImages(){
      //Load UI element
      this.load.image("button1", "assets/images/button1.png");
      this.load.image("button2", "assets/images/button2.png");
      //Load tilesets and objects for map
      this.load.image("tiles", "assets/world/tileset.png");
      this.load.image("watertiles", "assets/world/water.png");
      this.load.image("coin", "assets/world/coins.png");
    }

    create() {
    this.scene.start("Title");
    }
 };