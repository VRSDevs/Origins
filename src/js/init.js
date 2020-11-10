//////////////////////////////////////////////////////////////////////
//                 Clase para inicializar el juego                  //
//////////////////////////////////////////////////////////////////////

import bootloader from './bootloader.js';
import sceneMainMenu from './menu/mainMenu.js';
import scenePlayMenu from './menu/playMenu.js';
import sceneSettingsMenu from './menu/settingsMenu.js';
import sceneControlsMenu from './menu/controlsMenu.js';

import sceneForestLevel from './maps/levelForest.js';
//import gameController from './gameController.js';

import sceneForestLevel from './maps/levelForest.js'


const config = {
    width: 800,             // Tamaño en píxeles
    height: 640,
    parent: "container",    // Contenedor
    type: Phaser.AUTO,      // Tipo - AUTO hace que Phaser detecte por sí solo si el navegador puede correr WebGL o Canvas
    pixelArt: true,
    physics: {
        default : "arcade"
    },
    scene: [
        bootloader, sceneMainMenu, scenePlayMenu, sceneControlsMenu,
        sceneSettingsMenu, sceneForestLevel
    ]
};

// INICIALIZACIÓN JUEGO //
var game = new Phaser.Game(config);

