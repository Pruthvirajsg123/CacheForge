const test = require("node:test");
const assert = require("node:assert");
const LRUStore = require("../src/lru/LRUStore");

test("GET should update recency order", () => {
  const store = new LRUStore(3);

  store.set("A", 10);
  store.set("B", 20);
  store.set("C", 30);

  // C -> B -> A
  store.get("A");

  // A -> C -> B
  assert.strictEqual(store.list.head.next.key, "A");
  assert.strictEqual(store.list.head.next.next.key, "C");
  assert.strictEqual(store.list.tail.prev.key, "B");
});

test("SET existing key should update value and recency", () => {
  const store = new LRUStore(3);

  store.set("A", 10);
  store.set("B", 20);
  store.set("C", 30);

  // C -> B -> A
  store.set("A", 100);

  // A -> C -> B
  assert.strictEqual(store.get("A"), 100);
  assert.strictEqual(store.list.head.next.key, "A");
  assert.strictEqual(store.list.tail.prev.key, "B");
});

test("LRU key should be evicted when capacity is exceeded", () => {
  const store = new LRUStore(3);

  store.set("A", 10);
  store.set("B", 20);
  store.set("C", 30);

  // C -> B -> A
  store.get("A");

  // A -> C -> B
  store.set("D", 40);

  // B should be evicted
  assert.strictEqual(store.get("B"), undefined);

  // D -> A -> C
  assert.strictEqual(store.list.head.next.key, "D");
  assert.strictEqual(store.list.tail.prev.key, "C");
});

test("No eviction should happen when under capacity", () => {
  const store = new LRUStore(3);

  store.set("A", 10);
  store.set("B", 20);

  assert.strictEqual(store.get("A"), 10);
  assert.strictEqual(store.get("B"), 20);

  assert.strictEqual(store.cache.size, 2);
});
