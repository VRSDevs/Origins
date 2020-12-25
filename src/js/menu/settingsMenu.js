//////////////////////////////////////////////////////////////////////
//                   Clase para el menu de ajustes                  //
//////////////////////////////////////////////////////////////////////
import {music} from '../gameController.js';

var changeMusicButton;
var musicEnabled = music;
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

        // Botón de cambiar música
        changeMusicButton = this.add.sprite(575, 290, "spriteChangeMusicButton", 1).setInteractive();
        changeMusicButton.addListener('pointerdown', () => {
            if (musicEnabled === true){
                changeMusicButton.setFrame(0);
                musicEnabled = false;
                console.log(musicEnabled);
            } else {
                changeMusicButton.setFrame(1);
                musicEnabled = true;
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
    }
    update(time, delta){

    }
}

function loadScene(){
    this.scene.start("sceneMainMenu");
}

export default sceneSettingsMenu;