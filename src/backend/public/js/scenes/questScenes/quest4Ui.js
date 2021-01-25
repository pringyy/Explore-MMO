
class quest4Ui extends Phaser.Scene {
    constructor(){
      super ('quest4Ui');
    };
  
    init(){
      this.gameScene = this.scene.get('Game');

    }
  
    create() {
      console.log("test");
      this.setupUiElements();
      this.setupEvents();
      //  Create our Timer
    
      
    };

    

  
    setupUiElements () {
       //create the score text game object
       this.scoreText = this.add.text(35, 35, 'Coins left: 10', { backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.scoreText.alpha=0.7;
       this.objText = this.add.text(35, 8, 'Objective: find all the coins scattered around the map ', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' });this.objText.alpha = 0.7;
    };
  
    setupEvents(){
      this.gameScene.events.on('updateScore', (score) => {
        if (score != 0 ){
          this.scoreText.setText(`Coins left: ${score}`);
        } else {
          this.scoreText.setText(`You have completed the quest`);
        }
      })
    };
  };
  
  