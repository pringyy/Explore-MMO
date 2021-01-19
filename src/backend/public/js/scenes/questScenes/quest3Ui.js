
class quest3Ui extends Phaser.Scene {
    constructor(){
      super ('quest3Ui');
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
       
       this.objText = this.add.text(35, 8, 'Objective: find the sword at the top of the mountain', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' });this.objText.alpha = 0.7;
    };
  
    setupEvents(){
      this.gameScene.events.on('completed', () => {
        this.objText.setText("completed");

      })

      }
    
  };
  
  
  