//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../../gameController.js';
import { players } from '../../cats.js';
import { darkMatter } from '../../darkmatter.js';
import { game } from '../../init.js';
import { user } from '../../server/user.js';
import { server } from '../../server/server.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 800;      // Ancho (px)
var height = 640;     // Alto (px)
//******************* Input teclado ************************//
var cursors = undefined;
var keys = undefined;
var sand;
//******************* Jugadores ************************//
// Texturas //
var playersSkin = [undefined, undefined, undefined, undefined];
// Iconos //
var playersFace = [undefined, undefined, undefined, undefined];
// Distancias entre jugadores //
var distancesX = [-1, -1, -1, -1];
var distancesY = [-1, -1, -1, -1];
var distanceBool = false;   // ¿Se están tocando los jugadores?
var canIdle = true;
var canIdleWithMatter = true;
var MAX_ROUNDS = controller.getMaxRounds();
//******************* Texto ************************//
// Final de ronda //
var textEndRound = "";
var textEndMatch = "";
// Puntuaciones //
var textPlayerPts = [undefined, undefined, undefined, undefined];
var textPlayerRds = [undefined, undefined,
                    undefined, undefined,
                    undefined, undefined,
                    undefined, undefined];
// Temporizador //
var timer = "";
//******************* Materia oscura ************************//
// ID jugador con materia antigua //
var victim = -1;
//******************* Auxiliares ************************//
// Jugador //
var auxPlayerPosX = [120, 700, 120, 700];
var auxPlayerPosY = [120, 80, 500, 500];
// HUD //
// Rectángulos
var auxHUDPosX = [90, width - 90, 90, width - 90];
var auxHUDPosY = [41, 41, height - 41, height - 41];
// Caras de los gatos
var auxCatFacePosX = [60, width - 120, 60, width - 120];
var auxCatFacePosY = [41, 41, height - 41, height - 41];
// Puntuaciones
var auxPlayerPtsPosX = [96, width - 84, 96 , width - 84];
var auxPlayerPtsPosY = [24, 24, height - 59, height - 59];
// Rondas ganadas
var auxPlayerRdsX = [44, 59,
                    670, 684,
                    44, 59,
                    670, 684];
var auxPlayerRdsY = [74, 74,
                    74, 74,
                    565, 565,
                    565, 565];
//******************* Temporizador ************************//
// Evento //
var tEvent = undefined;
// Tiempos //
var diffT = controller.getTimeRound();

