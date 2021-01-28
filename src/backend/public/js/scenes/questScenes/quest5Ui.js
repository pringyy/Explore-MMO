
class quest5Ui extends Phaser.Scene {
    constructor(){
      super ('quest5Ui');
    };
  
    init(){
      this.gameScene = this.scene.get('Game');

    }
  
    create() {
      this.setupUiElements();
      this.setupEvents(); 
    };

    

  
    setupUiElements () {
       //create the score text game object
       this.scoreText = this.add.text(35, 35, 'Swords left: 7', { backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.scoreText.alpha=0.7;
       this.objText = this.add.text(35, 8, 'Objective: find all swords scattered around the map ', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' });this.objText.alpha = 0.7;
    };
  
    setupEvents(){
      this.gameScene.events.on('itemCollected', (score) => {
          this.scoreText.setText(`Swords left: ${score}`);
      })
      this.gameScene.events.on('completedQuest', (score) => {
       this.scene.stop("quest5Ui");
       completedQuest("quest5");
    })
    };
  };
  
  