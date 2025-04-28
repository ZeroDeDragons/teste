export class Menu_Morte extends Phaser.Scene {
    constructor() {
        super({key: "Menu_Morte"});        
    }

    preload() {
        this.load.image("Sky", "assets/Menu.png");
        this.load.spritesheet("Botaos", "assets/morte.png", { frameWidth: 32, frameHeight: 32 });        
    }

    create() {
        // Adicionando fundo
        const ceu = this.add.image(0, 0, "Sky").setOrigin(0, 0);
        ceu.displayWidth = Jwidth;            
        ceu.displayHeight = Jheight;
        let x = window.innerWidth /2;
        let y = window.innerHeight/2;
        let play = this.add.sprite(x, y, "Botaos", 0).setOrigin(0.5, 0.5).setScale(escala*2).setInteractive();
        play.on("pointerover",()=>{play.setFrame(1)});
        play.on("pointerout",()=> {play.setFrame(0)});
        play.on("pointerdown",()=>{play.setFrame(1),setTimeout(()=> {this.scene.start("Menu_Jogo1")},500)});
    }
}

export class Menu_Teclado extends Phaser.Scene
{
    constructor()
    {
        super({key: "Menu_Teclado"});
    }
    preload()
    {
        this.load.image("Sky", "assets/menu.png");
        this.load.spritesheet("Botao_", "assets/tipodejogo.png", { frameWidth: 32, frameHeight: 32 });
    }
    create()
    {
        const ceu = this.add.image(0    , 0, "Sky").setOrigin(0, 0);
        ceu.displayWidth = Jwidth;
        ceu.displayHeight = Jheight;
        
        let play = this.add.sprite(Jwidth/2, Jheight/2 - 64*escala, "Botao_", 0).setOrigin(0.5, 0.5).setScale(escala*2).setInteractive();
        play.on("pointerover",()=>{play.setFrame(1)});
        play.on("pointerout",()=> {play.setFrame(0)});
        play.on("pointerdown",()=>{play.setFrame(1),setTimeout(()=> {this.registry.set('Controles',false),this.scene.start("Menu_Inicio")},500)});
        
        let sair = this.add.sprite(Jwidth/2, Jheight/2 + 64*escala, "Botao_",2).setOrigin(0.5, 0.5).setScale(escala*2).setInteractive();
        sair.on("pointerover",()=>{sair.setFrame(3)});
        sair.on("pointerout",()=> {sair.setFrame(2)});
        sair.on("pointerdown",()=>{sair.setFrame(3),setTimeout(()=> {this.registry.set('Controles',true),this.scene.start("Menu_Inicio")},500)});
        
    }
}

export class Menu_Inicio extends Phaser.Scene {
    constructor() {
        super({key: "Menu_Inicio"});        
    }

    preload() {
        this.load.image("Sky", "assets/Menu.png");
        this.load.spritesheet("Botas", "assets/botao_pausa.png", { frameWidth: 32, frameHeight: 32 });        
    }

    create() {
        // Adicionando fundo
        const ceu = this.add.image(0, 0, "Sky").setOrigin(0, 0);
        ceu.displayWidth = Jwidth;            
        ceu.displayHeight = Jheight;
        let x = window.innerWidth /2;
        let y = window.innerHeight/2;
        let play = this.add.sprite(x, y, "Botas", 0).setOrigin(0.5, 0.5).setScale(escala*2).setInteractive();
        play.on("pointerover",()=>{play.setFrame(1)});
        play.on("pointerout",()=> {play.setFrame(0)});
        play.on("pointerdown",()=>{play.setFrame(1),setTimeout(()=> {this.scene.start("Menu_Jogo1")},500)});
    }
}

export class Menu_Final extends Phaser.Scene {
    constructor() {
        super({key: "Menu_Final"});        
    }

    preload() {
        this.load.image("Sky", "assets/Menu.png");
        this.load.spritesheet("Botas", "assets/botao_pausa.png", { frameWidth: 32, frameHeight: 32 });        
    }

    create() {
        // Adicionando fundo
        const ceu = this.add.image(0, 0, "Sky").setOrigin(0, 0);
        ceu.displayWidth = Jwidth;            
        ceu.displayHeight = Jheight;
        let x = window.innerWidth /2;
        let y = window.innerHeight/2;
        let play = this.add.sprite(x, y, "Botas", 0).setOrigin(0.5, 0.5).setScale(escala*2).setInteractive();
        play.on("pointerover",()=>{play.setFrame(1)});
        play.on("pointerout",()=> {play.setFrame(0)});
        play.on("pointerdown",()=>{play.setFrame(1),setTimeout(()=> {this.scene.start("Menu_Jogo1")},500)});
        var tamanho = 32*escala;
        this.add.text(x-192, y-80*escala, "Você Venceu! Pontos: "+ pontos, { 
            fontSize: "32px",
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "#00ff00", 
            backgroundColor: "" 
        });

        this.add.text(x-240, y+40*escala, "Feito por Jorge, Gustavo e João!", { 
            fontSize: "32px",
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "#00ff00", 
            backgroundColor: "" 
        });
        
    }
}

export class EsperarDeitar extends Phaser.Scene {
    constructor() {
        super('EsperarDeitar');
    }

    create() {
        // Toda vez que a tela mudar de orientação (virar)
        this.scale.on('orientationchange', () => {
            console.log('Tela virou! Atualizando página...');
            window.location.reload(); // <- isso recarrega a página
        });

        // Quando abrir o jogo, checar já
        this.checarSeDeitou();
    }

    checarSeDeitou() {
        if (this.scale.orientation === Phaser.Scale.LANDSCAPE) {
            console.log("Tela já está deitada! Começando o jogo...");
            this.startGame();
        } else {
            console.log("Tela em pé! Mostrando aviso...");
            this.mostrarAviso();
        }
    }

    mostrarAviso() {
        if (!this.avisoTexto) {
            // Mostra um texto no meio avisando
            this.avisoTexto = this.add.text(this.scale.width / 2, this.scale.height / 2, 'VIRE O CELULAR', {
                fontSize: '48px',
                color: '#ff0000'
            }).setOrigin(0.5);
        }
    }

    startGame() {
        // Configurações dependendo do tamanho da tela
        if (window.innerWidth <= 1080 && window.innerHeight <= 2400) {
            window.velocidade = 64 * 2.5;
            window.velocidadepular = 64 * 2.5;
            window.escala = 2;
        } else {
            window.velocidade = 64 * 3;
            window.velocidadepular = 64 * 3;
            window.escala = 3;
        }

        // Some com o aviso
        if (this.avisoTexto) {
            this.avisoTexto.destroy();
        }

        // Começa o jogo de verdade
        this.scene.start('Menu_Teclado');
    }
}
