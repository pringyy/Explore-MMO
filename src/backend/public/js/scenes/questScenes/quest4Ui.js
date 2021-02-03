class quest4Ui extends Phaser.Scene {
  constructor(){
    super ('quest4Ui');
  };

  init(){
    this.gameScene = this.scene.get('Game');
  };

  create() {
    this.setupUiElements(); 

    this.game.events.on('hidden',function(){
      this.hiddenTimeStamp = performance.now();
    })
  
    this.game.events.on('visible',function(){
        timerDelay = (performance.now()- this.hiddenTimeStamp)/1000
    })

    this.timer = this.time.addEvent({
      delay: 600000,
      paused: false
    });
  };

  setupUiElements () {    
    this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height,'#000000').setOrigin(0.5);
    this.titleText = this.add.text(this.scale.width/2, this.scale.height/2*0.7, "You have been blinded by Death's poison.", {fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
    this.helpText = this.add.text(this.scale.width/2, this.scale.height/2*1, 'Objective: get to the church to survive', {fontSize: '16px', fill: '#fff'}).setOrigin(0.5);
    this.timeLeft= this.add.text(this.scale.width/2, this.scale.height/2 * 1.15, '',{ fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
    this.quitButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Give in to Death', this.endScene.bind(this, 'quest4Ui'));
  };

  endScene(targetScene){
    location.reload();
  };

  formatTime(seconds){
    var minutes = Math.floor(seconds/60);
    var partInSeconds = (seconds%60).toString().padStart(2,'0');
    return `${minutes} mins ${partInSeconds} secs`;
  };

  update(){
    
    this.time = ((Math.floor(this.timer.delay - this.timer.elapsed))/1000 - timerDelay).toFixed(0);
    this.timeLeft.setText('Time left: ' + this.formatTime(this.time));
    
    if (((Math.floor(this.timer.delay-this.timer.elapsed))/1000-timerDelay).toFixed(0)<=0){
      this.scene.pause("Game");
      this.scene.start("failedQuest");
      this.scene.stop("quest4Ui");
    }; 
  };
};
  
  