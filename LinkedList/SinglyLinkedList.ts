import { SinglyLinkedListNode } from '../Nodes';

export class SinglyLinkedList<T> {
  private _head: SinglyLinkedListNode<T> | null;

  public get head(): SinglyLinkedListNode<T> | null {
    return this._head;
  }
  public set head(value: SinglyLinkedListNode<T> | null) {
    this._head = value;
  }
  private _tail: SinglyLinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  prepend(data: T): void {
    const newNode = new SinglyLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.next = this._head;
      this._head = newNode;
    }
    this._size++;
  }

  append(data: T): void {
    const newNode = new SinglyLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail!.next = newNode;
      this._tail = newNode;
    }

    this._size++;
  }

  insert(data: T, index: number): void {
    if (index < 0 || index > this._size) {
      throw new Error('Index out of bounds.');
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    if (index === this._size) {
      this.append(data);
      return;
    }

    const newNode = new SinglyLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      let currNode = this._head;
      for (let i = 1; i < index; i++) {
        currNode = currNode.next!;
      }
      newNode.next = currNode.next;
      currNode.next = newNode;
    }
    this._size++;
  }

  deleteFromBeginning(): void {
    if (!this._head) {
      return; // The list is empty.
    }

    this._head = this._head!.next;
    this._size--;
  }

  deleteFromEnd(): void {
    if (!this._head) {
      return; // The list is empty.
    }

    let currNode = this._head;
    let prevNode: typeof currNode | null = null;

    while (currNode?.next !== null) {
      prevNode = currNode;
      currNode = currNode?.next!;
    }

    if (prevNode) {
      this._tail = prevNode;
      prevNode!.next = null;
    } else {
      this._head = null;
      this._tail = null;
    }

    this._size--;
  }

  delete(index: number): void {
    if (index < 0 || index > this._size) {
      throw new Error('Index out of bounds.');
    }

    if (!this._head) {
      return;
    }

    if (index === 0) {
      this.deleteFromBeginning();
      return;
    }
    if (index === this._size) {
      this.deleteFromEnd();
      return;
    }

    let currNode = this._head;
    for (let i = 1; i < index; i++) {
      currNode = currNode?.next!;
    }
    currNode.next = currNode.next?.next!;

    this._size--;
  }

  nthNodeFromEnd1(n: number): SinglyLinkedListNode<T> | null {
    let count = 0;
    let currNode = this._head;

    while (currNode !== null) {
      currNode = currNode.next;
      count++;
    }

    if (n > count) {
      return null;
    }

    currNode = this._head;
    for (let i = 1; i <= count - n; i++) {
      currNode = currNode?.next!;
    }

    return currNode;
  }

  nthNodeFromEnd2(n: number): SinglyLinkedListNode<T> | null {
    if (this._head === null) {
      return null;
    }

    let p = this._head;
    let f = this._head;

    let count = 1;
    while (count <= n - 1) {
      if (f.next === null) {
        return null;
      }
      f = f.next!;
      count++;
    }

    while (f.next !== null) {
      p = p.next!;
      f = f.next!;
    }

    return p;
  }

  isLoopExistsUsingFloyds(): boolean {
    let slowPtr = this._head;
    let fastPtr = this._head;

    while (fastPtr !== null && fastPtr.next !== null) {
      slowPtr = slowPtr?.next!;
      fastPtr = fastPtr.next.next;

      if (slowPtr === fastPtr) {
        return true;
      }
    }
    return false;
  }

  findStartOfTheLoop(): SinglyLinkedListNode<T> | null {
    let fast = this._head;
    let slow = this._head;
    let isLoopExists = false;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow?.next!;

      if (fast === slow) {
        isLoopExists = true;
        break;
      }
    }

    slow = this._head;
    if (isLoopExists) {
      while (slow !== fast) {
        fast = fast?.next!;
        slow = slow?.next!;
      }
      return fast;
    } else {
      return null;
    }
  }

  findLengthOfTheLoop(): number {
    let fast = this._head;
    let slow = this._head;
    let isLoopExists = false;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow?.next!;

      if (fast === slow) {
        isLoopExists = true;
        break;
      }
    }

    slow = this._head;
    if (isLoopExists) {
      while (slow !== fast) {
        fast = fast?.next!;
        slow = slow?.next!;
      }

      let loopLength = 0;
      do {
        loopLength++;
        fast = fast?.next!;
      } while (slow !== fast);

      return loopLength;
    } else return -1;
  }

  removeNthFromEnd(n: number) {
    if (n <= 0 || !this._head) {
      return; // Invalid input or empty list
    }

    let fast = this._head;
    let slow = this._head;

    for (let i = 1; i <= n; i++) {
      if (!fast) {
        return;
      }
      fast = fast?.next!;
    }

    while (fast?.next) {
      fast = fast.next;
      slow = slow?.next!;
    }

    if (!fast) {
      this._head = slow?.next!;
    } else {
      slow!.next = slow!.next!.next;
    }

    this._size--;
  }

  reverse(): SinglyLinkedList<T> {
    let curr = this._head;
    let prev = null;

    while (curr !== null) {
      let next = curr.next;

      curr.next = prev;
      prev = curr;
      curr = next;
    }

    this._head = prev;

    return this;
  }

  indexOf(data: T): number {
    let currNode = this._head;
    let i = 0;

    while (currNode !== null) {
      if (currNode.data === data) {
        return i;
      }
      i++;
      currNode = currNode.next;
    }

    return -1;
  }

  get size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    let currNode = this._head;

    while (currNode) {
      result.push(currNode.data);
      currNode = currNode.next;
    }

    return result;
  }
}

