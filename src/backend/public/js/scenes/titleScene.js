class titleScene extends Phaser.Scene {
    
  constructor(){
      super('Title');
  }

  create() {
    this.titleLogo = this.add.image(this.scale.width/2, this.scale.height/2*0.7, 'logo');
    this.titleLogo.setOrigin(0.5);
    this.modalText = this.add.text(this.scale.width/2, this.scale.height/2 , 'A browser based Massively Multiplayer Online exploration game.');
    this.modalText.setOrigin(0.5);
    this.modalText2 = this.add.text(this.scale.width/2, this.scale.height/2*1.1 , 'This game is only supported by laptop and desktop computers.');
    this.modalText2.setOrigin(0.5);
    this.titleButton = new button(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Start', this.startScene.bind(this, 'Game'));
  }

  startScene(targetScene){
    this.scene.start(targetScene);
  }
  
};