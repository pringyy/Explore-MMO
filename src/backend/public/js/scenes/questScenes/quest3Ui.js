class quest3Ui extends Phaser.Scene {
  constructor(){
    super ('quest3Ui');
  };

  init(){
    this.gameScene = this.scene.get('Game');    
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  };

  setupUiElements () {
    this.objText = this.add.text(35, 8, 'Objective: find the hat at the top of the mountain', {backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff'}).alpha = 0.7;
    this.quitButton = new UiButton(this, this.scale.width*0.86, this.scale.height*0.05, 'button1', 'button2', 'Give up/Respawn', this.endScene.bind(this)).setScale(0.7);
  };

  setupEvents(){
    this.gameScene.events.on('completedQuest', () => {
      this.scene.stop("quest3Ui");
      completedQuest('quest3');
    })
  };

  
  endScene(){
    location.reload();
  }   
};
  
  
  