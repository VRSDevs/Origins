//////////////////////////////////////////////////////////////////////
//                     Clase controlador de juego                   //
//////////////////////////////////////////////////////////////////////
class gameController{
    //******************* Constructor clase ************************//
    constructor(){
        this.currentScene = undefined;              // Escena actual
        this.musicEnabled = true;              // ¿Está habilitada la música?
        this.musicPlaying = false;                 // ¿Se está reproduciendo la música?
        this.music = undefined;               // Objetos de música
        this.musicLevelForest = undefined;
        this.musicLevelCave = undefined;
        this.musicLevelLab = undefined;
        this.musicEffect1 = undefined;       // Objetos de efectos de sonido  
        this.musicEffect2 = undefined;
        this.gameMode = 0;               // Modo de juego: 
                                                //                  2 -> Dos jugadores (J vs. J)
                                                //                  3 -> Multijugador
        this.timeRound = 15;             // Tiempo de ronda
        this.currentTimeRound = 0;      //
        this.maxRounds = 2;
        this.stopUpdateLevel = false;
        this.matchPlayers = 0;
        this.matterPosX = 0;
        this.matterPosY = 0;
        this.winnerCat = -1;
        this.reseter = false;
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
    getCurrentTimeRound(){
        return this.currentTimeRound;
    }
    getMaxRounds(){
        return this.maxRounds;
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
    getMatchPlayers(){
        return this.matchPlayers;
    }
    getMatterPosX(){
        return this.matterPosX;
    }
    getMatterPosY(){
        return this.matterPosY;
    }
    getWinnerCat(){
        return this.winnerCat;
    }
    getReseter(){
        return this.reseter;
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
    setCurrentTimeRound(time){
        this.currentTimeRound = time;
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
    setMatchPlayers(value) {
        this.matchPlayers = value;
    }
    setMatterPosX(value){
        this.matterPosX = value;
    }
    setMatterPosY(value){
        this.matterPosY = value;
    }
    setWinnerCat(id){
        this.winnerCat = id;
    }
    setReseter(res){
        this.reseter = res;
    }
}

//////////////////////////////////////////////////////////////////////
//                      Creación del controlador                    //
//////////////////////////////////////////////////////////////////////
var controller = new gameController();

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export {controller};

