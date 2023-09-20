export class FixedSizeArrayStack<T> {
  private _capacity: number;
  private _stack: T[];
  private _top: number;

  constructor(capacity = 10) {
    if (capacity < 0) {
      throw 'Capacity must be greater than zero.';
    }

    this._capacity = capacity;
    this._stack = new Array(capacity);
    this._top = -1;
  }

  get size(): number {
    return this._top + 1;
  }

  get isEmpty(): boolean {
    return this._top === -1;
  }

  get isFull(): boolean {
    return this._top === this._capacity - 1;
  }

  get top(): T {
    if (this.isEmpty) {
      throw 'The stack is empty.';
    }

    return this._stack[this._top];
  }

  push(item: T): void {
    if (this.isFull) {
      throw 'The stack is full.';
    }
    this._top++;
    this._stack[this._top] = item;
  }

  pop(): T {
    if (this.isEmpty) {
      throw 'The stack is empty.';
    }

    const item = this._stack[this._top];
    this._top--;
    return item;
  }
}

const stack = new FixedSizeArrayStack<string>(5);
stack.push('Mohammed');
stack.push('Ahmed');
stack.push('Sami');
stack.push('Salem');
stack.pop();
stack.pop();
stack.pop();
stack.push('1');
stack.push('2');
stack.push('3');
stack.push('Ahmed');

console.log(stack);

console.log('\nTOP IS:', stack.top);
