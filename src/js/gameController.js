//////////////////////////////////////////////////////////////////////
//                     Clase controlador de juego                   //
//////////////////////////////////////////////////////////////////////
class gameController{
    //******************* Constructor clase ************************//
    constructor(scene, music, mp, globalMusic, gameMode, timeRound, up){
        this.currentScene = scene;      // Escena actual
        this.musicEnabled = music;      // ¿Está habilitada la música?
        this.musicPlaying = mp;         // ¿Se está reproduciendo la música?
        this.music = globalMusic;       // Objeto de música
        this.gameMode = gameMode;       // Modo de juego:   1 -> Un jugador (vs. IA)
                                        //                  2 -> Dos jugadores (J vs. J)
                                        //                  3 -> Multijugador
        this.timeRound = timeRound;     // Tiempo de ronda
        this.stopUpdateLevel = up;
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
    getStopUpdateLevel(){
        return this.stopUpdateLevel;
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
    setStopUpdateLevel(value){
        this.stopUpdateLevel = value;
    }
}

//////////////////////////////////////////////////////////////////////
//                      Creación del controlador                    //
//////////////////////////////////////////////////////////////////////
var controller = new gameController(undefined, true, false, undefined, 0, 10, false);

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export {controller};

