class failedQuest extends Phaser.Scene {
    constructor(){
        super ('failedQuest');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    };

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7).setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2, 'You have failed the quest!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Respawn', this.endScene.bind());
    };

    endScene(){
        location.reload();
    };
};

