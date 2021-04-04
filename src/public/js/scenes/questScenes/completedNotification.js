//This displays a completed notification when player successfully complete a quest
class completedNotification extends Phaser.Scene {
    constructor(){
        super ('completedNotification');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7).setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2, 'You have completed the Quest!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.startButton = new button(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Close', this.endScene.bind(this, 'completedNotification'));
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume('Game')
    }

};

