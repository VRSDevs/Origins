//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../../gameController.js';
import { players } from '../../cats.js';
import { game } from '../../init.js';
import { user } from '../../server/user.js';
import { server } from '../../server/server.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//****************** Botones *********************//
var backButton = undefined;
//****************** Iconos *********************//
var catIcons = [undefined, undefined, undefined, undefined];
//****************** Textos *********************//
// Nombres jugadores //
var names = ["", "", "", ""];
var name1 = "";
var name2 = "";
var name3 = "";
var name4 = "";
// Preparados //
var readyTexts = ["", "", "", ""];
var readyP1 = "";
var readyP2 = "";
var readyP3 = "";
var readyP4 = "";



class sceneGroundRoom extends Phaser.Scene{
    constructor() {
        super({
            key: "sceneGroundRoom",
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
        this.add.image(width / 2, height / 2, "groundRoom");

        //****************** Gatos *********************//
        // Conocer posiciones
        catIcons[0] = this.add.image(80, 215, "emptyFace");
        catIcons[1] = this.add.image(80, 295, "emptyFace");
        catIcons[2] = this.add.image(80, 375, "emptyFace");
        catIcons[3] = this.add.image(80, 465, "emptyFace");

        //****************** Nombres *********************//
        names[0] = this.add.text(width / 6, 203, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        names[1] = this.add.text(width / 6, 283, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        names[2] = this.add.text(width / 6, 363, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        names[3] = this.add.text(width / 6, 453, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        //****************** Listo *********************//
        readyTexts[0] = this.add.text((width * 3) / 4, 203, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        readyTexts[1] = this.add.text((width * 3) / 4, 283, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        readyTexts[2] = this.add.text((width * 3) / 4, 363, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        readyTexts[3] = this.add.text((width * 3) / 4, 453, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        //****************** Botones *********************//
        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton', {start: 1, end: 4}),
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
    update() {
        //
        updatePlayerInfo();
    }
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
/**
 * 
 */
function loadScene(){
    // Desconexión de la sala
    server.disconnectFromRoom();
    //
    controller.getCurrentScene().scene.stop();
    var nextScene = game.scene.getScene("sceneMainMenu");
    nextScene.scene.start();
    /*
    switch (lobby) {
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        case 5:
            

            break;
    }
    */
}

/**
 * 
 */
function updatePlayerInfo() {
    for (var i = 0; i < players.length; i++) {
        //
        switch (players[i].getType()) {
            case 1:
                catIcons[i].setTexture("GroundCatFace");
                break;
            case 2:
                catIcons[i].setTexture("WaterCatFace");
                break;
            case 3:
                catIcons[i].setTexture("AirCatFace");   
                break;
            case 4:
                catIcons[i].setTexture("FireCatFace");             
                break;
            default:
                catIcons[i].setTexture("emptyFace");
                break;
        }

        //
        names[i].setText(players[i].getName());

        //
        if(players[i].getName() !== ""){
            if(players[i].getReady()) {
                readyTexts[i].setText("Ready");
            } else {
                readyTexts[i].setText("Not ready");
            } 
        } else {
            readyTexts[i].setText("");
        }     
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneGroundRoom;
