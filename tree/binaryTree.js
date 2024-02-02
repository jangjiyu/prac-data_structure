// binary tree는 tree의 일종으로, 자식 노드가 최대 2개인 tree를 말함
// tree와 차이가 크게 없음 (children이 아닌 left, right로 구분되는 것만 다름)

class Tree {
  constructor(value) {
    this.root = new Node(value);
  }
}

class Node {
  // children = [];
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }

  push(value) {
    const newNode = new Node(value);
    this.children.push(newNode);
  }
}

const tree = new Tree(50);
tree.root.push(25);
tree.root.push(75);
// tree.root.children[0].push(12);
// tree.root.children[0].push(37);
// tree.root.children[1].push(62);
// tree.root.children[1].push(87);
tree.root.left = new Node(12);
tree.root.right = new Node(37);
