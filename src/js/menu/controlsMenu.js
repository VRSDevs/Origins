//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//****************** Botones *********************//
// Jugador 1 //
// Movimiento
var wButton;
var aButton;
var sButton;
var dButton;
// Interacción
var vButton;
// Jugador 2 //
// Interacción
var pButton;
// Retroceso //
var backButton;

//////////////////////////////////////////////////////////////////////
//                  Clase de escena de menu de controles            //
//////////////////////////////////////////////////////////////////////
class sceneControlsMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneControlsMenu",
            active: false
        });
    }
    create() {
        //******************* Variables auxiliares ************************//
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.add.image(400, 320, "controls");

        //****************** Botones *********************//
        // Jugador 1 //
        // Movimiento       
        wButton = this.add.sprite(109, 413, "spriteWButton", 0).setInteractive();
        aButton = this.add.sprite(49, 470, "spriteAButton", 0).setInteractive();
        sButton = this.add.sprite(109, 470, "spriteSButton", 0).setInteractive();
        dButton = this.add.sprite(170, 470, "spriteDButton", 0).setInteractive();
        // Interacción
        vButton = this.add.sprite(109, 312, "spriteVButton", 0).setInteractive();

        // Jugador 2 //
        // Interacción
        pButton = this.add.sprite(692, 312, "spritePButton", 0).setInteractive();

        // Retroceso //
        backButton = this.add.sprite(width - 242/2, 580, "spriteBackButton", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton', {start: 1, end: 4}),
            frameRate: 3,
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

        controller.getMusic().resume();


    }
    update(time, delta){

    }
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Carga de escena ************************//
function loadScene(){
    controller.getMusic().pause();
    this.scene.stop("sceneControlsMenu");
    this.scene.start("sceneMainMenu");

    
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneControlsMenu;