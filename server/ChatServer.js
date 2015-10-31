var ChatServer = function( gameServer ){
	var self = this;
	
	this.gameServer = gameServer;
	
	this.onMessage = function( socket, data ){
		if( self.isCommand(data) ){
			// Its a command
			self.onCommand(socket, data);
		}else{
			self.gameServer.io.emit("chat-message", data);
		}
	};
	
	this.onRoll = function( socket ){
		self.gameServer.monopoly.roll( socket );
	};
	
	this.onCommand = function( socket,  data ){
		var commands = {
			"/roll": self.onRoll
		};
		
		var cmd = commands[data];
		if( cmd ){
			cmd( socket );
		}
	};
	
	this.isCommand = function( data ){
		if(data.length>=1){			
			var first = data[0];
			return first==='/';
		}else{
			return false;
		}
	};
};

module.exports = ChatServer;