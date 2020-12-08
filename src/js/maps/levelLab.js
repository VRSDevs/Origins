//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { players } from '../cats.js';
import { game } from '../init.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Input teclado ************************//
var cursors;
var keys;
//******************* Jugadores ************************//
var distanceX
var distanceY
var distanceBool = false;
var textPtsP1;
var textPtsP2;
//******************* Materia oscura ************************//
var darkMatterPosX;
var darkMatterPosY;
var darkMatter;
//******************* Temporizador ************************//
var timer;
var t;
var oldT = 0;
var diffT = controller.getTimeRound();
//******************* Auxiliares ************************//
var stopUpdating = false;

//////////////////////////////////////////////////////////////////////
//                Clase de escena del nivel de laboratorio          //
//////////////////////////////////////////////////////////////////////
class sceneLabLevel extends Phaser.Scene {
    constructor() {
        super({key: "sceneLabLevel",
            active: false
        });
    }
    create() {
        //******************* Variables auxiliares ************************//
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.physics.add.image(400, 320, "labMap");

        //****************** Gráficos de colisiones *********************//

        //******************* Personajes ************************//
        var skinP1 = undefined;
        var skinP2 = undefined;
        switch (players[0].getType()) {
            case 1:
                skinP1 = "GroundCat";
                break;
            case 2:
                skinP1 = "WaterCat";
                break;
            case 3:
                skinP1 = "AirCat";
                break;
            case 4:
                skinP1 = "FireCat";
                break;
        }

        switch (players[1].getType()) {
            case 1:
                skinP2 = "GroundCat";
                break;
            case 2:
                skinP2 = "WaterCat";
                break;
            case 3:
                skinP2 = "AirCat";
                break;
            case 4:
                skinP2 = "FireCat";
                break;
        }
        // Jugador 1 //
        players[0].setObject(this.physics.add.sprite(90, 80, (skinP1 + 'Idle')));
        // Sin materia oscura
        this.anims.create({
            key: 'leftP1',
            frames: this.anims.generateFrameNumbers((skinP1 + 'Left'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'rightP1',
            frames: this.anims.generateFrameNumbers((skinP1 + 'Right'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'upP1',
            frames: this.anims.generateFrameNumbers((skinP1 + 'Up'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'downP1',
            frames: this.anims.generateFrameNumbers((skinP1 + 'Down'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'idleP1',
            frames: this.anims.generateFrameNumbers((skinP1 + 'Idle'), { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });
        // Con la materia oscura
        this.anims.create({
            key: 'leftP1Matter',
            frames: this.anims.generateFrameNumbers((skinP1 + 'LeftMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'rightP1Matter',
            frames: this.anims.generateFrameNumbers((skinP1 + 'RightMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'upP1Matter',
            frames: this.anims.generateFrameNumbers((skinP1 + 'UpMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'downP1Matter',
            frames: this.anims.generateFrameNumbers((skinP1 + 'DownMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'idleP1Matter',
            frames: this.anims.generateFrameNumbers((skinP1 + 'IdleMatter'), { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });
        players[0].getObject().anims.play('rightP1');

        // Jugador 2 //
        players[1].setObject(this.physics.add.sprite(700, 80, (skinP2 + 'Idle')));
        // Sin materia oscura
        this.anims.create({
            key: 'leftP2',
            frames: this.anims.generateFrameNumbers((skinP2 + 'Left'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'rightP2',
            frames: this.anims.generateFrameNumbers((skinP2 + 'Right'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'upP2',
            frames: this.anims.generateFrameNumbers((skinP2 + 'Up'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'downP2',
            frames: this.anims.generateFrameNumbers((skinP2 + 'Down'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'idleP2',
            frames: this.anims.generateFrameNumbers((skinP2 + 'Idle'), { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });
        // Con la materia oscura
        this.anims.create({
            key: 'leftP2Matter',
            frames: this.anims.generateFrameNumbers((skinP2 + 'LeftMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'rightP2Matter',
            frames: this.anims.generateFrameNumbers((skinP2 + 'RightMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'upP2Matter',
            frames: this.anims.generateFrameNumbers((skinP2 + 'UpMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'downP2Matter',
            frames: this.anims.generateFrameNumbers((skinP2 + 'DownMatter'), { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'idleP2Matter',
            frames: this.anims.generateFrameNumbers((skinP2 + 'IdleMatter'), { start: 0, end: 6 }),
            frameRate: 4,
            repeat: -1
        });
        players[1].getObject().anims.play('rightP1');

        //******************* Detección por teclado ************************//
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A,W,S,D,C,V,O,P');

        //******************* Colisiones ************************//
        // Con los bordes
        players[0].getObject().setCollideWorldBounds(true);
        players[1].getObject().setCollideWorldBounds(true);

        // Entre personajes 
        this.physics.add.collider(players[0].getObject(), players[1].getObject());

        // Entre personajes y muros

        // Personajes con la materia oscura
        this.physics.add.overlap(players[0].getObject(), darkMatter, () => {
            darkMatter.disableBody(true, true);
            players[0].setHasMatter(true);
        }, null, this);
        this.physics.add.overlap(players[1].getObject(), darkMatter, () => {
            darkMatter.disableBody(true, true);
            players[1].setHasMatter(true);
        }, null, this);

        //******************* Temporizador ************************//
        timer = this.add.text(width / 2, 20, "time", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff'
        });
        // Evento de finalización de ronda
        t = this.time.delayedCall(controller.getTimeRound() * 1000, endRound, [], this);

        //******************* Puntos ************************//
        // Jugador 1 //
        textPtsP1 = this.add.text(80, 20, "0", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff'
        });
        // Jugador 2 //
        textPtsP2 = this.add.text(width - 80, 20, "0", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff'
        });


        //******************* Música del nivel ************************//
        controller.getMusic().stop();
        controller.getmusicLevelLab().play();
    }
    update(time, delta){
        if (!stopUpdating) {
            //******************* Temporizador ************************//
            controller.setTimeRound(controller.getTimeRound() - (t.getProgress() - oldT) * diffT);
            timer.setText(Math.trunc(controller.getTimeRound()));
            oldT = t.getProgress();

            //******************* Personajes ************************//
            // Jugador 1 //
            // Sin materia oscura
            if (!players[0].getHasMatter()) {
                switch (true) {
                    case keys.A.isDown:
                        players[0].getObject().setVelocityX(-160);
                        players[0].getObject().anims.play('leftP1', true);
                        break;
                    case keys.D.isDown:
                        players[0].getObject().setVelocityX(160);
                        players[0].getObject().anims.play('rightP1', true);
                        break;
                    case keys.S.isDown:
                        players[0].getObject().setVelocityY(160);
                        players[0].getObject().anims.play('downP1', true);
                        break;
                    case keys.W.isDown:
                        players[0].getObject().setVelocityY(-160);
                        players[0].getObject().anims.play('upP1', true);
                        break;
                    case keys.V.isDown:
                        if (distance() === true) {
                            players[0].setHasMatter(true);
                            players[1].setHasMatter(false);
                        }
                        break;
                    default:
                        players[0].getObject().setVelocityX(0);
                        players[0].getObject().setVelocityY(0);
                        players[0].getObject().anims.play('idleP1', true);
                        break;
                }
            } else {
                switch (true) {
                    case keys.A.isDown:
                        players[0].getObject().setVelocityX(-160);
                        players[0].getObject().anims.play('leftP1Matter', true);
                        break;
                    case keys.D.isDown:
                        players[0].getObject().setVelocityX(160);
                        players[0].getObject().anims.play('rightP1Matter', true);
                        break;
                    case keys.S.isDown:
                        players[0].getObject().setVelocityY(160);
                        players[0].getObject().anims.play('downP1Matter', true);
                        break;
                    case keys.W.isDown:
                        players[0].getObject().setVelocityY(-160);
                        players[0].getObject().anims.play('upP1Matter', true);
                        break;
                    default:
                        players[0].getObject().setVelocityX(0);
                        players[0].getObject().setVelocityY(0);
                        players[0].getObject().anims.play('idleP1Matter', true);
                        break;
                }
            }

            // Jugador 2 //
            // Sin materia oscura
            if (!players[1].getHasMatter()) {
                switch (true) {
                    case cursors.left.isDown:
                        players[1].getObject().setVelocityX(-160);
                        players[1].getObject().anims.play('leftP2', true);
                        break;
                    case cursors.right.isDown:
                        players[1].getObject().setVelocityX(160);
                        players[1].getObject().anims.play('rightP2', true);
                        break;
                    case cursors.down.isDown:
                        players[1].getObject().setVelocityY(160);
                        players[1].getObject().anims.play('downP2', true);
                        break;
                    case cursors.up.isDown:
                        players[1].getObject().setVelocityY(-160);
                        players[1].getObject().anims.play('upP2', true);
                        break;
                    case keys.P.isDown:
                        if (distance() === true) {
                            players[1].setHasMatter(true);
                            players[0].setHasMatter(false);
                        }
                        break;
                    default:
                        players[1].getObject().setVelocityX(0);
                        players[1].getObject().setVelocityY(0);
                        players[1].getObject().anims.play('idleP2', true);
                        break;
                }
            } else {
                switch (true) {
                    case cursors.left.isDown:
                        players[1].getObject().setVelocityX(-160);
                        players[1].getObject().anims.play('leftP2Matter', true);
                        break;
                    case cursors.right.isDown:
                        players[1].getObject().setVelocityX(160);
                        players[1].getObject().anims.play('rightP2Matter', true);
                        break;
                    case cursors.down.isDown:
                        players[1].getObject().setVelocityY(160);
                        players[1].getObject().anims.play('downP2Matter', true);
                        break;
                    case cursors.up.isDown:
                        players[1].getObject().setVelocityY(-160);
                        players[1].getObject().anims.play('upP2Matter', true);
                        break;
                    default:
                        players[1].getObject().setVelocityX(0);
                        players[1].getObject().setVelocityY(0);
                        players[1].getObject().anims.play('idleP2Matter', true);
                        break;
                }
            }
            // Puntuación
            updatePoints();
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Posición aleatoria de materia oscura ************************//
function posAzar() {
    var rand = Phaser.Math.Between(1,4)
    switch(rand){
        case 1:
            darkMatterPosX = 200;
            darkMatterPosY = 500;
            break;
        case 2:
            darkMatterPosX = 400;
            darkMatterPosY = 120;
            break;
        case 3:
            darkMatterPosX = 530;
            darkMatterPosY = 460;
            break;
        case 4: 
            darkMatterPosX = 400;
            darkMatterPosY = 530;
            break;    
    }
};

//******************* Evento de temporizador ************************//
function endRound() {
    stopUpdating = true;
    
    if(players[0].getScore() < players[1].getScore()){
        players[1].setRoundsWon(players[1].getRoundsWon() + 1);
    } else if (players[0].getScore() > players[1].getScore()) {
        players[0].setRoundsWon(players[0].getRoundsWon() + 1);
    }

    if(players[0].getRoundsWon() === 2){
        alert("Ganó el jugador 1");
        players[0].reset();
        players[1].reset();
        this.scene.swapPosition("sceneMainMenu", "sceneSelectionMenu2");
        this.scene.stop("sceneForestLevel");
        this.scene.start("sceneMainMenu");
    } else if (players[1].getRoundsWon() === 2){
        alert("Ganó el jugador 2");
        players[0].reset();
        players[1].reset();
        this.scene.swapPosition("sceneMainMenu", "sceneSelectionMenu2");
        this.scene.stop("sceneForestLevel");
        this.scene.start("sceneMainMenu");
    }

    players.forEach(element => {
        element.setHasMatter(false);
        element.setScore(0);
    });

    game.scene.start("sceneForestLevel");
    stopUpdating = false;
    controller.getmusicLevelLab().stop();
    controller.getMusic().play();
}

//******************  Calcular distancia entre gatos ****************//
function distance() {
    var aux = false;
    distanceBool = false;

    distanceX = players[0].getObject().x - players[1].getObject().x;
    distanceY = players[0].getObject().y - players[1].getObject().y;

    if (distanceX >= -50 && distanceX <= 50) {
        aux = true;
        if (aux == true && distanceY >= -50 && distanceY <= 50) {
            distanceBool = true;
        }
    }
    return distanceBool;
}

//******************  Actualización puntuación de jugadores ****************//
function updatePoints() {
    // Jugador 1 //
    if (players[0].getHasMatter()) {
        players[0].setScore(players[0].getScore() + 1);
        textPtsP1.setText(Math.trunc(players[0].getScore() / diffT));
    }
    // Jugador 2 //
    if (players[1].getHasMatter()) {
        players[1].setScore(players[1].getScore() + 1);
        textPtsP2.setText(Math.trunc(players[1].getScore() / diffT));
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneLabLevel;