
class quest1Info extends Phaser.Scene {
    constructor(){
        super ('quest1Info');
    };

    init(data){
        this.gameScene = this.scene.get('Game');
        this.complete = data["completed"];
    }

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        //create the score text game object
        this.rectangle1 = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7);
        this.rectangle1.setOrigin(0.5);
        
        if (!this.complete){
            this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, 'Uncompleted Quest', { fontSize: '32px', fill: '#fff' });
            this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Accept Quest', this.startScene.bind(this, 'quest1Ui'));
        }else{
            this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.6, 'Already Completed Quest!', { fontSize: '32px', fill: '#fff' });
            this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Redo Quest', this.startScene.bind(this, 'quest1Ui'));
        }
        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 1, 'Janet: "I bet you can not complete this maze blind folded!"', { fontSize: '16px', fill: '#fff' });
        this.helpText.setOrigin(0.5);
        
        this.titleText.setOrigin(0.5);
        this.quitButton = new UiButton(this, this.scale.width/2 * 1.7, this.scale.height/2  * 0.6, 'cross1', 'cross2', '', this.endScene.bind(this, 'quest1Info'));
        this.quitButton.setScale(0.7);
   
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
