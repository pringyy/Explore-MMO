class quest1Ui extends Phaser.Scene {
        constructor(){
            super ('quest1Ui');
        };
    
        init(){

            this.gameScene = this.scene.get('Game');
        }
    
        create() {
            this.setupUiElements();
        };
    
        setupUiElements () {
            //create the score text game object
            this.rectangle1 = this.add.rectangle(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height,'#000000');
            this.rectangle1.setOrigin(0.5);
            this.titleText = this.add.text(this.scale.width/2, this.scale.height/2 * 0.7, 'You have been blind folded.', { fontSize: '32px', fill: '#fff' });
            this.helpText = this.add.text(this.scale.width/2, this.scale.height/2 * 1, 'Objective: complete the maze ', { fontSize: '16px', fill: '#fff' });
            this.helpText2 = this.add.text(this.scale.width/2, this.scale.height/2 * 1.1, '', { fontSize: '16px', fill: '#fff' });
            this.helpText.setOrigin(0.5);
            this.helpText2.setOrigin(0.5);
            this.titleText.setOrigin(0.5);
            this.quitButton = new UiButton(this, this.scale.width/2, this.scale.height/2*1.4, 'button1', 'button2', 'Give up', this.endScene.bind(this, 'quest1Ui'));
        };

        endScene(targetScene){
            this.scene.stop(targetScene);
          }

  };
  
  