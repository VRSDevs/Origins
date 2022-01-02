//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { game } from '../init.js';
import { controller } from '../gameController.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//****************** Botones *********************//
var backButton = undefined;
var localMultiplayerButton = undefined;
var onlineMultiplayerButton = undefined;
//******************* Control ************************//
// Animaciones //
var startAnim = false;
var mode = 0;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú jugar                  //
//////////////////////////////////////////////////////////////////////
class scenePlayMenu extends Phaser.Scene {
    constructor() {
        super({key: "scenePlayMenu",
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
        this.add.image(400, 320, "play");

        //****************** Botones *********************//
        // Modo 2 Jugador (local) //
        localMultiplayerButton = this.add.sprite(width / 4, 284, "sprite2PlayerGM", 0).setInteractive();
        this.anims.create({
            key: 'localMultiplayerAnim',
            frames: this.anims.generateFrameNumbers('sprite2PlayerGM', { start: 1, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        localMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            mode = 2;
            controller.setGameMode(2);
        }, this);
        localMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            mode = 0;
            controller.setGameMode(0);
        }, this);
        localMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Modo Multijugador //
        onlineMultiplayerButton = this.add.sprite((width * 3) / 4, 284, "spriteMultiplayerGM", 0).setInteractive();
        this.anims.create({
            key: 'multiplayerAnim',
            frames: this.anims.generateFrameNumbers('spriteMultiplayerGM', { start: 1, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        onlineMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            mode = 3;
            controller.setGameMode(3);
        }, this);
        onlineMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            mode = 0;
            controller.setGameMode(0);
        }, this);

        // Retroceso //
        backButton = this.add.sprite(242/2, 580, "spriteBackButton2", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton2', {start: 1, end: 4}),
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
    }

    update(time, delta){
        //****************** Animaciones *********************//
        if (startAnim === true && controller.getGameMode() === 2){
            localMultiplayerButton.anims.play('localMultiplayerAnim', true);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 3){
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', true);
        } else {
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        }
        
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
 * Función para cargar la siguiente escena
 */
function loadScene(){
    // Selección de la siguiente escena en función del modo escogido
    if(mode === 2){
        // Llamada al método de limpieza de variables
        resetVariables();

        controller.getCurrentScene().scene.stop();
        var nextScene = game.scene.getScene("sceneSelectionMenu");
        nextScene.scene.start();
    } else if(mode === 3){
        // Llamada al método de limpieza de variables
        resetVariables();

        controller.getCurrentScene().scene.stop();
        var nextScene = game.scene.getScene("sceneRoomSelectMenu");
        nextScene.scene.start();
    } else {
        // Llamada al método de limpieza de variables
        resetVariables();
        
        controller.getMusic().pause();
        controller.getCurrentScene().scene.stop();
        var nextScene = game.scene.getScene("sceneMainMenu");
        nextScene.scene.start();
    }
}

/**
 * Función para resetar variables
 */
function resetVariables() {
    mode = 0;
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default scenePlayMenu;
