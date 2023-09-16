import { CircularLinkedListNode, DoublyLinkedListNode } from '../Nodes';

class CircularLinkedList<T> {
  private _head: CircularLinkedListNode<T> | null;
  private _tail: CircularLinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  append(data: T): void {
    const newNode = new CircularLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this._head;
      this._tail!.next = newNode;
      this._tail = newNode;
    }

    this._size++;
  }

  prepend(data: T): void {
    const newNode = new CircularLinkedListNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this._head;
      this._tail!.next = newNode;
      this._head = newNode;
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

    const newNode = new CircularLinkedListNode(data);

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

    if (this._size === 1) {
      this._head = null;
      this._tail = null;
    } else {
      this._head = this._head.next;
      this._tail!.next = this._head;
    }
    this._size--;
  }

  deleteFromEnd(): void {
    if (!this._head) {
      return; // The list is empty.
    }

    if (this._size === 1) {
      this._head = null;
      this._tail = null;
    } else {
      let currNode = this._head;

      while (currNode.next !== this._tail) {
        currNode = currNode.next!;
      }

      currNode.next = this._head;
      this._tail = currNode;
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

    do {
      if (currNode!.data === data) {
        return i;
      }
      i++;
      currNode = currNode!.next;
    } while (currNode !== this._head);

    return -1;
  }

  toArray(): T[] {
    const result: T[] = [];

    if (this._head) {
      let currNode = this._head;
      do {
        result.push(currNode!.data);
        currNode = currNode.next!;
      } while (currNode !== this._head);
    }

    return result;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  get size(): number {
    return this._size;
  }

  public get tail(): CircularLinkedListNode<T> | null {
    return this._tail;
  }

  public get head(): CircularLinkedListNode<T> | null {
    return this._head;
  }
}

const list = new CircularLinkedList();

console.log('Is Circular Linked List Empty?', list.isEmpty());
console.log('Size of Circular Linked List:', list.size);

console.log('\n================== Before ===================');
console.log('To Array:', list.toArray());

list.append(1);
list.append(2);
list.append(3);

console.log('\n============== After Appending ==============');
console.log('To Array:', list.toArray());

list.prepend(6);
list.prepend(7);

console.log('\n============== After Prepending =============');
console.log('To Array:', list.toArray());

list.insert(100, 5); // Insert into index 3

console.log('\n======== After Insertion At Index 3 =========');
console.log('To Array:', list.toArray());

list.deleteFromBeginning();


console.log('\n======== After Delete First Element =========');
console.log('To Array:', list.toArray());

list.deleteFromEnd();
list.deleteFromEnd();

console.log('\n======= After Delete Last 2 Element =========');
console.log('To Array:', list.toArray());

list.delete(0);

console.log('\n======== After Deletion At Index 3 ==========');
console.log('To Array:', list.toArray());

console.log('\n============ Index Of Number 100 ============');
console.log(list.indexOf(100));

console.log('\n\n');

console.log('Is Circular Linked List Empty?', list.isEmpty());
console.log('Size of Circular Linked List:', list.size);
