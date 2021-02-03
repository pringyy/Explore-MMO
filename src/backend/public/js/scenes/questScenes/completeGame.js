
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
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2*0.6, "Congratulations!", {fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.modalText = this.add.text(this.scale.width/2, this.scale.height/2*0.8, 'Robert: "Thank you for playing my game!"', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.modalText2 = this.add.text(this.scale.width/2, this.scale.height/2*0.9, 'Robert: "Well done on managing to complete it"', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.modalText3 = this.add.text(this.scale.width/2, this.scale.height/2*1.0, 'Robert: "The purpose of this game was to help develop communication skills', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText4 = this.add.text(this.scale.width/2, this.scale.height/2*1.1, 'Robert: "I hope you learned a thing or two and had fun!"', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.modalText5 = this.add.text(this.scale.width/2, this.scale.height/2*1.2, 'Robert: "You can still replay all the quests, and chat to other players!"', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.closeButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Close', this.endScene.bind(this, 'completeGame'));
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
    }

};

