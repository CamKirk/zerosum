let game = require('./game.js');
game.generatePlayer("gus");
game.generatePlayer("abraham");
game.startGame();

do{

game.currentPlayer.playPiece("bishop");

if(game.nextPlayer.pieces[0]){
game.currentPlayer.attack(game.currentPlayer.pieces[0],game.nextPlayer.pieces[0]);}

game.endTurn();


}while(true);




