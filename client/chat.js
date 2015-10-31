
var chat;

function ChatView(){
	
	this.element = document.getElementById("chat");
	
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
