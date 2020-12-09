//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';
import { game } from '../init.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Botones ************************//
var playButton = undefined;
var controlsButton = undefined;
var settingsButton = undefined;
var exitButton = undefined;
//******************* Control ************************//
// Selección de submenú //
var id = 0;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú principal              //
//////////////////////////////////////////////////////////////////////
class sceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneMainMenu",
        });
    }

    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.add.image(400, 320, "mainMenu");
        
        //****************** Botones *********************//
        // Jugar //
        playButton = this.add.sprite(width - 350/2, 296, "spritePlayButton", 0).setInteractive();
        this.anims.create({
            key: 'playButtonAnim',
            frames: this.anims.generateFrameNumbers('spritePlayButton', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });

        playButton.addListener('pointerover', () => {
            id = 1;
            playButton.anims.play('playButtonAnim',true);
        }, this);
        playButton.addListener('pointerout', () => {
            id = 0;
            playButton.anims.stop();
            playButton.setFrame(0);
        }, this);
        playButton.addListener('pointerdown', loadScene, this);

        // Controles //
        controlsButton = this.add.sprite(width - 350/2, 398, "spriteControlsButton", 0).setInteractive();
        this.anims.create({
            key: 'controlButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteControlsButton', {start: 1, end: 8}),
            frameRate: 6,
            repeat: 0
        });

        controlsButton.addListener('pointerover', () => {
            id = 2;
            controlsButton.anims.play('controlButtonAnim',true);
        }, this);
        controlsButton.addListener('pointerout', () => {
            id = 0;
            controlsButton.anims.stop();
            controlsButton.setFrame(0);
        }, this);
        controlsButton.addListener('pointerdown', loadScene, this);     
               
        // Ajustes //
        settingsButton = this.add.sprite(width - 350/2, 501, "spriteSettingsButton", 0).setInteractive();
        this.anims.create({
            key: 'settingsButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteSettingsButton', {start: 1, end: 8}),
            frameRate: 6,
            repeat: 0
        });

        settingsButton.addListener('pointerover', () => {
            id = 3;
            settingsButton.anims.play('settingsButtonAnim',true);
        }, this);
        settingsButton.addListener('pointerout', () => {
            id = 0;
            settingsButton.anims.stop();
            settingsButton.setFrame(0);
        }, this);
        
        settingsButton.addListener('pointerdown', loadScene, this); 

        // Salir //
        exitButton = this.add.sprite(width - 301/2, 590, "spriteExitButton", 0).setInteractive();
        this.anims.create({
            key: 'exitButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteExitButton', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });
        
        exitButton.addListener('pointerover', () => {
            id = 4;
            exitButton.anims.play('exitButtonAnim',true);
        }, this);
        exitButton.addListener('pointerout', () => {
            id = 0;
            exitButton.anims.stop();
            exitButton.setFrame(0);
        }, this);
        exitButton.addListener('pointerdown', loadScene, this); 

        //****************** Música *********************//
        controller.setMusic(this.sound.add("music"));
        controller.setMusicLevelForest(this.sound.add ("music2"));
        controller.setMusicLevelCave(this.sound.add("music3"));
        controller.setMusicLevelLab(this.sound.add("music4"));
        controller.setMusicEffect1(this.sound.add("musicEffect1"));
        controller.setMusicEffect2(this.sound.add("musicEffect2"));

        if(controller.getMusic().play());{
            controller.getMusicPlaying() === true;

            if(controller.getMusicPlaying() === true){
                controller.setMusic(undefined);
                controller.setMusic(this.sound.add("music"));
                controller.getmusic().resume();
            }
        }
      
        if(controller.getMusicEnabled() === false){
            controller.getMusic().stop();
        }
    }        

    update(time, delta){
      
    }       
}  

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Carga de escena ************************//
function loadScene(){
    switch (id) {
        case 1:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("scenePlayMenu");
            nextScene.scene.start();
            controller.getMusic().pause();
            break;    
        case 2:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneControlsMenu");
            nextScene.scene.start();
            controller.getMusic().pause();
            break;
        case 3:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneSettingsMenu");
            nextScene.scene.start();
            controller.getMusic().pause();
            break;
        case 4:
            alert("Gracias por jugar a nuestro juego.");
            window.close();
            break;  
    }   
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneMainMenu;
