var Player = function( game, socket ){
	var self = this;
	this.id = socket.id;
	this.game = game;
	this.socket = socket;
	this.color = "grey";
	this.money = 0;
	this.position = 0;
	
	this.setPosition = function( pos ){
		self.position = pos;
		
		// Refactor
		self.game.gameServer.io.emit("player-set", {
			color: self.color,
			position: pos
		});
	};
	
	this.setMoney = function( amount ){
		self.money = amount;
		self.socket.emit("set-money", amount);
	};
	
	this.setColor = function( color ){
		self.color = color;
		self.message("You Are " + color);
	};
	
	this.message = function( msg ){
		self.socket.emit("chat-message", msg);
	};
	
	this.setMoney(0);
};

module.exports = Player;