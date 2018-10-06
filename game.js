let game = {};
game.playerArray = [];
game.currentPlayerIndex= 0;
game.nextPlayerIndex= 1;
game.currentPlayer=game.playerArray[game.currentPlayerIndex];
game.pieces = {
	queen: {
		name: "queen",
		health: 9,
		attack: 3,
		resourceCost:9
	},
	bishop: {
		name: "bishop",
		health: 3,
		attack: 1,
		resourceCost:3
	},
	pawn: {
		name: "pawn",
		health: 1,
		attack: 1,
		resourceCost:1
	}

};
game.startGame = function(){
	if(game.playerArray.length < 2) throw "not enough players";
	game.playerArray.forEach((player)=>{
		player.resources = 5;
	});
	game.endTurn();
	
};
game.startTurn = function(){
	game.currentPlayer.resources++;
};
game.endTurn = function(){

	if (game.currentPlayer.resources <= 0) return "game lost";
	game.currentPlayerIndex = game.nextPlayerIndex;
	(game.currentPlayerIndex === game.playerArray.length-1) ? game.nextPlayerIndex = 0:game.nextPlayerIndex++;
	game.currentPlayer=game.playerArray[game.currentPlayerIndex];
	game.nextPlayer=game.playerArray[game.nextPlayerIndex];
};
game.Player = function(name){
	this.resources = 0;
	this.pieces = [];
	name ? this.name = name : null;
};
game.generatePlayer = function(name){
	game.playerArray.push(new game.Player(name));
	game.currentPlayer = game.playerArray[game.playerArray.length-1];
};

//come back and fix this trash.

game.Piece = function(piece){
	let localpiece = game.pieces[piece];
	this.name = localpiece.name;
	this.health = localpiece.health;
	this.attack = localpiece.attack;
	this.resourceCost = localpiece.resourceCost;

};

game.Player.prototype.playPiece = function(pieceType){
	if (!game.pieces[pieceType]) throw "not a piece";
	if (game.pieces[pieceType].resourceCost > this.resources) throw "not enough resources for this piece";
	//add to AI selection later
	// var pieceType;
	// if (this.resources >= 9){
	// 	pieceType = "queen";
	// }else if(this.resources >=3){
	// 	pieceType = "bishop";
	// }else if(this.resources > 0){
	// 	pieceType = "pawn";
	// }

	pieceToPlay = new game.Piece(pieceType);
	this.resources -= pieceToPlay.resourceCost;
	game.nextPlayer.resources+= pieceToPlay.resourceCost;
	
	console.log(this.name, 'is playing', pieceType);
	this.pieces.push(pieceToPlay);


	
};

game.Player.prototype.attack = function(attacker, defender){
	console.log('defender',this);
	
	defender.health -= attacker.attack;
	attacker.health -= defender.attack;
	if(defender.health <= 0){
		console.log('piece died!');
	}
	if (attacker.health <=0){
		console.log('piece died!');
		
	}
	
};

module.exports = game;
