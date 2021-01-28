class quest4Info extends Phaser.Scene {
    constructor(){
        super ('quest4Info');
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
         this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Death: "Your time has come"', { fontSize: '18px', fill: '#fff' });
         this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Death: "I have poisoned you, and you will die in 5 minutes."', { fontSize: '18px', fill: '#fff' });
         this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'Death: "The only thing that will save you now is god.', { fontSize: '18px', fill: '#fff' });
         this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5);
        this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.6, 'button1', 'button2', 'Okay', this.startScene.bind(this, 'quest4Ui'));
    };

    


      startScene(targetScene){
        this.events.emit('questActivated');
        this.scene.start(targetScene);
        this.scene.resume("Game");
      }

};

