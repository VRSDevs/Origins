//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { user } from '../server/user.js';
import {controller} from '../gameController.js';
import { game } from '../init.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Elementos HTML ************************//
var loginHTML = undefined;

//******************* Control ************************//
var mode = 0;           // Opción de menú
var updateScene = 0;    // Variable de control para implementar HTML
var foundUser = false;
//******************* Botones ************************//
var signupButton = undefined;
var loginButton = undefined;

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

        this.add.image(400, 320, "loginMenu");

        loginHTML = this.add.dom(400, 200).createFromCache('loginCode').setVisible(false);

        //******************* Botones de acceso ************************//
        // Registro //
        signupButton = this.add.sprite(400, 300, "spriteSUButton", 0).setInteractive();
        this.anims.create({
            key: 'SUButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteSUButton', {start: 1, end: 6}),
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
            updateScene = 1;
            loginHTML.setVisible(true);
            signupButton.setVisible(false);
            loginButton.setVisible(false);
            loginButton.removeAllListeners();
            signupButton.removeAllListeners();
        }, this);

        // Inicio de sesión //
        loginButton = this.add.sprite(400, 400, "spriteLIButton", 0).setInteractive();
        this.anims.create({
            key: 'LIButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteLIButton', {start: 1, end: 6}),
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
            updateScene = 2;
            loginHTML.setVisible(true);
            loginButton.setVisible(false);
            signupButton.setVisible(false);
            signupButton.removeAllListeners();
            loginButton.removeAllListeners();
        }, this);
    }

    update() {
        if(updateScene !== 0) {
            mode = updateScene;
            updatingScene();
            updateScene = 0;
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                      Funciones HTTP                              //
//////////////////////////////////////////////////////////////////////
function checkUser(user) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/users/checkUser',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (value) {
        foundUser = value;
    })
}

function postUser(user) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        console.log("Item created: " + JSON.stringify(item));
    })
}

function updateUser(user) {
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/users/' + user.username,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        console.log("Robertín esta palote");
    })
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//
function updatingScene() {
    loginHTML.addListener('click');
    loginHTML.on('click', function(event) {
        if(event.target.name === 'loginButton') {
            var usernameLog = this.getChildByName('usernameField');
            var passwordLog = this.getChildByName('passwordField');

            if(usernameLog.value !== '' && passwordLog.value !== '') {
                switch (mode) {
                    case 1:
                        var codifiedPassword = sha256(passwordLog.value);

                        user.setUsername(usernameLog.value);
                        user.setPassword(codifiedPassword);
                        user.setStatus(true);

                        var userToCreate = {
                            username: user.getUsername(),
                            password: codifiedPassword,
                            status: false,
                        }

                        //
                        postUser(userToCreate);

                        //
                        usernameLog.value = '';
                        passwordLog.value = '';

                        loadScene();
                        break;
                
                    case 2:
                        var codifiedPassword = sha256(passwordLog.value);

                        user.setUsername(usernameLog.value);
                        user.setPassword(codifiedPassword);

                        var userToCheck = {
                            username: user.getUsername(),
                            password: codifiedPassword,
                            status: true,
                        }

                        checkUser(userToCheck);

                        if(foundUser){
                            console.log("Lets go!");
                            updateUser(userToCheck);
                            usernameLog.value = '';
                            passwordLog.value = '';
                            loadScene();
                        } else {
                            console.log("WTF");
                        }

                        foundUser = false;
                        break;
                }
            }
        }
    });
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
function loadScene() {
    controller.getCurrentScene().scene.stop();
    var nextScene = game.scene.getScene("sceneMainMenu");
    nextScene.scene.start();
    
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneLoginMenu;