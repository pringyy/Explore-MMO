class priestScene extends Phaser.Scene {
    constructor(){
        super ('priestScene');
    };

    init(){
        this.gameScene = this.scene.get('Game');
    };

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7).setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2*0.6, "Priest John", { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.closeButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Close', this.endScene.bind(this, 'priestScene')).setOrigin(0.5);
        this.modalText = this.add.text(this.scale.width/2, this.scale.height/2*0.8, 'John: "Hello traveller, welcome to the church!"', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.modalText2 = this.add.text(this.scale.width/2, this.scale.height/2*0.9, 'John: "The instructions to climb the mountain are on the table!"', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.modalText3 = this.add.text(this.scale.width/2, this.scale.height/2*1.0, 'John: "Since there is only one copy you cannot take it from here', {fontSize: '14px', fill: '#fff'}).setOrigin(0.5);
        this.modalText4 = this.add.text(this.scale.width/2, this.scale.height/2*1.1, 'John: "Hope you have a good day, and peace be upon you!"', { ontSize: '14px', fill: '#fff'}).setOrigin(0.5);   
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
    };

};

