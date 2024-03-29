//Displays the quest information for Quest 4 to user when they interact with the NPC
class quest4Info extends Phaser.Scene {
    constructor(){
        super ('quest4Info');
    };

    init(data){
        this.gameScene = this.scene.get('Game');
        this.complete = data["completed"];
    }

    create() {
        this.setupUiElements();
    };

    setupUiElements () {
        
         this.modal = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.9, this.scale.height*0.8, '#000000', 0.7).setOrigin(0.5);;
     
         if(!this.complete){
            this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.5, 'Uncompleted Quest', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
            this.startButton = new button(this, this.scale.width/2, this.scale.height/2*1.6, 'button1', 'button2', 'Okay', this.startScene.bind(this, 'quest4Ui'));
         } else {
            this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.5, 'Already Completed Quest', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
            this.startButton = new button(this, this.scale.width/2, this.scale.height/2*1.6, 'button1', 'button2', 'Redo Quest', this.startScene.bind(this, 'quest4Ui'));
            this.quitButton = new button(this, this.scale.width/2 * 1.7, this.scale.height/2  * 0.4, 'cross1', 'cross2', '', this.endScene.bind(this, 'quest4Info'));
            this.quitButton.setScale(0.7);
         }
         this.modalText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Death: "Your time has come"', {fontSize: '18px', fill: '#fff'}).setOrigin(0.5);
         this.modalText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Death: "I have poisoned you, and you will die in 5 minutes."', {fontSize: '18px', fill: '#fff'}).setOrigin(0.5);
         this.modalText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'Death: "The only thing that will save you now is god.', {fontSize: '18px', fill: '#fff'}).setOrigin(0.5); 
    };

    endScene(targetScene){
        this.scene.stop(targetScene);
        this.scene.resume("Game");
    }

    startScene(targetScene){
        this.events.emit('questActivated');
        this.scene.start(targetScene);
        this.scene.resume("Game");
    }
};

