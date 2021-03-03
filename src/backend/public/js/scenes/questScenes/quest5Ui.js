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


      this.game.events.on('hidden',function(){
        this.hiddenTimeStamp = performance.now();
        
      })
   
      this.game.events.on('visible',function(){
        timerDelay = (performance.now()- this.hiddenTimeStamp)/1000;
      
     })
    };

    

  
    setupUiElements () {
       //create the score text game object
      this.scoreText = this.add.text(35, 35, 'Swords left: 7', { backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.scoreText.alpha=0.7;
      this.objText = this.add.text(35, 8, 'Objective: find all the swords scattered around the map ', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' });this.objText.alpha = 0.7;
       
      this.timer = this.time.addEvent({
        delay: 420000,
       paused: false
      });

      this.timeLeft= this.add.text(35, 65, '',{ backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.timeLeft.alpha=0.7;
      this.quitButton = new button(this, this.scale.width*0.86, this.scale.height*0.05, 'button1', 'button2', 'Give up/Respawn', this.endScene.bind(this, 'quest2Ui'));
       this.quitButton.setScale(0.7);
    
    };
  
    setupEvents(){
      this.gameScene.events.on('swordCollected', (score) => {
          this.scoreText.setText(`Swords left: ${score}`);
      })
      this.gameScene.events.on('completedQuest', (score) => {
        this.scene.stop("quest5Ui");
        completedQuest("quest5");
        checkQuest();
      })
    };

    formatTime(seconds){
      // Minutes
      var minutes = Math.floor(seconds/60);
      // Seconds
      var partInSeconds = seconds%60;
      // Adds left zeros to seconds
      partInSeconds = partInSeconds.toString().padStart(2,'0');
      // Returns formated time
      return `${minutes} mins ${partInSeconds} secs`;
    }

    update(){
    
      this.time1 = ((Math.floor(this.timer.delay - this.timer.elapsed))/1000 - timerDelay).toFixed(0);

      this.timeLeft.setText('Time left: ' + this.formatTime(this.time1));
      
      if (((Math.floor(this.timer.delay - this.timer.elapsed))/1000 - timerDelay).toFixed(0)<=0){
        timerDelay = 0;
        this.scene.pause("Game");
        this.scene.start("failedQuest");
        this.scene.stop("quest5Ui");
      }
      
    }

    endScene(){
      location.reload();
    }

};
  
  