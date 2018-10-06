var game = require('./game.js');
// console.log(game);
let turn = 0;
game.generatePlayer("gus");
game.generatePlayer("abraham");
game.startGame();

do{

game.currentPlayer.playPiece("bishop");

if(game.nextPlayer.pieces[0]){
game.currentPlayer.attack(game.currentPlayer.pieces[0],game.nextPlayer.pieces[0]);}

game.endTurn();
turn++;
console.log(game.playerArray);
}while(turn<10);

