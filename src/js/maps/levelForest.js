import {controller} from '../gameController.js';

var cursors
var playerAir
var playerGround
var playerGroundMatter
var keys

//////////////////////////////////////////////////////////////////////
//                   Clase para el nivel del campo                  //
//////////////////////////////////////////////////////////////////////


class sceneForestLevel extends Phaser.Scene {
    constructor() {
        super({key: "sceneForestLevel",
            active: false
        });
    }
    create() {
        // Fondo
        this.physics.add.image(400, 320, "forestMap");

        // Personaje hay que hacer un if con el personaje que toque
        // Gato de aire
       playerAir = this.physics.add.sprite(90,80,'AirCatIdle');

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


        playerAir.anims.play('rightAir');

        //Ground cat
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
        playerGround.anims.play('rightGround');

        //
        playerGroundMatter = this.physics.add.sprite(20, 560, 'GroundCatMatterIdle');

        this.anims.create({
            key: 'leftMatterGround',
            frames: this.anims.generateFrameNumbers('GroundCatMatterLeft', {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'rightMatterGround',
            frames: this.anims.generateFrameNumbers('GroundCatMatterRight', {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'upMatterGround',
            frames: this.anims.generateFrameNumbers('GroundCatMatterUp', {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'downMatterGround',
            frames: this.anims.generateFrameNames('GroundCatMatterDown', {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idleMatterGround',
            frames: this.anims.generateFrameNumbers('GroundCatMatterIdle', {start: 0, end: 6}),
            frameRate: 4,
            repeat: -1
        });

        playerGroundMatter.anims.play('idleMatterGround');

        //Detección del teclado
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A,W,S,D,C,V,O,P');
        // Colisiones 
        playerAir.setCollideWorldBounds(true);
        playerGround.setCollideWorldBounds(true);

        this.physics.add.collider(playerAir, playerGround);

    }
    update(time, delta){
        // Gato de aire
        if (keys.A.isDown)
        {
            playerAir.setVelocityX(-160);

            playerAir.anims.play('leftAir', true);
        }
        else if (keys.D.isDown)
        {
            playerAir.setVelocityX(160);

            playerAir.anims.play('rightAir', true);
        }
        else if(keys.S.isDown){
            playerAir.setVelocityY(160);

            playerAir.anims.play('downAir', true);
        }
        else if(keys.W.isDown){
            playerAir.setVelocityY(-160);

            playerAir.anims.play('upAir', true);
        }
        else
        {
            playerAir.setVelocityX(0);
            playerAir.setVelocityY(0);

            playerAir.anims.play('idleAir',true);
        }

        // Gato de tierra
        if (cursors.left.isDown)
        {
            playerGround.setVelocityX(-160);

            playerGround.anims.play('leftGround', true);
        }
        else if (cursors.right.isDown)
        {
            playerGround.setVelocityX(160);

            playerGround.anims.play('rightGround', true);
        }
        else if(cursors.down.isDown){
            playerGround.setVelocityY(160);

            playerGround.anims.play('downGround', true);
        }
        else if(cursors.up.isDown){
            playerGround.setVelocityY(-160);

            playerGround.anims.play('upGround', true);
        }
        else
        {
            playerGround.setVelocityX(0);
            playerGround.setVelocityY(0);

            playerGround.anims.play('idleGround',true);
        }



    }
}

export default sceneForestLevel;