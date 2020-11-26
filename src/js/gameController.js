class gameController{
    constructor(player1, player2, music,mp){
        this.player1 = player1;
        this.player2 = player2;
        this.musicEnabled = music;
        this.musicPlaying = mp;
    }

    getMusicEnabled(){
        return this.musicEnabled;
    }

    setMusicEnabled(value){
        this.musicEnabled = value;
    }

    
    getMusicPlaying(){
        return this.musicPlaying;
    }

    setMusicPlaying(value){
        this.musicPlaying = value;
    }
}

var controller = new gameController(1, 2, true,false);

export {controller};