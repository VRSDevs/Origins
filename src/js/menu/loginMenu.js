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
var updateScene = 0;    // Variable de control para implementar HTML
var userAlreadyCreated = false;
//******************* Botones ************************//
var signupButton = undefined;
var loginButton = undefined;
var backButton = undefined;
//******************* Servidor ************************//
// Imágenes //
var userIc = undefined;
// Botones //
var syncButton = undefined;
// Texto //
var textServerConnected = "";
var textNumOfUsersConnected = "";
// Usuarios //
var userToUpdate = undefined;
var userToCreate = undefined;
var userToCheck = undefined;

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
                var usernameLog = this.getChildByName('usernameField');
                var passwordLog = this.getChildByName('passwordField');

                if (usernameLog.value !== '' && passwordLog.value !== '') {
                    switch (mode) {
                        // Registro del usuario //
                        case 1:
                            // Comprobación de existencia en la BD
                            //checkUser(usernameLog.value);

                            // Ejecucuión tras un período de tiempo
                            controller.getCurrentScene().time.addEvent({
                                delay: 20,
                                callback: () => {
                                    if (!userAlreadyCreated) {
                                        // Establecer conexion al servidor
                                        server.connectToChatService();
                                        server.connectToUserService();

                                        textModeLog.setText("Registro con éxito.");
                                        // Codificación de la contraseña introducida
                                        //var codifiedPassword = sha256(passwordLog.value);

                                        // Asignación en el usuario cliente
                                        user.setUsername(usernameLog.value);
                                        user.setPassword(passwordLog.value);
                                        user.setStatus(true);

                                        // Copia usuario auxiliar para subir a la BD
                                        userToCreate = {
                                            username: usernameLog.value,
                                            password: passwordLog.value,
                                            status: true,
                                        }

                                        // Post del usuario creado
                                        //postUser(userToCreate);
                                        userAlreadyCreated = true;

                                        // Post de mensaje de inicio de sesión
                                        var message = {
                                            name: "Server",
                                            message: user.getUsername() + " has connected.",
                                        }
                                        server.setLogPlayMenu(user.getUsername() + " has connected.");
                                        //server.messageToChatService(message);

                                        // Limpieza de datos
                                        usernameLog.value = '';
                                        passwordLog.value = '';
                                        userToCreate = undefined;

                                        // Carga de la siguiente escena
                                        loadScene();
                                    } else {
                                        textModeLog.setText("Error. El usuario introducido ya existe.");
                                    }
                                    // Limpieza de datos
                                    usernameLog.value = '';
                                    passwordLog.value = '';
                                    userToCreate = undefined;
                                    userAlreadyCreated = false;
                                },
                                callbackScope: this,
                                loop: false
                            });

                            break;

                        // Inicio de sesión del usuario
                        case 2:
                            // Obtención del usuario en la BD
                            checkUser(usernameLog.value);

                            controller.getCurrentScene().time.addEvent({
                                delay: 20,
                                callback: () => {
                                    // Comprobación con la BD //
                                    if (userToCheck !== undefined) {
                                        //var codedPasswordFromLog = sha256(passwordLog.value);
                                        // Coincidencia con la contraseña //
                                        if (userToCheck.password === passwordLog.value) {
                                            // Estado de conexión del usuario //
                                            if (userToCheck.status === false) {
                                                textModeLog.setText("Inicio de sesión con éxito.");
                                                //Inserción en usuario del cliente
                                                user.setUsername(usernameLog.value);
                                                user.setPassword(passwordLog.value);
                                                user.setStatus(true);

                                                // Actualización información de la BD
                                                userToUpdate = {
                                                    username: usernameLog.value,
                                                    password: passwordLog.value,
                                                    status: true,
                                                }
                                                //updateUser(userToUpdate);

                                                // Post de mensaje de inicio de sesión
                                                var message = {
                                                    username: "Server",
                                                    body: "Se conectó " + user.getUsername(),
                                                }
                                                postMessage(message);

                                                server.setLogPlayMenu(user.getUsername() + " has connected.");

                                                // Carga de la siguiente escena
                                                loadScene();
                                            } else {
                                                textModeLog.setText("Error. El usuario ya está conectado.");
                                                // Limpieza de datos
                                                userToCheck = undefined;
                                            }
                                        } else {
                                            textModeLog.setText("Error. La contraseña es incorrecta.");
                                        }
                                    } else {
                                        textModeLog.setText("Error. El usuario no existe.");
                                    }
                                    // Limpieza de datos
                                    userToUpdate = undefined;
                                    userToCheck = undefined;
                                    usernameLog.value = '';
                                    passwordLog.value = '';
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
            fontSize: 16,
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

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
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
    updateScene = 0;
    userToCheck = undefined;
    userAlreadyCreated = false;
    userToCreate = undefined;
    userToUpdate = undefined;
    userToCheck = undefined;
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