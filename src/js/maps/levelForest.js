"use strict";
//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { controller } from '../gameController.js';
import { players } from '../cats.js';

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

//////////////////////////////////////////////////////////////////////
//                   Clase de escena del nivel de bosque            //
//////////////////////////////////////////////////////////////////////
class sceneForestLevel extends Phaser.Scene {
    constructor() {
        super({key: "sceneForestLevel",
            active: false
        });
    }
    create() {
        //******************* Variables auxiliares ************************//
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        //******************* Fondos ************************//
        this.physics.add.image(400, 320, "forestMap");


        //****************** Colisiones *********************//
        var col1 = this.physics.add.image(65, 20,"forestCol1");
        col1.setVisible(false);
        col1.setImmovable(true);

        var col2 = this.physics.add.image(438, 20,"forestCol2");
        col2.setVisible(false);
        col2.setImmovable(true);

        var col3 = this.physics.add.image(373, 40,"forestCol3");
        col3.setVisible(false);
        col3.setImmovable(true);

        var col4 = this.physics.add.image(755, 20,"forestCol4");
        col4.setVisible(false);
        col4.setImmovable(true);

        var col5 = this.physics.add.image(64, 290,"forestCol5");
        col5.scaleX = 0.9;
        col5.setVisible(false);
        col5.setImmovable(true);

        var col6 = this.physics.add.image(106, 198,"forestCol6");
        col6.scaleY = 0.9;
        col6.setVisible(false);
        col6.setImmovable(true);

        var col7 = this.physics.add.image(140, 172,"forestCol7");
        col7.scaleY = 0.9;
        col7.setVisible(false);
        col7.setImmovable(true);

        var col8 = this.physics.add.image(400, 626,"forestCol8");
        col8.setVisible(false);
        col8.setImmovable(true);

        var col9 = this.physics.add.image(784, 182,"forestCol9");
        col9.scaleY = 0.8;
        col9.setVisible(false);
        col9.setImmovable(true);

        var col10 = this.physics.add.image(728, 590,"forestCol10");
        col10.setVisible(false);
        col10.setImmovable(true);

        var col11 = this.physics.add.image(346, 600,"forestCol11");
        col11.setVisible(false);
        col11.setImmovable(true);

        var col12 = this.physics.add.image(348, 566,"forestCol12");
        col12.scaleX = 0.4;
        col12.setVisible(false);
        col12.setImmovable(true);

        var col13 = this.physics.add.image(400, 610,"forestCol12");
        col13.scaleY = 0.8
        col13.scaleX = 0.4;
        col13.setVisible(false);
        col13.setImmovable(true);

        var col14 = this.physics.add.image(526, 612,"forestCol13");
        col14.setVisible(false);
        col14.setImmovable(true);

        var col15 = this.physics.add.image(553, 560,"forestCol13");
        col15.setVisible(false);
        col15.setImmovable(true);

        var col16 = this.physics.add.image(580, 618,"forestCol13");
        col16.scaleY = 0.4;
        col16.setVisible(false);
        col16.setImmovable(true);

        var col17 = this.physics.add.image(756, 566,"forestCol13");
        col17.scaleY = 1.4;
        col17.scaleX = 2;
        col17.setVisible(false);
        col17.setImmovable(true);

        var col18 = this.physics.add.image(708, 478,"forestCol11");
        col18.scaleX = 0.4; 
        col18.setVisible(false);
        col18.setImmovable(true);

        var col19 = this.physics.add.image(400, 410,"forestCol11");
        col19.scaleY = 0.6;
        col19.scaleX = 0.5; 
        col19.setVisible(false);
        col19.setImmovable(true);

        var col20 = this.physics.add.image(612, 376,"forestCol11");
        col20.scaleX = 0.6;
        col20.scaleY = 1.1;
        col20.setVisible(false);
        col20.setImmovable(true);

        var col21 = this.physics.add.image(686, 346,"forestCol11");
        col21.scaleX = 0.4;
        col21.scaleY = 0.9;
        col21.setVisible(false);
        col21.setImmovable(true);

        var col22 = this.physics.add.image(710, 356,"forestCol11");
        col22.scaleY = 0.6;
        col22.setVisible(false);
        col22.setImmovable(true);

        var col23 = this.physics.add.image(270, 150,"forestCol11");
        col23.scaleY = 0.6;
        col23.scaleX = 0.5;
        col23.setVisible(false);
        col23.setImmovable(true);

        var col24 = this.physics.add.image(310, 180,"forestCol11");
        col24.scaleY = 0.6;
        col24.scaleX = 0.7;
        col24.setVisible(false);
        col24.setImmovable(true);

        var col25 = this.physics.add.image(346, 236,"forestCol11");
        col25.scaleY = 0.8;
        col25.scaleX = 0.4;
        col25.setVisible(false);
        col25.setImmovable(true);

        var col26 = this.physics.add.image(320, 210,"forestCol11");
        col26.scaleY = 0.8;
        col26.scaleX = 0.4;
        col26.setVisible(false);
        col26.setImmovable(true);

        var col27 = this.physics.add.image(382, 264,"forestCol11");
        col27.scaleY = 0.8;
        col27.scaleX = 0.2;
        col27.setVisible(false);
        col27.setImmovable(true);

        var col28 = this.physics.add.image(444, 282,"forestCol11");
        col28.scaleY = 1.3;
        col28.scaleX = 0.2;
        col28.setVisible(false);
        col28.setImmovable(true);

        var col29 = this.physics.add.image(474, 246,"forestCol11");
        col29.scaleY = 0.9;
        col29.scaleX = 0.4;
        col29.setVisible(false);
        col29.setImmovable(true);

        var col30 = this.physics.add.image(526, 236,"forestCol11");
        col30.scaleY = 0.9;
        col30.scaleX = 0.5;
        col30.setVisible(false);
        col30.setImmovable(true);

        var col31 = this.physics.add.image(580, 210,"forestCol11");
        col31.scaleY = 0.8;
        col31.scaleX = 0.9;
        col31.setVisible(false);
        col31.setImmovable(true);

        var col32 = this.physics.add.image(630, 160,"forestCol11");
        col32.scaleY = 0.8;
        col32.scaleX = 0.85;
        col32.setVisible(false);
        col32.setImmovable(true);



        //******************* Materia oscura ************************//
        posAzar();
        darkMatter = this.physics.add.image(darkMatterPosX, darkMatterPosY, "darkMatter");

        // Personaje hay que hacer un if con el personaje que toque
        var skinP1;
        var skinP2;
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
        
        //******************* Personajes ************************//
        // Jugador 1 //
        players[0].setObject(this.physics.add.sprite(70,80,(skinP1 + 'Idle')));

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
        players[1].setObject(this.physics.add.sprite(600,400,(skinP2 + 'Idle')));

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
        this.physics.add.collider(col1, players[1].getObject());
        this.physics.add.collider(col1, players[0].getObject());
        this.physics.add.collider(col2, players[1].getObject());
        this.physics.add.collider(col2, players[0].getObject());
        this.physics.add.collider(col3, players[1].getObject());
        this.physics.add.collider(col3, players[0].getObject());
        this.physics.add.collider(col4, players[1].getObject());
        this.physics.add.collider(col4, players[0].getObject());
        this.physics.add.collider(col5, players[1].getObject());
        this.physics.add.collider(col5, players[0].getObject());
        this.physics.add.collider(col6, players[1].getObject());
        this.physics.add.collider(col6, players[0].getObject());
        this.physics.add.collider(col7, players[1].getObject());
        this.physics.add.collider(col7, players[0].getObject());
        this.physics.add.collider(col8, players[1].getObject());
        this.physics.add.collider(col8, players[0].getObject());
        this.physics.add.collider(col9, players[1].getObject());
        this.physics.add.collider(col9, players[0].getObject());
        this.physics.add.collider(col10, players[1].getObject());
        this.physics.add.collider(col10, players[0].getObject());
        this.physics.add.collider(col11, players[1].getObject());
        this.physics.add.collider(col11, players[0].getObject());
        this.physics.add.collider(col12, players[1].getObject());
        this.physics.add.collider(col12, players[0].getObject());
        this.physics.add.collider(col13, players[1].getObject());
        this.physics.add.collider(col13, players[0].getObject());
        this.physics.add.collider(col14, players[1].getObject());
        this.physics.add.collider(col14, players[0].getObject());
        this.physics.add.collider(col15, players[1].getObject());
        this.physics.add.collider(col15, players[0].getObject());
        this.physics.add.collider(col16, players[1].getObject());
        this.physics.add.collider(col16, players[0].getObject());
        this.physics.add.collider(col17, players[1].getObject());
        this.physics.add.collider(col17, players[0].getObject());
        this.physics.add.collider(col18, players[1].getObject());
        this.physics.add.collider(col18, players[0].getObject());
        this.physics.add.collider(col19, players[1].getObject());
        this.physics.add.collider(col19, players[0].getObject());   
        this.physics.add.collider(col20, players[1].getObject());
        this.physics.add.collider(col20, players[0].getObject());
        this.physics.add.collider(col21, players[1].getObject());
        this.physics.add.collider(col21, players[0].getObject());
        this.physics.add.collider(col22, players[1].getObject());
        this.physics.add.collider(col22, players[0].getObject());
        this.physics.add.collider(col23, players[1].getObject());
        this.physics.add.collider(col23, players[0].getObject());
        this.physics.add.collider(col24, players[1].getObject());
        this.physics.add.collider(col24, players[0].getObject());
        this.physics.add.collider(col25, players[1].getObject());
        this.physics.add.collider(col25, players[0].getObject());
        this.physics.add.collider(col26, players[1].getObject());
        this.physics.add.collider(col26, players[0].getObject());
        this.physics.add.collider(col27, players[1].getObject());
        this.physics.add.collider(col27, players[0].getObject());
        this.physics.add.collider(col28, players[1].getObject());
        this.physics.add.collider(col28, players[0].getObject());
        this.physics.add.collider(col29, players[1].getObject());
        this.physics.add.collider(col29, players[0].getObject());
        this.physics.add.collider(col30, players[1].getObject());
        this.physics.add.collider(col30, players[0].getObject());
        this.physics.add.collider(col31, players[1].getObject());
        this.physics.add.collider(col31, players[0].getObject());
        this.physics.add.collider(col32, players[1].getObject());
        this.physics.add.collider(col32, players[0].getObject());


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
        timer = this.add.text(width/2, 20, "time",{
            fontFamily: 'origins',
            fontSize:'32px',
            fill: '#ffffff'
        });
        t = this.time.delayedCall(controller.getTimeRound() * 1000, onEvent, [], this);

        //******************* Puntos ************************//
        // Jugador 1 //
        textPtsP1 = this.add.text(width/8, 20, "0",{
            fontFamily: 'origins',
            fontSize:'32px',
            fill: '#ffffff'
        });
        // Jugador 2 //
        textPtsP2 = this.add.text(width - 80, 20, "0",{
            fontFamily: 'origins',
            fontSize:'32px',
            fill: '#ffffff'
        });
       
    }

