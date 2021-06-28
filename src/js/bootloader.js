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
        this.load.image("tilesForest", "./resources/img/Tileset/Tileset/Tilemap.png");
        this.load.image("tilesFire", "./resources/img/Tileset/Tilemap_Fire.png");
        this.load.image("tilesAir", "./resources/img/Tileset/Tilemap_Air.png");
        this.load.image("tilesCave", "./resources/img/Tileset/Tilemap_Cave.png");
        // Código JSON //
        this.load.tilemapTiledJSON("map", "./resources/img/Tileset/TileMapForest..json");
        this.load.tilemapTiledJSON("map1", "./resources/img/Tileset/Map1.json");
        this.load.tilemapTiledJSON("map2", "./resources/img/Tileset/Map2.json");
        this.load.tilemapTiledJSON("fireMap", "./resources/img/Tileset/FireMap.json");
        this.load.tilemapTiledJSON("airMap", "./resources/img/Tileset/AirMap.json");
        this.load.tilemapTiledJSON("caveMap", "./resources/img/Tileset/WaterMap.json");

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
        this.load.image("selectionOnline", "./resources/img/MenuDesign/Selection/selectionMenuOnline.png");
        // Victoria
        this.load.spritesheet('bgVictory','./resources/img/MenuDesign/Victory/commonVictoryBG.png' , {frameWidth: 800, frameHeight: 640} );
        this.load.spritesheet('bgVictory_Ground','./resources/img/MenuDesign/Victory/groundVictoryBG.png' , {frameWidth: 800, frameHeight: 640} );
        this.load.spritesheet('bgVictory_Air','./resources/img/MenuDesign/Victory/airVictoryBG.png' , {frameWidth: 800, frameHeight: 640} );
        this.load.spritesheet('bgVictory_Fire','./resources/img/MenuDesign/Victory/fireVictoryBG.png' , {frameWidth: 800, frameHeight: 640} );
        this.load.spritesheet('bgVictory_Water','./resources/img/MenuDesign/Victory/waterVictoryBG.png' , {frameWidth: 800, frameHeight: 640} );
        // Descripción //
        this.load.image('emptyDesc', './resources/img/MenuDesign/Selection/textBox.png');
        // Mapas //
        this.load.image("forestMap","./resources/img/Maps/FieldLevel.png");
        this.load.image("caveMap","./resources/img/Maps/CaveLevel_800x640.png");
        this.load.image("labMap","./resources/img/Maps/LabLevel800x640.png");
        // Iconos //
        this.load.image("clock","./resources/img/Icons/clock.png");
        this.load.image("userIcon","./resources/img/Icons/user.png");
        this.load.spritesheet("spriteReloadButton","./resources/img/Buttons/sync_SpriteSheet.png", {frameWidth: 30, frameHeight: 30});
        // Salas de espera //
        this.load.image("airRoom","./resources/img/MenuDesign/ElementsRoom/airRoom.png");
        this.load.image("fireRoom","./resources/img/MenuDesign/ElementsRoom/fireRoom.png");
        this.load.image("groundRoom","./resources/img/MenuDesign/ElementsRoom/groundRoom.png");
        this.load.image("waterRoom","./resources/img/MenuDesign/ElementsRoom/waterRoom.png");
        
        //***********************  Gatos ***************************//
        this.load.image("emptyFace","./resources/img/Icons/transparentCat.png");
        this.load.image("emptyRoundIcon", "./resources/img/Icons/rounds.png");
        this.load.image("roundIcon", "./resources/img/Icons/roundsWin.png");
        // Aire //
        this.load.image("AirCatFace","./resources/img/Icons/Wiskas.png");
        // Sin materia
        this.load.spritesheet('AirCatDown','./resources/img/Cats/Air/airDown.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdle','./resources/img/Cats/Air/airIdle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('AirCatIdle2','./resources/img/Cats/Air/airIdle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('AirCatIdle3','./resources/img/Cats/Air/airIdle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('AirCatLeft','./resources/img/Cats/Air/airLeft.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('AirCatUp','./resources/img/Cats/Air/airUp.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('AirCatRight','./resources/img/Cats/Air/airRight.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('AirCatDownMatter','./resources/img/Cats/Air/airDownMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('AirCatIdleMatter','./resources/img/Cats/Air/airIdleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('AirCatIdleMatter2','./resources/img/Cats/Air/airIdleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('AirCatLeftMatter','./resources/img/Cats/Air/airLeftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('AirCatUpMatter','./resources/img/Cats/Air/airUpMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('AirCatRightMatter','./resources/img/Cats/Air/airRightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('AirCatDesc', './resources/img/MenuDesign/Selection/airText.png');
        // Fuego //
        this.load.image("FireCatFace","./resources/img/Icons/Levi.png");
        // Sin materia
        this.load.spritesheet('FireCatDown','./resources/img/Cats/Fire/fireDown.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdle','./resources/img/Cats/Fire/fireIdle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('FireCatIdle2','./resources/img/Cats/Fire/fireIdle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('FireCatIdle3','./resources/img/Cats/Fire/fireIdle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('FireCatLeft','./resources/img/Cats/Fire/fireLeft.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('FireCatUp','./resources/img/Cats/Fire/fireUp.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('FireCatRight','./resources/img/Cats/Fire/fireRight.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('FireCatDownMatter','./resources/img/Cats/Fire/fireDownMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('FireCatIdleMatter','./resources/img/Cats/Fire/fireIdleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('FireCatIdleMatter2','./resources/img/Cats/Fire/fireIdleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('FireCatLeftMatter','./resources/img/Cats/Fire/fireLeftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('FireCatUpMatter','./resources/img/Cats/Fire/fireUpMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('FireCatRightMatter','./resources/img/Cats/Fire/fireRightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('FireCatDesc', './resources/img/MenuDesign/Selection/fireText.png');
        // Tierra //
        this.load.image("GroundCatFace","./resources/img/Icons/Tommy.png");
        // Sin materia
        this.load.spritesheet('GroundCatDown','./resources/img/Cats/Ground/groundDown.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdle','./resources/img/Cats/Ground/groundIdle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('GroundCatIdle2','./resources/img/Cats/Ground/groundIdle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('GroundCatIdle3','./resources/img/Cats/Ground/groundIdle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('GroundCatLeft','./resources/img/Cats/Ground/groundLeft.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('GroundCatUp','./resources/img/Cats/Ground/groundUp.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('GroundCatRight','./resources/img/Cats/Ground/groundRight.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('GroundCatDownMatter','./resources/img/Cats/Ground/groundDownMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('GroundCatIdleMatter','./resources/img/Cats/Ground/groundIdleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('GroundCatIdleMatter2','./resources/img/Cats/Ground/groundIdleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('GroundCatLeftMatter','./resources/img/Cats/Ground/groundLeftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('GroundCatUpMatter','./resources/img/Cats/Ground/groundUpMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('GroundCatRightMatter','./resources/img/Cats/Ground/groundRightMatter.png' , {frameWidth: 42, frameHeight: 44} );
        // Descripción
        this.load.image('GroundCatDesc', './resources/img/MenuDesign/Selection/groundText.png');
        // Agua //
        this.load.image("WaterCatFace","./resources/img/Icons/Michi.png");
        // Sin materia
        this.load.spritesheet('WaterCatDown','./resources/img/Cats/Water/waterDown.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdle','./resources/img/Cats/Water/waterIdle.png' , {frameWidth: 34, frameHeight: 36} );
        this.load.spritesheet('WaterCatIdle2','./resources/img/Cats/Water/waterIdle_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('WaterCatIdle3','./resources/img/Cats/Water/waterIdle_b.png' , {frameWidth: 85, frameHeight: 90} );
        this.load.spritesheet('WaterCatLeft','./resources/img/Cats/Water/waterLeft.png' , {frameWidth: 42, frameHeight: 36} );
        this.load.spritesheet('WaterCatUp','./resources/img/Cats/Water/waterUp.png' , {frameWidth: 30, frameHeight: 44} );
        this.load.spritesheet('WaterCatRight','./resources/img/Cats/Water/waterRight.png' , {frameWidth: 42, frameHeight: 36} );
        // Con materia
        this.load.spritesheet('WaterCatDownMatter','./resources/img/Cats/Water/waterDownMatter.png' , {frameWidth: 30, frameHeight: 38} );
        this.load.spritesheet('WaterCatIdleMatter','./resources/img/Cats/Water/waterIdleMatter.png' , {frameWidth: 34, frameHeight: 46} );
        this.load.spritesheet('WaterCatIdleMatter2','./resources/img/Cats/Water/waterIdleMatter_x2.png' , {frameWidth: 124, frameHeight: 124} );
        this.load.spritesheet('WaterCatLeftMatter','./resources/img/Cats/Water/waterLeftMatter.png' , {frameWidth: 42, frameHeight: 44} );
        this.load.spritesheet('WaterCatUpMatter','./resources/img/Cats/Water/waterUpMatter.png' , {frameWidth: 30, frameHeight: 54} );
        this.load.spritesheet('WaterCatRightMatter','./resources/img/Cats/Water/waterRightMatter.png' , {frameWidth: 42, frameHeight: 44} );
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
        this.load.spritesheet("spriteMsgButton", './resources/img/Buttons/user_SpriteSheet.png', { frameWidth: 30, frameHeight: 30});
        this.load.spritesheet("spriteSUButton", './resources/img/Buttons/signup_SpriteSheet.png', { frameWidth: 399, frameHeight: 67});
        this.load.spritesheet("spriteLIButton", './resources/img/Buttons/login_SpriteSheet.png', { frameWidth: 399, frameHeight: 67});
        // Teclas //
        this.load.spritesheet("spriteWButton", './resources/img/Buttons/wButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteAButton", './resources/img/Buttons/aButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteSButton", './resources/img/Buttons/sButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteDButton", './resources/img/Buttons/dButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spriteVButton", './resources/img/Buttons/vButton.png', { frameWidth: 45, frameHeight: 45});
        this.load.spritesheet("spritePButton", './resources/img/Buttons/pButton.png', { frameWidth: 45, frameHeight: 45});
        // Menú principal //
        this.load.spritesheet("spritePlayButton", './resources/img/Buttons/play_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteControlsButton", './resources/img/Buttons/controls_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        this.load.spritesheet("spriteSettingsButton", './resources/img/Buttons/settings_SpriteSheet.png', { frameWidth: 350, frameHeight: 67 });
        // Salida //
        this.load.spritesheet("spriteExitButton", './resources/img/Buttons/exit_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteBackButton", './resources/img/Buttons/back_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteBackButton2", './resources/img/Buttons/back_SpriteSheet2.png', { frameWidth: 301, frameHeight: 66 });
        // Menú de juego //
        this.load.spritesheet("sprite1PlayerGM", './resources/img/Buttons/Player1Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("sprite2PlayerGM", './resources/img/Buttons/Player2Button.png', { frameWidth: 206, frameHeight: 206 });
        this.load.spritesheet("spriteMultiplayerGM", './resources/img/Buttons/OnlineButton.png', { frameWidth: 206, frameHeight: 206 });
        // Música //
        this.load.spritesheet("spriteChangeMusicButton", './resources/img/Buttons/music_SpriteSheet.png', { frameWidth: 399, frameHeight: 67 });
        // Final de partida //
        this.load.spritesheet("spriteRestart", './resources/img/Buttons/restart_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        this.load.spritesheet("spriteMainMenu", './resources/img/Buttons/mainMenu_SpriteSheet.png', { frameWidth: 301, frameHeight: 66 });
        // Juego Online //
        this.load.spritesheet("spriteGroundLobby", './resources/img/Buttons/groundRoomSS.png', {frameWidth: 662, frameHeight: 67});
        this.load.spritesheet("spriteWaterLobby", './resources/img/Buttons/waterRoomSpritesheet.png', {frameWidth: 662, frameHeight: 67});
        this.load.spritesheet("spriteFireLobby", './resources/img/Buttons/fireRoomSpritesheet.png', {frameWidth: 662, frameHeight: 67}); 
        this.load.spritesheet("spriteAirLobby", './resources/img/Buttons/airRoomSpritesheet.png', {frameWidth: 662, frameHeight: 67});    
    	this.load.spritesheet("readyPButton", './resources/img/Buttons/readySpriteSheet.png', { frameWidth: 411, frameHeight: 69});

        //******************** Interfaz Server ********************************//
        this.load.spritesheet("login", './resources/img/ServerUtils/LoginServer.png', {frameWidth: 403, frameHeight: 42});
        this.load.spritesheet("message", './resources/img/ServerUtils/MessagesMenu.png', {frameWidth: 319, frameHeight: 257});
        this.load.spritesheet("name", './resources/img/ServerUtils/NameMenu.png', {frameWidth: 332, frameHeight: 46});
        this.load.spritesheet("playServer", './resources/img/ServerUtils/PlayMenuServer.png', {frameWidth: 258, frameHeight: 41});
        this.load.spritesheet("playServer2", './resources/img/ServerUtils/PlayMenuServer2.png', {frameWidth: 439, frameHeight: 43});
        this.load.spritesheet("log", './resources/img/ServerUtils/ServerLog.png', {frameWidth: 150, frameHeight: 67});
        this.load.spritesheet("load", './resources/img/ServerUtils/loadServer.png', {frameWidth: 268, frameHeight: 70});
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export { loadedResoruces };
export default bootloader;
