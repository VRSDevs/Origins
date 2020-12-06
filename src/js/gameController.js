class gameController{
    constructor(scene, music, mp, globalMusic, gameMode, timeRound){
        this.currentScene = scene;
        this.musicEnabled = music;
        this.musicPlaying = mp;
        this.music = globalMusic;
        this.gameMode = gameMode;
        this.timeRound = timeRound;
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
}

var controller = new gameController(undefined, true, false, undefined, 0, 10);
export {controller};

