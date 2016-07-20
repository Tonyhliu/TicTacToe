const MoveError = require("./moveError");

function Board () {
  this.grid = Board.makeGrid();
}

Board.prototype.isEmptyPos = function(pos) {
  if (!Board.isValidPos(pos)) {
    throw new MoveError('Is not valid position!');
  }

  return (this.grid[pos[0]][pos[1]] === null);
}

Board.prototype.isOver = function() {
  if (this.winner() != null) {
    return true;
  }

  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      if (this.isEmptyPos([rowIdx, colIdx])) {
        return false;
      }
    }
  }

  return true;
}

Board.prototype.placeMark = function(pos, mark) {
  if (!this.isEmptyPos(pos)) {
    throw new MoveError('Is not an empty position!');
  }

  this.grid[pos[0]][pos[1]] = mark;
}


Board.prototype.print = function() {
  const strs = [];
  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    const marks = [];
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      marks.push(
        this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
      );
    }
    strs.push(`${marks.join('|')}\n`);
  }

  console.log(strs.join('-----\n'));
}

Board.prototype.winner = function() {
  const posSeqs = [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  for (let i = 0; i < posSeqs.length; i++) {
    const winner = this.winnerHelper(posSeqs[i]);
    if (winner != null) {
      return winner;
    }
  }

  return null;
}


Board.prototype.winnerHelper = function(posSeq) {
  for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
    const targetMark = Board.marks[markIdx];
    let winner = true;
    for (let posIdx = 0; posIdx < 3; posIdx++) {
      const pos = posSeq[posIdx];
      const mark = this.grid[pos[0]][pos[1]];

      if (mark != targetMark) {
        winner = false;
      }
    }

    if (winner) {
      return targetMark;
    }
  }

  return null;
}

Board.isValidPos = pos =>
  {return (0 <= pos[0]) &&
  (pos[0] < 3) &&
  (0 <= pos[1]) &&
  (pos[1] < 3);}

Board.makeGrid = () => {
  const grid = [];

  for (let i = 0; i < 3; i++) {
    grid.push([]);
    for (let j = 0; j < 3; j++) {
      grid[i].push(null);
    }
  }

  return grid;
};

Board.isValidPos = function(pos) {
  return (0 <= pos[0]) &&
  (pos[0] < 3) &&
  (0 <= pos[1]) &&
  (pos[1] < 3);
};

Board.makeGrid = function() {
  const grid = [];

  for (let i = 0; i < 3; i++) {
    grid.push([]);
    for (let j = 0; j < 3; j++) {
      grid[i].push(null);
    }
  }

  return grid;
};

Board.marks = ['x', 'o'];

module.exports = Board;
