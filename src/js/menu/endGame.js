//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { players } from '../cats.js';
import { game } from '../init.js';

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

        //******************* Fondo ************************//
/*    
        bg = this.add.sprite(width/2, height/2, "bgVictory_Fire",0);
        this.anims.create({
            key: 'bgVictoryAnim',
            frames: this.anims.generateFrameNumbers('bgVictory_Fire', {start: 0, end: 14}),
            frameRate: 12,
            repeat: 0
        });
        bg.anims.play('bgVictoryAnim');
*/

        //******************* Ganador ************************//
        switch (2) {
            case players[0].getRoundsWon():
                // Personaje //
                var textureID = "";
                switch (players[0].getType()) {
                    case 1:
                        textureID = "GroundCatIdle3";
                        if(textureID == "GroundCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Ground",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Ground', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                    case 2:
                        textureID = "WaterCatIdle3";
                        if(textureID == "WaterCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Water",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Water', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                    case 3:
                        textureID = "AirCatIdle3";
                        if(textureID == "AirCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Air",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Air', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                    case 4:
                        textureID = "FireCatIdle3";
                        if(textureID == "FireCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Fire",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Fire', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                }
                victoryPlayer = this.add.sprite(width/2, height/2, textureID,0);
                this.anims.create({
                    key: 'victoryPlayerAnim',
                    frames: this.anims.generateFrameNumbers(textureID, {start: 0, end: 5}),
                    frameRate: 4,
                    repeat: -1
                });
                victoryPlayer.anims.play("victoryPlayerAnim");

                // Texto //
                victoryText = this.add.text(width/2 - 135, -20, "Player 1 won!", {
                    fontFamily: 'origins',
                    fontSize: '40px',
                    fill: '#3380ff'
                });
                this.tweens.add({
                    targets: victoryText,
                    y: height/6,
                    duration: 2000,
                    ease: 'Power2',
                    yoyo: false,
                });
                break;
            case players[1].getRoundsWon():
                // Personaje //
                var textureID = "";
                switch (players[1].getType()) {
                    case 1:
                        textureID = "GroundCatIdle3";
                        if(textureID == "GroundCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Ground",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Ground', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                    case 2:
                        textureID = "WaterCatIdle3";
                        if(textureID == "WaterCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Water",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Water', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                    case 3:
                        textureID = "AirCatIdle3";
                        if(textureID == "AirCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Air",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Air', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                    case 4:
                        textureID = "FireCatIdle3";
                        if(textureID == "FireCatIdle3"){
                            bg = this.add.sprite(width/2, height/2, "bgVictory_Fire",0);
                            this.anims.create({
                                key: 'bgVictoryAnim',
                                frames: this.anims.generateFrameNumbers('bgVictory_Fire', {start: 0, end: 14}),
                                frameRate: 12,
                                repeat: 0
                            });
                            bg.anims.play('bgVictoryAnim');
                        }
                        break;
                }
                victoryPlayer = this.add.sprite(width/2, height/2, textureID,0);
                this.anims.create({
                    key: 'victoryPlayerAnim',
                    frames: this.anims.generateFrameNumbers(textureID, {start: 0, end: 5}),
                    frameRate: 4,
                    repeat: -1
                });

                victoryPlayer.anims.play("victoryPlayerAnim");

                // Texto //
                victoryText = this.add.text(width/2 - 135, -20, "Player 2 won!", {
                    fontFamily: 'origins',
                    fontSize: '40px',
                    fill: '#3380ff'
                });
                this.tweens.add({
                    targets: victoryText,
                    y: height/6,
                    duration: 2000,
                    ease: 'Power2',
                    yoyo: false,
                });
                break;
        }

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
            players.forEach(cat => {
                cat = cat.reset(true);
            });
            controller.getCurrentScene().scene.sleep();
            var nextScene = game.scene.getScene("sceneMainMenu");
            resetVariables();
            controller.setStopUpdateLevel(false);
            controller.getMusic().stop();
            controller.setMusic(undefined);
            controller.setMusic(this.sound.add("music"));
            controller.getMusic().play();
            nextScene.scene.wake();
            nextScene.scene.restart();
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
            players.forEach(cat => {
                cat.reset(false);
            });
            controller.getCurrentScene().scene.sleep();
            var nextScene = game.scene.getScene(level.scene.key);
            resetVariables();
            controller.setStopUpdateLevel(false);
            nextScene.scene.wake();
            nextScene.scene.restart();
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
//******************* Animación de botones ************************//
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

//******************* Reseteo de variables ************************//
function resetVariables(){
    // Reseteo de animaciones //
    controller.getCurrentScene().anims.remove('victoryPlayerAnim');
    controller.getCurrentScene().anims.remove('bgVictoryAnim');

}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneEndGame;