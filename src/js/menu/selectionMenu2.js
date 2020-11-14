import { game } from '../init.js';
import { controller } from '../gameController.js';

var backButton2;
var groundCat;
var waterCat;
var airCat;
var fireCat;
var startAnim;

class sceneSelectionMenu2 extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneSelectionMenu2",
            active: false
        });
    }
    create() {
        // Variables auxiliares
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;
        var aux = controller.getGameMode(); //consigo el gato seleccionado de la escena anterior
        // Fondo
        this.add.image(400, 320, "selectionPl2");
        switch(aux){
            case 1:
                
            // Botón del gato de tierra seleccionado
            groundCat = this.add.sprite(132, 305, "GroundCatIdleMatter2", 0).setInteractive();

            this.anims.create({
                key: 'groundMenuAnim',
                frames: this.anims.generateFrameNumbers('GroundCatIdleMatter2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            groundCat.addListener('pointerover', () => {
                startAnim = true;
            }, this);
            groundCat.addListener('pointerout', () => {
                startAnim = false;
            }, this);
            groundCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de agua
            waterCat = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'waterMenuAnim',
                frames: this.anims.generateFrameNumbers('WaterCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            waterCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(2);
            }, this);
            waterCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            waterCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de aire
            airCat = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'airMenuAnim',
                frames: this.anims.generateFrameNumbers('AirCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            airCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(3);
            }, this);
            airCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            airCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de fuego
            fireCat = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'fireMenuAnim',
                frames: this.anims.generateFrameNumbers('FireCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            fireCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(4);
            }, this);
            fireCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            fireCat.addListener('pointerdown', loadScene, this);
                break;
            case 2:
                  // Botón del gato de tierra
            groundCat = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'groundMenuAnim',
                frames: this.anims.generateFrameNumbers('GroundCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            groundCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(1);
            }, this);
            groundCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            groundCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de agua
            waterCat = this.add.sprite(352, 305, "WaterCatIdleMatter2", 0).setInteractive();

            this.anims.create({
                key: 'waterMenuAnim',
                frames: this.anims.generateFrameNumbers('WaterCatIdleMatter2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            waterCat.addListener('pointerover', () => {
                startAnim = true;
            }, this);
            waterCat.addListener('pointerout', () => {
                startAnim = false;
            }, this);
            waterCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de aire
            airCat = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'airMenuAnim',
                frames: this.anims.generateFrameNumbers('AirCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            airCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(3);
            }, this);
            airCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            airCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de fuego
            fireCat = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'fireMenuAnim',
                frames: this.anims.generateFrameNumbers('FireCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            fireCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(4);
            }, this);
            fireCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            fireCat.addListener('pointerdown', loadScene, this);
                break;
            case 3: 
            
            // Botón del gato de tierra
            groundCat = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'groundMenuAnim',
                frames: this.anims.generateFrameNumbers('GroundCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            groundCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(1);
            }, this);
            groundCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            groundCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de agua
            waterCat = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'waterMenuAnim',
                frames: this.anims.generateFrameNumbers('WaterCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            waterCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(2);
            }, this);
            waterCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            waterCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de aire
            airCat = this.add.sprite(530, 305, "AirCatIdleMatter2", 0).setInteractive();

            this.anims.create({
                key: 'airMenuAnim',
                frames: this.anims.generateFrameNumbers('AirCatIdleMatter2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            airCat.addListener('pointerover', () => {
                startAnim = true;
            }, this);
            airCat.addListener('pointerout', () => {
                startAnim = false;
            }, this);
            airCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de fuego
            fireCat = this.add.sprite(705, 305, "FireCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'fireMenuAnim',
                frames: this.anims.generateFrameNumbers('FireCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            fireCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(4);
            }, this);
            fireCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            fireCat.addListener('pointerdown', loadScene, this);
                break;
            case 4:
                 // Botón del gato de tierra
            groundCat = this.add.sprite(132, 305, "GroundCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'groundMenuAnim',
                frames: this.anims.generateFrameNumbers('GroundCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            groundCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(1);
            }, this);
            groundCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            groundCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de agua
            waterCat = this.add.sprite(352, 305, "WaterCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'waterMenuAnim',
                frames: this.anims.generateFrameNumbers('WaterCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            waterCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(2);
            }, this);
            waterCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            waterCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de aire
            airCat = this.add.sprite(530, 305, "AirCatIdle2", 0).setInteractive();

            this.anims.create({
                key: 'airMenuAnim',
                frames: this.anims.generateFrameNumbers('AirCatIdle2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            airCat.addListener('pointerover', () => {
                startAnim = true;
                controller.setGameMode(3);
            }, this);
            airCat.addListener('pointerout', () => {
                startAnim = false;
                controller.setGameMode(0);
            }, this);
            airCat.addListener('pointerdown', loadScene, this);

            // Botón del gato de fuego
            fireCat = this.add.sprite(705, 305, "FireCatIdleMatter2", 0).setInteractive();

            this.anims.create({
                key: 'fireMenuAnim',
                frames: this.anims.generateFrameNumbers('FireCatIdleMatter2', { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            fireCat.addListener('pointerover', () => {
                startAnim = true;
            }, this);
            fireCat.addListener('pointerout', () => {
                startAnim = false;
            }, this);
            fireCat.addListener('pointerdown', loadScene, this);
                break;
            default:
                console.log('Ups');
                break;
        }
      
        // Botón de retroceder
        backButton2 = this.add.sprite(width - 242 / 2, 580, "spriteBackButton2", 1).setInteractive();
        backButton2.addListener('pointerover', () => {
            backButton2.setFrame(0);
        }, this);
        backButton2.addListener('pointerout', () => {
            backButton2.setFrame(1);
        }, this);
        backButton2.addListener('pointerdown', loadScene, this);

    }
    update(time, delta) {
        if (startAnim === true && controller.getGameMode() === 1) {
            groundCat.anims.play('groundMenuAnim', true);
            waterCat.anims.play('waterMenuAnim', false);
            airCat.anims.play('airMenuAnim', false);
            fireCat.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 2) {
            groundCat.anims.play('groundMenuAnim', false);
            waterCat.anims.play('waterMenuAnim', true);
            airCat.anims.play('airMenuAnim', false);
            fireCat.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 3) {
            groundCat.anims.play('groundMenuAnim', false);
            waterCat.anims.play('waterMenuAnim', false);
            airCat.anims.play('airMenuAnim', true);
            fireCat.anims.play('fireMenuAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 4) {
            groundCat.anims.play('groundMenuAnim', false);
            waterCat.anims.play('waterMenuAnim', false);
            airCat.anims.play('airMenuAnim', false);
            fireCat.anims.play('fireMenuAnim', true);
        } else {
            groundCat.anims.play('groundMenuAnim', false);
            waterCat.anims.play('waterMenuAnim', false);
            airCat.anims.play('airMenuAnim', false);
            fireCat.anims.play('fireMenuAnim', false);
        }
    }
}
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
    switch (controller.getGameMode()) {
        case 1:
            getMap();
            break;
        case 2:
            getMap();
            break;
        case 3:
            getMap();
            break;
        case 4:
            getMap();
            break;
        default:
            this.scene.start("sceneMainMenu");
            break;
    }
}

export default sceneSelectionMenu2;