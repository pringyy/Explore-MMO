export default class DialogWindow {
    constructor(scene, opts) {
        if (!opts) opts = {};
        const {
            x = 0,
            y = 0,
            debug = false,
        } = opts;

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.debug = debug;

        this.borderColor = 0x907748;
        this.borderAlpha = 0.3;
        this.windowAlpha = 0.4;
        this.textAlpha = 0.2;
        this.windowColor = 0x303030;
        this.windowWidth = 305;
        this.windowHeight = this.scene.scale.height;

        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(2);
        this.createWindow();
    }
    createWindow() {
        const windowDimensions = this.calculateWindowDimension();
        this.createOuterWindow(windowDimensions);
        this.createInnerWindow(windowDimensions);
    }   

    1

    calculateWindowDimension() {
        const x = this.x - this.windowWidth - 2 + this.scene.cameras.main.worldView.x;
        const y = this.y + 2 + this.scene.cameras.main.worldView.y;
        const rectHeight = this.windowHeight - 5;
        const rectWidth = this.windowWidth;
        return {
        x, y, rectWidth, rectHeight,
        };
    }

    createOuterWindow({
        x, y, rectWidth, rectHeight,
      }) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }
     
    createInnerWindow({ x, y, rectWidth, rectHeight }){
        
    }
}