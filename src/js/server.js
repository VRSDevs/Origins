//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Mensajes ************************//
var messagesFromDB = [];    // Array de almacenamiento de mensajes de la base de datos
var text = "";              // Texto para mostrar los mensajes

//////////////////////////////////////////////////////////////////////
//                   Clase de escena del servidor     s              //
//////////////////////////////////////////////////////////////////////
class sceneServer extends Phaser.Scene{
    constructor() {
        super({
            key: "sceneServer",
            active: false
        });
    }
    create() {
        //******************* Mensajes ************************//
        // Introducción de mensajes //
        // Código HTML para introducir mensajes
        var messagesHTML = this.add.dom(95,605).createFromCache('messagesCode').setOrigin(0);
        messagesHTML.setScale(0.5);
        messagesHTML.addListener('click');
        // Evento al hacer clic
        messagesHTML.on('click', function (event) {
            if(event.target.name === 'sendMessage') {
                //  Elemento HTML donde se introduce el texto
                var elementHTML = this.getChildByName('messageField');
                if(elementHTML !== '') {
                    // Objeto de mensaje
                    var message = {
                        username: "Antho",
                        body: elementHTML.value,
                    }

                    // Envío del mensaje al servidor y a la BD
                    postMessage(message);

                    // Limpieza del campo de texto
                    elementHTML.value = '';

                } else {
                    console.log("No hay escrito ningún mensaje!")
                }
            }
        });

        // Muestra de mensajes //
        // Variables auxiliares
        var xChat = 19;
        var yChat = 340;
        var wChat = 320;
        var hChat = 256;

        // Lienzo
        var graphics = this.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(xChat, yChat, wChat, hChat);

        // Fondo del texto
        this.add.rectangle(xChat, yChat, wChat, hChat, 0xffffff).setOrigin(0);

        // Máscara para ocultar
        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        // Texto contenedor de los mensajes
        text = this.add.text(xChat + 6, yChat + 130, messagesFromDB, { fontFamily: 'Consolas', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);
        text.setMask(mask);

        // Zona
        var zone = this.add.zone(xChat, yChat, wChat, hChat).setOrigin(0).setInteractive();
        zone.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                text.y += (pointer.velocity.y / 10);
                text.y = Phaser.Math.Clamp(text.y, -300, 400);
            }
        });
    }

    update() {
        //******************* Actualización de mensajes mostrados ************************//
        loadMessagesFromDB();
        text.setText(messagesFromDB);
    }
}

//////////////////////////////////////////////////////////////////////
//                      Funciones HTTP                              //
//////////////////////////////////////////////////////////////////////
//******************* Mensajes ************************//
// Carga de mensajes de la base de datos y servidor //
function loadMessagesFromDB() {
    $.ajax({
        url: 'http://localhost:8080/messages'
    }).done(function (messages) {
        for (let i = 0; i < messages.length; i++) {
            messagesFromDB[i] = "<" + messages[i].username + "> " + messages[i].body;
        }
    })
}

// Envío de mensaje al servidor y a la BD //
function postMessage(message) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/messages',
        data: JSON.stringify(message),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        console.log("Item created: " + JSON.stringify(item));
    })
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
function updateListOfMessages() {
    
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneServer;