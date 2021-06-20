//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { user } from "./user.js";
import { players } from "../cats.js";

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
    /**
     * Conexión del cliente al servicio del chat
     */
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

    /**
     * Conexión del cliente al servicio de usuarios
     */
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
    /**
     * Método para desconectar al usuario de los servicios generales (chat y usuarios)
     */
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
    /**
     * Conexión a la sala de tierra
     */
    connectToGroundRoom() {
        var forestWS = new WebSocket('ws://85.137.44.104:80/ground');

        forestWS.onopen = function() {
            var aux = server.getWSConnection();
            aux["ground"] = forestWS;
            server.setWSConnection(aux);

            console.log("Conectado.");
        }

        forestWS.onmessage = function(msg) {
            // Parser del mensaje enviado por parte del servidor
            var message = JSON.parse(msg.data);

            // Comprobación del código del mensaje
            switch (message.code) {
                // Caso: Error -> Se ha excedido el número máximo de usuarios de la sala
                case "Error_MAXUSERS":
                    console.log("No se pudo conectar. Sala llena.");
                    break;
                // Caso: OK -> Se ha podido establecer la conexión con la sala
                case "OK_ROOMCONN":
                    console.log("Se estableció conexión con la sala.");
                    // Actualización de información del usuario
                    user.setOnlineRoom("ground");       // Sala en la que se encuentra
                    user.setIdInRoom(message.userID);   // ID del usuario en la sala
                    console.log(user.getIdInRoom());
                    break;
                //
                case "OK_PLAYERJOIN":
                    players[message.playerId].setType(message.playerType);
                    players[message.playerId].setName(message.playerName);
                    players[message.playerId].setReady(message.playerReady);
                    break;
                //
                case "OK_PLAYERDISC":
                    console.log("A borrar");
                    players[message.playerId].reset(true);
                    break;
                //
                case "OK_PLAYERREADY":
                    players[message.playerId].setReady(message.playerStatus);
                    break;
                //
                case "OK_STARTMATCH":
                    console.log("Sexo");
                    break;
            }
        }

        forestWS.onclose = function() {
            console.log("Desconectado.");
        }
    }

    /**
     * Método para enviar un mensaje al servicio de la sala
     * @param {WebSocket} wsConnection Conexión websocket de la sala
     * @param {Object} msg Mensaje a enviar al servidor
     */
    messageToRoomService(wsConnection, msg) {
        wsConnection.send(JSON.stringify(msg));
    }

    /**
     * Método para desconectar al cliente de la conexión websocket
     */
    disconnectFromRoom() {
        // Obtención de la conexión del diccionario de conexiones (en función de la sala conectada del usuario)
        var roomConnection;
        switch (user.getOnlineRoom()) {
            // Cada caso es la clave de cada conexión en el diccionario
            case "ground":
                roomConnection = this.getWSConnection()["ground"];
                break;
        
            default:
                break;
        }

        // Generación del mensaje a enviar al servidor
        var message = {
            code: "DISCON",
            idUser: user.getIdInRoom()
        }

        // Envío del mensaje
        this.messageToRoomService(roomConnection, message);

        // Eliminación de la conexión en el diccionario
        this.getWSConnection()["ground"] = null;

        //
        players[user.getIdInRoom()].reset(true);

        // Eliminación de la sala e ID del usuario
        user.setOnlineRoom("");
        user.setIdInRoom(-1);

        // Cierre de la conexión
        roomConnection.close();
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