1. O Jogo deve ter:
- 4 categorias de barcos:
    4 barcos de tamanho 1;
    3 barcos de tamanho 2;
    2 barcos de tamanho 3;
    1 barcos de tamanho 4;

- Dois grids 10x10:
    - Um para organizar os seus barcos e mostrar a localização dos ataques
    - Outro para marcar a tela do inimigo e os locais dos seus ataques.

2. O jogo deve suportar 2 jogadores simultâneos, usando uma arquitetura cliente servidor.
- Para simplificar o projeto, no index.html coloque um campo para informa o nome e a senha da sala. Se dois usuários estiverem cadastrados na mesma sala, eles jogam contra.
- Se um terceiro usuário tentar entrar em uma sala com 2 jogadores, informe que a sala está ocupada.
    - Você pode usar um contador para o jogador (quando ele chegar em 2 a sala bloqueia)
    - Use o exemplo de login e senha do professor.

3. Antes de a partida iniciar, o jogador deve ser capaz de organizar o layout do seu grid, movendo os barcos para as posições desejadas. Você pode usar os eventos drag and drop do html5: https://www.w3schools.com/html/html5_draganddrop.asp
4. Adicione um botão randomizar e um reset para facilitar a criação e teste do grid.
5. Quando o jogo acabar, mostre quem ganhou e pergunte se o usuário gostaria de jogar novamente.

Obs1: Lógicas parecidas resultarão em zero no trabalho
Obs2: Use esse jogo como referência: http://en.battleship-game.org/