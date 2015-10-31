var ChatServer = function( io ){
	this.io = io;
	
	this.onMessage = function( data ){
		this.io.emit("chat-message", data);
	};
	
};

module.exports = ChatServer;