//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { game } from '../init.js';
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
// Mensajes //
var messagesFromDB = [];    // Array de almacenamiento de mensajes de la base de datos
var text = "";              // Texto para mostrar los mensajes
//
var cntSrv = "";
var connectionToServer = undefined;
var connectedUsers = 0;

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


        //****************** Música *********************//
        if (controller.getMusicEnabled() === false) {
            controller.getMusic().pause();
        } else {
            controller.getMusic().resume();
        }
    }
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
    controller.getCurrentScene().add.rectangle(xChat, yChat, wChat, hChat, 0xffffff).setOrigin(0);

    // Máscara para ocultar
    var mask = new Phaser.Display.Masks.GeometryMask(controller.getCurrentScene(), graphics);

    // Texto contenedor de los mensajes
    text = controller.getCurrentScene().add.text(xChat + 6, yChat + 130, messagesFromDB, {
        fontFamily: 'Consolas',
        color: '#00ff00',
        wordWrap: { width: 310 }
    }).setOrigin(0);
    text.setMask(mask);

    // Zona
    var zone = controller.getCurrentScene().add.zone(xChat, yChat, wChat, hChat).setOrigin(0).setInteractive();
    zone.on('pointermove', function (pointer) {
        if (pointer.isDown) {
            text.y += (pointer.velocity.y / 10);
            text.y = Phaser.Math.Clamp(text.y, -300, 400);
        }
    });

    //******************* Conexión al servidor ************************//
    cntSrv = controller.getCurrentScene().add.text(100, 100, "Holi", {
        fontFamily: 'Consolas', 
        color: '#00ff00', 
    });

    a(connectionToServer);
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
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneServer");
            nextScene.scene.start();
            break;
    }
}

function a(bool){
    if(bool){
        cntSrv.setText("Servidor Online");
    } else {
        cntSrv.setText("Servidor Offline");
    }

}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneMainMenu;
