export class Player 
{

    constructor(cena) {
        this.cenario = cena;  // Referência à cena (passada ao instanciar a classe)
    }
    
    preload() {
        // Carregar a imagem do player
        this.cenario.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        this.cenario.load.spritesheet('Botao', 'assets/shift_botao.png', {frameWidth: 32, frameHeight: 32});  // Lembre-se de usar o caminho correto da imagem
        this.cenario.load.spritesheet('andar', 'assets/correr.png', {frameWidth: 32, frameHeight: 32});  // Lembre-se de usar o caminho correto da imagem
        this.cenario.load.spritesheet('pular', 'assets/pular.png', {frameWidth: 32, frameHeight: 32});  // Lembre-se de usar o caminho correto da imagem
        this.cenario.load.spritesheet('parado', 'assets/parado.png', {frameWidth: 29, frameHeight: 32});  // Lembre-se de usar o caminho correto da imagem
        this.cenario.load.spritesheet('dano', 'assets/hit_sheet.png', {frameWidth: 32, frameHeight: 32});  // Lembre-se de usar o caminho correto da imagem
        this.cenario.load.spritesheet('biscoito', 'assets/energia.png', {frameWidth: 48, frameHeight: 16});  // Lembre-se de usar o caminho correto da imagem
        this.cenario.load.spritesheet('vida', 'assets/vida.png', {frameWidth: 48, frameHeight: 16});  // Lembre-se de usar o caminho correto da imagem
        this.energia = 100;  // Inicializar a energia do player
        this.vida = 3;
        this.dano = false;
        this.dano1 = false;
    }

    create(x, y) {
        // Criar o player na cena
        this.player = this.cenario.physics.add.sprite(100, 300, 'andar', 1);  // Posição inicial do player
        this.player.setScale(escala);  // Ajustar o tamanho do player
        this.player.setBounce(0.2);  // Faz o player "quicar" um pouco
        this.player.setCollideWorldBounds(true);  // Impede que o player saia da tela

        this.Energia = this.cenario.add.sprite(0, 16*escala, 'biscoito', 0).setScale(escala).setOrigin(0, 0);  // Posição inicial do player
        this.Energia.setScrollFactor(0);
        this.Vida = this.cenario.add.sprite(0, 0, 'vida', 3).setScale(escala).setOrigin(0, 0);  // Posição inicial do player
        this.Vida.setScrollFactor(0);
        // Controlar as setas do teclado
        this.cenario.cursors = this.cenario.input.keyboard.createCursorKeys();  // Usando o input da cena para capturar as setas
        this.shiftKey = this.cenario.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.shiftKey.on('up', () => {
            this.velocidade = 64 * escala; // Resetar ao soltar o Shift
        });
        // Configurar a câmera para seguir o player
        this.cenario.cameras.main.startFollow(this.player);  // A câmera começa a seguir o player
        this.cenario.cameras.main.setFollowOffset(0, 0);  // Ajuste para que a câmera fique um pouco acima do player
        this.cenario.cameras.main.setLerp(0.1);  // Suaviza o movimento da câmera
    
        // Definir os limites da câmera para o mundo
        // Supondo que o tamanho do mundo seja 1600x1200 (ajuste conforme seu cenário)
        this.cenario.cameras.main.setBounds(0, 0, Jwidth, Jheight);  // Limites do mundo (pode ser o tamanho do seu cenário)
    
        // Configurar a colisão entre o player e o mundo
        this.cenario.physics.add.collider(this.player, this.cenario.physics.world.colliders);

        this.cenario.anims.create({
            key: 'andar',  // nome da animação
            frames: this.cenario.anims.generateFrameNumbers('andar', { start: 0, end: 5 }),  // usa os frames 0 até 5
            frameRate: 10,  // quantos quadrinhos por segundo (quanto maior, mais rápido)
            repeat: 0  // repetir para sempre
        });
        this.cenario.anims.create({
            key: 'pular',  // nome da animação
            frames: this.cenario.anims.generateFrameNumbers('pular', { start: 0, end: 5 }),  // usa os frames 0 até 5
            frameRate: 10,  // quantos quadrinhos por segundo (quanto maior, mais rápido)
            repeat: 0  // repetir para sempre
        });
        this.cenario.anims.create({
            key: 'parado',  // nome da animação
            frames: this.cenario.anims.generateFrameNumbers('parado', { start: 0, end: 5 }),  // usa os frames 0 até 5
            frameRate: 10,  // quantos quadrinhos por segundo (quanto maior, mais rápido)
            repeat: -1  // repetir para sempre
        });
        this.cenario.anims.create({
            key: 'dano',  // nome da animação
            frames: this.cenario.anims.generateFrameNumbers('dano', { start: 0, end: 2 }),  // usa os frames 0 até 5
            frameRate: 5,  // quantos quadrinhos por segundo (quanto maior, mais rápido)
            repeat: 2  // repetir para sempre
        });
        this.player.x = x; // manda o player para a posição 300 na horizontal
        this.player.y = y;
        this.score = this.cenario.add.text(window.innerWidth, 0, ("Pontos: " + pontos), { 
            fontSize: "32px",
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "#00ff00", 
            backgroundColor: "" 
        }).setOrigin(1, 0).setScrollFactor(0); // Adiciona o texto de pontos na tela
        if(this.cenario.registry.get('Controles'))
            {
                const JX = 64*escala, JY = window.innerHeight-64*escala; // Posição do joystick
    
                let Radidao = false;
                    
                // Criar o botão interativo
                this.Shift = this.cenario.add.sprite(this.cenario.cameras.main.width - 32*escala,  this.cenario.cameras.main.height - 32*escala, "Botao", 0)
                    .setScale(2)
                    .setOrigin(0.5, 0.5)
                    .setInteractive()
                    .setScrollFactor(0);
    
                // Adicionar eventos ao botão
                this.Shift.on('pointerdown', () => {
                    console.log('Botão pressionado');
                    Radidao = true; // Estado do botão alterado ao pressionar
                });
            
                this.Shift.on('pointerup', () => {
                    console.log('Botão liberado');
                    Radidao = false; // Estado do botão alterado ao soltar
                });
            
                this.Shift.on('pointerout', () => {
                    console.log('Pointer saiu do botão');
                    Radidao = false; // Garante que o estado seja atualizado ao sair do botão
                });
            
                // Criar o joystick virtual
                this.joyStick = this.cenario.plugins.get('rexvirtualjoystickplugin').add(this.cenario, {
                    x: JX,
                    y: JY,
                    radius: 100,
                    enable: true
                });
            
                // Adicionar eventos ao joystick
                this.joyStick.on('move', function (pointer, x, y, dragX, dragY) {
                    console.log(`Joystick movido: X=${dragX}, Y=${dragY}`);
                
                    // Exemplo: Lógica para movimentar algo com o joystick
                    if (dragX !== 0 || dragY !== 0) {
                        console.log('Movendo personagem com o joystick');
                    }
                });
            
                // Permitir múltiplos toques (para uso simultâneo do joystick e botão)
                this.cenario.input.addPointer(3); // Suporta até 3 toques simultâneos
            
                // Atualização no loop
                this.cenario.events.on('update', () => {
                    if (Radidao) {
                        console.log('Botão está sendo segurado', this.energia);
                    }
                
                    const forceX = this.joyStick.forceX; // Força aplicada no eixo X
                    const forceY = this.joyStick.forceY; // Força aplicada no eixo Y
                
                    if (forceX || forceY) {
                        console.log(`Joystick força: X=${forceX}, Y=${forceY}`);
                    }
                });
    
                this.player.setData("Controles_atual",
                {
                    mexer:()=>
                    {
                        const { player} = this; // Desestruturando para evitar múltiplos `this`
                        var deltaX = this.joyStick.thumb.x - JX;
                        var deltaY = this.joyStick.thumb.y - JY;
    
                        const anim = player.anims.currentAnim && player.anims.currentAnim.key === 'dano' && player.anims.isPlaying;
    
                        this.Shift.on("pointerdown", () => {
                            this.Shift.setFrame(1); 
                            Radidao = true;
                        });
            
                        this.Shift.on("pointerup", () => {
                            this.Shift.setFrame(0);
                            Radidao = false;
                        });
            
                        this.Shift.on("pointerout", () => {
                            if (Radidao) {
                                this.Shift.setFrame(0);
                                Radidao = false;
                            }
                        });
            
                        this.Shift.on("pointerover", () => {
                            if (Radidao) {
                                this.Shift.setFrame(1);
                            }
                        });
    
                        if (Radidao && this.energia >= 1) 
                        {  
                            velocidade = 128 * escala; // dobra a velocidade
                            this.energia -= 1; // diminui a energia
                        }
                        else
                        {  
                            velocidade = 64 * escala; // dobra a velocidade
                            if(this.energia+1 <= 100)
                            this.energia += 0.5; // aumenta a energia
                        }
    
                        if (deltaX < 0) 
                        {
                            this.player.anims.play('andar', true);
                            this.player.flipX = true; 
                            this.player.setVelocityX(-velocidade);
                        } 
                        else if (deltaX > 0) 
                        {
                            this.player.anims.play('andar', true);
                            this.player.flipX = false; 
                            this.player.setVelocityX(velocidade);
                        } 
                        else if (deltaX === 0) 
                        {
                            if (this.player.body.touching.down) {
                                if (!(this.player.anims.currentAnim && this.player.anims.currentAnim.key === 'dano') && this.dano == false)this.player.anims.play('parado', true);
                            }
                            this.player.setVelocityX(0);
                        }
                        if (deltaY < -25 && player.body.touching.down) 
                        {
                            this.player.setVelocityY(-velocidadepular * 1.9);  
                            this.player.anims.play('pular', true);  
                        }
                    }
                });
            }
            else
            {
                this.player.setData("Controles_atual",
                {
                    mexer:()=>
                    {
                        if (this.cenario.cursors.up.isDown && this.player.body.touching.down)
                        {
                            this.player.setVelocityY(-velocidadepular * 1.9);  
                            this.player.anims.play('pular', true);  
                        } 
                        else if (this.cenario.cursors.right.isDown) {
                            this.player.anims.play('andar', true);
                            this.player.flipX = false; 
                            this.player.setVelocityX(velocidade);
                        } 
                        else if (this.cenario.cursors.left.isDown) {
                            this.player.anims.play('andar', true);
                            this.player.flipX = true; 
                            this.player.setVelocityX(-velocidade);
                        }
                        else {
                            if (this.player.body.touching.down) {
                                if (!(this.player.anims.currentAnim && this.player.anims.currentAnim.key === 'dano') && this.dano == false)this.player.anims.play('parado', true);
                            }
                            this.player.setVelocityX(0);
                        }
                        // Agora aumenta a velocidade só quando estiver pressionando Shift
                        if (this.shiftKey.isDown && this.energia > 0) 
                        {
                            velocidade = 128 * escala; // dobra a velocidade
                            this.energia -= 1; // diminui a energia
                        }
                        else
                        {
                            if(this.energia+1 <= 100)
                            this.energia += 0.5; // aumenta a energia
                        }
                    }
                });
            }
    }

