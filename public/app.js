var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});

// node_modules/@kittycad/lib/dist/mjs/index.js
try {
  if ("undefined" == typeof fetch && "undefined" != typeof process && process.versions?.node) {
    new Function("m", "return import(m)")("cross-fetch/polyfill").catch((() => {
    }));
  }
} catch {
}
var t = class {
  constructor(t2) {
    const e2 = "undefined" != typeof process ? process.env : void 0, n = e2?.KITTYCAD_TOKEN || e2?.KITTYCAD_API_TOKEN || e2?.ZOO_AI_TOKEN, i = e2?.ZOO_HOST;
    "string" == typeof t2 ? this.token = t2 : t2 && "object" == typeof t2 && (this.token = t2.token, this.baseUrl = t2.baseUrl, this.fetch = t2.fetch), this.token ??= n, this.baseUrl ??= i;
  }
};
function e(t2) {
  const e2 = new URLSearchParams();
  for (const [n2, i] of Object.entries(t2)) if (void 0 !== i) if (Array.isArray(i)) for (const t3 of i) e2.append(n2, String(t3));
  else e2.append(n2, String(i));
  const n = e2.toString();
  return n ? `?${n}` : "";
}
try {
  if ("undefined" != typeof process && process.versions?.node && "win32" === process.platform) {
    new Function("m", "return import(m)")("win-ca");
  }
} catch {
}
var u = (() => {
  const t2 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype), Symbol.toStringTag).get;
  return (e2) => t2.call(e2);
})();
function r(t2) {
  return "Uint8Array" === u(t2);
}
function p(t2) {
  return "object" == typeof t2 && null != t2 && Symbol.toStringTag in t2 && ("ArrayBuffer" === t2[Symbol.toStringTag] || "SharedArrayBuffer" === t2[Symbol.toStringTag]);
}
function h(t2) {
  return t2 instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t2);
}
function y(t2) {
  return "object" == typeof t2 && null != t2 && Symbol.toStringTag in t2 && "Map" === t2[Symbol.toStringTag];
}
function G(t2) {
  return t2 instanceof Date || "[object Date]" === Object.prototype.toString.call(t2);
}
function X(t2, e2) {
  return JSON.stringify(t2, ((t3, e3) => "bigint" == typeof e3 ? { $numberLong: `${e3}` } : y(e3) ? Object.fromEntries(e3) : e3));
}
var V = 7;
var W = /* @__PURE__ */ Symbol.for("@@mdb.bson.version");
var f = 2147483647;
var g = -2147483648;
var Y = Math.pow(2, 63) - 1;
var I = -Math.pow(2, 63);
var R = Math.pow(2, 53);
var S = -Math.pow(2, 53);
var J = 1;
var K = 2;
var T = 3;
var L = 4;
var U = 5;
var z = 6;
var x = 7;
var N = 8;
var w = 9;
var H = 10;
var k = 11;
var B = 12;
var C = 13;
var v = 14;
var M = 15;
var j = 16;
var P = 17;
var F = 18;
var Q = 19;
var O = 255;
var E = 127;
var _ = 0;
var D = 4;
var A = Object.freeze({ double: 1, string: 2, object: 3, array: 4, binData: 5, undefined: 6, objectId: 7, bool: 8, date: 9, null: 10, regex: 11, dbPointer: 12, javascript: 13, symbol: 14, javascriptWithScope: 15, int: 16, timestamp: 17, long: 18, decimal: 19, minKey: -1, maxKey: 127 });
var $ = class extends Error {
  get bsonError() {
    return true;
  }
  get name() {
    return "BSONError";
  }
  constructor(t2, e2) {
    super(t2, e2);
  }
  static isBSONError(t2) {
    return null != t2 && "object" == typeof t2 && "bsonError" in t2 && true === t2.bsonError && "name" in t2 && "message" in t2 && "stack" in t2;
  }
};
var q = class extends $ {
  get name() {
    return "BSONVersionError";
  }
  constructor() {
    super(`Unsupported BSON version, bson types must be from bson ${V}.x.x`);
  }
};
var tt = class extends $ {
  get name() {
    return "BSONRuntimeError";
  }
  constructor(t2) {
    super(t2);
  }
};
var et = class extends $ {
  get name() {
    return "BSONOffsetError";
  }
  offset;
  constructor(t2, e2, n) {
    super(`${t2}. offset: ${e2}`, n), this.offset = e2;
  }
};
var nt;
var it;
function lt(t2, e2, n, i) {
  if (i) {
    nt ??= new TextDecoder("utf8", { fatal: true });
    try {
      return nt.decode(t2.subarray(e2, n));
    } catch (t3) {
      throw new $("Invalid UTF-8 string in BSON document", { cause: t3 });
    }
  }
  return it ??= new TextDecoder("utf8", { fatal: false }), it.decode(t2.subarray(e2, n));
}
function ot(t2, e2, n) {
  if (0 === t2.length) return "";
  const i = n - e2;
  if (0 === i) return "";
  if (i > 20) return null;
  if (1 === i && t2[e2] < 128) return String.fromCharCode(t2[e2]);
  if (2 === i && t2[e2] < 128 && t2[e2 + 1] < 128) return String.fromCharCode(t2[e2]) + String.fromCharCode(t2[e2 + 1]);
  if (3 === i && t2[e2] < 128 && t2[e2 + 1] < 128 && t2[e2 + 2] < 128) return String.fromCharCode(t2[e2]) + String.fromCharCode(t2[e2 + 1]) + String.fromCharCode(t2[e2 + 2]);
  const l = [];
  for (let i2 = e2; i2 < n; i2++) {
    const e3 = t2[i2];
    if (e3 > 127) return null;
    l.push(e3);
  }
  return String.fromCharCode(...l);
}
function ct(t2) {
  return dt.fromNumberArray(Array.from({ length: t2 }, (() => Math.floor(256 * Math.random()))));
}
function at(t2) {
  return crypto.getRandomValues(dt.allocate(t2));
}
var st = (() => {
  const { crypto: t2 } = globalThis;
  return null != t2 && "function" == typeof t2.getRandomValues ? at : ct;
})();
var dt = { isUint8Array: r, toLocalBufferType(t2) {
  if (Buffer.isBuffer(t2)) return t2;
  if (ArrayBuffer.isView(t2)) return Buffer.from(t2.buffer, t2.byteOffset, t2.byteLength);
  const e2 = t2?.[Symbol.toStringTag] ?? Object.prototype.toString.call(t2);
  if ("ArrayBuffer" === e2 || "SharedArrayBuffer" === e2 || "[object ArrayBuffer]" === e2 || "[object SharedArrayBuffer]" === e2) return Buffer.from(t2);
  throw new $("Cannot create Buffer from the passed potentialBuffer.");
}, allocate: (t2) => Buffer.alloc(t2), allocateUnsafe: (t2) => Buffer.allocUnsafe(t2), compare: (t2, e2) => dt.toLocalBufferType(t2).compare(e2), concat: (t2) => Buffer.concat(t2), copy: (t2, e2, n, i, l) => dt.toLocalBufferType(t2).copy(e2, n ?? 0, i ?? 0, l ?? t2.length), equals: (t2, e2) => dt.toLocalBufferType(t2).equals(e2), fromNumberArray: (t2) => Buffer.from(t2), fromBase64: (t2) => Buffer.from(t2, "base64"), fromUTF8: (t2) => Buffer.from(t2, "utf8"), toBase64: (t2) => dt.toLocalBufferType(t2).toString("base64"), fromISO88591: (t2) => Buffer.from(t2, "binary"), toISO88591: (t2) => dt.toLocalBufferType(t2).toString("binary"), fromHex: (t2) => Buffer.from(t2, "hex"), toHex: (t2) => dt.toLocalBufferType(t2).toString("hex"), toUTF8(t2, e2, n, i) {
  const l = n - e2 <= 20 ? ot(t2, e2, n) : null;
  if (null != l) return l;
  const o = dt.toLocalBufferType(t2).toString("utf8", e2, n);
  if (i) {
    for (let i2 = 0; i2 < o.length; i2++) if (65533 === o.charCodeAt(i2)) {
      lt(t2, e2, n, true);
      break;
    }
  }
  return o;
}, utf8ByteLength: (t2) => Buffer.byteLength(t2, "utf8"), encodeUTF8Into(t2, e2, n) {
  const i = (function(t3, e3, n2) {
    if (0 === e3.length) return 0;
    if (e3.length > 25) return null;
    if (t3.length - n2 < e3.length) return null;
    for (let i2 = 0, l = n2; i2 < e3.length; i2++, l++) {
      const n3 = e3.charCodeAt(i2);
      if (n3 > 127) return null;
      t3[l] = n3;
    }
    return e3.length;
  })(t2, e2, n);
  return null != i ? i : dt.toLocalBufferType(t2).write(e2, n, void 0, "utf8");
}, randomBytes: st, swap32: (t2) => dt.toLocalBufferType(t2).swap32() };
function bt(t2) {
  if (t2 < 0) throw new RangeError(`The argument 'byteLength' is invalid. Received ${t2}`);
  return ut.fromNumberArray(Array.from({ length: t2 }, (() => Math.floor(256 * Math.random()))));
}
var Zt = (() => {
  const { crypto: t2 } = globalThis;
  if (null != t2 && "function" == typeof t2.getRandomValues) return (e2) => t2.getRandomValues(ut.allocate(e2));
  if ((function() {
    const { navigator: t3 } = globalThis;
    return "object" == typeof t3 && "ReactNative" === t3.product;
  })()) {
    const { console: t3 } = globalThis;
    t3?.warn?.("BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.");
  }
  return bt;
})();
var mt = /(\d|[a-f])/i;
var ut = { isUint8Array: r, toLocalBufferType(t2) {
  const e2 = t2?.[Symbol.toStringTag] ?? Object.prototype.toString.call(t2);
  if ("Uint8Array" === e2) return t2;
  if (ArrayBuffer.isView(t2)) return new Uint8Array(t2.buffer.slice(t2.byteOffset, t2.byteOffset + t2.byteLength));
  if ("ArrayBuffer" === e2 || "SharedArrayBuffer" === e2 || "[object ArrayBuffer]" === e2 || "[object SharedArrayBuffer]" === e2) return new Uint8Array(t2);
  throw new $("Cannot make a Uint8Array from passed potentialBuffer.");
}, allocate(t2) {
  if ("number" != typeof t2) throw new TypeError(`The "size" argument must be of type number. Received ${String(t2)}`);
  return new Uint8Array(t2);
}, allocateUnsafe: (t2) => ut.allocate(t2), compare(t2, e2) {
  if (t2 === e2) return 0;
  const n = Math.min(t2.length, e2.length);
  for (let i = 0; i < n; i++) {
    if (t2[i] < e2[i]) return -1;
    if (t2[i] > e2[i]) return 1;
  }
  return t2.length < e2.length ? -1 : t2.length > e2.length ? 1 : 0;
}, concat(t2) {
  if (0 === t2.length) return ut.allocate(0);
  let e2 = 0;
  for (const n2 of t2) e2 += n2.length;
  const n = ut.allocate(e2);
  let i = 0;
  for (const e3 of t2) n.set(e3, i), i += e3.length;
  return n;
}, copy(t2, e2, n, i, l) {
  if (void 0 !== l && l < 0) throw new RangeError(`The value of "sourceEnd" is out of range. It must be >= 0. Received ${l}`);
  if (l = l ?? t2.length, void 0 !== i && (i < 0 || i > l)) throw new RangeError(`The value of "sourceStart" is out of range. It must be >= 0 and <= ${l}. Received ${i}`);
  if (i = i ?? 0, void 0 !== n && n < 0) throw new RangeError(`The value of "targetStart" is out of range. It must be >= 0. Received ${n}`);
  n = n ?? 0;
  const o = t2.subarray(i, l), c = Math.min(o.length, e2.length - n);
  return c <= 0 ? 0 : (e2.set(o.subarray(0, c), n), c);
}, equals(t2, e2) {
  if (t2.byteLength !== e2.byteLength) return false;
  for (let n = 0; n < t2.byteLength; n++) if (t2[n] !== e2[n]) return false;
  return true;
}, fromNumberArray: (t2) => Uint8Array.from(t2), fromBase64: (t2) => Uint8Array.from(atob(t2), ((t3) => t3.charCodeAt(0))), fromUTF8: (t2) => new TextEncoder().encode(t2), toBase64: (t2) => btoa(ut.toISO88591(t2)), fromISO88591: (t2) => Uint8Array.from(t2, ((t3) => 255 & t3.charCodeAt(0))), toISO88591: (t2) => Array.from(Uint16Array.from(t2), ((t3) => String.fromCharCode(t3))).join(""), fromHex(t2) {
  const e2 = t2.length % 2 == 0 ? t2 : t2.slice(0, t2.length - 1), n = [];
  for (let t3 = 0; t3 < e2.length; t3 += 2) {
    const i = e2[t3], l = e2[t3 + 1];
    if (!mt.test(i)) break;
    if (!mt.test(l)) break;
    const o = Number.parseInt(`${i}${l}`, 16);
    n.push(o);
  }
  return Uint8Array.from(n);
}, toHex: (t2) => Array.from(t2, ((t3) => t3.toString(16).padStart(2, "0"))).join(""), toUTF8(t2, e2, n, i) {
  const l = n - e2 <= 20 ? ot(t2, e2, n) : null;
  return null != l ? l : lt(t2, e2, n, i);
}, utf8ByteLength: (t2) => new TextEncoder().encode(t2).byteLength, encodeUTF8Into(t2, e2, n) {
  const i = new TextEncoder().encode(e2);
  return t2.set(i, n), i.byteLength;
}, randomBytes: Zt, swap32(t2) {
  if (t2.length % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (let e2 = 0; e2 < t2.length; e2 += 4) {
    const n = t2[e2], i = t2[e2 + 1], l = t2[e2 + 2], o = t2[e2 + 3];
    t2[e2] = o, t2[e2 + 1] = l, t2[e2 + 2] = i, t2[e2 + 3] = n;
  }
  return t2;
} };
var rt = "function" == typeof Buffer && true !== Buffer.prototype?._isBuffer ? dt : ut;
var pt = /* @__PURE__ */ Symbol.for("@@mdb.bson.type");
var ht = class {
  get [pt]() {
    return this._bsontype;
  }
  get [W]() {
    return V;
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](t2, e2, n) {
    return this.inspect(t2, e2, n);
  }
};
var yt = new Float64Array(1);
var Gt = new Uint8Array(yt.buffer, 0, 8);
yt[0] = -1;
var Xt = 0 === Gt[7];
var Vt = { isBigEndian: Xt, getNonnegativeInt32LE(t2, e2) {
  if (t2[e2 + 3] > 127) throw new RangeError(`Size cannot be negative at offset: ${e2}`);
  return t2[e2] | t2[e2 + 1] << 8 | t2[e2 + 2] << 16 | t2[e2 + 3] << 24;
}, getInt32LE: (t2, e2) => t2[e2] | t2[e2 + 1] << 8 | t2[e2 + 2] << 16 | t2[e2 + 3] << 24, getUint32LE: (t2, e2) => t2[e2] + 256 * t2[e2 + 1] + 65536 * t2[e2 + 2] + 16777216 * t2[e2 + 3], getUint32BE: (t2, e2) => t2[e2 + 3] + 256 * t2[e2 + 2] + 65536 * t2[e2 + 1] + 16777216 * t2[e2], getBigInt64LE: (t2, e2) => (BigInt(t2[e2 + 4] + 256 * t2[e2 + 5] + 65536 * t2[e2 + 6] + (t2[e2 + 7] << 24)) << 32n) + BigInt(t2[e2] + 256 * t2[e2 + 1] + 65536 * t2[e2 + 2] + 16777216 * t2[e2 + 3]), getFloat64LE: Xt ? (t2, e2) => (Gt[7] = t2[e2], Gt[6] = t2[e2 + 1], Gt[5] = t2[e2 + 2], Gt[4] = t2[e2 + 3], Gt[3] = t2[e2 + 4], Gt[2] = t2[e2 + 5], Gt[1] = t2[e2 + 6], Gt[0] = t2[e2 + 7], yt[0]) : (t2, e2) => (Gt[0] = t2[e2], Gt[1] = t2[e2 + 1], Gt[2] = t2[e2 + 2], Gt[3] = t2[e2 + 3], Gt[4] = t2[e2 + 4], Gt[5] = t2[e2 + 5], Gt[6] = t2[e2 + 6], Gt[7] = t2[e2 + 7], yt[0]), setInt32BE: (t2, e2, n) => (t2[e2 + 3] = n, n >>>= 8, t2[e2 + 2] = n, n >>>= 8, t2[e2 + 1] = n, n >>>= 8, t2[e2] = n, 4), setInt32LE: (t2, e2, n) => (t2[e2] = n, n >>>= 8, t2[e2 + 1] = n, n >>>= 8, t2[e2 + 2] = n, n >>>= 8, t2[e2 + 3] = n, 4), setBigInt64LE(t2, e2, n) {
  const i = 0xffffffffn;
  let l = Number(n & i);
  t2[e2] = l, l >>= 8, t2[e2 + 1] = l, l >>= 8, t2[e2 + 2] = l, l >>= 8, t2[e2 + 3] = l;
  let o = Number(n >> 32n & i);
  return t2[e2 + 4] = o, o >>= 8, t2[e2 + 5] = o, o >>= 8, t2[e2 + 6] = o, o >>= 8, t2[e2 + 7] = o, 8;
}, setFloat64LE: Xt ? (t2, e2, n) => (yt[0] = n, t2[e2] = Gt[7], t2[e2 + 1] = Gt[6], t2[e2 + 2] = Gt[5], t2[e2 + 3] = Gt[4], t2[e2 + 4] = Gt[3], t2[e2 + 5] = Gt[2], t2[e2 + 6] = Gt[1], t2[e2 + 7] = Gt[0], 8) : (t2, e2, n) => (yt[0] = n, t2[e2] = Gt[0], t2[e2 + 1] = Gt[1], t2[e2 + 2] = Gt[2], t2[e2 + 3] = Gt[3], t2[e2 + 4] = Gt[4], t2[e2 + 5] = Gt[5], t2[e2 + 6] = Gt[6], t2[e2 + 7] = Gt[7], 8) };
var Wt = class _Wt extends ht {
  get _bsontype() {
    return "Binary";
  }
  static BSON_BINARY_SUBTYPE_DEFAULT = 0;
  static BUFFER_SIZE = 256;
  static SUBTYPE_DEFAULT = 0;
  static SUBTYPE_FUNCTION = 1;
  static SUBTYPE_BYTE_ARRAY = 2;
  static SUBTYPE_UUID_OLD = 3;
  static SUBTYPE_UUID = 4;
  static SUBTYPE_MD5 = 5;
  static SUBTYPE_ENCRYPTED = 6;
  static SUBTYPE_COLUMN = 7;
  static SUBTYPE_SENSITIVE = 8;
  static SUBTYPE_VECTOR = 9;
  static SUBTYPE_USER_DEFINED = 128;
  static VECTOR_TYPE = Object.freeze({ Int8: 3, Float32: 39, PackedBit: 16 });
  buffer;
  sub_type;
  position;
  constructor(t2, e2) {
    if (super(), null != t2 && "string" == typeof t2 && !ArrayBuffer.isView(t2) && !p(t2) && !Array.isArray(t2)) throw new $("Binary can only be constructed from Uint8Array or number[]");
    this.sub_type = e2 ?? _Wt.BSON_BINARY_SUBTYPE_DEFAULT, null == t2 ? (this.buffer = rt.allocate(_Wt.BUFFER_SIZE), this.position = 0) : (this.buffer = Array.isArray(t2) ? rt.fromNumberArray(t2) : rt.toLocalBufferType(t2), this.position = this.buffer.byteLength);
  }
  put(t2) {
    if ("string" == typeof t2 && 1 !== t2.length) throw new $("only accepts single character String");
    if ("number" != typeof t2 && 1 !== t2.length) throw new $("only accepts single character Uint8Array or Array");
    let e2;
    if (e2 = "string" == typeof t2 ? t2.charCodeAt(0) : "number" == typeof t2 ? t2 : t2[0], e2 < 0 || e2 > 255) throw new $("only accepts number in a valid unsigned byte range 0-255");
    if (this.buffer.byteLength > this.position) this.buffer[this.position++] = e2;
    else {
      const t3 = rt.allocate(_Wt.BUFFER_SIZE + this.buffer.length);
      t3.set(this.buffer, 0), this.buffer = t3, this.buffer[this.position++] = e2;
    }
  }
  write(t2, e2) {
    if (e2 = "number" == typeof e2 ? e2 : this.position, this.buffer.byteLength < e2 + t2.length) {
      const e3 = rt.allocate(this.buffer.byteLength + t2.length);
      e3.set(this.buffer, 0), this.buffer = e3;
    }
    if (ArrayBuffer.isView(t2)) this.buffer.set(rt.toLocalBufferType(t2), e2), this.position = e2 + t2.byteLength > this.position ? e2 + t2.length : this.position;
    else if ("string" == typeof t2) throw new $("input cannot be string");
  }
  read(t2, e2) {
    const n = t2 + (e2 = e2 && e2 > 0 ? e2 : this.position);
    return this.buffer.subarray(t2, n > this.position ? this.position : n);
  }
  value() {
    return this.buffer.length === this.position ? this.buffer : this.buffer.subarray(0, this.position);
  }
  length() {
    return this.position;
  }
  toJSON() {
    return rt.toBase64(this.buffer.subarray(0, this.position));
  }
  toString(t2) {
    return "hex" === t2 ? rt.toHex(this.buffer.subarray(0, this.position)) : "base64" === t2 ? rt.toBase64(this.buffer.subarray(0, this.position)) : rt.toUTF8(this.buffer, 0, this.position, false);
  }
  toExtendedJSON(t2) {
    t2 = t2 || {}, this.sub_type === _Wt.SUBTYPE_VECTOR && ft(this);
    const e2 = rt.toBase64(this.buffer), n = Number(this.sub_type).toString(16);
    return t2.legacy ? { $binary: e2, $type: 1 === n.length ? "0" + n : n } : { $binary: { base64: e2, subType: 1 === n.length ? "0" + n : n } };
  }
  toUUID() {
    if (this.sub_type === _Wt.SUBTYPE_UUID) return new It(this.buffer.subarray(0, this.position));
    throw new $(`Binary sub_type "${this.sub_type}" is not supported for converting to UUID. Only "${_Wt.SUBTYPE_UUID}" is currently supported.`);
  }
  static createFromHexString(t2, e2) {
    return new _Wt(rt.fromHex(t2), e2);
  }
  static createFromBase64(t2, e2) {
    return new _Wt(rt.fromBase64(t2), e2);
  }
  static fromExtendedJSON(t2, e2) {
    let n, i;
    if (e2 = e2 || {}, "$binary" in t2 ? e2.legacy && "string" == typeof t2.$binary && "$type" in t2 ? (i = t2.$type ? parseInt(t2.$type, 16) : 0, n = rt.fromBase64(t2.$binary)) : "string" != typeof t2.$binary && (i = t2.$binary.subType ? parseInt(t2.$binary.subType, 16) : 0, n = rt.fromBase64(t2.$binary.base64)) : "$uuid" in t2 && (i = 4, n = It.bytesFromString(t2.$uuid)), !n) throw new $(`Unexpected Binary Extended JSON format ${JSON.stringify(t2)}`);
    return i === D ? new It(n) : new _Wt(n, i);
  }
  inspect(t2, e2, n) {
    n ??= X;
    return `Binary.createFromBase64(${n(rt.toBase64(this.buffer.subarray(0, this.position)), e2)}, ${n(this.sub_type, e2)})`;
  }
  toInt8Array() {
    if (this.sub_type !== _Wt.SUBTYPE_VECTOR) throw new $("Binary sub_type is not Vector");
    if (this.buffer[0] !== _Wt.VECTOR_TYPE.Int8) throw new $("Binary datatype field is not Int8");
    return ft(this), new Int8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toFloat32Array() {
    if (this.sub_type !== _Wt.SUBTYPE_VECTOR) throw new $("Binary sub_type is not Vector");
    if (this.buffer[0] !== _Wt.VECTOR_TYPE.Float32) throw new $("Binary datatype field is not Float32");
    ft(this);
    const t2 = new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
    return Vt.isBigEndian && rt.swap32(t2), new Float32Array(t2.buffer);
  }
  toPackedBits() {
    if (this.sub_type !== _Wt.SUBTYPE_VECTOR) throw new $("Binary sub_type is not Vector");
    if (this.buffer[0] !== _Wt.VECTOR_TYPE.PackedBit) throw new $("Binary datatype field is not packed bit");
    return ft(this), new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toBits() {
    if (this.sub_type !== _Wt.SUBTYPE_VECTOR) throw new $("Binary sub_type is not Vector");
    if (this.buffer[0] !== _Wt.VECTOR_TYPE.PackedBit) throw new $("Binary datatype field is not packed bit");
    ft(this);
    const t2 = 8 * (this.length() - 2) - this.buffer[1], e2 = new Int8Array(t2);
    for (let t3 = 0; t3 < e2.length; t3++) {
      const n = t3 / 8 | 0, i = this.buffer[n + 2] >> 7 - t3 % 8 & 1;
      e2[t3] = i;
    }
    return e2;
  }
  static fromInt8Array(t2) {
    const e2 = rt.allocate(t2.byteLength + 2);
    e2[0] = _Wt.VECTOR_TYPE.Int8, e2[1] = 0;
    const n = new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength);
    e2.set(n, 2);
    const i = new this(e2, this.SUBTYPE_VECTOR);
    return ft(i), i;
  }
  static fromFloat32Array(t2) {
    const e2 = rt.allocate(t2.byteLength + 2);
    e2[0] = _Wt.VECTOR_TYPE.Float32, e2[1] = 0;
    const n = new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength);
    e2.set(n, 2), Vt.isBigEndian && rt.swap32(new Uint8Array(e2.buffer, 2));
    const i = new this(e2, this.SUBTYPE_VECTOR);
    return ft(i), i;
  }
  static fromPackedBits(t2, e2 = 0) {
    const n = rt.allocate(t2.byteLength + 2);
    n[0] = _Wt.VECTOR_TYPE.PackedBit, n[1] = e2, n.set(t2, 2);
    const i = new this(n, this.SUBTYPE_VECTOR);
    return ft(i), i;
  }
  static fromBits(t2) {
    const e2 = t2.length + 7 >>> 3, n = new Uint8Array(e2 + 2);
    n[0] = _Wt.VECTOR_TYPE.PackedBit;
    const i = t2.length % 8;
    n[1] = 0 === i ? 0 : 8 - i;
    for (let e3 = 0; e3 < t2.length; e3++) {
      const i2 = e3 >>> 3, l = t2[e3];
      if (0 !== l && 1 !== l) throw new $(`Invalid bit value at ${e3}: must be 0 or 1, found ${t2[e3]}`);
      if (0 === l) continue;
      const o = 7 - e3 % 8;
      n[i2 + 2] |= l << o;
    }
    return new this(n, _Wt.SUBTYPE_VECTOR);
  }
};
function ft(t2) {
  if (t2.sub_type !== Wt.SUBTYPE_VECTOR) return;
  const e2 = t2.position, n = t2.buffer[0], i = t2.buffer[1];
  if ((n === Wt.VECTOR_TYPE.Float32 || n === Wt.VECTOR_TYPE.Int8) && 0 !== i) throw new $("Invalid Vector: padding must be zero for int8 and float32 vectors");
  if (n === Wt.VECTOR_TYPE.Float32 && 0 !== e2 && e2 - 2 != 0 && (e2 - 2) % 4 != 0) throw new $("Invalid Vector: Float32 vector must contain a multiple of 4 bytes");
  if (n === Wt.VECTOR_TYPE.PackedBit && 0 !== i && 2 === e2) throw new $("Invalid Vector: padding must be zero for packed bit vectors that are empty");
  if (n === Wt.VECTOR_TYPE.PackedBit && i > 7) throw new $(`Invalid Vector: padding must be a value between 0 and 7. found: ${i}`);
}
var gt = /^[0-9A-F]{32}$/i;
var Yt = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
var It = class _It extends Wt {
  constructor(t2) {
    let e2;
    if (null == t2) e2 = _It.generate();
    else if (t2 instanceof _It) e2 = rt.toLocalBufferType(new Uint8Array(t2.buffer));
    else if (ArrayBuffer.isView(t2) && 16 === t2.byteLength) e2 = rt.toLocalBufferType(t2);
    else {
      if ("string" != typeof t2) throw new $("Argument passed in UUID constructor must be a UUID, a 16 byte Buffer or a 32/36 character hex string (dashes excluded/included, format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).");
      e2 = _It.bytesFromString(t2);
    }
    super(e2, D);
  }
  get id() {
    return this.buffer;
  }
  set id(t2) {
    this.buffer = t2;
  }
  toHexString(t2 = true) {
    return t2 ? [rt.toHex(this.buffer.subarray(0, 4)), rt.toHex(this.buffer.subarray(4, 6)), rt.toHex(this.buffer.subarray(6, 8)), rt.toHex(this.buffer.subarray(8, 10)), rt.toHex(this.buffer.subarray(10, 16))].join("-") : rt.toHex(this.buffer);
  }
  toString(t2) {
    return "hex" === t2 ? rt.toHex(this.id) : "base64" === t2 ? rt.toBase64(this.id) : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  equals(t2) {
    if (!t2) return false;
    if (t2 instanceof _It) return rt.equals(t2.id, this.id);
    try {
      return rt.equals(new _It(t2).id, this.id);
    } catch {
      return false;
    }
  }
  toBinary() {
    return new Wt(this.id, Wt.SUBTYPE_UUID);
  }
  static generate() {
    const t2 = rt.randomBytes(16);
    return t2[6] = 15 & t2[6] | 64, t2[8] = 63 & t2[8] | 128, t2;
  }
  static isValid(t2) {
    return !!t2 && ("string" == typeof t2 ? _It.isValidUUIDString(t2) : r(t2) ? 16 === t2.byteLength : "Binary" === t2._bsontype && t2.sub_type === this.SUBTYPE_UUID && 16 === t2.buffer.byteLength);
  }
  static createFromHexString(t2) {
    const e2 = _It.bytesFromString(t2);
    return new _It(e2);
  }
  static createFromBase64(t2) {
    return new _It(rt.fromBase64(t2));
  }
  static bytesFromString(t2) {
    if (!_It.isValidUUIDString(t2)) throw new $("UUID string representation must be 32 hex digits or canonical hyphenated representation");
    return rt.fromHex(t2.replace(/-/g, ""));
  }
  static isValidUUIDString(t2) {
    return gt.test(t2) || Yt.test(t2);
  }
  inspect(t2, e2, n) {
    return n ??= X, `new UUID(${n(this.toHexString(), e2)})`;
  }
};
var Rt = class _Rt extends ht {
  get _bsontype() {
    return "Code";
  }
  code;
  scope;
  constructor(t2, e2) {
    super(), this.code = t2.toString(), this.scope = e2 ?? null;
  }
  toJSON() {
    return null != this.scope ? { code: this.code, scope: this.scope } : { code: this.code };
  }
  toExtendedJSON() {
    return this.scope ? { $code: this.code, $scope: this.scope } : { $code: this.code };
  }
  static fromExtendedJSON(t2) {
    return new _Rt(t2.$code, t2.$scope);
  }
  inspect(t2, e2, n) {
    n ??= X;
    let i = n(this.code, e2);
    const l = i.includes("\n");
    null != this.scope && (i += `,${l ? "\n" : " "}${n(this.scope, e2)}`);
    return `new Code(${l ? "\n" : ""}${i}${l && null === this.scope ? "\n" : ""})`;
  }
};
function St(t2) {
  return null != t2 && "object" == typeof t2 && "$id" in t2 && null != t2.$id && "$ref" in t2 && "string" == typeof t2.$ref && (!("$db" in t2) || "$db" in t2 && "string" == typeof t2.$db);
}
var Jt = class _Jt extends ht {
  get _bsontype() {
    return "DBRef";
  }
  collection;
  oid;
  db;
  fields;
  constructor(t2, e2, n, i) {
    super();
    const l = t2.split(".");
    2 === l.length && (n = l.shift(), t2 = l.shift()), this.collection = t2, this.oid = e2, this.db = n, this.fields = i || {};
  }
  get namespace() {
    return this.collection;
  }
  set namespace(t2) {
    this.collection = t2;
  }
  toJSON() {
    const t2 = Object.assign({ $ref: this.collection, $id: this.oid }, this.fields);
    return null != this.db && (t2.$db = this.db), t2;
  }
  toExtendedJSON(t2) {
    t2 = t2 || {};
    let e2 = { $ref: this.collection, $id: this.oid };
    return t2.legacy || (this.db && (e2.$db = this.db), e2 = Object.assign(e2, this.fields)), e2;
  }
  static fromExtendedJSON(t2) {
    const e2 = Object.assign({}, t2);
    return delete e2.$ref, delete e2.$id, delete e2.$db, new _Jt(t2.$ref, t2.$id, t2.$db, e2);
  }
  inspect(t2, e2, n) {
    n ??= X;
    const i = [n(this.namespace, e2), n(this.oid, e2), ...this.db ? [n(this.db, e2)] : [], ...Object.keys(this.fields).length > 0 ? [n(this.fields, e2)] : []];
    return i[1] = n === X ? `new ObjectId(${i[1]})` : i[1], `new DBRef(${i.join(", ")})`;
  }
};
function Kt(t2) {
  if ("" === t2) return t2;
  let e2 = 0;
  const n = "-" === t2[e2], i = "+" === t2[e2];
  (i || n) && (e2 += 1);
  let l = false;
  for (; e2 < t2.length && "0" === t2[e2]; ++e2) l = true;
  return l ? `${n ? "-" : ""}${t2.length === e2 ? "0" : t2.slice(e2)}` : i ? t2.slice(1) : t2;
}
var Tt;
try {
  Tt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch {
}
var Lt = 4294967296;
var Ut = 18446744073709552e3;
var zt = Ut / 2;
var xt = {};
var Nt = {};
var wt = /^(\+?0|(\+|-)?[1-9][0-9]*)$/;
var Ht = class _Ht extends ht {
  get _bsontype() {
    return "Long";
  }
  get __isLong__() {
    return true;
  }
  high;
  low;
  unsigned;
  constructor(t2 = 0, e2, n) {
    super();
    const i = "boolean" == typeof e2 ? e2 : Boolean(n), l = "number" == typeof e2 ? e2 : 0, o = "string" == typeof t2 ? _Ht.fromString(t2, i) : "bigint" == typeof t2 ? _Ht.fromBigInt(t2, i) : { low: 0 | t2, high: 0 | l, unsigned: i };
    this.low = o.low, this.high = o.high, this.unsigned = o.unsigned;
  }
  static TWO_PWR_24 = _Ht.fromInt(16777216);
  static MAX_UNSIGNED_VALUE = _Ht.fromBits(-1, -1, true);
  static ZERO = _Ht.fromInt(0);
  static UZERO = _Ht.fromInt(0, true);
  static ONE = _Ht.fromInt(1);
  static UONE = _Ht.fromInt(1, true);
  static NEG_ONE = _Ht.fromInt(-1);
  static MAX_VALUE = _Ht.fromBits(-1, 2147483647, false);
  static MIN_VALUE = _Ht.fromBits(0, -2147483648, false);
  static fromBits(t2, e2, n) {
    return new _Ht(t2, e2, n);
  }
  static fromInt(t2, e2) {
    let n, i, l;
    return e2 ? (l = 0 <= (t2 >>>= 0) && t2 < 256) && (i = Nt[t2], i) ? i : (n = _Ht.fromBits(t2, (0 | t2) < 0 ? -1 : 0, true), l && (Nt[t2] = n), n) : (l = -128 <= (t2 |= 0) && t2 < 128) && (i = xt[t2], i) ? i : (n = _Ht.fromBits(t2, t2 < 0 ? -1 : 0, false), l && (xt[t2] = n), n);
  }
  static fromNumber(t2, e2) {
    if (isNaN(t2)) return e2 ? _Ht.UZERO : _Ht.ZERO;
    if (e2) {
      if (t2 < 0) return _Ht.UZERO;
      if (t2 >= Ut) return _Ht.MAX_UNSIGNED_VALUE;
    } else {
      if (t2 <= -zt) return _Ht.MIN_VALUE;
      if (t2 + 1 >= zt) return _Ht.MAX_VALUE;
    }
    return t2 < 0 ? _Ht.fromNumber(-t2, e2).neg() : _Ht.fromBits(t2 % Lt | 0, t2 / Lt | 0, e2);
  }
  static fromBigInt(t2, e2) {
    const n = 0xffffffffn;
    return new _Ht(Number(t2 & n), Number(t2 >> 32n & n), e2);
  }
  static _fromString(t2, e2, n) {
    if (0 === t2.length) throw new $("empty string");
    if (n < 2 || 36 < n) throw new $("radix");
    let i;
    if ((i = t2.indexOf("-")) > 0) throw new $("interior hyphen");
    if (0 === i) return _Ht._fromString(t2.substring(1), e2, n).neg();
    const l = _Ht.fromNumber(Math.pow(n, 8));
    let o = _Ht.ZERO;
    for (let e3 = 0; e3 < t2.length; e3 += 8) {
      const i2 = Math.min(8, t2.length - e3), c = parseInt(t2.substring(e3, e3 + i2), n);
      if (i2 < 8) {
        const t3 = _Ht.fromNumber(Math.pow(n, i2));
        o = o.mul(t3).add(_Ht.fromNumber(c));
      } else o = o.mul(l), o = o.add(_Ht.fromNumber(c));
    }
    return o.unsigned = e2, o;
  }
  static fromStringStrict(t2, e2, n) {
    let i = false;
    if ("number" == typeof e2 ? (n = e2, e2 = false) : i = !!e2, n ??= 10, t2.trim() !== t2) throw new $(`Input: '${t2}' contains leading and/or trailing whitespace`);
    if (!(function(t3, e3) {
      const n2 = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, e3 = e3 ?? 10);
      return !new RegExp(`[^-+${n2}]`, "i").test(t3) && t3;
    })(t2, n)) throw new $(`Input: '${t2}' contains invalid characters for radix: ${n}`);
    const l = Kt(t2), o = _Ht._fromString(l, i, n);
    if (o.toString(n).toLowerCase() !== l.toLowerCase()) throw new $(`Input: ${t2} is not representable as ${o.unsigned ? "an unsigned" : "a signed"} 64-bit Long ${null != n ? `with radix: ${n}` : ""}`);
    return o;
  }
  static fromString(t2, e2, n) {
    let i = false;
    return "number" == typeof e2 ? (n = e2, e2 = false) : i = !!e2, n ??= 10, "NaN" === t2 && n < 24 || ("Infinity" === t2 || "+Infinity" === t2 || "-Infinity" === t2) && n < 35 ? _Ht.ZERO : _Ht._fromString(t2, i, n);
  }
  static fromBytes(t2, e2, n) {
    return n ? _Ht.fromBytesLE(t2, e2) : _Ht.fromBytesBE(t2, e2);
  }
  static fromBytesLE(t2, e2) {
    return new _Ht(t2[0] | t2[1] << 8 | t2[2] << 16 | t2[3] << 24, t2[4] | t2[5] << 8 | t2[6] << 16 | t2[7] << 24, e2);
  }
  static fromBytesBE(t2, e2) {
    return new _Ht(t2[4] << 24 | t2[5] << 16 | t2[6] << 8 | t2[7], t2[0] << 24 | t2[1] << 16 | t2[2] << 8 | t2[3], e2);
  }
  static isLong(t2) {
    return null != t2 && "object" == typeof t2 && "__isLong__" in t2 && true === t2.__isLong__;
  }
  static fromValue(t2, e2) {
    return "number" == typeof t2 ? _Ht.fromNumber(t2, e2) : "string" == typeof t2 ? _Ht.fromString(t2, e2) : _Ht.fromBits(t2.low, t2.high, "boolean" == typeof e2 ? e2 : t2.unsigned);
  }
  add(t2) {
    _Ht.isLong(t2) || (t2 = _Ht.fromValue(t2));
    const e2 = this.high >>> 16, n = 65535 & this.high, i = this.low >>> 16, l = 65535 & this.low, o = t2.high >>> 16, c = 65535 & t2.high, a = t2.low >>> 16;
    let s = 0, d = 0, b = 0, Z = 0;
    return Z += l + (65535 & t2.low), b += Z >>> 16, Z &= 65535, b += i + a, d += b >>> 16, b &= 65535, d += n + c, s += d >>> 16, d &= 65535, s += e2 + o, s &= 65535, _Ht.fromBits(b << 16 | Z, s << 16 | d, this.unsigned);
  }
  and(t2) {
    return _Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), _Ht.fromBits(this.low & t2.low, this.high & t2.high, this.unsigned);
  }
  compare(t2) {
    if (_Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), this.eq(t2)) return 0;
    const e2 = this.isNegative(), n = t2.isNegative();
    return e2 && !n ? -1 : !e2 && n ? 1 : this.unsigned ? t2.high >>> 0 > this.high >>> 0 || t2.high === this.high && t2.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t2).isNegative() ? -1 : 1;
  }
  comp(t2) {
    return this.compare(t2);
  }
  divide(t2) {
    if (_Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), t2.isZero()) throw new $("division by zero");
    if (Tt) {
      if (!this.unsigned && -2147483648 === this.high && -1 === t2.low && -1 === t2.high) return this;
      const e3 = (this.unsigned ? Tt.div_u : Tt.div_s)(this.low, this.high, t2.low, t2.high);
      return _Ht.fromBits(e3, Tt.get_high(), this.unsigned);
    }
    if (this.isZero()) return this.unsigned ? _Ht.UZERO : _Ht.ZERO;
    let e2, n, i;
    if (this.unsigned) {
      if (t2.unsigned || (t2 = t2.toUnsigned()), t2.gt(this)) return _Ht.UZERO;
      if (t2.gt(this.shru(1))) return _Ht.UONE;
      i = _Ht.UZERO;
    } else {
      if (this.eq(_Ht.MIN_VALUE)) {
        if (t2.eq(_Ht.ONE) || t2.eq(_Ht.NEG_ONE)) return _Ht.MIN_VALUE;
        if (t2.eq(_Ht.MIN_VALUE)) return _Ht.ONE;
        return e2 = this.shr(1).div(t2).shl(1), e2.eq(_Ht.ZERO) ? t2.isNegative() ? _Ht.ONE : _Ht.NEG_ONE : (n = this.sub(t2.mul(e2)), i = e2.add(n.div(t2)), i);
      }
      if (t2.eq(_Ht.MIN_VALUE)) return this.unsigned ? _Ht.UZERO : _Ht.ZERO;
      if (this.isNegative()) return t2.isNegative() ? this.neg().div(t2.neg()) : this.neg().div(t2).neg();
      if (t2.isNegative()) return this.div(t2.neg()).neg();
      i = _Ht.ZERO;
    }
    for (n = this; n.gte(t2); ) {
      e2 = Math.max(1, Math.floor(n.toNumber() / t2.toNumber()));
      const l = Math.ceil(Math.log(e2) / Math.LN2), o = l <= 48 ? 1 : Math.pow(2, l - 48);
      let c = _Ht.fromNumber(e2), a = c.mul(t2);
      for (; a.isNegative() || a.gt(n); ) e2 -= o, c = _Ht.fromNumber(e2, this.unsigned), a = c.mul(t2);
      c.isZero() && (c = _Ht.ONE), i = i.add(c), n = n.sub(a);
    }
    return i;
  }
  div(t2) {
    return this.divide(t2);
  }
  equals(t2) {
    return _Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), (this.unsigned === t2.unsigned || this.high >>> 31 != 1 || t2.high >>> 31 != 1) && (this.high === t2.high && this.low === t2.low);
  }
  eq(t2) {
    return this.equals(t2);
  }
  getHighBits() {
    return this.high;
  }
  getHighBitsUnsigned() {
    return this.high >>> 0;
  }
  getLowBits() {
    return this.low;
  }
  getLowBitsUnsigned() {
    return this.low >>> 0;
  }
  getNumBitsAbs() {
    if (this.isNegative()) return this.eq(_Ht.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    const t2 = 0 !== this.high ? this.high : this.low;
    let e2;
    for (e2 = 31; e2 > 0 && !(t2 & 1 << e2); e2--) ;
    return 0 !== this.high ? e2 + 33 : e2 + 1;
  }
  greaterThan(t2) {
    return this.comp(t2) > 0;
  }
  gt(t2) {
    return this.greaterThan(t2);
  }
  greaterThanOrEqual(t2) {
    return this.comp(t2) >= 0;
  }
  gte(t2) {
    return this.greaterThanOrEqual(t2);
  }
  ge(t2) {
    return this.greaterThanOrEqual(t2);
  }
  isEven() {
    return !(1 & this.low);
  }
  isNegative() {
    return !this.unsigned && this.high < 0;
  }
  isOdd() {
    return !(1 & ~this.low);
  }
  isPositive() {
    return this.unsigned || this.high >= 0;
  }
  isZero() {
    return 0 === this.high && 0 === this.low;
  }
  lessThan(t2) {
    return this.comp(t2) < 0;
  }
  lt(t2) {
    return this.lessThan(t2);
  }
  lessThanOrEqual(t2) {
    return this.comp(t2) <= 0;
  }
  lte(t2) {
    return this.lessThanOrEqual(t2);
  }
  modulo(t2) {
    if (_Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), Tt) {
      const e2 = (this.unsigned ? Tt.rem_u : Tt.rem_s)(this.low, this.high, t2.low, t2.high);
      return _Ht.fromBits(e2, Tt.get_high(), this.unsigned);
    }
    return this.sub(this.div(t2).mul(t2));
  }
  mod(t2) {
    return this.modulo(t2);
  }
  rem(t2) {
    return this.modulo(t2);
  }
  multiply(t2) {
    if (this.isZero()) return _Ht.ZERO;
    if (_Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), Tt) {
      const e3 = Tt.mul(this.low, this.high, t2.low, t2.high);
      return _Ht.fromBits(e3, Tt.get_high(), this.unsigned);
    }
    if (t2.isZero()) return _Ht.ZERO;
    if (this.eq(_Ht.MIN_VALUE)) return t2.isOdd() ? _Ht.MIN_VALUE : _Ht.ZERO;
    if (t2.eq(_Ht.MIN_VALUE)) return this.isOdd() ? _Ht.MIN_VALUE : _Ht.ZERO;
    if (this.isNegative()) return t2.isNegative() ? this.neg().mul(t2.neg()) : this.neg().mul(t2).neg();
    if (t2.isNegative()) return this.mul(t2.neg()).neg();
    if (this.lt(_Ht.TWO_PWR_24) && t2.lt(_Ht.TWO_PWR_24)) return _Ht.fromNumber(this.toNumber() * t2.toNumber(), this.unsigned);
    const e2 = this.high >>> 16, n = 65535 & this.high, i = this.low >>> 16, l = 65535 & this.low, o = t2.high >>> 16, c = 65535 & t2.high, a = t2.low >>> 16, s = 65535 & t2.low;
    let d = 0, b = 0, Z = 0, m = 0;
    return m += l * s, Z += m >>> 16, m &= 65535, Z += i * s, b += Z >>> 16, Z &= 65535, Z += l * a, b += Z >>> 16, Z &= 65535, b += n * s, d += b >>> 16, b &= 65535, b += i * a, d += b >>> 16, b &= 65535, b += l * c, d += b >>> 16, b &= 65535, d += e2 * s + n * a + i * c + l * o, d &= 65535, _Ht.fromBits(Z << 16 | m, d << 16 | b, this.unsigned);
  }
  mul(t2) {
    return this.multiply(t2);
  }
  negate() {
    return !this.unsigned && this.eq(_Ht.MIN_VALUE) ? _Ht.MIN_VALUE : this.not().add(_Ht.ONE);
  }
  neg() {
    return this.negate();
  }
  not() {
    return _Ht.fromBits(~this.low, ~this.high, this.unsigned);
  }
  notEquals(t2) {
    return !this.equals(t2);
  }
  neq(t2) {
    return this.notEquals(t2);
  }
  ne(t2) {
    return this.notEquals(t2);
  }
  or(t2) {
    return _Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), _Ht.fromBits(this.low | t2.low, this.high | t2.high, this.unsigned);
  }
  shiftLeft(t2) {
    return _Ht.isLong(t2) && (t2 = t2.toInt()), 0 == (t2 &= 63) ? this : t2 < 32 ? _Ht.fromBits(this.low << t2, this.high << t2 | this.low >>> 32 - t2, this.unsigned) : _Ht.fromBits(0, this.low << t2 - 32, this.unsigned);
  }
  shl(t2) {
    return this.shiftLeft(t2);
  }
  shiftRight(t2) {
    return _Ht.isLong(t2) && (t2 = t2.toInt()), 0 == (t2 &= 63) ? this : t2 < 32 ? _Ht.fromBits(this.low >>> t2 | this.high << 32 - t2, this.high >> t2, this.unsigned) : _Ht.fromBits(this.high >> t2 - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  }
  shr(t2) {
    return this.shiftRight(t2);
  }
  shiftRightUnsigned(t2) {
    if (_Ht.isLong(t2) && (t2 = t2.toInt()), 0 === (t2 &= 63)) return this;
    {
      const e2 = this.high;
      if (t2 < 32) {
        const n = this.low;
        return _Ht.fromBits(n >>> t2 | e2 << 32 - t2, e2 >>> t2, this.unsigned);
      }
      return 32 === t2 ? _Ht.fromBits(e2, 0, this.unsigned) : _Ht.fromBits(e2 >>> t2 - 32, 0, this.unsigned);
    }
  }
  shr_u(t2) {
    return this.shiftRightUnsigned(t2);
  }
  shru(t2) {
    return this.shiftRightUnsigned(t2);
  }
  subtract(t2) {
    return _Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), this.add(t2.neg());
  }
  sub(t2) {
    return this.subtract(t2);
  }
  toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
  }
  toNumber() {
    return this.unsigned ? (this.high >>> 0) * Lt + (this.low >>> 0) : this.high * Lt + (this.low >>> 0);
  }
  toBigInt() {
    return BigInt(this.toString());
  }
  toBytes(t2) {
    return t2 ? this.toBytesLE() : this.toBytesBE();
  }
  toBytesLE() {
    const t2 = this.high, e2 = this.low;
    return [255 & e2, e2 >>> 8 & 255, e2 >>> 16 & 255, e2 >>> 24, 255 & t2, t2 >>> 8 & 255, t2 >>> 16 & 255, t2 >>> 24];
  }
  toBytesBE() {
    const t2 = this.high, e2 = this.low;
    return [t2 >>> 24, t2 >>> 16 & 255, t2 >>> 8 & 255, 255 & t2, e2 >>> 24, e2 >>> 16 & 255, e2 >>> 8 & 255, 255 & e2];
  }
  toSigned() {
    return this.unsigned ? _Ht.fromBits(this.low, this.high, false) : this;
  }
  toString(t2) {
    if ((t2 = t2 || 10) < 2 || 36 < t2) throw new $("radix");
    if (this.isZero()) return "0";
    if (this.isNegative()) {
      if (this.eq(_Ht.MIN_VALUE)) {
        const e3 = _Ht.fromNumber(t2), n2 = this.div(e3), i2 = n2.mul(e3).sub(this);
        return n2.toString(t2) + i2.toInt().toString(t2);
      }
      return "-" + this.neg().toString(t2);
    }
    const e2 = _Ht.fromNumber(Math.pow(t2, 6), this.unsigned);
    let n = this, i = "";
    for (; ; ) {
      const l = n.div(e2);
      let o = (n.sub(l.mul(e2)).toInt() >>> 0).toString(t2);
      if (n = l, n.isZero()) return o + i;
      for (; o.length < 6; ) o = "0" + o;
      i = "" + o + i;
    }
  }
  toUnsigned() {
    return this.unsigned ? this : _Ht.fromBits(this.low, this.high, true);
  }
  xor(t2) {
    return _Ht.isLong(t2) || (t2 = _Ht.fromValue(t2)), _Ht.fromBits(this.low ^ t2.low, this.high ^ t2.high, this.unsigned);
  }
  eqz() {
    return this.isZero();
  }
  le(t2) {
    return this.lessThanOrEqual(t2);
  }
  toExtendedJSON(t2) {
    return t2 && t2.relaxed ? this.toNumber() : { $numberLong: this.toString() };
  }
  static fromExtendedJSON(t2, e2) {
    const { useBigInt64: n = false, relaxed: i = true } = { ...e2 };
    if (t2.$numberLong.length > 20) throw new $("$numberLong string is too long");
    if (!wt.test(t2.$numberLong)) throw new $(`$numberLong string "${t2.$numberLong}" is in an invalid format`);
    if (n) {
      const e3 = BigInt(t2.$numberLong);
      return BigInt.asIntN(64, e3);
    }
    const l = _Ht.fromString(t2.$numberLong);
    return i ? l.toNumber() : l;
  }
  inspect(t2, e2, n) {
    n ??= X;
    return `new Long(${n(this.toString(), e2)}${this.unsigned ? `, ${n(this.unsigned, e2)}` : ""})`;
  }
};
var kt = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
var Bt = /^(\+|-)?(Infinity|inf)$/i;
var Ct = /^(\+|-)?NaN$/i;
var vt = 6111;
var Mt = -6176;
var jt = rt.fromNumberArray([124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse());
var Pt = rt.fromNumberArray([248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse());
var Ft = rt.fromNumberArray([120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse());
var Qt = /^([-+])?(\d+)?$/;
function Ot(t2) {
  return !isNaN(parseInt(t2, 10));
}
function Et(t2) {
  const e2 = Ht.fromNumber(1e9);
  let n = Ht.fromNumber(0);
  if (!(t2.parts[0] || t2.parts[1] || t2.parts[2] || t2.parts[3])) return { quotient: t2, rem: n };
  for (let i = 0; i <= 3; i++) n = n.shiftLeft(32), n = n.add(new Ht(t2.parts[i], 0)), t2.parts[i] = n.div(e2).low, n = n.modulo(e2);
  return { quotient: t2, rem: n };
}
function _t(t2, e2) {
  throw new $(`"${t2}" is not a valid Decimal128 string - ${e2}`);
}
var Dt = class _Dt extends ht {
  get _bsontype() {
    return "Decimal128";
  }
  bytes;
  constructor(t2) {
    if (super(), "string" == typeof t2) this.bytes = _Dt.fromString(t2).bytes;
    else {
      if (!(t2 instanceof Uint8Array || r(t2))) throw new $("Decimal128 must take a Buffer or string");
      if (16 !== t2.byteLength) throw new $("Decimal128 must take a Buffer of 16 bytes");
      this.bytes = t2;
    }
  }
  static fromString(t2) {
    return _Dt._fromString(t2, { allowRounding: false });
  }
  static fromStringWithRounding(t2) {
    return _Dt._fromString(t2, { allowRounding: true });
  }
  static _fromString(t2, e2) {
    let n = false, i = false, l = false, o = false, c = 0, a = 0, s = 0, d = 0, b = 0;
    const Z = [0];
    let m = 0, u2 = 0, r2 = 0, p2 = 0, h2 = new Ht(0, 0), y2 = new Ht(0, 0), G2 = 0, X2 = 0;
    if (t2.length >= 7e3) throw new $(t2 + " not a valid Decimal128 string");
    const V2 = t2.match(kt), W2 = t2.match(Bt), f2 = t2.match(Ct);
    if (!V2 && !W2 && !f2 || 0 === t2.length) throw new $(t2 + " not a valid Decimal128 string");
    if (V2) {
      const e3 = V2[2], n2 = V2[4], i2 = V2[5], l2 = V2[6];
      n2 && void 0 === l2 && _t(t2, "missing exponent power"), n2 && void 0 === e3 && _t(t2, "missing exponent base"), void 0 === n2 && (i2 || l2) && _t(t2, "missing e before exponent");
    }
    if ("+" !== t2[X2] && "-" !== t2[X2] || (i = true, n = "-" === t2[X2++]), !Ot(t2[X2]) && "." !== t2[X2]) {
      if ("i" === t2[X2] || "I" === t2[X2]) return new _Dt(n ? Pt : Ft);
      if ("N" === t2[X2]) return new _Dt(jt);
    }
    for (; Ot(t2[X2]) || "." === t2[X2]; ) "." !== t2[X2] ? (m < 34 && ("0" !== t2[X2] || o) && (o || (b = a), o = true, Z[u2++] = parseInt(t2[X2], 10), m += 1), o && (s += 1), l && (d += 1), a += 1, X2 += 1) : (l && _t(t2, "contains multiple periods"), l = true, X2 += 1);
    if (l && !a) throw new $(t2 + " not a valid Decimal128 string");
    if ("e" === t2[X2] || "E" === t2[X2]) {
      const e3 = t2.substr(++X2).match(Qt);
      if (!e3 || !e3[2]) return new _Dt(jt);
      p2 = parseInt(e3[0], 10), X2 += e3[0].length;
    }
    if (t2[X2]) return new _Dt(jt);
    if (m) {
      if (r2 = m - 1, c = s, 1 !== c) for (; "0" === t2[b + c - 1 + Number(i) + Number(l)]; ) c -= 1;
    } else Z[0] = 0, s = 1, m = 1, c = 0;
    for (p2 <= d && d > p2 + 16384 ? p2 = Mt : p2 -= d; p2 > vt; ) {
      if (r2 += 1, r2 >= 34) {
        if (0 === c) {
          p2 = vt;
          break;
        }
        _t(t2, "overflow");
      }
      p2 -= 1;
    }
    if (e2.allowRounding) {
      for (; p2 < Mt || m < s; ) {
        if (0 === r2 && c < m) {
          p2 = Mt, c = 0;
          break;
        }
        if (m < s ? s -= 1 : r2 -= 1, p2 < vt) p2 += 1;
        else {
          if (Z.join("").match(/^0+$/)) {
            p2 = vt;
            break;
          }
          _t(t2, "overflow");
        }
      }
      if (r2 + 1 < c) {
        let e3 = a;
        l && (b += 1, e3 += 1), i && (b += 1, e3 += 1);
        const o2 = parseInt(t2[b + r2 + 1], 10);
        let c2 = 0;
        if (o2 >= 5 && (c2 = 1, 5 === o2)) {
          c2 = Z[r2] % 2 == 1 ? 1 : 0;
          for (let n2 = b + r2 + 2; n2 < e3; n2++) if (parseInt(t2[n2], 10)) {
            c2 = 1;
            break;
          }
        }
        if (c2) {
          let t3 = r2;
          for (; t3 >= 0 && ++Z[t3] > 9; t3--) if (Z[t3] = 0, 0 === t3) {
            if (!(p2 < vt)) return new _Dt(n ? Pt : Ft);
            p2 += 1, Z[t3] = 1;
          }
        }
      }
    } else {
      for (; p2 < Mt || m < s; ) {
        if (0 === r2) {
          if (0 === c) {
            p2 = Mt;
            break;
          }
          _t(t2, "exponent underflow");
        }
        m < s ? ("0" !== t2[s - 1 + Number(i) + Number(l)] && 0 !== c && _t(t2, "inexact rounding"), s -= 1) : (0 !== Z[r2] && _t(t2, "inexact rounding"), r2 -= 1), p2 < vt ? p2 += 1 : _t(t2, "overflow");
      }
      if (r2 + 1 < c) {
        l && (b += 1), i && (b += 1);
        0 !== parseInt(t2[b + r2 + 1], 10) && _t(t2, "inexact rounding");
      }
    }
    if (h2 = Ht.fromNumber(0), y2 = Ht.fromNumber(0), 0 === c) h2 = Ht.fromNumber(0), y2 = Ht.fromNumber(0);
    else if (r2 < 17) {
      let t3 = 0;
      for (y2 = Ht.fromNumber(Z[t3++]), h2 = new Ht(0, 0); t3 <= r2; t3++) y2 = y2.multiply(Ht.fromNumber(10)), y2 = y2.add(Ht.fromNumber(Z[t3]));
    } else {
      let t3 = 0;
      for (h2 = Ht.fromNumber(Z[t3++]); t3 <= r2 - 17; t3++) h2 = h2.multiply(Ht.fromNumber(10)), h2 = h2.add(Ht.fromNumber(Z[t3]));
      for (y2 = Ht.fromNumber(Z[t3++]); t3 <= r2; t3++) y2 = y2.multiply(Ht.fromNumber(10)), y2 = y2.add(Ht.fromNumber(Z[t3]));
    }
    const g2 = (function(t3, e3) {
      if (!t3 && !e3) return { high: Ht.fromNumber(0), low: Ht.fromNumber(0) };
      const n2 = t3.shiftRightUnsigned(32), i2 = new Ht(t3.getLowBits(), 0), l2 = e3.shiftRightUnsigned(32), o2 = new Ht(e3.getLowBits(), 0);
      let c2 = n2.multiply(l2), a2 = n2.multiply(o2);
      const s2 = i2.multiply(l2);
      let d2 = i2.multiply(o2);
      return c2 = c2.add(a2.shiftRightUnsigned(32)), a2 = new Ht(a2.getLowBits(), 0).add(s2).add(d2.shiftRightUnsigned(32)), c2 = c2.add(a2.shiftRightUnsigned(32)), d2 = a2.shiftLeft(32).add(new Ht(d2.getLowBits(), 0)), { high: c2, low: d2 };
    })(h2, Ht.fromString("100000000000000000"));
    g2.low = g2.low.add(y2), (function(t3, e3) {
      const n2 = t3.high >>> 0, i2 = e3.high >>> 0;
      if (n2 < i2) return true;
      if (n2 === i2 && t3.low >>> 0 < e3.low >>> 0) return true;
      return false;
    })(g2.low, y2) && (g2.high = g2.high.add(Ht.fromNumber(1))), G2 = p2 + 6176;
    const Y2 = { low: Ht.fromNumber(0), high: Ht.fromNumber(0) };
    g2.high.shiftRightUnsigned(49).and(Ht.fromNumber(1)).equals(Ht.fromNumber(1)) ? (Y2.high = Y2.high.or(Ht.fromNumber(3).shiftLeft(61)), Y2.high = Y2.high.or(Ht.fromNumber(G2).and(Ht.fromNumber(16383).shiftLeft(47))), Y2.high = Y2.high.or(g2.high.and(Ht.fromNumber(140737488355327)))) : (Y2.high = Y2.high.or(Ht.fromNumber(16383 & G2).shiftLeft(49)), Y2.high = Y2.high.or(g2.high.and(Ht.fromNumber(562949953421311)))), Y2.low = g2.low, n && (Y2.high = Y2.high.or(Ht.fromString("9223372036854775808")));
    const I2 = rt.allocateUnsafe(16);
    return X2 = 0, I2[X2++] = 255 & Y2.low.low, I2[X2++] = Y2.low.low >> 8 & 255, I2[X2++] = Y2.low.low >> 16 & 255, I2[X2++] = Y2.low.low >> 24 & 255, I2[X2++] = 255 & Y2.low.high, I2[X2++] = Y2.low.high >> 8 & 255, I2[X2++] = Y2.low.high >> 16 & 255, I2[X2++] = Y2.low.high >> 24 & 255, I2[X2++] = 255 & Y2.high.low, I2[X2++] = Y2.high.low >> 8 & 255, I2[X2++] = Y2.high.low >> 16 & 255, I2[X2++] = Y2.high.low >> 24 & 255, I2[X2++] = 255 & Y2.high.high, I2[X2++] = Y2.high.high >> 8 & 255, I2[X2++] = Y2.high.high >> 16 & 255, I2[X2++] = Y2.high.high >> 24 & 255, new _Dt(I2);
  }
  toString() {
    let t2, e2 = 0;
    const n = new Array(36);
    for (let t3 = 0; t3 < n.length; t3++) n[t3] = 0;
    let i, l, o, c = 0, a = false, s = { parts: [0, 0, 0, 0] };
    const d = [];
    c = 0;
    const b = this.bytes, Z = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24, m = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24, u2 = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24, r2 = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
    c = 0;
    ({ low: new Ht(Z, m), high: new Ht(u2, r2) }).high.lessThan(Ht.ZERO) && d.push("-");
    const p2 = r2 >> 26 & 31;
    if (p2 >> 3 == 3) {
      if (30 === p2) return d.join("") + "Infinity";
      if (31 === p2) return "NaN";
      t2 = r2 >> 15 & 16383, i = 8 + (r2 >> 14 & 1);
    } else i = r2 >> 14 & 7, t2 = r2 >> 17 & 16383;
    const h2 = t2 - 6176;
    if (s.parts[0] = (16383 & r2) + ((15 & i) << 14), s.parts[1] = u2, s.parts[2] = m, s.parts[3] = Z, 0 === s.parts[0] && 0 === s.parts[1] && 0 === s.parts[2] && 0 === s.parts[3]) a = true;
    else for (o = 3; o >= 0; o--) {
      let t3 = 0;
      const e3 = Et(s);
      if (s = e3.quotient, t3 = e3.rem.low, t3) for (l = 8; l >= 0; l--) n[9 * o + l] = t3 % 10, t3 = Math.floor(t3 / 10);
    }
    if (a) e2 = 1, n[c] = 0;
    else for (e2 = 36; !n[c]; ) e2 -= 1, c += 1;
    const y2 = e2 - 1 + h2;
    if (y2 >= 34 || y2 <= -7 || h2 > 0) {
      if (e2 > 34) return d.push("0"), h2 > 0 ? d.push(`E+${h2}`) : h2 < 0 && d.push(`E${h2}`), d.join("");
      d.push(`${n[c++]}`), e2 -= 1, e2 && d.push(".");
      for (let t3 = 0; t3 < e2; t3++) d.push(`${n[c++]}`);
      d.push("E"), y2 > 0 ? d.push(`+${y2}`) : d.push(`${y2}`);
    } else if (h2 >= 0) for (let t3 = 0; t3 < e2; t3++) d.push(`${n[c++]}`);
    else {
      let t3 = e2 + h2;
      if (t3 > 0) for (let e3 = 0; e3 < t3; e3++) d.push(`${n[c++]}`);
      else d.push("0");
      for (d.push("."); t3++ < 0; ) d.push("0");
      for (let i2 = 0; i2 < e2 - Math.max(t3 - 1, 0); i2++) d.push(`${n[c++]}`);
    }
    return d.join("");
  }
  toJSON() {
    return { $numberDecimal: this.toString() };
  }
  toExtendedJSON() {
    return { $numberDecimal: this.toString() };
  }
  static fromExtendedJSON(t2) {
    return _Dt.fromString(t2.$numberDecimal);
  }
  inspect(t2, e2, n) {
    n ??= X;
    return `new Decimal128(${n(this.toString(), e2)})`;
  }
};
var At = class _At extends ht {
  get _bsontype() {
    return "Double";
  }
  value;
  constructor(t2) {
    super(), t2 instanceof Number && (t2 = t2.valueOf()), this.value = +t2;
  }
  static fromString(t2) {
    const e2 = Number(t2);
    if ("NaN" === t2) return new _At(NaN);
    if ("Infinity" === t2) return new _At(1 / 0);
    if ("-Infinity" === t2) return new _At(-1 / 0);
    if (!Number.isFinite(e2)) throw new $(`Input: ${t2} is not representable as a Double`);
    if (t2.trim() !== t2) throw new $(`Input: '${t2}' contains whitespace`);
    if ("" === t2) throw new $("Input is an empty string");
    if (/[^-0-9.+eE]/.test(t2)) throw new $(`Input: '${t2}' is not in decimal or exponential notation`);
    return new _At(e2);
  }
  valueOf() {
    return this.value;
  }
  toJSON() {
    return this.value;
  }
  toString(t2) {
    return this.value.toString(t2);
  }
  toExtendedJSON(t2) {
    return t2 && (t2.legacy || t2.relaxed && isFinite(this.value)) ? this.value : Object.is(Math.sign(this.value), -0) ? { $numberDouble: "-0.0" } : { $numberDouble: Number.isInteger(this.value) ? this.value.toFixed(1) : this.value.toString() };
  }
  static fromExtendedJSON(t2, e2) {
    const n = parseFloat(t2.$numberDouble);
    return e2 && e2.relaxed ? n : new _At(n);
  }
  inspect(t2, e2, n) {
    return n ??= X, `new Double(${n(this.value, e2)})`;
  }
};
var $t = class _$t extends ht {
  get _bsontype() {
    return "Int32";
  }
  value;
  constructor(t2) {
    super(), t2 instanceof Number && (t2 = t2.valueOf()), this.value = 0 | +t2;
  }
  static fromString(t2) {
    const e2 = Kt(t2), n = Number(t2);
    if (f < n) throw new $(`Input: '${t2}' is larger than the maximum value for Int32`);
    if (g > n) throw new $(`Input: '${t2}' is smaller than the minimum value for Int32`);
    if (!Number.isSafeInteger(n)) throw new $(`Input: '${t2}' is not a safe integer`);
    if (n.toString() !== e2) throw new $(`Input: '${t2}' is not a valid Int32 string`);
    return new _$t(n);
  }
  valueOf() {
    return this.value;
  }
  toString(t2) {
    return this.value.toString(t2);
  }
  toJSON() {
    return this.value;
  }
  toExtendedJSON(t2) {
    return t2 && (t2.relaxed || t2.legacy) ? this.value : { $numberInt: this.value.toString() };
  }
  static fromExtendedJSON(t2, e2) {
    return e2 && e2.relaxed ? parseInt(t2.$numberInt, 10) : new _$t(t2.$numberInt);
  }
  inspect(t2, e2, n) {
    return n ??= X, `new Int32(${n(this.value, e2)})`;
  }
};
var qt = class _qt extends ht {
  get _bsontype() {
    return "MaxKey";
  }
  toExtendedJSON() {
    return { $maxKey: 1 };
  }
  static fromExtendedJSON() {
    return new _qt();
  }
  inspect() {
    return "new MaxKey()";
  }
};
var te = class _te extends ht {
  get _bsontype() {
    return "MinKey";
  }
  toExtendedJSON() {
    return { $minKey: 1 };
  }
  static fromExtendedJSON() {
    return new _te();
  }
  inspect() {
    return "new MinKey()";
  }
};
var ee = null;
var ne = /* @__PURE__ */ new WeakMap();
var ie = class _ie extends ht {
  get _bsontype() {
    return "ObjectId";
  }
  static index = Math.floor(16777215 * Math.random());
  static cacheHexString;
  buffer;
  constructor(t2) {
    let e2;
    if (super(), "object" == typeof t2 && t2 && "id" in t2) {
      if ("string" != typeof t2.id && !ArrayBuffer.isView(t2.id)) throw new $("Argument passed in must have an id that is of type string or Buffer");
      e2 = "toHexString" in t2 && "function" == typeof t2.toHexString ? rt.fromHex(t2.toHexString()) : t2.id;
    } else e2 = t2;
    if (null == e2) this.buffer = _ie.generate();
    else if (ArrayBuffer.isView(e2) && 12 === e2.byteLength) this.buffer = rt.toLocalBufferType(e2);
    else {
      if ("string" != typeof e2) throw new $("Argument passed in does not match the accepted types");
      if (!_ie.validateHexString(e2)) throw new $("input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
      this.buffer = rt.fromHex(e2), _ie.cacheHexString && ne.set(this, e2);
    }
  }
  get id() {
    return this.buffer;
  }
  set id(t2) {
    this.buffer = t2, _ie.cacheHexString && ne.set(this, rt.toHex(t2));
  }
  static validateHexString(t2) {
    if (24 !== t2?.length) return false;
    for (let e2 = 0; e2 < 24; e2++) {
      const n = t2.charCodeAt(e2);
      if (!(n >= 48 && n <= 57 || n >= 97 && n <= 102 || n >= 65 && n <= 70)) return false;
    }
    return true;
  }
  toHexString() {
    if (_ie.cacheHexString) {
      const t3 = ne.get(this);
      if (t3) return t3;
    }
    const t2 = rt.toHex(this.id);
    return _ie.cacheHexString && ne.set(this, t2), t2;
  }
  static getInc() {
    return _ie.index = (_ie.index + 1) % 16777215;
  }
  static generate(t2) {
    "number" != typeof t2 && (t2 = Math.floor(Date.now() / 1e3));
    const e2 = _ie.getInc(), n = rt.allocateUnsafe(12);
    return Vt.setInt32BE(n, 0, t2), null === ee && (ee = rt.randomBytes(5)), n[4] = ee[0], n[5] = ee[1], n[6] = ee[2], n[7] = ee[3], n[8] = ee[4], n[11] = 255 & e2, n[10] = e2 >> 8 & 255, n[9] = e2 >> 16 & 255, n;
  }
  toString(t2) {
    return "base64" === t2 ? rt.toBase64(this.id) : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  static is(t2) {
    return null != t2 && "object" == typeof t2 && "_bsontype" in t2 && "ObjectId" === t2._bsontype;
  }
  equals(t2) {
    if (null == t2) return false;
    if (_ie.is(t2)) return this.buffer[11] === t2.buffer[11] && rt.equals(this.buffer, t2.buffer);
    if ("string" == typeof t2) return t2.toLowerCase() === this.toHexString();
    if ("object" == typeof t2 && "function" == typeof t2.toHexString) {
      const e2 = t2.toHexString(), n = this.toHexString();
      return "string" == typeof e2 && e2.toLowerCase() === n;
    }
    return false;
  }
  getTimestamp() {
    const t2 = /* @__PURE__ */ new Date(), e2 = Vt.getUint32BE(this.buffer, 0);
    return t2.setTime(1e3 * Math.floor(e2)), t2;
  }
  static createPk() {
    return new _ie();
  }
  serializeInto(t2, e2) {
    return t2[e2] = this.buffer[0], t2[e2 + 1] = this.buffer[1], t2[e2 + 2] = this.buffer[2], t2[e2 + 3] = this.buffer[3], t2[e2 + 4] = this.buffer[4], t2[e2 + 5] = this.buffer[5], t2[e2 + 6] = this.buffer[6], t2[e2 + 7] = this.buffer[7], t2[e2 + 8] = this.buffer[8], t2[e2 + 9] = this.buffer[9], t2[e2 + 10] = this.buffer[10], t2[e2 + 11] = this.buffer[11], 12;
  }
  static createFromTime(t2) {
    const e2 = rt.allocate(12);
    for (let t3 = 11; t3 >= 4; t3--) e2[t3] = 0;
    return Vt.setInt32BE(e2, 0, t2), new _ie(e2);
  }
  static createFromHexString(t2) {
    if (24 !== t2?.length) throw new $("hex string must be 24 characters");
    return new _ie(rt.fromHex(t2));
  }
  static createFromBase64(t2) {
    if (16 !== t2?.length) throw new $("base64 string must be 16 characters");
    return new _ie(rt.fromBase64(t2));
  }
  static isValid(t2) {
    if (null == t2) return false;
    if ("string" == typeof t2) return _ie.validateHexString(t2);
    try {
      return new _ie(t2), true;
    } catch {
      return false;
    }
  }
  toExtendedJSON() {
    return this.toHexString ? { $oid: this.toHexString() } : { $oid: this.toString("hex") };
  }
  static fromExtendedJSON(t2) {
    return new _ie(t2.$oid);
  }
  isCached() {
    return _ie.cacheHexString && ne.has(this);
  }
  inspect(t2, e2, n) {
    return n ??= X, `new ObjectId(${n(this.toHexString(), e2)})`;
  }
};
function le(t2, e2, n) {
  let i = 5;
  if (Array.isArray(t2)) for (let l = 0; l < t2.length; l++) i += oe(l.toString(), t2[l], e2, true, n);
  else {
    "function" == typeof t2?.toBSON && (t2 = t2.toBSON());
    for (const l of Object.keys(t2)) i += oe(l, t2[l], e2, false, n);
  }
  return i;
}
function oe(t2, e2, n = false, i = false, l = false) {
  switch ("function" == typeof e2?.toBSON && (e2 = e2.toBSON()), typeof e2) {
    case "string":
      return 1 + rt.utf8ByteLength(t2) + 1 + 4 + rt.utf8ByteLength(e2) + 1;
    case "number":
      return Math.floor(e2) === e2 && e2 >= S && e2 <= R && e2 >= g && e2 <= f ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 5 : (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 9;
    case "undefined":
      return i || !l ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 : 0;
    case "boolean":
      return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 2;
    case "object":
      if (null != e2 && "string" == typeof e2._bsontype && e2[W] !== V) throw new q();
      if (null == e2 || "MinKey" === e2._bsontype || "MaxKey" === e2._bsontype) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1;
      if ("ObjectId" === e2._bsontype) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 13;
      if (e2 instanceof Date || G(e2)) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 9;
      if (ArrayBuffer.isView(e2) || e2 instanceof ArrayBuffer || p(e2)) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 6 + e2.byteLength;
      if ("Long" === e2._bsontype || "Double" === e2._bsontype || "Timestamp" === e2._bsontype) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 9;
      if ("Decimal128" === e2._bsontype) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 17;
      if ("Code" === e2._bsontype) return null != e2.scope && Object.keys(e2.scope).length > 0 ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 + 4 + 4 + rt.utf8ByteLength(e2.code.toString()) + 1 + le(e2.scope, n, l) : (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 + 4 + rt.utf8ByteLength(e2.code.toString()) + 1;
      if ("Binary" === e2._bsontype) {
        const n2 = e2;
        return n2.sub_type === Wt.SUBTYPE_BYTE_ARRAY ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + (n2.position + 1 + 4 + 1 + 4) : (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + (n2.position + 1 + 4 + 1);
      }
      if ("Symbol" === e2._bsontype) return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + rt.utf8ByteLength(e2.value) + 4 + 1 + 1;
      if ("DBRef" === e2._bsontype) {
        const i2 = Object.assign({ $ref: e2.collection, $id: e2.oid }, e2.fields);
        return null != e2.db && (i2.$db = e2.db), (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 + le(i2, n, l);
      }
      return e2 instanceof RegExp || h(e2) ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 + rt.utf8ByteLength(e2.source) + 1 + (e2.global ? 1 : 0) + (e2.ignoreCase ? 1 : 0) + (e2.multiline ? 1 : 0) + 1 : "BSONRegExp" === e2._bsontype ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 + rt.utf8ByteLength(e2.pattern) + 1 + rt.utf8ByteLength(e2.options) + 1 : (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + le(e2, n, l) + 1;
    case "function":
      return n ? (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 1 + 4 + rt.utf8ByteLength(e2.toString()) + 1 : 0;
    case "bigint":
      return (null != t2 ? rt.utf8ByteLength(t2) + 1 : 0) + 9;
    case "symbol":
      return 0;
    default:
      throw new $("Unrecognized JS type: " + typeof e2);
  }
}
var ce = class _ce extends ht {
  get _bsontype() {
    return "BSONRegExp";
  }
  pattern;
  options;
  constructor(t2, e2) {
    if (super(), this.pattern = t2, this.options = (e2 ?? "").split("").sort().join(""), -1 !== this.pattern.indexOf("\0")) throw new $(`BSON Regex patterns cannot contain null bytes, found: ${JSON.stringify(this.pattern)}`);
    if (-1 !== this.options.indexOf("\0")) throw new $(`BSON Regex options cannot contain null bytes, found: ${JSON.stringify(this.options)}`);
    for (let t3 = 0; t3 < this.options.length; t3++) if ("i" !== this.options[t3] && "m" !== this.options[t3] && "x" !== this.options[t3] && "l" !== this.options[t3] && "s" !== this.options[t3] && "u" !== this.options[t3]) throw new $(`The regular expression option [${this.options[t3]}] is not supported`);
  }
  static parseOptions(t2) {
    return t2 ? t2.split("").sort().join("") : "";
  }
  toExtendedJSON(t2) {
    return (t2 = t2 || {}).legacy ? { $regex: this.pattern, $options: this.options } : { $regularExpression: { pattern: this.pattern, options: this.options } };
  }
  static fromExtendedJSON(t2) {
    if ("$regex" in t2) {
      if ("string" == typeof t2.$regex) return new _ce(t2.$regex, _ce.parseOptions(t2.$options));
      if ("BSONRegExp" === t2.$regex._bsontype) return t2;
    }
    if ("$regularExpression" in t2) return new _ce(t2.$regularExpression.pattern, _ce.parseOptions(t2.$regularExpression.options));
    throw new $(`Unexpected BSONRegExp EJSON object form: ${JSON.stringify(t2)}`);
  }
  inspect(t2, e2, n) {
    const i = (function(t3) {
      if (null != t3 && "object" == typeof t3 && "stylize" in t3 && "function" == typeof t3.stylize) return t3.stylize;
    })(e2) ?? ((t3) => t3);
    n ??= X;
    return `new BSONRegExp(${i(n(this.pattern), "regexp")}, ${i(n(this.options), "regexp")})`;
  }
};
var ae = class _ae extends ht {
  get _bsontype() {
    return "BSONSymbol";
  }
  value;
  constructor(t2) {
    super(), this.value = t2;
  }
  valueOf() {
    return this.value;
  }
  toString() {
    return this.value;
  }
  toJSON() {
    return this.value;
  }
  toExtendedJSON() {
    return { $symbol: this.value };
  }
  static fromExtendedJSON(t2) {
    return new _ae(t2.$symbol);
  }
  inspect(t2, e2, n) {
    return n ??= X, `new BSONSymbol(${n(this.value, e2)})`;
  }
};
var se = Ht;
var de = class _de extends se {
  get _bsontype() {
    return "Timestamp";
  }
  get [pt]() {
    return "Timestamp";
  }
  static MAX_VALUE = Ht.MAX_UNSIGNED_VALUE;
  get i() {
    return this.low >>> 0;
  }
  get t() {
    return this.high >>> 0;
  }
  constructor(t2) {
    if (null == t2) super(0, 0, true);
    else if ("bigint" == typeof t2) super(t2, true);
    else if (Ht.isLong(t2)) super(t2.low, t2.high, true);
    else {
      if ("object" != typeof t2 || !("t" in t2) || !("i" in t2)) throw new $("A Timestamp can only be constructed with: bigint, Long, or { t: number; i: number }");
      {
        if ("number" != typeof t2.t && ("object" != typeof t2.t || "Int32" !== t2.t._bsontype)) throw new $("Timestamp constructed from { t, i } must provide t as a number");
        if ("number" != typeof t2.i && ("object" != typeof t2.i || "Int32" !== t2.i._bsontype)) throw new $("Timestamp constructed from { t, i } must provide i as a number");
        const e2 = Number(t2.t), n = Number(t2.i);
        if (e2 < 0 || Number.isNaN(e2)) throw new $("Timestamp constructed from { t, i } must provide a positive t");
        if (n < 0 || Number.isNaN(n)) throw new $("Timestamp constructed from { t, i } must provide a positive i");
        if (e2 > 4294967295) throw new $("Timestamp constructed from { t, i } must provide t equal or less than uint32 max");
        if (n > 4294967295) throw new $("Timestamp constructed from { t, i } must provide i equal or less than uint32 max");
        super(n, e2, true);
      }
    }
  }
  toJSON() {
    return { $timestamp: this.toString() };
  }
  static fromInt(t2) {
    return new _de(Ht.fromInt(t2, true));
  }
  static fromNumber(t2) {
    return new _de(Ht.fromNumber(t2, true));
  }
  static fromBits(t2, e2) {
    return new _de({ i: t2, t: e2 });
  }
  static fromString(t2, e2) {
    return new _de(Ht.fromString(t2, true, e2));
  }
  toExtendedJSON() {
    return { $timestamp: { t: this.t, i: this.i } };
  }
  static fromExtendedJSON(t2) {
    const e2 = Ht.isLong(t2.$timestamp.i) ? t2.$timestamp.i.getLowBitsUnsigned() : t2.$timestamp.i, n = Ht.isLong(t2.$timestamp.t) ? t2.$timestamp.t.getLowBitsUnsigned() : t2.$timestamp.t;
    return new _de({ t: n, i: e2 });
  }
  inspect(t2, e2, n) {
    n ??= X;
    return `new Timestamp({ t: ${n(this.t, e2)}, i: ${n(this.i, e2)} })`;
  }
};
var be = Ht.fromNumber(R);
var Ze = Ht.fromNumber(S);
function me(t2, e2, n) {
  const i = (e2 = null == e2 ? {} : e2) && e2.index ? e2.index : 0, l = Vt.getInt32LE(t2, i);
  if (l < 5) throw new $(`bson size must be >= 5, is ${l}`);
  if (e2.allowObjectSmallerThanBufferSize && t2.length < l) throw new $(`buffer length ${t2.length} must be >= bson size ${l}`);
  if (!e2.allowObjectSmallerThanBufferSize && t2.length !== l) throw new $(`buffer length ${t2.length} must === bson size ${l}`);
  if (l + i > t2.byteLength) throw new $(`(bson size ${l} + options.index ${i} must be <= buffer length ${t2.byteLength})`);
  if (0 !== t2[i + l - 1]) throw new $("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
  return re(t2, i, e2, n);
}
var ue = /^\$ref$|^\$id$|^\$db$/;
function re(t2, e2, n, i = false) {
  const l = null == n.fieldsAsRaw ? null : n.fieldsAsRaw, o = null != n.raw && n.raw, c = "boolean" == typeof n.bsonRegExp && n.bsonRegExp, a = n.promoteBuffers ?? false, s = n.promoteLongs ?? true, d = n.promoteValues ?? true, b = n.useBigInt64 ?? false;
  if (b && !d) throw new $("Must either request bigint or Long for int64 deserialization");
  if (b && !s) throw new $("Must either request bigint or Long for int64 deserialization");
  let Z, m, u2 = true;
  const r2 = (null == n.validation ? { utf8: true } : n.validation).utf8;
  if ("boolean" == typeof r2) Z = r2;
  else {
    u2 = false;
    const t3 = Object.keys(r2).map((function(t4) {
      return r2[t4];
    }));
    if (0 === t3.length) throw new $("UTF-8 validation setting cannot be empty");
    if ("boolean" != typeof t3[0]) throw new $("Invalid UTF-8 validation option, must specify boolean values");
    if (Z = t3[0], !t3.every(((t4) => t4 === Z))) throw new $("Invalid UTF-8 validation option - keys must be all true or all false");
  }
  if (!u2) {
    m = /* @__PURE__ */ new Set();
    for (const t3 of Object.keys(r2)) m.add(t3);
  }
  const p2 = e2;
  if (t2.length < 5) throw new $("corrupt bson message < 5 bytes long");
  const h2 = Vt.getInt32LE(t2, e2);
  if (e2 += 4, h2 < 5 || h2 > t2.length) throw new $("corrupt bson message");
  const y2 = i ? [] : {};
  let G2 = 0, X2 = !i && null;
  for (; ; ) {
    const r3 = t2[e2++];
    if (0 === r3) break;
    let p3 = e2;
    for (; 0 !== t2[p3] && p3 < t2.length; ) p3++;
    if (p3 >= t2.byteLength) throw new $("Bad BSON Document: illegal CString");
    const h3 = i ? G2++ : rt.toUTF8(t2, e2, p3, false);
    let V2, W2 = true;
    if (W2 = u2 || m?.has(h3) ? Z : !Z, false !== X2 && "$" === h3[0] && (X2 = ue.test(h3)), e2 = p3 + 1, r3 === K) {
      const n2 = Vt.getInt32LE(t2, e2);
      if (e2 += 4, n2 <= 0 || n2 > t2.length - e2 || 0 !== t2[e2 + n2 - 1]) throw new $("bad string length in bson");
      V2 = rt.toUTF8(t2, e2, e2 + n2 - 1, W2), e2 += n2;
    } else if (r3 === x) {
      const n2 = rt.allocateUnsafe(12);
      for (let i2 = 0; i2 < 12; i2++) n2[i2] = t2[e2 + i2];
      V2 = new ie(n2), e2 += 12;
    } else if (r3 === j && false === d) V2 = new $t(Vt.getInt32LE(t2, e2)), e2 += 4;
    else if (r3 === j) V2 = Vt.getInt32LE(t2, e2), e2 += 4;
    else if (r3 === J) V2 = Vt.getFloat64LE(t2, e2), e2 += 8, false === d && (V2 = new At(V2));
    else if (r3 === w) {
      const n2 = Vt.getInt32LE(t2, e2), i2 = Vt.getInt32LE(t2, e2 + 4);
      e2 += 8, V2 = new Date(new Ht(n2, i2).toNumber());
    } else if (r3 === N) {
      if (0 !== t2[e2] && 1 !== t2[e2]) throw new $("illegal boolean type value");
      V2 = 1 === t2[e2++];
    } else if (r3 === T) {
      const i2 = e2, l2 = Vt.getInt32LE(t2, e2);
      if (l2 <= 0 || l2 > t2.length - e2) throw new $("bad embedded document length in bson");
      if (o) V2 = t2.subarray(e2, e2 + l2);
      else {
        let e3 = n;
        u2 || (e3 = { ...n, validation: { utf8: W2 } }), V2 = re(t2, i2, e3, false);
      }
      e2 += l2;
    } else if (r3 === L) {
      const i2 = e2, o2 = Vt.getInt32LE(t2, e2);
      let c2 = n;
      const a2 = e2 + o2;
      if (l && l[h3] && (c2 = { ...n, raw: true }), u2 || (c2 = { ...c2, validation: { utf8: W2 } }), V2 = re(t2, i2, c2, true), 0 !== t2[(e2 += o2) - 1]) throw new $("invalid array terminator byte");
      if (e2 !== a2) throw new $("corrupted array bson");
    } else if (r3 === z) V2 = void 0;
    else if (r3 === H) V2 = null;
    else if (r3 === F) if (b) V2 = Vt.getBigInt64LE(t2, e2), e2 += 8;
    else {
      const n2 = Vt.getInt32LE(t2, e2), i2 = Vt.getInt32LE(t2, e2 + 4);
      e2 += 8;
      const l2 = new Ht(n2, i2);
      V2 = s && true === d && l2.lessThanOrEqual(be) && l2.greaterThanOrEqual(Ze) ? l2.toNumber() : l2;
    }
    else if (r3 === Q) {
      const n2 = rt.allocateUnsafe(16);
      for (let i2 = 0; i2 < 16; i2++) n2[i2] = t2[e2 + i2];
      e2 += 16, V2 = new Dt(n2);
    } else if (r3 === U) {
      let n2 = Vt.getInt32LE(t2, e2);
      e2 += 4;
      const i2 = n2, l2 = t2[e2++];
      if (n2 < 0) throw new $("Negative binary type element size found");
      if (n2 > t2.byteLength) throw new $("Binary type size larger than document size");
      if (l2 === Wt.SUBTYPE_BYTE_ARRAY) {
        if (n2 = Vt.getInt32LE(t2, e2), e2 += 4, n2 < 0) throw new $("Negative binary type element size found for subtype 0x02");
        if (n2 > i2 - 4) throw new $("Binary type with subtype 0x02 contains too long binary size");
        if (n2 < i2 - 4) throw new $("Binary type with subtype 0x02 contains too short binary size");
      }
      a && d ? V2 = rt.toLocalBufferType(t2.subarray(e2, e2 + n2)) : (V2 = new Wt(t2.subarray(e2, e2 + n2), l2), l2 === D && It.isValid(V2) && (V2 = V2.toUUID())), e2 += n2;
    } else if (r3 === k && false === c) {
      for (p3 = e2; 0 !== t2[p3] && p3 < t2.length; ) p3++;
      if (p3 >= t2.length) throw new $("Bad BSON Document: illegal CString");
      const n2 = rt.toUTF8(t2, e2, p3, false);
      for (p3 = e2 = p3 + 1; 0 !== t2[p3] && p3 < t2.length; ) p3++;
      if (p3 >= t2.length) throw new $("Bad BSON Document: illegal CString");
      const i2 = rt.toUTF8(t2, e2, p3, false);
      e2 = p3 + 1;
      const l2 = new Array(i2.length);
      for (p3 = 0; p3 < i2.length; p3++) switch (i2[p3]) {
        case "m":
          l2[p3] = "m";
          break;
        case "s":
          l2[p3] = "g";
          break;
        case "i":
          l2[p3] = "i";
      }
      V2 = new RegExp(n2, l2.join(""));
    } else if (r3 === k && true === c) {
      for (p3 = e2; 0 !== t2[p3] && p3 < t2.length; ) p3++;
      if (p3 >= t2.length) throw new $("Bad BSON Document: illegal CString");
      const n2 = rt.toUTF8(t2, e2, p3, false);
      for (p3 = e2 = p3 + 1; 0 !== t2[p3] && p3 < t2.length; ) p3++;
      if (p3 >= t2.length) throw new $("Bad BSON Document: illegal CString");
      const i2 = rt.toUTF8(t2, e2, p3, false);
      e2 = p3 + 1, V2 = new ce(n2, i2);
    } else if (r3 === v) {
      const n2 = Vt.getInt32LE(t2, e2);
      if (e2 += 4, n2 <= 0 || n2 > t2.length - e2 || 0 !== t2[e2 + n2 - 1]) throw new $("bad string length in bson");
      const i2 = rt.toUTF8(t2, e2, e2 + n2 - 1, W2);
      V2 = d ? i2 : new ae(i2), e2 += n2;
    } else if (r3 === P) V2 = new de({ i: Vt.getUint32LE(t2, e2), t: Vt.getUint32LE(t2, e2 + 4) }), e2 += 8;
    else if (r3 === O) V2 = new te();
    else if (r3 === E) V2 = new qt();
    else if (r3 === C) {
      const n2 = Vt.getInt32LE(t2, e2);
      if (e2 += 4, n2 <= 0 || n2 > t2.length - e2 || 0 !== t2[e2 + n2 - 1]) throw new $("bad string length in bson");
      const i2 = rt.toUTF8(t2, e2, e2 + n2 - 1, W2);
      V2 = new Rt(i2), e2 += n2;
    } else if (r3 === M) {
      const i2 = Vt.getInt32LE(t2, e2);
      if (e2 += 4, i2 < 13) throw new $("code_w_scope total size shorter minimum expected length");
      const l2 = Vt.getInt32LE(t2, e2);
      if (e2 += 4, l2 <= 0 || l2 > t2.length - e2 || 0 !== t2[e2 + l2 - 1]) throw new $("bad string length in bson");
      const o2 = rt.toUTF8(t2, e2, e2 + l2 - 1, W2), c2 = e2 += l2, a2 = Vt.getInt32LE(t2, e2), s2 = re(t2, c2, n, false);
      if (e2 += a2, i2 < 8 + a2 + l2) throw new $("code_w_scope total size is too short, truncating scope");
      if (i2 > 8 + a2 + l2) throw new $("code_w_scope total size is too long, clips outer document");
      V2 = new Rt(o2, s2);
    } else {
      if (r3 !== B) throw new $(`Detected unknown BSON type ${r3.toString(16)} for fieldname "${h3}"`);
      {
        const n2 = Vt.getInt32LE(t2, e2);
        if (e2 += 4, n2 <= 0 || n2 > t2.length - e2 || 0 !== t2[e2 + n2 - 1]) throw new $("bad string length in bson");
        const i2 = rt.toUTF8(t2, e2, e2 + n2 - 1, W2);
        e2 += n2;
        const l2 = rt.allocateUnsafe(12);
        for (let n3 = 0; n3 < 12; n3++) l2[n3] = t2[e2 + n3];
        const o2 = new ie(l2);
        e2 += 12, V2 = new Jt(i2, o2);
      }
    }
    "__proto__" === h3 ? Object.defineProperty(y2, h3, { value: V2, writable: true, enumerable: true, configurable: true }) : y2[h3] = V2;
  }
  if (h2 !== e2 - p2) {
    if (i) throw new $("corrupt array bson");
    throw new $("corrupt object bson");
  }
  if (!X2) return y2;
  if (St(y2)) {
    const t3 = Object.assign({}, y2);
    return delete t3.$ref, delete t3.$id, delete t3.$db, new Jt(y2.$ref, y2.$id, y2.$db, t3);
  }
  return y2;
}
var pe = /\x00/;
var he = /* @__PURE__ */ new Set(["$db", "$ref", "$id", "$clusterTime"]);
function ye(t2, e2, n, i) {
  t2[i++] = K;
  t2[(i = i + rt.encodeUTF8Into(t2, e2, i) + 1) - 1] = 0;
  const l = rt.encodeUTF8Into(t2, n, i + 4);
  return Vt.setInt32LE(t2, i, l + 1), i = i + 4 + l, t2[i++] = 0, i;
}
function Ge(t2, e2, n, i) {
  const l = !Object.is(n, -0) && Number.isSafeInteger(n) && n <= f && n >= g ? j : J;
  t2[i++] = l;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i += l === j ? Vt.setInt32LE(t2, i, n) : Vt.setFloat64LE(t2, i, n);
}
function Xe(t2, e2, n, i) {
  t2[i++] = F;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i += Vt.setBigInt64LE(t2, i, n);
}
function Ve(t2, e2, n, i) {
  t2[i++] = H;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i;
}
function We(t2, e2, n, i) {
  t2[i++] = N;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, t2[i++] = n ? 1 : 0, i;
}
function fe(t2, e2, n, i) {
  t2[i++] = w;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const l = Ht.fromNumber(n.getTime()), o = l.getLowBits(), c = l.getHighBits();
  return i += Vt.setInt32LE(t2, i, o), i += Vt.setInt32LE(t2, i, c);
}
function ge(t2, e2, n, i) {
  t2[i++] = k;
  if (i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, n.source && null != n.source.match(pe)) throw new $("value " + n.source + " must not contain null bytes");
  return i += rt.encodeUTF8Into(t2, n.source, i), t2[i++] = 0, n.ignoreCase && (t2[i++] = 105), n.global && (t2[i++] = 115), n.multiline && (t2[i++] = 109), t2[i++] = 0, i;
}
function Ye(t2, e2, n, i) {
  t2[i++] = k;
  if (i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, null != n.pattern.match(pe)) throw new $("pattern " + n.pattern + " must not contain null bytes");
  i += rt.encodeUTF8Into(t2, n.pattern, i), t2[i++] = 0;
  const l = n.options.split("").sort().join("");
  return i += rt.encodeUTF8Into(t2, l, i), t2[i++] = 0, i;
}
function Ie(t2, e2, n, i) {
  null === n ? t2[i++] = H : "MinKey" === n._bsontype ? t2[i++] = O : t2[i++] = E;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i;
}
function Re(t2, e2, n, i) {
  t2[i++] = x;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i += n.serializeInto(t2, i);
}
function Se(t2, e2, n, i) {
  t2[i++] = U;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const l = n.length;
  if (i += Vt.setInt32LE(t2, i, l), t2[i++] = _, l <= 16) for (let e3 = 0; e3 < l; e3++) t2[i + e3] = n[e3];
  else t2.set(n, i);
  return i += l;
}
function Je(t2, e2, n, i, l, o, c, a, s) {
  if (s.has(n)) throw new $("Cannot convert circular structure to BSON");
  s.add(n), t2[i++] = Array.isArray(n) ? L : T;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const d = ke(t2, n, l, i, o + 1, c, a, s);
  return s.delete(n), d;
}
function Ke(t2, e2, n, i) {
  t2[i++] = Q;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  for (let e3 = 0; e3 < 16; e3++) t2[i + e3] = n.bytes[e3];
  return i + 16;
}
function Te(t2, e2, n, i) {
  t2[i++] = "Long" === n._bsontype ? F : P;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const l = n.getLowBits(), o = n.getHighBits();
  return i += Vt.setInt32LE(t2, i, l), i += Vt.setInt32LE(t2, i, o);
}
function Le(t2, e2, n, i) {
  n = n.valueOf(), t2[i++] = j;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i += Vt.setInt32LE(t2, i, n);
}
function Ue(t2, e2, n, i) {
  t2[i++] = J;
  return i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0, i += Vt.setFloat64LE(t2, i, n.value);
}
function ze(t2, e2, n, i) {
  t2[i++] = C;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const l = n.toString(), o = rt.encodeUTF8Into(t2, l, i + 4) + 1;
  return Vt.setInt32LE(t2, i, o), i = i + 4 + o - 1, t2[i++] = 0, i;
}
function xe(t2, e2, n, i, l = false, o = 0, c = false, a = true, s) {
  if (n.scope && "object" == typeof n.scope) {
    t2[i++] = M;
    i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
    let d = i;
    const b = n.code;
    i += 4;
    const Z = rt.encodeUTF8Into(t2, b, i + 4) + 1;
    Vt.setInt32LE(t2, i, Z), t2[i + 4 + Z - 1] = 0, i = i + Z + 4;
    const m = ke(t2, n.scope, l, i, o + 1, c, a, s);
    i = m - 1;
    const u2 = m - d;
    d += Vt.setInt32LE(t2, d, u2), t2[i++] = 0;
  } else {
    t2[i++] = C;
    i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
    const l2 = n.code.toString(), o2 = rt.encodeUTF8Into(t2, l2, i + 4) + 1;
    Vt.setInt32LE(t2, i, o2), i = i + 4 + o2 - 1, t2[i++] = 0;
  }
  return i;
}
function Ne(t2, e2, n, i) {
  t2[i++] = U;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const l = n.buffer;
  let o = n.position;
  if (n.sub_type === Wt.SUBTYPE_BYTE_ARRAY && (o += 4), i += Vt.setInt32LE(t2, i, o), t2[i++] = n.sub_type, n.sub_type === Wt.SUBTYPE_BYTE_ARRAY && (o -= 4, i += Vt.setInt32LE(t2, i, o)), n.sub_type === Wt.SUBTYPE_VECTOR && ft(n), o <= 16) for (let e3 = 0; e3 < o; e3++) t2[i + e3] = l[e3];
  else t2.set(l, i);
  return i += n.position;
}
function we(t2, e2, n, i) {
  t2[i++] = v;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  const l = rt.encodeUTF8Into(t2, n.value, i + 4) + 1;
  return Vt.setInt32LE(t2, i, l), i = i + 4 + l - 1, t2[i++] = 0, i;
}
function He(t2, e2, n, i, l, o, c) {
  t2[i++] = T;
  i += rt.encodeUTF8Into(t2, e2, i), t2[i++] = 0;
  let a = i, s = { $ref: n.collection || n.namespace, $id: n.oid };
  null != n.db && (s.$db = n.db), s = Object.assign(s, n.fields);
  const d = ke(t2, s, false, i, l + 1, o, true, c), b = d - a;
  return a += Vt.setInt32LE(t2, i, b), d;
}
function ke(t2, e2, n, i, l, o, c, a) {
  if (null == a) {
    if (null == e2) return t2[0] = 5, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, 5;
    if (Array.isArray(e2)) throw new $("serialize does not support an array as the root input");
    if ("object" != typeof e2) throw new $("serialize does not support non-object as the root input");
    if ("_bsontype" in e2 && "string" == typeof e2._bsontype) throw new $("BSON types cannot be serialized as a document");
    if (G(e2) || h(e2) || r(e2) || p(e2)) throw new $("date, regexp, typedarray, and arraybuffer cannot be BSON documents");
    a = /* @__PURE__ */ new Set();
  }
  a.add(e2);
  let s = i + 4;
  if (Array.isArray(e2)) for (let i2 = 0; i2 < e2.length; i2++) {
    const d2 = `${i2}`;
    let b = e2[i2];
    "function" == typeof b?.toBSON && (b = b.toBSON());
    const Z = typeof b;
    if (void 0 === b) s = Ve(t2, d2, 0, s);
    else if (null === b) s = Ve(t2, d2, 0, s);
    else if ("string" === Z) s = ye(t2, d2, b, s);
    else if ("number" === Z) s = Ge(t2, d2, b, s);
    else if ("bigint" === Z) s = Xe(t2, d2, b, s);
    else if ("boolean" === Z) s = We(t2, d2, b, s);
    else if ("object" === Z && null == b._bsontype) s = b instanceof Date || G(b) ? fe(t2, d2, b, s) : b instanceof Uint8Array || r(b) ? Se(t2, d2, b, s) : b instanceof RegExp || h(b) ? ge(t2, d2, b, s) : Je(t2, d2, b, s, n, l, o, c, a);
    else if ("object" === Z) {
      if (b[W] !== V) throw new q();
      if ("ObjectId" === b._bsontype) s = Re(t2, d2, b, s);
      else if ("Decimal128" === b._bsontype) s = Ke(t2, d2, b, s);
      else if ("Long" === b._bsontype || "Timestamp" === b._bsontype) s = Te(t2, d2, b, s);
      else if ("Double" === b._bsontype) s = Ue(t2, d2, b, s);
      else if ("Code" === b._bsontype) s = xe(t2, d2, b, s, n, l, o, c, a);
      else if ("Binary" === b._bsontype) s = Ne(t2, d2, b, s);
      else if ("BSONSymbol" === b._bsontype) s = we(t2, d2, b, s);
      else if ("DBRef" === b._bsontype) s = He(t2, d2, b, s, l, o, a);
      else if ("BSONRegExp" === b._bsontype) s = Ye(t2, d2, b, s);
      else if ("Int32" === b._bsontype) s = Le(t2, d2, b, s);
      else if ("MinKey" === b._bsontype || "MaxKey" === b._bsontype) s = Ie(t2, d2, b, s);
      else if (void 0 !== b._bsontype) throw new $(`Unrecognized or invalid _bsontype: ${String(b._bsontype)}`);
    } else "function" === Z && o && (s = ze(t2, d2, b, s));
  }
  else if (e2 instanceof Map || y(e2)) {
    const i2 = e2.entries();
    let d2 = false;
    for (; !d2; ) {
      const e3 = i2.next();
      if (d2 = !!e3.done, d2) continue;
      const b = e3.value ? e3.value[0] : void 0;
      let Z = e3.value ? e3.value[1] : void 0;
      "function" == typeof Z?.toBSON && (Z = Z.toBSON());
      const m = typeof Z;
      if ("string" == typeof b && !he.has(b)) {
        if (null != b.match(pe)) throw new $("key " + b + " must not contain null bytes");
        if (n) {
          if ("$" === b[0]) throw new $("key " + b + " must not start with '$'");
          if (b.includes(".")) throw new $("key " + b + " must not contain '.'");
        }
      }
      if (void 0 === Z) false === c && (s = Ve(t2, b, 0, s));
      else if (null === Z) s = Ve(t2, b, 0, s);
      else if ("string" === m) s = ye(t2, b, Z, s);
      else if ("number" === m) s = Ge(t2, b, Z, s);
      else if ("bigint" === m) s = Xe(t2, b, Z, s);
      else if ("boolean" === m) s = We(t2, b, Z, s);
      else if ("object" === m && null == Z._bsontype) s = Z instanceof Date || G(Z) ? fe(t2, b, Z, s) : Z instanceof Uint8Array || r(Z) ? Se(t2, b, Z, s) : Z instanceof RegExp || h(Z) ? ge(t2, b, Z, s) : Je(t2, b, Z, s, n, l, o, c, a);
      else if ("object" === m) {
        if (Z[W] !== V) throw new q();
        if ("ObjectId" === Z._bsontype) s = Re(t2, b, Z, s);
        else if ("Decimal128" === Z._bsontype) s = Ke(t2, b, Z, s);
        else if ("Long" === Z._bsontype || "Timestamp" === Z._bsontype) s = Te(t2, b, Z, s);
        else if ("Double" === Z._bsontype) s = Ue(t2, b, Z, s);
        else if ("Code" === Z._bsontype) s = xe(t2, b, Z, s, n, l, o, c, a);
        else if ("Binary" === Z._bsontype) s = Ne(t2, b, Z, s);
        else if ("BSONSymbol" === Z._bsontype) s = we(t2, b, Z, s);
        else if ("DBRef" === Z._bsontype) s = He(t2, b, Z, s, l, o, a);
        else if ("BSONRegExp" === Z._bsontype) s = Ye(t2, b, Z, s);
        else if ("Int32" === Z._bsontype) s = Le(t2, b, Z, s);
        else if ("MinKey" === Z._bsontype || "MaxKey" === Z._bsontype) s = Ie(t2, b, Z, s);
        else if (void 0 !== Z._bsontype) throw new $(`Unrecognized or invalid _bsontype: ${String(Z._bsontype)}`);
      } else "function" === m && o && (s = ze(t2, b, Z, s));
    }
  } else {
    if ("function" == typeof e2?.toBSON && null != (e2 = e2.toBSON()) && "object" != typeof e2) throw new $("toBSON function did not return an object");
    for (const i2 of Object.keys(e2)) {
      let d2 = e2[i2];
      "function" == typeof d2?.toBSON && (d2 = d2.toBSON());
      const b = typeof d2;
      if ("string" == typeof i2 && !he.has(i2)) {
        if (null != i2.match(pe)) throw new $("key " + i2 + " must not contain null bytes");
        if (n) {
          if ("$" === i2[0]) throw new $("key " + i2 + " must not start with '$'");
          if (i2.includes(".")) throw new $("key " + i2 + " must not contain '.'");
        }
      }
      if (void 0 === d2) false === c && (s = Ve(t2, i2, 0, s));
      else if (null === d2) s = Ve(t2, i2, 0, s);
      else if ("string" === b) s = ye(t2, i2, d2, s);
      else if ("number" === b) s = Ge(t2, i2, d2, s);
      else if ("bigint" === b) s = Xe(t2, i2, d2, s);
      else if ("boolean" === b) s = We(t2, i2, d2, s);
      else if ("object" === b && null == d2._bsontype) s = d2 instanceof Date || G(d2) ? fe(t2, i2, d2, s) : d2 instanceof Uint8Array || r(d2) ? Se(t2, i2, d2, s) : d2 instanceof RegExp || h(d2) ? ge(t2, i2, d2, s) : Je(t2, i2, d2, s, n, l, o, c, a);
      else if ("object" === b) {
        if (d2[W] !== V) throw new q();
        if ("ObjectId" === d2._bsontype) s = Re(t2, i2, d2, s);
        else if ("Decimal128" === d2._bsontype) s = Ke(t2, i2, d2, s);
        else if ("Long" === d2._bsontype || "Timestamp" === d2._bsontype) s = Te(t2, i2, d2, s);
        else if ("Double" === d2._bsontype) s = Ue(t2, i2, d2, s);
        else if ("Code" === d2._bsontype) s = xe(t2, i2, d2, s, n, l, o, c, a);
        else if ("Binary" === d2._bsontype) s = Ne(t2, i2, d2, s);
        else if ("BSONSymbol" === d2._bsontype) s = we(t2, i2, d2, s);
        else if ("DBRef" === d2._bsontype) s = He(t2, i2, d2, s, l, o, a);
        else if ("BSONRegExp" === d2._bsontype) s = Ye(t2, i2, d2, s);
        else if ("Int32" === d2._bsontype) s = Le(t2, i2, d2, s);
        else if ("MinKey" === d2._bsontype || "MaxKey" === d2._bsontype) s = Ie(t2, i2, d2, s);
        else if (void 0 !== d2._bsontype) throw new $(`Unrecognized or invalid _bsontype: ${String(d2._bsontype)}`);
      } else "function" === b && o && (s = ze(t2, i2, d2, s));
    }
  }
  a.delete(e2), t2[s++] = 0;
  const d = s - i;
  return i += Vt.setInt32LE(t2, i, d), s;
}
var Be = { $oid: ie, $binary: Wt, $uuid: Wt, $symbol: ae, $numberInt: $t, $numberDecimal: Dt, $numberDouble: At, $numberLong: Ht, $minKey: te, $maxKey: qt, $regex: ce, $regularExpression: ce, $timestamp: de };
function Ce(t2, e2 = {}) {
  if ("number" == typeof t2) {
    const n2 = t2 <= f && t2 >= g, i = t2 <= Y && t2 >= I;
    if (e2.relaxed || e2.legacy) return t2;
    if (Number.isInteger(t2) && !Object.is(t2, -0)) {
      if (n2) return new $t(t2);
      if (i) return e2.useBigInt64 ? BigInt(t2) : Ht.fromNumber(t2);
    }
    return new At(t2);
  }
  if (null == t2 || "object" != typeof t2) return t2;
  if (t2.$undefined) return null;
  const n = Object.keys(t2).filter(((e3) => e3.startsWith("$") && null != t2[e3]));
  for (let i = 0; i < n.length; i++) {
    const l = Be[n[i]];
    if (l) return l.fromExtendedJSON(t2, e2);
  }
  if (null != t2.$date) {
    const n2 = t2.$date, i = /* @__PURE__ */ new Date();
    if (e2.legacy) if ("number" == typeof n2) i.setTime(n2);
    else if ("string" == typeof n2) i.setTime(Date.parse(n2));
    else {
      if ("bigint" != typeof n2) throw new tt("Unrecognized type for EJSON date: " + typeof n2);
      i.setTime(Number(n2));
    }
    else if ("string" == typeof n2) i.setTime(Date.parse(n2));
    else if (Ht.isLong(n2)) i.setTime(n2.toNumber());
    else if ("number" == typeof n2 && e2.relaxed) i.setTime(n2);
    else {
      if ("bigint" != typeof n2) throw new tt("Unrecognized type for EJSON date: " + typeof n2);
      i.setTime(Number(n2));
    }
    return i;
  }
  if (null != t2.$code) {
    const e3 = Object.assign({}, t2);
    return t2.$scope && (e3.$scope = Ce(t2.$scope)), Rt.fromExtendedJSON(t2);
  }
  if (St(t2) || t2.$dbPointer) {
    const e3 = t2.$ref ? t2 : t2.$dbPointer;
    if (e3 instanceof Jt) return e3;
    const n2 = Object.keys(e3).filter(((t3) => t3.startsWith("$")));
    let i = true;
    if (n2.forEach(((t3) => {
      -1 === ["$ref", "$id", "$db"].indexOf(t3) && (i = false);
    })), i) return Jt.fromExtendedJSON(e3);
  }
  return t2;
}
function ve(t2) {
  const e2 = t2.toISOString();
  return 0 !== t2.getUTCMilliseconds() ? e2 : e2.slice(0, -5) + "Z";
}
function Me(t2, e2) {
  if (t2 instanceof Map || y(t2)) {
    const n = /* @__PURE__ */ Object.create(null);
    for (const [e3, i] of t2) {
      if ("string" != typeof e3) throw new $("Can only serialize maps with string keys");
      n[e3] = i;
    }
    return Me(n, e2);
  }
  if (("object" == typeof t2 || "function" == typeof t2) && null !== t2) {
    const n = e2.seenObjects.findIndex(((e3) => e3.obj === t2));
    if (-1 !== n) {
      const t3 = e2.seenObjects.map(((t4) => t4.propertyName)), i = t3.slice(0, n).map(((t4) => `${t4} -> `)).join(""), l = t3[n], o = " -> " + t3.slice(n + 1, t3.length - 1).map(((t4) => `${t4} -> `)).join(""), c = t3[t3.length - 1], a = " ".repeat(i.length + l.length / 2), s = "-".repeat(o.length + (l.length + c.length) / 2 - 1);
      throw new $(`Converting circular structure to EJSON:
    ${i}${l}${o}${c}
    ${a}\\${s}/`);
    }
    e2.seenObjects[e2.seenObjects.length - 1].obj = t2;
  }
  if (Array.isArray(t2)) return (function(t3, e3) {
    return t3.map(((t4, n) => {
      e3.seenObjects.push({ propertyName: `index ${n}`, obj: null });
      try {
        return Me(t4, e3);
      } finally {
        e3.seenObjects.pop();
      }
    }));
  })(t2, e2);
  if (void 0 === t2) return e2.ignoreUndefined ? void 0 : null;
  if (t2 instanceof Date || G(t2)) {
    const n = t2.getTime(), i = n > -1 && n < 2534023188e5;
    return e2.legacy ? e2.relaxed && i ? { $date: t2.getTime() } : { $date: ve(t2) } : e2.relaxed && i ? { $date: ve(t2) } : { $date: { $numberLong: t2.getTime().toString() } };
  }
  if (!("number" != typeof t2 || e2.relaxed && isFinite(t2))) {
    if (Number.isInteger(t2) && !Object.is(t2, -0)) {
      if (t2 >= g && t2 <= f) return { $numberInt: t2.toString() };
      if (t2 >= I && t2 <= Y) return { $numberLong: t2.toString() };
    }
    return { $numberDouble: Object.is(t2, -0) ? "-0.0" : t2.toString() };
  }
  if ("bigint" == typeof t2) return e2.relaxed ? Number(BigInt.asIntN(64, t2)) : { $numberLong: BigInt.asIntN(64, t2).toString() };
  if (t2 instanceof RegExp || h(t2)) {
    let n = t2.flags;
    if (void 0 === n) {
      const e3 = t2.toString().match(/[gimuy]*$/);
      e3 && (n = e3[0]);
    }
    return new ce(t2.source, n).toExtendedJSON(e2);
  }
  return null != t2 && "object" == typeof t2 ? (function(t3, e3) {
    if (null == t3 || "object" != typeof t3) throw new $("not an object instance");
    const n = t3._bsontype;
    if (void 0 === n) {
      const n2 = {};
      for (const i of Object.keys(t3)) {
        e3.seenObjects.push({ propertyName: i, obj: null });
        try {
          const l = Me(t3[i], e3);
          "__proto__" === i ? Object.defineProperty(n2, i, { value: l, writable: true, enumerable: true, configurable: true }) : n2[i] = l;
        } finally {
          e3.seenObjects.pop();
        }
      }
      return n2;
    }
    if (null != t3 && "object" == typeof t3 && "string" == typeof t3._bsontype && t3[W] !== V) throw new q();
    if ((function(t4) {
      return null != t4 && "object" == typeof t4 && "_bsontype" in t4 && "string" == typeof t4._bsontype;
    })(t3)) {
      let i = t3;
      if ("function" != typeof i.toExtendedJSON) {
        const e4 = je[t3._bsontype];
        if (!e4) throw new $("Unrecognized or invalid _bsontype: " + t3._bsontype);
        i = e4(i);
      }
      return "Code" === n && i.scope ? i = new Rt(i.code, Me(i.scope, e3)) : "DBRef" === n && i.oid && (i = new Jt(Me(i.collection, e3), Me(i.oid, e3), Me(i.db, e3), Me(i.fields, e3))), i.toExtendedJSON(e3);
    }
    throw new $("_bsontype must be a string, but was: " + typeof n);
  })(t2, e2) : t2;
}
var je = { Binary: (t2) => new Wt(t2.value(), t2.sub_type), Code: (t2) => new Rt(t2.code, t2.scope), DBRef: (t2) => new Jt(t2.collection || t2.namespace, t2.oid, t2.db, t2.fields), Decimal128: (t2) => new Dt(t2.bytes), Double: (t2) => new At(t2.value), Int32: (t2) => new $t(t2.value), Long: (t2) => Ht.fromBits(null != t2.low ? t2.low : t2.low_, null != t2.low ? t2.high : t2.high_, null != t2.low ? t2.unsigned : t2.unsigned_), MaxKey: () => new qt(), MinKey: () => new te(), ObjectId: (t2) => new ie(t2), BSONRegExp: (t2) => new ce(t2.pattern, t2.options), BSONSymbol: (t2) => new ae(t2.value), Timestamp: (t2) => de.fromBits(t2.low, t2.high) };
function Pe(t2, e2) {
  const n = { useBigInt64: e2?.useBigInt64 ?? false, relaxed: e2?.relaxed ?? true, legacy: e2?.legacy ?? false };
  return JSON.parse(t2, ((t3, e3) => {
    if (-1 !== t3.indexOf("\0")) throw new $(`BSON Document field names cannot contain null bytes, found: ${JSON.stringify(t3)}`);
    return Ce(e3, n);
  }));
}
function Fe(t2, e2, n, i) {
  null != n && "object" == typeof n && (i = n, n = 0), null == e2 || "object" != typeof e2 || Array.isArray(e2) || (i = e2, e2 = void 0, n = 0);
  const l = Me(t2, Object.assign({ relaxed: true, legacy: false }, i, { seenObjects: [{ propertyName: "(root)", obj: null }] }));
  return JSON.stringify(l, e2, n);
}
var Qe = /* @__PURE__ */ Object.create(null);
Qe.parse = Pe, Qe.stringify = Fe, Qe.serialize = function(t2, e2) {
  return e2 = e2 || {}, JSON.parse(Fe(t2, e2));
}, Qe.deserialize = function(t2, e2) {
  return e2 = e2 || {}, Pe(JSON.stringify(t2), e2);
}, Object.freeze(Qe);
var Oe = 1;
var Ee = 2;
var _e = 3;
var De = 4;
var Ae = 5;
var $e = 6;
var qe = 7;
var tn = 8;
var en = 9;
var nn = 10;
var ln = 11;
var on = 12;
var cn = 13;
var an = 14;
var sn = 15;
var dn = 16;
var bn = 17;
var Zn = 18;
var mn = 19;
var un = 255;
var rn = 127;
function pn(t2, e2) {
  try {
    return Vt.getNonnegativeInt32LE(t2, e2);
  } catch (t3) {
    throw new et("BSON size cannot be negative", e2, { cause: t3 });
  }
}
function hn(t2, e2) {
  let n = e2;
  for (; 0 !== t2[n]; n++) ;
  if (n === t2.length - 1) throw new et("Null terminator not found", e2);
  return n;
}
var yn = /* @__PURE__ */ Object.create(null);
yn.parseToElements = function(t2, e2 = 0) {
  if (e2 ??= 0, t2.length < 5) throw new et(`Input must be at least 5 bytes, got ${t2.length} bytes`, e2);
  const n = pn(t2, e2);
  if (n > t2.length - e2) throw new et(`Parsed documentSize (${n} bytes) does not match input length (${t2.length} bytes)`, e2);
  if (0 !== t2[e2 + n - 1]) throw new et("BSON documents must end in 0x00", e2 + n);
  const i = [];
  let l = e2 + 4;
  for (; l <= n + e2; ) {
    const o = t2[l];
    if (l += 1, 0 === o) {
      if (l - e2 !== n) throw new et("Invalid 0x00 type byte", l);
      break;
    }
    const c = l, a = hn(t2, l) - c;
    let s;
    if (l += a + 1, o === Oe || o === Zn || o === en || o === bn) s = 8;
    else if (o === dn) s = 4;
    else if (o === qe) s = 12;
    else if (o === mn) s = 16;
    else if (o === tn) s = 1;
    else if (o === nn || o === $e || o === rn || o === un) s = 0;
    else if (o === ln) s = hn(t2, hn(t2, l) + 1) + 1 - l;
    else if (o === _e || o === De || o === sn) s = pn(t2, l);
    else {
      if (o !== Ee && o !== Ae && o !== on && o !== cn && o !== an) throw new et(`Invalid 0x${o.toString(16).padStart(2, "0")} type byte`, l);
      s = pn(t2, l) + 4, o === Ae && (s += 1), o === on && (s += 12);
    }
    if (s > n) throw new et("value reports length larger than document", l);
    i.push([o, c, a, l, s]), l += s;
  }
  return i;
}, yn.ByteUtils = rt, yn.NumberUtils = Vt, Object.freeze(yn);
var Gn = 17825792;
var Xn = rt.allocate(Gn);
var Vn = Object.freeze({ __proto__: null, BSONError: $, BSONOffsetError: et, BSONRegExp: ce, BSONRuntimeError: tt, BSONSymbol: ae, BSONType: A, BSONValue: ht, BSONVersionError: q, Binary: Wt, ByteUtils: rt, Code: Rt, DBRef: Jt, Decimal128: Dt, Double: At, EJSON: Qe, Int32: $t, Long: Ht, MaxKey: qt, MinKey: te, NumberUtils: Vt, ObjectId: ie, Timestamp: de, UUID: It, bsonType: pt, calculateObjectSize: function(t2, e2 = {}) {
  return le(t2, "boolean" == typeof (e2 = e2 || {}).serializeFunctions && e2.serializeFunctions, "boolean" != typeof e2.ignoreUndefined || e2.ignoreUndefined);
}, deserialize: function(t2, e2 = {}) {
  return me(rt.toLocalBufferType(t2), e2);
}, deserializeStream: function(t2, e2, n, i, l, o) {
  const c = Object.assign({ allowObjectSmallerThanBufferSize: true, index: 0 }, o), a = rt.toLocalBufferType(t2);
  let s = e2;
  for (let t3 = 0; t3 < n; t3++) {
    const e3 = Vt.getInt32LE(a, s);
    c.index = s, i[l + t3] = me(a, c), s += e3;
  }
  return s;
}, onDemand: yn, serialize: function(t2, e2 = {}) {
  const n = "boolean" == typeof e2.checkKeys && e2.checkKeys, i = "boolean" == typeof e2.serializeFunctions && e2.serializeFunctions, l = "boolean" != typeof e2.ignoreUndefined || e2.ignoreUndefined, o = "number" == typeof e2.minInternalBufferSize ? e2.minInternalBufferSize : Gn;
  Xn.length < o && (Xn = rt.allocate(o));
  const c = ke(Xn, t2, n, 0, 0, i, l, null), a = rt.allocateUnsafe(c);
  return a.set(Xn.subarray(0, c), 0), a;
}, serializeWithBufferAndIndex: function(t2, e2, n = {}) {
  const i = "boolean" == typeof n.checkKeys && n.checkKeys, l = "boolean" == typeof n.serializeFunctions && n.serializeFunctions, o = "boolean" != typeof n.ignoreUndefined || n.ignoreUndefined, c = "number" == typeof n.index ? n.index : 0, a = ke(Xn, t2, i, 0, 0, l, o, null);
  return e2.set(Xn.subarray(0, a), c), c + a - 1;
}, setInternalBufferSize: function(t2) {
  Xn.length < t2 && (Xn = rt.allocate(t2));
} });
function Wn(t2) {
  return !!t2 && "object" == typeof t2 && "buffer" in t2 && t2.buffer instanceof ArrayBuffer && "number" == typeof t2.byteOffset && "number" == typeof t2.byteLength;
}
var In = class {
  constructor() {
  }
  static urlConstructFrom(t2) {
    const n = "/ws/modeling/commands" + e({ video_res_width: t2.video_res_width, video_res_height: t2.video_res_height, fps: t2.fps, unlocked_framerate: t2.unlocked_framerate, post_effect: t2.post_effect, webrtc: t2.webrtc, pool: t2.pool, show_grid: t2.show_grid, replay: t2.replay, api_call_id: t2.api_call_id, order_independent_transparency: t2.order_independent_transparency, pr: t2.pr }), i = ((t2.client?.baseUrl || "https://api.zoo.dev") + n).replace(/^http/, "ws");
    return new URL(i);
  }
  static authenticate(t2, e2) {
    const n = t2.client && t2.client.token || "";
    if (n) try {
      const t3 = { type: "headers", headers: { Authorization: `Bearer ${n}` } };
      e2.send(JSON.stringify(t3));
    } catch {
    }
  }
  static toBSON(t2) {
    return Vn.serialize(t2);
  }
  static parseMessage(t2) {
    const e2 = t2?.data;
    if ("string" == typeof e2) return JSON.parse(e2);
    if ("undefined" != typeof Buffer && Buffer.isBuffer?.(e2)) {
      const t3 = e2;
      try {
        return JSON.parse(t3.toString("utf8"));
      } catch {
      }
      return Vn.deserialize(t3);
    }
    if (e2 instanceof ArrayBuffer) {
      const t3 = new Uint8Array(e2);
      try {
        const e3 = new TextDecoder().decode(t3);
        return JSON.parse(e3);
      } catch {
      }
      return Vn.deserialize(t3);
    }
    if (Wn(e2)) {
      const t3 = new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength);
      try {
        const e3 = new TextDecoder().decode(t3);
        return JSON.parse(e3);
      } catch {
      }
      return Vn.deserialize(t3);
    }
    return e2;
  }
};
var Cn = null;
try {
  vn = "undefined" != typeof module && "function" == typeof module.require && module.require("worker_threads") || "function" == typeof __non_webpack_require__ && __non_webpack_require__("worker_threads") || "function" == typeof __require && __require("worker_threads");
  Cn = vn.Worker;
} catch (t2) {
}
var vn;
function Mn(t2, e2, n) {
  var i = void 0 === e2 ? null : e2, l = (function(t3, e3) {
    return Buffer.from(t3, "base64").toString(e3 ? "utf16" : "utf8");
  })(t2, void 0 !== n && n), o = l.indexOf("\n", 10) + 1, c = l.substring(o) + (i ? "//# sourceMappingURL=" + i : "");
  return function(t3) {
    return new Cn(c, Object.assign({}, t3, { eval: true }));
  };
}
function jn(t2, e2, n) {
  var i = void 0 === e2 ? null : e2, l = (function(t3, e3) {
    var n2 = atob(t3);
    if (e3) {
      for (var i2 = new Uint8Array(n2.length), l2 = 0, o2 = n2.length; l2 < o2; ++l2) i2[l2] = n2.charCodeAt(l2);
      return new TextDecoder("utf-16le").decode(new Uint16Array(i2.buffer));
    }
    return n2;
  })(t2, void 0 !== n && n), o = l.indexOf("\n", 10) + 1, c = l.substring(o) + (i ? "//# sourceMappingURL=" + i : ""), a = new Blob([c], { type: "application/javascript" });
  return URL.createObjectURL(a);
}
var Pn = "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0);
function Fn(t2, e2, n) {
  return Pn ? Mn(t2, e2, n) : /* @__PURE__ */ (function(t3, e3, n2) {
    var i;
    return function(l) {
      return i = i || jn(t3, e3, n2), new Worker(i, l);
    };
  })(t2, e2, n);
}
var Qn = Fn("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y29uc3QgZT1uZXcgVGV4dEVuY29kZXI7ZnVuY3Rpb24gdCh0LG4scil7dC5sZW5ndGg+NTA/ZnVuY3Rpb24odCxuLHIpe2UuZW5jb2RlSW50byh0LG4uc3ViYXJyYXkocikpfSh0LG4scik6ZnVuY3Rpb24oZSx0LG4pe2NvbnN0IHI9ZS5sZW5ndGg7bGV0IGk9bixvPTA7Zm9yKDtvPHI7KXtsZXQgbj1lLmNoYXJDb2RlQXQobysrKTtpZig0Mjk0OTY3MTY4Jm4pe2lmKDQyOTQ5NjUyNDgmbil7aWYobj49NTUyOTYmJm48PTU2MzE5JiZvPHIpe2NvbnN0IHQ9ZS5jaGFyQ29kZUF0KG8pOzU2MzIwPT0oNjQ1MTImdCkmJigrK28sbj0oKDEwMjMmbik8PDEwKSsoMTAyMyZ0KSs2NTUzNil9NDI5NDkwMTc2MCZuPyh0W2krK109bj4+MTgmN3wyNDAsdFtpKytdPW4+PjEyJjYzfDEyOCx0W2krK109bj4+NiY2M3wxMjgpOih0W2krK109bj4+MTImMTV8MjI0LHRbaSsrXT1uPj42JjYzfDEyOCl9ZWxzZSB0W2krK109bj4+NiYzMXwxOTI7dFtpKytdPTYzJm58MTI4fWVsc2UgdFtpKytdPW59fSh0LG4scil9bmV3IFRleHREZWNvZGVyO2NsYXNzIG57dHlwZTtkYXRhO2NvbnN0cnVjdG9yKGUsdCl7dGhpcy50eXBlPWUsdGhpcy5kYXRhPXR9fWNsYXNzIHIgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihlKXtzdXBlcihlKTtjb25zdCB0PU9iamVjdC5jcmVhdGUoci5wcm90b3R5cGUpO09iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLHQpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCJuYW1lIix7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITEsdmFsdWU6ci5uYW1lfSl9fWZ1bmN0aW9uIGkoZSx0LG4pe2NvbnN0IHI9TWF0aC5mbG9vcihuLzQyOTQ5NjcyOTYpLGk9bjtlLnNldFVpbnQzMih0LHIpLGUuc2V0VWludDMyKHQrNCxpKX1jb25zdCBvPTQyOTQ5NjcyOTUscz0xNzE3OTg2OTE4Mztjb25zdCBhPXt0eXBlOi0xLGVuY29kZTpmdW5jdGlvbihlKXtpZihlIGluc3RhbmNlb2YgRGF0ZSl7cmV0dXJuIGZ1bmN0aW9uKHtzZWM6ZSxuc2VjOnR9KXtpZihlPj0wJiZ0Pj0wJiZlPD1zKXtpZigwPT09dCYmZTw9byl7Y29uc3QgdD1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHQuYnVmZmVyKS5zZXRVaW50MzIoMCxlKSx0fXtjb25zdCBuPWUvNDI5NDk2NzI5NixyPTQyOTQ5NjcyOTUmZSxpPW5ldyBVaW50OEFycmF5KDgpLG89bmV3IERhdGFWaWV3KGkuYnVmZmVyKTtyZXR1cm4gby5zZXRVaW50MzIoMCx0PDwyfDMmbiksby5zZXRVaW50MzIoNCxyKSxpfX17Y29uc3Qgbj1uZXcgVWludDhBcnJheSgxMikscj1uZXcgRGF0YVZpZXcobi5idWZmZXIpO3JldHVybiByLnNldFVpbnQzMigwLHQpLGkociw0LGUpLG59fShmdW5jdGlvbihlKXtjb25zdCB0PWUuZ2V0VGltZSgpLG49TWF0aC5mbG9vcih0LzFlMykscj0xZTYqKHQtMWUzKm4pLGk9TWF0aC5mbG9vcihyLzFlOSk7cmV0dXJue3NlYzpuK2ksbnNlYzpyLTFlOSppfX0oZSkpfXJldHVybiBudWxsfSxkZWNvZGU6ZnVuY3Rpb24oZSl7Y29uc3QgdD1mdW5jdGlvbihlKXtjb25zdCB0PW5ldyBEYXRhVmlldyhlLmJ1ZmZlcixlLmJ5dGVPZmZzZXQsZS5ieXRlTGVuZ3RoKTtzd2l0Y2goZS5ieXRlTGVuZ3RoKXtjYXNlIDQ6cmV0dXJue3NlYzp0LmdldFVpbnQzMigwKSxuc2VjOjB9O2Nhc2UgODp7Y29uc3QgZT10LmdldFVpbnQzMigwKTtyZXR1cm57c2VjOjQyOTQ5NjcyOTYqKDMmZSkrdC5nZXRVaW50MzIoNCksbnNlYzplPj4+Mn19Y2FzZSAxMjp7Y29uc3QgZT1mdW5jdGlvbihlLHQpe3JldHVybiA0Mjk0OTY3Mjk2KmUuZ2V0SW50MzIodCkrZS5nZXRVaW50MzIodCs0KX0odCw0KTtyZXR1cm57c2VjOmUsbnNlYzp0LmdldFVpbnQzMigwKX19ZGVmYXVsdDp0aHJvdyBuZXcgcihgVW5yZWNvZ25pemVkIGRhdGEgc2l6ZSBmb3IgdGltZXN0YW1wIChleHBlY3RlZCA0LCA4LCBvciAxMik6ICR7ZS5sZW5ndGh9YCl9fShlKTtyZXR1cm4gbmV3IERhdGUoMWUzKnQuc2VjK3QubnNlYy8xZTYpfX07Y2xhc3MgY3tzdGF0aWMgZGVmYXVsdENvZGVjPW5ldyBjO19fYnJhbmQ7YnVpbHRJbkVuY29kZXJzPVtdO2J1aWx0SW5EZWNvZGVycz1bXTtlbmNvZGVycz1bXTtkZWNvZGVycz1bXTtjb25zdHJ1Y3Rvcigpe3RoaXMucmVnaXN0ZXIoYSl9cmVnaXN0ZXIoe3R5cGU6ZSxlbmNvZGU6dCxkZWNvZGU6bn0pe2lmKGU+PTApdGhpcy5lbmNvZGVyc1tlXT10LHRoaXMuZGVjb2RlcnNbZV09bjtlbHNle2NvbnN0IHI9LTEtZTt0aGlzLmJ1aWx0SW5FbmNvZGVyc1tyXT10LHRoaXMuYnVpbHRJbkRlY29kZXJzW3JdPW59fXRyeVRvRW5jb2RlKGUsdCl7Zm9yKGxldCByPTA7cjx0aGlzLmJ1aWx0SW5FbmNvZGVycy5sZW5ndGg7cisrKXtjb25zdCBpPXRoaXMuYnVpbHRJbkVuY29kZXJzW3JdO2lmKG51bGwhPWkpe2NvbnN0IG89aShlLHQpO2lmKG51bGwhPW8pe3JldHVybiBuZXcgbigtMS1yLG8pfX19Zm9yKGxldCByPTA7cjx0aGlzLmVuY29kZXJzLmxlbmd0aDtyKyspe2NvbnN0IGk9dGhpcy5lbmNvZGVyc1tyXTtpZihudWxsIT1pKXtjb25zdCBvPWkoZSx0KTtpZihudWxsIT1vKXtyZXR1cm4gbmV3IG4ocixvKX19fXJldHVybiBlIGluc3RhbmNlb2Ygbj9lOm51bGx9ZGVjb2RlKGUsdCxyKXtjb25zdCBpPXQ8MD90aGlzLmJ1aWx0SW5EZWNvZGVyc1stMS10XTp0aGlzLmRlY29kZXJzW3RdO3JldHVybiBpP2koZSx0LHIpOm5ldyBuKHQsZSl9fWZ1bmN0aW9uIGYoZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBVaW50OEFycmF5P2U6QXJyYXlCdWZmZXIuaXNWaWV3KGUpP25ldyBVaW50OEFycmF5KGUuYnVmZmVyLGUuYnl0ZU9mZnNldCxlLmJ5dGVMZW5ndGgpOmZ1bmN0aW9uKGUpe3JldHVybiBlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXJ8fCJ1bmRlZmluZWQiIT10eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXImJmUgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcn0oZSk/bmV3IFVpbnQ4QXJyYXkoZSk6VWludDhBcnJheS5mcm9tKGUpfWNsYXNzIGx7ZXh0ZW5zaW9uQ29kZWM7Y29udGV4dDt1c2VCaWdJbnQ2NDttYXhEZXB0aDtpbml0aWFsQnVmZmVyU2l6ZTtzb3J0S2V5cztmb3JjZUZsb2F0MzI7aWdub3JlVW5kZWZpbmVkO2ZvcmNlSW50ZWdlclRvRmxvYXQ7cG9zO3ZpZXc7Ynl0ZXM7ZW50ZXJlZD0hMTtjb25zdHJ1Y3RvcihlKXt0aGlzLmV4dGVuc2lvbkNvZGVjPWU/LmV4dGVuc2lvbkNvZGVjPz9jLmRlZmF1bHRDb2RlYyx0aGlzLmNvbnRleHQ9ZT8uY29udGV4dCx0aGlzLnVzZUJpZ0ludDY0PWU/LnVzZUJpZ0ludDY0Pz8hMSx0aGlzLm1heERlcHRoPWU/Lm1heERlcHRoPz8xMDAsdGhpcy5pbml0aWFsQnVmZmVyU2l6ZT1lPy5pbml0aWFsQnVmZmVyU2l6ZT8/MjA0OCx0aGlzLnNvcnRLZXlzPWU/LnNvcnRLZXlzPz8hMSx0aGlzLmZvcmNlRmxvYXQzMj1lPy5mb3JjZUZsb2F0MzI/PyExLHRoaXMuaWdub3JlVW5kZWZpbmVkPWU/Lmlnbm9yZVVuZGVmaW5lZD8/ITEsdGhpcy5mb3JjZUludGVnZXJUb0Zsb2F0PWU/LmZvcmNlSW50ZWdlclRvRmxvYXQ/PyExLHRoaXMucG9zPTAsdGhpcy52aWV3PW5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIodGhpcy5pbml0aWFsQnVmZmVyU2l6ZSkpLHRoaXMuYnl0ZXM9bmV3IFVpbnQ4QXJyYXkodGhpcy52aWV3LmJ1ZmZlcil9Y2xvbmUoKXtyZXR1cm4gbmV3IGwoe2V4dGVuc2lvbkNvZGVjOnRoaXMuZXh0ZW5zaW9uQ29kZWMsY29udGV4dDp0aGlzLmNvbnRleHQsdXNlQmlnSW50NjQ6dGhpcy51c2VCaWdJbnQ2NCxtYXhEZXB0aDp0aGlzLm1heERlcHRoLGluaXRpYWxCdWZmZXJTaXplOnRoaXMuaW5pdGlhbEJ1ZmZlclNpemUsc29ydEtleXM6dGhpcy5zb3J0S2V5cyxmb3JjZUZsb2F0MzI6dGhpcy5mb3JjZUZsb2F0MzIsaWdub3JlVW5kZWZpbmVkOnRoaXMuaWdub3JlVW5kZWZpbmVkLGZvcmNlSW50ZWdlclRvRmxvYXQ6dGhpcy5mb3JjZUludGVnZXJUb0Zsb2F0fSl9cmVpbml0aWFsaXplU3RhdGUoKXt0aGlzLnBvcz0wfWVuY29kZVNoYXJlZFJlZihlKXtpZih0aGlzLmVudGVyZWQpe3JldHVybiB0aGlzLmNsb25lKCkuZW5jb2RlU2hhcmVkUmVmKGUpfXRyeXtyZXR1cm4gdGhpcy5lbnRlcmVkPSEwLHRoaXMucmVpbml0aWFsaXplU3RhdGUoKSx0aGlzLmRvRW5jb2RlKGUsMSksdGhpcy5ieXRlcy5zdWJhcnJheSgwLHRoaXMucG9zKX1maW5hbGx5e3RoaXMuZW50ZXJlZD0hMX19ZW5jb2RlKGUpe2lmKHRoaXMuZW50ZXJlZCl7cmV0dXJuIHRoaXMuY2xvbmUoKS5lbmNvZGUoZSl9dHJ5e3JldHVybiB0aGlzLmVudGVyZWQ9ITAsdGhpcy5yZWluaXRpYWxpemVTdGF0ZSgpLHRoaXMuZG9FbmNvZGUoZSwxKSx0aGlzLmJ5dGVzLnNsaWNlKDAsdGhpcy5wb3MpfWZpbmFsbHl7dGhpcy5lbnRlcmVkPSExfX1kb0VuY29kZShlLHQpe2lmKHQ+dGhpcy5tYXhEZXB0aCl0aHJvdyBuZXcgRXJyb3IoYFRvbyBkZWVwIG9iamVjdHMgaW4gZGVwdGggJHt0fWApO251bGw9PWU/dGhpcy5lbmNvZGVOaWwoKToiYm9vbGVhbiI9PXR5cGVvZiBlP3RoaXMuZW5jb2RlQm9vbGVhbihlKToibnVtYmVyIj09dHlwZW9mIGU/dGhpcy5mb3JjZUludGVnZXJUb0Zsb2F0P3RoaXMuZW5jb2RlTnVtYmVyQXNGbG9hdChlKTp0aGlzLmVuY29kZU51bWJlcihlKToic3RyaW5nIj09dHlwZW9mIGU/dGhpcy5lbmNvZGVTdHJpbmcoZSk6dGhpcy51c2VCaWdJbnQ2NCYmImJpZ2ludCI9PXR5cGVvZiBlP3RoaXMuZW5jb2RlQmlnSW50NjQoZSk6dGhpcy5lbmNvZGVPYmplY3QoZSx0KX1lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZShlKXtjb25zdCB0PXRoaXMucG9zK2U7dGhpcy52aWV3LmJ5dGVMZW5ndGg8dCYmdGhpcy5yZXNpemVCdWZmZXIoMip0KX1yZXNpemVCdWZmZXIoZSl7Y29uc3QgdD1uZXcgQXJyYXlCdWZmZXIoZSksbj1uZXcgVWludDhBcnJheSh0KSxyPW5ldyBEYXRhVmlldyh0KTtuLnNldCh0aGlzLmJ5dGVzKSx0aGlzLnZpZXc9cix0aGlzLmJ5dGVzPW59ZW5jb2RlTmlsKCl7dGhpcy53cml0ZVU4KDE5Mil9ZW5jb2RlQm9vbGVhbihlKXshMT09PWU/dGhpcy53cml0ZVU4KDE5NCk6dGhpcy53cml0ZVU4KDE5NSl9ZW5jb2RlTnVtYmVyKGUpeyF0aGlzLmZvcmNlSW50ZWdlclRvRmxvYXQmJk51bWJlci5pc1NhZmVJbnRlZ2VyKGUpP2U+PTA/ZTwxMjg/dGhpcy53cml0ZVU4KGUpOmU8MjU2Pyh0aGlzLndyaXRlVTgoMjA0KSx0aGlzLndyaXRlVTgoZSkpOmU8NjU1MzY/KHRoaXMud3JpdGVVOCgyMDUpLHRoaXMud3JpdGVVMTYoZSkpOmU8NDI5NDk2NzI5Nj8odGhpcy53cml0ZVU4KDIwNiksdGhpcy53cml0ZVUzMihlKSk6dGhpcy51c2VCaWdJbnQ2ND90aGlzLmVuY29kZU51bWJlckFzRmxvYXQoZSk6KHRoaXMud3JpdGVVOCgyMDcpLHRoaXMud3JpdGVVNjQoZSkpOmU+PS0zMj90aGlzLndyaXRlVTgoMjI0fGUrMzIpOmU+PS0xMjg/KHRoaXMud3JpdGVVOCgyMDgpLHRoaXMud3JpdGVJOChlKSk6ZT49LTMyNzY4Pyh0aGlzLndyaXRlVTgoMjA5KSx0aGlzLndyaXRlSTE2KGUpKTplPj0tMjE0NzQ4MzY0OD8odGhpcy53cml0ZVU4KDIxMCksdGhpcy53cml0ZUkzMihlKSk6dGhpcy51c2VCaWdJbnQ2ND90aGlzLmVuY29kZU51bWJlckFzRmxvYXQoZSk6KHRoaXMud3JpdGVVOCgyMTEpLHRoaXMud3JpdGVJNjQoZSkpOnRoaXMuZW5jb2RlTnVtYmVyQXNGbG9hdChlKX1lbmNvZGVOdW1iZXJBc0Zsb2F0KGUpe3RoaXMuZm9yY2VGbG9hdDMyPyh0aGlzLndyaXRlVTgoMjAyKSx0aGlzLndyaXRlRjMyKGUpKToodGhpcy53cml0ZVU4KDIwMyksdGhpcy53cml0ZUY2NChlKSl9ZW5jb2RlQmlnSW50NjQoZSl7ZT49QmlnSW50KDApPyh0aGlzLndyaXRlVTgoMjA3KSx0aGlzLndyaXRlQmlnVWludDY0KGUpKToodGhpcy53cml0ZVU4KDIxMSksdGhpcy53cml0ZUJpZ0ludDY0KGUpKX13cml0ZVN0cmluZ0hlYWRlcihlKXtpZihlPDMyKXRoaXMud3JpdGVVOCgxNjArZSk7ZWxzZSBpZihlPDI1Nil0aGlzLndyaXRlVTgoMjE3KSx0aGlzLndyaXRlVTgoZSk7ZWxzZSBpZihlPDY1NTM2KXRoaXMud3JpdGVVOCgyMTgpLHRoaXMud3JpdGVVMTYoZSk7ZWxzZXtpZighKGU8NDI5NDk2NzI5NikpdGhyb3cgbmV3IEVycm9yKGBUb28gbG9uZyBzdHJpbmc6ICR7ZX0gYnl0ZXMgaW4gVVRGLThgKTt0aGlzLndyaXRlVTgoMjE5KSx0aGlzLndyaXRlVTMyKGUpfX1lbmNvZGVTdHJpbmcoZSl7Y29uc3Qgbj1mdW5jdGlvbihlKXtjb25zdCB0PWUubGVuZ3RoO2xldCBuPTAscj0wO2Zvcig7cjx0Oyl7bGV0IGk9ZS5jaGFyQ29kZUF0KHIrKyk7aWYoNDI5NDk2NzE2OCZpKWlmKDQyOTQ5NjUyNDgmaSl7aWYoaT49NTUyOTYmJmk8PTU2MzE5JiZyPHQpe2NvbnN0IHQ9ZS5jaGFyQ29kZUF0KHIpOzU2MzIwPT0oNjQ1MTImdCkmJigrK3IsaT0oKDEwMjMmaSk8PDEwKSsoMTAyMyZ0KSs2NTUzNil9bis9NDI5NDkwMTc2MCZpPzQ6M31lbHNlIG4rPTI7ZWxzZSBuKyt9cmV0dXJuIG59KGUpO3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoNStuKSx0aGlzLndyaXRlU3RyaW5nSGVhZGVyKG4pLHQoZSx0aGlzLmJ5dGVzLHRoaXMucG9zKSx0aGlzLnBvcys9bn1lbmNvZGVPYmplY3QoZSx0KXtjb25zdCBuPXRoaXMuZXh0ZW5zaW9uQ29kZWMudHJ5VG9FbmNvZGUoZSx0aGlzLmNvbnRleHQpO2lmKG51bGwhPW4pdGhpcy5lbmNvZGVFeHRlbnNpb24obik7ZWxzZSBpZihBcnJheS5pc0FycmF5KGUpKXRoaXMuZW5jb2RlQXJyYXkoZSx0KTtlbHNlIGlmKEFycmF5QnVmZmVyLmlzVmlldyhlKSl0aGlzLmVuY29kZUJpbmFyeShlKTtlbHNle2lmKCJvYmplY3QiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoYFVucmVjb2duaXplZCBvYmplY3Q6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShlKX1gKTt0aGlzLmVuY29kZU1hcChlLHQpfX1lbmNvZGVCaW5hcnkoZSl7Y29uc3QgdD1lLmJ5dGVMZW5ndGg7aWYodDwyNTYpdGhpcy53cml0ZVU4KDE5NiksdGhpcy53cml0ZVU4KHQpO2Vsc2UgaWYodDw2NTUzNil0aGlzLndyaXRlVTgoMTk3KSx0aGlzLndyaXRlVTE2KHQpO2Vsc2V7aWYoISh0PDQyOTQ5NjcyOTYpKXRocm93IG5ldyBFcnJvcihgVG9vIGxhcmdlIGJpbmFyeTogJHt0fWApO3RoaXMud3JpdGVVOCgxOTgpLHRoaXMud3JpdGVVMzIodCl9Y29uc3Qgbj1mKGUpO3RoaXMud3JpdGVVOGEobil9ZW5jb2RlQXJyYXkoZSx0KXtjb25zdCBuPWUubGVuZ3RoO2lmKG48MTYpdGhpcy53cml0ZVU4KDE0NCtuKTtlbHNlIGlmKG48NjU1MzYpdGhpcy53cml0ZVU4KDIyMCksdGhpcy53cml0ZVUxNihuKTtlbHNle2lmKCEobjw0Mjk0OTY3Mjk2KSl0aHJvdyBuZXcgRXJyb3IoYFRvbyBsYXJnZSBhcnJheTogJHtufWApO3RoaXMud3JpdGVVOCgyMjEpLHRoaXMud3JpdGVVMzIobil9Zm9yKGNvbnN0IG4gb2YgZSl0aGlzLmRvRW5jb2RlKG4sdCsxKX1jb3VudFdpdGhvdXRVbmRlZmluZWQoZSx0KXtsZXQgbj0wO2Zvcihjb25zdCByIG9mIHQpdm9pZCAwIT09ZVtyXSYmbisrO3JldHVybiBufWVuY29kZU1hcChlLHQpe2NvbnN0IG49T2JqZWN0LmtleXMoZSk7dGhpcy5zb3J0S2V5cyYmbi5zb3J0KCk7Y29uc3Qgcj10aGlzLmlnbm9yZVVuZGVmaW5lZD90aGlzLmNvdW50V2l0aG91dFVuZGVmaW5lZChlLG4pOm4ubGVuZ3RoO2lmKHI8MTYpdGhpcy53cml0ZVU4KDEyOCtyKTtlbHNlIGlmKHI8NjU1MzYpdGhpcy53cml0ZVU4KDIyMiksdGhpcy53cml0ZVUxNihyKTtlbHNle2lmKCEocjw0Mjk0OTY3Mjk2KSl0aHJvdyBuZXcgRXJyb3IoYFRvbyBsYXJnZSBtYXAgb2JqZWN0OiAke3J9YCk7dGhpcy53cml0ZVU4KDIyMyksdGhpcy53cml0ZVUzMihyKX1mb3IoY29uc3QgciBvZiBuKXtjb25zdCBuPWVbcl07dGhpcy5pZ25vcmVVbmRlZmluZWQmJnZvaWQgMD09PW58fCh0aGlzLmVuY29kZVN0cmluZyhyKSx0aGlzLmRvRW5jb2RlKG4sdCsxKSl9fWVuY29kZUV4dGVuc2lvbihlKXtpZigiZnVuY3Rpb24iPT10eXBlb2YgZS5kYXRhKXtjb25zdCB0PWUuZGF0YSh0aGlzLnBvcys2KSxuPXQubGVuZ3RoO2lmKG4+PTQyOTQ5NjcyOTYpdGhyb3cgbmV3IEVycm9yKGBUb28gbGFyZ2UgZXh0ZW5zaW9uIG9iamVjdDogJHtufWApO3JldHVybiB0aGlzLndyaXRlVTgoMjAxKSx0aGlzLndyaXRlVTMyKG4pLHRoaXMud3JpdGVJOChlLnR5cGUpLHZvaWQgdGhpcy53cml0ZVU4YSh0KX1jb25zdCB0PWUuZGF0YS5sZW5ndGg7aWYoMT09PXQpdGhpcy53cml0ZVU4KDIxMik7ZWxzZSBpZigyPT09dCl0aGlzLndyaXRlVTgoMjEzKTtlbHNlIGlmKDQ9PT10KXRoaXMud3JpdGVVOCgyMTQpO2Vsc2UgaWYoOD09PXQpdGhpcy53cml0ZVU4KDIxNSk7ZWxzZSBpZigxNj09PXQpdGhpcy53cml0ZVU4KDIxNik7ZWxzZSBpZih0PDI1Nil0aGlzLndyaXRlVTgoMTk5KSx0aGlzLndyaXRlVTgodCk7ZWxzZSBpZih0PDY1NTM2KXRoaXMud3JpdGVVOCgyMDApLHRoaXMud3JpdGVVMTYodCk7ZWxzZXtpZighKHQ8NDI5NDk2NzI5NikpdGhyb3cgbmV3IEVycm9yKGBUb28gbGFyZ2UgZXh0ZW5zaW9uIG9iamVjdDogJHt0fWApO3RoaXMud3JpdGVVOCgyMDEpLHRoaXMud3JpdGVVMzIodCl9dGhpcy53cml0ZUk4KGUudHlwZSksdGhpcy53cml0ZVU4YShlLmRhdGEpfXdyaXRlVTgoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSgxKSx0aGlzLnZpZXcuc2V0VWludDgodGhpcy5wb3MsZSksdGhpcy5wb3MrK313cml0ZVU4YShlKXtjb25zdCB0PWUubGVuZ3RoO3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUodCksdGhpcy5ieXRlcy5zZXQoZSx0aGlzLnBvcyksdGhpcy5wb3MrPXR9d3JpdGVJOChlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDEpLHRoaXMudmlldy5zZXRJbnQ4KHRoaXMucG9zLGUpLHRoaXMucG9zKyt9d3JpdGVVMTYoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSgyKSx0aGlzLnZpZXcuc2V0VWludDE2KHRoaXMucG9zLGUpLHRoaXMucG9zKz0yfXdyaXRlSTE2KGUpe3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoMiksdGhpcy52aWV3LnNldEludDE2KHRoaXMucG9zLGUpLHRoaXMucG9zKz0yfXdyaXRlVTMyKGUpe3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoNCksdGhpcy52aWV3LnNldFVpbnQzMih0aGlzLnBvcyxlKSx0aGlzLnBvcys9NH13cml0ZUkzMihlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDQpLHRoaXMudmlldy5zZXRJbnQzMih0aGlzLnBvcyxlKSx0aGlzLnBvcys9NH13cml0ZUYzMihlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDQpLHRoaXMudmlldy5zZXRGbG9hdDMyKHRoaXMucG9zLGUpLHRoaXMucG9zKz00fXdyaXRlRjY0KGUpe3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoOCksdGhpcy52aWV3LnNldEZsb2F0NjQodGhpcy5wb3MsZSksdGhpcy5wb3MrPTh9d3JpdGVVNjQoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSg4KSxmdW5jdGlvbihlLHQsbil7Y29uc3Qgcj1uLzQyOTQ5NjcyOTYsaT1uO2Uuc2V0VWludDMyKHQsciksZS5zZXRVaW50MzIodCs0LGkpfSh0aGlzLnZpZXcsdGhpcy5wb3MsZSksdGhpcy5wb3MrPTh9d3JpdGVJNjQoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSg4KSxpKHRoaXMudmlldyx0aGlzLnBvcyxlKSx0aGlzLnBvcys9OH13cml0ZUJpZ1VpbnQ2NChlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDgpLHRoaXMudmlldy5zZXRCaWdVaW50NjQodGhpcy5wb3MsZSksdGhpcy5wb3MrPTh9d3JpdGVCaWdJbnQ2NChlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDgpLHRoaXMudmlldy5zZXRCaWdJbnQ2NCh0aGlzLnBvcyxlKSx0aGlzLnBvcys9OH19dHJ5e2lmKCJ1bmRlZmluZWQiPT10eXBlb2YgZmV0Y2gmJiJ1bmRlZmluZWQiIT10eXBlb2YgcHJvY2VzcyYmcHJvY2Vzcy52ZXJzaW9ucz8ubm9kZSl7bmV3IEZ1bmN0aW9uKCJtIiwicmV0dXJuIGltcG9ydChtKSIpKCJjcm9zcy1mZXRjaC9wb2x5ZmlsbCIpLmNhdGNoKCgoKT0+e30pKX19Y2F0Y2h7fXRyeXtpZigidW5kZWZpbmVkIiE9dHlwZW9mIHByb2Nlc3MmJnByb2Nlc3MudmVyc2lvbnM/Lm5vZGUmJiJ3aW4zMiI9PT1wcm9jZXNzLnBsYXRmb3JtKXtuZXcgRnVuY3Rpb24oIm0iLCJyZXR1cm4gaW1wb3J0KG0pIikoIndpbi1jYSIpfX1jYXRjaHt9Y29uc3QgdT0oKCk9Pntjb25zdCBlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkucHJvdG90eXBlKSxTeW1ib2wudG9TdHJpbmdUYWcpLmdldDtyZXR1cm4gdD0+ZS5jYWxsKHQpfSkoKTtmdW5jdGlvbiBfKGUpe3JldHVybiJVaW50OEFycmF5Ij09PXUoZSl9ZnVuY3Rpb24gZyhlKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIGUmJm51bGwhPWUmJlN5bWJvbC50b1N0cmluZ1RhZyBpbiBlJiYoIkFycmF5QnVmZmVyIj09PWVbU3ltYm9sLnRvU3RyaW5nVGFnXXx8IlNoYXJlZEFycmF5QnVmZmVyIj09PWVbU3ltYm9sLnRvU3RyaW5nVGFnXSl9ZnVuY3Rpb24gaChlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIFJlZ0V4cHx8IltvYmplY3QgUmVnRXhwXSI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9ZnVuY3Rpb24gYihlKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIGUmJm51bGwhPWUmJlN5bWJvbC50b1N0cmluZ1RhZyBpbiBlJiYiTWFwIj09PWVbU3ltYm9sLnRvU3RyaW5nVGFnXX1mdW5jdGlvbiBkKGUpe3JldHVybiBlIGluc3RhbmNlb2YgRGF0ZXx8IltvYmplY3QgRGF0ZV0iPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfWZ1bmN0aW9uIHcoZSx0KXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSwoKGUsdCk9PiJiaWdpbnQiPT10eXBlb2YgdD97JG51bWJlckxvbmc6YCR7dH1gfTpiKHQpP09iamVjdC5mcm9tRW50cmllcyh0KTp0KSl9Y29uc3QgcD03LHk9U3ltYm9sLmZvcigiQEBtZGIuYnNvbi52ZXJzaW9uIiksbT0yMTQ3NDgzNjQ3LFM9LTIxNDc0ODM2NDgsQj1NYXRoLnBvdygyLDYzKS0xLHg9LU1hdGgucG93KDIsNjMpLEU9TWF0aC5wb3coMiw1MyksVT0tTWF0aC5wb3coMiw1MyksTz0xLE49MixJPTMsdj00LFQ9NSwkPTYsTD03LEE9OCxSPTksaj0xMCxGPTExLGs9MTIsej0xMyxEPTE0LEM9MTUsTT0xNixWPTE3LFA9MTgsSj0xOSxXPTI1NSxZPTEyNyxxPTAsSD00LEs9T2JqZWN0LmZyZWV6ZSh7ZG91YmxlOjEsc3RyaW5nOjIsb2JqZWN0OjMsYXJyYXk6NCxiaW5EYXRhOjUsdW5kZWZpbmVkOjYsb2JqZWN0SWQ6Nyxib29sOjgsZGF0ZTo5LG51bGw6MTAscmVnZXg6MTEsZGJQb2ludGVyOjEyLGphdmFzY3JpcHQ6MTMsc3ltYm9sOjE0LGphdmFzY3JpcHRXaXRoU2NvcGU6MTUsaW50OjE2LHRpbWVzdGFtcDoxNyxsb25nOjE4LGRlY2ltYWw6MTksbWluS2V5Oi0xLG1heEtleToxMjd9KTtjbGFzcyBaIGV4dGVuZHMgRXJyb3J7Z2V0IGJzb25FcnJvcigpe3JldHVybiEwfWdldCBuYW1lKCl7cmV0dXJuIkJTT05FcnJvciJ9Y29uc3RydWN0b3IoZSx0KXtzdXBlcihlLHQpfXN0YXRpYyBpc0JTT05FcnJvcihlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiYnNvbkVycm9yImluIGUmJiEwPT09ZS5ic29uRXJyb3ImJiJuYW1lImluIGUmJiJtZXNzYWdlImluIGUmJiJzdGFjayJpbiBlfX1jbGFzcyBHIGV4dGVuZHMgWntnZXQgbmFtZSgpe3JldHVybiJCU09OVmVyc2lvbkVycm9yIn1jb25zdHJ1Y3Rvcigpe3N1cGVyKGBVbnN1cHBvcnRlZCBCU09OIHZlcnNpb24sIGJzb24gdHlwZXMgbXVzdCBiZSBmcm9tIGJzb24gJHtwfS54LnhgKX19Y2xhc3MgWCBleHRlbmRzIFp7Z2V0IG5hbWUoKXtyZXR1cm4iQlNPTlJ1bnRpbWVFcnJvciJ9Y29uc3RydWN0b3IoZSl7c3VwZXIoZSl9fWNsYXNzIFEgZXh0ZW5kcyBae2dldCBuYW1lKCl7cmV0dXJuIkJTT05PZmZzZXRFcnJvciJ9b2Zmc2V0O2NvbnN0cnVjdG9yKGUsdCxuKXtzdXBlcihgJHtlfS4gb2Zmc2V0OiAke3R9YCxuKSx0aGlzLm9mZnNldD10fX1sZXQgZWUsdGU7ZnVuY3Rpb24gbmUoZSx0LG4scil7aWYocil7ZWU/Pz1uZXcgVGV4dERlY29kZXIoInV0ZjgiLHtmYXRhbDohMH0pO3RyeXtyZXR1cm4gZWUuZGVjb2RlKGUuc3ViYXJyYXkodCxuKSl9Y2F0Y2goZSl7dGhyb3cgbmV3IFooIkludmFsaWQgVVRGLTggc3RyaW5nIGluIEJTT04gZG9jdW1lbnQiLHtjYXVzZTplfSl9fXJldHVybiB0ZT8/PW5ldyBUZXh0RGVjb2RlcigidXRmOCIse2ZhdGFsOiExfSksdGUuZGVjb2RlKGUuc3ViYXJyYXkodCxuKSl9ZnVuY3Rpb24gcmUoZSx0LG4pe2lmKDA9PT1lLmxlbmd0aClyZXR1cm4iIjtjb25zdCByPW4tdDtpZigwPT09cilyZXR1cm4iIjtpZihyPjIwKXJldHVybiBudWxsO2lmKDE9PT1yJiZlW3RdPDEyOClyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlW3RdKTtpZigyPT09ciYmZVt0XTwxMjgmJmVbdCsxXTwxMjgpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZVt0XSkrU3RyaW5nLmZyb21DaGFyQ29kZShlW3QrMV0pO2lmKDM9PT1yJiZlW3RdPDEyOCYmZVt0KzFdPDEyOCYmZVt0KzJdPDEyOClyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlW3RdKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbdCsxXSkrU3RyaW5nLmZyb21DaGFyQ29kZShlW3QrMl0pO2NvbnN0IGk9W107Zm9yKGxldCByPXQ7cjxuO3IrKyl7Y29uc3QgdD1lW3JdO2lmKHQ+MTI3KXJldHVybiBudWxsO2kucHVzaCh0KX1yZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5pKX1mdW5jdGlvbiBpZShlKXtyZXR1cm4gYWUuZnJvbU51bWJlckFycmF5KEFycmF5LmZyb20oe2xlbmd0aDplfSwoKCk9Pk1hdGguZmxvb3IoMjU2Kk1hdGgucmFuZG9tKCkpKSkpfWZ1bmN0aW9uIG9lKGUpe3JldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFlLmFsbG9jYXRlKGUpKX1jb25zdCBzZT0oKCk9Pntjb25zdHtjcnlwdG86ZX09Z2xvYmFsVGhpcztyZXR1cm4gbnVsbCE9ZSYmImZ1bmN0aW9uIj09dHlwZW9mIGUuZ2V0UmFuZG9tVmFsdWVzP29lOmllfSkoKSxhZT17aXNVaW50OEFycmF5Ol8sdG9Mb2NhbEJ1ZmZlclR5cGUoZSl7aWYoQnVmZmVyLmlzQnVmZmVyKGUpKXJldHVybiBlO2lmKEFycmF5QnVmZmVyLmlzVmlldyhlKSlyZXR1cm4gQnVmZmVyLmZyb20oZS5idWZmZXIsZS5ieXRlT2Zmc2V0LGUuYnl0ZUxlbmd0aCk7Y29uc3QgdD1lPy5bU3ltYm9sLnRvU3RyaW5nVGFnXT8/T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpO2lmKCJBcnJheUJ1ZmZlciI9PT10fHwiU2hhcmVkQXJyYXlCdWZmZXIiPT09dHx8IltvYmplY3QgQXJyYXlCdWZmZXJdIj09PXR8fCJbb2JqZWN0IFNoYXJlZEFycmF5QnVmZmVyXSI9PT10KXJldHVybiBCdWZmZXIuZnJvbShlKTt0aHJvdyBuZXcgWigiQ2Fubm90IGNyZWF0ZSBCdWZmZXIgZnJvbSB0aGUgcGFzc2VkIHBvdGVudGlhbEJ1ZmZlci4iKX0sYWxsb2NhdGU6ZT0+QnVmZmVyLmFsbG9jKGUpLGFsbG9jYXRlVW5zYWZlOmU9PkJ1ZmZlci5hbGxvY1Vuc2FmZShlKSxjb21wYXJlOihlLHQpPT5hZS50b0xvY2FsQnVmZmVyVHlwZShlKS5jb21wYXJlKHQpLGNvbmNhdDplPT5CdWZmZXIuY29uY2F0KGUpLGNvcHk6KGUsdCxuLHIsaSk9PmFlLnRvTG9jYWxCdWZmZXJUeXBlKGUpLmNvcHkodCxuPz8wLHI/PzAsaT8/ZS5sZW5ndGgpLGVxdWFsczooZSx0KT0+YWUudG9Mb2NhbEJ1ZmZlclR5cGUoZSkuZXF1YWxzKHQpLGZyb21OdW1iZXJBcnJheTplPT5CdWZmZXIuZnJvbShlKSxmcm9tQmFzZTY0OmU9PkJ1ZmZlci5mcm9tKGUsImJhc2U2NCIpLGZyb21VVEY4OmU9PkJ1ZmZlci5mcm9tKGUsInV0ZjgiKSx0b0Jhc2U2NDplPT5hZS50b0xvY2FsQnVmZmVyVHlwZShlKS50b1N0cmluZygiYmFzZTY0IiksZnJvbUlTTzg4NTkxOmU9PkJ1ZmZlci5mcm9tKGUsImJpbmFyeSIpLHRvSVNPODg1OTE6ZT0+YWUudG9Mb2NhbEJ1ZmZlclR5cGUoZSkudG9TdHJpbmcoImJpbmFyeSIpLGZyb21IZXg6ZT0+QnVmZmVyLmZyb20oZSwiaGV4IiksdG9IZXg6ZT0+YWUudG9Mb2NhbEJ1ZmZlclR5cGUoZSkudG9TdHJpbmcoImhleCIpLHRvVVRGOChlLHQsbixyKXtjb25zdCBpPW4tdDw9MjA/cmUoZSx0LG4pOm51bGw7aWYobnVsbCE9aSlyZXR1cm4gaTtjb25zdCBvPWFlLnRvTG9jYWxCdWZmZXJUeXBlKGUpLnRvU3RyaW5nKCJ1dGY4Iix0LG4pO2lmKHIpZm9yKGxldCByPTA7cjxvLmxlbmd0aDtyKyspaWYoNjU1MzM9PT1vLmNoYXJDb2RlQXQocikpe25lKGUsdCxuLCEwKTticmVha31yZXR1cm4gb30sdXRmOEJ5dGVMZW5ndGg6ZT0+QnVmZmVyLmJ5dGVMZW5ndGgoZSwidXRmOCIpLGVuY29kZVVURjhJbnRvKGUsdCxuKXtjb25zdCByPWZ1bmN0aW9uKGUsdCxuKXtpZigwPT09dC5sZW5ndGgpcmV0dXJuIDA7aWYodC5sZW5ndGg+MjUpcmV0dXJuIG51bGw7aWYoZS5sZW5ndGgtbjx0Lmxlbmd0aClyZXR1cm4gbnVsbDtmb3IobGV0IHI9MCxpPW47cjx0Lmxlbmd0aDtyKyssaSsrKXtjb25zdCBuPXQuY2hhckNvZGVBdChyKTtpZihuPjEyNylyZXR1cm4gbnVsbDtlW2ldPW59cmV0dXJuIHQubGVuZ3RofShlLHQsbik7cmV0dXJuIG51bGwhPXI/cjphZS50b0xvY2FsQnVmZmVyVHlwZShlKS53cml0ZSh0LG4sdm9pZCAwLCJ1dGY4Iil9LHJhbmRvbUJ5dGVzOnNlLHN3YXAzMjplPT5hZS50b0xvY2FsQnVmZmVyVHlwZShlKS5zd2FwMzIoKX07ZnVuY3Rpb24gY2UoZSl7aWYoZTwwKXRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgYXJndW1lbnQgJ2J5dGVMZW5ndGgnIGlzIGludmFsaWQuIFJlY2VpdmVkICR7ZX1gKTtyZXR1cm4gdWUuZnJvbU51bWJlckFycmF5KEFycmF5LmZyb20oe2xlbmd0aDplfSwoKCk9Pk1hdGguZmxvb3IoMjU2Kk1hdGgucmFuZG9tKCkpKSkpfWNvbnN0IGZlPSgoKT0+e2NvbnN0e2NyeXB0bzplfT1nbG9iYWxUaGlzO2lmKG51bGwhPWUmJiJmdW5jdGlvbiI9PXR5cGVvZiBlLmdldFJhbmRvbVZhbHVlcylyZXR1cm4gdD0+ZS5nZXRSYW5kb21WYWx1ZXModWUuYWxsb2NhdGUodCkpO2lmKGZ1bmN0aW9uKCl7Y29uc3R7bmF2aWdhdG9yOmV9PWdsb2JhbFRoaXM7cmV0dXJuIm9iamVjdCI9PXR5cGVvZiBlJiYiUmVhY3ROYXRpdmUiPT09ZS5wcm9kdWN0fSgpKXtjb25zdHtjb25zb2xlOmV9PWdsb2JhbFRoaXM7ZT8ud2Fybj8uKCJCU09OOiBGb3IgUmVhY3QgTmF0aXZlIHBsZWFzZSBwb2x5ZmlsbCBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLCBlLmcuIHVzaW5nOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9yZWFjdC1uYXRpdmUtZ2V0LXJhbmRvbS12YWx1ZXMuIil9cmV0dXJuIGNlfSkoKSxsZT0vKFxkfFthLWZdKS9pLHVlPXtpc1VpbnQ4QXJyYXk6Xyx0b0xvY2FsQnVmZmVyVHlwZShlKXtjb25zdCB0PWU/LltTeW1ib2wudG9TdHJpbmdUYWddPz9PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk7aWYoIlVpbnQ4QXJyYXkiPT09dClyZXR1cm4gZTtpZihBcnJheUJ1ZmZlci5pc1ZpZXcoZSkpcmV0dXJuIG5ldyBVaW50OEFycmF5KGUuYnVmZmVyLnNsaWNlKGUuYnl0ZU9mZnNldCxlLmJ5dGVPZmZzZXQrZS5ieXRlTGVuZ3RoKSk7aWYoIkFycmF5QnVmZmVyIj09PXR8fCJTaGFyZWRBcnJheUJ1ZmZlciI9PT10fHwiW29iamVjdCBBcnJheUJ1ZmZlcl0iPT09dHx8IltvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdIj09PXQpcmV0dXJuIG5ldyBVaW50OEFycmF5KGUpO3Rocm93IG5ldyBaKCJDYW5ub3QgbWFrZSBhIFVpbnQ4QXJyYXkgZnJvbSBwYXNzZWQgcG90ZW50aWFsQnVmZmVyLiIpfSxhbGxvY2F0ZShlKXtpZigibnVtYmVyIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICJzaXplIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCAke1N0cmluZyhlKX1gKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LGFsbG9jYXRlVW5zYWZlOmU9PnVlLmFsbG9jYXRlKGUpLGNvbXBhcmUoZSx0KXtpZihlPT09dClyZXR1cm4gMDtjb25zdCBuPU1hdGgubWluKGUubGVuZ3RoLHQubGVuZ3RoKTtmb3IobGV0IHI9MDtyPG47cisrKXtpZihlW3JdPHRbcl0pcmV0dXJuLTE7aWYoZVtyXT50W3JdKXJldHVybiAxfXJldHVybiBlLmxlbmd0aDx0Lmxlbmd0aD8tMTplLmxlbmd0aD50Lmxlbmd0aD8xOjB9LGNvbmNhdChlKXtpZigwPT09ZS5sZW5ndGgpcmV0dXJuIHVlLmFsbG9jYXRlKDApO2xldCB0PTA7Zm9yKGNvbnN0IG4gb2YgZSl0Kz1uLmxlbmd0aDtjb25zdCBuPXVlLmFsbG9jYXRlKHQpO2xldCByPTA7Zm9yKGNvbnN0IHQgb2YgZSluLnNldCh0LHIpLHIrPXQubGVuZ3RoO3JldHVybiBufSxjb3B5KGUsdCxuLHIsaSl7aWYodm9pZCAwIT09aSYmaTwwKXRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgdmFsdWUgb2YgInNvdXJjZUVuZCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlID49IDAuIFJlY2VpdmVkICR7aX1gKTtpZihpPWk/P2UubGVuZ3RoLHZvaWQgMCE9PXImJihyPDB8fHI+aSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFRoZSB2YWx1ZSBvZiAic291cmNlU3RhcnQiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSA+PSAwIGFuZCA8PSAke2l9LiBSZWNlaXZlZCAke3J9YCk7aWYocj1yPz8wLHZvaWQgMCE9PW4mJm48MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihgVGhlIHZhbHVlIG9mICJ0YXJnZXRTdGFydCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlID49IDAuIFJlY2VpdmVkICR7bn1gKTtuPW4/PzA7Y29uc3Qgbz1lLnN1YmFycmF5KHIsaSkscz1NYXRoLm1pbihvLmxlbmd0aCx0Lmxlbmd0aC1uKTtyZXR1cm4gczw9MD8wOih0LnNldChvLnN1YmFycmF5KDAscyksbikscyl9LGVxdWFscyhlLHQpe2lmKGUuYnl0ZUxlbmd0aCE9PXQuYnl0ZUxlbmd0aClyZXR1cm4hMTtmb3IobGV0IG49MDtuPGUuYnl0ZUxlbmd0aDtuKyspaWYoZVtuXSE9PXRbbl0pcmV0dXJuITE7cmV0dXJuITB9LGZyb21OdW1iZXJBcnJheTplPT5VaW50OEFycmF5LmZyb20oZSksZnJvbUJhc2U2NDplPT5VaW50OEFycmF5LmZyb20oYXRvYihlKSwoZT0+ZS5jaGFyQ29kZUF0KDApKSksZnJvbVVURjg6ZT0+KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKGUpLHRvQmFzZTY0OmU9PmJ0b2EodWUudG9JU084ODU5MShlKSksZnJvbUlTTzg4NTkxOmU9PlVpbnQ4QXJyYXkuZnJvbShlLChlPT4yNTUmZS5jaGFyQ29kZUF0KDApKSksdG9JU084ODU5MTplPT5BcnJheS5mcm9tKFVpbnQxNkFycmF5LmZyb20oZSksKGU9PlN0cmluZy5mcm9tQ2hhckNvZGUoZSkpKS5qb2luKCIiKSxmcm9tSGV4KGUpe2NvbnN0IHQ9ZS5sZW5ndGglMj09MD9lOmUuc2xpY2UoMCxlLmxlbmd0aC0xKSxuPVtdO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSs9Mil7Y29uc3Qgcj10W2VdLGk9dFtlKzFdO2lmKCFsZS50ZXN0KHIpKWJyZWFrO2lmKCFsZS50ZXN0KGkpKWJyZWFrO2NvbnN0IG89TnVtYmVyLnBhcnNlSW50KGAke3J9JHtpfWAsMTYpO24ucHVzaChvKX1yZXR1cm4gVWludDhBcnJheS5mcm9tKG4pfSx0b0hleDplPT5BcnJheS5mcm9tKGUsKGU9PmUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIjAiKSkpLmpvaW4oIiIpLHRvVVRGOChlLHQsbixyKXtjb25zdCBpPW4tdDw9MjA/cmUoZSx0LG4pOm51bGw7cmV0dXJuIG51bGwhPWk/aTpuZShlLHQsbixyKX0sdXRmOEJ5dGVMZW5ndGg6ZT0+KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKGUpLmJ5dGVMZW5ndGgsZW5jb2RlVVRGOEludG8oZSx0LG4pe2NvbnN0IHI9KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKHQpO3JldHVybiBlLnNldChyLG4pLHIuYnl0ZUxlbmd0aH0scmFuZG9tQnl0ZXM6ZmUsc3dhcDMyKGUpe2lmKGUubGVuZ3RoJTQhPTApdGhyb3cgbmV3IFJhbmdlRXJyb3IoIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzIik7Zm9yKGxldCB0PTA7dDxlLmxlbmd0aDt0Kz00KXtjb25zdCBuPWVbdF0scj1lW3QrMV0saT1lW3QrMl0sbz1lW3QrM107ZVt0XT1vLGVbdCsxXT1pLGVbdCsyXT1yLGVbdCszXT1ufXJldHVybiBlfX0sX2U9ImZ1bmN0aW9uIj09dHlwZW9mIEJ1ZmZlciYmITAhPT1CdWZmZXIucHJvdG90eXBlPy5faXNCdWZmZXI/YWU6dWUsZ2U9U3ltYm9sLmZvcigiQEBtZGIuYnNvbi50eXBlIik7Y2xhc3MgaGV7Z2V0W2dlXSgpe3JldHVybiB0aGlzLl9ic29udHlwZX1nZXRbeV0oKXtyZXR1cm4gcH1bU3ltYm9sLmZvcigibm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20iKV0oZSx0LG4pe3JldHVybiB0aGlzLmluc3BlY3QoZSx0LG4pfX1jb25zdCBiZT1uZXcgRmxvYXQ2NEFycmF5KDEpLGRlPW5ldyBVaW50OEFycmF5KGJlLmJ1ZmZlciwwLDgpO2JlWzBdPS0xO2NvbnN0IHdlPTA9PT1kZVs3XSxwZT17aXNCaWdFbmRpYW46d2UsZ2V0Tm9ubmVnYXRpdmVJbnQzMkxFKGUsdCl7aWYoZVt0KzNdPjEyNyl0aHJvdyBuZXcgUmFuZ2VFcnJvcihgU2l6ZSBjYW5ub3QgYmUgbmVnYXRpdmUgYXQgb2Zmc2V0OiAke3R9YCk7cmV0dXJuIGVbdF18ZVt0KzFdPDw4fGVbdCsyXTw8MTZ8ZVt0KzNdPDwyNH0sZ2V0SW50MzJMRTooZSx0KT0+ZVt0XXxlW3QrMV08PDh8ZVt0KzJdPDwxNnxlW3QrM108PDI0LGdldFVpbnQzMkxFOihlLHQpPT5lW3RdKzI1NiplW3QrMV0rNjU1MzYqZVt0KzJdKzE2Nzc3MjE2KmVbdCszXSxnZXRVaW50MzJCRTooZSx0KT0+ZVt0KzNdKzI1NiplW3QrMl0rNjU1MzYqZVt0KzFdKzE2Nzc3MjE2KmVbdF0sZ2V0QmlnSW50NjRMRTooZSx0KT0+KEJpZ0ludChlW3QrNF0rMjU2KmVbdCs1XSs2NTUzNiplW3QrNl0rKGVbdCs3XTw8MjQpKTw8MzJuKStCaWdJbnQoZVt0XSsyNTYqZVt0KzFdKzY1NTM2KmVbdCsyXSsxNjc3NzIxNiplW3QrM10pLGdldEZsb2F0NjRMRTp3ZT8oZSx0KT0+KGRlWzddPWVbdF0sZGVbNl09ZVt0KzFdLGRlWzVdPWVbdCsyXSxkZVs0XT1lW3QrM10sZGVbM109ZVt0KzRdLGRlWzJdPWVbdCs1XSxkZVsxXT1lW3QrNl0sZGVbMF09ZVt0KzddLGJlWzBdKTooZSx0KT0+KGRlWzBdPWVbdF0sZGVbMV09ZVt0KzFdLGRlWzJdPWVbdCsyXSxkZVszXT1lW3QrM10sZGVbNF09ZVt0KzRdLGRlWzVdPWVbdCs1XSxkZVs2XT1lW3QrNl0sZGVbN109ZVt0KzddLGJlWzBdKSxzZXRJbnQzMkJFOihlLHQsbik9PihlW3QrM109bixuPj4+PTgsZVt0KzJdPW4sbj4+Pj04LGVbdCsxXT1uLG4+Pj49OCxlW3RdPW4sNCksc2V0SW50MzJMRTooZSx0LG4pPT4oZVt0XT1uLG4+Pj49OCxlW3QrMV09bixuPj4+PTgsZVt0KzJdPW4sbj4+Pj04LGVbdCszXT1uLDQpLHNldEJpZ0ludDY0TEUoZSx0LG4pe2NvbnN0IHI9MHhmZmZmZmZmZm47bGV0IGk9TnVtYmVyKG4mcik7ZVt0XT1pLGk+Pj04LGVbdCsxXT1pLGk+Pj04LGVbdCsyXT1pLGk+Pj04LGVbdCszXT1pO2xldCBvPU51bWJlcihuPj4zMm4mcik7cmV0dXJuIGVbdCs0XT1vLG8+Pj04LGVbdCs1XT1vLG8+Pj04LGVbdCs2XT1vLG8+Pj04LGVbdCs3XT1vLDh9LHNldEZsb2F0NjRMRTp3ZT8oZSx0LG4pPT4oYmVbMF09bixlW3RdPWRlWzddLGVbdCsxXT1kZVs2XSxlW3QrMl09ZGVbNV0sZVt0KzNdPWRlWzRdLGVbdCs0XT1kZVszXSxlW3QrNV09ZGVbMl0sZVt0KzZdPWRlWzFdLGVbdCs3XT1kZVswXSw4KTooZSx0LG4pPT4oYmVbMF09bixlW3RdPWRlWzBdLGVbdCsxXT1kZVsxXSxlW3QrMl09ZGVbMl0sZVt0KzNdPWRlWzNdLGVbdCs0XT1kZVs0XSxlW3QrNV09ZGVbNV0sZVt0KzZdPWRlWzZdLGVbdCs3XT1kZVs3XSw4KX07Y2xhc3MgeWUgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkJpbmFyeSJ9c3RhdGljIEJTT05fQklOQVJZX1NVQlRZUEVfREVGQVVMVD0wO3N0YXRpYyBCVUZGRVJfU0laRT0yNTY7c3RhdGljIFNVQlRZUEVfREVGQVVMVD0wO3N0YXRpYyBTVUJUWVBFX0ZVTkNUSU9OPTE7c3RhdGljIFNVQlRZUEVfQllURV9BUlJBWT0yO3N0YXRpYyBTVUJUWVBFX1VVSURfT0xEPTM7c3RhdGljIFNVQlRZUEVfVVVJRD00O3N0YXRpYyBTVUJUWVBFX01ENT01O3N0YXRpYyBTVUJUWVBFX0VOQ1JZUFRFRD02O3N0YXRpYyBTVUJUWVBFX0NPTFVNTj03O3N0YXRpYyBTVUJUWVBFX1NFTlNJVElWRT04O3N0YXRpYyBTVUJUWVBFX1ZFQ1RPUj05O3N0YXRpYyBTVUJUWVBFX1VTRVJfREVGSU5FRD0xMjg7c3RhdGljIFZFQ1RPUl9UWVBFPU9iamVjdC5mcmVlemUoe0ludDg6MyxGbG9hdDMyOjM5LFBhY2tlZEJpdDoxNn0pO2J1ZmZlcjtzdWJfdHlwZTtwb3NpdGlvbjtjb25zdHJ1Y3RvcihlLHQpe2lmKHN1cGVyKCksbnVsbCE9ZSYmInN0cmluZyI9PXR5cGVvZiBlJiYhQXJyYXlCdWZmZXIuaXNWaWV3KGUpJiYhZyhlKSYmIUFycmF5LmlzQXJyYXkoZSkpdGhyb3cgbmV3IFooIkJpbmFyeSBjYW4gb25seSBiZSBjb25zdHJ1Y3RlZCBmcm9tIFVpbnQ4QXJyYXkgb3IgbnVtYmVyW10iKTt0aGlzLnN1Yl90eXBlPXQ/P3llLkJTT05fQklOQVJZX1NVQlRZUEVfREVGQVVMVCxudWxsPT1lPyh0aGlzLmJ1ZmZlcj1fZS5hbGxvY2F0ZSh5ZS5CVUZGRVJfU0laRSksdGhpcy5wb3NpdGlvbj0wKToodGhpcy5idWZmZXI9QXJyYXkuaXNBcnJheShlKT9fZS5mcm9tTnVtYmVyQXJyYXkoZSk6X2UudG9Mb2NhbEJ1ZmZlclR5cGUoZSksdGhpcy5wb3NpdGlvbj10aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKX1wdXQoZSl7aWYoInN0cmluZyI9PXR5cGVvZiBlJiYxIT09ZS5sZW5ndGgpdGhyb3cgbmV3IFooIm9ubHkgYWNjZXB0cyBzaW5nbGUgY2hhcmFjdGVyIFN0cmluZyIpO2lmKCJudW1iZXIiIT10eXBlb2YgZSYmMSE9PWUubGVuZ3RoKXRocm93IG5ldyBaKCJvbmx5IGFjY2VwdHMgc2luZ2xlIGNoYXJhY3RlciBVaW50OEFycmF5IG9yIEFycmF5Iik7bGV0IHQ7aWYodD0ic3RyaW5nIj09dHlwZW9mIGU/ZS5jaGFyQ29kZUF0KDApOiJudW1iZXIiPT10eXBlb2YgZT9lOmVbMF0sdDwwfHx0PjI1NSl0aHJvdyBuZXcgWigib25seSBhY2NlcHRzIG51bWJlciBpbiBhIHZhbGlkIHVuc2lnbmVkIGJ5dGUgcmFuZ2UgMC0yNTUiKTtpZih0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoPnRoaXMucG9zaXRpb24pdGhpcy5idWZmZXJbdGhpcy5wb3NpdGlvbisrXT10O2Vsc2V7Y29uc3QgZT1fZS5hbGxvY2F0ZSh5ZS5CVUZGRVJfU0laRSt0aGlzLmJ1ZmZlci5sZW5ndGgpO2Uuc2V0KHRoaXMuYnVmZmVyLDApLHRoaXMuYnVmZmVyPWUsdGhpcy5idWZmZXJbdGhpcy5wb3NpdGlvbisrXT10fX13cml0ZShlLHQpe2lmKHQ9Im51bWJlciI9PXR5cGVvZiB0P3Q6dGhpcy5wb3NpdGlvbix0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoPHQrZS5sZW5ndGgpe2NvbnN0IHQ9X2UuYWxsb2NhdGUodGhpcy5idWZmZXIuYnl0ZUxlbmd0aCtlLmxlbmd0aCk7dC5zZXQodGhpcy5idWZmZXIsMCksdGhpcy5idWZmZXI9dH1pZihBcnJheUJ1ZmZlci5pc1ZpZXcoZSkpdGhpcy5idWZmZXIuc2V0KF9lLnRvTG9jYWxCdWZmZXJUeXBlKGUpLHQpLHRoaXMucG9zaXRpb249dCtlLmJ5dGVMZW5ndGg+dGhpcy5wb3NpdGlvbj90K2UubGVuZ3RoOnRoaXMucG9zaXRpb247ZWxzZSBpZigic3RyaW5nIj09dHlwZW9mIGUpdGhyb3cgbmV3IFooImlucHV0IGNhbm5vdCBiZSBzdHJpbmciKX1yZWFkKGUsdCl7Y29uc3Qgbj1lKyh0PXQmJnQ+MD90OnRoaXMucG9zaXRpb24pO3JldHVybiB0aGlzLmJ1ZmZlci5zdWJhcnJheShlLG4+dGhpcy5wb3NpdGlvbj90aGlzLnBvc2l0aW9uOm4pfXZhbHVlKCl7cmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aD09PXRoaXMucG9zaXRpb24/dGhpcy5idWZmZXI6dGhpcy5idWZmZXIuc3ViYXJyYXkoMCx0aGlzLnBvc2l0aW9uKX1sZW5ndGgoKXtyZXR1cm4gdGhpcy5wb3NpdGlvbn10b0pTT04oKXtyZXR1cm4gX2UudG9CYXNlNjQodGhpcy5idWZmZXIuc3ViYXJyYXkoMCx0aGlzLnBvc2l0aW9uKSl9dG9TdHJpbmcoZSl7cmV0dXJuImhleCI9PT1lP19lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDAsdGhpcy5wb3NpdGlvbikpOiJiYXNlNjQiPT09ZT9fZS50b0Jhc2U2NCh0aGlzLmJ1ZmZlci5zdWJhcnJheSgwLHRoaXMucG9zaXRpb24pKTpfZS50b1VURjgodGhpcy5idWZmZXIsMCx0aGlzLnBvc2l0aW9uLCExKX10b0V4dGVuZGVkSlNPTihlKXtlPWV8fHt9LHRoaXMuc3ViX3R5cGU9PT15ZS5TVUJUWVBFX1ZFQ1RPUiYmbWUodGhpcyk7Y29uc3QgdD1fZS50b0Jhc2U2NCh0aGlzLmJ1ZmZlciksbj1OdW1iZXIodGhpcy5zdWJfdHlwZSkudG9TdHJpbmcoMTYpO3JldHVybiBlLmxlZ2FjeT97JGJpbmFyeTp0LCR0eXBlOjE9PT1uLmxlbmd0aD8iMCIrbjpufTp7JGJpbmFyeTp7YmFzZTY0OnQsc3ViVHlwZToxPT09bi5sZW5ndGg/IjAiK246bn19fXRvVVVJRCgpe2lmKHRoaXMuc3ViX3R5cGU9PT15ZS5TVUJUWVBFX1VVSUQpcmV0dXJuIG5ldyB4ZSh0aGlzLmJ1ZmZlci5zdWJhcnJheSgwLHRoaXMucG9zaXRpb24pKTt0aHJvdyBuZXcgWihgQmluYXJ5IHN1Yl90eXBlICIke3RoaXMuc3ViX3R5cGV9IiBpcyBub3Qgc3VwcG9ydGVkIGZvciBjb252ZXJ0aW5nIHRvIFVVSUQuIE9ubHkgIiR7eWUuU1VCVFlQRV9VVUlEfSIgaXMgY3VycmVudGx5IHN1cHBvcnRlZC5gKX1zdGF0aWMgY3JlYXRlRnJvbUhleFN0cmluZyhlLHQpe3JldHVybiBuZXcgeWUoX2UuZnJvbUhleChlKSx0KX1zdGF0aWMgY3JlYXRlRnJvbUJhc2U2NChlLHQpe3JldHVybiBuZXcgeWUoX2UuZnJvbUJhc2U2NChlKSx0KX1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlLHQpe2xldCBuLHI7aWYodD10fHx7fSwiJGJpbmFyeSJpbiBlP3QubGVnYWN5JiYic3RyaW5nIj09dHlwZW9mIGUuJGJpbmFyeSYmIiR0eXBlImluIGU/KHI9ZS4kdHlwZT9wYXJzZUludChlLiR0eXBlLDE2KTowLG49X2UuZnJvbUJhc2U2NChlLiRiaW5hcnkpKToic3RyaW5nIiE9dHlwZW9mIGUuJGJpbmFyeSYmKHI9ZS4kYmluYXJ5LnN1YlR5cGU/cGFyc2VJbnQoZS4kYmluYXJ5LnN1YlR5cGUsMTYpOjAsbj1fZS5mcm9tQmFzZTY0KGUuJGJpbmFyeS5iYXNlNjQpKToiJHV1aWQiaW4gZSYmKHI9NCxuPXhlLmJ5dGVzRnJvbVN0cmluZyhlLiR1dWlkKSksIW4pdGhyb3cgbmV3IFooYFVuZXhwZWN0ZWQgQmluYXJ5IEV4dGVuZGVkIEpTT04gZm9ybWF0ICR7SlNPTi5zdHJpbmdpZnkoZSl9YCk7cmV0dXJuIHI9PT1IP25ldyB4ZShuKTpuZXcgeWUobixyKX1pbnNwZWN0KGUsdCxuKXtuPz89dztyZXR1cm5gQmluYXJ5LmNyZWF0ZUZyb21CYXNlNjQoJHtuKF9lLnRvQmFzZTY0KHRoaXMuYnVmZmVyLnN1YmFycmF5KDAsdGhpcy5wb3NpdGlvbikpLHQpfSwgJHtuKHRoaXMuc3ViX3R5cGUsdCl9KWB9dG9JbnQ4QXJyYXkoKXtpZih0aGlzLnN1Yl90eXBlIT09eWUuU1VCVFlQRV9WRUNUT1IpdGhyb3cgbmV3IFooIkJpbmFyeSBzdWJfdHlwZSBpcyBub3QgVmVjdG9yIik7aWYodGhpcy5idWZmZXJbMF0hPT15ZS5WRUNUT1JfVFlQRS5JbnQ4KXRocm93IG5ldyBaKCJCaW5hcnkgZGF0YXR5cGUgZmllbGQgaXMgbm90IEludDgiKTtyZXR1cm4gbWUodGhpcyksbmV3IEludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIuc2xpY2UodGhpcy5idWZmZXIuYnl0ZU9mZnNldCsyLHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQrdGhpcy5wb3NpdGlvbikpfXRvRmxvYXQzMkFycmF5KCl7aWYodGhpcy5zdWJfdHlwZSE9PXllLlNVQlRZUEVfVkVDVE9SKXRocm93IG5ldyBaKCJCaW5hcnkgc3ViX3R5cGUgaXMgbm90IFZlY3RvciIpO2lmKHRoaXMuYnVmZmVyWzBdIT09eWUuVkVDVE9SX1RZUEUuRmxvYXQzMil0aHJvdyBuZXcgWigiQmluYXJ5IGRhdGF0eXBlIGZpZWxkIGlzIG5vdCBGbG9hdDMyIik7bWUodGhpcyk7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIuc2xpY2UodGhpcy5idWZmZXIuYnl0ZU9mZnNldCsyLHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQrdGhpcy5wb3NpdGlvbikpO3JldHVybiBwZS5pc0JpZ0VuZGlhbiYmX2Uuc3dhcDMyKGUpLG5ldyBGbG9hdDMyQXJyYXkoZS5idWZmZXIpfXRvUGFja2VkQml0cygpe2lmKHRoaXMuc3ViX3R5cGUhPT15ZS5TVUJUWVBFX1ZFQ1RPUil0aHJvdyBuZXcgWigiQmluYXJ5IHN1Yl90eXBlIGlzIG5vdCBWZWN0b3IiKTtpZih0aGlzLmJ1ZmZlclswXSE9PXllLlZFQ1RPUl9UWVBFLlBhY2tlZEJpdCl0aHJvdyBuZXcgWigiQmluYXJ5IGRhdGF0eXBlIGZpZWxkIGlzIG5vdCBwYWNrZWQgYml0Iik7cmV0dXJuIG1lKHRoaXMpLG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLmJ1ZmZlci5zbGljZSh0aGlzLmJ1ZmZlci5ieXRlT2Zmc2V0KzIsdGhpcy5idWZmZXIuYnl0ZU9mZnNldCt0aGlzLnBvc2l0aW9uKSl9dG9CaXRzKCl7aWYodGhpcy5zdWJfdHlwZSE9PXllLlNVQlRZUEVfVkVDVE9SKXRocm93IG5ldyBaKCJCaW5hcnkgc3ViX3R5cGUgaXMgbm90IFZlY3RvciIpO2lmKHRoaXMuYnVmZmVyWzBdIT09eWUuVkVDVE9SX1RZUEUuUGFja2VkQml0KXRocm93IG5ldyBaKCJCaW5hcnkgZGF0YXR5cGUgZmllbGQgaXMgbm90IHBhY2tlZCBiaXQiKTttZSh0aGlzKTtjb25zdCBlPTgqKHRoaXMubGVuZ3RoKCktMiktdGhpcy5idWZmZXJbMV0sdD1uZXcgSW50OEFycmF5KGUpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXtjb25zdCBuPWUvOHwwLHI9dGhpcy5idWZmZXJbbisyXT4+Ny1lJTgmMTt0W2VdPXJ9cmV0dXJuIHR9c3RhdGljIGZyb21JbnQ4QXJyYXkoZSl7Y29uc3QgdD1fZS5hbGxvY2F0ZShlLmJ5dGVMZW5ndGgrMik7dFswXT15ZS5WRUNUT1JfVFlQRS5JbnQ4LHRbMV09MDtjb25zdCBuPW5ldyBVaW50OEFycmF5KGUuYnVmZmVyLGUuYnl0ZU9mZnNldCxlLmJ5dGVMZW5ndGgpO3Quc2V0KG4sMik7Y29uc3Qgcj1uZXcgdGhpcyh0LHRoaXMuU1VCVFlQRV9WRUNUT1IpO3JldHVybiBtZShyKSxyfXN0YXRpYyBmcm9tRmxvYXQzMkFycmF5KGUpe2NvbnN0IHQ9X2UuYWxsb2NhdGUoZS5ieXRlTGVuZ3RoKzIpO3RbMF09eWUuVkVDVE9SX1RZUEUuRmxvYXQzMix0WzFdPTA7Y29uc3Qgbj1uZXcgVWludDhBcnJheShlLmJ1ZmZlcixlLmJ5dGVPZmZzZXQsZS5ieXRlTGVuZ3RoKTt0LnNldChuLDIpLHBlLmlzQmlnRW5kaWFuJiZfZS5zd2FwMzIobmV3IFVpbnQ4QXJyYXkodC5idWZmZXIsMikpO2NvbnN0IHI9bmV3IHRoaXModCx0aGlzLlNVQlRZUEVfVkVDVE9SKTtyZXR1cm4gbWUocikscn1zdGF0aWMgZnJvbVBhY2tlZEJpdHMoZSx0PTApe2NvbnN0IG49X2UuYWxsb2NhdGUoZS5ieXRlTGVuZ3RoKzIpO25bMF09eWUuVkVDVE9SX1RZUEUuUGFja2VkQml0LG5bMV09dCxuLnNldChlLDIpO2NvbnN0IHI9bmV3IHRoaXMobix0aGlzLlNVQlRZUEVfVkVDVE9SKTtyZXR1cm4gbWUocikscn1zdGF0aWMgZnJvbUJpdHMoZSl7Y29uc3QgdD1lLmxlbmd0aCs3Pj4+MyxuPW5ldyBVaW50OEFycmF5KHQrMik7blswXT15ZS5WRUNUT1JfVFlQRS5QYWNrZWRCaXQ7Y29uc3Qgcj1lLmxlbmd0aCU4O25bMV09MD09PXI/MDo4LXI7Zm9yKGxldCB0PTA7dDxlLmxlbmd0aDt0Kyspe2NvbnN0IHI9dD4+PjMsaT1lW3RdO2lmKDAhPT1pJiYxIT09aSl0aHJvdyBuZXcgWihgSW52YWxpZCBiaXQgdmFsdWUgYXQgJHt0fTogbXVzdCBiZSAwIG9yIDEsIGZvdW5kICR7ZVt0XX1gKTtpZigwPT09aSljb250aW51ZTtjb25zdCBvPTctdCU4O25bcisyXXw9aTw8b31yZXR1cm4gbmV3IHRoaXMobix5ZS5TVUJUWVBFX1ZFQ1RPUil9fWZ1bmN0aW9uIG1lKGUpe2lmKGUuc3ViX3R5cGUhPT15ZS5TVUJUWVBFX1ZFQ1RPUilyZXR1cm47Y29uc3QgdD1lLnBvc2l0aW9uLG49ZS5idWZmZXJbMF0scj1lLmJ1ZmZlclsxXTtpZigobj09PXllLlZFQ1RPUl9UWVBFLkZsb2F0MzJ8fG49PT15ZS5WRUNUT1JfVFlQRS5JbnQ4KSYmMCE9PXIpdGhyb3cgbmV3IFooIkludmFsaWQgVmVjdG9yOiBwYWRkaW5nIG11c3QgYmUgemVybyBmb3IgaW50OCBhbmQgZmxvYXQzMiB2ZWN0b3JzIik7aWYobj09PXllLlZFQ1RPUl9UWVBFLkZsb2F0MzImJjAhPT10JiZ0LTIhPTAmJih0LTIpJTQhPTApdGhyb3cgbmV3IFooIkludmFsaWQgVmVjdG9yOiBGbG9hdDMyIHZlY3RvciBtdXN0IGNvbnRhaW4gYSBtdWx0aXBsZSBvZiA0IGJ5dGVzIik7aWYobj09PXllLlZFQ1RPUl9UWVBFLlBhY2tlZEJpdCYmMCE9PXImJjI9PT10KXRocm93IG5ldyBaKCJJbnZhbGlkIFZlY3RvcjogcGFkZGluZyBtdXN0IGJlIHplcm8gZm9yIHBhY2tlZCBiaXQgdmVjdG9ycyB0aGF0IGFyZSBlbXB0eSIpO2lmKG49PT15ZS5WRUNUT1JfVFlQRS5QYWNrZWRCaXQmJnI+Nyl0aHJvdyBuZXcgWihgSW52YWxpZCBWZWN0b3I6IHBhZGRpbmcgbXVzdCBiZSBhIHZhbHVlIGJldHdlZW4gMCBhbmQgNy4gZm91bmQ6ICR7cn1gKX1jb25zdCBTZT0vXlswLTlBLUZdezMyfSQvaSxCZT0vXlswLTlBLUZdezh9LVswLTlBLUZdezR9LVswLTlBLUZdezR9LVswLTlBLUZdezR9LVswLTlBLUZdezEyfSQvaTtjbGFzcyB4ZSBleHRlbmRzIHlle2NvbnN0cnVjdG9yKGUpe2xldCB0O2lmKG51bGw9PWUpdD14ZS5nZW5lcmF0ZSgpO2Vsc2UgaWYoZSBpbnN0YW5jZW9mIHhlKXQ9X2UudG9Mb2NhbEJ1ZmZlclR5cGUobmV3IFVpbnQ4QXJyYXkoZS5idWZmZXIpKTtlbHNlIGlmKEFycmF5QnVmZmVyLmlzVmlldyhlKSYmMTY9PT1lLmJ5dGVMZW5ndGgpdD1fZS50b0xvY2FsQnVmZmVyVHlwZShlKTtlbHNle2lmKCJzdHJpbmciIT10eXBlb2YgZSl0aHJvdyBuZXcgWigiQXJndW1lbnQgcGFzc2VkIGluIFVVSUQgY29uc3RydWN0b3IgbXVzdCBiZSBhIFVVSUQsIGEgMTYgYnl0ZSBCdWZmZXIgb3IgYSAzMi8zNiBjaGFyYWN0ZXIgaGV4IHN0cmluZyAoZGFzaGVzIGV4Y2x1ZGVkL2luY2x1ZGVkLCBmb3JtYXQ6IHh4eHh4eHh4LXh4eHgteHh4eC14eHh4LXh4eHh4eHh4eHh4eCkuIik7dD14ZS5ieXRlc0Zyb21TdHJpbmcoZSl9c3VwZXIodCxIKX1nZXQgaWQoKXtyZXR1cm4gdGhpcy5idWZmZXJ9c2V0IGlkKGUpe3RoaXMuYnVmZmVyPWV9dG9IZXhTdHJpbmcoZT0hMCl7cmV0dXJuIGU/W19lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDAsNCkpLF9lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDQsNikpLF9lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDYsOCkpLF9lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDgsMTApKSxfZS50b0hleCh0aGlzLmJ1ZmZlci5zdWJhcnJheSgxMCwxNikpXS5qb2luKCItIik6X2UudG9IZXgodGhpcy5idWZmZXIpfXRvU3RyaW5nKGUpe3JldHVybiJoZXgiPT09ZT9fZS50b0hleCh0aGlzLmlkKToiYmFzZTY0Ij09PWU/X2UudG9CYXNlNjQodGhpcy5pZCk6dGhpcy50b0hleFN0cmluZygpfXRvSlNPTigpe3JldHVybiB0aGlzLnRvSGV4U3RyaW5nKCl9ZXF1YWxzKGUpe2lmKCFlKXJldHVybiExO2lmKGUgaW5zdGFuY2VvZiB4ZSlyZXR1cm4gX2UuZXF1YWxzKGUuaWQsdGhpcy5pZCk7dHJ5e3JldHVybiBfZS5lcXVhbHMobmV3IHhlKGUpLmlkLHRoaXMuaWQpfWNhdGNoe3JldHVybiExfX10b0JpbmFyeSgpe3JldHVybiBuZXcgeWUodGhpcy5pZCx5ZS5TVUJUWVBFX1VVSUQpfXN0YXRpYyBnZW5lcmF0ZSgpe2NvbnN0IGU9X2UucmFuZG9tQnl0ZXMoMTYpO3JldHVybiBlWzZdPTE1JmVbNl18NjQsZVs4XT02MyZlWzhdfDEyOCxlfXN0YXRpYyBpc1ZhbGlkKGUpe3JldHVybiEhZSYmKCJzdHJpbmciPT10eXBlb2YgZT94ZS5pc1ZhbGlkVVVJRFN0cmluZyhlKTpfKGUpPzE2PT09ZS5ieXRlTGVuZ3RoOiJCaW5hcnkiPT09ZS5fYnNvbnR5cGUmJmUuc3ViX3R5cGU9PT10aGlzLlNVQlRZUEVfVVVJRCYmMTY9PT1lLmJ1ZmZlci5ieXRlTGVuZ3RoKX1zdGF0aWMgY3JlYXRlRnJvbUhleFN0cmluZyhlKXtjb25zdCB0PXhlLmJ5dGVzRnJvbVN0cmluZyhlKTtyZXR1cm4gbmV3IHhlKHQpfXN0YXRpYyBjcmVhdGVGcm9tQmFzZTY0KGUpe3JldHVybiBuZXcgeGUoX2UuZnJvbUJhc2U2NChlKSl9c3RhdGljIGJ5dGVzRnJvbVN0cmluZyhlKXtpZigheGUuaXNWYWxpZFVVSURTdHJpbmcoZSkpdGhyb3cgbmV3IFooIlVVSUQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG11c3QgYmUgMzIgaGV4IGRpZ2l0cyBvciBjYW5vbmljYWwgaHlwaGVuYXRlZCByZXByZXNlbnRhdGlvbiIpO3JldHVybiBfZS5mcm9tSGV4KGUucmVwbGFjZSgvLS9nLCIiKSl9c3RhdGljIGlzVmFsaWRVVUlEU3RyaW5nKGUpe3JldHVybiBTZS50ZXN0KGUpfHxCZS50ZXN0KGUpfWluc3BlY3QoZSx0LG4pe3JldHVybiBuPz89dyxgbmV3IFVVSUQoJHtuKHRoaXMudG9IZXhTdHJpbmcoKSx0KX0pYH19Y2xhc3MgRWUgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkNvZGUifWNvZGU7c2NvcGU7Y29uc3RydWN0b3IoZSx0KXtzdXBlcigpLHRoaXMuY29kZT1lLnRvU3RyaW5nKCksdGhpcy5zY29wZT10Pz9udWxsfXRvSlNPTigpe3JldHVybiBudWxsIT10aGlzLnNjb3BlP3tjb2RlOnRoaXMuY29kZSxzY29wZTp0aGlzLnNjb3BlfTp7Y29kZTp0aGlzLmNvZGV9fXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJuIHRoaXMuc2NvcGU/eyRjb2RlOnRoaXMuY29kZSwkc2NvcGU6dGhpcy5zY29wZX06eyRjb2RlOnRoaXMuY29kZX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7cmV0dXJuIG5ldyBFZShlLiRjb2RlLGUuJHNjb3BlKX1pbnNwZWN0KGUsdCxuKXtuPz89dztsZXQgcj1uKHRoaXMuY29kZSx0KTtjb25zdCBpPXIuaW5jbHVkZXMoIlxuIik7bnVsbCE9dGhpcy5zY29wZSYmKHIrPWAsJHtpPyJcbiI6IiAifSR7bih0aGlzLnNjb3BlLHQpfWApO3JldHVybmBuZXcgQ29kZSgke2k/IlxuIjoiIn0ke3J9JHtpJiZudWxsPT09dGhpcy5zY29wZT8iXG4iOiIifSlgfX1mdW5jdGlvbiBVZShlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiJGlkImluIGUmJm51bGwhPWUuJGlkJiYiJHJlZiJpbiBlJiYic3RyaW5nIj09dHlwZW9mIGUuJHJlZiYmKCEoIiRkYiJpbiBlKXx8IiRkYiJpbiBlJiYic3RyaW5nIj09dHlwZW9mIGUuJGRiKX1jbGFzcyBPZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iREJSZWYifWNvbGxlY3Rpb247b2lkO2RiO2ZpZWxkcztjb25zdHJ1Y3RvcihlLHQsbixyKXtzdXBlcigpO2NvbnN0IGk9ZS5zcGxpdCgiLiIpOzI9PT1pLmxlbmd0aCYmKG49aS5zaGlmdCgpLGU9aS5zaGlmdCgpKSx0aGlzLmNvbGxlY3Rpb249ZSx0aGlzLm9pZD10LHRoaXMuZGI9bix0aGlzLmZpZWxkcz1yfHx7fX1nZXQgbmFtZXNwYWNlKCl7cmV0dXJuIHRoaXMuY29sbGVjdGlvbn1zZXQgbmFtZXNwYWNlKGUpe3RoaXMuY29sbGVjdGlvbj1lfXRvSlNPTigpe2NvbnN0IGU9T2JqZWN0LmFzc2lnbih7JHJlZjp0aGlzLmNvbGxlY3Rpb24sJGlkOnRoaXMub2lkfSx0aGlzLmZpZWxkcyk7cmV0dXJuIG51bGwhPXRoaXMuZGImJihlLiRkYj10aGlzLmRiKSxlfXRvRXh0ZW5kZWRKU09OKGUpe2U9ZXx8e307bGV0IHQ9eyRyZWY6dGhpcy5jb2xsZWN0aW9uLCRpZDp0aGlzLm9pZH07cmV0dXJuIGUubGVnYWN5fHwodGhpcy5kYiYmKHQuJGRiPXRoaXMuZGIpLHQ9T2JqZWN0LmFzc2lnbih0LHRoaXMuZmllbGRzKSksdH1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlKXtjb25zdCB0PU9iamVjdC5hc3NpZ24oe30sZSk7cmV0dXJuIGRlbGV0ZSB0LiRyZWYsZGVsZXRlIHQuJGlkLGRlbGV0ZSB0LiRkYixuZXcgT2UoZS4kcmVmLGUuJGlkLGUuJGRiLHQpfWluc3BlY3QoZSx0LG4pe24/Pz13O2NvbnN0IHI9W24odGhpcy5uYW1lc3BhY2UsdCksbih0aGlzLm9pZCx0KSwuLi50aGlzLmRiP1tuKHRoaXMuZGIsdCldOltdLC4uLk9iamVjdC5rZXlzKHRoaXMuZmllbGRzKS5sZW5ndGg+MD9bbih0aGlzLmZpZWxkcyx0KV06W11dO3JldHVybiByWzFdPW49PT13P2BuZXcgT2JqZWN0SWQoJHtyWzFdfSlgOnJbMV0sYG5ldyBEQlJlZigke3Iuam9pbigiLCAiKX0pYH19ZnVuY3Rpb24gTmUoZSl7aWYoIiI9PT1lKXJldHVybiBlO2xldCB0PTA7Y29uc3Qgbj0iLSI9PT1lW3RdLHI9IisiPT09ZVt0XTsocnx8bikmJih0Kz0xKTtsZXQgaT0hMTtmb3IoO3Q8ZS5sZW5ndGgmJiIwIj09PWVbdF07Kyt0KWk9ITA7cmV0dXJuIGk/YCR7bj8iLSI6IiJ9JHtlLmxlbmd0aD09PXQ/IjAiOmUuc2xpY2UodCl9YDpyP2Uuc2xpY2UoMSk6ZX1sZXQgSWU7dHJ5e0llPW5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZShuZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG5ldyBVaW50OEFycmF5KFswLDk3LDExNSwxMDksMSwwLDAsMCwxLDEzLDIsOTYsMCwxLDEyNyw5Niw0LDEyNywxMjcsMTI3LDEyNywxLDEyNywzLDcsNiwwLDEsMSwxLDEsMSw2LDYsMSwxMjcsMSw2NSwwLDExLDcsNTAsNiwzLDEwOSwxMTcsMTA4LDAsMSw1LDEwMCwxMDUsMTE4LDk1LDExNSwwLDIsNSwxMDAsMTA1LDExOCw5NSwxMTcsMCwzLDUsMTE0LDEwMSwxMDksOTUsMTE1LDAsNCw1LDExNCwxMDEsMTA5LDk1LDExNywwLDUsOCwxMDMsMTAxLDExNiw5NSwxMDQsMTA1LDEwMywxMDQsMCwwLDEwLDE5MSwxLDYsNCwwLDM1LDAsMTEsMzYsMSwxLDEyNiwzMiwwLDE3MywzMiwxLDE3Myw2NiwzMiwxMzQsMTMyLDMyLDIsMTczLDMyLDMsMTczLDY2LDMyLDEzNCwxMzIsMTI2LDM0LDQsNjYsMzIsMTM1LDE2NywzNiwwLDMyLDQsMTY3LDExLDM2LDEsMSwxMjYsMzIsMCwxNzMsMzIsMSwxNzMsNjYsMzIsMTM0LDEzMiwzMiwyLDE3MywzMiwzLDE3Myw2NiwzMiwxMzQsMTMyLDEyNywzNCw0LDY2LDMyLDEzNSwxNjcsMzYsMCwzMiw0LDE2NywxMSwzNiwxLDEsMTI2LDMyLDAsMTczLDMyLDEsMTczLDY2LDMyLDEzNCwxMzIsMzIsMiwxNzMsMzIsMywxNzMsNjYsMzIsMTM0LDEzMiwxMjgsMzQsNCw2NiwzMiwxMzUsMTY3LDM2LDAsMzIsNCwxNjcsMTEsMzYsMSwxLDEyNiwzMiwwLDE3MywzMiwxLDE3Myw2NiwzMiwxMzQsMTMyLDMyLDIsMTczLDMyLDMsMTczLDY2LDMyLDEzNCwxMzIsMTI5LDM0LDQsNjYsMzIsMTM1LDE2NywzNiwwLDMyLDQsMTY3LDExLDM2LDEsMSwxMjYsMzIsMCwxNzMsMzIsMSwxNzMsNjYsMzIsMTM0LDEzMiwzMiwyLDE3MywzMiwzLDE3Myw2NiwzMiwxMzQsMTMyLDEzMCwzNCw0LDY2LDMyLDEzNSwxNjcsMzYsMCwzMiw0LDE2NywxMV0pKSx7fSkuZXhwb3J0c31jYXRjaHt9Y29uc3QgdmU9NDI5NDk2NzI5NixUZT0weDEwMDAwMDAwMDAwMDAwMDAwLCRlPVRlLzIsTGU9e30sQWU9e30sUmU9L14oXCs/MHwoXCt8LSk/WzEtOV1bMC05XSopJC87Y2xhc3MgamUgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkxvbmcifWdldCBfX2lzTG9uZ19fKCl7cmV0dXJuITB9aGlnaDtsb3c7dW5zaWduZWQ7Y29uc3RydWN0b3IoZT0wLHQsbil7c3VwZXIoKTtjb25zdCByPSJib29sZWFuIj09dHlwZW9mIHQ/dDpCb29sZWFuKG4pLGk9Im51bWJlciI9PXR5cGVvZiB0P3Q6MCxvPSJzdHJpbmciPT10eXBlb2YgZT9qZS5mcm9tU3RyaW5nKGUscik6ImJpZ2ludCI9PXR5cGVvZiBlP2plLmZyb21CaWdJbnQoZSxyKTp7bG93OjB8ZSxoaWdoOjB8aSx1bnNpZ25lZDpyfTt0aGlzLmxvdz1vLmxvdyx0aGlzLmhpZ2g9by5oaWdoLHRoaXMudW5zaWduZWQ9by51bnNpZ25lZH1zdGF0aWMgVFdPX1BXUl8yND1qZS5mcm9tSW50KDE2Nzc3MjE2KTtzdGF0aWMgTUFYX1VOU0lHTkVEX1ZBTFVFPWplLmZyb21CaXRzKC0xLC0xLCEwKTtzdGF0aWMgWkVSTz1qZS5mcm9tSW50KDApO3N0YXRpYyBVWkVSTz1qZS5mcm9tSW50KDAsITApO3N0YXRpYyBPTkU9amUuZnJvbUludCgxKTtzdGF0aWMgVU9ORT1qZS5mcm9tSW50KDEsITApO3N0YXRpYyBORUdfT05FPWplLmZyb21JbnQoLTEpO3N0YXRpYyBNQVhfVkFMVUU9amUuZnJvbUJpdHMoLTEsMjE0NzQ4MzY0NywhMSk7c3RhdGljIE1JTl9WQUxVRT1qZS5mcm9tQml0cygwLC0yMTQ3NDgzNjQ4LCExKTtzdGF0aWMgZnJvbUJpdHMoZSx0LG4pe3JldHVybiBuZXcgamUoZSx0LG4pfXN0YXRpYyBmcm9tSW50KGUsdCl7bGV0IG4scixpO3JldHVybiB0PyhpPTA8PShlPj4+PTApJiZlPDI1NikmJihyPUFlW2VdLHIpP3I6KG49amUuZnJvbUJpdHMoZSwoMHxlKTwwPy0xOjAsITApLGkmJihBZVtlXT1uKSxuKTooaT0tMTI4PD0oZXw9MCkmJmU8MTI4KSYmKHI9TGVbZV0scik/cjoobj1qZS5mcm9tQml0cyhlLGU8MD8tMTowLCExKSxpJiYoTGVbZV09biksbil9c3RhdGljIGZyb21OdW1iZXIoZSx0KXtpZihpc05hTihlKSlyZXR1cm4gdD9qZS5VWkVSTzpqZS5aRVJPO2lmKHQpe2lmKGU8MClyZXR1cm4gamUuVVpFUk87aWYoZT49VGUpcmV0dXJuIGplLk1BWF9VTlNJR05FRF9WQUxVRX1lbHNle2lmKGU8PS0kZSlyZXR1cm4gamUuTUlOX1ZBTFVFO2lmKGUrMT49JGUpcmV0dXJuIGplLk1BWF9WQUxVRX1yZXR1cm4gZTwwP2plLmZyb21OdW1iZXIoLWUsdCkubmVnKCk6amUuZnJvbUJpdHMoZSV2ZXwwLGUvdmV8MCx0KX1zdGF0aWMgZnJvbUJpZ0ludChlLHQpe2NvbnN0IG49MHhmZmZmZmZmZm47cmV0dXJuIG5ldyBqZShOdW1iZXIoZSZuKSxOdW1iZXIoZT4+MzJuJm4pLHQpfXN0YXRpYyBfZnJvbVN0cmluZyhlLHQsbil7aWYoMD09PWUubGVuZ3RoKXRocm93IG5ldyBaKCJlbXB0eSBzdHJpbmciKTtpZihuPDJ8fDM2PG4pdGhyb3cgbmV3IFooInJhZGl4Iik7bGV0IHI7aWYoKHI9ZS5pbmRleE9mKCItIikpPjApdGhyb3cgbmV3IFooImludGVyaW9yIGh5cGhlbiIpO2lmKDA9PT1yKXJldHVybiBqZS5fZnJvbVN0cmluZyhlLnN1YnN0cmluZygxKSx0LG4pLm5lZygpO2NvbnN0IGk9amUuZnJvbU51bWJlcihNYXRoLnBvdyhuLDgpKTtsZXQgbz1qZS5aRVJPO2ZvcihsZXQgdD0wO3Q8ZS5sZW5ndGg7dCs9OCl7Y29uc3Qgcj1NYXRoLm1pbig4LGUubGVuZ3RoLXQpLHM9cGFyc2VJbnQoZS5zdWJzdHJpbmcodCx0K3IpLG4pO2lmKHI8OCl7Y29uc3QgZT1qZS5mcm9tTnVtYmVyKE1hdGgucG93KG4scikpO289by5tdWwoZSkuYWRkKGplLmZyb21OdW1iZXIocykpfWVsc2Ugbz1vLm11bChpKSxvPW8uYWRkKGplLmZyb21OdW1iZXIocykpfXJldHVybiBvLnVuc2lnbmVkPXQsb31zdGF0aWMgZnJvbVN0cmluZ1N0cmljdChlLHQsbil7bGV0IHI9ITE7aWYoIm51bWJlciI9PXR5cGVvZiB0PyhuPXQsdD0hMSk6cj0hIXQsbj8/PTEwLGUudHJpbSgpIT09ZSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBjb250YWlucyBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyB3aGl0ZXNwYWNlYCk7aWYoIWZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj0iMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Ii5zbGljZSgwLHQ9dD8/MTApO3JldHVybiFuZXcgUmVnRXhwKGBbXi0rJHtufV1gLCJpIikudGVzdChlKSYmZX0oZSxuKSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgZm9yIHJhZGl4OiAke259YCk7Y29uc3QgaT1OZShlKSxvPWplLl9mcm9tU3RyaW5nKGkscixuKTtpZihvLnRvU3RyaW5nKG4pLnRvTG93ZXJDYXNlKCkhPT1pLnRvTG93ZXJDYXNlKCkpdGhyb3cgbmV3IFooYElucHV0OiAke2V9IGlzIG5vdCByZXByZXNlbnRhYmxlIGFzICR7by51bnNpZ25lZD8iYW4gdW5zaWduZWQiOiJhIHNpZ25lZCJ9IDY0LWJpdCBMb25nICR7bnVsbCE9bj9gd2l0aCByYWRpeDogJHtufWA6IiJ9YCk7cmV0dXJuIG99c3RhdGljIGZyb21TdHJpbmcoZSx0LG4pe2xldCByPSExO3JldHVybiJudW1iZXIiPT10eXBlb2YgdD8obj10LHQ9ITEpOnI9ISF0LG4/Pz0xMCwiTmFOIj09PWUmJm48MjR8fCgiSW5maW5pdHkiPT09ZXx8IitJbmZpbml0eSI9PT1lfHwiLUluZmluaXR5Ij09PWUpJiZuPDM1P2plLlpFUk86amUuX2Zyb21TdHJpbmcoZSxyLG4pfXN0YXRpYyBmcm9tQnl0ZXMoZSx0LG4pe3JldHVybiBuP2plLmZyb21CeXRlc0xFKGUsdCk6amUuZnJvbUJ5dGVzQkUoZSx0KX1zdGF0aWMgZnJvbUJ5dGVzTEUoZSx0KXtyZXR1cm4gbmV3IGplKGVbMF18ZVsxXTw8OHxlWzJdPDwxNnxlWzNdPDwyNCxlWzRdfGVbNV08PDh8ZVs2XTw8MTZ8ZVs3XTw8MjQsdCl9c3RhdGljIGZyb21CeXRlc0JFKGUsdCl7cmV0dXJuIG5ldyBqZShlWzRdPDwyNHxlWzVdPDwxNnxlWzZdPDw4fGVbN10sZVswXTw8MjR8ZVsxXTw8MTZ8ZVsyXTw8OHxlWzNdLHQpfXN0YXRpYyBpc0xvbmcoZSl7cmV0dXJuIG51bGwhPWUmJiJvYmplY3QiPT10eXBlb2YgZSYmIl9faXNMb25nX18iaW4gZSYmITA9PT1lLl9faXNMb25nX199c3RhdGljIGZyb21WYWx1ZShlLHQpe3JldHVybiJudW1iZXIiPT10eXBlb2YgZT9qZS5mcm9tTnVtYmVyKGUsdCk6InN0cmluZyI9PXR5cGVvZiBlP2plLmZyb21TdHJpbmcoZSx0KTpqZS5mcm9tQml0cyhlLmxvdyxlLmhpZ2gsImJvb2xlYW4iPT10eXBlb2YgdD90OmUudW5zaWduZWQpfWFkZChlKXtqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSk7Y29uc3QgdD10aGlzLmhpZ2g+Pj4xNixuPTY1NTM1JnRoaXMuaGlnaCxyPXRoaXMubG93Pj4+MTYsaT02NTUzNSZ0aGlzLmxvdyxvPWUuaGlnaD4+PjE2LHM9NjU1MzUmZS5oaWdoLGE9ZS5sb3c+Pj4xNjtsZXQgYz0wLGY9MCxsPTAsdT0wO3JldHVybiB1Kz1pKyg2NTUzNSZlLmxvdyksbCs9dT4+PjE2LHUmPTY1NTM1LGwrPXIrYSxmKz1sPj4+MTYsbCY9NjU1MzUsZis9bitzLGMrPWY+Pj4xNixmJj02NTUzNSxjKz10K28sYyY9NjU1MzUsamUuZnJvbUJpdHMobDw8MTZ8dSxjPDwxNnxmLHRoaXMudW5zaWduZWQpfWFuZChlKXtyZXR1cm4gamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLGplLmZyb21CaXRzKHRoaXMubG93JmUubG93LHRoaXMuaGlnaCZlLmhpZ2gsdGhpcy51bnNpZ25lZCl9Y29tcGFyZShlKXtpZihqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSksdGhpcy5lcShlKSlyZXR1cm4gMDtjb25zdCB0PXRoaXMuaXNOZWdhdGl2ZSgpLG49ZS5pc05lZ2F0aXZlKCk7cmV0dXJuIHQmJiFuPy0xOiF0JiZuPzE6dGhpcy51bnNpZ25lZD9lLmhpZ2g+Pj4wPnRoaXMuaGlnaD4+PjB8fGUuaGlnaD09PXRoaXMuaGlnaCYmZS5sb3c+Pj4wPnRoaXMubG93Pj4+MD8tMToxOnRoaXMuc3ViKGUpLmlzTmVnYXRpdmUoKT8tMToxfWNvbXAoZSl7cmV0dXJuIHRoaXMuY29tcGFyZShlKX1kaXZpZGUoZSl7aWYoamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLGUuaXNaZXJvKCkpdGhyb3cgbmV3IFooImRpdmlzaW9uIGJ5IHplcm8iKTtpZihJZSl7aWYoIXRoaXMudW5zaWduZWQmJi0yMTQ3NDgzNjQ4PT09dGhpcy5oaWdoJiYtMT09PWUubG93JiYtMT09PWUuaGlnaClyZXR1cm4gdGhpcztjb25zdCB0PSh0aGlzLnVuc2lnbmVkP0llLmRpdl91OkllLmRpdl9zKSh0aGlzLmxvdyx0aGlzLmhpZ2gsZS5sb3csZS5oaWdoKTtyZXR1cm4gamUuZnJvbUJpdHModCxJZS5nZXRfaGlnaCgpLHRoaXMudW5zaWduZWQpfWlmKHRoaXMuaXNaZXJvKCkpcmV0dXJuIHRoaXMudW5zaWduZWQ/amUuVVpFUk86amUuWkVSTztsZXQgdCxuLHI7aWYodGhpcy51bnNpZ25lZCl7aWYoZS51bnNpZ25lZHx8KGU9ZS50b1Vuc2lnbmVkKCkpLGUuZ3QodGhpcykpcmV0dXJuIGplLlVaRVJPO2lmKGUuZ3QodGhpcy5zaHJ1KDEpKSlyZXR1cm4gamUuVU9ORTtyPWplLlVaRVJPfWVsc2V7aWYodGhpcy5lcShqZS5NSU5fVkFMVUUpKXtpZihlLmVxKGplLk9ORSl8fGUuZXEoamUuTkVHX09ORSkpcmV0dXJuIGplLk1JTl9WQUxVRTtpZihlLmVxKGplLk1JTl9WQUxVRSkpcmV0dXJuIGplLk9ORTtyZXR1cm4gdD10aGlzLnNocigxKS5kaXYoZSkuc2hsKDEpLHQuZXEoamUuWkVSTyk/ZS5pc05lZ2F0aXZlKCk/amUuT05FOmplLk5FR19PTkU6KG49dGhpcy5zdWIoZS5tdWwodCkpLHI9dC5hZGQobi5kaXYoZSkpLHIpfWlmKGUuZXEoamUuTUlOX1ZBTFVFKSlyZXR1cm4gdGhpcy51bnNpZ25lZD9qZS5VWkVSTzpqZS5aRVJPO2lmKHRoaXMuaXNOZWdhdGl2ZSgpKXJldHVybiBlLmlzTmVnYXRpdmUoKT90aGlzLm5lZygpLmRpdihlLm5lZygpKTp0aGlzLm5lZygpLmRpdihlKS5uZWcoKTtpZihlLmlzTmVnYXRpdmUoKSlyZXR1cm4gdGhpcy5kaXYoZS5uZWcoKSkubmVnKCk7cj1qZS5aRVJPfWZvcihuPXRoaXM7bi5ndGUoZSk7KXt0PU1hdGgubWF4KDEsTWF0aC5mbG9vcihuLnRvTnVtYmVyKCkvZS50b051bWJlcigpKSk7Y29uc3QgaT1NYXRoLmNlaWwoTWF0aC5sb2codCkvTWF0aC5MTjIpLG89aTw9NDg/MTpNYXRoLnBvdygyLGktNDgpO2xldCBzPWplLmZyb21OdW1iZXIodCksYT1zLm11bChlKTtmb3IoO2EuaXNOZWdhdGl2ZSgpfHxhLmd0KG4pOyl0LT1vLHM9amUuZnJvbU51bWJlcih0LHRoaXMudW5zaWduZWQpLGE9cy5tdWwoZSk7cy5pc1plcm8oKSYmKHM9amUuT05FKSxyPXIuYWRkKHMpLG49bi5zdWIoYSl9cmV0dXJuIHJ9ZGl2KGUpe3JldHVybiB0aGlzLmRpdmlkZShlKX1lcXVhbHMoZSl7cmV0dXJuIGplLmlzTG9uZyhlKXx8KGU9amUuZnJvbVZhbHVlKGUpKSwodGhpcy51bnNpZ25lZD09PWUudW5zaWduZWR8fHRoaXMuaGlnaD4+PjMxIT0xfHxlLmhpZ2g+Pj4zMSE9MSkmJih0aGlzLmhpZ2g9PT1lLmhpZ2gmJnRoaXMubG93PT09ZS5sb3cpfWVxKGUpe3JldHVybiB0aGlzLmVxdWFscyhlKX1nZXRIaWdoQml0cygpe3JldHVybiB0aGlzLmhpZ2h9Z2V0SGlnaEJpdHNVbnNpZ25lZCgpe3JldHVybiB0aGlzLmhpZ2g+Pj4wfWdldExvd0JpdHMoKXtyZXR1cm4gdGhpcy5sb3d9Z2V0TG93Qml0c1Vuc2lnbmVkKCl7cmV0dXJuIHRoaXMubG93Pj4+MH1nZXROdW1CaXRzQWJzKCl7aWYodGhpcy5pc05lZ2F0aXZlKCkpcmV0dXJuIHRoaXMuZXEoamUuTUlOX1ZBTFVFKT82NDp0aGlzLm5lZygpLmdldE51bUJpdHNBYnMoKTtjb25zdCBlPTAhPT10aGlzLmhpZ2g/dGhpcy5oaWdoOnRoaXMubG93O2xldCB0O2Zvcih0PTMxO3Q+MCYmIShlJjE8PHQpO3QtLSk7cmV0dXJuIDAhPT10aGlzLmhpZ2g/dCszMzp0KzF9Z3JlYXRlclRoYW4oZSl7cmV0dXJuIHRoaXMuY29tcChlKT4wfWd0KGUpe3JldHVybiB0aGlzLmdyZWF0ZXJUaGFuKGUpfWdyZWF0ZXJUaGFuT3JFcXVhbChlKXtyZXR1cm4gdGhpcy5jb21wKGUpPj0wfWd0ZShlKXtyZXR1cm4gdGhpcy5ncmVhdGVyVGhhbk9yRXF1YWwoZSl9Z2UoZSl7cmV0dXJuIHRoaXMuZ3JlYXRlclRoYW5PckVxdWFsKGUpfWlzRXZlbigpe3JldHVybiEoMSZ0aGlzLmxvdyl9aXNOZWdhdGl2ZSgpe3JldHVybiF0aGlzLnVuc2lnbmVkJiZ0aGlzLmhpZ2g8MH1pc09kZCgpe3JldHVybiEoMSZ+dGhpcy5sb3cpfWlzUG9zaXRpdmUoKXtyZXR1cm4gdGhpcy51bnNpZ25lZHx8dGhpcy5oaWdoPj0wfWlzWmVybygpe3JldHVybiAwPT09dGhpcy5oaWdoJiYwPT09dGhpcy5sb3d9bGVzc1RoYW4oZSl7cmV0dXJuIHRoaXMuY29tcChlKTwwfWx0KGUpe3JldHVybiB0aGlzLmxlc3NUaGFuKGUpfWxlc3NUaGFuT3JFcXVhbChlKXtyZXR1cm4gdGhpcy5jb21wKGUpPD0wfWx0ZShlKXtyZXR1cm4gdGhpcy5sZXNzVGhhbk9yRXF1YWwoZSl9bW9kdWxvKGUpe2lmKGplLmlzTG9uZyhlKXx8KGU9amUuZnJvbVZhbHVlKGUpKSxJZSl7Y29uc3QgdD0odGhpcy51bnNpZ25lZD9JZS5yZW1fdTpJZS5yZW1fcykodGhpcy5sb3csdGhpcy5oaWdoLGUubG93LGUuaGlnaCk7cmV0dXJuIGplLmZyb21CaXRzKHQsSWUuZ2V0X2hpZ2goKSx0aGlzLnVuc2lnbmVkKX1yZXR1cm4gdGhpcy5zdWIodGhpcy5kaXYoZSkubXVsKGUpKX1tb2QoZSl7cmV0dXJuIHRoaXMubW9kdWxvKGUpfXJlbShlKXtyZXR1cm4gdGhpcy5tb2R1bG8oZSl9bXVsdGlwbHkoZSl7aWYodGhpcy5pc1plcm8oKSlyZXR1cm4gamUuWkVSTztpZihqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSksSWUpe2NvbnN0IHQ9SWUubXVsKHRoaXMubG93LHRoaXMuaGlnaCxlLmxvdyxlLmhpZ2gpO3JldHVybiBqZS5mcm9tQml0cyh0LEllLmdldF9oaWdoKCksdGhpcy51bnNpZ25lZCl9aWYoZS5pc1plcm8oKSlyZXR1cm4gamUuWkVSTztpZih0aGlzLmVxKGplLk1JTl9WQUxVRSkpcmV0dXJuIGUuaXNPZGQoKT9qZS5NSU5fVkFMVUU6amUuWkVSTztpZihlLmVxKGplLk1JTl9WQUxVRSkpcmV0dXJuIHRoaXMuaXNPZGQoKT9qZS5NSU5fVkFMVUU6amUuWkVSTztpZih0aGlzLmlzTmVnYXRpdmUoKSlyZXR1cm4gZS5pc05lZ2F0aXZlKCk/dGhpcy5uZWcoKS5tdWwoZS5uZWcoKSk6dGhpcy5uZWcoKS5tdWwoZSkubmVnKCk7aWYoZS5pc05lZ2F0aXZlKCkpcmV0dXJuIHRoaXMubXVsKGUubmVnKCkpLm5lZygpO2lmKHRoaXMubHQoamUuVFdPX1BXUl8yNCkmJmUubHQoamUuVFdPX1BXUl8yNCkpcmV0dXJuIGplLmZyb21OdW1iZXIodGhpcy50b051bWJlcigpKmUudG9OdW1iZXIoKSx0aGlzLnVuc2lnbmVkKTtjb25zdCB0PXRoaXMuaGlnaD4+PjE2LG49NjU1MzUmdGhpcy5oaWdoLHI9dGhpcy5sb3c+Pj4xNixpPTY1NTM1JnRoaXMubG93LG89ZS5oaWdoPj4+MTYscz02NTUzNSZlLmhpZ2gsYT1lLmxvdz4+PjE2LGM9NjU1MzUmZS5sb3c7bGV0IGY9MCxsPTAsdT0wLF89MDtyZXR1cm4gXys9aSpjLHUrPV8+Pj4xNixfJj02NTUzNSx1Kz1yKmMsbCs9dT4+PjE2LHUmPTY1NTM1LHUrPWkqYSxsKz11Pj4+MTYsdSY9NjU1MzUsbCs9bipjLGYrPWw+Pj4xNixsJj02NTUzNSxsKz1yKmEsZis9bD4+PjE2LGwmPTY1NTM1LGwrPWkqcyxmKz1sPj4+MTYsbCY9NjU1MzUsZis9dCpjK24qYStyKnMraSpvLGYmPTY1NTM1LGplLmZyb21CaXRzKHU8PDE2fF8sZjw8MTZ8bCx0aGlzLnVuc2lnbmVkKX1tdWwoZSl7cmV0dXJuIHRoaXMubXVsdGlwbHkoZSl9bmVnYXRlKCl7cmV0dXJuIXRoaXMudW5zaWduZWQmJnRoaXMuZXEoamUuTUlOX1ZBTFVFKT9qZS5NSU5fVkFMVUU6dGhpcy5ub3QoKS5hZGQoamUuT05FKX1uZWcoKXtyZXR1cm4gdGhpcy5uZWdhdGUoKX1ub3QoKXtyZXR1cm4gamUuZnJvbUJpdHMofnRoaXMubG93LH50aGlzLmhpZ2gsdGhpcy51bnNpZ25lZCl9bm90RXF1YWxzKGUpe3JldHVybiF0aGlzLmVxdWFscyhlKX1uZXEoZSl7cmV0dXJuIHRoaXMubm90RXF1YWxzKGUpfW5lKGUpe3JldHVybiB0aGlzLm5vdEVxdWFscyhlKX1vcihlKXtyZXR1cm4gamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLGplLmZyb21CaXRzKHRoaXMubG93fGUubG93LHRoaXMuaGlnaHxlLmhpZ2gsdGhpcy51bnNpZ25lZCl9c2hpZnRMZWZ0KGUpe3JldHVybiBqZS5pc0xvbmcoZSkmJihlPWUudG9JbnQoKSksMD09KGUmPTYzKT90aGlzOmU8MzI/amUuZnJvbUJpdHModGhpcy5sb3c8PGUsdGhpcy5oaWdoPDxlfHRoaXMubG93Pj4+MzItZSx0aGlzLnVuc2lnbmVkKTpqZS5mcm9tQml0cygwLHRoaXMubG93PDxlLTMyLHRoaXMudW5zaWduZWQpfXNobChlKXtyZXR1cm4gdGhpcy5zaGlmdExlZnQoZSl9c2hpZnRSaWdodChlKXtyZXR1cm4gamUuaXNMb25nKGUpJiYoZT1lLnRvSW50KCkpLDA9PShlJj02Myk/dGhpczplPDMyP2plLmZyb21CaXRzKHRoaXMubG93Pj4+ZXx0aGlzLmhpZ2g8PDMyLWUsdGhpcy5oaWdoPj5lLHRoaXMudW5zaWduZWQpOmplLmZyb21CaXRzKHRoaXMuaGlnaD4+ZS0zMix0aGlzLmhpZ2g+PTA/MDotMSx0aGlzLnVuc2lnbmVkKX1zaHIoZSl7cmV0dXJuIHRoaXMuc2hpZnRSaWdodChlKX1zaGlmdFJpZ2h0VW5zaWduZWQoZSl7aWYoamUuaXNMb25nKGUpJiYoZT1lLnRvSW50KCkpLDA9PT0oZSY9NjMpKXJldHVybiB0aGlzO3tjb25zdCB0PXRoaXMuaGlnaDtpZihlPDMyKXtjb25zdCBuPXRoaXMubG93O3JldHVybiBqZS5mcm9tQml0cyhuPj4+ZXx0PDwzMi1lLHQ+Pj5lLHRoaXMudW5zaWduZWQpfXJldHVybiAzMj09PWU/amUuZnJvbUJpdHModCwwLHRoaXMudW5zaWduZWQpOmplLmZyb21CaXRzKHQ+Pj5lLTMyLDAsdGhpcy51bnNpZ25lZCl9fXNocl91KGUpe3JldHVybiB0aGlzLnNoaWZ0UmlnaHRVbnNpZ25lZChlKX1zaHJ1KGUpe3JldHVybiB0aGlzLnNoaWZ0UmlnaHRVbnNpZ25lZChlKX1zdWJ0cmFjdChlKXtyZXR1cm4gamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLHRoaXMuYWRkKGUubmVnKCkpfXN1YihlKXtyZXR1cm4gdGhpcy5zdWJ0cmFjdChlKX10b0ludCgpe3JldHVybiB0aGlzLnVuc2lnbmVkP3RoaXMubG93Pj4+MDp0aGlzLmxvd310b051bWJlcigpe3JldHVybiB0aGlzLnVuc2lnbmVkPyh0aGlzLmhpZ2g+Pj4wKSp2ZSsodGhpcy5sb3c+Pj4wKTp0aGlzLmhpZ2gqdmUrKHRoaXMubG93Pj4+MCl9dG9CaWdJbnQoKXtyZXR1cm4gQmlnSW50KHRoaXMudG9TdHJpbmcoKSl9dG9CeXRlcyhlKXtyZXR1cm4gZT90aGlzLnRvQnl0ZXNMRSgpOnRoaXMudG9CeXRlc0JFKCl9dG9CeXRlc0xFKCl7Y29uc3QgZT10aGlzLmhpZ2gsdD10aGlzLmxvdztyZXR1cm5bMjU1JnQsdD4+PjgmMjU1LHQ+Pj4xNiYyNTUsdD4+PjI0LDI1NSZlLGU+Pj44JjI1NSxlPj4+MTYmMjU1LGU+Pj4yNF19dG9CeXRlc0JFKCl7Y29uc3QgZT10aGlzLmhpZ2gsdD10aGlzLmxvdztyZXR1cm5bZT4+PjI0LGU+Pj4xNiYyNTUsZT4+PjgmMjU1LDI1NSZlLHQ+Pj4yNCx0Pj4+MTYmMjU1LHQ+Pj44JjI1NSwyNTUmdF19dG9TaWduZWQoKXtyZXR1cm4gdGhpcy51bnNpZ25lZD9qZS5mcm9tQml0cyh0aGlzLmxvdyx0aGlzLmhpZ2gsITEpOnRoaXN9dG9TdHJpbmcoZSl7aWYoKGU9ZXx8MTApPDJ8fDM2PGUpdGhyb3cgbmV3IFooInJhZGl4Iik7aWYodGhpcy5pc1plcm8oKSlyZXR1cm4iMCI7aWYodGhpcy5pc05lZ2F0aXZlKCkpe2lmKHRoaXMuZXEoamUuTUlOX1ZBTFVFKSl7Y29uc3QgdD1qZS5mcm9tTnVtYmVyKGUpLG49dGhpcy5kaXYodCkscj1uLm11bCh0KS5zdWIodGhpcyk7cmV0dXJuIG4udG9TdHJpbmcoZSkrci50b0ludCgpLnRvU3RyaW5nKGUpfXJldHVybiItIit0aGlzLm5lZygpLnRvU3RyaW5nKGUpfWNvbnN0IHQ9amUuZnJvbU51bWJlcihNYXRoLnBvdyhlLDYpLHRoaXMudW5zaWduZWQpO2xldCBuPXRoaXMscj0iIjtmb3IoOzspe2NvbnN0IGk9bi5kaXYodCk7bGV0IG89KG4uc3ViKGkubXVsKHQpKS50b0ludCgpPj4+MCkudG9TdHJpbmcoZSk7aWYobj1pLG4uaXNaZXJvKCkpcmV0dXJuIG8rcjtmb3IoO28ubGVuZ3RoPDY7KW89IjAiK287cj0iIitvK3J9fXRvVW5zaWduZWQoKXtyZXR1cm4gdGhpcy51bnNpZ25lZD90aGlzOmplLmZyb21CaXRzKHRoaXMubG93LHRoaXMuaGlnaCwhMCl9eG9yKGUpe3JldHVybiBqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSksamUuZnJvbUJpdHModGhpcy5sb3deZS5sb3csdGhpcy5oaWdoXmUuaGlnaCx0aGlzLnVuc2lnbmVkKX1lcXooKXtyZXR1cm4gdGhpcy5pc1plcm8oKX1sZShlKXtyZXR1cm4gdGhpcy5sZXNzVGhhbk9yRXF1YWwoZSl9dG9FeHRlbmRlZEpTT04oZSl7cmV0dXJuIGUmJmUucmVsYXhlZD90aGlzLnRvTnVtYmVyKCk6eyRudW1iZXJMb25nOnRoaXMudG9TdHJpbmcoKX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSx0KXtjb25zdHt1c2VCaWdJbnQ2NDpuPSExLHJlbGF4ZWQ6cj0hMH09ey4uLnR9O2lmKGUuJG51bWJlckxvbmcubGVuZ3RoPjIwKXRocm93IG5ldyBaKCIkbnVtYmVyTG9uZyBzdHJpbmcgaXMgdG9vIGxvbmciKTtpZighUmUudGVzdChlLiRudW1iZXJMb25nKSl0aHJvdyBuZXcgWihgJG51bWJlckxvbmcgc3RyaW5nICIke2UuJG51bWJlckxvbmd9IiBpcyBpbiBhbiBpbnZhbGlkIGZvcm1hdGApO2lmKG4pe2NvbnN0IHQ9QmlnSW50KGUuJG51bWJlckxvbmcpO3JldHVybiBCaWdJbnQuYXNJbnROKDY0LHQpfWNvbnN0IGk9amUuZnJvbVN0cmluZyhlLiRudW1iZXJMb25nKTtyZXR1cm4gcj9pLnRvTnVtYmVyKCk6aX1pbnNwZWN0KGUsdCxuKXtuPz89dztyZXR1cm5gbmV3IExvbmcoJHtuKHRoaXMudG9TdHJpbmcoKSx0KX0ke3RoaXMudW5zaWduZWQ/YCwgJHtuKHRoaXMudW5zaWduZWQsdCl9YDoiIn0pYH19Y29uc3QgRmU9L14oXCt8LSk/KFxkK3woXGQqXC5cZCopKT8oRXxlKT8oWy0rXSk/KFxkKyk/JC8sa2U9L14oXCt8LSk/KEluZmluaXR5fGluZikkL2ksemU9L14oXCt8LSk/TmFOJC9pLERlPTYxMTEsQ2U9LTYxNzYsTWU9X2UuZnJvbU51bWJlckFycmF5KFsxMjQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLnJldmVyc2UoKSksVmU9X2UuZnJvbU51bWJlckFycmF5KFsyNDgsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLnJldmVyc2UoKSksUGU9X2UuZnJvbU51bWJlckFycmF5KFsxMjAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLnJldmVyc2UoKSksSmU9L14oWy0rXSk/KFxkKyk/JC87ZnVuY3Rpb24gV2UoZSl7cmV0dXJuIWlzTmFOKHBhcnNlSW50KGUsMTApKX1mdW5jdGlvbiBZZShlKXtjb25zdCB0PWplLmZyb21OdW1iZXIoMWU5KTtsZXQgbj1qZS5mcm9tTnVtYmVyKDApO2lmKCEoZS5wYXJ0c1swXXx8ZS5wYXJ0c1sxXXx8ZS5wYXJ0c1syXXx8ZS5wYXJ0c1szXSkpcmV0dXJue3F1b3RpZW50OmUscmVtOm59O2ZvcihsZXQgcj0wO3I8PTM7cisrKW49bi5zaGlmdExlZnQoMzIpLG49bi5hZGQobmV3IGplKGUucGFydHNbcl0sMCkpLGUucGFydHNbcl09bi5kaXYodCkubG93LG49bi5tb2R1bG8odCk7cmV0dXJue3F1b3RpZW50OmUscmVtOm59fWZ1bmN0aW9uIHFlKGUsdCl7dGhyb3cgbmV3IFooYCIke2V9IiBpcyBub3QgYSB2YWxpZCBEZWNpbWFsMTI4IHN0cmluZyAtICR7dH1gKX1jbGFzcyBIZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iRGVjaW1hbDEyOCJ9Ynl0ZXM7Y29uc3RydWN0b3IoZSl7aWYoc3VwZXIoKSwic3RyaW5nIj09dHlwZW9mIGUpdGhpcy5ieXRlcz1IZS5mcm9tU3RyaW5nKGUpLmJ5dGVzO2Vsc2V7aWYoIShlIGluc3RhbmNlb2YgVWludDhBcnJheXx8XyhlKSkpdGhyb3cgbmV3IFooIkRlY2ltYWwxMjggbXVzdCB0YWtlIGEgQnVmZmVyIG9yIHN0cmluZyIpO2lmKDE2IT09ZS5ieXRlTGVuZ3RoKXRocm93IG5ldyBaKCJEZWNpbWFsMTI4IG11c3QgdGFrZSBhIEJ1ZmZlciBvZiAxNiBieXRlcyIpO3RoaXMuYnl0ZXM9ZX19c3RhdGljIGZyb21TdHJpbmcoZSl7cmV0dXJuIEhlLl9mcm9tU3RyaW5nKGUse2FsbG93Um91bmRpbmc6ITF9KX1zdGF0aWMgZnJvbVN0cmluZ1dpdGhSb3VuZGluZyhlKXtyZXR1cm4gSGUuX2Zyb21TdHJpbmcoZSx7YWxsb3dSb3VuZGluZzohMH0pfXN0YXRpYyBfZnJvbVN0cmluZyhlLHQpe2xldCBuPSExLHI9ITEsaT0hMSxvPSExLHM9MCxhPTAsYz0wLGY9MCxsPTA7Y29uc3QgdT1bMF07bGV0IF89MCxnPTAsaD0wLGI9MCxkPW5ldyBqZSgwLDApLHc9bmV3IGplKDAsMCkscD0wLHk9MDtpZihlLmxlbmd0aD49N2UzKXRocm93IG5ldyBaKGUrIiBub3QgYSB2YWxpZCBEZWNpbWFsMTI4IHN0cmluZyIpO2NvbnN0IG09ZS5tYXRjaChGZSksUz1lLm1hdGNoKGtlKSxCPWUubWF0Y2goemUpO2lmKCFtJiYhUyYmIUJ8fDA9PT1lLmxlbmd0aCl0aHJvdyBuZXcgWihlKyIgbm90IGEgdmFsaWQgRGVjaW1hbDEyOCBzdHJpbmciKTtpZihtKXtjb25zdCB0PW1bMl0sbj1tWzRdLHI9bVs1XSxpPW1bNl07biYmdm9pZCAwPT09aSYmcWUoZSwibWlzc2luZyBleHBvbmVudCBwb3dlciIpLG4mJnZvaWQgMD09PXQmJnFlKGUsIm1pc3NpbmcgZXhwb25lbnQgYmFzZSIpLHZvaWQgMD09PW4mJihyfHxpKSYmcWUoZSwibWlzc2luZyBlIGJlZm9yZSBleHBvbmVudCIpfWlmKCIrIiE9PWVbeV0mJiItIiE9PWVbeV18fChyPSEwLG49Ii0iPT09ZVt5KytdKSwhV2UoZVt5XSkmJiIuIiE9PWVbeV0pe2lmKCJpIj09PWVbeV18fCJJIj09PWVbeV0pcmV0dXJuIG5ldyBIZShuP1ZlOlBlKTtpZigiTiI9PT1lW3ldKXJldHVybiBuZXcgSGUoTWUpfWZvcig7V2UoZVt5XSl8fCIuIj09PWVbeV07KSIuIiE9PWVbeV0/KF88MzQmJigiMCIhPT1lW3ldfHxvKSYmKG98fChsPWEpLG89ITAsdVtnKytdPXBhcnNlSW50KGVbeV0sMTApLF8rPTEpLG8mJihjKz0xKSxpJiYoZis9MSksYSs9MSx5Kz0xKTooaSYmcWUoZSwiY29udGFpbnMgbXVsdGlwbGUgcGVyaW9kcyIpLGk9ITAseSs9MSk7aWYoaSYmIWEpdGhyb3cgbmV3IFooZSsiIG5vdCBhIHZhbGlkIERlY2ltYWwxMjggc3RyaW5nIik7aWYoImUiPT09ZVt5XXx8IkUiPT09ZVt5XSl7Y29uc3QgdD1lLnN1YnN0cigrK3kpLm1hdGNoKEplKTtpZighdHx8IXRbMl0pcmV0dXJuIG5ldyBIZShNZSk7Yj1wYXJzZUludCh0WzBdLDEwKSx5Kz10WzBdLmxlbmd0aH1pZihlW3ldKXJldHVybiBuZXcgSGUoTWUpO2lmKF8pe2lmKGg9Xy0xLHM9YywxIT09cylmb3IoOyIwIj09PWVbbCtzLTErTnVtYmVyKHIpK051bWJlcihpKV07KXMtPTF9ZWxzZSB1WzBdPTAsYz0xLF89MSxzPTA7Zm9yKGI8PWYmJmY+YisxNjM4ND9iPUNlOmItPWY7Yj5EZTspe2lmKGgrPTEsaD49MzQpe2lmKDA9PT1zKXtiPURlO2JyZWFrfXFlKGUsIm92ZXJmbG93Iil9Yi09MX1pZih0LmFsbG93Um91bmRpbmcpe2Zvcig7YjxDZXx8XzxjOyl7aWYoMD09PWgmJnM8Xyl7Yj1DZSxzPTA7YnJlYWt9aWYoXzxjP2MtPTE6aC09MSxiPERlKWIrPTE7ZWxzZXtpZih1LmpvaW4oIiIpLm1hdGNoKC9eMCskLykpe2I9RGU7YnJlYWt9cWUoZSwib3ZlcmZsb3ciKX19aWYoaCsxPHMpe2xldCB0PWE7aSYmKGwrPTEsdCs9MSksciYmKGwrPTEsdCs9MSk7Y29uc3Qgbz1wYXJzZUludChlW2wraCsxXSwxMCk7bGV0IHM9MDtpZihvPj01JiYocz0xLDU9PT1vKSl7cz11W2hdJTI9PTE/MTowO2ZvcihsZXQgbj1sK2grMjtuPHQ7bisrKWlmKHBhcnNlSW50KGVbbl0sMTApKXtzPTE7YnJlYWt9fWlmKHMpe2xldCBlPWg7Zm9yKDtlPj0wJiYrK3VbZV0+OTtlLS0paWYodVtlXT0wLDA9PT1lKXtpZighKGI8RGUpKXJldHVybiBuZXcgSGUobj9WZTpQZSk7Yis9MSx1W2VdPTF9fX19ZWxzZXtmb3IoO2I8Q2V8fF88Yzspe2lmKDA9PT1oKXtpZigwPT09cyl7Yj1DZTticmVha31xZShlLCJleHBvbmVudCB1bmRlcmZsb3ciKX1fPGM/KCIwIiE9PWVbYy0xK051bWJlcihyKStOdW1iZXIoaSldJiYwIT09cyYmcWUoZSwiaW5leGFjdCByb3VuZGluZyIpLGMtPTEpOigwIT09dVtoXSYmcWUoZSwiaW5leGFjdCByb3VuZGluZyIpLGgtPTEpLGI8RGU/Yis9MTpxZShlLCJvdmVyZmxvdyIpfWlmKGgrMTxzKXtpJiYobCs9MSksciYmKGwrPTEpOzAhPT1wYXJzZUludChlW2wraCsxXSwxMCkmJnFlKGUsImluZXhhY3Qgcm91bmRpbmciKX19aWYoZD1qZS5mcm9tTnVtYmVyKDApLHc9amUuZnJvbU51bWJlcigwKSwwPT09cylkPWplLmZyb21OdW1iZXIoMCksdz1qZS5mcm9tTnVtYmVyKDApO2Vsc2UgaWYoaDwxNyl7bGV0IGU9MDtmb3Iodz1qZS5mcm9tTnVtYmVyKHVbZSsrXSksZD1uZXcgamUoMCwwKTtlPD1oO2UrKyl3PXcubXVsdGlwbHkoamUuZnJvbU51bWJlcigxMCkpLHc9dy5hZGQoamUuZnJvbU51bWJlcih1W2VdKSl9ZWxzZXtsZXQgZT0wO2ZvcihkPWplLmZyb21OdW1iZXIodVtlKytdKTtlPD1oLTE3O2UrKylkPWQubXVsdGlwbHkoamUuZnJvbU51bWJlcigxMCkpLGQ9ZC5hZGQoamUuZnJvbU51bWJlcih1W2VdKSk7Zm9yKHc9amUuZnJvbU51bWJlcih1W2UrK10pO2U8PWg7ZSsrKXc9dy5tdWx0aXBseShqZS5mcm9tTnVtYmVyKDEwKSksdz13LmFkZChqZS5mcm9tTnVtYmVyKHVbZV0pKX1jb25zdCB4PWZ1bmN0aW9uKGUsdCl7aWYoIWUmJiF0KXJldHVybntoaWdoOmplLmZyb21OdW1iZXIoMCksbG93OmplLmZyb21OdW1iZXIoMCl9O2NvbnN0IG49ZS5zaGlmdFJpZ2h0VW5zaWduZWQoMzIpLHI9bmV3IGplKGUuZ2V0TG93Qml0cygpLDApLGk9dC5zaGlmdFJpZ2h0VW5zaWduZWQoMzIpLG89bmV3IGplKHQuZ2V0TG93Qml0cygpLDApO2xldCBzPW4ubXVsdGlwbHkoaSksYT1uLm11bHRpcGx5KG8pO2NvbnN0IGM9ci5tdWx0aXBseShpKTtsZXQgZj1yLm11bHRpcGx5KG8pO3JldHVybiBzPXMuYWRkKGEuc2hpZnRSaWdodFVuc2lnbmVkKDMyKSksYT1uZXcgamUoYS5nZXRMb3dCaXRzKCksMCkuYWRkKGMpLmFkZChmLnNoaWZ0UmlnaHRVbnNpZ25lZCgzMikpLHM9cy5hZGQoYS5zaGlmdFJpZ2h0VW5zaWduZWQoMzIpKSxmPWEuc2hpZnRMZWZ0KDMyKS5hZGQobmV3IGplKGYuZ2V0TG93Qml0cygpLDApKSx7aGlnaDpzLGxvdzpmfX0oZCxqZS5mcm9tU3RyaW5nKCIxMDAwMDAwMDAwMDAwMDAwMDAiKSk7eC5sb3c9eC5sb3cuYWRkKHcpLGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1lLmhpZ2g+Pj4wLHI9dC5oaWdoPj4+MDtpZihuPHIpcmV0dXJuITA7aWYobj09PXImJmUubG93Pj4+MDx0Lmxvdz4+PjApcmV0dXJuITA7cmV0dXJuITF9KHgubG93LHcpJiYoeC5oaWdoPXguaGlnaC5hZGQoamUuZnJvbU51bWJlcigxKSkpLHA9Yis2MTc2O2NvbnN0IEU9e2xvdzpqZS5mcm9tTnVtYmVyKDApLGhpZ2g6amUuZnJvbU51bWJlcigwKX07eC5oaWdoLnNoaWZ0UmlnaHRVbnNpZ25lZCg0OSkuYW5kKGplLmZyb21OdW1iZXIoMSkpLmVxdWFscyhqZS5mcm9tTnVtYmVyKDEpKT8oRS5oaWdoPUUuaGlnaC5vcihqZS5mcm9tTnVtYmVyKDMpLnNoaWZ0TGVmdCg2MSkpLEUuaGlnaD1FLmhpZ2gub3IoamUuZnJvbU51bWJlcihwKS5hbmQoamUuZnJvbU51bWJlcigxNjM4Mykuc2hpZnRMZWZ0KDQ3KSkpLEUuaGlnaD1FLmhpZ2gub3IoeC5oaWdoLmFuZChqZS5mcm9tTnVtYmVyKDB4N2ZmZmZmZmZmZmZmKSkpKTooRS5oaWdoPUUuaGlnaC5vcihqZS5mcm9tTnVtYmVyKDE2MzgzJnApLnNoaWZ0TGVmdCg0OSkpLEUuaGlnaD1FLmhpZ2gub3IoeC5oaWdoLmFuZChqZS5mcm9tTnVtYmVyKDU2Mjk0OTk1MzQyMTMxMSkpKSksRS5sb3c9eC5sb3csbiYmKEUuaGlnaD1FLmhpZ2gub3IoamUuZnJvbVN0cmluZygiOTIyMzM3MjAzNjg1NDc3NTgwOCIpKSk7Y29uc3QgVT1fZS5hbGxvY2F0ZVVuc2FmZSgxNik7cmV0dXJuIHk9MCxVW3krK109MjU1JkUubG93LmxvdyxVW3krK109RS5sb3cubG93Pj44JjI1NSxVW3krK109RS5sb3cubG93Pj4xNiYyNTUsVVt5KytdPUUubG93Lmxvdz4+MjQmMjU1LFVbeSsrXT0yNTUmRS5sb3cuaGlnaCxVW3krK109RS5sb3cuaGlnaD4+OCYyNTUsVVt5KytdPUUubG93LmhpZ2g+PjE2JjI1NSxVW3krK109RS5sb3cuaGlnaD4+MjQmMjU1LFVbeSsrXT0yNTUmRS5oaWdoLmxvdyxVW3krK109RS5oaWdoLmxvdz4+OCYyNTUsVVt5KytdPUUuaGlnaC5sb3c+PjE2JjI1NSxVW3krK109RS5oaWdoLmxvdz4+MjQmMjU1LFVbeSsrXT0yNTUmRS5oaWdoLmhpZ2gsVVt5KytdPUUuaGlnaC5oaWdoPj44JjI1NSxVW3krK109RS5oaWdoLmhpZ2g+PjE2JjI1NSxVW3krK109RS5oaWdoLmhpZ2g+PjI0JjI1NSxuZXcgSGUoVSl9dG9TdHJpbmcoKXtsZXQgZSx0PTA7Y29uc3Qgbj1uZXcgQXJyYXkoMzYpO2ZvcihsZXQgZT0wO2U8bi5sZW5ndGg7ZSsrKW5bZV09MDtsZXQgcixpLG8scz0wLGE9ITEsYz17cGFydHM6WzAsMCwwLDBdfTtjb25zdCBmPVtdO3M9MDtjb25zdCBsPXRoaXMuYnl0ZXMsdT1sW3MrK118bFtzKytdPDw4fGxbcysrXTw8MTZ8bFtzKytdPDwyNCxfPWxbcysrXXxsW3MrK108PDh8bFtzKytdPDwxNnxsW3MrK108PDI0LGc9bFtzKytdfGxbcysrXTw8OHxsW3MrK108PDE2fGxbcysrXTw8MjQsaD1sW3MrK118bFtzKytdPDw4fGxbcysrXTw8MTZ8bFtzKytdPDwyNDtzPTA7KHtsb3c6bmV3IGplKHUsXyksaGlnaDpuZXcgamUoZyxoKX0pLmhpZ2gubGVzc1RoYW4oamUuWkVSTykmJmYucHVzaCgiLSIpO2NvbnN0IGI9aD4+MjYmMzE7aWYoYj4+Mz09Myl7aWYoMzA9PT1iKXJldHVybiBmLmpvaW4oIiIpKyJJbmZpbml0eSI7aWYoMzE9PT1iKXJldHVybiJOYU4iO2U9aD4+MTUmMTYzODMscj04KyhoPj4xNCYxKX1lbHNlIHI9aD4+MTQmNyxlPWg+PjE3JjE2MzgzO2NvbnN0IGQ9ZS02MTc2O2lmKGMucGFydHNbMF09KDE2MzgzJmgpKygoMTUmcik8PDE0KSxjLnBhcnRzWzFdPWcsYy5wYXJ0c1syXT1fLGMucGFydHNbM109dSwwPT09Yy5wYXJ0c1swXSYmMD09PWMucGFydHNbMV0mJjA9PT1jLnBhcnRzWzJdJiYwPT09Yy5wYXJ0c1szXSlhPSEwO2Vsc2UgZm9yKG89MztvPj0wO28tLSl7bGV0IGU9MDtjb25zdCB0PVllKGMpO2lmKGM9dC5xdW90aWVudCxlPXQucmVtLmxvdyxlKWZvcihpPTg7aT49MDtpLS0pbls5Km8raV09ZSUxMCxlPU1hdGguZmxvb3IoZS8xMCl9aWYoYSl0PTEsbltzXT0wO2Vsc2UgZm9yKHQ9MzY7IW5bc107KXQtPTEscys9MTtjb25zdCB3PXQtMStkO2lmKHc+PTM0fHx3PD0tN3x8ZD4wKXtpZih0PjM0KXJldHVybiBmLnB1c2goIjAiKSxkPjA/Zi5wdXNoKGBFKyR7ZH1gKTpkPDAmJmYucHVzaChgRSR7ZH1gKSxmLmpvaW4oIiIpO2YucHVzaChgJHtuW3MrK119YCksdC09MSx0JiZmLnB1c2goIi4iKTtmb3IobGV0IGU9MDtlPHQ7ZSsrKWYucHVzaChgJHtuW3MrK119YCk7Zi5wdXNoKCJFIiksdz4wP2YucHVzaChgKyR7d31gKTpmLnB1c2goYCR7d31gKX1lbHNlIGlmKGQ+PTApZm9yKGxldCBlPTA7ZTx0O2UrKylmLnB1c2goYCR7bltzKytdfWApO2Vsc2V7bGV0IGU9dCtkO2lmKGU+MClmb3IobGV0IHQ9MDt0PGU7dCsrKWYucHVzaChgJHtuW3MrK119YCk7ZWxzZSBmLnB1c2goIjAiKTtmb3IoZi5wdXNoKCIuIik7ZSsrPDA7KWYucHVzaCgiMCIpO2ZvcihsZXQgcj0wO3I8dC1NYXRoLm1heChlLTEsMCk7cisrKWYucHVzaChgJHtuW3MrK119YCl9cmV0dXJuIGYuam9pbigiIil9dG9KU09OKCl7cmV0dXJueyRudW1iZXJEZWNpbWFsOnRoaXMudG9TdHJpbmcoKX19dG9FeHRlbmRlZEpTT04oKXtyZXR1cm57JG51bWJlckRlY2ltYWw6dGhpcy50b1N0cmluZygpfX1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlKXtyZXR1cm4gSGUuZnJvbVN0cmluZyhlLiRudW1iZXJEZWNpbWFsKX1pbnNwZWN0KGUsdCxuKXtuPz89dztyZXR1cm5gbmV3IERlY2ltYWwxMjgoJHtuKHRoaXMudG9TdHJpbmcoKSx0KX0pYH19Y2xhc3MgS2UgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkRvdWJsZSJ9dmFsdWU7Y29uc3RydWN0b3IoZSl7c3VwZXIoKSxlIGluc3RhbmNlb2YgTnVtYmVyJiYoZT1lLnZhbHVlT2YoKSksdGhpcy52YWx1ZT0rZX1zdGF0aWMgZnJvbVN0cmluZyhlKXtjb25zdCB0PU51bWJlcihlKTtpZigiTmFOIj09PWUpcmV0dXJuIG5ldyBLZShOYU4pO2lmKCJJbmZpbml0eSI9PT1lKXJldHVybiBuZXcgS2UoMS8wKTtpZigiLUluZmluaXR5Ij09PWUpcmV0dXJuIG5ldyBLZSgtMS8wKTtpZighTnVtYmVyLmlzRmluaXRlKHQpKXRocm93IG5ldyBaKGBJbnB1dDogJHtlfSBpcyBub3QgcmVwcmVzZW50YWJsZSBhcyBhIERvdWJsZWApO2lmKGUudHJpbSgpIT09ZSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBjb250YWlucyB3aGl0ZXNwYWNlYCk7aWYoIiI9PT1lKXRocm93IG5ldyBaKCJJbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmciKTtpZigvW14tMC05LitlRV0vLnRlc3QoZSkpdGhyb3cgbmV3IFooYElucHV0OiAnJHtlfScgaXMgbm90IGluIGRlY2ltYWwgb3IgZXhwb25lbnRpYWwgbm90YXRpb25gKTtyZXR1cm4gbmV3IEtlKHQpfXZhbHVlT2YoKXtyZXR1cm4gdGhpcy52YWx1ZX10b0pTT04oKXtyZXR1cm4gdGhpcy52YWx1ZX10b1N0cmluZyhlKXtyZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZyhlKX10b0V4dGVuZGVkSlNPTihlKXtyZXR1cm4gZSYmKGUubGVnYWN5fHxlLnJlbGF4ZWQmJmlzRmluaXRlKHRoaXMudmFsdWUpKT90aGlzLnZhbHVlOk9iamVjdC5pcyhNYXRoLnNpZ24odGhpcy52YWx1ZSksLTApP3skbnVtYmVyRG91YmxlOiItMC4wIn06eyRudW1iZXJEb3VibGU6TnVtYmVyLmlzSW50ZWdlcih0aGlzLnZhbHVlKT90aGlzLnZhbHVlLnRvRml4ZWQoMSk6dGhpcy52YWx1ZS50b1N0cmluZygpfX1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlLHQpe2NvbnN0IG49cGFyc2VGbG9hdChlLiRudW1iZXJEb3VibGUpO3JldHVybiB0JiZ0LnJlbGF4ZWQ/bjpuZXcgS2Uobil9aW5zcGVjdChlLHQsbil7cmV0dXJuIG4/Pz13LGBuZXcgRG91YmxlKCR7bih0aGlzLnZhbHVlLHQpfSlgfX1jbGFzcyBaZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iSW50MzIifXZhbHVlO2NvbnN0cnVjdG9yKGUpe3N1cGVyKCksZSBpbnN0YW5jZW9mIE51bWJlciYmKGU9ZS52YWx1ZU9mKCkpLHRoaXMudmFsdWU9MHwrZX1zdGF0aWMgZnJvbVN0cmluZyhlKXtjb25zdCB0PU5lKGUpLG49TnVtYmVyKGUpO2lmKG08bil0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBpcyBsYXJnZXIgdGhhbiB0aGUgbWF4aW11bSB2YWx1ZSBmb3IgSW50MzJgKTtpZihTPm4pdGhyb3cgbmV3IFooYElucHV0OiAnJHtlfScgaXMgc21hbGxlciB0aGFuIHRoZSBtaW5pbXVtIHZhbHVlIGZvciBJbnQzMmApO2lmKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihuKSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBpcyBub3QgYSBzYWZlIGludGVnZXJgKTtpZihuLnRvU3RyaW5nKCkhPT10KXRocm93IG5ldyBaKGBJbnB1dDogJyR7ZX0nIGlzIG5vdCBhIHZhbGlkIEludDMyIHN0cmluZ2ApO3JldHVybiBuZXcgWmUobil9dmFsdWVPZigpe3JldHVybiB0aGlzLnZhbHVlfXRvU3RyaW5nKGUpe3JldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKGUpfXRvSlNPTigpe3JldHVybiB0aGlzLnZhbHVlfXRvRXh0ZW5kZWRKU09OKGUpe3JldHVybiBlJiYoZS5yZWxheGVkfHxlLmxlZ2FjeSk/dGhpcy52YWx1ZTp7JG51bWJlckludDp0aGlzLnZhbHVlLnRvU3RyaW5nKCl9fXN0YXRpYyBmcm9tRXh0ZW5kZWRKU09OKGUsdCl7cmV0dXJuIHQmJnQucmVsYXhlZD9wYXJzZUludChlLiRudW1iZXJJbnQsMTApOm5ldyBaZShlLiRudW1iZXJJbnQpfWluc3BlY3QoZSx0LG4pe3JldHVybiBuPz89dyxgbmV3IEludDMyKCR7bih0aGlzLnZhbHVlLHQpfSlgfX1jbGFzcyBHZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iTWF4S2V5In10b0V4dGVuZGVkSlNPTigpe3JldHVybnskbWF4S2V5OjF9fXN0YXRpYyBmcm9tRXh0ZW5kZWRKU09OKCl7cmV0dXJuIG5ldyBHZX1pbnNwZWN0KCl7cmV0dXJuIm5ldyBNYXhLZXkoKSJ9fWNsYXNzIFhlIGV4dGVuZHMgaGV7Z2V0IF9ic29udHlwZSgpe3JldHVybiJNaW5LZXkifXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJueyRtaW5LZXk6MX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oKXtyZXR1cm4gbmV3IFhlfWluc3BlY3QoKXtyZXR1cm4ibmV3IE1pbktleSgpIn19bGV0IFFlPW51bGw7Y29uc3QgZXQ9bmV3IFdlYWtNYXA7Y2xhc3MgdHQgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIk9iamVjdElkIn1zdGF0aWMgaW5kZXg9TWF0aC5mbG9vcigxNjc3NzIxNSpNYXRoLnJhbmRvbSgpKTtzdGF0aWMgY2FjaGVIZXhTdHJpbmc7YnVmZmVyO2NvbnN0cnVjdG9yKGUpe2xldCB0O2lmKHN1cGVyKCksIm9iamVjdCI9PXR5cGVvZiBlJiZlJiYiaWQiaW4gZSl7aWYoInN0cmluZyIhPXR5cGVvZiBlLmlkJiYhQXJyYXlCdWZmZXIuaXNWaWV3KGUuaWQpKXRocm93IG5ldyBaKCJBcmd1bWVudCBwYXNzZWQgaW4gbXVzdCBoYXZlIGFuIGlkIHRoYXQgaXMgb2YgdHlwZSBzdHJpbmcgb3IgQnVmZmVyIik7dD0idG9IZXhTdHJpbmciaW4gZSYmImZ1bmN0aW9uIj09dHlwZW9mIGUudG9IZXhTdHJpbmc/X2UuZnJvbUhleChlLnRvSGV4U3RyaW5nKCkpOmUuaWR9ZWxzZSB0PWU7aWYobnVsbD09dCl0aGlzLmJ1ZmZlcj10dC5nZW5lcmF0ZSgpO2Vsc2UgaWYoQXJyYXlCdWZmZXIuaXNWaWV3KHQpJiYxMj09PXQuYnl0ZUxlbmd0aCl0aGlzLmJ1ZmZlcj1fZS50b0xvY2FsQnVmZmVyVHlwZSh0KTtlbHNle2lmKCJzdHJpbmciIT10eXBlb2YgdCl0aHJvdyBuZXcgWigiQXJndW1lbnQgcGFzc2VkIGluIGRvZXMgbm90IG1hdGNoIHRoZSBhY2NlcHRlZCB0eXBlcyIpO2lmKCF0dC52YWxpZGF0ZUhleFN0cmluZyh0KSl0aHJvdyBuZXcgWigiaW5wdXQgbXVzdCBiZSBhIDI0IGNoYXJhY3RlciBoZXggc3RyaW5nLCAxMiBieXRlIFVpbnQ4QXJyYXksIG9yIGFuIGludGVnZXIiKTt0aGlzLmJ1ZmZlcj1fZS5mcm9tSGV4KHQpLHR0LmNhY2hlSGV4U3RyaW5nJiZldC5zZXQodGhpcyx0KX19Z2V0IGlkKCl7cmV0dXJuIHRoaXMuYnVmZmVyfXNldCBpZChlKXt0aGlzLmJ1ZmZlcj1lLHR0LmNhY2hlSGV4U3RyaW5nJiZldC5zZXQodGhpcyxfZS50b0hleChlKSl9c3RhdGljIHZhbGlkYXRlSGV4U3RyaW5nKGUpe2lmKDI0IT09ZT8ubGVuZ3RoKXJldHVybiExO2ZvcihsZXQgdD0wO3Q8MjQ7dCsrKXtjb25zdCBuPWUuY2hhckNvZGVBdCh0KTtpZighKG4+PTQ4JiZuPD01N3x8bj49OTcmJm48PTEwMnx8bj49NjUmJm48PTcwKSlyZXR1cm4hMX1yZXR1cm4hMH10b0hleFN0cmluZygpe2lmKHR0LmNhY2hlSGV4U3RyaW5nKXtjb25zdCBlPWV0LmdldCh0aGlzKTtpZihlKXJldHVybiBlfWNvbnN0IGU9X2UudG9IZXgodGhpcy5pZCk7cmV0dXJuIHR0LmNhY2hlSGV4U3RyaW5nJiZldC5zZXQodGhpcyxlKSxlfXN0YXRpYyBnZXRJbmMoKXtyZXR1cm4gdHQuaW5kZXg9KHR0LmluZGV4KzEpJTE2Nzc3MjE1fXN0YXRpYyBnZW5lcmF0ZShlKXsibnVtYmVyIiE9dHlwZW9mIGUmJihlPU1hdGguZmxvb3IoRGF0ZS5ub3coKS8xZTMpKTtjb25zdCB0PXR0LmdldEluYygpLG49X2UuYWxsb2NhdGVVbnNhZmUoMTIpO3JldHVybiBwZS5zZXRJbnQzMkJFKG4sMCxlKSxudWxsPT09UWUmJihRZT1fZS5yYW5kb21CeXRlcyg1KSksbls0XT1RZVswXSxuWzVdPVFlWzFdLG5bNl09UWVbMl0sbls3XT1RZVszXSxuWzhdPVFlWzRdLG5bMTFdPTI1NSZ0LG5bMTBdPXQ+PjgmMjU1LG5bOV09dD4+MTYmMjU1LG59dG9TdHJpbmcoZSl7cmV0dXJuImJhc2U2NCI9PT1lP19lLnRvQmFzZTY0KHRoaXMuaWQpOnRoaXMudG9IZXhTdHJpbmcoKX10b0pTT04oKXtyZXR1cm4gdGhpcy50b0hleFN0cmluZygpfXN0YXRpYyBpcyhlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiX2Jzb250eXBlImluIGUmJiJPYmplY3RJZCI9PT1lLl9ic29udHlwZX1lcXVhbHMoZSl7aWYobnVsbD09ZSlyZXR1cm4hMTtpZih0dC5pcyhlKSlyZXR1cm4gdGhpcy5idWZmZXJbMTFdPT09ZS5idWZmZXJbMTFdJiZfZS5lcXVhbHModGhpcy5idWZmZXIsZS5idWZmZXIpO2lmKCJzdHJpbmciPT10eXBlb2YgZSlyZXR1cm4gZS50b0xvd2VyQ2FzZSgpPT09dGhpcy50b0hleFN0cmluZygpO2lmKCJvYmplY3QiPT10eXBlb2YgZSYmImZ1bmN0aW9uIj09dHlwZW9mIGUudG9IZXhTdHJpbmcpe2NvbnN0IHQ9ZS50b0hleFN0cmluZygpLG49dGhpcy50b0hleFN0cmluZygpO3JldHVybiJzdHJpbmciPT10eXBlb2YgdCYmdC50b0xvd2VyQ2FzZSgpPT09bn1yZXR1cm4hMX1nZXRUaW1lc3RhbXAoKXtjb25zdCBlPW5ldyBEYXRlLHQ9cGUuZ2V0VWludDMyQkUodGhpcy5idWZmZXIsMCk7cmV0dXJuIGUuc2V0VGltZSgxZTMqTWF0aC5mbG9vcih0KSksZX1zdGF0aWMgY3JlYXRlUGsoKXtyZXR1cm4gbmV3IHR0fXNlcmlhbGl6ZUludG8oZSx0KXtyZXR1cm4gZVt0XT10aGlzLmJ1ZmZlclswXSxlW3QrMV09dGhpcy5idWZmZXJbMV0sZVt0KzJdPXRoaXMuYnVmZmVyWzJdLGVbdCszXT10aGlzLmJ1ZmZlclszXSxlW3QrNF09dGhpcy5idWZmZXJbNF0sZVt0KzVdPXRoaXMuYnVmZmVyWzVdLGVbdCs2XT10aGlzLmJ1ZmZlcls2XSxlW3QrN109dGhpcy5idWZmZXJbN10sZVt0KzhdPXRoaXMuYnVmZmVyWzhdLGVbdCs5XT10aGlzLmJ1ZmZlcls5XSxlW3QrMTBdPXRoaXMuYnVmZmVyWzEwXSxlW3QrMTFdPXRoaXMuYnVmZmVyWzExXSwxMn1zdGF0aWMgY3JlYXRlRnJvbVRpbWUoZSl7Y29uc3QgdD1fZS5hbGxvY2F0ZSgxMik7Zm9yKGxldCBlPTExO2U+PTQ7ZS0tKXRbZV09MDtyZXR1cm4gcGUuc2V0SW50MzJCRSh0LDAsZSksbmV3IHR0KHQpfXN0YXRpYyBjcmVhdGVGcm9tSGV4U3RyaW5nKGUpe2lmKDI0IT09ZT8ubGVuZ3RoKXRocm93IG5ldyBaKCJoZXggc3RyaW5nIG11c3QgYmUgMjQgY2hhcmFjdGVycyIpO3JldHVybiBuZXcgdHQoX2UuZnJvbUhleChlKSl9c3RhdGljIGNyZWF0ZUZyb21CYXNlNjQoZSl7aWYoMTYhPT1lPy5sZW5ndGgpdGhyb3cgbmV3IFooImJhc2U2NCBzdHJpbmcgbXVzdCBiZSAxNiBjaGFyYWN0ZXJzIik7cmV0dXJuIG5ldyB0dChfZS5mcm9tQmFzZTY0KGUpKX1zdGF0aWMgaXNWYWxpZChlKXtpZihudWxsPT1lKXJldHVybiExO2lmKCJzdHJpbmciPT10eXBlb2YgZSlyZXR1cm4gdHQudmFsaWRhdGVIZXhTdHJpbmcoZSk7dHJ5e3JldHVybiBuZXcgdHQoZSksITB9Y2F0Y2h7cmV0dXJuITF9fXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJuIHRoaXMudG9IZXhTdHJpbmc/eyRvaWQ6dGhpcy50b0hleFN0cmluZygpfTp7JG9pZDp0aGlzLnRvU3RyaW5nKCJoZXgiKX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7cmV0dXJuIG5ldyB0dChlLiRvaWQpfWlzQ2FjaGVkKCl7cmV0dXJuIHR0LmNhY2hlSGV4U3RyaW5nJiZldC5oYXModGhpcyl9aW5zcGVjdChlLHQsbil7cmV0dXJuIG4/Pz13LGBuZXcgT2JqZWN0SWQoJHtuKHRoaXMudG9IZXhTdHJpbmcoKSx0KX0pYH19ZnVuY3Rpb24gbnQoZSx0LG4pe2xldCByPTU7aWYoQXJyYXkuaXNBcnJheShlKSlmb3IobGV0IGk9MDtpPGUubGVuZ3RoO2krKylyKz1ydChpLnRvU3RyaW5nKCksZVtpXSx0LCEwLG4pO2Vsc2V7ImZ1bmN0aW9uIj09dHlwZW9mIGU/LnRvQlNPTiYmKGU9ZS50b0JTT04oKSk7Zm9yKGNvbnN0IGkgb2YgT2JqZWN0LmtleXMoZSkpcis9cnQoaSxlW2ldLHQsITEsbil9cmV0dXJuIHJ9ZnVuY3Rpb24gcnQoZSx0LG49ITEscj0hMSxpPSExKXtzd2l0Y2goImZ1bmN0aW9uIj09dHlwZW9mIHQ/LnRvQlNPTiYmKHQ9dC50b0JTT04oKSksdHlwZW9mIHQpe2Nhc2Uic3RyaW5nIjpyZXR1cm4gMStfZS51dGY4Qnl0ZUxlbmd0aChlKSsxKzQrX2UudXRmOEJ5dGVMZW5ndGgodCkrMTtjYXNlIm51bWJlciI6cmV0dXJuIE1hdGguZmxvb3IodCk9PT10JiZ0Pj1VJiZ0PD1FJiZ0Pj1TJiZ0PD1tPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrNToobnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzk7Y2FzZSJ1bmRlZmluZWQiOnJldHVybiByfHwhaT8obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzE6MDtjYXNlImJvb2xlYW4iOnJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMjtjYXNlIm9iamVjdCI6aWYobnVsbCE9dCYmInN0cmluZyI9PXR5cGVvZiB0Ll9ic29udHlwZSYmdFt5XSE9PXApdGhyb3cgbmV3IEc7aWYobnVsbD09dHx8Ik1pbktleSI9PT10Ll9ic29udHlwZXx8Ik1heEtleSI9PT10Ll9ic29udHlwZSlyZXR1cm4obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzE7aWYoIk9iamVjdElkIj09PXQuX2Jzb250eXBlKXJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMTM7aWYodCBpbnN0YW5jZW9mIERhdGV8fGQodCkpcmV0dXJuKG51bGwhPWU/X2UudXRmOEJ5dGVMZW5ndGgoZSkrMTowKSs5O2lmKEFycmF5QnVmZmVyLmlzVmlldyh0KXx8dCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyfHxnKHQpKXJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrNit0LmJ5dGVMZW5ndGg7aWYoIkxvbmciPT09dC5fYnNvbnR5cGV8fCJEb3VibGUiPT09dC5fYnNvbnR5cGV8fCJUaW1lc3RhbXAiPT09dC5fYnNvbnR5cGUpcmV0dXJuKG51bGwhPWU/X2UudXRmOEJ5dGVMZW5ndGgoZSkrMTowKSs5O2lmKCJEZWNpbWFsMTI4Ij09PXQuX2Jzb250eXBlKXJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMTc7aWYoIkNvZGUiPT09dC5fYnNvbnR5cGUpcmV0dXJuIG51bGwhPXQuc2NvcGUmJk9iamVjdC5rZXlzKHQuc2NvcGUpLmxlbmd0aD4wPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMSs0KzQrX2UudXRmOEJ5dGVMZW5ndGgodC5jb2RlLnRvU3RyaW5nKCkpKzErbnQodC5zY29wZSxuLGkpOihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMSs0K19lLnV0ZjhCeXRlTGVuZ3RoKHQuY29kZS50b1N0cmluZygpKSsxO2lmKCJCaW5hcnkiPT09dC5fYnNvbnR5cGUpe2NvbnN0IG49dDtyZXR1cm4gbi5zdWJfdHlwZT09PXllLlNVQlRZUEVfQllURV9BUlJBWT8obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKyhuLnBvc2l0aW9uKzErNCsxKzQpOihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrKG4ucG9zaXRpb24rMSs0KzEpfWlmKCJTeW1ib2wiPT09dC5fYnNvbnR5cGUpcmV0dXJuKG51bGwhPWU/X2UudXRmOEJ5dGVMZW5ndGgoZSkrMTowKStfZS51dGY4Qnl0ZUxlbmd0aCh0LnZhbHVlKSs0KzErMTtpZigiREJSZWYiPT09dC5fYnNvbnR5cGUpe2NvbnN0IHI9T2JqZWN0LmFzc2lnbih7JHJlZjp0LmNvbGxlY3Rpb24sJGlkOnQub2lkfSx0LmZpZWxkcyk7cmV0dXJuIG51bGwhPXQuZGImJihyLiRkYj10LmRiKSwobnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzErbnQocixuLGkpfXJldHVybiB0IGluc3RhbmNlb2YgUmVnRXhwfHxoKHQpPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMStfZS51dGY4Qnl0ZUxlbmd0aCh0LnNvdXJjZSkrMSsodC5nbG9iYWw/MTowKSsodC5pZ25vcmVDYXNlPzE6MCkrKHQubXVsdGlsaW5lPzE6MCkrMToiQlNPTlJlZ0V4cCI9PT10Ll9ic29udHlwZT8obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzErX2UudXRmOEJ5dGVMZW5ndGgodC5wYXR0ZXJuKSsxK19lLnV0ZjhCeXRlTGVuZ3RoKHQub3B0aW9ucykrMToobnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApK250KHQsbixpKSsxO2Nhc2UiZnVuY3Rpb24iOnJldHVybiBuPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMSs0K19lLnV0ZjhCeXRlTGVuZ3RoKHQudG9TdHJpbmcoKSkrMTowO2Nhc2UiYmlnaW50IjpyZXR1cm4obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzk7Y2FzZSJzeW1ib2wiOnJldHVybiAwO2RlZmF1bHQ6dGhyb3cgbmV3IFooIlVucmVjb2duaXplZCBKUyB0eXBlOiAiK3R5cGVvZiB0KX19Y2xhc3MgaXQgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkJTT05SZWdFeHAifXBhdHRlcm47b3B0aW9ucztjb25zdHJ1Y3RvcihlLHQpe2lmKHN1cGVyKCksdGhpcy5wYXR0ZXJuPWUsdGhpcy5vcHRpb25zPSh0Pz8iIikuc3BsaXQoIiIpLnNvcnQoKS5qb2luKCIiKSwtMSE9PXRoaXMucGF0dGVybi5pbmRleE9mKCJcMCIpKXRocm93IG5ldyBaKGBCU09OIFJlZ2V4IHBhdHRlcm5zIGNhbm5vdCBjb250YWluIG51bGwgYnl0ZXMsIGZvdW5kOiAke0pTT04uc3RyaW5naWZ5KHRoaXMucGF0dGVybil9YCk7aWYoLTEhPT10aGlzLm9wdGlvbnMuaW5kZXhPZigiXDAiKSl0aHJvdyBuZXcgWihgQlNPTiBSZWdleCBvcHRpb25zIGNhbm5vdCBjb250YWluIG51bGwgYnl0ZXMsIGZvdW5kOiAke0pTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucyl9YCk7Zm9yKGxldCBlPTA7ZTx0aGlzLm9wdGlvbnMubGVuZ3RoO2UrKylpZigiaSIhPT10aGlzLm9wdGlvbnNbZV0mJiJtIiE9PXRoaXMub3B0aW9uc1tlXSYmIngiIT09dGhpcy5vcHRpb25zW2VdJiYibCIhPT10aGlzLm9wdGlvbnNbZV0mJiJzIiE9PXRoaXMub3B0aW9uc1tlXSYmInUiIT09dGhpcy5vcHRpb25zW2VdKXRocm93IG5ldyBaKGBUaGUgcmVndWxhciBleHByZXNzaW9uIG9wdGlvbiBbJHt0aGlzLm9wdGlvbnNbZV19XSBpcyBub3Qgc3VwcG9ydGVkYCl9c3RhdGljIHBhcnNlT3B0aW9ucyhlKXtyZXR1cm4gZT9lLnNwbGl0KCIiKS5zb3J0KCkuam9pbigiIik6IiJ9dG9FeHRlbmRlZEpTT04oZSl7cmV0dXJuKGU9ZXx8e30pLmxlZ2FjeT97JHJlZ2V4OnRoaXMucGF0dGVybiwkb3B0aW9uczp0aGlzLm9wdGlvbnN9OnskcmVndWxhckV4cHJlc3Npb246e3BhdHRlcm46dGhpcy5wYXR0ZXJuLG9wdGlvbnM6dGhpcy5vcHRpb25zfX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7aWYoIiRyZWdleCJpbiBlKXtpZigic3RyaW5nIj09dHlwZW9mIGUuJHJlZ2V4KXJldHVybiBuZXcgaXQoZS4kcmVnZXgsaXQucGFyc2VPcHRpb25zKGUuJG9wdGlvbnMpKTtpZigiQlNPTlJlZ0V4cCI9PT1lLiRyZWdleC5fYnNvbnR5cGUpcmV0dXJuIGV9aWYoIiRyZWd1bGFyRXhwcmVzc2lvbiJpbiBlKXJldHVybiBuZXcgaXQoZS4kcmVndWxhckV4cHJlc3Npb24ucGF0dGVybixpdC5wYXJzZU9wdGlvbnMoZS4kcmVndWxhckV4cHJlc3Npb24ub3B0aW9ucykpO3Rocm93IG5ldyBaKGBVbmV4cGVjdGVkIEJTT05SZWdFeHAgRUpTT04gb2JqZWN0IGZvcm06ICR7SlNPTi5zdHJpbmdpZnkoZSl9YCl9aW5zcGVjdChlLHQsbil7Y29uc3Qgcj1mdW5jdGlvbihlKXtpZihudWxsIT1lJiYib2JqZWN0Ij09dHlwZW9mIGUmJiJzdHlsaXplImluIGUmJiJmdW5jdGlvbiI9PXR5cGVvZiBlLnN0eWxpemUpcmV0dXJuIGUuc3R5bGl6ZX0odCk/PyhlPT5lKTtuPz89dztyZXR1cm5gbmV3IEJTT05SZWdFeHAoJHtyKG4odGhpcy5wYXR0ZXJuKSwicmVnZXhwIil9LCAke3Iobih0aGlzLm9wdGlvbnMpLCJyZWdleHAiKX0pYH19Y2xhc3Mgb3QgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkJTT05TeW1ib2wifXZhbHVlO2NvbnN0cnVjdG9yKGUpe3N1cGVyKCksdGhpcy52YWx1ZT1lfXZhbHVlT2YoKXtyZXR1cm4gdGhpcy52YWx1ZX10b1N0cmluZygpe3JldHVybiB0aGlzLnZhbHVlfXRvSlNPTigpe3JldHVybiB0aGlzLnZhbHVlfXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJueyRzeW1ib2w6dGhpcy52YWx1ZX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7cmV0dXJuIG5ldyBvdChlLiRzeW1ib2wpfWluc3BlY3QoZSx0LG4pe3JldHVybiBuPz89dyxgbmV3IEJTT05TeW1ib2woJHtuKHRoaXMudmFsdWUsdCl9KWB9fWNvbnN0IHN0PWplO2NsYXNzIGF0IGV4dGVuZHMgc3R7Z2V0IF9ic29udHlwZSgpe3JldHVybiJUaW1lc3RhbXAifWdldFtnZV0oKXtyZXR1cm4iVGltZXN0YW1wIn1zdGF0aWMgTUFYX1ZBTFVFPWplLk1BWF9VTlNJR05FRF9WQUxVRTtnZXQgaSgpe3JldHVybiB0aGlzLmxvdz4+PjB9Z2V0IHQoKXtyZXR1cm4gdGhpcy5oaWdoPj4+MH1jb25zdHJ1Y3RvcihlKXtpZihudWxsPT1lKXN1cGVyKDAsMCwhMCk7ZWxzZSBpZigiYmlnaW50Ij09dHlwZW9mIGUpc3VwZXIoZSwhMCk7ZWxzZSBpZihqZS5pc0xvbmcoZSkpc3VwZXIoZS5sb3csZS5oaWdoLCEwKTtlbHNle2lmKCJvYmplY3QiIT10eXBlb2YgZXx8ISgidCJpbiBlKXx8ISgiaSJpbiBlKSl0aHJvdyBuZXcgWigiQSBUaW1lc3RhbXAgY2FuIG9ubHkgYmUgY29uc3RydWN0ZWQgd2l0aDogYmlnaW50LCBMb25nLCBvciB7IHQ6IG51bWJlcjsgaTogbnVtYmVyIH0iKTt7aWYoIm51bWJlciIhPXR5cGVvZiBlLnQmJigib2JqZWN0IiE9dHlwZW9mIGUudHx8IkludDMyIiE9PWUudC5fYnNvbnR5cGUpKXRocm93IG5ldyBaKCJUaW1lc3RhbXAgY29uc3RydWN0ZWQgZnJvbSB7IHQsIGkgfSBtdXN0IHByb3ZpZGUgdCBhcyBhIG51bWJlciIpO2lmKCJudW1iZXIiIT10eXBlb2YgZS5pJiYoIm9iamVjdCIhPXR5cGVvZiBlLml8fCJJbnQzMiIhPT1lLmkuX2Jzb250eXBlKSl0aHJvdyBuZXcgWigiVGltZXN0YW1wIGNvbnN0cnVjdGVkIGZyb20geyB0LCBpIH0gbXVzdCBwcm92aWRlIGkgYXMgYSBudW1iZXIiKTtjb25zdCB0PU51bWJlcihlLnQpLG49TnVtYmVyKGUuaSk7aWYodDwwfHxOdW1iZXIuaXNOYU4odCkpdGhyb3cgbmV3IFooIlRpbWVzdGFtcCBjb25zdHJ1Y3RlZCBmcm9tIHsgdCwgaSB9IG11c3QgcHJvdmlkZSBhIHBvc2l0aXZlIHQiKTtpZihuPDB8fE51bWJlci5pc05hTihuKSl0aHJvdyBuZXcgWigiVGltZXN0YW1wIGNvbnN0cnVjdGVkIGZyb20geyB0LCBpIH0gbXVzdCBwcm92aWRlIGEgcG9zaXRpdmUgaSIpO2lmKHQ+NDI5NDk2NzI5NSl0aHJvdyBuZXcgWigiVGltZXN0YW1wIGNvbnN0cnVjdGVkIGZyb20geyB0LCBpIH0gbXVzdCBwcm92aWRlIHQgZXF1YWwgb3IgbGVzcyB0aGFuIHVpbnQzMiBtYXgiKTtpZihuPjQyOTQ5NjcyOTUpdGhyb3cgbmV3IFooIlRpbWVzdGFtcCBjb25zdHJ1Y3RlZCBmcm9tIHsgdCwgaSB9IG11c3QgcHJvdmlkZSBpIGVxdWFsIG9yIGxlc3MgdGhhbiB1aW50MzIgbWF4Iik7c3VwZXIobix0LCEwKX19fXRvSlNPTigpe3JldHVybnskdGltZXN0YW1wOnRoaXMudG9TdHJpbmcoKX19c3RhdGljIGZyb21JbnQoZSl7cmV0dXJuIG5ldyBhdChqZS5mcm9tSW50KGUsITApKX1zdGF0aWMgZnJvbU51bWJlcihlKXtyZXR1cm4gbmV3IGF0KGplLmZyb21OdW1iZXIoZSwhMCkpfXN0YXRpYyBmcm9tQml0cyhlLHQpe3JldHVybiBuZXcgYXQoe2k6ZSx0OnR9KX1zdGF0aWMgZnJvbVN0cmluZyhlLHQpe3JldHVybiBuZXcgYXQoamUuZnJvbVN0cmluZyhlLCEwLHQpKX10b0V4dGVuZGVkSlNPTigpe3JldHVybnskdGltZXN0YW1wOnt0OnRoaXMudCxpOnRoaXMuaX19fXN0YXRpYyBmcm9tRXh0ZW5kZWRKU09OKGUpe2NvbnN0IHQ9amUuaXNMb25nKGUuJHRpbWVzdGFtcC5pKT9lLiR0aW1lc3RhbXAuaS5nZXRMb3dCaXRzVW5zaWduZWQoKTplLiR0aW1lc3RhbXAuaSxuPWplLmlzTG9uZyhlLiR0aW1lc3RhbXAudCk/ZS4kdGltZXN0YW1wLnQuZ2V0TG93Qml0c1Vuc2lnbmVkKCk6ZS4kdGltZXN0YW1wLnQ7cmV0dXJuIG5ldyBhdCh7dDpuLGk6dH0pfWluc3BlY3QoZSx0LG4pe24/Pz13O3JldHVybmBuZXcgVGltZXN0YW1wKHsgdDogJHtuKHRoaXMudCx0KX0sIGk6ICR7bih0aGlzLmksdCl9IH0pYH19Y29uc3QgY3Q9amUuZnJvbU51bWJlcihFKSxmdD1qZS5mcm9tTnVtYmVyKFUpO2Z1bmN0aW9uIGx0KGUsdCxuKXtjb25zdCByPSh0PW51bGw9PXQ/e306dCkmJnQuaW5kZXg/dC5pbmRleDowLGk9cGUuZ2V0SW50MzJMRShlLHIpO2lmKGk8NSl0aHJvdyBuZXcgWihgYnNvbiBzaXplIG11c3QgYmUgPj0gNSwgaXMgJHtpfWApO2lmKHQuYWxsb3dPYmplY3RTbWFsbGVyVGhhbkJ1ZmZlclNpemUmJmUubGVuZ3RoPGkpdGhyb3cgbmV3IFooYGJ1ZmZlciBsZW5ndGggJHtlLmxlbmd0aH0gbXVzdCBiZSA+PSBic29uIHNpemUgJHtpfWApO2lmKCF0LmFsbG93T2JqZWN0U21hbGxlclRoYW5CdWZmZXJTaXplJiZlLmxlbmd0aCE9PWkpdGhyb3cgbmV3IFooYGJ1ZmZlciBsZW5ndGggJHtlLmxlbmd0aH0gbXVzdCA9PT0gYnNvbiBzaXplICR7aX1gKTtpZihpK3I+ZS5ieXRlTGVuZ3RoKXRocm93IG5ldyBaKGAoYnNvbiBzaXplICR7aX0gKyBvcHRpb25zLmluZGV4ICR7cn0gbXVzdCBiZSA8PSBidWZmZXIgbGVuZ3RoICR7ZS5ieXRlTGVuZ3RofSlgKTtpZigwIT09ZVtyK2ktMV0pdGhyb3cgbmV3IFooIk9uZSBvYmplY3QsIHNpemVkIGNvcnJlY3RseSwgd2l0aCBhIHNwb3QgZm9yIGFuIEVPTywgYnV0IHRoZSBFT08gaXNuJ3QgMHgwMCIpO3JldHVybiBfdChlLHIsdCxuKX1jb25zdCB1dD0vXlwkcmVmJHxeXCRpZCR8XlwkZGIkLztmdW5jdGlvbiBfdChlLHQsbixyPSExKXtjb25zdCBpPW51bGw9PW4uZmllbGRzQXNSYXc/bnVsbDpuLmZpZWxkc0FzUmF3LG89bnVsbCE9bi5yYXcmJm4ucmF3LHM9ImJvb2xlYW4iPT10eXBlb2Ygbi5ic29uUmVnRXhwJiZuLmJzb25SZWdFeHAsYT1uLnByb21vdGVCdWZmZXJzPz8hMSxjPW4ucHJvbW90ZUxvbmdzPz8hMCxmPW4ucHJvbW90ZVZhbHVlcz8/ITAsbD1uLnVzZUJpZ0ludDY0Pz8hMTtpZihsJiYhZil0aHJvdyBuZXcgWigiTXVzdCBlaXRoZXIgcmVxdWVzdCBiaWdpbnQgb3IgTG9uZyBmb3IgaW50NjQgZGVzZXJpYWxpemF0aW9uIik7aWYobCYmIWMpdGhyb3cgbmV3IFooIk11c3QgZWl0aGVyIHJlcXVlc3QgYmlnaW50IG9yIExvbmcgZm9yIGludDY0IGRlc2VyaWFsaXphdGlvbiIpO2xldCB1LF8sZz0hMDtjb25zdCBoPShudWxsPT1uLnZhbGlkYXRpb24/e3V0Zjg6ITB9Om4udmFsaWRhdGlvbikudXRmODtpZigiYm9vbGVhbiI9PXR5cGVvZiBoKXU9aDtlbHNle2c9ITE7Y29uc3QgZT1PYmplY3Qua2V5cyhoKS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBoW2VdfSkpO2lmKDA9PT1lLmxlbmd0aCl0aHJvdyBuZXcgWigiVVRGLTggdmFsaWRhdGlvbiBzZXR0aW5nIGNhbm5vdCBiZSBlbXB0eSIpO2lmKCJib29sZWFuIiE9dHlwZW9mIGVbMF0pdGhyb3cgbmV3IFooIkludmFsaWQgVVRGLTggdmFsaWRhdGlvbiBvcHRpb24sIG11c3Qgc3BlY2lmeSBib29sZWFuIHZhbHVlcyIpO2lmKHU9ZVswXSwhZS5ldmVyeSgoZT0+ZT09PXUpKSl0aHJvdyBuZXcgWigiSW52YWxpZCBVVEYtOCB2YWxpZGF0aW9uIG9wdGlvbiAtIGtleXMgbXVzdCBiZSBhbGwgdHJ1ZSBvciBhbGwgZmFsc2UiKX1pZighZyl7Xz1uZXcgU2V0O2Zvcihjb25zdCBlIG9mIE9iamVjdC5rZXlzKGgpKV8uYWRkKGUpfWNvbnN0IGI9dDtpZihlLmxlbmd0aDw1KXRocm93IG5ldyBaKCJjb3JydXB0IGJzb24gbWVzc2FnZSA8IDUgYnl0ZXMgbG9uZyIpO2NvbnN0IGQ9cGUuZ2V0SW50MzJMRShlLHQpO2lmKHQrPTQsZDw1fHxkPmUubGVuZ3RoKXRocm93IG5ldyBaKCJjb3JydXB0IGJzb24gbWVzc2FnZSIpO2NvbnN0IHc9cj9bXTp7fTtsZXQgcD0wLHk9IXImJm51bGw7Zm9yKDs7KXtjb25zdCBoPWVbdCsrXTtpZigwPT09aClicmVhaztsZXQgYj10O2Zvcig7MCE9PWVbYl0mJmI8ZS5sZW5ndGg7KWIrKztpZihiPj1lLmJ5dGVMZW5ndGgpdGhyb3cgbmV3IFooIkJhZCBCU09OIERvY3VtZW50OiBpbGxlZ2FsIENTdHJpbmciKTtjb25zdCBkPXI/cCsrOl9lLnRvVVRGOChlLHQsYiwhMSk7bGV0IG0sUz0hMDtpZihTPWd8fF8/LmhhcyhkKT91OiF1LCExIT09eSYmIiQiPT09ZFswXSYmKHk9dXQudGVzdChkKSksdD1iKzEsaD09PU4pe2NvbnN0IG49cGUuZ2V0SW50MzJMRShlLHQpO2lmKHQrPTQsbjw9MHx8bj5lLmxlbmd0aC10fHwwIT09ZVt0K24tMV0pdGhyb3cgbmV3IFooImJhZCBzdHJpbmcgbGVuZ3RoIGluIGJzb24iKTttPV9lLnRvVVRGOChlLHQsdCtuLTEsUyksdCs9bn1lbHNlIGlmKGg9PT1MKXtjb25zdCBuPV9lLmFsbG9jYXRlVW5zYWZlKDEyKTtmb3IobGV0IHI9MDtyPDEyO3IrKyluW3JdPWVbdCtyXTttPW5ldyB0dChuKSx0Kz0xMn1lbHNlIGlmKGg9PT1NJiYhMT09PWYpbT1uZXcgWmUocGUuZ2V0SW50MzJMRShlLHQpKSx0Kz00O2Vsc2UgaWYoaD09PU0pbT1wZS5nZXRJbnQzMkxFKGUsdCksdCs9NDtlbHNlIGlmKGg9PT1PKW09cGUuZ2V0RmxvYXQ2NExFKGUsdCksdCs9OCwhMT09PWYmJihtPW5ldyBLZShtKSk7ZWxzZSBpZihoPT09Uil7Y29uc3Qgbj1wZS5nZXRJbnQzMkxFKGUsdCkscj1wZS5nZXRJbnQzMkxFKGUsdCs0KTt0Kz04LG09bmV3IERhdGUobmV3IGplKG4scikudG9OdW1iZXIoKSl9ZWxzZSBpZihoPT09QSl7aWYoMCE9PWVbdF0mJjEhPT1lW3RdKXRocm93IG5ldyBaKCJpbGxlZ2FsIGJvb2xlYW4gdHlwZSB2YWx1ZSIpO209MT09PWVbdCsrXX1lbHNlIGlmKGg9PT1JKXtjb25zdCByPXQsaT1wZS5nZXRJbnQzMkxFKGUsdCk7aWYoaTw9MHx8aT5lLmxlbmd0aC10KXRocm93IG5ldyBaKCJiYWQgZW1iZWRkZWQgZG9jdW1lbnQgbGVuZ3RoIGluIGJzb24iKTtpZihvKW09ZS5zdWJhcnJheSh0LHQraSk7ZWxzZXtsZXQgdD1uO2d8fCh0PXsuLi5uLHZhbGlkYXRpb246e3V0Zjg6U319KSxtPV90KGUscix0LCExKX10Kz1pfWVsc2UgaWYoaD09PXYpe2NvbnN0IHI9dCxvPXBlLmdldEludDMyTEUoZSx0KTtsZXQgcz1uO2NvbnN0IGE9dCtvO2lmKGkmJmlbZF0mJihzPXsuLi5uLHJhdzohMH0pLGd8fChzPXsuLi5zLHZhbGlkYXRpb246e3V0Zjg6U319KSxtPV90KGUscixzLCEwKSwwIT09ZVsodCs9byktMV0pdGhyb3cgbmV3IFooImludmFsaWQgYXJyYXkgdGVybWluYXRvciBieXRlIik7aWYodCE9PWEpdGhyb3cgbmV3IFooImNvcnJ1cHRlZCBhcnJheSBic29uIil9ZWxzZSBpZihoPT09JCltPXZvaWQgMDtlbHNlIGlmKGg9PT1qKW09bnVsbDtlbHNlIGlmKGg9PT1QKWlmKGwpbT1wZS5nZXRCaWdJbnQ2NExFKGUsdCksdCs9ODtlbHNle2NvbnN0IG49cGUuZ2V0SW50MzJMRShlLHQpLHI9cGUuZ2V0SW50MzJMRShlLHQrNCk7dCs9ODtjb25zdCBpPW5ldyBqZShuLHIpO209YyYmITA9PT1mJiZpLmxlc3NUaGFuT3JFcXVhbChjdCkmJmkuZ3JlYXRlclRoYW5PckVxdWFsKGZ0KT9pLnRvTnVtYmVyKCk6aX1lbHNlIGlmKGg9PT1KKXtjb25zdCBuPV9lLmFsbG9jYXRlVW5zYWZlKDE2KTtmb3IobGV0IHI9MDtyPDE2O3IrKyluW3JdPWVbdCtyXTt0Kz0xNixtPW5ldyBIZShuKX1lbHNlIGlmKGg9PT1UKXtsZXQgbj1wZS5nZXRJbnQzMkxFKGUsdCk7dCs9NDtjb25zdCByPW4saT1lW3QrK107aWYobjwwKXRocm93IG5ldyBaKCJOZWdhdGl2ZSBiaW5hcnkgdHlwZSBlbGVtZW50IHNpemUgZm91bmQiKTtpZihuPmUuYnl0ZUxlbmd0aCl0aHJvdyBuZXcgWigiQmluYXJ5IHR5cGUgc2l6ZSBsYXJnZXIgdGhhbiBkb2N1bWVudCBzaXplIik7aWYoaT09PXllLlNVQlRZUEVfQllURV9BUlJBWSl7aWYobj1wZS5nZXRJbnQzMkxFKGUsdCksdCs9NCxuPDApdGhyb3cgbmV3IFooIk5lZ2F0aXZlIGJpbmFyeSB0eXBlIGVsZW1lbnQgc2l6ZSBmb3VuZCBmb3Igc3VidHlwZSAweDAyIik7aWYobj5yLTQpdGhyb3cgbmV3IFooIkJpbmFyeSB0eXBlIHdpdGggc3VidHlwZSAweDAyIGNvbnRhaW5zIHRvbyBsb25nIGJpbmFyeSBzaXplIik7aWYobjxyLTQpdGhyb3cgbmV3IFooIkJpbmFyeSB0eXBlIHdpdGggc3VidHlwZSAweDAyIGNvbnRhaW5zIHRvbyBzaG9ydCBiaW5hcnkgc2l6ZSIpfWEmJmY/bT1fZS50b0xvY2FsQnVmZmVyVHlwZShlLnN1YmFycmF5KHQsdCtuKSk6KG09bmV3IHllKGUuc3ViYXJyYXkodCx0K24pLGkpLGk9PT1IJiZ4ZS5pc1ZhbGlkKG0pJiYobT1tLnRvVVVJRCgpKSksdCs9bn1lbHNlIGlmKGg9PT1GJiYhMT09PXMpe2ZvcihiPXQ7MCE9PWVbYl0mJmI8ZS5sZW5ndGg7KWIrKztpZihiPj1lLmxlbmd0aCl0aHJvdyBuZXcgWigiQmFkIEJTT04gRG9jdW1lbnQ6IGlsbGVnYWwgQ1N0cmluZyIpO2NvbnN0IG49X2UudG9VVEY4KGUsdCxiLCExKTtmb3IoYj10PWIrMTswIT09ZVtiXSYmYjxlLmxlbmd0aDspYisrO2lmKGI+PWUubGVuZ3RoKXRocm93IG5ldyBaKCJCYWQgQlNPTiBEb2N1bWVudDogaWxsZWdhbCBDU3RyaW5nIik7Y29uc3Qgcj1fZS50b1VURjgoZSx0LGIsITEpO3Q9YisxO2NvbnN0IGk9bmV3IEFycmF5KHIubGVuZ3RoKTtmb3IoYj0wO2I8ci5sZW5ndGg7YisrKXN3aXRjaChyW2JdKXtjYXNlIm0iOmlbYl09Im0iO2JyZWFrO2Nhc2UicyI6aVtiXT0iZyI7YnJlYWs7Y2FzZSJpIjppW2JdPSJpIn1tPW5ldyBSZWdFeHAobixpLmpvaW4oIiIpKX1lbHNlIGlmKGg9PT1GJiYhMD09PXMpe2ZvcihiPXQ7MCE9PWVbYl0mJmI8ZS5sZW5ndGg7KWIrKztpZihiPj1lLmxlbmd0aCl0aHJvdyBuZXcgWigiQmFkIEJTT04gRG9jdW1lbnQ6IGlsbGVnYWwgQ1N0cmluZyIpO2NvbnN0IG49X2UudG9VVEY4KGUsdCxiLCExKTtmb3IoYj10PWIrMTswIT09ZVtiXSYmYjxlLmxlbmd0aDspYisrO2lmKGI+PWUubGVuZ3RoKXRocm93IG5ldyBaKCJCYWQgQlNPTiBEb2N1bWVudDogaWxsZWdhbCBDU3RyaW5nIik7Y29uc3Qgcj1fZS50b1VURjgoZSx0LGIsITEpO3Q9YisxLG09bmV3IGl0KG4scil9ZWxzZSBpZihoPT09RCl7Y29uc3Qgbj1wZS5nZXRJbnQzMkxFKGUsdCk7aWYodCs9NCxuPD0wfHxuPmUubGVuZ3RoLXR8fDAhPT1lW3Qrbi0xXSl0aHJvdyBuZXcgWigiYmFkIHN0cmluZyBsZW5ndGggaW4gYnNvbiIpO2NvbnN0IHI9X2UudG9VVEY4KGUsdCx0K24tMSxTKTttPWY/cjpuZXcgb3QociksdCs9bn1lbHNlIGlmKGg9PT1WKW09bmV3IGF0KHtpOnBlLmdldFVpbnQzMkxFKGUsdCksdDpwZS5nZXRVaW50MzJMRShlLHQrNCl9KSx0Kz04O2Vsc2UgaWYoaD09PVcpbT1uZXcgWGU7ZWxzZSBpZihoPT09WSltPW5ldyBHZTtlbHNlIGlmKGg9PT16KXtjb25zdCBuPXBlLmdldEludDMyTEUoZSx0KTtpZih0Kz00LG48PTB8fG4+ZS5sZW5ndGgtdHx8MCE9PWVbdCtuLTFdKXRocm93IG5ldyBaKCJiYWQgc3RyaW5nIGxlbmd0aCBpbiBic29uIik7Y29uc3Qgcj1fZS50b1VURjgoZSx0LHQrbi0xLFMpO209bmV3IEVlKHIpLHQrPW59ZWxzZSBpZihoPT09Qyl7Y29uc3Qgcj1wZS5nZXRJbnQzMkxFKGUsdCk7aWYodCs9NCxyPDEzKXRocm93IG5ldyBaKCJjb2RlX3dfc2NvcGUgdG90YWwgc2l6ZSBzaG9ydGVyIG1pbmltdW0gZXhwZWN0ZWQgbGVuZ3RoIik7Y29uc3QgaT1wZS5nZXRJbnQzMkxFKGUsdCk7aWYodCs9NCxpPD0wfHxpPmUubGVuZ3RoLXR8fDAhPT1lW3QraS0xXSl0aHJvdyBuZXcgWigiYmFkIHN0cmluZyBsZW5ndGggaW4gYnNvbiIpO2NvbnN0IG89X2UudG9VVEY4KGUsdCx0K2ktMSxTKSxzPXQrPWksYT1wZS5nZXRJbnQzMkxFKGUsdCksYz1fdChlLHMsbiwhMSk7aWYodCs9YSxyPDgrYStpKXRocm93IG5ldyBaKCJjb2RlX3dfc2NvcGUgdG90YWwgc2l6ZSBpcyB0b28gc2hvcnQsIHRydW5jYXRpbmcgc2NvcGUiKTtpZihyPjgrYStpKXRocm93IG5ldyBaKCJjb2RlX3dfc2NvcGUgdG90YWwgc2l6ZSBpcyB0b28gbG9uZywgY2xpcHMgb3V0ZXIgZG9jdW1lbnQiKTttPW5ldyBFZShvLGMpfWVsc2V7aWYoaCE9PWspdGhyb3cgbmV3IFooYERldGVjdGVkIHVua25vd24gQlNPTiB0eXBlICR7aC50b1N0cmluZygxNil9IGZvciBmaWVsZG5hbWUgIiR7ZH0iYCk7e2NvbnN0IG49cGUuZ2V0SW50MzJMRShlLHQpO2lmKHQrPTQsbjw9MHx8bj5lLmxlbmd0aC10fHwwIT09ZVt0K24tMV0pdGhyb3cgbmV3IFooImJhZCBzdHJpbmcgbGVuZ3RoIGluIGJzb24iKTtjb25zdCByPV9lLnRvVVRGOChlLHQsdCtuLTEsUyk7dCs9bjtjb25zdCBpPV9lLmFsbG9jYXRlVW5zYWZlKDEyKTtmb3IobGV0IG49MDtuPDEyO24rKylpW25dPWVbdCtuXTtjb25zdCBvPW5ldyB0dChpKTt0Kz0xMixtPW5ldyBPZShyLG8pfX0iX19wcm90b19fIj09PWQ/T2JqZWN0LmRlZmluZVByb3BlcnR5KHcsZCx7dmFsdWU6bSx3cml0YWJsZTohMCxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pOndbZF09bX1pZihkIT09dC1iKXtpZihyKXRocm93IG5ldyBaKCJjb3JydXB0IGFycmF5IGJzb24iKTt0aHJvdyBuZXcgWigiY29ycnVwdCBvYmplY3QgYnNvbiIpfWlmKCF5KXJldHVybiB3O2lmKFVlKHcpKXtjb25zdCBlPU9iamVjdC5hc3NpZ24oe30sdyk7cmV0dXJuIGRlbGV0ZSBlLiRyZWYsZGVsZXRlIGUuJGlkLGRlbGV0ZSBlLiRkYixuZXcgT2Uody4kcmVmLHcuJGlkLHcuJGRiLGUpfXJldHVybiB3fWNvbnN0IGd0PS9ceDAwLyxodD1uZXcgU2V0KFsiJGRiIiwiJHJlZiIsIiRpZCIsIiRjbHVzdGVyVGltZSJdKTtmdW5jdGlvbiBidChlLHQsbixyKXtlW3IrK109TjtlWyhyPXIrX2UuZW5jb2RlVVRGOEludG8oZSx0LHIpKzEpLTFdPTA7Y29uc3QgaT1fZS5lbmNvZGVVVEY4SW50byhlLG4scis0KTtyZXR1cm4gcGUuc2V0SW50MzJMRShlLHIsaSsxKSxyPXIrNCtpLGVbcisrXT0wLHJ9ZnVuY3Rpb24gZHQoZSx0LG4scil7Y29uc3QgaT0hT2JqZWN0LmlzKG4sLTApJiZOdW1iZXIuaXNTYWZlSW50ZWdlcihuKSYmbjw9bSYmbj49Uz9NOk87ZVtyKytdPWk7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyKz1pPT09TT9wZS5zZXRJbnQzMkxFKGUscixuKTpwZS5zZXRGbG9hdDY0TEUoZSxyLG4pfWZ1bmN0aW9uIHd0KGUsdCxuLHIpe2VbcisrXT1QO3JldHVybiByKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAscis9cGUuc2V0QmlnSW50NjRMRShlLHIsbil9ZnVuY3Rpb24gcHQoZSx0LG4scil7ZVtyKytdPWo7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyfWZ1bmN0aW9uIHl0KGUsdCxuLHIpe2VbcisrXT1BO3JldHVybiByKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAsZVtyKytdPW4/MTowLHJ9ZnVuY3Rpb24gbXQoZSx0LG4scil7ZVtyKytdPVI7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9amUuZnJvbU51bWJlcihuLmdldFRpbWUoKSksbz1pLmdldExvd0JpdHMoKSxzPWkuZ2V0SGlnaEJpdHMoKTtyZXR1cm4gcis9cGUuc2V0SW50MzJMRShlLHIsbykscis9cGUuc2V0SW50MzJMRShlLHIscyl9ZnVuY3Rpb24gU3QoZSx0LG4scil7ZVtyKytdPUY7aWYocis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wLG4uc291cmNlJiZudWxsIT1uLnNvdXJjZS5tYXRjaChndCkpdGhyb3cgbmV3IFooInZhbHVlICIrbi5zb3VyY2UrIiBtdXN0IG5vdCBjb250YWluIG51bGwgYnl0ZXMiKTtyZXR1cm4gcis9X2UuZW5jb2RlVVRGOEludG8oZSxuLnNvdXJjZSxyKSxlW3IrK109MCxuLmlnbm9yZUNhc2UmJihlW3IrK109MTA1KSxuLmdsb2JhbCYmKGVbcisrXT0xMTUpLG4ubXVsdGlsaW5lJiYoZVtyKytdPTEwOSksZVtyKytdPTAscn1mdW5jdGlvbiBCdChlLHQsbixyKXtlW3IrK109RjtpZihyKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAsbnVsbCE9bi5wYXR0ZXJuLm1hdGNoKGd0KSl0aHJvdyBuZXcgWigicGF0dGVybiAiK24ucGF0dGVybisiIG11c3Qgbm90IGNvbnRhaW4gbnVsbCBieXRlcyIpO3IrPV9lLmVuY29kZVVURjhJbnRvKGUsbi5wYXR0ZXJuLHIpLGVbcisrXT0wO2NvbnN0IGk9bi5vcHRpb25zLnNwbGl0KCIiKS5zb3J0KCkuam9pbigiIik7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsaSxyKSxlW3IrK109MCxyfWZ1bmN0aW9uIHh0KGUsdCxuLHIpe251bGw9PT1uP2VbcisrXT1qOiJNaW5LZXkiPT09bi5fYnNvbnR5cGU/ZVtyKytdPVc6ZVtyKytdPVk7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyfWZ1bmN0aW9uIEV0KGUsdCxuLHIpe2VbcisrXT1MO3JldHVybiByKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAscis9bi5zZXJpYWxpemVJbnRvKGUscil9ZnVuY3Rpb24gVXQoZSx0LG4scil7ZVtyKytdPVQ7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi5sZW5ndGg7aWYocis9cGUuc2V0SW50MzJMRShlLHIsaSksZVtyKytdPXEsaTw9MTYpZm9yKGxldCB0PTA7dDxpO3QrKyllW3IrdF09blt0XTtlbHNlIGUuc2V0KG4scik7cmV0dXJuIHIrPWl9ZnVuY3Rpb24gT3QoZSx0LG4scixpLG8scyxhLGMpe2lmKGMuaGFzKG4pKXRocm93IG5ldyBaKCJDYW5ub3QgY29udmVydCBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gQlNPTiIpO2MuYWRkKG4pLGVbcisrXT1BcnJheS5pc0FycmF5KG4pP3Y6STtyKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTA7Y29uc3QgZj1GdChlLG4saSxyLG8rMSxzLGEsYyk7cmV0dXJuIGMuZGVsZXRlKG4pLGZ9ZnVuY3Rpb24gTnQoZSx0LG4scil7ZVtyKytdPUo7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2ZvcihsZXQgdD0wO3Q8MTY7dCsrKWVbcit0XT1uLmJ5dGVzW3RdO3JldHVybiByKzE2fWZ1bmN0aW9uIEl0KGUsdCxuLHIpe2VbcisrXT0iTG9uZyI9PT1uLl9ic29udHlwZT9QOlY7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi5nZXRMb3dCaXRzKCksbz1uLmdldEhpZ2hCaXRzKCk7cmV0dXJuIHIrPXBlLnNldEludDMyTEUoZSxyLGkpLHIrPXBlLnNldEludDMyTEUoZSxyLG8pfWZ1bmN0aW9uIHZ0KGUsdCxuLHIpe249bi52YWx1ZU9mKCksZVtyKytdPU07cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyKz1wZS5zZXRJbnQzMkxFKGUscixuKX1mdW5jdGlvbiBUdChlLHQsbixyKXtlW3IrK109TztyZXR1cm4gcis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wLHIrPXBlLnNldEZsb2F0NjRMRShlLHIsbi52YWx1ZSl9ZnVuY3Rpb24gJHQoZSx0LG4scil7ZVtyKytdPXo7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi50b1N0cmluZygpLG89X2UuZW5jb2RlVVRGOEludG8oZSxpLHIrNCkrMTtyZXR1cm4gcGUuc2V0SW50MzJMRShlLHIsbykscj1yKzQrby0xLGVbcisrXT0wLHJ9ZnVuY3Rpb24gTHQoZSx0LG4scixpPSExLG89MCxzPSExLGE9ITAsYyl7aWYobi5zY29wZSYmIm9iamVjdCI9PXR5cGVvZiBuLnNjb3BlKXtlW3IrK109QztyKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTA7bGV0IGY9cjtjb25zdCBsPW4uY29kZTtyKz00O2NvbnN0IHU9X2UuZW5jb2RlVVRGOEludG8oZSxsLHIrNCkrMTtwZS5zZXRJbnQzMkxFKGUscix1KSxlW3IrNCt1LTFdPTAscj1yK3UrNDtjb25zdCBfPUZ0KGUsbi5zY29wZSxpLHIsbysxLHMsYSxjKTtyPV8tMTtjb25zdCBnPV8tZjtmKz1wZS5zZXRJbnQzMkxFKGUsZixnKSxlW3IrK109MH1lbHNle2VbcisrXT16O3IrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MDtjb25zdCBpPW4uY29kZS50b1N0cmluZygpLG89X2UuZW5jb2RlVVRGOEludG8oZSxpLHIrNCkrMTtwZS5zZXRJbnQzMkxFKGUscixvKSxyPXIrNCtvLTEsZVtyKytdPTB9cmV0dXJuIHJ9ZnVuY3Rpb24gQXQoZSx0LG4scil7ZVtyKytdPVQ7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi5idWZmZXI7bGV0IG89bi5wb3NpdGlvbjtpZihuLnN1Yl90eXBlPT09eWUuU1VCVFlQRV9CWVRFX0FSUkFZJiYobys9NCkscis9cGUuc2V0SW50MzJMRShlLHIsbyksZVtyKytdPW4uc3ViX3R5cGUsbi5zdWJfdHlwZT09PXllLlNVQlRZUEVfQllURV9BUlJBWSYmKG8tPTQscis9cGUuc2V0SW50MzJMRShlLHIsbykpLG4uc3ViX3R5cGU9PT15ZS5TVUJUWVBFX1ZFQ1RPUiYmbWUobiksbzw9MTYpZm9yKGxldCB0PTA7dDxvO3QrKyllW3IrdF09aVt0XTtlbHNlIGUuc2V0KGkscik7cmV0dXJuIHIrPW4ucG9zaXRpb259ZnVuY3Rpb24gUnQoZSx0LG4scil7ZVtyKytdPUQ7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9X2UuZW5jb2RlVVRGOEludG8oZSxuLnZhbHVlLHIrNCkrMTtyZXR1cm4gcGUuc2V0SW50MzJMRShlLHIsaSkscj1yKzQraS0xLGVbcisrXT0wLHJ9ZnVuY3Rpb24ganQoZSx0LG4scixpLG8scyl7ZVtyKytdPUk7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2xldCBhPXIsYz17JHJlZjpuLmNvbGxlY3Rpb258fG4ubmFtZXNwYWNlLCRpZDpuLm9pZH07bnVsbCE9bi5kYiYmKGMuJGRiPW4uZGIpLGM9T2JqZWN0LmFzc2lnbihjLG4uZmllbGRzKTtjb25zdCBmPUZ0KGUsYywhMSxyLGkrMSxvLCEwLHMpLGw9Zi1hO3JldHVybiBhKz1wZS5zZXRJbnQzMkxFKGUscixsKSxmfWZ1bmN0aW9uIEZ0KGUsdCxuLHIsaSxvLHMsYSl7aWYobnVsbD09YSl7aWYobnVsbD09dClyZXR1cm4gZVswXT01LGVbMV09MCxlWzJdPTAsZVszXT0wLGVbNF09MCw1O2lmKEFycmF5LmlzQXJyYXkodCkpdGhyb3cgbmV3IFooInNlcmlhbGl6ZSBkb2VzIG5vdCBzdXBwb3J0IGFuIGFycmF5IGFzIHRoZSByb290IGlucHV0Iik7aWYoIm9iamVjdCIhPXR5cGVvZiB0KXRocm93IG5ldyBaKCJzZXJpYWxpemUgZG9lcyBub3Qgc3VwcG9ydCBub24tb2JqZWN0IGFzIHRoZSByb290IGlucHV0Iik7aWYoIl9ic29udHlwZSJpbiB0JiYic3RyaW5nIj09dHlwZW9mIHQuX2Jzb250eXBlKXRocm93IG5ldyBaKCJCU09OIHR5cGVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGFzIGEgZG9jdW1lbnQiKTtpZihkKHQpfHxoKHQpfHxfKHQpfHxnKHQpKXRocm93IG5ldyBaKCJkYXRlLCByZWdleHAsIHR5cGVkYXJyYXksIGFuZCBhcnJheWJ1ZmZlciBjYW5ub3QgYmUgQlNPTiBkb2N1bWVudHMiKTthPW5ldyBTZXR9YS5hZGQodCk7bGV0IGM9cis0O2lmKEFycmF5LmlzQXJyYXkodCkpZm9yKGxldCByPTA7cjx0Lmxlbmd0aDtyKyspe2NvbnN0IGY9YCR7cn1gO2xldCBsPXRbcl07ImZ1bmN0aW9uIj09dHlwZW9mIGw/LnRvQlNPTiYmKGw9bC50b0JTT04oKSk7Y29uc3QgdT10eXBlb2YgbDtpZih2b2lkIDA9PT1sKWM9cHQoZSxmLDAsYyk7ZWxzZSBpZihudWxsPT09bCljPXB0KGUsZiwwLGMpO2Vsc2UgaWYoInN0cmluZyI9PT11KWM9YnQoZSxmLGwsYyk7ZWxzZSBpZigibnVtYmVyIj09PXUpYz1kdChlLGYsbCxjKTtlbHNlIGlmKCJiaWdpbnQiPT09dSljPXd0KGUsZixsLGMpO2Vsc2UgaWYoImJvb2xlYW4iPT09dSljPXl0KGUsZixsLGMpO2Vsc2UgaWYoIm9iamVjdCI9PT11JiZudWxsPT1sLl9ic29udHlwZSljPWwgaW5zdGFuY2VvZiBEYXRlfHxkKGwpP210KGUsZixsLGMpOmwgaW5zdGFuY2VvZiBVaW50OEFycmF5fHxfKGwpP1V0KGUsZixsLGMpOmwgaW5zdGFuY2VvZiBSZWdFeHB8fGgobCk/U3QoZSxmLGwsYyk6T3QoZSxmLGwsYyxuLGksbyxzLGEpO2Vsc2UgaWYoIm9iamVjdCI9PT11KXtpZihsW3ldIT09cCl0aHJvdyBuZXcgRztpZigiT2JqZWN0SWQiPT09bC5fYnNvbnR5cGUpYz1FdChlLGYsbCxjKTtlbHNlIGlmKCJEZWNpbWFsMTI4Ij09PWwuX2Jzb250eXBlKWM9TnQoZSxmLGwsYyk7ZWxzZSBpZigiTG9uZyI9PT1sLl9ic29udHlwZXx8IlRpbWVzdGFtcCI9PT1sLl9ic29udHlwZSljPUl0KGUsZixsLGMpO2Vsc2UgaWYoIkRvdWJsZSI9PT1sLl9ic29udHlwZSljPVR0KGUsZixsLGMpO2Vsc2UgaWYoIkNvZGUiPT09bC5fYnNvbnR5cGUpYz1MdChlLGYsbCxjLG4saSxvLHMsYSk7ZWxzZSBpZigiQmluYXJ5Ij09PWwuX2Jzb250eXBlKWM9QXQoZSxmLGwsYyk7ZWxzZSBpZigiQlNPTlN5bWJvbCI9PT1sLl9ic29udHlwZSljPVJ0KGUsZixsLGMpO2Vsc2UgaWYoIkRCUmVmIj09PWwuX2Jzb250eXBlKWM9anQoZSxmLGwsYyxpLG8sYSk7ZWxzZSBpZigiQlNPTlJlZ0V4cCI9PT1sLl9ic29udHlwZSljPUJ0KGUsZixsLGMpO2Vsc2UgaWYoIkludDMyIj09PWwuX2Jzb250eXBlKWM9dnQoZSxmLGwsYyk7ZWxzZSBpZigiTWluS2V5Ij09PWwuX2Jzb250eXBlfHwiTWF4S2V5Ij09PWwuX2Jzb250eXBlKWM9eHQoZSxmLGwsYyk7ZWxzZSBpZih2b2lkIDAhPT1sLl9ic29udHlwZSl0aHJvdyBuZXcgWihgVW5yZWNvZ25pemVkIG9yIGludmFsaWQgX2Jzb250eXBlOiAke1N0cmluZyhsLl9ic29udHlwZSl9YCl9ZWxzZSJmdW5jdGlvbiI9PT11JiZvJiYoYz0kdChlLGYsbCxjKSl9ZWxzZSBpZih0IGluc3RhbmNlb2YgTWFwfHxiKHQpKXtjb25zdCByPXQuZW50cmllcygpO2xldCBmPSExO2Zvcig7IWY7KXtjb25zdCB0PXIubmV4dCgpO2lmKGY9ISF0LmRvbmUsZiljb250aW51ZTtjb25zdCBsPXQudmFsdWU/dC52YWx1ZVswXTp2b2lkIDA7bGV0IHU9dC52YWx1ZT90LnZhbHVlWzFdOnZvaWQgMDsiZnVuY3Rpb24iPT10eXBlb2YgdT8udG9CU09OJiYodT11LnRvQlNPTigpKTtjb25zdCBnPXR5cGVvZiB1O2lmKCJzdHJpbmciPT10eXBlb2YgbCYmIWh0LmhhcyhsKSl7aWYobnVsbCE9bC5tYXRjaChndCkpdGhyb3cgbmV3IFooImtleSAiK2wrIiBtdXN0IG5vdCBjb250YWluIG51bGwgYnl0ZXMiKTtpZihuKXtpZigiJCI9PT1sWzBdKXRocm93IG5ldyBaKCJrZXkgIitsKyIgbXVzdCBub3Qgc3RhcnQgd2l0aCAnJCciKTtpZihsLmluY2x1ZGVzKCIuIikpdGhyb3cgbmV3IFooImtleSAiK2wrIiBtdXN0IG5vdCBjb250YWluICcuJyIpfX1pZih2b2lkIDA9PT11KSExPT09cyYmKGM9cHQoZSxsLDAsYykpO2Vsc2UgaWYobnVsbD09PXUpYz1wdChlLGwsMCxjKTtlbHNlIGlmKCJzdHJpbmciPT09ZyljPWJ0KGUsbCx1LGMpO2Vsc2UgaWYoIm51bWJlciI9PT1nKWM9ZHQoZSxsLHUsYyk7ZWxzZSBpZigiYmlnaW50Ij09PWcpYz13dChlLGwsdSxjKTtlbHNlIGlmKCJib29sZWFuIj09PWcpYz15dChlLGwsdSxjKTtlbHNlIGlmKCJvYmplY3QiPT09ZyYmbnVsbD09dS5fYnNvbnR5cGUpYz11IGluc3RhbmNlb2YgRGF0ZXx8ZCh1KT9tdChlLGwsdSxjKTp1IGluc3RhbmNlb2YgVWludDhBcnJheXx8Xyh1KT9VdChlLGwsdSxjKTp1IGluc3RhbmNlb2YgUmVnRXhwfHxoKHUpP1N0KGUsbCx1LGMpOk90KGUsbCx1LGMsbixpLG8scyxhKTtlbHNlIGlmKCJvYmplY3QiPT09Zyl7aWYodVt5XSE9PXApdGhyb3cgbmV3IEc7aWYoIk9iamVjdElkIj09PXUuX2Jzb250eXBlKWM9RXQoZSxsLHUsYyk7ZWxzZSBpZigiRGVjaW1hbDEyOCI9PT11Ll9ic29udHlwZSljPU50KGUsbCx1LGMpO2Vsc2UgaWYoIkxvbmciPT09dS5fYnNvbnR5cGV8fCJUaW1lc3RhbXAiPT09dS5fYnNvbnR5cGUpYz1JdChlLGwsdSxjKTtlbHNlIGlmKCJEb3VibGUiPT09dS5fYnNvbnR5cGUpYz1UdChlLGwsdSxjKTtlbHNlIGlmKCJDb2RlIj09PXUuX2Jzb250eXBlKWM9THQoZSxsLHUsYyxuLGksbyxzLGEpO2Vsc2UgaWYoIkJpbmFyeSI9PT11Ll9ic29udHlwZSljPUF0KGUsbCx1LGMpO2Vsc2UgaWYoIkJTT05TeW1ib2wiPT09dS5fYnNvbnR5cGUpYz1SdChlLGwsdSxjKTtlbHNlIGlmKCJEQlJlZiI9PT11Ll9ic29udHlwZSljPWp0KGUsbCx1LGMsaSxvLGEpO2Vsc2UgaWYoIkJTT05SZWdFeHAiPT09dS5fYnNvbnR5cGUpYz1CdChlLGwsdSxjKTtlbHNlIGlmKCJJbnQzMiI9PT11Ll9ic29udHlwZSljPXZ0KGUsbCx1LGMpO2Vsc2UgaWYoIk1pbktleSI9PT11Ll9ic29udHlwZXx8Ik1heEtleSI9PT11Ll9ic29udHlwZSljPXh0KGUsbCx1LGMpO2Vsc2UgaWYodm9pZCAwIT09dS5fYnNvbnR5cGUpdGhyb3cgbmV3IFooYFVucmVjb2duaXplZCBvciBpbnZhbGlkIF9ic29udHlwZTogJHtTdHJpbmcodS5fYnNvbnR5cGUpfWApfWVsc2UiZnVuY3Rpb24iPT09ZyYmbyYmKGM9JHQoZSxsLHUsYykpfX1lbHNle2lmKCJmdW5jdGlvbiI9PXR5cGVvZiB0Py50b0JTT04mJm51bGwhPSh0PXQudG9CU09OKCkpJiYib2JqZWN0IiE9dHlwZW9mIHQpdGhyb3cgbmV3IFooInRvQlNPTiBmdW5jdGlvbiBkaWQgbm90IHJldHVybiBhbiBvYmplY3QiKTtmb3IoY29uc3QgciBvZiBPYmplY3Qua2V5cyh0KSl7bGV0IGY9dFtyXTsiZnVuY3Rpb24iPT10eXBlb2YgZj8udG9CU09OJiYoZj1mLnRvQlNPTigpKTtjb25zdCBsPXR5cGVvZiBmO2lmKCJzdHJpbmciPT10eXBlb2YgciYmIWh0LmhhcyhyKSl7aWYobnVsbCE9ci5tYXRjaChndCkpdGhyb3cgbmV3IFooImtleSAiK3IrIiBtdXN0IG5vdCBjb250YWluIG51bGwgYnl0ZXMiKTtpZihuKXtpZigiJCI9PT1yWzBdKXRocm93IG5ldyBaKCJrZXkgIityKyIgbXVzdCBub3Qgc3RhcnQgd2l0aCAnJCciKTtpZihyLmluY2x1ZGVzKCIuIikpdGhyb3cgbmV3IFooImtleSAiK3IrIiBtdXN0IG5vdCBjb250YWluICcuJyIpfX1pZih2b2lkIDA9PT1mKSExPT09cyYmKGM9cHQoZSxyLDAsYykpO2Vsc2UgaWYobnVsbD09PWYpYz1wdChlLHIsMCxjKTtlbHNlIGlmKCJzdHJpbmciPT09bCljPWJ0KGUscixmLGMpO2Vsc2UgaWYoIm51bWJlciI9PT1sKWM9ZHQoZSxyLGYsYyk7ZWxzZSBpZigiYmlnaW50Ij09PWwpYz13dChlLHIsZixjKTtlbHNlIGlmKCJib29sZWFuIj09PWwpYz15dChlLHIsZixjKTtlbHNlIGlmKCJvYmplY3QiPT09bCYmbnVsbD09Zi5fYnNvbnR5cGUpYz1mIGluc3RhbmNlb2YgRGF0ZXx8ZChmKT9tdChlLHIsZixjKTpmIGluc3RhbmNlb2YgVWludDhBcnJheXx8XyhmKT9VdChlLHIsZixjKTpmIGluc3RhbmNlb2YgUmVnRXhwfHxoKGYpP1N0KGUscixmLGMpOk90KGUscixmLGMsbixpLG8scyxhKTtlbHNlIGlmKCJvYmplY3QiPT09bCl7aWYoZlt5XSE9PXApdGhyb3cgbmV3IEc7aWYoIk9iamVjdElkIj09PWYuX2Jzb250eXBlKWM9RXQoZSxyLGYsYyk7ZWxzZSBpZigiRGVjaW1hbDEyOCI9PT1mLl9ic29udHlwZSljPU50KGUscixmLGMpO2Vsc2UgaWYoIkxvbmciPT09Zi5fYnNvbnR5cGV8fCJUaW1lc3RhbXAiPT09Zi5fYnNvbnR5cGUpYz1JdChlLHIsZixjKTtlbHNlIGlmKCJEb3VibGUiPT09Zi5fYnNvbnR5cGUpYz1UdChlLHIsZixjKTtlbHNlIGlmKCJDb2RlIj09PWYuX2Jzb250eXBlKWM9THQoZSxyLGYsYyxuLGksbyxzLGEpO2Vsc2UgaWYoIkJpbmFyeSI9PT1mLl9ic29udHlwZSljPUF0KGUscixmLGMpO2Vsc2UgaWYoIkJTT05TeW1ib2wiPT09Zi5fYnNvbnR5cGUpYz1SdChlLHIsZixjKTtlbHNlIGlmKCJEQlJlZiI9PT1mLl9ic29udHlwZSljPWp0KGUscixmLGMsaSxvLGEpO2Vsc2UgaWYoIkJTT05SZWdFeHAiPT09Zi5fYnNvbnR5cGUpYz1CdChlLHIsZixjKTtlbHNlIGlmKCJJbnQzMiI9PT1mLl9ic29udHlwZSljPXZ0KGUscixmLGMpO2Vsc2UgaWYoIk1pbktleSI9PT1mLl9ic29udHlwZXx8Ik1heEtleSI9PT1mLl9ic29udHlwZSljPXh0KGUscixmLGMpO2Vsc2UgaWYodm9pZCAwIT09Zi5fYnNvbnR5cGUpdGhyb3cgbmV3IFooYFVucmVjb2duaXplZCBvciBpbnZhbGlkIF9ic29udHlwZTogJHtTdHJpbmcoZi5fYnNvbnR5cGUpfWApfWVsc2UiZnVuY3Rpb24iPT09bCYmbyYmKGM9JHQoZSxyLGYsYykpfX1hLmRlbGV0ZSh0KSxlW2MrK109MDtjb25zdCBmPWMtcjtyZXR1cm4gcis9cGUuc2V0SW50MzJMRShlLHIsZiksY31jb25zdCBrdD17JG9pZDp0dCwkYmluYXJ5OnllLCR1dWlkOnllLCRzeW1ib2w6b3QsJG51bWJlckludDpaZSwkbnVtYmVyRGVjaW1hbDpIZSwkbnVtYmVyRG91YmxlOktlLCRudW1iZXJMb25nOmplLCRtaW5LZXk6WGUsJG1heEtleTpHZSwkcmVnZXg6aXQsJHJlZ3VsYXJFeHByZXNzaW9uOml0LCR0aW1lc3RhbXA6YXR9O2Z1bmN0aW9uIHp0KGUsdD17fSl7aWYoIm51bWJlciI9PXR5cGVvZiBlKXtjb25zdCBuPWU8PW0mJmU+PVMscj1lPD1CJiZlPj14O2lmKHQucmVsYXhlZHx8dC5sZWdhY3kpcmV0dXJuIGU7aWYoTnVtYmVyLmlzSW50ZWdlcihlKSYmIU9iamVjdC5pcyhlLC0wKSl7aWYobilyZXR1cm4gbmV3IFplKGUpO2lmKHIpcmV0dXJuIHQudXNlQmlnSW50NjQ/QmlnSW50KGUpOmplLmZyb21OdW1iZXIoZSl9cmV0dXJuIG5ldyBLZShlKX1pZihudWxsPT1lfHwib2JqZWN0IiE9dHlwZW9mIGUpcmV0dXJuIGU7aWYoZS4kdW5kZWZpbmVkKXJldHVybiBudWxsO2NvbnN0IG49T2JqZWN0LmtleXMoZSkuZmlsdGVyKCh0PT50LnN0YXJ0c1dpdGgoIiQiKSYmbnVsbCE9ZVt0XSkpO2ZvcihsZXQgcj0wO3I8bi5sZW5ndGg7cisrKXtjb25zdCBpPWt0W25bcl1dO2lmKGkpcmV0dXJuIGkuZnJvbUV4dGVuZGVkSlNPTihlLHQpfWlmKG51bGwhPWUuJGRhdGUpe2NvbnN0IG49ZS4kZGF0ZSxyPW5ldyBEYXRlO2lmKHQubGVnYWN5KWlmKCJudW1iZXIiPT10eXBlb2YgbilyLnNldFRpbWUobik7ZWxzZSBpZigic3RyaW5nIj09dHlwZW9mIG4pci5zZXRUaW1lKERhdGUucGFyc2UobikpO2Vsc2V7aWYoImJpZ2ludCIhPXR5cGVvZiBuKXRocm93IG5ldyBYKCJVbnJlY29nbml6ZWQgdHlwZSBmb3IgRUpTT04gZGF0ZTogIit0eXBlb2Ygbik7ci5zZXRUaW1lKE51bWJlcihuKSl9ZWxzZSBpZigic3RyaW5nIj09dHlwZW9mIG4pci5zZXRUaW1lKERhdGUucGFyc2UobikpO2Vsc2UgaWYoamUuaXNMb25nKG4pKXIuc2V0VGltZShuLnRvTnVtYmVyKCkpO2Vsc2UgaWYoIm51bWJlciI9PXR5cGVvZiBuJiZ0LnJlbGF4ZWQpci5zZXRUaW1lKG4pO2Vsc2V7aWYoImJpZ2ludCIhPXR5cGVvZiBuKXRocm93IG5ldyBYKCJVbnJlY29nbml6ZWQgdHlwZSBmb3IgRUpTT04gZGF0ZTogIit0eXBlb2Ygbik7ci5zZXRUaW1lKE51bWJlcihuKSl9cmV0dXJuIHJ9aWYobnVsbCE9ZS4kY29kZSl7Y29uc3QgdD1PYmplY3QuYXNzaWduKHt9LGUpO3JldHVybiBlLiRzY29wZSYmKHQuJHNjb3BlPXp0KGUuJHNjb3BlKSksRWUuZnJvbUV4dGVuZGVkSlNPTihlKX1pZihVZShlKXx8ZS4kZGJQb2ludGVyKXtjb25zdCB0PWUuJHJlZj9lOmUuJGRiUG9pbnRlcjtpZih0IGluc3RhbmNlb2YgT2UpcmV0dXJuIHQ7Y29uc3Qgbj1PYmplY3Qua2V5cyh0KS5maWx0ZXIoKGU9PmUuc3RhcnRzV2l0aCgiJCIpKSk7bGV0IHI9ITA7aWYobi5mb3JFYWNoKChlPT57LTE9PT1bIiRyZWYiLCIkaWQiLCIkZGIiXS5pbmRleE9mKGUpJiYocj0hMSl9KSkscilyZXR1cm4gT2UuZnJvbUV4dGVuZGVkSlNPTih0KX1yZXR1cm4gZX1mdW5jdGlvbiBEdChlKXtjb25zdCB0PWUudG9JU09TdHJpbmcoKTtyZXR1cm4gMCE9PWUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk/dDp0LnNsaWNlKDAsLTUpKyJaIn1mdW5jdGlvbiBDdChlLHQpe2lmKGUgaW5zdGFuY2VvZiBNYXB8fGIoZSkpe2NvbnN0IG49T2JqZWN0LmNyZWF0ZShudWxsKTtmb3IoY29uc3RbdCxyXW9mIGUpe2lmKCJzdHJpbmciIT10eXBlb2YgdCl0aHJvdyBuZXcgWigiQ2FuIG9ubHkgc2VyaWFsaXplIG1hcHMgd2l0aCBzdHJpbmcga2V5cyIpO25bdF09cn1yZXR1cm4gQ3Qobix0KX1pZigoIm9iamVjdCI9PXR5cGVvZiBlfHwiZnVuY3Rpb24iPT10eXBlb2YgZSkmJm51bGwhPT1lKXtjb25zdCBuPXQuc2Vlbk9iamVjdHMuZmluZEluZGV4KCh0PT50Lm9iaj09PWUpKTtpZigtMSE9PW4pe2NvbnN0IGU9dC5zZWVuT2JqZWN0cy5tYXAoKGU9PmUucHJvcGVydHlOYW1lKSkscj1lLnNsaWNlKDAsbikubWFwKChlPT5gJHtlfSAtPiBgKSkuam9pbigiIiksaT1lW25dLG89IiAtPiAiK2Uuc2xpY2UobisxLGUubGVuZ3RoLTEpLm1hcCgoZT0+YCR7ZX0gLT4gYCkpLmpvaW4oIiIpLHM9ZVtlLmxlbmd0aC0xXSxhPSIgIi5yZXBlYXQoci5sZW5ndGgraS5sZW5ndGgvMiksYz0iLSIucmVwZWF0KG8ubGVuZ3RoKyhpLmxlbmd0aCtzLmxlbmd0aCkvMi0xKTt0aHJvdyBuZXcgWihgQ29udmVydGluZyBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gRUpTT046XG4gICAgJHtyfSR7aX0ke299JHtzfVxuICAgICR7YX1cXCR7Y30vYCl9dC5zZWVuT2JqZWN0c1t0LnNlZW5PYmplY3RzLmxlbmd0aC0xXS5vYmo9ZX1pZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBmdW5jdGlvbihlLHQpe3JldHVybiBlLm1hcCgoKGUsbik9Pnt0LnNlZW5PYmplY3RzLnB1c2goe3Byb3BlcnR5TmFtZTpgaW5kZXggJHtufWAsb2JqOm51bGx9KTt0cnl7cmV0dXJuIEN0KGUsdCl9ZmluYWxseXt0LnNlZW5PYmplY3RzLnBvcCgpfX0pKX0oZSx0KTtpZih2b2lkIDA9PT1lKXJldHVybiB0Lmlnbm9yZVVuZGVmaW5lZD92b2lkIDA6bnVsbDtpZihlIGluc3RhbmNlb2YgRGF0ZXx8ZChlKSl7Y29uc3Qgbj1lLmdldFRpbWUoKSxyPW4+LTEmJm48MjUzNDAyMzE4OGU1O3JldHVybiB0LmxlZ2FjeT90LnJlbGF4ZWQmJnI/eyRkYXRlOmUuZ2V0VGltZSgpfTp7JGRhdGU6RHQoZSl9OnQucmVsYXhlZCYmcj97JGRhdGU6RHQoZSl9OnskZGF0ZTp7JG51bWJlckxvbmc6ZS5nZXRUaW1lKCkudG9TdHJpbmcoKX19fWlmKCEoIm51bWJlciIhPXR5cGVvZiBlfHx0LnJlbGF4ZWQmJmlzRmluaXRlKGUpKSl7aWYoTnVtYmVyLmlzSW50ZWdlcihlKSYmIU9iamVjdC5pcyhlLC0wKSl7aWYoZT49UyYmZTw9bSlyZXR1cm57JG51bWJlckludDplLnRvU3RyaW5nKCl9O2lmKGU+PXgmJmU8PUIpcmV0dXJueyRudW1iZXJMb25nOmUudG9TdHJpbmcoKX19cmV0dXJueyRudW1iZXJEb3VibGU6T2JqZWN0LmlzKGUsLTApPyItMC4wIjplLnRvU3RyaW5nKCl9fWlmKCJiaWdpbnQiPT10eXBlb2YgZSlyZXR1cm4gdC5yZWxheGVkP051bWJlcihCaWdJbnQuYXNJbnROKDY0LGUpKTp7JG51bWJlckxvbmc6QmlnSW50LmFzSW50Tig2NCxlKS50b1N0cmluZygpfTtpZihlIGluc3RhbmNlb2YgUmVnRXhwfHxoKGUpKXtsZXQgbj1lLmZsYWdzO2lmKHZvaWQgMD09PW4pe2NvbnN0IHQ9ZS50b1N0cmluZygpLm1hdGNoKC9bZ2ltdXldKiQvKTt0JiYobj10WzBdKX1yZXR1cm4gbmV3IGl0KGUuc291cmNlLG4pLnRvRXh0ZW5kZWRKU09OKHQpfXJldHVybiBudWxsIT1lJiYib2JqZWN0Ij09dHlwZW9mIGU/ZnVuY3Rpb24oZSx0KXtpZihudWxsPT1lfHwib2JqZWN0IiE9dHlwZW9mIGUpdGhyb3cgbmV3IFooIm5vdCBhbiBvYmplY3QgaW5zdGFuY2UiKTtjb25zdCBuPWUuX2Jzb250eXBlO2lmKHZvaWQgMD09PW4pe2NvbnN0IG49e307Zm9yKGNvbnN0IHIgb2YgT2JqZWN0LmtleXMoZSkpe3Quc2Vlbk9iamVjdHMucHVzaCh7cHJvcGVydHlOYW1lOnIsb2JqOm51bGx9KTt0cnl7Y29uc3QgaT1DdChlW3JdLHQpOyJfX3Byb3RvX18iPT09cj9PYmplY3QuZGVmaW5lUHJvcGVydHkobixyLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSk6bltyXT1pfWZpbmFsbHl7dC5zZWVuT2JqZWN0cy5wb3AoKX19cmV0dXJuIG59aWYobnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYic3RyaW5nIj09dHlwZW9mIGUuX2Jzb250eXBlJiZlW3ldIT09cCl0aHJvdyBuZXcgRztpZihmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiX2Jzb250eXBlImluIGUmJiJzdHJpbmciPT10eXBlb2YgZS5fYnNvbnR5cGV9KGUpKXtsZXQgcj1lO2lmKCJmdW5jdGlvbiIhPXR5cGVvZiByLnRvRXh0ZW5kZWRKU09OKXtjb25zdCB0PU10W2UuX2Jzb250eXBlXTtpZighdCl0aHJvdyBuZXcgWigiVW5yZWNvZ25pemVkIG9yIGludmFsaWQgX2Jzb250eXBlOiAiK2UuX2Jzb250eXBlKTtyPXQocil9cmV0dXJuIkNvZGUiPT09biYmci5zY29wZT9yPW5ldyBFZShyLmNvZGUsQ3Qoci5zY29wZSx0KSk6IkRCUmVmIj09PW4mJnIub2lkJiYocj1uZXcgT2UoQ3Qoci5jb2xsZWN0aW9uLHQpLEN0KHIub2lkLHQpLEN0KHIuZGIsdCksQ3Qoci5maWVsZHMsdCkpKSxyLnRvRXh0ZW5kZWRKU09OKHQpfXRocm93IG5ldyBaKCJfYnNvbnR5cGUgbXVzdCBiZSBhIHN0cmluZywgYnV0IHdhczogIit0eXBlb2Ygbil9KGUsdCk6ZX1jb25zdCBNdD17QmluYXJ5OmU9Pm5ldyB5ZShlLnZhbHVlKCksZS5zdWJfdHlwZSksQ29kZTplPT5uZXcgRWUoZS5jb2RlLGUuc2NvcGUpLERCUmVmOmU9Pm5ldyBPZShlLmNvbGxlY3Rpb258fGUubmFtZXNwYWNlLGUub2lkLGUuZGIsZS5maWVsZHMpLERlY2ltYWwxMjg6ZT0+bmV3IEhlKGUuYnl0ZXMpLERvdWJsZTplPT5uZXcgS2UoZS52YWx1ZSksSW50MzI6ZT0+bmV3IFplKGUudmFsdWUpLExvbmc6ZT0+amUuZnJvbUJpdHMobnVsbCE9ZS5sb3c/ZS5sb3c6ZS5sb3dfLG51bGwhPWUubG93P2UuaGlnaDplLmhpZ2hfLG51bGwhPWUubG93P2UudW5zaWduZWQ6ZS51bnNpZ25lZF8pLE1heEtleTooKT0+bmV3IEdlLE1pbktleTooKT0+bmV3IFhlLE9iamVjdElkOmU9Pm5ldyB0dChlKSxCU09OUmVnRXhwOmU9Pm5ldyBpdChlLnBhdHRlcm4sZS5vcHRpb25zKSxCU09OU3ltYm9sOmU9Pm5ldyBvdChlLnZhbHVlKSxUaW1lc3RhbXA6ZT0+YXQuZnJvbUJpdHMoZS5sb3csZS5oaWdoKX07ZnVuY3Rpb24gVnQoZSx0KXtjb25zdCBuPXt1c2VCaWdJbnQ2NDp0Py51c2VCaWdJbnQ2ND8/ITEscmVsYXhlZDp0Py5yZWxheGVkPz8hMCxsZWdhY3k6dD8ubGVnYWN5Pz8hMX07cmV0dXJuIEpTT04ucGFyc2UoZSwoKGUsdCk9PntpZigtMSE9PWUuaW5kZXhPZigiXDAiKSl0aHJvdyBuZXcgWihgQlNPTiBEb2N1bWVudCBmaWVsZCBuYW1lcyBjYW5ub3QgY29udGFpbiBudWxsIGJ5dGVzLCBmb3VuZDogJHtKU09OLnN0cmluZ2lmeShlKX1gKTtyZXR1cm4genQodCxuKX0pKX1mdW5jdGlvbiBQdChlLHQsbixyKXtudWxsIT1uJiYib2JqZWN0Ij09dHlwZW9mIG4mJihyPW4sbj0wKSxudWxsPT10fHwib2JqZWN0IiE9dHlwZW9mIHR8fEFycmF5LmlzQXJyYXkodCl8fChyPXQsdD12b2lkIDAsbj0wKTtjb25zdCBpPUN0KGUsT2JqZWN0LmFzc2lnbih7cmVsYXhlZDohMCxsZWdhY3k6ITF9LHIse3NlZW5PYmplY3RzOlt7cHJvcGVydHlOYW1lOiIocm9vdCkiLG9iajpudWxsfV19KSk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KGksdCxuKX1jb25zdCBKdD1PYmplY3QuY3JlYXRlKG51bGwpO0p0LnBhcnNlPVZ0LEp0LnN0cmluZ2lmeT1QdCxKdC5zZXJpYWxpemU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD10fHx7fSxKU09OLnBhcnNlKFB0KGUsdCkpfSxKdC5kZXNlcmlhbGl6ZT1mdW5jdGlvbihlLHQpe3JldHVybiB0PXR8fHt9LFZ0KEpTT04uc3RyaW5naWZ5KGUpLHQpfSxPYmplY3QuZnJlZXplKEp0KTtjb25zdCBXdD0xLFl0PTIscXQ9MyxIdD00LEt0PTUsWnQ9NixHdD03LFh0PTgsUXQ9OSxlbj0xMCx0bj0xMSxubj0xMixybj0xMyxvbj0xNCxzbj0xNSxhbj0xNixjbj0xNyxmbj0xOCxsbj0xOSx1bj0yNTUsX249MTI3O2Z1bmN0aW9uIGduKGUsdCl7dHJ5e3JldHVybiBwZS5nZXROb25uZWdhdGl2ZUludDMyTEUoZSx0KX1jYXRjaChlKXt0aHJvdyBuZXcgUSgiQlNPTiBzaXplIGNhbm5vdCBiZSBuZWdhdGl2ZSIsdCx7Y2F1c2U6ZX0pfX1mdW5jdGlvbiBobihlLHQpe2xldCBuPXQ7Zm9yKDswIT09ZVtuXTtuKyspO2lmKG49PT1lLmxlbmd0aC0xKXRocm93IG5ldyBRKCJOdWxsIHRlcm1pbmF0b3Igbm90IGZvdW5kIix0KTtyZXR1cm4gbn1jb25zdCBibj1PYmplY3QuY3JlYXRlKG51bGwpO2JuLnBhcnNlVG9FbGVtZW50cz1mdW5jdGlvbihlLHQ9MCl7aWYodD8/PTAsZS5sZW5ndGg8NSl0aHJvdyBuZXcgUShgSW5wdXQgbXVzdCBiZSBhdCBsZWFzdCA1IGJ5dGVzLCBnb3QgJHtlLmxlbmd0aH0gYnl0ZXNgLHQpO2NvbnN0IG49Z24oZSx0KTtpZihuPmUubGVuZ3RoLXQpdGhyb3cgbmV3IFEoYFBhcnNlZCBkb2N1bWVudFNpemUgKCR7bn0gYnl0ZXMpIGRvZXMgbm90IG1hdGNoIGlucHV0IGxlbmd0aCAoJHtlLmxlbmd0aH0gYnl0ZXMpYCx0KTtpZigwIT09ZVt0K24tMV0pdGhyb3cgbmV3IFEoIkJTT04gZG9jdW1lbnRzIG11c3QgZW5kIGluIDB4MDAiLHQrbik7Y29uc3Qgcj1bXTtsZXQgaT10KzQ7Zm9yKDtpPD1uK3Q7KXtjb25zdCBvPWVbaV07aWYoaSs9MSwwPT09byl7aWYoaS10IT09bil0aHJvdyBuZXcgUSgiSW52YWxpZCAweDAwIHR5cGUgYnl0ZSIsaSk7YnJlYWt9Y29uc3Qgcz1pLGE9aG4oZSxpKS1zO2xldCBjO2lmKGkrPWErMSxvPT09V3R8fG89PT1mbnx8bz09PVF0fHxvPT09Y24pYz04O2Vsc2UgaWYobz09PWFuKWM9NDtlbHNlIGlmKG89PT1HdCljPTEyO2Vsc2UgaWYobz09PWxuKWM9MTY7ZWxzZSBpZihvPT09WHQpYz0xO2Vsc2UgaWYobz09PWVufHxvPT09WnR8fG89PT1fbnx8bz09PXVuKWM9MDtlbHNlIGlmKG89PT10biljPWhuKGUsaG4oZSxpKSsxKSsxLWk7ZWxzZSBpZihvPT09cXR8fG89PT1IdHx8bz09PXNuKWM9Z24oZSxpKTtlbHNle2lmKG8hPT1ZdCYmbyE9PUt0JiZvIT09bm4mJm8hPT1ybiYmbyE9PW9uKXRocm93IG5ldyBRKGBJbnZhbGlkIDB4JHtvLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCIwIil9IHR5cGUgYnl0ZWAsaSk7Yz1nbihlLGkpKzQsbz09PUt0JiYoYys9MSksbz09PW5uJiYoYys9MTIpfWlmKGM+bil0aHJvdyBuZXcgUSgidmFsdWUgcmVwb3J0cyBsZW5ndGggbGFyZ2VyIHRoYW4gZG9jdW1lbnQiLGkpO3IucHVzaChbbyxzLGEsaSxjXSksaSs9Y31yZXR1cm4gcn0sYm4uQnl0ZVV0aWxzPV9lLGJuLk51bWJlclV0aWxzPXBlLE9iamVjdC5mcmVlemUoYm4pO2NvbnN0IGRuPTE3ODI1NzkyO2xldCB3bj1fZS5hbGxvY2F0ZShkbik7dmFyIHBuPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLEJTT05FcnJvcjpaLEJTT05PZmZzZXRFcnJvcjpRLEJTT05SZWdFeHA6aXQsQlNPTlJ1bnRpbWVFcnJvcjpYLEJTT05TeW1ib2w6b3QsQlNPTlR5cGU6SyxCU09OVmFsdWU6aGUsQlNPTlZlcnNpb25FcnJvcjpHLEJpbmFyeTp5ZSxCeXRlVXRpbHM6X2UsQ29kZTpFZSxEQlJlZjpPZSxEZWNpbWFsMTI4OkhlLERvdWJsZTpLZSxFSlNPTjpKdCxJbnQzMjpaZSxMb25nOmplLE1heEtleTpHZSxNaW5LZXk6WGUsTnVtYmVyVXRpbHM6cGUsT2JqZWN0SWQ6dHQsVGltZXN0YW1wOmF0LFVVSUQ6eGUsYnNvblR5cGU6Z2UsY2FsY3VsYXRlT2JqZWN0U2l6ZTpmdW5jdGlvbihlLHQ9e30pe3JldHVybiBudChlLCJib29sZWFuIj09dHlwZW9mKHQ9dHx8e30pLnNlcmlhbGl6ZUZ1bmN0aW9ucyYmdC5zZXJpYWxpemVGdW5jdGlvbnMsImJvb2xlYW4iIT10eXBlb2YgdC5pZ25vcmVVbmRlZmluZWR8fHQuaWdub3JlVW5kZWZpbmVkKX0sZGVzZXJpYWxpemU6ZnVuY3Rpb24oZSx0PXt9KXtyZXR1cm4gbHQoX2UudG9Mb2NhbEJ1ZmZlclR5cGUoZSksdCl9LGRlc2VyaWFsaXplU3RyZWFtOmZ1bmN0aW9uKGUsdCxuLHIsaSxvKXtjb25zdCBzPU9iamVjdC5hc3NpZ24oe2FsbG93T2JqZWN0U21hbGxlclRoYW5CdWZmZXJTaXplOiEwLGluZGV4OjB9LG8pLGE9X2UudG9Mb2NhbEJ1ZmZlclR5cGUoZSk7bGV0IGM9dDtmb3IobGV0IGU9MDtlPG47ZSsrKXtjb25zdCB0PXBlLmdldEludDMyTEUoYSxjKTtzLmluZGV4PWMscltpK2VdPWx0KGEscyksYys9dH1yZXR1cm4gY30sb25EZW1hbmQ6Ym4sc2VyaWFsaXplOmZ1bmN0aW9uKGUsdD17fSl7Y29uc3Qgbj0iYm9vbGVhbiI9PXR5cGVvZiB0LmNoZWNrS2V5cyYmdC5jaGVja0tleXMscj0iYm9vbGVhbiI9PXR5cGVvZiB0LnNlcmlhbGl6ZUZ1bmN0aW9ucyYmdC5zZXJpYWxpemVGdW5jdGlvbnMsaT0iYm9vbGVhbiIhPXR5cGVvZiB0Lmlnbm9yZVVuZGVmaW5lZHx8dC5pZ25vcmVVbmRlZmluZWQsbz0ibnVtYmVyIj09dHlwZW9mIHQubWluSW50ZXJuYWxCdWZmZXJTaXplP3QubWluSW50ZXJuYWxCdWZmZXJTaXplOmRuO3duLmxlbmd0aDxvJiYod249X2UuYWxsb2NhdGUobykpO2NvbnN0IHM9RnQod24sZSxuLDAsMCxyLGksbnVsbCksYT1fZS5hbGxvY2F0ZVVuc2FmZShzKTtyZXR1cm4gYS5zZXQod24uc3ViYXJyYXkoMCxzKSwwKSxhfSxzZXJpYWxpemVXaXRoQnVmZmVyQW5kSW5kZXg6ZnVuY3Rpb24oZSx0LG49e30pe2NvbnN0IHI9ImJvb2xlYW4iPT10eXBlb2Ygbi5jaGVja0tleXMmJm4uY2hlY2tLZXlzLGk9ImJvb2xlYW4iPT10eXBlb2Ygbi5zZXJpYWxpemVGdW5jdGlvbnMmJm4uc2VyaWFsaXplRnVuY3Rpb25zLG89ImJvb2xlYW4iIT10eXBlb2Ygbi5pZ25vcmVVbmRlZmluZWR8fG4uaWdub3JlVW5kZWZpbmVkLHM9Im51bWJlciI9PXR5cGVvZiBuLmluZGV4P24uaW5kZXg6MCxhPUZ0KHduLGUsciwwLDAsaSxvLG51bGwpO3JldHVybiB0LnNldCh3bi5zdWJhcnJheSgwLGEpLHMpLHMrYS0xfSxzZXRJbnRlcm5hbEJ1ZmZlclNpemU6ZnVuY3Rpb24oZSl7d24ubGVuZ3RoPGUmJih3bj1fZS5hbGxvY2F0ZShlKSl9fSk7Y2xhc3MgeW57Y29uc3RydWN0b3IoKXt9c3RhdGljIHVybENvbnN0cnVjdEZyb20oZSl7Y29uc3QgdD0iL3dzL21vZGVsaW5nL2NvbW1hbmRzIitmdW5jdGlvbihlKXtjb25zdCB0PW5ldyBVUkxTZWFyY2hQYXJhbXM7Zm9yKGNvbnN0W24scl1vZiBPYmplY3QuZW50cmllcyhlKSlpZih2b2lkIDAhPT1yKWlmKEFycmF5LmlzQXJyYXkocikpZm9yKGNvbnN0IGUgb2Ygcil0LmFwcGVuZChuLFN0cmluZyhlKSk7ZWxzZSB0LmFwcGVuZChuLFN0cmluZyhyKSk7Y29uc3Qgbj10LnRvU3RyaW5nKCk7cmV0dXJuIG4/YD8ke259YDoiIn0oe3ZpZGVvX3Jlc193aWR0aDplLnZpZGVvX3Jlc193aWR0aCx2aWRlb19yZXNfaGVpZ2h0OmUudmlkZW9fcmVzX2hlaWdodCxmcHM6ZS5mcHMsdW5sb2NrZWRfZnJhbWVyYXRlOmUudW5sb2NrZWRfZnJhbWVyYXRlLHBvc3RfZWZmZWN0OmUucG9zdF9lZmZlY3Qsd2VicnRjOmUud2VicnRjLHBvb2w6ZS5wb29sLHNob3dfZ3JpZDplLnNob3dfZ3JpZCxyZXBsYXk6ZS5yZXBsYXksYXBpX2NhbGxfaWQ6ZS5hcGlfY2FsbF9pZCxvcmRlcl9pbmRlcGVuZGVudF90cmFuc3BhcmVuY3k6ZS5vcmRlcl9pbmRlcGVuZGVudF90cmFuc3BhcmVuY3kscHI6ZS5wcn0pLG49KChlLmNsaWVudD8uYmFzZVVybHx8Imh0dHBzOi8vYXBpLnpvby5kZXYiKSt0KS5yZXBsYWNlKC9eaHR0cC8sIndzIik7cmV0dXJuIG5ldyBVUkwobil9c3RhdGljIGF1dGhlbnRpY2F0ZShlLHQpe2NvbnN0IG49ZS5jbGllbnQmJmUuY2xpZW50LnRva2VufHwiIjtpZihuKXRyeXtjb25zdCBlPXt0eXBlOiJoZWFkZXJzIixoZWFkZXJzOntBdXRob3JpemF0aW9uOmBCZWFyZXIgJHtufWB9fTt0LnNlbmQoSlNPTi5zdHJpbmdpZnkoZSkpfWNhdGNoe319c3RhdGljIHRvQlNPTihlKXtyZXR1cm4gcG4uc2VyaWFsaXplKGUpfXN0YXRpYyBwYXJzZU1lc3NhZ2UoZSl7Y29uc3QgdD1lPy5kYXRhO2lmKCJzdHJpbmciPT10eXBlb2YgdClyZXR1cm4gSlNPTi5wYXJzZSh0KTtpZigidW5kZWZpbmVkIiE9dHlwZW9mIEJ1ZmZlciYmQnVmZmVyLmlzQnVmZmVyPy4odCkpe2NvbnN0IGU9dDt0cnl7cmV0dXJuIEpTT04ucGFyc2UoZS50b1N0cmluZygidXRmOCIpKX1jYXRjaHt9cmV0dXJuIHBuLmRlc2VyaWFsaXplKGUpfWlmKHQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0KTt0cnl7Y29uc3QgdD0obmV3IFRleHREZWNvZGVyKS5kZWNvZGUoZSk7cmV0dXJuIEpTT04ucGFyc2UodCl9Y2F0Y2h7fXJldHVybiBwbi5kZXNlcmlhbGl6ZShlKX1pZigobj10KSYmIm9iamVjdCI9PXR5cGVvZiBuJiYiYnVmZmVyImluIG4mJm4uYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXImJiJudW1iZXIiPT10eXBlb2Ygbi5ieXRlT2Zmc2V0JiYibnVtYmVyIj09dHlwZW9mIG4uYnl0ZUxlbmd0aCl7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0LmJ1ZmZlcix0LmJ5dGVPZmZzZXQsdC5ieXRlTGVuZ3RoKTt0cnl7Y29uc3QgdD0obmV3IFRleHREZWNvZGVyKS5kZWNvZGUoZSk7cmV0dXJuIEpTT04ucGFyc2UodCl9Y2F0Y2h7fXJldHVybiBwbi5kZXNlcmlhbGl6ZShlKX12YXIgbjtyZXR1cm4gdH19Y2xhc3MgbW57X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxSbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ19jb250ZXh0X2ZyZWUoZSwwKX1hZGRfY29uc3RyYWludChlLHQsbixyLGkpe2NvbnN0IG89b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxsPV9yLHU9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLF89X3I7cmV0dXJuIHVyLmNvbnRleHRfYWRkX2NvbnN0cmFpbnQodGhpcy5fX3diZ19wdHIsbyxzLGEsYyxmLGwsdSxfLGkpfWFkZF9maWxlKGUsdCl7Y29uc3Qgbj1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYykscj1fcjtyZXR1cm4gdXIuY29udGV4dF9hZGRfZmlsZSh0aGlzLl9fd2JnX3B0cixlLG4scil9YWRkX3NlZ21lbnQoZSx0LG4scixpLG8pe2NvbnN0IHM9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGE9X3IsYz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZj1fcixsPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSx1PV9yO3ZhciBfPW5yKHIpPzA6b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGc9X3I7Y29uc3QgaD1vcihpLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYj1fcjtyZXR1cm4gdXIuY29udGV4dF9hZGRfc2VnbWVudCh0aGlzLl9fd2JnX3B0cixzLGEsYyxmLGwsdSxfLGcsaCxiLG8pfWJ1c3RDYWNoZUFuZFJlc2V0U2NlbmUoZSx0KXtjb25zdCBuPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO3ZhciBpPW5yKHQpPzA6b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3I7cmV0dXJuIHVyLmNvbnRleHRfYnVzdENhY2hlQW5kUmVzZXRTY2VuZSh0aGlzLl9fd2JnX3B0cixuLHIsaSxvKX1jaGFpbl9zZWdtZW50KGUsdCxuLHIsaSxvLHMpe2NvbnN0IGE9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3IsZj1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbD1fcix1PW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxfPV9yLGc9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGg9X3I7dmFyIGI9bnIoaSk/MDpvcihpLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZD1fcjtjb25zdCB3PW9yKG8sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxwPV9yO3JldHVybiB1ci5jb250ZXh0X2NoYWluX3NlZ21lbnQodGhpcy5fX3diZ19wdHIsYSxjLGYsbCx1LF8sZyxoLGIsZCx3LHAscyl9Y2xlYXJfc2tldGNoX2NoZWNrcG9pbnRzKCl7cmV0dXJuIHVyLmNvbnRleHRfY2xlYXJfc2tldGNoX2NoZWNrcG9pbnRzKHRoaXMuX193YmdfcHRyKX1kZWxldGVfb2JqZWN0cyhlLHQsbixyLGksbyl7Y29uc3Qgcz1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcixjPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxmPV9yLGw9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHU9X3IsXz1vcihyLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZz1fcixoPW9yKGksdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxiPV9yO3JldHVybiB1ci5jb250ZXh0X2RlbGV0ZV9vYmplY3RzKHRoaXMuX193YmdfcHRyLHMsYSxjLGYsbCx1LF8sZyxoLGIsbyl9ZGVsZXRlX3NrZXRjaChlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcixvPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfZGVsZXRlX3NrZXRjaCh0aGlzLl9fd2JnX3B0cixyLGksbyxzLGEsYyl9ZWRpdF9jb25zdHJhaW50KGUsdCxuLHIsaSxvKXtjb25zdCBzPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yLGM9b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGY9X3IsbD1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksdT1fcixfPW9yKHIsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxnPV9yLGg9b3IoaSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGI9X3I7cmV0dXJuIHVyLmNvbnRleHRfZWRpdF9jb25zdHJhaW50KHRoaXMuX193YmdfcHRyLHMsYSxjLGYsbCx1LF8sZyxoLGIsbyl9ZWRpdF9zZWdtZW50cyhlLHQsbixyLGkpe2NvbnN0IG89b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxsPV9yLHU9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLF89X3I7cmV0dXJuIHVyLmNvbnRleHRfZWRpdF9zZWdtZW50cyh0aGlzLl9fd2JnX3B0cixvLHMsYSxjLGYsbCx1LF8saSl9ZWRpdF9za2V0Y2goZSx0LG4scixpKXtjb25zdCBvPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3IsZj1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbD1fcix1PW9yKHIsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxfPV9yLGc9b3IoaSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGg9X3I7cmV0dXJuIHVyLmNvbnRleHRfZWRpdF9za2V0Y2godGhpcy5fX3diZ19wdHIsbyxzLGEsYyxmLGwsdSxfLGcsaCl9ZXhlY3V0ZShlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcjt2YXIgbz1ucih0KT8wOm9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yO2NvbnN0IGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfZXhlY3V0ZSh0aGlzLl9fd2JnX3B0cixyLGksbyxzLGEsYyl9ZXhlY3V0ZU1vY2soZSx0LG4scil7Y29uc3QgaT1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcjt2YXIgcz1ucih0KT8wOm9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yO2NvbnN0IGM9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGY9X3I7cmV0dXJuIHVyLmNvbnRleHRfZXhlY3V0ZU1vY2sodGhpcy5fX3diZ19wdHIsaSxvLHMsYSxjLGYscil9ZXhlY3V0ZV90cmltKGUsdCxuLHIpe2NvbnN0IGk9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3Iscz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcixjPWlyKG4sdXIuX193YmluZGdlbl9tYWxsb2MpLGY9X3IsbD1vcihyLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksdT1fcjtyZXR1cm4gdXIuY29udGV4dF9leGVjdXRlX3RyaW0odGhpcy5fX3diZ19wdHIsaSxvLHMsYSxjLGYsbCx1KX1leGl0X3NrZXRjaChlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcixvPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfZXhpdF9za2V0Y2godGhpcy5fX3diZ19wdHIscixpLG8scyxhLGMpfWV4cG9ydChlLHQpe2NvbnN0IG49b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3IsaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcjtyZXR1cm4gdXIuY29udGV4dF9leHBvcnQodGhpcy5fX3diZ19wdHIsbixyLGksbyl9Z2V0X2ZpbGUoZSx0KXtyZXR1cm4gdXIuY29udGV4dF9nZXRfZmlsZSh0aGlzLl9fd2JnX3B0cixlLHQpfWdldF9wcm9qZWN0KGUpe3JldHVybiB1ci5jb250ZXh0X2dldF9wcm9qZWN0KHRoaXMuX193YmdfcHRyLGUpfWhhY2tfc2V0X3Byb2dyYW0oZSx0KXtjb25zdCBuPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yLGk9b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3I7cmV0dXJuIHVyLmNvbnRleHRfaGFja19zZXRfcHJvZ3JhbSh0aGlzLl9fd2JnX3B0cixuLHIsaSxvKX1jb25zdHJ1Y3RvcihlLHQpe2NvbnN0IG49dXIuY29udGV4dF9uZXcoZSx0KTtpZihuWzJdKXRocm93IHNyKG5bMV0pO3JldHVybiB0aGlzLl9fd2JnX3B0cj1uWzBdPj4+MCxSbi5yZWdpc3Rlcih0aGlzLHRoaXMuX193YmdfcHRyLHRoaXMpLHRoaXN9bmV3X3NrZXRjaChlLHQsbixyLGkpe2NvbnN0IG89b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxsPV9yLHU9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLF89X3IsZz1vcihpLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaD1fcjtyZXR1cm4gdXIuY29udGV4dF9uZXdfc2tldGNoKHRoaXMuX193YmdfcHRyLG8scyxhLGMsZixsLHUsXyxnLGgpfW9wZW5fcHJvamVjdChlLHQsbil7Y29uc3Qgcj1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcjtyZXR1cm4gdXIuY29udGV4dF9vcGVuX3Byb2plY3QodGhpcy5fX3diZ19wdHIsZSxyLGksbil9cmVmcmVzaChlKXtyZXR1cm4gdXIuY29udGV4dF9yZWZyZXNoKHRoaXMuX193YmdfcHRyLGUpfXJlbW92ZV9maWxlKGUsdCl7cmV0dXJuIHVyLmNvbnRleHRfcmVtb3ZlX2ZpbGUodGhpcy5fX3diZ19wdHIsZSx0KX1yZXN0b3JlX3NrZXRjaF9jaGVja3BvaW50KGUpe2NvbnN0IHQ9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG49X3I7cmV0dXJuIHVyLmNvbnRleHRfcmVzdG9yZV9za2V0Y2hfY2hlY2twb2ludCh0aGlzLl9fd2JnX3B0cix0LG4pfXNlbmRSZXNwb25zZShlKXtyZXR1cm4gdXIuY29udGV4dF9zZW5kUmVzcG9uc2UodGhpcy5fX3diZ19wdHIsZSl9c2tldGNoX2V4ZWN1dGVfbW9jayhlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcixvPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfc2tldGNoX2V4ZWN1dGVfbW9jayh0aGlzLl9fd2JnX3B0cixyLGksbyxzLGEsYyl9c3dpdGNoX2ZpbGUoZSx0KXtyZXR1cm4gdXIuY29udGV4dF9zd2l0Y2hfZmlsZSh0aGlzLl9fd2JnX3B0cixlLHQpfXRyYW5zcGlsZV9vbGRfc2tldGNoKGUsdCxuLHIpe2NvbnN0IGk9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3Iscz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcjt2YXIgYz1ucihuKT8wOm9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxmPV9yO2NvbnN0IGw9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHU9X3I7cmV0dXJuIHVyLmNvbnRleHRfdHJhbnNwaWxlX29sZF9za2V0Y2godGhpcy5fX3diZ19wdHIsaSxvLHMsYSxjLGYsbCx1KX11cGRhdGVfZmlsZShlLHQsbil7Y29uc3Qgcj1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcjtyZXR1cm4gdXIuY29udGV4dF91cGRhdGVfZmlsZSh0aGlzLl9fd2JnX3B0cixlLHQscixpKX19U3ltYm9sLmRpc3Bvc2UmJihtbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPW1uLnByb3RvdHlwZS5mcmVlKTtjbGFzcyBTbntfX2Rlc3Ryb3lfaW50b19yYXcoKXtjb25zdCBlPXRoaXMuX193YmdfcHRyO3JldHVybiB0aGlzLl9fd2JnX3B0cj0wLGpuLnVucmVnaXN0ZXIodGhpcyksZX1mcmVlKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3VyLl9fd2JnX2ludG91bmRlcmx5aW5nYnl0ZXNvdXJjZV9mcmVlKGUsMCl9Z2V0IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSgpe3JldHVybiB1ci5pbnRvdW5kZXJseWluZ2J5dGVzb3VyY2VfYXV0b0FsbG9jYXRlQ2h1bmtTaXplKHRoaXMuX193YmdfcHRyKT4+PjB9Y2FuY2VsKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3VyLmludG91bmRlcmx5aW5nYnl0ZXNvdXJjZV9jYW5jZWwoZSl9cHVsbChlKXtyZXR1cm4gdXIuaW50b3VuZGVybHlpbmdieXRlc291cmNlX3B1bGwodGhpcy5fX3diZ19wdHIsZSl9c3RhcnQoZSl7dXIuaW50b3VuZGVybHlpbmdieXRlc291cmNlX3N0YXJ0KHRoaXMuX193YmdfcHRyLGUpfWdldCB0eXBlKCl7Y29uc3QgZT11ci5pbnRvdW5kZXJseWluZ2J5dGVzb3VyY2VfdHlwZSh0aGlzLl9fd2JnX3B0cik7cmV0dXJuIEFuW2VdfX1TeW1ib2wuZGlzcG9zZSYmKFNuLnByb3RvdHlwZVtTeW1ib2wuZGlzcG9zZV09U24ucHJvdG90eXBlLmZyZWUpO2NsYXNzIEJue19fZGVzdHJveV9pbnRvX3Jhdygpe2NvbnN0IGU9dGhpcy5fX3diZ19wdHI7cmV0dXJuIHRoaXMuX193YmdfcHRyPTAsRm4udW5yZWdpc3Rlcih0aGlzKSxlfWZyZWUoKXtjb25zdCBlPXRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7dXIuX193YmdfaW50b3VuZGVybHlpbmdzaW5rX2ZyZWUoZSwwKX1hYm9ydChlKXtjb25zdCB0PXRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7cmV0dXJuIHVyLmludG91bmRlcmx5aW5nc2lua19hYm9ydCh0LGUpfWNsb3NlKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3JldHVybiB1ci5pbnRvdW5kZXJseWluZ3NpbmtfY2xvc2UoZSl9d3JpdGUoZSl7cmV0dXJuIHVyLmludG91bmRlcmx5aW5nc2lua193cml0ZSh0aGlzLl9fd2JnX3B0cixlKX19U3ltYm9sLmRpc3Bvc2UmJihCbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPUJuLnByb3RvdHlwZS5mcmVlKTtjbGFzcyB4bntfX2Rlc3Ryb3lfaW50b19yYXcoKXtjb25zdCBlPXRoaXMuX193YmdfcHRyO3JldHVybiB0aGlzLl9fd2JnX3B0cj0wLGtuLnVucmVnaXN0ZXIodGhpcyksZX1mcmVlKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3VyLl9fd2JnX2ludG91bmRlcmx5aW5nc291cmNlX2ZyZWUoZSwwKX1jYW5jZWwoKXtjb25zdCBlPXRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7dXIuaW50b3VuZGVybHlpbmdzb3VyY2VfY2FuY2VsKGUpfXB1bGwoZSl7cmV0dXJuIHVyLmludG91bmRlcmx5aW5nc291cmNlX3B1bGwodGhpcy5fX3diZ19wdHIsZSl9fVN5bWJvbC5kaXNwb3NlJiYoeG4ucHJvdG90eXBlW1N5bWJvbC5kaXNwb3NlXT14bi5wcm90b3R5cGUuZnJlZSk7Y2xhc3MgRW57X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCx6bi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ19sc3BzZXJ2ZXJjb25maWdfZnJlZShlLDApfWNvbnN0cnVjdG9yKGUsdCxuKXtjb25zdCByPXVyLmxzcHNlcnZlcmNvbmZpZ19uZXcoZSx0LG4pO3JldHVybiB0aGlzLl9fd2JnX3B0cj1yPj4+MCx6bi5yZWdpc3Rlcih0aGlzLHRoaXMuX193YmdfcHRyLHRoaXMpLHRoaXN9fVN5bWJvbC5kaXNwb3NlJiYoRW4ucHJvdG90eXBlW1N5bWJvbC5kaXNwb3NlXT1Fbi5wcm90b3R5cGUuZnJlZSk7Y2xhc3MgVW57X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxEbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ19yZXNwb25zZWNvbnRleHRfZnJlZShlLDApfWNvbnN0cnVjdG9yKCl7Y29uc3QgZT11ci5yZXNwb25zZWNvbnRleHRfbmV3KCk7cmV0dXJuIHRoaXMuX193YmdfcHRyPWU+Pj4wLERuLnJlZ2lzdGVyKHRoaXMsdGhpcy5fX3diZ19wdHIsdGhpcyksdGhpc31zZW5kX3Jlc3BvbnNlKGUpe3JldHVybiB1ci5yZXNwb25zZWNvbnRleHRfc2VuZF9yZXNwb25zZSh0aGlzLl9fd2JnX3B0cixlKX19U3ltYm9sLmRpc3Bvc2UmJihVbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPVVuLnByb3RvdHlwZS5mcmVlKTtjbGFzcyBPbntzdGF0aWMgX193cmFwKGUpe2U+Pj49MDtjb25zdCB0PU9iamVjdC5jcmVhdGUoT24ucHJvdG90eXBlKTtyZXR1cm4gdC5fX3diZ19wdHI9ZSxDbi5yZWdpc3Rlcih0LHQuX193YmdfcHRyLHQpLHR9X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxDbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ190YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fZnJlZShlLDApfWdldCBhcmNfbGVuZ3RoKCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fYXJjX2xlbmd0aCh0aGlzLl9fd2JnX3B0cil9Z2V0IGFyY19taWRfcG9pbnRfeCgpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2FyY19taWRfcG9pbnRfeCh0aGlzLl9fd2JnX3B0cil9Z2V0IGFyY19taWRfcG9pbnRfeSgpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2FyY19taWRfcG9pbnRfeSh0aGlzLl9fd2JnX3B0cil9Z2V0IGNjdygpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2Njdyh0aGlzLl9fd2JnX3B0cil9Z2V0IGNlbnRlcl94KCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fY2VudGVyX3godGhpcy5fX3diZ19wdHIpfWdldCBjZW50ZXJfeSgpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2NlbnRlcl95KHRoaXMuX193YmdfcHRyKX1nZXQgZW5kX2FuZ2xlKCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fZW5kX2FuZ2xlKHRoaXMuX193YmdfcHRyKX1nZXQgcmFkaXVzKCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fcmFkaXVzKHRoaXMuX193YmdfcHRyKX1nZXQgc3RhcnRfYW5nbGUoKXtyZXR1cm4gdXIuX193YmdfZ2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9zdGFydF9hbmdsZSh0aGlzLl9fd2JnX3B0cil9c2V0IGFyY19sZW5ndGgoZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9hcmNfbGVuZ3RoKHRoaXMuX193YmdfcHRyLGUpfXNldCBhcmNfbWlkX3BvaW50X3goZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9hcmNfbWlkX3BvaW50X3godGhpcy5fX3diZ19wdHIsZSl9c2V0IGFyY19taWRfcG9pbnRfeShlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2FyY19taWRfcG9pbnRfeSh0aGlzLl9fd2JnX3B0cixlKX1zZXQgY2N3KGUpe3VyLl9fd2JnX3NldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fY2N3KHRoaXMuX193YmdfcHRyLGUpfXNldCBjZW50ZXJfeChlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2NlbnRlcl94KHRoaXMuX193YmdfcHRyLGUpfXNldCBjZW50ZXJfeShlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2NlbnRlcl95KHRoaXMuX193YmdfcHRyLGUpfXNldCBlbmRfYW5nbGUoZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9lbmRfYW5nbGUodGhpcy5fX3diZ19wdHIsZSl9c2V0IHJhZGl1cyhlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX3JhZGl1cyh0aGlzLl9fd2JnX3B0cixlKX1zZXQgc3RhcnRfYW5nbGUoZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9zdGFydF9hbmdsZSh0aGlzLl9fd2JnX3B0cixlKX19U3ltYm9sLmRpc3Bvc2UmJihPbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPU9uLnByb3RvdHlwZS5mcmVlKTtjbGFzcyBObntzdGF0aWMgX193cmFwKGUpe2U+Pj49MDtjb25zdCB0PU9iamVjdC5jcmVhdGUoTm4ucHJvdG90eXBlKTtyZXR1cm4gdC5fX3diZ19wdHI9ZSxNbi5yZWdpc3Rlcih0LHQuX193YmdfcHRyLHQpLHR9X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxNbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ193YXNtY2lyY2xlcGFyYW1zX2ZyZWUoZSwwKX1nZXQgY2VudGVyX3goKXtyZXR1cm4gdXIuX193YmdfZ2V0X3dhc21jaXJjbGVwYXJhbXNfY2VudGVyX3godGhpcy5fX3diZ19wdHIpfWdldCBjZW50ZXJfeSgpe3JldHVybiB1ci5fX3diZ19nZXRfd2FzbWNpcmNsZXBhcmFtc19jZW50ZXJfeSh0aGlzLl9fd2JnX3B0cil9Z2V0IHJhZGl1cygpe3JldHVybiB1ci5fX3diZ19nZXRfd2FzbWNpcmNsZXBhcmFtc19yYWRpdXModGhpcy5fX3diZ19wdHIpfXNldCBjZW50ZXJfeChlKXt1ci5fX3diZ19zZXRfd2FzbWNpcmNsZXBhcmFtc19jZW50ZXJfeCh0aGlzLl9fd2JnX3B0cixlKX1zZXQgY2VudGVyX3koZSl7dXIuX193Ymdfc2V0X3dhc21jaXJjbGVwYXJhbXNfY2VudGVyX3kodGhpcy5fX3diZ19wdHIsZSl9c2V0IHJhZGl1cyhlKXt1ci5fX3diZ19zZXRfd2FzbWNpcmNsZXBhcmFtc19yYWRpdXModGhpcy5fX3diZ19wdHIsZSl9fWZ1bmN0aW9uIEluKGUpe2NvbnN0IHQ9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG49X3Iscj11ci5wYXJzZV93YXNtKHQsbik7aWYoclsyXSl0aHJvdyBzcihyWzFdKTtyZXR1cm4gc3IoclswXSl9ZnVuY3Rpb24gdm4oKXtjb25zdCBlPXtfX3Byb3RvX186bnVsbCxfX3diZ19FcnJvcl81NTUzODQ4M2RlNmUzYWJlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEVycm9yKFhuKGUsdCkpfSxfX3diZ19fX3diaW5kZ2VuX2Jvb2xlYW5fZ2V0X2ZlMmEyNGZkZmRiNDA2NGY6ZnVuY3Rpb24oZSl7Y29uc3QgdD0iYm9vbGVhbiI9PXR5cGVvZiBlP2U6dm9pZCAwO3JldHVybiBucih0KT8xNjc3NzIxNTp0PzE6MH0sX193YmdfX193YmluZGdlbl9kZWJ1Z19zdHJpbmdfZDg5NjI3MjAyZDAxNTViNzpmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IoV24odCksdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO0tuKCkuc2V0SW50MzIoZSs0LHIsITApLEtuKCkuc2V0SW50MzIoZSswLG4sITApfSxfX3diZ19fX3diaW5kZ2VuX2lzX2Z1bmN0aW9uXzJhOTU0MDY0MjNlYTg2MjY6ZnVuY3Rpb24oZSl7cmV0dXJuImZ1bmN0aW9uIj09dHlwZW9mIGV9LF9fd2JnX19fd2JpbmRnZW5faXNfbnVsbF84ZDkwNTI0YzllMGFmMTgzOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT09ZX0sX193YmdfX193YmluZGdlbl9pc19vYmplY3RfNTlhMDAyZTc2YjA1OTMxMjpmdW5jdGlvbihlKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIGUmJm51bGwhPT1lfSxfX3diZ19fX3diaW5kZ2VuX2lzX3VuZGVmaW5lZF84N2EzYTgzN2YzMzFmZWY1OmZ1bmN0aW9uKGUpe3JldHVybiB2b2lkIDA9PT1lfSxfX3diZ19fX3diaW5kZ2VuX3N0cmluZ19nZXRfZjExNjEzOTA0MTRmOWI1OTpmdW5jdGlvbihlLHQpe2NvbnN0IG49InN0cmluZyI9PXR5cGVvZiB0P3Q6dm9pZCAwO3ZhciByPW5yKG4pPzA6b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGk9X3I7S24oKS5zZXRJbnQzMihlKzQsaSwhMCksS24oKS5zZXRJbnQzMihlKzAsciwhMCl9LF9fd2JnX19fd2JpbmRnZW5fdGhyb3dfNTU0OTQ5MmRhZWRhZDEzOTpmdW5jdGlvbihlLHQpe3Rocm93IG5ldyBFcnJvcihYbihlLHQpKX0sX193YmdfX3diZ19jYl91bnJlZl9mYmU2OWJiMDc2YzE2YmFkOmZ1bmN0aW9uKGUpe2UuX3diZ19jYl91bnJlZigpfSxfX3diZ19idWZmZXJfMGE1Nzc4OGNkZmNlMjFiYTpmdW5jdGlvbihlKXtyZXR1cm4gZS5idWZmZXJ9LF9fd2JnX2J5b2JSZXF1ZXN0X2FiMGU1N2Y1NWJmNzc0ZjI6ZnVuY3Rpb24oZSl7Y29uc3QgdD1lLmJ5b2JSZXF1ZXN0O3JldHVybiBucih0KT8wOlZuKHQpfSxfX3diZ19ieXRlTGVuZ3RoXzk5MzFkYjAwZTU4NjFiZjk6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuYnl0ZUxlbmd0aH0sX193YmdfYnl0ZU9mZnNldF8wYTk4NWE5OGY4ZmZiOGQ3OmZ1bmN0aW9uKGUpe3JldHVybiBlLmJ5dGVPZmZzZXR9LF9fd2JnX2NhbGxfOGY1ZDdiYjA3MDI4MzUwODpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlLmNhbGwodCxuKX0pLGFyZ3VtZW50cyl9LF9fd2JnX2Nsb3NlXzYyZjZhNGVhZGM5NDU2NWY6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe2UuY2xvc2UoKX0pLGFyZ3VtZW50cyl9LF9fd2JnX2Nsb3NlXzg3MWU1MTZhMjczZDE1Zjg6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2xvc2UoKX0sX193YmdfY2xvc2VfZjI4NzA1ODcxNjA4OGE1MDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7ZS5jbG9zZSgpfSksYXJndW1lbnRzKX0sX193YmdfZG9uZV8xOWY5MmNiMWY4NzM4YWJhOmZ1bmN0aW9uKGUpe3JldHVybiBlLmRvbmV9LF9fd2JnX2VucXVldWVfZWUwNTkzY2VhOWJlOTNiZDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtlLmVucXVldWUodCl9KSxhcmd1bWVudHMpfSxfX3diZ19lcnJvcl9hNmZhMjAyYjU4YWExY2QzOmZ1bmN0aW9uKGUsdCl7bGV0IG4scjt0cnl7bj1lLHI9dCxjb25zb2xlLmVycm9yKFhuKGUsdCkpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKG4sciwxKX19LF9fd2JnX2Vycm9yX2RlNmI4NmU1OTg1MDUyNDY6ZnVuY3Rpb24oZSl7Y29uc29sZS5lcnJvcihlKX0sX193YmdfZXhpc3RzXzY5OGIzMDhjZGE3NzcwMjI6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuKXtsZXQgcixpO3RyeXtyPXQsaT1uO3JldHVybiBlLmV4aXN0cyhYbih0LG4pKX1maW5hbGx5e3VyLl9fd2JpbmRnZW5fZnJlZShyLGksMSl9fSksYXJndW1lbnRzKX0sX193YmdfZmlyZU1vZGVsaW5nQ29tbWFuZEZyb21XYXNtX2MzYzA1ZjQ1ZjI0YTY5NWE6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuLHIsaSxvLHMsYSxjKXtsZXQgZixsLHUsXyxnLGgsYixkO3RyeXtmPXQsbD1uLHU9cixfPWksZz1vLGg9cyxiPWEsZD1jLGUuZmlyZU1vZGVsaW5nQ29tbWFuZEZyb21XYXNtKFhuKHQsbiksWG4ocixpKSxYbihvLHMpLFhuKGEsYykpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKGYsbCwxKSx1ci5fX3diaW5kZ2VuX2ZyZWUodSxfLDEpLHVyLl9fd2JpbmRnZW5fZnJlZShnLGgsMSksdXIuX193YmluZGdlbl9mcmVlKGIsZCwxKX19KSxhcmd1bWVudHMpfSxfX3diZ19nZXRBbGxGaWxlc19iYWRhMTdkOTk5ZjA3OGNkOmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQsbil7bGV0IHIsaTt0cnl7cj10LGk9bjtyZXR1cm4gZS5nZXRBbGxGaWxlcyhYbih0LG4pKX1maW5hbGx5e3VyLl9fd2JpbmRnZW5fZnJlZShyLGksMSl9fSksYXJndW1lbnRzKX0sX193YmdfZ2V0Q2xpZW50U3RhdGVfMDU3MDVjOTAwYjJhNzM2MDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0Q2xpZW50U3RhdGUoKX0pLGFyZ3VtZW50cyl9LF9fd2JnX2dldE9zSW5mb183YmM1ZjY5OTBmZDI5MzExOmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IodC5nZXRPc0luZm8oKSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3I7S24oKS5zZXRJbnQzMihlKzQsciwhMCksS24oKS5zZXRJbnQzMihlKzAsbiwhMCl9KSxhcmd1bWVudHMpfSxfX3diZ19nZXRSYW5kb21WYWx1ZXNfM2Y0NGI3MDAzOTUwNjJlNTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMocW4oZSx0KSl9KSxhcmd1bWVudHMpfSxfX3diZ19nZXRSYW5kb21WYWx1ZXNfZDQ5MzI5ZmY4OWEwN2FmMTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMocW4oZSx0KSl9KSxhcmd1bWVudHMpfSxfX3diZ19nZXRUaW1lX2MzYWYzNTU5NGUyODMzNTY6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0VGltZSgpfSxfX3diZ19nZXRXZWJydGNTdGF0c18yMWM1Mzk0YWZmYzA3ODM3OmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRXZWJydGNTdGF0cygpfSksYXJndW1lbnRzKX0sX193YmdfZ2V0V3JpdGVyXzdjOTUzMTQ5YWYyNzNjMjk6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe3JldHVybiBlLmdldFdyaXRlcigpfSksYXJndW1lbnRzKX0sX193YmdfZ2V0X2ZmNWYxZmIyMjAyMzM0Nzc6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIFJlZmxlY3QuZ2V0KGUsdCl9KSxhcmd1bWVudHMpfSxfX3diZ19pbnN0YW5jZW9mX1VpbnQ4QXJyYXlfY2UyNGQ1OGE1ZjRiZGNjMzpmdW5jdGlvbihlKXtsZXQgdDt0cnl7dD1lIGluc3RhbmNlb2YgVWludDhBcnJheX1jYXRjaChlKXt0PSExfXJldHVybiB0fSxfX3diZ19pbnN0YW5jZW9mX1dpbmRvd18yZmE4ZDljMmQ1YjYxMDRhOmZ1bmN0aW9uKGUpe2xldCB0O3RyeXt0PWUgaW5zdGFuY2VvZiBXaW5kb3d9Y2F0Y2goZSl7dD0hMX1yZXR1cm4gdH0sX193YmdfaW5zdGFuY2VvZl9Xb3JrZXJHbG9iYWxTY29wZV9hNDMwN2M4NWY3M2Q4M2MzOmZ1bmN0aW9uKGUpe2xldCB0O3RyeXt0PWUgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZX1jYXRjaChlKXt0PSExfXJldHVybiB0fSxfX3diZ19pc0Rlc2t0b3BfZmY0YjY1N2Q5MmIzZjNiNDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuaXNEZXNrdG9wKCl9KSxhcmd1bWVudHMpfSxfX3diZ19rY2xDb2RlX2EzOTlmYTEwMmI4MGVkM2E6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1vcih0LmtjbENvZGUoKSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3I7S24oKS5zZXRJbnQzMihlKzQsciwhMCksS24oKS5zZXRJbnQzMihlKzAsbiwhMCl9KSxhcmd1bWVudHMpfSxfX3diZ19sZW5ndGhfZTZlMTYzM2ZiZWE2Y2ZhOTpmdW5jdGlvbihlKXtyZXR1cm4gZS5sZW5ndGh9LF9fd2JnX2xvZ182YTc1YjcxZDYzMTZlOTM1OmZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKGUpfSxfX3diZ19uZXdfMF9lNjQ5Yzk5ZTczODIzMTNmOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlfSxfX3diZ19uZXdfMWQ5NjY3OGFhYWNjYTMyZTpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LF9fd2JnX25ld18yMjdkN2MwNTQxNGViODYxOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBFcnJvcn0sX193YmdfbmV3XzRhODQzZmUyZWU0MDgyYTk6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IEVycm9yKFhuKGUsdCkpfSxfX3diZ19uZXdfZnJvbV9zbGljZV8wYmM1OGUzNmY4MmExYjUwOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBVaW50OEFycmF5KHFuKGUsdCkpfSxfX3diZ19uZXdfdHlwZWRfMjVkZGEyMzg4ZDdlNWU5ZjpmdW5jdGlvbihlLHQpe3RyeXt2YXIgbj17YTplLGI6dH07Y29uc3Qgcj1uZXcgUHJvbWlzZSgoKGUsdCk9Pntjb25zdCByPW4uYTtuLmE9MDt0cnl7cmV0dXJuIGZ1bmN0aW9uKGUsdCxuLHIpe3VyLndhc21fYmluZGdlbl9fY29udmVydF9fY2xvc3VyZXNfX19fX2ludm9rZV9faDliY2QxN2YwOWRjODM2OTEoZSx0LG4scil9KHIsbi5iLGUsdCl9ZmluYWxseXtuLmE9cn19KSk7cmV0dXJuIHJ9ZmluYWxseXtuLmE9MH19LF9fd2JnX25ld193aXRoX2J5dGVfb2Zmc2V0X2FuZF9sZW5ndGhfYWIxZTEwMDJkN2E2OTRlNDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUsdD4+PjAsbj4+PjApfSxfX3diZ19uZXh0XzFiN2I1YzAwNzk2NjU2MGY6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe3JldHVybiBlLm5leHQoKX0pLGFyZ3VtZW50cyl9LF9fd2JnX25vd19hOWFmNDU1NGVkYjdhYzc4OmZ1bmN0aW9uKGUpe3JldHVybiBlLm5vdygpfSxfX3diZ19ub3dfZTdjNjc5NWE3ZjgxZTEwZjpmdW5jdGlvbihlKXtyZXR1cm4gZS5ub3coKX0sX193YmdfcGFyc2VfZTU3MDNmZDUyMjExZTY4ODpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtyZXR1cm4gSlNPTi5wYXJzZShYbihlLHQpKX0pLGFyZ3VtZW50cyl9LF9fd2JnX3BlcmZvcm1hbmNlXzNmY2Y2ZTMyYTdlMWVkMGE6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucGVyZm9ybWFuY2V9LF9fd2JnX3Byb3RvdHlwZXNldGNhbGxfMzg3NWQ1NGQxMmVmMmVlYzpmdW5jdGlvbihlLHQsbil7VWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwocW4oZSx0KSxuKX0sX193YmdfcXVldWVNaWNyb3Rhc2tfODg2ODM2NTExNGZlMjNiNTpmdW5jdGlvbihlKXtxdWV1ZU1pY3JvdGFzayhlKX0sX193YmdfcXVldWVNaWNyb3Rhc2tfY2ZjNWEwZTYyZjllYmRiZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5xdWV1ZU1pY3JvdGFza30sX193YmdfcmVhZEZpbGVfOTFlMzlhNzEyNDVmOTkwMjpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0LG4pe2xldCByLGk7dHJ5e3I9dCxpPW47cmV0dXJuIGUucmVhZEZpbGUoWG4odCxuKSl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUocixpLDEpfX0pLGFyZ3VtZW50cyl9LF9fd2JnX3JlYWR5XzU4NTZkYjZmMDBlM2UyMGE6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVhZHl9LF9fd2JnX3JlbGVhc2VMb2NrXzk1YmJjN2NmN2I4Nzk3N2Q6ZnVuY3Rpb24oZSl7ZS5yZWxlYXNlTG9jaygpfSxfX3diZ19yZXNvbHZlX2Q4MDU5YmMxMTNlMjE1YmY6ZnVuY3Rpb24oZSl7cmV0dXJuIFByb21pc2UucmVzb2x2ZShlKX0sX193YmdfcmVzcG9uZF8xZWMyOTM5NWVkYmU3ZmNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQpe2UucmVzcG9uZCh0Pj4+MCl9KSxhcmd1bWVudHMpfSxfX3diZ19zZW5kTW9kZWxpbmdDb21tYW5kRnJvbVdhc21fODhlNTIyNjhiOTg1ZTRjOTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0LG4scixpLG8scyxhLGMpe2xldCBmLGwsdSxfLGcsaCxiLGQ7dHJ5e2Y9dCxsPW4sdT1yLF89aSxnPW8saD1zLGI9YSxkPWM7cmV0dXJuIGUuc2VuZE1vZGVsaW5nQ29tbWFuZEZyb21XYXNtKFhuKHQsbiksWG4ocixpKSxYbihvLHMpLFhuKGEsYykpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKGYsbCwxKSx1ci5fX3diaW5kZ2VuX2ZyZWUodSxfLDEpLHVyLl9fd2JpbmRnZW5fZnJlZShnLGgsMSksdXIuX193YmluZGdlbl9mcmVlKGIsZCwxKX19KSxhcmd1bWVudHMpfSxfX3diZ19zZXRUaW1lb3V0XzQ2NmQ1MGYzNTEyMjQ1Y2I6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5zZXRUaW1lb3V0KHQsbil9KSxhcmd1bWVudHMpfSxfX3diZ19zZXRUaW1lb3V0X2MxYzlhMThiNjM0M2ViZDM6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5zZXRUaW1lb3V0KHQsbil9KSxhcmd1bWVudHMpfSxfX3diZ19zZXRfMjk1YmFkM2I1ZWFkNGU5OTpmdW5jdGlvbihlLHQsbil7ZS5zZXQocW4odCxuKSl9LF9fd2JnX3N0YWNrXzNiMGQ5NzRiYmYzMWU0NGY6ZnVuY3Rpb24oZSx0KXtjb25zdCBuPW9yKHQuc3RhY2ssdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO0tuKCkuc2V0SW50MzIoZSs0LHIsITApLEtuKCkuc2V0SW50MzIoZSswLG4sITApfSxfX3diZ19zdGFydE5ld1Nlc3Npb25fOGUyNWZmNDZlNzJhNzQ4ZDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3RhcnROZXdTZXNzaW9uKCl9KSxhcmd1bWVudHMpfSxfX3diZ19zdGF0aWNfYWNjZXNzb3JfR0xPQkFMXzhkZmI3ZjVlMjZlYmU1MjM6ZnVuY3Rpb24oKXtjb25zdCBlPSJ1bmRlZmluZWQiPT10eXBlb2YgZ2xvYmFsP251bGw6Z2xvYmFsO3JldHVybiBucihlKT8wOlZuKGUpfSxfX3diZ19zdGF0aWNfYWNjZXNzb3JfR0xPQkFMX1RISVNfOTQxMTU0ZWZjODM5NWNkZDpmdW5jdGlvbigpe2NvbnN0IGU9InVuZGVmaW5lZCI9PXR5cGVvZiBnbG9iYWxUaGlzP251bGw6Z2xvYmFsVGhpcztyZXR1cm4gbnIoZSk/MDpWbihlKX0sX193Ymdfc3RhdGljX2FjY2Vzc29yX1NFTEZfNThkYWM5YWY4MjJmNTYxZjpmdW5jdGlvbigpe2NvbnN0IGU9InVuZGVmaW5lZCI9PXR5cGVvZiBzZWxmP251bGw6c2VsZjtyZXR1cm4gbnIoZSk/MDpWbihlKX0sX193Ymdfc3RhdGljX2FjY2Vzc29yX1dJTkRPV19lZTY0ZjBiM2Q4MzU0YzBiOmZ1bmN0aW9uKCl7Y29uc3QgZT0idW5kZWZpbmVkIj09dHlwZW9mIHdpbmRvdz9udWxsOndpbmRvdztyZXR1cm4gbnIoZSk/MDpWbihlKX0sX193Ymdfc3RyaW5naWZ5X2I2N2UyYzhjNjBiOTNmNjk6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe3JldHVybiBKU09OLnN0cmluZ2lmeShlKX0pLGFyZ3VtZW50cyl9LF9fd2JnX3RoZW5fMDE1MDM1MmU0YWQyMDM0NDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIGUudGhlbih0LG4pfSxfX3diZ190aGVuXzUxNjA0ODZjNjdkZGI5OGE6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS50aGVuKHQpfSxfX3diZ190b1N0cmluZ181NTNiNWY2ZTk1ZTNlNDFiOmZ1bmN0aW9uKGUpe3JldHVybiBlLnRvU3RyaW5nKCl9LF9fd2JnX3RvU3RyaW5nXzllNzM1M2E3N2NiNDE1YTI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG9TdHJpbmcoKX0sX193YmdfdmFsdWVfZDViMjQ4Y2U4NDE5YmQxYjpmdW5jdGlvbihlKXtyZXR1cm4gZS52YWx1ZX0sX193YmdfdmVyc2lvbl9iNzdhNTQ0NzkxNGVkMTU0OmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IodC52ZXJzaW9uKCksdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO0tuKCkuc2V0SW50MzIoZSs0LHIsITApLEtuKCkuc2V0SW50MzIoZSswLG4sITApfSksYXJndW1lbnRzKX0sX193Ymdfdmlld18zOGE5MzA4NDRjOTY0MTAzOmZ1bmN0aW9uKGUpe2NvbnN0IHQ9ZS52aWV3O3JldHVybiBucih0KT8wOlZuKHQpfSxfX3diZ193YXJuXzg2ZWYwM2RiOGNmYjRkZDQ6ZnVuY3Rpb24oZSl7Y29uc29sZS53YXJuKGUpfSxfX3diZ193cml0ZV9mZjNhM2RlNDkwMmFhOGJmOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUud3JpdGUodCl9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDAxOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJyKGUsdCwkbil9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDAyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJyKGUsdCxMbil9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDAzOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJyKGUsdCxUbil9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDA0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIFhuKGUsdCl9LF9fd2JpbmRnZW5faW5pdF9leHRlcm5yZWZfdGFibGU6ZnVuY3Rpb24oKXtjb25zdCBlPXVyLl9fd2JpbmRnZW5fZXh0ZXJucmVmcyx0PWUuZ3Jvdyg0KTtlLnNldCgwLHZvaWQgMCksZS5zZXQodCswLHZvaWQgMCksZS5zZXQodCsxLG51bGwpLGUuc2V0KHQrMiwhMCksZS5zZXQodCszLCExKX19O3JldHVybntfX3Byb3RvX186bnVsbCwiLi9rY2xfd2FzbV9saWJfYmcuanMiOmV9fWZ1bmN0aW9uIFRuKGUsdCl7dXIud2FzbV9iaW5kZ2VuX19jb252ZXJ0X19jbG9zdXJlc19fX19faW52b2tlX19oYzg1ZGIwODA5Y2QzZDcwNShlLHQpfWZ1bmN0aW9uICRuKGUsdCxuKXtjb25zdCByPXVyLndhc21fYmluZGdlbl9fY29udmVydF9fY2xvc3VyZXNfX19fX2ludm9rZV9faGQ0MWZjZTIyN2JlYjkxOWQoZSx0LG4pO2lmKHJbMV0pdGhyb3cgc3IoclswXSl9ZnVuY3Rpb24gTG4oZSx0LG4pe2NvbnN0IHI9dXIud2FzbV9iaW5kZ2VuX19jb252ZXJ0X19jbG9zdXJlc19fX19faW52b2tlX19oMTkxYjZmNDA0MmY4NGM4MihlLHQsbik7aWYoclsxXSl0aHJvdyBzcihyWzBdKX1TeW1ib2wuZGlzcG9zZSYmKE5uLnByb3RvdHlwZVtTeW1ib2wuZGlzcG9zZV09Tm4ucHJvdG90eXBlLmZyZWUpO2NvbnN0IEFuPVsiYnl0ZXMiXSxSbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfY29udGV4dF9mcmVlKGU+Pj4wLDEpKSksam49InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JnX2ludG91bmRlcmx5aW5nYnl0ZXNvdXJjZV9mcmVlKGU+Pj4wLDEpKSksRm49InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JnX2ludG91bmRlcmx5aW5nc2lua19mcmVlKGU+Pj4wLDEpKSksa249InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JnX2ludG91bmRlcmx5aW5nc291cmNlX2ZyZWUoZT4+PjAsMSkpKSx6bj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfbHNwc2VydmVyY29uZmlnX2ZyZWUoZT4+PjAsMSkpKSxEbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfcmVzcG9uc2Vjb250ZXh0X2ZyZWUoZT4+PjAsMSkpKSxDbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2ZyZWUoZT4+PjAsMSkpKSxNbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193Ymdfd2FzbWNpcmNsZXBhcmFtc19mcmVlKGU+Pj4wLDEpKSk7ZnVuY3Rpb24gVm4oZSl7Y29uc3QgdD11ci5fX2V4dGVybnJlZl90YWJsZV9hbGxvYygpO3JldHVybiB1ci5fX3diaW5kZ2VuX2V4dGVybnJlZnMuc2V0KHQsZSksdH1mdW5jdGlvbiBQbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgaW5zdGFuY2Ugb2YgJHt0Lm5hbWV9YCl9Y29uc3QgSm49InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JpbmRnZW5fZGVzdHJveV9jbG9zdXJlKGUuYSxlLmIpKSk7ZnVuY3Rpb24gV24oZSl7Y29uc3QgdD10eXBlb2YgZTtpZigibnVtYmVyIj09dHx8ImJvb2xlYW4iPT10fHxudWxsPT1lKXJldHVybmAke2V9YDtpZigic3RyaW5nIj09dClyZXR1cm5gIiR7ZX0iYDtpZigic3ltYm9sIj09dCl7Y29uc3QgdD1lLmRlc2NyaXB0aW9uO3JldHVybiBudWxsPT10PyJTeW1ib2wiOmBTeW1ib2woJHt0fSlgfWlmKCJmdW5jdGlvbiI9PXQpe2NvbnN0IHQ9ZS5uYW1lO3JldHVybiJzdHJpbmciPT10eXBlb2YgdCYmdC5sZW5ndGg+MD9gRnVuY3Rpb24oJHt0fSlgOiJGdW5jdGlvbiJ9aWYoQXJyYXkuaXNBcnJheShlKSl7Y29uc3QgdD1lLmxlbmd0aDtsZXQgbj0iWyI7dD4wJiYobis9V24oZVswXSkpO2ZvcihsZXQgcj0xO3I8dDtyKyspbis9IiwgIitXbihlW3JdKTtyZXR1cm4gbis9Il0iLG59Y29uc3Qgbj0vXFtvYmplY3QgKFteXF1dKylcXS8uZXhlYyh0b1N0cmluZy5jYWxsKGUpKTtsZXQgcjtpZighKG4mJm4ubGVuZ3RoPjEpKXJldHVybiB0b1N0cmluZy5jYWxsKGUpO2lmKHI9blsxXSwiT2JqZWN0Ij09cil0cnl7cmV0dXJuIk9iamVjdCgiK0pTT04uc3RyaW5naWZ5KGUpKyIpIn1jYXRjaChlKXtyZXR1cm4iT2JqZWN0In1yZXR1cm4gZSBpbnN0YW5jZW9mIEVycm9yP2Ake2UubmFtZX06ICR7ZS5tZXNzYWdlfVxuJHtlLnN0YWNrfWA6cn1mdW5jdGlvbiBZbihlLHQpe2U+Pj49MDtjb25zdCBuPUtuKCkscj1bXTtmb3IobGV0IGk9ZTtpPGUrNCp0O2krPTQpci5wdXNoKHVyLl9fd2JpbmRnZW5fZXh0ZXJucmVmcy5nZXQobi5nZXRVaW50MzIoaSwhMCkpKTtyZXR1cm4gdXIuX19leHRlcm5yZWZfZHJvcF9zbGljZShlLHQpLHJ9ZnVuY3Rpb24gcW4oZSx0KXtyZXR1cm4gZT4+Pj0wLGVyKCkuc3ViYXJyYXkoZS8xLGUvMSt0KX1sZXQgSG49bnVsbDtmdW5jdGlvbiBLbigpe3JldHVybihudWxsPT09SG58fCEwPT09SG4uYnVmZmVyLmRldGFjaGVkfHx2b2lkIDA9PT1Ibi5idWZmZXIuZGV0YWNoZWQmJkhuLmJ1ZmZlciE9PXVyLm1lbW9yeS5idWZmZXIpJiYoSG49bmV3IERhdGFWaWV3KHVyLm1lbW9yeS5idWZmZXIpKSxIbn1sZXQgWm49bnVsbDtmdW5jdGlvbiBHbigpe3JldHVybiBudWxsIT09Wm4mJjAhPT1abi5ieXRlTGVuZ3RofHwoWm49bmV3IEZsb2F0NjRBcnJheSh1ci5tZW1vcnkuYnVmZmVyKSksWm59ZnVuY3Rpb24gWG4oZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSx0KXtmcis9dCxmcj49Y3ImJihhcj1uZXcgVGV4dERlY29kZXIoInV0Zi04Iix7aWdub3JlQk9NOiEwLGZhdGFsOiEwfSksYXIuZGVjb2RlKCksZnI9dCk7cmV0dXJuIGFyLmRlY29kZShlcigpLnN1YmFycmF5KGUsZSt0KSl9KGU+Pj49MCx0KX1sZXQgUW49bnVsbDtmdW5jdGlvbiBlcigpe3JldHVybiBudWxsIT09UW4mJjAhPT1Rbi5ieXRlTGVuZ3RofHwoUW49bmV3IFVpbnQ4QXJyYXkodXIubWVtb3J5LmJ1ZmZlcikpLFFufWZ1bmN0aW9uIHRyKGUsdCl7dHJ5e3JldHVybiBlLmFwcGx5KHRoaXMsdCl9Y2F0Y2goZSl7Y29uc3QgdD1WbihlKTt1ci5fX3diaW5kZ2VuX2V4bl9zdG9yZSh0KX19ZnVuY3Rpb24gbnIoZSl7cmV0dXJuIG51bGw9PWV9ZnVuY3Rpb24gcnIoZSx0LG4pe2NvbnN0IHI9e2E6ZSxiOnQsY250OjF9LGk9KC4uLmUpPT57ci5jbnQrKztjb25zdCB0PXIuYTtyLmE9MDt0cnl7cmV0dXJuIG4odCxyLmIsLi4uZSl9ZmluYWxseXtyLmE9dCxpLl93YmdfY2JfdW5yZWYoKX19O3JldHVybiBpLl93YmdfY2JfdW5yZWY9KCk9PnswPT0tLXIuY250JiYodXIuX193YmluZGdlbl9kZXN0cm95X2Nsb3N1cmUoci5hLHIuYiksci5hPTAsSm4udW5yZWdpc3RlcihyKSl9LEpuLnJlZ2lzdGVyKGkscixyKSxpfWZ1bmN0aW9uIGlyKGUsdCl7Y29uc3Qgbj10KDgqZS5sZW5ndGgsOCk+Pj4wO3JldHVybiBHbigpLnNldChlLG4vOCksX3I9ZS5sZW5ndGgsbn1mdW5jdGlvbiBvcihlLHQsbil7aWYodm9pZCAwPT09bil7Y29uc3Qgbj1sci5lbmNvZGUoZSkscj10KG4ubGVuZ3RoLDEpPj4+MDtyZXR1cm4gZXIoKS5zdWJhcnJheShyLHIrbi5sZW5ndGgpLnNldChuKSxfcj1uLmxlbmd0aCxyfWxldCByPWUubGVuZ3RoLGk9dChyLDEpPj4+MDtjb25zdCBvPWVyKCk7bGV0IHM9MDtmb3IoO3M8cjtzKyspe2NvbnN0IHQ9ZS5jaGFyQ29kZUF0KHMpO2lmKHQ+MTI3KWJyZWFrO29baStzXT10fWlmKHMhPT1yKXswIT09cyYmKGU9ZS5zbGljZShzKSksaT1uKGkscixyPXMrMyplLmxlbmd0aCwxKT4+PjA7Y29uc3QgdD1lcigpLnN1YmFycmF5KGkrcyxpK3IpO3MrPWxyLmVuY29kZUludG8oZSx0KS53cml0dGVuLGk9bihpLHIscywxKT4+PjB9cmV0dXJuIF9yPXMsaX1mdW5jdGlvbiBzcihlKXtjb25zdCB0PXVyLl9fd2JpbmRnZW5fZXh0ZXJucmVmcy5nZXQoZSk7cmV0dXJuIHVyLl9fZXh0ZXJucmVmX3RhYmxlX2RlYWxsb2MoZSksdH1sZXQgYXI9bmV3IFRleHREZWNvZGVyKCJ1dGYtOCIse2lnbm9yZUJPTTohMCxmYXRhbDohMH0pO2FyLmRlY29kZSgpO2NvbnN0IGNyPTIxNDY0MzUwNzI7bGV0IGZyPTA7Y29uc3QgbHI9bmV3IFRleHRFbmNvZGVyOyJlbmNvZGVJbnRvImluIGxyfHwobHIuZW5jb2RlSW50bz1mdW5jdGlvbihlLHQpe2NvbnN0IG49bHIuZW5jb2RlKGUpO3JldHVybiB0LnNldChuKSx7cmVhZDplLmxlbmd0aCx3cml0dGVuOm4ubGVuZ3RofX0pO2xldCB1cixfcj0wO2Z1bmN0aW9uIGdyKGUsdCl7cmV0dXJuIHVyPWUuZXhwb3J0cyxIbj1udWxsLFpuPW51bGwsUW49bnVsbCx1ci5fX3diaW5kZ2VuX3N0YXJ0KCksdXJ9YXN5bmMgZnVuY3Rpb24gaHIoZSl7aWYodm9pZCAwIT09dXIpcmV0dXJuIHVyO3ZvaWQgMCE9PWUmJihPYmplY3QuZ2V0UHJvdG90eXBlT2YoZSk9PT1PYmplY3QucHJvdG90eXBlPyh7bW9kdWxlX29yX3BhdGg6ZX09ZSk6Y29uc29sZS53YXJuKCJ1c2luZyBkZXByZWNhdGVkIHBhcmFtZXRlcnMgZm9yIHRoZSBpbml0aWFsaXphdGlvbiBmdW5jdGlvbjsgcGFzcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCIpKSx2b2lkIDA9PT1lJiYoZT1uZXcgVVJMKCJrY2xfd2FzbV9saWJfYmcud2FzbSIsZG9jdW1lbnQuY3VycmVudFNjcmlwdCYmIlNDUklQVCI9PT1kb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSYmZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmN8fG5ldyBVUkwoIndvcmtlci13ZWJydGMuanMiLGRvY3VtZW50LmJhc2VVUkkpLmhyZWYpKTtjb25zdCB0PXZuKCk7KCJzdHJpbmciPT10eXBlb2YgZXx8ImZ1bmN0aW9uIj09dHlwZW9mIFJlcXVlc3QmJmUgaW5zdGFuY2VvZiBSZXF1ZXN0fHwiZnVuY3Rpb24iPT10eXBlb2YgVVJMJiZlIGluc3RhbmNlb2YgVVJMKSYmKGU9ZmV0Y2goZSkpO2NvbnN0e2luc3RhbmNlOm4sbW9kdWxlOnJ9PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUsdCl7aWYoImZ1bmN0aW9uIj09dHlwZW9mIFJlc3BvbnNlJiZlIGluc3RhbmNlb2YgUmVzcG9uc2Upe2lmKCJmdW5jdGlvbiI9PXR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyl0cnl7cmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKGUsdCl9Y2F0Y2godCl7aWYoIWUub2t8fCFmdW5jdGlvbihlKXtzd2l0Y2goZSl7Y2FzZSJiYXNpYyI6Y2FzZSJjb3JzIjpjYXNlImRlZmF1bHQiOnJldHVybiEwfXJldHVybiExfShlLnR5cGUpfHwiYXBwbGljYXRpb24vd2FzbSI9PT1lLmhlYWRlcnMuZ2V0KCJDb250ZW50LVR5cGUiKSl0aHJvdyB0O2NvbnNvbGUud2FybigiYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nYCBmYWlsZWQgYmVjYXVzZSB5b3VyIHNlcnZlciBkb2VzIG5vdCBzZXJ2ZSBXYXNtIHdpdGggYGFwcGxpY2F0aW9uL3dhc21gIE1JTUUgdHlwZS4gRmFsbGluZyBiYWNrIHRvIGBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZWAgd2hpY2ggaXMgc2xvd2VyLiBPcmlnaW5hbCBlcnJvcjpcbiIsdCl9Y29uc3Qgbj1hd2FpdCBlLmFycmF5QnVmZmVyKCk7cmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG4sdCl9e2NvbnN0IG49YXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZSx0KTtyZXR1cm4gbiBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lkluc3RhbmNlP3tpbnN0YW5jZTpuLG1vZHVsZTplfTpufX0oYXdhaXQgZSx0KTtyZXR1cm4gZ3Iobil9dmFyIGJyPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLENvbnRleHQ6bW4sSW50b1VuZGVybHlpbmdCeXRlU291cmNlOlNuLEludG9VbmRlcmx5aW5nU2luazpCbixJbnRvVW5kZXJseWluZ1NvdXJjZTp4bixMc3BTZXJ2ZXJDb25maWc6RW4sUmVzcG9uc2VDb250ZXh0OlVuLFRhbmdlbnRpYWxBcmNJbmZvT3V0cHV0V2FzbTpPbixXYXNtQ2lyY2xlUGFyYW1zOk5uLGJhc2U2NF9kZWNvZGU6ZnVuY3Rpb24oZSl7Y29uc3QgdD1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbj1fcixyPXVyLmJhc2U2NF9kZWNvZGUodCxuKTtpZihyWzNdKXRocm93IHNyKHJbMl0pO3ZhciBpPXFuKHJbMF0sclsxXSkuc2xpY2UoKTtyZXR1cm4gdXIuX193YmluZGdlbl9mcmVlKHJbMF0sMSpyWzFdLDEpLGl9LGNhbGN1bGF0ZV9jaXJjbGVfZnJvbV8zX3BvaW50czpmdW5jdGlvbihlLHQsbixyLGksbyl7Y29uc3Qgcz11ci5jYWxjdWxhdGVfY2lyY2xlX2Zyb21fM19wb2ludHMoZSx0LG4scixpLG8pO3JldHVybiBObi5fX3dyYXAocyl9LGNoYW5nZV9kZWZhdWx0X3VuaXRzOmZ1bmN0aW9uKGUsdCl7bGV0IG4scjt0cnl7Y29uc3Qgcz1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcixjPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxmPV9yLGw9dXIuY2hhbmdlX2RlZmF1bHRfdW5pdHMocyxhLGMsZik7dmFyIGk9bFswXSxvPWxbMV07aWYobFszXSl0aHJvdyBpPTAsbz0wLHNyKGxbMl0pO3JldHVybiBuPWkscj1vLFhuKGksbyl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUobixyLDEpfX0sY2hhbmdlX2V4cGVyaW1lbnRhbF9mZWF0dXJlczpmdW5jdGlvbihlLHQpe2xldCBuLHI7dHJ5e2NvbnN0IHM9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGE9X3IsYz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZj1fcixsPXVyLmNoYW5nZV9leHBlcmltZW50YWxfZmVhdHVyZXMocyxhLGMsZik7dmFyIGk9bFswXSxvPWxbMV07aWYobFszXSl0aHJvdyBpPTAsbz0wLHNyKGxbMl0pO3JldHVybiBuPWkscj1vLFhuKGksbyl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUobixyLDEpfX0sY29yZWR1bXA6ZnVuY3Rpb24oZSl7cmV0dXJuIHVyLmNvcmVkdW1wKGUpfSxkZWZhdWx0X2FwcF9zZXR0aW5nczpmdW5jdGlvbigpe2NvbnN0IGU9dXIuZGVmYXVsdF9hcHBfc2V0dGluZ3MoKTtpZihlWzJdKXRocm93IHNyKGVbMV0pO3JldHVybiBzcihlWzBdKX0sZGVmYXVsdF9wcm9qZWN0X3NldHRpbmdzOmZ1bmN0aW9uKCl7Y29uc3QgZT11ci5kZWZhdWx0X3Byb2plY3Rfc2V0dGluZ3MoKTtpZihlWzJdKXRocm93IHNyKGVbMV0pO3JldHVybiBzcihlWzBdKX0sZm9ybWF0X251bWJlcl9saXRlcmFsOmZ1bmN0aW9uKGUsdCxuKXtsZXQgcixpO3RyeXtjb25zdCBhPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxjPV9yLGY9dXIuZm9ybWF0X251bWJlcl9saXRlcmFsKGUsYSxjLG5yKG4pPzQyOTQ5NjcyOTc6bj4+PjApO3ZhciBvPWZbMF0scz1mWzFdO2lmKGZbM10pdGhyb3cgbz0wLHM9MCxzcihmWzJdKTtyZXR1cm4gcj1vLGk9cyxYbihvLHMpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKHIsaSwxKX19LGZvcm1hdF9udW1iZXJfdmFsdWU6ZnVuY3Rpb24oZSx0KXtsZXQgbixyO3RyeXtjb25zdCBzPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yLGM9dXIuZm9ybWF0X251bWJlcl92YWx1ZShlLHMsYSk7dmFyIGk9Y1swXSxvPWNbMV07aWYoY1szXSl0aHJvdyBpPTAsbz0wLHNyKGNbMl0pO3JldHVybiBuPWkscj1vLFhuKGksbyl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUobixyLDEpfX0sZ2V0X2tjbF92ZXJzaW9uOmZ1bmN0aW9uKCl7bGV0IGUsdDt0cnl7Y29uc3Qgbj11ci5nZXRfa2NsX3ZlcnNpb24oKTtyZXR1cm4gZT1uWzBdLHQ9blsxXSxYbihuWzBdLG5bMV0pfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKGUsdCwxKX19LGdldF90YW5nZW50aWFsX2FyY190b19pbmZvOmZ1bmN0aW9uKGUsdCxuLHIsaSxvLHMpe2NvbnN0IGE9dXIuZ2V0X3RhbmdlbnRpYWxfYXJjX3RvX2luZm8oZSx0LG4scixpLG8scyk7cmV0dXJuIE9uLl9fd3JhcChhKX0saHVtYW5fZGlzcGxheV9udW1iZXI6ZnVuY3Rpb24oZSx0KXtsZXQgbixyO3RyeXtjb25zdCBzPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yLGM9dXIuaHVtYW5fZGlzcGxheV9udW1iZXIoZSxzLGEpO3ZhciBpPWNbMF0sbz1jWzFdO2lmKGNbM10pdGhyb3cgaT0wLG89MCxzcihjWzJdKTtyZXR1cm4gbj1pLHI9byxYbihpLG8pfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKG4sciwxKX19LGltcG9ydF9maWxlX2V4dGVuc2lvbnM6ZnVuY3Rpb24oKXtjb25zdCBlPXVyLmltcG9ydF9maWxlX2V4dGVuc2lvbnMoKTtpZihlWzNdKXRocm93IHNyKGVbMl0pO3ZhciB0PVluKGVbMF0sZVsxXSkuc2xpY2UoKTtyZXR1cm4gdXIuX193YmluZGdlbl9mcmVlKGVbMF0sNCplWzFdLDQpLHR9LGlzX2tjbF9lbXB0eV9vcl9vbmx5X3NldHRpbmdzOmZ1bmN0aW9uKGUpe2NvbnN0IHQ9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG49X3Iscj11ci5pc19rY2xfZW1wdHlfb3Jfb25seV9zZXR0aW5ncyh0LG4pO2lmKHJbMl0pdGhyb3cgc3IoclsxXSk7cmV0dXJuIHNyKHJbMF0pfSxpc19wb2ludHNfY2N3OmZ1bmN0aW9uKGUpe2NvbnN0IHQ9aXIoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyksbj1fcjtyZXR1cm4gdXIuaXNfcG9pbnRzX2Njdyh0LG4pfSxrY2xfbGludDpmdW5jdGlvbihlKXtjb25zdCB0PW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxuPV9yO3JldHVybiB1ci5rY2xfbGludCh0LG4pfSxrY2xfc2V0dGluZ3M6ZnVuY3Rpb24oZSl7Y29uc3QgdD1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbj1fcixyPXVyLmtjbF9zZXR0aW5ncyh0LG4pO2lmKHJbMl0pdGhyb3cgc3IoclsxXSk7cmV0dXJuIHNyKHJbMF0pfSxsc3BfcnVuX2NvcGlsb3Q6ZnVuY3Rpb24oZSx0LG4pe1BuKGUsRW4pO3ZhciByPWUuX19kZXN0cm95X2ludG9fcmF3KCk7Y29uc3QgaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcixzPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yO3JldHVybiB1ci5sc3BfcnVuX2NvcGlsb3QocixpLG8scyxhKX0sbHNwX3J1bl9rY2w6ZnVuY3Rpb24oZSx0LG4pe1BuKGUsRW4pO3ZhciByPWUuX19kZXN0cm95X2ludG9fcmF3KCk7Y29uc3QgaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcixzPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yO3JldHVybiB1ci5sc3BfcnVuX2tjbChyLGksbyxzLGEpfSxub2RlX3BhdGhfZnJvbV9yYW5nZTpmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3IsaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcjtyZXR1cm4gdXIubm9kZV9wYXRoX2Zyb21fcmFuZ2UobixyLGksbyl9LHBhcnNlX2FwcF9zZXR0aW5nczpmdW5jdGlvbihlKXtjb25zdCB0PW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxuPV9yLHI9dXIucGFyc2VfYXBwX3NldHRpbmdzKHQsbik7aWYoclsyXSl0aHJvdyBzcihyWzFdKTtyZXR1cm4gc3IoclswXSl9LHBhcnNlX3Byb2plY3Rfc2V0dGluZ3M6ZnVuY3Rpb24oZSl7Y29uc3QgdD1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbj1fcixyPXVyLnBhcnNlX3Byb2plY3Rfc2V0dGluZ3ModCxuKTtpZihyWzJdKXRocm93IHNyKHJbMV0pO3JldHVybiBzcihyWzBdKX0scGFyc2Vfd2FzbTpJbixwb2ludF90b191bml0OmZ1bmN0aW9uKGUsdCxuKXtjb25zdCByPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxpPV9yLG89b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPXVyLnBvaW50X3RvX3VuaXQocixpLG8scyxhLGMpO2lmKGZbM10pdGhyb3cgc3IoZlsyXSk7dmFyIGwsdSxfPShsPWZbMF0sdT1mWzFdLGw+Pj49MCxHbigpLnN1YmFycmF5KGwvOCxsLzgrdSkpLnNsaWNlKCk7cmV0dXJuIHVyLl9fd2JpbmRnZW5fZnJlZShmWzBdLDgqZlsxXSw4KSxffSxyZWNhc3Rfd2FzbTpmdW5jdGlvbihlKXtjb25zdCB0PW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxuPV9yLHI9dXIucmVjYXN0X3dhc20odCxuKTtpZihyWzJdKXRocm93IHNyKHJbMV0pO3JldHVybiBzcihyWzBdKX0scmVsZXZhbnRfZmlsZV9leHRlbnNpb25zOmZ1bmN0aW9uKCl7Y29uc3QgZT11ci5yZWxldmFudF9maWxlX2V4dGVuc2lvbnMoKTtpZihlWzNdKXRocm93IHNyKGVbMl0pO3ZhciB0PVluKGVbMF0sZVsxXSkuc2xpY2UoKTtyZXR1cm4gdXIuX193YmluZGdlbl9mcmVlKGVbMF0sNCplWzFdLDQpLHR9LHNlcmlhbGl6ZV9jb25maWd1cmF0aW9uOmZ1bmN0aW9uKGUpe2NvbnN0IHQ9dXIuc2VyaWFsaXplX2NvbmZpZ3VyYXRpb24oZSk7aWYodFsyXSl0aHJvdyBzcih0WzFdKTtyZXR1cm4gc3IodFswXSl9LHNlcmlhbGl6ZV9wcm9qZWN0X2NvbmZpZ3VyYXRpb246ZnVuY3Rpb24oZSl7Y29uc3QgdD11ci5zZXJpYWxpemVfcHJvamVjdF9jb25maWd1cmF0aW9uKGUpO2lmKHRbMl0pdGhyb3cgc3IodFsxXSk7cmV0dXJuIHNyKHRbMF0pfSxza2V0Y2hfY2hlY2twb2ludF9saW1pdDpmdW5jdGlvbigpe3JldHVybiB1ci5za2V0Y2hfY2hlY2twb2ludF9saW1pdCgpPj4+MH0saW5pdFN5bmM6ZnVuY3Rpb24oZSl7aWYodm9pZCAwIT09dXIpcmV0dXJuIHVyO3ZvaWQgMCE9PWUmJihPYmplY3QuZ2V0UHJvdG90eXBlT2YoZSk9PT1PYmplY3QucHJvdG90eXBlPyh7bW9kdWxlOmV9PWUpOmNvbnNvbGUud2FybigidXNpbmcgZGVwcmVjYXRlZCBwYXJhbWV0ZXJzIGZvciBgaW5pdFN5bmMoKWA7IHBhc3MgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQiKSk7Y29uc3QgdD12bigpO3JldHVybiBlIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuTW9kdWxlfHwoZT1uZXcgV2ViQXNzZW1ibHkuTW9kdWxlKGUpKSxncihuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UoZSx0KSl9LGRlZmF1bHQ6aHJ9KTtsZXQgZHI7Y29uc3Qgd3I9e2ZpcmVNb2RlbGluZ0NvbW1hbmRGcm9tV2FzbShlLHQsbixyKXt9LHNlbmRNb2RlbGluZ0NvbW1hbmRGcm9tV2FzbTphc3luYyhlLHQsbixyKT0+KHBvc3RNZXNzYWdlKHt0bzoid2Vic29ja2V0IixwYXlsb2FkOnt0eXBlOiJzZW5kIixkYXRhOm59fSksZHI/LnNlbmQobiksbmV3IFByb21pc2UoKHQ9Pntjb25zdCBuPXI9PntpZihyLmRhdGEuaW5kZXhPZihlKTwwKXJldHVybjtjb25zdCBpPShvPUpTT04ucGFyc2Uoci5kYXRhKSxuZXcgbChzKS5lbmNvZGVTaGFyZWRSZWYobykpO3ZhciBvLHM7dChpKSxkci5yZW1vdmVFdmVudExpc3RlbmVyKCJtZXNzYWdlIixuKX07ZHIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsbil9KSkpLGFzeW5jIHN0YXJ0TmV3U2Vzc2lvbigpe319O3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGU9Pntjb25zdCB0PWUuZGF0YTtzd2l0Y2godC50byl7Y2FzZSJ3b3JrZXIiOnJldHVybiB2b2lkKCJzdGFydCI9PT10LnBheWxvYWQudHlwZSYmKGFzeW5jIGU9Pnthd2FpdCBmZXRjaChuZXcgVVJMKCIva2NsX3dhc21fbGliX2JnLndhc20iLGxvY2F0aW9uLm9yaWdpbikpLnRoZW4oKGU9PmUuYXJyYXlCdWZmZXIoKSkpLnRoZW4oKGU9PmhyKHttb2R1bGVfb3JfcGF0aDplfSkpKSxkcj1uZXcgV2ViU29ja2V0KHluLnVybENvbnN0cnVjdEZyb20oe3dlYnJ0YzohMCwuLi5lfSkpLGRyLmFkZEV2ZW50TGlzdGVuZXIoIm9wZW4iLCgoKT0+e3luLmF1dGhlbnRpY2F0ZSh7Y2xpZW50OmUuY2xpZW50fSxkcil9KSx7b25jZTohMH0pLGRyLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLChlPT57cG9zdE1lc3NhZ2Uoe2Zyb206IndlYnNvY2tldCIscGF5bG9hZDp7dHlwZToibWVzc2FnZSIsZGF0YTplLmRhdGF9fSl9KSksc2V0SW50ZXJ2YWwoKCgpPT57ZHIucmVhZHlTdGF0ZT09PVdlYlNvY2tldC5PUEVOJiZkci5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOiJwaW5nIn0pKX0pLDRlMyl9KSh0LnBheWxvYWQuZGF0YVswXSkpO2Nhc2Uid2Vic29ja2V0IjpyZXR1cm4gdm9pZCBkcj8uW3QucGF5bG9hZC50eXBlXSguLi50LnBheWxvYWQuZGF0YSk7Y2FzZSJ3YXNtIjpyZXR1cm4gdm9pZCgiZXhlY3V0ZSI9PT10LnBheWxvYWQudHlwZT8oKGUsdD17bWFpbktjbFBhdGhOYW1lOiJtYWluLmtjbCJ9KT0+e2NvbnN0IG49InN0cmluZyI9PXR5cGVvZiBlPyhpPWUse3JlYWRGaWxlOmFzeW5jIGU9PihuZXcgVGV4dEVuY29kZXIpLmVuY29kZShpKSxleGlzdHM6YXN5bmMgZT0+ITEsZ2V0QWxsRmlsZXM6YXN5bmMgZT0+W2ldfSk6KHI9ZSx7YXN5bmMgcmVhZEZpbGUoZSl7Y29uc3QgdD1yLmdldChlKT8/IiI7cmV0dXJuKG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKHQpfSxleGlzdHM6YXN5bmMgZT0+ci5oYXMoZSksZ2V0QWxsRmlsZXM6YXN5bmMgZT0+QXJyYXkuZnJvbShyLnZhbHVlcygpKX0pO3ZhciByLGk7Y29uc3Qgbz0ic3RyaW5nIj09dHlwZW9mIGU/ZTplLmdldCh0Lm1haW5LY2xQYXRoTmFtZSkscz1uZXcgbW4od3IsbiksYT1JbihvKVswXTtyZXR1cm4gcy5leGVjdXRlKEpTT04uc3RyaW5naWZ5KGEpLHQubWFpbktjbFBhdGhOYW1lLCJ7fSIpfSkodC5wYXlsb2FkLmRhdGFbMF0sdC5wYXlsb2FkLmRhdGFbMV0pLnRoZW4oKGU9Pntwb3N0TWVzc2FnZSh7ZnJvbToid2FzbSIscGF5bG9hZDp7dHlwZToiZXhlY3V0ZSIsZGF0YTplfX0pfSkpLmNhdGNoKChlPT57cG9zdE1lc3NhZ2Uoe2Zyb206Indhc20iLHBheWxvYWQ6e3R5cGU6ImV4ZWN1dGUiLGRhdGE6ZX19KX0pKTpwb3N0TWVzc2FnZShiclt0LnBheWxvYWQudHlwZV0oLi4udC5wYXlsb2FkLmRhdGEpKSl9fSkpfSgpOwoK", null, false);
var On = (t2, e2) => {
  let n;
  return { fn: (...t3) => {
    n = t3;
  }, intervalId: setInterval((() => {
    if (void 0 === n) return;
    const e3 = n;
    n = void 0, window.requestAnimationFrame((() => {
      t2(...e3);
    }));
  }), e2) };
};
var En = (function(t2) {
  return t2[t2.DOWN = 0] = "DOWN", t2[t2.UP = 1] = "UP", t2;
})(En || {});
var _n = (function(t2) {
  return t2[t2.MIDDLE = 1] = "MIDDLE", t2[t2.RIGHT = 2] = "RIGHT", t2;
})(_n || {});
var Dn = { [En.DOWN]: "camera_drag_start", [En.UP]: "camera_drag_end" };
var An = { [_n.MIDDLE]: "pan", [_n.RIGHT]: "rotatetrackball" };
var $n = class extends EventTarget {
  removeMouseEvents = () => {
  };
  removeResizeObserver = () => {
  };
  constructor(t2) {
    super(), this.zooClientArgs = t2, this.workerWebRTC = new Qn(), this.rtcPeerConnection = new RTCPeerConnection({ bundlePolicy: "max-bundle" }), this.rtcPeerConnection.addTransceiver("video", { direction: "recvonly" }), this.rtcPeerConnection.createDataChannel("unreliable_modeling_cmds"), this.ice(), this.rtcPeerConnection.addEventListener("track", this.webRTCOnTrack.bind(this)), this.rtcPeerConnection.addEventListener("datachannel", this.webRTCOnDataChannel.bind(this)), this.rtcPeerConnection.addEventListener("connectionstatechange", this.webRTCOnConnectionStateChange.bind(this));
  }
  deconstructor() {
    this.removeMouseEvents(), this.removeResizeObserver(), this.deice(), this.rtcPeerConnection.removeEventListener("track", this.webRTCOnTrack.bind(this)), this.rtcPeerConnection.removeEventListener("datachannel", this.webRTCOnDataChannel.bind(this)), this.rtcPeerConnection.removeEventListener("connectionstatechange", this.webRTCOnConnectionStateChange.bind(this)), this.workerWebRTC.terminate(), this.rtcPeerConnection.close();
  }
  start() {
    this.workerWebRTC.postMessage({ to: "worker", payload: { type: "start", data: [this.zooClientArgs] } });
  }
  wasm(t2, ...e2) {
    return new Promise(((n) => {
      const i = (t3) => {
        const e3 = t3.data;
        "from" in e3 && "wasm" === e3.from && (this.workerWebRTC.removeEventListener("message", i), n(e3.payload.data));
      };
      this.workerWebRTC.addEventListener("message", i), this.workerWebRTC.postMessage({ to: "wasm", payload: { type: t2, data: e2 ?? [] } });
    }));
  }
  executor() {
    return { addEventListener: this.workerWebRTC.addEventListener.bind(this.workerWebRTC, "message"), removeEventListener: this.workerWebRTC.removeEventListener.bind(this.workerWebRTC, "message"), submit: (t2, e2 = { mainKclPathName: "main.kcl" }) => new Promise(((n) => {
      const i = (t3) => {
        const e3 = t3.data;
        "from" in e3 && "wasm" === e3.from && "execute" === e3.payload.type && (this.workerWebRTC.removeEventListener("message", i), n(e3.payload.data));
      };
      this.workerWebRTC.addEventListener("message", i), this.workerWebRTC.postMessage({ to: "wasm", payload: { type: "execute", data: [t2, e2] } });
    })) };
  }
  webRTCOnConnectionStateChange() {
    if ("disconnected" === this.rtcPeerConnection.connectionState) this.dispatchEvent(new Event("close"));
  }
  webRTCOnTrack(t2) {
    this.track = t2, this.dispatchEvent(new Event("track"));
  }
  webRTCOnDataChannel(t2) {
    this.channel = t2.channel, this.dispatchEvent(new Event("datachannel")), this.dispatchEvent(new Event("connected"));
  }
  async iceOnIceServerInfo(t2) {
    if (0 == t2.data.ice_servers.length) return;
    this.rtcPeerConnection.setConfiguration({ bundlePolicy: "max-bundle", iceServers: t2.data.ice_servers, iceTransportPolicy: "relay" });
    const e2 = await this.rtcPeerConnection.createOffer();
    await this.rtcPeerConnection.setLocalDescription(e2), this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: [JSON.stringify({ type: "sdp_offer", offer: e2 })] } });
  }
  async iceOnSdpAnswer(t2) {
    await this.rtcPeerConnection.setRemoteDescription(t2.data.answer);
  }
  async iceOnTrickleIce(t2) {
    await this.rtcPeerConnection.addIceCandidate(t2.data.candidate);
  }
  iceOnIceCandidate(t2) {
    null !== t2.candidate && this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: [JSON.stringify({ type: "trickle_ice", candidate: { candidate: t2.candidate.candidate, sdpMid: t2.candidate.sdpMid || void 0, sdpMLineIndex: t2.candidate.sdpMLineIndex || void 0, usernameFragment: t2.candidate.usernameFragment || void 0 } })] } });
  }
  iceOnMessage(t2) {
    const e2 = In.parseMessage(t2);
    if ("resp" in e2) switch (e2.resp.type) {
      case "ice_server_info":
        this.iceOnIceServerInfo(e2.resp);
        break;
      case "sdp_answer":
        this.iceOnSdpAnswer(e2.resp);
        break;
      case "trickle_ice":
        this.iceOnTrickleIce(e2.resp);
    }
  }
  workerWebRTCOnMessage(t2) {
    const e2 = t2.data;
    "from" in e2 && "websocket" === e2.from && "message" === e2.payload.type && this.iceOnMessage(e2.payload);
  }
  ice() {
    this.workerWebRTC.addEventListener("message", this.workerWebRTCOnMessage.bind(this)), this.rtcPeerConnection.addEventListener("icecandidate", this.iceOnIceCandidate.bind(this));
  }
  deice() {
    this.workerWebRTC.removeEventListener("message", this.workerWebRTCOnMessage.bind(this)), this.rtcPeerConnection.removeEventListener("icecandidate", this.iceOnIceCandidate);
  }
  addMouseEvents(t2) {
    let e2, n = En.UP;
    const i = (t3) => (i2) => {
      const l2 = An[i2.button];
      void 0 !== l2 && (this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: [JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: Dn[t3], interaction: l2, window: { x: i2.offsetX, y: i2.offsetY } } })] } }), e2 = i2.button, n = t3);
    }, l = i(En.DOWN), o = i(En.UP), c = (t3) => {
      const i2 = An[e2];
      void 0 !== i2 && (n = En.UP, this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: [JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: Dn[n], interaction: i2, window: { x: t3.offsetX, y: t3.offsetY } } })] } }));
    };
    let a = 0;
    const s = On(((t3) => {
      n === En.DOWN && this.channel?.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "camera_drag_move", interaction: An[e2], window: { x: t3.offsetX, y: t3.offsetY } } })), a += 1, this.channel?.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "mouse_move", sequence: a, window: { x: t3.offsetX, y: t3.offsetY } } }));
    }), 1e3 / 30), d = On(((t3) => {
      t3.preventDefault(), this.channel?.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "default_camera_zoom", magnitude: -1 * Math.sign(t3.deltaY) * window.devicePixelRatio * 50 } }));
    }), 1e3 / 30), b = (e3) => {
      this.channel = e3.channel, t2.addEventListener("pointerdown", l), t2.addEventListener("pointermove", s.fn), t2.addEventListener("pointerup", o), t2.addEventListener("pointerleave", c), t2.addEventListener("wheel", d.fn, { passive: false });
    };
    this.rtcPeerConnection.addEventListener("datachannel", b), this.removeMouseEvents = () => {
      this.rtcPeerConnection.removeEventListener("datachannel", b), t2.removeEventListener("pointerdown", l), t2.removeEventListener("pointermove", s.fn), clearInterval(s.intervalId), t2.removeEventListener("pointerup", o), t2.removeEventListener("pointerleave", c), t2.removeEventListener("wheel", d.fn), clearInterval(d.intervalId);
    };
  }
  resize(t2) {
    window.requestAnimationFrame((() => {
      this.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "reconfigure_stream", ...t2, fps: 30 } }));
    }));
  }
  addResizeObserver(t2) {
    const e2 = t2.querySelector("video"), n = On(((t3) => {
      for (const n2 of t3) {
        const t4 = n2.contentRect.width - n2.contentRect.width % 4, i2 = n2.contentRect.height - n2.contentRect.height % 4;
        e2.width = t4, e2.height = i2, this.resize({ width: t4, height: i2 });
      }
    }), 62.5), i = new ResizeObserver(n.fn);
    i.observe(t2), this.removeResizeObserver = () => {
      clearInterval(n.intervalId), i.disconnect();
    };
  }
  send(...t2) {
    return new Promise(((e2) => {
      const n = (t3) => {
        const i = t3.data;
        "from" in i && "websocket" === i.from && (this.workerWebRTC.removeEventListener("message", n), e2(i.payload.data));
      };
      this.workerWebRTC.addEventListener("message", n), this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: t2 } });
    }));
  }
};

// node_modules/@kittycad/web-view/svg-zoo.js
var svg_zoo_default = '<svg viewBox="0 -2 245 84" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill="currentcolor" d="M49.1899 14.2024V1.75536H0.0079789V19.3089H44.4824L0.0159578 67.5334H0.0079789V67.5414L0 67.5493L0.0079789 67.5573V79.3501H11.4018L22.8755 66.903V79.3501H72.0574V61.7965H27.591L72.0574 13.5641V1.75536L60.6556 1.77131L49.1899 14.2024Z"></path><path fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd" d="M116.723 17.5536C103.981 17.5536 93.6164 27.9182 93.6164 40.6605C93.6164 45.751 95.276 50.4665 98.0846 54.2884L86.0205 67.2781C79.8129 60.1369 76.0628 50.8256 76.0628 40.6605C76.0628 18.2398 94.3026 0 116.723 0C125.819 0 134.221 3.00007 141.003 8.06666L128.939 21.0563C125.396 18.8382 121.207 17.5536 116.723 17.5536ZM139.83 40.6605C139.83 35.5699 138.171 30.8544 135.37 27.0245L147.426 14.0349C153.634 21.176 157.384 30.4874 157.384 40.6605C157.384 63.0732 139.144 81.3129 116.723 81.3129C107.627 81.3129 99.2256 78.3129 92.4435 73.2542L104.516 60.2566C108.058 62.4748 112.239 63.7594 116.723 63.7594C129.466 63.7594 139.83 53.3948 139.83 40.6605Z"></path><path fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd" d="M204.34 17.5536C191.597 17.5536 181.233 27.9182 181.233 40.6605C181.233 45.751 182.892 50.4665 185.701 54.2884L173.637 67.2781C167.429 60.1369 163.679 50.8256 163.679 40.6605C163.679 18.2398 181.919 0 204.34 0C213.435 0 221.837 3.00007 228.619 8.06666L216.555 21.0563C213.013 18.8382 208.824 17.5536 204.34 17.5536ZM222.986 27.0245L235.042 14.0349C241.25 21.176 245 30.4874 245 40.6605C245 63.0732 226.76 81.3129 204.34 81.3129C195.244 81.3129 186.842 78.3129 180.06 73.2542L192.132 60.2566C195.674 62.4748 199.855 63.7594 204.34 63.7594C217.082 63.7594 227.446 53.3948 227.446 40.6605C227.446 35.5699 225.787 30.8544 222.986 27.0245Z"></path></g></svg>';

// node_modules/@kittycad/web-view/index.js
window.zoo ??= {};
window.zoo.kittycadWebViews ??= [];
var preventDefault = (e2) => e2.preventDefault();
var ZooWebViewState;
(function(ZooWebViewState2) {
  ZooWebViewState2["Fresh"] = "fresh";
  ZooWebViewState2["Starting"] = "starting";
  ZooWebViewState2["Running"] = "running";
  ZooWebViewState2["Killed"] = "killed";
})(ZooWebViewState || (ZooWebViewState = {}));
var ZooWebView = class _ZooWebView extends EventTarget {
  el;
  rtc = void 0;
  size;
  state = ZooWebViewState.Fresh;
  constructor(args) {
    super();
    this.size = args.size;
    const sizeAdjusted = {
      width: args.size.width - args.size.width % 4,
      height: args.size.height - args.size.height % 4
    };
    this.el = _ZooWebView.createElements({ size: sizeAdjusted });
    const elVideo = this.el.querySelector("video");
    if (elVideo === null)
      return;
    elVideo.addEventListener("contextmenu", preventDefault);
    const elStart = this.el.querySelector("div.start");
    if (elStart === null)
      return;
    const zooWebRTC = new $n({
      client: args.zooClient,
      video_res_width: sizeAdjusted.width,
      video_res_height: sizeAdjusted.height,
      order_independent_transparency: true,
      show_grid: true,
      post_effect: "ssao",
      fps: 30
    });
    zooWebRTC.addResizeObserver(this.el);
    const startZooWebRTC = () => {
      window.zoo?.kittycadWebViews?.filter((v2) => [ZooWebViewState.Running, ZooWebViewState.Starting].indexOf(v2.state) >= 0).forEach((v2) => v2.deconstructor());
      this.state = ZooWebViewState.Starting;
      const onClose = () => {
        this.deconstructor();
      };
      zooWebRTC.addEventListener("close", onClose, { once: true });
      const onTrack = (event) => {
        if (!(event.target instanceof $n))
          return;
        elVideo.srcObject = event.target.track?.streams[0] ?? null;
      };
      zooWebRTC.addEventListener("track", onTrack, { once: true });
      const onConnected = (_event) => {
        void elVideo.play().catch(console.warn);
        this.rtc = zooWebRTC;
        this.state = ZooWebViewState.Running;
        this.dispatchEvent(new Event("ready"));
      };
      zooWebRTC.addMouseEvents(elVideo);
      zooWebRTC.addEventListener("connected", onConnected, { once: true });
      zooWebRTC.start();
    };
    this.state = ZooWebViewState.Fresh;
    window.zoo?.kittycadWebViews?.push(this);
    const elStartClick = () => {
      _ZooWebView.decoOn(sizeAdjusted, this.el, elStart);
      startZooWebRTC();
    };
    elStart.addEventListener("click", elStartClick);
  }
  deconstructor() {
    this.state = ZooWebViewState.Killed;
    const elVideo = this.el.querySelector("video");
    if (elVideo === null)
      return;
    elVideo.pause();
    const elStart = this.el.querySelector("div.start");
    if (elStart === null)
      return;
    _ZooWebView.decoOff(this.size, this.el, elStart);
    return Promise.allSettled([
      this.rtc?.deconstructor()
    ]);
  }
  static decoOff(size, elZooWebView, elStart) {
    elZooWebView.style.width = size.width.toString();
    elZooWebView.style.height = size.height.toString();
    elZooWebView.style.justifyContent = "center";
    elZooWebView.style.alignItems = "center";
    elZooWebView.style.cursor = "pointer";
    elZooWebView.style.backgroundColor = "#1c1c1c";
    elStart.style.paddingTop = "";
    elStart.style.paddingRight = "";
    elStart.style.width = (size.width / 2).toString();
    elStart.style.position = "absolute";
    elStart.style.color = "hsl(154deg 100% 25%)";
  }
  static decoOn(size, elZooWebView, elStart) {
    elZooWebView.style.justifyContent = "right";
    elZooWebView.style.alignItems = "flex-start";
    elStart.style.width = (size.width / 4).toString();
    elStart.style.color = "hsl(154deg 100% 58%)";
    elStart.style.paddingTop = "2px";
    elStart.style.paddingRight = "2px";
  }
  static createElements(args) {
    const elZooWebView = document.createElement("div");
    const elVideo = document.createElement("video");
    const elStart = document.createElement("div");
    elStart.classList.add("start");
    elStart.innerHTML = svg_zoo_default;
    elVideo.width = args.size.width - args.size.width % 4;
    elVideo.height = args.size.height - args.size.height % 4;
    elZooWebView.style.display = "flex";
    elZooWebView.style.overflow = "auto";
    elZooWebView.style.overscrollBehavior = "contain";
    _ZooWebView.decoOff(args.size, elZooWebView, elStart);
    elZooWebView.appendChild(elVideo);
    elZooWebView.appendChild(elStart);
    return elZooWebView;
  }
};

// src/main.ts
var diffBaseMarkerHex = "#0000ff";
var diffCompareMarkerHex = "#00ff00";
var websocketPipeFilename = "websocket.pipe";
var errorsLogFilename = "errors.log";
var websocketBridgeFilenames = /* @__PURE__ */ new Set([websocketPipeFilename, errorsLogFilename]);
var ignoredDirectoryNames = /* @__PURE__ */ new Set([
  ".git",
  ".idea",
  ".vscode",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  ".turbo"
]);
var browserBannerMarkup = `
  <span>Live reloading only available in</span>
  <span class="browser-banner-icons">
    <a class="browser-banner-link browser-banner-option" href="https://www.google.com/chrome/" target="_blank" rel="noreferrer" aria-label="Download Google Chrome">
      <span class="browser-banner-icon" aria-hidden="true"><img src="./chrome.svg" alt=""></span>
      <span>Google Chrome</span>
    </a>
    <span class="browser-banner-option" aria-label="Microsoft Edge">
      <span class="browser-banner-icon" aria-hidden="true"><img src="./edge.svg" alt=""></span>
      <span>Microsoft Edge</span>
    </span>
  </span>
`;
var defaultDisconnectMessage = "Disconnected from Zoo. Choose a file, project, or clipboard contents to reconnect.";
var disconnectBannerMarkup = (message) => `
  <span>${message}</span>
`;
function createApp(root2, partialDeps = {}) {
  const fallbackPicker = async () => {
    throw new DOMException("aborted", "AbortError");
  };
  const deps = {
    showOpenFilePicker: window.showOpenFilePicker?.bind(window) ?? fallbackPicker,
    showDirectoryPicker: window.showDirectoryPicker?.bind(window) ?? fallbackPicker,
    readClipboardText: () => navigator.clipboard.readText(),
    writeClipboardText: (text) => navigator.clipboard.writeText(text),
    fetch: (input, init) => fetch(input, init),
    navigator: window.navigator,
    location: window.location,
    redirectToLogin: (url) => {
      window.location.href = url;
    },
    createClient: (token) => new t({
      token,
      baseUrl: "wss://api.zoo.dev"
    }),
    createWebView: (args) => new ZooWebView({
      zooClient: args.zooClient,
      size: args.size
    }),
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    storage: window.localStorage,
    document,
    measure: (element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    },
    ...partialDeps
  };
  root2.innerHTML = `
    <div class="app-shell">
      <div class="viewer-wrap">
        <div class="snapshot-column">
          <div class="snapshot-rail" data-snapshot-rail>
            <div class="snapshot-card" data-snapshot-card="top">
              <span class="snapshot-label">Top</span>
              <div class="snapshot-frame">
                <img data-snapshot-image="top" alt="Top snapshot">
                <div class="snapshot-empty" data-snapshot-empty="top"></div>
              </div>
            </div>
            <div class="snapshot-card" data-snapshot-card="profile">
              <span class="snapshot-label">Profile</span>
              <div class="snapshot-frame">
                <img data-snapshot-image="profile" alt="Profile snapshot">
                <div class="snapshot-empty" data-snapshot-empty="profile"></div>
              </div>
            </div>
            <div class="snapshot-card" data-snapshot-card="front">
              <span class="snapshot-label">Front</span>
              <div class="snapshot-frame">
                <img data-snapshot-image="front" alt="Front snapshot">
                <div class="snapshot-empty" data-snapshot-empty="front"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="viewer-stage">
          <div class="viewer-ui viewer-ui-left">
            <label class="token-field">
              <input
                type="text"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                placeholder="Paste Zoo API token"
                data-token-input
              >
            </label>
            <div class="kcl-error" data-kcl-error hidden role="status" aria-live="polite">
              <span class="kcl-error-label" data-kcl-error-label>KCL error</span>
              <pre data-kcl-error-text></pre>
            </div>
          </div>
        <div class="viewer-ui viewer-ui-right">
          <div class="meta">
              <button type="button" data-edges aria-label="Toggle edges"></button>
              <button type="button" data-xray aria-label="Toggle xray"></button>
              <div class="explode-group">
                <div class="explode-controls">
                  <div class="explode-modes">
                    <button type="button" data-explode-horizontal aria-label="Horizontal explode">H</button>
                    <button type="button" data-explode-vertical aria-label="Vertical explode">V</button>
                    <button type="button" data-explode-radial aria-label="Radial explode">R</button>
                    <button type="button" data-explode-grid aria-label="Grid explode">G</button>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value="10"
                    data-explode-spacing
                    aria-label="Explode spacing"
                  >
                </div>
                <button type="button" data-explode aria-label="Open explode modes"></button>
              </div>
              <div class="diff-group">
                <div class="diff-controls">
                  <div class="diff-loaders">
                    <button type="button" data-diff-original aria-label="Compare against original"></button>
                    <button type="button" data-diff-directory aria-label="Load project"></button>
                    <button type="button" data-diff-file aria-label="Load KCL file"></button>
                    <button type="button" data-diff-clipboard aria-label="Use clipboard contents"></button>
                  </div>
                </div>
                <button type="button" data-diff aria-label="Toggle diff mode"></button>
              </div>
          </div>
        </div>
          <div class="viewer-connection">
            <span data-source>none</span>
            <span data-status aria-label="Connection status"></span>
            <button type="button" data-disconnect aria-label="Disconnect"></button>
          </div>
          <div class="viewer" data-viewer></div>
        </div>
      </div>
    </div>
  `;
  const tokenInput = root2.querySelector("[data-token-input]");
  const kclError = root2.querySelector("[data-kcl-error]");
  const kclErrorLabel = root2.querySelector("[data-kcl-error-label]");
  const kclErrorText = root2.querySelector("[data-kcl-error-text]");
  const viewerUiLeft = root2.querySelector(".viewer-ui-left");
  const viewerConnection = root2.querySelector(".viewer-connection");
  const viewerStage = root2.querySelector(".viewer-stage");
  const sourceValue = root2.querySelector("[data-source]");
  const statusValue = root2.querySelector("[data-status]");
  const edgesButton = root2.querySelector("[data-edges]");
  const xrayButton = root2.querySelector("[data-xray]");
  const explodeButton = root2.querySelector("[data-explode]");
  const diffButton = root2.querySelector("[data-diff]");
  const diffOriginalButton = root2.querySelector("[data-diff-original]");
  const diffDirectoryButton = root2.querySelector("[data-diff-directory]");
  const diffFileButton = root2.querySelector("[data-diff-file]");
  const diffClipboardButton = root2.querySelector("[data-diff-clipboard]");
  const explodeHorizontalButton = root2.querySelector("[data-explode-horizontal]");
  const explodeVerticalButton = root2.querySelector("[data-explode-vertical]");
  const explodeRadialButton = root2.querySelector("[data-explode-radial]");
  const explodeGridButton = root2.querySelector("[data-explode-grid]");
  const explodeSpacingInput = root2.querySelector("[data-explode-spacing]");
  const disconnectButton = root2.querySelector("[data-disconnect]");
  const viewer = root2.querySelector("[data-viewer]");
  const snapshotRail = root2.querySelector("[data-snapshot-rail]");
  const snapshotCards = {
    top: root2.querySelector('[data-snapshot-card="top"]'),
    profile: root2.querySelector('[data-snapshot-card="profile"]'),
    front: root2.querySelector('[data-snapshot-card="front"]')
  };
  const snapshotImages = {
    top: root2.querySelector('[data-snapshot-image="top"]'),
    profile: root2.querySelector('[data-snapshot-image="profile"]'),
    front: root2.querySelector('[data-snapshot-image="front"]')
  };
  const snapshotEmptyStates = {
    top: root2.querySelector('[data-snapshot-empty="top"]'),
    profile: root2.querySelector('[data-snapshot-empty="profile"]'),
    front: root2.querySelector('[data-snapshot-empty="front"]')
  };
  diffOriginalButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7.5a7 7 0 0 1 11 2.1M17 4.5v5h-5M17 16.5a7 7 0 0 1-11-2.1M7 19.5v-5h5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>';
  diffDirectoryButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>';
  diffFileButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>';
  diffClipboardButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>';
  const measured = deps.measure(viewer);
  const size = {
    width: Math.max(320, Math.floor(measured.width || viewer.clientWidth || 960)),
    height: Math.max(240, Math.floor(measured.height || viewer.clientHeight || 540))
  };
  const tokenStorageKey = "zoo-api-token";
  const usesZooCookieAuth = deps.location.hostname === "zoo.dev" || deps.location.hostname.endsWith(".zoo.dev");
  const isMicrosoftEdge = /Edg\/\d+/.test(deps.navigator.userAgent);
  const isGoogleChrome = deps.navigator.vendor === "Google Inc." && /Chrome\/\d+/.test(deps.navigator.userAgent) && !/Edg\/|OPR\/|Brave\//.test(deps.navigator.userAgent);
  const isSupportedBrowser = isGoogleChrome || isMicrosoftEdge;
  const isJsdomNavigator = /jsdom/i.test(deps.navigator.userAgent);
  const usesRegularPickerFallback = !isSupportedBrowser && !isJsdomNavigator;
  const loginUrl = `https://zoo.dev/signin?callbackUrl=${encodeURIComponent(deps.location.href)}`;
  const state = {
    token: usesZooCookieAuth ? "" : deps.storage.getItem(tokenStorageKey)?.trim() ?? "",
    source: null,
    originalSourceInput: null,
    disconnectMessage: "",
    webView: null,
    executor: null,
    pollTimer: 0,
    websocketPollTimer: 0,
    websocketPipeModified: 0,
    lastModified: 0,
    execution: null,
    executorMessageHandler: null,
    rtcCloseHandler: null,
    kclErrors: [],
    kclErrorLocations: [],
    executorValues: null,
    edgeLinesVisible: true,
    edgeLinesVisibleBeforeDiff: true,
    xrayVisible: false,
    diffEnabled: false,
    diffCompareSource: null,
    diffBodyOwnershipByArtifactId: {},
    diffBodyOwnershipSequence: [],
    diffObjectOwnershipById: {},
    seenObjectIdsInSendOrder: [],
    explodeMenuVisible: false,
    explodeMode: null,
    explodeSpacing: 10,
    snapshotUrls: {
      top: "",
      profile: "",
      front: ""
    },
    snapshotRefreshing: false,
    pendingZoomToEntityRequestId: "",
    bodyArtifactIds: [],
    pendingBodyArtifactIds: [],
    materialByObjectId: {},
    pendingMaterialByObjectId: {},
    transformByObjectId: {},
    pendingTransformByObjectId: {},
    explodeOffsetByObjectId: {},
    solidObjectIds: [],
    pendingSolidObjectIdsRequestId: "",
    ignoredOutgoingCommandIds: /* @__PURE__ */ new Set()
  };
  let requestNumber = 0;
  const nextRequestId = () => globalThis.crypto?.randomUUID?.() ?? `00000000-0000-4000-8000-${`${++requestNumber}`.padStart(12, "0")}`;
  const cloneExecutionInput = (input) => typeof input === "string" ? input : new Map(input);
  const normalizeOffset = (value) => Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6));
  const bodyResponseTypes = /* @__PURE__ */ new Set([
    "extrude",
    "extrude_to_reference",
    "twist_extrude",
    "revolve",
    "revolve_about_edge",
    "sweep",
    "loft"
  ]);
  const bodyOperationNames = /* @__PURE__ */ new Set([
    "extrude",
    "extrudeToReference",
    "twistExtrude",
    "revolve",
    "revolveAboutEdge",
    "sweep",
    "loft"
  ]);
  const xrayOpacity = 0.22;
  const gridSpacingMultiplier = 7.5;
  const diffBaseMarkerColor = { r: 0, g: 0, b: 1 };
  const diffCompareMarkerColor = { r: 0, g: 1, b: 0 };
  const snapshotViews = [
    {
      key: "top",
      label: "Top",
      vantage: { x: 0, y: 0, z: 128 },
      up: { x: 0, y: 1, z: 0 }
    },
    {
      key: "profile",
      label: "Profile",
      vantage: { x: 128, y: 0, z: 0 },
      up: { x: 0, y: 0, z: 1 }
    },
    {
      key: "front",
      label: "Front",
      vantage: { x: 0, y: -128, z: 0 },
      up: { x: 0, y: 0, z: 1 }
    }
  ];
  const defaultMaterial = {
    color: {
      r: 1,
      g: 1,
      b: 1,
      a: 1
    },
    metalness: 0,
    roughness: 0.01,
    ambient_occlusion: 0
  };
  const zoomToFitRequest = () => JSON.stringify({
    type: "modeling_cmd_batch_req",
    requests: [
      {
        cmd: {
          type: "zoom_to_fit",
          object_ids: [],
          padding: 0
        },
        cmd_id: nextRequestId()
      }
    ],
    batch_id: nextRequestId(),
    responses: true
  });
  const zoomToFitEntityRequest = (objectId) => JSON.stringify({
    type: "modeling_cmd_batch_req",
    requests: [
      {
        cmd: {
          type: "zoom_to_fit",
          object_ids: [objectId],
          padding: 0
        },
        cmd_id: nextRequestId()
      }
    ],
    batch_id: nextRequestId(),
    responses: true
  });
  const entityGetParentIdRequest = (entityId, cmd_id) => JSON.stringify({
    type: "modeling_cmd_req",
    cmd_id,
    cmd: {
      type: "entity_get_parent_id",
      entity_id: entityId
    }
  });
  const clearSnapshotUrls = () => {
    state.snapshotUrls = {
      top: "",
      profile: "",
      front: ""
    };
  };
  const streamSize = (width, height) => ({
    width: Math.max(4, Math.floor(Math.max(4, width) / 4) * 4),
    height: Math.max(4, Math.floor(Math.max(4, height) / 4) * 4)
  });
  const snapshotUrlFromContents = (contents) => {
    const normalized = contents?.trim() ?? "";
    if (!normalized) {
      return "";
    }
    if (normalized.startsWith("data:image/")) {
      return normalized;
    }
    const compact = normalized.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
    if (/^[A-Za-z0-9+/]*={0,2}$/.test(compact)) {
      const remainder = compact.length % 4;
      if (remainder !== 1) {
        const padded = `${compact}${remainder ? "=".repeat(4 - remainder) : ""}`;
        try {
          if (typeof globalThis.atob === "function" && typeof globalThis.btoa === "function") {
            const decoded = globalThis.atob(padded);
            const reencoded = globalThis.btoa(decoded).replace(/=+$/g, "");
            if (reencoded === padded.replace(/=+$/g, "")) {
              return `data:image/png;base64,${padded}`;
            }
          } else {
            return `data:image/png;base64,${padded}`;
          }
        } catch {
        }
      }
    }
    try {
      return typeof globalThis.btoa === "function" ? `data:image/png;base64,${globalThis.btoa(normalized)}` : "";
    } catch {
      return "";
    }
  };
  const normalizeKclErrorMessages = (messages) => [...new Set(messages.map((message) => message.trim()).filter(Boolean))];
  const normalizeKclErrorDisplays = (entries) => {
    const seen = /* @__PURE__ */ new Set();
    return entries.flatMap((entry) => {
      const message = entry.message.trim();
      const location = entry.location.trim();
      if (!message) {
        return [];
      }
      const key = `${location}\0${message}`;
      if (seen.has(key)) {
        return [];
      }
      seen.add(key);
      return [{ message, location }];
    });
  };
  const basenameFromPath = (path) => {
    const segments = path.split(/[\\/]/).filter(Boolean);
    return segments[segments.length - 1] ?? path;
  };
  const normalizeExecutionPath = (path) => path.trim().replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
  const entryPathForInput = (input) => {
    if (typeof input === "string") {
      return "main.kcl";
    }
    const normalizedEntries = [...input.keys()].map((path) => normalizeExecutionPath(path));
    if (normalizedEntries.includes("main.kcl")) {
      return "main.kcl";
    }
    const kclPaths = normalizedEntries.filter((path) => path.endsWith(".kcl")).sort();
    return kclPaths[0] ?? "main.kcl";
  };
  const diffEntryPathForInput = (input, prefix) => {
    return `${prefix}/${entryPathForInput(input)}`;
  };
  const sourceCanPoll = (source) => source?.kind === "file" || source?.kind === "directory";
  const sourceExecutesImmediately = (source) => source?.kind === "clipboard" || source?.kind === "browser-file" || source?.kind === "browser-directory";
  const isNotFoundError = (error) => error instanceof DOMException && error.name === "NotFoundError";
  const markerCandidatesFromSourceTextFallback = (sourceText) => {
    const bodyLikeTokens = [
      "extrude(",
      "extrude_to_reference(",
      "twistExtrude(",
      "twist_extrude(",
      "revolve(",
      "revolveAboutEdge(",
      "revolve_about_edge(",
      "sweep(",
      "loft(",
      "hole(",
      "chamfer(",
      "fillet(",
      "shell(",
      "hollow(",
      "union(",
      "subtract(",
      "intersect(",
      "patternCircular3d(",
      "patternLinear3d(",
      "patternTransform(",
      "translate(",
      "rotate(",
      "scale(",
      "clone(",
      "appearance("
    ];
    const statements = [];
    let currentStatement = "";
    for (const rawLine of sourceText.split("\n")) {
      const line = rawLine.replace(/\/\/.*$/, "");
      const isTopLevel = line.trim().length > 0 && !line.startsWith(" ") && !line.startsWith("	");
      if (isTopLevel && currentStatement.trim()) {
        statements.push(currentStatement);
        currentStatement = "";
      }
      currentStatement += `${currentStatement ? "\n" : ""}${line}`;
    }
    if (currentStatement.trim()) {
      statements.push(currentStatement);
    }
    const next = /* @__PURE__ */ new Set();
    const importAliases = /* @__PURE__ */ new Set();
    const assignedNames = /* @__PURE__ */ new Set();
    let lastTopLevelIdentifier = "";
    for (const statement of statements) {
      const trimmed = statement.trim();
      const importAlias = trimmed.match(
        /^import\s+["'][^"']+["']\s+as\s+([A-Za-z_][A-Za-z0-9_]*)/
      )?.[1];
      if (importAlias) {
        importAliases.add(importAlias);
        continue;
      }
      const assignedName = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/)?.[1];
      if (assignedName) {
        assignedNames.add(assignedName);
        if (bodyLikeTokens.some((token) => statement.includes(token))) {
          next.add(assignedName);
        }
        continue;
      }
      const bareIdentifier = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)$/)?.[1];
      if (bareIdentifier) {
        lastTopLevelIdentifier = bareIdentifier;
      }
    }
    if (lastTopLevelIdentifier && (importAliases.has(lastTopLevelIdentifier) || assignedNames.has(lastTopLevelIdentifier))) {
      next.add(lastTopLevelIdentifier);
    }
    return [...next];
  };
  const diffMarkerOperationNames = /* @__PURE__ */ new Set([
    "appearance",
    "chamfer",
    "clone",
    "extrude",
    "extrudeToReference",
    "extrude_to_reference",
    "fillet",
    "hollow",
    "hole",
    "intersect",
    "loft",
    "patternCircular3d",
    "patternLinear3d",
    "patternTransform",
    "pattern_circular3d",
    "pattern_linear3d",
    "pattern_transform",
    "revolve",
    "revolveAboutEdge",
    "revolve_about_edge",
    "rotate",
    "scale",
    "shell",
    "subtract",
    "sweep",
    "translate",
    "twistExtrude",
    "twist_extrude",
    "union"
  ]);
  const identifierNameFromAstNode = (node) => {
    if (!node || typeof node !== "object") {
      return "";
    }
    const record = node;
    if (record.type === "Identifier" && typeof record.name === "string") {
      return record.name;
    }
    if (record.type === "Name") {
      return identifierNameFromAstNode(record.name);
    }
    if (typeof record.name === "string") {
      return record.name;
    }
    return "";
  };
  const callNameFromAstNode = (node) => {
    if (!node || typeof node !== "object") {
      return "";
    }
    const record = node;
    if (record.type === "CallExpressionKw") {
      return callNameFromAstNode(record.callee);
    }
    if (record.type === "Name") {
      return identifierNameFromAstNode(record.name);
    }
    return identifierNameFromAstNode(node);
  };
  const astContainsDiffMarkerOperation = (node) => {
    if (!node || typeof node !== "object") {
      return false;
    }
    const record = node;
    if (record.type === "CallExpressionKw" && diffMarkerOperationNames.has(callNameFromAstNode(record.callee))) {
      return true;
    }
    for (const value of Object.values(record)) {
      if (Array.isArray(value)) {
        if (value.some((entry) => astContainsDiffMarkerOperation(entry))) {
          return true;
        }
        continue;
      }
      if (astContainsDiffMarkerOperation(value)) {
        return true;
      }
    }
    return false;
  };
  const markerCandidatesFromProgramAst = (program) => {
    if (!program || typeof program !== "object") {
      return [];
    }
    const body = Array.isArray(program.body) ? program.body : [];
    if (!body.length) {
      return [];
    }
    const next = /* @__PURE__ */ new Set();
    const importAliases = /* @__PURE__ */ new Set();
    const assignedNames = /* @__PURE__ */ new Set();
    for (const statement of body) {
      if (!statement || typeof statement !== "object") {
        continue;
      }
      const record = statement;
      if (record.type === "ImportStatement") {
        const alias = identifierNameFromAstNode(
          record.selector?.alias
        );
        if (alias) {
          importAliases.add(alias);
        }
        continue;
      }
      if (record.type !== "VariableDeclaration") {
        continue;
      }
      const declaration = record.declaration;
      const assignedName = identifierNameFromAstNode(declaration?.id);
      if (!assignedName) {
        continue;
      }
      assignedNames.add(assignedName);
      if (astContainsDiffMarkerOperation(declaration?.init)) {
        next.add(assignedName);
      }
    }
    const lastStatement = body.at(-1);
    const lastExpressionIdentifier = lastStatement && typeof lastStatement === "object" && lastStatement.type === "ExpressionStatement" ? identifierNameFromAstNode(lastStatement.expression) : "";
    if (lastExpressionIdentifier && (importAliases.has(lastExpressionIdentifier) || assignedNames.has(lastExpressionIdentifier))) {
      next.add(lastExpressionIdentifier);
    }
    return [...next];
  };
  const sourceTextWithDiffMarkersFallback = (sourceText, markerHex) => {
    const markerCandidates = markerCandidatesFromSourceTextFallback(sourceText);
    if (!markerCandidates.length) {
      return sourceText;
    }
    return `${sourceText}

${markerCandidates.map((name) => `appearance(${name}, color = "${markerHex}")`).join("\n")}
`;
  };
  const callRtcWasm = async (funcName, ...args) => {
    if (!state.webView?.rtc?.wasm) {
      return null;
    }
    let timeoutId = 0;
    try {
      return await Promise.race([
        state.webView.rtc.wasm(funcName, ...args),
        new Promise((resolve) => {
          timeoutId = globalThis.setTimeout(() => resolve(null), 1e3);
        })
      ]);
    } finally {
      if (timeoutId) {
        globalThis.clearTimeout(timeoutId);
      }
    }
  };
  const sourceTextWithDiffMarkers = async (sourceText, markerHex) => {
    const parsedProgram = await callRtcWasm("parse_wasm", sourceText);
    if (!Array.isArray(parsedProgram) || !parsedProgram[0] || typeof parsedProgram[0] !== "object") {
      return sourceTextWithDiffMarkersFallback(sourceText, markerHex);
    }
    const markerCandidates = markerCandidatesFromProgramAst(parsedProgram[0]);
    if (!markerCandidates.length) {
      return sourceText;
    }
    const markerProgram = await callRtcWasm(
      "parse_wasm",
      `${markerCandidates.map((name) => `appearance(${name}, color = "${markerHex}")`).join("\n")}
`
    );
    if (!Array.isArray(markerProgram) || !markerProgram[0] || typeof markerProgram[0] !== "object") {
      return sourceTextWithDiffMarkersFallback(sourceText, markerHex);
    }
    const programAst = parsedProgram[0];
    const markerAst = markerProgram[0];
    if (!Array.isArray(programAst.body) || !Array.isArray(markerAst.body) || !markerAst.body.length) {
      return sourceTextWithDiffMarkersFallback(sourceText, markerHex);
    }
    const insertIndex = programAst.body.at(-1) && typeof programAst.body.at(-1) === "object" && programAst.body.at(-1).type === "ExpressionStatement" ? programAst.body.length - 1 : programAst.body.length;
    programAst.body.splice(insertIndex, 0, ...markerAst.body);
    const recastedSource = await callRtcWasm("recast_wasm", JSON.stringify(programAst));
    return typeof recastedSource === "string" && recastedSource.trim() ? recastedSource : sourceTextWithDiffMarkersFallback(sourceText, markerHex);
  };
  const prefixedProjectInput = async (input, prefix, markerHex) => {
    const entryPath = entryPathForInput(input);
    if (typeof input === "string") {
      return /* @__PURE__ */ new Map([[`${prefix}/main.kcl`, await sourceTextWithDiffMarkers(input, markerHex)]]);
    }
    return new Map(
      await Promise.all(
        [...input.entries()].map(async ([path, sourceText]) => [
          `${prefix}/${normalizeExecutionPath(path)}`,
          normalizeExecutionPath(path) === entryPath ? await sourceTextWithDiffMarkers(sourceText, markerHex) : sourceText
        ])
      )
    );
  };
  const buildMergedDiffInput = async (baseInput, compareInput) => {
    const basePrefix = "__codex_base";
    const comparePrefix = "__codex_compare";
    const merged = new Map([
      ...await prefixedProjectInput(baseInput, basePrefix, diffBaseMarkerHex),
      ...await prefixedProjectInput(compareInput, comparePrefix, diffCompareMarkerHex)
    ]);
    const baseEntryPath = diffEntryPathForInput(baseInput, basePrefix);
    const compareEntryPath = diffEntryPathForInput(compareInput, comparePrefix);
    merged.set(
      "main.kcl",
      [
        `import "${baseEntryPath}" as codexBaseModel`,
        `import "${compareEntryPath}" as codexCompareModel`,
        "codexCompareModel"
      ].join("\n")
    );
    return merged;
  };
  const kclErrorMessagesFromUnknown = (value, depth = 0) => {
    if (depth > 5 || value == null) {
      return [];
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) {
        return [];
      }
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          const parsed = JSON.parse(trimmed);
          const nested = kclErrorMessagesFromUnknown(parsed, depth + 1);
          if (nested.length) {
            return nested;
          }
        } catch {
        }
      }
      return [trimmed];
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return [String(value)];
    }
    if (value instanceof Error) {
      return kclErrorMessagesFromUnknown(value.message, depth + 1);
    }
    if (Array.isArray(value)) {
      return normalizeKclErrorMessages(
        value.flatMap((entry) => kclErrorMessagesFromUnknown(entry, depth + 1))
      );
    }
    if (typeof value !== "object") {
      return [];
    }
    const record = value;
    if (record.errors !== void 0) {
      const nested = kclErrorMessagesFromUnknown(record.errors, depth + 1);
      if (nested.length) {
        return nested;
      }
    }
    for (const key of ["message", "msg", "reason", "details", "description", "text"]) {
      const nested = kclErrorMessagesFromUnknown(record[key], depth + 1);
      if (nested.length) {
        return nested;
      }
    }
    return [];
  };
  const executorResultRecord = (result) => {
    if (typeof result === "string") {
      const trimmed = result.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          const parsed = JSON.parse(trimmed);
          return typeof parsed === "object" && parsed !== null ? parsed : null;
        } catch {
          return null;
        }
      }
      return null;
    }
    return typeof result === "object" && result !== null ? result : null;
  };
  const modulePathValue = (value) => {
    if (typeof value === "string") {
      return value;
    }
    if (!value || typeof value !== "object") {
      return "";
    }
    const record = value;
    return typeof record.value === "string" ? record.value : typeof record.path === "string" ? record.path : "";
  };
  const sourceTextForExecutionPath = (input, path) => {
    if (typeof input === "string") {
      return input;
    }
    const direct = input.get(path);
    if (typeof direct === "string") {
      return direct;
    }
    const normalizedPath = normalizeExecutionPath(path);
    for (const [candidatePath, sourceText] of input) {
      if (normalizeExecutionPath(candidatePath) === normalizedPath) {
        return sourceText;
      }
    }
    const basename = basenameFromPath(normalizedPath);
    if (!basename) {
      return "";
    }
    const basenameMatches = [...input.entries()].filter(
      ([candidatePath]) => basenameFromPath(normalizeExecutionPath(candidatePath)) === basename
    );
    return basenameMatches.length === 1 ? basenameMatches[0][1] : "";
  };
  const mainKclPathNameForSource = (filePath) => {
    const normalizedPath = normalizeExecutionPath(filePath);
    return normalizedPath || "main.kcl";
  };
  const sourceRangeFromUnknown = (value) => {
    if (!Array.isArray(value) || value.length < 3) {
      return null;
    }
    const [start, end, moduleId] = value;
    if (typeof start !== "number" || typeof end !== "number" || typeof moduleId !== "number" || !Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(moduleId)) {
      return null;
    }
    return [start, end, moduleId];
  };
  const preferredSourceRange = (errorLike) => {
    const direct = sourceRangeFromUnknown(errorLike.sourceRange) ?? sourceRangeFromUnknown(errorLike.source_range);
    if (direct) {
      return direct;
    }
    const sourceRanges = Array.isArray(errorLike.sourceRanges) ? errorLike.sourceRanges : Array.isArray(errorLike.source_ranges) ? errorLike.source_ranges : [];
    for (const sourceRange of sourceRanges) {
      const parsed = sourceRangeFromUnknown(sourceRange);
      if (parsed) {
        return parsed;
      }
    }
    const details = errorLike.details && typeof errorLike.details === "object" ? errorLike.details : null;
    if (!details) {
      return null;
    }
    const detailDirect = sourceRangeFromUnknown(details.sourceRange) ?? sourceRangeFromUnknown(details.source_range);
    if (detailDirect) {
      return detailDirect;
    }
    const detailRanges = Array.isArray(details.sourceRanges) ? details.sourceRanges : Array.isArray(details.source_ranges) ? details.source_ranges : [];
    for (const sourceRange of detailRanges) {
      const parsed = sourceRangeFromUnknown(sourceRange);
      if (parsed) {
        return parsed;
      }
    }
    return null;
  };
  const filenameForModuleId = (filenames, moduleId, source) => {
    const filename = filenames instanceof Map ? modulePathValue(filenames.get(moduleId) ?? filenames.get(String(moduleId))) : Array.isArray(filenames) ? modulePathValue(filenames[moduleId]) : filenames && typeof filenames === "object" ? modulePathValue(filenames[String(moduleId)]) : "";
    if (filename) {
      return filename;
    }
    return source?.kind === "file" ? source.label : "";
  };
  const lineAndColumnFromUtf8Offset = (sourceText, offset) => {
    const encoded = new TextEncoder().encode(sourceText);
    const safeOffset = Math.max(0, Math.min(encoded.length, Math.floor(offset)));
    const decoded = new TextDecoder().decode(encoded.slice(0, safeOffset));
    const lines = decoded.split("\n");
    return {
      line: lines.length,
      column: (lines[lines.length - 1]?.length ?? 0) + 1
    };
  };
  const locationForErrorLike = (errorLike, filenames, input, source) => {
    const sourceRange = preferredSourceRange(errorLike);
    if (!sourceRange) {
      return "";
    }
    const filename = filenameForModuleId(filenames, sourceRange[2], source);
    if (!filename) {
      return "";
    }
    const sourceText = sourceTextForExecutionPath(input, filename);
    if (!sourceText) {
      return "";
    }
    const { line, column } = lineAndColumnFromUtf8Offset(sourceText, sourceRange[0]);
    return `${filename}:${line}:${column}`;
  };
  const kclErrorDisplaysFromErrorValue = (value, filenames, input, source, depth = 0) => {
    if (depth > 5 || value == null) {
      return [];
    }
    if (Array.isArray(value)) {
      return normalizeKclErrorDisplays(
        value.flatMap(
          (entry) => kclErrorDisplaysFromErrorValue(entry, filenames, input, source, depth + 1)
        )
      );
    }
    const location = typeof value === "object" && value !== null ? locationForErrorLike(value, filenames, input, source) : "";
    return normalizeKclErrorMessages(kclErrorMessagesFromUnknown(value, depth)).map((message) => ({
      message,
      location
    }));
  };
  const kclErrorDisplaysFromExecutorResult = (result, input, source) => {
    const record = executorResultRecord(result);
    if (!record) {
      return [];
    }
    return normalizeKclErrorDisplays([
      ...kclErrorDisplaysFromErrorValue(record.error, record.filenames, input, source),
      ...kclErrorDisplaysFromErrorValue(record.errors, record.filenames, input, source)
    ]);
  };
  const executorValuesFromResult = (result) => {
    const record = executorResultRecord(result);
    if (!record) {
      return null;
    }
    if ("values" in record) {
      return record.values;
    }
    if ("variables" in record) {
      return record.variables;
    }
    return null;
  };
  const execOutcomeRecordFromResult = (result) => {
    const record = executorResultRecord(result);
    if (!record) {
      return null;
    }
    const execOutcome = record.exec_outcome && typeof record.exec_outcome === "object" ? record.exec_outcome : null;
    return execOutcome ?? record;
  };
  const artifactGraphFromResult = (result) => {
    const execOutcome = execOutcomeRecordFromResult(result);
    if (!execOutcome) {
      return {};
    }
    if (execOutcome.artifactGraph instanceof Map) {
      return Object.fromEntries(
        [...execOutcome.artifactGraph.entries()].filter(
          (entry) => typeof entry[0] === "string" && Boolean(entry[1]) && typeof entry[1] === "object"
        )
      );
    }
    const artifactGraph = execOutcome.artifactGraph && typeof execOutcome.artifactGraph === "object" ? execOutcome.artifactGraph : null;
    if (!artifactGraph) {
      return {};
    }
    const graphMap = artifactGraph.map && typeof artifactGraph.map === "object" ? artifactGraph.map : artifactGraph;
    if (graphMap instanceof Map) {
      return Object.fromEntries(
        [...graphMap.entries()].filter(
          (entry) => typeof entry[0] === "string" && Boolean(entry[1]) && typeof entry[1] === "object"
        )
      );
    }
    const next = {};
    for (const [artifactId, artifact] of Object.entries(graphMap)) {
      if (artifact && typeof artifact === "object") {
        next[artifactId] = artifact;
      }
    }
    return next;
  };
  const filenamesFromResult = (result) => execOutcomeRecordFromResult(result)?.filenames;
  const operationsFromResult = (result) => {
    const execOutcome = execOutcomeRecordFromResult(result);
    if (!execOutcome || !Array.isArray(execOutcome.operations)) {
      return [];
    }
    return execOutcome.operations.filter(
      (operation) => Boolean(operation) && typeof operation === "object"
    );
  };
  const diffSideFromFilename = (filename) => {
    const normalized = normalizeExecutionPath(filename);
    if (normalized.startsWith("__codex_base/")) {
      return "base";
    }
    if (normalized.startsWith("__codex_compare/")) {
      return "compare";
    }
    return null;
  };
  const diffSideFromArtifact = (artifactId, artifactGraph, filenames, seen = /* @__PURE__ */ new Set()) => {
    if (seen.has(artifactId)) {
      return null;
    }
    seen.add(artifactId);
    const artifact = artifactGraph[artifactId];
    if (!artifact) {
      return null;
    }
    const codeRef = artifact.codeRef && typeof artifact.codeRef === "object" ? artifact.codeRef : null;
    const range = sourceRangeFromUnknown(codeRef?.range) ?? sourceRangeFromUnknown(codeRef?.sourceRange) ?? sourceRangeFromUnknown(artifact.sourceRange);
    if (range) {
      const filename = filenameForModuleId(filenames, range[2], null);
      const side = filename ? diffSideFromFilename(filename) : null;
      if (side) {
        return side;
      }
    }
    for (const nested of Object.values(artifact)) {
      if (!nested) {
        continue;
      }
      if (typeof nested === "string") {
        const side = artifactGraph[nested] ? diffSideFromArtifact(nested, artifactGraph, filenames, seen) : null;
        if (side) {
          return side;
        }
        continue;
      }
      if (Array.isArray(nested)) {
        for (const entry of nested) {
          if (typeof entry === "string" && artifactGraph[entry]) {
            const side = diffSideFromArtifact(entry, artifactGraph, filenames, seen);
            if (side) {
              return side;
            }
          }
        }
        continue;
      }
      if (typeof nested !== "object") {
        continue;
      }
      for (const entry of Object.values(nested)) {
        if (typeof entry === "string" && artifactGraph[entry]) {
          const side = diffSideFromArtifact(entry, artifactGraph, filenames, seen);
          if (side) {
            return side;
          }
          continue;
        }
        if (!Array.isArray(entry)) {
          continue;
        }
        for (const child of entry) {
          if (typeof child === "string" && artifactGraph[child]) {
            const side = diffSideFromArtifact(child, artifactGraph, filenames, seen);
            if (side) {
              return side;
            }
          }
        }
      }
    }
    return null;
  };
  const diffBodyOwnershipByArtifactIdFromResult = (result) => {
    const artifactGraph = artifactGraphFromResult(result);
    const filenames = filenamesFromResult(result);
    const next = {};
    for (const [artifactId, artifact] of Object.entries(artifactGraph)) {
      if (artifact.type !== "sweep" && artifact.type !== "compositeSolid" || artifact.consumed === true) {
        continue;
      }
      const side = diffSideFromArtifact(artifactId, artifactGraph, filenames);
      if (side) {
        next[artifactId] = side;
      }
    }
    return next;
  };
  const diffBodyOwnershipSequenceFromResult = (result) => {
    const artifactGraph = artifactGraphFromResult(result);
    const filenames = filenamesFromResult(result);
    const sequence = Object.entries(artifactGraph).flatMap(([artifactId, artifact]) => {
      if (artifact.type !== "sweep" && artifact.type !== "compositeSolid" || artifact.consumed === true) {
        return [];
      }
      const codeRef = artifact.codeRef && typeof artifact.codeRef === "object" ? artifact.codeRef : null;
      const range = sourceRangeFromUnknown(codeRef?.range) ?? sourceRangeFromUnknown(codeRef?.sourceRange) ?? sourceRangeFromUnknown(artifact.sourceRange);
      if (!range) {
        return [];
      }
      const side = diffSideFromArtifact(artifactId, artifactGraph, filenames);
      if (!side) {
        return [];
      }
      return [{ side, range }];
    }).sort((left, right) => {
      if (left.range[2] !== right.range[2]) {
        return left.range[2] - right.range[2];
      }
      if (left.range[0] !== right.range[0]) {
        return left.range[0] - right.range[0];
      }
      return left.range[1] - right.range[1];
    }).map((entry) => entry.side);
    if (sequence.length) {
      return sequence;
    }
    return operationsFromResult(result).flatMap((operation) => {
      if (operation.type !== "StdLibCall" || typeof operation.name !== "string" || !bodyOperationNames.has(operation.name)) {
        return [];
      }
      const range = sourceRangeFromUnknown(operation.sourceRange) ?? sourceRangeFromUnknown(operation.source_range);
      if (!range) {
        return [];
      }
      const filename = filenameForModuleId(filenames, range[2], null);
      const side = filename ? diffSideFromFilename(filename) : null;
      return side ? [side] : [];
    });
  };
  const replaceKclErrorDisplays = (entries) => {
    const normalized = normalizeKclErrorDisplays(entries);
    state.kclErrors = normalized.map(
      (entry) => entry.location ? `${entry.location}
${entry.message}` : entry.message
    );
    state.kclErrorLocations = normalizeKclErrorMessages(
      normalized.map((entry) => entry.location).filter(Boolean)
    );
  };
  const replaceKclErrors = (messages) => {
    replaceKclErrorDisplays(messages.map((message) => ({ message, location: "" })));
  };
  const snapshotViewRequest = (snapshotView) => JSON.stringify({
    type: "modeling_cmd_batch_req",
    requests: [
      {
        cmd: {
          type: "default_camera_look_at",
          center: { x: 0, y: 0, z: 0 },
          vantage: snapshotView.vantage,
          up: snapshotView.up
        },
        cmd_id: nextRequestId()
      },
      {
        cmd: {
          type: "zoom_to_fit",
          object_ids: [],
          padding: 0.1
        },
        cmd_id: nextRequestId()
      }
    ],
    batch_id: nextRequestId(),
    responses: true
  });
  const edgeVisibilityRequest = (visible) => JSON.stringify({
    type: "modeling_cmd_batch_req",
    requests: [
      {
        cmd: {
          type: "edge_lines_visible",
          hidden: !visible
        },
        cmd_id: nextRequestId()
      }
    ],
    batch_id: nextRequestId(),
    responses: true
  });
  const bodyIdsFromWebSocketResponse = (response) => {
    if (!response.success || !response.resp?.type) {
      return [];
    }
    if (response.resp.type === "modeling") {
      const modelingResponse = response.resp.data?.modeling_response;
      if (!response.request_id || !modelingResponse?.type || !bodyResponseTypes.has(modelingResponse.type)) {
        return [];
      }
      return [modelingResponse.data?.solid_id ?? response.request_id];
    }
    if (response.resp.type !== "modeling_batch") {
      return [];
    }
    return Object.entries(response.resp.data?.responses ?? {}).flatMap(([requestId, batchResponse]) => {
      const modelingResponse = "response" in batchResponse ? batchResponse.response : void 0;
      if (!modelingResponse?.type || !bodyResponseTypes.has(modelingResponse.type)) {
        return [];
      }
      return [modelingResponse.data?.solid_id ?? requestId];
    });
  };
  const cloneTransforms = (transforms) => transforms.map((transform) => ({
    ...transform,
    rotate_angle_axis: transform.rotate_angle_axis === null ? null : transform.rotate_angle_axis ? {
      ...transform.rotate_angle_axis,
      property: { ...transform.rotate_angle_axis.property }
    } : void 0,
    rotate_rpy: transform.rotate_rpy === null ? null : transform.rotate_rpy ? {
      ...transform.rotate_rpy,
      property: { ...transform.rotate_rpy.property }
    } : void 0,
    scale: transform.scale === null ? null : transform.scale ? {
      ...transform.scale,
      property: { ...transform.scale.property }
    } : void 0,
    translate: transform.translate === null ? null : transform.translate ? {
      ...transform.translate,
      property: { ...transform.translate.property }
    } : void 0
  }));
  const translationFromTransforms = (transforms) => transforms.reduce(
    (current, transform) => {
      if (!transform.translate) {
        return current;
      }
      return transform.translate.set ? {
        x: transform.translate.property.x,
        y: transform.translate.property.y,
        z: transform.translate.property.z
      } : {
        x: current.x + transform.translate.property.x,
        y: current.y + transform.translate.property.y,
        z: current.z + transform.translate.property.z
      };
    },
    { x: 0, y: 0, z: 0 }
  );
  const commandEntriesFromCommandData = (data) => {
    const request = typeof data === "string" ? (() => {
      if (!data.startsWith("{")) {
        return null;
      }
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    })() : data;
    const normalizedRequest = Array.isArray(request) && request.length === 1 ? request[0] : request;
    if (!normalizedRequest || typeof normalizedRequest !== "object") {
      if (typeof normalizedRequest === "string" && normalizedRequest.startsWith("{")) {
        try {
          return commandEntriesFromCommandData(JSON.parse(normalizedRequest));
        } catch {
          return [];
        }
      }
      return [];
    }
    const normalizeEntry = (entry) => {
      if (!entry || typeof entry !== "object") {
        return [];
      }
      if ("cmd" in entry && entry.cmd && typeof entry.cmd === "object") {
        return [
          {
            cmd_id: "cmd_id" in entry && typeof entry.cmd_id === "string" ? entry.cmd_id : void 0,
            cmd: entry.cmd
          }
        ];
      }
      if ("type" in entry && typeof entry.type === "string") {
        return [{ cmd: entry }];
      }
      return [];
    };
    return Array.isArray(normalizedRequest) ? normalizedRequest.flatMap(normalizeEntry) : "requests" in normalizedRequest && Array.isArray(normalizedRequest.requests) ? normalizedRequest.requests.flatMap(normalizeEntry) : normalizeEntry(normalizedRequest);
  };
  const materialEntryFromCommand = (cmd) => {
    const materialCommand = cmd;
    if (materialCommand.type !== "object_set_material_params_pbr" || !materialCommand.object_id) {
      return null;
    }
    return [
      materialCommand.object_id,
      {
        color: {
          r: materialCommand.color?.r ?? defaultMaterial.color.r,
          g: materialCommand.color?.g ?? defaultMaterial.color.g,
          b: materialCommand.color?.b ?? defaultMaterial.color.b,
          a: materialCommand.color?.a ?? defaultMaterial.color.a
        },
        metalness: materialCommand.metalness ?? defaultMaterial.metalness,
        roughness: materialCommand.roughness ?? defaultMaterial.roughness,
        ambient_occlusion: materialCommand.ambient_occlusion ?? defaultMaterial.ambient_occlusion
      }
    ];
  };
  const diffSideFromMarkerMaterial = (material) => {
    const closeEnough = (left, right) => Math.abs(left - right) < 1e-3;
    if (closeEnough(material.color.r, diffBaseMarkerColor.r) && closeEnough(material.color.g, diffBaseMarkerColor.g) && closeEnough(material.color.b, diffBaseMarkerColor.b)) {
      return "base";
    }
    if (closeEnough(material.color.r, diffCompareMarkerColor.r) && closeEnough(material.color.g, diffCompareMarkerColor.g) && closeEnough(material.color.b, diffCompareMarkerColor.b)) {
      return "compare";
    }
    return null;
  };
  const transformEntryFromCommand = (cmd) => {
    const transformCommand = cmd;
    if (transformCommand.type !== "set_object_transform" || !transformCommand.object_id || !Array.isArray(transformCommand.transforms)) {
      return null;
    }
    return [transformCommand.object_id, cloneTransforms(transformCommand.transforms)];
  };
  const syncSceneObjectMaterials = () => {
    if (!state.solidObjectIds.length) {
      state.materialByObjectId = {};
      return;
    }
    const next = {};
    for (const objectId of state.solidObjectIds) {
      const material = state.pendingMaterialByObjectId[objectId] ?? state.materialByObjectId[objectId];
      if (material) {
        next[objectId] = material;
      }
    }
    state.bodyArtifactIds.forEach((bodyId, index) => {
      const objectId = state.solidObjectIds[index];
      const material = state.pendingMaterialByObjectId[bodyId] ?? state.materialByObjectId[bodyId];
      if (!objectId || !material || next[objectId]) {
        return;
      }
      next[objectId] = material;
    });
    state.materialByObjectId = next;
  };
  const syncSceneObjectTransforms = () => {
    if (!state.solidObjectIds.length) {
      state.transformByObjectId = {};
      return;
    }
    const next = {};
    for (const objectId of state.solidObjectIds) {
      const transforms = state.pendingTransformByObjectId[objectId] ?? state.transformByObjectId[objectId];
      if (transforms) {
        next[objectId] = cloneTransforms(transforms);
      }
    }
    state.bodyArtifactIds.forEach((bodyId, index) => {
      const objectId = state.solidObjectIds[index];
      const transforms = state.pendingTransformByObjectId[bodyId] ?? state.transformByObjectId[bodyId];
      if (!objectId || !transforms || next[objectId]) {
        return;
      }
      next[objectId] = cloneTransforms(transforms);
    });
    state.transformByObjectId = next;
  };
  const sendMaterialBatch = (materials) => {
    if (!state.webView?.rtc?.send) {
      return;
    }
    const objectIds = Object.keys(materials);
    if (!objectIds.length) {
      return;
    }
    state.webView.rtc.send(
      JSON.stringify({
        type: "modeling_cmd_batch_req",
        batch_id: nextRequestId(),
        responses: true,
        requests: [
          {
            cmd_id: nextRequestId(),
            cmd: {
              type: "set_order_independent_transparency",
              enabled: objectIds.some(
                (objectId) => (materials[objectId]?.color.a ?? defaultMaterial.color.a) < 1
              )
            }
          },
          ...objectIds.map((object_id) => {
            const material = materials[object_id];
            const cmd_id = nextRequestId();
            state.ignoredOutgoingCommandIds.add(cmd_id);
            return {
              cmd_id,
              cmd: {
                type: "object_set_material_params_pbr",
                object_id,
                color: material.color,
                metalness: material.metalness,
                roughness: material.roughness,
                ambient_occlusion: material.ambient_occlusion
              }
            };
          })
        ]
      })
    );
  };
  const enforceDiffEdgeVisibility = () => {
    if (!state.diffEnabled || !state.webView?.rtc?.send) {
      return;
    }
    state.webView.rtc.send(edgeVisibilityRequest(false));
  };
  const applyDiffAppearance = () => {
    if (!state.diffEnabled) {
      return;
    }
    enforceDiffEdgeVisibility();
    const olderMaterial = {
      color: { r: 0.92, g: 0.33, b: 0.41, a: 0.18 },
      metalness: 0,
      roughness: 0.08,
      ambient_occlusion: 0
    };
    const newerMaterial = {
      color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
      metalness: 0,
      roughness: 0.08,
      ambient_occlusion: 0
    };
    const comparingAgainstOriginal = state.diffCompareSource?.kind === "snapshot";
    const baseMaterial = comparingAgainstOriginal ? newerMaterial : olderMaterial;
    const compareMaterial = comparingAgainstOriginal ? olderMaterial : newerMaterial;
    if (!state.diffCompareSource) {
      if (!state.solidObjectIds.length) {
        return;
      }
      sendMaterialBatch(
        Object.fromEntries(state.solidObjectIds.map((objectId) => [objectId, baseMaterial]))
      );
      return;
    }
    if (!Object.keys(state.diffObjectOwnershipById).length) {
      return;
    }
    const targetObjectIds = state.solidObjectIds.length ? state.solidObjectIds : Object.keys(state.diffObjectOwnershipById);
    sendMaterialBatch(
      Object.fromEntries(
        targetObjectIds.map((objectId) => [
          objectId,
          state.diffObjectOwnershipById[objectId] === "compare" ? compareMaterial : baseMaterial
        ])
      )
    );
  };
  const applyXrayAppearance = () => {
    if (state.diffEnabled) {
      return;
    }
    if (!state.webView?.rtc?.send || !state.solidObjectIds.length) {
      return;
    }
    const orderIndependentTransparencyEnabled = state.xrayVisible || state.solidObjectIds.some(
      (objectId) => (state.materialByObjectId[objectId]?.color.a ?? defaultMaterial.color.a) < 1
    );
    state.webView.rtc.send(
      JSON.stringify({
        type: "modeling_cmd_batch_req",
        batch_id: nextRequestId(),
        responses: true,
        requests: [
          {
            cmd_id: nextRequestId(),
            cmd: {
              type: "set_order_independent_transparency",
              enabled: orderIndependentTransparencyEnabled
            }
          },
          ...state.solidObjectIds.map((object_id) => {
            const material = state.materialByObjectId[object_id] ?? defaultMaterial;
            const cmd_id = nextRequestId();
            state.ignoredOutgoingCommandIds.add(cmd_id);
            return {
              cmd_id,
              cmd: {
                type: "object_set_material_params_pbr",
                object_id,
                color: {
                  r: material.color.r,
                  g: material.color.g,
                  b: material.color.b,
                  a: state.xrayVisible ? xrayOpacity : material.color.a
                },
                metalness: material.metalness,
                roughness: material.roughness,
                ambient_occlusion: material.ambient_occlusion
              }
            };
          })
        ]
      })
    );
  };
  const fillDiffOwnershipFromAnchors = (ownership, orderedObjectIds) => {
    if (!orderedObjectIds.length) {
      return ownership;
    }
    const anchors = orderedObjectIds.flatMap((objectId, index) => {
      const material = state.pendingMaterialByObjectId[objectId];
      const side = material ? diffSideFromMarkerMaterial(material) : null;
      return side ? [{ index, side }] : [];
    });
    if (!anchors.length) {
      return ownership;
    }
    const next = { ...ownership };
    const firstAnchor = anchors[0];
    if (firstAnchor.side === "base") {
      for (let index = 0; index < firstAnchor.index; index += 1) {
        const objectId = orderedObjectIds[index];
        next[objectId] = "base";
      }
    }
    for (let anchorIndex = 0; anchorIndex < anchors.length; anchorIndex += 1) {
      const anchor = anchors[anchorIndex];
      const nextAnchor = anchors[anchorIndex + 1];
      const endIndex = nextAnchor ? nextAnchor.index : orderedObjectIds.length;
      for (let index = anchor.index; index < endIndex; index += 1) {
        const objectId = orderedObjectIds[index];
        next[objectId] = anchor.side;
      }
    }
    return next;
  };
  const fillDiffOwnership = (ownership) => {
    let next = ownership;
    if (state.solidObjectIds.length) {
      next = fillDiffOwnershipFromAnchors(next, state.solidObjectIds);
    }
    next = fillDiffOwnershipFromAnchors(next, [...new Set(state.seenObjectIdsInSendOrder)]);
    return next;
  };
  const syncDiffObjectOwnership = async () => {
    if (!state.diffEnabled || !state.executor) {
      state.diffObjectOwnershipById = {};
      return;
    }
    const next = { ...state.diffObjectOwnershipById };
    if (state.diffBodyOwnershipSequence.length) {
      state.diffBodyOwnershipSequence.forEach((side, index) => {
        const sentObjectId = state.seenObjectIdsInSendOrder[index];
        if (sentObjectId && !next[sentObjectId]) {
          next[sentObjectId] = side;
        }
        const objectId = state.solidObjectIds[index];
        if (objectId && !next[objectId]) {
          next[objectId] = side;
        }
      });
    }
    const bodyOwnershipEntries = Object.entries(state.diffBodyOwnershipByArtifactId);
    if (!bodyOwnershipEntries.length) {
      const filledOwnership2 = fillDiffOwnership(next);
      state.diffObjectOwnershipById = filledOwnership2;
      if (Object.keys(filledOwnership2).length) {
        applyDiffAppearance();
        queueSnapshotRefresh();
        render();
        return;
      }
      state.diffObjectOwnershipById = {};
      return;
    }
    const unresolved = /* @__PURE__ */ new Set();
    const solidIndexById = new Map(state.solidObjectIds.map((objectId, index) => [objectId, index]));
    for (const [artifactId, side] of bodyOwnershipEntries) {
      if (solidIndexById.has(artifactId)) {
        next[artifactId] = side;
        continue;
      }
      unresolved.add(artifactId);
    }
    state.bodyArtifactIds.forEach((artifactId, index) => {
      const side = state.diffBodyOwnershipByArtifactId[artifactId];
      const objectId = state.solidObjectIds[index];
      if (!side || !objectId || next[objectId]) {
        return;
      }
      next[objectId] = side;
      unresolved.delete(artifactId);
    });
    await Promise.all(
      [...unresolved].map(async (artifactId) => {
        const side = state.diffBodyOwnershipByArtifactId[artifactId];
        if (!side) {
          return;
        }
        try {
          const response = await requestModelingResponse({
            type: "entity_get_parent_id",
            entity_id: artifactId
          });
          if (!response.success || response.resp?.type !== "modeling" || response.resp.data?.modeling_response?.type !== "entity_get_parent_id") {
            return;
          }
          const objectId = response.resp.data.modeling_response.data?.entity_id;
          if (objectId) {
            next[objectId] = side;
          }
        } catch {
        }
      })
    );
    const filledOwnership = fillDiffOwnership(next);
    state.diffObjectOwnershipById = filledOwnership;
    if (Object.keys(filledOwnership).length) {
      applyDiffAppearance();
      queueSnapshotRefresh();
      render();
    }
  };
  const applyExplodedView = () => {
    if (!state.webView?.rtc?.send || !state.solidObjectIds.length) {
      return;
    }
    const orderedObjectIds = [
      .../* @__PURE__ */ new Set([
        ...state.bodyArtifactIds.map((_bodyId, index) => state.solidObjectIds[index]).filter((objectId) => Boolean(objectId)),
        ...state.solidObjectIds
      ])
    ];
    if (!orderedObjectIds.length) {
      return;
    }
    const radialBasePositions = orderedObjectIds.map(
      (object_id) => translationFromTransforms(state.transformByObjectId[object_id] ?? [])
    );
    const gridAnchorPosition = radialBasePositions[0] ?? { x: 0, y: 0, z: 0 };
    const radialCenter = state.explodeMode === "radial" ? radialBasePositions.reduce(
      (center, position) => ({
        x: center.x + position.x / orderedObjectIds.length,
        y: center.y + position.y / orderedObjectIds.length,
        z: 0
      }),
      { x: 0, y: 0, z: 0 }
    ) : { x: 0, y: 0, z: 0 };
    const rawOffsets = orderedObjectIds.map((object_id, index) => {
      const distance = state.explodeSpacing * (index + 1);
      if (state.explodeMode === "vertical") {
        return { x: 0, y: 0, z: -distance };
      }
      if (state.explodeMode === "horizontal") {
        return { x: distance, y: 0, z: 0 };
      }
      if (state.explodeMode === "radial") {
        const position = radialBasePositions[index];
        const directionX = position.x - radialCenter.x;
        const directionY = position.y - radialCenter.y;
        const length = Math.hypot(directionX, directionY);
        const angle = length > 1e-4 ? Math.atan2(directionY, directionX) : Math.PI * 2 * index / Math.max(1, orderedObjectIds.length);
        return {
          x: Math.cos(angle) * state.explodeSpacing,
          y: Math.sin(angle) * state.explodeSpacing,
          z: 0
        };
      }
      if (state.explodeMode === "grid") {
        const spacing = state.explodeSpacing * gridSpacingMultiplier;
        const columns = Math.ceil(Math.sqrt(orderedObjectIds.length));
        const rows = Math.ceil(orderedObjectIds.length / columns);
        const baseRowCount = Math.floor(orderedObjectIds.length / rows);
        const remainder = orderedObjectIds.length % rows;
        const rowCounts = Array.from(
          { length: rows },
          (_value, rowIndex) => baseRowCount + (rowIndex < remainder ? 1 : 0)
        );
        let row = 0;
        let rowStartIndex = 0;
        for (; row < rowCounts.length; row += 1) {
          const rowCount = rowCounts[row];
          if (index < rowStartIndex + rowCount) {
            const column = index - rowStartIndex;
            return {
              x: gridAnchorPosition.x + column * spacing,
              y: gridAnchorPosition.y + row * spacing,
              z: 0
            };
          }
          rowStartIndex += rowCount;
        }
        return {
          x: 0,
          y: 0,
          z: 0
        };
      }
      return { x: 0, y: 0, z: 0 };
    });
    const offsetCenter = rawOffsets.reduce(
      (center, offset) => ({
        x: center.x + offset.x / orderedObjectIds.length,
        y: center.y + offset.y / orderedObjectIds.length,
        z: center.z + offset.z / orderedObjectIds.length
      }),
      { x: 0, y: 0, z: 0 }
    );
    const centeredOffsets = state.explodeMode === "grid" ? rawOffsets : rawOffsets.map((offset) => ({
      x: normalizeOffset(offset.x - offsetCenter.x),
      y: normalizeOffset(offset.y - offsetCenter.y),
      z: normalizeOffset(offset.z - offsetCenter.z)
    }));
    const targetOffsetsByObjectId = Object.fromEntries(
      orderedObjectIds.map((object_id, index) => {
        const centeredOffset = centeredOffsets[index];
        if (state.explodeMode !== "grid") {
          return [object_id, state.explodeMode ? centeredOffset : { x: 0, y: 0, z: 0 }];
        }
        const basePosition = translationFromTransforms(state.transformByObjectId[object_id] ?? []);
        return [
          object_id,
          {
            x: normalizeOffset(centeredOffset.x - basePosition.x),
            y: normalizeOffset(centeredOffset.y - basePosition.y),
            z: normalizeOffset(centeredOffset.z - basePosition.z)
          }
        ];
      })
    );
    const requests = orderedObjectIds.flatMap((object_id, index) => {
      const targetOffset = targetOffsetsByObjectId[object_id];
      const currentOffset = state.explodeOffsetByObjectId[object_id] ?? { x: 0, y: 0, z: 0 };
      const deltaOffset = {
        x: normalizeOffset(targetOffset.x - currentOffset.x),
        y: normalizeOffset(targetOffset.y - currentOffset.y),
        z: normalizeOffset(targetOffset.z - currentOffset.z)
      };
      if (!deltaOffset.x && !deltaOffset.y && !deltaOffset.z) {
        return [];
      }
      const cmd_id = nextRequestId();
      state.ignoredOutgoingCommandIds.add(cmd_id);
      return [
        {
          cmd_id,
          cmd: {
            type: "set_object_transform",
            object_id,
            transforms: [
              {
                translate: {
                  origin: { type: "local" },
                  property: deltaOffset,
                  set: false
                },
                rotate_rpy: null,
                rotate_angle_axis: null,
                scale: null
              }
            ]
          }
        }
      ];
    });
    state.explodeOffsetByObjectId = targetOffsetsByObjectId;
    if (!requests.length) {
      return;
    }
    state.webView.rtc.send(
      JSON.stringify({
        type: "modeling_cmd_batch_req",
        batch_id: nextRequestId(),
        responses: true,
        requests
      })
    );
  };
  const executeInput = async (input) => {
    if (!state.originalSourceInput && state.source && !state.diffEnabled) {
      state.originalSourceInput = cloneExecutionInput(input);
    }
    state.bodyArtifactIds = [];
    state.pendingBodyArtifactIds = [];
    state.materialByObjectId = {};
    state.pendingMaterialByObjectId = {};
    state.seenObjectIdsInSendOrder = [];
    state.transformByObjectId = {};
    state.pendingTransformByObjectId = {};
    state.explodeOffsetByObjectId = {};
    state.solidObjectIds = [];
    state.pendingZoomToEntityRequestId = "";
    state.pendingSolidObjectIdsRequestId = "";
    state.ignoredOutgoingCommandIds.clear();
    state.executorValues = null;
    if (!state.diffEnabled || !state.diffCompareSource) {
      state.diffBodyOwnershipByArtifactId = {};
      state.diffBodyOwnershipSequence = [];
      state.diffObjectOwnershipById = {};
      state.seenObjectIdsInSendOrder = [];
    }
    replaceKclErrors([]);
    try {
      const result = await state.executor.submit(
        input,
        (state.source?.kind === "file" || state.source?.kind === "browser-file") && !state.diffEnabled ? { mainKclPathName: mainKclPathNameForSource(state.source.label) } : void 0
      );
      state.executorValues = executorValuesFromResult(result);
      const errorDisplays = kclErrorDisplaysFromExecutorResult(result, input, state.source);
      replaceKclErrorDisplays(errorDisplays);
      if (errorDisplays.length) {
        await appendErrorsLog(state.kclErrors);
        render();
        return result;
      }
      state.bodyArtifactIds = [...new Set(state.pendingBodyArtifactIds)];
      state.webView?.rtc?.send?.(zoomToFitRequest());
      const cmdId = nextRequestId();
      state.pendingSolidObjectIdsRequestId = cmdId;
      state.webView?.rtc?.send?.(
        JSON.stringify({
          type: "modeling_cmd_req",
          cmd_id: cmdId,
          cmd: {
            type: "scene_get_entity_ids",
            filter: ["solid3d"],
            skip: 0,
            take: 1e3
          }
        })
      );
      if (state.diffEnabled && state.diffCompareSource) {
        state.diffBodyOwnershipByArtifactId = diffBodyOwnershipByArtifactIdFromResult(result);
        state.diffBodyOwnershipSequence = diffBodyOwnershipSequenceFromResult(result);
        await syncDiffObjectOwnership();
      }
      return result;
    } catch (error) {
      state.executorValues = null;
      const errorMessages = kclErrorMessagesFromUnknown(error);
      replaceKclErrors(errorMessages.length ? errorMessages : ["Unable to render KCL."]);
      await appendErrorsLog(state.kclErrors);
      render();
      return void 0;
    }
  };
  const client = deps.createClient(usesZooCookieAuth ? "" : state.token);
  let webView;
  let startButton;
  let picker;
  let directoryButton;
  let fileButton;
  let clipboardButton;
  let regularFileInput;
  let regularDirectoryInput;
  let browserBanner;
  let scenePointerDown = null;
  const pendingModelingResponses = /* @__PURE__ */ new Map();
  let snapshotRefreshTimer = 0;
  let snapshotRefreshInFlight = false;
  let snapshotRefreshQueued = false;
  const elements = {
    get startButton() {
      return startButton;
    },
    tokenInput,
    get browserBanner() {
      return browserBanner;
    },
    snapshotRail,
    snapshotCards,
    snapshotImages,
    kclError,
    kclErrorLabel,
    kclErrorText,
    sourceValue,
    statusValue,
    edgesButton,
    xrayButton,
    diffButton,
    diffOriginalButton,
    diffDirectoryButton,
    diffFileButton,
    diffClipboardButton,
    explodeButton,
    explodeHorizontalButton,
    explodeVerticalButton,
    explodeRadialButton,
    explodeGridButton,
    explodeSpacingInput,
    disconnectButton,
    get picker() {
      return picker;
    },
    get fileButton() {
      return fileButton;
    },
    get directoryButton() {
      return directoryButton;
    },
    get clipboardButton() {
      return clipboardButton;
    },
    viewer
  };
  const render = () => {
    const status = deps.document.hidden ? "paused" : state.execution ? "rendering" : state.executor ? "connected" : state.source ? "connecting" : "idle";
    const launcherVisible = !state.source && !state.executor && !state.execution;
    if (!launcherVisible && startButton?.isConnected) {
      const stageRect = viewerStage.getBoundingClientRect();
      const startRect = startButton.getBoundingClientRect();
      const gapPx = Number.parseFloat(globalThis.getComputedStyle(root2).fontSize || "16") || 16;
      const topPx = Math.max(0, startRect.top - stageRect.top + startRect.height + gapPx);
      viewerUiLeft.style.top = `${topPx}px`;
      viewerConnection.style.top = `${topPx}px`;
    } else {
      viewerUiLeft.style.top = "";
      viewerConnection.style.top = "";
    }
    const shouldShowDisconnectBanner = Boolean(state.disconnectMessage) && launcherVisible;
    browserBanner.hidden = !shouldShowDisconnectBanner && (isSupportedBrowser || !launcherVisible);
    browserBanner.dataset.bannerType = shouldShowDisconnectBanner ? "disconnect" : "browser";
    browserBanner.innerHTML = shouldShowDisconnectBanner ? disconnectBannerMarkup(state.disconnectMessage) : browserBannerMarkup;
    tokenInput.hidden = usesZooCookieAuth;
    tokenInput.value = state.token ? `${state.token.slice(0, 8)}${"*".repeat(Math.max(0, state.token.length - 8))}` : "";
    kclError.hidden = state.kclErrors.length === 0;
    kclErrorLabel.textContent = state.kclErrors.length > 1 ? `KCL errors (${state.kclErrors.length})` : "KCL error";
    kclErrorText.textContent = state.kclErrors.join("\n\n");
    kclError.dataset.copyable = state.kclErrorLocations.length ? "true" : "false";
    kclError.title = state.kclErrorLocations.length ? "Click to copy file location" : "";
    snapshotRail.hidden = false;
    snapshotViews.forEach(({ key, label }) => {
      const url = state.snapshotUrls[key];
      const image = snapshotImages[key];
      const empty = snapshotEmptyStates[key];
      const card = snapshotCards[key];
      card.dataset.active = state.executor ? "true" : "false";
      card.title = state.executor ? `${label} view` : `${label} snapshot`;
      card.setAttribute("aria-label", state.executor ? `${label} view` : `${label} snapshot`);
      image.hidden = !url;
      if (url) {
        image.src = url;
      } else {
        image.removeAttribute("src");
      }
      image.title = `${label} snapshot`;
      empty.hidden = Boolean(url);
      empty.textContent = state.snapshotRefreshing ? "Updating\u2026" : state.source ? "No snapshot" : "Load a model";
    });
    sourceValue.textContent = state.diffCompareSource ? state.diffCompareSource.kind === "snapshot" ? state.source?.label ?? "No source" : `${state.source?.label ?? "No source"} vs ${state.diffCompareSource.label}` : state.source?.label ?? "No source";
    sourceValue.hidden = launcherVisible;
    statusValue.hidden = launcherVisible;
    statusValue.dataset.status = status;
    statusValue.title = `Connection: ${status}`;
    statusValue.setAttribute("aria-label", `Connection status: ${status}`);
    statusValue.innerHTML = status === "connected" ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5 8 14.5 16 5.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>' : status === "rendering" ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.5a6.5 6.5 0 1 1-4.6 1.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/><path d="M5.4 2.8v3.6H9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>' : status === "connecting" ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 7.5a9 9 0 0 1 13 0M6.5 10.5a4.8 4.8 0 0 1 7 0M10 14.2h.01" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"/></svg>' : status === "paused" ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4.5v11M13 4.5v11" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-dasharray="2.2 3" stroke-linecap="round" stroke-width="1.6"/></svg>';
    edgesButton.hidden = status !== "connected";
    edgesButton.dataset.active = state.edgeLinesVisible ? "true" : "false";
    edgesButton.title = state.edgeLinesVisible ? "Hide edges" : "Show edges";
    edgesButton.setAttribute(
      "aria-label",
      state.edgeLinesVisible ? "Hide edges" : "Show edges"
    );
    edgesButton.innerHTML = state.edgeLinesVisible ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.2 6.8h6.2V13H5.2zM8.3 3.9h6.2v6.2H8.3zM5.2 6.8 8.3 3.9M11.4 6.8l3.1-2.9M11.4 13l3.1-2.9M5.2 13l3.1-2.9" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.4"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.2 6.8h6.2V13H5.2zM8.3 3.9h6.2v6.2H8.3zM5.2 6.8 8.3 3.9M11.4 6.8l3.1-2.9M11.4 13l3.1-2.9M5.2 13l3.1-2.9M4.2 15.8 15.8 4.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/></svg>';
    xrayButton.hidden = status !== "connected" || state.diffEnabled;
    xrayButton.dataset.active = state.xrayVisible ? "true" : "false";
    xrayButton.title = state.xrayVisible ? "Disable xray" : "Enable xray";
    xrayButton.setAttribute("aria-label", state.xrayVisible ? "Disable xray" : "Enable xray");
    xrayButton.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.2c-3.3 0-5.7 2.3-5.7 5.4 0 1.8.7 3.2 1.9 4.1v1.7c0 .7.5 1.2 1.2 1.2h1v1.1c0 .3.2.5.5.5h1.1v-1.6h.1v1.6h1.1c.3 0 .5-.2.5-.5v-1.1h1c.7 0 1.2-.5 1.2-1.2V12.7c1.2-.9 1.9-2.3 1.9-4.1 0-3.1-2.4-5.4-5.7-5.4Z" fill="currentColor"/><circle cx="7.9" cy="8.7" r="1.35" fill="#080d09"/><circle cx="12.1" cy="8.7" r="1.35" fill="#080d09"/><path d="M9.2 11.4 10 10.2l.8 1.2Z" fill="#080d09"/><path d="M7.8 13h4.4" fill="none" stroke="#080d09" stroke-linecap="round" stroke-width="1.2"/><path d="M8.6 13.1v2.1M10 13.1v2.1M11.4 13.1v2.1" fill="none" stroke="#080d09" stroke-linecap="round" stroke-width="1"/></svg>';
    diffButton.hidden = status !== "connected";
    diffButton.dataset.active = state.diffEnabled ? "true" : "false";
    diffButton.title = state.diffEnabled ? "Exit diff mode" : "Enter diff mode";
    diffButton.setAttribute("aria-label", diffButton.title);
    diffButton.innerHTML = state.diffEnabled ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="5.2" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="5.2" cy="15" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="14.8" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M7.2 6.1 12.8 8.9M7.2 13.9 12.8 11.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/></svg>';
    diffOriginalButton.hidden = status !== "connected" || !state.diffEnabled || Boolean(state.diffCompareSource) || state.source?.kind === "clipboard" || !state.originalSourceInput;
    diffOriginalButton.dataset.active = "false";
    diffOriginalButton.title = state.source?.kind === "directory" ? "Compare project against original" : "Compare against original";
    diffOriginalButton.setAttribute("aria-label", diffOriginalButton.title);
    diffDirectoryButton.hidden = status !== "connected" || !state.diffEnabled || Boolean(state.diffCompareSource);
    diffDirectoryButton.dataset.active = "false";
    diffDirectoryButton.title = "Load project";
    diffFileButton.hidden = status !== "connected" || !state.diffEnabled || Boolean(state.diffCompareSource);
    diffFileButton.dataset.active = "false";
    diffFileButton.title = "Load KCL file";
    diffClipboardButton.hidden = status !== "connected" || !state.diffEnabled || Boolean(state.diffCompareSource);
    diffClipboardButton.dataset.active = "false";
    diffClipboardButton.title = "Use clipboard contents";
    explodeButton.hidden = status !== "connected";
    explodeButton.dataset.active = state.explodeMenuVisible || Boolean(state.explodeMode) ? "true" : "false";
    explodeButton.title = state.explodeMenuVisible ? "Close explode modes" : "Open explode modes";
    explodeButton.setAttribute("aria-label", explodeButton.title);
    explodeButton.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 6.4 10 4.2l5.5 2.2L10 8.6ZM4.5 10 10 7.8l5.5 2.2L10 12.2ZM4.5 13.6 10 11.4l5.5 2.2L10 15.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.4"/></svg>';
    explodeHorizontalButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeHorizontalButton.dataset.active = state.explodeMode === "horizontal" ? "true" : "false";
    explodeHorizontalButton.title = "Horizontal explode";
    explodeVerticalButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeVerticalButton.dataset.active = state.explodeMode === "vertical" ? "true" : "false";
    explodeVerticalButton.title = "Vertical explode";
    explodeRadialButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeRadialButton.dataset.active = state.explodeMode === "radial" ? "true" : "false";
    explodeRadialButton.title = "Radial explode";
    explodeGridButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeGridButton.dataset.active = state.explodeMode === "grid" ? "true" : "false";
    explodeGridButton.title = "Grid explode";
    explodeSpacingInput.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeSpacingInput.value = `${state.explodeSpacing}`;
    explodeSpacingInput.title = `Explode spacing: ${state.explodeSpacing}`;
    disconnectButton.hidden = status !== "connected";
    disconnectButton.title = "Disconnect";
    disconnectButton.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';
    startButton.style.width = launcherVisible ? `${Math.min(224, Math.floor(size.width * 0.4))}px` : "3.5rem";
    startButton.style.textAlign = launcherVisible ? "center" : "right";
    startButton.title = state.token || usesZooCookieAuth ? "Choose source" : "Set API token";
    picker.style.opacity = launcherVisible ? "1" : "0";
    picker.style.pointerEvents = launcherVisible ? "auto" : "none";
  };
  const handleAuthenticationFailure = () => {
    resetToLauncherState("Authentication failed. Paste a valid Zoo API token to reconnect.");
  };
  const requestModelingResponse = (cmd) => new Promise((resolve, reject) => {
    if (!state.webView?.rtc?.send) {
      reject(new Error("Missing rtc"));
      return;
    }
    const cmd_id = nextRequestId();
    pendingModelingResponses.set(cmd_id, resolve);
    state.webView.rtc.send(
      JSON.stringify({
        type: "modeling_cmd_req",
        cmd_id,
        cmd
      })
    );
  });
  const clearSnapshotRefresh = () => {
    if (snapshotRefreshTimer) {
      deps.clearTimeout(snapshotRefreshTimer);
      snapshotRefreshTimer = 0;
    }
    snapshotRefreshQueued = false;
  };
  const refreshSnapshots = async () => {
    if (!state.executor || !state.source) {
      state.snapshotRefreshing = false;
      clearSnapshotUrls();
      render();
      return;
    }
    state.snapshotRefreshing = true;
    render();
    let savedView = null;
    const viewerVideo = state.webView?.el.querySelector("video");
    const snapshotFrame = snapshotImages.top.parentElement;
    const measuredSnapshotFrame = snapshotFrame ? deps.measure(snapshotFrame) : { width: 0, height: 0 };
    const snapshotStreamSize = measuredSnapshotFrame.width >= 4 && measuredSnapshotFrame.height >= 4 ? streamSize(measuredSnapshotFrame.width, measuredSnapshotFrame.height) : streamSize(Math.max(160, size.width * 0.24), Math.max(220, size.height * 0.56));
    const measuredViewer = deps.measure(viewer);
    const viewerStreamSize = measuredViewer.width >= 4 && measuredViewer.height >= 4 ? streamSize(measuredViewer.width, measuredViewer.height) : streamSize(size.width, size.height);
    try {
      viewerVideo?.pause();
      const viewResponse = await requestModelingResponse({ type: "default_camera_get_view" });
      if (viewResponse.success && viewResponse.resp?.type === "modeling" && viewResponse.resp.data?.modeling_response?.type === "default_camera_get_view") {
        savedView = viewResponse.resp.data.modeling_response.data?.view ?? null;
      }
      await requestModelingResponse({
        type: "reconfigure_stream",
        width: snapshotStreamSize.width,
        height: snapshotStreamSize.height,
        fps: 30
      });
      const nextSnapshotUrls = {
        top: "",
        profile: "",
        front: ""
      };
      for (const snapshotView of snapshotViews) {
        viewerVideo?.pause();
        await requestModelingResponse({
          type: "default_camera_look_at",
          center: { x: 0, y: 0, z: 0 },
          vantage: snapshotView.vantage,
          up: snapshotView.up
        });
        await requestModelingResponse({
          type: "zoom_to_fit",
          object_ids: [],
          padding: -0.1
        });
        const snapshotResponse = await requestModelingResponse({
          type: "take_snapshot",
          format: "png"
        });
        nextSnapshotUrls[snapshotView.key] = snapshotResponse.success && snapshotResponse.resp?.type === "modeling" && snapshotResponse.resp.data?.modeling_response?.type === "take_snapshot" ? snapshotUrlFromContents(
          snapshotResponse.resp.data.modeling_response.data?.contents
        ) : "";
      }
      state.snapshotUrls = nextSnapshotUrls;
    } finally {
      if (savedView) {
        try {
          await requestModelingResponse({
            type: "default_camera_set_view",
            view: savedView
          });
        } catch {
        }
      }
      try {
        await requestModelingResponse({
          type: "reconfigure_stream",
          width: viewerStreamSize.width,
          height: viewerStreamSize.height,
          fps: 30
        });
      } catch {
      }
      if (viewerVideo) {
        try {
          const playback = viewerVideo.play();
          if (playback && typeof playback.catch === "function") {
            void playback.catch(() => {
            });
          }
        } catch {
        }
      }
      state.snapshotRefreshing = false;
      render();
    }
  };
  const queueSnapshotRefresh = (delay = 150) => {
    if (!state.executor || !state.source) {
      clearSnapshotRefresh();
      state.snapshotRefreshing = false;
      clearSnapshotUrls();
      render();
      return;
    }
    clearSnapshotRefresh();
    snapshotRefreshTimer = deps.setTimeout(() => {
      snapshotRefreshTimer = 0;
      if (snapshotRefreshInFlight) {
        snapshotRefreshQueued = true;
        return;
      }
      snapshotRefreshInFlight = true;
      void refreshSnapshots().finally(() => {
        snapshotRefreshInFlight = false;
        if (snapshotRefreshQueued) {
          snapshotRefreshQueued = false;
          queueSnapshotRefresh(150);
        }
      });
    }, delay);
  };
  const clearPoller = () => {
    if (state.pollTimer) {
      deps.clearTimeout(state.pollTimer);
      state.pollTimer = 0;
    }
    render();
  };
  const clearWebSocketPoller = () => {
    if (state.websocketPollTimer) {
      deps.clearTimeout(state.websocketPollTimer);
      state.websocketPollTimer = 0;
    }
  };
  const stopBackgroundPollers = () => {
    clearPoller();
    clearWebSocketPoller();
  };
  const getDirectoryFileHandle = async (handle, name, create = false) => {
    const nextGetFileHandle = handle.getFileHandle;
    if (!nextGetFileHandle) {
      return null;
    }
    return nextGetFileHandle.call(handle, name, create ? { create: true } : void 0);
  };
  const writeDirectoryFile = async (handle, name, data) => {
    const fileHandle = await getDirectoryFileHandle(handle, name, true);
    if (!fileHandle) {
      return 0;
    }
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
    return (await fileHandle.getFile()).lastModified;
  };
  const appendDirectoryTextFile = async (handle, name, text) => {
    const fileHandle = await getDirectoryFileHandle(handle, name);
    if (!fileHandle) {
      return false;
    }
    const file = await fileHandle.getFile();
    const writable = await fileHandle.createWritable();
    await writable.write({
      type: "write",
      position: file.size,
      data: text
    });
    await writable.close();
    return true;
  };
  const appendErrorsLog = async (messages) => {
    if (state.source?.kind !== "directory" || !messages.length) {
      return;
    }
    await appendDirectoryTextFile(
      state.source.handle,
      errorsLogFilename,
      `${messages.join("\n\n")}
`
    );
  };
  const websocketPipeData = (value) => {
    if (typeof value === "string") {
      return value;
    }
    if (value == null) {
      return "";
    }
    if (value instanceof Blob || value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
      return value;
    }
    if (typeof value === "object" && value) {
      const record = value;
      if (record.data instanceof Blob || record.data instanceof ArrayBuffer || ArrayBuffer.isView(record.data)) {
        return record.data;
      }
      if (record.payload && typeof record.payload === "object" && record.payload.data !== void 0) {
        const payloadData = record.payload.data;
        if (payloadData instanceof Blob || payloadData instanceof ArrayBuffer || ArrayBuffer.isView(payloadData)) {
          return payloadData;
        }
      }
    }
    if (value instanceof Error) {
      return JSON.stringify({
        name: value.name,
        message: value.message,
        stack: value.stack
      });
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };
  const writeWebSocketPipe = async (handle, value) => {
    const output = websocketPipeData(value);
    if (output == null) {
      return;
    }
    state.websocketPipeModified = await writeDirectoryFile(handle, websocketPipeFilename, output);
  };
  const scheduleWebSocketPoll = (delay = 1e3) => {
    if (state.source?.kind !== "directory" || !state.executor || !state.webView?.rtc?.send || deps.document.hidden) {
      clearWebSocketPoller();
      return;
    }
    clearWebSocketPoller();
    state.websocketPollTimer = deps.setTimeout(async () => {
      state.websocketPollTimer = 0;
      if (state.source?.kind !== "directory" || !state.executor || !state.webView?.rtc?.send || deps.document.hidden) {
        return;
      }
      if (state.execution) {
        scheduleWebSocketPoll(1e3);
        return;
      }
      let pipeHandle = null;
      try {
        pipeHandle = await getDirectoryFileHandle(
          state.source.handle,
          websocketPipeFilename
        );
      } catch (error) {
        if (!(error instanceof DOMException) || error.name !== "NotFoundError") {
          throw error;
        }
      }
      if (!pipeHandle) {
        scheduleWebSocketPoll(1e3);
        return;
      }
      const pipeFile = await pipeHandle.getFile();
      if (pipeFile.lastModified === state.websocketPipeModified) {
        scheduleWebSocketPoll(1e3);
        return;
      }
      const input = await pipeFile.text();
      if (input.trim()) {
        try {
          await writeWebSocketPipe(
            state.source.handle,
            await state.webView.rtc.send(input)
          );
        } catch (error) {
          const errorMessages = kclErrorMessagesFromUnknown(error);
          await appendErrorsLog(errorMessages.length ? errorMessages : [String(error)]);
          await writeWebSocketPipe(state.source.handle, error);
        }
      } else {
        state.websocketPipeModified = pipeFile.lastModified;
      }
      scheduleWebSocketPoll(1e3);
    }, delay);
  };
  const restartBackgroundPollers = (delay = 0) => {
    if (sourceCanPoll(state.source)) {
      schedulePoll(delay);
    } else {
      clearPoller();
    }
    if (state.source?.kind === "directory") {
      scheduleWebSocketPoll(delay);
      return;
    }
    clearWebSocketPoller();
  };
  const scanDirectory = async (handle, prefix = "", withInput = false) => {
    const project = /* @__PURE__ */ new Map();
    let modified = 0;
    for await (const [name, entry] of handle.entries()) {
      if (name.startsWith(".") || websocketBridgeFilenames.has(name) || entry.kind === "directory" && ignoredDirectoryNames.has(name)) {
        continue;
      }
      if (entry.kind === "directory") {
        const next = await scanDirectory(entry, `${prefix}${name}/`, withInput);
        modified = Math.max(modified, next.modified);
        next.project.forEach((value, key) => project.set(key, value));
        continue;
      }
      const file = await entry.getFile();
      modified = Math.max(modified, file.lastModified);
      if (withInput) {
        project.set(`${prefix}${name}`, await file.text());
      }
    }
    return { modified, project };
  };
  const scanSource = async (source, withInput = false) => {
    if (source.kind === "snapshot") {
      return {
        modified: 0,
        input: cloneExecutionInput(source.input)
      };
    }
    if (source.kind === "clipboard") {
      return {
        modified: 0,
        input: withInput ? source.text : ""
      };
    }
    if (source.kind === "file") {
      const file = await source.handle.getFile();
      return {
        modified: file.lastModified,
        input: withInput ? /* @__PURE__ */ new Map([[source.label, await file.text()]]) : ""
      };
    }
    if (source.kind === "browser-file") {
      return {
        modified: source.file.lastModified,
        input: withInput ? /* @__PURE__ */ new Map([[source.label, await source.file.text()]]) : ""
      };
    }
    if (source.kind === "browser-directory") {
      let modified = 0;
      const project = /* @__PURE__ */ new Map();
      for (const entry of source.files) {
        modified = Math.max(modified, entry.file.lastModified);
        if (withInput) {
          project.set(entry.path, await entry.file.text());
        }
      }
      return {
        modified,
        input: project
      };
    }
    const next = await scanDirectory(source.handle, "", withInput);
    return {
      modified: next.modified,
      input: next.project
    };
  };
  const missingSourceMessage = "Selected file or project could not be found. Choose it again to reconnect.";
  const scanSourceOrReset = async (source, withInput = false) => {
    try {
      return await scanSource(source, withInput);
    } catch (error) {
      if (!isNotFoundError(error)) {
        throw error;
      }
      resetToLauncherState(missingSourceMessage);
      render();
      return null;
    }
  };
  const schedulePoll = (delay = 1e3) => {
    const diffPollingBlocked = state.diffEnabled && state.diffCompareSource?.kind !== "snapshot";
    if (!state.source || diffPollingBlocked || state.source.kind === "clipboard" || !sourceCanPoll(state.source) || !state.executor || state.execution || deps.document.hidden) {
      render();
      return;
    }
    clearPoller();
    state.pollTimer = deps.setTimeout(async () => {
      state.pollTimer = 0;
      render();
      const nextDiffPollingBlocked = state.diffEnabled && state.diffCompareSource?.kind !== "snapshot";
      if (!state.source || nextDiffPollingBlocked || state.source.kind === "clipboard" || !sourceCanPoll(state.source) || !state.executor || state.execution || deps.document.hidden) {
        return;
      }
      const modified = await scanSourceOrReset(state.source, false);
      if (!modified) {
        return;
      }
      if (modified.modified === state.lastModified) {
        schedulePoll(1e3);
        return;
      }
      state.lastModified = modified.modified;
      state.execution = (async () => {
        const next = await scanSourceOrReset(state.source, true);
        if (!next) {
          return void 0;
        }
        if (state.diffEnabled && state.diffCompareSource?.kind === "snapshot") {
          const compareScan = await scanSourceOrReset(state.diffCompareSource, true);
          if (!compareScan) {
            return void 0;
          }
          return executeInput(await buildMergedDiffInput(next.input, compareScan.input));
        }
        return executeInput(next.input);
      })();
      render();
      void state.execution.finally(() => {
        state.execution = null;
        if (!deps.document.hidden && (!state.diffEnabled || state.diffCompareSource?.kind === "snapshot")) {
          schedulePoll(1e3);
        } else {
          render();
        }
      });
    }, delay);
    render();
  };
  let allowStartClick = false;
  const startConnection = () => {
    if (state.execution || !state.source || state.executor) {
      render();
      return;
    }
    allowStartClick = true;
    startButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    render();
  };
  const handleReady = () => {
    const nextExecutor = webView.rtc?.executor() ?? null;
    if (state.executor && state.executor === nextExecutor) {
      render();
      return;
    }
    state.executor = nextExecutor;
    state.rtcCloseHandler = () => {
      if (!state.executor && !state.source && !state.execution) {
        return;
      }
      resetToLauncherState(defaultDisconnectMessage);
    };
    state.webView?.rtc?.addEventListener?.("close", state.rtcCloseHandler, {
      once: true
    });
    state.lastModified = 0;
    state.websocketPipeModified = 0;
    state.kclErrors = [];
    state.kclErrorLocations = [];
    state.executorValues = null;
    state.edgeLinesVisible = true;
    state.xrayVisible = false;
    state.diffEnabled = false;
    state.diffCompareSource = null;
    state.diffBodyOwnershipByArtifactId = {};
    state.diffBodyOwnershipSequence = [];
    state.diffObjectOwnershipById = {};
    state.explodeMenuVisible = false;
    state.explodeMode = null;
    state.bodyArtifactIds = [];
    state.pendingBodyArtifactIds = [];
    state.materialByObjectId = {};
    state.pendingMaterialByObjectId = {};
    state.transformByObjectId = {};
    state.pendingTransformByObjectId = {};
    state.explodeOffsetByObjectId = {};
    state.solidObjectIds = [];
    state.pendingZoomToEntityRequestId = "";
    state.pendingSolidObjectIdsRequestId = "";
    state.ignoredOutgoingCommandIds.clear();
    state.snapshotRefreshing = false;
    clearSnapshotUrls();
    clearSnapshotRefresh();
    snapshotRefreshInFlight = false;
    pendingModelingResponses.clear();
    state.executorMessageHandler = (event) => {
      if (!(event instanceof MessageEvent)) {
        return;
      }
      const message = event.data;
      if (message.to === "websocket" && message.payload?.type === "send") {
        let sawNewObjectId = false;
        let sawDiffMarker = false;
        for (const entry of commandEntriesFromCommandData(message.payload.data)) {
          if (entry.cmd_id && state.ignoredOutgoingCommandIds.delete(entry.cmd_id)) {
            continue;
          }
          const materialEntry = materialEntryFromCommand(entry.cmd);
          if (materialEntry) {
            state.pendingMaterialByObjectId[materialEntry[0]] = materialEntry[1];
            const diffSide = state.diffEnabled && state.diffCompareSource ? diffSideFromMarkerMaterial(materialEntry[1]) : null;
            if (diffSide) {
              state.diffObjectOwnershipById[materialEntry[0]] = diffSide;
              sawDiffMarker = true;
            }
            if (!state.seenObjectIdsInSendOrder.includes(materialEntry[0])) {
              state.seenObjectIdsInSendOrder.push(materialEntry[0]);
              sawNewObjectId = true;
            }
          }
          const transformEntry = transformEntryFromCommand(entry.cmd);
          if (transformEntry) {
            state.pendingTransformByObjectId[transformEntry[0]] = transformEntry[1];
            if (!state.seenObjectIdsInSendOrder.includes(transformEntry[0])) {
              state.seenObjectIdsInSendOrder.push(transformEntry[0]);
              sawNewObjectId = true;
            }
          }
        }
        if (sawNewObjectId && state.diffEnabled && state.diffCompareSource) {
          void syncDiffObjectOwnership();
        }
        if (sawDiffMarker && state.diffEnabled && state.diffCompareSource) {
          state.diffObjectOwnershipById = fillDiffOwnership(state.diffObjectOwnershipById);
          applyDiffAppearance();
          queueSnapshotRefresh();
          render();
        }
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials();
          syncSceneObjectTransforms();
          if (state.diffEnabled) {
            applyDiffAppearance();
          } else if (state.xrayVisible) {
            applyXrayAppearance();
          }
          if (state.explodeMode) {
            applyExplodedView();
          }
        }
      }
      if (message.from !== "websocket" || message.payload?.type !== "message") {
        return;
      }
      if (typeof message.payload.data !== "string") {
        return;
      }
      let response;
      try {
        response = JSON.parse(message.payload.data);
      } catch {
        return;
      }
      if (!response.success && Array.isArray(response.errors)) {
        const firstError = response.errors[0];
        const isUnauthorizedError = firstError?.error_code === "auth_token_invalid" || firstError?.error_code === "auth_token_missing";
        if (isUnauthorizedError) {
          handleAuthenticationFailure();
          return;
        }
      }
      if (response.request_id) {
        const pendingModelingResponse = pendingModelingResponses.get(response.request_id);
        if (pendingModelingResponse) {
          pendingModelingResponses.delete(response.request_id);
          pendingModelingResponse(response);
        }
      }
      const nextBodyIds = bodyIdsFromWebSocketResponse(response);
      if (nextBodyIds.length) {
        state.pendingBodyArtifactIds.push(...nextBodyIds);
        state.bodyArtifactIds = [...new Set(state.pendingBodyArtifactIds)];
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials();
          syncSceneObjectTransforms();
          if (state.diffEnabled) {
            applyDiffAppearance();
          } else if (state.xrayVisible) {
            applyXrayAppearance();
          }
          if (state.explodeMode) {
            applyExplodedView();
          }
        }
      }
      if (response.success && response.request_id === state.pendingZoomToEntityRequestId && response.resp?.type === "modeling" && response.resp.data?.modeling_response?.type === "highlight_set_entity") {
        state.pendingZoomToEntityRequestId = "";
        const entityId = response.resp.data.modeling_response.data?.entity_id;
        if (entityId) {
          const cmd_id = nextRequestId();
          state.pendingZoomToEntityRequestId = cmd_id;
          state.webView?.rtc?.send?.(entityGetParentIdRequest(entityId, cmd_id));
        }
      }
      if (response.success && response.request_id === state.pendingZoomToEntityRequestId && response.resp?.type === "modeling" && response.resp.data?.modeling_response?.type === "entity_get_parent_id") {
        state.pendingZoomToEntityRequestId = "";
        const objectId = response.resp.data.modeling_response.data?.entity_id;
        if (objectId) {
          state.webView?.rtc?.send?.(zoomToFitEntityRequest(objectId));
        }
      }
      if (response.success && response.request_id === state.pendingSolidObjectIdsRequestId && response.resp?.type === "modeling" && response.resp.data?.modeling_response?.type === "scene_get_entity_ids") {
        state.pendingSolidObjectIdsRequestId = "";
        state.solidObjectIds = response.resp.data.modeling_response.data?.entity_ids?.flat().filter(Boolean) ?? [];
        syncSceneObjectMaterials();
        syncSceneObjectTransforms();
        if (state.diffEnabled) {
          applyDiffAppearance();
        } else if (state.xrayVisible) {
          applyXrayAppearance();
        }
        if (state.explodeMode) {
          applyExplodedView();
        }
        if (state.diffEnabled && state.diffCompareSource) {
          void syncDiffObjectOwnership();
        }
        queueSnapshotRefresh();
      }
    };
    state.executor?.addEventListener?.(state.executorMessageHandler);
    if (sourceExecutesImmediately(state.source) && state.executor) {
      state.execution = (async () => {
        const next = await scanSourceOrReset(state.source, true);
        if (!next) {
          return void 0;
        }
        state.lastModified = next.modified;
        return executeInput(next.input);
      })();
      render();
      void state.execution.finally(() => {
        state.execution = null;
        render();
      });
      return;
    }
    restartBackgroundPollers(0);
  };
  const associateSource = (source) => {
    state.source = source;
    state.originalSourceInput = source.kind === "clipboard" ? source.text : source.kind === "snapshot" ? cloneExecutionInput(source.input) : null;
    state.disconnectMessage = "";
    state.lastModified = 0;
    state.websocketPipeModified = 0;
    state.executorValues = null;
    replaceKclErrors([]);
    if (!state.executor && !state.execution) {
      startConnection();
    } else if (!state.execution && !deps.document.hidden) {
      restartBackgroundPollers(0);
    } else {
      render();
    }
  };
  const loadDiffSource = async (compareSource) => {
    if (!state.source || !state.executor || state.execution) {
      return;
    }
    clearPoller();
    state.diffCompareSource = compareSource;
    state.diffBodyOwnershipByArtifactId = {};
    state.diffBodyOwnershipSequence = [];
    state.diffObjectOwnershipById = {};
    state.seenObjectIdsInSendOrder = [];
    state.execution = (async () => {
      const baseScan = await scanSourceOrReset(state.source, true);
      if (!baseScan) {
        return void 0;
      }
      state.lastModified = baseScan.modified;
      const compareScan = await scanSourceOrReset(compareSource, true);
      if (!compareScan) {
        return void 0;
      }
      return executeInput(await buildMergedDiffInput(baseScan.input, compareScan.input));
    })();
    render();
    void state.execution.finally(() => {
      state.execution = null;
      if (state.diffEnabled && state.diffCompareSource?.kind === "snapshot" && !deps.document.hidden) {
        schedulePoll(1e3);
        return;
      }
      if (state.diffEnabled) {
        render();
        return;
      }
      if (!deps.document.hidden) {
        schedulePoll(1e3);
      } else {
        render();
      }
    });
  };
  const handleDiffOriginalButtonClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!state.diffEnabled || !state.source || !state.executor || !state.originalSourceInput || state.source.kind === "clipboard") {
      return;
    }
    await loadDiffSource({
      kind: "snapshot",
      input: cloneExecutionInput(state.originalSourceInput),
      label: `Original ${state.source.label}`
    });
  };
  const handleDiffToggle = () => {
    if (!state.executor || !state.source || state.execution) {
      return;
    }
    if (state.diffEnabled) {
      clearPoller();
      state.diffEnabled = false;
      state.edgeLinesVisible = state.edgeLinesVisibleBeforeDiff;
      state.webView?.rtc?.send?.(edgeVisibilityRequest(state.edgeLinesVisible));
      state.diffCompareSource = null;
      state.diffBodyOwnershipByArtifactId = {};
      state.diffBodyOwnershipSequence = [];
      state.diffObjectOwnershipById = {};
      state.seenObjectIdsInSendOrder = [];
      state.execution = (async () => {
        const next = await scanSourceOrReset(state.source, true);
        if (!next) {
          return void 0;
        }
        return executeInput(next.input);
      })();
      render();
      void state.execution.finally(() => {
        state.execution = null;
        if (!deps.document.hidden) {
          schedulePoll(1e3);
        } else {
          render();
        }
      });
      return;
    }
    clearPoller();
    state.xrayVisible = false;
    state.edgeLinesVisibleBeforeDiff = state.edgeLinesVisible;
    state.edgeLinesVisible = false;
    state.webView?.rtc?.send?.(edgeVisibilityRequest(false));
    state.diffEnabled = true;
    state.diffCompareSource = null;
    state.diffBodyOwnershipByArtifactId = {};
    state.diffBodyOwnershipSequence = [];
    state.diffObjectOwnershipById = {};
    state.seenObjectIdsInSendOrder = [];
    applyDiffAppearance();
    queueSnapshotRefresh();
    render();
  };
  const handleStartButtonClick = (event) => {
    if (event.target instanceof Element && event.target.closest("[data-file], [data-directory], [data-clipboard]")) {
      return;
    }
    if (allowStartClick) {
      allowStartClick = false;
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus();
      tokenInput.select();
      render();
      return;
    }
    if (state.source && !state.executor && !state.execution) {
      startConnection();
      return;
    }
    render();
  };
  const handleTokenFocus = () => {
    tokenInput.select();
  };
  const handleTokenBeforeInput = (event) => {
    if (event.inputType === "insertFromPaste") {
      return;
    }
    if (event.inputType !== "insertText" && event.inputType !== "deleteContentBackward" && event.inputType !== "deleteContentForward") {
      return;
    }
    event.preventDefault();
    const replaceAll = tokenInput.selectionStart === 0 && tokenInput.selectionEnd === tokenInput.value.length;
    if (event.inputType === "insertText") {
      const next = event.data ?? "";
      state.token = replaceAll ? next : `${state.token}${next}`;
    } else {
      state.token = replaceAll ? "" : state.token.slice(0, -1);
    }
    if (state.token) {
      deps.storage.setItem(tokenStorageKey, state.token);
    } else {
      deps.storage.removeItem(tokenStorageKey);
    }
    if (!usesZooCookieAuth) {
      client.token = state.token;
    }
    render();
    tokenInput.focus();
    tokenInput.setSelectionRange(tokenInput.value.length, tokenInput.value.length);
  };
  const handleTokenPaste = (event) => {
    event.preventDefault();
    const next = event.clipboardData?.getData("text").trim() ?? "";
    if (!next) {
      return;
    }
    const replaceAll = tokenInput.selectionStart === 0 && tokenInput.selectionEnd === tokenInput.value.length;
    state.token = replaceAll ? next : `${state.token}${next}`;
    deps.storage.setItem(tokenStorageKey, state.token);
    if (!usesZooCookieAuth) {
      client.token = state.token;
    }
    render();
    tokenInput.focus();
    tokenInput.setSelectionRange(tokenInput.value.length, tokenInput.value.length);
  };
  const handleKclErrorClick = () => {
    if (!state.kclErrorLocations.length) {
      return;
    }
    void deps.writeClipboardText(state.kclErrorLocations.join("\n"));
  };
  const loadPickedSource = async (source) => {
    if (state.diffEnabled && state.source && state.executor) {
      await loadDiffSource(source);
      return;
    }
    associateSource(source);
  };
  const directoryFilesFromInput = (files) => {
    const nextFiles = Array.from(files ?? []);
    if (!nextFiles.length) {
      return null;
    }
    const firstPath = normalizeExecutionPath(nextFiles[0]?.webkitRelativePath || "");
    const rootName = firstPath.includes("/") ? firstPath.split("/")[0] : "Selected files";
    return {
      kind: "browser-directory",
      label: rootName,
      files: nextFiles.map((file) => {
        const relativePath = normalizeExecutionPath(file.webkitRelativePath || file.name);
        const segments = relativePath.split("/").filter(Boolean);
        return {
          path: segments.length > 1 ? segments.slice(1).join("/") : file.name,
          file
        };
      })
    };
  };
  const handleRegularFileInputChange = async () => {
    const [file] = Array.from(regularFileInput.files ?? []);
    regularFileInput.value = "";
    if (!file) {
      return;
    }
    await loadPickedSource({
      kind: "browser-file",
      file,
      label: file.name
    });
  };
  const handleRegularDirectoryInputChange = async () => {
    const source = directoryFilesFromInput(regularDirectoryInput.files);
    regularDirectoryInput.value = "";
    if (!source) {
      return;
    }
    await loadPickedSource(source);
  };
  tokenInput.addEventListener("focus", handleTokenFocus);
  tokenInput.addEventListener("beforeinput", handleTokenBeforeInput);
  tokenInput.addEventListener("paste", handleTokenPaste);
  const handleFileButtonClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus();
      tokenInput.select();
      return;
    }
    if (usesRegularPickerFallback) {
      regularFileInput.value = "";
      regularFileInput.click();
      return;
    }
    try {
      const [handle] = await deps.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: "KCL files",
            accept: {
              "text/plain": [".kcl"]
            }
          }
        ]
      });
      if (handle) {
        await loadPickedSource({
          kind: "file",
          handle,
          label: handle.name
        });
      }
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== "AbortError") {
        throw error;
      }
    }
  };
  const handleDirectoryButtonClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus();
      tokenInput.select();
      return;
    }
    if (usesRegularPickerFallback) {
      regularDirectoryInput.value = "";
      regularDirectoryInput.click();
      return;
    }
    try {
      const handle = await deps.showDirectoryPicker();
      await loadPickedSource({
        kind: "directory",
        handle,
        label: handle.name
      });
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== "AbortError") {
        throw error;
      }
    }
  };
  const handleClipboardButtonClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus();
      tokenInput.select();
      return;
    }
    const text = (await deps.readClipboardText()).trim();
    if (!text) {
      return;
    }
    await loadPickedSource({
      kind: "clipboard",
      text,
      label: "Clipboard"
    });
  };
  const handleScenePointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    const rect = webView.el.getBoundingClientRect();
    scenePointerDown = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      pointerId: event.pointerId
    };
  };
  const handleScenePointerUp = (event) => {
    if (event.button !== 0 || !scenePointerDown || scenePointerDown.pointerId !== event.pointerId || !state.executor || !state.webView?.rtc?.send) {
      return;
    }
    const rect = webView.el.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    const movement = Math.hypot(point.x - scenePointerDown.x, point.y - scenePointerDown.y);
    scenePointerDown = null;
    if (movement > 4) {
      return;
    }
    const cmd_id = nextRequestId();
    state.pendingZoomToEntityRequestId = cmd_id;
    state.webView.rtc.send(
      JSON.stringify({
        type: "modeling_cmd_req",
        cmd_id,
        cmd: {
          type: "highlight_set_entity",
          selected_at_window: {
            x: Math.round(point.x),
            y: Math.round(point.y)
          }
        }
      })
    );
  };
  const unmountWebView = () => {
    state.executor?.removeEventListener?.(state.executorMessageHandler);
    state.executorMessageHandler = null;
    state.webView?.rtc?.removeEventListener?.("close", state.rtcCloseHandler);
    state.rtcCloseHandler = null;
    pendingModelingResponses.clear();
    snapshotRefreshInFlight = false;
    clearSnapshotRefresh();
    startButton.removeEventListener("click", handleStartButtonClick, { capture: true });
    webView.removeEventListener("ready", handleReady);
    webView.el.removeEventListener("pointerdown", handleScenePointerDown);
    webView.el.removeEventListener("pointerup", handleScenePointerUp);
    fileButton.removeEventListener("click", handleFileButtonClick);
    directoryButton.removeEventListener("click", handleDirectoryButtonClick);
    clipboardButton.removeEventListener("click", handleClipboardButtonClick);
    regularFileInput.removeEventListener("change", handleRegularFileInputChange);
    regularDirectoryInput.removeEventListener("change", handleRegularDirectoryInputChange);
    regularFileInput.remove();
    regularDirectoryInput.remove();
  };
  const mountWebView = () => {
    webView = deps.createWebView({
      zooClient: client,
      size
    });
    state.webView = webView;
    viewer.replaceChildren(webView.el);
    startButton = webView.el.querySelector(".start");
    const startIcon = startButton.querySelector("svg");
    picker = deps.document.createElement("div");
    directoryButton = deps.document.createElement("button");
    fileButton = deps.document.createElement("button");
    clipboardButton = deps.document.createElement("button");
    regularFileInput = deps.document.createElement("input");
    regularDirectoryInput = deps.document.createElement("input");
    browserBanner = deps.document.createElement("div");
    allowStartClick = false;
    startButton.style.display = "block";
    startButton.style.cursor = "pointer";
    startButton.style.position = "absolute";
    if (startIcon) {
      startIcon.style.display = "block";
      startIcon.style.width = "100%";
      startIcon.style.height = "auto";
      startIcon.style.cursor = "pointer";
    }
    picker.className = "logo-actions";
    picker.style.position = "absolute";
    picker.style.top = "100%";
    picker.style.left = "50%";
    picker.style.transform = "translateX(-50%)";
    directoryButton.type = "button";
    directoryButton.dataset.directory = "";
    directoryButton.className = "icon-button";
    directoryButton.setAttribute("aria-label", "Load project");
    directoryButton.title = "Load project";
    directoryButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>';
    fileButton.type = "button";
    fileButton.dataset.file = "";
    fileButton.className = "icon-button";
    fileButton.setAttribute("aria-label", "Load KCL file");
    fileButton.title = "Load KCL file";
    fileButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>';
    fileButton.dataset.pulse = "true";
    clipboardButton.type = "button";
    clipboardButton.dataset.clipboard = "";
    clipboardButton.className = "icon-button";
    clipboardButton.setAttribute("aria-label", "Use clipboard contents");
    clipboardButton.title = "Use clipboard contents";
    clipboardButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>';
    regularFileInput.type = "file";
    regularFileInput.accept = ".kcl,text/plain";
    regularFileInput.hidden = true;
    regularFileInput.tabIndex = -1;
    regularFileInput.dataset.regularFileInput = "";
    regularDirectoryInput.type = "file";
    regularDirectoryInput.multiple = true;
    regularDirectoryInput.hidden = true;
    regularDirectoryInput.tabIndex = -1;
    regularDirectoryInput.dataset.regularDirectoryInput = "";
    regularDirectoryInput.setAttribute("webkitdirectory", "");
    regularDirectoryInput.setAttribute("directory", "");
    browserBanner.className = "browser-banner";
    browserBanner.dataset.browserBanner = "";
    browserBanner.innerHTML = browserBannerMarkup;
    picker.append(directoryButton, fileButton, clipboardButton);
    startButton.append(picker);
    startButton.append(browserBanner);
    root2.append(regularFileInput, regularDirectoryInput);
    startButton.addEventListener("click", handleStartButtonClick, { capture: true });
    webView.el.addEventListener("pointerdown", handleScenePointerDown);
    webView.el.addEventListener("pointerup", handleScenePointerUp);
    webView.addEventListener("ready", handleReady);
    fileButton.addEventListener("click", handleFileButtonClick);
    directoryButton.addEventListener("click", handleDirectoryButtonClick);
    clipboardButton.addEventListener("click", handleClipboardButtonClick);
    regularFileInput.addEventListener("change", handleRegularFileInputChange);
    regularDirectoryInput.addEventListener("change", handleRegularDirectoryInputChange);
  };
  const handleVisibilityChange = () => {
    if (deps.document.hidden) {
      stopBackgroundPollers();
      return;
    }
    if (state.source && state.executor && !state.execution) {
      restartBackgroundPollers(0);
    } else {
      render();
    }
  };
  const resetToLauncherState = (disconnectMessage = "") => {
    stopBackgroundPollers();
    unmountWebView();
    state.execution = null;
    state.executor = null;
    state.source = null;
    state.originalSourceInput = null;
    state.disconnectMessage = disconnectMessage;
    state.lastModified = 0;
    state.websocketPipeModified = 0;
    state.kclErrors = [];
    state.kclErrorLocations = [];
    state.executorValues = null;
    state.edgeLinesVisible = true;
    state.xrayVisible = false;
    state.diffEnabled = false;
    state.diffCompareSource = null;
    state.diffBodyOwnershipByArtifactId = {};
    state.diffBodyOwnershipSequence = [];
    state.diffObjectOwnershipById = {};
    state.seenObjectIdsInSendOrder = [];
    state.explodeMenuVisible = false;
    state.explodeMode = null;
    state.bodyArtifactIds = [];
    state.pendingBodyArtifactIds = [];
    state.materialByObjectId = {};
    state.pendingMaterialByObjectId = {};
    state.seenObjectIdsInSendOrder = [];
    state.transformByObjectId = {};
    state.pendingTransformByObjectId = {};
    state.explodeOffsetByObjectId = {};
    state.solidObjectIds = [];
    state.snapshotRefreshing = false;
    clearSnapshotUrls();
    clearSnapshotRefresh();
    snapshotRefreshInFlight = false;
    state.pendingZoomToEntityRequestId = "";
    state.pendingSolidObjectIdsRequestId = "";
    state.ignoredOutgoingCommandIds.clear();
    void webView.deconstructor?.();
    mountWebView();
    render();
  };
  const handleDisconnect = () => {
    resetToLauncherState(defaultDisconnectMessage);
  };
  const handleEdgesToggle = () => {
    if (!state.executor) {
      return;
    }
    state.edgeLinesVisible = !state.edgeLinesVisible;
    state.webView?.rtc?.send?.(edgeVisibilityRequest(state.edgeLinesVisible));
    queueSnapshotRefresh();
    render();
  };
  const handleXrayToggle = () => {
    if (!state.executor) {
      return;
    }
    state.xrayVisible = !state.xrayVisible;
    applyXrayAppearance();
    queueSnapshotRefresh();
    render();
  };
  const handleExplodeToggle = () => {
    if (!state.executor) {
      return;
    }
    if (state.explodeMenuVisible) {
      state.explodeMenuVisible = false;
      if (state.explodeMode) {
        state.explodeMode = null;
        applyExplodedView();
        queueSnapshotRefresh();
      }
    } else {
      state.explodeMenuVisible = true;
    }
    render();
  };
  const handleHorizontalExplodeToggle = () => {
    if (!state.executor) {
      return;
    }
    state.explodeMenuVisible = true;
    state.explodeMode = state.explodeMode === "horizontal" ? null : "horizontal";
    applyExplodedView();
    queueSnapshotRefresh();
    render();
  };
  const handleVerticalExplodeToggle = () => {
    if (!state.executor) {
      return;
    }
    state.explodeMenuVisible = true;
    state.explodeMode = state.explodeMode === "vertical" ? null : "vertical";
    applyExplodedView();
    queueSnapshotRefresh();
    render();
  };
  const handleRadialExplodeToggle = () => {
    if (!state.executor) {
      return;
    }
    state.explodeMenuVisible = true;
    state.explodeMode = state.explodeMode === "radial" ? null : "radial";
    applyExplodedView();
    queueSnapshotRefresh();
    render();
  };
  const handleGridExplodeToggle = () => {
    if (!state.executor) {
      return;
    }
    state.explodeMenuVisible = true;
    state.explodeMode = state.explodeMode === "grid" ? null : "grid";
    applyExplodedView();
    queueSnapshotRefresh();
    render();
  };
  const handleExplodeSpacingInput = () => {
    state.explodeSpacing = Number(explodeSpacingInput.value) || 10;
    render();
  };
  const handleExplodeSpacingChange = () => {
    if (!state.executor) {
      return;
    }
    state.explodeSpacing = Number(explodeSpacingInput.value) || 10;
    if (state.explodeMode) {
      applyExplodedView();
      queueSnapshotRefresh();
    }
    render();
  };
  const handleSnapshotCardClick = (key) => {
    if (!state.executor || !state.webView?.rtc?.send) {
      return;
    }
    const snapshotView = snapshotViews.find((view) => view.key === key);
    if (!snapshotView) {
      return;
    }
    state.webView.rtc.send(snapshotViewRequest(snapshotView));
  };
  const handleTopSnapshotClick = () => {
    handleSnapshotCardClick("top");
  };
  const handleProfileSnapshotClick = () => {
    handleSnapshotCardClick("profile");
  };
  const handleFrontSnapshotClick = () => {
    handleSnapshotCardClick("front");
  };
  mountWebView();
  deps.document.addEventListener("visibilitychange", handleVisibilityChange);
  kclError.addEventListener("click", handleKclErrorClick);
  edgesButton.addEventListener("click", handleEdgesToggle);
  xrayButton.addEventListener("click", handleXrayToggle);
  diffButton.addEventListener("click", handleDiffToggle);
  diffOriginalButton.addEventListener("click", handleDiffOriginalButtonClick);
  diffDirectoryButton.addEventListener("click", handleDirectoryButtonClick);
  diffFileButton.addEventListener("click", handleFileButtonClick);
  diffClipboardButton.addEventListener("click", handleClipboardButtonClick);
  explodeButton.addEventListener("click", handleExplodeToggle);
  explodeHorizontalButton.addEventListener("click", handleHorizontalExplodeToggle);
  explodeVerticalButton.addEventListener("click", handleVerticalExplodeToggle);
  explodeRadialButton.addEventListener("click", handleRadialExplodeToggle);
  explodeGridButton.addEventListener("click", handleGridExplodeToggle);
  explodeSpacingInput.addEventListener("input", handleExplodeSpacingInput);
  explodeSpacingInput.addEventListener("change", handleExplodeSpacingChange);
  snapshotCards.top.addEventListener("click", handleTopSnapshotClick);
  snapshotCards.profile.addEventListener("click", handleProfileSnapshotClick);
  snapshotCards.front.addEventListener("click", handleFrontSnapshotClick);
  disconnectButton.addEventListener("click", handleDisconnect);
  if (usesZooCookieAuth) {
    void deps.fetch("https://zoo.dev/account", {
      method: "GET",
      credentials: "include",
      redirect: "manual"
    }).then((response) => {
      if (response.headers.get("location")) {
        deps.redirectToLogin(loginUrl);
      }
    }).catch(() => {
    });
  }
  render();
  return {
    state,
    size,
    elements,
    destroy: () => {
      stopBackgroundPollers();
      clearSnapshotRefresh();
      unmountWebView();
      tokenInput.removeEventListener("focus", handleTokenFocus);
      tokenInput.removeEventListener("beforeinput", handleTokenBeforeInput);
      tokenInput.removeEventListener("paste", handleTokenPaste);
      deps.document.removeEventListener("visibilitychange", handleVisibilityChange);
      kclError.removeEventListener("click", handleKclErrorClick);
      edgesButton.removeEventListener("click", handleEdgesToggle);
      xrayButton.removeEventListener("click", handleXrayToggle);
      diffButton.removeEventListener("click", handleDiffToggle);
      diffOriginalButton.removeEventListener("click", handleDiffOriginalButtonClick);
      diffDirectoryButton.removeEventListener("click", handleDirectoryButtonClick);
      diffFileButton.removeEventListener("click", handleFileButtonClick);
      diffClipboardButton.removeEventListener("click", handleClipboardButtonClick);
      explodeButton.removeEventListener("click", handleExplodeToggle);
      explodeHorizontalButton.removeEventListener("click", handleHorizontalExplodeToggle);
      explodeVerticalButton.removeEventListener("click", handleVerticalExplodeToggle);
      explodeRadialButton.removeEventListener("click", handleRadialExplodeToggle);
      explodeGridButton.removeEventListener("click", handleGridExplodeToggle);
      explodeSpacingInput.removeEventListener("input", handleExplodeSpacingInput);
      explodeSpacingInput.removeEventListener("change", handleExplodeSpacingChange);
      snapshotCards.top.removeEventListener("click", handleTopSnapshotClick);
      snapshotCards.profile.removeEventListener("click", handleProfileSnapshotClick);
      snapshotCards.front.removeEventListener("click", handleFrontSnapshotClick);
      disconnectButton.removeEventListener("click", handleDisconnect);
    }
  };
}
var root = document.getElementById("app");
if (root) {
  createApp(root);
}
export {
  createApp
};
