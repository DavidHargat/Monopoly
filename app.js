var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var GameServer = require("./server/GameServer.js");

var server = new GameServer();

/* 
* Make our /client folder public (files placed in there get served)
*/
app.use("/", express.static(__dirname + '/client'));


/*
* Handel socket connections.
*/
io.on('connection', function(socket){
	var id = socket.id;
	
	console.log('(app::io.on:connection) ' + socket.id);
	
	server.onConnect( socket );
	
	socket.on("disconnect", function(){
		server.onDisconnect( socket );
	});

	
});

/*
* Start the web server.
*/
http.listen(3000, function(){
	console.log('listening on *:3000');
});