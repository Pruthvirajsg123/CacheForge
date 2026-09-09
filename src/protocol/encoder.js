function encodeSimpleString(value) {
  return `+${value}\r\n`;
}

function encodeError(message) {
  return `-ERR ${message}\r\n`;
}

function encodeInteger(value) {
  return `:${value}\r\n`;
}

function encodeBulkString(value) {
  if (value === null || value === undefined) {
    return "$-1\r\n";
  }

  return `$${Buffer.byteLength(value)}\r\n${value}\r\n`;
}

function encodeArray(values) {
  let result = `*${values.length}\r\n`;

  for (const value of values) {
    result += encodeBulkString(value);
  }

  return result;
}

module.exports = {
  encodeSimpleString,
  encodeError,
  encodeInteger,
  encodeBulkString,
  encodeArray,
};
