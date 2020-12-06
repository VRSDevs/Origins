//////////////////////////////////////////////////////////////////////
//                    Clase para el menu principal                  //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';
import { game } from '../init.js';


var playButton;
var controlsButton;
var settingsButton;
var exitButton;
var id = 0;


class sceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key: "sceneMainMenu",
        });
    }

    create() {
        // Variables auxiliares
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        // Fondo
        this.add.image(400, 320, "mainMenu");
        
        // Botón de jugar
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

        // Botón de menú de controles
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
               
        // Botón de menú de ajustes
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
        // Botón de salir
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

        // Música del menu principal
        controller.setMusic(this.sound.add("music"));

    }        

    update(time, delta){
        if (controller.getMusicEnabled()){
            if(!controller.getMusicPlaying()){
                controller.getMusic().play();
                controller.setMusicPlaying(true);
            }
        }else{
           controller.getMusic().stop();
           controller.setMusicPlaying(false);

        }   
        
   }  
      
}

function loadScene(){
    switch (id) {
        case 1:
            this.scene.stop("sceneMainMenu");
            this.scene.start("scenePlayMenu");

            break;    
        case 2:
            this.scene.stop("sceneMainMenu");
            this.scene.start("sceneControlsMenu");

            break;
        case 3:
            this.scene.stop("sceneMainMenu");
            this.scene.start("sceneSettingsMenu");
            

            break;
        case 4:
            alert("Gracias por jugar a nuestro juego.");
            window.close();
            break;  
    }   
}

export default sceneMainMenu;
