import * as Phaser from 'phaser';

export default class initialiseAssets extends Phaser.Scene {
    constructor() {
        super({
          key: "initialiseAssets",
          active: true,
        });
    }
    
    preload() {
    this.load.image("tiles", "assets/world/tileset.png");
    this.load.image("watertiles", "assets/world/water.png");
    this.load.tilemapTiledJSON("map", "assets/world/world.json");
    this.load.spritesheet("player", "assets/sprites/yoda.png", {frameWidth: 32,frameHeight: 48,});
    this.load.spritesheet("darthvader", "assets/sprites/darthvader.png", {frameWidth: 32,frameHeight: 48,});
    }

    create() {
    this.scene.start("mapScene");
    }
 }
