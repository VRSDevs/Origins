//////////////////////////////////////////////////////////////////////
//                    Clase para el menu principal                  //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';


var playButton;
var controlsButton;
var settingsButton;
var exitButton;
var id;
var music;

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
        playButton = this.add.sprite(width - 360/2, 296, "spritePlayButton", 1).setInteractive();
        playButton.addListener('pointerover', () => {
            id = 1;
            playButton.setFrame(0);
        }, this);
        playButton.addListener('pointerout', () => {
            id = 0;
            playButton.setFrame(1);
        }, this);
        playButton.addListener('pointerdown', loadScene, this);

        // Botón de menú de controles
        controlsButton = this.add.sprite(width - 360/2, 398, "spriteControlsButton", 1).setInteractive();
        controlsButton.addListener('pointerover', () => {
            id = 2;
            controlsButton.setFrame(0);
        }, this);
        controlsButton.addListener('pointerout', () => {
            id = 0;
            controlsButton.setFrame(1);
        }, this);
        controlsButton.addListener('pointerdown', loadScene, this);     
               
        // Botón de menú de ajustes
        settingsButton = this.add.sprite(width - 360/2, 501, "spriteSettingsButton", 1).setInteractive();
        settingsButton.addListener('pointerover', () => {
            id = 3;
            settingsButton.setFrame(0);
        }, this);
        settingsButton.addListener('pointerout', () => {
            id = 0;
            settingsButton.setFrame(1);
        }, this);
        
        settingsButton.addListener('pointerdown', loadScene, this); 
        // Botón de salir
        exitButton = this.add.sprite(width - 242/2, 590, "spriteExitButton", 1).setInteractive();
        exitButton.addListener('pointerover', () => {
            id = 4;
            exitButton.setFrame(0);
        }, this);
        exitButton.addListener('pointerout', () => {
            id = 0;
            exitButton.setFrame(1);
        }, this);
        exitButton.addListener('pointerdown', loadScene, this); 

        // Música del menu principal
        // var music = this.sound.add('music');
        //if(musicPlaying){
        //    if(controller.getMusicEnabled() === true){
          //      music.play();
               
           //  }else{
            //    music.stop();
            // }
      //  }
        

    }        

    update(time, delta){
        
    }
}

function loadScene(){
    switch (id) {
        case 1:
            console.log(id);
            this.scene.start("scenePlayMenu");

            break;    
        case 2:
            console.log(id);
            this.scene.start("sceneControlsMenu");

            break;
        case 3:
            console.log(id);
            this.scene.start("sceneSettingsMenu");

            break;
        case 4:
            alert("Gracias por jugar a nuestro juego.");
            console.log(id);
            window.close();
           
            break;  
        default:
           

            break;
    }   
}

export default sceneMainMenu;
export {music};