class titleScene extends Phaser.Scene {
    
  constructor(){
      super('Title');
  }

  create() {
    this.titleLogo = this.add.image(this.scale.width/2, this.scale.height/2 * 0.7, 'logo');
    this.titleLogo.setOrigin(0.5);
    this.infoText = this.add.text(this.scale.width/2, this.scale.height/2 , 'A browser based Massively Multiplayer Online exploration game.', {  ontSize: '18px'});
    this.infoText.setOrigin(0.5);
    this.infoText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1 , 'This game is only supported by laptop and desktop computers.', {  ontSize: '18px'});
    this.infoText2.setOrigin(0.5);
    
    this.titleButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Start', this.startScene.bind(this, 'Game'));
  }

  startScene(targetScene){
    this.scene.start(targetScene);
  }
  
};