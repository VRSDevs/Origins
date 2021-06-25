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
//******************* Texto ************************//
// Final de ronda //
var textEndRound = "";
var textEndMatch = "";
// Puntuaciones //
var textPlayerPts = [undefined, undefined, undefined, undefined];
// Jugador 1 //
var textRndsP1 = "";
// Jugador 2 //
var textRndsP2 = "";
// Jugador 1 //
var textRndsP3 = "";
// Jugador 2 //
var textRndsP4 = "";
// Temporizador //
var timer = "";
//******************* Materia oscura ************************//
// Posiciones //
var darkMatterPosX = 0;
var darkMatterPosY = 0;
// Objeto //
//var darkMatter = undefined;
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
//******************* Temporizador ************************//
// Evento //
var tEvent = undefined;
// Tiempos //
var t = controller.getTimeRound();
var oldT = 0;
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

        // **************** Mapa de fuego *******************//
        //var map = this.make.tilemap({ key: 'fireMap' });
        //var tileset = map.addTilesetImage("fire", "tilesFire");

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
            darkMatter.getObject().disableBody(true, true);
            players[user.getIdInRoom()].setHasMatter(true);
            controller.getmusicEffect1().play();
        }, null, this);

        /* 
        for (var i = 0; i < players.length; i++) {
            // Si el jugador no tiene un objeto asignado (slot vacío)
            if(players[i].getObject() === undefined) continue;

            console.log("Gato " + i + ": " + players[i].getObject())

            // Generación de colisión
            this.physics.add.overlap(players[i].getObject(), darkMatter, () => {
                darkMatter.disableBody(true, true);
                players[i].setHasMatter(true);
                controller.getmusicEffect1().play();
            }, null, this);
            
        }*/

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
        }

        // Temporizador //
        this.add.rectangle(width / 2, 41, 100, 50, 0x000000, 0.3);
        var clock = this.physics.add.image((width / 2) - 35, 41, "clock");
        clock.scaleX = 1.7;
        clock.scaleY = 1.7;

        //******************* Temporizador ************************//
        // Texto //
        timer = this.add.text(width / 2 - 10, 20, "time", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff',
        });
        // Evento de finalización de ronda //
        tEvent = this.time.delayedCall(controller.getTimeRound() * 1000, endRound, [], this);

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
        // Primero comprobar cual es el usuario en el vector de players, despues hacer que se actualice solo su gato con las teclas
        // el resto de gatos se actualiza mediante mensajes del ws.

        // No actualizar solo puntos a ver
        if (!controller.getStopUpdateLevel()) {
            //******************* Temporizador ************************//
            t = t - (tEvent.getProgress() - oldT) * diffT;
            timer.setText(Math.trunc(t));
            oldT = tEvent.getProgress();

            //******************* Personaje ************************//
            //
            if(!players[user.getIdInRoom()].getHasMatter()){
                //
                switch (true) {
                    case keys.A.isDown:
                            sendPlayerUpdate("A");
                            canIdle = true;                                        
                        break;
                    case keys.D.isDown:
                            sendPlayerUpdate("D");
                            canIdle = true;                        
                        break;
                    case keys.S.isDown:
                            sendPlayerUpdate("S");
                            canIdle = true;                       
                        break;
                    case keys.W.isDown:
                            sendPlayerUpdate("W");
                            canIdle = true;                                           
                        break;
                    case keys.V.isDown:
                        if (distance() === true) {
                            controller.getmusicEffect1().play();
                            controller.getmusicEffect2().play();
                            players[user.getIdInRoom()].setHasMatter(true);
                            players[victim].setHasMatter(false);
                        }
                        break;
                    default:
                        if(canIdle){
                            sendPlayerUpdate("N");
                            canIdle = false;
                        }
                        break;
                }
                
            } else {
                switch (true) {
                    case keys.A.isDown:
                            players[user.getIdInRoom()].getObject().setVelocityX(-160);
                            players[user.getIdInRoom()].getObject().anims.play('leftP' + user.getIdInRoom() + 'Matter', true);
                        break;
                    case keys.D.isDown:
                            players[user.getIdInRoom()].getObject().setVelocityX(160);
                            players[user.getIdInRoom()].getObject().anims.play('rightP' + user.getIdInRoom() + 'Matter', true);             
                        break;
                    case keys.S.isDown:
                            players[user.getIdInRoom()].getObject().setVelocityY(160);
                            players[user.getIdInRoom()].getObject().anims.play('downP' + user.getIdInRoom() + 'Matter', true);
                        
                        break;
                    case keys.W.isDown:
                            players[user.getIdInRoom()].getObject().setVelocityY(-160);
                            players[user.getIdInRoom()].getObject().anims.play('upP' + user.getIdInRoom() + 'Matter', true);                     
                        break;
                    default:
                        players[user.getIdInRoom()].getObject().setVelocityX(0);
                        players[user.getIdInRoom()].getObject().setVelocityY(0);
                        players[user.getIdInRoom()].getObject().anims.play('idleP' + user.getIdInRoom() + 'Matter', true);
                        break;
                }
            }

            //Normalizar vectores
            // if(players[user.getIdInRoom()].getSand() == true){
            //     players[user.getIdInRoom()].getObject().body.velocity.normalize().scale(80);
            // } else {
            //     players[user.getIdInRoom()].getObject().body.velocity.normalize().scale(160);
            // }

            //
            updatePoints();

            //
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
 * 
 * @param {String} key 
 */
function sendPlayerUpdate(key) {
    //
    var wsConnection = server.getWSConnection()["groundMatch"];

    //
    var message = {
        code: "OK_PLAYERINFO",
        userID: user.getIdInRoom(),
        updateKey: key
    }

    //
    wsConnection.send(JSON.stringify(message));
}

function sendPuntuationUpdate() {
    //
    var wsConnection = server.getWSConnection()["groundMatch"];

    //
    var message = {
        code: "OK_POINTSINFO",
        userID: user.getIdInRoom(),
        updatedPoints: players[user.getIdInRoom()].getScore()
    }

    //
    wsConnection.send(JSON.stringify(message));
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Evento final de ronda ************************//
function endRound() {
    controller.setStopUpdateLevel(true);
    if (players[0].getScore() < players[1].getScore()) {
        players[1].setRoundsWon(players[1].getRoundsWon() + 1);
        if (players[1].getRoundsWon() < 2) {
            textEndRound = this.add.text(width + 100, height / 2, "Player 2 won the round.", {
                fontFamily: 'origins',
                fontSize: '32px',
                fill: '#ffffff'
            });
            this.tweens.add({
                targets: textEndRound,
                x: width / 2 - 300,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
            });
            this.time.delayedCall(4200, endRound2, [], this);
        } else {
            textEndMatch = this.add.text(width + 100, height / 2, "Player 2 won the round.", {
                fontFamily: 'origins',
                fontSize: '32px',
                fill: '#ffffff'
            });
            this.tweens.add({
                targets: textEndMatch,
                x: width / 2 - 300,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
            });
            this.time.delayedCall(4200, endMatch, [], this);
        }
    } else if (players[0].getScore() > players[1].getScore()) {
        players[0].setRoundsWon(players[0].getRoundsWon() + 1);
        if (players[0].getRoundsWon() < 2) {
            textEndRound = this.add.text(width + 100, height / 2, "Player 1 won the round.", {
                fontFamily: 'origins',
                fontSize: '32px',
                fill: '#ffffff'
            });
            this.tweens.add({
                targets: textEndRound,
                x: width / 2 - 300,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
            });
            this.time.delayedCall(4200, endRound2, [], this);
        } else {
            textEndMatch = this.add.text(width + 100, height / 2, "Player 1 won the round.", {
                fontFamily: 'origins',
                fontSize: '32px',
                fill: '#ffffff'
            });
            this.tweens.add({
                targets: textEndMatch,
                x: width / 2 - 300,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
            });
            this.time.delayedCall(4200, endMatch, [], this);
        } 

    } else {
        textEndRound = this.add.text(width + 100, height / 2, "Draw.", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff'
        });
        this.tweens.add({
            targets: textEndRound,
            x: width / 2 - 128,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
        });
        this.time.delayedCall(4200, endRound2, [], this);
    }
}

function endRound2() {
    players.forEach(property => {
        property.setHasMatter(false);
        property.setSand(false);
        property.setScore(0);
    });
    controller.setStopUpdateLevel(false);
    controller.getCurrentScene().scene.restart();
}

function endMatch() {
    controller.getCurrentScene().scene.sleep();
    resetVariables();
    var nextScene = game.scene.getScene("sceneEndGame");
    nextScene.scene.wake();
    nextScene.scene.restart();
    controller.getMusicLevelForest().stop();
}

//******************  Calcular distancia entre gatos ****************//
function distance() {
    //
    var aux = false;
    distanceBool = false;
    victim = -1;

    //
    for (var i = 0; i < array.length; i++) {
        //
        if(i === user.getIdInRoom() || players[i].getObject() === undefined) continue;

        //
        distancesX[i] = players[user.getIdInRoom()].getObject().x - players[i].getObject().x;
        distancesY[i] = players[user.getIdInRoom()].getObject().y - players[i].getObject().y;
        
        //
        if (distancesX[i] >= -50 && distancesX[i] <= 50) {
            aux = true;
            //
            if (aux == true && distancesY[i] >= -50 && distancesY[i] <= 50) {
                //
                distanceBool = true;
                victim = i;
            }
        }

    }

    //
    return distanceBool;
}

//******************  Actualización puntuación de jugadores ****************//
function updatePoints() { 

    for (var i = 0; i < players.length; i++) {
        //
        if(players[i].getObject() === undefined) continue;
        
        //
        if(players[i].getHasMatter()) {
            //
            players[i].setScore(players[i].getScore() + 1);

            //
            sendPuntuationUpdate();
        }
    }

        //
        textPlayerPts[i].setText(Math.trunc(players[i].getScore() / diffT));
    }

//******************* Reseteo de variables ************************//
function resetVariables(){
    // Reseteo de animaciones //
    // Jugador 1
    controller.getCurrentScene().anims.remove('leftP1');
    controller.getCurrentScene().anims.remove('rightP1');
    controller.getCurrentScene().anims.remove('upP1');
    controller.getCurrentScene().anims.remove('downP1');
    controller.getCurrentScene().anims.remove('idleP1');
    controller.getCurrentScene().anims.remove('leftP1Matter');
    controller.getCurrentScene().anims.remove('rightP1Matter');
    controller.getCurrentScene().anims.remove('upP1Matter');
    controller.getCurrentScene().anims.remove('downP1Matter');
    controller.getCurrentScene().anims.remove('idleP1Matter');
    // Jugador 2
    controller.getCurrentScene().anims.remove('leftP2');
    controller.getCurrentScene().anims.remove('rightP2');
    controller.getCurrentScene().anims.remove('upP2');
    controller.getCurrentScene().anims.remove('downP2');
    controller.getCurrentScene().anims.remove('idleP2');
    controller.getCurrentScene().anims.remove('leftP2Matter');
    controller.getCurrentScene().anims.remove('rightP2Matter');
    controller.getCurrentScene().anims.remove('upP2Matter');
    controller.getCurrentScene().anims.remove('downP2Matter');
    controller.getCurrentScene().anims.remove('idleP2Matter');
    // Jugador 3
    controller.getCurrentScene().anims.remove('leftP3');
    controller.getCurrentScene().anims.remove('rightP3');
    controller.getCurrentScene().anims.remove('upP3');
    controller.getCurrentScene().anims.remove('downP3');
    controller.getCurrentScene().anims.remove('idleP3');
    controller.getCurrentScene().anims.remove('leftP3Matter');
    controller.getCurrentScene().anims.remove('rightP3Matter');
    controller.getCurrentScene().anims.remove('upP3Matter');
    controller.getCurrentScene().anims.remove('downP3Matter');
    controller.getCurrentScene().anims.remove('idleP3Matter');
    // Jugador 4
    controller.getCurrentScene().anims.remove('leftP4');
    controller.getCurrentScene().anims.remove('rightP4');
    controller.getCurrentScene().anims.remove('upP4');
    controller.getCurrentScene().anims.remove('downP4');
    controller.getCurrentScene().anims.remove('idleP4');
    controller.getCurrentScene().anims.remove('leftP4Matter');
    controller.getCurrentScene().anims.remove('rightP4Matter');
    controller.getCurrentScene().anims.remove('upP4Matter');
    controller.getCurrentScene().anims.remove('downP4Matter');
    controller.getCurrentScene().anims.remove('idleP4Matter');
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneGroundLevelOnline;