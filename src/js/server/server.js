//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { user } from "./user.js";

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
    // Conexiones a servicios generales //
    // Servicio del chat
    connectToChatService() {
        var chatWS = new WebSocket('ws://85.137.44.104:80/chat');

        chatWS.onopen = function() {
            server.setServerConnected(true);

            var aux = server.getWSConnection();
            aux["chat"] = chatWS;
            server.setWSConnection(aux);
        }

        chatWS.onmessage = function (msg) {
            var message = JSON.parse(msg.data);

            var aux = [];
            aux = server.getMessagesFromDB();

            var messageToAdd = "<" + message.name + "> " + message.message;
            console.log(messageToAdd);

            aux.push(messageToAdd);
            server.setMessagesFromDB(aux);
        }

        chatWS.onerror = function(e) {
            console.log("a");
            server.setServerConnected(false);

            var aux = [];
            var messageToAdd = "<" + message.username + "> " + message.body;

            aux.push(messageToAdd);
            server.setMessagesFromDB(aux);
            /*
            server.setLogMessage("<> Cant establish connection to the server.");
            server.setLogPlayMenu("<> Cant establish connection to the server.");
            */
        }
    }

    // Servicio de usuarios
    connectToUserService() {
        var userWS = new WebSocket('ws://85.137.44.104:80/user');

        userWS.onopen = function() {
            server.setServerConnected(true);

            var aux = server.getWSConnection();
            aux["user"] = userWS;
            server.setWSConnection(aux);
        }

        userWS.onmessage = function(msg) {
            var message = JSON.parse(msg.data);

            server.setConnectedUsers(message.connectedUsers);
        }
    }

    // Desconexión de servicios generales //
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

    // Conexión a salas de online //
    connectToForestRoom() {
        var forestWS = new WebSocket('ws://85.137.44.104:80/forest');

        forestWS.onopen = function() {
            var aux = server.getWSConnection();
            aux["forest"] = forestWS;
            server.setWSConnection(aux);

            console.log("Conectado.");
        }

        forestWS.onmessage = function(msg) {
            var message = JSON.parse(msg.data);

            switch (message.code) {
                case "Error_MAXUSERS":
                    console.log("No se pudo conectar. Sala llena.");
                    break;
                case "OK_ROOMCONN":
                    console.log("Se estableció conexión con la sala.");
                    user.setOnlineRoom("forest");
                    break;
            }
        }

        forestWS.onclose = function() {
            console.log("Desconectado.");
        }
    }

    disconnectFromRoom() {
        // Obtención de la conexión del diccionario de conexiones (en función de la sala conectada del usuario)
        var roomConnection;
        switch (user.getOnlineRoom()) {
            case "forest":
                roomConnection = this.getWSConnection()["forest"];
                break;
        
            default:
                break;
        }
        roomConnection.close();
        this.getWSConnection()["forest"] = null;

        user.setOnlineRoom("");
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