
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
        this.closeButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Close', this.endScene.bind(this, 'mountainGuide'));
        
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Step 1: ', { fontSize: '12px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.85, 'Step 2: ', { fontSize: '12px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Step 3: ', { fontSize: '12px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.95, 'Step 4: ', { fontSize: '12px', fill: '#fff' });
        this.helpText5 = this.add.text(this.scale.width/2, this.scale.height/2 * 1, 'Step 5: ', { fontSize: '12px', fill: '#fff' });
        this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5); this.helpText4.setOrigin(0.5);this.helpText5.setOrigin(0.5);
        this.titleText.setOrigin(0.5);


        
      
   
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }

};

