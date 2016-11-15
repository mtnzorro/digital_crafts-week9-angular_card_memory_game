## Memory Card Game built with Angular
#### Website:  (http://monster-memory-game.surge.sh/)

#### Contents:

##### Overview 
##### Technologies
##### Contributors 
##### Example Code

#### Overview:
As an exercise in using the Angular.JS framework, the project challenged us to design a card memory game with the following functionality:
#####A grid of cards in a 2x8 layout
#####Card value is displayed to player upon click
#####Compares images of each card object
#####Images of matching pairs of cards remain visible
#####Images of non-matching pairs of cards remain visible for 1 second before being hidden again
#####Determine when a player has won the game by matching all cards
#####Restarting the game/Play again option



#### Added feautures include:
#####Menu option for creating 3 different sized boards(2X8, 3X6, and 4x8)
#####Randomized cards
#####CSS Animation for card flip


##### Technologies:
Angular.JS
JavaScript
HTML
CSS
Object Oriented Programming

##### Angular.JS Design:
Object classes were implemented as part of functionality including:
Card Object (stores a point(numeric) value along with suit)
Hand Object (stores an array of Card objects during each hand, along with a method for totalling the points in a given hand)
Deck Object (an instance of a given deck of 52 cards, including a shuffle and card draw method)

##### Contributors:
Jason Campbell
Matthew Downs

##### Example Code:

The Board Object:

```

function Card(num){
    this.url= "images/monsters-"+ num+".png";
    this.open = false;
    this.matched = false;
  }
  function Board(){
    this.protoboard = [];
    this.board = [];
    this.size= 0;
  }

```
Creation of an "Easy" level Board (2x8)

```

  Board.prototype.makeBoard_easy = function(board_size) {
    //Number of cards in the board is halved, as each card populated in each board will have a duplicate
    var num = (board_size / 2);
    
    //randNums array stores cards chosen for the board, to prevent a repeat card from being used
    var randNums = [];
    
    //Loop through the number of slots, generating a random image to select, compares to those already in use, and pushes 2 objects to the protoboard array
    for (var i = 0; i < num; i++) {
      var pushed = true;
      while (pushed){
        var rand = Math.floor(Math.random() * 16) + 1;
        if(randNums.indexOf(rand) === -1){
          randNums.push(rand);
          pushed = false;
          console.log('pushed it');
        }
      }
      console.log(randNums)
      this.protoboard.push(new Card(rand));
      this.protoboard.push(new Card(rand));
    }
    
   //Protoboard array is shuffled with our shuffle function, then spliced per the num of rows.  Each array is separately pushed into the board array.
    shuffle(this.protoboard);
    var board1 = this.protoboard.splice(0, num);
    this.board.push(board1);
    this.board.push(this.protoboard);
    this.board.size = num;
  };

```

Creation of the board in the HTML file

```

  <table class="chosen">
        <tr ng-repeat="row in board.board">
          <td ng-repeat="card in row" >
            <div class="flip-container" ng-class="{'flip' : card.open}">
              <div class="flipper">
                <div class="front">
                  <img ng-click="clicked(card)" ng-src="images/monster-logo.png">

                </div>
                <div class="back">
                  <img ng-click="clicked(card)" ng-src={{card.url}}>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      
 ```

Screen shot:

