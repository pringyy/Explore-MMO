
class mountainGuide extends Phaser.Scene {
    constructor(){
        super ('mountainGuide');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        //create the score text game object
        this.rectangle1 = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7);
        this.rectangle1.setOrigin(0.5);
        
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.6, "Route to top of Mount Kong", { fontSize: '25px', fill: '#fff' });
        this.closeButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.45, 'button1', 'button2', 'Close', this.endScene.bind(this, 'mountainGuide'));
        
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, 'Step 1:Down Cave ', { fontSize: '14px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.75, 'Step 2: Up Cave ', { fontSize: '14px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Step 3: Through Ladder', { fontSize: '14px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.85, 'Step 4: Down Cave', { fontSize: '14px', fill: '#fff' });
        this.helpText5 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Step 5: Down Right Cave', { fontSize: '14px', fill: '#fff' });
        this.helpText6 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.95, 'Step 6: Through Left Ladder', { fontSize: '14px', fill: '#fff' });
        this.helpText7 = this.add.text(this.scale.width/2, this.scale.height/2 * 1, 'Step 7: Down Cave', { fontSize: '14px', fill: '#fff' });
        this.helpText8 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.05, 'Step 8: Through Left Ladder', { fontSize: '14px', fill: '#fff' });
        this.helpText9 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'Step 9: Down Cave', { fontSize: '14px', fill: '#fff' });
        this.helpText10 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.15, 'Step 10: Down Cave', { fontSize: '14px', fill: '#fff' });

        this.helpText11 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.22, 'Translation Keys:', { fontSize: '14px', fill: '#fff' });
        this.helpText12 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.28, 'Left means Right, Right means Left, Up means Down, Down Means Up, Ladder means Cave, Cave means Ladder', { fontSize: '12px', fill: '#fff' });
        this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5); this.helpText4.setOrigin(0.5);this.helpText5.setOrigin(0.5);this.helpText6.setOrigin(0.5);this.helpText7.setOrigin(0.5);this.helpText8.setOrigin(0.5);this.helpText9.setOrigin(0.5);this.helpText10.setOrigin(0.5);this.helpText11.setOrigin(0.5);this.helpText12.setOrigin(0.5);
        this.titleText.setOrigin(0.5);


        
      
   
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }

};

