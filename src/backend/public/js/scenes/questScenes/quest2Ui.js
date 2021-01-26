
class quest2Ui extends Phaser.Scene {
    constructor(){
      super ('quest2Ui');
    };
  
    init(){
      this.gameScene = this.scene.get('Game');
    }
  
    create() {
      console.log("test");
      this.setupUiElements();
      this.setupEvents();
    };

    setupUiElements () {
       //create the score text game object
       this.scoreText = this.add.text(35, 35, 'Coins left: 10', { backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.scoreText.alpha=0.7;
       this.objText = this.add.text(35, 8, 'Objective: find all the coins scattered around the map ', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' });this.objText.alpha = 0.7;
       this.quitButton = new UiButton(this, this.scale.width*0.86, this.scale.height*0.95, 'button1', 'button2', 'Give up/Respawn', this.endScene.bind());
       this.quitButton.setScale(0.7);    
      };
  
    setupEvents(){
      this.gameScene.events.on('updateScore', (score) => {
        if (score != 0 ){
          this.scoreText.setText(`Coins left: ${score}`);
        } else {
          completedQuest("quest2");
          this.scene.start('completedNotification');
          this.scene.stop('quest2Ui');
        }
      })
    };

    endScene(){
      location.reload();
    }

  };
  
  