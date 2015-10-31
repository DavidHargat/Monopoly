
/**
* Manages socket connections to a game instance.
* Contains game/lobby objects.
*/
var GameServer = function(){
	
	this.socketTable = {};
	this.numberOfSockets = 0;
	
	/**
	* State is either 
	* 'game' or 'lobby'.
	* Will determine how incoming connections are sorted.
	*/
	this.state = "lobby";
	
	/**
	* sets the new GameServer state and broadcasts to each client.
	*/
	this.setState = function( newState ){
		this.state = newState;
		this.broadcast("state", this.state);
	};
	
	/**
	* Sends a message to each socket.
	* @param {string} header
	* @param {Object} data
	*/
	this.broadcast = function( header, data ){
		this.forEachSocket(function( socket ){
			socket.emit(header, data);
		});
	};
	
	/**
	* Iterates through each socket in the socketTable.
	* @param {function} callback - the function to call for each socket.
	*/
	this.forEachSocket = function(callback){
		for( id in this.socketTable ){
			callback( this.socketTable[id] );
		}
	};
	
	/**
	* Remove a socket from the socket Array.
	* @param {Socket} socket - the socket to remove.
	*/
	this.removeSocket = function( socket ){
		if( this.socketTable[socket.id] ){
			delete this.socketTable[socket.id];
			this.numberOfSockets -= 1;
		}else{
			console.log("ERROR (GameServer::removeSocket) Could not remove socket ", socket);
		}
	};	
	
	/**
	* Add a socket to the socket Array.
	* @param {Socket} socket - the socket to add.
	*/
	this.addSocket = function( socket ){
		this.socketTable[socket.id] = socket;
		socket.index = this.numberOfSockets;
		this.numberOfSockets += 1;
	};
	
	this.assignSocket = function( socket ){
		if( socket.index === 0){
			socket.color = "red";
		}
		if( socket.index === 1){
			socket.color = "blue";
		}
		if(socket.index > 1){
			socket.color = "grey";
		}
		socket.emit("chat-message","You Are "+socket.color);			
	};
	
	/**
	* Handle new socket connections.
	* @param {Socket} socket - the socket that connected.
	*/
	this.onConnect = function( socket ){
		this.addSocket(socket);
		this.assignSocket(socket);
		// Send the server state to the client
		socket.emit("state", this.state);
	};
	
	/**
	* Handles socket disconnections.
	* @param {Socket} socket - the socket that disconnected.
	*/
	this.onDisconnect = function( socket ){
		this.removeSocket(socket);
	};
	
};


module.exports = GameServer;