// 
var board = new Gameboard();
board.setup();


var i = 0;
var loop = function(){
	
	if( i < board.boxList.length-1 ){
		i++;
		var box = board.boxList[i];
		var x = box.x;
		var y = box.y;
		//board.view.setBox(x,y,"red");
		
		if( i == 0 ){
			box = board.boxList[board.boxList.length-1];
		}else{
			box = board.boxList[i-1];
		}
		
		var x = box.x;
		var y = box.y;
		//board.view.setBox(x,y,"white");

	}else{
		i = -1;
	}
	
	setTimeout(loop,100);
};
loop();

function Gameboard(){
	this.data = [];
	
	this.view = new GameboardView();
	this.view.setup();
	
	this.controller = new GameboardController( this );
	
	this.boxList;
	
	/**
	* Find an array of the 'important' tiles.
	*/
	this.setupBoxList = function(){
		var list = [];
		
		/*
		* In this function we want to create a
		* linear list of all the 'important' tiles
		* so we can reference the first tile as '0'
		* the tenth tile as '10' and so on.
		* Instead of having to use their coordinates.
		*
		*
		* Think this:
		* 1 2 3
		* 8   4
		* 7 6 5
		*
		* To this:
		* 1,2,3,4,5,6,7,8
		*
		*/
		
		// top row
		// 0 to 9
		for(var x=0; x<=9; x++) list.push( this.view.getBox(x,0) );
		
		// get the right column
		// 1 to 8
		for(var y=1; y<=8; y++) list.push( this.view.getBox(9,y) );
		
		// get the bottom row
		// 9 to 0
		for(var x=9; x>=0; x--) list.push( this.view.getBox(x,9) );
		
		// get the left column
		// 8 to 1
		for(var y=8; y>=1; y--) list.push( this.view.getBox(0,y) );
		
		return list;
	};
	
	this.setup = function(){
		this.boxList = this.setupBoxList();
		this.controller.addClickEvents();	
		
		this.view.setBoxImage(0,0,"./square1.jpg");
	
		/*
		var left  = this.view.getBox(0,1);
		var right = this.view.getBox(9,1);
		left.style.width = "20%";
		right.style.width = "20%";
		
		for(var i=1; i<=8; i++){
			var middle = this.view.getBox(i,1);
			middle.style.width = "7.5%"
		}
		*/
	};
}

/**
* Handles input from the GameboardView elements.
*/
function GameboardController( board ){
	
	this.data = [];
	
	/**
	* Defines behaviour for when each box is clicked.
	* @param {HTMLElement} box
	* @param {number} x
	* @param {number} y
	*/
	this.addClickEvent = function( box, x, y ){
		box.addEventListener("click", function(){
			board.view.setBox(x, y, "red");
		});
	};
	
	/**
	* Adds click event listeners to each box element.
	* (Listen for mouse clicks)
	*/
	this.addClickEvents = function(){
		var this_ = this;
		board.boxList.forEach(function(box){
			this_.addClickEvent(box, box.x, box.y);
		});	
	};
	
}

/**
* Contains visual elements of the Gameboard.
*/
function GameboardView(){
	this.boardElement = document.getElementById("board");
	
	/**
	* Gets a specific box element, from its coordinates.
	* @param {number} x - the x coordinate
	* @param {number} y - the y coordinate
	*/
	this.getBox = function(x,y){
		// We find the box by getting its row 'y'
		// then from it's row we get the specific box 'x'
		return this.boardElement.children[y].children[x];
	};
	
	/**
	* Sets the value of a box (For instance it's color).
	* @param {number} x - the x coordinate
	* @param {number} y - the y coordinate
	*/
	this.setBox = function(x,y,v){
		var box = this.getBox(x,y);
		box.style.backgroundColor = v;
	};
	
	this.setBoxImage = function(x,y,img){
		var box = this.getBox(x,y);
		box.style.background = "url('" + img + "') no-repeat";
		box.style.backgroundSize = "cover";
	};
	
	/**
	* Color the outer boxes white.
	*/
	this.colorImportantBoxes = function(){
		for(var x=0; x<10; x++) this.setBox(x,0,"white");
		for(var x=0; x<10; x++) this.setBox(x,9,"white");
		for(var x=0; x<10; x++) this.setBox(0,x,"white");
		for(var x=0; x<10; x++) this.setBox(9,x,"white");
	};
	
	this.createGrid = function(){
		// Create 10 rows.
		for(var i=0; i<10; i++){
			var row = this.createRow();

			// Within each row create 10 boxes
			for(var j=0; j<10; j++){
				var box = this.createBox();
				box.x = j;
				box.y = i;
				row.appendChild(box);
			}

			this.boardElement.appendChild( row );	
		}
	};
	
	/**
	* Create the box elements.
	*/
	this.setup = function(){
		this.createGrid();
		this.colorImportantBoxes();
	};
	
	/**
	* Creates an element with a given className.
	* @param {number} className
	*/
	this.createElement = function( className ){
		var element = document.createElement("div");
		element.className = className;
		return element;
	};
	
	/**
	* Creates a row element.
	*/
	this.createRow = function(){
		return this.createElement("row");
	};

	/**
	* Creates a box element.
	*/
	this.createBox = function(){
		return this.createElement("box");
	};
}




