import {darkMatter} from './maps/levelForest.js';

class cat{
    constructor(type, score, hasMatter){
        this.type = type;
        this.score = score;
        this.hasMatter = hasMatter;
    }
    // Getters
    getType(){
        return this.type;
    }

    getHasMatter(){
        return this.hasMatter;
    }

    // Setters
    setType(value){
        this.type = value;
    }

    setDarkMatter(obj){
        this.darkMatter = obj;
    }

}

cat.prototype.collectDarkMatter = function(){
    darkMatter.disableBody(true, true);
    this.hasMatter = true;
}

var player1 = new cat(0,0,false);
var player2 = new cat(0,0,false);
var players = [player1, player2];

export {players};