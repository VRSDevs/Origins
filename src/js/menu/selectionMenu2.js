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
//******************* Textos ************************//
// Descripción de los gatos //
var description = "";
var ADescription = "";
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

        //******************* Fondos ************************//
        this.add.image(400, 320, "selectionPl2");

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

        //******************* Texto ************************//
        // Descripción normal //
        description = this.add.text(115, 334, "", {
            fontFamily: 'origins',
            fontSize: '16px',
            align: 'center',
            fill: '#000000'
        });

        // Descripción alienígena //
        ADescription = this.add.text(90, 430, "", {
            fontFamily: 'alien',
            fontSize: '16px',
            align: 'center',
            fill: '#000000'
        });
    }
    update(time, delta) {
        //******************* Animaciones botones ************************//
        if (startAnim === true && selectedCat === 1) {
            groundCatButton.anims.play('groundMenuAnim2', true);
            description.setText(""+"\nHe's the Ground Cat. His breed is very jealous, \nand he feels  that his powers are a bull shit. They \nare the original human. He have weakness for videogames.");
            ADescription.setText("he's the ground cat. his breed is very jealous, \nand he feels  that his powers are a bull shit. they \nare the original human. he have weakness for videogames.");
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', true);
            description.setText(""+"\nHe's the Water Cat. His breed is very peacefull, \nso they hate the war. He lives in a wet enviroment and he loves \nbubbles. He hates fish (he is vegan).");
            ADescription.setText("he's the water cat. his breed is very peacefull, \nso they hate the war. he lives in a wet enviroment and\n he loves bubbles. he hates fish (he is vegan).");
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', true);
            description.setText(""+"\nShe's the Air Cat. Her breed its like the group's \nmother, very serious and she will do the impossible to get the \ndark matter. Her greatest weakness is fluffys clouds.");
            ADescription.setText("she's the air cat. her breed its like the group's mother, \nvery serious and she will do the impossible to get the \ndark matter. her greatest weakness is fluffys clouds.");
            fireCatButton.anims.play('fireMenuAnim2', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', true);
            description.setText(""+"\nHe's the Fire Cat. His breed is really aggresive. \nHe is always doing his own thing, but if u give him a reason to \nfight, he will ignite. He love the scorched galactic tuna.");
            ADescription.setText("he's the Fire Cat. his breed is really aggresive. he is al-\nways doing his own thing, but if u give him a reason to \nfight, he will ignite. he love the scorched galactic tuna.");
        } else {
            groundCatButton.anims.play('groundMenuAnim2', false);
            waterCatButton.anims.play('waterMenuAnim2', false);
            airCatButton.anims.play('airMenuAnim2', false);
            fireCatButton.anims.play('fireMenuAnim2', false);
            description.setText("");
            ADescription.setText("");
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