export class FixedSizeArrayQueue<T> {
  private _capacity: number;
  private _queue: (T | undefined)[];
  private _front: number;
  private _rear: number;
  private _size: number;

  constructor(capacity = 10) {
    if (capacity < 0) {
      throw 'Capacity must be greater than zero.';
    }

    this._capacity = capacity;
    this._queue = new Array<T>(capacity);
    this._size = 0;
    this._front = 0;
    this._rear = -1;
  }

  enQueue(item: T | undefined): void {
    if (this.isFull) {
      throw 'The queue is full.';
    }
    this._rear = (this._rear + 1) % this._capacity;
    this._queue[this._rear] = item;
    this._size++;
  }

  deQueue(): T | undefined {
    if (this.isEmpty) {
      throw 'The queue is empty.';
    }

    const item = this._queue[this._front % this._capacity];
    this._queue[this._front] = undefined;
    this._front = (this._front + 1) % this._capacity;
    this._size--;

    return item;
  }
  peek(): T | undefined {
    if (this.isEmpty) {
      throw 'The queue is empty.';
    } else return this._queue[this._front];
  }
  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }

  get isFull(): boolean {
    return this._size === this._capacity;
  }
}

const queue = new FixedSizeArrayQueue<number>(5);
queue.enQueue(1);
queue.enQueue(2);
queue.enQueue(3);
queue.enQueue(4);
queue.enQueue(5);

const reverseQueue = <T>(
  queue: FixedSizeArrayQueue<T>
): FixedSizeArrayQueue<T> => {
  const stack: (T | undefined)[] = [];

  while (!queue.isEmpty) {
    stack.push(queue.deQueue());
  }

  while (!queue.isFull) {
    queue.enQueue(stack.pop());
  }

  return queue;
};
console.log(queue);
reverseQueue(queue);
console.log(queue);

class MyQueue {
  s1: number[];
  s2: number[];

  constructor() {
    this.s1 = [];
    this.s2 = [];
  }

  push(x: number): void {
    this.s1.push(x);
  }

  pop(): number | undefined {
    if (this.s2.length === 0) {
      while (this.s1.length > 0) {
        this.s2.push(this.s1.pop() as number);
      }
    }
    return this.s2.pop();
  }

  peek(): number | undefined {
    if (this.s2.length === 0) {
      while (this.s1.length > 0) {
        this.s2.push(this.s1.pop() as number);
      }
    }
    return this.s2[this.s2.length - 1];
  }

  empty(): boolean {
    return this.s1.length === 0 && this.s2.length === 0;
  }
}

const myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(8);
console.log('Pop', myQueue.pop());
myQueue.push(3);
console.log(myQueue);
console.log('Peek', myQueue.peek());
console.log('Pop', myQueue.pop());
myQueue.push(5);
console.log('Pop', myQueue.pop());

myQueue.pop();
myQueue.peek();
myQueue.empty();
console.log(myQueue.empty());
