class gameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "Game",
        });
    };

    init(){
        this.quest1Scene = this.scene.get('quest1Info');
        this.quest1UiScene = this.scene.get('quest1Ui');
        this.quest2Scene = this.scene.get('quest2Info');
        this.quest3Scene = this.scene.get('quest3Info');
        this.quest4Scene = this.scene.get('quest4Info');
        this.quest4UiScene = this.scene.get('quest4Ui');
        this.quest5Scene = this.scene.get('quest5Info');
        this.UiScene = this.scene.get('Ui');
        this.activeQuest = false;
        this.numberComplete;
        this.questProgress; 
    };

    create() {
    
        this.socket = io();
        this.otherPlayers = this.physics.add.group();
        this.scene.launch("Ui");
        checkQuest();
  
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
        var hatLayer = this.map.getObjectLayer('hatLayer')['objects'];
        var weaponsLayer = this.map.getObjectLayer('weaponsLayer')['objects'];
        var coinLayer = this.map.getObjectLayer('coinsLayer')['objects'];
        var coin = this.physics.add.staticGroup()
        var sword = this.physics.add.staticGroup()
        var hat = this.physics.add.staticGroup()
        
        //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
       
        this.npc1 = this.add.sprite(2224, 2865, "Cowan", 0);
        this.npc1Q = this.add.sprite(2224, 2830, "qmark").setScale(1.3);
        this.npc2 = this.add.sprite(1376, 3200, "Janet", 0);
        this.npc2Q = this.add.sprite(1376, 3165, "qmark").setScale(1.3);

        this.npc3 = this.add.sprite(2256, 512, "Rod", 0);this.npc3.setScale(0.8);
        this.npc3Q = this.add.sprite(2256, 477, "qmark").setScale(1.3);

        this.npc4 = this.add.sprite(1040, 64, "death", 0);
        this.npc4Q = this.add.sprite(1040, 29, "qmark").setScale(1.3);


        this.npc5 = this.add.sprite(5424, 4704, "Zak", 8);
        this.npc5Q = this.add.sprite(5424, 4669, "qmark").setScale(1.3);


        this.npc6 = this.add.sprite(5920, 1888, "Pringle", 0);
        this.npc6Q = this.add.sprite(5920, 1853, "qmark").setScale(1.3);

        this.npc7 = this.add.sprite(6560, 4224, "Priest", 1);
        this.npc7Q = this.add.sprite(6560, 4189, "qmark").setScale(1.3);

        water.setCollisionByExclusion([-1]);
        trees.setCollisionByExclusion([-1]);
        building.setCollisionByExclusion([-1]);
        buildingaddon.setCollisionByExclusion([-1]);

        this.eventTriggers();
        

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
                    this.physics.add.collider(this.container, [trees,water,building,buildingaddon]);
                    this.physics.add.overlap(this.container, coin, this.collectCoin, null, this);
                    this.physics.add.overlap(this.container, sword, this.collectSword, null, this);
                    this.physics.add.overlap(this.container, hat, this.collectHat, null, this);

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

        this.quest1Scene.events.on('questActivated', () => {
            this.activeQuest=true;
        })

        this.quest1UiScene.events.on('questDeactivated', () => {
            this.activeQuest=false;
        })

        this.quest4Scene.events.on('questActivated', () => {
            this.activeQuest=true;
        })

        this.quest4UiScene.events.on('questDeactivated', () => {
            this.activeQuest=false;
        })
        

        this.quest2Scene.events.on('questActivated', () => {
            this.createObjects(coinLayer, coin, "coin");
        })

            
        this.quest3Scene.events.on('questActivated', () => {
            this.createObjects(hatLayer, hat, "hat");
        })

        this.quest4Scene.events.on('questActivated', () => {
            this.activeQuest=true;
        })

        this.quest5Scene.events.on('questActivated', () => {
            this.createObjects(weaponsLayer, sword, "sword");    
        })

       
       
        
    }

    createObjects(layer, item, itemImage){
        this.activeQuest=true;
        var numberOfItems = 0;
        layer.forEach(object => {
            let obj = item.create(object.x, object.y, itemImage); 
            obj.setOrigin(0);
            obj.body.width = object.width; 
            obj.body.height = object.height;
            numberOfItems ++;
        });
        this.itemsLeft = numberOfItems;  
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

    addOtherPlayers(playerInfo) {
        this.otherPlayer = this.add.sprite(0, 0,"otherplayer",0);     
        const container = this.add.container(playerInfo.x, playerInfo.y);
        container.setSize(16, 16);
        container.add(this.otherPlayer);
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

    //resets arrow keys to stop player moving uncontrollably when a new scene starts
    sleep() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    }

    collectHat(player, hat) {
        hat.destroy(hat.x, hat.y); // remove the tile/coin
        this.itemsLeft --
        this.checkComplete(this.itemsLeft);
    }

    collectSword(player,sword) {
        sword.destroy(sword.x, sword.y); // remove the tile/coin
        this.itemsLeft --;
        this.events.emit('swordCollected', this.itemsLeft)
        this.checkComplete(this.itemsLeft);
    }

    collectCoin(player,coin) {
        coin.destroy(coin.x, coin.y); // remove the tile/coin
        this.itemsLeft --;
        this.events.emit('coinCollected', this.itemsLeft)
        this.checkComplete(this.itemsLeft);
    }

    checkComplete(itemsLeft){
        
        if (this.itemsLeft <= 0){
            this.events.emit('completedQuest');
            this.scene.launch("completedNotification")
            this.activeQuest= false;
            this.scene.pause('Game');
            checkQuest();
            this.sleep();
        }
    }
      
    eventTriggers(){

        
        
        // Get key object
        var keyObj = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
       
        //Trigger for quest1
        this.map.setTileLocationCallback(42, 100, 2, 2, () => {
            this.events.emit('updateLocation', "in the Maze")
            this.launchQuest(keyObj, 'quest1Info', 'quest1')
        });

        //Trigger for quest2
        this.map.setTileLocationCallback(68, 89, 3, 2,() => {
             this.launchQuest(keyObj, 'quest2Info', 'quest2')
        });
 
        //Trigger for quest3
        this.map.setTileLocationCallback(69, 16, 3, 2,() => {
            this.launchQuest(keyObj, 'quest3Info', 'quest3');
        });

        //Trigger for quest4
        this.map.setTileLocationCallback(31, 2, 2, 3,() => {
            this.launchQuest(keyObj, 'quest4Info', 'quest4');
        });

        //Trigger for quest5
        this.map.setTileLocationCallback(169, 146, 3, 3,() => {
            this.launchQuest(keyObj, 'quest5Info', 'quest5');
        });

        //Teleport into church
        this.map.setTileLocationCallback(127, 88, 1, 1, () => {
            if (this.scene.isActive("quest4Ui")){
                this.scene.stop("quest4Ui");
                this.scene.pause("Game");
                this.sleep();
                completedQuest("quest4");
                this.activeQuest = false;
                checkQuest();
                this.events.emit('progress', numberCompleted)
                this.scene.launch("completedNotification");
            }
            this.events.emit('updateLocation', "in the Church")
            this.container.setPosition(6688, 4736);
        });

        //Teleport out of church
        this.map.setTileLocationCallback(209, 149, 1, 1, () => {
            this.events.emit('updateLocation', "in the Swamp")
            this.container.setPosition(4064, 2880);
        });

        //Teleport into church basement
        this.map.setTileLocationCallback(215, 133, 1, 1, () => {
            this.container.setPosition(6624, 3440);
        });

        //Teleport out of church basement
        this.map.setTileLocationCallback(205, 107, 1, 2, () => {
            this.container.setPosition(6848, 4256);
        });

        //Teleport into blacksmith
        this.map.setTileLocationCallback(82, 88, 1, 1, () => {
             
         

            this.events.emit('updateLocation', "in the Blacksmith")
            this.container.setPosition(5552, 4740);    
        });

        //Teleport out of blacksmith
        this.map.setTileLocationCallback(173, 149, 1, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
            this.container.setPosition(2640, 2880);
        });

        //Teleport into pub
        this.map.setTileLocationCallback(67, 88, 1, 1, () => {
            alert(numberCompleted)
                this.events.emit('updateLocation', "in the Pub")
                this.container.setPosition(5936, 3904);
        });

        //Teleport out of pub
        this.map.setTileLocationCallback(185, 123, 1, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
            this.container.setPosition(2160, 2880);
        });

        //Teleport into pub basement
        this.map.setTileLocationCallback(189, 114, 1, 1, () => {
            this.container.setPosition(5856, 2976);
        });

        //Teleport out of pub basement
        this.map.setTileLocationCallback(181, 93, 1, 2, () => {
            this.container.setPosition(6016, 3648);
        });

        this.map.setTileLocationCallback(103, 100, 1, 2, () => {
            this.events.emit('updateLocation', "in the Swamp")
        });

        this.map.setTileLocationCallback(96, 100, 1, 2, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });

        this.map.setTileLocationCallback(73, 120, 3, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });
        this.map.setTileLocationCallback(52, 100, 1, 3, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });

        this.map.setTileLocationCallback(73, 126, 3, 1, () => {
            this.events.emit('updateLocation', "in the Swamp")
        });

        this.map.setTileLocationCallback(44, 99, 3, 4, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        this.map.setTileLocationCallback(71, 100, 3, 4, () => {
            this.events.emit('progress', numberCompleted)
        });

        this.map.setTileLocationCallback(71, 12, 1, 1, () => {
            this.events.emit('updateLocation', "scaling Mount Kong")
        });

        this.map.setTileLocationCallback(71, 14, 1, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        this.map.setTileLocationCallback(73, 83, 3, 1, () => {
            this.events.emit('updateLocation', "in the Spawn")
        });

        this.map.setTileLocationCallback(73, 78, 3, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
        });
        this.map.setTileLocationCallback(73, 16, 1, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        this.map.setTileLocationCallback(19, 68, 3, 3, () => {
            this.events.emit('updateLocation', "in the Forest")
        });

        this.map.setTileLocationCallback(19, 64, 3, 1, () => {
            this.events.emit('updateLocation', "in the Forest of the Dead")
        });

        //Teleport into grave
        this.map.setTileLocationCallback(133, 132, 1, 1, () => {
            this.events.emit('updateLocation', "in a hole")
            this.container.setPosition(7760, 4384);
        });


         //Teleport out of grave
         this.map.setTileLocationCallback(242, 132, 1, 1, () => {
            this.events.emit('updateLocation', "in the Swamp")
            this.container.setPosition(4272, 4192);
        });

         //Teleport into gulag
         this.map.setTileLocationCallback(10, 35, 2, 1, () => {
            this.events.emit('updateLocation', "in the Gulag")
            this.container.setPosition(9216, 4640);
        });

        //Teleport out of gulag
        this.map.setTileLocationCallback(287, 146, 2, 1, () => {
            this.events.emit('updateLocation', "in the Forest of the Dead")
            this.container.setPosition(352, 1162);
        });

         //Teleport into farm house
        this.map.setTileLocationCallback(107, 61, 1, 1, () => {
            this.events.emit('updateLocation', "in the Farm house")
            this.container.setPosition(7760, 3584);
        });

        //Teleport out of farm house
        this.map.setTileLocationCallback(242, 113, 1, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
            this.container.setPosition(3440, 2016);
        });

        //Teleport into inn
        this.map.setTileLocationCallback(41, 68, 1, 1, () => {
            this.events.emit('updateLocation', "in the Inn")
            this.container.setPosition(7248, 2752);
        });

        //Teleport out of inn
        this.map.setTileLocationCallback(226, 87, 1, 1, () => {
            this.events.emit('updateLocation', "in the Forest")
            this.container.setPosition(1328, 2240);
        });

     

        //Teleport into the hall of champiobs
         this.map.setTileLocationCallback(67, 61, 2, 2, () => {
            if (numberCompleted <= 4){
                this.events.emit('updateLocation', "in the Hall of Champions")
                this.container.setPosition(5920, 2272);
            } else {
                this.scene.launch('Interact', {text: "Locked: come back when you complete the game"})
            }
        });

         //Teleport out of the game complete room
         this.map.setTileLocationCallback(184, 72, 2, 1, () => {
                this.events.emit('updateLocation', "in the Forest")
                this.container.setPosition(2176, 2016);
         
        });


        //Event trigger for completing the maze
        this.map.setTileLocationCallback(12, 106, 4, 4, () => {
            if (this.scene.isActive("quest1Ui")){
                this.scene.stop("quest1Ui");
                completedQuest("quest1");
                this.activeQuest = false;
                this.scene.launch("completedNotification");
                checkQuest();
            }
        });

        this.map.setTileLocationCallback(184, 59, 2, 2, () => {
            this.launchQuest(keyObj, 'completeGame');
     
         });
         this.map.setTileLocationCallback(203, 132, 3, 2, () => {
            this.launchQuest(keyObj, 'priestScene');
     
         });

         this.map.setTileLocationCallback(208, 132, 3, 3, () => {
            this.launchQuest(keyObj, 'mountainGuide');
     
         });




         this.map.setTileLocationCallback(109, 48, 1, 1, () => {
            this.container.setPosition(8944, 352)
         });

         this.map.setTileLocationCallback(279, 13, 1, 1, () => {
            this.container.setPosition(3504, 1600)
         });

         this.map.setTileLocationCallback(294, 12, 1, 1, () => {
            this.container.setPosition(4304, 1568)
         });

         this.map.setTileLocationCallback(134, 47, 1, 1, () => {
            this.container.setPosition(9424, 320)
         });








         this.map.setTileLocationCallback(130, 22, 1, 1, () => {
            this.container.setPosition(9424, 1120)
         });

         this.map.setTileLocationCallback(294, 37, 1, 1, () => {
            this.container.setPosition(4176, 768)
         });

         this.map.setTileLocationCallback(279, 38, 1, 1, () => {
            this.container.setPosition(3344, 896)
         });

         this.map.setTileLocationCallback(104, 26, 1, 1, () => {
            this.container.setPosition(8944, 1152)
         });



         this.map.setTileLocationCallback(118, 20, 1, 1, () => {
            this.container.setPosition(9424, 1888)
         });
         this.map.setTileLocationCallback(294, 61, 1, 1, () => {
            this.container.setPosition(3792, 704)
         });

         this.map.setTileLocationCallback(279, 62, 1, 1, () => {
            this.container.setPosition(3312, 480)
         });
         this.map.setTileLocationCallback(103, 13, 1, 1, () => {
            this.container.setPosition(8944, 1920)
         });




         this.map.setTileLocationCallback(111, 38, 1, 1, () => {
            this.container.setPosition(8944, 2720)
         });
         this.map.setTileLocationCallback(279, 87, 1, 1, () => {
            this.container.setPosition(3568, 1280)
         });

         this.map.setTileLocationCallback(294, 86, 1, 1, () => {
            this.container.setPosition(4496, 960)
         });
         this.map.setTileLocationCallback(140, 28, 1, 1, () => {
            this.container.setPosition(9424, 2688)
         });

    }

    launchQuest(keyObj, scene, quest){  
       
        
        if (!this.activeQuest && !this.scene.isActive("Interact")) {
                this.scene.launch("Interact", {text: "Press E to interact"})
        }
        if (keyObj.isDown && !this.activeQuest){
            
            console.log(numberCompleted)
            
            console.log(questStatus)
          
            this.scene.stop("Interact");
            keyObj.isDown = false;
            this.scene.pause();
            console.log(questStatus)
            this.scene.launch(scene, {completed: questStatus[quest]}); 
            this.sleep();

        }     
    }


       

       

    
    update() {
        this.events.emit('progress', numberCompleted)
       
        var speed;
       
        
       
        if (numberCompleted != 5){
            speed = 180
        } else {
            speed=300
        }
        
        
        if (this.container) {
            this.container.body.setVelocity(0);
            //Handles verticle player movement
            if (this.cursors.up.isDown) {
                this.container.body.setVelocityY(-speed);
            } else if (this.cursors.down.isDown) {
                this.container.body.setVelocityY(speed);
            }

            //Handles horizontal player movement
            if (this.cursors.left.isDown) {
                this.container.body.setVelocityX(-speed);
            } else if (this.cursors.right.isDown) {
                this.container.body.setVelocityX(speed);
            }
          

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


