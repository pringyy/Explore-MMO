class UiScene extends Phaser.Scene {
    
    constructor(){
        super('Ui');
    }

    init(){
        this.gameScene = this.scene.get('Game');
    }

    create() {  
        this.setupUiElements();
        this.setupEvents();   
      };
  
      
  
    
      setupUiElements () {
         //create the score text game object
         this.locationText = this.add.text(this.scale.width/2, this.scale.height*0.97 , 'You are currently in the Spawn', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '18px', fill: '#fff' });
         this.progressText = this.add.text(this.scale.width*0.85, this.scale.height*0.97 , '', { backgroundColor: '	rgb(0, 0, 0)', fontSize: '15px', fill: '#fff' });
         this.progressText.alpha = 0.7;
         this.locationText.alpha = 0.7;
         this.locationText.setOrigin(0.5);
         this.progressText.setOrigin(0.5);
         
      };
    
      setupEvents(){
        this.gameScene.events.on('updateLocation', (location) => {
            this.locationText.setText(`You are currently ${location}`);
         })

         this.gameScene.events.on('progress', (number) => {
            this.progressText.setText(`${number}/5 Quests Completed`);
         })
      };
};
    
    