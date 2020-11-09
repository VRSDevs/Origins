//////////////////////////////////////////////////////////////////////
//                     Clase para el menu Jugar                     //
//////////////////////////////////////////////////////////////////////

var backButton;
var singlePlayerButton;
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
            frameRate: 2, 
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

        // Botón de retroceder
        backButton = this.add.sprite(width - 242/2, 484, "spriteBackButton", 1).setInteractive();
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
        } else {
            singlePlayerButton.anims.play('singlePlayerAnim', false);
        }
    }
}

function loadScene(){
    singlePlayerButton.scene.start("sceneMainMenu");
}

export default scenePlayMenu;