    update(time, delta){
        //******************* Temporizador ************************//
        controller.setTimeRound(controller.getTimeRound() - (t.getProgress() - oldT) * diffT);
        timer.setText(Math.trunc(controller.getTimeRound()));
        oldT = t.getProgress();
      
        //******************* Personajes ************************//
        // Jugador 1 //
        // Sin materia oscura
        if(!players[0].getHasMatter()){
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
                    if(distance() === true){
                        players[0].setHasMatter(true);
                        players[1].setHasMatter(false);
                    }    
                    break;    
                default:
                    players[0].getObject().setVelocityX(0);
                    players[0].getObject().setVelocityY(0);
                    players[0].getObject().anims.play('idleP1',true);
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
                    players[0].getObject().anims.play('idleP1Matter',true);
                    break;  
            }
        }

        // Jugador 2 //
        // Sin materia oscura
        if(!players[1].getHasMatter()){
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
                    if(distance() === true){
                        players[1].setHasMatter(true);
                        players[0].setHasMatter(false);                        
                    }    
                    break;
                default:
                    players[1].getObject().setVelocityX(0);
                    players[1].getObject().setVelocityY(0);
                    players[1].getObject().anims.play('idleP2',true);
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
                    players[1].getObject().anims.play('idleP2Matter',true);
                    break;  
            }
        }

        // Puntuación
        updatePoints();
    }
}

