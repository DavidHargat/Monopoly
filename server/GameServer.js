var ChatServer = require("./ChatServer.js");
var MonopolyServer = require("./MonopolyServer.js");

/**
* Manages socket connections to a game instance.
* Contains game/lobby objects.
*/
var GameServer = function( io ){
	
	
	var self = this;
	
	this.io = io;
	
	this.chat = new ChatServer( this );
	this.monopoly = new MonopolyServer( this );
	
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
	

	
	/**
	* Handle new socket connections.
	* @param {Socket} socket - the socket that connected.
	*/
	this.onConnect = function( socket ){
		this.addSocket(socket);

		// Send the server state to the client
		var player = this.monopoly.createPlayer(socket);
		this.monopoly.addPlayer(player);
		this.monopoly.assignPlayer(player);
		
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