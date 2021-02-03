class titleScene extends Phaser.Scene {  
  constructor(){
    super('Title');
  }

  create() {
    this.titleLogo = this.add.image(this.scale.width/2, this.scale.height/2 * 0.7, 'logo');
    this.titleLogo.setOrigin(0.5);
    this.titleButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Start', this.startScene.bind(this, 'Game'));
  }

  startScene(targetScene){
    this.scene.start(targetScene);
  }  
};