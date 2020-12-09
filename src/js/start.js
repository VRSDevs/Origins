//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import {loadedResoruces} from './bootloader.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Vídeo ************************//
var video = undefined;
var videoEvent = undefined;
var videoCompleted = false;
//******************* Gráficos ************************//
var graphics = undefined;

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
        graphics = this.add.graphics({ x: width, y: height});
    }

    update(time, delta) {
        //******************* Barra de progreso ************************//
        graphics.fillStyle("#FF0000", 1);
        graphics.fillRect(50 , height - 50, 500 * videoEvent.getProgress(), 8);

        //******************* Inicio del juego ************************//
        if(videoCompleted && loadedResoruces) {
            this.scene.sleep();
            videoCompleted = false;
            this.scene.start("sceneMainMenu");
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneStart;