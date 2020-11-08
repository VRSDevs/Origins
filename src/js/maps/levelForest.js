//import gameController from './gameController.js';


var playerAir

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

       playerAir = this.add.sprite(30,30,'AirCatIdle');

        //Air cat

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
            frameRate: 5, 
            repeat: -1   
        });


        playerAir.anims.play('idleAir');


        //cursors = this.input.keyboard.createCursorKeys();

    }
    update(time, delta){





    /*
        if (cursors.left.isDown)
        {
            playerAir.setVelocityX(-160);

            playerAir.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            playerAir.setVelocityX(160);

            playerAir.anims.play('right', true);
        }
        else
        {
            playerAir.setVelocityX(0);

            playerAir.anims.play('turn');
        }
    */

    }
}

export default sceneForestLevel;