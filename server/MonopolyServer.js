
var MonopolyServer = function( gameServer ){
	
	var self = this;
	
	this.gameServer = gameServer;
	
	this.addRoll = function( socket, roll ){
				
		var newPosition = socket.position + roll;
		
		var max = 36-1;
		if( newPosition > max ){
			newPosition = ( newPosition-max );
		}
		
		socket.position = newPosition;
		
		self.gameServer.io.emit("player-set", {
			color: socket.color,
			position: newPosition
		});
		
	};
	
	this.roll = function( socket ){
		
		var color = socket.color;
		
		var dice = Math.round(Math.random()*5)+1;
		
		self.addRoll( socket, dice );
		
		gameServer.io.emit("chat-message", color + " Rolled: " + dice);
		
	};
	
};

module.exports = MonopolyServer;