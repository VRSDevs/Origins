//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { players } from '../cats.js';
import { game } from '../init.js';
import { server } from '../server/server.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Fondo ************************//
var bg = undefined;
//******************* Ganador ************************//
var victoryPlayer = undefined;
//******************* Botones ************************//
var buttonsAnim = undefined;
var mainMenuButton = undefined;
var restartButton = undefined;
//******************* Texto ************************//
var victoryText = "";
//******************* Control ************************//
// Cambio de escena //
var level = undefined;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena del fin del juego              //
//////////////////////////////////////////////////////////////////////
class sceneEndGame extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneEndGame",
            active: false
        });
    }
    create(){
        //******************* Asignación escena ************************//
        level = controller.getCurrentScene();       
        controller.setCurrentScene(this);

        //******************* Dimensiones del canvas ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Ganador ************************//
        // Inicialización de la ID de la textura
        var textureID = "";

        // Ejecución en función del tipo del gato ganador
        switch (players[controller.getWinnerCat()].getType()) {
            // Tipo de tierra
            case 1:
                // Asignación de la ID de textura
                textureID = "GroundCatIdle3";

                // Generación del fondo
                bg = this.add.sprite(width/2, height/2, "bgVictory_Ground",0);
                this.anims.create({
                    key: 'bgVictoryAnim',
                    frames: this.anims.generateFrameNumbers('bgVictory_Ground', {start: 0, end: 14}),
                    frameRate: 12,
                    repeat: 0
                });
                // Animación del fondo
                bg.anims.play('bgVictoryAnim');

                // Generación del texto de victoria
                victoryText = this.add.text(width/2  - 100, -20, players[controller.getWinnerCat()].getName() + "\nwon!", {
                    fontFamily: 'origins',
                    fontSize: '40px',
                    align: 'center',
                    fill: '#008f39'
                });
                break;
            // Tipo de agua
            case 2:
                // Asignación de la ID de textura
                textureID = "WaterCatIdle3";

                // Generación del fondo
                bg = this.add.sprite(width/2, height/2, "bgVictory_Water",0);
                this.anims.create({
                    key: 'bgVictoryAnim',
                    frames: this.anims.generateFrameNumbers('bgVictory_Water', {start: 0, end: 14}),
                    frameRate: 12,
                    repeat: 0
                });
                // Animación del fondo
                bg.anims.play('bgVictoryAnim');

                // Generación del texto de victoria

                victoryText = this.add.text(width/2  - 100, -20, players[controller.getWinnerCat()].getName() + "\nwon!", {
                    fontFamily: 'origins',
                    fontSize: '40px',
                    align: 'center',
                    fill: '#0000ff'
                });
                break;
            // Tipo de aire
            case 3:
                // Asignación de la ID de textura
                textureID = "AirCatIdle3";

                // Generación del fondo
                bg = this.add.sprite(width/2, height/2, "bgVictory_Air",0);
                this.anims.create({
                    key: 'bgVictoryAnim',
                    frames: this.anims.generateFrameNumbers('bgVictory_Air', {start: 0, end: 14}),
                    frameRate: 12,
                    repeat: 0
                });
                // Animación del fondo
                bg.anims.play('bgVictoryAnim');

                // Generación del texto de victoria
                victoryText = this.add.text(width/2  - 100, -20, players[controller.getWinnerCat()].getName() + "\nwon!", {
                    fontFamily: 'origins',
                    fontSize: '40px',
                    align: 'center',
                    fill: '#81CECF'
                });
                break;
            // Tipo de fuego
            case 4:
                // Asignación de la ID de textura
                textureID = "FireCatIdle3";

                // Generación del fondo
                bg = this.add.sprite(width/2, height/2, "bgVictory_Fire",0);
                this.anims.create({
                    key: 'bgVictoryAnim',
                    frames: this.anims.generateFrameNumbers('bgVictory_Fire', {start: 0, end: 14}),
                    frameRate: 12,
                    repeat: 0
                });
                // Animación del fondo
                bg.anims.play('bgVictoryAnim');

                // Generación del texto de victoria
                victoryText = this.add.text(width/2 - 100, -20, players[controller.getWinnerCat()].getName() + "\nwon!", {
                    fontFamily: 'origins',
                    fontSize: '40px',
                    align: 'center',
                    fill: '#FF0000'
                });
                break;
        }

        // Generación sprite jugador en función de la textura
        victoryPlayer = this.add.sprite(width/2, height/2, textureID, 0);
        this.anims.create({
            key: 'victoryPlayerAnim',
            frames: this.anims.generateFrameNumbers(textureID, {start: 0, end: 5}),
            frameRate: 4,
            repeat: -1
        });
        // Reproducción animación del sprite
        victoryPlayer.anims.play("victoryPlayerAnim");

        // Animación del texto de victoria
        this.tweens.add({
            targets: victoryText,
            y: height/6,
            duration: 2000,
            ease: 'Power2',
            yoyo: false,
        });

        //******************* Botones ************************//
        // Menú principal//
        mainMenuButton = this.add.sprite(-301/2, 525, "spriteMainMenu", 0).setInteractive();
        this.anims.create({
            key: 'mainMenuButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteMainMenu', {start: 1, end: 8}),
            frameRate: 6,
            repeat: 0
        });

        mainMenuButton.addListener('pointerover', () => {
            mainMenuButton.anims.play('mainMenuButtonAnim',true);
        }, this);
        mainMenuButton.addListener('pointerout', () => {
            mainMenuButton.anims.stop();
            mainMenuButton.setFrame(0);
        }, this);
        mainMenuButton.addListener('pointerdown', () => {
            // Si el modo de juego es el ONLINE
            if(controller.getGameMode() === 3) {
                // Desconexión de la sala y de la partida
                server.disconnectFromRoomAndMatch();
            }

            // Reset variables
            

            // Parada y obtención de la siguiente escena
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("sceneMainMenu");
            nextScene.scene.start();
        }, this);

        // Reinicio de partida //
        restartButton = this.add.sprite(width + 301/2, 525, "spriteRestart", 0).setInteractive();
        this.anims.create({
            key: 'spriteRestartAnim',
            frames: this.anims.generateFrameNumbers('spriteRestart', {start: 1, end: 7}),
            frameRate: 6,
            repeat: 0
        });

        restartButton.addListener('pointerover', () => {
            restartButton.anims.play('spriteRestartAnim',true);
        }, this);
        restartButton.addListener('pointerout', () => {
            restartButton.anims.stop();
            restartButton.setFrame(0);
        }, this);
        restartButton.addListener('pointerdown', () => {
            // Reset variables
            resetVariables("restart");

            if(controller.getGameMode() === 2) {
                // Actualización del bloqueo de UPDATE de escenas
                controller.setStopUpdateLevel(false);

                // Parada e inicio de la siguiente escena
                controller.getCurrentScene().scene.stop();
                var nextScene = game.scene.getScene(level.scene.key);
                nextScene.scene.start();
            } else {
                // Actualización del bloqueo de UPDATE de escenas
                controller.setStopUpdateLevel(false);

                // Parada e inicio de la siguiente escena
                controller.getCurrentScene().scene.stop();
                var nextScene = game.scene.getScene("sceneGroundRoom");
                nextScene.scene.start();
            }
        }, this);

        // Animación de botones //
        buttonsAnim = this.time.delayedCall(4000, buttonsAnimation, [], this);

        //******************* Música del nivel ************************//
        controller.getMusic().stop();
        controller.setMusic(undefined);
        controller.setMusic(this.sound.add("musicVictory"));
        controller.getMusic().play();
        if(controller.getMusicEnabled() === false){
            controller.getMusic().stop();
        }

        //******************* Efectos ************************//
        // Fade in //
        this.cameras.main.fadeIn(5000);
    }
    update(time,delta){
    }
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
/**
 * Función para ejecutar la animación de los botones
 */
