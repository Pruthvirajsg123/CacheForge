const {
  encodeSimpleString,
  encodeError,
  encodeInteger,
  encodeBulkString,
  encodeArray,
} = require("../src/protocol/encoder");

console.log("Simple String:");
console.log(JSON.stringify(encodeSimpleString("OK")));

console.log("Error:");
console.log(JSON.stringify(encodeError("unknown command")));

console.log("Integer:");
console.log(JSON.stringify(encodeInteger(123)));

console.log("Bulk String:");
console.log(JSON.stringify(encodeBulkString("foobar")));

console.log("Null Bulk String:");
console.log(JSON.stringify(encodeBulkString(null)));

console.log("Array:");
console.log(JSON.stringify(encodeArray(["SET", "foo", "bar"])));
