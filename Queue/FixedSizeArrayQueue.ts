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
    this._front = -1;
    this._rear = -1;
  }

  enQueue(item: T): void {
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

const queue = new FixedSizeArrayQueue<string>(5);
queue.enQueue('Mohammed');
queue.enQueue('Ahmed');
queue.enQueue('Sami');
queue.enQueue('Salem');
queue.deQueue();
queue.deQueue();
queue.deQueue();
queue.enQueue('1');
queue.enQueue('2');
queue.enQueue('3');
queue.enQueue('Ahmed');

console.log(queue);
