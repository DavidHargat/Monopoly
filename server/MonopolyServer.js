
var MonopolyServer = function( io ){
	
	var self = this;
	
	this.io = io;
	
	this.roll = function( socket ){
		
		var dice = Math.round(Math.random()*6)+1;
		self.io.emit("chat-message", "Rolled: " + dice);
		
	};
	
};

module.exports = MonopolyServer;