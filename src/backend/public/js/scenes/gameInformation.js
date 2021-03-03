class gameInformation extends Phaser.Scene {
    
    constructor(){
        super('Information');
    }
  
    create() {
        this.scene.pause("Game");
        this.modalBox = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height,'#000000').setOrigin(0.5);
        this.modalBox.setAlpha(0.9);
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2*0.14 , 'Game Information', { fontSize: '24px'}).setOrigin(0.5);
        this.infoText = this.add.text(this.scale.width/2, this.scale.height/2*0.33 , 'Hello user!', {  ontSize: '18px'});
        this.infoText.setOrigin(0.5);
        this.infoText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.4 , 'The goal of this game is to find and complete all 5 quests.', {  fontSize: '14px'});
        this.infoText2.setOrigin(0.5);
        this.infoText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.47 , 'To complete these quests effectively, you will have to communicate with other players.', {  fontSize: '14px'});
        this.infoText3.setOrigin(0.5);
        this.infoText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.54 , 'The goal of this game is to help develop your communication skills!', {  fontSize: '15px'});
        this.infoText4.setOrigin(0.5);

        this.infoText5 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.61 ,"It has been shown video games can do this, and make you more employable.", {  fontSize: '14px'});
        this.infoText5.setOrigin(0.5);
        this.infoText6 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.68 ,"This is why you are encouraged to use the in-game chat to the right of your screen.", {  fontSize: '14px'});
        this.infoText6.setOrigin(0.5);
        this.infoText7= this.add.text(this.scale.width/2, this.scale.height/2  ,"Use the arrow keys to move your character!", {  fontSize: '14px'}).setOrigin(0.5);
    


        
            this.titleLogo = this.add.image(this.scale.width/2*1.65, this.scale.height/2*0.94, 'arrowkeys').setScale(0.2);
            this.infoText8= this.add.text(this.scale.width/2, this.scale.height/2*1.25 ,"Characters you can interact with are shown with:", {  fontSize: '14px'}).setOrigin(0.5);
               


        
            this.titleLogo = this.add.image(this.scale.width/2*1.65, this.scale.height/2*1.25, 'qmark').setScale(2);
            this.infoText9= this.add.text(this.scale.width/2, this.scale.height/2*1.45  ,"You can enter any building or cave by simply walking into the entrance!", {  fontSize: '14px'}).setOrigin(0.5);
            this.infoText10= this.add.text(this.scale.width/2, this.scale.height/2*1.55  ,"You can pick up items for quests by simply walking over them!", {  fontSize: '14px'}).setOrigin(0.5);
      
      this.titleButton = new button(this, this.scale.width/2, this.scale.height/2*1.8, 'button1', 'button2', 'Close', this.startScene.bind(this, 'Information'));
    }
  
    startScene(targetScene){
      this.scene.stop(targetScene);
      this.scene.resume("Game")
      this.scene.start("Ui")
    }
    
};