var Player = require('./Player.js');

var MonopolyServer = function( gameServer ){
	
	var self = this;
	
	this.gameServer = gameServer;
	this.players = [];
	this.playerMap = {};
	
	var playerIndex = 0;
	
	this.addPlayer = function( player ){
		this.players.push(player);
		this.playerMap[player.id] = player;
		player.index = playerIndex;
		playerIndex++;
	};
	
	this.removePlayer = function( player ){
		var i = this.players.indexOf(player);
		if(i > -1){
			player.splice(i,1);
			delete this.playerMap[player.id];
			playerIndex--;
		}else{
			console.log("WARNING (MonopolyServer::removePlayer) Attempted to remove unindexed player.");
		}
	};
	
	this.getPlayerId = function( id ){
		if( this.playerMap[id] ){
			return this.playerMap[id];
		}else{
			return;
		}
	};
	
	this.assignPlayer = function( player ){

		if( player.index === 0 ){
			player.color = "red";
		}
		if( player.index === 1 ){
			player.color = "blue";
		}
		if( player.index > 1 ){
			player.color = "grey";
		}
		
		player.setPosition(18);
		
		this.players.forEach(function(p){
			self.gameServer.io.emit("player-set",{
				color: player.color,
				position: player.position
			});
		});
		
		player.message("You Are "+player.color);			
	};
	
	this.createPlayer = function(socket){
		var player = new Player(this, socket);
		socket.player = player;
		return player;
	};
	
	this.addRoll = function( player, roll ){
				
		var newPosition = player.position + roll;
		
		var max = 36-1;
		if( newPosition > max ){
			newPosition = ( newPosition-max );
		}
		
		player.setPosition(newPosition);
		
	};
	
	this.roll = function( player ){		
		var color = player.color;
		var dice = Math.round(Math.random()*5)+1;

		self.addRoll( player, dice );
		
		player.setMoney(player.money+dice);
		
		self.gameServer.io.emit("chat-message", color + " Rolled: " + dice);
	};
	
};

module.exports = MonopolyServer;