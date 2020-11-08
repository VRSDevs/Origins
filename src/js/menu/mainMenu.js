var playButton;
var controlsButton;
var settingsButton;
var id;

class sceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneMainMenu",
        });
    }

    create() {
        // Fondo
        this.add.image(400, 320, "mainMenu");
        
        playButton = this.add.image(100, 100, "imgPlayButton").setInteractive();
        playButton.once('pointerover', () => {
            id = 1;
        }, this);
        playButton.on('pointerdown', loadScene, this);

        controlsButton = this.add.image(200, 200, "imgPlayButton").setInteractive();
        controlsButton.once('pointerover', () => {
            id = 2;
        }, this);
        controlsButton.on('pointerdown', loadScene, this);

        settingsButton = this.add.image(300, 300, "imgPlayButton").setInteractive();
        settingsButton.once('pointerover', () => {
            id = 3;
        }, this);
        settingsButton.on('pointerdown', loadScene, this);

    }
    update(time, delta){
        
    }
    
}

function loadScene(){
    switch (id) {
        case 1:
            console.log(id);
            this.scene.start("sceneForestLevel");
            break;    
        case 2:
            console.log(id);
            this.scene.start("sceneControlsMenu");
            break;
        case 3:
            console.log(id);
            this.scene.start("sceneSettingsMenu");
            break; 
        default:
            break;
    }   
}

export default sceneMainMenu;