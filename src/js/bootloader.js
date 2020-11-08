class bootloader extends Phaser.Scene {
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

        // Air cats
        this.load.spritesheet('AirCatDown','./resources/img/SpriteSheet/Air_Spritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdle','./resources/img/SpriteSheet/Air_Spritesheet/idle.png' , {frameWidth: 32, frameHeight: 36} );
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
    }
}
export default bootloader;
