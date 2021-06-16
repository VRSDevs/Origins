//////////////////////////////////////////////////////////////////////
//                        Variables globales                        //
//////////////////////////////////////////////////////////////////////
//******************* Conexiones ************************//
//var chatWS = undefined;
//var userWS = undefined;

//////////////////////////////////////////////////////////////////////
//                         Clase servidor                           //
//////////////////////////////////////////////////////////////////////
class ServerClass {
    //******************* Constructor clase ************************//
    constructor(msgPM, numUs, lCU, servCon, mDB, ws) {
        this.logPlayMenu = msgPM;
        this.connectedUsers = numUs;
        this.listConnectedUsers = lCU;
        this.serverConnected = servCon;
        this.messagesFromDB = mDB;
        this.connections = ws;
    }

    //******************* Getters ************************//
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
        return this.connections;
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

    setWSConnection(connections) {
        this.connections = connections;
    }

    //******************* Otros ************************//
    connectToChatService() {
        var chatWS = new WebSocket('ws://85.137.44.104:80/chat');

        chatWS.onopen = function() {
            this.setServerConnected(true);

            var aux = this.getWSConnection();
            aux["chat"] = chatWS;
            this.setWSConnection(aux);
        }

        chatWS.onmessage = function (msg) {
            var message = JSON.parse(msg.data);

            var aux = [];
            aux = this.getMessagesFromDB();

            var messageToAdd = "<" + message.name + "> " + message.message;
            console.log(messageToAdd);

            aux.push(messageToAdd);
            this.setMessagesFromDB(aux);
        }

        chatWS.onerror = function(e) {
            console.log("a");
            this.setServerConnected(false);

            var aux = [];
            var messageToAdd = "<" + message.username + "> " + message.body;

            aux.push(messageToAdd);
            this.setMessagesFromDB(aux);
            /*
            server.setLogMessage("<> Cant establish connection to the server.");
            server.setLogPlayMenu("<> Cant establish connection to the server.");
            */
        }
    }

    connectToUserService() {
        var userWS = new WebSocket('ws://85.137.44.104:80/user');

        userWS.onopen = function() {
            this.setServerConnected(true);

            var aux = this.getWSConnection();
            aux["user"] = userWS;
            this.setWSConnection(aux);
        }

        userWS.onmessage = function(msg) {
            var message = JSON.parse(msg.data);

            this.setConnectedUsers(message.connectedUsers);
        }
    }

    disconnect() {
        var arrayConnections = [
            this.getWSConnection()["chat"],
            this.getWSConnection()["user"]
        ];

        arrayConnections.forEach(connection => {
            connection.close();
        });
        
        this.setWSConnection({});
        this.setServerConnected(false);
    }
}

//////////////////////////////////////////////////////////////////////
//                       Inicialización de datos                    //
//////////////////////////////////////////////////////////////////////
var server = new ServerClass("", 0, [], false, [], {});

//////////////////////////////////////////////////////////////////////
//                            Exportación                           //
//////////////////////////////////////////////////////////////////////
export { server };