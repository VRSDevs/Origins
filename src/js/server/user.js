//////////////////////////////////////////////////////////////////////
//                           Clase usuario                          //
//////////////////////////////////////////////////////////////////////
class User {
    //******************* Constructor clase ************************//
    constructor(un, pw, st, om, id) {
        this.username = un;         // Nombre de usuario del usuario
        this.password = pw;         // Contraseña del usuario
        this.status = st;           // Estado del jugador
                                    //      true -> Conectado
                                    //      false -> Desconectado
        this.onlineRoom = om;       // Sala en la que se encuentra el usuario (tierra, agua, aire, fuego)
        this.id = id;               // ID del usuario en la partida
    }
    
    //******************* Getters ************************//
    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    isStatus() {
        return this.status;
    }

    getOnlineRoom() {
        return this.onlineRoom;
    }

    getIdInRoom() {
        return this.id;
    }

    //******************* Setters ************************//
    setUsername(value) {
        this.username = value;
    }

    setPassword(value) {
        this.password = value;
    }

    setStatus(value) {
        this.status = value;
    }

    setOnlineRoom(value) {
        this.onlineRoom = value;
    }

    setIdInRoom(value) {
        this.id = value;
    }

    //******************* Otros ************************//
    //
    resertUser() {
        this.username = "";
        this.password = "";
        this.status = false;
        this.onlineRoom = "";
        this.id = -1;
    }
}

//////////////////////////////////////////////////////////////////////
//                     Inicialización de usuario                    //
//////////////////////////////////////////////////////////////////////
var user = new User("", "", false, "", -1);

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export { user };