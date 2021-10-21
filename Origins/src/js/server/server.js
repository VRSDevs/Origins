//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { user } from "./user.js";
import { players } from "../cats.js";
import { darkMatter } from "../darkmatter.js";
import { controller } from "../gameController.js";
import sceneGroundLevelOnline from "../maps/Online/levelGroundOnline.js";

//////////////////////////////////////////////////////////////////////
//                        Variables globales                        //
//////////////////////////////////////////////////////////////////////
//******************* IP ************************//
var ip = 'ws://127.0.0.1:80';

//////////////////////////////////////////////////////////////////////
//                         Clase servidor                           //
//////////////////////////////////////////////////////////////////////
class ServerClass {
    //******************* Constructor clase ************************//
    constructor() {
        // Estado //
        this.serverConnected = false;       // ¿El servidor está conectado?

        // Mensajes //
        this.logPlayMenu = "";              // Mensaje en el menú de LogIn
        this.roomStatus = "";               // Mensaje de estado de acceso a sala
        this.messagesFromDB = [];           // Mensajes del chat

        // Usuarios //
        this.connectedUsers = 0;            // Usuarios conectados
        this.listConnectedUsers = [];       // Lista de usuarios conectados
        this.canLogIn = 0;                  // ¿Se puede conectar el usuario al juego?
        
        // Conexiones //
        this.connections = {};              // Diccionario de conexiones de WS
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
    getRoomStatusMessage() {
        return this.roomStatus;
    }
    getCanLogIn() {
        return this.canLogIn;
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
    setRoomStatusMessage(msg) {
        this.roomStatus = msg;
    }
    setCanLogIn(bool) {
        this.canLogIn = bool;
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
        // Establecimiento de la conexión a la dirección WS del servicio
        var chatWS = new WebSocket(ip + '/chat');

        // Cuando se establece la conexión
        chatWS.onopen = function() {
            // Actualización del estado del servidor
            server.setServerConnected(true);

            // Almacenamiento de la conexión en diccionario de conexiones
            var aux = server.getWSConnection();
            aux["chat"] = chatWS;
            server.setWSConnection(aux);
        }

        // Cuando el cliente recibe un mensaje del servidor
        chatWS.onmessage = function (msg) {
            // Parser del mensaje recibido
            var message = JSON.parse(msg.data);

            // Obtención de todos los mensajes recibidos
            var aux = [];
            aux = server.getMessagesFromDB();

            // Creación del mensaje recibido por parte de otro cliente
            var messageToAdd = "<" + message.name + "> " + message.message;

            // Inserción de mensaje en pila de mensajes
            aux.push(messageToAdd);
            // Actualización de lista de mensajes
            server.setMessagesFromDB(aux);
        }

        // Cuando hay un fallo en la conexión
        chatWS.onerror = function(e) {
            /*
            console.log("a");
            server.setServerConnected(false);

            var aux = [];
            var messageToAdd = "<" + message.username + "> " + message.body;

            aux.push(messageToAdd);
            server.setMessagesFromDB(aux);
            server.setLogMessage("<> Cant establish connection to the server.");
            server.setLogPlayMenu("<> Cant establish connection to the server.");
            */
        }
    }

    /**
     * Conexión del cliente al servicio de usuarios
     */
    connectToUserService() {
        // Establecimiento de la conexión a la dirección WS del servicio
        var userWS = new WebSocket(ip + '/user');

        // Cuando se establece la conexión
        userWS.onopen = function() {
            // Actualización del estado del servidor
            server.setServerConnected(true);

            var aux = server.getWSConnection();
            aux["user"] = userWS;
            server.setWSConnection(aux);
        }

        // Almacenamiento de la conexión en diccionario de conexiones
        userWS.onmessage = function(msg) {
            // Parser del mensaje recibido
            var message = JSON.parse(msg.data);

            // Comprobación del código del mensaje
            switch (message.code) {
                // Caso: OK_CHECKREGISTER -> El usuario ha intentado realizar un registro
                case "OK_CHECKREGISTER":
                    // Asignación del valor de acceso
                    server.setCanLogIn(message.status);

                    break;
                // Caso: OK_CHECKLOG -> El usuario ha intentado realizar un inicio de sesión
                case "OK_CHECKLOG":
                    // Asignación del valor de acceso
                    server.setCanLogIn(message.status);

                    break;
                // Caso: OK_ALLUSERSCONNECTED -> Conexión nueva. Actualización del número de jugadores conectados
                case "OK_ALLUSERSCONNECTED":
                    // Actualización del número de jugadores conectados
                    server.setConnectedUsers(message.connectedUsers);

                    break;
                // Caso: OK_CONNECTEDNEWUSER -> Un nuevo usuario se ha conectado
                case "OK_CONNECTEDNEWUSER":
                    // Obtención de todos los mensajes recibidos
                    var aux = [];
                    aux = server.getListConnectedUsers();

                    // Creación del mensaje recibido por parte de otro cliente
                    var messageToAdd = message.username;

                    // Inserción de mensaje en pila de mensajes
                    aux.push(messageToAdd);
                    // Actualización de lista de mensajes
                    server.setListConnectedUsers(aux);

                    break;
                // Caso: OK_GETLISTUSERS -> Caso para cuando se solicita la obtención de todos los jugadores conectados
                case "OK_GETLISTUSERS":
                    // Obtención de todos los mensajes recibidos
                    var aux = [];
                    aux = server.getListConnectedUsers();

                    // Creación del mensaje recibido por parte de otro cliente
                    var messageToAdd = message.username;

                    // Inserción de mensaje en pila de mensajes
                    aux.push(messageToAdd);
                    // Actualización de lista de mensajes
                    server.setListConnectedUsers(aux);

                    break;
                case "OK_SENDUSERDISCONNECTION":
                    // Inicialización de arrays
                    var aux = [];
                    var serverArray = server.getListConnectedUsers();

                    // Reasignación de lista de jugadores conectados (eliminado el usuario desconectado)
                    for (var i = 0; i < serverArray.length; i++) {
                        if(serverArray[i] !== message.username) {
                            aux.push(serverArray[i]);
                        }
                    }
                    
                    // Actualización de lista de mensajes
                    server.setListConnectedUsers(aux);

                    break;
            }
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
        var groundRWS = new WebSocket(ip + '/groundR');

        groundRWS.onopen = function() {
            var aux = server.getWSConnection();
            aux["ground"] = groundRWS;
            server.setWSConnection(aux);
        }
        
        groundRWS.onmessage = function(msg) {
            // Parser del mensaje enviado por parte del servidor
            var message = JSON.parse(msg.data);

            // Comprobación del código del mensaje
            switch (message.code) {
                // Caso: Error_MAXUSERS -> Se ha excedido el número máximo de usuarios de la sala
                case "Error_MAXUSERS":
                    server.setRoomStatusMessage("No se pudo conectar. Sala llena.");
                    break;
                // Caso: OK_ROOMCONN -> Se ha podido establecer la conexión con la sala
                case "OK_ROOMCONN":
                    server.setRoomStatusMessage("Se estableció conexión con la sala");
                    // Actualización de información del usuario
                    user.setOnlineRoom("ground");       // Sala en la que se encuentra
                    user.setIdInRoom(message.userID);   // ID del usuario en la sala
                    break;
                // Caso: OK_PLAYERJOIN / OK_GETPLAYERS -> Caso para cuando un jugador entra a la sala y pide información de todos los jugadores
                case "OK_PLAYERJOIN":
                case "OK_GETPLAYERS":
                    players[message.playerId].setType(message.playerType);
                    players[message.playerId].setName(message.playerName);
                    players[message.playerId].setReady(message.playerReady);
                    break;
                // Caso: OK_PLAYERDISC -> Caso para cuando un jugador se desconecta de la sala
                case "OK_PLAYERDISC":
                    players[message.playerId].reset(true);
                    break;
                // Caso: OK_PLAYERREADY -> Un jugador ha marcado que está listo para jugar la partida
                case "OK_PLAYERREADY":
                    players[message.playerId].setReady(message.playerReady);
                    break;
                // Caso: OK_STARTMATCH -> La partida ha comenzado
                case "OK_STARTMATCH":
                    server.connectToGroundMatch();
                    controller.setMatchPlayers(message.players);
                    break;
            }
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

        // Eliminación de la conexión en el diccionario
        this.getWSConnection()["ground"] = null;

        // Reset de las variables del jugador
        players[user.getIdInRoom()].reset(true);

        // Eliminación de la sala e ID del usuario
        user.setOnlineRoom("");
        user.setIdInRoom(-1);

        // Cierre de la conexión
        roomConnection.close();
    }

    /**
     * Conexión a la partida de tierra
     */
    connectToGroundMatch() {
        var groundMWS = new WebSocket(ip + '/groundM');

        groundMWS.onopen = function() {
            var aux = server.getWSConnection();
            aux["groundMatch"] = groundMWS;
            server.setWSConnection(aux);

            console.log("Partida iniciada.");
        }

        groundMWS.onmessage = function(msg) {
            // Parser del mensaje enviado por parte del servidor
            var message = JSON.parse(msg.data);

            // Comprobación del código del mensaje
            switch (message.code) {
                // Caso: OK_INITIALSTATE -> Caso para la comunicación del estado inicial
                case "OK_INITIALSTATE":
                    //
                    controller.setMatterPosX(message.matterX);
                    controller.setMatterPosY(message.matterY);
                    controller.setTimeRound(message.roundTime);
                    console.log(controller.getTimeRound());
                    break;
                // Caso: OK_PLAYERINFO -> Caso para la comunicación del estado del jugador
                case "OK_PLAYERINFO":
                    // Comprobación de la tecla pulsada
                    switch (message.updateKey) {
                        case "W":
                            players[message.userId].getObject().setVelocityY(-160);
                            players[message.userId].getObject().setVelocityX(0);
                            players[message.userId].getObject().anims.play(('upP' + message.userId), true);
                            break;
                        case "WM":
                            players[message.userId].getObject().setVelocityY(-160);
                            players[message.userId].getObject().setVelocityX(0);
                            players[message.userId].getObject().anims.play(('upP' + message.userId + 'Matter'), true);
                            break;
                        case "A":
                            players[message.userId].getObject().setVelocityX(-160);
                            players[message.userId].getObject().setVelocityY(0);
                            players[message.userId].getObject().anims.play(('leftP' + message.userId), true);
                            break;
                        case "AM":
                            players[message.userId].getObject().setVelocityX(-160);
                            players[message.userId].getObject().setVelocityY(0);
                            players[message.userId].getObject().anims.play(('leftP' + message.userId + 'Matter'), true);
                            break;
                        case "S":
                            players[message.userId].getObject().setVelocityY(160);
                            players[message.userId].getObject().setVelocityX(0);
                            players[message.userId].getObject().anims.play(('downP' + message.userId), true);
                            break;
                        case "SM":
                            players[message.userId].getObject().setVelocityY(160);
                            players[message.userId].getObject().setVelocityX(0);
                            players[message.userId].getObject().anims.play(('downP' + message.userId + 'Matter'), true);
                            break;
                        case "D":
                            players[message.userId].getObject().setVelocityX(160);
                            players[message.userId].getObject().setVelocityY(0);
                            players[message.userId].getObject().anims.play(('rightP' + message.userId), true);
                            break;
                        case "DM":
                            players[message.userId].getObject().setVelocityX(160);
                            players[message.userId].getObject().setVelocityY(0);
                            players[message.userId].getObject().anims.play(('rightP' + message.userId + 'Matter'), true);
                            break;
                        case "N":
                            players[message.userId].getObject().setVelocityX(0);
                            players[message.userId].getObject().setVelocityY(0);
                            players[message.userId].getObject().anims.play(('idleP' + message.userId), true);
                            break;
                        case "NM":
                            players[message.userId].getObject().setVelocityX(0);
                            players[message.userId].getObject().setVelocityY(0);
                            players[message.userId].getObject().anims.play(('idleP' + message.userId + 'Matter'), true);
                            break;
                        case "V":
                            controller.getmusicEffect1().play();
                            controller.getmusicEffect2().play();

                            players[message.userId].setHasMatter(true);
                            players[message.userVictim].setHasMatter(false);

                            players[message.userId].getObject().anims.play(('idleP' + message.userId + 'Matter'), true);
                            players[message.userVictim].getObject().anims.play(('idleP' + message.userId), true);
                            break;
                    }

                        // Normalización vectores
                        if(players[message.userId].getSand() == true){
                            players[message.userId].getObject().body.velocity.normalize().scale(80);
                        } else {
                            players[message.userId].getObject().body.velocity.normalize().scale(160);
                        }

                        break;
                // Caso: OK_POINTSINFO -> Caso para la comunicación de la puntuación del jugador 
                case "OK_POINTSINFO":
                    players[message.userId].setScore(players[message.userId].getScore() + 1);       
                    break;
                // Caso: OK_TAKEDM -> Caso para la comunicación de variación de la materia oscura
                case "OK_TAKEDM":
                    darkMatter.getObject().disableBody(true, true);
                    players[message.userTaken].setHasMatter(true);
                    controller.getmusicEffect1().play();
                    break;
                // Caso: OK_ROUNDSTATE -> Nueva ronda va a comenzar
                case "OK_ROUNDSTATE":
                    controller.setCurrentTimeRound(message.roundTime);
                    controller.setMatterPosX(message.matterX);
                    controller.setMatterPosY(message.matterY);
                    break;
                // Caso: OK_ROUNDSTATE -> Actualización del temporizador
                case "OK_TIMER":
                    controller.setCurrentTimeRound(message.timer);
                    console.log("Tiempo restante: " + controller.getCurrentTimeRound());
                    break;
                // Caso: OK_ROUNDSTATE -> Nueva ronda va a comenzar
                case "OK_ROUNDSTATE":
                    controller.setCurrentTimeRound(message.roundTime);
                    controller.setMatterPosX(message.matterX);
                    controller.setMatterPosY(message.matterY);
                    break;
            }
        }
    }

    /**
     * Método para desconectar de la sala y la partida de tierra
     */
    disconnectFromRoomAndMatch() {
        // Obtención de la conexión del diccionario de conexiones (en función de la sala conectada del usuario)
        var roomConnection;
        var matchConnection;
        switch (user.getOnlineRoom()) {
            // Cada caso es la clave de cada conexión en el diccionario
            case "ground":
                roomConnection = this.getWSConnection()["ground"];
                matchConnection = this.getWSConnection()["groundMatch"];
                break;
            default:
                break;
        }

        console.log("out");

        // Eliminación de la conexión en el diccionario
        this.getWSConnection()["ground"] = null;
        this.getWSConnection()["groundMatch"] = null;

        // Reset de las variables del jugador
        players[user.getIdInRoom()].reset(true);

        // Eliminación de la sala e ID del usuario
        user.setOnlineRoom("");
        user.setIdInRoom(-1);

        // Cierre de la conexión
        roomConnection.close();
        matchConnection.close();
    }
}

//////////////////////////////////////////////////////////////////////
//                       Inicialización de datos                    //
//////////////////////////////////////////////////////////////////////
var server = new ServerClass();

//////////////////////////////////////////////////////////////////////
//                            Exportación                           //
//////////////////////////////////////////////////////////////////////
export { server };