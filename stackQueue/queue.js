// 배열을 이용한 큐 구현
// 큐는 선입선출(FIFO)의 자료구조
// enqueue: 큐의 뒤쪽에 원소를 추가
// dequeue: 큐의 앞쪽에서 원소를 삭제
// peek: 큐의 앞쪽 원소를 반환
// isEmpty: 큐가 비어있는지 확인
// clear: 큐의 모든 원소를 삭제
// size: 큐의 원소 개수를 반환

class Queue {
  arr = [];

  enqueue(value) {
    return this.arr.push(value);
  }

  dequeue() {
    return this.arr.shift();
  }

  peek() {
    return this.arr[0];
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  clear() {
    this.arr = [];
  }

  // getter를 이용하여 length를 구현 (getter는 메서드가 아니라 접근자 프로퍼티임)
  get size() {
    return this.arr.length;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(3);
queue.enqueue(5);
queue.enqueue(2);
queue.enqueue(4); // 5
console.log(queue.size); // 5
queue.dequeue(); // 1
queue.peek(); // 3
console.log(queue.isEmpty()); // false
queue.clear();
console.log(queue.isEmpty()); // true
