//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { user } from '../user.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Control ************************//
var mode = 0;
//******************* Texto ************************//
var txtSI = undefined;
var txtLI = undefined;

//////////////////////////////////////////////////////////////////////
//                   Clase de escena de menú de logueo              //
//////////////////////////////////////////////////////////////////////
class sceneLoginMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneLoginMenu",
        })
    }

    create() {
        //******************* Botones de acceso ************************//
        txtSI = this.add.text(400, 200, "Register", { 
            fontFamily: 'Consolas', 
            color: '#00ff00', 
        });

        txtSI.addListener('pointerdown', () => {
            mode = 1;
            console.log(mode);
        }, this);

        txtLI = this.add.text(400, 400, "Log in", { 
            fontFamily: 'Consolas', 
            color: '#00ff00', 
        });

        txtLI.addListener('pointerdown', () => {
            mode = 2;
            console.log(mode);
        }, this);
    }

    update() {

    }
}

//////////////////////////////////////////////////////////////////////
//                      Funciones HTTP                              //
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
//                   Funciones extras                               //
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneLoginMenu;