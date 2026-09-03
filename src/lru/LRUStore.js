const Node = require("./Node");
const DoublyLinkedList = require("./DoublyLinkedList");

class LRUStore {
  constructor() {
    this.cache = new Map();
    this.list = new DoublyLinkedList();
  }

  set(key, value) {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      existingNode.value = value;
      this.list.moveToHead(existingNode);
      return;
    }

    const newNode = new Node(key, value);

    this.cache.set(key, newNode);
    this.list.addToHead(newNode);
  }

  get(key) {
    const node = this.cache.get(key);

    if (!node) {
      return undefined;
    }

    this.list.moveToHead(node);

    return node.value;
  }
}

module.exports = LRUStore;
