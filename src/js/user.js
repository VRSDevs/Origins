//////////////////////////////////////////////////////////////////////
//                           Clase usuario                          //
//////////////////////////////////////////////////////////////////////
class User {
    //******************* Constructor clase ************************//
    constructor(un, pw, st) {
        this.username = un;
        this.password = pw;
        this.status = st;
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
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default User;