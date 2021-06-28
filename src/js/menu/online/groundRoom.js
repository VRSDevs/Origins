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
var readyButton = undefined;    // Listo
var backButton = undefined;     // Volver para atrás
//****************** Iconos *********************//
var catIcons = [undefined, undefined, undefined, undefined];
//****************** Textos *********************//
// Nombres jugadores //
var names = ["", "", "", ""];
// Preparados //
var readyTexts = ["", "", "", ""];
//****************** Control *********************//
var startMatch = false;     // ¿Empezó la partida?
var option = 0;             // Opción del menú (salir del lobby o empezar partida)

//////////////////////////////////////////////////////////////////////
//              Clase de escena de lobby de tierra                  //
//////////////////////////////////////////////////////////////////////
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
        // Botón de listo //
        readyButton = this.add.sprite(((width * 3) / 4) - 50, 580, "readyPButton", 0).setInteractive();
        readyButton.addListener('pointerdown', () => {
            if (players[user.getIdInRoom()].getReady() === true){     
                readyButton.setFrame(0);
                players[user.getIdInRoom()].setReady(false);
            } else {
                readyButton.setFrame(1);
                players[user.getIdInRoom()].setReady(true);
            }
            //
            sendReadyMessage();
        }, this);

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            option = 2;
            backButton.anims.play('backButtonAnim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            option = 0;
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);


    }
    update() {
        // Llamada a función para actualizar información de cada uno de los jugadores
        updatePlayerInfo();

        // Si el número de jugadores es distinto a 0 y no se empezó la partida
        if(controller.getMatchPlayers() !== 0 && !startMatch) {
            // Asignación de valores a variables
            option = 1;
            startMatch = true;

            // Llamada retardada a evento
            controller.getCurrentScene().time.delayedCall(
                1000,
                loadScene,
                [],
                this
            );
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Funciones Comms                         //
//////////////////////////////////////////////////////////////////////
/**
 * Función para enviar un mensaje al servidor con el nuevo estado del jugador
 */
function sendReadyMessage() {
    // Obtención de la conexión ws del diccionario de conexiones
    var wsConnection = server.getWSConnection()[user.getOnlineRoom()];

    // Creación del mensaje a mandar al servidor con el estado de "listo"
    var message = {
        code: "OK_PLAYERREADY",
        playerId: user.getIdInRoom(),
        playerType: players[user.getIdInRoom()].getType(),
        playerName: players[user.getIdInRoom()].getName(),
        playerReady: players[user.getIdInRoom()].getReady()
    }

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
/**
 * Función para cargar la siguiente escena
 */
function loadScene(){
    switch (option) {
        case 1:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneGroundLevelOnline");
            nextScene.scene.start();
            break;
    
        case 2:
            // Desconexión de la sala
            server.disconnectFromRoom();
            //
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneMainMenu");
            nextScene.scene.start();
            break;
    }
}

/**
 * Actualizar la información del jugador (UI)
 */
function updatePlayerInfo() {
    // Por cada jugar en la lista de jugadores
    for (var i = 0; i < players.length; i++) {
        // Asignación de textura en función del tipo de jugador
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

        // Asignación del nombre al tipo
        names[i].setText(players[i].getName());

        // Si el jugador tiene nombre asignado (slot con jugador)
        if(players[i].getName() !== ""){
            // Si el jugador está listo para la partida
            if(players[i].getReady()) {
                readyTexts[i].setText("Ready");
            // En caso de no estarlo
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
