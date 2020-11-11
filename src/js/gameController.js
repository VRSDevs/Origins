class gameController{
    constructor(player1, player2, music, gameMode){
        this.player1 = player1;
        this.player2 = player2;
        this.musicEnabled = music;
        this.gameMode = gameMode;
    }
    // Getters
    getGameMode(){
        return this.gameMode;
    }

    getMusicEnabled(){
        return this.musicEnabled;
    }

    // Setters
    setGameMode(value){
        this.gameMode = value;
    }

    setMusicEnabled(value){
        this.musicEnabled = value;
    }
}

var controller = new gameController(1, 2, true);

export {controller};