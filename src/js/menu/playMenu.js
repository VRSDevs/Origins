//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { game } from '../init.js';
import { controller } from '../gameController.js';
import { user } from '../server/user.js';
import { server } from '../server/server.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//****************** Botones *********************//
var backButton = undefined;
var singlePlayerButton = undefined;
var localMultiplayerButton = undefined;
var onlineMultiplayerButton = undefined;
//******************* Control ************************//
// Animaciones //
var startAnim = false;
//******************* Servidor ************************//
// Imágenes //
var userIc = undefined;
// Botones //
var syncButton = undefined;
// Texto //
var textServerConnected = "";
var textNumOfUsersConnected = "";
//
var callGetUsersEvent = true;

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

        //
        createServerUI();

        //****************** Botones *********************//
        // Modo 1 Jugador //
        singlePlayerButton = this.add.sprite(139, 251, "sprite1PlayerGM", 0).setInteractive();
        this.anims.create({
            key: 'singlePlayerAnim',
            frames: this.anims.generateFrameNumbers('sprite1PlayerGM', { start: 1, end: 6 }),
            frameRate: 4, 
            repeat: -1
        });

        singlePlayerButton.addListener('pointerover', () => {
            startAnim = true;
            controller.setGameMode(1);
        }, this);
        singlePlayerButton.addListener('pointerout', () => {
            startAnim = false;
            controller.setGameMode(0);
        }, this);
        singlePlayerButton.addListener('pointerdown', loadScene, this);

        // Modo 2 Jugador (local) //
        localMultiplayerButton = this.add.sprite(405, 251, "sprite2PlayerGM", 0).setInteractive();
        this.anims.create({
            key: 'localMultiplayerAnim',
            frames: this.anims.generateFrameNumbers('sprite2PlayerGM', { start: 1, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        localMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            controller.setGameMode(2);
        }, this);
        localMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            controller.setGameMode(0);
        }, this);
        localMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Modo Multijugador //
        onlineMultiplayerButton = this.add.sprite(662, 251, "spriteMultiplayerGM", 0).setInteractive();
        this.anims.create({
            key: 'multiplayerAnim',
            frames: this.anims.generateFrameNumbers('spriteMultiplayerGM', { start: 1, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        onlineMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            controller.setGameMode(3);
        }, this);
        onlineMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            controller.setGameMode(0);
        }, this);
        onlineMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Retroceso //
        backButton = this.add.sprite(242/2, 580, "spriteBackButton2", 0).setInteractive();
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
    }

    update(time, delta){
        //****************** Servidor *********************//
        if (server.isServerConnected() === true) {
            textServerConnected.setStyle({
                color: '#00ff00',
            });
            textServerConnected.setText("Server Online");
            userIc.setTint(0x00ff00);
            textNumOfUsersConnected.setStyle({
                color: '#00ff00',
            });
            if(callGetUsersEvent){
                controller.getCurrentScene().time.addEvent({
                    delay: 1200,
                    callback: () => {
                        getConnectedUsers();
                    },
                    callbackScope: this,
                    loop: true
                });
                callGetUsersEvent = false;
            }
            textNumOfUsersConnected.setText(server.getConnectedUsers());
        } else {
            textServerConnected.setStyle({
                color: '#ff0000',
            });
            textServerConnected.setText("Server Offline");
            userIc.setTint(0xff0000);
            textNumOfUsersConnected.setStyle({
                color: '#ff0000',
            });
            if(!callGetUsersEvent){
                controller.getCurrentScene().time.removeAllEvents();
                controller.getCurrentScene().time.addEvent({
                    delay: 1200,
                    callback: () => {
                        syncButton.anims.stop();
                        syncButton.setFrame(1);
                    },
                    callbackScope: this,
                    loop: false
                });
                callGetUsersEvent = true;
            }
            textNumOfUsersConnected.setText("0");
        }

        //****************** Animaciones *********************//
        if(startAnim === true && controller.getGameMode() === 1){
            singlePlayerButton.anims.play('singlePlayerAnim', true);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 2){
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', true);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 3){
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', true);
        } else {
            singlePlayerButton.anims.play('singlePlayerAnim', false);
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
//                      Funciones HTTP                              //
//////////////////////////////////////////////////////////////////////
// Usuarios conectados al servidor //
function getConnectedUsers() {
    $.ajax({
        url: 'http://localhost:8080/users/connectedUsers'
    }).done(function (listOfConnectedUsers){
        server.setConnectedUsers(listOfConnectedUsers.length);
    })
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////

function createServerUI() {
    //******************* Conexión al servidor ************************//
    controller.getCurrentScene().add.rectangle(730, 93, 160, 67, 0x000000, 0.3);

    //******************* Conexión al servidor ************************//
    // Texto //
    textServerConnected = controller.getCurrentScene().add.text(660, 70, "Loading...", {
        fontFamily: 'origins',
        fontSize: 14,
        color: '#00ff00',
    });
    // Botón recarga //
    syncButton = controller.getCurrentScene().add.sprite(775, 145, "spriteReloadButton", 1).setInteractive();
    controller.getCurrentScene().anims.create({
        key: 'syncButtonAnim',
        frames: controller.getCurrentScene().anims.generateFrameNumbers('spriteReloadButton', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
    });

    syncButton.addListener('pointerdown', () => {
        syncButton.anims.play('syncButtonAnim', true);
        server.connect();
        controller.getCurrentScene().time.addEvent({
            delay: 1200,
            callback: () => {
                syncButton.anims.stop();
                syncButton.setFrame(1);
            },
            callbackScope: this,
            loop: false
        });
    }, this);

    //******************* Conexión al servidor ************************//
    // Texto //
    getConnectedUsers();
    textNumOfUsersConnected = controller.getCurrentScene().add.text(685, 89, server.getConnectedUsers(), {
        fontFamily: 'origins',
        fontSize: 24,
        color: '#00ff00',
    });
    // Icono //
    userIc = controller.getCurrentScene().add.image(670, 105, "userIcon").setScale(1.2);
}

//******************* Carga de escena ************************//
function loadScene(){
    if(controller.getGameMode() === 1) {
        controller.setGameMode(0);
        alert("En progreso...");

    } else if(controller.getGameMode() === 2){
        controller.setGameMode(0);
        controller.getCurrentScene().scene.stop();
        var nextScene = game.scene.getScene("sceneSelectionMenu");
        nextScene.scene.start();
    } else if(controller.getGameMode() === 3){
        controller.setGameMode(0);
        alert("En progreso...");
    } else {
        controller.getMusic().pause();
        controller.setGameMode(0);
        controller.getCurrentScene().scene.stop();
        var nextScene = game.scene.getScene("sceneMainMenu");
        nextScene.scene.start();
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default scenePlayMenu;
