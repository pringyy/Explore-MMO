class quest2ModalScene extends Phaser.Scene {
    constructor(){
        super ('quest2Info');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    }

    create() {
        console.log("test");
        this.setupUiElements();
    };

    setupUiElements () {
        //create the score text game object
        this.rectangle1 = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.6, this.scale.height*0.6, 0x6666ff, 0.5);
        this.rectangle1.setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, 'You have been blinded.', { fontSize: '32px', fill: '#fff' });
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 1, 'Use the chat to get an other player to navigate ', { fontSize: '16px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'you to the end of the maze and get the cure', { fontSize: '16px', fill: '#fff' });
        this.helpText.setOrigin(0.5);
        this.helpText2.setOrigin(0.5);
        this.titleText.setOrigin(0.5);
        this.quitButton = new UiButton(this, this.scale.width/2 *1.5, this.scale.height/2 * 0.1, 'button1', 'button2', 'X', this.endScene.bind(this, 'quest2Info'));
        this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Accept Quest', this.startScene.bind(this, 'Ui'));
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }


      startScene(targetScene){
        this.scene.start(targetScene);
        this.scene.resume("Game");
        this.events.emit('questOneActivated');
      }

};

