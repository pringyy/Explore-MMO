
class quest2Ui extends Phaser.Scene {
  constructor(){
    super ('quest2Ui');
  };

  init(){
    this.gameScene = this.scene.get('Game');
  }

  create() {
    
    this.setupUiElements();
    this.setupEvents();

    //Used to calculate time passed when the user does not have the tab active
    this.game.events.on('hidden',function(){
      this.hiddenTimeStamp = performance.now();
    })
  
    this.game.events.on('visible',function(){
      timerDelay = (performance.now()- this.hiddenTimeStamp)/1000
    })
  };

  setupUiElements () {  
    //Defines 10 minute timer
    this.timer = this.time.addEvent({
      delay: 600000,
      paused: false
    });

    this.scoreText = this.add.text(35, 35, 'Coins left: 10', { backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.scoreText.alpha = 0.7;
    this.objText = this.add.text(35, 8, 'Objective: find all the coins scattered around the map ', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '16px', fill: '#fff' }).alpha = 0.7;
    this.quitButton = new button(this, this.scale.width*0.86, this.scale.height*0.05, 'button1', 'button2', 'Give up/Respawn', this.endScene.bind()).setScale(0.7);   
    this.timeLeft= this.add.text(35, 65, '',{ backgroundColor: '	rgb(0, 0, 0)',  fontSize: '16px', fill: '#fff' });this.timeLeft.alpha=0.7;
  };

  setupEvents(){
    this.gameScene.events.on('coinCollected', (score) => {
    this.scoreText.setText(`Coins left: ${score}`);
  });

  this.gameScene.events.on('completedQuest', (score) => {
    this.scene.stop("quest2Ui");
    completedQuest('quest2');
    checkQuest();
  });
  };

  endScene(){
    location.reload();
  };

  formatTime(seconds){
    var minutes = Math.floor(seconds/60);
    var partInSeconds = seconds%60;
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    return `${minutes} mins ${partInSeconds} secs`;
  };

  update(){
  
    this.time = ((Math.floor(this.timer.delay - this.timer.elapsed))/1000 - timerDelay).toFixed(0);
    this.timeLeft.setText('Time left: ' + this.formatTime(this.time));
    
    if (((Math.floor(this.timer.delay - this.timer.elapsed))/1000 - timerDelay).toFixed(0)<=0){
      timerDelay = 0;
      this.scene.pause("Game");
      this.scene.start("failedQuest");
      this.scene.stop("quest2Ui");
    };   
  };
};
  
  