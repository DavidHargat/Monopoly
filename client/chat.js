
var chat;

function ChatView(){
	
	var self = this;
	
	var f = function(id){return document.getElementById(id);};
	
	this.element = f("chat");
	this.button  = f("chat-button");
	this.input   = f("chat-input");
	
	this.sendMessage = function(){
		var msg = self.consumeInput();
		socket.emit("chat-message",msg);
	};
	
	this.button.addEventListener("click",function(){
		self.sendMessage();
	});
	
	this.consumeInput = function(){
		var value = this.input.value+"";
		this.input.value = "";
		return value;
	};
	
	this.append = function(msg){
		var el = document.createElement("li");
		el.textContent = msg;
		this.element.appendChild(el);
		this.element.scrollTop = this.element.scrollHeight;
	};
	
}

window.addEventListener("load", function(){
	chat = new ChatView()	
});