//////////////////////////////////////////////////////////////////////
//                   Clase de escena del nivel de bosque            //
//////////////////////////////////////////////////////////////////////
class sceneGroundLevelOnline extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneGroundLevelOnline",
            active: false
        });
    }
    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Dimensiones del canvas ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height;
        
        //******************* Mapa ************************//
        var map = this.make.tilemap({ key: 'map2' });
        var tileset = map.addTilesetImage("Bosque", "tilesForest");
        // Capas //
        var belowLayer = map.createStaticLayer("Ground", tileset);
        var wallsLayer = map.createStaticLayer("Walls", tileset);
        var sandObjects = map.getObjectLayer('sandObj')['objects'];

        //******************* Materia oscura ************************//
        darkMatter.setObject(
            this.physics.add.image(
                controller.getMatterPosX(),
                controller.getMatterPosY(),
                "darkMatter"
            )
        );

        //******************* Personajes ************************//
        // Creación de personajes
        for (var i = 0; i < players.length; i++) {
            // Si el jugador actual no tiene tipo asignado, se pasa al siguiente
            if(players[i].getType() === 0) continue;
                
            // Asignación de la skin del personaje en función del tipo
            switch (players[i].getType()) {
                case 1:
                    playersSkin[i] = "GroundCat";
                    break;
                case 2:
                    playersSkin[i] = "WaterCat";
                    break;
                case 3:
                    playersSkin[i] = "AirCat";
                    break;
                case 4:
                    playersSkin[i] = "FireCat";
                    break;
            }

            // Creación y asignación de objeto al jugador actual
            players[i].setObject(
                this.physics.add.sprite(
                    auxPlayerPosX[i],
                    auxPlayerPosY[i],
                    (playersSkin[i] + 'Idle')
                )
            );

            // Generación de animaciones en función del jugador actual
            // Sin materia oscura
            this.anims.create({
                key: ('leftP' + i),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'Left'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('rightP' + i),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'Right'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('upP' + i),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'Up'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('downP' + i),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'Down'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('idleP' + i),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'Idle'), { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            // Con la materia oscura
            this.anims.create({
                key: ('leftP' + i + 'Matter'),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'LeftMatter'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('rightP' + i + 'Matter'),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'RightMatter'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('upP' + i + 'Matter'),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'UpMatter'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: ('downP' + i + 'Matter'),
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'DownMatter'), { start: 0, end: 4 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'idleP' + i + 'Matter',
                frames: this.anims.generateFrameNumbers((playersSkin[i] + 'IdleMatter'), { start: 0, end: 6 }),
                frameRate: 4,
                repeat: -1
            });

            // Comienzo de animación del personaje
            players[i].getObject().anims.play(('idleP' + i));
        }

        //******************* Detección por teclado ************************//
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A,W,S,D,V', false);

        //******************* Colisiones y arena ************************//
        sand = this.physics.add.staticGroup();
        sandObjects.forEach(object=>{
            var obj = sand.create(object.x,object.y);
            obj.setScale(object.width/40, object.height/40); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height; 
            obj.setVisible(false);
        });

        // Generación de colisión personaje - borde del mundo
        for (var i = 0; i < players.length; i++) {
            // Si el jugador no tiene un objeto asignado (slot vacío)
            if(players[i].getObject() === undefined) continue;
            // Activación de colisión
            players[i].getObject().setCollideWorldBounds(true);
        }

        // Generación de colisión personaje - personaje 
        for (var i = 0; i < players.length; i++) {
            // Si el jugador no tiene un objeto asignado (slot vacío)
            if(players[i].getObject() === undefined) continue;

            // Generación para el resto de jugadores
            for (var j = i + 1; j < players.length; j++) {
                // Si el jugador no tiene un objeto asignado (slot vacío)
                if(players[j].getObject() === undefined) continue;

                // Generación de la colisión entre personajes
                this.physics.add.collider(players[i].getObject(), players[j].getObject());
            }
        }

        // Generación de colisión personaje - muro 
        wallsLayer.setCollisionByProperty({ collides: true });
        for (var i = 0; i < players.length; i++) {
            // Si el jugador no tiene un objeto asignado (slot vacío)
            if(players[i].getObject() === undefined) continue;

            // Generación de la colisión con el muro
            this.physics.add.collider(wallsLayer, players[i].getObject());
            
        }

        // Generación de colisión personaje - materia oscura
        this.physics.add.overlap(players[user.getIdInRoom()].getObject(), darkMatter.getObject(), () => {
            sendTakeDM();
            darkMatter.getObject().disableBody(true, true);
            players[user.getIdInRoom()].setHasMatter(true);
            controller.getmusicEffect1().play();
        }, null, this);

        //******************* HUD ************************//
        for (var i = 0; i < players.length; i++) {
            // Creación rectángulo para HUD
            this.add.rectangle(
                auxHUDPosX[i], auxHUDPosY[i],
                125, 50,
                0x000000, 0.3
            );
            
            // Generación de cara en función del tipo seleccionado
            switch (players[i].getType()) {
                case 0:
                    playersFace[i] = this.add.image(auxCatFacePosX[i], auxCatFacePosY[i], "emptyFace");
                    break;
                case 1:
                    playersFace[i] = this.add.image(auxCatFacePosX[i], auxCatFacePosY[i], "GroundCatFace");
                    break;
                case 2:
                    playersFace[i] = this.add.image(auxCatFacePosX[i], auxCatFacePosY[i], "WaterCatFace");
                    break;
                case 3:
                    playersFace[i] = this.add.image(auxCatFacePosX[i], auxCatFacePosY[i], "AirCatFace");
                    break;
                case 4:
                    playersFace[i] = this.add.image(auxCatFacePosX[i], auxCatFacePosY[i], "FireCatFace");
                    break;
            }

            // Generación de texto de puntuación del jugador
            textPlayerPts[i] = this.add.text(
                auxPlayerPtsPosX[i],
                auxPlayerPtsPosY[i],
                "0",
                {
                    fontFamily: 'origins',
                    fontSize: '28px',
                    fill: '#ffffff'
                }
            );

            // Generación de imágenes de rondas ganadas
            textPlayerRds[i * 2 + 0] = this.add.image(
                auxPlayerRdsX[i * 2 + 0],
                auxPlayerRdsY[i * 2 + 0],
                "emptyRoundIcon"
            );
            textPlayerRds[i * 2 + 1] = this.add.image(
                auxPlayerRdsX[i * 2 + 1],
                auxPlayerRdsY[i * 2 + 1],
                "emptyRoundIcon"
            );
        }

        // Temporizador //
        this.add.rectangle(width / 2, 41, 100, 50, 0x000000, 0.3);
        var clock = this.physics.add.image((width / 2) - 35, 41, "clock");
        clock.scaleX = 1.7;
        clock.scaleY = 1.7;

        //******************* Temporizador ************************//
        // Texto //
        timer = this.add.text(width / 2 - 10, 20, controller.getTimeRound(), {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff',
        });
        // Evento de finalización de ronda //
        tEvent = this.time.delayedCall(controller.getTimeRound() * 1500, endRound, [], this).get;

        //******************* Música del nivel ************************//
        controller.getMusic().stop();
        controller.getMusicLevelForest().play();
        controller.getmusicEffect1(this.sound.add("musicEffect1"));
        controller.getmusicEffect2(this.sound.add("musicEffect2"));
        if(controller.getMusicEnabled() === false){
            controller.getMusic().stop();
            controller.getMusicLevelForest().stop();
        }

    }
    update(time, delta) {
        // Si se para la actualización continua de la escena
        if (!controller.getStopUpdateLevel()) {
            //******************* Temporizador ************************//
            timer.setText(controller.getCurrentTimeRound());

            //******************* Personaje ************************//
            // Si el jugador concreto no tiene la materia oscura
            if(!players[user.getIdInRoom()].getHasMatter()){
                // Detección de tecla pulsada
                switch (true) {
                    case keys.A.isDown:
                        // Envío de tecla pulsada
                        sendPlayerUpdate("A");

                        // Actualización de la información del jugador concreto
                        players[user.getIdInRoom()].getObject().setVelocityX(-160);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);

                        // Reproducción de animación concreta
                        players[user.getIdInRoom()].getObject().anims.play(('leftP' + user.getIdInRoom()), true);

                        // Actualización variable auxiliar para saturación de mensajes en IDLE
                        canIdle = true;                                        
                        break;
                    case keys.D.isDown:
                        // Envío de tecla pulsada
                        sendPlayerUpdate("D");

                        // Actualización de la información del jugador concreto
                        players[user.getIdInRoom()].getObject().setVelocityX(160);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);

                        // Reproducción de animación concreta
                        players[user.getIdInRoom()].getObject().anims.play(('rightP' + user.getIdInRoom()), true);

                        // Actualización variable auxiliar para saturación de mensajes en IDLE
                        canIdle = true;                        
                        break;
                    case keys.S.isDown:
                        // Envío de tecla pulsada
                        sendPlayerUpdate("S");

                        // Actualización de la información del jugador concreto
                        players[user.getIdInRoom()].getObject().setVelocityY(160);
                        players[user.getIdInRoom()].getObject().setVelocityX(0);

                        // Reproducción de animación concreta
                        players[user.getIdInRoom()].getObject().anims.play(('downP' + user.getIdInRoom()), true);

                        // Actualización variable auxiliar para saturación de mensajes en IDLE
                        canIdle = true;                       
                        break;
                    case keys.W.isDown:
                        // Envío de tecla pulsada
                        sendPlayerUpdate("W");

                        // Actualización de la información del jugador concreto
                        players[user.getIdInRoom()].getObject().setVelocityY(-160);
                        players[user.getIdInRoom()].getObject().setVelocityX(0);

                        // Reproducción de animación concreta
                        players[user.getIdInRoom()].getObject().anims.play(('upP' + user.getIdInRoom()), true);

                        // Actualización variable auxiliar para saturación de mensajes en IDLE
                        canIdle = true;                                           
                        break;
                    case keys.V.isDown:
                        // Si la distancia es mínima y el usuario no tiene la materia
                        if (distance() === true && !players[user.getIdInRoom()].getHasMatter()) {
                            // Envío de tecla pulsada
                            sendPlayerUpdate("V");

                            // Reproducción de efectos
                            controller.getmusicEffect1().play();
                            controller.getmusicEffect2().play();

                            // Actualización de información de materia oscura
                            players[user.getIdInRoom()].setHasMatter(true);
                            players[victim].setHasMatter(false);

                            // Reproducción de animaciones concretas
                            players[user.getIdInRoom()].getObject().anims.play(('idleP' + user.getIdInRoom() + 'Matter'), true);
                            players[victim].getObject().anims.play(('idleP' + victim), true);
                        }
                        break;
                    default:
                        // Si puede mandar el mensaje
                        if(canIdle){
                            sendPlayerUpdate("N");
                        }
                        
                        // Actualización de la información del jugador concreto
                        players[user.getIdInRoom()].getObject().setVelocityX(0);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);

                        // Reproducción de animación concreta
                        players[user.getIdInRoom()].getObject().anims.play(('idleP' + user.getIdInRoom()), true);

                        // Actualización variable auxiliar para saturación de mensajes en IDLE
                        canIdle = false;
                        break;
                } 
            } else {
                // Mismo caso que el anterior pero con la materia oscura
                switch (true) {
                    case keys.A.isDown:
                        sendPlayerUpdate("AM");
                        players[user.getIdInRoom()].getObject().setVelocityX(-160);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);
                        players[user.getIdInRoom()].getObject().anims.play(('leftP' + user.getIdInRoom() + 'Matter'), true);
                        canIdleWithMatter = true;   
                        break;
                    case keys.D.isDown:
                        sendPlayerUpdate("DM");
                        players[user.getIdInRoom()].getObject().setVelocityX(160);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);
                        players[user.getIdInRoom()].getObject().anims.play(('rightP' + user.getIdInRoom() + 'Matter'), true);
                        canIdleWithMatter = true;              
                        break;
                    case keys.S.isDown:
                        sendPlayerUpdate("SM");
                        players[user.getIdInRoom()].getObject().setVelocityY(160);
                        players[user.getIdInRoom()].getObject().setVelocityX(0);
                        players[user.getIdInRoom()].getObject().anims.play(('downP' + user.getIdInRoom() + 'Matter'), true);
                        canIdleWithMatter = true; 
                        break;
                    case keys.W.isDown:
                        players[user.getIdInRoom()].getObject().setVelocityY(-160);
                        players[user.getIdInRoom()].getObject().setVelocityX(0);
                        players[user.getIdInRoom()].getObject().anims.play(('upP' + user.getIdInRoom() + 'Matter'), true);
                        sendPlayerUpdate("WM");
                        canIdleWithMatter = true;                    
                        break;
                    default:
                        if(canIdleWithMatter) {
                            sendPlayerUpdate("NM");
                        }
                        players[user.getIdInRoom()].getObject().setVelocityX(0);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);
                        players[user.getIdInRoom()].getObject().anims.play(('idleP' + user.getIdInRoom() + 'Matter'), true);
                        canIdleWithMatter = false;
                        break;
                }
            }

            // Llamada al método para la actualización de los puntos de los jugadores
            updatePoints();

            // Llamada al método para la actualización de las rondas ganadas de los jugadores
            updateRounds();

            // Algoritmo para la detección de arena
            players[user.getIdInRoom()].setSand(false);
            this.physics.add.overlap(
                players[user.getIdInRoom()].getObject(),
                sand,
                () => {
                    players[user.getIdInRoom()].setSand(true);
                },
                null,
                this
            );
        }
    }
}
//////////////////////////////////////////////////////////////////////
//                   Funciones comunicación                         //
//////////////////////////////////////////////////////////////////////
/**
 * Envío de información del jugador
 * @param {String} key 
 */
