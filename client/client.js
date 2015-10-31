var socket = io();

socket.on("test", function( data ){
	
});

socket.on("chat-message", function( data ){
	chat.append( data );
});