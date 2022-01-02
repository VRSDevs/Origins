//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';
import {game} from '../init.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//****************** Botones *********************//
var changeMusicButton = undefined;
var backButton = undefined;

//////////////////////////////////////////////////////////////////////
//                  Clase de escena de menu de ajustes              //
//////////////////////////////////////////////////////////////////////
class sceneSettingsMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneSettingsMenu",
            active: false
        });
    }
    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.add.image(400, 320, "settings");

        //****************** Botones *********************//
        // Cambio de música //
        if(controller.getMusicEnabled() === true){
            changeMusicButton = this.add.sprite(570, 275, "spriteChangeMusicButton", 0).setInteractive();
        } else {
            changeMusicButton = this.add.sprite(570, 275, "spriteChangeMusicButton", 1).setInteractive();
        }
        changeMusicButton.addListener('pointerdown', () => {
            if (controller.getMusicEnabled() === true){     
                    changeMusicButton.setFrame(1);
                    controller.setMusicEnabled(false);
                    controller.getMusic().stop();
            } else {
                changeMusicButton.setFrame(0);
                controller.setMusicEnabled(true);
                controller.getMusic().play();
            }
        }, this);

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton2', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            backButton.anims.play('backButtonAnim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);       
    }

    update(time, delta){  
        //****************** Música *********************//
        if(controller.getMusicEnabled() === false){
            controller.getMusic().pause();
        } else {
            controller.getMusic().resume();
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
/**
        * Carga de escena
        */
function loadScene(){
    controller.getCurrentScene().scene.stop();
    var nextScene = game.scene.getScene("sceneMainMenu");
    nextScene.scene.start();
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneSettingsMenu;