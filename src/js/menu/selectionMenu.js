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
//******************* Textos ************************//
var description;
var ADescription;
//******************* Control ************************//
var selectedCat = 0;
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

        //******************* Texto ************************//
        // Normal //
        description = this.add.text(115, 334, "", {
            fontFamily: 'origins',
            fontSize: '16px',
            align: 'center',
            fill: '#000000'
        });

        // Alienígena //
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
            groundCatButton.anims.play('groundMenuAnim', true);
            description.setText(""+"\nHe's the Ground Cat. His breed is very jealous, \nand he feels  that his powers are a bull shit. They \nare the original human. He have weakness for videogames.");
            ADescription.setText("he's the ground cat. his breed is very jealous, \nand he feels  that his powers are a bull shit. they \nare the original human. he have weakness for videogames.");
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 2) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', true);
            description.setText(""+"\nHe's the Water Cat. His breed is very peacefull, \nso they hate the war. He lives in a wet enviroment and he loves \nbubbles. He hates fish (he is vegan).");
            ADescription.setText("he's the water cat. his breed is very peacefull, \nso they hate the war. he lives in a wet enviroment and\n he loves bubbles. he hates fish (he is vegan).");
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 3) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', true);
            description.setText(""+"\nShe's the Air Cat. Her breed its like the group's \nmother, very serious and she will do the impossible to get the \ndark matter. Her greatest weakness is fluffys clouds.");
            ADescription.setText("she's the air cat. her breed its like the group's mother, \nvery serious and she will do the impossible to get the \ndark matter. her greatest weakness is fluffys clouds.");
            fireCatButton.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && selectedCat === 4) {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', true);
            description.setText(""+"\nHe's the Fire Cat. His breed is really aggresive. \nHe is always doing his own thing, but if u give him a reason to \nfight, he will ignite. He love the scorched galactic tuna.");
            ADescription.setText("he's the Fire Cat. his breed is really aggresive. he is al-\nways doing his own thing, but if u give him a reason to \nfight, he will ignite. he love the scorched galactic tuna.");
        } else {
            groundCatButton.anims.play('groundMenuAnim', false);
            waterCatButton.anims.play('waterMenuAnim', false);
            airCatButton.anims.play('airMenuAnim', false);
            fireCatButton.anims.play('fireMenuAnim', false);
            description.setText("");
            ADescription.setText("");
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                          Funciones extra                         //
//////////////////////////////////////////////////////////////////////
function goNextScene() {
    selectedCat = 0;
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