var socket = io();

socket.on("test", function( data ){
	
});

socket.on("chat-message", function( data ){
	chat.append( data );
});



socket.on("player-set", function( data ){
	
	if( data.color === "red" ){
		board.player1.setPosition( data.position );
	}
	
	if( data.color === "blue" ){
		board.player2.setPosition( data.position );
	}
	
});