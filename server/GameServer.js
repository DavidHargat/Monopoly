
/**
* Manages socket connections.
* Contains game/lobby objects.
*/
var GameServer = function(){
	
	this.socketTable = {};
	
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
		if( socketTable[socket.id] ){
			delete socketTable[socket.id];
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
	};
	
	/**
	* Handle new socket connections.
	* @param {Socket} socket - the socket that connected.
	*/
	this.onConnect = function( socket ){
		this.addSocket(socket);
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