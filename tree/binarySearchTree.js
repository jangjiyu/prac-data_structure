// binary tree와 달리 left에는 부모보다 작은값, right에는 부모보다 큰값
class BinarySearchTree {
  root = null;
  length = 0;

  // 재귀를 위한 insert private 함수
  #insert(node, value) {
    // 같은 값이 들어온 경우
    if (node.value === value) throw new Error("동일한 값이 이미 존재합니다.");

    if (node.value > value) {
      // root 노드보다 작은 값이면
      if (node.left) this.#insert(node.left, value);
      else {
        node.left = new Node(value);
        this.length++;
      }
    } else {
      // root 노드보다 큰 값이면
      if (node.right) this.#insert(node.right, value);
      else {
        node.right = new Node(value);
        this.length++;
      }
    }
  }

  #search(node, value) {
    // 같은 값이 들어온 경우
    if (node.value === value) return node;

    if (node.value > value) {
      // root 노드보다 작은 값을 찾으면
      // node.left가 없으면 걍 리턴
      if (!node.left) return;
      // 있는데 같으면 바로 리턴
      if (node.left.value === value) return node.left;
      // 다르면 다시 #search 재귀
      return this.#search(node.left, value);
    } else {
      // root 노드보다 큰 값을 찾으면
      // node.right가 없으면 걍 리턴
      if (!node.right) return;
      // 있는데 같으면 바로 리턴
      if (node.right.value === value) return node.right;
      // 다르면 다시 #search 재귀
      return this.#search(node.right, value);
    }
  }

  #remove(node, value) {
    // 제거할 값이 bst에 존재하지 않는 경우
    if (!node) return null;
    // 지울 값 찾은 경우
    if (node.value === value) {
      // 자식 노드가 하나도 없는 경우
      if (!node.left && !node.right) {
        this.length--;
        return null;
      }
      // right만 있는 경우
      else if (!node.left) {
        this.length--;
        return node.right;
      }
      // left만 있는 경우
      else if (!node.right) {
        this.length--;
        return node.left;
      }
      // 둘 다 있는 경우
      else {
        let exchange = node.left;
        // left 자식 노드의 자식 노드, 자식노드 중 가장 오른쪽 값 찾기 -> node.left.right.right.right ... right가 더이상 존재하지 않을 때까지 찾기
        // -> right가 존재할 때까지 돌면서 exchage를 right로 바꿔주면 됨
        while (exchange.right) {
          exchange = exchange.right;
        }

        const temp = node.value;
        node.value = exchange.value;
        exchange.value = temp;

        // node 값 바꿔줬으므로 대체된 leaf 지워주면 됨
        // 여기서 또 #remove를 재귀 호출하므로 "length--"는 위의 3경우에서만 해주기, 여기서도 해주면 한번 더 마이너스 됨
        node.left = this.#remove(node.left, temp);

        return node;
      }
    }
    // 못 찾은 경우 자식 노드 보내서 재귀
    else {
      // 재귀 함수 다시 돌아서 지울 값 찾아 retrun 되는 값으로 대입
      if (node.value > value) {
        node.left = this.#remove(node.left, value);
        return node;
      }
      if (node.value < value) {
        node.right = this.#remove(node.right, value);
        return node;
      }
    }
  }

  insert(value) {
    if (!this.root) this.root = new Node(value);
    else this.#insert(this.root, value); // root 노드와 인자로 받아온 value 비교하게 넘김
  }

  search(value) {
    // root 노드 없을 때 null 반환
    if (!this.root) return null;
    // root 노드 값이면 바로 반환
    if (this.root.value === value) return this.root;
    // #search 재귀 들어감 -> 찾은 값 반환해줘야하므로 return 꼭 때리기
    return this.#search(this.root, value);
  }

  remove(value) {
    // 자식 노드가 없이 본인이 root면 부모 노드한테 본인 제거 해달라 하면 됨
    // 자식 노드가 하나만 있으면 부모 노드한테 본인의 자식 노드를 부모의 자식으로 대체해달라 하면 됨
    // 자식 노드가 2개 다 있으면 left 자식 노드의 자식 노드의 자식 노드 ... 중 가장 오른쪽 값을 지워진 노드에 대체하고 대체된 leaf 지우면 됨
    // -> binarySearchTreeImage.md 참고

    // 반환된 node값으로 root를 대체해주면 됨
    this.root = this.#remove(this.root, value);

    return this.length;
  }
}

class Node {
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }
}

const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(10);
bst.insert(3);
bst.insert(1);
bst.insert(14);
bst.insert(6);
bst.insert(7);
bst.insert(4);
bst.insert(13);
console.log(bst.length); // 8
console.log(bst.search(7));
console.log(bst.search(5)); // undefined
bst.remove(8);
console.log(bst.length); // 7
console.log(bst.remove(15)); // 7 (length return하는데 15는 존재하지 않으므로 기존 length 7 반환됨)

// const bst2 = new BinarySearchTree();
// bst2.insert(50);
// bst2.remove(50);
// console.log(bst2.root); // null

// const bst3 = new BinarySearchTree();
// bst3.insert(100);
// bst3.insert(100); // throw error
