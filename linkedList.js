class LinkedList {
  // 초기값 length, head
  // constructor() {
  //   this.length = length;
  //   this.head = head;
  // }
  // --- constructor를 사용하지 않고, 아래와 같이 사용할 수 있다. ---
  // 단, 외부에서 전달받을 값은 constructor를 사용.
  // 초기값 length
  length = 0;
  // 초기값 head
  head = null;

  add(value) {
    if (this.head) {
      let current = this.head;

      while (current.next) {
        // current.next가 null이 아닐 때까지
        current = current.next;
      }
      // current.next가 null이면 새로운 노드를 생성
      current.next = new Node(value);
    } else {
      this.head = new Node(value);
    }

    this.length++;
    return this.length;
  }

  // # private 함수
  #search(index) {
    let count = 0;
    let prev;
    let current = this.head;

    while (count < index) {
      prev = current;
      current = current?.next;
      count++;
    }

    return [prev, current];
    // index가 0일 때, prev는 undefined이므로 주의
  }

  search(index) {
    return this.#search(index)[1]?.value;
  }

  remove(index) {
    const [prev, current] = this.#search(index);

    if (prev && current) {
      // prev.next가 current에 이어진 걸 없애고 current.next를 이어준다.
      prev.next = current.next;
      this.length--;
      return this.length;
    }
    // prev가 없을 때 = index가 0
    else if (current) {
      this.head = current.next;
      this.length--;
      return this.length;
    }
    // prev, crrent 둘 다 없을 때 = 찾고자 하는 대상이 없으므로 아무것도 안 함
  }
}

class Node {
  next = null;
  // 외부에서 전달받을 값은 constructor를 사용해야 함.
  constructor(value) {
    this.value = value;
  }
}

const ll = new LinkedList();
ll.length; // 0
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.add(5);
ll.add(6);
ll.search(3); // 4
ll.search(5); // 6
ll.search(7); // null
ll.remove(4);
ll.search(4); // 6
ll.remove(4);
ll.search(4); // undefined
ll.remove(4); // undefined
