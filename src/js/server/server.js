//////////////////////////////////////////////////////////////////////
//                         Clase servidor                           //
//////////////////////////////////////////////////////////////////////
class ServerClass {
    //******************* Constructor clase ************************//
    constructor(msg, msgPM, numUs, lCU, servCon, mDB, ws) {
        this.logMessage = msg;
        this.logPlayMenu = msgPM;
        this.connectedUsers = numUs;
        this.listConnectedUsers = lCU;
        this.serverConnected = servCon;
        this.messagesFromDB = mDB;
        this.connection = ws;
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

    getWSConnection() {
        return this.connection;
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

    setWSConnection(connection) {
        this.connection = connection;
    }

    //******************* Otros ************************//
    connect() {
        /*
        
        var wsConnection = new WebSocket('ws://85.137.44.104:80/chat');

        wsConnection.onopen = function() {
            server.setServerConnected(true);

            var aux = {};
            aux["chat"] = wsConnection;
            server.setWSConnection(aux);
            
            server.setLogMessage("<> Established connection to the server.");
            server.setLogPlayMenu("<> Established connection to the server.");
        }

        wsConnection.onerror = function(e) {
            server.setServerConnected(false);
            server.setLogMessage("<> Cant establish connection to the server.");
            server.setLogPlayMenu("<> Cant establish connection to the server.");
        }
        */
    }

    connectToUserService() {
        var wsConnection = new WebSocket('ws://85.137.44.104:80/user');

        wsConnection.onopen = function() {
            server.setServerConnected(true);

            var aux = {}
            aux["user"] = wsConnection;
            server.setWSConnection(aux);

            console.log("Dingga");
        }

        wsConnection.onmessage = function(msg) {
            var message = JSON.parse(msg.data);

            server.setConnectedUsers(message.connectedUsers);
            console.log(message.connectedUsers);
        }
    }

    disconnect() {
        var wsConnection = this.getWSConnection()["user"];

        wsConnection.close();

        wsConnection.onclose = function(msg) {
            var message = JSON.parse(msg.data);

            server.setConnectedUsers(message.connectedUsers);
        }

        this.setWSConnection(null);
    }
}

//////////////////////////////////////////////////////////////////////
//                       Inicialización de datos                    //
//////////////////////////////////////////////////////////////////////
var server = new ServerClass("", "", 0, [], false, [], {});

//////////////////////////////////////////////////////////////////////
//                            Exportación                           //
//////////////////////////////////////////////////////////////////////
export { server };