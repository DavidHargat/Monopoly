 
## Architecture
 

GameServer


	* ChatServer


	* MonopolyServer
		* Player
			* socket
			* game logic stuff
			* money
			* color


	
	
---


# Gameboard/Tiles/Cards


## Tile


A tile is what we'll call a given cell on the gameboard.


Each tile will be mapped to one of two things:


* Property
* Specail Behavior


Most tiles are obviously going to be Properties, so we can have a data-driven system to handle those. For the remaining tiles such as the 'Start' tile, which gives you $200 if you pass it, we'll have to define a more unique structure.


## Standard Property


Attribute      | Data Type     | Comments
-------------  | ------------- | -------------
name           | string        | 
color          | string        | ex. "red", this also links the property to it's matching properties.
cost           | number        | **other cost-values (rent, house, etc) might actually just be a function of the cost**
mortgage value | number        | 
base rent      | number        | May need to thinkg about how investment effects this value.
house cost     | number        | 

Cards will also need some sort of meta-data once they're in the context of an actual game, namely:

* **Owner** (Whose 'holding' the card)

* **Investment** (How many houses the owner has put on it)


---

 
* There are 35 tiles

* State
	* random deck
		* chance
		* community chest
	* square
		* real estate
		* cost
		* value
		* name
		* position
	* players
		* cards
		* position
		* money
		* is in jail or not
			* jail logic
			
* Core Mechanics
	* Property
	* Money
	* Player Inventory
	* Dice Roll
	* Players (their actual pieces)
	
	