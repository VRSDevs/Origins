class gameController{
    constructor(music, gameMode, timeRound){
        this.musicEnabled = music;
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

    setTimeRound(value){
        this.timeRound = value;
    }

}

var controller = new gameController(true, 0, 60);

export {controller};