//////////////////////////////////////////////////////////////////////
//                         Clase gato (jugadores)                   //
//////////////////////////////////////////////////////////////////////
class Cat {
    //******************* Constructor clase ************************//
    constructor(obj, tp, nm, rd, sc, rw, hm, sd) {
        this.object = obj;      // Objeto de phaser
        this.type = tp;         // Tipo:    1 -> Tierra
                                //          2 -> Agua
                                //          3 -> Aire
                                //          4 -> Fuego
        this.name = nm          // Nombre del gato (usuario)
        this.isReady = rd       // ¿Está listo para jugar?
        this.score = sc;        // Puntuación
        this.roundsWon = rw;    // Rondas ganadas
        this.hasMatter = hm;    // ¿Tiene la materia?
        this.sand = sd;         // ¿Está tocando arena?
    }
    //******************* Getters ************************//
    getObject() {
        return this.object;
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
    getReady() {
        return this.isReady;
    }
    getScore() {
        return this.score;
    }
    getRoundsWon() {
        return this.roundsWon;
    }
    getHasMatter = function () {
        return this.hasMatter;
    }
    getSand = function () {
        return this.sand;
    }

    //******************* Setters ************************//
    setObject(obj) {
        this.object = obj;
    }
    setType(value) {
        this.type = value;
    }
    setName(name) {
        this.name = name;
    }
    setReady(value) {
        this.isReady = value;
    }
    setScore(value) {
        this.score = value;
    }
    setRoundsWon(value) {
        this.roundsWon = value;
    }
    setHasMatter(value) {
        this.hasMatter = value;
    }
    setSand(value) {
        this.sand = value;
    }
    
    //******************* Otros ************************//
    // Reseteo de jugadores //
    reset(bool) {
        if(bool){
            this.object = undefined;
            this.type = 0;
            this.name = "";
            this.isReady = false;
            this.score = 0;
            this.roundsWon = 0;
            this.hasMatter = false;
            this.sand = false;
        } else {
            this.name = "";
            this.isReady = false;
            this.score = 0; 
            this.roundsWon = 0;
            this.hasMatter = false;
            this.sand = false;
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                         Creación de jugadores                    //
//////////////////////////////////////////////////////////////////////
// Jugador 1 //
var player1 = new Cat(undefined, 0, "", false, 0, 0, false, false);
// Jugador 2 //
var player2 = new Cat(undefined, 0, "", false, 0, 0, false, false);
// Jugador 3 //
var player3 = new Cat(undefined, 0, "", false, 0, 0, false, false);
// Jugador 4 //
var player4 = new Cat(undefined, 0, "", false, 0, 0, false, false);
// Lista de jugadores //
var players = [player1, player2, player3, player4];

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export { players };