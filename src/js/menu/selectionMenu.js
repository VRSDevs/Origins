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
var selectedCat = 0;
var startAnim = 0;

var a;

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
        console.log("sceneSelectionMenu1 load");
        //******************* Variables auxiliares ************************//
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.add.image(400, 320, "selectionPl1");

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

        a = this.add.text(400, 350, "", {
            fontFamily: 'origins',
            fontSize: '20px',
            align: 'center',
            fill: '#000000'
        });
    }
    update(time, delta) {
        //******************* Animaciones botones ************************//
        if (startAnim === true && selectedCat === 1) {
            groundCatButton.anims.play('groundMenuAnim', true);
            a.setText("Tommy\nASD");
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', true);
            a.setText("Michi");
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', true);
            a.setText("Wiskas");
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', true);
            a.setText("Levi");
        } else {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
            a.setText("");
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
function goNextScene() {
    game.scene.stop("sceneSelectionMenu");
    game.scene.start("sceneSelectionMenu2");
}

function loadScene() {
    switch (selectedCat) {
        case 1:
            players[0].setType(1);
            console.log(players[0].getType());
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
            this.scene.start("scenePlayMenu");
            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneSelectionMenu;