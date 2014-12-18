// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // TODO: Can we make this work independent of board
      var row = this.get(rowIndex);

      var rowPieces = _.reduce(row, function(accumulator, value){
        accumulator = accumulator + value;
        return accumulator;
      });

      //if conflict return true
      if(rowPieces > 1 ){
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var numRows = this.rows().length;
      for( var i=0; i<numRows; i++ ) {
        if( this.hasRowConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var colArray = [];
      var rows = this.rows();
      // For each row, push element at colIndex to colArray
      for ( var i=0;i<rows.length; i++ ) {
        colArray.push(rows[i][colIndex]);
      }

      var colPieces = _.reduce(colArray, function(accumulator, value) {
        accumulator = accumulator + value;
        return accumulator
      });

      // If colArray contains more than one 1
      if (colPieces > 1) {
        // return true
        return true;
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numCols = this.rows().length;
      for ( var i=0; i<numCols; i++) {
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //declare diagonalValues = [];
      var majDiagonalArray = [];
      var rows = this.rows();
      var rowPos = 0;
      var colPos = majorDiagonalColumnIndexAtFirstRow;

      for ( var i=0; i<rows.length; i++) {
        if (this._isInBounds(rowPos, colPos)) {
          // push value at row/col position
          majDiagonalArray.push(this.get(rowPos)[colPos]);
        }
        // Add 1 to rowPos & 1 to colPos
        rowPos++;
        colPos++;
      }
      //check if start index value is in bounds
      //check down 1 over 1 and see if in bounds
        //if in bounds, push value at location into diagonalValues

      var majDiagonalPieces = _.reduce(majDiagonalArray, function(accumulator, value) {
        accumulator = accumulator + value;
        return accumulator;
      }, 0);

      if (majDiagonalPieces > 1) {
        return true;
      }
      //run reduce
        //if accumulator is over 1
          //return true for conflict
        //otherwise return false
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //return false; // fixme
      for (var i = -3; i <= 3; i++) {
        if ( this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //declare diagonalValues = [];
      var minDiagonalArray = [];
      var rows = this.rows();
      var rowPos = 0;
      var colPos = minorDiagonalColumnIndexAtFirstRow;

      for ( var i=0; i<rows.length; i++) {
        if (this._isInBounds(rowPos, colPos)) {
          // push value at row/col position
          minDiagonalArray.push(this.get(rowPos)[colPos]);
        }
        // Add 1 to rowPos & 1 to colPos
        rowPos++;
        colPos--;
      }
      //check if start index value is in bounds
      //check down 1 over 1 and see if in bounds
      //if in bounds, push value at location into diagonalValues

      var minDiagonalPieces = _.reduce(minDiagonalArray, function(accumulator, value) {
        accumulator = accumulator + value;
        return accumulator;
      }, 0);

      if (minDiagonalPieces > 1) {
        return true;
      }
      //run reduce
      //if accumulator is over 1
      //return true for conflict
      //otherwise return false
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i <= 6; i++) {
        if ( this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
      //return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
