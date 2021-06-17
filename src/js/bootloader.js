//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Control ************************//
var loadedResoruces = false;    // ¿Se cargaron los recursos?

//////////////////////////////////////////////////////////////////////
//                       Clase de carga de recursos                 //
//////////////////////////////////////////////////////////////////////
class bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "bootloader",
            active: true
        });
    }
    preload() {
        // Cargar el menú principal cuando se complete toda la carga de recursos
        this.load.on("complete", () => {
            loadedResoruces = true;
        });

        //***********************  Códigos HTML ***************************//
        this.load.html('messagesCode','src/html/sendMessage.html');
        this.load.html('loginCode', 'src/html/login.html');

        //***********************  TilesMap ***************************//
        this.load.image("tiles", "./resources/img/Tileset/Tileset/Tilemap.png");
        // Código JSON //
        this.load.tilemapTiledJSON("map", "./resources/img/Tileset/TileMapForest..json");
        this.load.tilemapTiledJSON("map1", "./resources/img/Tileset/Map1.json");
        this.load.tilemapTiledJSON("map2", "./resources/img/Tileset/Map2.json");

        //***********************  Fondos ***************************//
        // Menús //
        this.load.image("loginMenu","./resources/img/MenuDesign/Login/login_noButtons.png");
        this.load.image("mainMenu","./resources/img/MenuDesign/Main/MainMenu_NoButtons.png");
        this.load.image("play","./resources/img/MenuDesign/Game/GameMenu_noButtons.png");
        this.load.image("controls","./resources/img/MenuDesign/Controls/ControlsMenu_noButtons.png");
        this.load.image("settings","./resources/img/MenuDesign/Settings/SettingsMenu_noButtons.png");
        this.load.image("lobbyBG", "./resources/img/MenuDesign/WaitingRoom/waitingRoom_NOButtons.png");
        this.load.image("selectionPl1","./resources/img/MenuDesign/Selection/selectionMenu_player1.png");
        this.load.image("selectionPl2","./resources/img/MenuDesign/Selection/selectionMenu_player2.png");
        // Victoria
        this.load.spritesheet('bgVictory','./resources/img/SpriteSheet/BackgoundSpritesheet/backgroundVictory_SpriteSheet.png' , {frameWidth: 800, frameHeight: 640} );
        // Descripción //
        this.load.image('emptyDesc', './resources/img/MenuDesign/Selection/textBox.png');
        // Mapas //
        this.load.image("forestMap","./resources/img/Maps/FieldLevel.png");
        this.load.image("caveMap","./resources/img/Maps/CaveLevel_800x640.png");
        this.load.image("labMap","./resources/img/Maps/LabLevel800x640.png");
        // Iconos //
        this.load.image("clock","./resources/img/Icons/clock.png");
        this.load.image("userIcon","./resources/img/Icons/user.png");
        this.load.spritesheet("spriteReloadButton","./resources/img/SpriteSheet/ButtonSpriteSheet/sync_SpriteSheet.png", {frameWidth: 30, frameHeight: 30});

        //***********************  Gatos ***************************//
        // Aire //
        this.load.image("AirCatFace","./resources/img/Icons/Wiskas.png");
        // Sin materia
        this.load.spritesheet('AirCatDown','./resources/img/SpriteSheet/AirSpritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdle','./resources/img/SpriteSheet/AirSpritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('AirCatIdle2','./resources/img/SpriteSheet/AirSpritesheet/idle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('AirCatIdle3','./resources/img/SpriteSheet/AirSpritesheet/idle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('AirCatLeft','./resources/img/SpriteSheet/AirSpritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('AirCatUp','./resources/img/SpriteSheet/AirSpritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('AirCatRight','./resources/img/SpriteSheet/AirSpritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('AirCatDownMatter','./resources/img/SpriteSheet/AirSpritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdleMatter','./resources/img/SpriteSheet/AirSpritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('AirCatIdleMatter2','./resources/img/SpriteSheet/AirSpritesheet/idleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('AirCatLeftMatter','./resources/img/SpriteSheet/AirSpritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('AirCatUpMatter','./resources/img/SpriteSheet/AirSpritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('AirCatRightMatter','./resources/img/SpriteSheet/AirSpritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('AirCatDesc', './resources/img/MenuDesign/Selection/airText.png');
        // Fuego //
        this.load.image("FireCatFace","./resources/img/Icons/Levi.png");
        // Sin materia
        this.load.spritesheet('FireCatDown','./resources/img/SpriteSheet/FireSpritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdle','./resources/img/SpriteSheet/FireSpritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('FireCatIdle2','./resources/img/SpriteSheet/FireSpritesheet/idle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('FireCatIdle3','./resources/img/SpriteSheet/FireSpritesheet/idle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('FireCatLeft','./resources/img/SpriteSheet/FireSpritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('FireCatUp','./resources/img/SpriteSheet/FireSpritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('FireCatRight','./resources/img/SpriteSheet/FireSpritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('FireCatDownMatter','./resources/img/SpriteSheet/FireSpritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdleMatter','./resources/img/SpriteSheet/FireSpritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('FireCatIdleMatter2','./resources/img/SpriteSheet/FireSpritesheet/idleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('FireCatLeftMatter','./resources/img/SpriteSheet/FireSpritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('FireCatUpMatter','./resources/img/SpriteSheet/FireSpritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('FireCatRightMatter','./resources/img/SpriteSheet/FireSpritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('FireCatDesc', './resources/img/MenuDesign/Selection/fireText.png');
        // Tierra //
        this.load.image("GroundCatFace","./resources/img/Icons/Tommy.png");
        // Sin materia
        this.load.spritesheet('GroundCatDown','./resources/img/SpriteSheet/GroundSpritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdle','./resources/img/SpriteSheet/GroundSpritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('GroundCatIdle2','./resources/img/SpriteSheet/GroundSpritesheet/idle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('GroundCatIdle3','./resources/img/SpriteSheet/GroundSpritesheet/idle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('GroundCatLeft','./resources/img/SpriteSheet/GroundSpritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('GroundCatUp','./resources/img/SpriteSheet/GroundSpritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('GroundCatRight','./resources/img/SpriteSheet/GroundSpritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('GroundCatDownMatter','./resources/img/SpriteSheet/GroundSpritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdleMatter','./resources/img/SpriteSheet/GroundSpritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('GroundCatIdleMatter2','./resources/img/SpriteSheet/GroundSpritesheet/idleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('GroundCatLeftMatter','./resources/img/SpriteSheet/GroundSpritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('GroundCatUpMatter','./resources/img/SpriteSheet/GroundSpritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('GroundCatRightMatter','./resources/img/SpriteSheet/GroundSpritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('GroundCatDesc', './resources/img/MenuDesign/Selection/groundText.png');
        // Agua //
        this.load.image("WaterCatFace","./resources/img/Icons/Michi.png");
        // Sin materia
        this.load.spritesheet('WaterCatDown','./resources/img/SpriteSheet/WaterSpritesheet/down.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdle','./resources/img/SpriteSheet/WaterSpritesheet/idle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('WaterCatIdle2','./resources/img/SpriteSheet/WaterSpritesheet/idle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('WaterCatIdle3','./resources/img/SpriteSheet/WaterSpritesheet/idle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('WaterCatLeft','./resources/img/SpriteSheet/WaterSpritesheet/left.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('WaterCatUp','./resources/img/SpriteSheet/WaterSpritesheet/up.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('WaterCatRight','./resources/img/SpriteSheet/WaterSpritesheet/right.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('WaterCatDownMatter','./resources/img/SpriteSheet/WaterSpritesheet/downMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdleMatter','./resources/img/SpriteSheet/WaterSpritesheet/idleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('WaterCatIdleMatter2','./resources/img/SpriteSheet/WaterSpritesheet/idleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('WaterCatLeftMatter','./resources/img/SpriteSheet/WaterSpritesheet/leftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('WaterCatUpMatter','./resources/img/SpriteSheet/WaterSpritesheet/upMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('WaterCatRightMatter','./resources/img/SpriteSheet/WaterSpritesheet/rightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('WaterCatDesc', './resources/img/MenuDesign/Selection/waterText.png');

        //******************** Materia oscura ********************************//
        this.load.image("darkMatter","./resources/img/DarkMatter/DarkMatter_small.png");
        this.load.image("back","./resources/img/DarkMatter/DarkMatter.png");

        //******************** Música ********************************//
        this.load.audio("music",[ './resources/music/MainMenu.mp3']);
        this.load.audio("music2",[ './resources/music/LevelForest.mp3']);
        this.load.audio("music3", ['./resources/music/LevelCave.mp3']);
        this.load.audio("music4", ['./resources/music/levelLab.mp3']);
        this.load.audio("musicVictory", ['./resources/music/victory.mp3']);
        this.load.audio("musicEffect1", ['./resources/music/TakingDarkMatter.mp3']);
        this.load.audio("musicEffect2", ['./resources/music/Meow.mp3']);

        //******************** Botones ********************************//
        this.load.spritesheet("spriteMsgButton", './resources/img/SpriteSheet/ButtonSpriteSheet/user_SpriteSheet.png', { frameWidth: 30, frameHeight: 30});
        this.load.spritesheet("spriteSUButton", './resources/img/SpriteSheet/ButtonSpriteSheet/signup_SpriteSheet.png', { frameWidth: 399, frameHeight: 67});
        this.load.spritesheet("spriteLIButton", './resources/img/SpriteSheet/ButtonSpriteSheet/login_SpriteSheet.png', { frameWidth: 399, frameHeight: 67});
        // Teclas //
        this.load.spritesheet("spriteWButton", './resources/img/SpriteSheet/ButtonSpriteSheet/wButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteAButton", './resources/img/SpriteSheet/ButtonSpriteSheet/aButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteSButton", './resources/img/SpriteSheet/ButtonSpriteSheet/sButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteDButton", './resources/img/SpriteSheet/ButtonSpriteSheet/dButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteVButton", './resources/img/SpriteSheet/ButtonSpriteSheet/vButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spritePButton", './resources/img/SpriteSheet/ButtonSpriteSheet/pButton.png', { frameWidth: 45, frameHeight: 45});
        // Menú principal //
        this.load.spritesheet("spritePlayButton", './resources/img/SpriteSheet/ButtonSpriteSheet/play_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteControlsButton", './resources/img/SpriteSheet/ButtonSpriteSheet/controls_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteSettingsButton", './resources/img/SpriteSheet/ButtonSpriteSheet/settings_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        // Salida //
        this.load.spritesheet("spriteExitButton", './resources/img/SpriteSheet/ButtonSpriteSheet/exit_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteBackButton", './resources/img/SpriteSheet/ButtonSpriteSheet/back_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteBackButton2", './resources/img/SpriteSheet/ButtonSpriteSheet/back_SpriteSheet2.png', { frameWidth: 301, frameHeight: 66 });
        // Menú de juego //
        this.load.spritesheet("sprite1PlayerGM", './resources/img/SpriteSheet/ButtonSpriteSheet/Player1Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("sprite2PlayerGM", './resources/img/SpriteSheet/ButtonSpriteSheet/Player2Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("spriteMultiplayerGM", './resources/img/SpriteSheet/ButtonSpriteSheet/OnlineButton.png', { frameWidth: 206, frameHeight: 206 });
        // Música //
        this.load.spritesheet("spriteChangeMusicButton", './resources/img/SpriteSheet/ButtonSpriteSheet/music_SpriteSheet.png', { frameWidth: 399, frameHeight: 67 });
        // Final de partida //
        this.load.spritesheet("spriteRestart", './resources/img/SpriteSheet/ButtonSpriteSheet/restart_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteMainMenu", './resources/img/SpriteSheet/ButtonSpriteSheet/mainMenu_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        // Juego Online //
        this.load.spritesheet("spriteForestLobby", './resources/img/SpriteSheet/ButtonSpriteSheet/groundRoom.png', {frameWidth: 662, frameHeight: 67});
        this.load.spritesheet("spriteWaterLobby", './resources/img/SpriteSheet/ButtonSpriteSheet/waterRoom.png', {frameWidth: 662, frameHeight: 67});
        this.load.spritesheet("spriteFireLobby", './resources/img/SpriteSheet/ButtonSpriteSheet/fireRoom.png', {frameWidth: 662, frameHeight: 67}); 
        this.load.spritesheet("spriteAirLobby", './resources/img/SpriteSheet/ButtonSpriteSheet/airRoom.png', {frameWidth: 662, frameHeight: 67});    
    	this.load.spritesheet("readyPButton", './resources/img/SpriteSheet/ButtonSpriteSheet/readyButton.png', { frameWidth: 655, frameHeight: 84});
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export { loadedResoruces };
export default bootloader;
