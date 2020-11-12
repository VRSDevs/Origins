//////////////////////////////////////////////////////////////////////
//                     Clase para el menu Jugar                     //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';
import {music} from './mainMenu.js';
var backButton;
var singlePlayerButton;
var localMultiplayerButton;
var onlineMultiplayerButton;
var startAnim;
var gameModeID;


class scenePlayMenu extends Phaser.Scene {
    constructor() {
        super({key: "scenePlayMenu",
            active: false
        });
    }
    create() {
        // Variables auxiliares
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        // Fondo
        this.add.image(400, 320, "play");

        // Botón del modo 1 jugador
        singlePlayerButton = this.add.sprite(139, 251, "sprite1PlayerGM", 0).setInteractive();

        this.anims.create({
            key: 'singlePlayerAnim',
            frames: this.anims.generateFrameNumbers('sprite1PlayerGM', { start: 0, end: 6 }),
            frameRate: 4, 
            repeat: -1
        });

        singlePlayerButton.addListener('pointerover', () => {
            startAnim = true;
            gameModeID = 1;
        }, this);
        singlePlayerButton.addListener('pointerout', () => {
            startAnim = false;
            gameModeID = 0;
        }, this);
        singlePlayerButton.addListener('pointerdown', loadScene, this);

        // Botón del modo 2 jugadores (multijugador local)
        localMultiplayerButton = this.add.sprite(405, 251, "sprite2PlayerGM", 0).setInteractive();

        this.anims.create({
            key: 'localMultiplayerAnim',
            frames: this.anims.generateFrameNumbers('sprite2PlayerGM', { start: 0, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        localMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            gameModeID = 2;
        }, this);
        localMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            gameModeID = 0;
        }, this);
        localMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Botón del modo multijugador
        onlineMultiplayerButton = this.add.sprite(662, 251, "spriteMultiplayerGM", 0).setInteractive();

        this.anims.create({
            key: 'multiplayerAnim',
            frames: this.anims.generateFrameNumbers('spriteMultiplayerGM', { start: 0, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        onlineMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            gameModeID = 3;
        }, this);
        onlineMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            gameModeID = 0;
        }, this);
        onlineMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Botón de retroceder
        backButton = this.add.sprite(width - 242/2, 580, "spriteBackButton", 1).setInteractive();
        backButton.addListener('pointerover', () => {
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.setFrame(1);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);

    }
    update(time, delta){
        if(startAnim === true && gameModeID === 1){
            singlePlayerButton.anims.play('singlePlayerAnim', true);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && gameModeID === 2){
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', true);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && gameModeID === 3){
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', true);
        } else {
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        }
    }
}

function loadScene(){
    if(gameModeID === 1) {
        alert("En progreso...");
    } else if(gameModeID === 2){
        this.scene.start("sceneForestLevel");
    } else if(gameModeID === 3){
        alert("En progreso...");
    } else {
        this.scene.start("sceneMainMenu");
          
    }
}

export default scenePlayMenu;