//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { user } from '../server/user.js';
import { server } from '../server/server.js';
import { controller } from '../gameController.js';
import { game } from '../init.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Fondos ************************//
var descRectangle = undefined;
//******************* Elementos HTML ************************//
var loginHTML = undefined;
var textMode = undefined;
var textModeLog = undefined;
//******************* Control ************************//
var mode = 0;           // Opción de menú
//******************* Botones ************************//
var signupButton = undefined;
var loginButton = undefined;
var backButton = undefined;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú de logueo              //
//////////////////////////////////////////////////////////////////////
class sceneLoginMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneLoginMenu",
        })
    }

    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;

        //******************* Imágenes ************************// 
        // Fondo //
        this.add.image(400, 320, "loginMenu");
        descRectangle = controller.getCurrentScene().add.image(400,500, "login").setVisible(false);

        // Asignación HTML en Canvas //
        loginHTML = this.add.dom(width / 2, (height / 2) + 40).createFromCache('loginCode').setVisible(false);
        loginHTML.addListener('click');
        loginHTML.on('click', function (event) {
            if (event.target.name === 'loginButton') {
                // Establecer conexion al servidor
                server.connectToChatService();
                server.connectToUserService();

                // Obtención valores de los campos HTML
                var usernameLog = this.getChildByName('usernameField');
                var passwordLog = this.getChildByName('passwordField');

                if (usernameLog.value !== '' && passwordLog.value !== '') {
                    switch (mode) {
                        // Registro del usuario //
                        case 1:
                            // Codificación de la contraseña introducida
                            //var codifiedPassword = sha256(passwordLog.value);

                            // Comprobación de existencia en la BD
                            controller.getCurrentScene().time.delayedCall(
                                1000,
                                checkUser,
                                [usernameLog.value, "", "register"],
                                this
                            );

                            textModeLog.setText("Estableciendo conexión...");

                            // Ejecucuión tras un período de tiempo
                            controller.getCurrentScene().time.addEvent({
                                delay: 2000,
                                callback: () => {
                                    switch (server.getCanLogIn()) {
                                        // Caso: 2 -> Se pudo realizar el registro
                                        case 2:
                                            textModeLog.setText("Conectado.");

                                            // Asignación en el usuario cliente
                                            user.setUsername(usernameLog.value);
                                            user.setPassword(passwordLog.value);
                                            user.setStatus(true); 

                                            // Envío de la información del usuario conectado a la BD
                                            controller.getCurrentScene().time.delayedCall(
                                                500,
                                                getInfoFromBD,
                                                [],
                                                this
                                            );

                                            // Obtención de toda la información de la BD
                                            controller.getCurrentScene().time.delayedCall(
                                                1000,
                                                sendUserConnectedMsgs,
                                                ["register"],
                                                this
                                            );                              

                                            // Post de mensaje de inicio de sesión
                                            var message = {
                                                name: "Server",
                                                message: user.getUsername() + " has connected.",
                                            }
                                            server.setLogPlayMenu(user.getUsername() + " has connected.");
                                            //server.messageToChatService(message);

                                            // Carga de la siguiente escena
                                            controller.getCurrentScene().time.delayedCall(
                                                1500,
                                                loadScene,
                                                [],
                                                this
                                            );  
                                            
                                            break;
                                        // Caso: 0 -> El jugador intenta iniciar la conexión en una cuenta no existente
                                        case 0:
                                            textModeLog.setText("Error. El usuario introducido ya existe.");

                                            // Desconexión del servidor
                                            server.disconnect();

                                            break;
                                    }
                                    // Limpieza de datos
                                    usernameLog.value = '';
                                    passwordLog.value = '';                            
                                },
                                callbackScope: this,
                                loop: false
                            });

                            break;

                        // Inicio de sesión del usuario
                        case 2:
                            // Comprobación de existencia en la BD
                            controller.getCurrentScene().time.delayedCall(
                                1000,
                                checkUser,
                                [usernameLog.value, passwordLog.value, "login"],
                                this
                            );

                            textModeLog.setText("Estableciendo conexión...");

                            controller.getCurrentScene().time.addEvent({
                                delay: 2000,
                                callback: () => {
                                    // Comprobación con la BD //
                                    switch (server.getCanLogIn()) {
                                        // Caso: 2 -> Se pudo iniciar la sesión
                                        case 2:
                                            //var codedPasswordFromLog = sha256(passwordLog.value);

                                            // Estado de conexión del usuario //
                                            textModeLog.setText("Conectado.");

                                            // Obtención de toda la información de la BD
                                            controller.getCurrentScene().time.delayedCall(
                                                500,
                                                getInfoFromBD,
                                                [],
                                                this
                                            );

                                            //Inserción en usuario del cliente
                                            user.setUsername(usernameLog.value);
                                            user.setPassword(passwordLog.value);
                                            user.setStatus(true);

                                            // Envío de la información del usuario conectado a la BD
                                            controller.getCurrentScene().time.delayedCall(
                                                1000,
                                                sendUserConnectedMsgs,
                                                ["login"],
                                                this
                                            );

                                            server.setLogPlayMenu(user.getUsername() + " has connected.");

                                            // Carga de la siguiente escena
                                            controller.getCurrentScene().time.delayedCall(
                                                1500,
                                                loadScene,
                                                [],
                                                this
                                            );

                                            break;
                                        // Caso: 1 -> El jugador intenta conectarse a una cuenta ya conectada
                                        case 1:
                                            textModeLog.setText("Error. El usuario está conectado.");

                                            // Desconexión del servidor
                                            server.disconnect();

                                            break;
                                        // Caso: 0 -> El jugador intenta iniciar la conexión en una cuenta no existente
                                        case 0:
                                            textModeLog.setText("Error. El usuario no existe.");

                                            // Desconexión del servidor
                                            server.disconnect();

                                            break;
                                    }
                                    // Limpieza de datos
                                    usernameLog.value = '';
                                    passwordLog.value = '';
                                    server.setCanLogIn(0);
                                },
                                callbackScope: this,
                                loop: false
                            });
                            break;
                    }
                }
            }
        });

        //******************* Textos ************************//
        // Modo //
        textMode = this.add.text(320, 210, "", {
            fontFamily: 'Origins',
            fontSize: 28,
            color: '#ffffff',
        });

        // Log de registro / inicio de sesión //
        textModeLog = this.add.text(210, 490, "", {
            fontFamily: 'Origins',
            fontSize: 14,
            color: '#056005',
        });

        //******************* Botones de acceso ************************//
        // Registro //
        signupButton = this.add.sprite(400, 300, "spriteSUButton", 0).setInteractive();
        this.anims.create({
            key: 'SUButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteSUButton', { start: 1, end: 6 }),
            frameRate: 6,
            repeat: 0
        });

        signupButton.addListener('pointerover', () => {
            signupButton.anims.play('SUButtonAnim', true);
        }, this);
        signupButton.addListener('pointerout', () => {
            signupButton.anims.stop();
            signupButton.setFrame(0);
        }, this);
        signupButton.addListener('pointerdown', () => {
            mode = 1;
            textMode.setText("Register");
            loginHTML.setVisible(true);
            descRectangle.setVisible(true);
            signupButton.setVisible(false);
            loginButton.setVisible(false);
            backButton.setVisible(true);
        }, this);

        // Inicio de sesión //
        loginButton = this.add.sprite(400, 400, "spriteLIButton", 0).setInteractive();
        this.anims.create({
            key: 'LIButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteLIButton', { start: 1, end: 6 }),
            frameRate: 6,
            repeat: 0
        })

        loginButton.addListener('pointerover', () => {
            loginButton.anims.play('LIButtonAnim', true);
        }, this);
        loginButton.addListener('pointerout', () => {
            loginButton.anims.stop();
            loginButton.setFrame(0);
        }, this);
        loginButton.addListener('pointerdown', () => {
            mode = 2;
            textMode.setText("Log in");
            loginHTML.setVisible(true);
            descRectangle.setVisible(true);
            loginButton.setVisible(false);
            signupButton.setVisible(false);
            backButton.setVisible(true);
        }, this);

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 0).setInteractive();
        backButton.setVisible(false);
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton2', { start: 1, end: 4 }),
            frameRate: 6,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            backButton.anims.play('backButtonAnim', true);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', goBack, this);
    }

    update() {
    }
}

