class gameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "Game",
        });
    }

    init(){
        this.quest1Scene = this.scene.get('quest1Info');
        this.quest2Scene = this.scene.get('quest2Info');
        this.quest3Scene = this.scene.get('quest3Info');
        this.quest4Scene = this.scene.get('quest4Info');
        this.quest5Scene = this.scene.get('quest5Info');
        this.UiScene = this.scene.get('Ui');
    
        
        this.startedQuest = false;
        this.container;
        this.coinsLeft = 10;
        this.swordFound = false;
        this.activeQuest = false;
        this.socket;
       
    }
    create() {

        this.socket = io();
        this.otherPlayers = this.physics.add.group();
         this.scene.launch("Ui");

        //Intialises map to user
        this.map = this.make.tilemap({key: "map",});
        var watertiles = this.map.addTilesetImage("water", "watertiles");
        var tiles = this.map.addTilesetImage("tileset", "tiles");
        var ground = this.map.createStaticLayer("ground", tiles, 0, 0);
        var ground2 = this.map.createStaticLayer("ground2", tiles, 0, 0);
        var water = this.map.createStaticLayer("water", watertiles, 0, 0);
        var ladders = this.map.createStaticLayer("ladders", tiles, 0, 0);
        var building = this.map.createStaticLayer("building", tiles, 0, 0);
        var buildingaddon = this.map.createStaticLayer("buildingaddon", tiles, 0, 0);
        var trees = this.map.createStaticLayer("trees", tiles, 0, 0);
        var coinsLayer = this.map.getObjectLayer('coinsLayer')['objects'];
        var swordLayer = this.map.getObjectLayer('swordLayer')['objects'];

        var coins = this.physics.add.staticGroup()
        var sword = this.physics.add.staticGroup()
        //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
       
        this.npc1 = this.add.sprite(2224, 2865, "pubNPC", 0);
        this.npc1Q = this.add.sprite(2224, 2830, "qmark");this.npc1Q.setScale(1.3);
        
        this.npc2 = this.add.sprite(1376, 3200, "pubNPC", 0);
        this.npc2Q = this.add.sprite(1376, 3165, "qmark");this.npc2Q.setScale(1.3);

       
        this.npc3 = this.add.sprite(2256, 512, "pubNPC", 0);this.npc3.setScale(0.8);
        this.npc3Q = this.add.sprite(2256, 477, "qmark");this.npc3Q.setScale(1.3);

        this.npc4 = this.add.sprite(1040, 64, "death", 0);
        this.npc4Q = this.add.sprite(1040, 29, "qmark");this.npc4Q.setScale(1.3);


        this.npc5 = this.add.sprite(5424, 4704, "pubNPC", 8);
        this.npc5Q = this.add.sprite(5424, 4669, "qmark");this.npc5Q.setScale(1.3);

        water.setCollisionByExclusion([-1]);
        trees.setCollisionByExclusion([-1]);
        building.setCollisionByExclusion([-1]);

        this.eventTriggers(building, coinsLayer, coins);

        //Handles boundaries of the map
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;

       

        //Handles player animations when moving
        this.handleAnimations();
        

        //Handles user input from keyboard
        this.cursors = this.input.keyboard.createCursorKeys();

        // listen for web socket events
        this.socket.on(
        "currentPlayers",
        function (players) {
            Object.keys(players).forEach(
            function (id) {

                if (players[id].playerId === this.socket.id) {

                    this.player = this.add.sprite(0, 0, "player", 0);
                    this.container = this.add.container(players[id].x, players[id].y);
                    this.container.setSize(16, 16);
                    this.physics.world.enable(this.container);
                    this.container.add(this.player);
                    this.updateCamera();
                    this.container.body.setCollideWorldBounds(true);
                    this.physics.add.collider(this.container, [trees,water,building,]);
                    this.physics.add.overlap(this.container, coins, this.collectCoin, null, this);
                    this.physics.add.overlap(this.container, coins, this.collectSword, null, this);

                } else {
                    this.addOtherPlayers(players[id]);
                }
            }.bind(this));
        }.bind(this));

        this.socket.on("newPlayer",function (info) {
            this.addOtherPlayers(info);
            }.bind(this)
        );

        this.socket.on("remove", function (id) {
            this.otherPlayers.getChildren().forEach(function (player) {
                if (player.playerId === id) {
                    player.destroy();
                }
            }.bind(this));
        }.bind(this));

        this.socket.on(
        "playerMoved",
        function (playerInfo) {
            this.otherPlayers.getChildren().forEach(
            function (player) {
                if (playerInfo.playerId === player.playerId) {
                player.flipX = playerInfo.flipX;
                player.setPosition(playerInfo.x, playerInfo.y);
                }
            }.bind(this)
            );
        }.bind(this)
        );

        this.socket.on("new user message", (data) => {
            const usernameSpan = document.createElement("span");
            const usernameText = document.createTextNode(data.username);
            usernameSpan.className = "username";
            usernameSpan.appendChild(usernameText);
            const messageBodySpan = document.createElement("span");
            const messageBodyText = document.createTextNode(data.message);
            messageBodySpan.className = "messageBody";
            messageBodySpan.appendChild(messageBodyText);
            const messageList = document.createElement("li");
            messageList.setAttribute("username", data.username);
            messageList.append(usernameSpan);
            messageList.append(messageBodySpan);
            addMessageElement(messageList);
        });

        this.quest1Scene.events.on('questOneActivated', () => {
            this.activeQuest=true;
            
            
        })
        this.quest2Scene.events.on('questTwoActivated', () => {
            this.activeQuest=true;
            coinsLayer.forEach(object => {
                let obj = coins.create(object.x, object.y, "coin"); 
                obj.setOrigin(0);
                obj.body.width = object.width; 
                obj.body.height = object.height; 
            });
        })

            
        this.quest3Scene.events.on('questThreeActivated', () => {
        this.activeQuest=true;
        swordLayer.forEach(object => {
            let obj = sword.create(object.x, object.y, "coin"); 
            obj.setOrigin(0);
            obj.body.width = object.width; 
            obj.body.height = object.height; 
            }); 
        })

        this.quest4Scene.events.on('questFourActivated', () => {
            this.activeQuest=true;
            coinsLayer.forEach(object => {
                let obj = coins.create(object.x, object.y, "coin"); 
                obj.setOrigin(0);
                obj.body.width = object.width; 
                obj.body.height = object.height; 
            });
        })

        this.quest5Scene.events.on('questFiveActivated', () => {
            this.activeQuest=true;
            coinsLayer.forEach(object => {
                let obj = coins.create(object.x, object.y, "coin"); 
                obj.setOrigin(0);
                obj.body.width = object.width; 
                obj.body.height = object.height; 
            });
        })

       
        
    }

    handleAnimations() {
        this.anims.create({
        key: "left",
        frameRate: 8,
        frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
        });

        this.anims.create({
        key: "right",
        frameRate: 8,
        frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
        });

        this.anims.create({
        key: "up",
        frameRate: 8,
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
        });

        this.anims.create({
        key: "down",
        frameRate: 8,
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        });
    }

    collectCoin(player, coin) {
        coin.destroy(coin.x, coin.y); // remove the tile/coin
        console.log(this.coinsLeft);
        this.coinsLeft --;
        this.events.emit('updateScore', this.coinsLeft)
        
    }

    collectSword(player, sword){
        sword.destroy(sword.x, sword.y);
        this.swordFound = true;
        this.events.emit('completed');
    }

    addOtherPlayers(playerInfo) {
        this.otherPlayer = this.add.sprite(0, 0,"darthvader",0);     
        var text = this.add.text(0, 0, 'testuser', { backgroundColor: '	rgb(0, 0, 0)'});text.alpha = 0.5;
        text.setOrigin(0.5, 2.9);
        text.setScale(0.7);
        const container = this.add.container(playerInfo.x, playerInfo.y);
        container.setSize(16, 16);
        container.add(this.otherPlayer);
        container.add(text);
        container.playerId = playerInfo.playerId;
        this.otherPlayers.add(container);
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

    sleep() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
      }

      

    eventTriggers(building, coinsLayer, coins){
        // Get key object
        var keyObj = this.input.keyboard.addKey('E');
       
        //Trigger for quest1
        building.setTileLocationCallback(42, 100, 2, 2, () => {
            this.events.emit('updateLocation', "in the Maze")
            this.launchQuest(keyObj, 'quest1Info')
        });

        //Trigger for quest2
        building.setTileLocationCallback(68, 89, 3, 2,() => {
            var quest = checkQuest();
            console.log(quest);
            if (checkQuest() == true){
            this.launchQuest(keyObj, 'quest2Info')
             }   
            
        });
 
        //Trigger for quest3
        building.setTileLocationCallback(69, 16, 3, 2,() => {
            this.launchQuest(keyObj, 'quest3Info');
        });

        //Trigger for quest4
        building.setTileLocationCallback(31, 2, 2, 3,() => {
            this.launchQuest(keyObj, 'quest4Info');
        });

        //Trigger for quest5
        building.setTileLocationCallback(169, 146, 3, 3,() => {
            this.launchQuest(keyObj, 'quest5Info');
        });

       
    

        //Teleport into church
        building.setTileLocationCallback(127, 88, 1, 1, () => {
            this.events.emit('updateLocation', "in the Church")
            this.container.setPosition(6688, 4736);
        });

        //Teleport out of church
        building.setTileLocationCallback(209, 149, 1, 1, () => {
            this.events.emit('updateLocation', "in the Swamp")
            this.container.setPosition(4064, 2880);
        });

        //Teleport into church basement
        building.setTileLocationCallback(215, 133, 1, 1, () => {
            this.container.setPosition(6624, 3440);
        });

        //Teleport out of church basement
        building.setTileLocationCallback(205, 107, 1, 2, () => {
            this.container.setPosition(6848, 4256);
        });

        //Teleport into blacksmith
        building.setTileLocationCallback(82, 88, 1, 1, () => {
            checkQuest();
            this.events.emit('updateLocation', "in the Blacksmith")
            this.container.setPosition(5552, 4740);
            
        });

        //Teleport out of blacksmith
        building.setTileLocationCallback(173, 149, 1, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
            this.container.setPosition(2640, 2880);
        });

        //Teleport into pub
        building.setTileLocationCallback(67, 88, 1, 1, () => {
                this.events.emit('updateLocation', "in the Pub")
                this.container.setPosition(5936, 3904);
        });

        //Teleport out of pub
        building.setTileLocationCallback(185, 123, 1, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
            this.container.setPosition(2160, 2880);
        });

        //Teleport into pub basement
        building.setTileLocationCallback(189, 114, 1, 1, () => {
            this.container.setPosition(5856, 2976);
        });

        //Teleport out of pub basement
        building.setTileLocationCallback(181, 93, 1, 2, () => {
            this.container.setPosition(6016, 3648);
        });

        building.setTileLocationCallback(103, 100, 1, 2, () => {
            this.events.emit('updateLocation', "in the Swamp")
        });

        building.setTileLocationCallback(96, 100, 1, 2, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });

        building.setTileLocationCallback(73, 120, 3, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });
        building.setTileLocationCallback(52, 100, 1, 3, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });


        building.setTileLocationCallback(73, 126, 3, 1, () => {
            this.events.emit('updateLocation', "in the Swamp")
        });

        building.setTileLocationCallback(44, 99, 3, 4, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        building.setTileLocationCallback(71, 12, 1, 1, () => {
            this.events.emit('updateLocation', "scaling Mount Kong")
        });

        building.setTileLocationCallback(71, 14, 1, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        building.setTileLocationCallback(73, 83, 3, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });

        building.setTileLocationCallback(73, 78, 3, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
        });
        building.setTileLocationCallback(73, 16, 1, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        //Teleport into grave
        building.setTileLocationCallback(133, 132, 1, 1, () => {
            this.container.setPosition(7760, 4384);
        });


         //Teleport out of grave
         building.setTileLocationCallback(242, 132, 1, 1, () => {
            this.container.setPosition(4272, 4192);
        });

         //Teleport into gulag
         building.setTileLocationCallback(10, 35, 2, 1, () => {
            this.container.setPosition(9216, 4640);
        });

        //Teleport out of gulag
        building.setTileLocationCallback(287, 146, 2, 1, () => {
            this.container.setPosition(352, 1162);
        });


         //Teleport into farm house
         building.setTileLocationCallback(107, 61, 1, 1, () => {
            this.container.setPosition(7760, 3584);
        });

        //Teleport out of farm house
        building.setTileLocationCallback(242, 113, 1, 1, () => {
            this.container.setPosition(3440, 2016);
        });

        //Teleport into inn
        building.setTileLocationCallback(41, 68, 1, 1, () => {
            this.container.setPosition(7248, 2752);
        });

        //Teleport out of inn
        building.setTileLocationCallback(226, 87, 1, 1, () => {
            this.container.setPosition(1328, 2240);
        });




    }

    launchQuest(keyObj, scene){
        
        if (keyObj.isDown == true/* && this.activeQuest==false*/){
            this.sleep();
            keyObj.isDown = false;
            this.scene.pause();
            this.scene.launch(scene);  
        }  
    


        
    }

    MovePlayer(keyObj, scene){
        console.log('test');
        if (keyObj.isDown == true /*&& this.activeQuest==false*/){
            this.sleep();
            keyObj.isDown = false;
            this.scene.pause();
            this.scene.launch(scene);  
        }  
    
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
            this.test = false;

            
            // Update the animation last and give left/right animations precedence over up/down animations
            if (this.cursors.left.isDown) {
                this.player.anims.play("left", true);
            } else if (this.cursors.right.isDown) {
                this.player.anims.play("right", true);
            } else if (this.cursors.up.isDown) {
                this.player.anims.play("up", true);
            } else if (this.cursors.down.isDown) {
                this.player.anims.play("down", true);
            } else {
                this.player.anims.stop();
            }

            //Handles moving player to the rest of players
            var y = this.container.y;
            var x = this.container.x;
            var flip = this.player.flipX;

            if (this.container.oldPosition && (x !== this.container.oldPosition.x || y !== this.container.oldPosition.y ||flip !== this.container.oldPosition.flipX)) {
                this.socket.emit("playerMovement", { x, y, flip });
            }

          

            this.container.oldPosition = {
                x: this.container.x,
                y: this.container.y,
                flipX: this.player.flipX,
            };

        }
    }
        
      
    

};