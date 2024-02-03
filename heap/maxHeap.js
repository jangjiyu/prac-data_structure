// 최대 힙
class MaxHeap {
  arr = [];

  #reheapUp = (index) => {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const leftChildIndex = parentIndex * 2 + 1;
      const rightChildIndex = parentIndex * 2 + 2;
      let largerChildIndex =
        this.arr[leftChildIndex] > this.arr[rightChildIndex] || this.arr[rightChildIndex] === undefined
          ? leftChildIndex
          : rightChildIndex;

      // 부모 노드보다 자식 노드가 크면 swap
      if (this.arr[parentIndex] < this.arr[largerChildIndex]) {
        // 값 바꾸기
        [this.arr[parentIndex], this.arr[largerChildIndex]] = [this.arr[largerChildIndex], this.arr[parentIndex]];
        // 다시 heapify (부모 노드로 올라간 것의 부모 노드랑 다시 비교해서 heapify)
        // 이젠 parentIndex가 자식 index가 됨
        this.#reheapUp(parentIndex);
      }
    }

    return this.arr;
  };

  #reheapDown = (index) => {
    // 자식 노드 2개와 비교
    const leftChildIndex = index * 2 + 1;
    // 자식 노드가 있으면 비교 들어감
    if (leftChildIndex < this.arr.length) {
      const rightChildIndex = index * 2 + 2;
      // 두 자식 노드 중 큰것보다 부모 노드가 작으면 swap
      const largerChildIndex =
        this.arr[leftChildIndex] > this.arr[rightChildIndex] || this.arr[rightChildIndex] === undefined
          ? leftChildIndex
          : rightChildIndex;

      if (this.arr[index] < this.arr[largerChildIndex]) {
        [this.arr[index], this.arr[largerChildIndex]] = [this.arr[largerChildIndex], this.arr[index]];
        // 이젠 largerChildIndex가 부모 index가 됨 -> 다시 heapify
        this.#reheapDown(largerChildIndex);
      }
    }
  };

  insert(value) {
    // 우선 마지막에 추가한 후 heapify
    const index = this.arr.length;
    this.arr.push(value);
    this.#reheapUp(index);

    return this.arr;
  }

  remove() {
    // node가 하나도 없으면 null 반환
    if (this.arr.length === 0) return null;

    // node가 1개면 바로 pop
    if (this.arr.length === 1) return this.arr.pop();

    // 삭제는 root 노드만 가능
    // root 노드를 삭제후 마지막 노드를 root 노드로 올린 후 heapify
    const root = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.#reheapDown(0);

    return root;
  }

  // 최대 힙이므로 내림차순 정렬
  sort() {
    const temp = this.arr;
    const sortedArray = [];

    // root 노드 삭제하고 heapify해주는 과정 반복하면서 삭제된 root 노드를 모아 배열에 넣어주면 정렬됨
    while (this.arr.length > 0) {
      sortedArray.push(this.remove());
    }

    // remove() 과정에서 arr이 모두 사라졌으므로 temp에 담아둔 arr값 다시 넣기
    this.arr = temp;

    return sortedArray;
  }

  search(value) {
    let foundIdx = 0;

    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i] === value) foundIdx = i;
    }

    return foundIdx;
  }
}

const maxHeap = new MaxHeap();
console.log(maxHeap.insert(1)); // [ 1 ]
console.log(maxHeap.insert(2)); // [ 2, 1 ]
console.log(maxHeap.insert(3)); // [ 3, 1, 2 ]
console.log(maxHeap.insert(4)); // [ 4, 3, 2, 1 ]
console.log(maxHeap.insert(5)); // [ 5, 4, 2, 1, 3 ]

console.log(maxHeap.search(5)); // 0
console.log(maxHeap.remove()); // 5
console.log(maxHeap.sort()); // [ 4, 3, 2, 1 ]
