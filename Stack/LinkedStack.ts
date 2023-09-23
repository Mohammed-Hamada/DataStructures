import { SinglyLinkedListNode } from '../Nodes';

export class LinkedStack<T> {
  private _length: number;
  private _top: SinglyLinkedListNode<T> | null;

  constructor() {
    this._length = 0;
    this._top = null;
  }

  push(item: T): void {
    const itemNode = new SinglyLinkedListNode<T>(item);
    itemNode.next = this._top;
    this._top = itemNode;

    this._length++;
  }

  pop(): T | undefined {
    if (this.isEmpty) {
      throw 'Stack is empty.';
    }
    const poppedItem = this._top?.data;
    this._top = this._top!.next;

    this._length--;

    return poppedItem;
  }

  peek(): T | undefined {
    if (this.isEmpty) {
      throw 'Stack is empty.';
    }
    return this._top?.data;
  }

  get isEmpty(): boolean {
    return this._top === null;
  }
}

const isSymbolBalanced = (text: string) => {
  const stack = new LinkedStack<string>();

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(' || text[i] === '{' || text[i] === '[') {
      stack.push(text[i]);
    } else if (text[i] === ')') {
      if (!stack.isEmpty && stack.peek() === '(') {
        stack.pop();
      } else return false;
    } else if (text[i] === '}') {
      if (!stack.isEmpty && stack.peek() === '{') {
        stack.pop();
      } else return false;
    } else if (text[i] === ']') {
      if (!stack.isEmpty && stack.peek() === '[') {
        stack.pop();
      } else return false;
    }
  }

  return stack.isEmpty ? true : false;
};

const postfixEvaluation = (postfix: string): number => {
  const stack = new LinkedStack<number>();

  for (const c of postfix) {
    if (c === '+') {
      const op1 = stack.pop();
      const op2 = stack.pop();
      const result = op1! + op2!;
      stack.push(result);
    } else if (c === '-') {
      const op1 = stack.pop();
      const op2 = stack.pop();
      const result = op2! - op1!;
      stack.push(result);
    } else if (c === '*') {
      const op1 = stack.pop();
      const op2 = stack.pop();
      const result = op1! * op2!;
      stack.push(result);
    } else if (c === '/') {
      const op1 = stack.pop();
      const op2 = stack.pop();
      const result = op2! / op1!;
      stack.push(result);
    } else stack.push(+c);
  }

  return stack.pop()!;
};

function longestValidParentheses(s: string): number {
  const stack = [];
  let counter = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else if (s[i] === ')') {
      if (stack.length && stack[stack.length - 1] === '(') {
        stack.pop();
        counter += 2;
      } else continue;
    } else if (s[i] === '}') {
      if (stack.length && stack[stack.length - 1] === '{') {
        stack.pop();
        counter += 2;
      } else continue;
    } else if (s[i] === ']') {
      if (stack.length && stack[stack.length - 1] === '[') {
        stack.pop();
        counter += 2;
      } else continue;
    }
  }

  return counter;
}

// console.log(longestValidParentheses('()(()'));

class CustomStack {
  private s: number[] = [];
  constructor(private maxSize: number) {
    this.maxSize = maxSize;
  }

  push(x: number): void {
    if (this.s.length >= this.maxSize) {
      return;
    }
    this.s.push(x);
  }

  pop(): number {
    if (this.s.length <= 0) {
      return -1;
    }
    return this.s.pop()!;
  }

  increment(k: number, val: number): void {
    for (let i = 0; i < this.s.length; i++) {
      if (k > this.s.length) {
        this.s[i] = this.s[i] + val;
      } else {
        if (i === k) break;
        this.s[i] = this.s[i] + val;
      }
    }
  }
}

let stk = new CustomStack(3); // Stack is Empty []
stk.push(1); // stack becomes [1]
stk.push(2); // stack becomes [1, 2]
console.log(stk.pop()); // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2); // stack becomes [1, 2]
stk.push(3); // stack becomes [1, 2, 3]
stk.push(4); // stack still [1, 2, 3], Do not add another elements as size is 4
stk.increment(5, 100); // stack becomes [101, 102, 103]
stk.increment(2, 100); // stack becomes [201, 202, 103]
console.log(stk.pop()); // return 103 --> Return top of the stack 103, stack becomes [201, 202]
console.log(stk.pop()); // return 202 --> Return top of the stack 202, stack becomes [201]
console.log(stk.pop()); // return 201 --> Return top of the stack 201, stack becomes []
console.log(stk.pop()); // return -1 --> Stack is empty return -1.

const isPalindrome = (input: string) => {
  const stack = new LinkedStack();
  const length = input.length;

  let i = 0;

  while (i < Math.floor(length / 2)) {
    stack.push(input[i]);
    i++;
  }

  if (input.length % 2 !== 0) i++;

  while (i < length) {
    if (stack.pop() !== input[i]) return false;
    i++;
  }

  return true;
};

console.log(isPalindrome('abaaaba'));

function maxDepth(s: string): number {
  let stack = [];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(s[i]);
      max = Math.max(max, stack.length);
    } else if (s[i] === ')') {
      stack.pop();
    } else continue;
  }
  if (stack.length !== 0) return -1; // invalid symbols
  return max;
}

console.log(maxDepth('(1+(2*3)+((8)/4))+1')); // 3
