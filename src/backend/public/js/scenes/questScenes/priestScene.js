
class priestScene extends Phaser.Scene {
    constructor(){
        super ('priestScene');
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
        
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.6, "Priest John", { fontSize: '32px', fill: '#fff' });
        this.closeButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Close', this.endScene.bind(this, 'priestScene'));
        
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'John: "Hello traveller, welcome to the church!"', { fontSize: '14px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'John: "The instructions to climb the mountain are on the table!"', { fontSize: '14px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'John: "Since there is only one copy you cannot take it from here', { fontSize: '14px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'John: "Hope you have a good day, and peace be upon you!"', { fontSize: '14px', fill: '#fff' });
        this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5); this.helpText4.setOrigin(0.5);
        this.titleText.setOrigin(0.5);


        
      
   
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }

};

