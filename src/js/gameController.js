class gameController{
    constructor(player1, player2, music, gameMode, timeRound){
        this.player1 = player1;
        this.player2 = player2;
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

var controller = new gameController(1, 2, true, 0, 30);

export {controller};