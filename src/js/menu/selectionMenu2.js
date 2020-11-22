//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { game } from '../init.js';
import { controller } from '../gameController.js';
import { players } from '../cats.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Botones ************************//
var backButton;
var groundCatButton;
var waterCatButton;
var airCatButton;
var fireCatButton;
//******************* Control ************************//
var startAnim;
var selectedCat;

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
        //******************* Variables auxiliares ************************//
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;
        var aux = players[0].getType();

        //******************* Fondos ************************//
        this.add.image(400, 320, "selectionPl2");
        
        //******************* Botones ************************//
        switch(aux){
            case 1:
                // Gato tierra //
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdleMatter2", 0).setInteractive();

                this.anims.create({
                    key: 'groundMenuAnim',
                    frames: this.anims.generateFrameNumbers('GroundCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });

                groundCatButton.addListener('pointerover', () => {
                    startAnim = true;
                }, this);
                groundCatButton.addListener('pointerout', () => {
                    startAnim = false;
                }, this);
                groundCatButton.addListener('pointerdown', loadScene, this);

                // Gato agua //
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();

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
                airCatButton = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();

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
                fireCatButton = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();

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
                break;
            case 2:
                // Gato tierra //
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();

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
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdleMatter2", 0).setInteractive();

                this.anims.create({
                    key: 'waterMenuAnim',
                    frames: this.anims.generateFrameNumbers('WaterCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });

                waterCatButton.addListener('pointerover', () => {
                    startAnim = true;
                }, this);
                waterCatButton.addListener('pointerout', () => {
                    startAnim = false;
                }, this);
                waterCatButton.addListener('pointerdown', loadScene, this);

                // Gato aire //
                airCatButton = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();

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
                fireCatButton = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();

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
                break;
            case 3: 
                // Gato tierra //
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();

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
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();

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
                airCatButton = this.add.sprite(530, 305, "AirCatIdleMatter2", 0).setInteractive();

                this.anims.create({
                    key: 'airMenuAnim',
                    frames: this.anims.generateFrameNumbers('AirCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });

                airCatButton.addListener('pointerover', () => {
                    startAnim = true;
                }, this);
                airCatButton.addListener('pointerout', () => {
                    startAnim = false;
                }, this);
                airCatButton.addListener('pointerdown', loadScene, this);

                // Gato fuego //
                fireCatButton = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();

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
                break;
            case 4:
                // Gato tierra //
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();

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
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();

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
                airCatButton = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();

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
                fireCatButton = this.add.sprite(705, 305, "FireCatIdleMatter2", 0).setInteractive();

                this.anims.create({
                    key: 'fireMenuAnim',
                    frames: this.anims.generateFrameNumbers('FireCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });

                fireCatButton.addListener('pointerover', () => {
                    startAnim = true;
                }, this);
                fireCatButton.addListener('pointerout', () => {
                    startAnim = false;
                }, this);
                fireCatButton.addListener('pointerdown', loadScene, this);
                break;
            default:
                console.log('Ups');
                break;
        }

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 1).setInteractive();
        backButton.addListener('pointerover', () => {
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.setFrame(1);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);
    }
    update(time, delta) {
        //******************* Animaciones botones ************************//
        if (startAnim === true && selectedCat === 1) {
            groundCatButton.anims.play('groundMenuAnim', true);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', true);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', true);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', true);
        } else {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
function getMap() {
    var max = 4;
    var min = 1;
    var level = Math.floor(Math.random() * (max - min) + min);
    switch (level) {
        case 1:
            console.log(this)
            game.scene.start("sceneForestLevel");
            break;
        case 2:
            game.scene.start("sceneForestLevel");
            break;
        case 3:
            game.scene.start("sceneForestLevel");
            break;
        default:
            console.log("Ups.")
            break;
    }
}

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
            this.scene.start("sceneMainMenu");
            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneSelectionMenu2;