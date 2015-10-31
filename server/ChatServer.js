var ChatServer = function( io ){
	var self = this;
	
	this.io = io;
	
	this.onMessage = function( data ){
		
		if( this.isCommand(data) ){
			// Its a command
			this.onCommand(data);
		}else{
			this.io.emit("chat-message", data);
		}
		
	};
	
	this.onRoll = function(){
		
	};
	
	this.onCommand = function( data ){
		var commands = {
			"/roll": self.onRoll
		};
		
		var cmd = commands[data];
		if( cmd ){
			cmd();
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