const list = new SinglyLinkedList();

console.log('Is Linked List Empty?', list.isEmpty());
console.log('Size of Linked List:', list.size);

console.log('\n================== Before ===================');
console.log('To Array:', list.toArray());

list.append(1);
list.append(2);
list.append(3);
list.append(5);
list.append(6);
list.append(7);

console.log('\n============== After Appending ==============');
console.log('To Array:', list.toArray());

list.insert(4, 6); // Insert into index 3

console.log('\n======== After Insertion At Index 3 =========');
console.log('To Array:', list.toArray());

console.log('\n==== 3rd Node From End Of List (Brute Force Method) ====');
console.log(list.nthNodeFromEnd1(3));

console.log('\n==== 3rd Node From End Of List (2 Pointers Method) =====');
console.log(list.nthNodeFromEnd2(8));

list.deleteFromBeginning();

console.log('\n======== After Delete First Element =========');
console.log('To Array:', list.toArray());

list.deleteFromEnd();

console.log('\n======== After Delete Last Element ==========');
console.log('To Array:', list.toArray());

list.delete(3);

console.log('\n======== After Deletion At Index 3 ==========');
console.log('To Array:', list.toArray());

console.log('\n============ Index Of Number 7 ==============');
console.log(list.indexOf(7));
console.log(list.reverse().toArray())
console.log('\n\n');

console.log('Is Linked List Empty?', list.isEmpty());
console.log('Size of Linked List:', list.size);

console.log('Is First List Have Loop?', list.isLoopExistsUsingFloyds());

const listWithLoop = new SinglyLinkedList();

const node1 = new SinglyLinkedListNode(1);
const node2 = new SinglyLinkedListNode(2);
const node3 = new SinglyLinkedListNode(3);
const node4 = new SinglyLinkedListNode(4);
const node5 = new SinglyLinkedListNode(5);
const node6 = new SinglyLinkedListNode(6);
const node7 = new SinglyLinkedListNode(7);
const node8 = new SinglyLinkedListNode(8);
const node9 = new SinglyLinkedListNode(9);
const node10 = new SinglyLinkedListNode(10);
const node11 = new SinglyLinkedListNode(11);
const node12 = new SinglyLinkedListNode(12);

listWithLoop.head = node1;
listWithLoop.head.next = node2;
listWithLoop.head.next.next = node3;
listWithLoop.head.next.next.next = node4;
listWithLoop.head.next.next.next.next = node5;
listWithLoop.head.next.next.next.next.next = node6;
listWithLoop.head.next.next.next.next.next.next = node7;
listWithLoop.head.next.next.next.next.next.next.next = node8;
listWithLoop.head.next.next.next.next.next.next.next.next = node9;
listWithLoop.head.next.next.next.next.next.next.next.next.next = node10;
listWithLoop.head.next.next.next.next.next.next.next.next.next.next = node11;
listWithLoop.head.next.next.next.next.next.next.next.next.next.next.next =
  node12;
listWithLoop.head.next.next.next.next.next.next.next.next.next.next.next.next =
  node7;

console.log('Is First List Have Loop?', listWithLoop.isLoopExistsUsingFloyds());
console.log('Start Of The Loop:', listWithLoop.findStartOfTheLoop()?.data);
console.log('Length Of The Loop:', listWithLoop.findLengthOfTheLoop());
