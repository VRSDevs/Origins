const config = {
    width: 800,             // Tamaño en píxeles
    height: 600,
    parent: "container",    // Contenedor
    type: Phaser.AUTO,      // Tipo - AUTO hace que Phaser detecte por sí solo si el navegador puede correr WebGL o Canvas
    scene: {                // Funciones importantes de nuestra escena
        preload: preload,
        create: create,
        update: update
    },
};

// INICIALIZACIÓN JUEGO //
var game = new Phaser.Game(config);

// FUNCIONES ESCENA //
function preload() {
    console.log("Soy preload.");
}

function create() {
    console.log("Soy create.");
}

function update(time, delta) {

}