const Node = require("./Node");
const DoublyLinkedList = require("./DoublyLinkedList");

class LRUStore {
  constructor(maxKeys) {
    this.cache = new Map();
    this.list = new DoublyLinkedList();
    this.maxKeys = maxKeys;
  }

  set(key, value) {
    const existingNode = this.cache.get(key);

    // Key already exists
    if (existingNode) {
      existingNode.value = value;
      this.list.moveToHead(existingNode);
      return;
    }

    // Cache is full → remove LRU node
    if (this.cache.size >= this.maxKeys) {
      const lruNode = this.list.tail.prev;

      this.list.removeNode(lruNode);
      this.cache.delete(lruNode.key);
    }

    // Add new key
    const newNode = new Node(key, value);

    this.cache.set(key, newNode);
    this.list.addToHead(newNode);
  }

  get(key) {
    const node = this.cache.get(key);

    if (!node) {
      return undefined;
    }

    // Accessed key becomes MRU
    this.list.moveToHead(node);

    return node.value;
  }
}

module.exports = LRUStore;
