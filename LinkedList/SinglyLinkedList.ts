import { SinglyLinkedListNode } from '../Nodes';

export class SinglyLinkedList<T> {
  private _head: SinglyLinkedListNode<T> | null;
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
    let current = this._head;

    while (current) {
      result.push(current.data);
      current = current.next;
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

list.deleteFromBeginning();

console.log('\n======== After Delete First Element =========');
console.log('To Array:', list.toArray());

list.deleteFromEnd();

console.log('\n======== After Delete Last Element ==========');
console.log('To Array:', list.toArray());

list.delete(3);

console.log('\n======== After Deletion At Index 3 ==========');
console.log('To Array:', list.toArray());

console.log('\n============ Index Of Number 7s =============');
console.log(list.indexOf(7));

console.log('\n\n');

console.log('Is Linked List Empty?', list.isEmpty());
console.log('Size of Linked List:', list.size);
