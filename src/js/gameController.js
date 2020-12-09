//////////////////////////////////////////////////////////////////////
//                     Clase controlador de juego                   //
//////////////////////////////////////////////////////////////////////
class gameController{
    //******************* Constructor clase ************************//
    constructor(scene, music, mp, globalMusic, gameMode, timeRound,musicForest, musicCave, musicLab, musicEffect1,musicEffect2, up){
        this.currentScene = scene;      // Escena actual
        this.musicEnabled = music;      // ¿Está habilitada la música?
        this.musicPlaying = mp;         // ¿Se está reproduciendo la música?
        this.music = globalMusic;       // Objeto de música
        this.gameMode = gameMode;       // Modo de juego:   1 -> Un jugador (vs. IA)
                                        //                  2 -> Dos jugadores (J vs. J)
                                        //                  3 -> Multijugador
        this.timeRound = timeRound;     // Tiempo de ronda
        this.stopUpdateLevel = up;
        this.musicLevelForest = musicForest;
        this.musicLevelCave = musicCave;
        this.musicLevelLab = musicLab;
        this.musicEffect1 = musicEffect1;
        this.musicEffect2 = musicEffect2;
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
    getMusicLevelForest(){
        return this.musicLevelForest;
    }
    getMusicLevelCave(){
        return this.musicLevelCave;
    }
    getmusicLevelLab(){
        return this.musicLevelLab;
    }
    getmusicEffect1(){
        return this.musicEffect1;
    }
    getmusicEffect2(){
        return this.musicEffect2;
    }

    //******************* Setters ************************//

    setGameMode(value){
        this.gameMode = value;
    }
    setMusicEnabled(value){
        this.musicEnabled = value;
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
    setMusicLevelForest(obj){
        this.musicLevelForest = obj;
    }
    setMusicLevelCave(obj){
        this.musicLevelCave = obj;
    }    
    setMusicLevelLab(obj){
        this.musicLevelLab = obj;
    }
    setMusicEffect1(obj){
        this.musicEffect1 = obj;
    }
    setMusicEffect2(obj){
        this.musicEffect2 = obj;
    }
    setStopUpdateLevel(value){
        this.stopUpdateLevel = value;
    }
}


//////////////////////////////////////////////////////////////////////
//                      Creación del controlador                    //
//////////////////////////////////////////////////////////////////////
var controller = new gameController(undefined, true, false, undefined, 0, 10,undefined, undefined, undefined, undefined, undefined, false);

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export {controller};