//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////
//******************* Posición aleatoria de materia oscura ************************//
function posAzar(){
    darkMatterPosX = Phaser.Math.Between(20, 780)
    darkMatterPosY = Phaser.Math.Between(80, 560)
};

//******************* Evento de temporizador ************************//
function onEvent(){
    console.log(players[0].getType());
}

//******************  Calcular distancia entre gatos ****************//
function distance(){
    var aux = false;
    distanceBool = false;

    distanceX = players[0].getObject().x - players[1].getObject().x;
    distanceY = players[0].getObject().y - players[1].getObject().y;

    if(distanceX >= -50 && distanceX <= 50){
        aux = true;
        if(aux == true && distanceY >= -50 && distanceY <= 50){
            distanceBool = true;
        }
    }
    return distanceBool;
}

//******************  Actualización puntuación de jugadores ****************//
function updatePoints(){
    // Jugador 1 //
    if(players[0].getHasMatter()){
        players[0].setScore(players[0].getScore() + 1);
        textPtsP1.setText(Math.trunc(players[0].getScore()/diffT));
    }
    // Jugador 2 //
    if(players[1].getHasMatter()){
        players[1].setScore(players[1].getScore() + 1);
        textPtsP2.setText(Math.trunc(players[1].getScore()/diffT));
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneForestLevel;