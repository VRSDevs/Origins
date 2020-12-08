class gameController{
    constructor(scene, music, mp, globalMusic, gameMode, timeRound, musicForest){
        this.currentScene = scene;
        this.musicEnabled = music;
        this.musicPlaying = mp;
        this.music = globalMusic;
        this.gameMode = gameMode;
        this.timeRound = timeRound;
        this.musicLevelForest = musicForest;
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
    // Setters
    setGameMode(value){
        this.gameMode = value;
    }
    setMusicEnabled(value){
        this.musicEnabled = value;
    }
    getMusic(){
        return this.music;
    }
    getMusicLevelForest(){
        return this.musicLevelForest;
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
    setMusicLevelForest(obj){
        this.musicLevelForest = obj;
    }
}

var controller = new gameController(undefined, true, false, undefined, 0, 10, undefined);
export {controller};

