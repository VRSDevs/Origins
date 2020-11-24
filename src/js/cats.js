class Cat{
    constructor(obj, tp, sc, hm){
        this.object = obj;
        this.type = tp;
        this.score = sc;
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

    setHasMatter(value){
        this.hasMatter = value;
    }
}

var player1 = new Cat(undefined, 0, 0, false);
var player2 = new Cat(undefined, 0, 0, false);
var players = [player1, player2];

export {players};