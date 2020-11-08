var backButton;

class sceneControlsMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneControlsMenu",
            active: false
        });
    }
    create() {
        // Fondo
        this.add.image(400, 320, "controls");

        backButton = this.add.image(100, 100, "imgPlayButton").setInteractive();
        backButton.on('pointerdown', loadScene, this);
    }
    update(time, delta){

    }
}

function loadScene(){
    this.scene.start("sceneMainMenu");
}

export default sceneControlsMenu;