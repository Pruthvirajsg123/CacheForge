const Node = require("./Node");

class DoublyLinkedList {
  constructor() {
    this.head = new Node("HEAD", null);
    this.tail = new Node("TAIL", null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;

    node.prev = null;
    node.next = null;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }
}

module.exports = DoublyLinkedList;
