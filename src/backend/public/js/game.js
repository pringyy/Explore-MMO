class initialiseAssets extends Phaser.Scene {
    constructor() {
      super({
        key: 'initialiseAssets',
        active: true
        
      });
    }
  
    preload() {
      this.load.image('tiles', 'assets/world/tileset.png');
      this.load.image('watertiles', 'assets/world/water.png');
      this.load.tilemapTiledJSON('map', 'assets/world/world.json');
      this.load.spritesheet('player', 'assets/sprites/yoda.png', {
        frameWidth: 32,
        frameHeight: 48
      });

      this.load.spritesheet('darthvader', 'assets/sprites/darthvader.png', {
        frameWidth: 32,
        frameHeight: 48
      });

      
  
    }
  
    create() {
      this.scene.start('mapScene');
    }
  }
  
  class mapScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'mapScene'
      });
    }
  
    create() {
      this.socket = io();
      this.otherPlayers = this.physics.add.group();
  
      //Intialises map to user
      this.map = this.make.tilemap({
        key: 'map'
      });
  
      var tiles = this.map.addTilesetImage('tileset', 'tiles');
      var watertiles = this.map.addTilesetImage('water', 'watertiles');

      
      var ground = this.map.createStaticLayer('ground', tiles, 0, 0);
      var water = this.map.createStaticLayer('water', watertiles, 0, 0);
      var trees = this.map.createStaticLayer('trees', tiles, 0, 0);
      var wall = this.map.createStaticLayer('wall', tiles, 0, 0);
      var fence = this.map.createStaticLayer('fence', tiles, 0, 0);
      var ladders = this.map.createStaticLayer('ladders', tiles, 0, 0);
      
      
      water.setCollisionByExclusion([-1]);
      trees.setCollisionByExclusion([-1]); 
      wall.setCollisionByExclusion([-1]);
      
      
    
      //Handles boundaries of the map
      this.physics.world.bounds.width = this.map.widthInPixels;
      this.physics.world.bounds.height = this.map.heightInPixels;
 
  
      //Handles player animations when moving
      this.handleAnimations();
  
      //Handles user input from keyboard
      this.cursors = this.input.keyboard.createCursorKeys();
  
  
      // listen for web socket events
      this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === this.socket.id) {
            
            this.player = this.add.sprite(0, 0, 'player', 0);
            this.container = this.add.container(players[id].x, players[id].y);
            this.container.setSize(16, 16);
            this.physics.world.enable(this.container);
            this.container.add(this.player);
            this.updateCamera();
            this.container.body.setCollideWorldBounds(true);
            this.physics.add.collider(this.container,[trees,wall,water]);
  
          } else {
            this.addOtherPlayers(players[id]);
          }
        }.bind(this));
      }.bind(this));
  
      this.socket.on('newPlayer', function (info) {
        this.addOtherPlayers(info);
      }.bind(this));
  
      this.socket.on('disconnect', function (id) {
        this.otherPlayers.getChildren().forEach(function (player) {
          if (player.id === id) {
            player.destroy();
          }
        }.bind(this));
      }.bind(this));

        this.socket.on('playerMoved', function (playerInfo) {
            this.otherPlayers.getChildren().forEach(function (player) {
                if (playerInfo.playerId === player.playerId) {
                player.flipX = playerInfo.flipX;
                player.setPosition(playerInfo.x, playerInfo.y);
                }
            }.bind(this));
        }.bind(this));
    }
  
    createMap() {

      

    }
  
    handleAnimations() {
      
      this.anims.create({
        key: 'left',
        frameRate: 8,
        frames: this.anims.generateFrameNumbers('player', {start: 4, end:7})
      });
  
      this.anims.create({
        key: 'right',
        frameRate: 8,
        frames: this.anims.generateFrameNumbers('player', {start: 8, end:11})
      });
  
      this.anims.create({
        key: 'up',
        frameRate: 8,
        frames: this.anims.generateFrameNumbers('player', {start: 12, end:15})
      });
  
      this.anims.create({
        key: 'down',
        frameRate: 8,
        frames: this.anims.generateFrameNumbers('player', {start: 0, end:3})
      });
    }

  
    addOtherPlayers(playerInfo) {
      const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'darthvader', 0);
      otherPlayer.playerId = playerInfo.playerId;
      this.otherPlayers.add(otherPlayer);
      
    }
  
    updateCamera() {
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.cameras.main.startFollow(this.container);
      this.cameras.main.roundPixels = true;
    }
  
  
    getValidLocation() {
      var validLocation = false;
      var x, y;
      while (!validLocation) {
        x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
  
        var occupied = false;
        this.spawns.getChildren().forEach((child) => {
          if (child.getBounds().contains(x, y)) {
            occupied = true;
          }
        });
        if (!occupied) validLocation = true;
      }
      return { x, y };
    }
  
  
    update() {
      
      if (this.container) {
        this.container.body.setVelocity(0);
  
        
        //Handles verticle player movement
        if (this.cursors.up.isDown) {
          this.container.body.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
          this.container.body.setVelocityY(200);
        }

        //Handles horizontal player movement
        if (this.cursors.left.isDown) {
            this.container.body.setVelocityX(-200);
          } else if (this.cursors.right.isDown) {
            this.container.body.setVelocityX(200);
          }
  
        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.player.anims.play('left', true);
            
          } else if (this.cursors.right.isDown) {
            this.player.anims.play('right', true);
         
          } else if (this.cursors.up.isDown) {
            this.player.anims.play('up', true);
          } else if (this.cursors.down.isDown) {
            this.player.anims.play('down', true);
          } else {
            this.player.anims.stop();
          }


      //Handles moving player to the rest of players
      
      var y = this.container.y;
      var x = this.container.x;
      var flip = this.player.flipX;
      if (this.container.oldPosition && (x !== this.container.oldPosition.x || y !== this.container.oldPosition.y || flip!== this.container.oldPosition.flipX)) {
        this.socket.emit('playerMovement', { x, y, flip});
      }

      

      this.container.oldPosition = {
        x: this.container.x,
        y: this.container.y,
        flipX: this.player.flipX
      };
      }
    }
  }

  
  var config = {
    type: Phaser.AUTO,
    borderPadding: 10,
    parent: 'content',
    width:800,
    height: 400,
    zoom: 2,
    pixelArt: true,
    
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0
        },
        debug: false
      }
    },
    scene: [
      initialiseAssets,
      mapScene
    ]
  };
  var game = new Phaser.Game(config);
  