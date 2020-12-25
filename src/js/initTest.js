//////////////////////////////////////////////////////////////////////
//                       Codigo para trastear                       //
//////////////////////////////////////////////////////////////////////

/*
IMPORTAR UN .js DE OTRO ARCHIVO --> import '/modules/my-module.js';

EJEMPLO DE FUNCIONES PARA EXPORTAR A OTRO .js --> evitar importar el archivo entero.-
    Metodos en lib.js
        export const sqrt = Math.sqrt;
        export function square(x) {
            return x * x;
        }

        export function diag(x, y) {
            return sqrt(square(x) + square(y));
        }

    Llamar a las funciones en main.js
        import { square, diag } from 'lib';
        console.log(square(11)); // 121
        console.log(diag(4, 3)); // 5

*/
///////////////////////////
//       ESCENA 1        //
///////////////////////////

var SceneMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneMenu (){
        Phaser.Scene.call(this,{ key: 'sceneMenu'});
    },


    preload: function()
    {  
        //FUNCION ENCARGADA DE CARGAR LA MULTIMEDIA ANTES DE INICIALIZAR EL JUEGO

        // Ejemplo de imagen
        this.load.image('logo','./resources/OriginsLogo/whiteLogo.png');
        
        // Ejemplo de spritesheet
        this.load.spritesheet('nombreDeseado','directorio/nombre.png' , {frameWidth: 20, frameHeight: 20} );

        console.log("Soy preload.");
    },

    create: function ()
    {
        //FUNCION ENCARGADA DE CREAR E INICIALIZAR ANIMACIONES, GRAFICOS, JUGADORES, FISICAS, TECLAS, COLISIONES, PANTALLA

        //----- INICIALIZACION DE IMAGENES -----
        // Se pone 400 y 300 ya que son las posiciones en las que se coloca el centro de la imagen.
        this.logo = this.add.image(400, 300, 'logo');

        //----- EVENTOS DE TECLADO -----
        cursors = this.input.keyboard.createCursorKeys();


        //----- COLISIONES -----
        this.physics.add.collider(player1, player2);
        this.physics.add.overlap(player1, player2, funcionPropia, null, this); // Si colisiona se puede llamar a una de nuestras funciones

        //----- ANIMACIONES -----
            //EJEMPLO
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        console.log("Soy create.");
    },

    update: function(time, delta)
    {
        // FUNCION QUE ACTUALIZA EL JUEGO CONSTANTEMENTE

        // Ejemplo de controlador de ratón
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }
    },

});

///////////////////////////
//    ESCENA MAPA 1      //
///////////////////////////
var SceneMapa1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneMapa1 ()
    {
        Phaser.Scene.call(this, { key: 'SceneMapa1'});
    },

    preload: function()
    {
        this.load.image('mapa1','./resources/img/origins.png');
    },

    create: function ()
    {
        this.add.image(game.world.centerX, game.world.centerY, 'mapa1');
    },

    update: function (time, delta)
    {
        //Lógica del juego
    }
});


///////////////////////////
//    ESCENA MAPA 2      //
///////////////////////////

var SceneMapa2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneMapa2 ()
    {
        Phaser.Scene.call(this, { key: 'SceneMapa2'});
    },

    preload: function()
    {
        this.load.image('mapa2','./resources/img/origins.png');
    },

    create: function ()
    {
        this.add.image(game.world.centerX, game.world.centerY, 'mapa2');
    },

    update: function (time, delta)
    {
        //Lógica del juego
    }


});

///////////////////////////
//    ESCENA MAPA 1      //
///////////////////////////

var SceneMapa3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneMapa3 ()
    {
        Phaser.Scene.call(this, { key: 'SceneMapa3'});
    },

    preload: function()
    {
        this.load.image('mapa3','./resources/img/origins.png');
    },

    create: function ()
    {
        this.add.image(game.world.centerX, game.world.centerY, 'mapa3');
    },

    update: function (time, delta)
    {
        //Lógica del juego
    }


});

const config = {
    width: 800,             // Tamaño en píxeles
    height: 640,
    parent: "container",    // Contenedor
    type: Phaser.AUTO,      // Tipo - AUTO hace que Phaser detecte por sí solo si el navegador puede correr WebGL o Canvas
    scene: [SceneMenu, SceneMapa1, SceneMapa2, SceneMapa3],              // Escenas utilizadas
    Physics:{               // Creamos las fisicas y especificamos que la gravedad es igual a 0
        default: 'noGravity',
        noGravity:{
            gravity:{y : 0},
            debug: false
        }      
    }

};

// Aquí se ponen las variables
var player1;
var player2;
var score1;
var score2;


// INICIALIZACIÓN JUEGO //
var game = new Phaser.Game(config);