//////////////////////////////////////////////////////////////////////
//                 Funciones Comunicaciones                         //
//////////////////////////////////////////////////////////////////////
// Funciones de mensajes //
/**
 * Función para obtener a todos los usuarios conectados
 */
function getMessagesFromDB() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["chat"];

    // Generación del mensaje
    var message = {
        code: "OK_GETMESSAGES"
    }

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

// Funciones de usuarios //
/**
 * Función para obtener la lista de todos los usuarios conectados
 */
function getListOfConnectedUsers() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["user"];

    // Generación del mensaje
    var message = {
        code: "OK_GETLISTUSERS"
    }

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

/**
 * Función para notificar la conexión de un nuevo usuario
 */
function sendConnectedNewUser() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["user"];

    // Generación del mensaje
    var message = {
        code: "OK_CONNECTEDNEWUSER",
        username: user.getUsername(),
        password: user.getPassword(),
        status: user.isStatus()
    }

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

/**
 * Función para notificar la conexión de un usuario
 */
 function sendConnectedUser() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["user"];

    // Generación del mensaje
    var message = {
        code: "OK_CONNECTEDUSER",
        username: user.getUsername(),
        password: user.getPassword(),
        status: user.isStatus()
    }

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

/**
 * Función para notificar la conexión de un usuario (mensaje del servidor)
 */
