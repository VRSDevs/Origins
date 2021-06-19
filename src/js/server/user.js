//////////////////////////////////////////////////////////////////////
//                           Clase usuario                          //
//////////////////////////////////////////////////////////////////////
class User {
    //******************* Constructor clase ************************//
    constructor(un, pw, st, om) {
        this.username = un;
        this.password = pw;
        this.status = st;
        this.onlineRoom = om;
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

    //******************* Otros ************************//
    //
    resertUser() {
        this.username = "";
        this.password = "";
        this.status = false;
        this.onlineRoom = "";
    }
}

//////////////////////////////////////////////////////////////////////
//                     Inicialización de usuario                    //
//////////////////////////////////////////////////////////////////////
var user = new User("", "", false, "");

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export { user };