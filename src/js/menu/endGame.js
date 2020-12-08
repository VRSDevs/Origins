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
//******************* Texto ************************//
var victoryText = "";
//******************* Efectos ************************//
// Fade in //
var layer = undefined;
var fadeInEvent = undefined;

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
        //******************* Dimensiones del canvas ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Fondo ************************//
        bg = this.add.sprite(width/2, height/2, "bgVictory",0);
        this.anims.create({
            key: 'bgVictoryAnim',
            frames: this.anims.generateFrameNumbers('bgVictory', {start: 0, end: 2}),
            frameRate: 10,
            repeat: 0
        });
        bg.anims.play('bgVictoryAnim');

        //******************* Personaje victorioso ************************//
        switch (2) {
            case players[0].getRoundsWon():
                victoryPlayer = this.add.sprite(width/2, height/2, "WaterCatIdle3",0);
                this.anims.create({
                    key: 'victoryPlayerAnim',
                    frames: this.anims.generateFrameNumbers('WaterCatIdle3', {start: 0, end: 5}),
                    frameRate: 6,
                    repeat: -1
                });
                victoryPlayer.anims.play("victoryPlayerAnim");
                break;
            case players[1].getRoundsWon():
                victoryPlayer = this.add.sprite(width/2, height/2, "AirCatIdle3",0);
                this.anims.create({
                    key: 'victoryPlayerAnim',
                    frames: this.anims.generateFrameNumbers('AirCatIdle3', {start: 0, end: 5}),
                    frameRate: 4,
                    repeat: -1
                });
                victoryPlayer.anims.play("victoryPlayerAnim");
                break;
        }

        //******************* Texto ************************//
        victoryText = this.add.text(width/2 - 135, height/6, "Player 1 won!", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#3380ff'
        });

        //******************* Música del nivel ************************//
        controller.getMusic().stop();
        controller.setMusic(undefined);

        //******************* Efectos ************************//
        // Fade in //
        layer = this.add.rectangle(width/2, height/2, 800, 640, 0x000000, 1);
        console.log(layer.alpha)
        fadeInEvent = this.time.delayedCall(0, fadeIn, [], this);
    }


    update(time,delta){

    }
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Animación fadeIn ************************//
function fadeIn(){
    while(layer.alpha !== 0) {
        layer.setAlpha(layer.alpha - 0.0001);
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneEndGame;