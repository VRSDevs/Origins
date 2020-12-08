//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import bootloader from './bootloader.js';
import sceneMainMenu from './menu/mainMenu.js';
import scenePlayMenu from './menu/playMenu.js';
import sceneSettingsMenu from './menu/settingsMenu.js';
import sceneControlsMenu from './menu/controlsMenu.js';
import sceneSelectionMenu from './menu/selectionMenu.js';
import sceneSelectionMenu2 from './menu/selectionMenu2.js';
import sceneForestLevel from './maps/levelForest.js';
import sceneCaveLevel from './maps/levelCave.js';
import sceneLabLevel from './maps/levelLab.js';
import {controller} from './gameController.js';

//////////////////////////////////////////////////////////////////////
//                      Configuración del juego                     //
//////////////////////////////////////////////////////////////////////
const config = {
    width: 800,                 // Tamaño lienzo (px.)
    height: 640,
    parent: "container",        // Contenedor
    type: Phaser.AUTO,          // Tipo - AUTO hace que Phaser detecte por sí solo si el navegador puede correr WebGL o Canvas
    pixelArt: true,         
    physics: {                  // Físicas
        default : "arcade"
    },
    scene: [                    // Lista de escenas
        bootloader, sceneMainMenu, scenePlayMenu, sceneControlsMenu,
        sceneSettingsMenu, sceneSelectionMenu, sceneSelectionMenu2,
        sceneForestLevel, sceneCaveLevel, sceneLabLevel
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