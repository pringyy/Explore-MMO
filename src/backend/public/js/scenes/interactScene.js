class UiScene extends Phaser.Scene {
    constructor(){
      super ('Interact');
    };
  
    init(){
      this.gameScene = this.scene.get('Game');
      this.gameScene = this.scene.get('Ui');
    }
  
    create() {
      console.log("test");
      this.setupUiElements();
      this.setupEvents();
    };
  
    setupUiElements () {
       //create the score text game object
       this.scoreText = this.add.text(35, 8, 'Coins left: 10', { fontSize: '24px', fill: '#fff' });
       this.timeText = this.add.text(35, 50, 'Time left: ', { fontSize: '24px', fill: '#fff' });
    };
  
    setupEvents(){
      this.gameScene.events.on('updateScore', (score) => {
        this.scoreText.setText(`Coins left: ${score}`);
      })
    };
  };
  
  