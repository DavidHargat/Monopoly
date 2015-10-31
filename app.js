var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var GameServer = require("./server/GameServer.js");
var ChatServer = require("./server/ChatServer.js");

var server = new GameServer();
var chat = new ChatServer( io );


var PORT = 80;

/* 
* Make our /client folder public (files placed in there get served)
*/
app.use("/", express.static(__dirname + '/client'));


/*
* Handel socket connections.
*/
io.on('connection', function(socket){
	var id = socket.id;
	
	console.log('(app::connection) ' + socket.id);
	
	server.onConnect( socket );
	
	socket.on("disconnect", function(){
		console.log('(app::disconnect) ' + socket.id);
		server.onDisconnect( socket );
	});
	
	socket.on("chat-message", function( data ){
		chat.onMessage( data );
	});
	
});

/*
* Start the web server.
*/
http.listen(PORT, function(){
	console.log('listening on *:'+PORT);
});