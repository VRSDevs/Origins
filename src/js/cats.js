class Cat{
    constructor(obj, tp, sc, rw, hm){
        this.object = obj;
        this.type = tp;
        this.score = sc;
        this.roundsWon = rw;
        this.hasMatter = hm;
    }
    // Getters
    getObject(){
        return this.object;
    }

    getType(){
        return this.type;
    }

    getScore(){
        return this.score;
    }

    getRoundsWon(){
        return this.roundsWon;
    }

    getHasMatter = function(){
        return this.hasMatter;
    }

    // Setters
    setObject(obj){
        this.object = obj;
    }

    setType(value){
        this.type = value;
    }

    setScore(value){
        this.score = value;
    }

    setRoundsWon(value){
        this.roundsWon = value;
    }

    setHasMatter(value){
        this.hasMatter = value;
    }

    // Otros
    reset(){
        this.object = undefined;
        this.type = 0;
        this.score = 0;
        this.roundsWon = 0;
        this.hasMatter = false;        
    }
}

var player1 = new Cat(undefined, 0, 0, 0, false);
var player2 = new Cat(undefined, 0, 0, 0, false);
var players = [player1, player2];

export {players};