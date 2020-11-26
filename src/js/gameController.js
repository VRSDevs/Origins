class gameController{
    constructor(player1, player2, music, mp, globalMusic){
        this.player1 = player1;
        this.player2 = player2;
        this.musicEnabled = music;
        this.musicPlaying = mp;
        this.music = globalMusic;
    }

    getMusicEnabled(){
        return this.musicEnabled;
    }

    setMusicEnabled(value){
        this.musicEnabled = value;
    }

    getMusic(){
        return this.music;
    }

    setMusic(value){
        this.music = value;
    }
    
    getMusicPlaying(){
        return this.musicPlaying;
    }

    setMusicPlaying(value){
        this.musicPlaying = value;
    }
}

var controller = new gameController(1, 2, true,false, undefined);

export {controller};
export {globalMusic};