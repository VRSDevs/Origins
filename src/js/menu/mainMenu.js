//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { game } from '../init.js';
import { server } from '../server/server.js';
import { user } from '../server/user.js';

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
//******************* Servidor ************************//
// Control //
var chatMode = 0;
// Botón //
var syncButton = undefined;
var changeTxT = undefined;
// Imágenes //
var userIc = undefined;
// Texto //
var textServerConnected = "";
var textUsername = "";
var textNumOfUsersConnected = "";
var messagesOrUsers = "";
//******************* Control ************************//
// Selección de submenú //
var id = 0;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú principal              //
//////////////////////////////////////////////////////////////////////
class sceneMainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneMainMenu",
        });
    }

    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.add.image(400, 320, "mainMenu").setDepth(-2);

        //****************** Botones *********************//
        // Jugar //
        playButton = this.add.sprite(width - 350 / 2, 296, "spritePlayButton", 0).setInteractive();
        this.anims.create({
            key: 'playButtonAnim',
            frames: this.anims.generateFrameNumbers('spritePlayButton', { start: 1, end: 4 }),
            frameRate: 6,
            repeat: 0
        });

        playButton.addListener('pointerover', () => {
            id = 1;
            playButton.anims.play('playButtonAnim', true);
        }, this);
        playButton.addListener('pointerout', () => {
            id = 0;
            playButton.anims.stop();
            playButton.setFrame(0);
        }, this);
        playButton.addListener('pointerdown', loadScene, this);

        // Controles //
        controlsButton = this.add.sprite(width - 350 / 2, 398, "spriteControlsButton", 0).setInteractive();
        this.anims.create({
            key: 'controlButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteControlsButton', { start: 1, end: 8 }),
            frameRate: 6,
            repeat: 0
        });

        controlsButton.addListener('pointerover', () => {
            id = 2;
            controlsButton.anims.play('controlButtonAnim', true);
        }, this);
        controlsButton.addListener('pointerout', () => {
            id = 0;
            controlsButton.anims.stop();
            controlsButton.setFrame(0);
        }, this);
        controlsButton.addListener('pointerdown', loadScene, this);

        // Ajustes //
        settingsButton = this.add.sprite(width - 350 / 2, 501, "spriteSettingsButton", 0).setInteractive();
        this.anims.create({
            key: 'settingsButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteSettingsButton', { start: 1, end: 8 }),
            frameRate: 6,
            repeat: 0
        });

        settingsButton.addListener('pointerover', () => {
            id = 3;
            settingsButton.anims.play('settingsButtonAnim', true);
        }, this);
        settingsButton.addListener('pointerout', () => {
            id = 0;
            settingsButton.anims.stop();
            settingsButton.setFrame(0);
        }, this);

        settingsButton.addListener('pointerdown', loadScene, this);

        // Salir //
        exitButton = this.add.sprite(width - 301 / 2, 590, "spriteExitButton", 0).setInteractive();
        this.anims.create({
            key: 'exitButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteExitButton', { start: 1, end: 4 }),
            frameRate: 6,
            repeat: 0
        });

        exitButton.addListener('pointerover', () => {
            id = 4;
            exitButton.anims.play('exitButtonAnim', true);
        }, this);
        exitButton.addListener('pointerout', () => {
            id = 0;
            exitButton.anims.stop();
            exitButton.setFrame(0);
        }, this);
        exitButton.addListener('pointerdown', loadScene, this);

        //******************* Interfaz servidor ************************//
        createServerUI();

        //****************** Música *********************//
        if (controller.getMusicPlaying() === false) {
            controller.setMusic(this.sound.add("music"));
            controller.setMusicLevelForest(this.sound.add("music2"));
            controller.setMusicLevelCave(this.sound.add("music3"));
            controller.setMusicLevelLab(this.sound.add("music4"));
            controller.setMusicEffect1(this.sound.add("musicEffect1"));
            controller.setMusicEffect2(this.sound.add("musicEffect2"));
            controller.getMusic().play();
            controller.setMusicPlaying(true);
        }
    }

    update(time, delta) {
        //****************** Servidor *********************//
        if (server.isServerConnected() === true) {          
            // Actualización mensajes o lista de usuarios //
            if(chatMode === 0) {
                messagesOrUsers.setText(server.getMessagesFromDB());
            } else {
                messagesOrUsers.setText(server.getListConnectedUsers());
            }
            
            // Actualización estado del servidor //
            textServerConnected.setStyle({
                color: '#056005',
            });
            textServerConnected.setText("Server Online");
            // Actualización usuarios conectados //
            userIc.setTint(0x00ff00);
            textNumOfUsersConnected.setStyle({
                color: '#056005',
            });
            textNumOfUsersConnected.setText(server.getConnectedUsers());
        } else {
            //
            messagesOrUsers.setText(server.getMessagesFromDB());
            // Actualización del estado del servidor //
            textServerConnected.setStyle({
                color: '#bc1616',
            });
            textServerConnected.setText("Server Offline");
            // Actualización 
            userIc.setTint(0xbc1616);
            textNumOfUsersConnected.setStyle({
                color: '#bc1616',
            });
            textNumOfUsersConnected.setText("0");
        }

        //****************** Música *********************//
        if (controller.getMusicEnabled() === false) {
            controller.getMusic().pause();
        } else {
            controller.getMusic().resume();
        }
    }
}
//////////////////////////////////////////////////////////////////////
//                     Funciones al servidor                        //
//////////////////////////////////////////////////////////////////////
/**
 * Función para enviar un mensaje al servidor y comunicarselo al resto de clientes
 * @param {Object} message Mensaje a enviar
 */
