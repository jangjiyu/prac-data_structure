// tree 구조는 만들기 나름
// children에 node를 무한정 push 가능하여 개수도 일정치 않아 알고리즘으로 활용하기엔 적합하지 않음
// 이진 트리로 자식을 제한하여 구현하는 것이 일반적 -> 정렬을 통한 빠른 검색이 가능해짐
class Tree {
  constructor(value) {
    this.root = new Node(value);
  }
}

class Node {
  children = [];
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
tree.root.children[0].push(12);
tree.root.children[0].push(37);
tree.root.children[1].push(62);
tree.root.children[1].push(87);
