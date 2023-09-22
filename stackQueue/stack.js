// 배열을 이용한 스택 구현
// 스택은 LIFO(Last In First Out)의 자료구조
// 배열의 push()와 pop() 메서드를 이용하여 구현
// 배열의 끝부분인 tail을 추가하면 pop, top을 빠르게 구현할 수 있음

class Stack {
  arr = [];

  push(value) {
    return this.arr.push(value); // push()는 새로운 배열의 길이(length)를 반환
  }

  pop() {
    return this.arr.pop(); // pop()은 배열에서 제거한 요소를 반환
  }

  top() {
    return this.arr.at(-1);
    // 최신 문법 at이 나오기 전: return this.arr[this.arr.length - 1];
  }

  // getter를 이용하여 length를 구현 (getter는 메서드가 아니라 접근자 프로퍼티임)
  get length() {
    return this.arr.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(5);
stack.push(2);
stack.push(4); // 5
console.log(stack.length); // 5
stack.pop(); // 4
stack.top(); // 2
