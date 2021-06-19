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
//****************** Textos *********************//
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
        this.add.image(400, 320, "groundRoom");

        //****************** Gatos *********************//

        // Conocer posiciones
        this.add.image(80,215,"AirCatFace");
        this.add.image(80,295,"GroundCatFace");
        this.add.image(80,380,"WaterCatFace");
        this.add.image(80,465,"FireCatFace");

        //****************** Nombres *********************//


        //****************** Listo *********************//
        readyP1 = this.add.text(650, 215, "0", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        readyP2 = this.add.text(650, 295, "0", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        readyP3 = this.add.text(650, 380, "0", {
            fontFamily: 'origins',
            fontSize: '20px',
            fill: '#ffffff'
        });

        readyP4 = this.add.text(650, 465, "0", {
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
            lobby = 5;
            backButton.anims.play('backButtonAnim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            lobby = 0;
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);


    }
    update() {

        updateReady();



    }





}



//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
//******************* Carga descripciones de gatos ************************//
function loadDescription(value) {
    switch (value) {
        case 0:
            catDescription.setTexture("emptyDesc");
            break;
        case 1:
            catDescription.setTexture("GroundCatDesc");
            break;
        case 2:
            catDescription.setTexture("WaterCatDesc");
            break;
        case 3:
            catDescription.setTexture("AirCatDesc");
            break;
        case 4:
            catDescription.setTexture("FireCatDesc");
            break;
    }
}


//******************* Carga de escena ************************//
function loadScene(){
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
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneMainMenu");
            nextScene.scene.start();

            break;
    }
}

//******************* Actualización del texto ************************//
function updateReady() {


    readyP1.setText("Ready");

    readyP2.setText("Not ready");

    readyP3.setText("Ready");

    readyP4.setText("Ready");
    
}


//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneGroundRoom;
