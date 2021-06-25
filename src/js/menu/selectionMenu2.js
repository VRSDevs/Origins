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
//                   Clase de escena de menú selección P2           //
//////////////////////////////////////////////////////////////////////
class sceneSelectionMenu2 extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneSelectionMenu2",
            active: false
        });
    }
    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Dimensiones del canvas ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Imágenes ************************//
        // Fondo //
        this.add.image(400, 320, "selectionPl1");
        // Descripciones gatos //
        catDescription = this.add.image(410, 423, "emptyDesc");

        //******************* Botones ************************//
        switch (players[0].getType()) {
            case 1:
                // Gato tierra //
                groundCatButton = this.add.sprite(518, 268, "GroundCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'groundMenuAnim2',
                    frames: this.anims.generateFrameNumbers('GroundCatIdleMatter2', {start: 0, end: 6}),
                    frameRate: 4,
                    repeat: -1
                });
                
                // Gato agua //
                waterCatButton = this.add.sprite(133, 268, "WaterCatIdle2", 0).setInteractive();
                this.anims.create({
                    key: 'waterMenuAnim2',
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
                    key: 'airMenuAnim2',
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
                    key: 'fireMenuAnim2',
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
                break;
            case 2:
                // Gato tierra //
                groundCatButton = this.add.sprite(518, 268, "GroundCatIdle2", 0).setInteractive();
                this.anims.create({
                    key: 'groundMenuAnim2',
                    frames: this.anims.generateFrameNumbers('GroundCatIdle2', {start: 0, end: 6}),
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
                waterCatButton = this.add.sprite(133, 268, "WaterCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'waterMenuAnim2',
                    frames: this.anims.generateFrameNumbers('WaterCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });              

                // Gato aire //
                airCatButton = this.add.sprite(333, 268, "AirCatIdle2", 0).setInteractive();
                this.anims.create({
                    key: 'airMenuAnim2',
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
                    key: 'fireMenuAnim2',
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
                break;
            case 3:
                // Gato tierra //
                groundCatButton = this.add.sprite(518, 268, "GroundCatIdle2", 0).setInteractive();
                this.anims.create({
                    key: 'groundMenuAnim2',
                    frames: this.anims.generateFrameNumbers('GroundCatIdle2', {start: 0, end: 6}),
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
                    key: 'waterMenuAnim2',
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
                airCatButton = this.add.sprite(333, 268, "AirCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'airMenuAnim2',
                    frames: this.anims.generateFrameNumbers('AirCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });

                // Gato fuego //
                fireCatButton = this.add.sprite(697, 268, "FireCatIdle2", 0).setInteractive();
                this.anims.create({
                    key: 'fireMenuAnim2',
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
                break;
            case 4:
                // Gato tierra //
                groundCatButton = this.add.sprite(518, 268, "GroundCatIdle2", 0).setInteractive();
                this.anims.create({
                    key: 'groundMenuAnim2',
                    frames: this.anims.generateFrameNumbers('GroundCatIdle2', {start: 0, end: 6}),
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
                    key: 'waterMenuAnim2',
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
                    key: 'airMenuAnim2',
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
                fireCatButton = this.add.sprite(697, 268, "FireCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'fireMenuAnim2',
                    frames: this.anims.generateFrameNumbers('FireCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });
                break;
        }

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
            groundCatButton.anims.play('groundMenuAnim2', true);
            loadDescription(1);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', true);
            loadDescription(2);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', true);
            loadDescription(3);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', true);
            loadDescription(4);
        } else {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
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

//******************* Obtención mapa de juego ************************//
function getMap() {
    var max = 4;
    var min = 1;
    var level = Math.floor(Math.random() * (max - min) + min);
    switch (level) {
        case 1:
            controller.getCurrentScene().scene.sleep();
            resetVariables();
            var nextScene = game.scene.getScene("sceneForestLevel");
            nextScene.scene.wake();
            nextScene.scene.restart();
            break;
        case 2:
            controller.getCurrentScene().scene.sleep();
            resetVariables();
            var nextScene = game.scene.getScene("sceneForestLevel");
            nextScene.scene.wake();
            nextScene.scene.restart();
            break;
        case 3:
            controller.getCurrentScene().scene.sleep();
            resetVariables();
            var nextScene = game.scene.getScene("sceneForestLevel");
            nextScene.scene.wake();
            nextScene.scene.restart();
            break;
    }
}

//******************* Carga de escena ************************//
function loadScene() {
    switch (selectedCat) {
        case 1:
            players[1].setType(1);
            getMap();
            break;
        case 2:
            players[1].setType(2);
            getMap();
            break;
        case 3:
            players[1].setType(3);
            getMap();
            break;
        case 4:
            players[1].setType(4);
            getMap();
            break;
        default:
            controller.getCurrentScene().scene.sleep();
            resetVariables();
            var nextScene = game.scene.getScene("sceneSelectionMenu");
            nextScene.scene.wake();
            nextScene.scene.restart();
            break;
    }
}

//******************* Reseteo de variables ************************//
function resetVariables(){
    // Reseteo de animaciones //
    // Botones
    controller.getCurrentScene().anims.remove('groundMenuAnim2');
    controller.getCurrentScene().anims.remove('waterMenuAnim2');
    controller.getCurrentScene().anims.remove('airMenuAnim2');
    controller.getCurrentScene().anims.remove('fireMenuAnim2');

}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneSelectionMenu2;