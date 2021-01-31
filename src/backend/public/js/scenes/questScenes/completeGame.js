
class completeGame extends Phaser.Scene {
    constructor(){
        super ('completeGame');
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
        
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, "Congratulations!", { fontSize: '32px', fill: '#fff' });
        this.closeButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Close', this.endScene.bind(this, 'completeGame'));
        
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Robert: "Thank you for playing my game!"', { fontSize: '14px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Robert: "Well done on managing to complete it"', { fontSize: '14px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'Robert: "The purpose of this game was to help develop communication skills', { fontSize: '14px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'Robert: "I hope you learned a thing or two and had fun!"', { fontSize: '14px', fill: '#fff' });
        this.helpText5 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.2, 'Robert: "You can still replay all the quests, and chat to other players!"', { fontSize: '14px', fill: '#fff' });

        this.helpText.setOrigin(0.5);this.helpText2.setOrigin(0.5);this.helpText3.setOrigin(0.5); this.helpText4.setOrigin(0.5);this.helpText5.setOrigin(0.5);
        this.titleText.setOrigin(0.5);

      
   
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }

};

