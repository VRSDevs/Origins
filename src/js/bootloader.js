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
        this.load.image("mainMenu","./resources/img/MenuDesign/Main/MainMenu_NoButtons.png");
        this.load.image("play","./resources/img/MenuDesign/Game/GameMenu_noButtons.png");
        this.load.image("controls","./resources/img/MenuDesign/Controls/ControlsMenu_noButtons.png");
        this.load.image("settings","./resources/img/MenuDesign/Settings/SettingsMenu_noButtons.png");
    
        // Carga de mapas
        this.load.image("forestMap","./resources/img/Maps/FieldLevel_800x640.png");
    
        // Materia oscura
        this.load.image("darkMatter","./resources/img/DarkMatter/DarkMatter.png");

        //
        this.load.image("back","./resources/img/DarkMatter/DarkMatter.png");

        // Air cats
        this.load.spritesheet('AirCatDown','./resources/img/SpriteSheet/Air_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdle','./resources/img/SpriteSheet/Air_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('AirCatLeft','./resources/img/SpriteSheet/Air_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('AirCatUp','./resources/img/SpriteSheet/Air_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('AirCatRight','./resources/img/SpriteSheet/Air_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );

        // Fire cats
        this.load.spritesheet('FireCatDown','./resources/img/SpriteSheet/Fire_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdle','./resources/img/SpriteSheet/Fire_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('FireCatLeft','./resources/img/SpriteSheet/Fire_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('FireCatUp','./resources/img/SpriteSheet/Fire_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('FireCatRight','./resources/img/SpriteSheet/Fire_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );

        // Ground cats
        this.load.spritesheet('GroundCatDown','./resources/img/SpriteSheet/Ground_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdle','./resources/img/SpriteSheet/Ground_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('GroundCatLeft','./resources/img/SpriteSheet/Ground_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('GroundCatUp','./resources/img/SpriteSheet/Ground_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('GroundCatRight','./resources/img/SpriteSheet/Ground_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        
        // Water cats
        this.load.spritesheet('WaterCatDown','./resources/img/SpriteSheet/Water_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdle','./resources/img/SpriteSheet/Water_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('WaterCatLeft','./resources/img/SpriteSheet/Water_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('WaterCatUp','./resources/img/SpriteSheet/Water_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('WaterCatRight','./resources/img/SpriteSheet/Water_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );

        // Carga de botones
        this.load.spritesheet("spritePlayButton", './resources/img/MenuDesign/Buttons/play_SpriteSheet.png', { frameWidth: 360, frameHeight: 82 });
        this.load.spritesheet("spriteControlsButton", './resources/img/MenuDesign/Buttons/controls_SpriteSheet.png', { frameWidth: 360, frameHeight: 82 });
        this.load.spritesheet("spriteSettingsButton", './resources/img/MenuDesign/Buttons/settings_SpriteSheet.png', { frameWidth: 360, frameHeight: 82 });
        this.load.spritesheet("spriteExitButton", './resources/img/MenuDesign/Buttons/exit_SpriteSheet.png', { frameWidth: 242, frameHeight: 55 });
        this.load.spritesheet("spriteBackButton", './resources/img/MenuDesign/Buttons/back_SpriteSheet.png', { frameWidth: 242, frameHeight: 55 });
        this.load.spritesheet("sprite1PlayerGM", './resources/img/MenuDesign/Buttons/Player1Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("sprite2PlayerGM", './resources/img/MenuDesign/Buttons/Player2Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("spriteMultiplayerGM", './resources/img/MenuDesign/Buttons/OnlineButton.png', { frameWidth: 206, frameHeight: 206 });

    }
}
export default bootloader;
