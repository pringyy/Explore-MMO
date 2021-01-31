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
      this.load.spritesheet("Zak", "assets/sprites/zak.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("player", "assets/sprites/player.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("otherplayer", "assets/sprites/otherplayer.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("Rod", "assets/sprites/rod.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("Janet", "assets/sprites/blonde.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("Cowan", "assets/sprites/cowan.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("Pringle", "assets/sprites/pringle.png",{frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("death", "assets/sprites/death.png", {frameWidth: 32,frameHeight: 48,});
      this.load.spritesheet("qmark", "assets/sprites/qmark.png",{frameWidth: 16,frameHeight: 24,});
    }

    loadTileMap(){
      this.load.tilemapTiledJSON("map", "assets/world/world.json");
    }

    loadImages(){
      this.load.image("logo", "assets/images/logo2.png");
      this.load.image("cross1", "assets/images/cross.png");
      this.load.image("cross2", "assets/images/cross2.png");
      //Load UI element
      this.load.image("button1", "assets/images/button1.png");
      this.load.image("button2", "assets/images/button2.png");
      //Load tilesets and objects for map
      this.load.image("tiles", "assets/world/tileset.png");
      this.load.image("watertiles", "assets/world/water.png");
      this.load.image("coin", "assets/world/coins.png");
      this.load.image("hat", "assets/world/coins.png");
      this.load.image("sword", "assets/world/sword.png");
      
      
    }

    create() {
    this.scene.start("Title");
    }
 };