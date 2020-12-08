//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { players } from '../cats.js';
import { game } from '../init.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//******************* Input teclado ************************//
var cursors = undefined;
var keys = undefined;
//******************* Jugadores ************************//
var distanceX = 0;
var distanceY = 0;
var distanceBool = false;
//******************* Texto ************************//
// Final de ronda //
var textEndRound = "";
var textEndMatch = "";
// Jugador 1 //
var textPtsP1 = "";
var textRndsP1 = "";
// Jugador 2 //
var textPtsP2 = "";
var textRndsP2 = "";
// Temporizador //
var timer = "";
//******************* Materia oscura ************************//
var darkMatterPosX = 0;
var darkMatterPosY = 0;
var darkMatter = undefined;
//******************* Temporizador ************************//
var tEvent = undefined;
var t = controller.getTimeRound();
var oldT = 0;
var diffT = controller.getTimeRound();

//////////////////////////////////////////////////////////////////////
//                   Clase de escena del nivel de cueva             //
//////////////////////////////////////////////////////////////////////
class sceneCaveLevel extends Phaser.Scene {
    constructor() {
        super({key: "sceneCaveLevel",
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
        // Mapa //
        
        //****************** Gráficos de colisiones *********************//
        var col33 = this.physics.add.image(0, 0, "forestCol11");
        col33.scaleY = 5.5;
        col33.scaleX = 1.1;
        col33.setVisible(false);
        col33.setImmovable(true);

        var col34 = this.physics.add.image(50, 0, "forestCol11");
        col34.scaleY = 4.8;
        col34.scaleX = 2.6;
        col34.setVisible(false);
        col34.setImmovable(true);

        var col35 = this.physics.add.image(176, 188, "forestCol11");
        col35.scaleY = 0.85;
        col35.scaleX = 1.1;
        col35.setVisible(false);
        col35.setImmovable(true);

        var col36 = this.physics.add.image(0, 0, "forestCol11");
        col36.scaleY = 2;
        col36.scaleX = 16;
        col36.setVisible(false);
        col36.setImmovable(true);

        var col37 = this.physics.add.image(410, 30, "forestCol11");
        col37.scaleY = 2;
        col37.scaleX = 0.3;
        col37.setVisible(false);
        col37.setImmovable(true);

        var col38 = this.physics.add.image(436, 60, "forestCol11");
        col38.scaleY = 2;
        col38.scaleX = 0.3;
        col38.setVisible(false);
        col38.setImmovable(true);

        var col39 = this.physics.add.image(480, 90, "forestCol11");
        col39.scaleY = 2;
        col39.scaleX = 0.6;
        col39.setVisible(false);
        col39.setImmovable(true);

        var col40 = this.physics.add.image(534, 140, "forestCol11");
        col40.scaleY = 2;
        col40.scaleX = 0.6;
        col40.setVisible(false);
        col40.setImmovable(true);

        var col41 = this.physics.add.image(600, 140, "forestCol11");
        col41.scaleY = 3;
        col41.scaleX = 0.9;
        col41.setVisible(false);
        col41.setImmovable(true);

        var col42 = this.physics.add.image(690, 90, "forestCol11");
        col42.scaleY = 0.6;
        col42.scaleX = 0.6;
        col42.setVisible(false);
        col42.setImmovable(true);

        var col43 = this.physics.add.image(660, 120, "forestCol11");
        col43.scaleY = 0.6;
        col43.scaleX = 0.3;
        col43.setVisible(false);
        col43.setImmovable(true);

        var col44 = this.physics.add.image(660, 240, "forestCol11");
        col44.scaleY = 0.9;
        col44.scaleX = 0.3;
        col44.setVisible(false);
        col44.setImmovable(true);

        var col45 = this.physics.add.image(590, 240, "forestCol11");
        col45.scaleY = 2;
        col45.scaleX = 0.7;
        col45.setVisible(false);
        col45.setImmovable(true);

        var col46 = this.physics.add.image(540, 300, "forestCol11");
        col46.scaleY = 0.9;
        col46.scaleX = 0.2;
        col46.setVisible(false);
        col46.setImmovable(true);

        var col47 = this.physics.add.image(520, 310, "forestCol11");
        col47.scaleY = 0.7;
        col47.scaleX = 0.3;
        col47.setVisible(false);
        col47.setImmovable(true);

        var col48 = this.physics.add.image(240, 260, "forestCol11");
        col48.scaleY = 0.7;
        col48.scaleX = 1.4;
        col48.setVisible(false);
        col48.setImmovable(true);

        var col49 = this.physics.add.image(250, 296, "forestCol11");
        col49.scaleY = 0.7;
        col49.scaleX = 1.2;
        col49.setVisible(false);
        col49.setImmovable(true);

        var col50 = this.physics.add.image(264, 310, "forestCol11");
        col50.scaleY = 0.7;
        col50.scaleX = 0.95;
        col50.setVisible(false);
        col50.setImmovable(true);

        var col51 = this.physics.add.image(226, 332, "forestCol11");
        col51.scaleY = 0.7;
        col51.scaleX = 0.2;
        //col51.setVisible(false);
        col51.setImmovable(true);

        var col52 = this.physics.add.image(226, 332, "forestCol11");
        col52.scaleY = 0.7;
        col52.scaleX = 0.2;
        //col52.setVisible(false);
        col52.setImmovable(true);

        //******************* Materia oscura ************************//
        posAzar();
        darkMatter = this.physics.add.image(darkMatterPosX, darkMatterPosY, "darkMatter");

        //******************* Personajes ************************//
        // Texturas //
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
        players[0].setObject(this.physics.add.sprite(90, 240, (skinP1 + 'Idle')));
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
        players[1].setObject(this.physics.add.sprite(730, 140, (skinP2 + 'Idle')));
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
        this.physics.add.collider(col33, players[1].getObject());
        this.physics.add.collider(col33, players[0].getObject());
        this.physics.add.collider(col34, players[1].getObject());
        this.physics.add.collider(col34, players[0].getObject());
        this.physics.add.collider(col35, players[1].getObject());
        this.physics.add.collider(col35, players[0].getObject());
        this.physics.add.collider(col36, players[1].getObject());
        this.physics.add.collider(col36, players[0].getObject());
        this.physics.add.collider(col37, players[1].getObject());
        this.physics.add.collider(col37, players[0].getObject());
        this.physics.add.collider(col38, players[1].getObject());
        this.physics.add.collider(col38, players[0].getObject());
        this.physics.add.collider(col39, players[1].getObject());
        this.physics.add.collider(col39, players[0].getObject());
        this.physics.add.collider(col40, players[1].getObject());
        this.physics.add.collider(col40, players[0].getObject());
        this.physics.add.collider(col41, players[1].getObject());
        this.physics.add.collider(col41, players[0].getObject());
        this.physics.add.collider(col42, players[1].getObject());
        this.physics.add.collider(col42, players[0].getObject());
        this.physics.add.collider(col43, players[1].getObject());
        this.physics.add.collider(col43, players[0].getObject());
        this.physics.add.collider(col44, players[1].getObject());
        this.physics.add.collider(col44, players[0].getObject());
        this.physics.add.collider(col45, players[1].getObject());
        this.physics.add.collider(col45, players[0].getObject());
        this.physics.add.collider(col46, players[1].getObject());
        this.physics.add.collider(col46, players[0].getObject());
        this.physics.add.collider(col47, players[1].getObject());
        this.physics.add.collider(col47, players[0].getObject());
        this.physics.add.collider(col48, players[1].getObject());
        this.physics.add.collider(col48, players[0].getObject());
        this.physics.add.collider(col49, players[1].getObject());
        this.physics.add.collider(col49, players[0].getObject());
        this.physics.add.collider(col50, players[1].getObject());
        this.physics.add.collider(col50, players[0].getObject());
        this.physics.add.collider(col51, players[1].getObject());
        this.physics.add.collider(col51, players[0].getObject());

        // Personajes con la materia oscura
        this.physics.add.overlap(players[0].getObject(), darkMatter, () => {
            darkMatter.disableBody(true, true);
            players[0].setHasMatter(true);
        }, null, this);
        this.physics.add.overlap(players[1].getObject(), darkMatter, () => {
            darkMatter.disableBody(true, true);
            players[1].setHasMatter(true);
        }, null, this);

        //******************* HUD ************************//
        // Puntuaciones //
        // Jugador 1
        this.add.rectangle(90, 41, 125, 50, 0x000000, 0.3);
        switch (players[0].getType()) {
            case 1:
                this.add.image(50, 41, "GroundCatFace");
                break;
            case 2:
                this.add.image(50, 41, "WaterCatFace");
                break;
            case 3:
                this.add.image(50, 41, "AirCatFace");
                break;
            case 4:
                this.add.image(50, 41, "FireCatFace");
                break;
        }
        // Jugador 2
        this.add.rectangle(width - 90, 41, 125, 50, 0x000000, 0.3);
        switch (players[1].getType()) {
            case 1:
                this.add.image(width - 130, 41, "GroundCatFace");
                break;
            case 2:
                this.add.image(width - 130, 41, "WaterCatFace");
                break;
            case 3:
                this.add.image(width - 130, 41, "AirCatFace");
                break;
            case 4:
                this.add.image(width - 130, 41, "FireCatFace");
                break;
        }

        // Temporizador //
        this.add.rectangle(width / 2, 41, 100, 50, 0x000000, 0.3);
        var clock = this.physics.add.image((width / 2) - 35, 41, "clock");
        clock.scaleX = 1.7;
        clock.scaleY = 1.7;

        //******************* Temporizador ************************//
        // Texto //
        timer = this.add.text(width / 2, 20, "time", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff',
        });
        
        // Evento de finalización de ronda //
        tEvent = this.time.delayedCall(controller.getTimeRound() * 1000, endRound, [], this);

        //******************* Puntos ************************//
        // Jugador 1 //
        textPtsP1 = this.add.text(80, 20, "0", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff'
        });
        // Jugador 2 //
        textPtsP2 = this.add.text(width - 100, 20, "0", {
            fontFamily: 'origins',
            fontSize: '32px',
            fill: '#ffffff'
        });
    }

    update(time, delta) {
        if (!controller.getStopUpdateLevel()) {
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
            darkMatterPosX = 170;
            darkMatterPosY = 580;
            break;
        case 2:
            darkMatterPosX = 400;
            darkMatterPosY = 160;
            break;
        case 3:
            darkMatterPosX = 480;
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
            textEndMatch = this.add.text(width + 100, height / 2, "Player 2 won the match.", {
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
            textEndMatch = this.add.text(width + 100, height / 2, "Player 1 won the match.", {
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
        property.setScore(0);
    });
    controller.setStopUpdateLevel(false);
    controller.getCurrentScene().scene.restart();
}

function endMatch() {
    controller.getCurrentScene().scene.sleep();
    var nextScene = game.scene.getScene("sceneEndGame");
    nextScene.scene.wake();
    nextScene.scene.restart();
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
export default sceneCaveLevel;