class gameController{
    constructor(scene, music, mp, globalMusic, gameMode, timeRound, musicForest, musicCave, musicLab, musicEffect1,musicEffect2){
        this.currentScene = scene;
        this.musicEnabled = music;
        this.musicPlaying = mp;
        this.music = globalMusic;
        this.gameMode = gameMode;
        this.timeRound = timeRound;
        this.musicLevelForest = musicForest;
        this.musicLevelCave = musicCave;
        this.musicLevelLab = musicLab;
        this.musicEffect1 = musicEffect1;
        this.musicEffect2 = musicEffect2;
    }
    // Getters
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
    // Setters
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
}

var controller = new gameController(undefined, true, false, undefined, 0, 10, undefined, undefined, undefined, undefined, undefined);
export {controller};

