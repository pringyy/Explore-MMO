
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

      this.game.events.on('hidden',function(){
        this.hiddenTimeStamp = performance.now();
        console.log(this.hiddenTimeStamp);
    })
   
    this.game.events.on('visible',function(){
        timerDelay = (performance.now()- this.hiddenTimeStamp)/1000;
        console.log("memes" + timerDelay);
       
      
    
    })
   
    };

    setupUiElements () {
       //create the score text game object
       this.scoreText = this.add.text(35, 35, 'Coins left: 10', { backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.scoreText.alpha=0.7;
       this.objText = this.add.text(35, 8, 'Objective: find all the coins scattered around the map ', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' });this.objText.alpha = 0.7;
       this.quitButton = new UiButton(this, this.scale.width*0.86, this.scale.height*0.05, 'button1', 'button2', 'Give up/Respawn', this.endScene.bind());
       this.quitButton.setScale(0.7);    

       this.timer = this.time.addEvent({
        delay: 600000,
        paused: false
      });

     this.timeLeft= this.add.text(35, 65, '',{ backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.timeLeft.alpha=0.7;

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
      console.log("hello: " + this.time1);
      this.timeLeft.setText('Time left: ' + this.formatTime(this.time1));
      
      if (((Math.floor(this.timer.delay - this.timer.elapsed))/1000 - timerDelay).toFixed(0)==0){
        timerDelay = 0;
        this.scene.pause("Game");
        this.scene.start("failedQuest");
        this.scene.stop("quest2Ui");
      }
      
    }

  };
  
  