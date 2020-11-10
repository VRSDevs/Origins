class gameController{
    constructor(player1, player2, music){
        this.player1 = player1;
        this.player2 = player2;
        this.musicEnabled = music;
    }

    getMusicEnabled(){
        return this.musicEnabled;
    }

    setMusicEnabled(value){
        this.musicEnabled = value;
    }
}

var controller = new gameController(1, 2, true);

export {controller};