function buttonsAnimation(){
    this.tweens.add({
        targets: mainMenuButton,
        x: 301/2,
        duration: 2000,
        ease: 'Power2',
        yoyo: false,
    });
    this.tweens.add({
        targets: restartButton,
        x: width - 301/2,
        duration: 2000,
        ease: 'Power2',
        yoyo: false,
    });
}

/**
 * Función para resetear variables de escena y de la partida
 * @param {String} key Clave para aplicar un tipo de reset u otro
 */
function resetVariables(key){
    switch (key) {
        case "mainmenu":
            // Variables del jugador //
            // Si el modo de juego es el LOCAL
            if(controller.getGameMode() === 2) {
                players.forEach(cat => {
                    cat.reset(true);
                });
            }

            // Variables del controlador de juego //
            controller.setGameMode(0);
            controller.setStopUpdateLevel(false);
            controller.getMusic().stop();
            controller.setMusic(undefined);
            controller.setMusic(controller.getCurrentScene().sound.add("music"));
            controller.getMusic().play(); 
            
            break;
        case "restart":
            // Variables del jugador //
            players.forEach(cat => {
                cat.reset(false);
            });

            break;
    }

    // Reseteo de animaciones //
    controller.getCurrentScene().anims.remove('victoryPlayerAnim');
    controller.getCurrentScene().anims.remove('bgVictoryAnim');
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneEndGame;