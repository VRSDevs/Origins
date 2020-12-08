//////////////////////////////////////////////////////////////////////
//                     Clase controlador de juego                   //
//////////////////////////////////////////////////////////////////////
class gameController{
    //******************* Constructor clase ************************//
    constructor(scene, music, mp, globalMusic, gameMode, timeRound){
        this.currentScene = scene;      // Escena actual
        this.musicEnabled = music;      // ¿Está habilitada la música?
        this.musicPlaying = mp;         // ¿Se está reproduciendo la música?
        this.music = globalMusic;       // Objeto de música
        this.gameMode = gameMode;       // Modo de juego:   1 -> Un jugador (vs. IA)
                                        //                  2 -> Dos jugadores (J vs. J)
                                        //                  3 -> Multijugador
        this.timeRound = timeRound;     // Tiempo de ronda
    }
    //******************* Getters ************************//
    getGameMode(){
        return this.gameMode;
    }
    getMusicEnabled(){
        return this.musicEnabled;
    }
    getTimeRound(){
        return this.timeRound;
    }
    getCurrentScene(){
        return this.currentScene;
    }
    getMusicPlaying(){
        return this.musicPlaying;
    }
    getMusic(){
        return this.music;
    }
    //******************* Setters ************************//
    setGameMode(value){
        this.gameMode = value;
    }
    setMusicEnabled(value){
        this.musicEnabled = value;
    }
    getMusic(){
        return this.music;
    }
    setMusic(obj){
        this.music = obj;
    }
    setMusicPlaying(value){
        this.musicPlaying = value;
    }
    setTimeRound(value){
        this.timeRound = value;
    }
    setCurrentScene(obj){
        this.currentScene = obj;
    }
    setMusic(obj){
        this.music = obj;
    }
    //******************* Otros ************************//
    // Reseteo escenas del juego //
    resetScenes(game){
        console.log(game);
        game.scene.scenes.forEach(scene => {
            if(scene.scene.key !== "bootloader" && scene.scene.key !== "sceneCaveLevel" && scene.scene.key !== "sceneLabLevel") 
                console.log(scene.scene.key);
                scene.scene.restart();
                scene.scene.stop();
        });
        var nextScene = game.scene.getScene("sceneMainMenu");
        nextScene.scene.start();
    }
}

//////////////////////////////////////////////////////////////////////
//                      Creación del controlador                    //
//////////////////////////////////////////////////////////////////////
var controller = new gameController(undefined, true, false, undefined, 0, 60);

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export {controller};

