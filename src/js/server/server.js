//////////////////////////////////////////////////////////////////////
//                         Clase servidor                           //
//////////////////////////////////////////////////////////////////////
class ServerClass {
    //******************* Constructor clase ************************//
    constructor(numUs, servCon, mDB) {
        this.connectedUsers = numUs;
        this.serverConnected = servCon;
        this.messagesFromDB = mDB;
    }

    //******************* Getters ************************//
    getConnectedUsers() {
        return this.connectedUsers;
    }

    isServerConnected() {
        return this.serverConnected;
    }

    getMessagesFromDB() {
        return this.messagesFromDB;
    }

    //******************* Setters ************************//
    setConnectedUsers(value) {
        this.connectedUsers = value;
    }

    setServerConnected(value) {
        this.serverConnected = value;
    }

    setMessagesFromDB(array) {
        this.messagesFromDB = array;
    }

    //******************* Otros ************************//
    connect() {
        $.ajax({
            url: 'http://localhost:8080/users',
            success: function () {
                server.setServerConnected(true);
                console.log(server.isServerConnected());
            },
            error: function () {
                server.setServerConnected(false);
                console.log(server.isServerConnected());
            }
        })
    }
}

//////////////////////////////////////////////////////////////////////
//                       Inicialización de datos                    //
//////////////////////////////////////////////////////////////////////
var server = new ServerClass(0, false, []);

//////////////////////////////////////////////////////////////////////
//                            Exportación                           //
//////////////////////////////////////////////////////////////////////
export { server };