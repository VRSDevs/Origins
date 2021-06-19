//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import bootloader from './bootloader.js';
import sceneStart from './start.js';
import sceneLoginMenu from './menu/loginMenu.js';
import sceneMainMenu from './menu/mainMenu.js';
import scenePlayMenu from './menu/playMenu.js';
import sceneSettingsMenu from './menu/settingsMenu.js';
import sceneControlsMenu from './menu/controlsMenu.js';
import sceneRoomSelectMenu from './menu/online/roomSelectMenu.js';
import sceneSelectionMenu from './menu/selectionMenu.js';
import sceneSelectionMenu2 from './menu/selectionMenu2.js';
import sceneOnlineSelectionMenu from './menu/online/onlineSelectionMenu.js';
import sceneForestLevel from './maps/levelForest.js';
import sceneCaveLevel from './maps/levelCave.js';
import sceneLabLevel from './maps/levelLab.js';
import sceneEndGame from './menu/endGame.js';
import sceneGroundRoom from './menu/online/groundRoom.js'
import sceneAirRoom from './menu/online/airRoom.js';
import {controller} from './gameController.js';


//////////////////////////////////////////////////////////////////////
//                      Configuración del juego                     //
//////////////////////////////////////////////////////////////////////
const config = {
    width: 800,                 // Tamaño lienzo (px.)
    height: 640,
    parent: "container",            // Contenedor
    type: Phaser.AUTO,          // Tipo - AUTO hace que Phaser detecte por sí solo si el navegador puede correr WebGL o Canvas
    pixelArt: true,
    dom: {
        createContainer: true
    },     
    physics: {                  // Físicas
        default : "arcade"
    },
    scene: [                    // Lista de escenas
        bootloader, sceneStart, sceneLoginMenu, sceneMainMenu, scenePlayMenu, sceneControlsMenu,
        sceneSettingsMenu, sceneRoomSelectMenu, sceneSelectionMenu, sceneSelectionMenu2, sceneOnlineSelectionMenu,
        sceneForestLevel, sceneCaveLevel, sceneGroundRoom, sceneAirRoom, sceneEndGame
    ]
};

//////////////////////////////////////////////////////////////////////
//                      Inicialización del juego                    //
//////////////////////////////////////////////////////////////////////
var game = new Phaser.Game(config);

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export {game};