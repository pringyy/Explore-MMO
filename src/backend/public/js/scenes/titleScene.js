class TitleScene extends Phaser.Scene {
    
    constructor(){
        super('Title');
    }
  
    create() {
      this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, 'Explore MMO', { fontSize: '64px', fill: '#fff' });
      this.titleText.setOrigin(0.5);
      this.titleButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Start', this.startScene.bind(this, 'mapScene'));
    }

    startScene(targetScene){
      this.scene.start(targetScene);
    }
    
};