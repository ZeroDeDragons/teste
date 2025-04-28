import { Menu_Jogo1 } from "./Menus/Menu_Jogo1.js";
import {EsperarDeitar, Menu_Inicio, Menu_Morte, Menu_Teclado, Menu_Final} from "./Menus/Menus.js";
window.Jwidth = window.innerWidth;
window.Jheight = window.innerHeight;
window.pontos = 0;
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#001758',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    },
    pixelArt: true,
    scene:[EsperarDeitar, Menu_Teclado, Menu_Inicio, Menu_Jogo1, Menu_Final,Menu_Morte],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    parent: 'game',
};

const game = new Phaser.Game(config);