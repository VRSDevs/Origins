//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { game } from '../init.js';
import { controller } from '../gameController.js';
import { players } from '../cats.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Botones ************************//
var backButton = undefined;
var groundCatButton = undefined;
var waterCatButton = undefined;
var airCatButton = undefined;
var fireCatButton = undefined;
//******************* Descripciones ************************//
var catDescription = undefined;
//******************* Control ************************//
// Selección de gato //
var selectedCat = 0;
// Animaciones //
var startAnim = 0;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú selección P1           //
//////////////////////////////////////////////////////////////////////
class sceneSelectionMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneSelectionMenu",
            active: false
        });
    }
    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Imágenes ************************//
        // Fondo //
        this.add.image(400, 320, "selectionPl1");
        // Descripciones gatos //
        catDescription = this.add.image(410, 423, "emptyDesc");

        //******************* Botones ************************//
        // Gato tierra //
        groundCatButton = this.add.sprite(518, 268, "GroundCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'groundMenuAnim',
            frames: this.anims.generateFrameNumbers('GroundCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        groundCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 1;
        }, this);
        groundCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        groundCatButton.addListener('pointerdown', loadScene, this);

        // Gato agua //
        waterCatButton = this.add.sprite(133, 268, "WaterCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'waterMenuAnim',
            frames: this.anims.generateFrameNumbers('WaterCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        waterCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 2;
        }, this);
        waterCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        waterCatButton.addListener('pointerdown', loadScene, this);

        // Gato aire //
        airCatButton = this.add.sprite(333, 268, "AirCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'airMenuAnim',
            frames: this.anims.generateFrameNumbers('AirCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        airCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 3;
        }, this);
        airCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        airCatButton.addListener('pointerdown', loadScene, this);

        // Gato fuego //
        fireCatButton = this.add.sprite(697, 268, "FireCatIdle2", 0).setInteractive();
        this.anims.create({
            key: 'fireMenuAnim',
            frames: this.anims.generateFrameNumbers('FireCatIdle2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        fireCatButton.addListener('pointerover', () => {
            startAnim = true;
            selectedCat = 4;
        }, this);
        fireCatButton.addListener('pointerout', () => {
            startAnim = false;
            selectedCat = 0;
        }, this);
        fireCatButton.addListener('pointerdown', loadScene, this);

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 0).setInteractive();
        this.anims.create({
            key: 'backButton2Anim',
            frames: this.anims.generateFrameNumbers('spriteBackButton2', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            backButton.anims.play('backButton2Anim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);
    }
    
    update(time, delta) {
        //******************* Animaciones botones ************************//
        if (startAnim === true && selectedCat === 1) {
            groundCatButton.anims.play('groundMenuAnim', true);
            loadDescription(1);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', true);
            loadDescription(2);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', true);
            loadDescription(3);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', true);
            loadDescription(4);
        } else {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
            loadDescription(0);
        }

        //****************** Música *********************//
        if(controller.getMusicEnabled() === false){
            controller.getMusic().pause();
        } else {
            controller.getMusic().resume();
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
//******************* Carga descripciones de gatos ************************//
function loadDescription(value) {
    switch (value) {
        case 0:
            catDescription.setTexture("emptyDesc");
            break;
        case 1:
            catDescription.setTexture("GroundCatDesc");
            break;
        case 2:
            catDescription.setTexture("WaterCatDesc");
            break;
        case 3:
            catDescription.setTexture("AirCatDesc");
            break;
        case 4:
            catDescription.setTexture("FireCatDesc");
            break;
    }
}

//******************* Ir a la siguiente escena ************************//
function goNextScene() {
    selectedCat = 0;
    controller.getCurrentScene().scene.stop();
    var nextScene = game.scene.getScene("sceneSelectionMenu2");
    nextScene.scene.start();
}

//******************* Carga de escena ************************//
function loadScene() {
    switch (selectedCat) {
        case 1:
            players[0].setType(1);
            goNextScene();
            break;
        case 2:
            players[0].setType(2);
            goNextScene();
            break;
        case 3:
            players[0].setType(3);
            goNextScene();
            break;
        case 4:
            players[0].setType(4);
            goNextScene();
            break;
        default:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("scenePlayMenu");
            nextScene.scene.start();
            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneSelectionMenu;