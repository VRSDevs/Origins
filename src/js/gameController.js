class gameController{
    constructor(music, mp, globalMusic, gameMode, timeRound){
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
    
    getMusicPlaying(){
        return this.musicPlaying;
    }

    setMusicPlaying(value){
        this.musicPlaying = value;
    }
    setTimeRound(value){
        this.timeRound = value;
    }
}

var controller = new gameController(true, false, undefined, 0, 60);
export {controller};
