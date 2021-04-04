//Overlaps gameplay scene when quest is activated in order to blind player but they can still move
class quest1Ui extends Phaser.Scene {
    constructor(){
        super ('quest1Ui');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height,'#000000').setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2*0.7, 'You have been blind folded.', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.modalText = this.add.text(this.scale.width/2, this.scale.height/2*1, 'Objective: complete the maze ', { fontSize: '16px', fill: '#fff'}).setOrigin(0.5);
        this.quitButton = new button(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Give up', this.endScene.bind(this, 'quest1Ui'));
    };

    endScene(targetScene){
        this.events.emit('questDeactivated');
        this.scene.stop(targetScene);
    }
};
  
  