function sendConnectedUserServer() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["chat"];

    // Generación del mensaje
    var message = {
        code: "OK_SENDMESSAGE",
        name: "Server",
        message: user.getUsername() + " has connected",
    }

    // Construcción del mensaje a insertar en el array
    var messageToAdd = "<" + message.name + "> " + message.message;
    // Inserción en la lista de mensajes de la BD
    server.getMessagesFromDB().push(messageToAdd);

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

/**
 * Función para comprobar si el usuario introducido existe en la base de datos
 * @param {String} key Clave según el modo seleccionado en el menú
 */
function checkUser(username, password, key) {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["user"];

    // Generación del mensaje
    var message;
    switch (key) {
        // Caso: register -> El usuario quiere registrarse
        case "register":
            textModeLog.setText("Registrando usuario...");

            message = {
                code: "OK_CHECKREGISTER",
                username: username,
            }

            break;
        // Caso: login -> El usuario quiere iniciar la sesión
        case "login":
            textModeLog.setText("Iniciando sesión...");

            message = {
                code: "OK_CHECKLOG",
                username: username,
                password: password
            }

            break;
    }

    // Envío del mensaje al servidor
    wsConnection.send(JSON.stringify(message));
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
/**
 * Función para obtener toda la información de la BD
 */
function getInfoFromBD() {
    textModeLog.setText("Obteniendo información...");

    getMessagesFromDB();
    getListOfConnectedUsers();
}

/**
 * Función para enviar la información de conexión de un usuario nuevo
 */
function sendUserConnectedMsgs(key) {
    // Llamada a métodos de comunicación
    switch (key) {
        // Caso: register -> El usuario se ha registrado
        case "register":
            sendConnectedNewUser();
            break;
        // Caso: login -> El usuario ha iniciado la sesión
        case "login":
            sendConnectedUser();
            break;
    }
    
    sendConnectedUserServer();
}

/**
 * Función ejecutada cuando se cancela el inicio de sesión
 */
function goBack() {
    mode = 0;
    textMode.setText("");
    textModeLog.setText("");
    loginHTML.setVisible(false);
    descRectangle.setVisible(false);
    loginButton.setVisible(true);
    signupButton.setVisible(true);
    backButton.setVisible(false);
}

/**
 * Función para reestablecer las variables empleadas
 */
function resetVariables() {
    mode = 0;
    server.setCanLogIn(0);
}

/**
 * Función para cargar la siguiente escena
 */
function loadScene() {
    // Reset de variables
    resetVariables();

    // Cambio de escena
    controller.getCurrentScene().scene.stop();
    var nextScene = game.scene.getScene("sceneMainMenu");
    nextScene.scene.start();
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneLoginMenu;