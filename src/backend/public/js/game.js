class initialiseAssets extends Phaser.Scene {
    constructor() {
      super({
        key: 'initialiseAssets',
        active: true
      });
    }
  
    preload() {
      this.load.image('tiles', 'assets/map/tilesheet.png');
      this.load.tilemapTiledJSON('map', 'assets/map/map.json');
      this.load.spritesheet('player', 'assets/sprites.png', {
        frameWidth: 16,
        frameHeight: 16
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
      this.createMap();
  
      //Handles player animations when moving
      this.handleAnimations();
  
      //Handles user input from keyboard
      this.cursors = this.input.keyboard.createCursorKeys();
  
  
      // listen for web socket events
      this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === this.socket.id) {
            this.createPlayer(players[id]);
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

      this.map = this.make.tilemap({
        key: 'map'
      });
  
      var tiles = this.map.addTilesetImage('spritesheet', 'tiles', 16, 16, 1, 2);

      this.map.createStaticLayer('Grass', tiles, 0, 0);
      this.map.createStaticLayer('Obstacles', tiles, 0, 0);
  
      //Handles boundaries of the map
      this.physics.world.bounds.width = this.map.widthInPixels;
      this.physics.world.bounds.height = this.map.heightInPixels;
    }
  
    handleAnimations() {
      
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [1]
        }),
      });
  
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [1]
        }),
      });
  
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [2]
        }),
      });
  
      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [0]
        }),
      });
    }
  
    createPlayer(playerInfo) {
    
      this.player = this.add.sprite(0, 0, 'player', 6);
      this.container = this.add.container(playerInfo.x, playerInfo.y);
      this.container.setSize(16, 16);
      this.physics.world.enable(this.container);
      this.container.add(this.player);
      this.updateCamera();
      this.container.body.setCollideWorldBounds(true);
      this.physics.add.collider(this.container, this.spawns);
    }
  
    addOtherPlayers(playerInfo) {
      const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'player', 9);
      otherPlayer.setTint(Math.random() * 0xffffff);
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
          this.container.body.setVelocityY(-50);
        } else if (this.cursors.down.isDown) {
          this.container.body.setVelocityY(50);
        }

        //Handles horizontal player movement
        if (this.cursors.left.isDown) {
            this.container.body.setVelocityX(-50);
          } else if (this.cursors.right.isDown) {
            this.container.body.setVelocityX(50);
          }
  
        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.player.anims.play('left', true);
            this.player.flipX = true;
          } else if (this.cursors.right.isDown) {
            this.player.anims.play('right', true);
            this.player.flipX = false;
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
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 4,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0
        },
        debug: true 
      }
    },
    scene: [
      initialiseAssets,
      mapScene
    ]
  };
  var game = new Phaser.Game(config);
  