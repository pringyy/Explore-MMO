class quest2Info extends Phaser.Scene {
    constructor(){
        super ('quest2Info');
       
    };

    init(data){
        this.gameScene = this.scene.get('Game');
        this.complete = data["completed"];
      
    }

    create() {
        this.setupUiElements();
        this.setupEvents();
    };

    setupUiElements () {
        //create the score text game object
        this.rectangle1 = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width *0.9, this.scale.height*0.6, '#000000', 0.7);
        this.rectangle1.setOrigin(0.5);
       console.log("test")
       console.log(this.complete)
        if (!this.complete){
        this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.6, 'Uncompleted Quest', { fontSize: '32px', fill: '#fff' });
        this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Accept Quest', this.startScene.bind(this, 'quest2Ui'));
        } else{
            this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.6, 'Already Completed Quest!', { fontSize: '32px', fill: '#fff' });
            this.startButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Redo Quest', this.startScene.bind(this, 'quest2Ui'));
        }

        this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.8, 'Cowan: "I was so drunk last night"', { fontSize: '16px', fill: '#fff' });
        this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 0.9, 'Cowan: "I woke up here and do not remember a thing"', { fontSize: '16px', fill: '#fff' });
        this.helpText3 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.0, 'Cowan: "I lost all my money, but it could literally be anywhere"', { fontSize: '16px', fill: '#fff' });
        this.helpText4 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, 'Cowan: "Could you please help me find it all?"', { fontSize: '16px', fill: '#fff' });
        this.helpText.setOrigin(0.5);
        this.helpText2.setOrigin(0.5);
        this.helpText3.setOrigin(0.5);
        this.helpText4.setOrigin(0.5);
        this.titleText.setOrigin(0.5);
        this.quitButton = new UiButton(this, this.scale.width/2  *1.7, this.scale.height/2  * 0.6, 'cross1', 'cross2', '', this.endScene.bind(this, 'quest2Info'));
        this.quitButton.setScale(0.7);
        
    };

    setupEvents(){
        this.gameScene.events.on("completed game", (data) => {
            alert("test124");
            this.titleText.setText("You have already completed this quest!");
        })
    }

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