function sendPlayerUpdate(key) {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["groundMatch"];

    // Generación del mensaje a enviar
    var message = {
        code: "OK_PLAYERINFO",
        userID: user.getIdInRoom(),
        userVictim: victim,
        updateKey: key
    }

    // Envío del mensaje
    wsConnection.send(JSON.stringify(message));
}

/**
 * Envío de información de las puntuaciones del jugador
 */
function sendPuntuationUpdate() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["groundMatch"];

    // Generación del mensaje a enviar
    var message = {
        code: "OK_POINTSINFO",
        userID: user.getIdInRoom(),
        updatedPoints: players[user.getIdInRoom()].getScore()
    }

    // Envío del mensaje
    wsConnection.send(JSON.stringify(message));
}

/**
 * Envío de información de posesión de la materia oscura
 */
function sendTakeDM() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["groundMatch"];

    // Generación del mensaje a enviar
    var message = {
        code: "OK_TAKEDM",
        userTaken: user.getIdInRoom(),
    }

    // Envío del mensaje
    wsConnection.send(JSON.stringify(message));
}

/**
 * Envío de información de fin de ronda
 */
function sendRoundFinished() {
    // Obtención de la conexión WS
    var wsConnection = server.getWSConnection()["groundMatch"];

    // Generación del mensaje a enviar
    var message = {
        code: "OK_ROUNDSTATE",
    }

    // Envío del mensaje
    wsConnection.send(JSON.stringify(message));
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
/**
 * Comprobación de puntuaciones de jugadores
 * @returns ID del jugador ganador o caso de empate
 */
function checkResults() {
    // Inicialización de variables
    var winner = -1;                // ID del jugador ganador (-1 = empate)
    var points = [0, 0, 0, 0];      // Array de puntuaciones
    var passedPlayers = 0;          // Número de jugadores superados

    // Inicialización de array de puntuaciones
    for (var i = 0; i < points.length; i++) {
        // Si el jugador actual no existe (slot vacío)
        if(players[i].getObject() === undefined) continue;

        // Asignación de puntuación
        points[i] = players[i].getScore();
    }

    // Comprobación de puntuaciones por cada jugador
    for (var i = 0; i < players.length; i++) {
        // Si el jugador actual no existe (slot vacío)
        if(players[i].getObject() === undefined) continue;
        
        // Comprobación con el resto de jugadores
        for (var j = 0; j < players.length; j++) {
            // Si las IDs coinciden
            if(j === i) continue;

            // Si la puntuación del primer jugador supera a la del segundo
            if(points[i] > points[j]) {
                passedPlayers++;
            }
        }

        // Si se han sobrepasado más de 3 jugadores
        if(passedPlayers >= 3) {
            // Asignación de la ID a la del ganador
            winner = i;
            // Rotura del flujo de ejecución
            break;
        } else {
            // Reset variable de jugadores superados
            passedPlayers = 0;
        }
    }

    // Devolución del valor de la ID del ganador
    return winner;
}

/**
 * Evento de final de ronda
 */
function endRound() {
    // Bloqueo de actualizaciones de la escena
    controller.setStopUpdateLevel(true);

    // LLamada a reinicio de variables de la escena
    sendRoundFinished();

    // Comprobación del ganador
    var winner = checkResults();

    switch (winner) {
        // En caso de empate
        case -1:
            // Generación de texto
            textEndRound = this.add.text(width + 100, height / 2, "Draw.", {
                fontFamily: 'origins',
                fontSize: '32px',
                fill: '#ffffff'
            });
            // Creación de animación del texto
            this.tweens.add({
                targets: textEndRound,
                x: width / 2 - 128,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
            });

            // Llamada al siguiente evento de forma retardada
            this.time.delayedCall(4200, endRound2, [], this);
            break;
        // En caso de que un jugadir haya ganado la partida
        case 0:
        case 1:
        case 2:
        case 3:
            // Actualización del número de rondas ganadas
            players[winner].setRoundsWon(players[winner].getRoundsWon() + 1);

            // Generación del texto del ganador
            textEndRound = this.add.text(width + 100, height / 2, players[winner].getName() + " won the round.", {
                fontFamily: 'origins',
                fontSize: '32px',
                fill: '#ffffff'
            });
            // Creación de animación del texto
            this.tweens.add({
                targets: textEndRound,
                x: width / 2 - 300,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
            });

            // Si el jugador no ha llegado al máximo de rondas
            if(players[winner].getRoundsWon() < MAX_ROUNDS) {
                // Llamada al siguiente evento de forma retardada
                this.time.delayedCall(4200, endRound2, [], this);
            } else {
                // Asignación del ganador en el controlador
                controller.setWinnerCat(winner);
                // Llamada al siguiente evento de forma retardada
                this.time.delayedCall(4200, endMatch, [], this);
            }
            
            break;
    }
}

/**
 * Segundo evento de final de ronda (reset de variables y restart de la escena)
 */
function endRound2() {
    // Reset de variables de los jugadores
    players.forEach(property => {
        property.setHasMatter(false);
        property.setSand(false);
        property.setScore(0);
    });

    // Actualización del bloqueo del update
    controller.setStopUpdateLevel(false);

    // Restart de la escena
    controller.getCurrentScene().scene.restart();
}

/**
 * Evento de final de partida
 */
function endMatch() {
    // Parada de la música de la escena
    controller.getMusicLevelForest().stop();

    // Parada de la escena actual
    controller.getCurrentScene().scene.sleep();

    // Reset de variables
    resetVariables();

    // Obtención de la siguiente escena
    var nextScene = game.scene.getScene("sceneEndGame");
    // Inicio de la sigueinte escena
    nextScene.scene.wake();
    nextScene.scene.restart();
}

/**
 * Función para calcular distancias entre gatos
 * @returns Si los jugadores se tocan o no
 */
function distance() {
    // Inicialización de variables
    var aux = false;            // Valor auxiliar de distancia (X)
    distanceBool = false;       // Si se encuentran en la distancia mínima
    victim = -1;                // ID de la víctima (usuario que es robado)

    // Por cada jugador de la lista de jugadores
    for (var i = 0; i < players.length; i++) {
        // Si el ID es el mismo o no existe jugador en ese slot
        if(i === user.getIdInRoom() || players[i].getObject() === undefined) continue;

        // Cálculo de distancias en X e Y
        distancesX[i] = players[user.getIdInRoom()].getObject().x - players[i].getObject().x;
        distancesY[i] = players[user.getIdInRoom()].getObject().y - players[i].getObject().y;
        
        // Si la distancia en X es próxima
        if (distancesX[i] >= -50 && distancesX[i] <= 50) {
            // Actualización de variable auxiliar
            aux = true;
            // Si la distancia en Y es próxima y se cumple en X
            if (aux == true && distancesY[i] >= -50 && distancesY[i] <= 50) {
                // Actualización de variable controladora
                distanceBool = true;
                // Asignación de la ID de la víctima
                victim = i;
            }
        }
    }

    // Retorno del valor de la variable controladora
    return distanceBool;
}

/**
 * Actualización de puntuaciones de jugadores
 */
function updatePoints() { 
    // Si el jugador del cliente tiene la materia
    if(players[user.getIdInRoom()].getHasMatter()) {
        // Actualización de puntuación del jugador
        players[user.getIdInRoom()].setScore(players[user.getIdInRoom()].getScore() + 1);

        // Envío de la información de la puntuación del jugador
        sendPuntuationUpdate();
    }

    // Por cada jugador
    for (var i = 0; i < players.length; i++) {
        // Actualización del texto de puntuación de jugadores
        textPlayerPts[i].setText(Math.trunc(players[i].getScore() / diffT));
    }    
}

/**
 * Función para actualizar el HUD de rondas ganadas
 */
function updateRounds() {
    for (var i = 0; i < players.length; i++) {
        // Si el jugador no tiene un objeto asignado (slot vacío) o no ha ganado ninguna partida
        if(players[i].getRoundsWon() === 0 || players[i].getObject() === undefined) continue;

        // Actualización del HUD de rondas
        textPlayerRds[i * 2 + (players[i].getRoundsWon() - 1)].setTexture("roundIcon");
    }
}

/**
 * Función para reestablecer las variables
 */
function resetVariables(){
    // Por cada jugador
    for (var i = 0; i < players.length; i++) {
        // Si el jugador no tiene un objeto asignado (slot vacío)
        if(players[i].getObject() === undefined) continue;

        // Reset animaciones
        controller.getCurrentScene().anims.remove('leftP' + i);
        controller.getCurrentScene().anims.remove('rightP' + i);
        controller.getCurrentScene().anims.remove('upP' + i);
        controller.getCurrentScene().anims.remove('downP' + i);
        controller.getCurrentScene().anims.remove('idleP' + i);
        controller.getCurrentScene().anims.remove('leftP' + i + 'Matter');
        controller.getCurrentScene().anims.remove('rightP' + i + 'Matter');
        controller.getCurrentScene().anims.remove('upP' + i + 'Matter');
        controller.getCurrentScene().anims.remove('downP' + i + 'Matter');
        controller.getCurrentScene().anims.remove('idleP' + i + 'Matter');    
    }
}

function setTimer(newTime){
    timer.setText(newTime);
}
//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneGroundLevelOnline;