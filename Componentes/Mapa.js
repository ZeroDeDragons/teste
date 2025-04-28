export function MapaEstilo(mapas, chao, plataforma) {
    var x = 16*escala, y = 16*escala, x1, y1; // Posição inicial do player
    for (let j = 0; j < mapas.length; j++)
    {
        for (let i = 0; i < mapas[j].length; i++)
        {
            if(mapas[j][i] == -1) {
                x1=x; y1=y // Retorna a posição inicial do player
            }else if(mapas[j][i] == -2) {
                plataforma.create(x-8*escala, y-8*escala); // Cria a plataforma
            }

            if(mapas[j][i] == -3) {
                chao.create(x, y, 17, 2); // Chão de terra nevado
            }
            else if(mapas[j][i] == 1) {
                chao.create(x, y, 1, 0); // Chão de terra nevado
            }
            else if(mapas[j][i] == 2) {
                chao.create(x, y, 2, 0); // Chão de nuvem
            }
            else if(mapas[j][i] == 3) {
                chao.create(x, y, 3, 0); // Chão de gelo
            }
            else if(mapas[j][i] == 4) {
                chao.create(x, y, 4, 0); // Espinhos
            }
            else if(mapas[j][i] == 5) {
                chao.create(x, y, 5, 0); // Espinhos
            }
            else if(mapas[j][i] == 6) {
                chao.create(x, y, 6, 0); // Chão de terra nevado
            }else if(mapas[j][i] == 7) {
                chao.create(x, y, 7, 0); // Chão de nuvem
            }
            else if(mapas[j][i] == 8) {
                chao.create(x, y, 8, 0); // Chão de gelo
            }
            else if(mapas[j][i] == 9) {
                chao.create(x, y, 9, 0); // gelo
            }
            else if(mapas[j][i] == 10) {
                chao.create(x, y, 10, 0); // Espinhos
            }else if(mapas[j][i] == 11) {
                chao.create(x, y, 11, 0); // Chão de terra nevado
            }
            else if(mapas[j][i] == 12) {
                chao.create(x, y, 12, 0); // Chão de nuvem
            }
            else if(mapas[j][i] == 13) {
                chao.create(x, y, 9, 1, 90); // Chão de gelo
            }
            else if(mapas[j][i] == 14) {
                chao.create(x, y, 10, 1, 90); 
            }
            else if(mapas[j][i] == 15) {
                chao.create(x, y, 11, 1, 90); 
            }else if(mapas[j][i] == 16) {
                chao.create(x, y, 13, 1); // Espinhos
            }else if(mapas[j][i] == 17) {
                chao.create(x, y, 14, 1); // Espinhos
            }else if(mapas[j][i] == 18) {
                chao.create(x, y, 15, 1); // Espinhos
            }else if(mapas[j][i] == 19) {
                chao.create(x, y, 16, 1); // Espinhos
            }
            x += 32*escala;
        }
        y += 32*escala;
        x = 0;
    }
    return {x: x1, y: y1}; // Retorna a posição inicial do player
}