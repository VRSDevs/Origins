//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';
import { players } from '../cats.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Input teclado ************************//
var cursors;
var keys;
//******************* Jugadores ************************//
var playerAir;
var matterAir = false;
var playerGround;
var matterGround = false;
//******************* Materia oscura ************************//
var darkMatterPosX;
var darkMatterPosY;
var darkMatter;
var collidedP1 = players[0].getHasMatter();
var collidedP2 = players[1].getHasMatter();
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
        players[0] = this.physics.add.sprite(70,80,(skinP1 + 'Idle'));

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

        players[0].anims.play('rightP1');

        // Jugador 2 //
        players[1] = this.physics.add.sprite(600,400,(skinP2 + 'Idle'));

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
            key: 'rightP1Matter',
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

        players[1].anims.play('rightP1');

        //******************* Detección por teclado ************************//
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A,W,S,D,C,V,O,P');
        
        //******************* Colisiones ************************//
        // Con los bordes
        players[0].setCollideWorldBounds(true);
        players[1].setCollideWorldBounds(true);

        // Entre personajes 
        this.physics.add.collider(players[0], players[1]);

        // Personajes con la materia oscura
        this.physics.add.overlap(players[0], darkMatter, collectP1DarkMatter, null, this);
        this.physics.add.overlap(players[1], darkMatter, collectP2DarkMatter, null, this);

        //******************* Temporizador ************************//
        timer = this.add.text(width/2, 20, "test",{
            fontFamily: 'origins',
            fontSize:'32px',
            fill: '#ffffff'
        });
        t = this.time.delayedCall(controller.getTimeRound() * 1000, onEvent, [], this);

        
    }

    update(time, delta){
        //******************* Temporizador ************************//
        controller.setTimeRound(controller.getTimeRound() - (t.getProgress() - oldT) * diffT);
        timer.setText(Math.trunc(controller.getTimeRound()));
        oldT = t.getProgress();
      
        //******************* Personajes ************************//
        // Jugador //
        // Sin materia oscura
        if(collidedP1 === false){
            switch (true) {
                case keys.A.isDown:
                    players[0].setVelocityX(-160);
                    players[0].anims.play('leftP1', true);
                    break;
                case keys.D.isDown:
                    players[0].setVelocityX(160);
                    players[0].anims.play('rightP1', true);
                    break;
                case keys.S.isDown:
                    players[0].setVelocityY(160);
                    players[0].anims.play('downP1', true);
                    break;
                case keys.W.isDown:
                    players[0].setVelocityY(-160);
                    players[0].anims.play('upP1', true);
                    break;
                default:
                    players[0].setVelocityX(0);
                    players[0].setVelocityY(0);
                    players[0].anims.play('idleP1',true);
                    break;
            }
        } else {
            switch (true) {
                case keys.A.isDown:
                    players[0].setVelocityX(-160);
                    players[0].anims.play('leftP1Matter', true);
                    break;
                case keys.D.isDown:
                    players[0].setVelocityX(160);
                    players[0].anims.play('rightP1Matter', true);
                    break;
                case keys.S.isDown:
                    players[0].setVelocityY(160);
                    players[0].anims.play('downP1Matter', true);
                    break;
                case keys.W.isDown:
                    players[0].setVelocityY(-160);
                    players[0].anims.play('upP1Matter', true);
                    break;
                default:
                    players[0].setVelocityX(0);
                    players[0].setVelocityY(0);
                    players[0].anims.play('idleP1Matter',true);
                    break;  
            }
        }

        // Jugador 2 //
        // Sin materia oscura
        if(collidedP2 === false){
            switch (true) {
                case cursors.left.isDown:
                    players[1].setVelocityX(-160);
                    players[1].anims.play('leftP2', true);
                    break;
                case cursors.right.isDown:
                    players[1].setVelocityX(160);
                    players[1].anims.play('rightP2', true);
                    break;
                case cursors.down.isDown:
                    players[1].setVelocityY(160);
                    players[1].anims.play('downP2', true);
                    break;
                case cursors.up.isDown:
                    players[1].setVelocityY(-160);
                    players[1].anims.play('upP2', true);
                    break;
                default:
                    players[1].setVelocityX(0);
                    players[1].setVelocityY(0);
                    players[1].anims.play('idleP2',true);
                    break;
            }
        } else {
            switch (true) {
                case cursors.left.isDown:
                    players[1].setVelocityX(-160);
                    players[1].anims.play('leftP2Matter', true);
                    break;
                case cursors.right.isDown:
                    players[1].setVelocityX(160);
                    players[1].anims.play('rightP2Matter', true);
                    break;
                case cursors.down.isDown:
                    players[1].setVelocityY(160);
                    players[1].anims.play('downP2Matter', true);
                    break;
                case cursors.up.isDown:
                    players[1].setVelocityY(-160);
                    players[1].anims.play('upP2Matter', true);
                    break;
                default:
                    players[1].setVelocityX(0);
                    players[1].setVelocityY(0);
                    players[1].anims.play('idleP2Matter',true);
                    break;  
            }
        }
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
    alert('Test');
}

//******************* Colisiones con materia ************************//
function collectP1DarkMatter(){
    darkMatter.disableBody(true, true);
    console.log(1);
    collidedP1 = true;
}

function collectP2DarkMatter(){
    darkMatter.disableBody(true, true);
    console.log(1);
    collidedP2 = true;
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneForestLevel;