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
  constructor(field) {
    this.field = field;
    this.moves = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }

  getAnotherMove(node) {
    const moves = getAllMoves(node.field);
    const movesNodes = [];
    for (let move of moves) {
        const node = new Node(move);
        movesNodes.push(node);
    };
    node.moves = movesNodes;
  }

}

function knightMoves(a, b) {}

const rootNode = new Node([2, 2]);
const testTree = new Tree(rootNode);
testTree.getAnotherMove(testTree.root);
console.log(testTree);

