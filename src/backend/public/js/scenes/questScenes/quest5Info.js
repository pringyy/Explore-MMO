class quest5Info extends Phaser.Scene {
    constructor(){
        super ('quest5Info');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        //create the score text game object
        this.rectangle1 = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.9, this.scale.height*0.8, '#000000', 0.7 );
        this.rectangle1.setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.5, 'Quest', { fontSize: '32px', fill: '#fff' });
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Zak: "Someone has stolen my lastest shipment of swords!"', { fontSize: '14px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Zak: "A customer returned one saying they found it in the middle of no where!"', { fontSize: '14px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'Zak: "I will go out of business unless I get them back"', { fontSize: '14px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'Zak: "Could you please find them for me?"', { fontSize: '14px', fill: '#fff' });
        this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5); this.helpText4.setOrigin(0.5);
        
        this.titleText.setOrigin(0.5);
        this.quitButton = new UiButton(this, this.scale.width/2 * 1.7, this.scale.height/2  * 0.4, 'cross1', 'cross2', '', this.endScene.bind(this, 'quest5Info'));
        this.quitButton.setScale(0.7);
        this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.6, 'button1', 'button2', 'Accept Quest', this.startScene.bind(this, 'quest5Ui'));
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }


      startScene(targetScene){
        this.events.emit('questActivated');
        this.scene.start(targetScene);
        this.scene.resume("Game");
      }

};