function sendMessage(message){
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["chat"];

    // Construcción del mensaje a enviar
    var messageToAdd = "<" + message.name + "> " + message.message;
    // Inserción en la lista de mensajes de la BD
    server.getMessagesFromDB().push(messageToAdd);

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
/**
 * Función para crear la UI del servidor
 */
function createServerUI() {
    //******************* Mensajes *******************//
    // Variables auxiliares //   
    var xChat = 19;
    var yChat = 340;
    var wChat = 320;
    var hChat = 256;

    // Introducción de mensajes //
    // Código HTML para introducir mensajes
    var messagesHTML = controller.getCurrentScene().add.dom(95, 605).createFromCache('messagesCode').setOrigin(0);
    messagesHTML.setScale(0.5);
    messagesHTML.addListener('click');
    // Evento al hacer clic
    messagesHTML.on('click', function (event) {
        if (event.target.name === 'sendMessage') {
            //  Elemento HTML donde se introduce el texto
            var elementHTML = this.getChildByName('messageField');
            if (elementHTML.value !== '') {
                // Objeto de mensaje
                var message = {
                    name: user.getUsername(),
                    message: elementHTML.value,
                }

                // Envío del mensaje al servidor y a la BD
                sendMessage(message);

                // Limpieza del campo de texto
                elementHTML.value = '';

            } else {
                console.log("No hay escrito ningún mensaje!")
            }
        }
    });
    changeTxT = controller.getCurrentScene().add.sprite(xChat + 30, 620, "spriteMsgButton", 1).setInteractive();
    changeTxT.addListener('pointerdown', () => {
        if(chatMode === 1) {
            changeTxT.setFrame(1);
            chatMode = 0;
        } else {
            changeTxT.setFrame(0);
            chatMode = 1;
        }
    }, this);

    // Muestra de mensajes //
    // Lienzo
    var graphics = controller.getCurrentScene().make.graphics().setDepth(2);
    graphics.fillStyle(0xffffff);
    graphics.fillRect(xChat, yChat, wChat, hChat);

    // Fondo del texto
    controller.getCurrentScene().add.image(xChat, yChat, "message").setOrigin(0);

    // Máscara para ocultar
    var mask = new Phaser.Display.Masks.GeometryMask(controller.getCurrentScene(), graphics);

    // Texto contenedor de los mensajes
    messagesOrUsers = controller.getCurrentScene().add.text(xChat + 6, yChat + 130, server.getMessagesFromDB(), {
        fontFamily: 'Consolas',
        color: '#056005',
        wordWrap: { width: 310 }
    }).setOrigin(0);
    messagesOrUsers.setMask(mask);

    // Zona
    var zone = controller.getCurrentScene().add.zone(xChat, yChat, wChat, hChat).setOrigin(0).setInteractive();
    zone.on('pointermove', function (pointer) {
        if (pointer.isDown) {
            messagesOrUsers.y += (pointer.velocity.y / 10);
            messagesOrUsers.y = Phaser.Math.Clamp(messagesOrUsers.y, -300, 400);
        }
    });

    //******************* Conexión al servidor *******************//
    controller.getCurrentScene().add.image(725, 93, "log");
    // Texto //
    textServerConnected = controller.getCurrentScene().add.text(660, 70, "Loading...", {
        fontFamily: 'origins',
        fontSize: 14,
        color: '#056005',
    });

    //******************* Usuario cliente *******************//
    controller.getCurrentScene().add.image(xChat,yChat - ((hChat/4) - 5), "name").setOrigin(0);
    var nameString = "Hola, " + user.getUsername() + ".";
    textUsername = controller.getCurrentScene().add.text(xChat + 12, yChat - hChat / 5, nameString, {
        fontFamily: 'origins',
        fontSize: 20,
        color: '#056005',
    });

    //******************* Usuarios *******************//
    // Texto //
    textNumOfUsersConnected = controller.getCurrentScene().add.text(685, 89, server.getConnectedUsers(), {
        fontFamily: 'origins',
        fontSize: 24,
        color: '#056005',
    });
    // Icono //
    userIc = controller.getCurrentScene().add.image(670, 105, "userIcon").setScale(1.2);
}

/**
 * Función para eliminar la información del usuario
 */
function logOut() {
    user.resertUser();
    /*
    // Usuario auxiliar para actualizar la BD //
    var userToLogOut = {
        username: user.getUsername(),
        password: user.getPassword(),
        status: false,
    }
    updateUser(userToLogOut);

    // Reset de usuario del cliente //
    */
}

/**
 * Función para reestablecer variables
 */
function resetVariables() {
    textUsername = "";
}

/**
 * Función para cargar la siguiente escena
 */
function loadScene() {
    // Llamada a la función de reset de variables
    resetVariables();

    // Acceso a la siguiente escena en función de la ID auxiliar
    switch (id) {
        case 1:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("scenePlayMenu");
            nextScene.scene.start();
            break;
        case 2:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneControlsMenu");
            nextScene.scene.start();
            break;
        case 3:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneSettingsMenu");
            nextScene.scene.start();
            break;
        case 4:
            // Generación de mensaje
            var message = {
                name: "Server",
                message: user.getUsername() + " has disconnected.",
            }
            // Agregar al mensaje al registro del menú "Jugar"
            server.setLogPlayMenu(user.getUsername() + " has disconnected."); 
            // Envío del mensaje
            sendMessage(message);
            
            // Cierre de la sesión
            logOut();
            // Desconexión del servidor
            server.disconnect();

            // Obtención e inicio de la siguiente escena
            controller.getCurrentScene().scene.stop();
            controller.getMusic().stop();
            var nextScene = game.scene.getScene("sceneLoginMenu");
            nextScene.scene.start();
            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneMainMenu;
