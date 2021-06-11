//////////////////////////////////////////////////////////////////////
//                         Clase servidor                           //
//////////////////////////////////////////////////////////////////////
class ServerClass {
    //******************* Constructor clase ************************//
    constructor(msg, msgPM, numUs, lCU, servCon, mDB) {
        this.logMessage = msg;
        this.logPlayMenu = msgPM;
        this.connectedUsers = numUs;
        this.listConnectedUsers = lCU;
        this.serverConnected = servCon;
        this.messagesFromDB = mDB;
    }

    //******************* Getters ************************//
    getLogMessage() {
        return this.logMessage;
    }

    getLogPlayMenu() {
        return this.logPlayMenu;
    }

    getListConnectedUsers() {
        return this.listConnectedUsers;
    }

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
    setLogMessage(message) {
        this.logMessage = message;
    }

    setLogPlayMenu(message) {
        this.logPlayMenu = message;
    }

    setListConnectedUsers(list){
        this.listConnectedUsers = list;
    }

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
        console.log("Nos vamos a conectar...");
        
        var connection = new WebSocket('ws://85.137.44.104:80/chat');

        connection.onopen = function() {
            server.setServerConnected(true);
            server.setLogMessage("<> Established connection to the server.");
            server.setLogPlayMenu("<> Established connection to the server.");
        }

        connection.onerror = function(e) {
            console.log("Nope.");
            server.setServerConnected(false);
            server.setLogMessage("<> Cant establish connection to the server.");
            server.setLogPlayMenu("<> Cant establish connection to the server.");
        }
        /*
        $.ajax({
            url: 'http://localhost:8080/users',
            success: function () {
                server.setServerConnected(true);
                server.setLogMessage("<> Established connection to the server.");
                server.setLogPlayMenu("<> Established connection to the server.");
            },
            error: function () {
                server.setServerConnected(false);
                server.setLogMessage("<> Cant establish connection to the server.");
                server.setLogPlayMenu("<> Cant establish connection to the server.");
            }
        })
        */
    }
}

//////////////////////////////////////////////////////////////////////
//                       Inicialización de datos                    //
//////////////////////////////////////////////////////////////////////
var server = new ServerClass("", "", 0, [], false, []);

//////////////////////////////////////////////////////////////////////
//                            Exportación                           //
//////////////////////////////////////////////////////////////////////
export { server };