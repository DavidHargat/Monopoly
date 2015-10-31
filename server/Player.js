var Player = function( socket ){
	this.socket = socket;
	this.color = "grey";
	this.money = 0;
	
	this.setMoney = function( amount ){
		this.money = amount;
		this.socket.emit("set-money", amount);
	};
	
	this.setColor = function( color ){
		this.color = color;
		this.sendMessage("You Are " + color);
	};
	
	this.sendMessage = function( msg ){
		this.socket.emit("chat-message", msg);
	};
};

module.exports = Player;