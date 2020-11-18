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
        this.load.image("caveMap","./resources/img/Maps/CaveLevel_800x640.png");
        this.load.image("labMap","./resources/img/Maps/LabLevel800x640.png");
    
        // Materia oscura
        this.load.image("darkMatter","./resources/img/DarkMatter/DarkMatter_small.png");
        this.load.image("back","./resources/img/DarkMatter/DarkMatter.png");

        //***********************  Air cats ***************************/
        // Sin materia
        this.load.spritesheet('AirCatDown','./resources/img/SpriteSheet/Air_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdle','./resources/img/SpriteSheet/Air_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('AirCatLeft','./resources/img/SpriteSheet/Air_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('AirCatUp','./resources/img/SpriteSheet/Air_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('AirCatRight','./resources/img/SpriteSheet/Air_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('AirCatDownMatter','./resources/img/SpriteSheet/Air_Spritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdleMatter','./resources/img/SpriteSheet/Air_Spritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('AirCatLeftMatter','./resources/img/SpriteSheet/Air_Spritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('AirCatUpMatter','./resources/img/SpriteSheet/Air_Spritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('AirCatRightMatter','./resources/img/SpriteSheet/Air_Spritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );

        //*********************  Fire cats ******************************/
        // Sin materia
        this.load.spritesheet('FireCatDown','./resources/img/SpriteSheet/Fire_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdle','./resources/img/SpriteSheet/Fire_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('FireCatLeft','./resources/img/SpriteSheet/Fire_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('FireCatUp','./resources/img/SpriteSheet/Fire_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('FireCatRight','./resources/img/SpriteSheet/Fire_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('FireCatDowMatter','./resources/img/SpriteSheet/Fire_Spritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdleMatter','./resources/img/SpriteSheet/Fire_Spritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('FireCatLeftMatter','./resources/img/SpriteSheet/Fire_Spritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('FireCatUpMatter','./resources/img/SpriteSheet/Fire_Spritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('FireCatRightMatter','./resources/img/SpriteSheet/Fire_Spritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );

        //*******************  Ground cats *******************************/
        // Sin materia
        this.load.spritesheet('GroundCatDown','./resources/img/SpriteSheet/Ground_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdle','./resources/img/SpriteSheet/Ground_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('GroundCatLeft','./resources/img/SpriteSheet/Ground_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('GroundCatUp','./resources/img/SpriteSheet/Ground_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('GroundCatRight','./resources/img/SpriteSheet/Ground_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );

        // Con materia
        this.load.spritesheet('GroundCatDownMatter','./resources/img/SpriteSheet/Ground_Spritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdleMatter','./resources/img/SpriteSheet/Ground_Spritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('GroundCatLeftMatter','./resources/img/SpriteSheet/Ground_Spritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('GroundCatUpMatter','./resources/img/SpriteSheet/Ground_Spritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('GroundCatRightMatter','./resources/img/SpriteSheet/Ground_Spritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );

        //******************** Water cats ********************************/
        // Sin materia

        this.load.spritesheet('WaterCatDown','./resources/img/SpriteSheet/Water_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdle','./resources/img/SpriteSheet/Water_Spritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('WaterCatLeft','./resources/img/SpriteSheet/Water_Spritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('WaterCatUp','./resources/img/SpriteSheet/Water_Spritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('WaterCatRight','./resources/img/SpriteSheet/Water_Spritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('WaterCatDownMatter','./resources/img/SpriteSheet/Water_Spritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdleMatter','./resources/img/SpriteSheet/Water_Spritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('WaterCatLeftMatter','./resources/img/SpriteSheet/Water_Spritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('WaterCatUpMatter','./resources/img/SpriteSheet/Water_Spritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('WaterCatRightMatter','./resources/img/SpriteSheet/Water_Spritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );

        // Carga de botones
        this.load.spritesheet("spritePlayButton", './resources/img/SpriteSheet/Button_SpriteSheet/play_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteControlsButton", './resources/img/SpriteSheet/Button_SpriteSheet/controls_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteSettingsButton", './resources/img/SpriteSheet/Button_SpriteSheet/settings_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteExitButton", './resources/img/SpriteSheet/Button_SpriteSheet/exit_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteBackButton", './resources/img/SpriteSheet/Button_SpriteSheet/back_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteBackButton2", './resources/img/SpriteSheet/Button_SpriteSheet/back_SpriteSheet2.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("sprite1PlayerGM", './resources/img/SpriteSheet/Button_SpriteSheet/Player1Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("sprite2PlayerGM", './resources/img/SpriteSheet/Button_SpriteSheet/Player2Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("spriteMultiplayerGM", './resources/img/SpriteSheet/Button_SpriteSheet/OnlineButton.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("spriteChangeMusicButton", './resources/img/SpriteSheet/Button_SpriteSheet/music_SpriteSheet.png', { frameWidth: 118, frameHeight: 66 });
    }
}
export default bootloader;
