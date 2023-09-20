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

console.log(isSymbolBalanced('(2A){}{{}}(1)(5){[1+2]}')); // TRUE
console.log(isSymbolBalanced('(2A)}{]}')); // FALSE
console.log(isSymbolBalanced('({])')); // FALSE

