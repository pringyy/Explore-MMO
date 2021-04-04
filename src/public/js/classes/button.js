//Class creates a Phaser button which is used in all modals
class button extends Phaser.GameObjects.Container {
    
  constructor(scene, x, y, key, hoverKey, text, targetCallback){
    super(scene, x, y);
    this.scene = scene; //Scene button want to be used by
    this.x = x; 
    this.y = y;
    this.key = key; //Image file when player aren't hovered over
    this.hoverKey = hoverKey; //image file when players are hovered over
    this.text = text; //Text displayed on button
    this.targetCallback = targetCallback; //Phaser command that executes when clicked
    this.createButton(); //Create button
    this.scene.add.existing(this); //Add this container to scene
  }

  createButton() {
      this.button = this.scene.add.image(0, 0, this.key);
      this.button.setInteractive();
      this.button.setScale(1.4);
      this.buttonText = this.scene.add.text(0, 0, this.text, {fontSize: '26px', fill: '#fff'});
      Phaser.Display.Align.In.Center(this.buttonText, this.button);
      this.add(this.button);
      this.add(this.buttonText);

      //When user is not hovered over the button
      this.button.on('pointerout', () => {
        this.button.setTexture(this.key);
      });
      
      //When user hover over button
      this.button.on('pointerover', () => {
        this.button.setTexture(this.hoverKey);
      })
      
      //When button is clicked
      this.button.on('pointerdown', () => {
        this.targetCallback();
      })
  
  }
};