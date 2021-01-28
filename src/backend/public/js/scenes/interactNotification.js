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
       this.scoreText = this.add.text(this.scale.width/2, this.scale.height*0.4 , 'Press E to speak', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '18px', fill: '#fff' });
        this.scoreText.setOrigin(0.5);
        this.scoreText.alpha=0.7;

       this.timer = this.time.addEvent({
        delay: 60,
        paused: false
      });

    };

    update(){
      if (((this.timer.delay - this.timer.elapsed).toFixed(0))==0){
        this.scene.stop("Interact");
      }
    }
  
    
  };
  
  