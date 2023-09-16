export class SinglyLinkedListNode<T> {
  private _data: T;
  private _next: SinglyLinkedListNode<T> | null;

  constructor(data: T) {
    this._data = data;
    this._next = null;
  }

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;
  }

  get next(): typeof this._next {
    return this._next;
  }

  set next(next: typeof this._next) {
    this._next = next;
  }
}

export class DoublyLinkedListNode<T> {
  private _data: T;
  private _next: DoublyLinkedListNode<T> | null;
  private _prev: DoublyLinkedListNode<T> | null;

  constructor(data: T) {
    this._data = data;
    this._next = null;
    this._prev = null;
  }

  public get data(): T {
    return this._data;
  }
  public set data(value: T) {
    this._data = value;
  }

  public get next(): DoublyLinkedListNode<T> | null {
    return this._next;
  }
  public set next(value: DoublyLinkedListNode<T> | null) {
    this._next = value;
  }

  public get prev(): DoublyLinkedListNode<T> | null {
    return this._prev;
  }
  public set prev(value: DoublyLinkedListNode<T> | null) {
    this._prev = value;
  }
}

export class CircularLinkedListNode<T> {
  private _data: T;
  private _next: CircularLinkedListNode<T> | null;

  constructor(data: T) {
    this._data = data;
    this._next = null;
  }

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;
  }

  get next(): typeof this._next {
    return this._next;
  }

  set next(next: typeof this._next) {
    this._next = next;
  }
}
