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
var selectedCat = 0;

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
        switch (aux) {
            case 1:
                // Gato tierra //
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'groundMenuAnim2',
                    frames: this.anims.generateFrameNumbers('GroundCatIdleMatter2', {start: 0, end: 6}),
                    frameRate: 4,
                    repeat: -1
                });
                
                // Gato agua //
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();
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
                airCatButton = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();
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
                fireCatButton = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();
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
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();
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
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'waterMenuAnim2',
                    frames: this.anims.generateFrameNumbers('WaterCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });              

                // Gato aire //
                airCatButton = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();
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
                fireCatButton = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();
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
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();
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
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();
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
                airCatButton = this.add.sprite(530, 305, "AirCatIdleMatter2", 3).setInteractive();
                this.anims.create({
                    key: 'airMenuAnim2',
                    frames: this.anims.generateFrameNumbers('AirCatIdleMatter2', { start: 0, end: 6 }),
                    frameRate: 4,
                    repeat: -1
                });

                // Gato fuego //
                fireCatButton = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();
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
                groundCatButton = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();
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
                waterCatButton = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();
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
                airCatButton = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();
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
                fireCatButton = this.add.sprite(705, 305, "FireCatIdleMatter2", 3).setInteractive();
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
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', true);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', true);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', true);
        } else {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
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