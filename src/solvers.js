/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n}); //fixme
  var rows = solution.rows();
  for( var i=0; i<n; i++ ) {
    solution.togglePiece(i,i);
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  // Solution for nxn chessboards with n rooks is equal to n! (for every board of size n, there are n new ways to
  // create a sub-board of available space that is sized at n-1xn-1)

  // Iterate from 2 to n
  for (var i=2; i<=n; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, map) {
  var solution = new Board({n:n});
  var resultArray = [];

  // High level goal, each row can have only one queen. Can we simplify tuple to single array?
  // Queen position can be tracked via single array with index => rowNumber, value => colNumber
  // or hashmap of key => rowNumber, value => colNumber

  var solveNQueens = function (solutionArray){

    // base case: if length of solutionArray === n
    if (solutionArray.length === n) {
      resultArray.push(solutionArray);
    } else {
      // Push solution array to resultArray and return


      for (var i=0; i < n; i++) {
        for (var j= 0, length = solutionArray.length; j < length; j++) {
          var previous = solutionArray[j];

          if (previous === i) {
            break;
          }
          if (previous + (length-j) === i) {
            break;
          }
          if (previous - (length-j) === i) {
            break;
          }
        }
        if ( j === length) {
          solveNQueens(solutionArray.concat([i]));
        }
      }
    }
  }

  solveNQueens([]);


  //currently, have to toggle pieces on solution based on resultsArray
  // console.log("results", resultArray);
  //return resultArray;
  if (resultArray.length > 0) {
    for ( var i=0; i<resultArray[0].length; i++ ) {
      solution.togglePiece(i, resultArray[0][i]);
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (map) {
    return resultArray;
  } else {
    return solution.rows();
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensSolution(n, 'count').length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
