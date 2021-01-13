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
// Botón //
var syncButton = undefined;
// Imágenes //
var userIc = undefined;
// Texto //
var textServerConnected = "";
var textNumOfUsersConnected = "";
var messages = "";
//******************* Control ************************//
// Selección de submenú //
var id = 0;
// Llamada al evento de obtención de usuarios //
var callServerEvent = true;

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
            // Generación de evento retardado para llamadas al servidor //
            if(callServerEvent){
                controller.getCurrentScene().time.addEvent({
                    delay: 1200,
                    callback: () => {
                        loadMessagesFromDB();
                        getConnectedUsers();
                    },
                    callbackScope: this,
                    loop: true
                });
                callServerEvent = false;
            }
            // Actualización mensajes //
            messages.setText(server.getMessagesFromDB());
            // Actualización estado del servidor //
            textServerConnected.setStyle({
                color: '#00ff00',
            });
            textServerConnected.setText("Server Online");
            // Actualización usuarios conectados //
            userIc.setTint(0x00ff00);
            textNumOfUsersConnected.setStyle({
                color: '#00ff00',
            });
            textNumOfUsersConnected.setText(server.getConnectedUsers());
        } else {
            // Eliminación de eventos de llamada al servidor //
            if(!callServerEvent){
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
                callServerEvent = true;
            }
            // Actualización del estado del servidor //
            textServerConnected.setStyle({
                color: '#ff0000',
            });
            textServerConnected.setText("Server Offline");
            // Actualización 
            userIc.setTint(0xff0000);
            textNumOfUsersConnected.setStyle({
                color: '#ff0000',
            });
            textNumOfUsersConnected.setText("0");
            server.setMessagesFromDB(["<Servidor> ERROR"]);
            messages.setText(server.getMessagesFromDB());
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
//                          Funciones HTTP                          //
//////////////////////////////////////////////////////////////////////
//******************* Usuarios ************************//
// Usuarios conectados al servidor //
function getConnectedUsers() {
    $.ajax({
        url: 'http://localhost:8080/users/connectedUsers'
    }).done(function (listOfConnectedUsers){
        server.setConnectedUsers(listOfConnectedUsers.length);
    })
}

// Inicio de sesión del jugador //
function updateUser(user) {
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/users/' + user.username,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
    })
}

//******************* Mensajes ************************//
// Carga de mensajes de la base de datos y servidor //
function loadMessagesFromDB() {
    $.ajax({
        url: 'http://localhost:8080/messages'
    }).done(function (messages) {
        var arrayOfMessages = [];
        for (let i = 0; i < messages.length; i++) {
            arrayOfMessages[i] = "<" + messages[i].username + "> " + messages[i].body;
        }
        server.setMessagesFromDB(arrayOfMessages);
    })
}

// Envío de mensaje al servidor y a la BD //
function postMessage(message) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/messages',
        data: JSON.stringify(message),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        console.log("Item created: " + JSON.stringify(item));
    })
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Creación de interfaz de servidor ************************//
function createServerUI() {
    //******************* Mensajes ************************//
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
                    username: user.getUsername(),
                    body: elementHTML.value,
                }

                // Envío del mensaje al servidor y a la BD
                postMessage(message);

                // Limpieza del campo de texto
                elementHTML.value = '';

            } else {
                console.log("No hay escrito ningún mensaje!")
            }
        }
    });

    // Muestra de mensajes //
    // Variables auxiliares
    var xChat = 19;
    var yChat = 340;
    var wChat = 320;
    var hChat = 256;

    // Lienzo
    var graphics = controller.getCurrentScene().make.graphics().setDepth(2);
    graphics.fillStyle(0xffffff);
    graphics.fillRect(xChat, yChat, wChat, hChat);

    // Fondo del texto
    controller.getCurrentScene().add.rectangle(xChat, yChat, wChat, hChat, 0x000000, 0.4).setOrigin(0);

    // Máscara para ocultar
    var mask = new Phaser.Display.Masks.GeometryMask(controller.getCurrentScene(), graphics);

    // Texto contenedor de los mensajes
    messages = controller.getCurrentScene().add.text(xChat + 6, yChat + 130, server.getMessagesFromDB(), {
        fontFamily: 'Consolas',
        color: '#00ff00',
        wordWrap: { width: 310 }
    }).setOrigin(0);
    messages.setMask(mask);

    // Zona
    var zone = controller.getCurrentScene().add.zone(xChat, yChat, wChat, hChat).setOrigin(0).setInteractive();
    zone.on('pointermove', function (pointer) {
        if (pointer.isDown) {
            messages.y += (pointer.velocity.y / 10);
            messages.y = Phaser.Math.Clamp(messages.y, -300, 400);
        }
    });

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

//
function logOut() {
    //
    var userToLogOut = {
        username: user.getUsername(),
        password: user.getPassword(),
        status: false,
    }

    user.resertUser();

    updateUser(userToLogOut);
}

//******************* Carga de escena ************************//
function loadScene() {
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
            logOut();
            controller.getCurrentScene().scene.stop();
            controller.getMusic().pause();
            var nextScene = game.scene.getScene("sceneLoginMenu");
            nextScene.scene.start();
            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneMainMenu;
