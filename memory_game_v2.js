var app = angular.module('my-app', []);
app.controller('memoryGame', function($scope, $timeout){

  function Card(num){
    this.url= "images/monsters-"+ num+".png";
    this.open = false;
    this.matched = false;
  }
  function Board(){
    // this.board = [[],[]];
    this.protoboard = [];
    this.board = [];
    this.size= 0;
  }

  function shuffle(board) {
     var i = 0;
     var j = 0;
     var temp = null;

     for (i = board.length - 1; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       temp = board[i];
       board[i] = board[j];
       board[j] = temp;
     }
    }

  Board.prototype.makeBoard = function(board_size) {
    var num = (board_size / 2);
    // var rand = Math.floor(Math.random() * 16) + 1;
    for (var i = 0; i < num; i++) {
      var rand = Math.floor(Math.random() * 16) + 1;
      this.protoboard.push(new Card(rand));
      this.protoboard.push(new Card(rand));
    }
    shuffle(this.protoboard);
    var board1 = this.protoboard.splice(0, num);
    this.board.push(board1);
    this.board.push(this.protoboard);
    this.board.size = num;
  };

  // Board.prototype.makeBoard_medium = function(board_size) {
  //   var num = (board_size / 2);
  //   // var rand = Math.floor(Math.random() * 16) + 1;
  //   for (var i = 0; i < num; i++) {
  //     var rand = Math.floor(Math.random() * 16) + 1;
  //     this.protoboard.push(new Card(rand));
  //     this.protoboard.push(new Card(rand));
  //   }
  //   shuffle(this.protoboard);
  //   var board1 = this.protoboard.splice(0, 6);
  //   var board2 = this.protoboard.splice(0, 6);
  //   this.board.push(board1);
  //   this.board.push(board2);
  //   this.board.push(this.protoboard);
  //   this.board.size = num;
  // };
  //
  // Board.prototype.makeBoard_hard = function(board_size) {
  //   var num = (board_size / 2);
  //   // var rand = Math.floor(Math.random() * 16) + 1;
  //   for (var i = 0; i < num; i++) {
  //     var rand = Math.floor(Math.random() * 16) + 1;
  //     this.protoboard.push(new Card(rand));
  //     this.protoboard.push(new Card(rand));
  //   }
  //   shuffle(this.protoboard);
  //   var board1 = this.protoboard.splice(0, 8);
  //   var board2 = this.protoboard.splice(0, 8);
  //   var board3 = this.protoboard.splice(0, 8);
  //   this.board.push(board1);
  //   this.board.push(board2);
  //   this.board.push(board3);
  //   this.board.push(this.protoboard);
  //   this.board.size = num;
  // };



$scope.newGame = function(x){
  $scope.board = new Board();
  if(x === 'easy'){
    $scope.board.makeBoard_easy(8);
  }

  $scope.state = 0;
  $scope.matches = [];
  $scope.firstcard = {};
  $scope.win_count = 0;
  $scope.winner = false;
  $scope.chosen = false;

};

  $scope.newGame('easy');

  console.log($scope.board);
  $scope.clicked = function(item) {
    if (item.open === false && $scope.state === 0) {
      item.open = true;
      $scope.state++;
      $scope.matches.push(item.url);
      $scope.firstcard = item;
    }
    if (item.open === false && $scope.state === 1) {
      item.open = true;
      $scope.state++;
      $scope.matches.push(item.url);
    }
    if ($scope.state === 2 && item.open === true) {
      $timeout(function(){
        if ($scope.matches[0] === $scope.matches[1]){
          item.matched = true;
          $scope.firstcard.matched = true;
          $scope.win_count ++;
          $scope.checkWinner();
          $scope.state = 0;
          $scope.matches = [];
          $scope.firstcard = {};

        }
        else{
          item.open = false;
          $scope.firstcard.open = false;
          $scope.state = 0;
          $scope.matches = [];
          $scope.firstcard = {};
        }
      },1300);
    }
  };

  $scope.checkWinner = function(){
    if($scope.win_count === $scope.board.board.size){
    $scope.winner = true;
    }
  };

});
