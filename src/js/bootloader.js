//////////////////////////////////////////////////////////////////////
//                 Clase para cargar todos los recursos             //
//////////////////////////////////////////////////////////////////////

//Clase para implementar todos los recursos
class bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "bootloader"
        });
    }
    preload() {
        // Cargar escena cuando se complete toda la carga de recursos
        this.load.on("complete", () => {
            this.scene.start("sceneMainMenu");
        });

        // Carga de fondos
        this.load.image("mainMenu","./resources/img/MenuDesign/Main/MainMenu.png");
        this.load.image("play","./resources/img/MenuDesign/Game/GameMenu.png");
        this.load.image("controls","./resources/img/MenuDesign/Controls/ControlsMenu.png");
        this.load.image("settings","./resources/img/MenuDesign/Settings/SettingsMenu.png");
    
        // Carga de mapas
        this.load.image("forestMap","./resources/img/Maps/FieldLevel_800x640.png");
    
        // Carga de botones
        this.load.spritesheet("spritePlayButton", './resources/img/MenuDesign/Buttons/play_SpriteSheet.png', { frameWidth: 360, frameHeight: 82 });
        this.load.spritesheet("spriteControlsButton", './resources/img/MenuDesign/Buttons/controls_SpriteSheet.png', { frameWidth: 360, frameHeight: 82 });
        this.load.spritesheet("spriteSettingsButton", './resources/img/MenuDesign/Buttons/settings_SpriteSheet.png', { frameWidth: 360, frameHeight: 82 });
        this.load.spritesheet("spriteExitButton", './resources/img/MenuDesign/Buttons/exit_SpriteSheet.png', { frameWidth: 242, frameHeight: 55 });
        this.load.spritesheet("spriteBackButton", './resources/img/MenuDesign/Buttons/back_SpriteSheet.png', { frameWidth: 242, frameHeight: 55 });
    }
}

export default bootloader;