function getOutOfBoard(array) {
  function checkOnBoard(number) {
    if (number > 0 && number <= 8) {
      return true;
    } else return false;
  }
  if (checkOnBoard(array[0]) && checkOnBoard(array[1])) return true;
  else return false;
}

function getAllMoves(position) {
  const movesArray = [
    [position[0] + 1, position[1] - 2],
    [position[0] + 2, position[1] - 1],
    [position[0] + 2, position[1] + 1],
    [position[0] + 1, position[1] + 2],
    [position[0] - 1, position[1] + 2],
    [position[0] - 2, position[1] + 1],
    [position[0] - 2, position[1] - 1],
    [position[0] - 1, position[1] - 2],
  ];
  const movesSorted = movesArray.filter((e) => {
    return getOutOfBoard(e);
  });
  return movesSorted;
}

class Node {
  constructor(field, parent) {
    this.field = field;
    this.parent = parent || null;
    this.moves = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
    this.lastLevelNodes = [node];
  }

  getAnotherMove(parent) {
    const moves = getAllMoves(parent.field);
    const movesNodes = [];
    for (let move of moves) {
      const node = new Node(move, parent);
      movesNodes.push(node);
    }
    parent.moves = movesNodes;
    this.lastLevelNodes.push(...movesNodes);
  }

  getAnotherLevel() {
    const getThis = this;
    const lastLevelRemembered = this.lastLevelNodes.map((e) => {
      return e;
    });
    this.lastLevelNodes = [];
    for (const node of lastLevelRemembered) {
      getThis.getAnotherMove(node);
    }
  }
  checkLevel(value) {
    let found = [];
    function checkField(field) {
      if (value[0] === field.field[0] && value[1] === field.field[1])
        found.push(field);
    }
    const fields = this.lastLevelNodes;
    for (let field of fields) {
      checkField(field);
    }

    if (found.length > 0) {
      return found;
    } else {
      this.getAnotherLevel();
      return this.checkLevel(value);
    }
  }
  getWayTo(array) {
    const waysArray = [];
    function getWay(node) {
      const wayArray = [];
      function getParentWay(node) {
        if (!node) return;
        else {
          wayArray.push(node.field);
          getParentWay(node.parent);
        }
      }
      getParentWay(node);
      return wayArray;
    }
    for (const field of array) {
      waysArray.push(getWay(field));
    }
    return waysArray;
  }
  printWays(array) {
    let outcome = `You made it in ${array[0].length} moves! Here's your path: `;
    const stringWays = [];
    for (const way of array) {
      stringWays.push(way.reverse().join(' => '));
    }
    outcome += stringWays.join(' You could also go ');
    return outcome;
  }
}

function knightMoves(startingPosition, finalPosition) {
  const rootNode = new Node(startingPosition);
  const startingTree = new Tree(rootNode);
  const moves = startingTree.checkLevel(finalPosition);
  const ways = startingTree.getWayTo(moves);
  return startingTree.printWays(ways);
}

console.log(knightMoves([6, 3], [1, 5]));
