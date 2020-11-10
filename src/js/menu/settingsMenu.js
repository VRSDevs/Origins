//////////////////////////////////////////////////////////////////////
//                   Clase para el menu de ajustes                  //
//////////////////////////////////////////////////////////////////////

var backButton;

class sceneSettingsMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneSettingsMenu",
            active: false
        });
    }
    create() {
        // Variables auxiliares
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;
        
        // Fondo
        this.add.image(400, 320, "settings");

        // Botón de retroceder
        backButton = this.add.sprite(width - 242/2, 539, "spriteBackButton", 1).setInteractive();
        backButton.addListener('pointerover', () => {
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.setFrame(1);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);
    }
    update(time, delta){

    }
}

function loadScene(){
    this.scene.start("sceneMainMenu");
}

export default sceneSettingsMenu;