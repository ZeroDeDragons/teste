import {Chao, Plataforma} from "../Componentes/Objs.js";
import {Player} from "../Componentes/Player.js";
import {MapaEstilo} from "../Componentes/Mapa.js";
export class Menu_Jogo1 extends Phaser.Scene 
{
    constructor()
    {
        super({key: "Menu_Jogo1"});
        this.Chao = new Chao(this);
        this.Player = new Player(this);
        this.Plataforma = new Plataforma(this);
    }

    preload()
    {
        this.load.image("Sky", "assets/Sky.png");
        this.Chao.preload();
        this.Player.preload();
        this.Plataforma.preload();
        this.mapas = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 16, 0, 0, 0, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 6, 6, 6, 7, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 5, 6, 6, 7, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 8, 18, 14, 0, -3, 0, 0, 0, 0, 0, 0, 0, 0],
            [-1, 0, 0, 0, 0, 0, 0, 8, 0, 18, 15, 5, 7, 0, 0, 0, -3, 0, 0, 0, -2],
            [1, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3]
        ];
        var w1 = 0, w2 = 0, h = 0;
        var w1 = 0, w2 = 0, h = 0;
        for (let mapa of this.mapas) {
            w1 = mapa.length;  // A largura do mapa é o número de elementos no mapa (sublista)
            h += 1;  // Conta o número de mapas (altura)

            if (w2 < w1) {
                w2 = w1;  // Atualiza a largura máxima (w2)
            }
        }
        Jwidth = w2*(32*escala); // Largura do mapa em pixels
        Jheight = h*(32*escala); // Altura do mapa em pixels      
    }

    create()
    {
        const ceu = this.add.image(0, 0, "Sky").setOrigin(0, 0);
        ceu.displayWidth = Jwidth;
        ceu.displayHeight = Jheight;
        this.physics.world.setBounds(0, 0, Jwidth, Jheight);  // Define os limites do mundo físico
        let pos = MapaEstilo(this.mapas, this.Chao, this.Plataforma);  // Cria o mapa usando a função MapaEstilo
        this.Player.create(pos.x, pos.y);
        this.physics.add.collider(this.Player.player, this.Plataforma.porta
            , (player, objeto) => {
                this.Plataforma.anim();  // Inicia a animação da plataforma
            }
        );
        this.physics.add.collider(this.Player.player, this.Chao.getObjetos(),
        (player, objeto) => {
            const tipo = objeto.getData('tipo');
            
            if (tipo == 1) {
                if (player.body.touching.down) {
                    this.Player.Dano("Up");
                    // A colisão foi em cima (por exemplo, quando o player pulou para cima e bateu na plataforma)
                } else if (player.body.touching.left) {
                    this.Player.Dano("Left");
                    // A colisão foi no lado esquerdo (o player bateu na parede da plataforma)
                } else if (player.body.touching.right) {
                    this.Player.Dano("Right");
                    // A colisão foi no lado direito (o player bateu na parede da plataforma)
                }
            }else if (tipo == 2) 
            {
                objeto.destroy();
                this.Player.Pontos();  // Adiciona pontos ao player
            }
        });  // Adiciona colisão entre o player e os objetos
    }

    update()
    {
        this.Player.update();  // Atualiza o player
    }
}