    Pontos()
    {
        pontos += 1; // Adiciona 1 ponto
        this.score.setText("Pontos: " + pontos); // Atualiza o texto de pontos na tela
    }
    Dano(tocar) 
    {
        if(this.dano == false)
        {
            this.vida -= 1; // diminui a vida
            this.dano = true;
            this.dano1 = true;
            this.cenario.time.delayedCall(1000, () => {
                this.dano = false;
            });
            this.cenario.time.delayedCall(500, () => {
                this.dano1 = false;
            });

            this.cenario.time.delayedCall(200, () => {
                this.player.setVelocityY(0);
                this.player.setVelocityX(0); // para de se mover
            });
            this.player.anims.play('dano', true);
            this.player.setVelocityY(-100);
            if (this.player.flipX === true && tocar == "Left") {
                this.player.setVelocityX(250); // para de se mover
            } else if (this.player.flipX !== true && tocar == "Right") {
                this.player.setVelocityX(-250); // para de se mover
            }

            if (this.vida <= 0) {
                this.vida = 0; // impede que a vida fique negativa
                console.log("Game Over"); // Aqui você pode adicionar lógica para o game over
                this.cenario.time.delayedCall(200, () => {
                    this.cenario.scene.start("Menu_Morte");
                });
            }
            if(this.vida == 0) {
                this.Vida.setFrame(0); // muda a vida para 0
            }else if(this.vida == 1) {
                this.Vida.setFrame(1); // muda a vida para 0
            }else if(this.vida == 2) {
                this.Vida.setFrame(2); // muda a vida para 0
            }else if(this.vida == 3) {
                this.Vida.setFrame(3); // muda a vida para 0
            }
        }
    }

    update() 
    {
        if(!this.dano1)
        {
            const Criar = this.player.getData("Controles_atual").mexer.bind(this); Criar();  
        }
        if(this.player.y >= this.cenario.physics.world.bounds.height-16*escala)
        {
            this.cenario.scene.start("Menu_Morte");
        }

        if (this.energia <= 10) {
            this.Energia.setFrame(9);
        }else
        if (this.energia <= 20) {
            this.Energia.setFrame(8);
        }
        else if (this.energia <= 30) {
            this.Energia.setFrame(7);
        }
        else if (this.energia <= 40) {
            this.Energia.setFrame(6);
        }
        else if (this.energia <= 50) {
            this.Energia.setFrame(5);
        }
        else if (this.energia <= 60) {
            this.Energia.setFrame(4);
        }
        else if (this.energia <= 70) {
            this.Energia.setFrame(3);
        }
        else if (this.energia <= 80) {
            this.Energia.setFrame(2);
        }
        else if (this.energia <= 90) {
            this.Energia.setFrame(1);
        }
        else {
            this.Energia.setFrame(0);
        }
    }
                    
}