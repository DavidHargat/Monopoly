var socket = io();

var Money = function(){
	this.element = document.getElementById('money');
	this.setValue = function(v){
		this.element.textContent = "$"+v;
	};
};

var money = new Money();
money.setValue("128");

socket.on("test", function( data ){
	
});

socket.on("set-money", function( data ){
	money.setValue(data);
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