class quest3Info extends Phaser.Scene {
    constructor(){
        super ('quest3Info');
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
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Rod: "I hurt my knees coming down the mountain and I left my sword at the top!"', { fontSize: '14px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Rod: "Could you please retrieve it for me?"', { fontSize: '14px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'Rod: "The mountain is very hard to navigate alone.', { fontSize: '14px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'Rod: "I would recommend to get someone to help you, so you do not get lost!"', { fontSize: '14px', fill: '#fff' });
        this.helpText5 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.2, 'Rod: "There is a book in the church with a route on how to climb!"', { fontSize: '14px', fill: '#fff' });
        this.helpText6 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.3, 'Rod: "I would get a companion to read the instructions out while you climb!"', { fontSize: '14px', fill: '#fff' });
        this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5); this.helpText4.setOrigin(0.5);this.helpText5.setOrigin(0.5);this.helpText6.setOrigin(0.5)
        
        this.titleText.setOrigin(0.5);
        this.quitButton = new UiButton(this, this.scale.width/2 * 1.7, this.scale.height/2  * 0.4, 'cross1', 'cross2', '', this.endScene.bind(this, 'quest3Info'));
        this.quitButton.setScale(0.7);
        this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.6, 'button1', 'button2', 'Accept Quest', this.startScene.bind(this, 'quest3Ui'));
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }


      startScene(targetScene){
        this.events.emit('questThreeActivated');
        this.scene.start(targetScene);
        this.scene.resume("Game");
      }

};

