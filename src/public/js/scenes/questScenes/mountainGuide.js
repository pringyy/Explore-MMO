//This displays the book which players need to use to navigate their companion to the top of the mountain
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
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.8, this.scale.height*0.6, '#000000', 0.7).setOrigin(0.5);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.6, "Route to top of Mount Kong", { fontSize: '25px', fill: '#fff' }).setOrigin(0.5);
        this.closeButton = new button(this, this.scale.width/2, this.scale.height/2*1.45, 'button1', 'button2', 'Close', this.endScene.bind(this, 'mountainGuide'));
        this.modalText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, 'Step 1:Down Cave ', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.75, 'Step 2: Up Cave ', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Step 3: Through Ladder', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.85, 'Step 4: Down Cave', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText5 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Step 5: Down Right Cave', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText6 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.95, 'Step 6: Through Left Ladder', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText7 = this.add.text(this.scale.width/2, this.scale.height/2 * 1, 'Step 7: Down Cave', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText8 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.05, 'Step 8: Through Left Ladder', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText9 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'Step 9: Down Cave', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText10 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.15, 'Step 10: Down Cave', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText11 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.22, 'Translation Keys:', { fontSize: '14px', fill: '#fff' }).setOrigin(0.5);
        this.modalText12 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.28, 'Left means Right, Right means Left, Up means Down, Down Means Up, Ladder means Cave, Cave means Ladder', { fontSize: '12px', fill: '#fff' }).setOrigin(0.5);
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
      }

};

