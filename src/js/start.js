//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { loadedResoruces } from './bootloader.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Vídeo ************************//
var video = undefined;          // Objeto de vídeo
var videoEvent = undefined;     // Evento de vídeo
var videoCompleted = false;     // ¿Se ha reproducido el vídeo?
//******************* Barra de progreso ************************//
var progressBar = undefined;    // Objeto
var scaleX = 0;                 // Escala en eje

//////////////////////////////////////////////////////////////////////
//                   Clase de escena inicial del juego              //
//////////////////////////////////////////////////////////////////////
class sceneStart extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneStart",
            active: true
        });
    }
    preload() {
        //******************** Videos ********************************//
        this.load.video('startAnim', './resources/gif/Intro.mp4', 'loadeddata', false, true);
    }

    create() {
        //******************* Dimensiones del canvas ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Video ************************//
        video = this.add.video(width/2, height/2, "startAnim");
        video.play();
        videoEvent = this.time.delayedCall(video.getDuration() * 1000, () => {
            videoCompleted = true;
        }, [], this);

        //******************* Barra de progreso ************************//
        progressBar = this.add.rectangle(60, height - 90, 680, 20, 0x52a4b3);
        progressBar.setOrigin(0, 0.5);
    }

    update(time, delta) {
        //******************* Barra de progreso ************************//
        scaleX = videoEvent.getProgress();
        progressBar.setScale(scaleX, 1);

        //******************* Inicio del juego ************************//
        if(videoCompleted && loadedResoruces) {
            this.scene.sleep();
            videoCompleted = false;
            this.scene.start("sceneLoginMenu");
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneStart;