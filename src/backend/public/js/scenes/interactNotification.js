class interactNotification extends Phaser.Scene {
    constructor(){
      super ('Interact');
    };
  
    init(){
      this.gameScene = this.scene.get('Game');

    }
  
    create() {
      
      this.setupUiElements();
    
    };
  
    setupUiElements () {
       this.scoreText = this.add.text(35, 8, 'Press E to speak', { fontSize: '24px', fill: '#fff' });
    };
  
    
  };
  
  