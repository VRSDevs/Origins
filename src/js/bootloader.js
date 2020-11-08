class bootloader extends Phaser.Scene {
    //Clase para implementar todos los recursos
    constructor() {
        super({
            key: "bootloader"
        });
    }
    preload() {
        //
        this.load.on("complete", () => {
            this.scene.start("sceneMainMenu");
        });

        //
        this.load.image("mainMenu","./resources/img/MenuDesign/Main/MainMenu.png");
        this.load.image("imgPlayButton","./resources/img/DarkMatter/DarkMatter.png");

        this.load.image("play","./resources/img/MenuDesign/Game/GameMenu.png");
        this.load.image("controls","./resources/img/MenuDesign/Controls/ControlsMenu.png");
        this.load.image("settings","./resources/img/MenuDesign/Settings/SettingsMenu.png");
    
        //
        this.load.image("forestMap","./resources/img/Maps/FieldLevel_800x640.png");
    
        //
        this.load.image("back","./resources/img/DarkMatter/DarkMatter.png");
    }
}

export default bootloader;