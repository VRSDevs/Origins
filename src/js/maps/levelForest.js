//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import {controller} from '../gameController.js';

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

        //******************* Personajes ************************//
        // Aire //
        playerAir = this.physics.add.sprite(760,80,'AirCatIdle');

        // Sin materia oscura
        this.anims.create({
            key: 'leftAir',
            frames: this.anims.generateFrameNumbers('AirCatLeft', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'rightAir',
            frames: this.anims.generateFrameNumbers('AirCatRight', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'upAir',
            frames: this.anims.generateFrameNumbers('AirCatUp', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        
        this.anims.create({
            key: 'downAir',
            frames: this.anims.generateFrameNumbers('AirCatDown', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idleAir',
            frames: this.anims.generateFrameNumbers('AirCatIdle', { start: 0, end: 6 }),
            frameRate: 4, 
            repeat: -1   
        });

        // Con la materia oscura
        this.anims.create({
            key: 'leftAirMatter',
            frames: this.anims.generateFrameNumbers('AirCatLeftMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'rightAirMatter',
            frames: this.anims.generateFrameNumbers('AirCatRightMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'upAirMatter',
            frames: this.anims.generateFrameNumbers('AirCatUpMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        
        this.anims.create({
            key: 'downAirMatter',
            frames: this.anims.generateFrameNumbers('AirCatDownMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idleAirMatter',
            frames: this.anims.generateFrameNumbers('AirCatIdleMatter', { start: 0, end: 6 }),
            frameRate: 4, 
            repeat: -1   
        });

        playerAir.anims.play('rightAir');

        // Tierra //
        // Sin la materia oscura
        playerGround = this.physics.add.sprite(50,80,'GroundCatIdle');

        this.anims.create({
           key: 'leftGround',
           frames: this.anims.generateFrameNumbers('GroundCatLeft', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
        });

        this.anims.create({
           key: 'rightGround',
           frames: this.anims.generateFrameNumbers('GroundCatRight', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
        });

        this.anims.create({
           key: 'upGround',
           frames: this.anims.generateFrameNumbers('GroundCatUp', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
        });

        this.anims.create({
           key: 'downGround',
           frames: this.anims.generateFrameNumbers('GroundCatDown', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
        });

        this.anims.create({
           key: 'idleGround',
           frames: this.anims.generateFrameNumbers('GroundCatIdle', { start: 0, end: 6 }),
           frameRate: 4, 
           repeat: -1   
        });

        // Con la materia oscura
        this.anims.create({
            key: 'leftGroundMatter',
            frames: this.anims.generateFrameNumbers('GroundCatLeftMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
         });
 
         this.anims.create({
            key: 'rightGroundMatter',
            frames: this.anims.generateFrameNumbers('GroundCatRightMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
         });
 
         this.anims.create({
            key: 'upGroundMatter',
            frames: this.anims.generateFrameNumbers('GroundCatUpMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
         });
        
         this.anims.create({
            key: 'downGroundMatter',
            frames: this.anims.generateFrameNumbers('GroundCatDownMatter', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
         });
 
         this.anims.create({
            key: 'idleGroundMatter',
            frames: this.anims.generateFrameNumbers('GroundCatIdleMatter', { start: 0, end: 6 }),
            frameRate: 4, 
            repeat: -1   
         });


        playerGround.anims.play('rightGround');

        //******************* Detección por teclado ************************//
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A,W,S,D,C,V,O,P');
        
        //******************* Colisiones ************************//
        // Con los bordes
        playerAir.setCollideWorldBounds(true);
        playerGround.setCollideWorldBounds(true);

        // Entre personajes 
        this.physics.add.collider(playerAir, playerGround);

        // Personajes con la materia oscura
        this.physics.add.overlap(playerAir, darkMatter, collectDarkmatterAir, null, this);
        this.physics.add.overlap(playerGround, darkMatter, collectDarkmatterGround, null, this);

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
        // Aire //
        // Sin materia oscura
        if (keys.A.isDown && matterAir === false)
        {
            playerAir.setVelocityX(-160);

            playerAir.anims.play('leftAir', true);
        }
        else if (keys.D.isDown && matterAir === false)
        {
            playerAir.setVelocityX(160);

            playerAir.anims.play('rightAir', true);
        }
        else if(keys.S.isDown && matterAir === false){
            playerAir.setVelocityY(160);

            playerAir.anims.play('downAir', true);
        }
        else if(keys.W.isDown && matterAir === false){
            playerAir.setVelocityY(-160);

            playerAir.anims.play('upAir', true);
        }
        else if(matterAir === false)
        {
            playerAir.setVelocityX(0);
            playerAir.setVelocityY(0);

            playerAir.anims.play('idleAir',true);
        }

        // Con materia oscura
        if (keys.A.isDown && matterAir === true)
        {
            playerAir.setVelocityX(-160);

            playerAir.anims.play('leftAirMatter', true);
        }
        else if (keys.D.isDown && matterAir === true)
        {
            playerAir.setVelocityX(160);

            playerAir.anims.play('rightAirMatter', true);
        }
        else if(keys.S.isDown && matterAir === true){
            playerAir.setVelocityY(160);

            playerAir.anims.play('downAirMatter', true);
        }
        else if(keys.W.isDown && matterAir === true){
            playerAir.setVelocityY(-160);

            playerAir.anims.play('upAirMatter', true);
        }
        else if(matterAir === true)
        {
            playerAir.setVelocityX(0);
            playerAir.setVelocityY(0);

            playerAir.anims.play('idleAirMatter',true);
        }

        // Tierra //
        // Sin materia oscura
        if (cursors.left.isDown && matterGround === false)
        {
            playerGround.setVelocityX(-160);

            playerGround.anims.play('leftGround', true);
        }
        else if (cursors.right.isDown && matterGround === false)
        {
            playerGround.setVelocityX(160);

            playerGround.anims.play('rightGround', true);
        }
        else if(cursors.down.isDown && matterGround === false){
            playerGround.setVelocityY(160);

            playerGround.anims.play('downGround', true);
        }
        else if(cursors.up.isDown && matterGround === false){
            playerGround.setVelocityY(-160);

            playerGround.anims.play('upGround', true);
        }
        else if(matterGround === false)
        {
            playerGround.setVelocityX(0);
            playerGround.setVelocityY(0);

            playerGround.anims.play('idleGround',true);
        }

        // Con materia oscura
        if (cursors.left.isDown && matterGround === true)
        {
            playerGround.setVelocityX(-160);

            playerGround.anims.play('leftGroundMatter', true);
        }
        else if (cursors.right.isDown && matterGround === true)
        {
            playerGround.setVelocityX(160);

            playerGround.anims.play('rightGroundMatter', true);
        }
        else if(cursors.down.isDown && matterGround === true){
            playerGround.setVelocityY(160);

            playerGround.anims.play('downGroundMatter', true);
        }
        else if(cursors.up.isDown && matterGround === true){
            playerGround.setVelocityY(-160);

            playerGround.anims.play('upGroundMatter', true);
        }
        else if(matterGround === true)
        {
            playerGround.setVelocityX(0);
            playerGround.setVelocityY(0);

            playerGround.anims.play('idleGroundMatter',true);
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
//******************* Recolección de materia oscura ************************//
function collectDarkmatterAir(playerAir, darkMatter){

    darkMatter.disableBody(true, true);

    // Añadir boolean de playerAir
    matterAir = true;

};
function collectDarkmatterGround(playerGround, darkMatter){

    darkMatter.disableBody(true, true);


    // Añadir boolean de playerAir

    matterGround = true;
};
//******************* Evento de temporizador ************************//
function onEvent(){
    alert('Test');
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneForestLevel;