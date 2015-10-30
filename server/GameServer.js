
var GameServer = function(){
	
	this.sockets = [];
		
	this.removeSocket = function( socket ){
		var i = this.sockets.indexOf(socket);
		if( i > -1){
			this.sockets.splice(i,1);
		}else{
			console.log("ERROR (GameServer::removeSocket) Could not remove socket ", socket);
		}
	};	
	
	this.addSocket = function( socket ){
		this.sockets.push(socket);
	};
	
	this.onConnect = function( socket ){
		this.addSocket(socket);
	};
	
	this.onDisconnect = function( socket ){
		this.removeSocket(socket);
	};
	
	
};


module.exports = GameServer;