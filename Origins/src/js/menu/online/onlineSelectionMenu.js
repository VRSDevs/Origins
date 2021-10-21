//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { game } from '../../init.js';
import { controller } from '../../gameController.js';
import { players } from '../../cats.js';
import { server } from '../../server/server.js';
import { user } from '../../server/user.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Botones ************************//
var backButton = undefined;
var groundCatButton = undefined;
var waterCatButton = undefined;
var airCatButton = undefined;
var fireCatButton = undefined;
//******************* Descripciones ************************//
var catDescription = undefined;
//******************* Control ************************//
// Selección de gato //
var selectedCat = 0;
// Animaciones //
var startAnim = 0;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú selección PJ           //
//////////////////////////////////////////////////////////////////////
class sceneOnlineSelectionMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneOnlineSelectionMenu",
            active: false
        });
    }
    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Imágenes ************************//
        // Fondo //
        this.add.image(400, 320, "selectionOnline");
        // Descripciones gatos //
        catDescription = this.add.image(410, 423, "emptyDesc");

        //******************* Botones ************************//
        // Gato tierra //
        groundCatButton = this.add.sprite(518, 268, "GroundCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'groundMenuAnim',
            frames: this.anims.generateFrameNumbers('GroundCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        groundCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 1;
        }, this);
        groundCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        groundCatButton.addListener('pointerdown', loadScene, this);

        // Gato agua //
        waterCatButton = this.add.sprite(133, 268, "WaterCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'waterMenuAnim',
            frames: this.anims.generateFrameNumbers('WaterCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        waterCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 2;
        }, this);
        waterCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        waterCatButton.addListener('pointerdown', loadScene, this);

        // Gato aire //
        airCatButton = this.add.sprite(333, 268, "AirCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'airMenuAnim',
            frames: this.anims.generateFrameNumbers('AirCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        airCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 3;
        }, this);
        airCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        airCatButton.addListener('pointerdown', loadScene, this);

        // Gato fuego //
        fireCatButton = this.add.sprite(697, 268, "FireCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'fireMenuAnim',
            frames: this.anims.generateFrameNumbers('FireCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        fireCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 4;
        }, this);
        fireCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        fireCatButton.addListener('pointerdown', loadScene, this);

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2",0).setInteractive();
        this.anims.create({
            key: 'backButton2Anim',
            frames: this.anims.generateFrameNumbers('spriteBackButton2', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            backButton.anims.play('backButton2Anim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);
    }
    
    update(time, delta) {
        //******************* Animaciones botones ************************//
        if (startAnim === true && selectedCat === 1) {
            groundCatButton.anims.play('groundMenuAnim', true);
            loadDescription(1);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', true);
            loadDescription(2);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', true);
            loadDescription(3);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', true);
            loadDescription(4);
        } else {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
            loadDescription(0);
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
//                        Funciones Comunicación                    //
//////////////////////////////////////////////////////////////////////
/**
 * Función para mandar la información del jugador del cliente
 */
function sendPlayerInfo() {
    // Obtención de la conexión del cliente
    var wsConnection = server.getWSConnection()[user.getOnlineRoom()];

    // Generación del mensaje a enviar
    var message = {
        code: "OK_PLAYERJOIN",
        playerId: user.getIdInRoom(),
        playerType: players[user.getIdInRoom()].getType(),
        playerName: user.getUsername(),
        playerReady: players[user.getIdInRoom()].getReady()
    }

    // Envío del mensaje
    wsConnection.send(JSON.stringify(message));
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
/**
 * Método para cargar las descripciones de los gatos en función del seleccionado
 * @param {integer} value Valor (ID auxiliar) del gato seleccionado
 */
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

/**
 * Función para ir a la siguiente escena
 */
function goNextScene() {
    // Reinicio del valor del gato seleccionado
    selectedCat = 0;

    // Llamada a la función de envío de la información del mensaje
    sendPlayerInfo();

    // Reinicio y paso a la siguiente escena
    controller.getCurrentScene().scene.stop();
    var nextScene = game.scene.getScene("sceneGroundRoom");
    nextScene.scene.start();
}

/**
 * Función de carga de la siguiente escena
 */
function loadScene() {
    // Asignación de tipo al jugador en función del asignado al usuario
    switch (selectedCat) {
        case 1:
            players[user.getIdInRoom()].setType(1);
            players[user.getIdInRoom()].setName(user.getUsername());
            players[user.getIdInRoom()].setReady(false);
            goNextScene();
            break;
        case 2:
            players[user.getIdInRoom()].setType(2);
            players[user.getIdInRoom()].setName(user.getUsername());
            players[user.getIdInRoom()].setReady(false);
            goNextScene();
            break;
        case 3:
            players[user.getIdInRoom()].setType(3);
            players[user.getIdInRoom()].setName(user.getUsername());
            players[user.getIdInRoom()].setReady(false);
            goNextScene();
            break;
        case 4:
            players[user.getIdInRoom()].setType(4);
            players[user.getIdInRoom()].setName(user.getUsername());
            players[user.getIdInRoom()].setReady(false);
            goNextScene();
            break;
        default:
            // Desconexión de la sala
            server.disconnectFromRoom();
            // Carga de la siguiente escena (anterior)
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("scenePlayMenu");
            nextScene.scene.start();
            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneOnlineSelectionMenu;