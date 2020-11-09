//////////////////////////////////////////////////////////////////////
//                     Clase para el menu Jugar                     //
//////////////////////////////////////////////////////////////////////

var backButton;

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

        //

        // Botón de retroceder
        backButton = this.add.image(100, 100, "imgPlayButton").setInteractive();
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

    }
}

function loadScene(){
    this.scene.start("sceneMainMenu");
}

export default scenePlayMenu;