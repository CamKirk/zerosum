let game = {};
game.playerArray = [];
game.currentPlayerIndex = 0;
game.nextPlayerIndex = 1;
game.currentPlayer = game.playerArray[game.currentPlayerIndex];
game.pieces = {
	queen: {
		name: "queen",
		health: 9,
		attack: 3,
		resourceCost: 9
	},
	bishop: {
		name: "bishop",
		health: 3,
		attack: 1,
		resourceCost: 3
	},
	pawn: {
		name: "pawn",
		health: 1,
		attack: 1,
		resourceCost: 1
	}

};
game.startGame = function () {
	if (game.playerArray.length < 2) throw "not enough players";
	game.playerArray.forEach((player) => {
		player.resources = 5;
	});
	game.endTurn();

};
game.startTurn = function () {
	game.currentPlayer.resources++;
};
game.endTurn = function () {


		if (game.currentPlayer.resources <= 0) {
			console.log(`
			----------------------
			${game.currentPlayer.name} has lost.
			Game Over.
			----------------------
			`);
			console.log(game.playerArray);
			process.exit();
			
		};

	
	game.currentPlayerIndex = game.nextPlayerIndex;
	(game.currentPlayerIndex === game.playerArray.length - 1) ? game.nextPlayerIndex = 0 : game.nextPlayerIndex++;
	game.currentPlayer = game.playerArray[game.currentPlayerIndex];
	game.nextPlayer = game.playerArray[game.nextPlayerIndex];
};
game.Player = function (name) {
	this.resources = 0;
	this.pieces = [];
	(name) ? (this.name = name) : (null);
};
game.generatePlayer = function (name) {
	game.playerArray.push(new game.Player(name));
	game.currentPlayer = game.playerArray[game.playerArray.length - 1];
};

game.Player.prototype.playPiece = function (pieceType) {

	try {
		if (!game.pieces[pieceType]) throw "not a piece";
		if (game.pieces[pieceType].resourceCost > this.resources) throw `not enough resources for ${pieceType}`;

	} catch (err) {
		console.log(err);
		return

	}

	//add to AI selection later
	// var pieceType;
	// if (this.resources >= 9){
	// 	pieceType = "queen";
	// }else if(this.resources >=3){
	// 	pieceType = "bishop";
	// }else if(this.resources > 0){
	// 	pieceType = "pawn";
	// }

	pieceToPlay = new game.Piece(pieceType, this);
	this.resources -= pieceToPlay.resourceCost;
	game.nextPlayer.resources += pieceToPlay.resourceCost;

	console.log(this.name, 'is playing', pieceType);
	this.pieces.push(pieceToPlay);



};

game.Player.prototype.attack = function (attacker, defender) {
	console.log('attacking player', this);

	//abstract this later
	defender.health -= attacker.attack;
	attacker.health -= defender.attack;
	if (defender.health <= 0) {
		console.log('defender died!');
		defender.death(defender.owner)
	}
	if (attacker.health <= 0) {
		console.log('attacker died!');
		attacker.death(attacker.owner);
	}

};

//come back and fix this trash.
game.Piece = function (piece, player) {
	let localpiece = game.pieces[piece];
	this.name = localpiece.name;
	this.health = localpiece.health;
	this.attack = localpiece.attack;
	this.resourceCost = localpiece.resourceCost;
	this.owner = player;

};

game.Piece.prototype.death = function () {
	console.log(`${this.name} is dying`);

	let pieceLocation = this.owner.pieces.indexOf(this);
	this.owner.pieces.splice(pieceLocation, 1)
	this.owner.resources -= this.resourceCost;
}


module.exports = game;
