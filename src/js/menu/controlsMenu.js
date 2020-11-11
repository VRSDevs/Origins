//////////////////////////////////////////////////////////////////////
//                    Clase para el menu de controles               //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';

var backButton;
var music;
class sceneControlsMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneControlsMenu",
            active: false
        });
    }
    create() {
        // Variables auxiliares
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        // Fondo
        this.add.image(400, 320, "controls");

        // Botón de retroceder
        backButton = this.add.sprite(width - 242/2, 580, "spriteBackButton", 1).setInteractive();
        backButton.addListener('pointerover', () => {
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.setFrame(1);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);

        // Música del menu principal
        music = this.add.audio ()
        music.play();
    }
    update(time, delta){

    }
}

function loadScene(){
    this.scene.start("sceneMainMenu");
}

export default sceneControlsMenu;