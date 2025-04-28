export class Chao {
    constructor(cena) {
        this.cenario = cena;
        this.objetos = [];  // Array para armazenar os objetos criados
    }

    preload() {
        // Carregar a imagem do chão
        this.cenario.load.spritesheet("Chao" , "assets/Chao.png", { frameWidth: 32, frameHeight: 32 });
    }

    create(x, y, frame, tipo, r = 0) {
        frame--;
        // Criar o sprite do chão
        let chao = this.cenario.physics.add.sprite(x, y, "Chao", frame).setOrigin(0.5, 0.5).setData('tipo', tipo);

        // Definir o chão como imutável e sem gravidade
        chao.setImmovable(true);  // Impede que o chão se mova
        chao.body.allowGravity = false;  // Desabilita a gravidade para o chão
        chao.scale = escala;  // Ajustar o tamanho do chão
        chao.angle = r;  // Rotacionar o chão se necessário
        // Adicionar o chão ao array de objetos
        this.objetos.push(chao);
    }

    // Método para obter todos os objetos criados
    getObjetos() {
        return this.objetos;
    }
}

export class Plataforma 
{

    constructor(cena) {
        this.cenario = cena;
    }

    preload() {
        // Carregar a imagem da plataforma
        this.cenario.load.spritesheet("Porta" , "assets/porta.png", { frameWidth: 48, frameHeight: 48 });
    }

    create(x, y) 
    {
        // Criar o sprite da plataforma
        this.porta = this.cenario.physics.add.sprite(x, y, "Porta", 0).setOrigin(0.5, 0.5).setData('tipo', 'porta');
        this.porta.setImmovable(true);  // Impede que a plataforma se mova
        this.porta.body.allowGravity = false;  // Desabilita a gravidade para a plataforma
        this.porta.scale = escala;  // Ajustar o tamanho da plataforma
        this.cenario.anims.create({
            key: 'Porta',  // nome da animação
            frames: this.cenario.anims.generateFrameNumbers('Porta', { start: 0, end: 2 }),  // usa os frames 0 até 5
            frameRate: 5,  // quantos quadrinhos por segundo (quanto maior, mais rápido)
            repeat: 0  // repetir para sempre
        });
    }

    anim() {
        // Iniciar a animação da plataforma
        if(!(this.porta.anims.currentAnim && this.porta.anims.currentAnim.key === 'Porta' && this.porta.anims.isPlaying))
        {
            this.porta.play('Porta');  // Iniciar a animação da plataforma
            this.cenario.time.delayedCall(200, () => {
                this.cenario.scene.start("Menu_Final")
            });
        }
    }
}