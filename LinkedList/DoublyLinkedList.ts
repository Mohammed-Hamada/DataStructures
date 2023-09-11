import { DoublyLinkedListNode } from '../Nodes';

class DoublyLinkedList<T> {
  private _head: DoublyLinkedListNode<T> | null;
  public get head(): DoublyLinkedListNode<T> | null {
    return this._head;
  }
  public set head(value: DoublyLinkedListNode<T> | null) {
    this._head = value;
  }
  private _tail: DoublyLinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  prepend(data: T): void {
    const newNode = new DoublyLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.next = this._head;
      this._head!.prev = newNode;
      this._head = newNode;
    }
    this._size++;
  }

  append(data: T): void {
    const newNode = new DoublyLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail!.next = newNode;
      newNode.prev = this._tail;
      this._tail = newNode;
    }

    this._size++;
  }

  insert(data: T, index: number): void {
    if (index < 0 || index > this._size - 1) {
      throw new Error('Index out of bounds.');
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    if (index === this._size - 1) {
      this.append(data);
      return;
    }

    const newNode = new DoublyLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      let currNode = this._head;
      for (let i = 1; i < index; i++) {
        currNode = currNode.next!;
      }
      newNode.next = currNode.next;
      newNode.prev = currNode;
      currNode.next!.prev = newNode;
      currNode.next = newNode;
    }

    this._size++;
  }

  deleteFromBeginning(): void {
    if (!this._head) {
      return; // The list is empty.
    }

    this._head = this._head.next;
    this._size--;
  }

  deleteFromEnd(): void {
    if (!this._head) {
      return; // The list is empty.
    } else if (this.size === 1) {
      this._tail = null;
      this._head = null;
    } else {
      let prevTail = this._tail?.prev;

      prevTail!.next = null;
      this._tail = prevTail!;
    }
    this._size--;
  }

  delete(index: number): void {
    if (index < 0 || index > this._size - 1) {
      throw new Error('Index out of bounds.');
    }

    if (!this._head) {
      return;
    }

    if (index === 0) {
      this.deleteFromBeginning();
      return;
    }
    if (index === this._size - 1) {
      this.deleteFromEnd();
      return;
    }

    let currNode = this._head;
    for (let i = 1; i < index; i++) {
      currNode = currNode.next!;
    }

    currNode.next!.next!.prev = currNode.prev;
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

const list = new DoublyLinkedList();

console.log('Is Linked List Empty?', list.isEmpty());
console.log('Size of Linked List:', list.size);

console.log('\n================== Before ===================');
console.log('To Array:', list.toArray());

list.append(1);
list.append(2);
list.append(3);

console.log('\n============== After Appending ==============');
console.log('To Array:', list.toArray());

list.prepend(6);
list.prepend(7);
list.prepend(8);
list.prepend(9);

console.log('\n============== After Prepending ==============');
console.log('To Array:', list.toArray());

list.insert(100, 3); // Insert into index 3

console.log('\n======== After Insertion At Index 3 =========');
console.log('To Array:', list.toArray());

list.deleteFromBeginning();

console.log('\n======== After Delete First Element =========');
console.log('To Array:', list.toArray());

list.deleteFromEnd();
list.deleteFromEnd();

console.log('\n======= After Delete Last 2 Element =========');
console.log('To Array:', list.toArray());

list.delete(3);

console.log('\n======== After Deletion At Index 3 ==========');
console.log('To Array:', list.toArray());

console.log('\n============= Index Of Number 8 =============');
console.log(list.indexOf(8));

console.log('\n\n');

console.log('Is Linked List Empty?', list.isEmpty());
console.log('Size of Linked List:', list.size);
