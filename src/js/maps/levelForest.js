class sceneForestLevel extends Phaser.Scene {
    constructor() {
        super({key: "sceneForestLevel",
            active: false
        });
    }
    create() {
        // Fondo
        this.add.image(400, 320, "forestMap");

    }
    update(time, delta){

    }
}

export default sceneForestLevel;