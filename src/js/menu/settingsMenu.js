//////////////////////////////////////////////////////////////////////
//                   Clase para el menu de ajustes                  //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';
import {game} from '../init.js';


var changeMusicButton;
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
        // Música

        // Fondo
        this.add.image(400, 320, "settings");

        // Botón de cambiar música
        if(controller.getMusicEnabled() === true){
            changeMusicButton = this.add.sprite(575, 290, "spriteChangeMusicButton", 1).setInteractive();
        } else {
            changeMusicButton = this.add.sprite(575, 290, "spriteChangeMusicButton", 0).setInteractive();
        }
        changeMusicButton.addListener('pointerdown', () => {
            if (controller.getMusicEnabled() === true){
                changeMusicButton.setFrame(0);
                controller.setMusicEnabled(false);
                controller.getMusic().stop();
            } else {
                changeMusicButton.setFrame(1);
                controller.setMusicEnabled(true);
                controller.getMusic().play();
            }
        }, this);

        // Botón de retroceder
        backButton = this.add.sprite(width - 242/2, 539, "spriteBackButton", 1).setInteractive();
        backButton.addListener('pointerover', () => {
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.setFrame(1);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);
       
        // Música del menu principal

    }
    update(time, delta){

    }
}

function loadScene(){
    this.scene.start("sceneMainMenu");
}

export default sceneSettingsMenu;