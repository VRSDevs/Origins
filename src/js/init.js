"use strict";
//////////////////////////////////////////////////////////////////////
//                 Clase para inicializar el juego                  //
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
        sceneSettingsMenu, sceneSelectionMenu, sceneSelectionMenu2,
        sceneForestLevel, sceneCaveLevel, sceneLabLevel
    ]
};

// INICIALIZACIÓN JUEGO //
var game = new Phaser.Game(config);

export {game};