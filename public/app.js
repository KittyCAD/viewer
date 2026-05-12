var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/jszip/dist/jszip.min.js
var require_jszip_min = __commonJS({
  "node_modules/jszip/dist/jszip.min.js"(exports, module2) {
    !(function(e) {
      if ("object" == typeof exports && "undefined" != typeof module2) module2.exports = e();
      else if ("function" == typeof define && define.amd) define([], e);
      else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
      }
    })(function() {
      return (function s(a, o, h2) {
        function u(r2, e2) {
          if (!o[r2]) {
            if (!a[r2]) {
              var t = "function" == typeof __require && __require;
              if (!e2 && t) return t(r2, true);
              if (l2) return l2(r2, true);
              var n2 = new Error("Cannot find module '" + r2 + "'");
              throw n2.code = "MODULE_NOT_FOUND", n2;
            }
            var i2 = o[r2] = { exports: {} };
            a[r2][0].call(i2.exports, function(e3) {
              var t2 = a[r2][1][e3];
              return u(t2 || e3);
            }, i2, i2.exports, s, a, o, h2);
          }
          return o[r2].exports;
        }
        for (var l2 = "function" == typeof __require && __require, e = 0; e < h2.length; e++) u(h2[e]);
        return u;
      })({ 1: [function(e, t, r2) {
        "use strict";
        var d = e("./utils"), c = e("./support"), p2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        r2.encode = function(e2) {
          for (var t2, r3, n2, i2, s, a, o, h2 = [], u = 0, l2 = e2.length, f2 = l2, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f2 = l2 - u, n2 = c2 ? (t2 = e2[u++], r3 = u < l2 ? e2[u++] : 0, u < l2 ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r3 = u < l2 ? e2.charCodeAt(u++) : 0, u < l2 ? e2.charCodeAt(u++) : 0), i2 = t2 >> 2, s = (3 & t2) << 4 | r3 >> 4, a = 1 < f2 ? (15 & r3) << 2 | n2 >> 6 : 64, o = 2 < f2 ? 63 & n2 : 64, h2.push(p2.charAt(i2) + p2.charAt(s) + p2.charAt(a) + p2.charAt(o));
          return h2.join("");
        }, r2.decode = function(e2) {
          var t2, r3, n2, i2, s, a, o = 0, h2 = 0, u = "data:";
          if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
          var l2, f2 = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (e2.charAt(e2.length - 1) === p2.charAt(64) && f2--, e2.charAt(e2.length - 2) === p2.charAt(64) && f2--, f2 % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (l2 = c.uint8array ? new Uint8Array(0 | f2) : new Array(0 | f2); o < e2.length; ) t2 = p2.indexOf(e2.charAt(o++)) << 2 | (i2 = p2.indexOf(e2.charAt(o++))) >> 4, r3 = (15 & i2) << 4 | (s = p2.indexOf(e2.charAt(o++))) >> 2, n2 = (3 & s) << 6 | (a = p2.indexOf(e2.charAt(o++))), l2[h2++] = t2, 64 !== s && (l2[h2++] = r3), 64 !== a && (l2[h2++] = n2);
          return l2;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r2) {
        "use strict";
        var n2 = e("./external"), i2 = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
        function o(e2, t2, r3, n3, i3) {
          this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r3, this.compression = n3, this.compressedContent = i3;
        }
        o.prototype = { getContentWorker: function() {
          var e2 = new i2(n2.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
          return e2.on("end", function() {
            if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), e2;
        }, getCompressedWorker: function() {
          return new i2(n2.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, o.createWorkerFrom = function(e2, t2, r3) {
          return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r3)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
        }, t.exports = o;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r2) {
        "use strict";
        var n2 = e("./stream/GenericWorker");
        r2.STORE = { magic: "\0\0", compressWorker: function() {
          return new n2("STORE compression");
        }, uncompressWorker: function() {
          return new n2("STORE decompression");
        } }, r2.DEFLATE = e("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r2) {
        "use strict";
        var n2 = e("./utils");
        var o = (function() {
          for (var e2, t2 = [], r3 = 0; r3 < 256; r3++) {
            e2 = r3;
            for (var n3 = 0; n3 < 8; n3++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r3] = e2;
          }
          return t2;
        })();
        t.exports = function(e2, t2) {
          return void 0 !== e2 && e2.length ? "string" !== n2.getTypeOf(e2) ? (function(e3, t3, r3, n3) {
            var i2 = o, s = n3 + r3;
            e3 ^= -1;
            for (var a = n3; a < s; a++) e3 = e3 >>> 8 ^ i2[255 & (e3 ^ t3[a])];
            return -1 ^ e3;
          })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r3, n3) {
            var i2 = o, s = n3 + r3;
            e3 ^= -1;
            for (var a = n3; a < s; a++) e3 = e3 >>> 8 ^ i2[255 & (e3 ^ t3.charCodeAt(a))];
            return -1 ^ e3;
          })(0 | t2, e2, e2.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(e, t, r2) {
        "use strict";
        r2.base64 = false, r2.binary = false, r2.dir = false, r2.createFolders = true, r2.date = null, r2.compression = null, r2.compressionOptions = null, r2.comment = null, r2.unixPermissions = null, r2.dosPermissions = null;
      }, {}], 6: [function(e, t, r2) {
        "use strict";
        var n2 = null;
        n2 = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n2 };
      }, { lie: 37 }], 7: [function(e, t, r2) {
        "use strict";
        var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i2 = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n2 ? "uint8array" : "array";
        function h2(e2, t2) {
          a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
        }
        r2.magic = "\b\0", s.inherits(h2, a), h2.prototype.processChunk = function(e2) {
          this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
        }, h2.prototype.flush = function() {
          a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
        }, h2.prototype.cleanUp = function() {
          a.prototype.cleanUp.call(this), this._pako = null;
        }, h2.prototype._createPako = function() {
          this._pako = new i2[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
          var t2 = this;
          this._pako.onData = function(e2) {
            t2.push({ data: e2, meta: t2.meta });
          };
        }, r2.compressWorker = function(e2) {
          return new h2("Deflate", e2);
        }, r2.uncompressWorker = function() {
          return new h2("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r2) {
        "use strict";
        function A2(e2, t2) {
          var r3, n3 = "";
          for (r3 = 0; r3 < t2; r3++) n3 += String.fromCharCode(255 & e2), e2 >>>= 8;
          return n3;
        }
        function n2(e2, t2, r3, n3, i3, s2) {
          var a, o, h2 = e2.file, u = e2.compression, l2 = s2 !== O2.utf8encode, f2 = I2.transformTo("string", s2(h2.name)), c = I2.transformTo("string", O2.utf8encode(h2.name)), d = h2.comment, p2 = I2.transformTo("string", s2(d)), m = I2.transformTo("string", O2.utf8encode(d)), _2 = c.length !== h2.name.length, g2 = m.length !== d.length, b = "", v2 = "", y2 = "", w2 = h2.dir, k2 = h2.date, x2 = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          t2 && !r3 || (x2.crc32 = e2.crc32, x2.compressedSize = e2.compressedSize, x2.uncompressedSize = e2.uncompressedSize);
          var S2 = 0;
          t2 && (S2 |= 8), l2 || !_2 && !g2 || (S2 |= 2048);
          var z2 = 0, C2 = 0;
          w2 && (z2 |= 16), "UNIX" === i3 ? (C2 = 798, z2 |= (function(e3, t3) {
            var r4 = e3;
            return e3 || (r4 = t3 ? 16893 : 33204), (65535 & r4) << 16;
          })(h2.unixPermissions, w2)) : (C2 = 20, z2 |= (function(e3) {
            return 63 & (e3 || 0);
          })(h2.dosPermissions)), a = k2.getUTCHours(), a <<= 6, a |= k2.getUTCMinutes(), a <<= 5, a |= k2.getUTCSeconds() / 2, o = k2.getUTCFullYear() - 1980, o <<= 4, o |= k2.getUTCMonth() + 1, o <<= 5, o |= k2.getUTCDate(), _2 && (v2 = A2(1, 1) + A2(B2(f2), 4) + c, b += "up" + A2(v2.length, 2) + v2), g2 && (y2 = A2(1, 1) + A2(B2(p2), 4) + m, b += "uc" + A2(y2.length, 2) + y2);
          var E2 = "";
          return E2 += "\n\0", E2 += A2(S2, 2), E2 += u.magic, E2 += A2(a, 2), E2 += A2(o, 2), E2 += A2(x2.crc32, 4), E2 += A2(x2.compressedSize, 4), E2 += A2(x2.uncompressedSize, 4), E2 += A2(f2.length, 2), E2 += A2(b.length, 2), { fileRecord: R2.LOCAL_FILE_HEADER + E2 + f2 + b, dirRecord: R2.CENTRAL_FILE_HEADER + A2(C2, 2) + E2 + A2(p2.length, 2) + "\0\0\0\0" + A2(z2, 4) + A2(n3, 4) + f2 + b + p2 };
        }
        var I2 = e("../utils"), i2 = e("../stream/GenericWorker"), O2 = e("../utf8"), B2 = e("../crc32"), R2 = e("../signature");
        function s(e2, t2, r3, n3) {
          i2.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r3, this.encodeFileName = n3, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        I2.inherits(s, i2), s.prototype.push = function(e2) {
          var t2 = e2.meta.percent || 0, r3 = this.entriesCount, n3 = this._sources.length;
          this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i2.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r3 ? (t2 + 100 * (r3 - n3 - 1)) / r3 : 100 } }));
        }, s.prototype.openedSource = function(e2) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
          var t2 = this.streamFiles && !e2.file.dir;
          if (t2) {
            var r3 = n2(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: r3.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = true;
        }, s.prototype.closedSource = function(e2) {
          this.accumulate = false;
          var t2 = this.streamFiles && !e2.file.dir, r3 = n2(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(r3.dirRecord), t2) this.push({ data: (function(e3) {
            return R2.DATA_DESCRIPTOR + A2(e3.crc32, 4) + A2(e3.compressedSize, 4) + A2(e3.uncompressedSize, 4);
          })(e2), meta: { percent: 100 } });
          else for (this.push({ data: r3.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, s.prototype.flush = function() {
          for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
          var r3 = this.bytesWritten - e2, n3 = (function(e3, t3, r4, n4, i3) {
            var s2 = I2.transformTo("string", i3(n4));
            return R2.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A2(e3, 2) + A2(e3, 2) + A2(t3, 4) + A2(r4, 4) + A2(s2.length, 2) + s2;
          })(this.dirRecords.length, r3, e2, this.zipComment, this.encodeFileName);
          this.push({ data: n3, meta: { percent: 100 } });
        }, s.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, s.prototype.registerPrevious = function(e2) {
          this._sources.push(e2);
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, s.prototype.resume = function() {
          return !!i2.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
        }, s.prototype.error = function(e2) {
          var t2 = this._sources;
          if (!i2.prototype.error.call(this, e2)) return false;
          for (var r3 = 0; r3 < t2.length; r3++) try {
            t2[r3].error(e2);
          } catch (e3) {
          }
          return true;
        }, s.prototype.lock = function() {
          i2.prototype.lock.call(this);
          for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
        }, t.exports = s;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r2) {
        "use strict";
        var u = e("../compressions"), n2 = e("./ZipFileWorker");
        r2.generateWorker = function(e2, a, t2) {
          var o = new n2(a.streamFiles, t2, a.platform, a.encodeFileName), h2 = 0;
          try {
            e2.forEach(function(e3, t3) {
              h2++;
              var r3 = (function(e4, t4) {
                var r4 = e4 || t4, n4 = u[r4];
                if (!n4) throw new Error(r4 + " is not a valid compression method !");
                return n4;
              })(t3.options.compression, a.compression), n3 = t3.options.compressionOptions || a.compressionOptions || {}, i2 = t3.dir, s = t3.date;
              t3._compressWorker(r3, n3).withStreamInfo("file", { name: e3, dir: i2, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
            }), o.entriesCount = h2;
          } catch (e3) {
            o.error(e3);
          }
          return o;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r2) {
        "use strict";
        function n2() {
          if (!(this instanceof n2)) return new n2();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var e2 = new n2();
            for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
            return e2;
          };
        }
        (n2.prototype = e("./object")).loadAsync = e("./load"), n2.support = e("./support"), n2.defaults = e("./defaults"), n2.version = "3.10.1", n2.loadAsync = function(e2, t2) {
          return new n2().loadAsync(e2, t2);
        }, n2.external = e("./external"), t.exports = n2;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r2) {
        "use strict";
        var u = e("./utils"), i2 = e("./external"), n2 = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l2 = e("./nodejsUtils");
        function f2(n3) {
          return new i2.Promise(function(e2, t2) {
            var r3 = n3.decompressed.getContentWorker().pipe(new a());
            r3.on("error", function(e3) {
              t2(e3);
            }).on("end", function() {
              r3.streamInfo.crc32 !== n3.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
            }).resume();
          });
        }
        t.exports = function(e2, o) {
          var h2 = this;
          return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n2.utf8decode }), l2.isNode && l2.isStream(e2) ? i2.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
            var t2 = new s(o);
            return t2.load(e3), t2;
          }).then(function(e3) {
            var t2 = [i2.Promise.resolve(e3)], r3 = e3.files;
            if (o.checkCRC32) for (var n3 = 0; n3 < r3.length; n3++) t2.push(f2(r3[n3]));
            return i2.Promise.all(t2);
          }).then(function(e3) {
            for (var t2 = e3.shift(), r3 = t2.files, n3 = 0; n3 < r3.length; n3++) {
              var i3 = r3[n3], s2 = i3.fileNameStr, a2 = u.resolve(i3.fileNameStr);
              h2.file(a2, i3.decompressed, { binary: true, optimizedBinaryString: true, date: i3.date, dir: i3.dir, comment: i3.fileCommentStr.length ? i3.fileCommentStr : null, unixPermissions: i3.unixPermissions, dosPermissions: i3.dosPermissions, createFolders: o.createFolders }), i3.dir || (h2.file(a2).unsafeOriginalName = s2);
            }
            return t2.zipComment.length && (h2.comment = t2.zipComment), h2;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r2) {
        "use strict";
        var n2 = e("../utils"), i2 = e("../stream/GenericWorker");
        function s(e2, t2) {
          i2.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
        }
        n2.inherits(s, i2), s.prototype._bindStream = function(e2) {
          var t2 = this;
          (this._stream = e2).pause(), e2.on("data", function(e3) {
            t2.push({ data: e3, meta: { percent: 0 } });
          }).on("error", function(e3) {
            t2.isPaused ? this.generatedError = e3 : t2.error(e3);
          }).on("end", function() {
            t2.isPaused ? t2._upstreamEnded = true : t2.end();
          });
        }, s.prototype.pause = function() {
          return !!i2.prototype.pause.call(this) && (this._stream.pause(), true);
        }, s.prototype.resume = function() {
          return !!i2.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
        }, t.exports = s;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r2) {
        "use strict";
        var i2 = e("readable-stream").Readable;
        function n2(e2, t2, r3) {
          i2.call(this, t2), this._helper = e2;
          var n3 = this;
          e2.on("data", function(e3, t3) {
            n3.push(e3) || n3._helper.pause(), r3 && r3(t3);
          }).on("error", function(e3) {
            n3.emit("error", e3);
          }).on("end", function() {
            n3.push(null);
          });
        }
        e("../utils").inherits(n2, i2), n2.prototype._read = function() {
          this._helper.resume();
        }, t.exports = n2;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r2) {
        "use strict";
        t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
          if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
          return new Buffer(e2, t2);
        }, allocBuffer: function(e2) {
          if (Buffer.alloc) return Buffer.alloc(e2);
          var t2 = new Buffer(e2);
          return t2.fill(0), t2;
        }, isBuffer: function(e2) {
          return Buffer.isBuffer(e2);
        }, isStream: function(e2) {
          return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
        } };
      }, {}], 15: [function(e, t, r2) {
        "use strict";
        function s(e2, t2, r3) {
          var n3, i3 = u.getTypeOf(t2), s2 = u.extend(r3 || {}, f2);
          s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g2(e2)), s2.createFolders && (n3 = _2(e2)) && b.call(this, n3, true);
          var a2 = "string" === i3 && false === s2.binary && false === s2.base64;
          r3 && void 0 !== r3.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i3 = "string");
          var o2 = null;
          o2 = t2 instanceof c || t2 instanceof l2 ? t2 : p2.isNode && p2.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
          var h3 = new d(e2, o2, s2);
          this.files[e2] = h3;
        }
        var i2 = e("./utf8"), u = e("./utils"), l2 = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f2 = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p2 = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _2 = function(e2) {
          "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
          var t2 = e2.lastIndexOf("/");
          return 0 < t2 ? e2.substring(0, t2) : "";
        }, g2 = function(e2) {
          return "/" !== e2.slice(-1) && (e2 += "/"), e2;
        }, b = function(e2, t2) {
          return t2 = void 0 !== t2 ? t2 : f2.createFolders, e2 = g2(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
        };
        function h2(e2) {
          return "[object RegExp]" === Object.prototype.toString.call(e2);
        }
        var n2 = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(e2) {
          var t2, r3, n3;
          for (t2 in this.files) n3 = this.files[t2], (r3 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r3, n3);
        }, filter: function(r3) {
          var n3 = [];
          return this.forEach(function(e2, t2) {
            r3(e2, t2) && n3.push(t2);
          }), n3;
        }, file: function(e2, t2, r3) {
          if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r3), this;
          if (h2(e2)) {
            var n3 = e2;
            return this.filter(function(e3, t3) {
              return !t3.dir && n3.test(e3);
            });
          }
          var i3 = this.files[this.root + e2];
          return i3 && !i3.dir ? i3 : null;
        }, folder: function(r3) {
          if (!r3) return this;
          if (h2(r3)) return this.filter(function(e3, t3) {
            return t3.dir && r3.test(e3);
          });
          var e2 = this.root + r3, t2 = b.call(this, e2), n3 = this.clone();
          return n3.root = t2.name, n3;
        }, remove: function(r3) {
          r3 = this.root + r3;
          var e2 = this.files[r3];
          if (e2 || ("/" !== r3.slice(-1) && (r3 += "/"), e2 = this.files[r3]), e2 && !e2.dir) delete this.files[r3];
          else for (var t2 = this.filter(function(e3, t3) {
            return t3.name.slice(0, r3.length) === r3;
          }), n3 = 0; n3 < t2.length; n3++) delete this.files[t2[n3].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(e2) {
          var t2, r3 = {};
          try {
            if ((r3 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i2.utf8encode })).type = r3.type.toLowerCase(), r3.compression = r3.compression.toUpperCase(), "binarystring" === r3.type && (r3.type = "string"), !r3.type) throw new Error("No output type specified.");
            u.checkSupport(r3.type), "darwin" !== r3.platform && "freebsd" !== r3.platform && "linux" !== r3.platform && "sunos" !== r3.platform || (r3.platform = "UNIX"), "win32" === r3.platform && (r3.platform = "DOS");
            var n3 = r3.comment || this.comment || "";
            t2 = o.generateWorker(this, r3, n3);
          } catch (e3) {
            (t2 = new l2("error")).error(e3);
          }
          return new a(t2, r3.type || "string", r3.mimeType);
        }, generateAsync: function(e2, t2) {
          return this.generateInternalStream(e2).accumulate(t2);
        }, generateNodeStream: function(e2, t2) {
          return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
        } };
        t.exports = n2;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r2) {
        "use strict";
        t.exports = e("stream");
      }, { stream: void 0 }], 17: [function(e, t, r2) {
        "use strict";
        var n2 = e("./DataReader");
        function i2(e2) {
          n2.call(this, e2);
          for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
        }
        e("../utils").inherits(i2, n2), i2.prototype.byteAt = function(e2) {
          return this.data[this.zero + e2];
        }, i2.prototype.lastIndexOfSignature = function(e2) {
          for (var t2 = e2.charCodeAt(0), r3 = e2.charCodeAt(1), n3 = e2.charCodeAt(2), i3 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r3 && this.data[s + 2] === n3 && this.data[s + 3] === i3) return s - this.zero;
          return -1;
        }, i2.prototype.readAndCheckSignature = function(e2) {
          var t2 = e2.charCodeAt(0), r3 = e2.charCodeAt(1), n3 = e2.charCodeAt(2), i3 = e2.charCodeAt(3), s = this.readData(4);
          return t2 === s[0] && r3 === s[1] && n3 === s[2] && i3 === s[3];
        }, i2.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return [];
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r2) {
        "use strict";
        var n2 = e("../utils");
        function i2(e2) {
          this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
        }
        i2.prototype = { checkOffset: function(e2) {
          this.checkIndex(this.index + e2);
        }, checkIndex: function(e2) {
          if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
        }, setIndex: function(e2) {
          this.checkIndex(e2), this.index = e2;
        }, skip: function(e2) {
          this.setIndex(this.index + e2);
        }, byteAt: function() {
        }, readInt: function(e2) {
          var t2, r3 = 0;
          for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r3 = (r3 << 8) + this.byteAt(t2);
          return this.index += e2, r3;
        }, readString: function(e2) {
          return n2.transformTo("string", this.readData(e2));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var e2 = this.readInt(4);
          return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
        } }, t.exports = i2;
      }, { "../utils": 32 }], 19: [function(e, t, r2) {
        "use strict";
        var n2 = e("./Uint8ArrayReader");
        function i2(e2) {
          n2.call(this, e2);
        }
        e("../utils").inherits(i2, n2), i2.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r2) {
        "use strict";
        var n2 = e("./DataReader");
        function i2(e2) {
          n2.call(this, e2);
        }
        e("../utils").inherits(i2, n2), i2.prototype.byteAt = function(e2) {
          return this.data.charCodeAt(this.zero + e2);
        }, i2.prototype.lastIndexOfSignature = function(e2) {
          return this.data.lastIndexOf(e2) - this.zero;
        }, i2.prototype.readAndCheckSignature = function(e2) {
          return e2 === this.readData(4);
        }, i2.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r2) {
        "use strict";
        var n2 = e("./ArrayReader");
        function i2(e2) {
          n2.call(this, e2);
        }
        e("../utils").inherits(i2, n2), i2.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
          var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r2) {
        "use strict";
        var n2 = e("../utils"), i2 = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h2 = e("./Uint8ArrayReader");
        t.exports = function(e2) {
          var t2 = n2.getTypeOf(e2);
          return n2.checkSupport(t2), "string" !== t2 || i2.uint8array ? "nodebuffer" === t2 ? new o(e2) : i2.uint8array ? new h2(n2.transformTo("uint8array", e2)) : new s(n2.transformTo("array", e2)) : new a(e2);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r2) {
        "use strict";
        r2.LOCAL_FILE_HEADER = "PK", r2.CENTRAL_FILE_HEADER = "PK", r2.CENTRAL_DIRECTORY_END = "PK", r2.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r2.ZIP64_CENTRAL_DIRECTORY_END = "PK", r2.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(e, t, r2) {
        "use strict";
        var n2 = e("./GenericWorker"), i2 = e("../utils");
        function s(e2) {
          n2.call(this, "ConvertWorker to " + e2), this.destType = e2;
        }
        i2.inherits(s, n2), s.prototype.processChunk = function(e2) {
          this.push({ data: i2.transformTo(this.destType, e2.data), meta: e2.meta });
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r2) {
        "use strict";
        var n2 = e("./GenericWorker"), i2 = e("../crc32");
        function s() {
          n2.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        e("../utils").inherits(s, n2), s.prototype.processChunk = function(e2) {
          this.streamInfo.crc32 = i2(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
        }, t.exports = s;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r2) {
        "use strict";
        var n2 = e("../utils"), i2 = e("./GenericWorker");
        function s(e2) {
          i2.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
        }
        n2.inherits(s, i2), s.prototype.processChunk = function(e2) {
          if (e2) {
            var t2 = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = t2 + e2.data.length;
          }
          i2.prototype.processChunk.call(this, e2);
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r2) {
        "use strict";
        var n2 = e("../utils"), i2 = e("./GenericWorker");
        function s(e2) {
          i2.call(this, "DataWorker");
          var t2 = this;
          this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
            t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n2.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
          }, function(e3) {
            t2.error(e3);
          });
        }
        n2.inherits(s, i2), s.prototype.cleanUp = function() {
          i2.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!i2.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n2.delay(this._tickAndRepeat, [], this)), true);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n2.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return false;
          var e2 = null, t2 = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              e2 = this.data.substring(this.index, t2);
              break;
            case "uint8array":
              e2 = this.data.subarray(this.index, t2);
              break;
            case "array":
            case "nodebuffer":
              e2 = this.data.slice(this.index, t2);
          }
          return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r2) {
        "use strict";
        function n2(e2) {
          this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        n2.prototype = { push: function(e2) {
          this.emit("data", e2);
        }, end: function() {
          if (this.isFinished) return false;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = true;
          } catch (e2) {
            this.emit("error", e2);
          }
          return true;
        }, error: function(e2) {
          return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
        }, on: function(e2, t2) {
          return this._listeners[e2].push(t2), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(e2, t2) {
          if (this._listeners[e2]) for (var r3 = 0; r3 < this._listeners[e2].length; r3++) this._listeners[e2][r3].call(this, t2);
        }, pipe: function(e2) {
          return e2.registerPrevious(this);
        }, registerPrevious: function(e2) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return false;
          var e2 = this.isPaused = false;
          return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
        }, flush: function() {
        }, processChunk: function(e2) {
          this.push(e2);
        }, withStreamInfo: function(e2, t2) {
          return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = true, this.previous && this.previous.lock();
        }, toString: function() {
          var e2 = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + e2 : e2;
        } }, t.exports = n2;
      }, {}], 29: [function(e, t, r2) {
        "use strict";
        var h2 = e("../utils"), i2 = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n2 = e("../support"), a = e("../external"), o = null;
        if (n2.nodestream) try {
          o = e("../nodejs/NodejsStreamOutputAdapter");
        } catch (e2) {
        }
        function l2(e2, o2) {
          return new a.Promise(function(t2, r3) {
            var n3 = [], i3 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
            e2.on("data", function(e3, t3) {
              n3.push(e3), o2 && o2(t3);
            }).on("error", function(e3) {
              n3 = [], r3(e3);
            }).on("end", function() {
              try {
                var e3 = (function(e4, t3, r4) {
                  switch (e4) {
                    case "blob":
                      return h2.newBlob(h2.transformTo("arraybuffer", t3), r4);
                    case "base64":
                      return u.encode(t3);
                    default:
                      return h2.transformTo(e4, t3);
                  }
                })(s2, (function(e4, t3) {
                  var r4, n4 = 0, i4 = null, s3 = 0;
                  for (r4 = 0; r4 < t3.length; r4++) s3 += t3[r4].length;
                  switch (e4) {
                    case "string":
                      return t3.join("");
                    case "array":
                      return Array.prototype.concat.apply([], t3);
                    case "uint8array":
                      for (i4 = new Uint8Array(s3), r4 = 0; r4 < t3.length; r4++) i4.set(t3[r4], n4), n4 += t3[r4].length;
                      return i4;
                    case "nodebuffer":
                      return Buffer.concat(t3);
                    default:
                      throw new Error("concat : unsupported type '" + e4 + "'");
                  }
                })(i3, n3), a2);
                t2(e3);
              } catch (e4) {
                r3(e4);
              }
              n3 = [];
            }).resume();
          });
        }
        function f2(e2, t2, r3) {
          var n3 = t2;
          switch (t2) {
            case "blob":
            case "arraybuffer":
              n3 = "uint8array";
              break;
            case "base64":
              n3 = "string";
          }
          try {
            this._internalType = n3, this._outputType = t2, this._mimeType = r3, h2.checkSupport(n3), this._worker = e2.pipe(new i2(n3)), e2.lock();
          } catch (e3) {
            this._worker = new s("error"), this._worker.error(e3);
          }
        }
        f2.prototype = { accumulate: function(e2) {
          return l2(this, e2);
        }, on: function(e2, t2) {
          var r3 = this;
          return "data" === e2 ? this._worker.on(e2, function(e3) {
            t2.call(r3, e3.data, e3.meta);
          }) : this._worker.on(e2, function() {
            h2.delay(t2, arguments, r3);
          }), this;
        }, resume: function() {
          return h2.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(e2) {
          if (h2.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
          return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
        } }, t.exports = f2;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r2) {
        "use strict";
        if (r2.base64 = true, r2.array = true, r2.string = true, r2.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r2.nodebuffer = "undefined" != typeof Buffer, r2.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r2.blob = false;
        else {
          var n2 = new ArrayBuffer(0);
          try {
            r2.blob = 0 === new Blob([n2], { type: "application/zip" }).size;
          } catch (e2) {
            try {
              var i2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              i2.append(n2), r2.blob = 0 === i2.getBlob("application/zip").size;
            } catch (e3) {
              r2.blob = false;
            }
          }
        }
        try {
          r2.nodestream = !!e("readable-stream").Readable;
        } catch (e2) {
          r2.nodestream = false;
        }
      }, { "readable-stream": 16 }], 31: [function(e, t, s) {
        "use strict";
        for (var o = e("./utils"), h2 = e("./support"), r2 = e("./nodejsUtils"), n2 = e("./stream/GenericWorker"), u = new Array(256), i2 = 0; i2 < 256; i2++) u[i2] = 252 <= i2 ? 6 : 248 <= i2 ? 5 : 240 <= i2 ? 4 : 224 <= i2 ? 3 : 192 <= i2 ? 2 : 1;
        u[254] = u[254] = 1;
        function a() {
          n2.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function l2() {
          n2.call(this, "utf-8 encode");
        }
        s.utf8encode = function(e2) {
          return h2.nodebuffer ? r2.newBufferFrom(e2, "utf-8") : (function(e3) {
            var t2, r3, n3, i3, s2, a2 = e3.length, o2 = 0;
            for (i3 = 0; i3 < a2; i3++) 55296 == (64512 & (r3 = e3.charCodeAt(i3))) && i3 + 1 < a2 && 56320 == (64512 & (n3 = e3.charCodeAt(i3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (n3 - 56320), i3++), o2 += r3 < 128 ? 1 : r3 < 2048 ? 2 : r3 < 65536 ? 3 : 4;
            for (t2 = h2.uint8array ? new Uint8Array(o2) : new Array(o2), i3 = s2 = 0; s2 < o2; i3++) 55296 == (64512 & (r3 = e3.charCodeAt(i3))) && i3 + 1 < a2 && 56320 == (64512 & (n3 = e3.charCodeAt(i3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (n3 - 56320), i3++), r3 < 128 ? t2[s2++] = r3 : (r3 < 2048 ? t2[s2++] = 192 | r3 >>> 6 : (r3 < 65536 ? t2[s2++] = 224 | r3 >>> 12 : (t2[s2++] = 240 | r3 >>> 18, t2[s2++] = 128 | r3 >>> 12 & 63), t2[s2++] = 128 | r3 >>> 6 & 63), t2[s2++] = 128 | 63 & r3);
            return t2;
          })(e2);
        }, s.utf8decode = function(e2) {
          return h2.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
            var t2, r3, n3, i3, s2 = e3.length, a2 = new Array(2 * s2);
            for (t2 = r3 = 0; t2 < s2; ) if ((n3 = e3[t2++]) < 128) a2[r3++] = n3;
            else if (4 < (i3 = u[n3])) a2[r3++] = 65533, t2 += i3 - 1;
            else {
              for (n3 &= 2 === i3 ? 31 : 3 === i3 ? 15 : 7; 1 < i3 && t2 < s2; ) n3 = n3 << 6 | 63 & e3[t2++], i3--;
              1 < i3 ? a2[r3++] = 65533 : n3 < 65536 ? a2[r3++] = n3 : (n3 -= 65536, a2[r3++] = 55296 | n3 >> 10 & 1023, a2[r3++] = 56320 | 1023 & n3);
            }
            return a2.length !== r3 && (a2.subarray ? a2 = a2.subarray(0, r3) : a2.length = r3), o.applyFromCharCode(a2);
          })(e2 = o.transformTo(h2.uint8array ? "uint8array" : "array", e2));
        }, o.inherits(a, n2), a.prototype.processChunk = function(e2) {
          var t2 = o.transformTo(h2.uint8array ? "uint8array" : "array", e2.data);
          if (this.leftOver && this.leftOver.length) {
            if (h2.uint8array) {
              var r3 = t2;
              (t2 = new Uint8Array(r3.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r3, this.leftOver.length);
            } else t2 = this.leftOver.concat(t2);
            this.leftOver = null;
          }
          var n3 = (function(e3, t3) {
            var r4;
            for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r4 = t3 - 1; 0 <= r4 && 128 == (192 & e3[r4]); ) r4--;
            return r4 < 0 ? t3 : 0 === r4 ? t3 : r4 + u[e3[r4]] > t3 ? r4 : t3;
          })(t2), i3 = t2;
          n3 !== t2.length && (h2.uint8array ? (i3 = t2.subarray(0, n3), this.leftOver = t2.subarray(n3, t2.length)) : (i3 = t2.slice(0, n3), this.leftOver = t2.slice(n3, t2.length))), this.push({ data: s.utf8decode(i3), meta: e2.meta });
        }, a.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, s.Utf8DecodeWorker = a, o.inherits(l2, n2), l2.prototype.processChunk = function(e2) {
          this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
        }, s.Utf8EncodeWorker = l2;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
        "use strict";
        var o = e("./support"), h2 = e("./base64"), r2 = e("./nodejsUtils"), u = e("./external");
        function n2(e2) {
          return e2;
        }
        function l2(e2, t2) {
          for (var r3 = 0; r3 < e2.length; ++r3) t2[r3] = 255 & e2.charCodeAt(r3);
          return t2;
        }
        e("setimmediate"), a.newBlob = function(t2, r3) {
          a.checkSupport("blob");
          try {
            return new Blob([t2], { type: r3 });
          } catch (e2) {
            try {
              var n3 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return n3.append(t2), n3.getBlob(r3);
            } catch (e3) {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var i2 = { stringifyByChunk: function(e2, t2, r3) {
          var n3 = [], i3 = 0, s2 = e2.length;
          if (s2 <= r3) return String.fromCharCode.apply(null, e2);
          for (; i3 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n3.push(String.fromCharCode.apply(null, e2.slice(i3, Math.min(i3 + r3, s2)))) : n3.push(String.fromCharCode.apply(null, e2.subarray(i3, Math.min(i3 + r3, s2)))), i3 += r3;
          return n3.join("");
        }, stringifyByChar: function(e2) {
          for (var t2 = "", r3 = 0; r3 < e2.length; r3++) t2 += String.fromCharCode(e2[r3]);
          return t2;
        }, applyCanBeUsed: { uint8array: (function() {
          try {
            return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
          } catch (e2) {
            return false;
          }
        })(), nodebuffer: (function() {
          try {
            return o.nodebuffer && 1 === String.fromCharCode.apply(null, r2.allocBuffer(1)).length;
          } catch (e2) {
            return false;
          }
        })() } };
        function s(e2) {
          var t2 = 65536, r3 = a.getTypeOf(e2), n3 = true;
          if ("uint8array" === r3 ? n3 = i2.applyCanBeUsed.uint8array : "nodebuffer" === r3 && (n3 = i2.applyCanBeUsed.nodebuffer), n3) for (; 1 < t2; ) try {
            return i2.stringifyByChunk(e2, r3, t2);
          } catch (e3) {
            t2 = Math.floor(t2 / 2);
          }
          return i2.stringifyByChar(e2);
        }
        function f2(e2, t2) {
          for (var r3 = 0; r3 < e2.length; r3++) t2[r3] = e2[r3];
          return t2;
        }
        a.applyFromCharCode = s;
        var c = {};
        c.string = { string: n2, array: function(e2) {
          return l2(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return c.string.uint8array(e2).buffer;
        }, uint8array: function(e2) {
          return l2(e2, new Uint8Array(e2.length));
        }, nodebuffer: function(e2) {
          return l2(e2, r2.allocBuffer(e2.length));
        } }, c.array = { string: s, array: n2, arraybuffer: function(e2) {
          return new Uint8Array(e2).buffer;
        }, uint8array: function(e2) {
          return new Uint8Array(e2);
        }, nodebuffer: function(e2) {
          return r2.newBufferFrom(e2);
        } }, c.arraybuffer = { string: function(e2) {
          return s(new Uint8Array(e2));
        }, array: function(e2) {
          return f2(new Uint8Array(e2), new Array(e2.byteLength));
        }, arraybuffer: n2, uint8array: function(e2) {
          return new Uint8Array(e2);
        }, nodebuffer: function(e2) {
          return r2.newBufferFrom(new Uint8Array(e2));
        } }, c.uint8array = { string: s, array: function(e2) {
          return f2(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return e2.buffer;
        }, uint8array: n2, nodebuffer: function(e2) {
          return r2.newBufferFrom(e2);
        } }, c.nodebuffer = { string: s, array: function(e2) {
          return f2(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return c.nodebuffer.uint8array(e2).buffer;
        }, uint8array: function(e2) {
          return f2(e2, new Uint8Array(e2.length));
        }, nodebuffer: n2 }, a.transformTo = function(e2, t2) {
          if (t2 = t2 || "", !e2) return t2;
          a.checkSupport(e2);
          var r3 = a.getTypeOf(t2);
          return c[r3][e2](t2);
        }, a.resolve = function(e2) {
          for (var t2 = e2.split("/"), r3 = [], n3 = 0; n3 < t2.length; n3++) {
            var i3 = t2[n3];
            "." === i3 || "" === i3 && 0 !== n3 && n3 !== t2.length - 1 || (".." === i3 ? r3.pop() : r3.push(i3));
          }
          return r3.join("/");
        }, a.getTypeOf = function(e2) {
          return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r2.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, a.checkSupport = function(e2) {
          if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
        }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
          var t2, r3, n3 = "";
          for (r3 = 0; r3 < (e2 || "").length; r3++) n3 += "\\x" + ((t2 = e2.charCodeAt(r3)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
          return n3;
        }, a.delay = function(e2, t2, r3) {
          setImmediate(function() {
            e2.apply(r3 || null, t2 || []);
          });
        }, a.inherits = function(e2, t2) {
          function r3() {
          }
          r3.prototype = t2.prototype, e2.prototype = new r3();
        }, a.extend = function() {
          var e2, t2, r3 = {};
          for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r3[t2] && (r3[t2] = arguments[e2][t2]);
          return r3;
        }, a.prepareContent = function(r3, e2, n3, i3, s2) {
          return u.Promise.resolve(e2).then(function(n4) {
            return o.blob && (n4 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n4))) && "undefined" != typeof FileReader ? new u.Promise(function(t2, r4) {
              var e3 = new FileReader();
              e3.onload = function(e4) {
                t2(e4.target.result);
              }, e3.onerror = function(e4) {
                r4(e4.target.error);
              }, e3.readAsArrayBuffer(n4);
            }) : n4;
          }).then(function(e3) {
            var t2 = a.getTypeOf(e3);
            return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h2.decode(e3) : n3 && true !== i3 && (e3 = (function(e4) {
              return l2(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
            })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r3 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r2) {
        "use strict";
        var n2 = e("./reader/readerFor"), i2 = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
        function h2(e2) {
          this.files = [], this.loadOptions = e2;
        }
        h2.prototype = { checkSignature: function(e2) {
          if (!this.reader.readAndCheckSignature(e2)) {
            this.reader.index -= 4;
            var t2 = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + i2.pretty(t2) + ", expected " + i2.pretty(e2) + ")");
          }
        }, isSignature: function(e2, t2) {
          var r3 = this.reader.index;
          this.reader.setIndex(e2);
          var n3 = this.reader.readString(4) === t2;
          return this.reader.setIndex(r3), n3;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r3 = i2.transformTo(t2, e2);
          this.zipComment = this.loadOptions.decodeFileName(r3);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var e2, t2, r3, n3 = this.zip64EndOfCentralSize - 44; 0 < n3; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r3 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r3 };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var e2, t2;
          for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
        }, readCentralDir: function() {
          var e2;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
          if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
          if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
          this.reader.setIndex(e2);
          var t2 = e2;
          if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i2.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i2.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i2.MAX_VALUE_16BITS || this.centralDirRecords === i2.MAX_VALUE_16BITS || this.centralDirSize === i2.MAX_VALUE_32BITS || this.centralDirOffset === i2.MAX_VALUE_32BITS) {
            if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var r3 = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (r3 += 20, r3 += 12 + this.zip64EndOfCentralSize);
          var n3 = t2 - r3;
          if (0 < n3) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n3);
          else if (n3 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n3) + " bytes.");
        }, prepareReader: function(e2) {
          this.reader = n2(e2);
        }, load: function(e2) {
          this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, t.exports = h2;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r2) {
        "use strict";
        var n2 = e("./reader/readerFor"), s = e("./utils"), i2 = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h2 = e("./compressions"), u = e("./support");
        function l2(e2, t2) {
          this.options = e2, this.loadOptions = t2;
        }
        l2.prototype = { isEncrypted: function() {
          return 1 == (1 & this.bitFlag);
        }, useUTF8: function() {
          return 2048 == (2048 & this.bitFlag);
        }, readLocalPart: function(e2) {
          var t2, r3;
          if (e2.skip(22), this.fileNameLength = e2.readInt(2), r3 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r3), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if (null === (t2 = (function(e3) {
            for (var t3 in h2) if (Object.prototype.hasOwnProperty.call(h2, t3) && h2[t3].magic === e3) return h2[t3];
            return null;
          })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
          this.decompressed = new i2(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
        }, readCentralPart: function(e2) {
          this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
          var t2 = e2.readInt(2);
          if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var e2 = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var e2 = n2(this.extraFields[1].value);
            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
          }
        }, readExtraFields: function(e2) {
          var t2, r3, n3, i3 = e2.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i3; ) t2 = e2.readInt(2), r3 = e2.readInt(2), n3 = e2.readData(r3), this.extraFields[t2] = { id: t2, length: r3, value: n3 };
          e2.setIndex(i3);
        }, handleUTF8: function() {
          var e2 = u.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
          else {
            var t2 = this.findExtraFieldUnicodePath();
            if (null !== t2) this.fileNameStr = t2;
            else {
              var r3 = s.transformTo(e2, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(r3);
            }
            var n3 = this.findExtraFieldUnicodeComment();
            if (null !== n3) this.fileCommentStr = n3;
            else {
              var i3 = s.transformTo(e2, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(i3);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var e2 = this.extraFields[28789];
          if (e2) {
            var t2 = n2(e2.value);
            return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var e2 = this.extraFields[25461];
          if (e2) {
            var t2 = n2(e2.value);
            return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
          }
          return null;
        } }, t.exports = l2;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r2) {
        "use strict";
        function n2(e2, t2, r3) {
          this.name = e2, this.dir = r3.dir, this.date = r3.date, this.comment = r3.comment, this.unixPermissions = r3.unixPermissions, this.dosPermissions = r3.dosPermissions, this._data = t2, this._dataBinary = r3.binary, this.options = { compression: r3.compression, compressionOptions: r3.compressionOptions };
        }
        var s = e("./stream/StreamHelper"), i2 = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h2 = e("./stream/GenericWorker");
        n2.prototype = { internalStream: function(e2) {
          var t2 = null, r3 = "string";
          try {
            if (!e2) throw new Error("No output type specified.");
            var n3 = "string" === (r3 = e2.toLowerCase()) || "text" === r3;
            "binarystring" !== r3 && "text" !== r3 || (r3 = "string"), t2 = this._decompressWorker();
            var i3 = !this._dataBinary;
            i3 && !n3 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i3 && n3 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
          } catch (e3) {
            (t2 = new h2("error")).error(e3);
          }
          return new s(t2, r3, "");
        }, async: function(e2, t2) {
          return this.internalStream(e2).accumulate(t2);
        }, nodeStream: function(e2, t2) {
          return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
        }, _compressWorker: function(e2, t2) {
          if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
          var r3 = this._decompressWorker();
          return this._dataBinary || (r3 = r3.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r3, e2, t2);
        }, _decompressWorker: function() {
          return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h2 ? this._data : new i2(this._data);
        } };
        for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l2 = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, f2 = 0; f2 < u.length; f2++) n2.prototype[u[f2]] = l2;
        t.exports = n2;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l2, t) {
        (function(t2) {
          "use strict";
          var r2, n2, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
          if (e2) {
            var i2 = 0, s = new e2(u), a = t2.document.createTextNode("");
            s.observe(a, { characterData: true }), r2 = function() {
              a.data = i2 = ++i2 % 2;
            };
          } else if (t2.setImmediate || void 0 === t2.MessageChannel) r2 = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
            var e3 = t2.document.createElement("script");
            e3.onreadystatechange = function() {
              u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
            }, t2.document.documentElement.appendChild(e3);
          } : function() {
            setTimeout(u, 0);
          };
          else {
            var o = new t2.MessageChannel();
            o.port1.onmessage = u, r2 = function() {
              o.port2.postMessage(0);
            };
          }
          var h2 = [];
          function u() {
            var e3, t3;
            n2 = true;
            for (var r3 = h2.length; r3; ) {
              for (t3 = h2, h2 = [], e3 = -1; ++e3 < r3; ) t3[e3]();
              r3 = h2.length;
            }
            n2 = false;
          }
          l2.exports = function(e3) {
            1 !== h2.push(e3) || n2 || r2();
          };
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}], 37: [function(e, t, r2) {
        "use strict";
        var i2 = e("immediate");
        function u() {
        }
        var l2 = {}, s = ["REJECTED"], a = ["FULFILLED"], n2 = ["PENDING"];
        function o(e2) {
          if ("function" != typeof e2) throw new TypeError("resolver must be a function");
          this.state = n2, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
        }
        function h2(e2, t2, r3) {
          this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r3 && (this.onRejected = r3, this.callRejected = this.otherCallRejected);
        }
        function f2(t2, r3, n3) {
          i2(function() {
            var e2;
            try {
              e2 = r3(n3);
            } catch (e3) {
              return l2.reject(t2, e3);
            }
            e2 === t2 ? l2.reject(t2, new TypeError("Cannot resolve promise with itself")) : l2.resolve(t2, e2);
          });
        }
        function c(e2) {
          var t2 = e2 && e2.then;
          if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
            t2.apply(e2, arguments);
          };
        }
        function d(t2, e2) {
          var r3 = false;
          function n3(e3) {
            r3 || (r3 = true, l2.reject(t2, e3));
          }
          function i3(e3) {
            r3 || (r3 = true, l2.resolve(t2, e3));
          }
          var s2 = p2(function() {
            e2(i3, n3);
          });
          "error" === s2.status && n3(s2.value);
        }
        function p2(e2, t2) {
          var r3 = {};
          try {
            r3.value = e2(t2), r3.status = "success";
          } catch (e3) {
            r3.status = "error", r3.value = e3;
          }
          return r3;
        }
        (t.exports = o).prototype.finally = function(t2) {
          if ("function" != typeof t2) return this;
          var r3 = this.constructor;
          return this.then(function(e2) {
            return r3.resolve(t2()).then(function() {
              return e2;
            });
          }, function(e2) {
            return r3.resolve(t2()).then(function() {
              throw e2;
            });
          });
        }, o.prototype.catch = function(e2) {
          return this.then(null, e2);
        }, o.prototype.then = function(e2, t2) {
          if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
          var r3 = new this.constructor(u);
          this.state !== n2 ? f2(r3, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h2(r3, e2, t2));
          return r3;
        }, h2.prototype.callFulfilled = function(e2) {
          l2.resolve(this.promise, e2);
        }, h2.prototype.otherCallFulfilled = function(e2) {
          f2(this.promise, this.onFulfilled, e2);
        }, h2.prototype.callRejected = function(e2) {
          l2.reject(this.promise, e2);
        }, h2.prototype.otherCallRejected = function(e2) {
          f2(this.promise, this.onRejected, e2);
        }, l2.resolve = function(e2, t2) {
          var r3 = p2(c, t2);
          if ("error" === r3.status) return l2.reject(e2, r3.value);
          var n3 = r3.value;
          if (n3) d(e2, n3);
          else {
            e2.state = a, e2.outcome = t2;
            for (var i3 = -1, s2 = e2.queue.length; ++i3 < s2; ) e2.queue[i3].callFulfilled(t2);
          }
          return e2;
        }, l2.reject = function(e2, t2) {
          e2.state = s, e2.outcome = t2;
          for (var r3 = -1, n3 = e2.queue.length; ++r3 < n3; ) e2.queue[r3].callRejected(t2);
          return e2;
        }, o.resolve = function(e2) {
          if (e2 instanceof this) return e2;
          return l2.resolve(new this(u), e2);
        }, o.reject = function(e2) {
          var t2 = new this(u);
          return l2.reject(t2, e2);
        }, o.all = function(e2) {
          var r3 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
          var n3 = e2.length, i3 = false;
          if (!n3) return this.resolve([]);
          var s2 = new Array(n3), a2 = 0, t2 = -1, o2 = new this(u);
          for (; ++t2 < n3; ) h3(e2[t2], t2);
          return o2;
          function h3(e3, t3) {
            r3.resolve(e3).then(function(e4) {
              s2[t3] = e4, ++a2 !== n3 || i3 || (i3 = true, l2.resolve(o2, s2));
            }, function(e4) {
              i3 || (i3 = true, l2.reject(o2, e4));
            });
          }
        }, o.race = function(e2) {
          var t2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
          var r3 = e2.length, n3 = false;
          if (!r3) return this.resolve([]);
          var i3 = -1, s2 = new this(u);
          for (; ++i3 < r3; ) a2 = e2[i3], t2.resolve(a2).then(function(e3) {
            n3 || (n3 = true, l2.resolve(s2, e3));
          }, function(e3) {
            n3 || (n3 = true, l2.reject(s2, e3));
          });
          var a2;
          return s2;
        };
      }, { immediate: 36 }], 38: [function(e, t, r2) {
        "use strict";
        var n2 = {};
        (0, e("./lib/utils/common").assign)(n2, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n2;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r2) {
        "use strict";
        var a = e("./zlib/deflate"), o = e("./utils/common"), h2 = e("./utils/strings"), i2 = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l2 = 0, f2 = -1, c = 0, d = 8;
        function p2(e2) {
          if (!(this instanceof p2)) return new p2(e2);
          this.options = o.assign({ level: f2, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
          var r3 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
          if (r3 !== l2) throw new Error(i2[r3]);
          if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
            var n3;
            if (n3 = "string" == typeof t2.dictionary ? h2.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r3 = a.deflateSetDictionary(this.strm, n3)) !== l2) throw new Error(i2[r3]);
            this._dict_set = true;
          }
        }
        function n2(e2, t2) {
          var r3 = new p2(t2);
          if (r3.push(e2, true), r3.err) throw r3.msg || i2[r3.err];
          return r3.result;
        }
        p2.prototype.push = function(e2, t2) {
          var r3, n3, i3 = this.strm, s2 = this.options.chunkSize;
          if (this.ended) return false;
          n3 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i3.input = h2.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i3.input = new Uint8Array(e2) : i3.input = e2, i3.next_in = 0, i3.avail_in = i3.input.length;
          do {
            if (0 === i3.avail_out && (i3.output = new o.Buf8(s2), i3.next_out = 0, i3.avail_out = s2), 1 !== (r3 = a.deflate(i3, n3)) && r3 !== l2) return this.onEnd(r3), !(this.ended = true);
            0 !== i3.avail_out && (0 !== i3.avail_in || 4 !== n3 && 2 !== n3) || ("string" === this.options.to ? this.onData(h2.buf2binstring(o.shrinkBuf(i3.output, i3.next_out))) : this.onData(o.shrinkBuf(i3.output, i3.next_out)));
          } while ((0 < i3.avail_in || 0 === i3.avail_out) && 1 !== r3);
          return 4 === n3 ? (r3 = a.deflateEnd(this.strm), this.onEnd(r3), this.ended = true, r3 === l2) : 2 !== n3 || (this.onEnd(l2), !(i3.avail_out = 0));
        }, p2.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, p2.prototype.onEnd = function(e2) {
          e2 === l2 && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r2.Deflate = p2, r2.deflate = n2, r2.deflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, n2(e2, t2);
        }, r2.gzip = function(e2, t2) {
          return (t2 = t2 || {}).gzip = true, n2(e2, t2);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r2) {
        "use strict";
        var c = e("./zlib/inflate"), d = e("./utils/common"), p2 = e("./utils/strings"), m = e("./zlib/constants"), n2 = e("./zlib/messages"), i2 = e("./zlib/zstream"), s = e("./zlib/gzheader"), _2 = Object.prototype.toString;
        function a(e2) {
          if (!(this instanceof a)) return new a(e2);
          this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i2(), this.strm.avail_out = 0;
          var r3 = c.inflateInit2(this.strm, t2.windowBits);
          if (r3 !== m.Z_OK) throw new Error(n2[r3]);
          this.header = new s(), c.inflateGetHeader(this.strm, this.header);
        }
        function o(e2, t2) {
          var r3 = new a(t2);
          if (r3.push(e2, true), r3.err) throw r3.msg || n2[r3.err];
          return r3.result;
        }
        a.prototype.push = function(e2, t2) {
          var r3, n3, i3, s2, a2, o2, h2 = this.strm, u = this.options.chunkSize, l2 = this.options.dictionary, f2 = false;
          if (this.ended) return false;
          n3 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h2.input = p2.binstring2buf(e2) : "[object ArrayBuffer]" === _2.call(e2) ? h2.input = new Uint8Array(e2) : h2.input = e2, h2.next_in = 0, h2.avail_in = h2.input.length;
          do {
            if (0 === h2.avail_out && (h2.output = new d.Buf8(u), h2.next_out = 0, h2.avail_out = u), (r3 = c.inflate(h2, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l2 && (o2 = "string" == typeof l2 ? p2.string2buf(l2) : "[object ArrayBuffer]" === _2.call(l2) ? new Uint8Array(l2) : l2, r3 = c.inflateSetDictionary(this.strm, o2)), r3 === m.Z_BUF_ERROR && true === f2 && (r3 = m.Z_OK, f2 = false), r3 !== m.Z_STREAM_END && r3 !== m.Z_OK) return this.onEnd(r3), !(this.ended = true);
            h2.next_out && (0 !== h2.avail_out && r3 !== m.Z_STREAM_END && (0 !== h2.avail_in || n3 !== m.Z_FINISH && n3 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i3 = p2.utf8border(h2.output, h2.next_out), s2 = h2.next_out - i3, a2 = p2.buf2string(h2.output, i3), h2.next_out = s2, h2.avail_out = u - s2, s2 && d.arraySet(h2.output, h2.output, i3, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h2.output, h2.next_out)))), 0 === h2.avail_in && 0 === h2.avail_out && (f2 = true);
          } while ((0 < h2.avail_in || 0 === h2.avail_out) && r3 !== m.Z_STREAM_END);
          return r3 === m.Z_STREAM_END && (n3 = m.Z_FINISH), n3 === m.Z_FINISH ? (r3 = c.inflateEnd(this.strm), this.onEnd(r3), this.ended = true, r3 === m.Z_OK) : n3 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h2.avail_out = 0));
        }, a.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, a.prototype.onEnd = function(e2) {
          e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r2.Inflate = a, r2.inflate = o, r2.inflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, o(e2, t2);
        }, r2.ungzip = o;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r2) {
        "use strict";
        var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        r2.assign = function(e2) {
          for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
            var r3 = t2.shift();
            if (r3) {
              if ("object" != typeof r3) throw new TypeError(r3 + "must be non-object");
              for (var n3 in r3) r3.hasOwnProperty(n3) && (e2[n3] = r3[n3]);
            }
          }
          return e2;
        }, r2.shrinkBuf = function(e2, t2) {
          return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
        };
        var i2 = { arraySet: function(e2, t2, r3, n3, i3) {
          if (t2.subarray && e2.subarray) e2.set(t2.subarray(r3, r3 + n3), i3);
          else for (var s2 = 0; s2 < n3; s2++) e2[i3 + s2] = t2[r3 + s2];
        }, flattenChunks: function(e2) {
          var t2, r3, n3, i3, s2, a;
          for (t2 = n3 = 0, r3 = e2.length; t2 < r3; t2++) n3 += e2[t2].length;
          for (a = new Uint8Array(n3), t2 = i3 = 0, r3 = e2.length; t2 < r3; t2++) s2 = e2[t2], a.set(s2, i3), i3 += s2.length;
          return a;
        } }, s = { arraySet: function(e2, t2, r3, n3, i3) {
          for (var s2 = 0; s2 < n3; s2++) e2[i3 + s2] = t2[r3 + s2];
        }, flattenChunks: function(e2) {
          return [].concat.apply([], e2);
        } };
        r2.setTyped = function(e2) {
          e2 ? (r2.Buf8 = Uint8Array, r2.Buf16 = Uint16Array, r2.Buf32 = Int32Array, r2.assign(r2, i2)) : (r2.Buf8 = Array, r2.Buf16 = Array, r2.Buf32 = Array, r2.assign(r2, s));
        }, r2.setTyped(n2);
      }, {}], 42: [function(e, t, r2) {
        "use strict";
        var h2 = e("./common"), i2 = true, s = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch (e2) {
          i2 = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (e2) {
          s = false;
        }
        for (var u = new h2.Buf8(256), n2 = 0; n2 < 256; n2++) u[n2] = 252 <= n2 ? 6 : 248 <= n2 ? 5 : 240 <= n2 ? 4 : 224 <= n2 ? 3 : 192 <= n2 ? 2 : 1;
        function l2(e2, t2) {
          if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i2)) return String.fromCharCode.apply(null, h2.shrinkBuf(e2, t2));
          for (var r3 = "", n3 = 0; n3 < t2; n3++) r3 += String.fromCharCode(e2[n3]);
          return r3;
        }
        u[254] = u[254] = 1, r2.string2buf = function(e2) {
          var t2, r3, n3, i3, s2, a = e2.length, o = 0;
          for (i3 = 0; i3 < a; i3++) 55296 == (64512 & (r3 = e2.charCodeAt(i3))) && i3 + 1 < a && 56320 == (64512 & (n3 = e2.charCodeAt(i3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (n3 - 56320), i3++), o += r3 < 128 ? 1 : r3 < 2048 ? 2 : r3 < 65536 ? 3 : 4;
          for (t2 = new h2.Buf8(o), i3 = s2 = 0; s2 < o; i3++) 55296 == (64512 & (r3 = e2.charCodeAt(i3))) && i3 + 1 < a && 56320 == (64512 & (n3 = e2.charCodeAt(i3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (n3 - 56320), i3++), r3 < 128 ? t2[s2++] = r3 : (r3 < 2048 ? t2[s2++] = 192 | r3 >>> 6 : (r3 < 65536 ? t2[s2++] = 224 | r3 >>> 12 : (t2[s2++] = 240 | r3 >>> 18, t2[s2++] = 128 | r3 >>> 12 & 63), t2[s2++] = 128 | r3 >>> 6 & 63), t2[s2++] = 128 | 63 & r3);
          return t2;
        }, r2.buf2binstring = function(e2) {
          return l2(e2, e2.length);
        }, r2.binstring2buf = function(e2) {
          for (var t2 = new h2.Buf8(e2.length), r3 = 0, n3 = t2.length; r3 < n3; r3++) t2[r3] = e2.charCodeAt(r3);
          return t2;
        }, r2.buf2string = function(e2, t2) {
          var r3, n3, i3, s2, a = t2 || e2.length, o = new Array(2 * a);
          for (r3 = n3 = 0; r3 < a; ) if ((i3 = e2[r3++]) < 128) o[n3++] = i3;
          else if (4 < (s2 = u[i3])) o[n3++] = 65533, r3 += s2 - 1;
          else {
            for (i3 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r3 < a; ) i3 = i3 << 6 | 63 & e2[r3++], s2--;
            1 < s2 ? o[n3++] = 65533 : i3 < 65536 ? o[n3++] = i3 : (i3 -= 65536, o[n3++] = 55296 | i3 >> 10 & 1023, o[n3++] = 56320 | 1023 & i3);
          }
          return l2(o, n3);
        }, r2.utf8border = function(e2, t2) {
          var r3;
          for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r3 = t2 - 1; 0 <= r3 && 128 == (192 & e2[r3]); ) r3--;
          return r3 < 0 ? t2 : 0 === r3 ? t2 : r3 + u[e2[r3]] > t2 ? r3 : t2;
        };
      }, { "./common": 41 }], 43: [function(e, t, r2) {
        "use strict";
        t.exports = function(e2, t2, r3, n2) {
          for (var i2 = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r3; ) {
            for (r3 -= a = 2e3 < r3 ? 2e3 : r3; s = s + (i2 = i2 + t2[n2++] | 0) | 0, --a; ) ;
            i2 %= 65521, s %= 65521;
          }
          return i2 | s << 16 | 0;
        };
      }, {}], 44: [function(e, t, r2) {
        "use strict";
        t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(e, t, r2) {
        "use strict";
        var o = (function() {
          for (var e2, t2 = [], r3 = 0; r3 < 256; r3++) {
            e2 = r3;
            for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r3] = e2;
          }
          return t2;
        })();
        t.exports = function(e2, t2, r3, n2) {
          var i2 = o, s = n2 + r3;
          e2 ^= -1;
          for (var a = n2; a < s; a++) e2 = e2 >>> 8 ^ i2[255 & (e2 ^ t2[a])];
          return -1 ^ e2;
        };
      }, {}], 46: [function(e, t, r2) {
        "use strict";
        var h2, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p2 = e("./crc32"), n2 = e("./messages"), l2 = 0, f2 = 4, m = 0, _2 = -2, g2 = -1, b = 4, i2 = 2, v2 = 8, y2 = 9, s = 286, a = 30, o = 19, w2 = 2 * s + 1, k2 = 15, x2 = 3, S2 = 258, z2 = S2 + x2 + 1, C2 = 42, E2 = 113, A2 = 1, I2 = 2, O2 = 3, B2 = 4;
        function R2(e2, t2) {
          return e2.msg = n2[t2], t2;
        }
        function T2(e2) {
          return (e2 << 1) - (4 < e2 ? 9 : 0);
        }
        function D2(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        function F2(e2) {
          var t2 = e2.state, r3 = t2.pending;
          r3 > e2.avail_out && (r3 = e2.avail_out), 0 !== r3 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r3, e2.next_out), e2.next_out += r3, t2.pending_out += r3, e2.total_out += r3, e2.avail_out -= r3, t2.pending -= r3, 0 === t2.pending && (t2.pending_out = 0));
        }
        function N2(e2, t2) {
          u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F2(e2.strm);
        }
        function U2(e2, t2) {
          e2.pending_buf[e2.pending++] = t2;
        }
        function P2(e2, t2) {
          e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
        }
        function L2(e2, t2) {
          var r3, n3, i3 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h3 = e2.strstart > e2.w_size - z2 ? e2.strstart - (e2.w_size - z2) : 0, u2 = e2.window, l3 = e2.w_mask, f3 = e2.prev, c2 = e2.strstart + S2, d2 = u2[s2 + a2 - 1], p3 = u2[s2 + a2];
          e2.prev_length >= e2.good_match && (i3 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
          do {
            if (u2[(r3 = t2) + a2] === p3 && u2[r3 + a2 - 1] === d2 && u2[r3] === u2[s2] && u2[++r3] === u2[s2 + 1]) {
              s2 += 2, r3++;
              do {
              } while (u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && u2[++s2] === u2[++r3] && s2 < c2);
              if (n3 = S2 - (c2 - s2), s2 = c2 - S2, a2 < n3) {
                if (e2.match_start = t2, o2 <= (a2 = n3)) break;
                d2 = u2[s2 + a2 - 1], p3 = u2[s2 + a2];
              }
            }
          } while ((t2 = f3[t2 & l3]) > h3 && 0 != --i3);
          return a2 <= e2.lookahead ? a2 : e2.lookahead;
        }
        function j2(e2) {
          var t2, r3, n3, i3, s2, a2, o2, h3, u2, l3, f3 = e2.w_size;
          do {
            if (i3 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f3 + (f3 - z2)) {
              for (c.arraySet(e2.window, e2.window, f3, f3, 0), e2.match_start -= f3, e2.strstart -= f3, e2.block_start -= f3, t2 = r3 = e2.hash_size; n3 = e2.head[--t2], e2.head[t2] = f3 <= n3 ? n3 - f3 : 0, --r3; ) ;
              for (t2 = r3 = f3; n3 = e2.prev[--t2], e2.prev[t2] = f3 <= n3 ? n3 - f3 : 0, --r3; ) ;
              i3 += f3;
            }
            if (0 === e2.strm.avail_in) break;
            if (a2 = e2.strm, o2 = e2.window, h3 = e2.strstart + e2.lookahead, u2 = i3, l3 = void 0, l3 = a2.avail_in, u2 < l3 && (l3 = u2), r3 = 0 === l3 ? 0 : (a2.avail_in -= l3, c.arraySet(o2, a2.input, a2.next_in, l3, h3), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l3, h3) : 2 === a2.state.wrap && (a2.adler = p2(a2.adler, o2, l3, h3)), a2.next_in += l3, a2.total_in += l3, l3), e2.lookahead += r3, e2.lookahead + e2.insert >= x2) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x2 - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x2)); ) ;
          } while (e2.lookahead < z2 && 0 !== e2.strm.avail_in);
        }
        function Z(e2, t2) {
          for (var r3, n3; ; ) {
            if (e2.lookahead < z2) {
              if (j2(e2), e2.lookahead < z2 && t2 === l2) return A2;
              if (0 === e2.lookahead) break;
            }
            if (r3 = 0, e2.lookahead >= x2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r3 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r3 && e2.strstart - r3 <= e2.w_size - z2 && (e2.match_length = L2(e2, r3)), e2.match_length >= x2) if (n3 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x2), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x2) {
              for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r3 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
              e2.strstart++;
            } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
            else n3 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
            if (n3 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
          }
          return e2.insert = e2.strstart < x2 - 1 ? e2.strstart : x2 - 1, t2 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : e2.last_lit && (N2(e2, false), 0 === e2.strm.avail_out) ? A2 : I2;
        }
        function W2(e2, t2) {
          for (var r3, n3, i3; ; ) {
            if (e2.lookahead < z2) {
              if (j2(e2), e2.lookahead < z2 && t2 === l2) return A2;
              if (0 === e2.lookahead) break;
            }
            if (r3 = 0, e2.lookahead >= x2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r3 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x2 - 1, 0 !== r3 && e2.prev_length < e2.max_lazy_match && e2.strstart - r3 <= e2.w_size - z2 && (e2.match_length = L2(e2, r3), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x2 && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x2 - 1)), e2.prev_length >= x2 && e2.match_length <= e2.prev_length) {
              for (i3 = e2.strstart + e2.lookahead - x2, n3 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x2), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i3 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r3 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
              if (e2.match_available = 0, e2.match_length = x2 - 1, e2.strstart++, n3 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
            } else if (e2.match_available) {
              if ((n3 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N2(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A2;
            } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
          }
          return e2.match_available && (n3 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x2 - 1 ? e2.strstart : x2 - 1, t2 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : e2.last_lit && (N2(e2, false), 0 === e2.strm.avail_out) ? A2 : I2;
        }
        function M2(e2, t2, r3, n3, i3) {
          this.good_length = e2, this.max_lazy = t2, this.nice_length = r3, this.max_chain = n3, this.func = i3;
        }
        function H2() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v2, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w2), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D2(this.dyn_ltree), D2(this.dyn_dtree), D2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k2 + 1), this.heap = new c.Buf16(2 * s + 1), D2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function G2(e2) {
          var t2;
          return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i2, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C2 : E2, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l2, u._tr_init(t2), m) : R2(e2, _2);
        }
        function K2(e2) {
          var t2 = G2(e2);
          return t2 === m && (function(e3) {
            e3.window_size = 2 * e3.w_size, D2(e3.head), e3.max_lazy_match = h2[e3.level].max_lazy, e3.good_match = h2[e3.level].good_length, e3.nice_match = h2[e3.level].nice_length, e3.max_chain_length = h2[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x2 - 1, e3.match_available = 0, e3.ins_h = 0;
          })(e2.state), t2;
        }
        function Y2(e2, t2, r3, n3, i3, s2) {
          if (!e2) return _2;
          var a2 = 1;
          if (t2 === g2 && (t2 = 6), n3 < 0 ? (a2 = 0, n3 = -n3) : 15 < n3 && (a2 = 2, n3 -= 16), i3 < 1 || y2 < i3 || r3 !== v2 || n3 < 8 || 15 < n3 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R2(e2, _2);
          8 === n3 && (n3 = 9);
          var o2 = new H2();
          return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n3, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i3 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x2 - 1) / x2), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i3 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r3, K2(e2);
        }
        h2 = [new M2(0, 0, 0, 0, function(e2, t2) {
          var r3 = 65535;
          for (r3 > e2.pending_buf_size - 5 && (r3 = e2.pending_buf_size - 5); ; ) {
            if (e2.lookahead <= 1) {
              if (j2(e2), 0 === e2.lookahead && t2 === l2) return A2;
              if (0 === e2.lookahead) break;
            }
            e2.strstart += e2.lookahead, e2.lookahead = 0;
            var n3 = e2.block_start + r3;
            if ((0 === e2.strstart || e2.strstart >= n3) && (e2.lookahead = e2.strstart - n3, e2.strstart = n3, N2(e2, false), 0 === e2.strm.avail_out)) return A2;
            if (e2.strstart - e2.block_start >= e2.w_size - z2 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
          }
          return e2.insert = 0, t2 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : (e2.strstart > e2.block_start && (N2(e2, false), e2.strm.avail_out), A2);
        }), new M2(4, 4, 8, 4, Z), new M2(4, 5, 16, 8, Z), new M2(4, 6, 32, 32, Z), new M2(4, 4, 16, 16, W2), new M2(8, 16, 32, 32, W2), new M2(8, 16, 128, 128, W2), new M2(8, 32, 128, 256, W2), new M2(32, 128, 258, 1024, W2), new M2(32, 258, 258, 4096, W2)], r2.deflateInit = function(e2, t2) {
          return Y2(e2, t2, v2, 15, 8, 0);
        }, r2.deflateInit2 = Y2, r2.deflateReset = K2, r2.deflateResetKeep = G2, r2.deflateSetHeader = function(e2, t2) {
          return e2 && e2.state ? 2 !== e2.state.wrap ? _2 : (e2.state.gzhead = t2, m) : _2;
        }, r2.deflate = function(e2, t2) {
          var r3, n3, i3, s2;
          if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R2(e2, _2) : _2;
          if (n3 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n3.status && t2 !== f2) return R2(e2, 0 === e2.avail_out ? -5 : _2);
          if (n3.strm = e2, r3 = n3.last_flush, n3.last_flush = t2, n3.status === C2) if (2 === n3.wrap) e2.adler = 0, U2(n3, 31), U2(n3, 139), U2(n3, 8), n3.gzhead ? (U2(n3, (n3.gzhead.text ? 1 : 0) + (n3.gzhead.hcrc ? 2 : 0) + (n3.gzhead.extra ? 4 : 0) + (n3.gzhead.name ? 8 : 0) + (n3.gzhead.comment ? 16 : 0)), U2(n3, 255 & n3.gzhead.time), U2(n3, n3.gzhead.time >> 8 & 255), U2(n3, n3.gzhead.time >> 16 & 255), U2(n3, n3.gzhead.time >> 24 & 255), U2(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U2(n3, 255 & n3.gzhead.os), n3.gzhead.extra && n3.gzhead.extra.length && (U2(n3, 255 & n3.gzhead.extra.length), U2(n3, n3.gzhead.extra.length >> 8 & 255)), n3.gzhead.hcrc && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending, 0)), n3.gzindex = 0, n3.status = 69) : (U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U2(n3, 3), n3.status = E2);
          else {
            var a2 = v2 + (n3.w_bits - 8 << 4) << 8;
            a2 |= (2 <= n3.strategy || n3.level < 2 ? 0 : n3.level < 6 ? 1 : 6 === n3.level ? 2 : 3) << 6, 0 !== n3.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n3.status = E2, P2(n3, a2), 0 !== n3.strstart && (P2(n3, e2.adler >>> 16), P2(n3, 65535 & e2.adler)), e2.adler = 1;
          }
          if (69 === n3.status) if (n3.gzhead.extra) {
            for (i3 = n3.pending; n3.gzindex < (65535 & n3.gzhead.extra.length) && (n3.pending !== n3.pending_buf_size || (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending !== n3.pending_buf_size)); ) U2(n3, 255 & n3.gzhead.extra[n3.gzindex]), n3.gzindex++;
            n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), n3.gzindex === n3.gzhead.extra.length && (n3.gzindex = 0, n3.status = 73);
          } else n3.status = 73;
          if (73 === n3.status) if (n3.gzhead.name) {
            i3 = n3.pending;
            do {
              if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending === n3.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n3.gzindex < n3.gzhead.name.length ? 255 & n3.gzhead.name.charCodeAt(n3.gzindex++) : 0, U2(n3, s2);
            } while (0 !== s2);
            n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), 0 === s2 && (n3.gzindex = 0, n3.status = 91);
          } else n3.status = 91;
          if (91 === n3.status) if (n3.gzhead.comment) {
            i3 = n3.pending;
            do {
              if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending === n3.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n3.gzindex < n3.gzhead.comment.length ? 255 & n3.gzhead.comment.charCodeAt(n3.gzindex++) : 0, U2(n3, s2);
            } while (0 !== s2);
            n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), 0 === s2 && (n3.status = 103);
          } else n3.status = 103;
          if (103 === n3.status && (n3.gzhead.hcrc ? (n3.pending + 2 > n3.pending_buf_size && F2(e2), n3.pending + 2 <= n3.pending_buf_size && (U2(n3, 255 & e2.adler), U2(n3, e2.adler >> 8 & 255), e2.adler = 0, n3.status = E2)) : n3.status = E2), 0 !== n3.pending) {
            if (F2(e2), 0 === e2.avail_out) return n3.last_flush = -1, m;
          } else if (0 === e2.avail_in && T2(t2) <= T2(r3) && t2 !== f2) return R2(e2, -5);
          if (666 === n3.status && 0 !== e2.avail_in) return R2(e2, -5);
          if (0 !== e2.avail_in || 0 !== n3.lookahead || t2 !== l2 && 666 !== n3.status) {
            var o2 = 2 === n3.strategy ? (function(e3, t3) {
              for (var r4; ; ) {
                if (0 === e3.lookahead && (j2(e3), 0 === e3.lookahead)) {
                  if (t3 === l2) return A2;
                  break;
                }
                if (e3.match_length = 0, r4 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r4 && (N2(e3, false), 0 === e3.strm.avail_out)) return A2;
              }
              return e3.insert = 0, t3 === f2 ? (N2(e3, true), 0 === e3.strm.avail_out ? O2 : B2) : e3.last_lit && (N2(e3, false), 0 === e3.strm.avail_out) ? A2 : I2;
            })(n3, t2) : 3 === n3.strategy ? (function(e3, t3) {
              for (var r4, n4, i4, s3, a3 = e3.window; ; ) {
                if (e3.lookahead <= S2) {
                  if (j2(e3), e3.lookahead <= S2 && t3 === l2) return A2;
                  if (0 === e3.lookahead) break;
                }
                if (e3.match_length = 0, e3.lookahead >= x2 && 0 < e3.strstart && (n4 = a3[i4 = e3.strstart - 1]) === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4]) {
                  s3 = e3.strstart + S2;
                  do {
                  } while (n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && i4 < s3);
                  e3.match_length = S2 - (s3 - i4), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                }
                if (e3.match_length >= x2 ? (r4 = u._tr_tally(e3, 1, e3.match_length - x2), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r4 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r4 && (N2(e3, false), 0 === e3.strm.avail_out)) return A2;
              }
              return e3.insert = 0, t3 === f2 ? (N2(e3, true), 0 === e3.strm.avail_out ? O2 : B2) : e3.last_lit && (N2(e3, false), 0 === e3.strm.avail_out) ? A2 : I2;
            })(n3, t2) : h2[n3.level].func(n3, t2);
            if (o2 !== O2 && o2 !== B2 || (n3.status = 666), o2 === A2 || o2 === O2) return 0 === e2.avail_out && (n3.last_flush = -1), m;
            if (o2 === I2 && (1 === t2 ? u._tr_align(n3) : 5 !== t2 && (u._tr_stored_block(n3, 0, 0, false), 3 === t2 && (D2(n3.head), 0 === n3.lookahead && (n3.strstart = 0, n3.block_start = 0, n3.insert = 0))), F2(e2), 0 === e2.avail_out)) return n3.last_flush = -1, m;
          }
          return t2 !== f2 ? m : n3.wrap <= 0 ? 1 : (2 === n3.wrap ? (U2(n3, 255 & e2.adler), U2(n3, e2.adler >> 8 & 255), U2(n3, e2.adler >> 16 & 255), U2(n3, e2.adler >> 24 & 255), U2(n3, 255 & e2.total_in), U2(n3, e2.total_in >> 8 & 255), U2(n3, e2.total_in >> 16 & 255), U2(n3, e2.total_in >> 24 & 255)) : (P2(n3, e2.adler >>> 16), P2(n3, 65535 & e2.adler)), F2(e2), 0 < n3.wrap && (n3.wrap = -n3.wrap), 0 !== n3.pending ? m : 1);
        }, r2.deflateEnd = function(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state.status) !== C2 && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E2 && 666 !== t2 ? R2(e2, _2) : (e2.state = null, t2 === E2 ? R2(e2, -3) : m) : _2;
        }, r2.deflateSetDictionary = function(e2, t2) {
          var r3, n3, i3, s2, a2, o2, h3, u2, l3 = t2.length;
          if (!e2 || !e2.state) return _2;
          if (2 === (s2 = (r3 = e2.state).wrap) || 1 === s2 && r3.status !== C2 || r3.lookahead) return _2;
          for (1 === s2 && (e2.adler = d(e2.adler, t2, l3, 0)), r3.wrap = 0, l3 >= r3.w_size && (0 === s2 && (D2(r3.head), r3.strstart = 0, r3.block_start = 0, r3.insert = 0), u2 = new c.Buf8(r3.w_size), c.arraySet(u2, t2, l3 - r3.w_size, r3.w_size, 0), t2 = u2, l3 = r3.w_size), a2 = e2.avail_in, o2 = e2.next_in, h3 = e2.input, e2.avail_in = l3, e2.next_in = 0, e2.input = t2, j2(r3); r3.lookahead >= x2; ) {
            for (n3 = r3.strstart, i3 = r3.lookahead - (x2 - 1); r3.ins_h = (r3.ins_h << r3.hash_shift ^ r3.window[n3 + x2 - 1]) & r3.hash_mask, r3.prev[n3 & r3.w_mask] = r3.head[r3.ins_h], r3.head[r3.ins_h] = n3, n3++, --i3; ) ;
            r3.strstart = n3, r3.lookahead = x2 - 1, j2(r3);
          }
          return r3.strstart += r3.lookahead, r3.block_start = r3.strstart, r3.insert = r3.lookahead, r3.lookahead = 0, r3.match_length = r3.prev_length = x2 - 1, r3.match_available = 0, e2.next_in = o2, e2.input = h3, e2.avail_in = a2, r3.wrap = s2, m;
        }, r2.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r2) {
        "use strict";
        t.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, {}], 48: [function(e, t, r2) {
        "use strict";
        t.exports = function(e2, t2) {
          var r3, n2, i2, s, a, o, h2, u, l2, f2, c, d, p2, m, _2, g2, b, v2, y2, w2, k2, x2, S2, z2, C2;
          r3 = e2.state, n2 = e2.next_in, z2 = e2.input, i2 = n2 + (e2.avail_in - 5), s = e2.next_out, C2 = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h2 = r3.dmax, u = r3.wsize, l2 = r3.whave, f2 = r3.wnext, c = r3.window, d = r3.hold, p2 = r3.bits, m = r3.lencode, _2 = r3.distcode, g2 = (1 << r3.lenbits) - 1, b = (1 << r3.distbits) - 1;
          e: do {
            p2 < 15 && (d += z2[n2++] << p2, p2 += 8, d += z2[n2++] << p2, p2 += 8), v2 = m[d & g2];
            t: for (; ; ) {
              if (d >>>= y2 = v2 >>> 24, p2 -= y2, 0 === (y2 = v2 >>> 16 & 255)) C2[s++] = 65535 & v2;
              else {
                if (!(16 & y2)) {
                  if (0 == (64 & y2)) {
                    v2 = m[(65535 & v2) + (d & (1 << y2) - 1)];
                    continue t;
                  }
                  if (32 & y2) {
                    r3.mode = 12;
                    break e;
                  }
                  e2.msg = "invalid literal/length code", r3.mode = 30;
                  break e;
                }
                w2 = 65535 & v2, (y2 &= 15) && (p2 < y2 && (d += z2[n2++] << p2, p2 += 8), w2 += d & (1 << y2) - 1, d >>>= y2, p2 -= y2), p2 < 15 && (d += z2[n2++] << p2, p2 += 8, d += z2[n2++] << p2, p2 += 8), v2 = _2[d & b];
                r: for (; ; ) {
                  if (d >>>= y2 = v2 >>> 24, p2 -= y2, !(16 & (y2 = v2 >>> 16 & 255))) {
                    if (0 == (64 & y2)) {
                      v2 = _2[(65535 & v2) + (d & (1 << y2) - 1)];
                      continue r;
                    }
                    e2.msg = "invalid distance code", r3.mode = 30;
                    break e;
                  }
                  if (k2 = 65535 & v2, p2 < (y2 &= 15) && (d += z2[n2++] << p2, (p2 += 8) < y2 && (d += z2[n2++] << p2, p2 += 8)), h2 < (k2 += d & (1 << y2) - 1)) {
                    e2.msg = "invalid distance too far back", r3.mode = 30;
                    break e;
                  }
                  if (d >>>= y2, p2 -= y2, (y2 = s - a) < k2) {
                    if (l2 < (y2 = k2 - y2) && r3.sane) {
                      e2.msg = "invalid distance too far back", r3.mode = 30;
                      break e;
                    }
                    if (S2 = c, (x2 = 0) === f2) {
                      if (x2 += u - y2, y2 < w2) {
                        for (w2 -= y2; C2[s++] = c[x2++], --y2; ) ;
                        x2 = s - k2, S2 = C2;
                      }
                    } else if (f2 < y2) {
                      if (x2 += u + f2 - y2, (y2 -= f2) < w2) {
                        for (w2 -= y2; C2[s++] = c[x2++], --y2; ) ;
                        if (x2 = 0, f2 < w2) {
                          for (w2 -= y2 = f2; C2[s++] = c[x2++], --y2; ) ;
                          x2 = s - k2, S2 = C2;
                        }
                      }
                    } else if (x2 += f2 - y2, y2 < w2) {
                      for (w2 -= y2; C2[s++] = c[x2++], --y2; ) ;
                      x2 = s - k2, S2 = C2;
                    }
                    for (; 2 < w2; ) C2[s++] = S2[x2++], C2[s++] = S2[x2++], C2[s++] = S2[x2++], w2 -= 3;
                    w2 && (C2[s++] = S2[x2++], 1 < w2 && (C2[s++] = S2[x2++]));
                  } else {
                    for (x2 = s - k2; C2[s++] = C2[x2++], C2[s++] = C2[x2++], C2[s++] = C2[x2++], 2 < (w2 -= 3); ) ;
                    w2 && (C2[s++] = C2[x2++], 1 < w2 && (C2[s++] = C2[x2++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (n2 < i2 && s < o);
          n2 -= w2 = p2 >> 3, d &= (1 << (p2 -= w2 << 3)) - 1, e2.next_in = n2, e2.next_out = s, e2.avail_in = n2 < i2 ? i2 - n2 + 5 : 5 - (n2 - i2), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r3.hold = d, r3.bits = p2;
        };
      }, {}], 49: [function(e, t, r2) {
        "use strict";
        var I2 = e("../utils/common"), O2 = e("./adler32"), B2 = e("./crc32"), R2 = e("./inffast"), T2 = e("./inftrees"), D2 = 1, F2 = 2, N2 = 0, U2 = -2, P2 = 1, n2 = 852, i2 = 592;
        function L2(e2) {
          return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
        }
        function s() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I2.Buf16(320), this.work = new I2.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function a(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P2, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I2.Buf32(n2), t2.distcode = t2.distdyn = new I2.Buf32(i2), t2.sane = 1, t2.back = -1, N2) : U2;
        }
        function o(e2) {
          var t2;
          return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U2;
        }
        function h2(e2, t2) {
          var r3, n3;
          return e2 && e2.state ? (n3 = e2.state, t2 < 0 ? (r3 = 0, t2 = -t2) : (r3 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U2 : (null !== n3.window && n3.wbits !== t2 && (n3.window = null), n3.wrap = r3, n3.wbits = t2, o(e2))) : U2;
        }
        function u(e2, t2) {
          var r3, n3;
          return e2 ? (n3 = new s(), (e2.state = n3).window = null, (r3 = h2(e2, t2)) !== N2 && (e2.state = null), r3) : U2;
        }
        var l2, f2, c = true;
        function j2(e2) {
          if (c) {
            var t2;
            for (l2 = new I2.Buf32(512), f2 = new I2.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
            for (; t2 < 256; ) e2.lens[t2++] = 9;
            for (; t2 < 280; ) e2.lens[t2++] = 7;
            for (; t2 < 288; ) e2.lens[t2++] = 8;
            for (T2(D2, e2.lens, 0, 288, l2, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
            T2(F2, e2.lens, 0, 32, f2, 0, e2.work, { bits: 5 }), c = false;
          }
          e2.lencode = l2, e2.lenbits = 9, e2.distcode = f2, e2.distbits = 5;
        }
        function Z(e2, t2, r3, n3) {
          var i3, s2 = e2.state;
          return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I2.Buf8(s2.wsize)), n3 >= s2.wsize ? (I2.arraySet(s2.window, t2, r3 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n3 < (i3 = s2.wsize - s2.wnext) && (i3 = n3), I2.arraySet(s2.window, t2, r3 - n3, i3, s2.wnext), (n3 -= i3) ? (I2.arraySet(s2.window, t2, r3 - n3, n3, 0), s2.wnext = n3, s2.whave = s2.wsize) : (s2.wnext += i3, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i3))), 0;
        }
        r2.inflateReset = o, r2.inflateReset2 = h2, r2.inflateResetKeep = a, r2.inflateInit = function(e2) {
          return u(e2, 15);
        }, r2.inflateInit2 = u, r2.inflate = function(e2, t2) {
          var r3, n3, i3, s2, a2, o2, h3, u2, l3, f3, c2, d, p2, m, _2, g2, b, v2, y2, w2, k2, x2, S2, z2, C2 = 0, E2 = new I2.Buf8(4), A2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U2;
          12 === (r3 = e2.state).mode && (r3.mode = 13), a2 = e2.next_out, i3 = e2.output, h3 = e2.avail_out, s2 = e2.next_in, n3 = e2.input, o2 = e2.avail_in, u2 = r3.hold, l3 = r3.bits, f3 = o2, c2 = h3, x2 = N2;
          e: for (; ; ) switch (r3.mode) {
            case P2:
              if (0 === r3.wrap) {
                r3.mode = 13;
                break;
              }
              for (; l3 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              if (2 & r3.wrap && 35615 === u2) {
                E2[r3.check = 0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r3.check = B2(r3.check, E2, 2, 0), l3 = u2 = 0, r3.mode = 2;
                break;
              }
              if (r3.flags = 0, r3.head && (r3.head.done = false), !(1 & r3.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                e2.msg = "incorrect header check", r3.mode = 30;
                break;
              }
              if (8 != (15 & u2)) {
                e2.msg = "unknown compression method", r3.mode = 30;
                break;
              }
              if (l3 -= 4, k2 = 8 + (15 & (u2 >>>= 4)), 0 === r3.wbits) r3.wbits = k2;
              else if (k2 > r3.wbits) {
                e2.msg = "invalid window size", r3.mode = 30;
                break;
              }
              r3.dmax = 1 << k2, e2.adler = r3.check = 1, r3.mode = 512 & u2 ? 10 : 12, l3 = u2 = 0;
              break;
            case 2:
              for (; l3 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              if (r3.flags = u2, 8 != (255 & r3.flags)) {
                e2.msg = "unknown compression method", r3.mode = 30;
                break;
              }
              if (57344 & r3.flags) {
                e2.msg = "unknown header flags set", r3.mode = 30;
                break;
              }
              r3.head && (r3.head.text = u2 >> 8 & 1), 512 & r3.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r3.check = B2(r3.check, E2, 2, 0)), l3 = u2 = 0, r3.mode = 3;
            case 3:
              for (; l3 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              r3.head && (r3.head.time = u2), 512 & r3.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, E2[2] = u2 >>> 16 & 255, E2[3] = u2 >>> 24 & 255, r3.check = B2(r3.check, E2, 4, 0)), l3 = u2 = 0, r3.mode = 4;
            case 4:
              for (; l3 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              r3.head && (r3.head.xflags = 255 & u2, r3.head.os = u2 >> 8), 512 & r3.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r3.check = B2(r3.check, E2, 2, 0)), l3 = u2 = 0, r3.mode = 5;
            case 5:
              if (1024 & r3.flags) {
                for (; l3 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                r3.length = u2, r3.head && (r3.head.extra_len = u2), 512 & r3.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r3.check = B2(r3.check, E2, 2, 0)), l3 = u2 = 0;
              } else r3.head && (r3.head.extra = null);
              r3.mode = 6;
            case 6:
              if (1024 & r3.flags && (o2 < (d = r3.length) && (d = o2), d && (r3.head && (k2 = r3.head.extra_len - r3.length, r3.head.extra || (r3.head.extra = new Array(r3.head.extra_len)), I2.arraySet(r3.head.extra, n3, s2, d, k2)), 512 & r3.flags && (r3.check = B2(r3.check, n3, d, s2)), o2 -= d, s2 += d, r3.length -= d), r3.length)) break e;
              r3.length = 0, r3.mode = 7;
            case 7:
              if (2048 & r3.flags) {
                if (0 === o2) break e;
                for (d = 0; k2 = n3[s2 + d++], r3.head && k2 && r3.length < 65536 && (r3.head.name += String.fromCharCode(k2)), k2 && d < o2; ) ;
                if (512 & r3.flags && (r3.check = B2(r3.check, n3, d, s2)), o2 -= d, s2 += d, k2) break e;
              } else r3.head && (r3.head.name = null);
              r3.length = 0, r3.mode = 8;
            case 8:
              if (4096 & r3.flags) {
                if (0 === o2) break e;
                for (d = 0; k2 = n3[s2 + d++], r3.head && k2 && r3.length < 65536 && (r3.head.comment += String.fromCharCode(k2)), k2 && d < o2; ) ;
                if (512 & r3.flags && (r3.check = B2(r3.check, n3, d, s2)), o2 -= d, s2 += d, k2) break e;
              } else r3.head && (r3.head.comment = null);
              r3.mode = 9;
            case 9:
              if (512 & r3.flags) {
                for (; l3 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                if (u2 !== (65535 & r3.check)) {
                  e2.msg = "header crc mismatch", r3.mode = 30;
                  break;
                }
                l3 = u2 = 0;
              }
              r3.head && (r3.head.hcrc = r3.flags >> 9 & 1, r3.head.done = true), e2.adler = r3.check = 0, r3.mode = 12;
              break;
            case 10:
              for (; l3 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              e2.adler = r3.check = L2(u2), l3 = u2 = 0, r3.mode = 11;
            case 11:
              if (0 === r3.havedict) return e2.next_out = a2, e2.avail_out = h3, e2.next_in = s2, e2.avail_in = o2, r3.hold = u2, r3.bits = l3, 2;
              e2.adler = r3.check = 1, r3.mode = 12;
            case 12:
              if (5 === t2 || 6 === t2) break e;
            case 13:
              if (r3.last) {
                u2 >>>= 7 & l3, l3 -= 7 & l3, r3.mode = 27;
                break;
              }
              for (; l3 < 3; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              switch (r3.last = 1 & u2, l3 -= 1, 3 & (u2 >>>= 1)) {
                case 0:
                  r3.mode = 14;
                  break;
                case 1:
                  if (j2(r3), r3.mode = 20, 6 !== t2) break;
                  u2 >>>= 2, l3 -= 2;
                  break e;
                case 2:
                  r3.mode = 17;
                  break;
                case 3:
                  e2.msg = "invalid block type", r3.mode = 30;
              }
              u2 >>>= 2, l3 -= 2;
              break;
            case 14:
              for (u2 >>>= 7 & l3, l3 -= 7 & l3; l3 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                e2.msg = "invalid stored block lengths", r3.mode = 30;
                break;
              }
              if (r3.length = 65535 & u2, l3 = u2 = 0, r3.mode = 15, 6 === t2) break e;
            case 15:
              r3.mode = 16;
            case 16:
              if (d = r3.length) {
                if (o2 < d && (d = o2), h3 < d && (d = h3), 0 === d) break e;
                I2.arraySet(i3, n3, s2, d, a2), o2 -= d, s2 += d, h3 -= d, a2 += d, r3.length -= d;
                break;
              }
              r3.mode = 12;
              break;
            case 17:
              for (; l3 < 14; ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              if (r3.nlen = 257 + (31 & u2), u2 >>>= 5, l3 -= 5, r3.ndist = 1 + (31 & u2), u2 >>>= 5, l3 -= 5, r3.ncode = 4 + (15 & u2), u2 >>>= 4, l3 -= 4, 286 < r3.nlen || 30 < r3.ndist) {
                e2.msg = "too many length or distance symbols", r3.mode = 30;
                break;
              }
              r3.have = 0, r3.mode = 18;
            case 18:
              for (; r3.have < r3.ncode; ) {
                for (; l3 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                r3.lens[A2[r3.have++]] = 7 & u2, u2 >>>= 3, l3 -= 3;
              }
              for (; r3.have < 19; ) r3.lens[A2[r3.have++]] = 0;
              if (r3.lencode = r3.lendyn, r3.lenbits = 7, S2 = { bits: r3.lenbits }, x2 = T2(0, r3.lens, 0, 19, r3.lencode, 0, r3.work, S2), r3.lenbits = S2.bits, x2) {
                e2.msg = "invalid code lengths set", r3.mode = 30;
                break;
              }
              r3.have = 0, r3.mode = 19;
            case 19:
              for (; r3.have < r3.nlen + r3.ndist; ) {
                for (; g2 = (C2 = r3.lencode[u2 & (1 << r3.lenbits) - 1]) >>> 16 & 255, b = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                if (b < 16) u2 >>>= _2, l3 -= _2, r3.lens[r3.have++] = b;
                else {
                  if (16 === b) {
                    for (z2 = _2 + 2; l3 < z2; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n3[s2++] << l3, l3 += 8;
                    }
                    if (u2 >>>= _2, l3 -= _2, 0 === r3.have) {
                      e2.msg = "invalid bit length repeat", r3.mode = 30;
                      break;
                    }
                    k2 = r3.lens[r3.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l3 -= 2;
                  } else if (17 === b) {
                    for (z2 = _2 + 3; l3 < z2; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n3[s2++] << l3, l3 += 8;
                    }
                    l3 -= _2, k2 = 0, d = 3 + (7 & (u2 >>>= _2)), u2 >>>= 3, l3 -= 3;
                  } else {
                    for (z2 = _2 + 7; l3 < z2; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n3[s2++] << l3, l3 += 8;
                    }
                    l3 -= _2, k2 = 0, d = 11 + (127 & (u2 >>>= _2)), u2 >>>= 7, l3 -= 7;
                  }
                  if (r3.have + d > r3.nlen + r3.ndist) {
                    e2.msg = "invalid bit length repeat", r3.mode = 30;
                    break;
                  }
                  for (; d--; ) r3.lens[r3.have++] = k2;
                }
              }
              if (30 === r3.mode) break;
              if (0 === r3.lens[256]) {
                e2.msg = "invalid code -- missing end-of-block", r3.mode = 30;
                break;
              }
              if (r3.lenbits = 9, S2 = { bits: r3.lenbits }, x2 = T2(D2, r3.lens, 0, r3.nlen, r3.lencode, 0, r3.work, S2), r3.lenbits = S2.bits, x2) {
                e2.msg = "invalid literal/lengths set", r3.mode = 30;
                break;
              }
              if (r3.distbits = 6, r3.distcode = r3.distdyn, S2 = { bits: r3.distbits }, x2 = T2(F2, r3.lens, r3.nlen, r3.ndist, r3.distcode, 0, r3.work, S2), r3.distbits = S2.bits, x2) {
                e2.msg = "invalid distances set", r3.mode = 30;
                break;
              }
              if (r3.mode = 20, 6 === t2) break e;
            case 20:
              r3.mode = 21;
            case 21:
              if (6 <= o2 && 258 <= h3) {
                e2.next_out = a2, e2.avail_out = h3, e2.next_in = s2, e2.avail_in = o2, r3.hold = u2, r3.bits = l3, R2(e2, c2), a2 = e2.next_out, i3 = e2.output, h3 = e2.avail_out, s2 = e2.next_in, n3 = e2.input, o2 = e2.avail_in, u2 = r3.hold, l3 = r3.bits, 12 === r3.mode && (r3.back = -1);
                break;
              }
              for (r3.back = 0; g2 = (C2 = r3.lencode[u2 & (1 << r3.lenbits) - 1]) >>> 16 & 255, b = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              if (g2 && 0 == (240 & g2)) {
                for (v2 = _2, y2 = g2, w2 = b; g2 = (C2 = r3.lencode[w2 + ((u2 & (1 << v2 + y2) - 1) >> v2)]) >>> 16 & 255, b = 65535 & C2, !(v2 + (_2 = C2 >>> 24) <= l3); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                u2 >>>= v2, l3 -= v2, r3.back += v2;
              }
              if (u2 >>>= _2, l3 -= _2, r3.back += _2, r3.length = b, 0 === g2) {
                r3.mode = 26;
                break;
              }
              if (32 & g2) {
                r3.back = -1, r3.mode = 12;
                break;
              }
              if (64 & g2) {
                e2.msg = "invalid literal/length code", r3.mode = 30;
                break;
              }
              r3.extra = 15 & g2, r3.mode = 22;
            case 22:
              if (r3.extra) {
                for (z2 = r3.extra; l3 < z2; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                r3.length += u2 & (1 << r3.extra) - 1, u2 >>>= r3.extra, l3 -= r3.extra, r3.back += r3.extra;
              }
              r3.was = r3.length, r3.mode = 23;
            case 23:
              for (; g2 = (C2 = r3.distcode[u2 & (1 << r3.distbits) - 1]) >>> 16 & 255, b = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                if (0 === o2) break e;
                o2--, u2 += n3[s2++] << l3, l3 += 8;
              }
              if (0 == (240 & g2)) {
                for (v2 = _2, y2 = g2, w2 = b; g2 = (C2 = r3.distcode[w2 + ((u2 & (1 << v2 + y2) - 1) >> v2)]) >>> 16 & 255, b = 65535 & C2, !(v2 + (_2 = C2 >>> 24) <= l3); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                u2 >>>= v2, l3 -= v2, r3.back += v2;
              }
              if (u2 >>>= _2, l3 -= _2, r3.back += _2, 64 & g2) {
                e2.msg = "invalid distance code", r3.mode = 30;
                break;
              }
              r3.offset = b, r3.extra = 15 & g2, r3.mode = 24;
            case 24:
              if (r3.extra) {
                for (z2 = r3.extra; l3 < z2; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                r3.offset += u2 & (1 << r3.extra) - 1, u2 >>>= r3.extra, l3 -= r3.extra, r3.back += r3.extra;
              }
              if (r3.offset > r3.dmax) {
                e2.msg = "invalid distance too far back", r3.mode = 30;
                break;
              }
              r3.mode = 25;
            case 25:
              if (0 === h3) break e;
              if (d = c2 - h3, r3.offset > d) {
                if ((d = r3.offset - d) > r3.whave && r3.sane) {
                  e2.msg = "invalid distance too far back", r3.mode = 30;
                  break;
                }
                p2 = d > r3.wnext ? (d -= r3.wnext, r3.wsize - d) : r3.wnext - d, d > r3.length && (d = r3.length), m = r3.window;
              } else m = i3, p2 = a2 - r3.offset, d = r3.length;
              for (h3 < d && (d = h3), h3 -= d, r3.length -= d; i3[a2++] = m[p2++], --d; ) ;
              0 === r3.length && (r3.mode = 21);
              break;
            case 26:
              if (0 === h3) break e;
              i3[a2++] = r3.length, h3--, r3.mode = 21;
              break;
            case 27:
              if (r3.wrap) {
                for (; l3 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 |= n3[s2++] << l3, l3 += 8;
                }
                if (c2 -= h3, e2.total_out += c2, r3.total += c2, c2 && (e2.adler = r3.check = r3.flags ? B2(r3.check, i3, c2, a2 - c2) : O2(r3.check, i3, c2, a2 - c2)), c2 = h3, (r3.flags ? u2 : L2(u2)) !== r3.check) {
                  e2.msg = "incorrect data check", r3.mode = 30;
                  break;
                }
                l3 = u2 = 0;
              }
              r3.mode = 28;
            case 28:
              if (r3.wrap && r3.flags) {
                for (; l3 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n3[s2++] << l3, l3 += 8;
                }
                if (u2 !== (4294967295 & r3.total)) {
                  e2.msg = "incorrect length check", r3.mode = 30;
                  break;
                }
                l3 = u2 = 0;
              }
              r3.mode = 29;
            case 29:
              x2 = 1;
              break e;
            case 30:
              x2 = -3;
              break e;
            case 31:
              return -4;
            case 32:
            default:
              return U2;
          }
          return e2.next_out = a2, e2.avail_out = h3, e2.next_in = s2, e2.avail_in = o2, r3.hold = u2, r3.bits = l3, (r3.wsize || c2 !== e2.avail_out && r3.mode < 30 && (r3.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r3.mode = 31, -4) : (f3 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f3, e2.total_out += c2, r3.total += c2, r3.wrap && c2 && (e2.adler = r3.check = r3.flags ? B2(r3.check, i3, c2, e2.next_out - c2) : O2(r3.check, i3, c2, e2.next_out - c2)), e2.data_type = r3.bits + (r3.last ? 64 : 0) + (12 === r3.mode ? 128 : 0) + (20 === r3.mode || 15 === r3.mode ? 256 : 0), (0 == f3 && 0 === c2 || 4 === t2) && x2 === N2 && (x2 = -5), x2);
        }, r2.inflateEnd = function(e2) {
          if (!e2 || !e2.state) return U2;
          var t2 = e2.state;
          return t2.window && (t2.window = null), e2.state = null, N2;
        }, r2.inflateGetHeader = function(e2, t2) {
          var r3;
          return e2 && e2.state ? 0 == (2 & (r3 = e2.state).wrap) ? U2 : ((r3.head = t2).done = false, N2) : U2;
        }, r2.inflateSetDictionary = function(e2, t2) {
          var r3, n3 = t2.length;
          return e2 && e2.state ? 0 !== (r3 = e2.state).wrap && 11 !== r3.mode ? U2 : 11 === r3.mode && O2(1, t2, n3, 0) !== r3.check ? -3 : Z(e2, t2, n3, n3) ? (r3.mode = 31, -4) : (r3.havedict = 1, N2) : U2;
        }, r2.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r2) {
        "use strict";
        var D2 = e("../utils/common"), F2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N2 = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U2 = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P2 = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(e2, t2, r3, n2, i2, s, a, o) {
          var h2, u, l2, f2, c, d, p2, m, _2, g2 = o.bits, b = 0, v2 = 0, y2 = 0, w2 = 0, k2 = 0, x2 = 0, S2 = 0, z2 = 0, C2 = 0, E2 = 0, A2 = null, I2 = 0, O2 = new D2.Buf16(16), B2 = new D2.Buf16(16), R2 = null, T2 = 0;
          for (b = 0; b <= 15; b++) O2[b] = 0;
          for (v2 = 0; v2 < n2; v2++) O2[t2[r3 + v2]]++;
          for (k2 = g2, w2 = 15; 1 <= w2 && 0 === O2[w2]; w2--) ;
          if (w2 < k2 && (k2 = w2), 0 === w2) return i2[s++] = 20971520, i2[s++] = 20971520, o.bits = 1, 0;
          for (y2 = 1; y2 < w2 && 0 === O2[y2]; y2++) ;
          for (k2 < y2 && (k2 = y2), b = z2 = 1; b <= 15; b++) if (z2 <<= 1, (z2 -= O2[b]) < 0) return -1;
          if (0 < z2 && (0 === e2 || 1 !== w2)) return -1;
          for (B2[1] = 0, b = 1; b < 15; b++) B2[b + 1] = B2[b] + O2[b];
          for (v2 = 0; v2 < n2; v2++) 0 !== t2[r3 + v2] && (a[B2[t2[r3 + v2]]++] = v2);
          if (d = 0 === e2 ? (A2 = R2 = a, 19) : 1 === e2 ? (A2 = F2, I2 -= 257, R2 = N2, T2 -= 257, 256) : (A2 = U2, R2 = P2, -1), b = y2, c = s, S2 = v2 = E2 = 0, l2 = -1, f2 = (C2 = 1 << (x2 = k2)) - 1, 1 === e2 && 852 < C2 || 2 === e2 && 592 < C2) return 1;
          for (; ; ) {
            for (p2 = b - S2, _2 = a[v2] < d ? (m = 0, a[v2]) : a[v2] > d ? (m = R2[T2 + a[v2]], A2[I2 + a[v2]]) : (m = 96, 0), h2 = 1 << b - S2, y2 = u = 1 << x2; i2[c + (E2 >> S2) + (u -= h2)] = p2 << 24 | m << 16 | _2 | 0, 0 !== u; ) ;
            for (h2 = 1 << b - 1; E2 & h2; ) h2 >>= 1;
            if (0 !== h2 ? (E2 &= h2 - 1, E2 += h2) : E2 = 0, v2++, 0 == --O2[b]) {
              if (b === w2) break;
              b = t2[r3 + a[v2]];
            }
            if (k2 < b && (E2 & f2) !== l2) {
              for (0 === S2 && (S2 = k2), c += y2, z2 = 1 << (x2 = b - S2); x2 + S2 < w2 && !((z2 -= O2[x2 + S2]) <= 0); ) x2++, z2 <<= 1;
              if (C2 += 1 << x2, 1 === e2 && 852 < C2 || 2 === e2 && 592 < C2) return 1;
              i2[l2 = E2 & f2] = k2 << 24 | x2 << 16 | c - s | 0;
            }
          }
          return 0 !== E2 && (i2[c + E2] = b - S2 << 24 | 64 << 16 | 0), o.bits = k2, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(e, t, r2) {
        "use strict";
        t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(e, t, r2) {
        "use strict";
        var i2 = e("../utils/common"), o = 0, h2 = 1;
        function n2(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        var s = 0, a = 29, u = 256, l2 = u + 1 + a, f2 = 30, c = 19, _2 = 2 * l2 + 1, g2 = 15, d = 16, p2 = 7, m = 256, b = 16, v2 = 17, y2 = 18, w2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k2 = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z2 = new Array(2 * (l2 + 2));
        n2(z2);
        var C2 = new Array(2 * f2);
        n2(C2);
        var E2 = new Array(512);
        n2(E2);
        var A2 = new Array(256);
        n2(A2);
        var I2 = new Array(a);
        n2(I2);
        var O2, B2, R2, T2 = new Array(f2);
        function D2(e2, t2, r3, n3, i3) {
          this.static_tree = e2, this.extra_bits = t2, this.extra_base = r3, this.elems = n3, this.max_length = i3, this.has_stree = e2 && e2.length;
        }
        function F2(e2, t2) {
          this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
        }
        function N2(e2) {
          return e2 < 256 ? E2[e2] : E2[256 + (e2 >>> 7)];
        }
        function U2(e2, t2) {
          e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
        }
        function P2(e2, t2, r3) {
          e2.bi_valid > d - r3 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U2(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r3 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r3);
        }
        function L2(e2, t2, r3) {
          P2(e2, r3[2 * t2], r3[2 * t2 + 1]);
        }
        function j2(e2, t2) {
          for (var r3 = 0; r3 |= 1 & e2, e2 >>>= 1, r3 <<= 1, 0 < --t2; ) ;
          return r3 >>> 1;
        }
        function Z(e2, t2, r3) {
          var n3, i3, s2 = new Array(g2 + 1), a2 = 0;
          for (n3 = 1; n3 <= g2; n3++) s2[n3] = a2 = a2 + r3[n3 - 1] << 1;
          for (i3 = 0; i3 <= t2; i3++) {
            var o2 = e2[2 * i3 + 1];
            0 !== o2 && (e2[2 * i3] = j2(s2[o2]++, o2));
          }
        }
        function W2(e2) {
          var t2;
          for (t2 = 0; t2 < l2; t2++) e2.dyn_ltree[2 * t2] = 0;
          for (t2 = 0; t2 < f2; t2++) e2.dyn_dtree[2 * t2] = 0;
          for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
          e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
        }
        function M2(e2) {
          8 < e2.bi_valid ? U2(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
        }
        function H2(e2, t2, r3, n3) {
          var i3 = 2 * t2, s2 = 2 * r3;
          return e2[i3] < e2[s2] || e2[i3] === e2[s2] && n3[t2] <= n3[r3];
        }
        function G2(e2, t2, r3) {
          for (var n3 = e2.heap[r3], i3 = r3 << 1; i3 <= e2.heap_len && (i3 < e2.heap_len && H2(t2, e2.heap[i3 + 1], e2.heap[i3], e2.depth) && i3++, !H2(t2, n3, e2.heap[i3], e2.depth)); ) e2.heap[r3] = e2.heap[i3], r3 = i3, i3 <<= 1;
          e2.heap[r3] = n3;
        }
        function K2(e2, t2, r3) {
          var n3, i3, s2, a2, o2 = 0;
          if (0 !== e2.last_lit) for (; n3 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i3 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n3 ? L2(e2, i3, t2) : (L2(e2, (s2 = A2[i3]) + u + 1, t2), 0 !== (a2 = w2[s2]) && P2(e2, i3 -= I2[s2], a2), L2(e2, s2 = N2(--n3), r3), 0 !== (a2 = k2[s2]) && P2(e2, n3 -= T2[s2], a2)), o2 < e2.last_lit; ) ;
          L2(e2, m, t2);
        }
        function Y2(e2, t2) {
          var r3, n3, i3, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h3 = t2.stat_desc.elems, u2 = -1;
          for (e2.heap_len = 0, e2.heap_max = _2, r3 = 0; r3 < h3; r3++) 0 !== s2[2 * r3] ? (e2.heap[++e2.heap_len] = u2 = r3, e2.depth[r3] = 0) : s2[2 * r3 + 1] = 0;
          for (; e2.heap_len < 2; ) s2[2 * (i3 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i3] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i3 + 1]);
          for (t2.max_code = u2, r3 = e2.heap_len >> 1; 1 <= r3; r3--) G2(e2, s2, r3);
          for (i3 = h3; r3 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G2(e2, s2, 1), n3 = e2.heap[1], e2.heap[--e2.heap_max] = r3, e2.heap[--e2.heap_max] = n3, s2[2 * i3] = s2[2 * r3] + s2[2 * n3], e2.depth[i3] = (e2.depth[r3] >= e2.depth[n3] ? e2.depth[r3] : e2.depth[n3]) + 1, s2[2 * r3 + 1] = s2[2 * n3 + 1] = i3, e2.heap[1] = i3++, G2(e2, s2, 1), 2 <= e2.heap_len; ) ;
          e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
            var r4, n4, i4, s3, a3, o3, h4 = t3.dyn_tree, u3 = t3.max_code, l3 = t3.stat_desc.static_tree, f3 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p3 = t3.stat_desc.max_length, m2 = 0;
            for (s3 = 0; s3 <= g2; s3++) e3.bl_count[s3] = 0;
            for (h4[2 * e3.heap[e3.heap_max] + 1] = 0, r4 = e3.heap_max + 1; r4 < _2; r4++) p3 < (s3 = h4[2 * h4[2 * (n4 = e3.heap[r4]) + 1] + 1] + 1) && (s3 = p3, m2++), h4[2 * n4 + 1] = s3, u3 < n4 || (e3.bl_count[s3]++, a3 = 0, d2 <= n4 && (a3 = c2[n4 - d2]), o3 = h4[2 * n4], e3.opt_len += o3 * (s3 + a3), f3 && (e3.static_len += o3 * (l3[2 * n4 + 1] + a3)));
            if (0 !== m2) {
              do {
                for (s3 = p3 - 1; 0 === e3.bl_count[s3]; ) s3--;
                e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p3]--, m2 -= 2;
              } while (0 < m2);
              for (s3 = p3; 0 !== s3; s3--) for (n4 = e3.bl_count[s3]; 0 !== n4; ) u3 < (i4 = e3.heap[--r4]) || (h4[2 * i4 + 1] !== s3 && (e3.opt_len += (s3 - h4[2 * i4 + 1]) * h4[2 * i4], h4[2 * i4 + 1] = s3), n4--);
            }
          })(e2, t2), Z(s2, u2, e2.bl_count);
        }
        function X2(e2, t2, r3) {
          var n3, i3, s2 = -1, a2 = t2[1], o2 = 0, h3 = 7, u2 = 4;
          for (0 === a2 && (h3 = 138, u2 = 3), t2[2 * (r3 + 1) + 1] = 65535, n3 = 0; n3 <= r3; n3++) i3 = a2, a2 = t2[2 * (n3 + 1) + 1], ++o2 < h3 && i3 === a2 || (o2 < u2 ? e2.bl_tree[2 * i3] += o2 : 0 !== i3 ? (i3 !== s2 && e2.bl_tree[2 * i3]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v2]++ : e2.bl_tree[2 * y2]++, s2 = i3, u2 = (o2 = 0) === a2 ? (h3 = 138, 3) : i3 === a2 ? (h3 = 6, 3) : (h3 = 7, 4));
        }
        function V2(e2, t2, r3) {
          var n3, i3, s2 = -1, a2 = t2[1], o2 = 0, h3 = 7, u2 = 4;
          for (0 === a2 && (h3 = 138, u2 = 3), n3 = 0; n3 <= r3; n3++) if (i3 = a2, a2 = t2[2 * (n3 + 1) + 1], !(++o2 < h3 && i3 === a2)) {
            if (o2 < u2) for (; L2(e2, i3, e2.bl_tree), 0 != --o2; ) ;
            else 0 !== i3 ? (i3 !== s2 && (L2(e2, i3, e2.bl_tree), o2--), L2(e2, b, e2.bl_tree), P2(e2, o2 - 3, 2)) : o2 <= 10 ? (L2(e2, v2, e2.bl_tree), P2(e2, o2 - 3, 3)) : (L2(e2, y2, e2.bl_tree), P2(e2, o2 - 11, 7));
            s2 = i3, u2 = (o2 = 0) === a2 ? (h3 = 138, 3) : i3 === a2 ? (h3 = 6, 3) : (h3 = 7, 4);
          }
        }
        n2(T2);
        var q2 = false;
        function J2(e2, t2, r3, n3) {
          P2(e2, (s << 1) + (n3 ? 1 : 0), 3), (function(e3, t3, r4, n4) {
            M2(e3), n4 && (U2(e3, r4), U2(e3, ~r4)), i2.arraySet(e3.pending_buf, e3.window, t3, r4, e3.pending), e3.pending += r4;
          })(e2, t2, r3, true);
        }
        r2._tr_init = function(e2) {
          q2 || ((function() {
            var e3, t2, r3, n3, i3, s2 = new Array(g2 + 1);
            for (n3 = r3 = 0; n3 < a - 1; n3++) for (I2[n3] = r3, e3 = 0; e3 < 1 << w2[n3]; e3++) A2[r3++] = n3;
            for (A2[r3 - 1] = n3, n3 = i3 = 0; n3 < 16; n3++) for (T2[n3] = i3, e3 = 0; e3 < 1 << k2[n3]; e3++) E2[i3++] = n3;
            for (i3 >>= 7; n3 < f2; n3++) for (T2[n3] = i3 << 7, e3 = 0; e3 < 1 << k2[n3] - 7; e3++) E2[256 + i3++] = n3;
            for (t2 = 0; t2 <= g2; t2++) s2[t2] = 0;
            for (e3 = 0; e3 <= 143; ) z2[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (; e3 <= 255; ) z2[2 * e3 + 1] = 9, e3++, s2[9]++;
            for (; e3 <= 279; ) z2[2 * e3 + 1] = 7, e3++, s2[7]++;
            for (; e3 <= 287; ) z2[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (Z(z2, l2 + 1, s2), e3 = 0; e3 < f2; e3++) C2[2 * e3 + 1] = 5, C2[2 * e3] = j2(e3, 5);
            O2 = new D2(z2, w2, u + 1, l2, g2), B2 = new D2(C2, k2, 0, f2, g2), R2 = new D2(new Array(0), x2, 0, c, p2);
          })(), q2 = true), e2.l_desc = new F2(e2.dyn_ltree, O2), e2.d_desc = new F2(e2.dyn_dtree, B2), e2.bl_desc = new F2(e2.bl_tree, R2), e2.bi_buf = 0, e2.bi_valid = 0, W2(e2);
        }, r2._tr_stored_block = J2, r2._tr_flush_block = function(e2, t2, r3, n3) {
          var i3, s2, a2 = 0;
          0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
            var t3, r4 = 4093624447;
            for (t3 = 0; t3 <= 31; t3++, r4 >>>= 1) if (1 & r4 && 0 !== e3.dyn_ltree[2 * t3]) return o;
            if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h2;
            for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h2;
            return o;
          })(e2)), Y2(e2, e2.l_desc), Y2(e2, e2.d_desc), a2 = (function(e3) {
            var t3;
            for (X2(e3, e3.dyn_ltree, e3.l_desc.max_code), X2(e3, e3.dyn_dtree, e3.d_desc.max_code), Y2(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S2[t3] + 1]; t3--) ;
            return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
          })(e2), i3 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i3 && (i3 = s2)) : i3 = s2 = r3 + 5, r3 + 4 <= i3 && -1 !== t2 ? J2(e2, t2, r3, n3) : 4 === e2.strategy || s2 === i3 ? (P2(e2, 2 + (n3 ? 1 : 0), 3), K2(e2, z2, C2)) : (P2(e2, 4 + (n3 ? 1 : 0), 3), (function(e3, t3, r4, n4) {
            var i4;
            for (P2(e3, t3 - 257, 5), P2(e3, r4 - 1, 5), P2(e3, n4 - 4, 4), i4 = 0; i4 < n4; i4++) P2(e3, e3.bl_tree[2 * S2[i4] + 1], 3);
            V2(e3, e3.dyn_ltree, t3 - 1), V2(e3, e3.dyn_dtree, r4 - 1);
          })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K2(e2, e2.dyn_ltree, e2.dyn_dtree)), W2(e2), n3 && M2(e2);
        }, r2._tr_tally = function(e2, t2, r3) {
          return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r3, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r3]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A2[r3] + u + 1)]++, e2.dyn_dtree[2 * N2(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
        }, r2._tr_align = function(e2) {
          P2(e2, 2, 3), L2(e2, m, z2), (function(e3) {
            16 === e3.bi_valid ? (U2(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
          })(e2);
        };
      }, { "../utils/common": 41 }], 53: [function(e, t, r2) {
        "use strict";
        t.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(e, t, r2) {
        (function(e2) {
          !(function(r3, n2) {
            "use strict";
            if (!r3.setImmediate) {
              var i2, s, t2, a, o = 1, h2 = {}, u = false, l2 = r3.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r3);
              e3 = e3 && e3.setTimeout ? e3 : r3, i2 = "[object process]" === {}.toString.call(r3.process) ? function(e4) {
                process.nextTick(function() {
                  c(e4);
                });
              } : (function() {
                if (r3.postMessage && !r3.importScripts) {
                  var e4 = true, t3 = r3.onmessage;
                  return r3.onmessage = function() {
                    e4 = false;
                  }, r3.postMessage("", "*"), r3.onmessage = t3, e4;
                }
              })() ? (a = "setImmediate$" + Math.random() + "$", r3.addEventListener ? r3.addEventListener("message", d, false) : r3.attachEvent("onmessage", d), function(e4) {
                r3.postMessage(a + e4, "*");
              }) : r3.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                c(e4.data);
              }, function(e4) {
                t2.port2.postMessage(e4);
              }) : l2 && "onreadystatechange" in l2.createElement("script") ? (s = l2.documentElement, function(e4) {
                var t3 = l2.createElement("script");
                t3.onreadystatechange = function() {
                  c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                }, s.appendChild(t3);
              }) : function(e4) {
                setTimeout(c, 0, e4);
              }, e3.setImmediate = function(e4) {
                "function" != typeof e4 && (e4 = new Function("" + e4));
                for (var t3 = new Array(arguments.length - 1), r4 = 0; r4 < t3.length; r4++) t3[r4] = arguments[r4 + 1];
                var n3 = { callback: e4, args: t3 };
                return h2[o] = n3, i2(o), o++;
              }, e3.clearImmediate = f2;
            }
            function f2(e4) {
              delete h2[e4];
            }
            function c(e4) {
              if (u) setTimeout(c, 0, e4);
              else {
                var t3 = h2[e4];
                if (t3) {
                  u = true;
                  try {
                    !(function(e5) {
                      var t4 = e5.callback, r4 = e5.args;
                      switch (r4.length) {
                        case 0:
                          t4();
                          break;
                        case 1:
                          t4(r4[0]);
                          break;
                        case 2:
                          t4(r4[0], r4[1]);
                          break;
                        case 3:
                          t4(r4[0], r4[1], r4[2]);
                          break;
                        default:
                          t4.apply(n2, r4);
                      }
                    })(t3);
                  } finally {
                    f2(e4), u = false;
                  }
                }
              }
            }
            function d(e4) {
              e4.source === r3 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
            }
          })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}] }, {}, [10])(10);
    });
  }
});

// node_modules/js-untar/build/dist/untar.js
var require_untar = __commonJS({
  "node_modules/js-untar/build/dist/untar.js"(exports, module2) {
    !(function(e, r2) {
      "function" == typeof define && define.amd ? define([], r2) : "object" == typeof exports ? module2.exports = r2() : e.untar = r2();
    })(exports, function() {
      "use strict";
      function e(e2) {
        function r3(e3) {
          for (var r4 = 0, n4 = t2.length; r4 < n4; ++r4) t2[r4](e3);
          a2.push(e3);
        }
        if ("function" != typeof Promise) throw new Error("Promise implementation not available in this environment.");
        var t2 = [], a2 = [], n3 = new Promise(function(t3, a3) {
          e2(t3, a3, r3);
        });
        n3.progress = function(e3) {
          if ("function" != typeof e3) throw new Error("cb is not a function.");
          for (var r4 = 0, i4 = a2.length; r4 < i4; ++r4) e3(a2[r4]);
          return t2.push(e3), n3;
        };
        var i3 = n3.then;
        return n3.then = function(e3, r4, t3) {
          return i3.call(n3, e3, r4), void 0 !== t3 && n3.progress(t3), n3;
        }, n3;
      }
      function r2(r3) {
        if (!(r3 instanceof ArrayBuffer)) throw new TypeError("arrayBuffer is not an instance of ArrayBuffer.");
        if (!n2.Worker) throw new Error("Worker implementation is not available in this environment.");
        return new e(function(e2, n3, i3) {
          var o2 = new Worker(a), s = [];
          o2.onerror = function(e3) {
            n3(e3);
          }, o2.onmessage = function(r4) {
            switch (r4 = r4.data, r4.type) {
              case "log":
                console[r4.data.level]("Worker: " + r4.data.msg);
                break;
              case "extract":
                var a2 = t(r4.data);
                s.push(a2), i3(a2);
                break;
              case "complete":
                o2.terminate(), e2(s);
                break;
              case "error":
                o2.terminate(), n3(new Error(r4.data.message));
                break;
              default:
                o2.terminate(), n3(new Error("Unknown message from worker: " + r4.type));
            }
          }, o2.postMessage({ type: "extract", buffer: r3 }, [r3]);
        });
      }
      function t(e2) {
        return Object.defineProperties(e2, o), e2;
      }
      var a, n2 = window || this, i2 = n2.URL || n2.webkitURL, o = { blob: { get: function() {
        return this._blob || (this._blob = new Blob([this.buffer]));
      } }, getBlobUrl: { value: function() {
        return this._blobUrl || (this._blobUrl = i2.createObjectURL(this.blob));
      } }, readAsString: { value: function() {
        for (var e2 = this.buffer, r3 = e2.byteLength, t2 = 1, a2 = new DataView(e2), n3 = [], i3 = 0; i3 < r3; ++i3) {
          var o2 = a2.getUint8(i3 * t2, true);
          n3.push(o2);
        }
        return this._string = String.fromCharCode.apply(null, n3);
      } }, readAsJSON: { value: function() {
        return JSON.parse(this.readAsString());
      } } };
      return a = (window || this).URL.createObjectURL(new Blob(['"use strict";function UntarWorker(){}function decodeUTF8(e){for(var r="",t=0;t<e.length;){var a=e[t++];if(a>127){if(a>191&&a<224){if(t>=e.length)throw"UTF-8 decode: incomplete 2-byte sequence";a=(31&a)<<6|63&e[t]}else if(a>223&&a<240){if(t+1>=e.length)throw"UTF-8 decode: incomplete 3-byte sequence";a=(15&a)<<12|(63&e[t])<<6|63&e[++t]}else{if(!(a>239&&a<248))throw"UTF-8 decode: unknown multibyte start 0x"+a.toString(16)+" at index "+(t-1);if(t+2>=e.length)throw"UTF-8 decode: incomplete 4-byte sequence";a=(7&a)<<18|(63&e[t])<<12|(63&e[++t])<<6|63&e[++t]}++t}if(a<=65535)r+=String.fromCharCode(a);else{if(!(a<=1114111))throw"UTF-8 decode: code point 0x"+a.toString(16)+" exceeds UTF-16 reach";a-=65536,r+=String.fromCharCode(a>>10|55296),r+=String.fromCharCode(1023&a|56320)}}return r}function PaxHeader(e){this._fields=e}function TarFile(){}function UntarStream(e){this._bufferView=new DataView(e),this._position=0}function UntarFileStream(e){this._stream=new UntarStream(e),this._globalPaxHeader=null}if(UntarWorker.prototype={onmessage:function(e){try{if("extract"!==e.data.type)throw new Error("Unknown message type: "+e.data.type);this.untarBuffer(e.data.buffer)}catch(r){this.postError(r)}},postError:function(e){this.postMessage({type:"error",data:{message:e.message}})},postLog:function(e,r){this.postMessage({type:"log",data:{level:e,msg:r}})},untarBuffer:function(e){try{for(var r=new UntarFileStream(e);r.hasNext();){var t=r.next();this.postMessage({type:"extract",data:t},[t.buffer])}this.postMessage({type:"complete"})}catch(a){this.postError(a)}},postMessage:function(e,r){self.postMessage(e,r)}},"undefined"!=typeof self){var worker=new UntarWorker;self.onmessage=function(e){worker.onmessage(e)}}PaxHeader.parse=function(e){for(var r=new Uint8Array(e),t=[];r.length>0;){var a=parseInt(decodeUTF8(r.subarray(0,r.indexOf(32)))),n=decodeUTF8(r.subarray(0,a)),i=n.match(/^\\d+ ([^=]+)=(.*)\\n$/);if(null===i)throw new Error("Invalid PAX header data format.");var s=i[1],o=i[2];0===o.length?o=null:null!==o.match(/^\\d+$/)&&(o=parseInt(o));var f={name:s,value:o};t.push(f),r=r.subarray(a)}return new PaxHeader(t)},PaxHeader.prototype={applyHeader:function(e){this._fields.forEach(function(r){var t=r.name,a=r.value;"path"===t?(t="name",void 0!==e.prefix&&delete e.prefix):"linkpath"===t&&(t="linkname"),null===a?delete e[t]:e[t]=a})}},UntarStream.prototype={readString:function(e){for(var r=1,t=e*r,a=[],n=0;n<e;++n){var i=this._bufferView.getUint8(this.position()+n*r,!0);if(0===i)break;a.push(i)}return this.seek(t),String.fromCharCode.apply(null,a)},readBuffer:function(e){var r;if("function"==typeof ArrayBuffer.prototype.slice)r=this._bufferView.buffer.slice(this.position(),this.position()+e);else{r=new ArrayBuffer(e);var t=new Uint8Array(r),a=new Uint8Array(this._bufferView.buffer,this.position(),e);t.set(a)}return this.seek(e),r},seek:function(e){this._position+=e},peekUint32:function(){return this._bufferView.getUint32(this.position(),!0)},position:function(e){return void 0===e?this._position:void(this._position=e)},size:function(){return this._bufferView.byteLength}},UntarFileStream.prototype={hasNext:function(){return this._stream.position()+4<this._stream.size()&&0!==this._stream.peekUint32()},next:function(){return this._readNextFile()},_readNextFile:function(){var e=this._stream,r=new TarFile,t=!1,a=null,n=e.position(),i=n+512;switch(r.name=e.readString(100),r.mode=e.readString(8),r.uid=parseInt(e.readString(8)),r.gid=parseInt(e.readString(8)),r.size=parseInt(e.readString(12),8),r.mtime=parseInt(e.readString(12),8),r.checksum=parseInt(e.readString(8)),r.type=e.readString(1),r.linkname=e.readString(100),r.ustarFormat=e.readString(6),r.ustarFormat.indexOf("ustar")>-1&&(r.version=e.readString(2),r.uname=e.readString(32),r.gname=e.readString(32),r.devmajor=parseInt(e.readString(8)),r.devminor=parseInt(e.readString(8)),r.namePrefix=e.readString(155),r.namePrefix.length>0&&(r.name=r.namePrefix+"/"+r.name)),e.position(i),r.type){case"0":case"":r.buffer=e.readBuffer(r.size);break;case"1":break;case"2":break;case"3":break;case"4":break;case"5":break;case"6":break;case"7":break;case"g":t=!0,this._globalPaxHeader=PaxHeader.parse(e.readBuffer(r.size));break;case"x":t=!0,a=PaxHeader.parse(e.readBuffer(r.size))}void 0===r.buffer&&(r.buffer=new ArrayBuffer(0));var s=i+r.size;return r.size%512!==0&&(s+=512-r.size%512),e.position(s),t&&(r=this._readNextFile()),null!==this._globalPaxHeader&&this._globalPaxHeader.applyHeader(r),null!==a&&a.applyHeader(r),r}};'])), r2;
    });
  }
});

// node_modules/@kittycad/lib/node_modules/@kittycad/oauth2-auth-code-pkce/index.js
var Stage;
(function(Stage2) {
  Stage2[Stage2["Initial"] = 0] = "Initial";
  Stage2[Stage2["GoingToAuthServer"] = 1] = "GoingToAuthServer";
  Stage2[Stage2["ReturnedFromAuthServer"] = 2] = "ReturnedFromAuthServer";
  Stage2[Stage2["AuthCodeBeenExchangedForAccessToken"] = 3] = "AuthCodeBeenExchangedForAccessToken";
  Stage2[Stage2["NeedsRefresh"] = 4] = "NeedsRefresh";
  Stage2[Stage2["Fetching"] = 5] = "Fetching";
  Stage2[Stage2["Authenticated"] = 6] = "Authenticated";
})(Stage || (Stage = {}));
var EErrorOAuth2;
(function(EErrorOAuth22) {
  EErrorOAuth22["ErrorUnknown"] = "ErrorUnknown";
  EErrorOAuth22["ErrorNoAuthCode"] = "ErrorNoAuthCode";
  EErrorOAuth22["ErrorInvalidReturnedStateParam"] = "ErrorInvalidReturnedStateParam";
  EErrorOAuth22["ErrorInvalidJson"] = "ErrorInvalidJson";
  EErrorOAuth22["ErrorInvalidScope"] = "ErrorInvalidScope";
  EErrorOAuth22["ErrorInvalidRequest"] = "ErrorInvalidRequest";
  EErrorOAuth22["ErrorInvalidToken"] = "ErrorInvalidToken";
  EErrorOAuth22["ErrorAuthenticationGrant"] = "ErrorAuthenticationGrant";
  EErrorOAuth22["ErrorAccessTokenResponse"] = "ErrorAccessTokenResponse";
})(EErrorOAuth2 || (EErrorOAuth2 = {}));
var EErrorAuthenticationGrant;
(function(EErrorAuthenticationGrant2) {
  EErrorAuthenticationGrant2["ErrorUnauthorizedClient"] = "ErrorUnauthorizedClient";
  EErrorAuthenticationGrant2["ErrorAccessDenied"] = "ErrorAccessDenied";
  EErrorAuthenticationGrant2["ErrorUnsupportedResponseType"] = "ErrorUnsupportedResponseType";
  EErrorAuthenticationGrant2["ErrorServerError"] = "ErrorServerError";
  EErrorAuthenticationGrant2["ErrorTemporarilyUnavailable"] = "ErrorTemporarilyUnavailable";
})(EErrorAuthenticationGrant || (EErrorAuthenticationGrant = {}));
var EErrorAccessTokenResponse;
(function(EErrorAccessTokenResponse2) {
  EErrorAccessTokenResponse2["ErrorInvalidClient"] = "ErrorInvalidClient";
  EErrorAccessTokenResponse2["ErrorInvalidGrant"] = "ErrorInvalidGrant";
  EErrorAccessTokenResponse2["ErrorUnsupportedGrantType"] = "ErrorUnsupportedGrantType";
})(EErrorAccessTokenResponse || (EErrorAccessTokenResponse = {}));
var RawErrorToOAuth2ErrorTypeMap = {
  invalid_json: {
    kind: EErrorOAuth2.ErrorInvalidJson
  },
  invalid_scope: {
    kind: EErrorOAuth2.ErrorInvalidScope
  },
  invalid_request: {
    kind: EErrorOAuth2.ErrorInvalidRequest
  },
  invalid_token: {
    kind: EErrorOAuth2.ErrorInvalidToken
  },
  invalid_grant: {
    kind: EErrorOAuth2.ErrorAccessTokenResponse,
    value: EErrorAccessTokenResponse.ErrorInvalidGrant
  },
  unauthorized_client: {
    kind: EErrorOAuth2.ErrorAuthenticationGrant,
    value: EErrorAuthenticationGrant.ErrorUnauthorizedClient
  },
  access_denied: {
    kind: EErrorOAuth2.ErrorAuthenticationGrant,
    value: EErrorAuthenticationGrant.ErrorAccessDenied
  },
  unsupported_response_type: {
    kind: EErrorOAuth2.ErrorAuthenticationGrant,
    value: EErrorAuthenticationGrant.ErrorUnsupportedResponseType
  },
  server_error: {
    kind: EErrorOAuth2.ErrorAuthenticationGrant,
    value: EErrorAuthenticationGrant.ErrorServerError
  },
  temporarily_unavailable: {
    kind: EErrorOAuth2.ErrorAuthenticationGrant,
    value: EErrorAuthenticationGrant.ErrorTemporarilyUnavailable
  },
  invalid_client: {
    kind: EErrorOAuth2.ErrorAccessTokenResponse,
    value: EErrorAccessTokenResponse.ErrorInvalidClient
  },
  unsupported_grant_type: {
    kind: EErrorOAuth2.ErrorAccessTokenResponse,
    value: EErrorAccessTokenResponse.ErrorUnsupportedGrantType
  }
};
function toErrorClass(rawError) {
  return RawErrorToOAuth2ErrorTypeMap[rawError] ?? { kind: EErrorOAuth2.ErrorUnknown };
}
function fromWWWAuthenticateHeaderStringToObject(a) {
  const obj = a.slice("Bearer ".length).replace(/"/g, "").split(", ").map((tokens) => {
    const [k2, v2] = tokens.split("=");
    return { [k2 ?? /* @__PURE__ */ Symbol()]: v2 };
  }).reduce((a2, c) => ({ ...a2, ...c }), {});
  return { realm: obj["realm"] ?? "missing", error: obj["error"] ?? "missing" };
}
var HEADER_AUTHORIZATION = "Authorization";
var HEADER_WWW_AUTHENTICATE = "WWW-Authenticate";
var LOCALSTORAGE_ID = `oauth2authcodepkce`;
var LOCALSTORAGE_STATE = `${LOCALSTORAGE_ID}-state`;
var RECOMMENDED_CODE_VERIFIER_LENGTH = 96;
var RECOMMENDED_STATE_LENGTH = 32;
var PKCE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
var OAuth2AuthCodePKCE = class _OAuth2AuthCodePKCE {
  config;
  state = {
    stage: Stage.Initial
  };
  authCodeForAccessTokenRequest;
  constructor(config) {
    this.config = config;
    this.recoverState();
    return this;
  }
  /**
   * Attach the OAuth logic to all fetch requests and translate errors (either
   * returned as json or through the WWW-Authenticate header) into nice error
   * classes.
   */
  decorateFetchHTTPClient(fetch2) {
    return (url, config, ...rest) => {
      if (!this.state.isHTTPDecoratorActive) {
        return fetch2(url, config, ...rest);
      }
      return this.getAccessToken().then((data) => {
        if (data === void 0 || data.token === void 0) {
          return Promise.reject(new Error("No token"));
        }
        const configNew = Object.assign({}, config);
        if (!configNew.headers) {
          configNew.headers = {};
        }
        configNew.headers[HEADER_AUTHORIZATION] = `Bearer ${data.token.value}`;
        return fetch2(url, configNew, ...rest);
      }).then((res) => {
        if (res.ok) {
          return res;
        }
        if (!res.headers.has(HEADER_WWW_AUTHENTICATE.toLowerCase())) {
          return res;
        }
        const error = toErrorClass(fromWWWAuthenticateHeaderStringToObject(res.headers.get(HEADER_WWW_AUTHENTICATE.toLowerCase())).error);
        if (error.kind === EErrorOAuth2.ErrorInvalidToken && this.state.stage !== Stage.NeedsRefresh) {
          this.state.stage = Stage.NeedsRefresh;
          this.config.onAccessTokenExpiry(() => this.exchangeRefreshTokenForAccessToken());
        }
        return Promise.reject(error);
      });
    };
  }
  /**
   * If there is an error, it will be passed back as a rejected Promise.
   * If there is no code, the user should be redirected via
   * [fetchAuthorizationCode].
   */
  isReturningFromAuthServer() {
    const error = _OAuth2AuthCodePKCE.extractParamFromUrl(location.href, "error");
    if (error) {
      return Promise.reject(toErrorClass(error));
    }
    const state = JSON.parse(localStorage.getItem(LOCALSTORAGE_STATE) || "{}");
    if (state.stage !== Stage.GoingToAuthServer) {
      return Promise.resolve(false);
    }
    const code = _OAuth2AuthCodePKCE.extractParamFromUrl(location.href, "code");
    if (!code) {
      return Promise.resolve(false);
    }
    const stateQueryParam = _OAuth2AuthCodePKCE.extractParamFromUrl(location.href, "state");
    if (stateQueryParam !== state.stateQueryParam) {
      console.warn("state query string parameter doesn't match the one sent! Possible malicious activity somewhere.");
      return Promise.reject({ kind: EErrorOAuth2.ErrorInvalidReturnedStateParam });
    }
    state.authorizationCode = code;
    state.stage = Stage.ReturnedFromAuthServer;
    localStorage.setItem(LOCALSTORAGE_STATE, JSON.stringify(state));
    this.setState(state);
    return Promise.resolve(true);
  }
  /**
   * Fetch an authorization grant via redirection. In a sense this function
   * doesn't return because of the redirect behavior (uses `location.replace`).
   *
   * @param oneTimeParams A way to specify "one time" used query string
   * parameters during the authorization code fetching process, usually for
   * values which need to change at run-time.
   */
  async fetchAuthorizationCode(oneTimeParams) {
    this.assertStateAndConfigArePresent();
    const { clientId, extraAuthorizationParams, redirectUrl, scopes } = this.config;
    const { codeChallenge, codeVerifier } = await _OAuth2AuthCodePKCE.generatePKCECodes();
    const stateQueryParam = _OAuth2AuthCodePKCE.generateRandomState(RECOMMENDED_STATE_LENGTH);
    this.state = {
      ...this.state,
      stage: Stage.GoingToAuthServer,
      codeChallenge,
      codeVerifier,
      stateQueryParam,
      isHTTPDecoratorActive: true
    };
    localStorage.setItem(LOCALSTORAGE_STATE, JSON.stringify(this.state));
    let url = this.config.authorizationUrl + `?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent(scopes.join(" "))}&state=${stateQueryParam}&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=S256`;
    if (extraAuthorizationParams || oneTimeParams) {
      const extraParameters = {
        ...extraAuthorizationParams,
        ...oneTimeParams
      };
      url = `${url}&${_OAuth2AuthCodePKCE.objectToQueryString(extraParameters)}`;
    }
    location.replace(url);
  }
  /**
   * Tries to get the current access token. If there is none
   * it will fetch another one. If it is expired, it will fire
   * [onAccessTokenExpiry] but it's up to the user to call the refresh token
   * function. This is because sometimes not using the refresh token facilities
   * is easier.
   */
  getAccessToken() {
    this.assertStateAndConfigArePresent();
    const { onAccessTokenExpiry } = this.config;
    const { accessToken, authorizationCode, explicitlyExposedTokens, stage, refreshToken, scopes } = this.state;
    if (!authorizationCode) {
      return Promise.reject({ kind: EErrorOAuth2.ErrorNoAuthCode });
    }
    if (this.authCodeForAccessTokenRequest) {
      return this.authCodeForAccessTokenRequest;
    }
    if (!this.isAuthorized() || stage < Stage.AuthCodeBeenExchangedForAccessToken) {
      this.authCodeForAccessTokenRequest = this.exchangeAuthCodeForAccessToken();
      return this.authCodeForAccessTokenRequest;
    }
    if (refreshToken && this.isAccessTokenExpired() && stage !== Stage.Fetching) {
      this.state.stage = Stage.Fetching;
      return onAccessTokenExpiry(() => this.exchangeRefreshTokenForAccessToken());
    }
    return Promise.resolve({
      token: accessToken,
      explicitlyExposedTokens,
      scopes,
      refreshToken
    });
  }
  /**
   * Refresh an access token from the remote service.
   */
  exchangeRefreshTokenForAccessToken() {
    this.assertStateAndConfigArePresent();
    const { extraRefreshParams, clientId, tokenUrl } = this.config;
    const { refreshToken } = this.state;
    if (!refreshToken) {
      console.warn("No refresh token is present.");
    }
    const url = tokenUrl;
    let body = `grant_type=refresh_token&refresh_token=${refreshToken?.value}&client_id=${clientId}`;
    if (extraRefreshParams) {
      body = `${url}&${_OAuth2AuthCodePKCE.objectToQueryString(extraRefreshParams)}`;
    }
    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => res.status >= 400 ? res.json().then((data) => Promise.reject(data)) : res.json()).then((json) => {
      const { access_token, expires_in, refresh_token, scope } = json;
      const { explicitlyExposedTokens } = this.config;
      let scopes = [];
      let tokensToExpose = {};
      const accessToken = {
        value: access_token,
        expiry: new Date(Date.now() + parseInt(expires_in) * 1e3).toString()
      };
      this.state.accessToken = accessToken;
      if (refresh_token) {
        const refreshToken2 = {
          value: refresh_token
        };
        this.state.refreshToken = refreshToken2;
      }
      if (explicitlyExposedTokens) {
        tokensToExpose = Object.fromEntries(explicitlyExposedTokens.map((tokenName) => [tokenName, json[tokenName]]).filter(([_2, tokenValue]) => tokenValue !== void 0));
        this.state.explicitlyExposedTokens = tokensToExpose;
      }
      if (scope) {
        scopes = scope.split(" ");
        this.state.scopes = scopes;
      }
      localStorage.setItem(LOCALSTORAGE_STATE, JSON.stringify(this.state));
      let accessContext = { token: accessToken, scopes };
      if (explicitlyExposedTokens) {
        accessContext.explicitlyExposedTokens = tokensToExpose;
      }
      return accessContext;
    }).catch((data) => {
      const { onInvalidGrant } = this.config;
      const error = data.error || "There was a network error.";
      switch (error) {
        case "invalid_grant":
          onInvalidGrant(() => this.fetchAuthorizationCode());
          break;
        default:
          break;
      }
      return Promise.reject(toErrorClass(error));
    });
  }
  /**
   * Get the scopes that were granted by the authorization server.
   */
  getGrantedScopes() {
    return this.state.scopes;
  }
  /**
   * Signals if OAuth HTTP decorating should be active or not.
   */
  isHTTPDecoratorActive(isActive) {
    this.state.isHTTPDecoratorActive = isActive;
    localStorage.setItem(LOCALSTORAGE_STATE, JSON.stringify(this.state));
  }
  /**
   * Tells if the client is authorized or not. This means the client has at
   * least once successfully fetched an access token. The access token could be
   * expired.
   */
  isAuthorized() {
    return !!this.state.accessToken;
  }
  /**
   * Checks to see if the access token has expired.
   */
  isAccessTokenExpired() {
    const { accessToken } = this.state;
    return Boolean(accessToken && /* @__PURE__ */ new Date() >= new Date(accessToken.expiry));
  }
  /**
   * Resets the state of the client. Equivalent to "logging out" the user.
   */
  reset() {
    this.setState({
      stage: Stage.Initial
    });
    this.authCodeForAccessTokenRequest = void 0;
  }
  /**
   * If the state or config are missing, it means the client is in a bad state.
   * This should never happen, but the check is there just in case.
   */
  assertStateAndConfigArePresent() {
    if (!this.state || !this.config) {
      console.error("state:", this.state, "config:", this.config);
      throw new Error("state or config is not set.");
    }
  }
  /**
   * Fetch an access token from the remote service. You may pass a custom
   * authorization grant code for any reason, but this is non-standard usage.
   */
  exchangeAuthCodeForAccessToken(codeOverride) {
    this.assertStateAndConfigArePresent();
    const { authorizationCode = codeOverride, codeVerifier = "" } = this.state;
    const { clientId, onInvalidGrant, redirectUrl } = this.config;
    if (!codeVerifier) {
      console.warn("No code verifier is being sent.");
    } else if (!authorizationCode) {
      console.warn("No authorization grant code is being passed.");
    }
    const url = this.config.tokenUrl;
    const body = `grant_type=authorization_code&code=${encodeURIComponent(authorizationCode || "")}&redirect_uri=${encodeURIComponent(redirectUrl)}&client_id=${encodeURIComponent(clientId)}&code_verifier=${codeVerifier}`;
    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      const jsonPromise = res.json().catch((_2) => ({ error: "invalid_json" }));
      if (!res.ok) {
        return jsonPromise.then(({ error }) => {
          switch (error) {
            case "invalid_grant":
              onInvalidGrant(() => this.fetchAuthorizationCode());
              break;
            default:
              break;
          }
          return Promise.reject(toErrorClass(error));
        });
      }
      return jsonPromise.then((json) => {
        const { access_token, expires_in, refresh_token, scope } = json;
        const { explicitlyExposedTokens } = this.config;
        let scopes = [];
        let tokensToExpose = {};
        this.state.stage = Stage.AuthCodeBeenExchangedForAccessToken;
        this.authCodeForAccessTokenRequest = void 0;
        const accessToken = {
          value: access_token,
          expiry: new Date(Date.now() + parseInt(expires_in) * 1e3).toString()
        };
        this.state.accessToken = accessToken;
        if (refresh_token) {
          const refreshToken = {
            value: refresh_token
          };
          this.state.refreshToken = refreshToken;
        }
        if (explicitlyExposedTokens) {
          tokensToExpose = Object.fromEntries(explicitlyExposedTokens.map((tokenName) => [tokenName, json[tokenName]]).filter(([_2, tokenValue]) => tokenValue !== void 0));
          this.state.explicitlyExposedTokens = tokensToExpose;
        }
        if (scope) {
          scopes = scope.split(" ");
          this.state.scopes = scopes;
        }
        localStorage.setItem(LOCALSTORAGE_STATE, JSON.stringify(this.state));
        let accessContext = { token: accessToken, scopes };
        if (explicitlyExposedTokens) {
          accessContext.explicitlyExposedTokens = tokensToExpose;
        }
        return accessContext;
      });
    });
  }
  recoverState() {
    this.state = JSON.parse(localStorage.getItem(LOCALSTORAGE_STATE) || "{}");
    return this;
  }
  setState(state) {
    this.state = state;
    localStorage.setItem(LOCALSTORAGE_STATE, JSON.stringify(state));
    return this;
  }
  /**
   * Implements *base64url-encode* (RFC 4648 § 5) without padding, which is NOT
   * the same as regular base64 encoding.
   */
  static base64urlEncode(value) {
    let base64 = btoa(value);
    base64 = base64.replace(/\+/g, "-");
    base64 = base64.replace(/\//g, "_");
    base64 = base64.replace(/=/g, "");
    return base64;
  }
  /**
   * Extracts a query string parameter.
   */
  static extractParamFromUrl(url, param) {
    let queryString = url.split("?");
    if (queryString.length < 2) {
      return "";
    }
    queryString = queryString[1]?.split("#") ?? [];
    const parts = queryString[0]?.split("&").reduce((a, s) => a.concat(s.split("=")), []) ?? [];
    if (parts.length < 2) {
      return "";
    }
    const paramIdx = parts.indexOf(param);
    return decodeURIComponent(paramIdx >= 0 ? parts[paramIdx + 1] ?? "" : "");
  }
  /**
   * Converts the keys and values of an object to a url query string
   */
  static objectToQueryString(dict) {
    return Object.entries(dict).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join("&");
  }
  /**
   * Generates a code_verifier and code_challenge, as specified in rfc7636.
   */
  static generatePKCECodes() {
    const output = new Uint32Array(RECOMMENDED_CODE_VERIFIER_LENGTH);
    crypto.getRandomValues(output);
    const codeVerifier = _OAuth2AuthCodePKCE.base64urlEncode(Array.from(output).map((num) => PKCE_CHARSET[num % PKCE_CHARSET.length]).join(""));
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier)).then((buffer) => {
      let hash = new Uint8Array(buffer);
      let binary = "";
      let hashLength = hash.byteLength;
      for (let i2 = 0; i2 < hashLength; i2++) {
        binary += String.fromCharCode(hash[i2] ?? 0);
      }
      return binary;
    }).then(_OAuth2AuthCodePKCE.base64urlEncode).then((codeChallenge) => ({ codeChallenge, codeVerifier }));
  }
  /**
   * Generates random state to be passed for anti-csrf.
   */
  static generateRandomState(lengthOfState) {
    const output = new Uint32Array(lengthOfState);
    crypto.getRandomValues(output);
    return Array.from(output).map((num) => PKCE_CHARSET[num % PKCE_CHARSET.length]).join("");
  }
};

// node_modules/@kittycad/lib/dist/mjs/index.js
try {
  if ("undefined" == typeof fetch && "undefined" != typeof process && process.versions?.node) {
    new Function("m", "return import(m)")("cross-fetch/polyfill").catch((() => {
    }));
  }
} catch {
}
var n = class {
  constructor(t) {
    const e = "undefined" != typeof process ? process.env : void 0, n2 = e?.KITTYCAD_TOKEN || e?.KITTYCAD_API_TOKEN || e?.ZOO_AI_TOKEN, i2 = e?.ZOO_HOST;
    "string" == typeof t ? this.token = t : t && "object" == typeof t && (this.token = t.token, this.baseUrl = t.baseUrl, this.fetch = t.fetch, this.clientId = t.clientId, this.redirectUrl = t.redirectUrl, this.scopes = t.scopes, this.onAccessTokenExpiry = t.onAccessTokenExpiry, this.onInvalidGrant = t.onInvalidGrant), this.token ??= n2, this.baseUrl ??= i2, this.clientId && "undefined" != typeof localStorage && (this.oauth2 = this.createOAuth2Client(), this.oauth2.isHTTPDecoratorActive(true), this.fetch = this.oauth2.decorateFetchHTTPClient(this.fetch || fetch));
  }
  authorize(t) {
    return this.oauth2.fetchAuthorizationCode(t);
  }
  isReturningFromAuthServer() {
    return this.oauth2.isReturningFromAuthServer();
  }
  async getAccessToken() {
    const t = await this.oauth2.getAccessToken();
    return this.updateTokenFromAccessContext(t), t;
  }
  resetOAuth2() {
    this.oauth2.reset(), this.token = void 0;
  }
  createOAuth2Client() {
    const e = this.baseUrl || "https://api.zoo.dev", n2 = this.redirectUrl || ("undefined" == typeof location ? void 0 : `${location.origin}${location.pathname}`);
    if (!n2) throw new Error("OAuth2 requires redirectUrl when the current browser URL is unavailable.");
    return new OAuth2AuthCodePKCE({ authorizationUrl: i(e, "/oauth2/authorize"), tokenUrl: i(e, "/oauth2/token"), clientId: this.clientId, redirectUrl: n2, scopes: this.scopes || [], onAccessTokenExpiry: async (t) => {
      const e2 = await (this.onAccessTokenExpiry ? this.onAccessTokenExpiry(t) : t());
      return this.updateTokenFromAccessContext(e2), e2;
    }, onInvalidGrant: this.onInvalidGrant || (() => {
    }) });
  }
  updateTokenFromAccessContext(t) {
    t?.token?.value && (this.token = t.token.value);
  }
};
function i(t, e) {
  return `${t.replace(/\/+$/, "")}/${e.replace(/^\/+/, "")}`;
}
function l(t) {
  const e = new URLSearchParams();
  for (const [n3, i2] of Object.entries(t)) if (void 0 !== i2) if (Array.isArray(i2)) for (const t2 of i2) e.append(n3, String(t2));
  else e.append(n3, String(i2));
  const n2 = e.toString();
  return n2 ? `?${n2}` : "";
}
try {
  if ("undefined" != typeof process && process.versions?.node && "win32" === process.platform) {
    new Function("m", "return import(m)")("win-ca");
  }
} catch {
}
var r = (() => {
  const t = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype), Symbol.toStringTag).get;
  return (e) => t.call(e);
})();
function h(t) {
  return "Uint8Array" === r(t);
}
function p(t) {
  return "object" == typeof t && null != t && Symbol.toStringTag in t && ("ArrayBuffer" === t[Symbol.toStringTag] || "SharedArrayBuffer" === t[Symbol.toStringTag]);
}
function y(t) {
  return t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t);
}
function G(t) {
  return "object" == typeof t && null != t && Symbol.toStringTag in t && "Map" === t[Symbol.toStringTag];
}
function X(t) {
  return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
}
function V(t, e) {
  return JSON.stringify(t, ((t2, e2) => "bigint" == typeof e2 ? { $numberLong: `${e2}` } : G(e2) ? Object.fromEntries(e2) : e2));
}
var W = 7;
var f = /* @__PURE__ */ Symbol.for("@@mdb.bson.version");
var g = 2147483647;
var Y = -2147483648;
var I = Math.pow(2, 63) - 1;
var R = -Math.pow(2, 63);
var S = Math.pow(2, 53);
var J = -Math.pow(2, 53);
var K = 1;
var T = 2;
var L = 3;
var U = 4;
var z = 5;
var x = 6;
var N = 7;
var w = 8;
var k = 9;
var H = 10;
var C = 11;
var B = 12;
var v = 13;
var M = 14;
var j = 15;
var P = 16;
var F = 17;
var Q = 18;
var O = 19;
var E = 255;
var _ = 127;
var D = 0;
var A = 4;
var $ = Object.freeze({ double: 1, string: 2, object: 3, array: 4, binData: 5, undefined: 6, objectId: 7, bool: 8, date: 9, null: 10, regex: 11, dbPointer: 12, javascript: 13, symbol: 14, javascriptWithScope: 15, int: 16, timestamp: 17, long: 18, decimal: 19, minKey: -1, maxKey: 127 });
var q = class extends Error {
  get bsonError() {
    return true;
  }
  get name() {
    return "BSONError";
  }
  constructor(t, e) {
    super(t, e);
  }
  static isBSONError(t) {
    return null != t && "object" == typeof t && "bsonError" in t && true === t.bsonError && "name" in t && "message" in t && "stack" in t;
  }
};
var tt = class extends q {
  get name() {
    return "BSONVersionError";
  }
  constructor() {
    super(`Unsupported BSON version, bson types must be from bson ${W}.x.x`);
  }
};
var et = class extends q {
  get name() {
    return "BSONRuntimeError";
  }
  constructor(t) {
    super(t);
  }
};
var nt = class extends q {
  get name() {
    return "BSONOffsetError";
  }
  offset;
  constructor(t, e, n2) {
    super(`${t}. offset: ${e}`, n2), this.offset = e;
  }
};
var it;
var lt;
function ot(t, e, n2, i2) {
  if (i2) {
    it ??= new TextDecoder("utf8", { fatal: true });
    try {
      return it.decode(t.subarray(e, n2));
    } catch (t2) {
      throw new q("Invalid UTF-8 string in BSON document", { cause: t2 });
    }
  }
  return lt ??= new TextDecoder("utf8", { fatal: false }), lt.decode(t.subarray(e, n2));
}
function ct(t, e, n2) {
  if (0 === t.length) return "";
  const i2 = n2 - e;
  if (0 === i2) return "";
  if (i2 > 20) return null;
  if (1 === i2 && t[e] < 128) return String.fromCharCode(t[e]);
  if (2 === i2 && t[e] < 128 && t[e + 1] < 128) return String.fromCharCode(t[e]) + String.fromCharCode(t[e + 1]);
  if (3 === i2 && t[e] < 128 && t[e + 1] < 128 && t[e + 2] < 128) return String.fromCharCode(t[e]) + String.fromCharCode(t[e + 1]) + String.fromCharCode(t[e + 2]);
  const l2 = [];
  for (let i3 = e; i3 < n2; i3++) {
    const e2 = t[i3];
    if (e2 > 127) return null;
    l2.push(e2);
  }
  return String.fromCharCode(...l2);
}
function at(t) {
  return bt.fromNumberArray(Array.from({ length: t }, (() => Math.floor(256 * Math.random()))));
}
function st(t) {
  return crypto.getRandomValues(bt.allocate(t));
}
var dt = (() => {
  const { crypto: t } = globalThis;
  return null != t && "function" == typeof t.getRandomValues ? st : at;
})();
var bt = { isUint8Array: h, toLocalBufferType(t) {
  if (Buffer.isBuffer(t)) return t;
  if (ArrayBuffer.isView(t)) return Buffer.from(t.buffer, t.byteOffset, t.byteLength);
  const e = t?.[Symbol.toStringTag] ?? Object.prototype.toString.call(t);
  if ("ArrayBuffer" === e || "SharedArrayBuffer" === e || "[object ArrayBuffer]" === e || "[object SharedArrayBuffer]" === e) return Buffer.from(t);
  throw new q("Cannot create Buffer from the passed potentialBuffer.");
}, allocate: (t) => Buffer.alloc(t), allocateUnsafe: (t) => Buffer.allocUnsafe(t), compare: (t, e) => bt.toLocalBufferType(t).compare(e), concat: (t) => Buffer.concat(t), copy: (t, e, n2, i2, l2) => bt.toLocalBufferType(t).copy(e, n2 ?? 0, i2 ?? 0, l2 ?? t.length), equals: (t, e) => bt.toLocalBufferType(t).equals(e), fromNumberArray: (t) => Buffer.from(t), fromBase64: (t) => Buffer.from(t, "base64"), fromUTF8: (t) => Buffer.from(t, "utf8"), toBase64: (t) => bt.toLocalBufferType(t).toString("base64"), fromISO88591: (t) => Buffer.from(t, "binary"), toISO88591: (t) => bt.toLocalBufferType(t).toString("binary"), fromHex: (t) => Buffer.from(t, "hex"), toHex: (t) => bt.toLocalBufferType(t).toString("hex"), toUTF8(t, e, n2, i2) {
  const l2 = n2 - e <= 20 ? ct(t, e, n2) : null;
  if (null != l2) return l2;
  const o = bt.toLocalBufferType(t).toString("utf8", e, n2);
  if (i2) {
    for (let i3 = 0; i3 < o.length; i3++) if (65533 === o.charCodeAt(i3)) {
      ot(t, e, n2, true);
      break;
    }
  }
  return o;
}, utf8ByteLength: (t) => Buffer.byteLength(t, "utf8"), encodeUTF8Into(t, e, n2) {
  const i2 = (function(t2, e2, n3) {
    if (0 === e2.length) return 0;
    if (e2.length > 25) return null;
    if (t2.length - n3 < e2.length) return null;
    for (let i3 = 0, l2 = n3; i3 < e2.length; i3++, l2++) {
      const n4 = e2.charCodeAt(i3);
      if (n4 > 127) return null;
      t2[l2] = n4;
    }
    return e2.length;
  })(t, e, n2);
  return null != i2 ? i2 : bt.toLocalBufferType(t).write(e, n2, void 0, "utf8");
}, randomBytes: dt, swap32: (t) => bt.toLocalBufferType(t).swap32() };
function Zt(t) {
  if (t < 0) throw new RangeError(`The argument 'byteLength' is invalid. Received ${t}`);
  return rt.fromNumberArray(Array.from({ length: t }, (() => Math.floor(256 * Math.random()))));
}
var mt = (() => {
  const { crypto: t } = globalThis;
  if (null != t && "function" == typeof t.getRandomValues) return (e) => t.getRandomValues(rt.allocate(e));
  if ((function() {
    const { navigator: t2 } = globalThis;
    return "object" == typeof t2 && "ReactNative" === t2.product;
  })()) {
    const { console: t2 } = globalThis;
    t2?.warn?.("BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.");
  }
  return Zt;
})();
var ut = /(\d|[a-f])/i;
var rt = { isUint8Array: h, toLocalBufferType(t) {
  const e = t?.[Symbol.toStringTag] ?? Object.prototype.toString.call(t);
  if ("Uint8Array" === e) return t;
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength));
  if ("ArrayBuffer" === e || "SharedArrayBuffer" === e || "[object ArrayBuffer]" === e || "[object SharedArrayBuffer]" === e) return new Uint8Array(t);
  throw new q("Cannot make a Uint8Array from passed potentialBuffer.");
}, allocate(t) {
  if ("number" != typeof t) throw new TypeError(`The "size" argument must be of type number. Received ${String(t)}`);
  return new Uint8Array(t);
}, allocateUnsafe: (t) => rt.allocate(t), compare(t, e) {
  if (t === e) return 0;
  const n2 = Math.min(t.length, e.length);
  for (let i2 = 0; i2 < n2; i2++) {
    if (t[i2] < e[i2]) return -1;
    if (t[i2] > e[i2]) return 1;
  }
  return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
}, concat(t) {
  if (0 === t.length) return rt.allocate(0);
  let e = 0;
  for (const n3 of t) e += n3.length;
  const n2 = rt.allocate(e);
  let i2 = 0;
  for (const e2 of t) n2.set(e2, i2), i2 += e2.length;
  return n2;
}, copy(t, e, n2, i2, l2) {
  if (void 0 !== l2 && l2 < 0) throw new RangeError(`The value of "sourceEnd" is out of range. It must be >= 0. Received ${l2}`);
  if (l2 = l2 ?? t.length, void 0 !== i2 && (i2 < 0 || i2 > l2)) throw new RangeError(`The value of "sourceStart" is out of range. It must be >= 0 and <= ${l2}. Received ${i2}`);
  if (i2 = i2 ?? 0, void 0 !== n2 && n2 < 0) throw new RangeError(`The value of "targetStart" is out of range. It must be >= 0. Received ${n2}`);
  n2 = n2 ?? 0;
  const o = t.subarray(i2, l2), c = Math.min(o.length, e.length - n2);
  return c <= 0 ? 0 : (e.set(o.subarray(0, c), n2), c);
}, equals(t, e) {
  if (t.byteLength !== e.byteLength) return false;
  for (let n2 = 0; n2 < t.byteLength; n2++) if (t[n2] !== e[n2]) return false;
  return true;
}, fromNumberArray: (t) => Uint8Array.from(t), fromBase64: (t) => Uint8Array.from(atob(t), ((t2) => t2.charCodeAt(0))), fromUTF8: (t) => new TextEncoder().encode(t), toBase64: (t) => btoa(rt.toISO88591(t)), fromISO88591: (t) => Uint8Array.from(t, ((t2) => 255 & t2.charCodeAt(0))), toISO88591: (t) => Array.from(Uint16Array.from(t), ((t2) => String.fromCharCode(t2))).join(""), fromHex(t) {
  const e = t.length % 2 == 0 ? t : t.slice(0, t.length - 1), n2 = [];
  for (let t2 = 0; t2 < e.length; t2 += 2) {
    const i2 = e[t2], l2 = e[t2 + 1];
    if (!ut.test(i2)) break;
    if (!ut.test(l2)) break;
    const o = Number.parseInt(`${i2}${l2}`, 16);
    n2.push(o);
  }
  return Uint8Array.from(n2);
}, toHex: (t) => Array.from(t, ((t2) => t2.toString(16).padStart(2, "0"))).join(""), toUTF8(t, e, n2, i2) {
  const l2 = n2 - e <= 20 ? ct(t, e, n2) : null;
  return null != l2 ? l2 : ot(t, e, n2, i2);
}, utf8ByteLength: (t) => new TextEncoder().encode(t).byteLength, encodeUTF8Into(t, e, n2) {
  const i2 = new TextEncoder().encode(e);
  return t.set(i2, n2), i2.byteLength;
}, randomBytes: mt, swap32(t) {
  if (t.length % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (let e = 0; e < t.length; e += 4) {
    const n2 = t[e], i2 = t[e + 1], l2 = t[e + 2], o = t[e + 3];
    t[e] = o, t[e + 1] = l2, t[e + 2] = i2, t[e + 3] = n2;
  }
  return t;
} };
var ht = "function" == typeof Buffer && true !== Buffer.prototype?._isBuffer ? bt : rt;
var pt = /* @__PURE__ */ Symbol.for("@@mdb.bson.type");
var yt = class {
  get [pt]() {
    return this._bsontype;
  }
  get [f]() {
    return W;
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](t, e, n2) {
    return this.inspect(t, e, n2);
  }
};
var Gt = new Float64Array(1);
var Xt = new Uint8Array(Gt.buffer, 0, 8);
Gt[0] = -1;
var Vt = 0 === Xt[7];
var Wt = { isBigEndian: Vt, getNonnegativeInt32LE(t, e) {
  if (t[e + 3] > 127) throw new RangeError(`Size cannot be negative at offset: ${e}`);
  return t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
}, getInt32LE: (t, e) => t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24, getUint32LE: (t, e) => t[e] + 256 * t[e + 1] + 65536 * t[e + 2] + 16777216 * t[e + 3], getUint32BE: (t, e) => t[e + 3] + 256 * t[e + 2] + 65536 * t[e + 1] + 16777216 * t[e], getBigInt64LE: (t, e) => (BigInt(t[e + 4] + 256 * t[e + 5] + 65536 * t[e + 6] + (t[e + 7] << 24)) << 32n) + BigInt(t[e] + 256 * t[e + 1] + 65536 * t[e + 2] + 16777216 * t[e + 3]), getFloat64LE: Vt ? (t, e) => (Xt[7] = t[e], Xt[6] = t[e + 1], Xt[5] = t[e + 2], Xt[4] = t[e + 3], Xt[3] = t[e + 4], Xt[2] = t[e + 5], Xt[1] = t[e + 6], Xt[0] = t[e + 7], Gt[0]) : (t, e) => (Xt[0] = t[e], Xt[1] = t[e + 1], Xt[2] = t[e + 2], Xt[3] = t[e + 3], Xt[4] = t[e + 4], Xt[5] = t[e + 5], Xt[6] = t[e + 6], Xt[7] = t[e + 7], Gt[0]), setInt32BE: (t, e, n2) => (t[e + 3] = n2, n2 >>>= 8, t[e + 2] = n2, n2 >>>= 8, t[e + 1] = n2, n2 >>>= 8, t[e] = n2, 4), setInt32LE: (t, e, n2) => (t[e] = n2, n2 >>>= 8, t[e + 1] = n2, n2 >>>= 8, t[e + 2] = n2, n2 >>>= 8, t[e + 3] = n2, 4), setBigInt64LE(t, e, n2) {
  const i2 = 0xffffffffn;
  let l2 = Number(n2 & i2);
  t[e] = l2, l2 >>= 8, t[e + 1] = l2, l2 >>= 8, t[e + 2] = l2, l2 >>= 8, t[e + 3] = l2;
  let o = Number(n2 >> 32n & i2);
  return t[e + 4] = o, o >>= 8, t[e + 5] = o, o >>= 8, t[e + 6] = o, o >>= 8, t[e + 7] = o, 8;
}, setFloat64LE: Vt ? (t, e, n2) => (Gt[0] = n2, t[e] = Xt[7], t[e + 1] = Xt[6], t[e + 2] = Xt[5], t[e + 3] = Xt[4], t[e + 4] = Xt[3], t[e + 5] = Xt[2], t[e + 6] = Xt[1], t[e + 7] = Xt[0], 8) : (t, e, n2) => (Gt[0] = n2, t[e] = Xt[0], t[e + 1] = Xt[1], t[e + 2] = Xt[2], t[e + 3] = Xt[3], t[e + 4] = Xt[4], t[e + 5] = Xt[5], t[e + 6] = Xt[6], t[e + 7] = Xt[7], 8) };
var ft = class _ft extends yt {
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
  constructor(t, e) {
    if (super(), null != t && "string" == typeof t && !ArrayBuffer.isView(t) && !p(t) && !Array.isArray(t)) throw new q("Binary can only be constructed from Uint8Array or number[]");
    this.sub_type = e ?? _ft.BSON_BINARY_SUBTYPE_DEFAULT, null == t ? (this.buffer = ht.allocate(_ft.BUFFER_SIZE), this.position = 0) : (this.buffer = Array.isArray(t) ? ht.fromNumberArray(t) : ht.toLocalBufferType(t), this.position = this.buffer.byteLength);
  }
  put(t) {
    if ("string" == typeof t && 1 !== t.length) throw new q("only accepts single character String");
    if ("number" != typeof t && 1 !== t.length) throw new q("only accepts single character Uint8Array or Array");
    let e;
    if (e = "string" == typeof t ? t.charCodeAt(0) : "number" == typeof t ? t : t[0], e < 0 || e > 255) throw new q("only accepts number in a valid unsigned byte range 0-255");
    if (this.buffer.byteLength > this.position) this.buffer[this.position++] = e;
    else {
      const t2 = ht.allocate(_ft.BUFFER_SIZE + this.buffer.length);
      t2.set(this.buffer, 0), this.buffer = t2, this.buffer[this.position++] = e;
    }
  }
  write(t, e) {
    if (e = "number" == typeof e ? e : this.position, this.buffer.byteLength < e + t.length) {
      const e2 = ht.allocate(this.buffer.byteLength + t.length);
      e2.set(this.buffer, 0), this.buffer = e2;
    }
    if (ArrayBuffer.isView(t)) this.buffer.set(ht.toLocalBufferType(t), e), this.position = e + t.byteLength > this.position ? e + t.length : this.position;
    else if ("string" == typeof t) throw new q("input cannot be string");
  }
  read(t, e) {
    const n2 = t + (e = e && e > 0 ? e : this.position);
    return this.buffer.subarray(t, n2 > this.position ? this.position : n2);
  }
  value() {
    return this.buffer.length === this.position ? this.buffer : this.buffer.subarray(0, this.position);
  }
  length() {
    return this.position;
  }
  toJSON() {
    return ht.toBase64(this.buffer.subarray(0, this.position));
  }
  toString(t) {
    return "hex" === t ? ht.toHex(this.buffer.subarray(0, this.position)) : "base64" === t ? ht.toBase64(this.buffer.subarray(0, this.position)) : ht.toUTF8(this.buffer, 0, this.position, false);
  }
  toExtendedJSON(t) {
    t = t || {}, this.sub_type === _ft.SUBTYPE_VECTOR && gt(this);
    const e = ht.toBase64(this.buffer), n2 = Number(this.sub_type).toString(16);
    return t.legacy ? { $binary: e, $type: 1 === n2.length ? "0" + n2 : n2 } : { $binary: { base64: e, subType: 1 === n2.length ? "0" + n2 : n2 } };
  }
  toUUID() {
    if (this.sub_type === _ft.SUBTYPE_UUID) return new Rt(this.buffer.subarray(0, this.position));
    throw new q(`Binary sub_type "${this.sub_type}" is not supported for converting to UUID. Only "${_ft.SUBTYPE_UUID}" is currently supported.`);
  }
  static createFromHexString(t, e) {
    return new _ft(ht.fromHex(t), e);
  }
  static createFromBase64(t, e) {
    return new _ft(ht.fromBase64(t), e);
  }
  static fromExtendedJSON(t, e) {
    let n2, i2;
    if (e = e || {}, "$binary" in t ? e.legacy && "string" == typeof t.$binary && "$type" in t ? (i2 = t.$type ? parseInt(t.$type, 16) : 0, n2 = ht.fromBase64(t.$binary)) : "string" != typeof t.$binary && (i2 = t.$binary.subType ? parseInt(t.$binary.subType, 16) : 0, n2 = ht.fromBase64(t.$binary.base64)) : "$uuid" in t && (i2 = 4, n2 = Rt.bytesFromString(t.$uuid)), !n2) throw new q(`Unexpected Binary Extended JSON format ${JSON.stringify(t)}`);
    return i2 === A ? new Rt(n2) : new _ft(n2, i2);
  }
  inspect(t, e, n2) {
    n2 ??= V;
    return `Binary.createFromBase64(${n2(ht.toBase64(this.buffer.subarray(0, this.position)), e)}, ${n2(this.sub_type, e)})`;
  }
  toInt8Array() {
    if (this.sub_type !== _ft.SUBTYPE_VECTOR) throw new q("Binary sub_type is not Vector");
    if (this.buffer[0] !== _ft.VECTOR_TYPE.Int8) throw new q("Binary datatype field is not Int8");
    return gt(this), new Int8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toFloat32Array() {
    if (this.sub_type !== _ft.SUBTYPE_VECTOR) throw new q("Binary sub_type is not Vector");
    if (this.buffer[0] !== _ft.VECTOR_TYPE.Float32) throw new q("Binary datatype field is not Float32");
    gt(this);
    const t = new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
    return Wt.isBigEndian && ht.swap32(t), new Float32Array(t.buffer);
  }
  toPackedBits() {
    if (this.sub_type !== _ft.SUBTYPE_VECTOR) throw new q("Binary sub_type is not Vector");
    if (this.buffer[0] !== _ft.VECTOR_TYPE.PackedBit) throw new q("Binary datatype field is not packed bit");
    return gt(this), new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toBits() {
    if (this.sub_type !== _ft.SUBTYPE_VECTOR) throw new q("Binary sub_type is not Vector");
    if (this.buffer[0] !== _ft.VECTOR_TYPE.PackedBit) throw new q("Binary datatype field is not packed bit");
    gt(this);
    const t = 8 * (this.length() - 2) - this.buffer[1], e = new Int8Array(t);
    for (let t2 = 0; t2 < e.length; t2++) {
      const n2 = t2 / 8 | 0, i2 = this.buffer[n2 + 2] >> 7 - t2 % 8 & 1;
      e[t2] = i2;
    }
    return e;
  }
  static fromInt8Array(t) {
    const e = ht.allocate(t.byteLength + 2);
    e[0] = _ft.VECTOR_TYPE.Int8, e[1] = 0;
    const n2 = new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    e.set(n2, 2);
    const i2 = new this(e, this.SUBTYPE_VECTOR);
    return gt(i2), i2;
  }
  static fromFloat32Array(t) {
    const e = ht.allocate(t.byteLength + 2);
    e[0] = _ft.VECTOR_TYPE.Float32, e[1] = 0;
    const n2 = new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    e.set(n2, 2), Wt.isBigEndian && ht.swap32(new Uint8Array(e.buffer, 2));
    const i2 = new this(e, this.SUBTYPE_VECTOR);
    return gt(i2), i2;
  }
  static fromPackedBits(t, e = 0) {
    const n2 = ht.allocate(t.byteLength + 2);
    n2[0] = _ft.VECTOR_TYPE.PackedBit, n2[1] = e, n2.set(t, 2);
    const i2 = new this(n2, this.SUBTYPE_VECTOR);
    return gt(i2), i2;
  }
  static fromBits(t) {
    const e = t.length + 7 >>> 3, n2 = new Uint8Array(e + 2);
    n2[0] = _ft.VECTOR_TYPE.PackedBit;
    const i2 = t.length % 8;
    n2[1] = 0 === i2 ? 0 : 8 - i2;
    for (let e2 = 0; e2 < t.length; e2++) {
      const i3 = e2 >>> 3, l2 = t[e2];
      if (0 !== l2 && 1 !== l2) throw new q(`Invalid bit value at ${e2}: must be 0 or 1, found ${t[e2]}`);
      if (0 === l2) continue;
      const o = 7 - e2 % 8;
      n2[i3 + 2] |= l2 << o;
    }
    return new this(n2, _ft.SUBTYPE_VECTOR);
  }
};
function gt(t) {
  if (t.sub_type !== ft.SUBTYPE_VECTOR) return;
  const e = t.position, n2 = t.buffer[0], i2 = t.buffer[1];
  if ((n2 === ft.VECTOR_TYPE.Float32 || n2 === ft.VECTOR_TYPE.Int8) && 0 !== i2) throw new q("Invalid Vector: padding must be zero for int8 and float32 vectors");
  if (n2 === ft.VECTOR_TYPE.Float32 && 0 !== e && e - 2 != 0 && (e - 2) % 4 != 0) throw new q("Invalid Vector: Float32 vector must contain a multiple of 4 bytes");
  if (n2 === ft.VECTOR_TYPE.PackedBit && 0 !== i2 && 2 === e) throw new q("Invalid Vector: padding must be zero for packed bit vectors that are empty");
  if (n2 === ft.VECTOR_TYPE.PackedBit && i2 > 7) throw new q(`Invalid Vector: padding must be a value between 0 and 7. found: ${i2}`);
}
var Yt = /^[0-9A-F]{32}$/i;
var It = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
var Rt = class _Rt extends ft {
  constructor(t) {
    let e;
    if (null == t) e = _Rt.generate();
    else if (t instanceof _Rt) e = ht.toLocalBufferType(new Uint8Array(t.buffer));
    else if (ArrayBuffer.isView(t) && 16 === t.byteLength) e = ht.toLocalBufferType(t);
    else {
      if ("string" != typeof t) throw new q("Argument passed in UUID constructor must be a UUID, a 16 byte Buffer or a 32/36 character hex string (dashes excluded/included, format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).");
      e = _Rt.bytesFromString(t);
    }
    super(e, A);
  }
  get id() {
    return this.buffer;
  }
  set id(t) {
    this.buffer = t;
  }
  toHexString(t = true) {
    return t ? [ht.toHex(this.buffer.subarray(0, 4)), ht.toHex(this.buffer.subarray(4, 6)), ht.toHex(this.buffer.subarray(6, 8)), ht.toHex(this.buffer.subarray(8, 10)), ht.toHex(this.buffer.subarray(10, 16))].join("-") : ht.toHex(this.buffer);
  }
  toString(t) {
    return "hex" === t ? ht.toHex(this.id) : "base64" === t ? ht.toBase64(this.id) : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  equals(t) {
    if (!t) return false;
    if (t instanceof _Rt) return ht.equals(t.id, this.id);
    try {
      return ht.equals(new _Rt(t).id, this.id);
    } catch {
      return false;
    }
  }
  toBinary() {
    return new ft(this.id, ft.SUBTYPE_UUID);
  }
  static generate() {
    const t = ht.randomBytes(16);
    return t[6] = 15 & t[6] | 64, t[8] = 63 & t[8] | 128, t;
  }
  static isValid(t) {
    return !!t && ("string" == typeof t ? _Rt.isValidUUIDString(t) : h(t) ? 16 === t.byteLength : "Binary" === t._bsontype && t.sub_type === this.SUBTYPE_UUID && 16 === t.buffer.byteLength);
  }
  static createFromHexString(t) {
    const e = _Rt.bytesFromString(t);
    return new _Rt(e);
  }
  static createFromBase64(t) {
    return new _Rt(ht.fromBase64(t));
  }
  static bytesFromString(t) {
    if (!_Rt.isValidUUIDString(t)) throw new q("UUID string representation must be 32 hex digits or canonical hyphenated representation");
    return ht.fromHex(t.replace(/-/g, ""));
  }
  static isValidUUIDString(t) {
    return Yt.test(t) || It.test(t);
  }
  inspect(t, e, n2) {
    return n2 ??= V, `new UUID(${n2(this.toHexString(), e)})`;
  }
};
var St = class _St extends yt {
  get _bsontype() {
    return "Code";
  }
  code;
  scope;
  constructor(t, e) {
    super(), this.code = t.toString(), this.scope = e ?? null;
  }
  toJSON() {
    return null != this.scope ? { code: this.code, scope: this.scope } : { code: this.code };
  }
  toExtendedJSON() {
    return this.scope ? { $code: this.code, $scope: this.scope } : { $code: this.code };
  }
  static fromExtendedJSON(t) {
    return new _St(t.$code, t.$scope);
  }
  inspect(t, e, n2) {
    n2 ??= V;
    let i2 = n2(this.code, e);
    const l2 = i2.includes("\n");
    null != this.scope && (i2 += `,${l2 ? "\n" : " "}${n2(this.scope, e)}`);
    return `new Code(${l2 ? "\n" : ""}${i2}${l2 && null === this.scope ? "\n" : ""})`;
  }
};
function Jt(t) {
  return null != t && "object" == typeof t && "$id" in t && null != t.$id && "$ref" in t && "string" == typeof t.$ref && (!("$db" in t) || "$db" in t && "string" == typeof t.$db);
}
var Kt = class _Kt extends yt {
  get _bsontype() {
    return "DBRef";
  }
  collection;
  oid;
  db;
  fields;
  constructor(t, e, n2, i2) {
    super();
    const l2 = t.split(".");
    2 === l2.length && (n2 = l2.shift(), t = l2.shift()), this.collection = t, this.oid = e, this.db = n2, this.fields = i2 || {};
  }
  get namespace() {
    return this.collection;
  }
  set namespace(t) {
    this.collection = t;
  }
  toJSON() {
    const t = Object.assign({ $ref: this.collection, $id: this.oid }, this.fields);
    return null != this.db && (t.$db = this.db), t;
  }
  toExtendedJSON(t) {
    t = t || {};
    let e = { $ref: this.collection, $id: this.oid };
    return t.legacy || (this.db && (e.$db = this.db), e = Object.assign(e, this.fields)), e;
  }
  static fromExtendedJSON(t) {
    const e = Object.assign({}, t);
    return delete e.$ref, delete e.$id, delete e.$db, new _Kt(t.$ref, t.$id, t.$db, e);
  }
  inspect(t, e, n2) {
    n2 ??= V;
    const i2 = [n2(this.namespace, e), n2(this.oid, e), ...this.db ? [n2(this.db, e)] : [], ...Object.keys(this.fields).length > 0 ? [n2(this.fields, e)] : []];
    return i2[1] = n2 === V ? `new ObjectId(${i2[1]})` : i2[1], `new DBRef(${i2.join(", ")})`;
  }
};
function Tt(t) {
  if ("" === t) return t;
  let e = 0;
  const n2 = "-" === t[e], i2 = "+" === t[e];
  (i2 || n2) && (e += 1);
  let l2 = false;
  for (; e < t.length && "0" === t[e]; ++e) l2 = true;
  return l2 ? `${n2 ? "-" : ""}${t.length === e ? "0" : t.slice(e)}` : i2 ? t.slice(1) : t;
}
var Lt;
try {
  Lt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch {
}
var Ut = 4294967296;
var zt = 18446744073709552e3;
var xt = zt / 2;
var Nt = {};
var wt = {};
var kt = /^(\+?0|(\+|-)?[1-9][0-9]*)$/;
var Ht = class _Ht extends yt {
  get _bsontype() {
    return "Long";
  }
  get __isLong__() {
    return true;
  }
  high;
  low;
  unsigned;
  constructor(t = 0, e, n2) {
    super();
    const i2 = "boolean" == typeof e ? e : Boolean(n2), l2 = "number" == typeof e ? e : 0, o = "string" == typeof t ? _Ht.fromString(t, i2) : "bigint" == typeof t ? _Ht.fromBigInt(t, i2) : { low: 0 | t, high: 0 | l2, unsigned: i2 };
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
  static fromBits(t, e, n2) {
    return new _Ht(t, e, n2);
  }
  static fromInt(t, e) {
    let n2, i2, l2;
    return e ? (l2 = 0 <= (t >>>= 0) && t < 256) && (i2 = wt[t], i2) ? i2 : (n2 = _Ht.fromBits(t, (0 | t) < 0 ? -1 : 0, true), l2 && (wt[t] = n2), n2) : (l2 = -128 <= (t |= 0) && t < 128) && (i2 = Nt[t], i2) ? i2 : (n2 = _Ht.fromBits(t, t < 0 ? -1 : 0, false), l2 && (Nt[t] = n2), n2);
  }
  static fromNumber(t, e) {
    if (isNaN(t)) return e ? _Ht.UZERO : _Ht.ZERO;
    if (e) {
      if (t < 0) return _Ht.UZERO;
      if (t >= zt) return _Ht.MAX_UNSIGNED_VALUE;
    } else {
      if (t <= -xt) return _Ht.MIN_VALUE;
      if (t + 1 >= xt) return _Ht.MAX_VALUE;
    }
    return t < 0 ? _Ht.fromNumber(-t, e).neg() : _Ht.fromBits(t % Ut | 0, t / Ut | 0, e);
  }
  static fromBigInt(t, e) {
    const n2 = 0xffffffffn;
    return new _Ht(Number(t & n2), Number(t >> 32n & n2), e);
  }
  static _fromString(t, e, n2) {
    if (0 === t.length) throw new q("empty string");
    if (n2 < 2 || 36 < n2) throw new q("radix");
    let i2;
    if ((i2 = t.indexOf("-")) > 0) throw new q("interior hyphen");
    if (0 === i2) return _Ht._fromString(t.substring(1), e, n2).neg();
    const l2 = _Ht.fromNumber(Math.pow(n2, 8));
    let o = _Ht.ZERO;
    for (let e2 = 0; e2 < t.length; e2 += 8) {
      const i3 = Math.min(8, t.length - e2), c = parseInt(t.substring(e2, e2 + i3), n2);
      if (i3 < 8) {
        const t2 = _Ht.fromNumber(Math.pow(n2, i3));
        o = o.mul(t2).add(_Ht.fromNumber(c));
      } else o = o.mul(l2), o = o.add(_Ht.fromNumber(c));
    }
    return o.unsigned = e, o;
  }
  static fromStringStrict(t, e, n2) {
    let i2 = false;
    if ("number" == typeof e ? (n2 = e, e = false) : i2 = !!e, n2 ??= 10, t.trim() !== t) throw new q(`Input: '${t}' contains leading and/or trailing whitespace`);
    if (!(function(t2, e2) {
      const n3 = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, e2 = e2 ?? 10);
      return !new RegExp(`[^-+${n3}]`, "i").test(t2) && t2;
    })(t, n2)) throw new q(`Input: '${t}' contains invalid characters for radix: ${n2}`);
    const l2 = Tt(t), o = _Ht._fromString(l2, i2, n2);
    if (o.toString(n2).toLowerCase() !== l2.toLowerCase()) throw new q(`Input: ${t} is not representable as ${o.unsigned ? "an unsigned" : "a signed"} 64-bit Long ${null != n2 ? `with radix: ${n2}` : ""}`);
    return o;
  }
  static fromString(t, e, n2) {
    let i2 = false;
    return "number" == typeof e ? (n2 = e, e = false) : i2 = !!e, n2 ??= 10, "NaN" === t && n2 < 24 || ("Infinity" === t || "+Infinity" === t || "-Infinity" === t) && n2 < 35 ? _Ht.ZERO : _Ht._fromString(t, i2, n2);
  }
  static fromBytes(t, e, n2) {
    return n2 ? _Ht.fromBytesLE(t, e) : _Ht.fromBytesBE(t, e);
  }
  static fromBytesLE(t, e) {
    return new _Ht(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24, t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24, e);
  }
  static fromBytesBE(t, e) {
    return new _Ht(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], e);
  }
  static isLong(t) {
    return null != t && "object" == typeof t && "__isLong__" in t && true === t.__isLong__;
  }
  static fromValue(t, e) {
    return "number" == typeof t ? _Ht.fromNumber(t, e) : "string" == typeof t ? _Ht.fromString(t, e) : _Ht.fromBits(t.low, t.high, "boolean" == typeof e ? e : t.unsigned);
  }
  add(t) {
    _Ht.isLong(t) || (t = _Ht.fromValue(t));
    const e = this.high >>> 16, n2 = 65535 & this.high, i2 = this.low >>> 16, l2 = 65535 & this.low, o = t.high >>> 16, c = 65535 & t.high, a = t.low >>> 16;
    let s = 0, d = 0, b = 0, Z = 0;
    return Z += l2 + (65535 & t.low), b += Z >>> 16, Z &= 65535, b += i2 + a, d += b >>> 16, b &= 65535, d += n2 + c, s += d >>> 16, d &= 65535, s += e + o, s &= 65535, _Ht.fromBits(b << 16 | Z, s << 16 | d, this.unsigned);
  }
  and(t) {
    return _Ht.isLong(t) || (t = _Ht.fromValue(t)), _Ht.fromBits(this.low & t.low, this.high & t.high, this.unsigned);
  }
  compare(t) {
    if (_Ht.isLong(t) || (t = _Ht.fromValue(t)), this.eq(t)) return 0;
    const e = this.isNegative(), n2 = t.isNegative();
    return e && !n2 ? -1 : !e && n2 ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
  }
  comp(t) {
    return this.compare(t);
  }
  divide(t) {
    if (_Ht.isLong(t) || (t = _Ht.fromValue(t)), t.isZero()) throw new q("division by zero");
    if (Lt) {
      if (!this.unsigned && -2147483648 === this.high && -1 === t.low && -1 === t.high) return this;
      const e2 = (this.unsigned ? Lt.div_u : Lt.div_s)(this.low, this.high, t.low, t.high);
      return _Ht.fromBits(e2, Lt.get_high(), this.unsigned);
    }
    if (this.isZero()) return this.unsigned ? _Ht.UZERO : _Ht.ZERO;
    let e, n2, i2;
    if (this.unsigned) {
      if (t.unsigned || (t = t.toUnsigned()), t.gt(this)) return _Ht.UZERO;
      if (t.gt(this.shru(1))) return _Ht.UONE;
      i2 = _Ht.UZERO;
    } else {
      if (this.eq(_Ht.MIN_VALUE)) {
        if (t.eq(_Ht.ONE) || t.eq(_Ht.NEG_ONE)) return _Ht.MIN_VALUE;
        if (t.eq(_Ht.MIN_VALUE)) return _Ht.ONE;
        return e = this.shr(1).div(t).shl(1), e.eq(_Ht.ZERO) ? t.isNegative() ? _Ht.ONE : _Ht.NEG_ONE : (n2 = this.sub(t.mul(e)), i2 = e.add(n2.div(t)), i2);
      }
      if (t.eq(_Ht.MIN_VALUE)) return this.unsigned ? _Ht.UZERO : _Ht.ZERO;
      if (this.isNegative()) return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
      if (t.isNegative()) return this.div(t.neg()).neg();
      i2 = _Ht.ZERO;
    }
    for (n2 = this; n2.gte(t); ) {
      e = Math.max(1, Math.floor(n2.toNumber() / t.toNumber()));
      const l2 = Math.ceil(Math.log(e) / Math.LN2), o = l2 <= 48 ? 1 : Math.pow(2, l2 - 48);
      let c = _Ht.fromNumber(e), a = c.mul(t);
      for (; a.isNegative() || a.gt(n2); ) e -= o, c = _Ht.fromNumber(e, this.unsigned), a = c.mul(t);
      c.isZero() && (c = _Ht.ONE), i2 = i2.add(c), n2 = n2.sub(a);
    }
    return i2;
  }
  div(t) {
    return this.divide(t);
  }
  equals(t) {
    return _Ht.isLong(t) || (t = _Ht.fromValue(t)), (this.unsigned === t.unsigned || this.high >>> 31 != 1 || t.high >>> 31 != 1) && (this.high === t.high && this.low === t.low);
  }
  eq(t) {
    return this.equals(t);
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
    const t = 0 !== this.high ? this.high : this.low;
    let e;
    for (e = 31; e > 0 && !(t & 1 << e); e--) ;
    return 0 !== this.high ? e + 33 : e + 1;
  }
  greaterThan(t) {
    return this.comp(t) > 0;
  }
  gt(t) {
    return this.greaterThan(t);
  }
  greaterThanOrEqual(t) {
    return this.comp(t) >= 0;
  }
  gte(t) {
    return this.greaterThanOrEqual(t);
  }
  ge(t) {
    return this.greaterThanOrEqual(t);
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
  lessThan(t) {
    return this.comp(t) < 0;
  }
  lt(t) {
    return this.lessThan(t);
  }
  lessThanOrEqual(t) {
    return this.comp(t) <= 0;
  }
  lte(t) {
    return this.lessThanOrEqual(t);
  }
  modulo(t) {
    if (_Ht.isLong(t) || (t = _Ht.fromValue(t)), Lt) {
      const e = (this.unsigned ? Lt.rem_u : Lt.rem_s)(this.low, this.high, t.low, t.high);
      return _Ht.fromBits(e, Lt.get_high(), this.unsigned);
    }
    return this.sub(this.div(t).mul(t));
  }
  mod(t) {
    return this.modulo(t);
  }
  rem(t) {
    return this.modulo(t);
  }
  multiply(t) {
    if (this.isZero()) return _Ht.ZERO;
    if (_Ht.isLong(t) || (t = _Ht.fromValue(t)), Lt) {
      const e2 = Lt.mul(this.low, this.high, t.low, t.high);
      return _Ht.fromBits(e2, Lt.get_high(), this.unsigned);
    }
    if (t.isZero()) return _Ht.ZERO;
    if (this.eq(_Ht.MIN_VALUE)) return t.isOdd() ? _Ht.MIN_VALUE : _Ht.ZERO;
    if (t.eq(_Ht.MIN_VALUE)) return this.isOdd() ? _Ht.MIN_VALUE : _Ht.ZERO;
    if (this.isNegative()) return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
    if (t.isNegative()) return this.mul(t.neg()).neg();
    if (this.lt(_Ht.TWO_PWR_24) && t.lt(_Ht.TWO_PWR_24)) return _Ht.fromNumber(this.toNumber() * t.toNumber(), this.unsigned);
    const e = this.high >>> 16, n2 = 65535 & this.high, i2 = this.low >>> 16, l2 = 65535 & this.low, o = t.high >>> 16, c = 65535 & t.high, a = t.low >>> 16, s = 65535 & t.low;
    let d = 0, b = 0, Z = 0, m = 0;
    return m += l2 * s, Z += m >>> 16, m &= 65535, Z += i2 * s, b += Z >>> 16, Z &= 65535, Z += l2 * a, b += Z >>> 16, Z &= 65535, b += n2 * s, d += b >>> 16, b &= 65535, b += i2 * a, d += b >>> 16, b &= 65535, b += l2 * c, d += b >>> 16, b &= 65535, d += e * s + n2 * a + i2 * c + l2 * o, d &= 65535, _Ht.fromBits(Z << 16 | m, d << 16 | b, this.unsigned);
  }
  mul(t) {
    return this.multiply(t);
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
  notEquals(t) {
    return !this.equals(t);
  }
  neq(t) {
    return this.notEquals(t);
  }
  ne(t) {
    return this.notEquals(t);
  }
  or(t) {
    return _Ht.isLong(t) || (t = _Ht.fromValue(t)), _Ht.fromBits(this.low | t.low, this.high | t.high, this.unsigned);
  }
  shiftLeft(t) {
    return _Ht.isLong(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? _Ht.fromBits(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : _Ht.fromBits(0, this.low << t - 32, this.unsigned);
  }
  shl(t) {
    return this.shiftLeft(t);
  }
  shiftRight(t) {
    return _Ht.isLong(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? _Ht.fromBits(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : _Ht.fromBits(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  }
  shr(t) {
    return this.shiftRight(t);
  }
  shiftRightUnsigned(t) {
    if (_Ht.isLong(t) && (t = t.toInt()), 0 === (t &= 63)) return this;
    {
      const e = this.high;
      if (t < 32) {
        const n2 = this.low;
        return _Ht.fromBits(n2 >>> t | e << 32 - t, e >>> t, this.unsigned);
      }
      return 32 === t ? _Ht.fromBits(e, 0, this.unsigned) : _Ht.fromBits(e >>> t - 32, 0, this.unsigned);
    }
  }
  shr_u(t) {
    return this.shiftRightUnsigned(t);
  }
  shru(t) {
    return this.shiftRightUnsigned(t);
  }
  subtract(t) {
    return _Ht.isLong(t) || (t = _Ht.fromValue(t)), this.add(t.neg());
  }
  sub(t) {
    return this.subtract(t);
  }
  toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
  }
  toNumber() {
    return this.unsigned ? (this.high >>> 0) * Ut + (this.low >>> 0) : this.high * Ut + (this.low >>> 0);
  }
  toBigInt() {
    return BigInt(this.toString());
  }
  toBytes(t) {
    return t ? this.toBytesLE() : this.toBytesBE();
  }
  toBytesLE() {
    const t = this.high, e = this.low;
    return [255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24, 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24];
  }
  toBytesBE() {
    const t = this.high, e = this.low;
    return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t, e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e];
  }
  toSigned() {
    return this.unsigned ? _Ht.fromBits(this.low, this.high, false) : this;
  }
  toString(t) {
    if ((t = t || 10) < 2 || 36 < t) throw new q("radix");
    if (this.isZero()) return "0";
    if (this.isNegative()) {
      if (this.eq(_Ht.MIN_VALUE)) {
        const e2 = _Ht.fromNumber(t), n3 = this.div(e2), i3 = n3.mul(e2).sub(this);
        return n3.toString(t) + i3.toInt().toString(t);
      }
      return "-" + this.neg().toString(t);
    }
    const e = _Ht.fromNumber(Math.pow(t, 6), this.unsigned);
    let n2 = this, i2 = "";
    for (; ; ) {
      const l2 = n2.div(e);
      let o = (n2.sub(l2.mul(e)).toInt() >>> 0).toString(t);
      if (n2 = l2, n2.isZero()) return o + i2;
      for (; o.length < 6; ) o = "0" + o;
      i2 = "" + o + i2;
    }
  }
  toUnsigned() {
    return this.unsigned ? this : _Ht.fromBits(this.low, this.high, true);
  }
  xor(t) {
    return _Ht.isLong(t) || (t = _Ht.fromValue(t)), _Ht.fromBits(this.low ^ t.low, this.high ^ t.high, this.unsigned);
  }
  eqz() {
    return this.isZero();
  }
  le(t) {
    return this.lessThanOrEqual(t);
  }
  toExtendedJSON(t) {
    return t && t.relaxed ? this.toNumber() : { $numberLong: this.toString() };
  }
  static fromExtendedJSON(t, e) {
    const { useBigInt64: n2 = false, relaxed: i2 = true } = { ...e };
    if (t.$numberLong.length > 20) throw new q("$numberLong string is too long");
    if (!kt.test(t.$numberLong)) throw new q(`$numberLong string "${t.$numberLong}" is in an invalid format`);
    if (n2) {
      const e2 = BigInt(t.$numberLong);
      return BigInt.asIntN(64, e2);
    }
    const l2 = _Ht.fromString(t.$numberLong);
    return i2 ? l2.toNumber() : l2;
  }
  inspect(t, e, n2) {
    n2 ??= V;
    return `new Long(${n2(this.toString(), e)}${this.unsigned ? `, ${n2(this.unsigned, e)}` : ""})`;
  }
};
var Ct = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
var Bt = /^(\+|-)?(Infinity|inf)$/i;
var vt = /^(\+|-)?NaN$/i;
var Mt = 6111;
var jt = -6176;
var Pt = ht.fromNumberArray([124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse());
var Ft = ht.fromNumberArray([248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse());
var Qt = ht.fromNumberArray([120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse());
var Ot = /^([-+])?(\d+)?$/;
function Et(t) {
  return !isNaN(parseInt(t, 10));
}
function _t(t) {
  const e = Ht.fromNumber(1e9);
  let n2 = Ht.fromNumber(0);
  if (!(t.parts[0] || t.parts[1] || t.parts[2] || t.parts[3])) return { quotient: t, rem: n2 };
  for (let i2 = 0; i2 <= 3; i2++) n2 = n2.shiftLeft(32), n2 = n2.add(new Ht(t.parts[i2], 0)), t.parts[i2] = n2.div(e).low, n2 = n2.modulo(e);
  return { quotient: t, rem: n2 };
}
function Dt(t, e) {
  throw new q(`"${t}" is not a valid Decimal128 string - ${e}`);
}
var At = class _At extends yt {
  get _bsontype() {
    return "Decimal128";
  }
  bytes;
  constructor(t) {
    if (super(), "string" == typeof t) this.bytes = _At.fromString(t).bytes;
    else {
      if (!(t instanceof Uint8Array || h(t))) throw new q("Decimal128 must take a Buffer or string");
      if (16 !== t.byteLength) throw new q("Decimal128 must take a Buffer of 16 bytes");
      this.bytes = t;
    }
  }
  static fromString(t) {
    return _At._fromString(t, { allowRounding: false });
  }
  static fromStringWithRounding(t) {
    return _At._fromString(t, { allowRounding: true });
  }
  static _fromString(t, e) {
    let n2 = false, i2 = false, l2 = false, o = false, c = 0, a = 0, s = 0, d = 0, b = 0;
    const Z = [0];
    let m = 0, u = 0, r2 = 0, h2 = 0, p2 = new Ht(0, 0), y2 = new Ht(0, 0), G2 = 0, X2 = 0;
    if (t.length >= 7e3) throw new q(t + " not a valid Decimal128 string");
    const V2 = t.match(Ct), W2 = t.match(Bt), f2 = t.match(vt);
    if (!V2 && !W2 && !f2 || 0 === t.length) throw new q(t + " not a valid Decimal128 string");
    if (V2) {
      const e2 = V2[2], n3 = V2[4], i3 = V2[5], l3 = V2[6];
      n3 && void 0 === l3 && Dt(t, "missing exponent power"), n3 && void 0 === e2 && Dt(t, "missing exponent base"), void 0 === n3 && (i3 || l3) && Dt(t, "missing e before exponent");
    }
    if ("+" !== t[X2] && "-" !== t[X2] || (i2 = true, n2 = "-" === t[X2++]), !Et(t[X2]) && "." !== t[X2]) {
      if ("i" === t[X2] || "I" === t[X2]) return new _At(n2 ? Ft : Qt);
      if ("N" === t[X2]) return new _At(Pt);
    }
    for (; Et(t[X2]) || "." === t[X2]; ) "." !== t[X2] ? (m < 34 && ("0" !== t[X2] || o) && (o || (b = a), o = true, Z[u++] = parseInt(t[X2], 10), m += 1), o && (s += 1), l2 && (d += 1), a += 1, X2 += 1) : (l2 && Dt(t, "contains multiple periods"), l2 = true, X2 += 1);
    if (l2 && !a) throw new q(t + " not a valid Decimal128 string");
    if ("e" === t[X2] || "E" === t[X2]) {
      const e2 = t.substr(++X2).match(Ot);
      if (!e2 || !e2[2]) return new _At(Pt);
      h2 = parseInt(e2[0], 10), X2 += e2[0].length;
    }
    if (t[X2]) return new _At(Pt);
    if (m) {
      if (r2 = m - 1, c = s, 1 !== c) for (; "0" === t[b + c - 1 + Number(i2) + Number(l2)]; ) c -= 1;
    } else Z[0] = 0, s = 1, m = 1, c = 0;
    for (h2 <= d && d > h2 + 16384 ? h2 = jt : h2 -= d; h2 > Mt; ) {
      if (r2 += 1, r2 >= 34) {
        if (0 === c) {
          h2 = Mt;
          break;
        }
        Dt(t, "overflow");
      }
      h2 -= 1;
    }
    if (e.allowRounding) {
      for (; h2 < jt || m < s; ) {
        if (0 === r2 && c < m) {
          h2 = jt, c = 0;
          break;
        }
        if (m < s ? s -= 1 : r2 -= 1, h2 < Mt) h2 += 1;
        else {
          if (Z.join("").match(/^0+$/)) {
            h2 = Mt;
            break;
          }
          Dt(t, "overflow");
        }
      }
      if (r2 + 1 < c) {
        let e2 = a;
        l2 && (b += 1, e2 += 1), i2 && (b += 1, e2 += 1);
        const o2 = parseInt(t[b + r2 + 1], 10);
        let c2 = 0;
        if (o2 >= 5 && (c2 = 1, 5 === o2)) {
          c2 = Z[r2] % 2 == 1 ? 1 : 0;
          for (let n3 = b + r2 + 2; n3 < e2; n3++) if (parseInt(t[n3], 10)) {
            c2 = 1;
            break;
          }
        }
        if (c2) {
          let t2 = r2;
          for (; t2 >= 0 && ++Z[t2] > 9; t2--) if (Z[t2] = 0, 0 === t2) {
            if (!(h2 < Mt)) return new _At(n2 ? Ft : Qt);
            h2 += 1, Z[t2] = 1;
          }
        }
      }
    } else {
      for (; h2 < jt || m < s; ) {
        if (0 === r2) {
          if (0 === c) {
            h2 = jt;
            break;
          }
          Dt(t, "exponent underflow");
        }
        m < s ? ("0" !== t[s - 1 + Number(i2) + Number(l2)] && 0 !== c && Dt(t, "inexact rounding"), s -= 1) : (0 !== Z[r2] && Dt(t, "inexact rounding"), r2 -= 1), h2 < Mt ? h2 += 1 : Dt(t, "overflow");
      }
      if (r2 + 1 < c) {
        l2 && (b += 1), i2 && (b += 1);
        0 !== parseInt(t[b + r2 + 1], 10) && Dt(t, "inexact rounding");
      }
    }
    if (p2 = Ht.fromNumber(0), y2 = Ht.fromNumber(0), 0 === c) p2 = Ht.fromNumber(0), y2 = Ht.fromNumber(0);
    else if (r2 < 17) {
      let t2 = 0;
      for (y2 = Ht.fromNumber(Z[t2++]), p2 = new Ht(0, 0); t2 <= r2; t2++) y2 = y2.multiply(Ht.fromNumber(10)), y2 = y2.add(Ht.fromNumber(Z[t2]));
    } else {
      let t2 = 0;
      for (p2 = Ht.fromNumber(Z[t2++]); t2 <= r2 - 17; t2++) p2 = p2.multiply(Ht.fromNumber(10)), p2 = p2.add(Ht.fromNumber(Z[t2]));
      for (y2 = Ht.fromNumber(Z[t2++]); t2 <= r2; t2++) y2 = y2.multiply(Ht.fromNumber(10)), y2 = y2.add(Ht.fromNumber(Z[t2]));
    }
    const g2 = (function(t2, e2) {
      if (!t2 && !e2) return { high: Ht.fromNumber(0), low: Ht.fromNumber(0) };
      const n3 = t2.shiftRightUnsigned(32), i3 = new Ht(t2.getLowBits(), 0), l3 = e2.shiftRightUnsigned(32), o2 = new Ht(e2.getLowBits(), 0);
      let c2 = n3.multiply(l3), a2 = n3.multiply(o2);
      const s2 = i3.multiply(l3);
      let d2 = i3.multiply(o2);
      return c2 = c2.add(a2.shiftRightUnsigned(32)), a2 = new Ht(a2.getLowBits(), 0).add(s2).add(d2.shiftRightUnsigned(32)), c2 = c2.add(a2.shiftRightUnsigned(32)), d2 = a2.shiftLeft(32).add(new Ht(d2.getLowBits(), 0)), { high: c2, low: d2 };
    })(p2, Ht.fromString("100000000000000000"));
    g2.low = g2.low.add(y2), (function(t2, e2) {
      const n3 = t2.high >>> 0, i3 = e2.high >>> 0;
      if (n3 < i3) return true;
      if (n3 === i3 && t2.low >>> 0 < e2.low >>> 0) return true;
      return false;
    })(g2.low, y2) && (g2.high = g2.high.add(Ht.fromNumber(1))), G2 = h2 + 6176;
    const Y2 = { low: Ht.fromNumber(0), high: Ht.fromNumber(0) };
    g2.high.shiftRightUnsigned(49).and(Ht.fromNumber(1)).equals(Ht.fromNumber(1)) ? (Y2.high = Y2.high.or(Ht.fromNumber(3).shiftLeft(61)), Y2.high = Y2.high.or(Ht.fromNumber(G2).and(Ht.fromNumber(16383).shiftLeft(47))), Y2.high = Y2.high.or(g2.high.and(Ht.fromNumber(140737488355327)))) : (Y2.high = Y2.high.or(Ht.fromNumber(16383 & G2).shiftLeft(49)), Y2.high = Y2.high.or(g2.high.and(Ht.fromNumber(562949953421311)))), Y2.low = g2.low, n2 && (Y2.high = Y2.high.or(Ht.fromString("9223372036854775808")));
    const I2 = ht.allocateUnsafe(16);
    return X2 = 0, I2[X2++] = 255 & Y2.low.low, I2[X2++] = Y2.low.low >> 8 & 255, I2[X2++] = Y2.low.low >> 16 & 255, I2[X2++] = Y2.low.low >> 24 & 255, I2[X2++] = 255 & Y2.low.high, I2[X2++] = Y2.low.high >> 8 & 255, I2[X2++] = Y2.low.high >> 16 & 255, I2[X2++] = Y2.low.high >> 24 & 255, I2[X2++] = 255 & Y2.high.low, I2[X2++] = Y2.high.low >> 8 & 255, I2[X2++] = Y2.high.low >> 16 & 255, I2[X2++] = Y2.high.low >> 24 & 255, I2[X2++] = 255 & Y2.high.high, I2[X2++] = Y2.high.high >> 8 & 255, I2[X2++] = Y2.high.high >> 16 & 255, I2[X2++] = Y2.high.high >> 24 & 255, new _At(I2);
  }
  toString() {
    let t, e = 0;
    const n2 = new Array(36);
    for (let t2 = 0; t2 < n2.length; t2++) n2[t2] = 0;
    let i2, l2, o, c = 0, a = false, s = { parts: [0, 0, 0, 0] };
    const d = [];
    c = 0;
    const b = this.bytes, Z = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24, m = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24, u = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24, r2 = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
    c = 0;
    ({ low: new Ht(Z, m), high: new Ht(u, r2) }).high.lessThan(Ht.ZERO) && d.push("-");
    const h2 = r2 >> 26 & 31;
    if (h2 >> 3 == 3) {
      if (30 === h2) return d.join("") + "Infinity";
      if (31 === h2) return "NaN";
      t = r2 >> 15 & 16383, i2 = 8 + (r2 >> 14 & 1);
    } else i2 = r2 >> 14 & 7, t = r2 >> 17 & 16383;
    const p2 = t - 6176;
    if (s.parts[0] = (16383 & r2) + ((15 & i2) << 14), s.parts[1] = u, s.parts[2] = m, s.parts[3] = Z, 0 === s.parts[0] && 0 === s.parts[1] && 0 === s.parts[2] && 0 === s.parts[3]) a = true;
    else for (o = 3; o >= 0; o--) {
      let t2 = 0;
      const e2 = _t(s);
      if (s = e2.quotient, t2 = e2.rem.low, t2) for (l2 = 8; l2 >= 0; l2--) n2[9 * o + l2] = t2 % 10, t2 = Math.floor(t2 / 10);
    }
    if (a) e = 1, n2[c] = 0;
    else for (e = 36; !n2[c]; ) e -= 1, c += 1;
    const y2 = e - 1 + p2;
    if (y2 >= 34 || y2 <= -7 || p2 > 0) {
      if (e > 34) return d.push("0"), p2 > 0 ? d.push(`E+${p2}`) : p2 < 0 && d.push(`E${p2}`), d.join("");
      d.push(`${n2[c++]}`), e -= 1, e && d.push(".");
      for (let t2 = 0; t2 < e; t2++) d.push(`${n2[c++]}`);
      d.push("E"), y2 > 0 ? d.push(`+${y2}`) : d.push(`${y2}`);
    } else if (p2 >= 0) for (let t2 = 0; t2 < e; t2++) d.push(`${n2[c++]}`);
    else {
      let t2 = e + p2;
      if (t2 > 0) for (let e2 = 0; e2 < t2; e2++) d.push(`${n2[c++]}`);
      else d.push("0");
      for (d.push("."); t2++ < 0; ) d.push("0");
      for (let i3 = 0; i3 < e - Math.max(t2 - 1, 0); i3++) d.push(`${n2[c++]}`);
    }
    return d.join("");
  }
  toJSON() {
    return { $numberDecimal: this.toString() };
  }
  toExtendedJSON() {
    return { $numberDecimal: this.toString() };
  }
  static fromExtendedJSON(t) {
    return _At.fromString(t.$numberDecimal);
  }
  inspect(t, e, n2) {
    n2 ??= V;
    return `new Decimal128(${n2(this.toString(), e)})`;
  }
};
var $t = class _$t extends yt {
  get _bsontype() {
    return "Double";
  }
  value;
  constructor(t) {
    super(), t instanceof Number && (t = t.valueOf()), this.value = +t;
  }
  static fromString(t) {
    const e = Number(t);
    if ("NaN" === t) return new _$t(NaN);
    if ("Infinity" === t) return new _$t(1 / 0);
    if ("-Infinity" === t) return new _$t(-1 / 0);
    if (!Number.isFinite(e)) throw new q(`Input: ${t} is not representable as a Double`);
    if (t.trim() !== t) throw new q(`Input: '${t}' contains whitespace`);
    if ("" === t) throw new q("Input is an empty string");
    if (/[^-0-9.+eE]/.test(t)) throw new q(`Input: '${t}' is not in decimal or exponential notation`);
    return new _$t(e);
  }
  valueOf() {
    return this.value;
  }
  toJSON() {
    return this.value;
  }
  toString(t) {
    return this.value.toString(t);
  }
  toExtendedJSON(t) {
    return t && (t.legacy || t.relaxed && isFinite(this.value)) ? this.value : Object.is(Math.sign(this.value), -0) ? { $numberDouble: "-0.0" } : { $numberDouble: Number.isInteger(this.value) ? this.value.toFixed(1) : this.value.toString() };
  }
  static fromExtendedJSON(t, e) {
    const n2 = parseFloat(t.$numberDouble);
    return e && e.relaxed ? n2 : new _$t(n2);
  }
  inspect(t, e, n2) {
    return n2 ??= V, `new Double(${n2(this.value, e)})`;
  }
};
var qt = class _qt extends yt {
  get _bsontype() {
    return "Int32";
  }
  value;
  constructor(t) {
    super(), t instanceof Number && (t = t.valueOf()), this.value = 0 | +t;
  }
  static fromString(t) {
    const e = Tt(t), n2 = Number(t);
    if (g < n2) throw new q(`Input: '${t}' is larger than the maximum value for Int32`);
    if (Y > n2) throw new q(`Input: '${t}' is smaller than the minimum value for Int32`);
    if (!Number.isSafeInteger(n2)) throw new q(`Input: '${t}' is not a safe integer`);
    if (n2.toString() !== e) throw new q(`Input: '${t}' is not a valid Int32 string`);
    return new _qt(n2);
  }
  valueOf() {
    return this.value;
  }
  toString(t) {
    return this.value.toString(t);
  }
  toJSON() {
    return this.value;
  }
  toExtendedJSON(t) {
    return t && (t.relaxed || t.legacy) ? this.value : { $numberInt: this.value.toString() };
  }
  static fromExtendedJSON(t, e) {
    return e && e.relaxed ? parseInt(t.$numberInt, 10) : new _qt(t.$numberInt);
  }
  inspect(t, e, n2) {
    return n2 ??= V, `new Int32(${n2(this.value, e)})`;
  }
};
var te = class _te extends yt {
  get _bsontype() {
    return "MaxKey";
  }
  toExtendedJSON() {
    return { $maxKey: 1 };
  }
  static fromExtendedJSON() {
    return new _te();
  }
  inspect() {
    return "new MaxKey()";
  }
};
var ee = class _ee extends yt {
  get _bsontype() {
    return "MinKey";
  }
  toExtendedJSON() {
    return { $minKey: 1 };
  }
  static fromExtendedJSON() {
    return new _ee();
  }
  inspect() {
    return "new MinKey()";
  }
};
var ne = null;
var ie = /* @__PURE__ */ new WeakMap();
var le = class _le extends yt {
  get _bsontype() {
    return "ObjectId";
  }
  static index = Math.floor(16777215 * Math.random());
  static cacheHexString;
  buffer;
  constructor(t) {
    let e;
    if (super(), "object" == typeof t && t && "id" in t) {
      if ("string" != typeof t.id && !ArrayBuffer.isView(t.id)) throw new q("Argument passed in must have an id that is of type string or Buffer");
      e = "toHexString" in t && "function" == typeof t.toHexString ? ht.fromHex(t.toHexString()) : t.id;
    } else e = t;
    if (null == e) this.buffer = _le.generate();
    else if (ArrayBuffer.isView(e) && 12 === e.byteLength) this.buffer = ht.toLocalBufferType(e);
    else {
      if ("string" != typeof e) throw new q("Argument passed in does not match the accepted types");
      if (!_le.validateHexString(e)) throw new q("input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
      this.buffer = ht.fromHex(e), _le.cacheHexString && ie.set(this, e);
    }
  }
  get id() {
    return this.buffer;
  }
  set id(t) {
    this.buffer = t, _le.cacheHexString && ie.set(this, ht.toHex(t));
  }
  static validateHexString(t) {
    if (24 !== t?.length) return false;
    for (let e = 0; e < 24; e++) {
      const n2 = t.charCodeAt(e);
      if (!(n2 >= 48 && n2 <= 57 || n2 >= 97 && n2 <= 102 || n2 >= 65 && n2 <= 70)) return false;
    }
    return true;
  }
  toHexString() {
    if (_le.cacheHexString) {
      const t2 = ie.get(this);
      if (t2) return t2;
    }
    const t = ht.toHex(this.id);
    return _le.cacheHexString && ie.set(this, t), t;
  }
  static getInc() {
    return _le.index = (_le.index + 1) % 16777215;
  }
  static generate(t) {
    "number" != typeof t && (t = Math.floor(Date.now() / 1e3));
    const e = _le.getInc(), n2 = ht.allocateUnsafe(12);
    return Wt.setInt32BE(n2, 0, t), null === ne && (ne = ht.randomBytes(5)), n2[4] = ne[0], n2[5] = ne[1], n2[6] = ne[2], n2[7] = ne[3], n2[8] = ne[4], n2[11] = 255 & e, n2[10] = e >> 8 & 255, n2[9] = e >> 16 & 255, n2;
  }
  toString(t) {
    return "base64" === t ? ht.toBase64(this.id) : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  static is(t) {
    return null != t && "object" == typeof t && "_bsontype" in t && "ObjectId" === t._bsontype;
  }
  equals(t) {
    if (null == t) return false;
    if (_le.is(t)) return this.buffer[11] === t.buffer[11] && ht.equals(this.buffer, t.buffer);
    if ("string" == typeof t) return t.toLowerCase() === this.toHexString();
    if ("object" == typeof t && "function" == typeof t.toHexString) {
      const e = t.toHexString(), n2 = this.toHexString();
      return "string" == typeof e && e.toLowerCase() === n2;
    }
    return false;
  }
  getTimestamp() {
    const t = /* @__PURE__ */ new Date(), e = Wt.getUint32BE(this.buffer, 0);
    return t.setTime(1e3 * Math.floor(e)), t;
  }
  static createPk() {
    return new _le();
  }
  serializeInto(t, e) {
    return t[e] = this.buffer[0], t[e + 1] = this.buffer[1], t[e + 2] = this.buffer[2], t[e + 3] = this.buffer[3], t[e + 4] = this.buffer[4], t[e + 5] = this.buffer[5], t[e + 6] = this.buffer[6], t[e + 7] = this.buffer[7], t[e + 8] = this.buffer[8], t[e + 9] = this.buffer[9], t[e + 10] = this.buffer[10], t[e + 11] = this.buffer[11], 12;
  }
  static createFromTime(t) {
    const e = ht.allocate(12);
    for (let t2 = 11; t2 >= 4; t2--) e[t2] = 0;
    return Wt.setInt32BE(e, 0, t), new _le(e);
  }
  static createFromHexString(t) {
    if (24 !== t?.length) throw new q("hex string must be 24 characters");
    return new _le(ht.fromHex(t));
  }
  static createFromBase64(t) {
    if (16 !== t?.length) throw new q("base64 string must be 16 characters");
    return new _le(ht.fromBase64(t));
  }
  static isValid(t) {
    if (null == t) return false;
    if ("string" == typeof t) return _le.validateHexString(t);
    try {
      return new _le(t), true;
    } catch {
      return false;
    }
  }
  toExtendedJSON() {
    return this.toHexString ? { $oid: this.toHexString() } : { $oid: this.toString("hex") };
  }
  static fromExtendedJSON(t) {
    return new _le(t.$oid);
  }
  isCached() {
    return _le.cacheHexString && ie.has(this);
  }
  inspect(t, e, n2) {
    return n2 ??= V, `new ObjectId(${n2(this.toHexString(), e)})`;
  }
};
function oe(t, e, n2) {
  let i2 = 5;
  if (Array.isArray(t)) for (let l2 = 0; l2 < t.length; l2++) i2 += ce(l2.toString(), t[l2], e, true, n2);
  else {
    "function" == typeof t?.toBSON && (t = t.toBSON());
    for (const l2 of Object.keys(t)) i2 += ce(l2, t[l2], e, false, n2);
  }
  return i2;
}
function ce(t, e, n2 = false, i2 = false, l2 = false) {
  switch ("function" == typeof e?.toBSON && (e = e.toBSON()), typeof e) {
    case "string":
      return 1 + ht.utf8ByteLength(t) + 1 + 4 + ht.utf8ByteLength(e) + 1;
    case "number":
      return Math.floor(e) === e && e >= J && e <= S && e >= Y && e <= g ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 5 : (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 9;
    case "undefined":
      return i2 || !l2 ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 : 0;
    case "boolean":
      return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 2;
    case "object":
      if (null != e && "string" == typeof e._bsontype && e[f] !== W) throw new tt();
      if (null == e || "MinKey" === e._bsontype || "MaxKey" === e._bsontype) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1;
      if ("ObjectId" === e._bsontype) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 13;
      if (e instanceof Date || X(e)) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 9;
      if (ArrayBuffer.isView(e) || e instanceof ArrayBuffer || p(e)) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 6 + e.byteLength;
      if ("Long" === e._bsontype || "Double" === e._bsontype || "Timestamp" === e._bsontype) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 9;
      if ("Decimal128" === e._bsontype) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 17;
      if ("Code" === e._bsontype) return null != e.scope && Object.keys(e.scope).length > 0 ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 + 4 + 4 + ht.utf8ByteLength(e.code.toString()) + 1 + oe(e.scope, n2, l2) : (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 + 4 + ht.utf8ByteLength(e.code.toString()) + 1;
      if ("Binary" === e._bsontype) {
        const n3 = e;
        return n3.sub_type === ft.SUBTYPE_BYTE_ARRAY ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + (n3.position + 1 + 4 + 1 + 4) : (null != t ? ht.utf8ByteLength(t) + 1 : 0) + (n3.position + 1 + 4 + 1);
      }
      if ("Symbol" === e._bsontype) return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + ht.utf8ByteLength(e.value) + 4 + 1 + 1;
      if ("DBRef" === e._bsontype) {
        const i3 = Object.assign({ $ref: e.collection, $id: e.oid }, e.fields);
        return null != e.db && (i3.$db = e.db), (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 + oe(i3, n2, l2);
      }
      return e instanceof RegExp || y(e) ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 + ht.utf8ByteLength(e.source) + 1 + (e.global ? 1 : 0) + (e.ignoreCase ? 1 : 0) + (e.multiline ? 1 : 0) + 1 : "BSONRegExp" === e._bsontype ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 + ht.utf8ByteLength(e.pattern) + 1 + ht.utf8ByteLength(e.options) + 1 : (null != t ? ht.utf8ByteLength(t) + 1 : 0) + oe(e, n2, l2) + 1;
    case "function":
      return n2 ? (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 1 + 4 + ht.utf8ByteLength(e.toString()) + 1 : 0;
    case "bigint":
      return (null != t ? ht.utf8ByteLength(t) + 1 : 0) + 9;
    case "symbol":
      return 0;
    default:
      throw new q("Unrecognized JS type: " + typeof e);
  }
}
var ae = class _ae extends yt {
  get _bsontype() {
    return "BSONRegExp";
  }
  pattern;
  options;
  constructor(t, e) {
    if (super(), this.pattern = t, this.options = (e ?? "").split("").sort().join(""), -1 !== this.pattern.indexOf("\0")) throw new q(`BSON Regex patterns cannot contain null bytes, found: ${JSON.stringify(this.pattern)}`);
    if (-1 !== this.options.indexOf("\0")) throw new q(`BSON Regex options cannot contain null bytes, found: ${JSON.stringify(this.options)}`);
    for (let t2 = 0; t2 < this.options.length; t2++) if ("i" !== this.options[t2] && "m" !== this.options[t2] && "x" !== this.options[t2] && "l" !== this.options[t2] && "s" !== this.options[t2] && "u" !== this.options[t2]) throw new q(`The regular expression option [${this.options[t2]}] is not supported`);
  }
  static parseOptions(t) {
    return t ? t.split("").sort().join("") : "";
  }
  toExtendedJSON(t) {
    return (t = t || {}).legacy ? { $regex: this.pattern, $options: this.options } : { $regularExpression: { pattern: this.pattern, options: this.options } };
  }
  static fromExtendedJSON(t) {
    if ("$regex" in t) {
      if ("string" == typeof t.$regex) return new _ae(t.$regex, _ae.parseOptions(t.$options));
      if ("BSONRegExp" === t.$regex._bsontype) return t;
    }
    if ("$regularExpression" in t) return new _ae(t.$regularExpression.pattern, _ae.parseOptions(t.$regularExpression.options));
    throw new q(`Unexpected BSONRegExp EJSON object form: ${JSON.stringify(t)}`);
  }
  inspect(t, e, n2) {
    const i2 = (function(t2) {
      if (null != t2 && "object" == typeof t2 && "stylize" in t2 && "function" == typeof t2.stylize) return t2.stylize;
    })(e) ?? ((t2) => t2);
    n2 ??= V;
    return `new BSONRegExp(${i2(n2(this.pattern), "regexp")}, ${i2(n2(this.options), "regexp")})`;
  }
};
var se = class _se extends yt {
  get _bsontype() {
    return "BSONSymbol";
  }
  value;
  constructor(t) {
    super(), this.value = t;
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
  static fromExtendedJSON(t) {
    return new _se(t.$symbol);
  }
  inspect(t, e, n2) {
    return n2 ??= V, `new BSONSymbol(${n2(this.value, e)})`;
  }
};
var de = Ht;
var be = class _be extends de {
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
  constructor(t) {
    if (null == t) super(0, 0, true);
    else if ("bigint" == typeof t) super(t, true);
    else if (Ht.isLong(t)) super(t.low, t.high, true);
    else {
      if ("object" != typeof t || !("t" in t) || !("i" in t)) throw new q("A Timestamp can only be constructed with: bigint, Long, or { t: number; i: number }");
      {
        if ("number" != typeof t.t && ("object" != typeof t.t || "Int32" !== t.t._bsontype)) throw new q("Timestamp constructed from { t, i } must provide t as a number");
        if ("number" != typeof t.i && ("object" != typeof t.i || "Int32" !== t.i._bsontype)) throw new q("Timestamp constructed from { t, i } must provide i as a number");
        const e = Number(t.t), n2 = Number(t.i);
        if (e < 0 || Number.isNaN(e)) throw new q("Timestamp constructed from { t, i } must provide a positive t");
        if (n2 < 0 || Number.isNaN(n2)) throw new q("Timestamp constructed from { t, i } must provide a positive i");
        if (e > 4294967295) throw new q("Timestamp constructed from { t, i } must provide t equal or less than uint32 max");
        if (n2 > 4294967295) throw new q("Timestamp constructed from { t, i } must provide i equal or less than uint32 max");
        super(n2, e, true);
      }
    }
  }
  toJSON() {
    return { $timestamp: this.toString() };
  }
  static fromInt(t) {
    return new _be(Ht.fromInt(t, true));
  }
  static fromNumber(t) {
    return new _be(Ht.fromNumber(t, true));
  }
  static fromBits(t, e) {
    return new _be({ i: t, t: e });
  }
  static fromString(t, e) {
    return new _be(Ht.fromString(t, true, e));
  }
  toExtendedJSON() {
    return { $timestamp: { t: this.t, i: this.i } };
  }
  static fromExtendedJSON(t) {
    const e = Ht.isLong(t.$timestamp.i) ? t.$timestamp.i.getLowBitsUnsigned() : t.$timestamp.i, n2 = Ht.isLong(t.$timestamp.t) ? t.$timestamp.t.getLowBitsUnsigned() : t.$timestamp.t;
    return new _be({ t: n2, i: e });
  }
  inspect(t, e, n2) {
    n2 ??= V;
    return `new Timestamp({ t: ${n2(this.t, e)}, i: ${n2(this.i, e)} })`;
  }
};
var Ze = Ht.fromNumber(S);
var me = Ht.fromNumber(J);
function ue(t, e, n2) {
  const i2 = (e = null == e ? {} : e) && e.index ? e.index : 0, l2 = Wt.getInt32LE(t, i2);
  if (l2 < 5) throw new q(`bson size must be >= 5, is ${l2}`);
  if (e.allowObjectSmallerThanBufferSize && t.length < l2) throw new q(`buffer length ${t.length} must be >= bson size ${l2}`);
  if (!e.allowObjectSmallerThanBufferSize && t.length !== l2) throw new q(`buffer length ${t.length} must === bson size ${l2}`);
  if (l2 + i2 > t.byteLength) throw new q(`(bson size ${l2} + options.index ${i2} must be <= buffer length ${t.byteLength})`);
  if (0 !== t[i2 + l2 - 1]) throw new q("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
  return he(t, i2, e, n2);
}
var re = /^\$ref$|^\$id$|^\$db$/;
function he(t, e, n2, i2 = false) {
  const l2 = null == n2.fieldsAsRaw ? null : n2.fieldsAsRaw, o = null != n2.raw && n2.raw, c = "boolean" == typeof n2.bsonRegExp && n2.bsonRegExp, a = n2.promoteBuffers ?? false, s = n2.promoteLongs ?? true, d = n2.promoteValues ?? true, b = n2.useBigInt64 ?? false;
  if (b && !d) throw new q("Must either request bigint or Long for int64 deserialization");
  if (b && !s) throw new q("Must either request bigint or Long for int64 deserialization");
  let Z, m, u = true;
  const r2 = (null == n2.validation ? { utf8: true } : n2.validation).utf8;
  if ("boolean" == typeof r2) Z = r2;
  else {
    u = false;
    const t2 = Object.keys(r2).map((function(t3) {
      return r2[t3];
    }));
    if (0 === t2.length) throw new q("UTF-8 validation setting cannot be empty");
    if ("boolean" != typeof t2[0]) throw new q("Invalid UTF-8 validation option, must specify boolean values");
    if (Z = t2[0], !t2.every(((t3) => t3 === Z))) throw new q("Invalid UTF-8 validation option - keys must be all true or all false");
  }
  if (!u) {
    m = /* @__PURE__ */ new Set();
    for (const t2 of Object.keys(r2)) m.add(t2);
  }
  const h2 = e;
  if (t.length < 5) throw new q("corrupt bson message < 5 bytes long");
  const p2 = Wt.getInt32LE(t, e);
  if (e += 4, p2 < 5 || p2 > t.length) throw new q("corrupt bson message");
  const y2 = i2 ? [] : {};
  let G2 = 0, X2 = !i2 && null;
  for (; ; ) {
    const r3 = t[e++];
    if (0 === r3) break;
    let h3 = e;
    for (; 0 !== t[h3] && h3 < t.length; ) h3++;
    if (h3 >= t.byteLength) throw new q("Bad BSON Document: illegal CString");
    const p3 = i2 ? G2++ : ht.toUTF8(t, e, h3, false);
    let V2, W2 = true;
    if (W2 = u || m?.has(p3) ? Z : !Z, false !== X2 && "$" === p3[0] && (X2 = re.test(p3)), e = h3 + 1, r3 === T) {
      const n3 = Wt.getInt32LE(t, e);
      if (e += 4, n3 <= 0 || n3 > t.length - e || 0 !== t[e + n3 - 1]) throw new q("bad string length in bson");
      V2 = ht.toUTF8(t, e, e + n3 - 1, W2), e += n3;
    } else if (r3 === N) {
      const n3 = ht.allocateUnsafe(12);
      for (let i3 = 0; i3 < 12; i3++) n3[i3] = t[e + i3];
      V2 = new le(n3), e += 12;
    } else if (r3 === P && false === d) V2 = new qt(Wt.getInt32LE(t, e)), e += 4;
    else if (r3 === P) V2 = Wt.getInt32LE(t, e), e += 4;
    else if (r3 === K) V2 = Wt.getFloat64LE(t, e), e += 8, false === d && (V2 = new $t(V2));
    else if (r3 === k) {
      const n3 = Wt.getInt32LE(t, e), i3 = Wt.getInt32LE(t, e + 4);
      e += 8, V2 = new Date(new Ht(n3, i3).toNumber());
    } else if (r3 === w) {
      if (0 !== t[e] && 1 !== t[e]) throw new q("illegal boolean type value");
      V2 = 1 === t[e++];
    } else if (r3 === L) {
      const i3 = e, l3 = Wt.getInt32LE(t, e);
      if (l3 <= 0 || l3 > t.length - e) throw new q("bad embedded document length in bson");
      if (o) V2 = t.subarray(e, e + l3);
      else {
        let e2 = n2;
        u || (e2 = { ...n2, validation: { utf8: W2 } }), V2 = he(t, i3, e2, false);
      }
      e += l3;
    } else if (r3 === U) {
      const i3 = e, o2 = Wt.getInt32LE(t, e);
      let c2 = n2;
      const a2 = e + o2;
      if (l2 && l2[p3] && (c2 = { ...n2, raw: true }), u || (c2 = { ...c2, validation: { utf8: W2 } }), V2 = he(t, i3, c2, true), 0 !== t[(e += o2) - 1]) throw new q("invalid array terminator byte");
      if (e !== a2) throw new q("corrupted array bson");
    } else if (r3 === x) V2 = void 0;
    else if (r3 === H) V2 = null;
    else if (r3 === Q) if (b) V2 = Wt.getBigInt64LE(t, e), e += 8;
    else {
      const n3 = Wt.getInt32LE(t, e), i3 = Wt.getInt32LE(t, e + 4);
      e += 8;
      const l3 = new Ht(n3, i3);
      V2 = s && true === d && l3.lessThanOrEqual(Ze) && l3.greaterThanOrEqual(me) ? l3.toNumber() : l3;
    }
    else if (r3 === O) {
      const n3 = ht.allocateUnsafe(16);
      for (let i3 = 0; i3 < 16; i3++) n3[i3] = t[e + i3];
      e += 16, V2 = new At(n3);
    } else if (r3 === z) {
      let n3 = Wt.getInt32LE(t, e);
      e += 4;
      const i3 = n3, l3 = t[e++];
      if (n3 < 0) throw new q("Negative binary type element size found");
      if (n3 > t.byteLength) throw new q("Binary type size larger than document size");
      if (l3 === ft.SUBTYPE_BYTE_ARRAY) {
        if (n3 = Wt.getInt32LE(t, e), e += 4, n3 < 0) throw new q("Negative binary type element size found for subtype 0x02");
        if (n3 > i3 - 4) throw new q("Binary type with subtype 0x02 contains too long binary size");
        if (n3 < i3 - 4) throw new q("Binary type with subtype 0x02 contains too short binary size");
      }
      a && d ? V2 = ht.toLocalBufferType(t.subarray(e, e + n3)) : (V2 = new ft(t.subarray(e, e + n3), l3), l3 === A && Rt.isValid(V2) && (V2 = V2.toUUID())), e += n3;
    } else if (r3 === C && false === c) {
      for (h3 = e; 0 !== t[h3] && h3 < t.length; ) h3++;
      if (h3 >= t.length) throw new q("Bad BSON Document: illegal CString");
      const n3 = ht.toUTF8(t, e, h3, false);
      for (h3 = e = h3 + 1; 0 !== t[h3] && h3 < t.length; ) h3++;
      if (h3 >= t.length) throw new q("Bad BSON Document: illegal CString");
      const i3 = ht.toUTF8(t, e, h3, false);
      e = h3 + 1;
      const l3 = new Array(i3.length);
      for (h3 = 0; h3 < i3.length; h3++) switch (i3[h3]) {
        case "m":
          l3[h3] = "m";
          break;
        case "s":
          l3[h3] = "g";
          break;
        case "i":
          l3[h3] = "i";
      }
      V2 = new RegExp(n3, l3.join(""));
    } else if (r3 === C && true === c) {
      for (h3 = e; 0 !== t[h3] && h3 < t.length; ) h3++;
      if (h3 >= t.length) throw new q("Bad BSON Document: illegal CString");
      const n3 = ht.toUTF8(t, e, h3, false);
      for (h3 = e = h3 + 1; 0 !== t[h3] && h3 < t.length; ) h3++;
      if (h3 >= t.length) throw new q("Bad BSON Document: illegal CString");
      const i3 = ht.toUTF8(t, e, h3, false);
      e = h3 + 1, V2 = new ae(n3, i3);
    } else if (r3 === M) {
      const n3 = Wt.getInt32LE(t, e);
      if (e += 4, n3 <= 0 || n3 > t.length - e || 0 !== t[e + n3 - 1]) throw new q("bad string length in bson");
      const i3 = ht.toUTF8(t, e, e + n3 - 1, W2);
      V2 = d ? i3 : new se(i3), e += n3;
    } else if (r3 === F) V2 = new be({ i: Wt.getUint32LE(t, e), t: Wt.getUint32LE(t, e + 4) }), e += 8;
    else if (r3 === E) V2 = new ee();
    else if (r3 === _) V2 = new te();
    else if (r3 === v) {
      const n3 = Wt.getInt32LE(t, e);
      if (e += 4, n3 <= 0 || n3 > t.length - e || 0 !== t[e + n3 - 1]) throw new q("bad string length in bson");
      const i3 = ht.toUTF8(t, e, e + n3 - 1, W2);
      V2 = new St(i3), e += n3;
    } else if (r3 === j) {
      const i3 = Wt.getInt32LE(t, e);
      if (e += 4, i3 < 13) throw new q("code_w_scope total size shorter minimum expected length");
      const l3 = Wt.getInt32LE(t, e);
      if (e += 4, l3 <= 0 || l3 > t.length - e || 0 !== t[e + l3 - 1]) throw new q("bad string length in bson");
      const o2 = ht.toUTF8(t, e, e + l3 - 1, W2), c2 = e += l3, a2 = Wt.getInt32LE(t, e), s2 = he(t, c2, n2, false);
      if (e += a2, i3 < 8 + a2 + l3) throw new q("code_w_scope total size is too short, truncating scope");
      if (i3 > 8 + a2 + l3) throw new q("code_w_scope total size is too long, clips outer document");
      V2 = new St(o2, s2);
    } else {
      if (r3 !== B) throw new q(`Detected unknown BSON type ${r3.toString(16)} for fieldname "${p3}"`);
      {
        const n3 = Wt.getInt32LE(t, e);
        if (e += 4, n3 <= 0 || n3 > t.length - e || 0 !== t[e + n3 - 1]) throw new q("bad string length in bson");
        const i3 = ht.toUTF8(t, e, e + n3 - 1, W2);
        e += n3;
        const l3 = ht.allocateUnsafe(12);
        for (let n4 = 0; n4 < 12; n4++) l3[n4] = t[e + n4];
        const o2 = new le(l3);
        e += 12, V2 = new Kt(i3, o2);
      }
    }
    "__proto__" === p3 ? Object.defineProperty(y2, p3, { value: V2, writable: true, enumerable: true, configurable: true }) : y2[p3] = V2;
  }
  if (p2 !== e - h2) {
    if (i2) throw new q("corrupt array bson");
    throw new q("corrupt object bson");
  }
  if (!X2) return y2;
  if (Jt(y2)) {
    const t2 = Object.assign({}, y2);
    return delete t2.$ref, delete t2.$id, delete t2.$db, new Kt(y2.$ref, y2.$id, y2.$db, t2);
  }
  return y2;
}
var pe = /\x00/;
var ye = /* @__PURE__ */ new Set(["$db", "$ref", "$id", "$clusterTime"]);
function Ge(t, e, n2, i2) {
  t[i2++] = T;
  t[(i2 = i2 + ht.encodeUTF8Into(t, e, i2) + 1) - 1] = 0;
  const l2 = ht.encodeUTF8Into(t, n2, i2 + 4);
  return Wt.setInt32LE(t, i2, l2 + 1), i2 = i2 + 4 + l2, t[i2++] = 0, i2;
}
function Xe(t, e, n2, i2) {
  const l2 = !Object.is(n2, -0) && Number.isSafeInteger(n2) && n2 <= g && n2 >= Y ? P : K;
  t[i2++] = l2;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2 += l2 === P ? Wt.setInt32LE(t, i2, n2) : Wt.setFloat64LE(t, i2, n2);
}
function Ve(t, e, n2, i2) {
  t[i2++] = Q;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2 += Wt.setBigInt64LE(t, i2, n2);
}
function We(t, e, n2, i2) {
  t[i2++] = H;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2;
}
function fe(t, e, n2, i2) {
  t[i2++] = w;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, t[i2++] = n2 ? 1 : 0, i2;
}
function ge(t, e, n2, i2) {
  t[i2++] = k;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const l2 = Ht.fromNumber(n2.getTime()), o = l2.getLowBits(), c = l2.getHighBits();
  return i2 += Wt.setInt32LE(t, i2, o), i2 += Wt.setInt32LE(t, i2, c);
}
function Ye(t, e, n2, i2) {
  t[i2++] = C;
  if (i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, n2.source && null != n2.source.match(pe)) throw new q("value " + n2.source + " must not contain null bytes");
  return i2 += ht.encodeUTF8Into(t, n2.source, i2), t[i2++] = 0, n2.ignoreCase && (t[i2++] = 105), n2.global && (t[i2++] = 115), n2.multiline && (t[i2++] = 109), t[i2++] = 0, i2;
}
function Ie(t, e, n2, i2) {
  t[i2++] = C;
  if (i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, null != n2.pattern.match(pe)) throw new q("pattern " + n2.pattern + " must not contain null bytes");
  i2 += ht.encodeUTF8Into(t, n2.pattern, i2), t[i2++] = 0;
  const l2 = n2.options.split("").sort().join("");
  return i2 += ht.encodeUTF8Into(t, l2, i2), t[i2++] = 0, i2;
}
function Re(t, e, n2, i2) {
  null === n2 ? t[i2++] = H : "MinKey" === n2._bsontype ? t[i2++] = E : t[i2++] = _;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2;
}
function Se(t, e, n2, i2) {
  t[i2++] = N;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2 += n2.serializeInto(t, i2);
}
function Je(t, e, n2, i2) {
  t[i2++] = z;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const l2 = n2.length;
  if (i2 += Wt.setInt32LE(t, i2, l2), t[i2++] = D, l2 <= 16) for (let e2 = 0; e2 < l2; e2++) t[i2 + e2] = n2[e2];
  else t.set(n2, i2);
  return i2 += l2;
}
function Ke(t, e, n2, i2, l2, o, c, a, s) {
  if (s.has(n2)) throw new q("Cannot convert circular structure to BSON");
  s.add(n2), t[i2++] = Array.isArray(n2) ? U : L;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const d = Ce(t, n2, l2, i2, o + 1, c, a, s);
  return s.delete(n2), d;
}
function Te(t, e, n2, i2) {
  t[i2++] = O;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  for (let e2 = 0; e2 < 16; e2++) t[i2 + e2] = n2.bytes[e2];
  return i2 + 16;
}
function Le(t, e, n2, i2) {
  t[i2++] = "Long" === n2._bsontype ? Q : F;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const l2 = n2.getLowBits(), o = n2.getHighBits();
  return i2 += Wt.setInt32LE(t, i2, l2), i2 += Wt.setInt32LE(t, i2, o);
}
function Ue(t, e, n2, i2) {
  n2 = n2.valueOf(), t[i2++] = P;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2 += Wt.setInt32LE(t, i2, n2);
}
function ze(t, e, n2, i2) {
  t[i2++] = K;
  return i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0, i2 += Wt.setFloat64LE(t, i2, n2.value);
}
function xe(t, e, n2, i2) {
  t[i2++] = v;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const l2 = n2.toString(), o = ht.encodeUTF8Into(t, l2, i2 + 4) + 1;
  return Wt.setInt32LE(t, i2, o), i2 = i2 + 4 + o - 1, t[i2++] = 0, i2;
}
function Ne(t, e, n2, i2, l2 = false, o = 0, c = false, a = true, s) {
  if (n2.scope && "object" == typeof n2.scope) {
    t[i2++] = j;
    i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
    let d = i2;
    const b = n2.code;
    i2 += 4;
    const Z = ht.encodeUTF8Into(t, b, i2 + 4) + 1;
    Wt.setInt32LE(t, i2, Z), t[i2 + 4 + Z - 1] = 0, i2 = i2 + Z + 4;
    const m = Ce(t, n2.scope, l2, i2, o + 1, c, a, s);
    i2 = m - 1;
    const u = m - d;
    d += Wt.setInt32LE(t, d, u), t[i2++] = 0;
  } else {
    t[i2++] = v;
    i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
    const l3 = n2.code.toString(), o2 = ht.encodeUTF8Into(t, l3, i2 + 4) + 1;
    Wt.setInt32LE(t, i2, o2), i2 = i2 + 4 + o2 - 1, t[i2++] = 0;
  }
  return i2;
}
function we(t, e, n2, i2) {
  t[i2++] = z;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const l2 = n2.buffer;
  let o = n2.position;
  if (n2.sub_type === ft.SUBTYPE_BYTE_ARRAY && (o += 4), i2 += Wt.setInt32LE(t, i2, o), t[i2++] = n2.sub_type, n2.sub_type === ft.SUBTYPE_BYTE_ARRAY && (o -= 4, i2 += Wt.setInt32LE(t, i2, o)), n2.sub_type === ft.SUBTYPE_VECTOR && gt(n2), o <= 16) for (let e2 = 0; e2 < o; e2++) t[i2 + e2] = l2[e2];
  else t.set(l2, i2);
  return i2 += n2.position;
}
function ke(t, e, n2, i2) {
  t[i2++] = M;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  const l2 = ht.encodeUTF8Into(t, n2.value, i2 + 4) + 1;
  return Wt.setInt32LE(t, i2, l2), i2 = i2 + 4 + l2 - 1, t[i2++] = 0, i2;
}
function He(t, e, n2, i2, l2, o, c) {
  t[i2++] = L;
  i2 += ht.encodeUTF8Into(t, e, i2), t[i2++] = 0;
  let a = i2, s = { $ref: n2.collection || n2.namespace, $id: n2.oid };
  null != n2.db && (s.$db = n2.db), s = Object.assign(s, n2.fields);
  const d = Ce(t, s, false, i2, l2 + 1, o, true, c), b = d - a;
  return a += Wt.setInt32LE(t, i2, b), d;
}
function Ce(t, e, n2, i2, l2, o, c, a) {
  if (null == a) {
    if (null == e) return t[0] = 5, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, 5;
    if (Array.isArray(e)) throw new q("serialize does not support an array as the root input");
    if ("object" != typeof e) throw new q("serialize does not support non-object as the root input");
    if ("_bsontype" in e && "string" == typeof e._bsontype) throw new q("BSON types cannot be serialized as a document");
    if (X(e) || y(e) || h(e) || p(e)) throw new q("date, regexp, typedarray, and arraybuffer cannot be BSON documents");
    a = /* @__PURE__ */ new Set();
  }
  a.add(e);
  let s = i2 + 4;
  if (Array.isArray(e)) for (let i3 = 0; i3 < e.length; i3++) {
    const d2 = `${i3}`;
    let b = e[i3];
    "function" == typeof b?.toBSON && (b = b.toBSON());
    const Z = typeof b;
    if (void 0 === b) s = We(t, d2, 0, s);
    else if (null === b) s = We(t, d2, 0, s);
    else if ("string" === Z) s = Ge(t, d2, b, s);
    else if ("number" === Z) s = Xe(t, d2, b, s);
    else if ("bigint" === Z) s = Ve(t, d2, b, s);
    else if ("boolean" === Z) s = fe(t, d2, b, s);
    else if ("object" === Z && null == b._bsontype) s = b instanceof Date || X(b) ? ge(t, d2, b, s) : b instanceof Uint8Array || h(b) ? Je(t, d2, b, s) : b instanceof RegExp || y(b) ? Ye(t, d2, b, s) : Ke(t, d2, b, s, n2, l2, o, c, a);
    else if ("object" === Z) {
      if (b[f] !== W) throw new tt();
      if ("ObjectId" === b._bsontype) s = Se(t, d2, b, s);
      else if ("Decimal128" === b._bsontype) s = Te(t, d2, b, s);
      else if ("Long" === b._bsontype || "Timestamp" === b._bsontype) s = Le(t, d2, b, s);
      else if ("Double" === b._bsontype) s = ze(t, d2, b, s);
      else if ("Code" === b._bsontype) s = Ne(t, d2, b, s, n2, l2, o, c, a);
      else if ("Binary" === b._bsontype) s = we(t, d2, b, s);
      else if ("BSONSymbol" === b._bsontype) s = ke(t, d2, b, s);
      else if ("DBRef" === b._bsontype) s = He(t, d2, b, s, l2, o, a);
      else if ("BSONRegExp" === b._bsontype) s = Ie(t, d2, b, s);
      else if ("Int32" === b._bsontype) s = Ue(t, d2, b, s);
      else if ("MinKey" === b._bsontype || "MaxKey" === b._bsontype) s = Re(t, d2, b, s);
      else if (void 0 !== b._bsontype) throw new q(`Unrecognized or invalid _bsontype: ${String(b._bsontype)}`);
    } else "function" === Z && o && (s = xe(t, d2, b, s));
  }
  else if (e instanceof Map || G(e)) {
    const i3 = e.entries();
    let d2 = false;
    for (; !d2; ) {
      const e2 = i3.next();
      if (d2 = !!e2.done, d2) continue;
      const b = e2.value ? e2.value[0] : void 0;
      let Z = e2.value ? e2.value[1] : void 0;
      "function" == typeof Z?.toBSON && (Z = Z.toBSON());
      const m = typeof Z;
      if ("string" == typeof b && !ye.has(b)) {
        if (null != b.match(pe)) throw new q("key " + b + " must not contain null bytes");
        if (n2) {
          if ("$" === b[0]) throw new q("key " + b + " must not start with '$'");
          if (b.includes(".")) throw new q("key " + b + " must not contain '.'");
        }
      }
      if (void 0 === Z) false === c && (s = We(t, b, 0, s));
      else if (null === Z) s = We(t, b, 0, s);
      else if ("string" === m) s = Ge(t, b, Z, s);
      else if ("number" === m) s = Xe(t, b, Z, s);
      else if ("bigint" === m) s = Ve(t, b, Z, s);
      else if ("boolean" === m) s = fe(t, b, Z, s);
      else if ("object" === m && null == Z._bsontype) s = Z instanceof Date || X(Z) ? ge(t, b, Z, s) : Z instanceof Uint8Array || h(Z) ? Je(t, b, Z, s) : Z instanceof RegExp || y(Z) ? Ye(t, b, Z, s) : Ke(t, b, Z, s, n2, l2, o, c, a);
      else if ("object" === m) {
        if (Z[f] !== W) throw new tt();
        if ("ObjectId" === Z._bsontype) s = Se(t, b, Z, s);
        else if ("Decimal128" === Z._bsontype) s = Te(t, b, Z, s);
        else if ("Long" === Z._bsontype || "Timestamp" === Z._bsontype) s = Le(t, b, Z, s);
        else if ("Double" === Z._bsontype) s = ze(t, b, Z, s);
        else if ("Code" === Z._bsontype) s = Ne(t, b, Z, s, n2, l2, o, c, a);
        else if ("Binary" === Z._bsontype) s = we(t, b, Z, s);
        else if ("BSONSymbol" === Z._bsontype) s = ke(t, b, Z, s);
        else if ("DBRef" === Z._bsontype) s = He(t, b, Z, s, l2, o, a);
        else if ("BSONRegExp" === Z._bsontype) s = Ie(t, b, Z, s);
        else if ("Int32" === Z._bsontype) s = Ue(t, b, Z, s);
        else if ("MinKey" === Z._bsontype || "MaxKey" === Z._bsontype) s = Re(t, b, Z, s);
        else if (void 0 !== Z._bsontype) throw new q(`Unrecognized or invalid _bsontype: ${String(Z._bsontype)}`);
      } else "function" === m && o && (s = xe(t, b, Z, s));
    }
  } else {
    if ("function" == typeof e?.toBSON && null != (e = e.toBSON()) && "object" != typeof e) throw new q("toBSON function did not return an object");
    for (const i3 of Object.keys(e)) {
      let d2 = e[i3];
      "function" == typeof d2?.toBSON && (d2 = d2.toBSON());
      const b = typeof d2;
      if ("string" == typeof i3 && !ye.has(i3)) {
        if (null != i3.match(pe)) throw new q("key " + i3 + " must not contain null bytes");
        if (n2) {
          if ("$" === i3[0]) throw new q("key " + i3 + " must not start with '$'");
          if (i3.includes(".")) throw new q("key " + i3 + " must not contain '.'");
        }
      }
      if (void 0 === d2) false === c && (s = We(t, i3, 0, s));
      else if (null === d2) s = We(t, i3, 0, s);
      else if ("string" === b) s = Ge(t, i3, d2, s);
      else if ("number" === b) s = Xe(t, i3, d2, s);
      else if ("bigint" === b) s = Ve(t, i3, d2, s);
      else if ("boolean" === b) s = fe(t, i3, d2, s);
      else if ("object" === b && null == d2._bsontype) s = d2 instanceof Date || X(d2) ? ge(t, i3, d2, s) : d2 instanceof Uint8Array || h(d2) ? Je(t, i3, d2, s) : d2 instanceof RegExp || y(d2) ? Ye(t, i3, d2, s) : Ke(t, i3, d2, s, n2, l2, o, c, a);
      else if ("object" === b) {
        if (d2[f] !== W) throw new tt();
        if ("ObjectId" === d2._bsontype) s = Se(t, i3, d2, s);
        else if ("Decimal128" === d2._bsontype) s = Te(t, i3, d2, s);
        else if ("Long" === d2._bsontype || "Timestamp" === d2._bsontype) s = Le(t, i3, d2, s);
        else if ("Double" === d2._bsontype) s = ze(t, i3, d2, s);
        else if ("Code" === d2._bsontype) s = Ne(t, i3, d2, s, n2, l2, o, c, a);
        else if ("Binary" === d2._bsontype) s = we(t, i3, d2, s);
        else if ("BSONSymbol" === d2._bsontype) s = ke(t, i3, d2, s);
        else if ("DBRef" === d2._bsontype) s = He(t, i3, d2, s, l2, o, a);
        else if ("BSONRegExp" === d2._bsontype) s = Ie(t, i3, d2, s);
        else if ("Int32" === d2._bsontype) s = Ue(t, i3, d2, s);
        else if ("MinKey" === d2._bsontype || "MaxKey" === d2._bsontype) s = Re(t, i3, d2, s);
        else if (void 0 !== d2._bsontype) throw new q(`Unrecognized or invalid _bsontype: ${String(d2._bsontype)}`);
      } else "function" === b && o && (s = xe(t, i3, d2, s));
    }
  }
  a.delete(e), t[s++] = 0;
  const d = s - i2;
  return i2 += Wt.setInt32LE(t, i2, d), s;
}
var Be = { $oid: le, $binary: ft, $uuid: ft, $symbol: se, $numberInt: qt, $numberDecimal: At, $numberDouble: $t, $numberLong: Ht, $minKey: ee, $maxKey: te, $regex: ae, $regularExpression: ae, $timestamp: be };
function ve(t, e = {}) {
  if ("number" == typeof t) {
    const n3 = t <= g && t >= Y, i2 = t <= I && t >= R;
    if (e.relaxed || e.legacy) return t;
    if (Number.isInteger(t) && !Object.is(t, -0)) {
      if (n3) return new qt(t);
      if (i2) return e.useBigInt64 ? BigInt(t) : Ht.fromNumber(t);
    }
    return new $t(t);
  }
  if (null == t || "object" != typeof t) return t;
  if (t.$undefined) return null;
  const n2 = Object.keys(t).filter(((e2) => e2.startsWith("$") && null != t[e2]));
  for (let i2 = 0; i2 < n2.length; i2++) {
    const l2 = Be[n2[i2]];
    if (l2) return l2.fromExtendedJSON(t, e);
  }
  if (null != t.$date) {
    const n3 = t.$date, i2 = /* @__PURE__ */ new Date();
    if (e.legacy) if ("number" == typeof n3) i2.setTime(n3);
    else if ("string" == typeof n3) i2.setTime(Date.parse(n3));
    else {
      if ("bigint" != typeof n3) throw new et("Unrecognized type for EJSON date: " + typeof n3);
      i2.setTime(Number(n3));
    }
    else if ("string" == typeof n3) i2.setTime(Date.parse(n3));
    else if (Ht.isLong(n3)) i2.setTime(n3.toNumber());
    else if ("number" == typeof n3 && e.relaxed) i2.setTime(n3);
    else {
      if ("bigint" != typeof n3) throw new et("Unrecognized type for EJSON date: " + typeof n3);
      i2.setTime(Number(n3));
    }
    return i2;
  }
  if (null != t.$code) {
    const e2 = Object.assign({}, t);
    return t.$scope && (e2.$scope = ve(t.$scope)), St.fromExtendedJSON(t);
  }
  if (Jt(t) || t.$dbPointer) {
    const e2 = t.$ref ? t : t.$dbPointer;
    if (e2 instanceof Kt) return e2;
    const n3 = Object.keys(e2).filter(((t2) => t2.startsWith("$")));
    let i2 = true;
    if (n3.forEach(((t2) => {
      -1 === ["$ref", "$id", "$db"].indexOf(t2) && (i2 = false);
    })), i2) return Kt.fromExtendedJSON(e2);
  }
  return t;
}
function Me(t) {
  const e = t.toISOString();
  return 0 !== t.getUTCMilliseconds() ? e : e.slice(0, -5) + "Z";
}
function je(t, e) {
  if (t instanceof Map || G(t)) {
    const n2 = /* @__PURE__ */ Object.create(null);
    for (const [e2, i2] of t) {
      if ("string" != typeof e2) throw new q("Can only serialize maps with string keys");
      n2[e2] = i2;
    }
    return je(n2, e);
  }
  if (("object" == typeof t || "function" == typeof t) && null !== t) {
    const n2 = e.seenObjects.findIndex(((e2) => e2.obj === t));
    if (-1 !== n2) {
      const t2 = e.seenObjects.map(((t3) => t3.propertyName)), i2 = t2.slice(0, n2).map(((t3) => `${t3} -> `)).join(""), l2 = t2[n2], o = " -> " + t2.slice(n2 + 1, t2.length - 1).map(((t3) => `${t3} -> `)).join(""), c = t2[t2.length - 1], a = " ".repeat(i2.length + l2.length / 2), s = "-".repeat(o.length + (l2.length + c.length) / 2 - 1);
      throw new q(`Converting circular structure to EJSON:
    ${i2}${l2}${o}${c}
    ${a}\\${s}/`);
    }
    e.seenObjects[e.seenObjects.length - 1].obj = t;
  }
  if (Array.isArray(t)) return (function(t2, e2) {
    return t2.map(((t3, n2) => {
      e2.seenObjects.push({ propertyName: `index ${n2}`, obj: null });
      try {
        return je(t3, e2);
      } finally {
        e2.seenObjects.pop();
      }
    }));
  })(t, e);
  if (void 0 === t) return e.ignoreUndefined ? void 0 : null;
  if (t instanceof Date || X(t)) {
    const n2 = t.getTime(), i2 = n2 > -1 && n2 < 2534023188e5;
    return e.legacy ? e.relaxed && i2 ? { $date: t.getTime() } : { $date: Me(t) } : e.relaxed && i2 ? { $date: Me(t) } : { $date: { $numberLong: t.getTime().toString() } };
  }
  if (!("number" != typeof t || e.relaxed && isFinite(t))) {
    if (Number.isInteger(t) && !Object.is(t, -0)) {
      if (t >= Y && t <= g) return { $numberInt: t.toString() };
      if (t >= R && t <= I) return { $numberLong: t.toString() };
    }
    return { $numberDouble: Object.is(t, -0) ? "-0.0" : t.toString() };
  }
  if ("bigint" == typeof t) return e.relaxed ? Number(BigInt.asIntN(64, t)) : { $numberLong: BigInt.asIntN(64, t).toString() };
  if (t instanceof RegExp || y(t)) {
    let n2 = t.flags;
    if (void 0 === n2) {
      const e2 = t.toString().match(/[gimuy]*$/);
      e2 && (n2 = e2[0]);
    }
    return new ae(t.source, n2).toExtendedJSON(e);
  }
  return null != t && "object" == typeof t ? (function(t2, e2) {
    if (null == t2 || "object" != typeof t2) throw new q("not an object instance");
    const n2 = t2._bsontype;
    if (void 0 === n2) {
      const n3 = {};
      for (const i2 of Object.keys(t2)) {
        e2.seenObjects.push({ propertyName: i2, obj: null });
        try {
          const l2 = je(t2[i2], e2);
          "__proto__" === i2 ? Object.defineProperty(n3, i2, { value: l2, writable: true, enumerable: true, configurable: true }) : n3[i2] = l2;
        } finally {
          e2.seenObjects.pop();
        }
      }
      return n3;
    }
    if (null != t2 && "object" == typeof t2 && "string" == typeof t2._bsontype && t2[f] !== W) throw new tt();
    if ((function(t3) {
      return null != t3 && "object" == typeof t3 && "_bsontype" in t3 && "string" == typeof t3._bsontype;
    })(t2)) {
      let i2 = t2;
      if ("function" != typeof i2.toExtendedJSON) {
        const e3 = Pe[t2._bsontype];
        if (!e3) throw new q("Unrecognized or invalid _bsontype: " + t2._bsontype);
        i2 = e3(i2);
      }
      return "Code" === n2 && i2.scope ? i2 = new St(i2.code, je(i2.scope, e2)) : "DBRef" === n2 && i2.oid && (i2 = new Kt(je(i2.collection, e2), je(i2.oid, e2), je(i2.db, e2), je(i2.fields, e2))), i2.toExtendedJSON(e2);
    }
    throw new q("_bsontype must be a string, but was: " + typeof n2);
  })(t, e) : t;
}
var Pe = { Binary: (t) => new ft(t.value(), t.sub_type), Code: (t) => new St(t.code, t.scope), DBRef: (t) => new Kt(t.collection || t.namespace, t.oid, t.db, t.fields), Decimal128: (t) => new At(t.bytes), Double: (t) => new $t(t.value), Int32: (t) => new qt(t.value), Long: (t) => Ht.fromBits(null != t.low ? t.low : t.low_, null != t.low ? t.high : t.high_, null != t.low ? t.unsigned : t.unsigned_), MaxKey: () => new te(), MinKey: () => new ee(), ObjectId: (t) => new le(t), BSONRegExp: (t) => new ae(t.pattern, t.options), BSONSymbol: (t) => new se(t.value), Timestamp: (t) => be.fromBits(t.low, t.high) };
function Fe(t, e) {
  const n2 = { useBigInt64: e?.useBigInt64 ?? false, relaxed: e?.relaxed ?? true, legacy: e?.legacy ?? false };
  return JSON.parse(t, ((t2, e2) => {
    if (-1 !== t2.indexOf("\0")) throw new q(`BSON Document field names cannot contain null bytes, found: ${JSON.stringify(t2)}`);
    return ve(e2, n2);
  }));
}
function Qe(t, e, n2, i2) {
  null != n2 && "object" == typeof n2 && (i2 = n2, n2 = 0), null == e || "object" != typeof e || Array.isArray(e) || (i2 = e, e = void 0, n2 = 0);
  const l2 = je(t, Object.assign({ relaxed: true, legacy: false }, i2, { seenObjects: [{ propertyName: "(root)", obj: null }] }));
  return JSON.stringify(l2, e, n2);
}
var Oe = /* @__PURE__ */ Object.create(null);
Oe.parse = Fe, Oe.stringify = Qe, Oe.serialize = function(t, e) {
  return e = e || {}, JSON.parse(Qe(t, e));
}, Oe.deserialize = function(t, e) {
  return e = e || {}, Fe(JSON.stringify(t), e);
}, Object.freeze(Oe);
var Ee = 1;
var _e = 2;
var De = 3;
var Ae = 4;
var $e = 5;
var qe = 6;
var tn = 7;
var en = 8;
var nn = 9;
var ln = 10;
var on = 11;
var cn = 12;
var an = 13;
var sn = 14;
var dn = 15;
var bn = 16;
var Zn = 17;
var mn = 18;
var un = 19;
var rn = 255;
var hn = 127;
function pn(t, e) {
  try {
    return Wt.getNonnegativeInt32LE(t, e);
  } catch (t2) {
    throw new nt("BSON size cannot be negative", e, { cause: t2 });
  }
}
function yn(t, e) {
  let n2 = e;
  for (; 0 !== t[n2]; n2++) ;
  if (n2 === t.length - 1) throw new nt("Null terminator not found", e);
  return n2;
}
var Gn = /* @__PURE__ */ Object.create(null);
Gn.parseToElements = function(t, e = 0) {
  if (e ??= 0, t.length < 5) throw new nt(`Input must be at least 5 bytes, got ${t.length} bytes`, e);
  const n2 = pn(t, e);
  if (n2 > t.length - e) throw new nt(`Parsed documentSize (${n2} bytes) does not match input length (${t.length} bytes)`, e);
  if (0 !== t[e + n2 - 1]) throw new nt("BSON documents must end in 0x00", e + n2);
  const i2 = [];
  let l2 = e + 4;
  for (; l2 <= n2 + e; ) {
    const o = t[l2];
    if (l2 += 1, 0 === o) {
      if (l2 - e !== n2) throw new nt("Invalid 0x00 type byte", l2);
      break;
    }
    const c = l2, a = yn(t, l2) - c;
    let s;
    if (l2 += a + 1, o === Ee || o === mn || o === nn || o === Zn) s = 8;
    else if (o === bn) s = 4;
    else if (o === tn) s = 12;
    else if (o === un) s = 16;
    else if (o === en) s = 1;
    else if (o === ln || o === qe || o === hn || o === rn) s = 0;
    else if (o === on) s = yn(t, yn(t, l2) + 1) + 1 - l2;
    else if (o === De || o === Ae || o === dn) s = pn(t, l2);
    else {
      if (o !== _e && o !== $e && o !== cn && o !== an && o !== sn) throw new nt(`Invalid 0x${o.toString(16).padStart(2, "0")} type byte`, l2);
      s = pn(t, l2) + 4, o === $e && (s += 1), o === cn && (s += 12);
    }
    if (s > n2) throw new nt("value reports length larger than document", l2);
    i2.push([o, c, a, l2, s]), l2 += s;
  }
  return i2;
}, Gn.ByteUtils = ht, Gn.NumberUtils = Wt, Object.freeze(Gn);
var Xn = 17825792;
var Vn = ht.allocate(Xn);
var Wn = Object.freeze({ __proto__: null, BSONError: q, BSONOffsetError: nt, BSONRegExp: ae, BSONRuntimeError: et, BSONSymbol: se, BSONType: $, BSONValue: yt, BSONVersionError: tt, Binary: ft, ByteUtils: ht, Code: St, DBRef: Kt, Decimal128: At, Double: $t, EJSON: Oe, Int32: qt, Long: Ht, MaxKey: te, MinKey: ee, NumberUtils: Wt, ObjectId: le, Timestamp: be, UUID: Rt, bsonType: pt, calculateObjectSize: function(t, e = {}) {
  return oe(t, "boolean" == typeof (e = e || {}).serializeFunctions && e.serializeFunctions, "boolean" != typeof e.ignoreUndefined || e.ignoreUndefined);
}, deserialize: function(t, e = {}) {
  return ue(ht.toLocalBufferType(t), e);
}, deserializeStream: function(t, e, n2, i2, l2, o) {
  const c = Object.assign({ allowObjectSmallerThanBufferSize: true, index: 0 }, o), a = ht.toLocalBufferType(t);
  let s = e;
  for (let t2 = 0; t2 < n2; t2++) {
    const e2 = Wt.getInt32LE(a, s);
    c.index = s, i2[l2 + t2] = ue(a, c), s += e2;
  }
  return s;
}, onDemand: Gn, serialize: function(t, e = {}) {
  const n2 = "boolean" == typeof e.checkKeys && e.checkKeys, i2 = "boolean" == typeof e.serializeFunctions && e.serializeFunctions, l2 = "boolean" != typeof e.ignoreUndefined || e.ignoreUndefined, o = "number" == typeof e.minInternalBufferSize ? e.minInternalBufferSize : Xn;
  Vn.length < o && (Vn = ht.allocate(o));
  const c = Ce(Vn, t, n2, 0, 0, i2, l2, null), a = ht.allocateUnsafe(c);
  return a.set(Vn.subarray(0, c), 0), a;
}, serializeWithBufferAndIndex: function(t, e, n2 = {}) {
  const i2 = "boolean" == typeof n2.checkKeys && n2.checkKeys, l2 = "boolean" == typeof n2.serializeFunctions && n2.serializeFunctions, o = "boolean" != typeof n2.ignoreUndefined || n2.ignoreUndefined, c = "number" == typeof n2.index ? n2.index : 0, a = Ce(Vn, t, i2, 0, 0, l2, o, null);
  return e.set(Vn.subarray(0, a), c), c + a - 1;
}, setInternalBufferSize: function(t) {
  Vn.length < t && (Vn = ht.allocate(t));
} });
function fn(t) {
  return !!t && "object" == typeof t && "buffer" in t && t.buffer instanceof ArrayBuffer && "number" == typeof t.byteOffset && "number" == typeof t.byteLength;
}
var In = class {
  constructor() {
  }
  static urlConstructFrom(t) {
    const e = "/ws/modeling/commands" + l({ video_res_width: t.video_res_width, video_res_height: t.video_res_height, fps: t.fps, unlocked_framerate: t.unlocked_framerate, post_effect: t.post_effect, webrtc: t.webrtc, pool: t.pool, show_grid: t.show_grid, replay: t.replay, api_call_id: t.api_call_id, order_independent_transparency: t.order_independent_transparency, pr: t.pr }), n2 = ((t.client?.baseUrl || "https://api.zoo.dev") + e).replace(/^http/, "ws");
    return new URL(n2);
  }
  static authenticate(t, e) {
    const n2 = t.client && t.client.token || "";
    if (n2) try {
      const t2 = { type: "headers", headers: { Authorization: `Bearer ${n2}` } };
      e.send(JSON.stringify(t2));
    } catch {
    }
  }
  static toBSON(t) {
    return Wn.serialize(t);
  }
  static parseMessage(t) {
    const e = t?.data;
    if ("string" == typeof e) return JSON.parse(e);
    if ("undefined" != typeof Buffer && Buffer.isBuffer?.(e)) {
      const t2 = e;
      try {
        return JSON.parse(t2.toString("utf8"));
      } catch {
      }
      return Wn.deserialize(t2);
    }
    if (e instanceof ArrayBuffer) {
      const t2 = new Uint8Array(e);
      try {
        const e2 = new TextDecoder().decode(t2);
        return JSON.parse(e2);
      } catch {
      }
      return Wn.deserialize(t2);
    }
    if (fn(e)) {
      const t2 = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      try {
        const e2 = new TextDecoder().decode(t2);
        return JSON.parse(e2);
      } catch {
      }
      return Wn.deserialize(t2);
    }
    return e;
  }
};
var Cn = null;
try {
  Bn = "undefined" != typeof module && "function" == typeof module.require && module.require("worker_threads") || "function" == typeof __non_webpack_require__ && __non_webpack_require__("worker_threads") || "function" == typeof __require && __require("worker_threads");
  Cn = Bn.Worker;
} catch (t) {
}
var Bn;
function vn(t, e, n2) {
  var i2 = void 0 === e ? null : e, l2 = (function(t2, e2) {
    return Buffer.from(t2, "base64").toString(e2 ? "utf16" : "utf8");
  })(t, void 0 !== n2 && n2), o = l2.indexOf("\n", 10) + 1, c = l2.substring(o) + (i2 ? "//# sourceMappingURL=" + i2 : "");
  return function(t2) {
    return new Cn(c, Object.assign({}, t2, { eval: true }));
  };
}
function Mn(t, e, n2) {
  var i2 = void 0 === e ? null : e, l2 = (function(t2, e2) {
    var n3 = atob(t2);
    if (e2) {
      for (var i3 = new Uint8Array(n3.length), l3 = 0, o2 = n3.length; l3 < o2; ++l3) i3[l3] = n3.charCodeAt(l3);
      return new TextDecoder("utf-16le").decode(new Uint16Array(i3.buffer));
    }
    return n3;
  })(t, void 0 !== n2 && n2), o = l2.indexOf("\n", 10) + 1, c = l2.substring(o) + (i2 ? "//# sourceMappingURL=" + i2 : ""), a = new Blob([c], { type: "application/javascript" });
  return URL.createObjectURL(a);
}
var jn = "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0);
function Pn(t, e, n2) {
  return jn ? vn(t, e, n2) : /* @__PURE__ */ (function(t2, e2, n3) {
    var i2;
    return function(l2) {
      return i2 = i2 || Mn(t2, e2, n3), new Worker(i2, l2);
    };
  })(t, e, n2);
}
var Fn = Pn("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y29uc3QgZT1uZXcgVGV4dEVuY29kZXI7ZnVuY3Rpb24gdCh0LG4scil7dC5sZW5ndGg+NTA/ZnVuY3Rpb24odCxuLHIpe2UuZW5jb2RlSW50byh0LG4uc3ViYXJyYXkocikpfSh0LG4scik6ZnVuY3Rpb24oZSx0LG4pe2NvbnN0IHI9ZS5sZW5ndGg7bGV0IGk9bixvPTA7Zm9yKDtvPHI7KXtsZXQgbj1lLmNoYXJDb2RlQXQobysrKTtpZig0Mjk0OTY3MTY4Jm4pe2lmKDQyOTQ5NjUyNDgmbil7aWYobj49NTUyOTYmJm48PTU2MzE5JiZvPHIpe2NvbnN0IHQ9ZS5jaGFyQ29kZUF0KG8pOzU2MzIwPT0oNjQ1MTImdCkmJigrK28sbj0oKDEwMjMmbik8PDEwKSsoMTAyMyZ0KSs2NTUzNil9NDI5NDkwMTc2MCZuPyh0W2krK109bj4+MTgmN3wyNDAsdFtpKytdPW4+PjEyJjYzfDEyOCx0W2krK109bj4+NiY2M3wxMjgpOih0W2krK109bj4+MTImMTV8MjI0LHRbaSsrXT1uPj42JjYzfDEyOCl9ZWxzZSB0W2krK109bj4+NiYzMXwxOTI7dFtpKytdPTYzJm58MTI4fWVsc2UgdFtpKytdPW59fSh0LG4scil9bmV3IFRleHREZWNvZGVyO2NsYXNzIG57dHlwZTtkYXRhO2NvbnN0cnVjdG9yKGUsdCl7dGhpcy50eXBlPWUsdGhpcy5kYXRhPXR9fWNsYXNzIHIgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihlKXtzdXBlcihlKTtjb25zdCB0PU9iamVjdC5jcmVhdGUoci5wcm90b3R5cGUpO09iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLHQpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCJuYW1lIix7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITEsdmFsdWU6ci5uYW1lfSl9fWZ1bmN0aW9uIGkoZSx0LG4pe2NvbnN0IHI9TWF0aC5mbG9vcihuLzQyOTQ5NjcyOTYpLGk9bjtlLnNldFVpbnQzMih0LHIpLGUuc2V0VWludDMyKHQrNCxpKX1jb25zdCBvPTQyOTQ5NjcyOTUscz0xNzE3OTg2OTE4Mztjb25zdCBhPXt0eXBlOi0xLGVuY29kZTpmdW5jdGlvbihlKXtpZihlIGluc3RhbmNlb2YgRGF0ZSl7cmV0dXJuIGZ1bmN0aW9uKHtzZWM6ZSxuc2VjOnR9KXtpZihlPj0wJiZ0Pj0wJiZlPD1zKXtpZigwPT09dCYmZTw9byl7Y29uc3QgdD1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHQuYnVmZmVyKS5zZXRVaW50MzIoMCxlKSx0fXtjb25zdCBuPWUvNDI5NDk2NzI5NixyPTQyOTQ5NjcyOTUmZSxpPW5ldyBVaW50OEFycmF5KDgpLG89bmV3IERhdGFWaWV3KGkuYnVmZmVyKTtyZXR1cm4gby5zZXRVaW50MzIoMCx0PDwyfDMmbiksby5zZXRVaW50MzIoNCxyKSxpfX17Y29uc3Qgbj1uZXcgVWludDhBcnJheSgxMikscj1uZXcgRGF0YVZpZXcobi5idWZmZXIpO3JldHVybiByLnNldFVpbnQzMigwLHQpLGkociw0LGUpLG59fShmdW5jdGlvbihlKXtjb25zdCB0PWUuZ2V0VGltZSgpLG49TWF0aC5mbG9vcih0LzFlMykscj0xZTYqKHQtMWUzKm4pLGk9TWF0aC5mbG9vcihyLzFlOSk7cmV0dXJue3NlYzpuK2ksbnNlYzpyLTFlOSppfX0oZSkpfXJldHVybiBudWxsfSxkZWNvZGU6ZnVuY3Rpb24oZSl7Y29uc3QgdD1mdW5jdGlvbihlKXtjb25zdCB0PW5ldyBEYXRhVmlldyhlLmJ1ZmZlcixlLmJ5dGVPZmZzZXQsZS5ieXRlTGVuZ3RoKTtzd2l0Y2goZS5ieXRlTGVuZ3RoKXtjYXNlIDQ6cmV0dXJue3NlYzp0LmdldFVpbnQzMigwKSxuc2VjOjB9O2Nhc2UgODp7Y29uc3QgZT10LmdldFVpbnQzMigwKTtyZXR1cm57c2VjOjQyOTQ5NjcyOTYqKDMmZSkrdC5nZXRVaW50MzIoNCksbnNlYzplPj4+Mn19Y2FzZSAxMjp7Y29uc3QgZT1mdW5jdGlvbihlLHQpe3JldHVybiA0Mjk0OTY3Mjk2KmUuZ2V0SW50MzIodCkrZS5nZXRVaW50MzIodCs0KX0odCw0KTtyZXR1cm57c2VjOmUsbnNlYzp0LmdldFVpbnQzMigwKX19ZGVmYXVsdDp0aHJvdyBuZXcgcihgVW5yZWNvZ25pemVkIGRhdGEgc2l6ZSBmb3IgdGltZXN0YW1wIChleHBlY3RlZCA0LCA4LCBvciAxMik6ICR7ZS5sZW5ndGh9YCl9fShlKTtyZXR1cm4gbmV3IERhdGUoMWUzKnQuc2VjK3QubnNlYy8xZTYpfX07Y2xhc3MgY3tzdGF0aWMgZGVmYXVsdENvZGVjPW5ldyBjO19fYnJhbmQ7YnVpbHRJbkVuY29kZXJzPVtdO2J1aWx0SW5EZWNvZGVycz1bXTtlbmNvZGVycz1bXTtkZWNvZGVycz1bXTtjb25zdHJ1Y3Rvcigpe3RoaXMucmVnaXN0ZXIoYSl9cmVnaXN0ZXIoe3R5cGU6ZSxlbmNvZGU6dCxkZWNvZGU6bn0pe2lmKGU+PTApdGhpcy5lbmNvZGVyc1tlXT10LHRoaXMuZGVjb2RlcnNbZV09bjtlbHNle2NvbnN0IHI9LTEtZTt0aGlzLmJ1aWx0SW5FbmNvZGVyc1tyXT10LHRoaXMuYnVpbHRJbkRlY29kZXJzW3JdPW59fXRyeVRvRW5jb2RlKGUsdCl7Zm9yKGxldCByPTA7cjx0aGlzLmJ1aWx0SW5FbmNvZGVycy5sZW5ndGg7cisrKXtjb25zdCBpPXRoaXMuYnVpbHRJbkVuY29kZXJzW3JdO2lmKG51bGwhPWkpe2NvbnN0IG89aShlLHQpO2lmKG51bGwhPW8pe3JldHVybiBuZXcgbigtMS1yLG8pfX19Zm9yKGxldCByPTA7cjx0aGlzLmVuY29kZXJzLmxlbmd0aDtyKyspe2NvbnN0IGk9dGhpcy5lbmNvZGVyc1tyXTtpZihudWxsIT1pKXtjb25zdCBvPWkoZSx0KTtpZihudWxsIT1vKXtyZXR1cm4gbmV3IG4ocixvKX19fXJldHVybiBlIGluc3RhbmNlb2Ygbj9lOm51bGx9ZGVjb2RlKGUsdCxyKXtjb25zdCBpPXQ8MD90aGlzLmJ1aWx0SW5EZWNvZGVyc1stMS10XTp0aGlzLmRlY29kZXJzW3RdO3JldHVybiBpP2koZSx0LHIpOm5ldyBuKHQsZSl9fWZ1bmN0aW9uIGYoZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBVaW50OEFycmF5P2U6QXJyYXlCdWZmZXIuaXNWaWV3KGUpP25ldyBVaW50OEFycmF5KGUuYnVmZmVyLGUuYnl0ZU9mZnNldCxlLmJ5dGVMZW5ndGgpOmZ1bmN0aW9uKGUpe3JldHVybiBlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXJ8fCJ1bmRlZmluZWQiIT10eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXImJmUgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcn0oZSk/bmV3IFVpbnQ4QXJyYXkoZSk6VWludDhBcnJheS5mcm9tKGUpfWNsYXNzIGx7ZXh0ZW5zaW9uQ29kZWM7Y29udGV4dDt1c2VCaWdJbnQ2NDttYXhEZXB0aDtpbml0aWFsQnVmZmVyU2l6ZTtzb3J0S2V5cztmb3JjZUZsb2F0MzI7aWdub3JlVW5kZWZpbmVkO2ZvcmNlSW50ZWdlclRvRmxvYXQ7cG9zO3ZpZXc7Ynl0ZXM7ZW50ZXJlZD0hMTtjb25zdHJ1Y3RvcihlKXt0aGlzLmV4dGVuc2lvbkNvZGVjPWU/LmV4dGVuc2lvbkNvZGVjPz9jLmRlZmF1bHRDb2RlYyx0aGlzLmNvbnRleHQ9ZT8uY29udGV4dCx0aGlzLnVzZUJpZ0ludDY0PWU/LnVzZUJpZ0ludDY0Pz8hMSx0aGlzLm1heERlcHRoPWU/Lm1heERlcHRoPz8xMDAsdGhpcy5pbml0aWFsQnVmZmVyU2l6ZT1lPy5pbml0aWFsQnVmZmVyU2l6ZT8/MjA0OCx0aGlzLnNvcnRLZXlzPWU/LnNvcnRLZXlzPz8hMSx0aGlzLmZvcmNlRmxvYXQzMj1lPy5mb3JjZUZsb2F0MzI/PyExLHRoaXMuaWdub3JlVW5kZWZpbmVkPWU/Lmlnbm9yZVVuZGVmaW5lZD8/ITEsdGhpcy5mb3JjZUludGVnZXJUb0Zsb2F0PWU/LmZvcmNlSW50ZWdlclRvRmxvYXQ/PyExLHRoaXMucG9zPTAsdGhpcy52aWV3PW5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIodGhpcy5pbml0aWFsQnVmZmVyU2l6ZSkpLHRoaXMuYnl0ZXM9bmV3IFVpbnQ4QXJyYXkodGhpcy52aWV3LmJ1ZmZlcil9Y2xvbmUoKXtyZXR1cm4gbmV3IGwoe2V4dGVuc2lvbkNvZGVjOnRoaXMuZXh0ZW5zaW9uQ29kZWMsY29udGV4dDp0aGlzLmNvbnRleHQsdXNlQmlnSW50NjQ6dGhpcy51c2VCaWdJbnQ2NCxtYXhEZXB0aDp0aGlzLm1heERlcHRoLGluaXRpYWxCdWZmZXJTaXplOnRoaXMuaW5pdGlhbEJ1ZmZlclNpemUsc29ydEtleXM6dGhpcy5zb3J0S2V5cyxmb3JjZUZsb2F0MzI6dGhpcy5mb3JjZUZsb2F0MzIsaWdub3JlVW5kZWZpbmVkOnRoaXMuaWdub3JlVW5kZWZpbmVkLGZvcmNlSW50ZWdlclRvRmxvYXQ6dGhpcy5mb3JjZUludGVnZXJUb0Zsb2F0fSl9cmVpbml0aWFsaXplU3RhdGUoKXt0aGlzLnBvcz0wfWVuY29kZVNoYXJlZFJlZihlKXtpZih0aGlzLmVudGVyZWQpe3JldHVybiB0aGlzLmNsb25lKCkuZW5jb2RlU2hhcmVkUmVmKGUpfXRyeXtyZXR1cm4gdGhpcy5lbnRlcmVkPSEwLHRoaXMucmVpbml0aWFsaXplU3RhdGUoKSx0aGlzLmRvRW5jb2RlKGUsMSksdGhpcy5ieXRlcy5zdWJhcnJheSgwLHRoaXMucG9zKX1maW5hbGx5e3RoaXMuZW50ZXJlZD0hMX19ZW5jb2RlKGUpe2lmKHRoaXMuZW50ZXJlZCl7cmV0dXJuIHRoaXMuY2xvbmUoKS5lbmNvZGUoZSl9dHJ5e3JldHVybiB0aGlzLmVudGVyZWQ9ITAsdGhpcy5yZWluaXRpYWxpemVTdGF0ZSgpLHRoaXMuZG9FbmNvZGUoZSwxKSx0aGlzLmJ5dGVzLnNsaWNlKDAsdGhpcy5wb3MpfWZpbmFsbHl7dGhpcy5lbnRlcmVkPSExfX1kb0VuY29kZShlLHQpe2lmKHQ+dGhpcy5tYXhEZXB0aCl0aHJvdyBuZXcgRXJyb3IoYFRvbyBkZWVwIG9iamVjdHMgaW4gZGVwdGggJHt0fWApO251bGw9PWU/dGhpcy5lbmNvZGVOaWwoKToiYm9vbGVhbiI9PXR5cGVvZiBlP3RoaXMuZW5jb2RlQm9vbGVhbihlKToibnVtYmVyIj09dHlwZW9mIGU/dGhpcy5mb3JjZUludGVnZXJUb0Zsb2F0P3RoaXMuZW5jb2RlTnVtYmVyQXNGbG9hdChlKTp0aGlzLmVuY29kZU51bWJlcihlKToic3RyaW5nIj09dHlwZW9mIGU/dGhpcy5lbmNvZGVTdHJpbmcoZSk6dGhpcy51c2VCaWdJbnQ2NCYmImJpZ2ludCI9PXR5cGVvZiBlP3RoaXMuZW5jb2RlQmlnSW50NjQoZSk6dGhpcy5lbmNvZGVPYmplY3QoZSx0KX1lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZShlKXtjb25zdCB0PXRoaXMucG9zK2U7dGhpcy52aWV3LmJ5dGVMZW5ndGg8dCYmdGhpcy5yZXNpemVCdWZmZXIoMip0KX1yZXNpemVCdWZmZXIoZSl7Y29uc3QgdD1uZXcgQXJyYXlCdWZmZXIoZSksbj1uZXcgVWludDhBcnJheSh0KSxyPW5ldyBEYXRhVmlldyh0KTtuLnNldCh0aGlzLmJ5dGVzKSx0aGlzLnZpZXc9cix0aGlzLmJ5dGVzPW59ZW5jb2RlTmlsKCl7dGhpcy53cml0ZVU4KDE5Mil9ZW5jb2RlQm9vbGVhbihlKXshMT09PWU/dGhpcy53cml0ZVU4KDE5NCk6dGhpcy53cml0ZVU4KDE5NSl9ZW5jb2RlTnVtYmVyKGUpeyF0aGlzLmZvcmNlSW50ZWdlclRvRmxvYXQmJk51bWJlci5pc1NhZmVJbnRlZ2VyKGUpP2U+PTA/ZTwxMjg/dGhpcy53cml0ZVU4KGUpOmU8MjU2Pyh0aGlzLndyaXRlVTgoMjA0KSx0aGlzLndyaXRlVTgoZSkpOmU8NjU1MzY/KHRoaXMud3JpdGVVOCgyMDUpLHRoaXMud3JpdGVVMTYoZSkpOmU8NDI5NDk2NzI5Nj8odGhpcy53cml0ZVU4KDIwNiksdGhpcy53cml0ZVUzMihlKSk6dGhpcy51c2VCaWdJbnQ2ND90aGlzLmVuY29kZU51bWJlckFzRmxvYXQoZSk6KHRoaXMud3JpdGVVOCgyMDcpLHRoaXMud3JpdGVVNjQoZSkpOmU+PS0zMj90aGlzLndyaXRlVTgoMjI0fGUrMzIpOmU+PS0xMjg/KHRoaXMud3JpdGVVOCgyMDgpLHRoaXMud3JpdGVJOChlKSk6ZT49LTMyNzY4Pyh0aGlzLndyaXRlVTgoMjA5KSx0aGlzLndyaXRlSTE2KGUpKTplPj0tMjE0NzQ4MzY0OD8odGhpcy53cml0ZVU4KDIxMCksdGhpcy53cml0ZUkzMihlKSk6dGhpcy51c2VCaWdJbnQ2ND90aGlzLmVuY29kZU51bWJlckFzRmxvYXQoZSk6KHRoaXMud3JpdGVVOCgyMTEpLHRoaXMud3JpdGVJNjQoZSkpOnRoaXMuZW5jb2RlTnVtYmVyQXNGbG9hdChlKX1lbmNvZGVOdW1iZXJBc0Zsb2F0KGUpe3RoaXMuZm9yY2VGbG9hdDMyPyh0aGlzLndyaXRlVTgoMjAyKSx0aGlzLndyaXRlRjMyKGUpKToodGhpcy53cml0ZVU4KDIwMyksdGhpcy53cml0ZUY2NChlKSl9ZW5jb2RlQmlnSW50NjQoZSl7ZT49QmlnSW50KDApPyh0aGlzLndyaXRlVTgoMjA3KSx0aGlzLndyaXRlQmlnVWludDY0KGUpKToodGhpcy53cml0ZVU4KDIxMSksdGhpcy53cml0ZUJpZ0ludDY0KGUpKX13cml0ZVN0cmluZ0hlYWRlcihlKXtpZihlPDMyKXRoaXMud3JpdGVVOCgxNjArZSk7ZWxzZSBpZihlPDI1Nil0aGlzLndyaXRlVTgoMjE3KSx0aGlzLndyaXRlVTgoZSk7ZWxzZSBpZihlPDY1NTM2KXRoaXMud3JpdGVVOCgyMTgpLHRoaXMud3JpdGVVMTYoZSk7ZWxzZXtpZighKGU8NDI5NDk2NzI5NikpdGhyb3cgbmV3IEVycm9yKGBUb28gbG9uZyBzdHJpbmc6ICR7ZX0gYnl0ZXMgaW4gVVRGLThgKTt0aGlzLndyaXRlVTgoMjE5KSx0aGlzLndyaXRlVTMyKGUpfX1lbmNvZGVTdHJpbmcoZSl7Y29uc3Qgbj1mdW5jdGlvbihlKXtjb25zdCB0PWUubGVuZ3RoO2xldCBuPTAscj0wO2Zvcig7cjx0Oyl7bGV0IGk9ZS5jaGFyQ29kZUF0KHIrKyk7aWYoNDI5NDk2NzE2OCZpKWlmKDQyOTQ5NjUyNDgmaSl7aWYoaT49NTUyOTYmJmk8PTU2MzE5JiZyPHQpe2NvbnN0IHQ9ZS5jaGFyQ29kZUF0KHIpOzU2MzIwPT0oNjQ1MTImdCkmJigrK3IsaT0oKDEwMjMmaSk8PDEwKSsoMTAyMyZ0KSs2NTUzNil9bis9NDI5NDkwMTc2MCZpPzQ6M31lbHNlIG4rPTI7ZWxzZSBuKyt9cmV0dXJuIG59KGUpO3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoNStuKSx0aGlzLndyaXRlU3RyaW5nSGVhZGVyKG4pLHQoZSx0aGlzLmJ5dGVzLHRoaXMucG9zKSx0aGlzLnBvcys9bn1lbmNvZGVPYmplY3QoZSx0KXtjb25zdCBuPXRoaXMuZXh0ZW5zaW9uQ29kZWMudHJ5VG9FbmNvZGUoZSx0aGlzLmNvbnRleHQpO2lmKG51bGwhPW4pdGhpcy5lbmNvZGVFeHRlbnNpb24obik7ZWxzZSBpZihBcnJheS5pc0FycmF5KGUpKXRoaXMuZW5jb2RlQXJyYXkoZSx0KTtlbHNlIGlmKEFycmF5QnVmZmVyLmlzVmlldyhlKSl0aGlzLmVuY29kZUJpbmFyeShlKTtlbHNle2lmKCJvYmplY3QiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoYFVucmVjb2duaXplZCBvYmplY3Q6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShlKX1gKTt0aGlzLmVuY29kZU1hcChlLHQpfX1lbmNvZGVCaW5hcnkoZSl7Y29uc3QgdD1lLmJ5dGVMZW5ndGg7aWYodDwyNTYpdGhpcy53cml0ZVU4KDE5NiksdGhpcy53cml0ZVU4KHQpO2Vsc2UgaWYodDw2NTUzNil0aGlzLndyaXRlVTgoMTk3KSx0aGlzLndyaXRlVTE2KHQpO2Vsc2V7aWYoISh0PDQyOTQ5NjcyOTYpKXRocm93IG5ldyBFcnJvcihgVG9vIGxhcmdlIGJpbmFyeTogJHt0fWApO3RoaXMud3JpdGVVOCgxOTgpLHRoaXMud3JpdGVVMzIodCl9Y29uc3Qgbj1mKGUpO3RoaXMud3JpdGVVOGEobil9ZW5jb2RlQXJyYXkoZSx0KXtjb25zdCBuPWUubGVuZ3RoO2lmKG48MTYpdGhpcy53cml0ZVU4KDE0NCtuKTtlbHNlIGlmKG48NjU1MzYpdGhpcy53cml0ZVU4KDIyMCksdGhpcy53cml0ZVUxNihuKTtlbHNle2lmKCEobjw0Mjk0OTY3Mjk2KSl0aHJvdyBuZXcgRXJyb3IoYFRvbyBsYXJnZSBhcnJheTogJHtufWApO3RoaXMud3JpdGVVOCgyMjEpLHRoaXMud3JpdGVVMzIobil9Zm9yKGNvbnN0IG4gb2YgZSl0aGlzLmRvRW5jb2RlKG4sdCsxKX1jb3VudFdpdGhvdXRVbmRlZmluZWQoZSx0KXtsZXQgbj0wO2Zvcihjb25zdCByIG9mIHQpdm9pZCAwIT09ZVtyXSYmbisrO3JldHVybiBufWVuY29kZU1hcChlLHQpe2NvbnN0IG49T2JqZWN0LmtleXMoZSk7dGhpcy5zb3J0S2V5cyYmbi5zb3J0KCk7Y29uc3Qgcj10aGlzLmlnbm9yZVVuZGVmaW5lZD90aGlzLmNvdW50V2l0aG91dFVuZGVmaW5lZChlLG4pOm4ubGVuZ3RoO2lmKHI8MTYpdGhpcy53cml0ZVU4KDEyOCtyKTtlbHNlIGlmKHI8NjU1MzYpdGhpcy53cml0ZVU4KDIyMiksdGhpcy53cml0ZVUxNihyKTtlbHNle2lmKCEocjw0Mjk0OTY3Mjk2KSl0aHJvdyBuZXcgRXJyb3IoYFRvbyBsYXJnZSBtYXAgb2JqZWN0OiAke3J9YCk7dGhpcy53cml0ZVU4KDIyMyksdGhpcy53cml0ZVUzMihyKX1mb3IoY29uc3QgciBvZiBuKXtjb25zdCBuPWVbcl07dGhpcy5pZ25vcmVVbmRlZmluZWQmJnZvaWQgMD09PW58fCh0aGlzLmVuY29kZVN0cmluZyhyKSx0aGlzLmRvRW5jb2RlKG4sdCsxKSl9fWVuY29kZUV4dGVuc2lvbihlKXtpZigiZnVuY3Rpb24iPT10eXBlb2YgZS5kYXRhKXtjb25zdCB0PWUuZGF0YSh0aGlzLnBvcys2KSxuPXQubGVuZ3RoO2lmKG4+PTQyOTQ5NjcyOTYpdGhyb3cgbmV3IEVycm9yKGBUb28gbGFyZ2UgZXh0ZW5zaW9uIG9iamVjdDogJHtufWApO3JldHVybiB0aGlzLndyaXRlVTgoMjAxKSx0aGlzLndyaXRlVTMyKG4pLHRoaXMud3JpdGVJOChlLnR5cGUpLHZvaWQgdGhpcy53cml0ZVU4YSh0KX1jb25zdCB0PWUuZGF0YS5sZW5ndGg7aWYoMT09PXQpdGhpcy53cml0ZVU4KDIxMik7ZWxzZSBpZigyPT09dCl0aGlzLndyaXRlVTgoMjEzKTtlbHNlIGlmKDQ9PT10KXRoaXMud3JpdGVVOCgyMTQpO2Vsc2UgaWYoOD09PXQpdGhpcy53cml0ZVU4KDIxNSk7ZWxzZSBpZigxNj09PXQpdGhpcy53cml0ZVU4KDIxNik7ZWxzZSBpZih0PDI1Nil0aGlzLndyaXRlVTgoMTk5KSx0aGlzLndyaXRlVTgodCk7ZWxzZSBpZih0PDY1NTM2KXRoaXMud3JpdGVVOCgyMDApLHRoaXMud3JpdGVVMTYodCk7ZWxzZXtpZighKHQ8NDI5NDk2NzI5NikpdGhyb3cgbmV3IEVycm9yKGBUb28gbGFyZ2UgZXh0ZW5zaW9uIG9iamVjdDogJHt0fWApO3RoaXMud3JpdGVVOCgyMDEpLHRoaXMud3JpdGVVMzIodCl9dGhpcy53cml0ZUk4KGUudHlwZSksdGhpcy53cml0ZVU4YShlLmRhdGEpfXdyaXRlVTgoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSgxKSx0aGlzLnZpZXcuc2V0VWludDgodGhpcy5wb3MsZSksdGhpcy5wb3MrK313cml0ZVU4YShlKXtjb25zdCB0PWUubGVuZ3RoO3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUodCksdGhpcy5ieXRlcy5zZXQoZSx0aGlzLnBvcyksdGhpcy5wb3MrPXR9d3JpdGVJOChlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDEpLHRoaXMudmlldy5zZXRJbnQ4KHRoaXMucG9zLGUpLHRoaXMucG9zKyt9d3JpdGVVMTYoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSgyKSx0aGlzLnZpZXcuc2V0VWludDE2KHRoaXMucG9zLGUpLHRoaXMucG9zKz0yfXdyaXRlSTE2KGUpe3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoMiksdGhpcy52aWV3LnNldEludDE2KHRoaXMucG9zLGUpLHRoaXMucG9zKz0yfXdyaXRlVTMyKGUpe3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoNCksdGhpcy52aWV3LnNldFVpbnQzMih0aGlzLnBvcyxlKSx0aGlzLnBvcys9NH13cml0ZUkzMihlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDQpLHRoaXMudmlldy5zZXRJbnQzMih0aGlzLnBvcyxlKSx0aGlzLnBvcys9NH13cml0ZUYzMihlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDQpLHRoaXMudmlldy5zZXRGbG9hdDMyKHRoaXMucG9zLGUpLHRoaXMucG9zKz00fXdyaXRlRjY0KGUpe3RoaXMuZW5zdXJlQnVmZmVyU2l6ZVRvV3JpdGUoOCksdGhpcy52aWV3LnNldEZsb2F0NjQodGhpcy5wb3MsZSksdGhpcy5wb3MrPTh9d3JpdGVVNjQoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSg4KSxmdW5jdGlvbihlLHQsbil7Y29uc3Qgcj1uLzQyOTQ5NjcyOTYsaT1uO2Uuc2V0VWludDMyKHQsciksZS5zZXRVaW50MzIodCs0LGkpfSh0aGlzLnZpZXcsdGhpcy5wb3MsZSksdGhpcy5wb3MrPTh9d3JpdGVJNjQoZSl7dGhpcy5lbnN1cmVCdWZmZXJTaXplVG9Xcml0ZSg4KSxpKHRoaXMudmlldyx0aGlzLnBvcyxlKSx0aGlzLnBvcys9OH13cml0ZUJpZ1VpbnQ2NChlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDgpLHRoaXMudmlldy5zZXRCaWdVaW50NjQodGhpcy5wb3MsZSksdGhpcy5wb3MrPTh9d3JpdGVCaWdJbnQ2NChlKXt0aGlzLmVuc3VyZUJ1ZmZlclNpemVUb1dyaXRlKDgpLHRoaXMudmlldy5zZXRCaWdJbnQ2NCh0aGlzLnBvcyxlKSx0aGlzLnBvcys9OH19dHJ5e2lmKCJ1bmRlZmluZWQiPT10eXBlb2YgZmV0Y2gmJiJ1bmRlZmluZWQiIT10eXBlb2YgcHJvY2VzcyYmcHJvY2Vzcy52ZXJzaW9ucz8ubm9kZSl7bmV3IEZ1bmN0aW9uKCJtIiwicmV0dXJuIGltcG9ydChtKSIpKCJjcm9zcy1mZXRjaC9wb2x5ZmlsbCIpLmNhdGNoKCgoKT0+e30pKX19Y2F0Y2h7fXRyeXtpZigidW5kZWZpbmVkIiE9dHlwZW9mIHByb2Nlc3MmJnByb2Nlc3MudmVyc2lvbnM/Lm5vZGUmJiJ3aW4zMiI9PT1wcm9jZXNzLnBsYXRmb3JtKXtuZXcgRnVuY3Rpb24oIm0iLCJyZXR1cm4gaW1wb3J0KG0pIikoIndpbi1jYSIpfX1jYXRjaHt9Y29uc3QgdT0oKCk9Pntjb25zdCBlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkucHJvdG90eXBlKSxTeW1ib2wudG9TdHJpbmdUYWcpLmdldDtyZXR1cm4gdD0+ZS5jYWxsKHQpfSkoKTtmdW5jdGlvbiBfKGUpe3JldHVybiJVaW50OEFycmF5Ij09PXUoZSl9ZnVuY3Rpb24gZyhlKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIGUmJm51bGwhPWUmJlN5bWJvbC50b1N0cmluZ1RhZyBpbiBlJiYoIkFycmF5QnVmZmVyIj09PWVbU3ltYm9sLnRvU3RyaW5nVGFnXXx8IlNoYXJlZEFycmF5QnVmZmVyIj09PWVbU3ltYm9sLnRvU3RyaW5nVGFnXSl9ZnVuY3Rpb24gaChlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIFJlZ0V4cHx8IltvYmplY3QgUmVnRXhwXSI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9ZnVuY3Rpb24gYihlKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIGUmJm51bGwhPWUmJlN5bWJvbC50b1N0cmluZ1RhZyBpbiBlJiYiTWFwIj09PWVbU3ltYm9sLnRvU3RyaW5nVGFnXX1mdW5jdGlvbiBkKGUpe3JldHVybiBlIGluc3RhbmNlb2YgRGF0ZXx8IltvYmplY3QgRGF0ZV0iPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfWZ1bmN0aW9uIHcoZSx0KXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSwoKGUsdCk9PiJiaWdpbnQiPT10eXBlb2YgdD97JG51bWJlckxvbmc6YCR7dH1gfTpiKHQpP09iamVjdC5mcm9tRW50cmllcyh0KTp0KSl9Y29uc3QgcD03LHk9U3ltYm9sLmZvcigiQEBtZGIuYnNvbi52ZXJzaW9uIiksbT0yMTQ3NDgzNjQ3LFM9LTIxNDc0ODM2NDgsQj1NYXRoLnBvdygyLDYzKS0xLHg9LU1hdGgucG93KDIsNjMpLEU9TWF0aC5wb3coMiw1MyksVT0tTWF0aC5wb3coMiw1MyksTz0xLE49MixJPTMsdj00LFQ9NSwkPTYsTD03LEE9OCxSPTksaj0xMCxGPTExLGs9MTIsej0xMyxEPTE0LEM9MTUsTT0xNixWPTE3LFA9MTgsSj0xOSxXPTI1NSxZPTEyNyxxPTAsSD00LEs9T2JqZWN0LmZyZWV6ZSh7ZG91YmxlOjEsc3RyaW5nOjIsb2JqZWN0OjMsYXJyYXk6NCxiaW5EYXRhOjUsdW5kZWZpbmVkOjYsb2JqZWN0SWQ6Nyxib29sOjgsZGF0ZTo5LG51bGw6MTAscmVnZXg6MTEsZGJQb2ludGVyOjEyLGphdmFzY3JpcHQ6MTMsc3ltYm9sOjE0LGphdmFzY3JpcHRXaXRoU2NvcGU6MTUsaW50OjE2LHRpbWVzdGFtcDoxNyxsb25nOjE4LGRlY2ltYWw6MTksbWluS2V5Oi0xLG1heEtleToxMjd9KTtjbGFzcyBaIGV4dGVuZHMgRXJyb3J7Z2V0IGJzb25FcnJvcigpe3JldHVybiEwfWdldCBuYW1lKCl7cmV0dXJuIkJTT05FcnJvciJ9Y29uc3RydWN0b3IoZSx0KXtzdXBlcihlLHQpfXN0YXRpYyBpc0JTT05FcnJvcihlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiYnNvbkVycm9yImluIGUmJiEwPT09ZS5ic29uRXJyb3ImJiJuYW1lImluIGUmJiJtZXNzYWdlImluIGUmJiJzdGFjayJpbiBlfX1jbGFzcyBHIGV4dGVuZHMgWntnZXQgbmFtZSgpe3JldHVybiJCU09OVmVyc2lvbkVycm9yIn1jb25zdHJ1Y3Rvcigpe3N1cGVyKGBVbnN1cHBvcnRlZCBCU09OIHZlcnNpb24sIGJzb24gdHlwZXMgbXVzdCBiZSBmcm9tIGJzb24gJHtwfS54LnhgKX19Y2xhc3MgWCBleHRlbmRzIFp7Z2V0IG5hbWUoKXtyZXR1cm4iQlNPTlJ1bnRpbWVFcnJvciJ9Y29uc3RydWN0b3IoZSl7c3VwZXIoZSl9fWNsYXNzIFEgZXh0ZW5kcyBae2dldCBuYW1lKCl7cmV0dXJuIkJTT05PZmZzZXRFcnJvciJ9b2Zmc2V0O2NvbnN0cnVjdG9yKGUsdCxuKXtzdXBlcihgJHtlfS4gb2Zmc2V0OiAke3R9YCxuKSx0aGlzLm9mZnNldD10fX1sZXQgZWUsdGU7ZnVuY3Rpb24gbmUoZSx0LG4scil7aWYocil7ZWU/Pz1uZXcgVGV4dERlY29kZXIoInV0ZjgiLHtmYXRhbDohMH0pO3RyeXtyZXR1cm4gZWUuZGVjb2RlKGUuc3ViYXJyYXkodCxuKSl9Y2F0Y2goZSl7dGhyb3cgbmV3IFooIkludmFsaWQgVVRGLTggc3RyaW5nIGluIEJTT04gZG9jdW1lbnQiLHtjYXVzZTplfSl9fXJldHVybiB0ZT8/PW5ldyBUZXh0RGVjb2RlcigidXRmOCIse2ZhdGFsOiExfSksdGUuZGVjb2RlKGUuc3ViYXJyYXkodCxuKSl9ZnVuY3Rpb24gcmUoZSx0LG4pe2lmKDA9PT1lLmxlbmd0aClyZXR1cm4iIjtjb25zdCByPW4tdDtpZigwPT09cilyZXR1cm4iIjtpZihyPjIwKXJldHVybiBudWxsO2lmKDE9PT1yJiZlW3RdPDEyOClyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlW3RdKTtpZigyPT09ciYmZVt0XTwxMjgmJmVbdCsxXTwxMjgpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZVt0XSkrU3RyaW5nLmZyb21DaGFyQ29kZShlW3QrMV0pO2lmKDM9PT1yJiZlW3RdPDEyOCYmZVt0KzFdPDEyOCYmZVt0KzJdPDEyOClyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlW3RdKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbdCsxXSkrU3RyaW5nLmZyb21DaGFyQ29kZShlW3QrMl0pO2NvbnN0IGk9W107Zm9yKGxldCByPXQ7cjxuO3IrKyl7Y29uc3QgdD1lW3JdO2lmKHQ+MTI3KXJldHVybiBudWxsO2kucHVzaCh0KX1yZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5pKX1mdW5jdGlvbiBpZShlKXtyZXR1cm4gYWUuZnJvbU51bWJlckFycmF5KEFycmF5LmZyb20oe2xlbmd0aDplfSwoKCk9Pk1hdGguZmxvb3IoMjU2Kk1hdGgucmFuZG9tKCkpKSkpfWZ1bmN0aW9uIG9lKGUpe3JldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFlLmFsbG9jYXRlKGUpKX1jb25zdCBzZT0oKCk9Pntjb25zdHtjcnlwdG86ZX09Z2xvYmFsVGhpcztyZXR1cm4gbnVsbCE9ZSYmImZ1bmN0aW9uIj09dHlwZW9mIGUuZ2V0UmFuZG9tVmFsdWVzP29lOmllfSkoKSxhZT17aXNVaW50OEFycmF5Ol8sdG9Mb2NhbEJ1ZmZlclR5cGUoZSl7aWYoQnVmZmVyLmlzQnVmZmVyKGUpKXJldHVybiBlO2lmKEFycmF5QnVmZmVyLmlzVmlldyhlKSlyZXR1cm4gQnVmZmVyLmZyb20oZS5idWZmZXIsZS5ieXRlT2Zmc2V0LGUuYnl0ZUxlbmd0aCk7Y29uc3QgdD1lPy5bU3ltYm9sLnRvU3RyaW5nVGFnXT8/T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpO2lmKCJBcnJheUJ1ZmZlciI9PT10fHwiU2hhcmVkQXJyYXlCdWZmZXIiPT09dHx8IltvYmplY3QgQXJyYXlCdWZmZXJdIj09PXR8fCJbb2JqZWN0IFNoYXJlZEFycmF5QnVmZmVyXSI9PT10KXJldHVybiBCdWZmZXIuZnJvbShlKTt0aHJvdyBuZXcgWigiQ2Fubm90IGNyZWF0ZSBCdWZmZXIgZnJvbSB0aGUgcGFzc2VkIHBvdGVudGlhbEJ1ZmZlci4iKX0sYWxsb2NhdGU6ZT0+QnVmZmVyLmFsbG9jKGUpLGFsbG9jYXRlVW5zYWZlOmU9PkJ1ZmZlci5hbGxvY1Vuc2FmZShlKSxjb21wYXJlOihlLHQpPT5hZS50b0xvY2FsQnVmZmVyVHlwZShlKS5jb21wYXJlKHQpLGNvbmNhdDplPT5CdWZmZXIuY29uY2F0KGUpLGNvcHk6KGUsdCxuLHIsaSk9PmFlLnRvTG9jYWxCdWZmZXJUeXBlKGUpLmNvcHkodCxuPz8wLHI/PzAsaT8/ZS5sZW5ndGgpLGVxdWFsczooZSx0KT0+YWUudG9Mb2NhbEJ1ZmZlclR5cGUoZSkuZXF1YWxzKHQpLGZyb21OdW1iZXJBcnJheTplPT5CdWZmZXIuZnJvbShlKSxmcm9tQmFzZTY0OmU9PkJ1ZmZlci5mcm9tKGUsImJhc2U2NCIpLGZyb21VVEY4OmU9PkJ1ZmZlci5mcm9tKGUsInV0ZjgiKSx0b0Jhc2U2NDplPT5hZS50b0xvY2FsQnVmZmVyVHlwZShlKS50b1N0cmluZygiYmFzZTY0IiksZnJvbUlTTzg4NTkxOmU9PkJ1ZmZlci5mcm9tKGUsImJpbmFyeSIpLHRvSVNPODg1OTE6ZT0+YWUudG9Mb2NhbEJ1ZmZlclR5cGUoZSkudG9TdHJpbmcoImJpbmFyeSIpLGZyb21IZXg6ZT0+QnVmZmVyLmZyb20oZSwiaGV4IiksdG9IZXg6ZT0+YWUudG9Mb2NhbEJ1ZmZlclR5cGUoZSkudG9TdHJpbmcoImhleCIpLHRvVVRGOChlLHQsbixyKXtjb25zdCBpPW4tdDw9MjA/cmUoZSx0LG4pOm51bGw7aWYobnVsbCE9aSlyZXR1cm4gaTtjb25zdCBvPWFlLnRvTG9jYWxCdWZmZXJUeXBlKGUpLnRvU3RyaW5nKCJ1dGY4Iix0LG4pO2lmKHIpZm9yKGxldCByPTA7cjxvLmxlbmd0aDtyKyspaWYoNjU1MzM9PT1vLmNoYXJDb2RlQXQocikpe25lKGUsdCxuLCEwKTticmVha31yZXR1cm4gb30sdXRmOEJ5dGVMZW5ndGg6ZT0+QnVmZmVyLmJ5dGVMZW5ndGgoZSwidXRmOCIpLGVuY29kZVVURjhJbnRvKGUsdCxuKXtjb25zdCByPWZ1bmN0aW9uKGUsdCxuKXtpZigwPT09dC5sZW5ndGgpcmV0dXJuIDA7aWYodC5sZW5ndGg+MjUpcmV0dXJuIG51bGw7aWYoZS5sZW5ndGgtbjx0Lmxlbmd0aClyZXR1cm4gbnVsbDtmb3IobGV0IHI9MCxpPW47cjx0Lmxlbmd0aDtyKyssaSsrKXtjb25zdCBuPXQuY2hhckNvZGVBdChyKTtpZihuPjEyNylyZXR1cm4gbnVsbDtlW2ldPW59cmV0dXJuIHQubGVuZ3RofShlLHQsbik7cmV0dXJuIG51bGwhPXI/cjphZS50b0xvY2FsQnVmZmVyVHlwZShlKS53cml0ZSh0LG4sdm9pZCAwLCJ1dGY4Iil9LHJhbmRvbUJ5dGVzOnNlLHN3YXAzMjplPT5hZS50b0xvY2FsQnVmZmVyVHlwZShlKS5zd2FwMzIoKX07ZnVuY3Rpb24gY2UoZSl7aWYoZTwwKXRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgYXJndW1lbnQgJ2J5dGVMZW5ndGgnIGlzIGludmFsaWQuIFJlY2VpdmVkICR7ZX1gKTtyZXR1cm4gdWUuZnJvbU51bWJlckFycmF5KEFycmF5LmZyb20oe2xlbmd0aDplfSwoKCk9Pk1hdGguZmxvb3IoMjU2Kk1hdGgucmFuZG9tKCkpKSkpfWNvbnN0IGZlPSgoKT0+e2NvbnN0e2NyeXB0bzplfT1nbG9iYWxUaGlzO2lmKG51bGwhPWUmJiJmdW5jdGlvbiI9PXR5cGVvZiBlLmdldFJhbmRvbVZhbHVlcylyZXR1cm4gdD0+ZS5nZXRSYW5kb21WYWx1ZXModWUuYWxsb2NhdGUodCkpO2lmKGZ1bmN0aW9uKCl7Y29uc3R7bmF2aWdhdG9yOmV9PWdsb2JhbFRoaXM7cmV0dXJuIm9iamVjdCI9PXR5cGVvZiBlJiYiUmVhY3ROYXRpdmUiPT09ZS5wcm9kdWN0fSgpKXtjb25zdHtjb25zb2xlOmV9PWdsb2JhbFRoaXM7ZT8ud2Fybj8uKCJCU09OOiBGb3IgUmVhY3QgTmF0aXZlIHBsZWFzZSBwb2x5ZmlsbCBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLCBlLmcuIHVzaW5nOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9yZWFjdC1uYXRpdmUtZ2V0LXJhbmRvbS12YWx1ZXMuIil9cmV0dXJuIGNlfSkoKSxsZT0vKFxkfFthLWZdKS9pLHVlPXtpc1VpbnQ4QXJyYXk6Xyx0b0xvY2FsQnVmZmVyVHlwZShlKXtjb25zdCB0PWU/LltTeW1ib2wudG9TdHJpbmdUYWddPz9PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk7aWYoIlVpbnQ4QXJyYXkiPT09dClyZXR1cm4gZTtpZihBcnJheUJ1ZmZlci5pc1ZpZXcoZSkpcmV0dXJuIG5ldyBVaW50OEFycmF5KGUuYnVmZmVyLnNsaWNlKGUuYnl0ZU9mZnNldCxlLmJ5dGVPZmZzZXQrZS5ieXRlTGVuZ3RoKSk7aWYoIkFycmF5QnVmZmVyIj09PXR8fCJTaGFyZWRBcnJheUJ1ZmZlciI9PT10fHwiW29iamVjdCBBcnJheUJ1ZmZlcl0iPT09dHx8IltvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdIj09PXQpcmV0dXJuIG5ldyBVaW50OEFycmF5KGUpO3Rocm93IG5ldyBaKCJDYW5ub3QgbWFrZSBhIFVpbnQ4QXJyYXkgZnJvbSBwYXNzZWQgcG90ZW50aWFsQnVmZmVyLiIpfSxhbGxvY2F0ZShlKXtpZigibnVtYmVyIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICJzaXplIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCAke1N0cmluZyhlKX1gKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LGFsbG9jYXRlVW5zYWZlOmU9PnVlLmFsbG9jYXRlKGUpLGNvbXBhcmUoZSx0KXtpZihlPT09dClyZXR1cm4gMDtjb25zdCBuPU1hdGgubWluKGUubGVuZ3RoLHQubGVuZ3RoKTtmb3IobGV0IHI9MDtyPG47cisrKXtpZihlW3JdPHRbcl0pcmV0dXJuLTE7aWYoZVtyXT50W3JdKXJldHVybiAxfXJldHVybiBlLmxlbmd0aDx0Lmxlbmd0aD8tMTplLmxlbmd0aD50Lmxlbmd0aD8xOjB9LGNvbmNhdChlKXtpZigwPT09ZS5sZW5ndGgpcmV0dXJuIHVlLmFsbG9jYXRlKDApO2xldCB0PTA7Zm9yKGNvbnN0IG4gb2YgZSl0Kz1uLmxlbmd0aDtjb25zdCBuPXVlLmFsbG9jYXRlKHQpO2xldCByPTA7Zm9yKGNvbnN0IHQgb2YgZSluLnNldCh0LHIpLHIrPXQubGVuZ3RoO3JldHVybiBufSxjb3B5KGUsdCxuLHIsaSl7aWYodm9pZCAwIT09aSYmaTwwKXRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgdmFsdWUgb2YgInNvdXJjZUVuZCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlID49IDAuIFJlY2VpdmVkICR7aX1gKTtpZihpPWk/P2UubGVuZ3RoLHZvaWQgMCE9PXImJihyPDB8fHI+aSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFRoZSB2YWx1ZSBvZiAic291cmNlU3RhcnQiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSA+PSAwIGFuZCA8PSAke2l9LiBSZWNlaXZlZCAke3J9YCk7aWYocj1yPz8wLHZvaWQgMCE9PW4mJm48MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihgVGhlIHZhbHVlIG9mICJ0YXJnZXRTdGFydCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlID49IDAuIFJlY2VpdmVkICR7bn1gKTtuPW4/PzA7Y29uc3Qgbz1lLnN1YmFycmF5KHIsaSkscz1NYXRoLm1pbihvLmxlbmd0aCx0Lmxlbmd0aC1uKTtyZXR1cm4gczw9MD8wOih0LnNldChvLnN1YmFycmF5KDAscyksbikscyl9LGVxdWFscyhlLHQpe2lmKGUuYnl0ZUxlbmd0aCE9PXQuYnl0ZUxlbmd0aClyZXR1cm4hMTtmb3IobGV0IG49MDtuPGUuYnl0ZUxlbmd0aDtuKyspaWYoZVtuXSE9PXRbbl0pcmV0dXJuITE7cmV0dXJuITB9LGZyb21OdW1iZXJBcnJheTplPT5VaW50OEFycmF5LmZyb20oZSksZnJvbUJhc2U2NDplPT5VaW50OEFycmF5LmZyb20oYXRvYihlKSwoZT0+ZS5jaGFyQ29kZUF0KDApKSksZnJvbVVURjg6ZT0+KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKGUpLHRvQmFzZTY0OmU9PmJ0b2EodWUudG9JU084ODU5MShlKSksZnJvbUlTTzg4NTkxOmU9PlVpbnQ4QXJyYXkuZnJvbShlLChlPT4yNTUmZS5jaGFyQ29kZUF0KDApKSksdG9JU084ODU5MTplPT5BcnJheS5mcm9tKFVpbnQxNkFycmF5LmZyb20oZSksKGU9PlN0cmluZy5mcm9tQ2hhckNvZGUoZSkpKS5qb2luKCIiKSxmcm9tSGV4KGUpe2NvbnN0IHQ9ZS5sZW5ndGglMj09MD9lOmUuc2xpY2UoMCxlLmxlbmd0aC0xKSxuPVtdO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSs9Mil7Y29uc3Qgcj10W2VdLGk9dFtlKzFdO2lmKCFsZS50ZXN0KHIpKWJyZWFrO2lmKCFsZS50ZXN0KGkpKWJyZWFrO2NvbnN0IG89TnVtYmVyLnBhcnNlSW50KGAke3J9JHtpfWAsMTYpO24ucHVzaChvKX1yZXR1cm4gVWludDhBcnJheS5mcm9tKG4pfSx0b0hleDplPT5BcnJheS5mcm9tKGUsKGU9PmUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIjAiKSkpLmpvaW4oIiIpLHRvVVRGOChlLHQsbixyKXtjb25zdCBpPW4tdDw9MjA/cmUoZSx0LG4pOm51bGw7cmV0dXJuIG51bGwhPWk/aTpuZShlLHQsbixyKX0sdXRmOEJ5dGVMZW5ndGg6ZT0+KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKGUpLmJ5dGVMZW5ndGgsZW5jb2RlVVRGOEludG8oZSx0LG4pe2NvbnN0IHI9KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKHQpO3JldHVybiBlLnNldChyLG4pLHIuYnl0ZUxlbmd0aH0scmFuZG9tQnl0ZXM6ZmUsc3dhcDMyKGUpe2lmKGUubGVuZ3RoJTQhPTApdGhyb3cgbmV3IFJhbmdlRXJyb3IoIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzIik7Zm9yKGxldCB0PTA7dDxlLmxlbmd0aDt0Kz00KXtjb25zdCBuPWVbdF0scj1lW3QrMV0saT1lW3QrMl0sbz1lW3QrM107ZVt0XT1vLGVbdCsxXT1pLGVbdCsyXT1yLGVbdCszXT1ufXJldHVybiBlfX0sX2U9ImZ1bmN0aW9uIj09dHlwZW9mIEJ1ZmZlciYmITAhPT1CdWZmZXIucHJvdG90eXBlPy5faXNCdWZmZXI/YWU6dWUsZ2U9U3ltYm9sLmZvcigiQEBtZGIuYnNvbi50eXBlIik7Y2xhc3MgaGV7Z2V0W2dlXSgpe3JldHVybiB0aGlzLl9ic29udHlwZX1nZXRbeV0oKXtyZXR1cm4gcH1bU3ltYm9sLmZvcigibm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20iKV0oZSx0LG4pe3JldHVybiB0aGlzLmluc3BlY3QoZSx0LG4pfX1jb25zdCBiZT1uZXcgRmxvYXQ2NEFycmF5KDEpLGRlPW5ldyBVaW50OEFycmF5KGJlLmJ1ZmZlciwwLDgpO2JlWzBdPS0xO2NvbnN0IHdlPTA9PT1kZVs3XSxwZT17aXNCaWdFbmRpYW46d2UsZ2V0Tm9ubmVnYXRpdmVJbnQzMkxFKGUsdCl7aWYoZVt0KzNdPjEyNyl0aHJvdyBuZXcgUmFuZ2VFcnJvcihgU2l6ZSBjYW5ub3QgYmUgbmVnYXRpdmUgYXQgb2Zmc2V0OiAke3R9YCk7cmV0dXJuIGVbdF18ZVt0KzFdPDw4fGVbdCsyXTw8MTZ8ZVt0KzNdPDwyNH0sZ2V0SW50MzJMRTooZSx0KT0+ZVt0XXxlW3QrMV08PDh8ZVt0KzJdPDwxNnxlW3QrM108PDI0LGdldFVpbnQzMkxFOihlLHQpPT5lW3RdKzI1NiplW3QrMV0rNjU1MzYqZVt0KzJdKzE2Nzc3MjE2KmVbdCszXSxnZXRVaW50MzJCRTooZSx0KT0+ZVt0KzNdKzI1NiplW3QrMl0rNjU1MzYqZVt0KzFdKzE2Nzc3MjE2KmVbdF0sZ2V0QmlnSW50NjRMRTooZSx0KT0+KEJpZ0ludChlW3QrNF0rMjU2KmVbdCs1XSs2NTUzNiplW3QrNl0rKGVbdCs3XTw8MjQpKTw8MzJuKStCaWdJbnQoZVt0XSsyNTYqZVt0KzFdKzY1NTM2KmVbdCsyXSsxNjc3NzIxNiplW3QrM10pLGdldEZsb2F0NjRMRTp3ZT8oZSx0KT0+KGRlWzddPWVbdF0sZGVbNl09ZVt0KzFdLGRlWzVdPWVbdCsyXSxkZVs0XT1lW3QrM10sZGVbM109ZVt0KzRdLGRlWzJdPWVbdCs1XSxkZVsxXT1lW3QrNl0sZGVbMF09ZVt0KzddLGJlWzBdKTooZSx0KT0+KGRlWzBdPWVbdF0sZGVbMV09ZVt0KzFdLGRlWzJdPWVbdCsyXSxkZVszXT1lW3QrM10sZGVbNF09ZVt0KzRdLGRlWzVdPWVbdCs1XSxkZVs2XT1lW3QrNl0sZGVbN109ZVt0KzddLGJlWzBdKSxzZXRJbnQzMkJFOihlLHQsbik9PihlW3QrM109bixuPj4+PTgsZVt0KzJdPW4sbj4+Pj04LGVbdCsxXT1uLG4+Pj49OCxlW3RdPW4sNCksc2V0SW50MzJMRTooZSx0LG4pPT4oZVt0XT1uLG4+Pj49OCxlW3QrMV09bixuPj4+PTgsZVt0KzJdPW4sbj4+Pj04LGVbdCszXT1uLDQpLHNldEJpZ0ludDY0TEUoZSx0LG4pe2NvbnN0IHI9MHhmZmZmZmZmZm47bGV0IGk9TnVtYmVyKG4mcik7ZVt0XT1pLGk+Pj04LGVbdCsxXT1pLGk+Pj04LGVbdCsyXT1pLGk+Pj04LGVbdCszXT1pO2xldCBvPU51bWJlcihuPj4zMm4mcik7cmV0dXJuIGVbdCs0XT1vLG8+Pj04LGVbdCs1XT1vLG8+Pj04LGVbdCs2XT1vLG8+Pj04LGVbdCs3XT1vLDh9LHNldEZsb2F0NjRMRTp3ZT8oZSx0LG4pPT4oYmVbMF09bixlW3RdPWRlWzddLGVbdCsxXT1kZVs2XSxlW3QrMl09ZGVbNV0sZVt0KzNdPWRlWzRdLGVbdCs0XT1kZVszXSxlW3QrNV09ZGVbMl0sZVt0KzZdPWRlWzFdLGVbdCs3XT1kZVswXSw4KTooZSx0LG4pPT4oYmVbMF09bixlW3RdPWRlWzBdLGVbdCsxXT1kZVsxXSxlW3QrMl09ZGVbMl0sZVt0KzNdPWRlWzNdLGVbdCs0XT1kZVs0XSxlW3QrNV09ZGVbNV0sZVt0KzZdPWRlWzZdLGVbdCs3XT1kZVs3XSw4KX07Y2xhc3MgeWUgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkJpbmFyeSJ9c3RhdGljIEJTT05fQklOQVJZX1NVQlRZUEVfREVGQVVMVD0wO3N0YXRpYyBCVUZGRVJfU0laRT0yNTY7c3RhdGljIFNVQlRZUEVfREVGQVVMVD0wO3N0YXRpYyBTVUJUWVBFX0ZVTkNUSU9OPTE7c3RhdGljIFNVQlRZUEVfQllURV9BUlJBWT0yO3N0YXRpYyBTVUJUWVBFX1VVSURfT0xEPTM7c3RhdGljIFNVQlRZUEVfVVVJRD00O3N0YXRpYyBTVUJUWVBFX01ENT01O3N0YXRpYyBTVUJUWVBFX0VOQ1JZUFRFRD02O3N0YXRpYyBTVUJUWVBFX0NPTFVNTj03O3N0YXRpYyBTVUJUWVBFX1NFTlNJVElWRT04O3N0YXRpYyBTVUJUWVBFX1ZFQ1RPUj05O3N0YXRpYyBTVUJUWVBFX1VTRVJfREVGSU5FRD0xMjg7c3RhdGljIFZFQ1RPUl9UWVBFPU9iamVjdC5mcmVlemUoe0ludDg6MyxGbG9hdDMyOjM5LFBhY2tlZEJpdDoxNn0pO2J1ZmZlcjtzdWJfdHlwZTtwb3NpdGlvbjtjb25zdHJ1Y3RvcihlLHQpe2lmKHN1cGVyKCksbnVsbCE9ZSYmInN0cmluZyI9PXR5cGVvZiBlJiYhQXJyYXlCdWZmZXIuaXNWaWV3KGUpJiYhZyhlKSYmIUFycmF5LmlzQXJyYXkoZSkpdGhyb3cgbmV3IFooIkJpbmFyeSBjYW4gb25seSBiZSBjb25zdHJ1Y3RlZCBmcm9tIFVpbnQ4QXJyYXkgb3IgbnVtYmVyW10iKTt0aGlzLnN1Yl90eXBlPXQ/P3llLkJTT05fQklOQVJZX1NVQlRZUEVfREVGQVVMVCxudWxsPT1lPyh0aGlzLmJ1ZmZlcj1fZS5hbGxvY2F0ZSh5ZS5CVUZGRVJfU0laRSksdGhpcy5wb3NpdGlvbj0wKToodGhpcy5idWZmZXI9QXJyYXkuaXNBcnJheShlKT9fZS5mcm9tTnVtYmVyQXJyYXkoZSk6X2UudG9Mb2NhbEJ1ZmZlclR5cGUoZSksdGhpcy5wb3NpdGlvbj10aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKX1wdXQoZSl7aWYoInN0cmluZyI9PXR5cGVvZiBlJiYxIT09ZS5sZW5ndGgpdGhyb3cgbmV3IFooIm9ubHkgYWNjZXB0cyBzaW5nbGUgY2hhcmFjdGVyIFN0cmluZyIpO2lmKCJudW1iZXIiIT10eXBlb2YgZSYmMSE9PWUubGVuZ3RoKXRocm93IG5ldyBaKCJvbmx5IGFjY2VwdHMgc2luZ2xlIGNoYXJhY3RlciBVaW50OEFycmF5IG9yIEFycmF5Iik7bGV0IHQ7aWYodD0ic3RyaW5nIj09dHlwZW9mIGU/ZS5jaGFyQ29kZUF0KDApOiJudW1iZXIiPT10eXBlb2YgZT9lOmVbMF0sdDwwfHx0PjI1NSl0aHJvdyBuZXcgWigib25seSBhY2NlcHRzIG51bWJlciBpbiBhIHZhbGlkIHVuc2lnbmVkIGJ5dGUgcmFuZ2UgMC0yNTUiKTtpZih0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoPnRoaXMucG9zaXRpb24pdGhpcy5idWZmZXJbdGhpcy5wb3NpdGlvbisrXT10O2Vsc2V7Y29uc3QgZT1fZS5hbGxvY2F0ZSh5ZS5CVUZGRVJfU0laRSt0aGlzLmJ1ZmZlci5sZW5ndGgpO2Uuc2V0KHRoaXMuYnVmZmVyLDApLHRoaXMuYnVmZmVyPWUsdGhpcy5idWZmZXJbdGhpcy5wb3NpdGlvbisrXT10fX13cml0ZShlLHQpe2lmKHQ9Im51bWJlciI9PXR5cGVvZiB0P3Q6dGhpcy5wb3NpdGlvbix0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoPHQrZS5sZW5ndGgpe2NvbnN0IHQ9X2UuYWxsb2NhdGUodGhpcy5idWZmZXIuYnl0ZUxlbmd0aCtlLmxlbmd0aCk7dC5zZXQodGhpcy5idWZmZXIsMCksdGhpcy5idWZmZXI9dH1pZihBcnJheUJ1ZmZlci5pc1ZpZXcoZSkpdGhpcy5idWZmZXIuc2V0KF9lLnRvTG9jYWxCdWZmZXJUeXBlKGUpLHQpLHRoaXMucG9zaXRpb249dCtlLmJ5dGVMZW5ndGg+dGhpcy5wb3NpdGlvbj90K2UubGVuZ3RoOnRoaXMucG9zaXRpb247ZWxzZSBpZigic3RyaW5nIj09dHlwZW9mIGUpdGhyb3cgbmV3IFooImlucHV0IGNhbm5vdCBiZSBzdHJpbmciKX1yZWFkKGUsdCl7Y29uc3Qgbj1lKyh0PXQmJnQ+MD90OnRoaXMucG9zaXRpb24pO3JldHVybiB0aGlzLmJ1ZmZlci5zdWJhcnJheShlLG4+dGhpcy5wb3NpdGlvbj90aGlzLnBvc2l0aW9uOm4pfXZhbHVlKCl7cmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aD09PXRoaXMucG9zaXRpb24/dGhpcy5idWZmZXI6dGhpcy5idWZmZXIuc3ViYXJyYXkoMCx0aGlzLnBvc2l0aW9uKX1sZW5ndGgoKXtyZXR1cm4gdGhpcy5wb3NpdGlvbn10b0pTT04oKXtyZXR1cm4gX2UudG9CYXNlNjQodGhpcy5idWZmZXIuc3ViYXJyYXkoMCx0aGlzLnBvc2l0aW9uKSl9dG9TdHJpbmcoZSl7cmV0dXJuImhleCI9PT1lP19lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDAsdGhpcy5wb3NpdGlvbikpOiJiYXNlNjQiPT09ZT9fZS50b0Jhc2U2NCh0aGlzLmJ1ZmZlci5zdWJhcnJheSgwLHRoaXMucG9zaXRpb24pKTpfZS50b1VURjgodGhpcy5idWZmZXIsMCx0aGlzLnBvc2l0aW9uLCExKX10b0V4dGVuZGVkSlNPTihlKXtlPWV8fHt9LHRoaXMuc3ViX3R5cGU9PT15ZS5TVUJUWVBFX1ZFQ1RPUiYmbWUodGhpcyk7Y29uc3QgdD1fZS50b0Jhc2U2NCh0aGlzLmJ1ZmZlciksbj1OdW1iZXIodGhpcy5zdWJfdHlwZSkudG9TdHJpbmcoMTYpO3JldHVybiBlLmxlZ2FjeT97JGJpbmFyeTp0LCR0eXBlOjE9PT1uLmxlbmd0aD8iMCIrbjpufTp7JGJpbmFyeTp7YmFzZTY0OnQsc3ViVHlwZToxPT09bi5sZW5ndGg/IjAiK246bn19fXRvVVVJRCgpe2lmKHRoaXMuc3ViX3R5cGU9PT15ZS5TVUJUWVBFX1VVSUQpcmV0dXJuIG5ldyB4ZSh0aGlzLmJ1ZmZlci5zdWJhcnJheSgwLHRoaXMucG9zaXRpb24pKTt0aHJvdyBuZXcgWihgQmluYXJ5IHN1Yl90eXBlICIke3RoaXMuc3ViX3R5cGV9IiBpcyBub3Qgc3VwcG9ydGVkIGZvciBjb252ZXJ0aW5nIHRvIFVVSUQuIE9ubHkgIiR7eWUuU1VCVFlQRV9VVUlEfSIgaXMgY3VycmVudGx5IHN1cHBvcnRlZC5gKX1zdGF0aWMgY3JlYXRlRnJvbUhleFN0cmluZyhlLHQpe3JldHVybiBuZXcgeWUoX2UuZnJvbUhleChlKSx0KX1zdGF0aWMgY3JlYXRlRnJvbUJhc2U2NChlLHQpe3JldHVybiBuZXcgeWUoX2UuZnJvbUJhc2U2NChlKSx0KX1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlLHQpe2xldCBuLHI7aWYodD10fHx7fSwiJGJpbmFyeSJpbiBlP3QubGVnYWN5JiYic3RyaW5nIj09dHlwZW9mIGUuJGJpbmFyeSYmIiR0eXBlImluIGU/KHI9ZS4kdHlwZT9wYXJzZUludChlLiR0eXBlLDE2KTowLG49X2UuZnJvbUJhc2U2NChlLiRiaW5hcnkpKToic3RyaW5nIiE9dHlwZW9mIGUuJGJpbmFyeSYmKHI9ZS4kYmluYXJ5LnN1YlR5cGU/cGFyc2VJbnQoZS4kYmluYXJ5LnN1YlR5cGUsMTYpOjAsbj1fZS5mcm9tQmFzZTY0KGUuJGJpbmFyeS5iYXNlNjQpKToiJHV1aWQiaW4gZSYmKHI9NCxuPXhlLmJ5dGVzRnJvbVN0cmluZyhlLiR1dWlkKSksIW4pdGhyb3cgbmV3IFooYFVuZXhwZWN0ZWQgQmluYXJ5IEV4dGVuZGVkIEpTT04gZm9ybWF0ICR7SlNPTi5zdHJpbmdpZnkoZSl9YCk7cmV0dXJuIHI9PT1IP25ldyB4ZShuKTpuZXcgeWUobixyKX1pbnNwZWN0KGUsdCxuKXtuPz89dztyZXR1cm5gQmluYXJ5LmNyZWF0ZUZyb21CYXNlNjQoJHtuKF9lLnRvQmFzZTY0KHRoaXMuYnVmZmVyLnN1YmFycmF5KDAsdGhpcy5wb3NpdGlvbikpLHQpfSwgJHtuKHRoaXMuc3ViX3R5cGUsdCl9KWB9dG9JbnQ4QXJyYXkoKXtpZih0aGlzLnN1Yl90eXBlIT09eWUuU1VCVFlQRV9WRUNUT1IpdGhyb3cgbmV3IFooIkJpbmFyeSBzdWJfdHlwZSBpcyBub3QgVmVjdG9yIik7aWYodGhpcy5idWZmZXJbMF0hPT15ZS5WRUNUT1JfVFlQRS5JbnQ4KXRocm93IG5ldyBaKCJCaW5hcnkgZGF0YXR5cGUgZmllbGQgaXMgbm90IEludDgiKTtyZXR1cm4gbWUodGhpcyksbmV3IEludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIuc2xpY2UodGhpcy5idWZmZXIuYnl0ZU9mZnNldCsyLHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQrdGhpcy5wb3NpdGlvbikpfXRvRmxvYXQzMkFycmF5KCl7aWYodGhpcy5zdWJfdHlwZSE9PXllLlNVQlRZUEVfVkVDVE9SKXRocm93IG5ldyBaKCJCaW5hcnkgc3ViX3R5cGUgaXMgbm90IFZlY3RvciIpO2lmKHRoaXMuYnVmZmVyWzBdIT09eWUuVkVDVE9SX1RZUEUuRmxvYXQzMil0aHJvdyBuZXcgWigiQmluYXJ5IGRhdGF0eXBlIGZpZWxkIGlzIG5vdCBGbG9hdDMyIik7bWUodGhpcyk7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIuc2xpY2UodGhpcy5idWZmZXIuYnl0ZU9mZnNldCsyLHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQrdGhpcy5wb3NpdGlvbikpO3JldHVybiBwZS5pc0JpZ0VuZGlhbiYmX2Uuc3dhcDMyKGUpLG5ldyBGbG9hdDMyQXJyYXkoZS5idWZmZXIpfXRvUGFja2VkQml0cygpe2lmKHRoaXMuc3ViX3R5cGUhPT15ZS5TVUJUWVBFX1ZFQ1RPUil0aHJvdyBuZXcgWigiQmluYXJ5IHN1Yl90eXBlIGlzIG5vdCBWZWN0b3IiKTtpZih0aGlzLmJ1ZmZlclswXSE9PXllLlZFQ1RPUl9UWVBFLlBhY2tlZEJpdCl0aHJvdyBuZXcgWigiQmluYXJ5IGRhdGF0eXBlIGZpZWxkIGlzIG5vdCBwYWNrZWQgYml0Iik7cmV0dXJuIG1lKHRoaXMpLG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLmJ1ZmZlci5zbGljZSh0aGlzLmJ1ZmZlci5ieXRlT2Zmc2V0KzIsdGhpcy5idWZmZXIuYnl0ZU9mZnNldCt0aGlzLnBvc2l0aW9uKSl9dG9CaXRzKCl7aWYodGhpcy5zdWJfdHlwZSE9PXllLlNVQlRZUEVfVkVDVE9SKXRocm93IG5ldyBaKCJCaW5hcnkgc3ViX3R5cGUgaXMgbm90IFZlY3RvciIpO2lmKHRoaXMuYnVmZmVyWzBdIT09eWUuVkVDVE9SX1RZUEUuUGFja2VkQml0KXRocm93IG5ldyBaKCJCaW5hcnkgZGF0YXR5cGUgZmllbGQgaXMgbm90IHBhY2tlZCBiaXQiKTttZSh0aGlzKTtjb25zdCBlPTgqKHRoaXMubGVuZ3RoKCktMiktdGhpcy5idWZmZXJbMV0sdD1uZXcgSW50OEFycmF5KGUpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXtjb25zdCBuPWUvOHwwLHI9dGhpcy5idWZmZXJbbisyXT4+Ny1lJTgmMTt0W2VdPXJ9cmV0dXJuIHR9c3RhdGljIGZyb21JbnQ4QXJyYXkoZSl7Y29uc3QgdD1fZS5hbGxvY2F0ZShlLmJ5dGVMZW5ndGgrMik7dFswXT15ZS5WRUNUT1JfVFlQRS5JbnQ4LHRbMV09MDtjb25zdCBuPW5ldyBVaW50OEFycmF5KGUuYnVmZmVyLGUuYnl0ZU9mZnNldCxlLmJ5dGVMZW5ndGgpO3Quc2V0KG4sMik7Y29uc3Qgcj1uZXcgdGhpcyh0LHRoaXMuU1VCVFlQRV9WRUNUT1IpO3JldHVybiBtZShyKSxyfXN0YXRpYyBmcm9tRmxvYXQzMkFycmF5KGUpe2NvbnN0IHQ9X2UuYWxsb2NhdGUoZS5ieXRlTGVuZ3RoKzIpO3RbMF09eWUuVkVDVE9SX1RZUEUuRmxvYXQzMix0WzFdPTA7Y29uc3Qgbj1uZXcgVWludDhBcnJheShlLmJ1ZmZlcixlLmJ5dGVPZmZzZXQsZS5ieXRlTGVuZ3RoKTt0LnNldChuLDIpLHBlLmlzQmlnRW5kaWFuJiZfZS5zd2FwMzIobmV3IFVpbnQ4QXJyYXkodC5idWZmZXIsMikpO2NvbnN0IHI9bmV3IHRoaXModCx0aGlzLlNVQlRZUEVfVkVDVE9SKTtyZXR1cm4gbWUocikscn1zdGF0aWMgZnJvbVBhY2tlZEJpdHMoZSx0PTApe2NvbnN0IG49X2UuYWxsb2NhdGUoZS5ieXRlTGVuZ3RoKzIpO25bMF09eWUuVkVDVE9SX1RZUEUuUGFja2VkQml0LG5bMV09dCxuLnNldChlLDIpO2NvbnN0IHI9bmV3IHRoaXMobix0aGlzLlNVQlRZUEVfVkVDVE9SKTtyZXR1cm4gbWUocikscn1zdGF0aWMgZnJvbUJpdHMoZSl7Y29uc3QgdD1lLmxlbmd0aCs3Pj4+MyxuPW5ldyBVaW50OEFycmF5KHQrMik7blswXT15ZS5WRUNUT1JfVFlQRS5QYWNrZWRCaXQ7Y29uc3Qgcj1lLmxlbmd0aCU4O25bMV09MD09PXI/MDo4LXI7Zm9yKGxldCB0PTA7dDxlLmxlbmd0aDt0Kyspe2NvbnN0IHI9dD4+PjMsaT1lW3RdO2lmKDAhPT1pJiYxIT09aSl0aHJvdyBuZXcgWihgSW52YWxpZCBiaXQgdmFsdWUgYXQgJHt0fTogbXVzdCBiZSAwIG9yIDEsIGZvdW5kICR7ZVt0XX1gKTtpZigwPT09aSljb250aW51ZTtjb25zdCBvPTctdCU4O25bcisyXXw9aTw8b31yZXR1cm4gbmV3IHRoaXMobix5ZS5TVUJUWVBFX1ZFQ1RPUil9fWZ1bmN0aW9uIG1lKGUpe2lmKGUuc3ViX3R5cGUhPT15ZS5TVUJUWVBFX1ZFQ1RPUilyZXR1cm47Y29uc3QgdD1lLnBvc2l0aW9uLG49ZS5idWZmZXJbMF0scj1lLmJ1ZmZlclsxXTtpZigobj09PXllLlZFQ1RPUl9UWVBFLkZsb2F0MzJ8fG49PT15ZS5WRUNUT1JfVFlQRS5JbnQ4KSYmMCE9PXIpdGhyb3cgbmV3IFooIkludmFsaWQgVmVjdG9yOiBwYWRkaW5nIG11c3QgYmUgemVybyBmb3IgaW50OCBhbmQgZmxvYXQzMiB2ZWN0b3JzIik7aWYobj09PXllLlZFQ1RPUl9UWVBFLkZsb2F0MzImJjAhPT10JiZ0LTIhPTAmJih0LTIpJTQhPTApdGhyb3cgbmV3IFooIkludmFsaWQgVmVjdG9yOiBGbG9hdDMyIHZlY3RvciBtdXN0IGNvbnRhaW4gYSBtdWx0aXBsZSBvZiA0IGJ5dGVzIik7aWYobj09PXllLlZFQ1RPUl9UWVBFLlBhY2tlZEJpdCYmMCE9PXImJjI9PT10KXRocm93IG5ldyBaKCJJbnZhbGlkIFZlY3RvcjogcGFkZGluZyBtdXN0IGJlIHplcm8gZm9yIHBhY2tlZCBiaXQgdmVjdG9ycyB0aGF0IGFyZSBlbXB0eSIpO2lmKG49PT15ZS5WRUNUT1JfVFlQRS5QYWNrZWRCaXQmJnI+Nyl0aHJvdyBuZXcgWihgSW52YWxpZCBWZWN0b3I6IHBhZGRpbmcgbXVzdCBiZSBhIHZhbHVlIGJldHdlZW4gMCBhbmQgNy4gZm91bmQ6ICR7cn1gKX1jb25zdCBTZT0vXlswLTlBLUZdezMyfSQvaSxCZT0vXlswLTlBLUZdezh9LVswLTlBLUZdezR9LVswLTlBLUZdezR9LVswLTlBLUZdezR9LVswLTlBLUZdezEyfSQvaTtjbGFzcyB4ZSBleHRlbmRzIHlle2NvbnN0cnVjdG9yKGUpe2xldCB0O2lmKG51bGw9PWUpdD14ZS5nZW5lcmF0ZSgpO2Vsc2UgaWYoZSBpbnN0YW5jZW9mIHhlKXQ9X2UudG9Mb2NhbEJ1ZmZlclR5cGUobmV3IFVpbnQ4QXJyYXkoZS5idWZmZXIpKTtlbHNlIGlmKEFycmF5QnVmZmVyLmlzVmlldyhlKSYmMTY9PT1lLmJ5dGVMZW5ndGgpdD1fZS50b0xvY2FsQnVmZmVyVHlwZShlKTtlbHNle2lmKCJzdHJpbmciIT10eXBlb2YgZSl0aHJvdyBuZXcgWigiQXJndW1lbnQgcGFzc2VkIGluIFVVSUQgY29uc3RydWN0b3IgbXVzdCBiZSBhIFVVSUQsIGEgMTYgYnl0ZSBCdWZmZXIgb3IgYSAzMi8zNiBjaGFyYWN0ZXIgaGV4IHN0cmluZyAoZGFzaGVzIGV4Y2x1ZGVkL2luY2x1ZGVkLCBmb3JtYXQ6IHh4eHh4eHh4LXh4eHgteHh4eC14eHh4LXh4eHh4eHh4eHh4eCkuIik7dD14ZS5ieXRlc0Zyb21TdHJpbmcoZSl9c3VwZXIodCxIKX1nZXQgaWQoKXtyZXR1cm4gdGhpcy5idWZmZXJ9c2V0IGlkKGUpe3RoaXMuYnVmZmVyPWV9dG9IZXhTdHJpbmcoZT0hMCl7cmV0dXJuIGU/W19lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDAsNCkpLF9lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDQsNikpLF9lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDYsOCkpLF9lLnRvSGV4KHRoaXMuYnVmZmVyLnN1YmFycmF5KDgsMTApKSxfZS50b0hleCh0aGlzLmJ1ZmZlci5zdWJhcnJheSgxMCwxNikpXS5qb2luKCItIik6X2UudG9IZXgodGhpcy5idWZmZXIpfXRvU3RyaW5nKGUpe3JldHVybiJoZXgiPT09ZT9fZS50b0hleCh0aGlzLmlkKToiYmFzZTY0Ij09PWU/X2UudG9CYXNlNjQodGhpcy5pZCk6dGhpcy50b0hleFN0cmluZygpfXRvSlNPTigpe3JldHVybiB0aGlzLnRvSGV4U3RyaW5nKCl9ZXF1YWxzKGUpe2lmKCFlKXJldHVybiExO2lmKGUgaW5zdGFuY2VvZiB4ZSlyZXR1cm4gX2UuZXF1YWxzKGUuaWQsdGhpcy5pZCk7dHJ5e3JldHVybiBfZS5lcXVhbHMobmV3IHhlKGUpLmlkLHRoaXMuaWQpfWNhdGNoe3JldHVybiExfX10b0JpbmFyeSgpe3JldHVybiBuZXcgeWUodGhpcy5pZCx5ZS5TVUJUWVBFX1VVSUQpfXN0YXRpYyBnZW5lcmF0ZSgpe2NvbnN0IGU9X2UucmFuZG9tQnl0ZXMoMTYpO3JldHVybiBlWzZdPTE1JmVbNl18NjQsZVs4XT02MyZlWzhdfDEyOCxlfXN0YXRpYyBpc1ZhbGlkKGUpe3JldHVybiEhZSYmKCJzdHJpbmciPT10eXBlb2YgZT94ZS5pc1ZhbGlkVVVJRFN0cmluZyhlKTpfKGUpPzE2PT09ZS5ieXRlTGVuZ3RoOiJCaW5hcnkiPT09ZS5fYnNvbnR5cGUmJmUuc3ViX3R5cGU9PT10aGlzLlNVQlRZUEVfVVVJRCYmMTY9PT1lLmJ1ZmZlci5ieXRlTGVuZ3RoKX1zdGF0aWMgY3JlYXRlRnJvbUhleFN0cmluZyhlKXtjb25zdCB0PXhlLmJ5dGVzRnJvbVN0cmluZyhlKTtyZXR1cm4gbmV3IHhlKHQpfXN0YXRpYyBjcmVhdGVGcm9tQmFzZTY0KGUpe3JldHVybiBuZXcgeGUoX2UuZnJvbUJhc2U2NChlKSl9c3RhdGljIGJ5dGVzRnJvbVN0cmluZyhlKXtpZigheGUuaXNWYWxpZFVVSURTdHJpbmcoZSkpdGhyb3cgbmV3IFooIlVVSUQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG11c3QgYmUgMzIgaGV4IGRpZ2l0cyBvciBjYW5vbmljYWwgaHlwaGVuYXRlZCByZXByZXNlbnRhdGlvbiIpO3JldHVybiBfZS5mcm9tSGV4KGUucmVwbGFjZSgvLS9nLCIiKSl9c3RhdGljIGlzVmFsaWRVVUlEU3RyaW5nKGUpe3JldHVybiBTZS50ZXN0KGUpfHxCZS50ZXN0KGUpfWluc3BlY3QoZSx0LG4pe3JldHVybiBuPz89dyxgbmV3IFVVSUQoJHtuKHRoaXMudG9IZXhTdHJpbmcoKSx0KX0pYH19Y2xhc3MgRWUgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkNvZGUifWNvZGU7c2NvcGU7Y29uc3RydWN0b3IoZSx0KXtzdXBlcigpLHRoaXMuY29kZT1lLnRvU3RyaW5nKCksdGhpcy5zY29wZT10Pz9udWxsfXRvSlNPTigpe3JldHVybiBudWxsIT10aGlzLnNjb3BlP3tjb2RlOnRoaXMuY29kZSxzY29wZTp0aGlzLnNjb3BlfTp7Y29kZTp0aGlzLmNvZGV9fXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJuIHRoaXMuc2NvcGU/eyRjb2RlOnRoaXMuY29kZSwkc2NvcGU6dGhpcy5zY29wZX06eyRjb2RlOnRoaXMuY29kZX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7cmV0dXJuIG5ldyBFZShlLiRjb2RlLGUuJHNjb3BlKX1pbnNwZWN0KGUsdCxuKXtuPz89dztsZXQgcj1uKHRoaXMuY29kZSx0KTtjb25zdCBpPXIuaW5jbHVkZXMoIlxuIik7bnVsbCE9dGhpcy5zY29wZSYmKHIrPWAsJHtpPyJcbiI6IiAifSR7bih0aGlzLnNjb3BlLHQpfWApO3JldHVybmBuZXcgQ29kZSgke2k/IlxuIjoiIn0ke3J9JHtpJiZudWxsPT09dGhpcy5zY29wZT8iXG4iOiIifSlgfX1mdW5jdGlvbiBVZShlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiJGlkImluIGUmJm51bGwhPWUuJGlkJiYiJHJlZiJpbiBlJiYic3RyaW5nIj09dHlwZW9mIGUuJHJlZiYmKCEoIiRkYiJpbiBlKXx8IiRkYiJpbiBlJiYic3RyaW5nIj09dHlwZW9mIGUuJGRiKX1jbGFzcyBPZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iREJSZWYifWNvbGxlY3Rpb247b2lkO2RiO2ZpZWxkcztjb25zdHJ1Y3RvcihlLHQsbixyKXtzdXBlcigpO2NvbnN0IGk9ZS5zcGxpdCgiLiIpOzI9PT1pLmxlbmd0aCYmKG49aS5zaGlmdCgpLGU9aS5zaGlmdCgpKSx0aGlzLmNvbGxlY3Rpb249ZSx0aGlzLm9pZD10LHRoaXMuZGI9bix0aGlzLmZpZWxkcz1yfHx7fX1nZXQgbmFtZXNwYWNlKCl7cmV0dXJuIHRoaXMuY29sbGVjdGlvbn1zZXQgbmFtZXNwYWNlKGUpe3RoaXMuY29sbGVjdGlvbj1lfXRvSlNPTigpe2NvbnN0IGU9T2JqZWN0LmFzc2lnbih7JHJlZjp0aGlzLmNvbGxlY3Rpb24sJGlkOnRoaXMub2lkfSx0aGlzLmZpZWxkcyk7cmV0dXJuIG51bGwhPXRoaXMuZGImJihlLiRkYj10aGlzLmRiKSxlfXRvRXh0ZW5kZWRKU09OKGUpe2U9ZXx8e307bGV0IHQ9eyRyZWY6dGhpcy5jb2xsZWN0aW9uLCRpZDp0aGlzLm9pZH07cmV0dXJuIGUubGVnYWN5fHwodGhpcy5kYiYmKHQuJGRiPXRoaXMuZGIpLHQ9T2JqZWN0LmFzc2lnbih0LHRoaXMuZmllbGRzKSksdH1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlKXtjb25zdCB0PU9iamVjdC5hc3NpZ24oe30sZSk7cmV0dXJuIGRlbGV0ZSB0LiRyZWYsZGVsZXRlIHQuJGlkLGRlbGV0ZSB0LiRkYixuZXcgT2UoZS4kcmVmLGUuJGlkLGUuJGRiLHQpfWluc3BlY3QoZSx0LG4pe24/Pz13O2NvbnN0IHI9W24odGhpcy5uYW1lc3BhY2UsdCksbih0aGlzLm9pZCx0KSwuLi50aGlzLmRiP1tuKHRoaXMuZGIsdCldOltdLC4uLk9iamVjdC5rZXlzKHRoaXMuZmllbGRzKS5sZW5ndGg+MD9bbih0aGlzLmZpZWxkcyx0KV06W11dO3JldHVybiByWzFdPW49PT13P2BuZXcgT2JqZWN0SWQoJHtyWzFdfSlgOnJbMV0sYG5ldyBEQlJlZigke3Iuam9pbigiLCAiKX0pYH19ZnVuY3Rpb24gTmUoZSl7aWYoIiI9PT1lKXJldHVybiBlO2xldCB0PTA7Y29uc3Qgbj0iLSI9PT1lW3RdLHI9IisiPT09ZVt0XTsocnx8bikmJih0Kz0xKTtsZXQgaT0hMTtmb3IoO3Q8ZS5sZW5ndGgmJiIwIj09PWVbdF07Kyt0KWk9ITA7cmV0dXJuIGk/YCR7bj8iLSI6IiJ9JHtlLmxlbmd0aD09PXQ/IjAiOmUuc2xpY2UodCl9YDpyP2Uuc2xpY2UoMSk6ZX1sZXQgSWU7dHJ5e0llPW5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZShuZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG5ldyBVaW50OEFycmF5KFswLDk3LDExNSwxMDksMSwwLDAsMCwxLDEzLDIsOTYsMCwxLDEyNyw5Niw0LDEyNywxMjcsMTI3LDEyNywxLDEyNywzLDcsNiwwLDEsMSwxLDEsMSw2LDYsMSwxMjcsMSw2NSwwLDExLDcsNTAsNiwzLDEwOSwxMTcsMTA4LDAsMSw1LDEwMCwxMDUsMTE4LDk1LDExNSwwLDIsNSwxMDAsMTA1LDExOCw5NSwxMTcsMCwzLDUsMTE0LDEwMSwxMDksOTUsMTE1LDAsNCw1LDExNCwxMDEsMTA5LDk1LDExNywwLDUsOCwxMDMsMTAxLDExNiw5NSwxMDQsMTA1LDEwMywxMDQsMCwwLDEwLDE5MSwxLDYsNCwwLDM1LDAsMTEsMzYsMSwxLDEyNiwzMiwwLDE3MywzMiwxLDE3Myw2NiwzMiwxMzQsMTMyLDMyLDIsMTczLDMyLDMsMTczLDY2LDMyLDEzNCwxMzIsMTI2LDM0LDQsNjYsMzIsMTM1LDE2NywzNiwwLDMyLDQsMTY3LDExLDM2LDEsMSwxMjYsMzIsMCwxNzMsMzIsMSwxNzMsNjYsMzIsMTM0LDEzMiwzMiwyLDE3MywzMiwzLDE3Myw2NiwzMiwxMzQsMTMyLDEyNywzNCw0LDY2LDMyLDEzNSwxNjcsMzYsMCwzMiw0LDE2NywxMSwzNiwxLDEsMTI2LDMyLDAsMTczLDMyLDEsMTczLDY2LDMyLDEzNCwxMzIsMzIsMiwxNzMsMzIsMywxNzMsNjYsMzIsMTM0LDEzMiwxMjgsMzQsNCw2NiwzMiwxMzUsMTY3LDM2LDAsMzIsNCwxNjcsMTEsMzYsMSwxLDEyNiwzMiwwLDE3MywzMiwxLDE3Myw2NiwzMiwxMzQsMTMyLDMyLDIsMTczLDMyLDMsMTczLDY2LDMyLDEzNCwxMzIsMTI5LDM0LDQsNjYsMzIsMTM1LDE2NywzNiwwLDMyLDQsMTY3LDExLDM2LDEsMSwxMjYsMzIsMCwxNzMsMzIsMSwxNzMsNjYsMzIsMTM0LDEzMiwzMiwyLDE3MywzMiwzLDE3Myw2NiwzMiwxMzQsMTMyLDEzMCwzNCw0LDY2LDMyLDEzNSwxNjcsMzYsMCwzMiw0LDE2NywxMV0pKSx7fSkuZXhwb3J0c31jYXRjaHt9Y29uc3QgdmU9NDI5NDk2NzI5NixUZT0weDEwMDAwMDAwMDAwMDAwMDAwLCRlPVRlLzIsTGU9e30sQWU9e30sUmU9L14oXCs/MHwoXCt8LSk/WzEtOV1bMC05XSopJC87Y2xhc3MgamUgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkxvbmcifWdldCBfX2lzTG9uZ19fKCl7cmV0dXJuITB9aGlnaDtsb3c7dW5zaWduZWQ7Y29uc3RydWN0b3IoZT0wLHQsbil7c3VwZXIoKTtjb25zdCByPSJib29sZWFuIj09dHlwZW9mIHQ/dDpCb29sZWFuKG4pLGk9Im51bWJlciI9PXR5cGVvZiB0P3Q6MCxvPSJzdHJpbmciPT10eXBlb2YgZT9qZS5mcm9tU3RyaW5nKGUscik6ImJpZ2ludCI9PXR5cGVvZiBlP2plLmZyb21CaWdJbnQoZSxyKTp7bG93OjB8ZSxoaWdoOjB8aSx1bnNpZ25lZDpyfTt0aGlzLmxvdz1vLmxvdyx0aGlzLmhpZ2g9by5oaWdoLHRoaXMudW5zaWduZWQ9by51bnNpZ25lZH1zdGF0aWMgVFdPX1BXUl8yND1qZS5mcm9tSW50KDE2Nzc3MjE2KTtzdGF0aWMgTUFYX1VOU0lHTkVEX1ZBTFVFPWplLmZyb21CaXRzKC0xLC0xLCEwKTtzdGF0aWMgWkVSTz1qZS5mcm9tSW50KDApO3N0YXRpYyBVWkVSTz1qZS5mcm9tSW50KDAsITApO3N0YXRpYyBPTkU9amUuZnJvbUludCgxKTtzdGF0aWMgVU9ORT1qZS5mcm9tSW50KDEsITApO3N0YXRpYyBORUdfT05FPWplLmZyb21JbnQoLTEpO3N0YXRpYyBNQVhfVkFMVUU9amUuZnJvbUJpdHMoLTEsMjE0NzQ4MzY0NywhMSk7c3RhdGljIE1JTl9WQUxVRT1qZS5mcm9tQml0cygwLC0yMTQ3NDgzNjQ4LCExKTtzdGF0aWMgZnJvbUJpdHMoZSx0LG4pe3JldHVybiBuZXcgamUoZSx0LG4pfXN0YXRpYyBmcm9tSW50KGUsdCl7bGV0IG4scixpO3JldHVybiB0PyhpPTA8PShlPj4+PTApJiZlPDI1NikmJihyPUFlW2VdLHIpP3I6KG49amUuZnJvbUJpdHMoZSwoMHxlKTwwPy0xOjAsITApLGkmJihBZVtlXT1uKSxuKTooaT0tMTI4PD0oZXw9MCkmJmU8MTI4KSYmKHI9TGVbZV0scik/cjoobj1qZS5mcm9tQml0cyhlLGU8MD8tMTowLCExKSxpJiYoTGVbZV09biksbil9c3RhdGljIGZyb21OdW1iZXIoZSx0KXtpZihpc05hTihlKSlyZXR1cm4gdD9qZS5VWkVSTzpqZS5aRVJPO2lmKHQpe2lmKGU8MClyZXR1cm4gamUuVVpFUk87aWYoZT49VGUpcmV0dXJuIGplLk1BWF9VTlNJR05FRF9WQUxVRX1lbHNle2lmKGU8PS0kZSlyZXR1cm4gamUuTUlOX1ZBTFVFO2lmKGUrMT49JGUpcmV0dXJuIGplLk1BWF9WQUxVRX1yZXR1cm4gZTwwP2plLmZyb21OdW1iZXIoLWUsdCkubmVnKCk6amUuZnJvbUJpdHMoZSV2ZXwwLGUvdmV8MCx0KX1zdGF0aWMgZnJvbUJpZ0ludChlLHQpe2NvbnN0IG49MHhmZmZmZmZmZm47cmV0dXJuIG5ldyBqZShOdW1iZXIoZSZuKSxOdW1iZXIoZT4+MzJuJm4pLHQpfXN0YXRpYyBfZnJvbVN0cmluZyhlLHQsbil7aWYoMD09PWUubGVuZ3RoKXRocm93IG5ldyBaKCJlbXB0eSBzdHJpbmciKTtpZihuPDJ8fDM2PG4pdGhyb3cgbmV3IFooInJhZGl4Iik7bGV0IHI7aWYoKHI9ZS5pbmRleE9mKCItIikpPjApdGhyb3cgbmV3IFooImludGVyaW9yIGh5cGhlbiIpO2lmKDA9PT1yKXJldHVybiBqZS5fZnJvbVN0cmluZyhlLnN1YnN0cmluZygxKSx0LG4pLm5lZygpO2NvbnN0IGk9amUuZnJvbU51bWJlcihNYXRoLnBvdyhuLDgpKTtsZXQgbz1qZS5aRVJPO2ZvcihsZXQgdD0wO3Q8ZS5sZW5ndGg7dCs9OCl7Y29uc3Qgcj1NYXRoLm1pbig4LGUubGVuZ3RoLXQpLHM9cGFyc2VJbnQoZS5zdWJzdHJpbmcodCx0K3IpLG4pO2lmKHI8OCl7Y29uc3QgZT1qZS5mcm9tTnVtYmVyKE1hdGgucG93KG4scikpO289by5tdWwoZSkuYWRkKGplLmZyb21OdW1iZXIocykpfWVsc2Ugbz1vLm11bChpKSxvPW8uYWRkKGplLmZyb21OdW1iZXIocykpfXJldHVybiBvLnVuc2lnbmVkPXQsb31zdGF0aWMgZnJvbVN0cmluZ1N0cmljdChlLHQsbil7bGV0IHI9ITE7aWYoIm51bWJlciI9PXR5cGVvZiB0PyhuPXQsdD0hMSk6cj0hIXQsbj8/PTEwLGUudHJpbSgpIT09ZSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBjb250YWlucyBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyB3aGl0ZXNwYWNlYCk7aWYoIWZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj0iMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Ii5zbGljZSgwLHQ9dD8/MTApO3JldHVybiFuZXcgUmVnRXhwKGBbXi0rJHtufV1gLCJpIikudGVzdChlKSYmZX0oZSxuKSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgZm9yIHJhZGl4OiAke259YCk7Y29uc3QgaT1OZShlKSxvPWplLl9mcm9tU3RyaW5nKGkscixuKTtpZihvLnRvU3RyaW5nKG4pLnRvTG93ZXJDYXNlKCkhPT1pLnRvTG93ZXJDYXNlKCkpdGhyb3cgbmV3IFooYElucHV0OiAke2V9IGlzIG5vdCByZXByZXNlbnRhYmxlIGFzICR7by51bnNpZ25lZD8iYW4gdW5zaWduZWQiOiJhIHNpZ25lZCJ9IDY0LWJpdCBMb25nICR7bnVsbCE9bj9gd2l0aCByYWRpeDogJHtufWA6IiJ9YCk7cmV0dXJuIG99c3RhdGljIGZyb21TdHJpbmcoZSx0LG4pe2xldCByPSExO3JldHVybiJudW1iZXIiPT10eXBlb2YgdD8obj10LHQ9ITEpOnI9ISF0LG4/Pz0xMCwiTmFOIj09PWUmJm48MjR8fCgiSW5maW5pdHkiPT09ZXx8IitJbmZpbml0eSI9PT1lfHwiLUluZmluaXR5Ij09PWUpJiZuPDM1P2plLlpFUk86amUuX2Zyb21TdHJpbmcoZSxyLG4pfXN0YXRpYyBmcm9tQnl0ZXMoZSx0LG4pe3JldHVybiBuP2plLmZyb21CeXRlc0xFKGUsdCk6amUuZnJvbUJ5dGVzQkUoZSx0KX1zdGF0aWMgZnJvbUJ5dGVzTEUoZSx0KXtyZXR1cm4gbmV3IGplKGVbMF18ZVsxXTw8OHxlWzJdPDwxNnxlWzNdPDwyNCxlWzRdfGVbNV08PDh8ZVs2XTw8MTZ8ZVs3XTw8MjQsdCl9c3RhdGljIGZyb21CeXRlc0JFKGUsdCl7cmV0dXJuIG5ldyBqZShlWzRdPDwyNHxlWzVdPDwxNnxlWzZdPDw4fGVbN10sZVswXTw8MjR8ZVsxXTw8MTZ8ZVsyXTw8OHxlWzNdLHQpfXN0YXRpYyBpc0xvbmcoZSl7cmV0dXJuIG51bGwhPWUmJiJvYmplY3QiPT10eXBlb2YgZSYmIl9faXNMb25nX18iaW4gZSYmITA9PT1lLl9faXNMb25nX199c3RhdGljIGZyb21WYWx1ZShlLHQpe3JldHVybiJudW1iZXIiPT10eXBlb2YgZT9qZS5mcm9tTnVtYmVyKGUsdCk6InN0cmluZyI9PXR5cGVvZiBlP2plLmZyb21TdHJpbmcoZSx0KTpqZS5mcm9tQml0cyhlLmxvdyxlLmhpZ2gsImJvb2xlYW4iPT10eXBlb2YgdD90OmUudW5zaWduZWQpfWFkZChlKXtqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSk7Y29uc3QgdD10aGlzLmhpZ2g+Pj4xNixuPTY1NTM1JnRoaXMuaGlnaCxyPXRoaXMubG93Pj4+MTYsaT02NTUzNSZ0aGlzLmxvdyxvPWUuaGlnaD4+PjE2LHM9NjU1MzUmZS5oaWdoLGE9ZS5sb3c+Pj4xNjtsZXQgYz0wLGY9MCxsPTAsdT0wO3JldHVybiB1Kz1pKyg2NTUzNSZlLmxvdyksbCs9dT4+PjE2LHUmPTY1NTM1LGwrPXIrYSxmKz1sPj4+MTYsbCY9NjU1MzUsZis9bitzLGMrPWY+Pj4xNixmJj02NTUzNSxjKz10K28sYyY9NjU1MzUsamUuZnJvbUJpdHMobDw8MTZ8dSxjPDwxNnxmLHRoaXMudW5zaWduZWQpfWFuZChlKXtyZXR1cm4gamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLGplLmZyb21CaXRzKHRoaXMubG93JmUubG93LHRoaXMuaGlnaCZlLmhpZ2gsdGhpcy51bnNpZ25lZCl9Y29tcGFyZShlKXtpZihqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSksdGhpcy5lcShlKSlyZXR1cm4gMDtjb25zdCB0PXRoaXMuaXNOZWdhdGl2ZSgpLG49ZS5pc05lZ2F0aXZlKCk7cmV0dXJuIHQmJiFuPy0xOiF0JiZuPzE6dGhpcy51bnNpZ25lZD9lLmhpZ2g+Pj4wPnRoaXMuaGlnaD4+PjB8fGUuaGlnaD09PXRoaXMuaGlnaCYmZS5sb3c+Pj4wPnRoaXMubG93Pj4+MD8tMToxOnRoaXMuc3ViKGUpLmlzTmVnYXRpdmUoKT8tMToxfWNvbXAoZSl7cmV0dXJuIHRoaXMuY29tcGFyZShlKX1kaXZpZGUoZSl7aWYoamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLGUuaXNaZXJvKCkpdGhyb3cgbmV3IFooImRpdmlzaW9uIGJ5IHplcm8iKTtpZihJZSl7aWYoIXRoaXMudW5zaWduZWQmJi0yMTQ3NDgzNjQ4PT09dGhpcy5oaWdoJiYtMT09PWUubG93JiYtMT09PWUuaGlnaClyZXR1cm4gdGhpcztjb25zdCB0PSh0aGlzLnVuc2lnbmVkP0llLmRpdl91OkllLmRpdl9zKSh0aGlzLmxvdyx0aGlzLmhpZ2gsZS5sb3csZS5oaWdoKTtyZXR1cm4gamUuZnJvbUJpdHModCxJZS5nZXRfaGlnaCgpLHRoaXMudW5zaWduZWQpfWlmKHRoaXMuaXNaZXJvKCkpcmV0dXJuIHRoaXMudW5zaWduZWQ/amUuVVpFUk86amUuWkVSTztsZXQgdCxuLHI7aWYodGhpcy51bnNpZ25lZCl7aWYoZS51bnNpZ25lZHx8KGU9ZS50b1Vuc2lnbmVkKCkpLGUuZ3QodGhpcykpcmV0dXJuIGplLlVaRVJPO2lmKGUuZ3QodGhpcy5zaHJ1KDEpKSlyZXR1cm4gamUuVU9ORTtyPWplLlVaRVJPfWVsc2V7aWYodGhpcy5lcShqZS5NSU5fVkFMVUUpKXtpZihlLmVxKGplLk9ORSl8fGUuZXEoamUuTkVHX09ORSkpcmV0dXJuIGplLk1JTl9WQUxVRTtpZihlLmVxKGplLk1JTl9WQUxVRSkpcmV0dXJuIGplLk9ORTtyZXR1cm4gdD10aGlzLnNocigxKS5kaXYoZSkuc2hsKDEpLHQuZXEoamUuWkVSTyk/ZS5pc05lZ2F0aXZlKCk/amUuT05FOmplLk5FR19PTkU6KG49dGhpcy5zdWIoZS5tdWwodCkpLHI9dC5hZGQobi5kaXYoZSkpLHIpfWlmKGUuZXEoamUuTUlOX1ZBTFVFKSlyZXR1cm4gdGhpcy51bnNpZ25lZD9qZS5VWkVSTzpqZS5aRVJPO2lmKHRoaXMuaXNOZWdhdGl2ZSgpKXJldHVybiBlLmlzTmVnYXRpdmUoKT90aGlzLm5lZygpLmRpdihlLm5lZygpKTp0aGlzLm5lZygpLmRpdihlKS5uZWcoKTtpZihlLmlzTmVnYXRpdmUoKSlyZXR1cm4gdGhpcy5kaXYoZS5uZWcoKSkubmVnKCk7cj1qZS5aRVJPfWZvcihuPXRoaXM7bi5ndGUoZSk7KXt0PU1hdGgubWF4KDEsTWF0aC5mbG9vcihuLnRvTnVtYmVyKCkvZS50b051bWJlcigpKSk7Y29uc3QgaT1NYXRoLmNlaWwoTWF0aC5sb2codCkvTWF0aC5MTjIpLG89aTw9NDg/MTpNYXRoLnBvdygyLGktNDgpO2xldCBzPWplLmZyb21OdW1iZXIodCksYT1zLm11bChlKTtmb3IoO2EuaXNOZWdhdGl2ZSgpfHxhLmd0KG4pOyl0LT1vLHM9amUuZnJvbU51bWJlcih0LHRoaXMudW5zaWduZWQpLGE9cy5tdWwoZSk7cy5pc1plcm8oKSYmKHM9amUuT05FKSxyPXIuYWRkKHMpLG49bi5zdWIoYSl9cmV0dXJuIHJ9ZGl2KGUpe3JldHVybiB0aGlzLmRpdmlkZShlKX1lcXVhbHMoZSl7cmV0dXJuIGplLmlzTG9uZyhlKXx8KGU9amUuZnJvbVZhbHVlKGUpKSwodGhpcy51bnNpZ25lZD09PWUudW5zaWduZWR8fHRoaXMuaGlnaD4+PjMxIT0xfHxlLmhpZ2g+Pj4zMSE9MSkmJih0aGlzLmhpZ2g9PT1lLmhpZ2gmJnRoaXMubG93PT09ZS5sb3cpfWVxKGUpe3JldHVybiB0aGlzLmVxdWFscyhlKX1nZXRIaWdoQml0cygpe3JldHVybiB0aGlzLmhpZ2h9Z2V0SGlnaEJpdHNVbnNpZ25lZCgpe3JldHVybiB0aGlzLmhpZ2g+Pj4wfWdldExvd0JpdHMoKXtyZXR1cm4gdGhpcy5sb3d9Z2V0TG93Qml0c1Vuc2lnbmVkKCl7cmV0dXJuIHRoaXMubG93Pj4+MH1nZXROdW1CaXRzQWJzKCl7aWYodGhpcy5pc05lZ2F0aXZlKCkpcmV0dXJuIHRoaXMuZXEoamUuTUlOX1ZBTFVFKT82NDp0aGlzLm5lZygpLmdldE51bUJpdHNBYnMoKTtjb25zdCBlPTAhPT10aGlzLmhpZ2g/dGhpcy5oaWdoOnRoaXMubG93O2xldCB0O2Zvcih0PTMxO3Q+MCYmIShlJjE8PHQpO3QtLSk7cmV0dXJuIDAhPT10aGlzLmhpZ2g/dCszMzp0KzF9Z3JlYXRlclRoYW4oZSl7cmV0dXJuIHRoaXMuY29tcChlKT4wfWd0KGUpe3JldHVybiB0aGlzLmdyZWF0ZXJUaGFuKGUpfWdyZWF0ZXJUaGFuT3JFcXVhbChlKXtyZXR1cm4gdGhpcy5jb21wKGUpPj0wfWd0ZShlKXtyZXR1cm4gdGhpcy5ncmVhdGVyVGhhbk9yRXF1YWwoZSl9Z2UoZSl7cmV0dXJuIHRoaXMuZ3JlYXRlclRoYW5PckVxdWFsKGUpfWlzRXZlbigpe3JldHVybiEoMSZ0aGlzLmxvdyl9aXNOZWdhdGl2ZSgpe3JldHVybiF0aGlzLnVuc2lnbmVkJiZ0aGlzLmhpZ2g8MH1pc09kZCgpe3JldHVybiEoMSZ+dGhpcy5sb3cpfWlzUG9zaXRpdmUoKXtyZXR1cm4gdGhpcy51bnNpZ25lZHx8dGhpcy5oaWdoPj0wfWlzWmVybygpe3JldHVybiAwPT09dGhpcy5oaWdoJiYwPT09dGhpcy5sb3d9bGVzc1RoYW4oZSl7cmV0dXJuIHRoaXMuY29tcChlKTwwfWx0KGUpe3JldHVybiB0aGlzLmxlc3NUaGFuKGUpfWxlc3NUaGFuT3JFcXVhbChlKXtyZXR1cm4gdGhpcy5jb21wKGUpPD0wfWx0ZShlKXtyZXR1cm4gdGhpcy5sZXNzVGhhbk9yRXF1YWwoZSl9bW9kdWxvKGUpe2lmKGplLmlzTG9uZyhlKXx8KGU9amUuZnJvbVZhbHVlKGUpKSxJZSl7Y29uc3QgdD0odGhpcy51bnNpZ25lZD9JZS5yZW1fdTpJZS5yZW1fcykodGhpcy5sb3csdGhpcy5oaWdoLGUubG93LGUuaGlnaCk7cmV0dXJuIGplLmZyb21CaXRzKHQsSWUuZ2V0X2hpZ2goKSx0aGlzLnVuc2lnbmVkKX1yZXR1cm4gdGhpcy5zdWIodGhpcy5kaXYoZSkubXVsKGUpKX1tb2QoZSl7cmV0dXJuIHRoaXMubW9kdWxvKGUpfXJlbShlKXtyZXR1cm4gdGhpcy5tb2R1bG8oZSl9bXVsdGlwbHkoZSl7aWYodGhpcy5pc1plcm8oKSlyZXR1cm4gamUuWkVSTztpZihqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSksSWUpe2NvbnN0IHQ9SWUubXVsKHRoaXMubG93LHRoaXMuaGlnaCxlLmxvdyxlLmhpZ2gpO3JldHVybiBqZS5mcm9tQml0cyh0LEllLmdldF9oaWdoKCksdGhpcy51bnNpZ25lZCl9aWYoZS5pc1plcm8oKSlyZXR1cm4gamUuWkVSTztpZih0aGlzLmVxKGplLk1JTl9WQUxVRSkpcmV0dXJuIGUuaXNPZGQoKT9qZS5NSU5fVkFMVUU6amUuWkVSTztpZihlLmVxKGplLk1JTl9WQUxVRSkpcmV0dXJuIHRoaXMuaXNPZGQoKT9qZS5NSU5fVkFMVUU6amUuWkVSTztpZih0aGlzLmlzTmVnYXRpdmUoKSlyZXR1cm4gZS5pc05lZ2F0aXZlKCk/dGhpcy5uZWcoKS5tdWwoZS5uZWcoKSk6dGhpcy5uZWcoKS5tdWwoZSkubmVnKCk7aWYoZS5pc05lZ2F0aXZlKCkpcmV0dXJuIHRoaXMubXVsKGUubmVnKCkpLm5lZygpO2lmKHRoaXMubHQoamUuVFdPX1BXUl8yNCkmJmUubHQoamUuVFdPX1BXUl8yNCkpcmV0dXJuIGplLmZyb21OdW1iZXIodGhpcy50b051bWJlcigpKmUudG9OdW1iZXIoKSx0aGlzLnVuc2lnbmVkKTtjb25zdCB0PXRoaXMuaGlnaD4+PjE2LG49NjU1MzUmdGhpcy5oaWdoLHI9dGhpcy5sb3c+Pj4xNixpPTY1NTM1JnRoaXMubG93LG89ZS5oaWdoPj4+MTYscz02NTUzNSZlLmhpZ2gsYT1lLmxvdz4+PjE2LGM9NjU1MzUmZS5sb3c7bGV0IGY9MCxsPTAsdT0wLF89MDtyZXR1cm4gXys9aSpjLHUrPV8+Pj4xNixfJj02NTUzNSx1Kz1yKmMsbCs9dT4+PjE2LHUmPTY1NTM1LHUrPWkqYSxsKz11Pj4+MTYsdSY9NjU1MzUsbCs9bipjLGYrPWw+Pj4xNixsJj02NTUzNSxsKz1yKmEsZis9bD4+PjE2LGwmPTY1NTM1LGwrPWkqcyxmKz1sPj4+MTYsbCY9NjU1MzUsZis9dCpjK24qYStyKnMraSpvLGYmPTY1NTM1LGplLmZyb21CaXRzKHU8PDE2fF8sZjw8MTZ8bCx0aGlzLnVuc2lnbmVkKX1tdWwoZSl7cmV0dXJuIHRoaXMubXVsdGlwbHkoZSl9bmVnYXRlKCl7cmV0dXJuIXRoaXMudW5zaWduZWQmJnRoaXMuZXEoamUuTUlOX1ZBTFVFKT9qZS5NSU5fVkFMVUU6dGhpcy5ub3QoKS5hZGQoamUuT05FKX1uZWcoKXtyZXR1cm4gdGhpcy5uZWdhdGUoKX1ub3QoKXtyZXR1cm4gamUuZnJvbUJpdHMofnRoaXMubG93LH50aGlzLmhpZ2gsdGhpcy51bnNpZ25lZCl9bm90RXF1YWxzKGUpe3JldHVybiF0aGlzLmVxdWFscyhlKX1uZXEoZSl7cmV0dXJuIHRoaXMubm90RXF1YWxzKGUpfW5lKGUpe3JldHVybiB0aGlzLm5vdEVxdWFscyhlKX1vcihlKXtyZXR1cm4gamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLGplLmZyb21CaXRzKHRoaXMubG93fGUubG93LHRoaXMuaGlnaHxlLmhpZ2gsdGhpcy51bnNpZ25lZCl9c2hpZnRMZWZ0KGUpe3JldHVybiBqZS5pc0xvbmcoZSkmJihlPWUudG9JbnQoKSksMD09KGUmPTYzKT90aGlzOmU8MzI/amUuZnJvbUJpdHModGhpcy5sb3c8PGUsdGhpcy5oaWdoPDxlfHRoaXMubG93Pj4+MzItZSx0aGlzLnVuc2lnbmVkKTpqZS5mcm9tQml0cygwLHRoaXMubG93PDxlLTMyLHRoaXMudW5zaWduZWQpfXNobChlKXtyZXR1cm4gdGhpcy5zaGlmdExlZnQoZSl9c2hpZnRSaWdodChlKXtyZXR1cm4gamUuaXNMb25nKGUpJiYoZT1lLnRvSW50KCkpLDA9PShlJj02Myk/dGhpczplPDMyP2plLmZyb21CaXRzKHRoaXMubG93Pj4+ZXx0aGlzLmhpZ2g8PDMyLWUsdGhpcy5oaWdoPj5lLHRoaXMudW5zaWduZWQpOmplLmZyb21CaXRzKHRoaXMuaGlnaD4+ZS0zMix0aGlzLmhpZ2g+PTA/MDotMSx0aGlzLnVuc2lnbmVkKX1zaHIoZSl7cmV0dXJuIHRoaXMuc2hpZnRSaWdodChlKX1zaGlmdFJpZ2h0VW5zaWduZWQoZSl7aWYoamUuaXNMb25nKGUpJiYoZT1lLnRvSW50KCkpLDA9PT0oZSY9NjMpKXJldHVybiB0aGlzO3tjb25zdCB0PXRoaXMuaGlnaDtpZihlPDMyKXtjb25zdCBuPXRoaXMubG93O3JldHVybiBqZS5mcm9tQml0cyhuPj4+ZXx0PDwzMi1lLHQ+Pj5lLHRoaXMudW5zaWduZWQpfXJldHVybiAzMj09PWU/amUuZnJvbUJpdHModCwwLHRoaXMudW5zaWduZWQpOmplLmZyb21CaXRzKHQ+Pj5lLTMyLDAsdGhpcy51bnNpZ25lZCl9fXNocl91KGUpe3JldHVybiB0aGlzLnNoaWZ0UmlnaHRVbnNpZ25lZChlKX1zaHJ1KGUpe3JldHVybiB0aGlzLnNoaWZ0UmlnaHRVbnNpZ25lZChlKX1zdWJ0cmFjdChlKXtyZXR1cm4gamUuaXNMb25nKGUpfHwoZT1qZS5mcm9tVmFsdWUoZSkpLHRoaXMuYWRkKGUubmVnKCkpfXN1YihlKXtyZXR1cm4gdGhpcy5zdWJ0cmFjdChlKX10b0ludCgpe3JldHVybiB0aGlzLnVuc2lnbmVkP3RoaXMubG93Pj4+MDp0aGlzLmxvd310b051bWJlcigpe3JldHVybiB0aGlzLnVuc2lnbmVkPyh0aGlzLmhpZ2g+Pj4wKSp2ZSsodGhpcy5sb3c+Pj4wKTp0aGlzLmhpZ2gqdmUrKHRoaXMubG93Pj4+MCl9dG9CaWdJbnQoKXtyZXR1cm4gQmlnSW50KHRoaXMudG9TdHJpbmcoKSl9dG9CeXRlcyhlKXtyZXR1cm4gZT90aGlzLnRvQnl0ZXNMRSgpOnRoaXMudG9CeXRlc0JFKCl9dG9CeXRlc0xFKCl7Y29uc3QgZT10aGlzLmhpZ2gsdD10aGlzLmxvdztyZXR1cm5bMjU1JnQsdD4+PjgmMjU1LHQ+Pj4xNiYyNTUsdD4+PjI0LDI1NSZlLGU+Pj44JjI1NSxlPj4+MTYmMjU1LGU+Pj4yNF19dG9CeXRlc0JFKCl7Y29uc3QgZT10aGlzLmhpZ2gsdD10aGlzLmxvdztyZXR1cm5bZT4+PjI0LGU+Pj4xNiYyNTUsZT4+PjgmMjU1LDI1NSZlLHQ+Pj4yNCx0Pj4+MTYmMjU1LHQ+Pj44JjI1NSwyNTUmdF19dG9TaWduZWQoKXtyZXR1cm4gdGhpcy51bnNpZ25lZD9qZS5mcm9tQml0cyh0aGlzLmxvdyx0aGlzLmhpZ2gsITEpOnRoaXN9dG9TdHJpbmcoZSl7aWYoKGU9ZXx8MTApPDJ8fDM2PGUpdGhyb3cgbmV3IFooInJhZGl4Iik7aWYodGhpcy5pc1plcm8oKSlyZXR1cm4iMCI7aWYodGhpcy5pc05lZ2F0aXZlKCkpe2lmKHRoaXMuZXEoamUuTUlOX1ZBTFVFKSl7Y29uc3QgdD1qZS5mcm9tTnVtYmVyKGUpLG49dGhpcy5kaXYodCkscj1uLm11bCh0KS5zdWIodGhpcyk7cmV0dXJuIG4udG9TdHJpbmcoZSkrci50b0ludCgpLnRvU3RyaW5nKGUpfXJldHVybiItIit0aGlzLm5lZygpLnRvU3RyaW5nKGUpfWNvbnN0IHQ9amUuZnJvbU51bWJlcihNYXRoLnBvdyhlLDYpLHRoaXMudW5zaWduZWQpO2xldCBuPXRoaXMscj0iIjtmb3IoOzspe2NvbnN0IGk9bi5kaXYodCk7bGV0IG89KG4uc3ViKGkubXVsKHQpKS50b0ludCgpPj4+MCkudG9TdHJpbmcoZSk7aWYobj1pLG4uaXNaZXJvKCkpcmV0dXJuIG8rcjtmb3IoO28ubGVuZ3RoPDY7KW89IjAiK287cj0iIitvK3J9fXRvVW5zaWduZWQoKXtyZXR1cm4gdGhpcy51bnNpZ25lZD90aGlzOmplLmZyb21CaXRzKHRoaXMubG93LHRoaXMuaGlnaCwhMCl9eG9yKGUpe3JldHVybiBqZS5pc0xvbmcoZSl8fChlPWplLmZyb21WYWx1ZShlKSksamUuZnJvbUJpdHModGhpcy5sb3deZS5sb3csdGhpcy5oaWdoXmUuaGlnaCx0aGlzLnVuc2lnbmVkKX1lcXooKXtyZXR1cm4gdGhpcy5pc1plcm8oKX1sZShlKXtyZXR1cm4gdGhpcy5sZXNzVGhhbk9yRXF1YWwoZSl9dG9FeHRlbmRlZEpTT04oZSl7cmV0dXJuIGUmJmUucmVsYXhlZD90aGlzLnRvTnVtYmVyKCk6eyRudW1iZXJMb25nOnRoaXMudG9TdHJpbmcoKX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSx0KXtjb25zdHt1c2VCaWdJbnQ2NDpuPSExLHJlbGF4ZWQ6cj0hMH09ey4uLnR9O2lmKGUuJG51bWJlckxvbmcubGVuZ3RoPjIwKXRocm93IG5ldyBaKCIkbnVtYmVyTG9uZyBzdHJpbmcgaXMgdG9vIGxvbmciKTtpZighUmUudGVzdChlLiRudW1iZXJMb25nKSl0aHJvdyBuZXcgWihgJG51bWJlckxvbmcgc3RyaW5nICIke2UuJG51bWJlckxvbmd9IiBpcyBpbiBhbiBpbnZhbGlkIGZvcm1hdGApO2lmKG4pe2NvbnN0IHQ9QmlnSW50KGUuJG51bWJlckxvbmcpO3JldHVybiBCaWdJbnQuYXNJbnROKDY0LHQpfWNvbnN0IGk9amUuZnJvbVN0cmluZyhlLiRudW1iZXJMb25nKTtyZXR1cm4gcj9pLnRvTnVtYmVyKCk6aX1pbnNwZWN0KGUsdCxuKXtuPz89dztyZXR1cm5gbmV3IExvbmcoJHtuKHRoaXMudG9TdHJpbmcoKSx0KX0ke3RoaXMudW5zaWduZWQ/YCwgJHtuKHRoaXMudW5zaWduZWQsdCl9YDoiIn0pYH19Y29uc3QgRmU9L14oXCt8LSk/KFxkK3woXGQqXC5cZCopKT8oRXxlKT8oWy0rXSk/KFxkKyk/JC8sa2U9L14oXCt8LSk/KEluZmluaXR5fGluZikkL2ksemU9L14oXCt8LSk/TmFOJC9pLERlPTYxMTEsQ2U9LTYxNzYsTWU9X2UuZnJvbU51bWJlckFycmF5KFsxMjQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLnJldmVyc2UoKSksVmU9X2UuZnJvbU51bWJlckFycmF5KFsyNDgsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLnJldmVyc2UoKSksUGU9X2UuZnJvbU51bWJlckFycmF5KFsxMjAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLnJldmVyc2UoKSksSmU9L14oWy0rXSk/KFxkKyk/JC87ZnVuY3Rpb24gV2UoZSl7cmV0dXJuIWlzTmFOKHBhcnNlSW50KGUsMTApKX1mdW5jdGlvbiBZZShlKXtjb25zdCB0PWplLmZyb21OdW1iZXIoMWU5KTtsZXQgbj1qZS5mcm9tTnVtYmVyKDApO2lmKCEoZS5wYXJ0c1swXXx8ZS5wYXJ0c1sxXXx8ZS5wYXJ0c1syXXx8ZS5wYXJ0c1szXSkpcmV0dXJue3F1b3RpZW50OmUscmVtOm59O2ZvcihsZXQgcj0wO3I8PTM7cisrKW49bi5zaGlmdExlZnQoMzIpLG49bi5hZGQobmV3IGplKGUucGFydHNbcl0sMCkpLGUucGFydHNbcl09bi5kaXYodCkubG93LG49bi5tb2R1bG8odCk7cmV0dXJue3F1b3RpZW50OmUscmVtOm59fWZ1bmN0aW9uIHFlKGUsdCl7dGhyb3cgbmV3IFooYCIke2V9IiBpcyBub3QgYSB2YWxpZCBEZWNpbWFsMTI4IHN0cmluZyAtICR7dH1gKX1jbGFzcyBIZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iRGVjaW1hbDEyOCJ9Ynl0ZXM7Y29uc3RydWN0b3IoZSl7aWYoc3VwZXIoKSwic3RyaW5nIj09dHlwZW9mIGUpdGhpcy5ieXRlcz1IZS5mcm9tU3RyaW5nKGUpLmJ5dGVzO2Vsc2V7aWYoIShlIGluc3RhbmNlb2YgVWludDhBcnJheXx8XyhlKSkpdGhyb3cgbmV3IFooIkRlY2ltYWwxMjggbXVzdCB0YWtlIGEgQnVmZmVyIG9yIHN0cmluZyIpO2lmKDE2IT09ZS5ieXRlTGVuZ3RoKXRocm93IG5ldyBaKCJEZWNpbWFsMTI4IG11c3QgdGFrZSBhIEJ1ZmZlciBvZiAxNiBieXRlcyIpO3RoaXMuYnl0ZXM9ZX19c3RhdGljIGZyb21TdHJpbmcoZSl7cmV0dXJuIEhlLl9mcm9tU3RyaW5nKGUse2FsbG93Um91bmRpbmc6ITF9KX1zdGF0aWMgZnJvbVN0cmluZ1dpdGhSb3VuZGluZyhlKXtyZXR1cm4gSGUuX2Zyb21TdHJpbmcoZSx7YWxsb3dSb3VuZGluZzohMH0pfXN0YXRpYyBfZnJvbVN0cmluZyhlLHQpe2xldCBuPSExLHI9ITEsaT0hMSxvPSExLHM9MCxhPTAsYz0wLGY9MCxsPTA7Y29uc3QgdT1bMF07bGV0IF89MCxnPTAsaD0wLGI9MCxkPW5ldyBqZSgwLDApLHc9bmV3IGplKDAsMCkscD0wLHk9MDtpZihlLmxlbmd0aD49N2UzKXRocm93IG5ldyBaKGUrIiBub3QgYSB2YWxpZCBEZWNpbWFsMTI4IHN0cmluZyIpO2NvbnN0IG09ZS5tYXRjaChGZSksUz1lLm1hdGNoKGtlKSxCPWUubWF0Y2goemUpO2lmKCFtJiYhUyYmIUJ8fDA9PT1lLmxlbmd0aCl0aHJvdyBuZXcgWihlKyIgbm90IGEgdmFsaWQgRGVjaW1hbDEyOCBzdHJpbmciKTtpZihtKXtjb25zdCB0PW1bMl0sbj1tWzRdLHI9bVs1XSxpPW1bNl07biYmdm9pZCAwPT09aSYmcWUoZSwibWlzc2luZyBleHBvbmVudCBwb3dlciIpLG4mJnZvaWQgMD09PXQmJnFlKGUsIm1pc3NpbmcgZXhwb25lbnQgYmFzZSIpLHZvaWQgMD09PW4mJihyfHxpKSYmcWUoZSwibWlzc2luZyBlIGJlZm9yZSBleHBvbmVudCIpfWlmKCIrIiE9PWVbeV0mJiItIiE9PWVbeV18fChyPSEwLG49Ii0iPT09ZVt5KytdKSwhV2UoZVt5XSkmJiIuIiE9PWVbeV0pe2lmKCJpIj09PWVbeV18fCJJIj09PWVbeV0pcmV0dXJuIG5ldyBIZShuP1ZlOlBlKTtpZigiTiI9PT1lW3ldKXJldHVybiBuZXcgSGUoTWUpfWZvcig7V2UoZVt5XSl8fCIuIj09PWVbeV07KSIuIiE9PWVbeV0/KF88MzQmJigiMCIhPT1lW3ldfHxvKSYmKG98fChsPWEpLG89ITAsdVtnKytdPXBhcnNlSW50KGVbeV0sMTApLF8rPTEpLG8mJihjKz0xKSxpJiYoZis9MSksYSs9MSx5Kz0xKTooaSYmcWUoZSwiY29udGFpbnMgbXVsdGlwbGUgcGVyaW9kcyIpLGk9ITAseSs9MSk7aWYoaSYmIWEpdGhyb3cgbmV3IFooZSsiIG5vdCBhIHZhbGlkIERlY2ltYWwxMjggc3RyaW5nIik7aWYoImUiPT09ZVt5XXx8IkUiPT09ZVt5XSl7Y29uc3QgdD1lLnN1YnN0cigrK3kpLm1hdGNoKEplKTtpZighdHx8IXRbMl0pcmV0dXJuIG5ldyBIZShNZSk7Yj1wYXJzZUludCh0WzBdLDEwKSx5Kz10WzBdLmxlbmd0aH1pZihlW3ldKXJldHVybiBuZXcgSGUoTWUpO2lmKF8pe2lmKGg9Xy0xLHM9YywxIT09cylmb3IoOyIwIj09PWVbbCtzLTErTnVtYmVyKHIpK051bWJlcihpKV07KXMtPTF9ZWxzZSB1WzBdPTAsYz0xLF89MSxzPTA7Zm9yKGI8PWYmJmY+YisxNjM4ND9iPUNlOmItPWY7Yj5EZTspe2lmKGgrPTEsaD49MzQpe2lmKDA9PT1zKXtiPURlO2JyZWFrfXFlKGUsIm92ZXJmbG93Iil9Yi09MX1pZih0LmFsbG93Um91bmRpbmcpe2Zvcig7YjxDZXx8XzxjOyl7aWYoMD09PWgmJnM8Xyl7Yj1DZSxzPTA7YnJlYWt9aWYoXzxjP2MtPTE6aC09MSxiPERlKWIrPTE7ZWxzZXtpZih1LmpvaW4oIiIpLm1hdGNoKC9eMCskLykpe2I9RGU7YnJlYWt9cWUoZSwib3ZlcmZsb3ciKX19aWYoaCsxPHMpe2xldCB0PWE7aSYmKGwrPTEsdCs9MSksciYmKGwrPTEsdCs9MSk7Y29uc3Qgbz1wYXJzZUludChlW2wraCsxXSwxMCk7bGV0IHM9MDtpZihvPj01JiYocz0xLDU9PT1vKSl7cz11W2hdJTI9PTE/MTowO2ZvcihsZXQgbj1sK2grMjtuPHQ7bisrKWlmKHBhcnNlSW50KGVbbl0sMTApKXtzPTE7YnJlYWt9fWlmKHMpe2xldCBlPWg7Zm9yKDtlPj0wJiYrK3VbZV0+OTtlLS0paWYodVtlXT0wLDA9PT1lKXtpZighKGI8RGUpKXJldHVybiBuZXcgSGUobj9WZTpQZSk7Yis9MSx1W2VdPTF9fX19ZWxzZXtmb3IoO2I8Q2V8fF88Yzspe2lmKDA9PT1oKXtpZigwPT09cyl7Yj1DZTticmVha31xZShlLCJleHBvbmVudCB1bmRlcmZsb3ciKX1fPGM/KCIwIiE9PWVbYy0xK051bWJlcihyKStOdW1iZXIoaSldJiYwIT09cyYmcWUoZSwiaW5leGFjdCByb3VuZGluZyIpLGMtPTEpOigwIT09dVtoXSYmcWUoZSwiaW5leGFjdCByb3VuZGluZyIpLGgtPTEpLGI8RGU/Yis9MTpxZShlLCJvdmVyZmxvdyIpfWlmKGgrMTxzKXtpJiYobCs9MSksciYmKGwrPTEpOzAhPT1wYXJzZUludChlW2wraCsxXSwxMCkmJnFlKGUsImluZXhhY3Qgcm91bmRpbmciKX19aWYoZD1qZS5mcm9tTnVtYmVyKDApLHc9amUuZnJvbU51bWJlcigwKSwwPT09cylkPWplLmZyb21OdW1iZXIoMCksdz1qZS5mcm9tTnVtYmVyKDApO2Vsc2UgaWYoaDwxNyl7bGV0IGU9MDtmb3Iodz1qZS5mcm9tTnVtYmVyKHVbZSsrXSksZD1uZXcgamUoMCwwKTtlPD1oO2UrKyl3PXcubXVsdGlwbHkoamUuZnJvbU51bWJlcigxMCkpLHc9dy5hZGQoamUuZnJvbU51bWJlcih1W2VdKSl9ZWxzZXtsZXQgZT0wO2ZvcihkPWplLmZyb21OdW1iZXIodVtlKytdKTtlPD1oLTE3O2UrKylkPWQubXVsdGlwbHkoamUuZnJvbU51bWJlcigxMCkpLGQ9ZC5hZGQoamUuZnJvbU51bWJlcih1W2VdKSk7Zm9yKHc9amUuZnJvbU51bWJlcih1W2UrK10pO2U8PWg7ZSsrKXc9dy5tdWx0aXBseShqZS5mcm9tTnVtYmVyKDEwKSksdz13LmFkZChqZS5mcm9tTnVtYmVyKHVbZV0pKX1jb25zdCB4PWZ1bmN0aW9uKGUsdCl7aWYoIWUmJiF0KXJldHVybntoaWdoOmplLmZyb21OdW1iZXIoMCksbG93OmplLmZyb21OdW1iZXIoMCl9O2NvbnN0IG49ZS5zaGlmdFJpZ2h0VW5zaWduZWQoMzIpLHI9bmV3IGplKGUuZ2V0TG93Qml0cygpLDApLGk9dC5zaGlmdFJpZ2h0VW5zaWduZWQoMzIpLG89bmV3IGplKHQuZ2V0TG93Qml0cygpLDApO2xldCBzPW4ubXVsdGlwbHkoaSksYT1uLm11bHRpcGx5KG8pO2NvbnN0IGM9ci5tdWx0aXBseShpKTtsZXQgZj1yLm11bHRpcGx5KG8pO3JldHVybiBzPXMuYWRkKGEuc2hpZnRSaWdodFVuc2lnbmVkKDMyKSksYT1uZXcgamUoYS5nZXRMb3dCaXRzKCksMCkuYWRkKGMpLmFkZChmLnNoaWZ0UmlnaHRVbnNpZ25lZCgzMikpLHM9cy5hZGQoYS5zaGlmdFJpZ2h0VW5zaWduZWQoMzIpKSxmPWEuc2hpZnRMZWZ0KDMyKS5hZGQobmV3IGplKGYuZ2V0TG93Qml0cygpLDApKSx7aGlnaDpzLGxvdzpmfX0oZCxqZS5mcm9tU3RyaW5nKCIxMDAwMDAwMDAwMDAwMDAwMDAiKSk7eC5sb3c9eC5sb3cuYWRkKHcpLGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1lLmhpZ2g+Pj4wLHI9dC5oaWdoPj4+MDtpZihuPHIpcmV0dXJuITA7aWYobj09PXImJmUubG93Pj4+MDx0Lmxvdz4+PjApcmV0dXJuITA7cmV0dXJuITF9KHgubG93LHcpJiYoeC5oaWdoPXguaGlnaC5hZGQoamUuZnJvbU51bWJlcigxKSkpLHA9Yis2MTc2O2NvbnN0IEU9e2xvdzpqZS5mcm9tTnVtYmVyKDApLGhpZ2g6amUuZnJvbU51bWJlcigwKX07eC5oaWdoLnNoaWZ0UmlnaHRVbnNpZ25lZCg0OSkuYW5kKGplLmZyb21OdW1iZXIoMSkpLmVxdWFscyhqZS5mcm9tTnVtYmVyKDEpKT8oRS5oaWdoPUUuaGlnaC5vcihqZS5mcm9tTnVtYmVyKDMpLnNoaWZ0TGVmdCg2MSkpLEUuaGlnaD1FLmhpZ2gub3IoamUuZnJvbU51bWJlcihwKS5hbmQoamUuZnJvbU51bWJlcigxNjM4Mykuc2hpZnRMZWZ0KDQ3KSkpLEUuaGlnaD1FLmhpZ2gub3IoeC5oaWdoLmFuZChqZS5mcm9tTnVtYmVyKDB4N2ZmZmZmZmZmZmZmKSkpKTooRS5oaWdoPUUuaGlnaC5vcihqZS5mcm9tTnVtYmVyKDE2MzgzJnApLnNoaWZ0TGVmdCg0OSkpLEUuaGlnaD1FLmhpZ2gub3IoeC5oaWdoLmFuZChqZS5mcm9tTnVtYmVyKDU2Mjk0OTk1MzQyMTMxMSkpKSksRS5sb3c9eC5sb3csbiYmKEUuaGlnaD1FLmhpZ2gub3IoamUuZnJvbVN0cmluZygiOTIyMzM3MjAzNjg1NDc3NTgwOCIpKSk7Y29uc3QgVT1fZS5hbGxvY2F0ZVVuc2FmZSgxNik7cmV0dXJuIHk9MCxVW3krK109MjU1JkUubG93LmxvdyxVW3krK109RS5sb3cubG93Pj44JjI1NSxVW3krK109RS5sb3cubG93Pj4xNiYyNTUsVVt5KytdPUUubG93Lmxvdz4+MjQmMjU1LFVbeSsrXT0yNTUmRS5sb3cuaGlnaCxVW3krK109RS5sb3cuaGlnaD4+OCYyNTUsVVt5KytdPUUubG93LmhpZ2g+PjE2JjI1NSxVW3krK109RS5sb3cuaGlnaD4+MjQmMjU1LFVbeSsrXT0yNTUmRS5oaWdoLmxvdyxVW3krK109RS5oaWdoLmxvdz4+OCYyNTUsVVt5KytdPUUuaGlnaC5sb3c+PjE2JjI1NSxVW3krK109RS5oaWdoLmxvdz4+MjQmMjU1LFVbeSsrXT0yNTUmRS5oaWdoLmhpZ2gsVVt5KytdPUUuaGlnaC5oaWdoPj44JjI1NSxVW3krK109RS5oaWdoLmhpZ2g+PjE2JjI1NSxVW3krK109RS5oaWdoLmhpZ2g+PjI0JjI1NSxuZXcgSGUoVSl9dG9TdHJpbmcoKXtsZXQgZSx0PTA7Y29uc3Qgbj1uZXcgQXJyYXkoMzYpO2ZvcihsZXQgZT0wO2U8bi5sZW5ndGg7ZSsrKW5bZV09MDtsZXQgcixpLG8scz0wLGE9ITEsYz17cGFydHM6WzAsMCwwLDBdfTtjb25zdCBmPVtdO3M9MDtjb25zdCBsPXRoaXMuYnl0ZXMsdT1sW3MrK118bFtzKytdPDw4fGxbcysrXTw8MTZ8bFtzKytdPDwyNCxfPWxbcysrXXxsW3MrK108PDh8bFtzKytdPDwxNnxsW3MrK108PDI0LGc9bFtzKytdfGxbcysrXTw8OHxsW3MrK108PDE2fGxbcysrXTw8MjQsaD1sW3MrK118bFtzKytdPDw4fGxbcysrXTw8MTZ8bFtzKytdPDwyNDtzPTA7KHtsb3c6bmV3IGplKHUsXyksaGlnaDpuZXcgamUoZyxoKX0pLmhpZ2gubGVzc1RoYW4oamUuWkVSTykmJmYucHVzaCgiLSIpO2NvbnN0IGI9aD4+MjYmMzE7aWYoYj4+Mz09Myl7aWYoMzA9PT1iKXJldHVybiBmLmpvaW4oIiIpKyJJbmZpbml0eSI7aWYoMzE9PT1iKXJldHVybiJOYU4iO2U9aD4+MTUmMTYzODMscj04KyhoPj4xNCYxKX1lbHNlIHI9aD4+MTQmNyxlPWg+PjE3JjE2MzgzO2NvbnN0IGQ9ZS02MTc2O2lmKGMucGFydHNbMF09KDE2MzgzJmgpKygoMTUmcik8PDE0KSxjLnBhcnRzWzFdPWcsYy5wYXJ0c1syXT1fLGMucGFydHNbM109dSwwPT09Yy5wYXJ0c1swXSYmMD09PWMucGFydHNbMV0mJjA9PT1jLnBhcnRzWzJdJiYwPT09Yy5wYXJ0c1szXSlhPSEwO2Vsc2UgZm9yKG89MztvPj0wO28tLSl7bGV0IGU9MDtjb25zdCB0PVllKGMpO2lmKGM9dC5xdW90aWVudCxlPXQucmVtLmxvdyxlKWZvcihpPTg7aT49MDtpLS0pbls5Km8raV09ZSUxMCxlPU1hdGguZmxvb3IoZS8xMCl9aWYoYSl0PTEsbltzXT0wO2Vsc2UgZm9yKHQ9MzY7IW5bc107KXQtPTEscys9MTtjb25zdCB3PXQtMStkO2lmKHc+PTM0fHx3PD0tN3x8ZD4wKXtpZih0PjM0KXJldHVybiBmLnB1c2goIjAiKSxkPjA/Zi5wdXNoKGBFKyR7ZH1gKTpkPDAmJmYucHVzaChgRSR7ZH1gKSxmLmpvaW4oIiIpO2YucHVzaChgJHtuW3MrK119YCksdC09MSx0JiZmLnB1c2goIi4iKTtmb3IobGV0IGU9MDtlPHQ7ZSsrKWYucHVzaChgJHtuW3MrK119YCk7Zi5wdXNoKCJFIiksdz4wP2YucHVzaChgKyR7d31gKTpmLnB1c2goYCR7d31gKX1lbHNlIGlmKGQ+PTApZm9yKGxldCBlPTA7ZTx0O2UrKylmLnB1c2goYCR7bltzKytdfWApO2Vsc2V7bGV0IGU9dCtkO2lmKGU+MClmb3IobGV0IHQ9MDt0PGU7dCsrKWYucHVzaChgJHtuW3MrK119YCk7ZWxzZSBmLnB1c2goIjAiKTtmb3IoZi5wdXNoKCIuIik7ZSsrPDA7KWYucHVzaCgiMCIpO2ZvcihsZXQgcj0wO3I8dC1NYXRoLm1heChlLTEsMCk7cisrKWYucHVzaChgJHtuW3MrK119YCl9cmV0dXJuIGYuam9pbigiIil9dG9KU09OKCl7cmV0dXJueyRudW1iZXJEZWNpbWFsOnRoaXMudG9TdHJpbmcoKX19dG9FeHRlbmRlZEpTT04oKXtyZXR1cm57JG51bWJlckRlY2ltYWw6dGhpcy50b1N0cmluZygpfX1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlKXtyZXR1cm4gSGUuZnJvbVN0cmluZyhlLiRudW1iZXJEZWNpbWFsKX1pbnNwZWN0KGUsdCxuKXtuPz89dztyZXR1cm5gbmV3IERlY2ltYWwxMjgoJHtuKHRoaXMudG9TdHJpbmcoKSx0KX0pYH19Y2xhc3MgS2UgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkRvdWJsZSJ9dmFsdWU7Y29uc3RydWN0b3IoZSl7c3VwZXIoKSxlIGluc3RhbmNlb2YgTnVtYmVyJiYoZT1lLnZhbHVlT2YoKSksdGhpcy52YWx1ZT0rZX1zdGF0aWMgZnJvbVN0cmluZyhlKXtjb25zdCB0PU51bWJlcihlKTtpZigiTmFOIj09PWUpcmV0dXJuIG5ldyBLZShOYU4pO2lmKCJJbmZpbml0eSI9PT1lKXJldHVybiBuZXcgS2UoMS8wKTtpZigiLUluZmluaXR5Ij09PWUpcmV0dXJuIG5ldyBLZSgtMS8wKTtpZighTnVtYmVyLmlzRmluaXRlKHQpKXRocm93IG5ldyBaKGBJbnB1dDogJHtlfSBpcyBub3QgcmVwcmVzZW50YWJsZSBhcyBhIERvdWJsZWApO2lmKGUudHJpbSgpIT09ZSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBjb250YWlucyB3aGl0ZXNwYWNlYCk7aWYoIiI9PT1lKXRocm93IG5ldyBaKCJJbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmciKTtpZigvW14tMC05LitlRV0vLnRlc3QoZSkpdGhyb3cgbmV3IFooYElucHV0OiAnJHtlfScgaXMgbm90IGluIGRlY2ltYWwgb3IgZXhwb25lbnRpYWwgbm90YXRpb25gKTtyZXR1cm4gbmV3IEtlKHQpfXZhbHVlT2YoKXtyZXR1cm4gdGhpcy52YWx1ZX10b0pTT04oKXtyZXR1cm4gdGhpcy52YWx1ZX10b1N0cmluZyhlKXtyZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZyhlKX10b0V4dGVuZGVkSlNPTihlKXtyZXR1cm4gZSYmKGUubGVnYWN5fHxlLnJlbGF4ZWQmJmlzRmluaXRlKHRoaXMudmFsdWUpKT90aGlzLnZhbHVlOk9iamVjdC5pcyhNYXRoLnNpZ24odGhpcy52YWx1ZSksLTApP3skbnVtYmVyRG91YmxlOiItMC4wIn06eyRudW1iZXJEb3VibGU6TnVtYmVyLmlzSW50ZWdlcih0aGlzLnZhbHVlKT90aGlzLnZhbHVlLnRvRml4ZWQoMSk6dGhpcy52YWx1ZS50b1N0cmluZygpfX1zdGF0aWMgZnJvbUV4dGVuZGVkSlNPTihlLHQpe2NvbnN0IG49cGFyc2VGbG9hdChlLiRudW1iZXJEb3VibGUpO3JldHVybiB0JiZ0LnJlbGF4ZWQ/bjpuZXcgS2Uobil9aW5zcGVjdChlLHQsbil7cmV0dXJuIG4/Pz13LGBuZXcgRG91YmxlKCR7bih0aGlzLnZhbHVlLHQpfSlgfX1jbGFzcyBaZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iSW50MzIifXZhbHVlO2NvbnN0cnVjdG9yKGUpe3N1cGVyKCksZSBpbnN0YW5jZW9mIE51bWJlciYmKGU9ZS52YWx1ZU9mKCkpLHRoaXMudmFsdWU9MHwrZX1zdGF0aWMgZnJvbVN0cmluZyhlKXtjb25zdCB0PU5lKGUpLG49TnVtYmVyKGUpO2lmKG08bil0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBpcyBsYXJnZXIgdGhhbiB0aGUgbWF4aW11bSB2YWx1ZSBmb3IgSW50MzJgKTtpZihTPm4pdGhyb3cgbmV3IFooYElucHV0OiAnJHtlfScgaXMgc21hbGxlciB0aGFuIHRoZSBtaW5pbXVtIHZhbHVlIGZvciBJbnQzMmApO2lmKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihuKSl0aHJvdyBuZXcgWihgSW5wdXQ6ICcke2V9JyBpcyBub3QgYSBzYWZlIGludGVnZXJgKTtpZihuLnRvU3RyaW5nKCkhPT10KXRocm93IG5ldyBaKGBJbnB1dDogJyR7ZX0nIGlzIG5vdCBhIHZhbGlkIEludDMyIHN0cmluZ2ApO3JldHVybiBuZXcgWmUobil9dmFsdWVPZigpe3JldHVybiB0aGlzLnZhbHVlfXRvU3RyaW5nKGUpe3JldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKGUpfXRvSlNPTigpe3JldHVybiB0aGlzLnZhbHVlfXRvRXh0ZW5kZWRKU09OKGUpe3JldHVybiBlJiYoZS5yZWxheGVkfHxlLmxlZ2FjeSk/dGhpcy52YWx1ZTp7JG51bWJlckludDp0aGlzLnZhbHVlLnRvU3RyaW5nKCl9fXN0YXRpYyBmcm9tRXh0ZW5kZWRKU09OKGUsdCl7cmV0dXJuIHQmJnQucmVsYXhlZD9wYXJzZUludChlLiRudW1iZXJJbnQsMTApOm5ldyBaZShlLiRudW1iZXJJbnQpfWluc3BlY3QoZSx0LG4pe3JldHVybiBuPz89dyxgbmV3IEludDMyKCR7bih0aGlzLnZhbHVlLHQpfSlgfX1jbGFzcyBHZSBleHRlbmRzIGhle2dldCBfYnNvbnR5cGUoKXtyZXR1cm4iTWF4S2V5In10b0V4dGVuZGVkSlNPTigpe3JldHVybnskbWF4S2V5OjF9fXN0YXRpYyBmcm9tRXh0ZW5kZWRKU09OKCl7cmV0dXJuIG5ldyBHZX1pbnNwZWN0KCl7cmV0dXJuIm5ldyBNYXhLZXkoKSJ9fWNsYXNzIFhlIGV4dGVuZHMgaGV7Z2V0IF9ic29udHlwZSgpe3JldHVybiJNaW5LZXkifXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJueyRtaW5LZXk6MX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oKXtyZXR1cm4gbmV3IFhlfWluc3BlY3QoKXtyZXR1cm4ibmV3IE1pbktleSgpIn19bGV0IFFlPW51bGw7Y29uc3QgZXQ9bmV3IFdlYWtNYXA7Y2xhc3MgdHQgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIk9iamVjdElkIn1zdGF0aWMgaW5kZXg9TWF0aC5mbG9vcigxNjc3NzIxNSpNYXRoLnJhbmRvbSgpKTtzdGF0aWMgY2FjaGVIZXhTdHJpbmc7YnVmZmVyO2NvbnN0cnVjdG9yKGUpe2xldCB0O2lmKHN1cGVyKCksIm9iamVjdCI9PXR5cGVvZiBlJiZlJiYiaWQiaW4gZSl7aWYoInN0cmluZyIhPXR5cGVvZiBlLmlkJiYhQXJyYXlCdWZmZXIuaXNWaWV3KGUuaWQpKXRocm93IG5ldyBaKCJBcmd1bWVudCBwYXNzZWQgaW4gbXVzdCBoYXZlIGFuIGlkIHRoYXQgaXMgb2YgdHlwZSBzdHJpbmcgb3IgQnVmZmVyIik7dD0idG9IZXhTdHJpbmciaW4gZSYmImZ1bmN0aW9uIj09dHlwZW9mIGUudG9IZXhTdHJpbmc/X2UuZnJvbUhleChlLnRvSGV4U3RyaW5nKCkpOmUuaWR9ZWxzZSB0PWU7aWYobnVsbD09dCl0aGlzLmJ1ZmZlcj10dC5nZW5lcmF0ZSgpO2Vsc2UgaWYoQXJyYXlCdWZmZXIuaXNWaWV3KHQpJiYxMj09PXQuYnl0ZUxlbmd0aCl0aGlzLmJ1ZmZlcj1fZS50b0xvY2FsQnVmZmVyVHlwZSh0KTtlbHNle2lmKCJzdHJpbmciIT10eXBlb2YgdCl0aHJvdyBuZXcgWigiQXJndW1lbnQgcGFzc2VkIGluIGRvZXMgbm90IG1hdGNoIHRoZSBhY2NlcHRlZCB0eXBlcyIpO2lmKCF0dC52YWxpZGF0ZUhleFN0cmluZyh0KSl0aHJvdyBuZXcgWigiaW5wdXQgbXVzdCBiZSBhIDI0IGNoYXJhY3RlciBoZXggc3RyaW5nLCAxMiBieXRlIFVpbnQ4QXJyYXksIG9yIGFuIGludGVnZXIiKTt0aGlzLmJ1ZmZlcj1fZS5mcm9tSGV4KHQpLHR0LmNhY2hlSGV4U3RyaW5nJiZldC5zZXQodGhpcyx0KX19Z2V0IGlkKCl7cmV0dXJuIHRoaXMuYnVmZmVyfXNldCBpZChlKXt0aGlzLmJ1ZmZlcj1lLHR0LmNhY2hlSGV4U3RyaW5nJiZldC5zZXQodGhpcyxfZS50b0hleChlKSl9c3RhdGljIHZhbGlkYXRlSGV4U3RyaW5nKGUpe2lmKDI0IT09ZT8ubGVuZ3RoKXJldHVybiExO2ZvcihsZXQgdD0wO3Q8MjQ7dCsrKXtjb25zdCBuPWUuY2hhckNvZGVBdCh0KTtpZighKG4+PTQ4JiZuPD01N3x8bj49OTcmJm48PTEwMnx8bj49NjUmJm48PTcwKSlyZXR1cm4hMX1yZXR1cm4hMH10b0hleFN0cmluZygpe2lmKHR0LmNhY2hlSGV4U3RyaW5nKXtjb25zdCBlPWV0LmdldCh0aGlzKTtpZihlKXJldHVybiBlfWNvbnN0IGU9X2UudG9IZXgodGhpcy5pZCk7cmV0dXJuIHR0LmNhY2hlSGV4U3RyaW5nJiZldC5zZXQodGhpcyxlKSxlfXN0YXRpYyBnZXRJbmMoKXtyZXR1cm4gdHQuaW5kZXg9KHR0LmluZGV4KzEpJTE2Nzc3MjE1fXN0YXRpYyBnZW5lcmF0ZShlKXsibnVtYmVyIiE9dHlwZW9mIGUmJihlPU1hdGguZmxvb3IoRGF0ZS5ub3coKS8xZTMpKTtjb25zdCB0PXR0LmdldEluYygpLG49X2UuYWxsb2NhdGVVbnNhZmUoMTIpO3JldHVybiBwZS5zZXRJbnQzMkJFKG4sMCxlKSxudWxsPT09UWUmJihRZT1fZS5yYW5kb21CeXRlcyg1KSksbls0XT1RZVswXSxuWzVdPVFlWzFdLG5bNl09UWVbMl0sbls3XT1RZVszXSxuWzhdPVFlWzRdLG5bMTFdPTI1NSZ0LG5bMTBdPXQ+PjgmMjU1LG5bOV09dD4+MTYmMjU1LG59dG9TdHJpbmcoZSl7cmV0dXJuImJhc2U2NCI9PT1lP19lLnRvQmFzZTY0KHRoaXMuaWQpOnRoaXMudG9IZXhTdHJpbmcoKX10b0pTT04oKXtyZXR1cm4gdGhpcy50b0hleFN0cmluZygpfXN0YXRpYyBpcyhlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiX2Jzb250eXBlImluIGUmJiJPYmplY3RJZCI9PT1lLl9ic29udHlwZX1lcXVhbHMoZSl7aWYobnVsbD09ZSlyZXR1cm4hMTtpZih0dC5pcyhlKSlyZXR1cm4gdGhpcy5idWZmZXJbMTFdPT09ZS5idWZmZXJbMTFdJiZfZS5lcXVhbHModGhpcy5idWZmZXIsZS5idWZmZXIpO2lmKCJzdHJpbmciPT10eXBlb2YgZSlyZXR1cm4gZS50b0xvd2VyQ2FzZSgpPT09dGhpcy50b0hleFN0cmluZygpO2lmKCJvYmplY3QiPT10eXBlb2YgZSYmImZ1bmN0aW9uIj09dHlwZW9mIGUudG9IZXhTdHJpbmcpe2NvbnN0IHQ9ZS50b0hleFN0cmluZygpLG49dGhpcy50b0hleFN0cmluZygpO3JldHVybiJzdHJpbmciPT10eXBlb2YgdCYmdC50b0xvd2VyQ2FzZSgpPT09bn1yZXR1cm4hMX1nZXRUaW1lc3RhbXAoKXtjb25zdCBlPW5ldyBEYXRlLHQ9cGUuZ2V0VWludDMyQkUodGhpcy5idWZmZXIsMCk7cmV0dXJuIGUuc2V0VGltZSgxZTMqTWF0aC5mbG9vcih0KSksZX1zdGF0aWMgY3JlYXRlUGsoKXtyZXR1cm4gbmV3IHR0fXNlcmlhbGl6ZUludG8oZSx0KXtyZXR1cm4gZVt0XT10aGlzLmJ1ZmZlclswXSxlW3QrMV09dGhpcy5idWZmZXJbMV0sZVt0KzJdPXRoaXMuYnVmZmVyWzJdLGVbdCszXT10aGlzLmJ1ZmZlclszXSxlW3QrNF09dGhpcy5idWZmZXJbNF0sZVt0KzVdPXRoaXMuYnVmZmVyWzVdLGVbdCs2XT10aGlzLmJ1ZmZlcls2XSxlW3QrN109dGhpcy5idWZmZXJbN10sZVt0KzhdPXRoaXMuYnVmZmVyWzhdLGVbdCs5XT10aGlzLmJ1ZmZlcls5XSxlW3QrMTBdPXRoaXMuYnVmZmVyWzEwXSxlW3QrMTFdPXRoaXMuYnVmZmVyWzExXSwxMn1zdGF0aWMgY3JlYXRlRnJvbVRpbWUoZSl7Y29uc3QgdD1fZS5hbGxvY2F0ZSgxMik7Zm9yKGxldCBlPTExO2U+PTQ7ZS0tKXRbZV09MDtyZXR1cm4gcGUuc2V0SW50MzJCRSh0LDAsZSksbmV3IHR0KHQpfXN0YXRpYyBjcmVhdGVGcm9tSGV4U3RyaW5nKGUpe2lmKDI0IT09ZT8ubGVuZ3RoKXRocm93IG5ldyBaKCJoZXggc3RyaW5nIG11c3QgYmUgMjQgY2hhcmFjdGVycyIpO3JldHVybiBuZXcgdHQoX2UuZnJvbUhleChlKSl9c3RhdGljIGNyZWF0ZUZyb21CYXNlNjQoZSl7aWYoMTYhPT1lPy5sZW5ndGgpdGhyb3cgbmV3IFooImJhc2U2NCBzdHJpbmcgbXVzdCBiZSAxNiBjaGFyYWN0ZXJzIik7cmV0dXJuIG5ldyB0dChfZS5mcm9tQmFzZTY0KGUpKX1zdGF0aWMgaXNWYWxpZChlKXtpZihudWxsPT1lKXJldHVybiExO2lmKCJzdHJpbmciPT10eXBlb2YgZSlyZXR1cm4gdHQudmFsaWRhdGVIZXhTdHJpbmcoZSk7dHJ5e3JldHVybiBuZXcgdHQoZSksITB9Y2F0Y2h7cmV0dXJuITF9fXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJuIHRoaXMudG9IZXhTdHJpbmc/eyRvaWQ6dGhpcy50b0hleFN0cmluZygpfTp7JG9pZDp0aGlzLnRvU3RyaW5nKCJoZXgiKX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7cmV0dXJuIG5ldyB0dChlLiRvaWQpfWlzQ2FjaGVkKCl7cmV0dXJuIHR0LmNhY2hlSGV4U3RyaW5nJiZldC5oYXModGhpcyl9aW5zcGVjdChlLHQsbil7cmV0dXJuIG4/Pz13LGBuZXcgT2JqZWN0SWQoJHtuKHRoaXMudG9IZXhTdHJpbmcoKSx0KX0pYH19ZnVuY3Rpb24gbnQoZSx0LG4pe2xldCByPTU7aWYoQXJyYXkuaXNBcnJheShlKSlmb3IobGV0IGk9MDtpPGUubGVuZ3RoO2krKylyKz1ydChpLnRvU3RyaW5nKCksZVtpXSx0LCEwLG4pO2Vsc2V7ImZ1bmN0aW9uIj09dHlwZW9mIGU/LnRvQlNPTiYmKGU9ZS50b0JTT04oKSk7Zm9yKGNvbnN0IGkgb2YgT2JqZWN0LmtleXMoZSkpcis9cnQoaSxlW2ldLHQsITEsbil9cmV0dXJuIHJ9ZnVuY3Rpb24gcnQoZSx0LG49ITEscj0hMSxpPSExKXtzd2l0Y2goImZ1bmN0aW9uIj09dHlwZW9mIHQ/LnRvQlNPTiYmKHQ9dC50b0JTT04oKSksdHlwZW9mIHQpe2Nhc2Uic3RyaW5nIjpyZXR1cm4gMStfZS51dGY4Qnl0ZUxlbmd0aChlKSsxKzQrX2UudXRmOEJ5dGVMZW5ndGgodCkrMTtjYXNlIm51bWJlciI6cmV0dXJuIE1hdGguZmxvb3IodCk9PT10JiZ0Pj1VJiZ0PD1FJiZ0Pj1TJiZ0PD1tPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrNToobnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzk7Y2FzZSJ1bmRlZmluZWQiOnJldHVybiByfHwhaT8obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzE6MDtjYXNlImJvb2xlYW4iOnJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMjtjYXNlIm9iamVjdCI6aWYobnVsbCE9dCYmInN0cmluZyI9PXR5cGVvZiB0Ll9ic29udHlwZSYmdFt5XSE9PXApdGhyb3cgbmV3IEc7aWYobnVsbD09dHx8Ik1pbktleSI9PT10Ll9ic29udHlwZXx8Ik1heEtleSI9PT10Ll9ic29udHlwZSlyZXR1cm4obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzE7aWYoIk9iamVjdElkIj09PXQuX2Jzb250eXBlKXJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMTM7aWYodCBpbnN0YW5jZW9mIERhdGV8fGQodCkpcmV0dXJuKG51bGwhPWU/X2UudXRmOEJ5dGVMZW5ndGgoZSkrMTowKSs5O2lmKEFycmF5QnVmZmVyLmlzVmlldyh0KXx8dCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyfHxnKHQpKXJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrNit0LmJ5dGVMZW5ndGg7aWYoIkxvbmciPT09dC5fYnNvbnR5cGV8fCJEb3VibGUiPT09dC5fYnNvbnR5cGV8fCJUaW1lc3RhbXAiPT09dC5fYnNvbnR5cGUpcmV0dXJuKG51bGwhPWU/X2UudXRmOEJ5dGVMZW5ndGgoZSkrMTowKSs5O2lmKCJEZWNpbWFsMTI4Ij09PXQuX2Jzb250eXBlKXJldHVybihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMTc7aWYoIkNvZGUiPT09dC5fYnNvbnR5cGUpcmV0dXJuIG51bGwhPXQuc2NvcGUmJk9iamVjdC5rZXlzKHQuc2NvcGUpLmxlbmd0aD4wPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMSs0KzQrX2UudXRmOEJ5dGVMZW5ndGgodC5jb2RlLnRvU3RyaW5nKCkpKzErbnQodC5zY29wZSxuLGkpOihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMSs0K19lLnV0ZjhCeXRlTGVuZ3RoKHQuY29kZS50b1N0cmluZygpKSsxO2lmKCJCaW5hcnkiPT09dC5fYnNvbnR5cGUpe2NvbnN0IG49dDtyZXR1cm4gbi5zdWJfdHlwZT09PXllLlNVQlRZUEVfQllURV9BUlJBWT8obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKyhuLnBvc2l0aW9uKzErNCsxKzQpOihudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrKG4ucG9zaXRpb24rMSs0KzEpfWlmKCJTeW1ib2wiPT09dC5fYnNvbnR5cGUpcmV0dXJuKG51bGwhPWU/X2UudXRmOEJ5dGVMZW5ndGgoZSkrMTowKStfZS51dGY4Qnl0ZUxlbmd0aCh0LnZhbHVlKSs0KzErMTtpZigiREJSZWYiPT09dC5fYnNvbnR5cGUpe2NvbnN0IHI9T2JqZWN0LmFzc2lnbih7JHJlZjp0LmNvbGxlY3Rpb24sJGlkOnQub2lkfSx0LmZpZWxkcyk7cmV0dXJuIG51bGwhPXQuZGImJihyLiRkYj10LmRiKSwobnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzErbnQocixuLGkpfXJldHVybiB0IGluc3RhbmNlb2YgUmVnRXhwfHxoKHQpPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMStfZS51dGY4Qnl0ZUxlbmd0aCh0LnNvdXJjZSkrMSsodC5nbG9iYWw/MTowKSsodC5pZ25vcmVDYXNlPzE6MCkrKHQubXVsdGlsaW5lPzE6MCkrMToiQlNPTlJlZ0V4cCI9PT10Ll9ic29udHlwZT8obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzErX2UudXRmOEJ5dGVMZW5ndGgodC5wYXR0ZXJuKSsxK19lLnV0ZjhCeXRlTGVuZ3RoKHQub3B0aW9ucykrMToobnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApK250KHQsbixpKSsxO2Nhc2UiZnVuY3Rpb24iOnJldHVybiBuPyhudWxsIT1lP19lLnV0ZjhCeXRlTGVuZ3RoKGUpKzE6MCkrMSs0K19lLnV0ZjhCeXRlTGVuZ3RoKHQudG9TdHJpbmcoKSkrMTowO2Nhc2UiYmlnaW50IjpyZXR1cm4obnVsbCE9ZT9fZS51dGY4Qnl0ZUxlbmd0aChlKSsxOjApKzk7Y2FzZSJzeW1ib2wiOnJldHVybiAwO2RlZmF1bHQ6dGhyb3cgbmV3IFooIlVucmVjb2duaXplZCBKUyB0eXBlOiAiK3R5cGVvZiB0KX19Y2xhc3MgaXQgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkJTT05SZWdFeHAifXBhdHRlcm47b3B0aW9ucztjb25zdHJ1Y3RvcihlLHQpe2lmKHN1cGVyKCksdGhpcy5wYXR0ZXJuPWUsdGhpcy5vcHRpb25zPSh0Pz8iIikuc3BsaXQoIiIpLnNvcnQoKS5qb2luKCIiKSwtMSE9PXRoaXMucGF0dGVybi5pbmRleE9mKCJcMCIpKXRocm93IG5ldyBaKGBCU09OIFJlZ2V4IHBhdHRlcm5zIGNhbm5vdCBjb250YWluIG51bGwgYnl0ZXMsIGZvdW5kOiAke0pTT04uc3RyaW5naWZ5KHRoaXMucGF0dGVybil9YCk7aWYoLTEhPT10aGlzLm9wdGlvbnMuaW5kZXhPZigiXDAiKSl0aHJvdyBuZXcgWihgQlNPTiBSZWdleCBvcHRpb25zIGNhbm5vdCBjb250YWluIG51bGwgYnl0ZXMsIGZvdW5kOiAke0pTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucyl9YCk7Zm9yKGxldCBlPTA7ZTx0aGlzLm9wdGlvbnMubGVuZ3RoO2UrKylpZigiaSIhPT10aGlzLm9wdGlvbnNbZV0mJiJtIiE9PXRoaXMub3B0aW9uc1tlXSYmIngiIT09dGhpcy5vcHRpb25zW2VdJiYibCIhPT10aGlzLm9wdGlvbnNbZV0mJiJzIiE9PXRoaXMub3B0aW9uc1tlXSYmInUiIT09dGhpcy5vcHRpb25zW2VdKXRocm93IG5ldyBaKGBUaGUgcmVndWxhciBleHByZXNzaW9uIG9wdGlvbiBbJHt0aGlzLm9wdGlvbnNbZV19XSBpcyBub3Qgc3VwcG9ydGVkYCl9c3RhdGljIHBhcnNlT3B0aW9ucyhlKXtyZXR1cm4gZT9lLnNwbGl0KCIiKS5zb3J0KCkuam9pbigiIik6IiJ9dG9FeHRlbmRlZEpTT04oZSl7cmV0dXJuKGU9ZXx8e30pLmxlZ2FjeT97JHJlZ2V4OnRoaXMucGF0dGVybiwkb3B0aW9uczp0aGlzLm9wdGlvbnN9OnskcmVndWxhckV4cHJlc3Npb246e3BhdHRlcm46dGhpcy5wYXR0ZXJuLG9wdGlvbnM6dGhpcy5vcHRpb25zfX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7aWYoIiRyZWdleCJpbiBlKXtpZigic3RyaW5nIj09dHlwZW9mIGUuJHJlZ2V4KXJldHVybiBuZXcgaXQoZS4kcmVnZXgsaXQucGFyc2VPcHRpb25zKGUuJG9wdGlvbnMpKTtpZigiQlNPTlJlZ0V4cCI9PT1lLiRyZWdleC5fYnNvbnR5cGUpcmV0dXJuIGV9aWYoIiRyZWd1bGFyRXhwcmVzc2lvbiJpbiBlKXJldHVybiBuZXcgaXQoZS4kcmVndWxhckV4cHJlc3Npb24ucGF0dGVybixpdC5wYXJzZU9wdGlvbnMoZS4kcmVndWxhckV4cHJlc3Npb24ub3B0aW9ucykpO3Rocm93IG5ldyBaKGBVbmV4cGVjdGVkIEJTT05SZWdFeHAgRUpTT04gb2JqZWN0IGZvcm06ICR7SlNPTi5zdHJpbmdpZnkoZSl9YCl9aW5zcGVjdChlLHQsbil7Y29uc3Qgcj1mdW5jdGlvbihlKXtpZihudWxsIT1lJiYib2JqZWN0Ij09dHlwZW9mIGUmJiJzdHlsaXplImluIGUmJiJmdW5jdGlvbiI9PXR5cGVvZiBlLnN0eWxpemUpcmV0dXJuIGUuc3R5bGl6ZX0odCk/PyhlPT5lKTtuPz89dztyZXR1cm5gbmV3IEJTT05SZWdFeHAoJHtyKG4odGhpcy5wYXR0ZXJuKSwicmVnZXhwIil9LCAke3Iobih0aGlzLm9wdGlvbnMpLCJyZWdleHAiKX0pYH19Y2xhc3Mgb3QgZXh0ZW5kcyBoZXtnZXQgX2Jzb250eXBlKCl7cmV0dXJuIkJTT05TeW1ib2wifXZhbHVlO2NvbnN0cnVjdG9yKGUpe3N1cGVyKCksdGhpcy52YWx1ZT1lfXZhbHVlT2YoKXtyZXR1cm4gdGhpcy52YWx1ZX10b1N0cmluZygpe3JldHVybiB0aGlzLnZhbHVlfXRvSlNPTigpe3JldHVybiB0aGlzLnZhbHVlfXRvRXh0ZW5kZWRKU09OKCl7cmV0dXJueyRzeW1ib2w6dGhpcy52YWx1ZX19c3RhdGljIGZyb21FeHRlbmRlZEpTT04oZSl7cmV0dXJuIG5ldyBvdChlLiRzeW1ib2wpfWluc3BlY3QoZSx0LG4pe3JldHVybiBuPz89dyxgbmV3IEJTT05TeW1ib2woJHtuKHRoaXMudmFsdWUsdCl9KWB9fWNvbnN0IHN0PWplO2NsYXNzIGF0IGV4dGVuZHMgc3R7Z2V0IF9ic29udHlwZSgpe3JldHVybiJUaW1lc3RhbXAifWdldFtnZV0oKXtyZXR1cm4iVGltZXN0YW1wIn1zdGF0aWMgTUFYX1ZBTFVFPWplLk1BWF9VTlNJR05FRF9WQUxVRTtnZXQgaSgpe3JldHVybiB0aGlzLmxvdz4+PjB9Z2V0IHQoKXtyZXR1cm4gdGhpcy5oaWdoPj4+MH1jb25zdHJ1Y3RvcihlKXtpZihudWxsPT1lKXN1cGVyKDAsMCwhMCk7ZWxzZSBpZigiYmlnaW50Ij09dHlwZW9mIGUpc3VwZXIoZSwhMCk7ZWxzZSBpZihqZS5pc0xvbmcoZSkpc3VwZXIoZS5sb3csZS5oaWdoLCEwKTtlbHNle2lmKCJvYmplY3QiIT10eXBlb2YgZXx8ISgidCJpbiBlKXx8ISgiaSJpbiBlKSl0aHJvdyBuZXcgWigiQSBUaW1lc3RhbXAgY2FuIG9ubHkgYmUgY29uc3RydWN0ZWQgd2l0aDogYmlnaW50LCBMb25nLCBvciB7IHQ6IG51bWJlcjsgaTogbnVtYmVyIH0iKTt7aWYoIm51bWJlciIhPXR5cGVvZiBlLnQmJigib2JqZWN0IiE9dHlwZW9mIGUudHx8IkludDMyIiE9PWUudC5fYnNvbnR5cGUpKXRocm93IG5ldyBaKCJUaW1lc3RhbXAgY29uc3RydWN0ZWQgZnJvbSB7IHQsIGkgfSBtdXN0IHByb3ZpZGUgdCBhcyBhIG51bWJlciIpO2lmKCJudW1iZXIiIT10eXBlb2YgZS5pJiYoIm9iamVjdCIhPXR5cGVvZiBlLml8fCJJbnQzMiIhPT1lLmkuX2Jzb250eXBlKSl0aHJvdyBuZXcgWigiVGltZXN0YW1wIGNvbnN0cnVjdGVkIGZyb20geyB0LCBpIH0gbXVzdCBwcm92aWRlIGkgYXMgYSBudW1iZXIiKTtjb25zdCB0PU51bWJlcihlLnQpLG49TnVtYmVyKGUuaSk7aWYodDwwfHxOdW1iZXIuaXNOYU4odCkpdGhyb3cgbmV3IFooIlRpbWVzdGFtcCBjb25zdHJ1Y3RlZCBmcm9tIHsgdCwgaSB9IG11c3QgcHJvdmlkZSBhIHBvc2l0aXZlIHQiKTtpZihuPDB8fE51bWJlci5pc05hTihuKSl0aHJvdyBuZXcgWigiVGltZXN0YW1wIGNvbnN0cnVjdGVkIGZyb20geyB0LCBpIH0gbXVzdCBwcm92aWRlIGEgcG9zaXRpdmUgaSIpO2lmKHQ+NDI5NDk2NzI5NSl0aHJvdyBuZXcgWigiVGltZXN0YW1wIGNvbnN0cnVjdGVkIGZyb20geyB0LCBpIH0gbXVzdCBwcm92aWRlIHQgZXF1YWwgb3IgbGVzcyB0aGFuIHVpbnQzMiBtYXgiKTtpZihuPjQyOTQ5NjcyOTUpdGhyb3cgbmV3IFooIlRpbWVzdGFtcCBjb25zdHJ1Y3RlZCBmcm9tIHsgdCwgaSB9IG11c3QgcHJvdmlkZSBpIGVxdWFsIG9yIGxlc3MgdGhhbiB1aW50MzIgbWF4Iik7c3VwZXIobix0LCEwKX19fXRvSlNPTigpe3JldHVybnskdGltZXN0YW1wOnRoaXMudG9TdHJpbmcoKX19c3RhdGljIGZyb21JbnQoZSl7cmV0dXJuIG5ldyBhdChqZS5mcm9tSW50KGUsITApKX1zdGF0aWMgZnJvbU51bWJlcihlKXtyZXR1cm4gbmV3IGF0KGplLmZyb21OdW1iZXIoZSwhMCkpfXN0YXRpYyBmcm9tQml0cyhlLHQpe3JldHVybiBuZXcgYXQoe2k6ZSx0OnR9KX1zdGF0aWMgZnJvbVN0cmluZyhlLHQpe3JldHVybiBuZXcgYXQoamUuZnJvbVN0cmluZyhlLCEwLHQpKX10b0V4dGVuZGVkSlNPTigpe3JldHVybnskdGltZXN0YW1wOnt0OnRoaXMudCxpOnRoaXMuaX19fXN0YXRpYyBmcm9tRXh0ZW5kZWRKU09OKGUpe2NvbnN0IHQ9amUuaXNMb25nKGUuJHRpbWVzdGFtcC5pKT9lLiR0aW1lc3RhbXAuaS5nZXRMb3dCaXRzVW5zaWduZWQoKTplLiR0aW1lc3RhbXAuaSxuPWplLmlzTG9uZyhlLiR0aW1lc3RhbXAudCk/ZS4kdGltZXN0YW1wLnQuZ2V0TG93Qml0c1Vuc2lnbmVkKCk6ZS4kdGltZXN0YW1wLnQ7cmV0dXJuIG5ldyBhdCh7dDpuLGk6dH0pfWluc3BlY3QoZSx0LG4pe24/Pz13O3JldHVybmBuZXcgVGltZXN0YW1wKHsgdDogJHtuKHRoaXMudCx0KX0sIGk6ICR7bih0aGlzLmksdCl9IH0pYH19Y29uc3QgY3Q9amUuZnJvbU51bWJlcihFKSxmdD1qZS5mcm9tTnVtYmVyKFUpO2Z1bmN0aW9uIGx0KGUsdCxuKXtjb25zdCByPSh0PW51bGw9PXQ/e306dCkmJnQuaW5kZXg/dC5pbmRleDowLGk9cGUuZ2V0SW50MzJMRShlLHIpO2lmKGk8NSl0aHJvdyBuZXcgWihgYnNvbiBzaXplIG11c3QgYmUgPj0gNSwgaXMgJHtpfWApO2lmKHQuYWxsb3dPYmplY3RTbWFsbGVyVGhhbkJ1ZmZlclNpemUmJmUubGVuZ3RoPGkpdGhyb3cgbmV3IFooYGJ1ZmZlciBsZW5ndGggJHtlLmxlbmd0aH0gbXVzdCBiZSA+PSBic29uIHNpemUgJHtpfWApO2lmKCF0LmFsbG93T2JqZWN0U21hbGxlclRoYW5CdWZmZXJTaXplJiZlLmxlbmd0aCE9PWkpdGhyb3cgbmV3IFooYGJ1ZmZlciBsZW5ndGggJHtlLmxlbmd0aH0gbXVzdCA9PT0gYnNvbiBzaXplICR7aX1gKTtpZihpK3I+ZS5ieXRlTGVuZ3RoKXRocm93IG5ldyBaKGAoYnNvbiBzaXplICR7aX0gKyBvcHRpb25zLmluZGV4ICR7cn0gbXVzdCBiZSA8PSBidWZmZXIgbGVuZ3RoICR7ZS5ieXRlTGVuZ3RofSlgKTtpZigwIT09ZVtyK2ktMV0pdGhyb3cgbmV3IFooIk9uZSBvYmplY3QsIHNpemVkIGNvcnJlY3RseSwgd2l0aCBhIHNwb3QgZm9yIGFuIEVPTywgYnV0IHRoZSBFT08gaXNuJ3QgMHgwMCIpO3JldHVybiBfdChlLHIsdCxuKX1jb25zdCB1dD0vXlwkcmVmJHxeXCRpZCR8XlwkZGIkLztmdW5jdGlvbiBfdChlLHQsbixyPSExKXtjb25zdCBpPW51bGw9PW4uZmllbGRzQXNSYXc/bnVsbDpuLmZpZWxkc0FzUmF3LG89bnVsbCE9bi5yYXcmJm4ucmF3LHM9ImJvb2xlYW4iPT10eXBlb2Ygbi5ic29uUmVnRXhwJiZuLmJzb25SZWdFeHAsYT1uLnByb21vdGVCdWZmZXJzPz8hMSxjPW4ucHJvbW90ZUxvbmdzPz8hMCxmPW4ucHJvbW90ZVZhbHVlcz8/ITAsbD1uLnVzZUJpZ0ludDY0Pz8hMTtpZihsJiYhZil0aHJvdyBuZXcgWigiTXVzdCBlaXRoZXIgcmVxdWVzdCBiaWdpbnQgb3IgTG9uZyBmb3IgaW50NjQgZGVzZXJpYWxpemF0aW9uIik7aWYobCYmIWMpdGhyb3cgbmV3IFooIk11c3QgZWl0aGVyIHJlcXVlc3QgYmlnaW50IG9yIExvbmcgZm9yIGludDY0IGRlc2VyaWFsaXphdGlvbiIpO2xldCB1LF8sZz0hMDtjb25zdCBoPShudWxsPT1uLnZhbGlkYXRpb24/e3V0Zjg6ITB9Om4udmFsaWRhdGlvbikudXRmODtpZigiYm9vbGVhbiI9PXR5cGVvZiBoKXU9aDtlbHNle2c9ITE7Y29uc3QgZT1PYmplY3Qua2V5cyhoKS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBoW2VdfSkpO2lmKDA9PT1lLmxlbmd0aCl0aHJvdyBuZXcgWigiVVRGLTggdmFsaWRhdGlvbiBzZXR0aW5nIGNhbm5vdCBiZSBlbXB0eSIpO2lmKCJib29sZWFuIiE9dHlwZW9mIGVbMF0pdGhyb3cgbmV3IFooIkludmFsaWQgVVRGLTggdmFsaWRhdGlvbiBvcHRpb24sIG11c3Qgc3BlY2lmeSBib29sZWFuIHZhbHVlcyIpO2lmKHU9ZVswXSwhZS5ldmVyeSgoZT0+ZT09PXUpKSl0aHJvdyBuZXcgWigiSW52YWxpZCBVVEYtOCB2YWxpZGF0aW9uIG9wdGlvbiAtIGtleXMgbXVzdCBiZSBhbGwgdHJ1ZSBvciBhbGwgZmFsc2UiKX1pZighZyl7Xz1uZXcgU2V0O2Zvcihjb25zdCBlIG9mIE9iamVjdC5rZXlzKGgpKV8uYWRkKGUpfWNvbnN0IGI9dDtpZihlLmxlbmd0aDw1KXRocm93IG5ldyBaKCJjb3JydXB0IGJzb24gbWVzc2FnZSA8IDUgYnl0ZXMgbG9uZyIpO2NvbnN0IGQ9cGUuZ2V0SW50MzJMRShlLHQpO2lmKHQrPTQsZDw1fHxkPmUubGVuZ3RoKXRocm93IG5ldyBaKCJjb3JydXB0IGJzb24gbWVzc2FnZSIpO2NvbnN0IHc9cj9bXTp7fTtsZXQgcD0wLHk9IXImJm51bGw7Zm9yKDs7KXtjb25zdCBoPWVbdCsrXTtpZigwPT09aClicmVhaztsZXQgYj10O2Zvcig7MCE9PWVbYl0mJmI8ZS5sZW5ndGg7KWIrKztpZihiPj1lLmJ5dGVMZW5ndGgpdGhyb3cgbmV3IFooIkJhZCBCU09OIERvY3VtZW50OiBpbGxlZ2FsIENTdHJpbmciKTtjb25zdCBkPXI/cCsrOl9lLnRvVVRGOChlLHQsYiwhMSk7bGV0IG0sUz0hMDtpZihTPWd8fF8/LmhhcyhkKT91OiF1LCExIT09eSYmIiQiPT09ZFswXSYmKHk9dXQudGVzdChkKSksdD1iKzEsaD09PU4pe2NvbnN0IG49cGUuZ2V0SW50MzJMRShlLHQpO2lmKHQrPTQsbjw9MHx8bj5lLmxlbmd0aC10fHwwIT09ZVt0K24tMV0pdGhyb3cgbmV3IFooImJhZCBzdHJpbmcgbGVuZ3RoIGluIGJzb24iKTttPV9lLnRvVVRGOChlLHQsdCtuLTEsUyksdCs9bn1lbHNlIGlmKGg9PT1MKXtjb25zdCBuPV9lLmFsbG9jYXRlVW5zYWZlKDEyKTtmb3IobGV0IHI9MDtyPDEyO3IrKyluW3JdPWVbdCtyXTttPW5ldyB0dChuKSx0Kz0xMn1lbHNlIGlmKGg9PT1NJiYhMT09PWYpbT1uZXcgWmUocGUuZ2V0SW50MzJMRShlLHQpKSx0Kz00O2Vsc2UgaWYoaD09PU0pbT1wZS5nZXRJbnQzMkxFKGUsdCksdCs9NDtlbHNlIGlmKGg9PT1PKW09cGUuZ2V0RmxvYXQ2NExFKGUsdCksdCs9OCwhMT09PWYmJihtPW5ldyBLZShtKSk7ZWxzZSBpZihoPT09Uil7Y29uc3Qgbj1wZS5nZXRJbnQzMkxFKGUsdCkscj1wZS5nZXRJbnQzMkxFKGUsdCs0KTt0Kz04LG09bmV3IERhdGUobmV3IGplKG4scikudG9OdW1iZXIoKSl9ZWxzZSBpZihoPT09QSl7aWYoMCE9PWVbdF0mJjEhPT1lW3RdKXRocm93IG5ldyBaKCJpbGxlZ2FsIGJvb2xlYW4gdHlwZSB2YWx1ZSIpO209MT09PWVbdCsrXX1lbHNlIGlmKGg9PT1JKXtjb25zdCByPXQsaT1wZS5nZXRJbnQzMkxFKGUsdCk7aWYoaTw9MHx8aT5lLmxlbmd0aC10KXRocm93IG5ldyBaKCJiYWQgZW1iZWRkZWQgZG9jdW1lbnQgbGVuZ3RoIGluIGJzb24iKTtpZihvKW09ZS5zdWJhcnJheSh0LHQraSk7ZWxzZXtsZXQgdD1uO2d8fCh0PXsuLi5uLHZhbGlkYXRpb246e3V0Zjg6U319KSxtPV90KGUscix0LCExKX10Kz1pfWVsc2UgaWYoaD09PXYpe2NvbnN0IHI9dCxvPXBlLmdldEludDMyTEUoZSx0KTtsZXQgcz1uO2NvbnN0IGE9dCtvO2lmKGkmJmlbZF0mJihzPXsuLi5uLHJhdzohMH0pLGd8fChzPXsuLi5zLHZhbGlkYXRpb246e3V0Zjg6U319KSxtPV90KGUscixzLCEwKSwwIT09ZVsodCs9byktMV0pdGhyb3cgbmV3IFooImludmFsaWQgYXJyYXkgdGVybWluYXRvciBieXRlIik7aWYodCE9PWEpdGhyb3cgbmV3IFooImNvcnJ1cHRlZCBhcnJheSBic29uIil9ZWxzZSBpZihoPT09JCltPXZvaWQgMDtlbHNlIGlmKGg9PT1qKW09bnVsbDtlbHNlIGlmKGg9PT1QKWlmKGwpbT1wZS5nZXRCaWdJbnQ2NExFKGUsdCksdCs9ODtlbHNle2NvbnN0IG49cGUuZ2V0SW50MzJMRShlLHQpLHI9cGUuZ2V0SW50MzJMRShlLHQrNCk7dCs9ODtjb25zdCBpPW5ldyBqZShuLHIpO209YyYmITA9PT1mJiZpLmxlc3NUaGFuT3JFcXVhbChjdCkmJmkuZ3JlYXRlclRoYW5PckVxdWFsKGZ0KT9pLnRvTnVtYmVyKCk6aX1lbHNlIGlmKGg9PT1KKXtjb25zdCBuPV9lLmFsbG9jYXRlVW5zYWZlKDE2KTtmb3IobGV0IHI9MDtyPDE2O3IrKyluW3JdPWVbdCtyXTt0Kz0xNixtPW5ldyBIZShuKX1lbHNlIGlmKGg9PT1UKXtsZXQgbj1wZS5nZXRJbnQzMkxFKGUsdCk7dCs9NDtjb25zdCByPW4saT1lW3QrK107aWYobjwwKXRocm93IG5ldyBaKCJOZWdhdGl2ZSBiaW5hcnkgdHlwZSBlbGVtZW50IHNpemUgZm91bmQiKTtpZihuPmUuYnl0ZUxlbmd0aCl0aHJvdyBuZXcgWigiQmluYXJ5IHR5cGUgc2l6ZSBsYXJnZXIgdGhhbiBkb2N1bWVudCBzaXplIik7aWYoaT09PXllLlNVQlRZUEVfQllURV9BUlJBWSl7aWYobj1wZS5nZXRJbnQzMkxFKGUsdCksdCs9NCxuPDApdGhyb3cgbmV3IFooIk5lZ2F0aXZlIGJpbmFyeSB0eXBlIGVsZW1lbnQgc2l6ZSBmb3VuZCBmb3Igc3VidHlwZSAweDAyIik7aWYobj5yLTQpdGhyb3cgbmV3IFooIkJpbmFyeSB0eXBlIHdpdGggc3VidHlwZSAweDAyIGNvbnRhaW5zIHRvbyBsb25nIGJpbmFyeSBzaXplIik7aWYobjxyLTQpdGhyb3cgbmV3IFooIkJpbmFyeSB0eXBlIHdpdGggc3VidHlwZSAweDAyIGNvbnRhaW5zIHRvbyBzaG9ydCBiaW5hcnkgc2l6ZSIpfWEmJmY/bT1fZS50b0xvY2FsQnVmZmVyVHlwZShlLnN1YmFycmF5KHQsdCtuKSk6KG09bmV3IHllKGUuc3ViYXJyYXkodCx0K24pLGkpLGk9PT1IJiZ4ZS5pc1ZhbGlkKG0pJiYobT1tLnRvVVVJRCgpKSksdCs9bn1lbHNlIGlmKGg9PT1GJiYhMT09PXMpe2ZvcihiPXQ7MCE9PWVbYl0mJmI8ZS5sZW5ndGg7KWIrKztpZihiPj1lLmxlbmd0aCl0aHJvdyBuZXcgWigiQmFkIEJTT04gRG9jdW1lbnQ6IGlsbGVnYWwgQ1N0cmluZyIpO2NvbnN0IG49X2UudG9VVEY4KGUsdCxiLCExKTtmb3IoYj10PWIrMTswIT09ZVtiXSYmYjxlLmxlbmd0aDspYisrO2lmKGI+PWUubGVuZ3RoKXRocm93IG5ldyBaKCJCYWQgQlNPTiBEb2N1bWVudDogaWxsZWdhbCBDU3RyaW5nIik7Y29uc3Qgcj1fZS50b1VURjgoZSx0LGIsITEpO3Q9YisxO2NvbnN0IGk9bmV3IEFycmF5KHIubGVuZ3RoKTtmb3IoYj0wO2I8ci5sZW5ndGg7YisrKXN3aXRjaChyW2JdKXtjYXNlIm0iOmlbYl09Im0iO2JyZWFrO2Nhc2UicyI6aVtiXT0iZyI7YnJlYWs7Y2FzZSJpIjppW2JdPSJpIn1tPW5ldyBSZWdFeHAobixpLmpvaW4oIiIpKX1lbHNlIGlmKGg9PT1GJiYhMD09PXMpe2ZvcihiPXQ7MCE9PWVbYl0mJmI8ZS5sZW5ndGg7KWIrKztpZihiPj1lLmxlbmd0aCl0aHJvdyBuZXcgWigiQmFkIEJTT04gRG9jdW1lbnQ6IGlsbGVnYWwgQ1N0cmluZyIpO2NvbnN0IG49X2UudG9VVEY4KGUsdCxiLCExKTtmb3IoYj10PWIrMTswIT09ZVtiXSYmYjxlLmxlbmd0aDspYisrO2lmKGI+PWUubGVuZ3RoKXRocm93IG5ldyBaKCJCYWQgQlNPTiBEb2N1bWVudDogaWxsZWdhbCBDU3RyaW5nIik7Y29uc3Qgcj1fZS50b1VURjgoZSx0LGIsITEpO3Q9YisxLG09bmV3IGl0KG4scil9ZWxzZSBpZihoPT09RCl7Y29uc3Qgbj1wZS5nZXRJbnQzMkxFKGUsdCk7aWYodCs9NCxuPD0wfHxuPmUubGVuZ3RoLXR8fDAhPT1lW3Qrbi0xXSl0aHJvdyBuZXcgWigiYmFkIHN0cmluZyBsZW5ndGggaW4gYnNvbiIpO2NvbnN0IHI9X2UudG9VVEY4KGUsdCx0K24tMSxTKTttPWY/cjpuZXcgb3QociksdCs9bn1lbHNlIGlmKGg9PT1WKW09bmV3IGF0KHtpOnBlLmdldFVpbnQzMkxFKGUsdCksdDpwZS5nZXRVaW50MzJMRShlLHQrNCl9KSx0Kz04O2Vsc2UgaWYoaD09PVcpbT1uZXcgWGU7ZWxzZSBpZihoPT09WSltPW5ldyBHZTtlbHNlIGlmKGg9PT16KXtjb25zdCBuPXBlLmdldEludDMyTEUoZSx0KTtpZih0Kz00LG48PTB8fG4+ZS5sZW5ndGgtdHx8MCE9PWVbdCtuLTFdKXRocm93IG5ldyBaKCJiYWQgc3RyaW5nIGxlbmd0aCBpbiBic29uIik7Y29uc3Qgcj1fZS50b1VURjgoZSx0LHQrbi0xLFMpO209bmV3IEVlKHIpLHQrPW59ZWxzZSBpZihoPT09Qyl7Y29uc3Qgcj1wZS5nZXRJbnQzMkxFKGUsdCk7aWYodCs9NCxyPDEzKXRocm93IG5ldyBaKCJjb2RlX3dfc2NvcGUgdG90YWwgc2l6ZSBzaG9ydGVyIG1pbmltdW0gZXhwZWN0ZWQgbGVuZ3RoIik7Y29uc3QgaT1wZS5nZXRJbnQzMkxFKGUsdCk7aWYodCs9NCxpPD0wfHxpPmUubGVuZ3RoLXR8fDAhPT1lW3QraS0xXSl0aHJvdyBuZXcgWigiYmFkIHN0cmluZyBsZW5ndGggaW4gYnNvbiIpO2NvbnN0IG89X2UudG9VVEY4KGUsdCx0K2ktMSxTKSxzPXQrPWksYT1wZS5nZXRJbnQzMkxFKGUsdCksYz1fdChlLHMsbiwhMSk7aWYodCs9YSxyPDgrYStpKXRocm93IG5ldyBaKCJjb2RlX3dfc2NvcGUgdG90YWwgc2l6ZSBpcyB0b28gc2hvcnQsIHRydW5jYXRpbmcgc2NvcGUiKTtpZihyPjgrYStpKXRocm93IG5ldyBaKCJjb2RlX3dfc2NvcGUgdG90YWwgc2l6ZSBpcyB0b28gbG9uZywgY2xpcHMgb3V0ZXIgZG9jdW1lbnQiKTttPW5ldyBFZShvLGMpfWVsc2V7aWYoaCE9PWspdGhyb3cgbmV3IFooYERldGVjdGVkIHVua25vd24gQlNPTiB0eXBlICR7aC50b1N0cmluZygxNil9IGZvciBmaWVsZG5hbWUgIiR7ZH0iYCk7e2NvbnN0IG49cGUuZ2V0SW50MzJMRShlLHQpO2lmKHQrPTQsbjw9MHx8bj5lLmxlbmd0aC10fHwwIT09ZVt0K24tMV0pdGhyb3cgbmV3IFooImJhZCBzdHJpbmcgbGVuZ3RoIGluIGJzb24iKTtjb25zdCByPV9lLnRvVVRGOChlLHQsdCtuLTEsUyk7dCs9bjtjb25zdCBpPV9lLmFsbG9jYXRlVW5zYWZlKDEyKTtmb3IobGV0IG49MDtuPDEyO24rKylpW25dPWVbdCtuXTtjb25zdCBvPW5ldyB0dChpKTt0Kz0xMixtPW5ldyBPZShyLG8pfX0iX19wcm90b19fIj09PWQ/T2JqZWN0LmRlZmluZVByb3BlcnR5KHcsZCx7dmFsdWU6bSx3cml0YWJsZTohMCxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH0pOndbZF09bX1pZihkIT09dC1iKXtpZihyKXRocm93IG5ldyBaKCJjb3JydXB0IGFycmF5IGJzb24iKTt0aHJvdyBuZXcgWigiY29ycnVwdCBvYmplY3QgYnNvbiIpfWlmKCF5KXJldHVybiB3O2lmKFVlKHcpKXtjb25zdCBlPU9iamVjdC5hc3NpZ24oe30sdyk7cmV0dXJuIGRlbGV0ZSBlLiRyZWYsZGVsZXRlIGUuJGlkLGRlbGV0ZSBlLiRkYixuZXcgT2Uody4kcmVmLHcuJGlkLHcuJGRiLGUpfXJldHVybiB3fWNvbnN0IGd0PS9ceDAwLyxodD1uZXcgU2V0KFsiJGRiIiwiJHJlZiIsIiRpZCIsIiRjbHVzdGVyVGltZSJdKTtmdW5jdGlvbiBidChlLHQsbixyKXtlW3IrK109TjtlWyhyPXIrX2UuZW5jb2RlVVRGOEludG8oZSx0LHIpKzEpLTFdPTA7Y29uc3QgaT1fZS5lbmNvZGVVVEY4SW50byhlLG4scis0KTtyZXR1cm4gcGUuc2V0SW50MzJMRShlLHIsaSsxKSxyPXIrNCtpLGVbcisrXT0wLHJ9ZnVuY3Rpb24gZHQoZSx0LG4scil7Y29uc3QgaT0hT2JqZWN0LmlzKG4sLTApJiZOdW1iZXIuaXNTYWZlSW50ZWdlcihuKSYmbjw9bSYmbj49Uz9NOk87ZVtyKytdPWk7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyKz1pPT09TT9wZS5zZXRJbnQzMkxFKGUscixuKTpwZS5zZXRGbG9hdDY0TEUoZSxyLG4pfWZ1bmN0aW9uIHd0KGUsdCxuLHIpe2VbcisrXT1QO3JldHVybiByKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAscis9cGUuc2V0QmlnSW50NjRMRShlLHIsbil9ZnVuY3Rpb24gcHQoZSx0LG4scil7ZVtyKytdPWo7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyfWZ1bmN0aW9uIHl0KGUsdCxuLHIpe2VbcisrXT1BO3JldHVybiByKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAsZVtyKytdPW4/MTowLHJ9ZnVuY3Rpb24gbXQoZSx0LG4scil7ZVtyKytdPVI7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9amUuZnJvbU51bWJlcihuLmdldFRpbWUoKSksbz1pLmdldExvd0JpdHMoKSxzPWkuZ2V0SGlnaEJpdHMoKTtyZXR1cm4gcis9cGUuc2V0SW50MzJMRShlLHIsbykscis9cGUuc2V0SW50MzJMRShlLHIscyl9ZnVuY3Rpb24gU3QoZSx0LG4scil7ZVtyKytdPUY7aWYocis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wLG4uc291cmNlJiZudWxsIT1uLnNvdXJjZS5tYXRjaChndCkpdGhyb3cgbmV3IFooInZhbHVlICIrbi5zb3VyY2UrIiBtdXN0IG5vdCBjb250YWluIG51bGwgYnl0ZXMiKTtyZXR1cm4gcis9X2UuZW5jb2RlVVRGOEludG8oZSxuLnNvdXJjZSxyKSxlW3IrK109MCxuLmlnbm9yZUNhc2UmJihlW3IrK109MTA1KSxuLmdsb2JhbCYmKGVbcisrXT0xMTUpLG4ubXVsdGlsaW5lJiYoZVtyKytdPTEwOSksZVtyKytdPTAscn1mdW5jdGlvbiBCdChlLHQsbixyKXtlW3IrK109RjtpZihyKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAsbnVsbCE9bi5wYXR0ZXJuLm1hdGNoKGd0KSl0aHJvdyBuZXcgWigicGF0dGVybiAiK24ucGF0dGVybisiIG11c3Qgbm90IGNvbnRhaW4gbnVsbCBieXRlcyIpO3IrPV9lLmVuY29kZVVURjhJbnRvKGUsbi5wYXR0ZXJuLHIpLGVbcisrXT0wO2NvbnN0IGk9bi5vcHRpb25zLnNwbGl0KCIiKS5zb3J0KCkuam9pbigiIik7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsaSxyKSxlW3IrK109MCxyfWZ1bmN0aW9uIHh0KGUsdCxuLHIpe251bGw9PT1uP2VbcisrXT1qOiJNaW5LZXkiPT09bi5fYnNvbnR5cGU/ZVtyKytdPVc6ZVtyKytdPVk7cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyfWZ1bmN0aW9uIEV0KGUsdCxuLHIpe2VbcisrXT1MO3JldHVybiByKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTAscis9bi5zZXJpYWxpemVJbnRvKGUscil9ZnVuY3Rpb24gVXQoZSx0LG4scil7ZVtyKytdPVQ7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi5sZW5ndGg7aWYocis9cGUuc2V0SW50MzJMRShlLHIsaSksZVtyKytdPXEsaTw9MTYpZm9yKGxldCB0PTA7dDxpO3QrKyllW3IrdF09blt0XTtlbHNlIGUuc2V0KG4scik7cmV0dXJuIHIrPWl9ZnVuY3Rpb24gT3QoZSx0LG4scixpLG8scyxhLGMpe2lmKGMuaGFzKG4pKXRocm93IG5ldyBaKCJDYW5ub3QgY29udmVydCBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gQlNPTiIpO2MuYWRkKG4pLGVbcisrXT1BcnJheS5pc0FycmF5KG4pP3Y6STtyKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTA7Y29uc3QgZj1GdChlLG4saSxyLG8rMSxzLGEsYyk7cmV0dXJuIGMuZGVsZXRlKG4pLGZ9ZnVuY3Rpb24gTnQoZSx0LG4scil7ZVtyKytdPUo7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2ZvcihsZXQgdD0wO3Q8MTY7dCsrKWVbcit0XT1uLmJ5dGVzW3RdO3JldHVybiByKzE2fWZ1bmN0aW9uIEl0KGUsdCxuLHIpe2VbcisrXT0iTG9uZyI9PT1uLl9ic29udHlwZT9QOlY7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi5nZXRMb3dCaXRzKCksbz1uLmdldEhpZ2hCaXRzKCk7cmV0dXJuIHIrPXBlLnNldEludDMyTEUoZSxyLGkpLHIrPXBlLnNldEludDMyTEUoZSxyLG8pfWZ1bmN0aW9uIHZ0KGUsdCxuLHIpe249bi52YWx1ZU9mKCksZVtyKytdPU07cmV0dXJuIHIrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MCxyKz1wZS5zZXRJbnQzMkxFKGUscixuKX1mdW5jdGlvbiBUdChlLHQsbixyKXtlW3IrK109TztyZXR1cm4gcis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wLHIrPXBlLnNldEZsb2F0NjRMRShlLHIsbi52YWx1ZSl9ZnVuY3Rpb24gJHQoZSx0LG4scil7ZVtyKytdPXo7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi50b1N0cmluZygpLG89X2UuZW5jb2RlVVRGOEludG8oZSxpLHIrNCkrMTtyZXR1cm4gcGUuc2V0SW50MzJMRShlLHIsbykscj1yKzQrby0xLGVbcisrXT0wLHJ9ZnVuY3Rpb24gTHQoZSx0LG4scixpPSExLG89MCxzPSExLGE9ITAsYyl7aWYobi5zY29wZSYmIm9iamVjdCI9PXR5cGVvZiBuLnNjb3BlKXtlW3IrK109QztyKz1fZS5lbmNvZGVVVEY4SW50byhlLHQsciksZVtyKytdPTA7bGV0IGY9cjtjb25zdCBsPW4uY29kZTtyKz00O2NvbnN0IHU9X2UuZW5jb2RlVVRGOEludG8oZSxsLHIrNCkrMTtwZS5zZXRJbnQzMkxFKGUscix1KSxlW3IrNCt1LTFdPTAscj1yK3UrNDtjb25zdCBfPUZ0KGUsbi5zY29wZSxpLHIsbysxLHMsYSxjKTtyPV8tMTtjb25zdCBnPV8tZjtmKz1wZS5zZXRJbnQzMkxFKGUsZixnKSxlW3IrK109MH1lbHNle2VbcisrXT16O3IrPV9lLmVuY29kZVVURjhJbnRvKGUsdCxyKSxlW3IrK109MDtjb25zdCBpPW4uY29kZS50b1N0cmluZygpLG89X2UuZW5jb2RlVVRGOEludG8oZSxpLHIrNCkrMTtwZS5zZXRJbnQzMkxFKGUscixvKSxyPXIrNCtvLTEsZVtyKytdPTB9cmV0dXJuIHJ9ZnVuY3Rpb24gQXQoZSx0LG4scil7ZVtyKytdPVQ7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9bi5idWZmZXI7bGV0IG89bi5wb3NpdGlvbjtpZihuLnN1Yl90eXBlPT09eWUuU1VCVFlQRV9CWVRFX0FSUkFZJiYobys9NCkscis9cGUuc2V0SW50MzJMRShlLHIsbyksZVtyKytdPW4uc3ViX3R5cGUsbi5zdWJfdHlwZT09PXllLlNVQlRZUEVfQllURV9BUlJBWSYmKG8tPTQscis9cGUuc2V0SW50MzJMRShlLHIsbykpLG4uc3ViX3R5cGU9PT15ZS5TVUJUWVBFX1ZFQ1RPUiYmbWUobiksbzw9MTYpZm9yKGxldCB0PTA7dDxvO3QrKyllW3IrdF09aVt0XTtlbHNlIGUuc2V0KGkscik7cmV0dXJuIHIrPW4ucG9zaXRpb259ZnVuY3Rpb24gUnQoZSx0LG4scil7ZVtyKytdPUQ7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2NvbnN0IGk9X2UuZW5jb2RlVVRGOEludG8oZSxuLnZhbHVlLHIrNCkrMTtyZXR1cm4gcGUuc2V0SW50MzJMRShlLHIsaSkscj1yKzQraS0xLGVbcisrXT0wLHJ9ZnVuY3Rpb24ganQoZSx0LG4scixpLG8scyl7ZVtyKytdPUk7cis9X2UuZW5jb2RlVVRGOEludG8oZSx0LHIpLGVbcisrXT0wO2xldCBhPXIsYz17JHJlZjpuLmNvbGxlY3Rpb258fG4ubmFtZXNwYWNlLCRpZDpuLm9pZH07bnVsbCE9bi5kYiYmKGMuJGRiPW4uZGIpLGM9T2JqZWN0LmFzc2lnbihjLG4uZmllbGRzKTtjb25zdCBmPUZ0KGUsYywhMSxyLGkrMSxvLCEwLHMpLGw9Zi1hO3JldHVybiBhKz1wZS5zZXRJbnQzMkxFKGUscixsKSxmfWZ1bmN0aW9uIEZ0KGUsdCxuLHIsaSxvLHMsYSl7aWYobnVsbD09YSl7aWYobnVsbD09dClyZXR1cm4gZVswXT01LGVbMV09MCxlWzJdPTAsZVszXT0wLGVbNF09MCw1O2lmKEFycmF5LmlzQXJyYXkodCkpdGhyb3cgbmV3IFooInNlcmlhbGl6ZSBkb2VzIG5vdCBzdXBwb3J0IGFuIGFycmF5IGFzIHRoZSByb290IGlucHV0Iik7aWYoIm9iamVjdCIhPXR5cGVvZiB0KXRocm93IG5ldyBaKCJzZXJpYWxpemUgZG9lcyBub3Qgc3VwcG9ydCBub24tb2JqZWN0IGFzIHRoZSByb290IGlucHV0Iik7aWYoIl9ic29udHlwZSJpbiB0JiYic3RyaW5nIj09dHlwZW9mIHQuX2Jzb250eXBlKXRocm93IG5ldyBaKCJCU09OIHR5cGVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGFzIGEgZG9jdW1lbnQiKTtpZihkKHQpfHxoKHQpfHxfKHQpfHxnKHQpKXRocm93IG5ldyBaKCJkYXRlLCByZWdleHAsIHR5cGVkYXJyYXksIGFuZCBhcnJheWJ1ZmZlciBjYW5ub3QgYmUgQlNPTiBkb2N1bWVudHMiKTthPW5ldyBTZXR9YS5hZGQodCk7bGV0IGM9cis0O2lmKEFycmF5LmlzQXJyYXkodCkpZm9yKGxldCByPTA7cjx0Lmxlbmd0aDtyKyspe2NvbnN0IGY9YCR7cn1gO2xldCBsPXRbcl07ImZ1bmN0aW9uIj09dHlwZW9mIGw/LnRvQlNPTiYmKGw9bC50b0JTT04oKSk7Y29uc3QgdT10eXBlb2YgbDtpZih2b2lkIDA9PT1sKWM9cHQoZSxmLDAsYyk7ZWxzZSBpZihudWxsPT09bCljPXB0KGUsZiwwLGMpO2Vsc2UgaWYoInN0cmluZyI9PT11KWM9YnQoZSxmLGwsYyk7ZWxzZSBpZigibnVtYmVyIj09PXUpYz1kdChlLGYsbCxjKTtlbHNlIGlmKCJiaWdpbnQiPT09dSljPXd0KGUsZixsLGMpO2Vsc2UgaWYoImJvb2xlYW4iPT09dSljPXl0KGUsZixsLGMpO2Vsc2UgaWYoIm9iamVjdCI9PT11JiZudWxsPT1sLl9ic29udHlwZSljPWwgaW5zdGFuY2VvZiBEYXRlfHxkKGwpP210KGUsZixsLGMpOmwgaW5zdGFuY2VvZiBVaW50OEFycmF5fHxfKGwpP1V0KGUsZixsLGMpOmwgaW5zdGFuY2VvZiBSZWdFeHB8fGgobCk/U3QoZSxmLGwsYyk6T3QoZSxmLGwsYyxuLGksbyxzLGEpO2Vsc2UgaWYoIm9iamVjdCI9PT11KXtpZihsW3ldIT09cCl0aHJvdyBuZXcgRztpZigiT2JqZWN0SWQiPT09bC5fYnNvbnR5cGUpYz1FdChlLGYsbCxjKTtlbHNlIGlmKCJEZWNpbWFsMTI4Ij09PWwuX2Jzb250eXBlKWM9TnQoZSxmLGwsYyk7ZWxzZSBpZigiTG9uZyI9PT1sLl9ic29udHlwZXx8IlRpbWVzdGFtcCI9PT1sLl9ic29udHlwZSljPUl0KGUsZixsLGMpO2Vsc2UgaWYoIkRvdWJsZSI9PT1sLl9ic29udHlwZSljPVR0KGUsZixsLGMpO2Vsc2UgaWYoIkNvZGUiPT09bC5fYnNvbnR5cGUpYz1MdChlLGYsbCxjLG4saSxvLHMsYSk7ZWxzZSBpZigiQmluYXJ5Ij09PWwuX2Jzb250eXBlKWM9QXQoZSxmLGwsYyk7ZWxzZSBpZigiQlNPTlN5bWJvbCI9PT1sLl9ic29udHlwZSljPVJ0KGUsZixsLGMpO2Vsc2UgaWYoIkRCUmVmIj09PWwuX2Jzb250eXBlKWM9anQoZSxmLGwsYyxpLG8sYSk7ZWxzZSBpZigiQlNPTlJlZ0V4cCI9PT1sLl9ic29udHlwZSljPUJ0KGUsZixsLGMpO2Vsc2UgaWYoIkludDMyIj09PWwuX2Jzb250eXBlKWM9dnQoZSxmLGwsYyk7ZWxzZSBpZigiTWluS2V5Ij09PWwuX2Jzb250eXBlfHwiTWF4S2V5Ij09PWwuX2Jzb250eXBlKWM9eHQoZSxmLGwsYyk7ZWxzZSBpZih2b2lkIDAhPT1sLl9ic29udHlwZSl0aHJvdyBuZXcgWihgVW5yZWNvZ25pemVkIG9yIGludmFsaWQgX2Jzb250eXBlOiAke1N0cmluZyhsLl9ic29udHlwZSl9YCl9ZWxzZSJmdW5jdGlvbiI9PT11JiZvJiYoYz0kdChlLGYsbCxjKSl9ZWxzZSBpZih0IGluc3RhbmNlb2YgTWFwfHxiKHQpKXtjb25zdCByPXQuZW50cmllcygpO2xldCBmPSExO2Zvcig7IWY7KXtjb25zdCB0PXIubmV4dCgpO2lmKGY9ISF0LmRvbmUsZiljb250aW51ZTtjb25zdCBsPXQudmFsdWU/dC52YWx1ZVswXTp2b2lkIDA7bGV0IHU9dC52YWx1ZT90LnZhbHVlWzFdOnZvaWQgMDsiZnVuY3Rpb24iPT10eXBlb2YgdT8udG9CU09OJiYodT11LnRvQlNPTigpKTtjb25zdCBnPXR5cGVvZiB1O2lmKCJzdHJpbmciPT10eXBlb2YgbCYmIWh0LmhhcyhsKSl7aWYobnVsbCE9bC5tYXRjaChndCkpdGhyb3cgbmV3IFooImtleSAiK2wrIiBtdXN0IG5vdCBjb250YWluIG51bGwgYnl0ZXMiKTtpZihuKXtpZigiJCI9PT1sWzBdKXRocm93IG5ldyBaKCJrZXkgIitsKyIgbXVzdCBub3Qgc3RhcnQgd2l0aCAnJCciKTtpZihsLmluY2x1ZGVzKCIuIikpdGhyb3cgbmV3IFooImtleSAiK2wrIiBtdXN0IG5vdCBjb250YWluICcuJyIpfX1pZih2b2lkIDA9PT11KSExPT09cyYmKGM9cHQoZSxsLDAsYykpO2Vsc2UgaWYobnVsbD09PXUpYz1wdChlLGwsMCxjKTtlbHNlIGlmKCJzdHJpbmciPT09ZyljPWJ0KGUsbCx1LGMpO2Vsc2UgaWYoIm51bWJlciI9PT1nKWM9ZHQoZSxsLHUsYyk7ZWxzZSBpZigiYmlnaW50Ij09PWcpYz13dChlLGwsdSxjKTtlbHNlIGlmKCJib29sZWFuIj09PWcpYz15dChlLGwsdSxjKTtlbHNlIGlmKCJvYmplY3QiPT09ZyYmbnVsbD09dS5fYnNvbnR5cGUpYz11IGluc3RhbmNlb2YgRGF0ZXx8ZCh1KT9tdChlLGwsdSxjKTp1IGluc3RhbmNlb2YgVWludDhBcnJheXx8Xyh1KT9VdChlLGwsdSxjKTp1IGluc3RhbmNlb2YgUmVnRXhwfHxoKHUpP1N0KGUsbCx1LGMpOk90KGUsbCx1LGMsbixpLG8scyxhKTtlbHNlIGlmKCJvYmplY3QiPT09Zyl7aWYodVt5XSE9PXApdGhyb3cgbmV3IEc7aWYoIk9iamVjdElkIj09PXUuX2Jzb250eXBlKWM9RXQoZSxsLHUsYyk7ZWxzZSBpZigiRGVjaW1hbDEyOCI9PT11Ll9ic29udHlwZSljPU50KGUsbCx1LGMpO2Vsc2UgaWYoIkxvbmciPT09dS5fYnNvbnR5cGV8fCJUaW1lc3RhbXAiPT09dS5fYnNvbnR5cGUpYz1JdChlLGwsdSxjKTtlbHNlIGlmKCJEb3VibGUiPT09dS5fYnNvbnR5cGUpYz1UdChlLGwsdSxjKTtlbHNlIGlmKCJDb2RlIj09PXUuX2Jzb250eXBlKWM9THQoZSxsLHUsYyxuLGksbyxzLGEpO2Vsc2UgaWYoIkJpbmFyeSI9PT11Ll9ic29udHlwZSljPUF0KGUsbCx1LGMpO2Vsc2UgaWYoIkJTT05TeW1ib2wiPT09dS5fYnNvbnR5cGUpYz1SdChlLGwsdSxjKTtlbHNlIGlmKCJEQlJlZiI9PT11Ll9ic29udHlwZSljPWp0KGUsbCx1LGMsaSxvLGEpO2Vsc2UgaWYoIkJTT05SZWdFeHAiPT09dS5fYnNvbnR5cGUpYz1CdChlLGwsdSxjKTtlbHNlIGlmKCJJbnQzMiI9PT11Ll9ic29udHlwZSljPXZ0KGUsbCx1LGMpO2Vsc2UgaWYoIk1pbktleSI9PT11Ll9ic29udHlwZXx8Ik1heEtleSI9PT11Ll9ic29udHlwZSljPXh0KGUsbCx1LGMpO2Vsc2UgaWYodm9pZCAwIT09dS5fYnNvbnR5cGUpdGhyb3cgbmV3IFooYFVucmVjb2duaXplZCBvciBpbnZhbGlkIF9ic29udHlwZTogJHtTdHJpbmcodS5fYnNvbnR5cGUpfWApfWVsc2UiZnVuY3Rpb24iPT09ZyYmbyYmKGM9JHQoZSxsLHUsYykpfX1lbHNle2lmKCJmdW5jdGlvbiI9PXR5cGVvZiB0Py50b0JTT04mJm51bGwhPSh0PXQudG9CU09OKCkpJiYib2JqZWN0IiE9dHlwZW9mIHQpdGhyb3cgbmV3IFooInRvQlNPTiBmdW5jdGlvbiBkaWQgbm90IHJldHVybiBhbiBvYmplY3QiKTtmb3IoY29uc3QgciBvZiBPYmplY3Qua2V5cyh0KSl7bGV0IGY9dFtyXTsiZnVuY3Rpb24iPT10eXBlb2YgZj8udG9CU09OJiYoZj1mLnRvQlNPTigpKTtjb25zdCBsPXR5cGVvZiBmO2lmKCJzdHJpbmciPT10eXBlb2YgciYmIWh0LmhhcyhyKSl7aWYobnVsbCE9ci5tYXRjaChndCkpdGhyb3cgbmV3IFooImtleSAiK3IrIiBtdXN0IG5vdCBjb250YWluIG51bGwgYnl0ZXMiKTtpZihuKXtpZigiJCI9PT1yWzBdKXRocm93IG5ldyBaKCJrZXkgIityKyIgbXVzdCBub3Qgc3RhcnQgd2l0aCAnJCciKTtpZihyLmluY2x1ZGVzKCIuIikpdGhyb3cgbmV3IFooImtleSAiK3IrIiBtdXN0IG5vdCBjb250YWluICcuJyIpfX1pZih2b2lkIDA9PT1mKSExPT09cyYmKGM9cHQoZSxyLDAsYykpO2Vsc2UgaWYobnVsbD09PWYpYz1wdChlLHIsMCxjKTtlbHNlIGlmKCJzdHJpbmciPT09bCljPWJ0KGUscixmLGMpO2Vsc2UgaWYoIm51bWJlciI9PT1sKWM9ZHQoZSxyLGYsYyk7ZWxzZSBpZigiYmlnaW50Ij09PWwpYz13dChlLHIsZixjKTtlbHNlIGlmKCJib29sZWFuIj09PWwpYz15dChlLHIsZixjKTtlbHNlIGlmKCJvYmplY3QiPT09bCYmbnVsbD09Zi5fYnNvbnR5cGUpYz1mIGluc3RhbmNlb2YgRGF0ZXx8ZChmKT9tdChlLHIsZixjKTpmIGluc3RhbmNlb2YgVWludDhBcnJheXx8XyhmKT9VdChlLHIsZixjKTpmIGluc3RhbmNlb2YgUmVnRXhwfHxoKGYpP1N0KGUscixmLGMpOk90KGUscixmLGMsbixpLG8scyxhKTtlbHNlIGlmKCJvYmplY3QiPT09bCl7aWYoZlt5XSE9PXApdGhyb3cgbmV3IEc7aWYoIk9iamVjdElkIj09PWYuX2Jzb250eXBlKWM9RXQoZSxyLGYsYyk7ZWxzZSBpZigiRGVjaW1hbDEyOCI9PT1mLl9ic29udHlwZSljPU50KGUscixmLGMpO2Vsc2UgaWYoIkxvbmciPT09Zi5fYnNvbnR5cGV8fCJUaW1lc3RhbXAiPT09Zi5fYnNvbnR5cGUpYz1JdChlLHIsZixjKTtlbHNlIGlmKCJEb3VibGUiPT09Zi5fYnNvbnR5cGUpYz1UdChlLHIsZixjKTtlbHNlIGlmKCJDb2RlIj09PWYuX2Jzb250eXBlKWM9THQoZSxyLGYsYyxuLGksbyxzLGEpO2Vsc2UgaWYoIkJpbmFyeSI9PT1mLl9ic29udHlwZSljPUF0KGUscixmLGMpO2Vsc2UgaWYoIkJTT05TeW1ib2wiPT09Zi5fYnNvbnR5cGUpYz1SdChlLHIsZixjKTtlbHNlIGlmKCJEQlJlZiI9PT1mLl9ic29udHlwZSljPWp0KGUscixmLGMsaSxvLGEpO2Vsc2UgaWYoIkJTT05SZWdFeHAiPT09Zi5fYnNvbnR5cGUpYz1CdChlLHIsZixjKTtlbHNlIGlmKCJJbnQzMiI9PT1mLl9ic29udHlwZSljPXZ0KGUscixmLGMpO2Vsc2UgaWYoIk1pbktleSI9PT1mLl9ic29udHlwZXx8Ik1heEtleSI9PT1mLl9ic29udHlwZSljPXh0KGUscixmLGMpO2Vsc2UgaWYodm9pZCAwIT09Zi5fYnNvbnR5cGUpdGhyb3cgbmV3IFooYFVucmVjb2duaXplZCBvciBpbnZhbGlkIF9ic29udHlwZTogJHtTdHJpbmcoZi5fYnNvbnR5cGUpfWApfWVsc2UiZnVuY3Rpb24iPT09bCYmbyYmKGM9JHQoZSxyLGYsYykpfX1hLmRlbGV0ZSh0KSxlW2MrK109MDtjb25zdCBmPWMtcjtyZXR1cm4gcis9cGUuc2V0SW50MzJMRShlLHIsZiksY31jb25zdCBrdD17JG9pZDp0dCwkYmluYXJ5OnllLCR1dWlkOnllLCRzeW1ib2w6b3QsJG51bWJlckludDpaZSwkbnVtYmVyRGVjaW1hbDpIZSwkbnVtYmVyRG91YmxlOktlLCRudW1iZXJMb25nOmplLCRtaW5LZXk6WGUsJG1heEtleTpHZSwkcmVnZXg6aXQsJHJlZ3VsYXJFeHByZXNzaW9uOml0LCR0aW1lc3RhbXA6YXR9O2Z1bmN0aW9uIHp0KGUsdD17fSl7aWYoIm51bWJlciI9PXR5cGVvZiBlKXtjb25zdCBuPWU8PW0mJmU+PVMscj1lPD1CJiZlPj14O2lmKHQucmVsYXhlZHx8dC5sZWdhY3kpcmV0dXJuIGU7aWYoTnVtYmVyLmlzSW50ZWdlcihlKSYmIU9iamVjdC5pcyhlLC0wKSl7aWYobilyZXR1cm4gbmV3IFplKGUpO2lmKHIpcmV0dXJuIHQudXNlQmlnSW50NjQ/QmlnSW50KGUpOmplLmZyb21OdW1iZXIoZSl9cmV0dXJuIG5ldyBLZShlKX1pZihudWxsPT1lfHwib2JqZWN0IiE9dHlwZW9mIGUpcmV0dXJuIGU7aWYoZS4kdW5kZWZpbmVkKXJldHVybiBudWxsO2NvbnN0IG49T2JqZWN0LmtleXMoZSkuZmlsdGVyKCh0PT50LnN0YXJ0c1dpdGgoIiQiKSYmbnVsbCE9ZVt0XSkpO2ZvcihsZXQgcj0wO3I8bi5sZW5ndGg7cisrKXtjb25zdCBpPWt0W25bcl1dO2lmKGkpcmV0dXJuIGkuZnJvbUV4dGVuZGVkSlNPTihlLHQpfWlmKG51bGwhPWUuJGRhdGUpe2NvbnN0IG49ZS4kZGF0ZSxyPW5ldyBEYXRlO2lmKHQubGVnYWN5KWlmKCJudW1iZXIiPT10eXBlb2YgbilyLnNldFRpbWUobik7ZWxzZSBpZigic3RyaW5nIj09dHlwZW9mIG4pci5zZXRUaW1lKERhdGUucGFyc2UobikpO2Vsc2V7aWYoImJpZ2ludCIhPXR5cGVvZiBuKXRocm93IG5ldyBYKCJVbnJlY29nbml6ZWQgdHlwZSBmb3IgRUpTT04gZGF0ZTogIit0eXBlb2Ygbik7ci5zZXRUaW1lKE51bWJlcihuKSl9ZWxzZSBpZigic3RyaW5nIj09dHlwZW9mIG4pci5zZXRUaW1lKERhdGUucGFyc2UobikpO2Vsc2UgaWYoamUuaXNMb25nKG4pKXIuc2V0VGltZShuLnRvTnVtYmVyKCkpO2Vsc2UgaWYoIm51bWJlciI9PXR5cGVvZiBuJiZ0LnJlbGF4ZWQpci5zZXRUaW1lKG4pO2Vsc2V7aWYoImJpZ2ludCIhPXR5cGVvZiBuKXRocm93IG5ldyBYKCJVbnJlY29nbml6ZWQgdHlwZSBmb3IgRUpTT04gZGF0ZTogIit0eXBlb2Ygbik7ci5zZXRUaW1lKE51bWJlcihuKSl9cmV0dXJuIHJ9aWYobnVsbCE9ZS4kY29kZSl7Y29uc3QgdD1PYmplY3QuYXNzaWduKHt9LGUpO3JldHVybiBlLiRzY29wZSYmKHQuJHNjb3BlPXp0KGUuJHNjb3BlKSksRWUuZnJvbUV4dGVuZGVkSlNPTihlKX1pZihVZShlKXx8ZS4kZGJQb2ludGVyKXtjb25zdCB0PWUuJHJlZj9lOmUuJGRiUG9pbnRlcjtpZih0IGluc3RhbmNlb2YgT2UpcmV0dXJuIHQ7Y29uc3Qgbj1PYmplY3Qua2V5cyh0KS5maWx0ZXIoKGU9PmUuc3RhcnRzV2l0aCgiJCIpKSk7bGV0IHI9ITA7aWYobi5mb3JFYWNoKChlPT57LTE9PT1bIiRyZWYiLCIkaWQiLCIkZGIiXS5pbmRleE9mKGUpJiYocj0hMSl9KSkscilyZXR1cm4gT2UuZnJvbUV4dGVuZGVkSlNPTih0KX1yZXR1cm4gZX1mdW5jdGlvbiBEdChlKXtjb25zdCB0PWUudG9JU09TdHJpbmcoKTtyZXR1cm4gMCE9PWUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk/dDp0LnNsaWNlKDAsLTUpKyJaIn1mdW5jdGlvbiBDdChlLHQpe2lmKGUgaW5zdGFuY2VvZiBNYXB8fGIoZSkpe2NvbnN0IG49T2JqZWN0LmNyZWF0ZShudWxsKTtmb3IoY29uc3RbdCxyXW9mIGUpe2lmKCJzdHJpbmciIT10eXBlb2YgdCl0aHJvdyBuZXcgWigiQ2FuIG9ubHkgc2VyaWFsaXplIG1hcHMgd2l0aCBzdHJpbmcga2V5cyIpO25bdF09cn1yZXR1cm4gQ3Qobix0KX1pZigoIm9iamVjdCI9PXR5cGVvZiBlfHwiZnVuY3Rpb24iPT10eXBlb2YgZSkmJm51bGwhPT1lKXtjb25zdCBuPXQuc2Vlbk9iamVjdHMuZmluZEluZGV4KCh0PT50Lm9iaj09PWUpKTtpZigtMSE9PW4pe2NvbnN0IGU9dC5zZWVuT2JqZWN0cy5tYXAoKGU9PmUucHJvcGVydHlOYW1lKSkscj1lLnNsaWNlKDAsbikubWFwKChlPT5gJHtlfSAtPiBgKSkuam9pbigiIiksaT1lW25dLG89IiAtPiAiK2Uuc2xpY2UobisxLGUubGVuZ3RoLTEpLm1hcCgoZT0+YCR7ZX0gLT4gYCkpLmpvaW4oIiIpLHM9ZVtlLmxlbmd0aC0xXSxhPSIgIi5yZXBlYXQoci5sZW5ndGgraS5sZW5ndGgvMiksYz0iLSIucmVwZWF0KG8ubGVuZ3RoKyhpLmxlbmd0aCtzLmxlbmd0aCkvMi0xKTt0aHJvdyBuZXcgWihgQ29udmVydGluZyBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gRUpTT046XG4gICAgJHtyfSR7aX0ke299JHtzfVxuICAgICR7YX1cXCR7Y30vYCl9dC5zZWVuT2JqZWN0c1t0LnNlZW5PYmplY3RzLmxlbmd0aC0xXS5vYmo9ZX1pZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBmdW5jdGlvbihlLHQpe3JldHVybiBlLm1hcCgoKGUsbik9Pnt0LnNlZW5PYmplY3RzLnB1c2goe3Byb3BlcnR5TmFtZTpgaW5kZXggJHtufWAsb2JqOm51bGx9KTt0cnl7cmV0dXJuIEN0KGUsdCl9ZmluYWxseXt0LnNlZW5PYmplY3RzLnBvcCgpfX0pKX0oZSx0KTtpZih2b2lkIDA9PT1lKXJldHVybiB0Lmlnbm9yZVVuZGVmaW5lZD92b2lkIDA6bnVsbDtpZihlIGluc3RhbmNlb2YgRGF0ZXx8ZChlKSl7Y29uc3Qgbj1lLmdldFRpbWUoKSxyPW4+LTEmJm48MjUzNDAyMzE4OGU1O3JldHVybiB0LmxlZ2FjeT90LnJlbGF4ZWQmJnI/eyRkYXRlOmUuZ2V0VGltZSgpfTp7JGRhdGU6RHQoZSl9OnQucmVsYXhlZCYmcj97JGRhdGU6RHQoZSl9OnskZGF0ZTp7JG51bWJlckxvbmc6ZS5nZXRUaW1lKCkudG9TdHJpbmcoKX19fWlmKCEoIm51bWJlciIhPXR5cGVvZiBlfHx0LnJlbGF4ZWQmJmlzRmluaXRlKGUpKSl7aWYoTnVtYmVyLmlzSW50ZWdlcihlKSYmIU9iamVjdC5pcyhlLC0wKSl7aWYoZT49UyYmZTw9bSlyZXR1cm57JG51bWJlckludDplLnRvU3RyaW5nKCl9O2lmKGU+PXgmJmU8PUIpcmV0dXJueyRudW1iZXJMb25nOmUudG9TdHJpbmcoKX19cmV0dXJueyRudW1iZXJEb3VibGU6T2JqZWN0LmlzKGUsLTApPyItMC4wIjplLnRvU3RyaW5nKCl9fWlmKCJiaWdpbnQiPT10eXBlb2YgZSlyZXR1cm4gdC5yZWxheGVkP051bWJlcihCaWdJbnQuYXNJbnROKDY0LGUpKTp7JG51bWJlckxvbmc6QmlnSW50LmFzSW50Tig2NCxlKS50b1N0cmluZygpfTtpZihlIGluc3RhbmNlb2YgUmVnRXhwfHxoKGUpKXtsZXQgbj1lLmZsYWdzO2lmKHZvaWQgMD09PW4pe2NvbnN0IHQ9ZS50b1N0cmluZygpLm1hdGNoKC9bZ2ltdXldKiQvKTt0JiYobj10WzBdKX1yZXR1cm4gbmV3IGl0KGUuc291cmNlLG4pLnRvRXh0ZW5kZWRKU09OKHQpfXJldHVybiBudWxsIT1lJiYib2JqZWN0Ij09dHlwZW9mIGU/ZnVuY3Rpb24oZSx0KXtpZihudWxsPT1lfHwib2JqZWN0IiE9dHlwZW9mIGUpdGhyb3cgbmV3IFooIm5vdCBhbiBvYmplY3QgaW5zdGFuY2UiKTtjb25zdCBuPWUuX2Jzb250eXBlO2lmKHZvaWQgMD09PW4pe2NvbnN0IG49e307Zm9yKGNvbnN0IHIgb2YgT2JqZWN0LmtleXMoZSkpe3Quc2Vlbk9iamVjdHMucHVzaCh7cHJvcGVydHlOYW1lOnIsb2JqOm51bGx9KTt0cnl7Y29uc3QgaT1DdChlW3JdLHQpOyJfX3Byb3RvX18iPT09cj9PYmplY3QuZGVmaW5lUHJvcGVydHkobixyLHt2YWx1ZTppLHdyaXRhYmxlOiEwLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwfSk6bltyXT1pfWZpbmFsbHl7dC5zZWVuT2JqZWN0cy5wb3AoKX19cmV0dXJuIG59aWYobnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYic3RyaW5nIj09dHlwZW9mIGUuX2Jzb250eXBlJiZlW3ldIT09cCl0aHJvdyBuZXcgRztpZihmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9ZSYmIm9iamVjdCI9PXR5cGVvZiBlJiYiX2Jzb250eXBlImluIGUmJiJzdHJpbmciPT10eXBlb2YgZS5fYnNvbnR5cGV9KGUpKXtsZXQgcj1lO2lmKCJmdW5jdGlvbiIhPXR5cGVvZiByLnRvRXh0ZW5kZWRKU09OKXtjb25zdCB0PU10W2UuX2Jzb250eXBlXTtpZighdCl0aHJvdyBuZXcgWigiVW5yZWNvZ25pemVkIG9yIGludmFsaWQgX2Jzb250eXBlOiAiK2UuX2Jzb250eXBlKTtyPXQocil9cmV0dXJuIkNvZGUiPT09biYmci5zY29wZT9yPW5ldyBFZShyLmNvZGUsQ3Qoci5zY29wZSx0KSk6IkRCUmVmIj09PW4mJnIub2lkJiYocj1uZXcgT2UoQ3Qoci5jb2xsZWN0aW9uLHQpLEN0KHIub2lkLHQpLEN0KHIuZGIsdCksQ3Qoci5maWVsZHMsdCkpKSxyLnRvRXh0ZW5kZWRKU09OKHQpfXRocm93IG5ldyBaKCJfYnNvbnR5cGUgbXVzdCBiZSBhIHN0cmluZywgYnV0IHdhczogIit0eXBlb2Ygbil9KGUsdCk6ZX1jb25zdCBNdD17QmluYXJ5OmU9Pm5ldyB5ZShlLnZhbHVlKCksZS5zdWJfdHlwZSksQ29kZTplPT5uZXcgRWUoZS5jb2RlLGUuc2NvcGUpLERCUmVmOmU9Pm5ldyBPZShlLmNvbGxlY3Rpb258fGUubmFtZXNwYWNlLGUub2lkLGUuZGIsZS5maWVsZHMpLERlY2ltYWwxMjg6ZT0+bmV3IEhlKGUuYnl0ZXMpLERvdWJsZTplPT5uZXcgS2UoZS52YWx1ZSksSW50MzI6ZT0+bmV3IFplKGUudmFsdWUpLExvbmc6ZT0+amUuZnJvbUJpdHMobnVsbCE9ZS5sb3c/ZS5sb3c6ZS5sb3dfLG51bGwhPWUubG93P2UuaGlnaDplLmhpZ2hfLG51bGwhPWUubG93P2UudW5zaWduZWQ6ZS51bnNpZ25lZF8pLE1heEtleTooKT0+bmV3IEdlLE1pbktleTooKT0+bmV3IFhlLE9iamVjdElkOmU9Pm5ldyB0dChlKSxCU09OUmVnRXhwOmU9Pm5ldyBpdChlLnBhdHRlcm4sZS5vcHRpb25zKSxCU09OU3ltYm9sOmU9Pm5ldyBvdChlLnZhbHVlKSxUaW1lc3RhbXA6ZT0+YXQuZnJvbUJpdHMoZS5sb3csZS5oaWdoKX07ZnVuY3Rpb24gVnQoZSx0KXtjb25zdCBuPXt1c2VCaWdJbnQ2NDp0Py51c2VCaWdJbnQ2ND8/ITEscmVsYXhlZDp0Py5yZWxheGVkPz8hMCxsZWdhY3k6dD8ubGVnYWN5Pz8hMX07cmV0dXJuIEpTT04ucGFyc2UoZSwoKGUsdCk9PntpZigtMSE9PWUuaW5kZXhPZigiXDAiKSl0aHJvdyBuZXcgWihgQlNPTiBEb2N1bWVudCBmaWVsZCBuYW1lcyBjYW5ub3QgY29udGFpbiBudWxsIGJ5dGVzLCBmb3VuZDogJHtKU09OLnN0cmluZ2lmeShlKX1gKTtyZXR1cm4genQodCxuKX0pKX1mdW5jdGlvbiBQdChlLHQsbixyKXtudWxsIT1uJiYib2JqZWN0Ij09dHlwZW9mIG4mJihyPW4sbj0wKSxudWxsPT10fHwib2JqZWN0IiE9dHlwZW9mIHR8fEFycmF5LmlzQXJyYXkodCl8fChyPXQsdD12b2lkIDAsbj0wKTtjb25zdCBpPUN0KGUsT2JqZWN0LmFzc2lnbih7cmVsYXhlZDohMCxsZWdhY3k6ITF9LHIse3NlZW5PYmplY3RzOlt7cHJvcGVydHlOYW1lOiIocm9vdCkiLG9iajpudWxsfV19KSk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KGksdCxuKX1jb25zdCBKdD1PYmplY3QuY3JlYXRlKG51bGwpO0p0LnBhcnNlPVZ0LEp0LnN0cmluZ2lmeT1QdCxKdC5zZXJpYWxpemU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD10fHx7fSxKU09OLnBhcnNlKFB0KGUsdCkpfSxKdC5kZXNlcmlhbGl6ZT1mdW5jdGlvbihlLHQpe3JldHVybiB0PXR8fHt9LFZ0KEpTT04uc3RyaW5naWZ5KGUpLHQpfSxPYmplY3QuZnJlZXplKEp0KTtjb25zdCBXdD0xLFl0PTIscXQ9MyxIdD00LEt0PTUsWnQ9NixHdD03LFh0PTgsUXQ9OSxlbj0xMCx0bj0xMSxubj0xMixybj0xMyxvbj0xNCxzbj0xNSxhbj0xNixjbj0xNyxmbj0xOCxsbj0xOSx1bj0yNTUsX249MTI3O2Z1bmN0aW9uIGduKGUsdCl7dHJ5e3JldHVybiBwZS5nZXROb25uZWdhdGl2ZUludDMyTEUoZSx0KX1jYXRjaChlKXt0aHJvdyBuZXcgUSgiQlNPTiBzaXplIGNhbm5vdCBiZSBuZWdhdGl2ZSIsdCx7Y2F1c2U6ZX0pfX1mdW5jdGlvbiBobihlLHQpe2xldCBuPXQ7Zm9yKDswIT09ZVtuXTtuKyspO2lmKG49PT1lLmxlbmd0aC0xKXRocm93IG5ldyBRKCJOdWxsIHRlcm1pbmF0b3Igbm90IGZvdW5kIix0KTtyZXR1cm4gbn1jb25zdCBibj1PYmplY3QuY3JlYXRlKG51bGwpO2JuLnBhcnNlVG9FbGVtZW50cz1mdW5jdGlvbihlLHQ9MCl7aWYodD8/PTAsZS5sZW5ndGg8NSl0aHJvdyBuZXcgUShgSW5wdXQgbXVzdCBiZSBhdCBsZWFzdCA1IGJ5dGVzLCBnb3QgJHtlLmxlbmd0aH0gYnl0ZXNgLHQpO2NvbnN0IG49Z24oZSx0KTtpZihuPmUubGVuZ3RoLXQpdGhyb3cgbmV3IFEoYFBhcnNlZCBkb2N1bWVudFNpemUgKCR7bn0gYnl0ZXMpIGRvZXMgbm90IG1hdGNoIGlucHV0IGxlbmd0aCAoJHtlLmxlbmd0aH0gYnl0ZXMpYCx0KTtpZigwIT09ZVt0K24tMV0pdGhyb3cgbmV3IFEoIkJTT04gZG9jdW1lbnRzIG11c3QgZW5kIGluIDB4MDAiLHQrbik7Y29uc3Qgcj1bXTtsZXQgaT10KzQ7Zm9yKDtpPD1uK3Q7KXtjb25zdCBvPWVbaV07aWYoaSs9MSwwPT09byl7aWYoaS10IT09bil0aHJvdyBuZXcgUSgiSW52YWxpZCAweDAwIHR5cGUgYnl0ZSIsaSk7YnJlYWt9Y29uc3Qgcz1pLGE9aG4oZSxpKS1zO2xldCBjO2lmKGkrPWErMSxvPT09V3R8fG89PT1mbnx8bz09PVF0fHxvPT09Y24pYz04O2Vsc2UgaWYobz09PWFuKWM9NDtlbHNlIGlmKG89PT1HdCljPTEyO2Vsc2UgaWYobz09PWxuKWM9MTY7ZWxzZSBpZihvPT09WHQpYz0xO2Vsc2UgaWYobz09PWVufHxvPT09WnR8fG89PT1fbnx8bz09PXVuKWM9MDtlbHNlIGlmKG89PT10biljPWhuKGUsaG4oZSxpKSsxKSsxLWk7ZWxzZSBpZihvPT09cXR8fG89PT1IdHx8bz09PXNuKWM9Z24oZSxpKTtlbHNle2lmKG8hPT1ZdCYmbyE9PUt0JiZvIT09bm4mJm8hPT1ybiYmbyE9PW9uKXRocm93IG5ldyBRKGBJbnZhbGlkIDB4JHtvLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCIwIil9IHR5cGUgYnl0ZWAsaSk7Yz1nbihlLGkpKzQsbz09PUt0JiYoYys9MSksbz09PW5uJiYoYys9MTIpfWlmKGM+bil0aHJvdyBuZXcgUSgidmFsdWUgcmVwb3J0cyBsZW5ndGggbGFyZ2VyIHRoYW4gZG9jdW1lbnQiLGkpO3IucHVzaChbbyxzLGEsaSxjXSksaSs9Y31yZXR1cm4gcn0sYm4uQnl0ZVV0aWxzPV9lLGJuLk51bWJlclV0aWxzPXBlLE9iamVjdC5mcmVlemUoYm4pO2NvbnN0IGRuPTE3ODI1NzkyO2xldCB3bj1fZS5hbGxvY2F0ZShkbik7dmFyIHBuPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLEJTT05FcnJvcjpaLEJTT05PZmZzZXRFcnJvcjpRLEJTT05SZWdFeHA6aXQsQlNPTlJ1bnRpbWVFcnJvcjpYLEJTT05TeW1ib2w6b3QsQlNPTlR5cGU6SyxCU09OVmFsdWU6aGUsQlNPTlZlcnNpb25FcnJvcjpHLEJpbmFyeTp5ZSxCeXRlVXRpbHM6X2UsQ29kZTpFZSxEQlJlZjpPZSxEZWNpbWFsMTI4OkhlLERvdWJsZTpLZSxFSlNPTjpKdCxJbnQzMjpaZSxMb25nOmplLE1heEtleTpHZSxNaW5LZXk6WGUsTnVtYmVyVXRpbHM6cGUsT2JqZWN0SWQ6dHQsVGltZXN0YW1wOmF0LFVVSUQ6eGUsYnNvblR5cGU6Z2UsY2FsY3VsYXRlT2JqZWN0U2l6ZTpmdW5jdGlvbihlLHQ9e30pe3JldHVybiBudChlLCJib29sZWFuIj09dHlwZW9mKHQ9dHx8e30pLnNlcmlhbGl6ZUZ1bmN0aW9ucyYmdC5zZXJpYWxpemVGdW5jdGlvbnMsImJvb2xlYW4iIT10eXBlb2YgdC5pZ25vcmVVbmRlZmluZWR8fHQuaWdub3JlVW5kZWZpbmVkKX0sZGVzZXJpYWxpemU6ZnVuY3Rpb24oZSx0PXt9KXtyZXR1cm4gbHQoX2UudG9Mb2NhbEJ1ZmZlclR5cGUoZSksdCl9LGRlc2VyaWFsaXplU3RyZWFtOmZ1bmN0aW9uKGUsdCxuLHIsaSxvKXtjb25zdCBzPU9iamVjdC5hc3NpZ24oe2FsbG93T2JqZWN0U21hbGxlclRoYW5CdWZmZXJTaXplOiEwLGluZGV4OjB9LG8pLGE9X2UudG9Mb2NhbEJ1ZmZlclR5cGUoZSk7bGV0IGM9dDtmb3IobGV0IGU9MDtlPG47ZSsrKXtjb25zdCB0PXBlLmdldEludDMyTEUoYSxjKTtzLmluZGV4PWMscltpK2VdPWx0KGEscyksYys9dH1yZXR1cm4gY30sb25EZW1hbmQ6Ym4sc2VyaWFsaXplOmZ1bmN0aW9uKGUsdD17fSl7Y29uc3Qgbj0iYm9vbGVhbiI9PXR5cGVvZiB0LmNoZWNrS2V5cyYmdC5jaGVja0tleXMscj0iYm9vbGVhbiI9PXR5cGVvZiB0LnNlcmlhbGl6ZUZ1bmN0aW9ucyYmdC5zZXJpYWxpemVGdW5jdGlvbnMsaT0iYm9vbGVhbiIhPXR5cGVvZiB0Lmlnbm9yZVVuZGVmaW5lZHx8dC5pZ25vcmVVbmRlZmluZWQsbz0ibnVtYmVyIj09dHlwZW9mIHQubWluSW50ZXJuYWxCdWZmZXJTaXplP3QubWluSW50ZXJuYWxCdWZmZXJTaXplOmRuO3duLmxlbmd0aDxvJiYod249X2UuYWxsb2NhdGUobykpO2NvbnN0IHM9RnQod24sZSxuLDAsMCxyLGksbnVsbCksYT1fZS5hbGxvY2F0ZVVuc2FmZShzKTtyZXR1cm4gYS5zZXQod24uc3ViYXJyYXkoMCxzKSwwKSxhfSxzZXJpYWxpemVXaXRoQnVmZmVyQW5kSW5kZXg6ZnVuY3Rpb24oZSx0LG49e30pe2NvbnN0IHI9ImJvb2xlYW4iPT10eXBlb2Ygbi5jaGVja0tleXMmJm4uY2hlY2tLZXlzLGk9ImJvb2xlYW4iPT10eXBlb2Ygbi5zZXJpYWxpemVGdW5jdGlvbnMmJm4uc2VyaWFsaXplRnVuY3Rpb25zLG89ImJvb2xlYW4iIT10eXBlb2Ygbi5pZ25vcmVVbmRlZmluZWR8fG4uaWdub3JlVW5kZWZpbmVkLHM9Im51bWJlciI9PXR5cGVvZiBuLmluZGV4P24uaW5kZXg6MCxhPUZ0KHduLGUsciwwLDAsaSxvLG51bGwpO3JldHVybiB0LnNldCh3bi5zdWJhcnJheSgwLGEpLHMpLHMrYS0xfSxzZXRJbnRlcm5hbEJ1ZmZlclNpemU6ZnVuY3Rpb24oZSl7d24ubGVuZ3RoPGUmJih3bj1fZS5hbGxvY2F0ZShlKSl9fSk7Y2xhc3MgeW57Y29uc3RydWN0b3IoKXt9c3RhdGljIHVybENvbnN0cnVjdEZyb20oZSl7Y29uc3QgdD0iL3dzL21vZGVsaW5nL2NvbW1hbmRzIitmdW5jdGlvbihlKXtjb25zdCB0PW5ldyBVUkxTZWFyY2hQYXJhbXM7Zm9yKGNvbnN0W24scl1vZiBPYmplY3QuZW50cmllcyhlKSlpZih2b2lkIDAhPT1yKWlmKEFycmF5LmlzQXJyYXkocikpZm9yKGNvbnN0IGUgb2Ygcil0LmFwcGVuZChuLFN0cmluZyhlKSk7ZWxzZSB0LmFwcGVuZChuLFN0cmluZyhyKSk7Y29uc3Qgbj10LnRvU3RyaW5nKCk7cmV0dXJuIG4/YD8ke259YDoiIn0oe3ZpZGVvX3Jlc193aWR0aDplLnZpZGVvX3Jlc193aWR0aCx2aWRlb19yZXNfaGVpZ2h0OmUudmlkZW9fcmVzX2hlaWdodCxmcHM6ZS5mcHMsdW5sb2NrZWRfZnJhbWVyYXRlOmUudW5sb2NrZWRfZnJhbWVyYXRlLHBvc3RfZWZmZWN0OmUucG9zdF9lZmZlY3Qsd2VicnRjOmUud2VicnRjLHBvb2w6ZS5wb29sLHNob3dfZ3JpZDplLnNob3dfZ3JpZCxyZXBsYXk6ZS5yZXBsYXksYXBpX2NhbGxfaWQ6ZS5hcGlfY2FsbF9pZCxvcmRlcl9pbmRlcGVuZGVudF90cmFuc3BhcmVuY3k6ZS5vcmRlcl9pbmRlcGVuZGVudF90cmFuc3BhcmVuY3kscHI6ZS5wcn0pLG49KChlLmNsaWVudD8uYmFzZVVybHx8Imh0dHBzOi8vYXBpLnpvby5kZXYiKSt0KS5yZXBsYWNlKC9eaHR0cC8sIndzIik7cmV0dXJuIG5ldyBVUkwobil9c3RhdGljIGF1dGhlbnRpY2F0ZShlLHQpe2NvbnN0IG49ZS5jbGllbnQmJmUuY2xpZW50LnRva2VufHwiIjtpZihuKXRyeXtjb25zdCBlPXt0eXBlOiJoZWFkZXJzIixoZWFkZXJzOntBdXRob3JpemF0aW9uOmBCZWFyZXIgJHtufWB9fTt0LnNlbmQoSlNPTi5zdHJpbmdpZnkoZSkpfWNhdGNoe319c3RhdGljIHRvQlNPTihlKXtyZXR1cm4gcG4uc2VyaWFsaXplKGUpfXN0YXRpYyBwYXJzZU1lc3NhZ2UoZSl7Y29uc3QgdD1lPy5kYXRhO2lmKCJzdHJpbmciPT10eXBlb2YgdClyZXR1cm4gSlNPTi5wYXJzZSh0KTtpZigidW5kZWZpbmVkIiE9dHlwZW9mIEJ1ZmZlciYmQnVmZmVyLmlzQnVmZmVyPy4odCkpe2NvbnN0IGU9dDt0cnl7cmV0dXJuIEpTT04ucGFyc2UoZS50b1N0cmluZygidXRmOCIpKX1jYXRjaHt9cmV0dXJuIHBuLmRlc2VyaWFsaXplKGUpfWlmKHQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0KTt0cnl7Y29uc3QgdD0obmV3IFRleHREZWNvZGVyKS5kZWNvZGUoZSk7cmV0dXJuIEpTT04ucGFyc2UodCl9Y2F0Y2h7fXJldHVybiBwbi5kZXNlcmlhbGl6ZShlKX1pZigobj10KSYmIm9iamVjdCI9PXR5cGVvZiBuJiYiYnVmZmVyImluIG4mJm4uYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXImJiJudW1iZXIiPT10eXBlb2Ygbi5ieXRlT2Zmc2V0JiYibnVtYmVyIj09dHlwZW9mIG4uYnl0ZUxlbmd0aCl7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0LmJ1ZmZlcix0LmJ5dGVPZmZzZXQsdC5ieXRlTGVuZ3RoKTt0cnl7Y29uc3QgdD0obmV3IFRleHREZWNvZGVyKS5kZWNvZGUoZSk7cmV0dXJuIEpTT04ucGFyc2UodCl9Y2F0Y2h7fXJldHVybiBwbi5kZXNlcmlhbGl6ZShlKX12YXIgbjtyZXR1cm4gdH19Y2xhc3MgbW57X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxSbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ19jb250ZXh0X2ZyZWUoZSwwKX1hZGRfY29uc3RyYWludChlLHQsbixyLGkpe2NvbnN0IG89b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxsPV9yLHU9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLF89X3I7cmV0dXJuIHVyLmNvbnRleHRfYWRkX2NvbnN0cmFpbnQodGhpcy5fX3diZ19wdHIsbyxzLGEsYyxmLGwsdSxfLGkpfWFkZF9maWxlKGUsdCl7Y29uc3Qgbj1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYykscj1fcjtyZXR1cm4gdXIuY29udGV4dF9hZGRfZmlsZSh0aGlzLl9fd2JnX3B0cixlLG4scil9YWRkX3NlZ21lbnQoZSx0LG4scixpLG8pe2NvbnN0IHM9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGE9X3IsYz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZj1fcixsPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSx1PV9yO3ZhciBfPW5yKHIpPzA6b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGc9X3I7Y29uc3QgaD1vcihpLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYj1fcjtyZXR1cm4gdXIuY29udGV4dF9hZGRfc2VnbWVudCh0aGlzLl9fd2JnX3B0cixzLGEsYyxmLGwsdSxfLGcsaCxiLG8pfWJ1c3RDYWNoZUFuZFJlc2V0U2NlbmUoZSx0KXtjb25zdCBuPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO3ZhciBpPW5yKHQpPzA6b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3I7cmV0dXJuIHVyLmNvbnRleHRfYnVzdENhY2hlQW5kUmVzZXRTY2VuZSh0aGlzLl9fd2JnX3B0cixuLHIsaSxvKX1jaGFpbl9zZWdtZW50KGUsdCxuLHIsaSxvLHMpe2NvbnN0IGE9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3IsZj1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbD1fcix1PW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxfPV9yLGc9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGg9X3I7dmFyIGI9bnIoaSk/MDpvcihpLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZD1fcjtjb25zdCB3PW9yKG8sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxwPV9yO3JldHVybiB1ci5jb250ZXh0X2NoYWluX3NlZ21lbnQodGhpcy5fX3diZ19wdHIsYSxjLGYsbCx1LF8sZyxoLGIsZCx3LHAscyl9Y2xlYXJfc2tldGNoX2NoZWNrcG9pbnRzKCl7cmV0dXJuIHVyLmNvbnRleHRfY2xlYXJfc2tldGNoX2NoZWNrcG9pbnRzKHRoaXMuX193YmdfcHRyKX1kZWxldGVfb2JqZWN0cyhlLHQsbixyLGksbyl7Y29uc3Qgcz1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcixjPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxmPV9yLGw9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHU9X3IsXz1vcihyLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZz1fcixoPW9yKGksdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxiPV9yO3JldHVybiB1ci5jb250ZXh0X2RlbGV0ZV9vYmplY3RzKHRoaXMuX193YmdfcHRyLHMsYSxjLGYsbCx1LF8sZyxoLGIsbyl9ZGVsZXRlX3NrZXRjaChlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcixvPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfZGVsZXRlX3NrZXRjaCh0aGlzLl9fd2JnX3B0cixyLGksbyxzLGEsYyl9ZWRpdF9jb25zdHJhaW50KGUsdCxuLHIsaSxvKXtjb25zdCBzPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yLGM9b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGY9X3IsbD1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksdT1fcixfPW9yKHIsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxnPV9yLGg9b3IoaSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGI9X3I7cmV0dXJuIHVyLmNvbnRleHRfZWRpdF9jb25zdHJhaW50KHRoaXMuX193YmdfcHRyLHMsYSxjLGYsbCx1LF8sZyxoLGIsbyl9ZWRpdF9zZWdtZW50cyhlLHQsbixyLGkpe2NvbnN0IG89b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxsPV9yLHU9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLF89X3I7cmV0dXJuIHVyLmNvbnRleHRfZWRpdF9zZWdtZW50cyh0aGlzLl9fd2JnX3B0cixvLHMsYSxjLGYsbCx1LF8saSl9ZWRpdF9za2V0Y2goZSx0LG4scixpKXtjb25zdCBvPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3IsZj1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbD1fcix1PW9yKHIsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxfPV9yLGc9b3IoaSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGg9X3I7cmV0dXJuIHVyLmNvbnRleHRfZWRpdF9za2V0Y2godGhpcy5fX3diZ19wdHIsbyxzLGEsYyxmLGwsdSxfLGcsaCl9ZXhlY3V0ZShlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcjt2YXIgbz1ucih0KT8wOm9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yO2NvbnN0IGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfZXhlY3V0ZSh0aGlzLl9fd2JnX3B0cixyLGksbyxzLGEsYyl9ZXhlY3V0ZU1vY2soZSx0LG4scil7Y29uc3QgaT1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcjt2YXIgcz1ucih0KT8wOm9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yO2NvbnN0IGM9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGY9X3I7cmV0dXJuIHVyLmNvbnRleHRfZXhlY3V0ZU1vY2sodGhpcy5fX3diZ19wdHIsaSxvLHMsYSxjLGYscil9ZXhlY3V0ZV90cmltKGUsdCxuLHIpe2NvbnN0IGk9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3Iscz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcixjPWlyKG4sdXIuX193YmluZGdlbl9tYWxsb2MpLGY9X3IsbD1vcihyLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksdT1fcjtyZXR1cm4gdXIuY29udGV4dF9leGVjdXRlX3RyaW0odGhpcy5fX3diZ19wdHIsaSxvLHMsYSxjLGYsbCx1KX1leGl0X3NrZXRjaChlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcixvPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfZXhpdF9za2V0Y2godGhpcy5fX3diZ19wdHIscixpLG8scyxhLGMpfWV4cG9ydChlLHQpe2NvbnN0IG49b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3IsaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcjtyZXR1cm4gdXIuY29udGV4dF9leHBvcnQodGhpcy5fX3diZ19wdHIsbixyLGksbyl9Z2V0X2ZpbGUoZSx0KXtyZXR1cm4gdXIuY29udGV4dF9nZXRfZmlsZSh0aGlzLl9fd2JnX3B0cixlLHQpfWdldF9wcm9qZWN0KGUpe3JldHVybiB1ci5jb250ZXh0X2dldF9wcm9qZWN0KHRoaXMuX193YmdfcHRyLGUpfWhhY2tfc2V0X3Byb2dyYW0oZSx0KXtjb25zdCBuPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yLGk9b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3I7cmV0dXJuIHVyLmNvbnRleHRfaGFja19zZXRfcHJvZ3JhbSh0aGlzLl9fd2JnX3B0cixuLHIsaSxvKX1jb25zdHJ1Y3RvcihlLHQpe2NvbnN0IG49dXIuY29udGV4dF9uZXcoZSx0KTtpZihuWzJdKXRocm93IHNyKG5bMV0pO3JldHVybiB0aGlzLl9fd2JnX3B0cj1uWzBdPj4+MCxSbi5yZWdpc3Rlcih0aGlzLHRoaXMuX193YmdfcHRyLHRoaXMpLHRoaXN9bmV3X3NrZXRjaChlLHQsbixyLGkpe2NvbnN0IG89b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxsPV9yLHU9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLF89X3IsZz1vcihpLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaD1fcjtyZXR1cm4gdXIuY29udGV4dF9uZXdfc2tldGNoKHRoaXMuX193YmdfcHRyLG8scyxhLGMsZixsLHUsXyxnLGgpfW9wZW5fcHJvamVjdChlLHQsbil7Y29uc3Qgcj1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcjtyZXR1cm4gdXIuY29udGV4dF9vcGVuX3Byb2plY3QodGhpcy5fX3diZ19wdHIsZSxyLGksbil9cmVmcmVzaChlKXtyZXR1cm4gdXIuY29udGV4dF9yZWZyZXNoKHRoaXMuX193YmdfcHRyLGUpfXJlbW92ZV9maWxlKGUsdCl7cmV0dXJuIHVyLmNvbnRleHRfcmVtb3ZlX2ZpbGUodGhpcy5fX3diZ19wdHIsZSx0KX1yZXN0b3JlX3NrZXRjaF9jaGVja3BvaW50KGUpe2NvbnN0IHQ9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG49X3I7cmV0dXJuIHVyLmNvbnRleHRfcmVzdG9yZV9za2V0Y2hfY2hlY2twb2ludCh0aGlzLl9fd2JnX3B0cix0LG4pfXNlbmRSZXNwb25zZShlKXtyZXR1cm4gdXIuY29udGV4dF9zZW5kUmVzcG9uc2UodGhpcy5fX3diZ19wdHIsZSl9c2tldGNoX2V4ZWN1dGVfbW9jayhlLHQsbil7Y29uc3Qgcj1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcixvPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxzPV9yLGE9b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGM9X3I7cmV0dXJuIHVyLmNvbnRleHRfc2tldGNoX2V4ZWN1dGVfbW9jayh0aGlzLl9fd2JnX3B0cixyLGksbyxzLGEsYyl9c3dpdGNoX2ZpbGUoZSx0KXtyZXR1cm4gdXIuY29udGV4dF9zd2l0Y2hfZmlsZSh0aGlzLl9fd2JnX3B0cixlLHQpfXRyYW5zcGlsZV9vbGRfc2tldGNoKGUsdCxuLHIpe2NvbnN0IGk9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG89X3Iscz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcjt2YXIgYz1ucihuKT8wOm9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxmPV9yO2NvbnN0IGw9b3Iocix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHU9X3I7cmV0dXJuIHVyLmNvbnRleHRfdHJhbnNwaWxlX29sZF9za2V0Y2godGhpcy5fX3diZ19wdHIsaSxvLHMsYSxjLGYsbCx1KX11cGRhdGVfZmlsZShlLHQsbil7Y29uc3Qgcj1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksaT1fcjtyZXR1cm4gdXIuY29udGV4dF91cGRhdGVfZmlsZSh0aGlzLl9fd2JnX3B0cixlLHQscixpKX19U3ltYm9sLmRpc3Bvc2UmJihtbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPW1uLnByb3RvdHlwZS5mcmVlKTtjbGFzcyBTbntfX2Rlc3Ryb3lfaW50b19yYXcoKXtjb25zdCBlPXRoaXMuX193YmdfcHRyO3JldHVybiB0aGlzLl9fd2JnX3B0cj0wLGpuLnVucmVnaXN0ZXIodGhpcyksZX1mcmVlKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3VyLl9fd2JnX2ludG91bmRlcmx5aW5nYnl0ZXNvdXJjZV9mcmVlKGUsMCl9Z2V0IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSgpe3JldHVybiB1ci5pbnRvdW5kZXJseWluZ2J5dGVzb3VyY2VfYXV0b0FsbG9jYXRlQ2h1bmtTaXplKHRoaXMuX193YmdfcHRyKT4+PjB9Y2FuY2VsKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3VyLmludG91bmRlcmx5aW5nYnl0ZXNvdXJjZV9jYW5jZWwoZSl9cHVsbChlKXtyZXR1cm4gdXIuaW50b3VuZGVybHlpbmdieXRlc291cmNlX3B1bGwodGhpcy5fX3diZ19wdHIsZSl9c3RhcnQoZSl7dXIuaW50b3VuZGVybHlpbmdieXRlc291cmNlX3N0YXJ0KHRoaXMuX193YmdfcHRyLGUpfWdldCB0eXBlKCl7Y29uc3QgZT11ci5pbnRvdW5kZXJseWluZ2J5dGVzb3VyY2VfdHlwZSh0aGlzLl9fd2JnX3B0cik7cmV0dXJuIEFuW2VdfX1TeW1ib2wuZGlzcG9zZSYmKFNuLnByb3RvdHlwZVtTeW1ib2wuZGlzcG9zZV09U24ucHJvdG90eXBlLmZyZWUpO2NsYXNzIEJue19fZGVzdHJveV9pbnRvX3Jhdygpe2NvbnN0IGU9dGhpcy5fX3diZ19wdHI7cmV0dXJuIHRoaXMuX193YmdfcHRyPTAsRm4udW5yZWdpc3Rlcih0aGlzKSxlfWZyZWUoKXtjb25zdCBlPXRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7dXIuX193YmdfaW50b3VuZGVybHlpbmdzaW5rX2ZyZWUoZSwwKX1hYm9ydChlKXtjb25zdCB0PXRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7cmV0dXJuIHVyLmludG91bmRlcmx5aW5nc2lua19hYm9ydCh0LGUpfWNsb3NlKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3JldHVybiB1ci5pbnRvdW5kZXJseWluZ3NpbmtfY2xvc2UoZSl9d3JpdGUoZSl7cmV0dXJuIHVyLmludG91bmRlcmx5aW5nc2lua193cml0ZSh0aGlzLl9fd2JnX3B0cixlKX19U3ltYm9sLmRpc3Bvc2UmJihCbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPUJuLnByb3RvdHlwZS5mcmVlKTtjbGFzcyB4bntfX2Rlc3Ryb3lfaW50b19yYXcoKXtjb25zdCBlPXRoaXMuX193YmdfcHRyO3JldHVybiB0aGlzLl9fd2JnX3B0cj0wLGtuLnVucmVnaXN0ZXIodGhpcyksZX1mcmVlKCl7Y29uc3QgZT10aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO3VyLl9fd2JnX2ludG91bmRlcmx5aW5nc291cmNlX2ZyZWUoZSwwKX1jYW5jZWwoKXtjb25zdCBlPXRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7dXIuaW50b3VuZGVybHlpbmdzb3VyY2VfY2FuY2VsKGUpfXB1bGwoZSl7cmV0dXJuIHVyLmludG91bmRlcmx5aW5nc291cmNlX3B1bGwodGhpcy5fX3diZ19wdHIsZSl9fVN5bWJvbC5kaXNwb3NlJiYoeG4ucHJvdG90eXBlW1N5bWJvbC5kaXNwb3NlXT14bi5wcm90b3R5cGUuZnJlZSk7Y2xhc3MgRW57X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCx6bi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ19sc3BzZXJ2ZXJjb25maWdfZnJlZShlLDApfWNvbnN0cnVjdG9yKGUsdCxuKXtjb25zdCByPXVyLmxzcHNlcnZlcmNvbmZpZ19uZXcoZSx0LG4pO3JldHVybiB0aGlzLl9fd2JnX3B0cj1yPj4+MCx6bi5yZWdpc3Rlcih0aGlzLHRoaXMuX193YmdfcHRyLHRoaXMpLHRoaXN9fVN5bWJvbC5kaXNwb3NlJiYoRW4ucHJvdG90eXBlW1N5bWJvbC5kaXNwb3NlXT1Fbi5wcm90b3R5cGUuZnJlZSk7Y2xhc3MgVW57X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxEbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ19yZXNwb25zZWNvbnRleHRfZnJlZShlLDApfWNvbnN0cnVjdG9yKCl7Y29uc3QgZT11ci5yZXNwb25zZWNvbnRleHRfbmV3KCk7cmV0dXJuIHRoaXMuX193YmdfcHRyPWU+Pj4wLERuLnJlZ2lzdGVyKHRoaXMsdGhpcy5fX3diZ19wdHIsdGhpcyksdGhpc31zZW5kX3Jlc3BvbnNlKGUpe3JldHVybiB1ci5yZXNwb25zZWNvbnRleHRfc2VuZF9yZXNwb25zZSh0aGlzLl9fd2JnX3B0cixlKX19U3ltYm9sLmRpc3Bvc2UmJihVbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPVVuLnByb3RvdHlwZS5mcmVlKTtjbGFzcyBPbntzdGF0aWMgX193cmFwKGUpe2U+Pj49MDtjb25zdCB0PU9iamVjdC5jcmVhdGUoT24ucHJvdG90eXBlKTtyZXR1cm4gdC5fX3diZ19wdHI9ZSxDbi5yZWdpc3Rlcih0LHQuX193YmdfcHRyLHQpLHR9X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxDbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ190YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fZnJlZShlLDApfWdldCBhcmNfbGVuZ3RoKCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fYXJjX2xlbmd0aCh0aGlzLl9fd2JnX3B0cil9Z2V0IGFyY19taWRfcG9pbnRfeCgpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2FyY19taWRfcG9pbnRfeCh0aGlzLl9fd2JnX3B0cil9Z2V0IGFyY19taWRfcG9pbnRfeSgpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2FyY19taWRfcG9pbnRfeSh0aGlzLl9fd2JnX3B0cil9Z2V0IGNjdygpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2Njdyh0aGlzLl9fd2JnX3B0cil9Z2V0IGNlbnRlcl94KCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fY2VudGVyX3godGhpcy5fX3diZ19wdHIpfWdldCBjZW50ZXJfeSgpe3JldHVybiB1ci5fX3diZ19nZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2NlbnRlcl95KHRoaXMuX193YmdfcHRyKX1nZXQgZW5kX2FuZ2xlKCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fZW5kX2FuZ2xlKHRoaXMuX193YmdfcHRyKX1nZXQgcmFkaXVzKCl7cmV0dXJuIHVyLl9fd2JnX2dldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fcmFkaXVzKHRoaXMuX193YmdfcHRyKX1nZXQgc3RhcnRfYW5nbGUoKXtyZXR1cm4gdXIuX193YmdfZ2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9zdGFydF9hbmdsZSh0aGlzLl9fd2JnX3B0cil9c2V0IGFyY19sZW5ndGgoZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9hcmNfbGVuZ3RoKHRoaXMuX193YmdfcHRyLGUpfXNldCBhcmNfbWlkX3BvaW50X3goZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9hcmNfbWlkX3BvaW50X3godGhpcy5fX3diZ19wdHIsZSl9c2V0IGFyY19taWRfcG9pbnRfeShlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2FyY19taWRfcG9pbnRfeSh0aGlzLl9fd2JnX3B0cixlKX1zZXQgY2N3KGUpe3VyLl9fd2JnX3NldF90YW5nZW50aWFsYXJjaW5mb291dHB1dHdhc21fY2N3KHRoaXMuX193YmdfcHRyLGUpfXNldCBjZW50ZXJfeChlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2NlbnRlcl94KHRoaXMuX193YmdfcHRyLGUpfXNldCBjZW50ZXJfeShlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2NlbnRlcl95KHRoaXMuX193YmdfcHRyLGUpfXNldCBlbmRfYW5nbGUoZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9lbmRfYW5nbGUodGhpcy5fX3diZ19wdHIsZSl9c2V0IHJhZGl1cyhlKXt1ci5fX3diZ19zZXRfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX3JhZGl1cyh0aGlzLl9fd2JnX3B0cixlKX1zZXQgc3RhcnRfYW5nbGUoZSl7dXIuX193Ymdfc2V0X3RhbmdlbnRpYWxhcmNpbmZvb3V0cHV0d2FzbV9zdGFydF9hbmdsZSh0aGlzLl9fd2JnX3B0cixlKX19U3ltYm9sLmRpc3Bvc2UmJihPbi5wcm90b3R5cGVbU3ltYm9sLmRpc3Bvc2VdPU9uLnByb3RvdHlwZS5mcmVlKTtjbGFzcyBObntzdGF0aWMgX193cmFwKGUpe2U+Pj49MDtjb25zdCB0PU9iamVjdC5jcmVhdGUoTm4ucHJvdG90eXBlKTtyZXR1cm4gdC5fX3diZ19wdHI9ZSxNbi5yZWdpc3Rlcih0LHQuX193YmdfcHRyLHQpLHR9X19kZXN0cm95X2ludG9fcmF3KCl7Y29uc3QgZT10aGlzLl9fd2JnX3B0cjtyZXR1cm4gdGhpcy5fX3diZ19wdHI9MCxNbi51bnJlZ2lzdGVyKHRoaXMpLGV9ZnJlZSgpe2NvbnN0IGU9dGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTt1ci5fX3diZ193YXNtY2lyY2xlcGFyYW1zX2ZyZWUoZSwwKX1nZXQgY2VudGVyX3goKXtyZXR1cm4gdXIuX193YmdfZ2V0X3dhc21jaXJjbGVwYXJhbXNfY2VudGVyX3godGhpcy5fX3diZ19wdHIpfWdldCBjZW50ZXJfeSgpe3JldHVybiB1ci5fX3diZ19nZXRfd2FzbWNpcmNsZXBhcmFtc19jZW50ZXJfeSh0aGlzLl9fd2JnX3B0cil9Z2V0IHJhZGl1cygpe3JldHVybiB1ci5fX3diZ19nZXRfd2FzbWNpcmNsZXBhcmFtc19yYWRpdXModGhpcy5fX3diZ19wdHIpfXNldCBjZW50ZXJfeChlKXt1ci5fX3diZ19zZXRfd2FzbWNpcmNsZXBhcmFtc19jZW50ZXJfeCh0aGlzLl9fd2JnX3B0cixlKX1zZXQgY2VudGVyX3koZSl7dXIuX193Ymdfc2V0X3dhc21jaXJjbGVwYXJhbXNfY2VudGVyX3kodGhpcy5fX3diZ19wdHIsZSl9c2V0IHJhZGl1cyhlKXt1ci5fX3diZ19zZXRfd2FzbWNpcmNsZXBhcmFtc19yYWRpdXModGhpcy5fX3diZ19wdHIsZSl9fWZ1bmN0aW9uIEluKGUpe2NvbnN0IHQ9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG49X3Iscj11ci5wYXJzZV93YXNtKHQsbik7aWYoclsyXSl0aHJvdyBzcihyWzFdKTtyZXR1cm4gc3IoclswXSl9ZnVuY3Rpb24gdm4oKXtjb25zdCBlPXtfX3Byb3RvX186bnVsbCxfX3diZ19FcnJvcl81NTUzODQ4M2RlNmUzYWJlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEVycm9yKFhuKGUsdCkpfSxfX3diZ19fX3diaW5kZ2VuX2Jvb2xlYW5fZ2V0X2ZlMmEyNGZkZmRiNDA2NGY6ZnVuY3Rpb24oZSl7Y29uc3QgdD0iYm9vbGVhbiI9PXR5cGVvZiBlP2U6dm9pZCAwO3JldHVybiBucih0KT8xNjc3NzIxNTp0PzE6MH0sX193YmdfX193YmluZGdlbl9kZWJ1Z19zdHJpbmdfZDg5NjI3MjAyZDAxNTViNzpmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IoV24odCksdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO0tuKCkuc2V0SW50MzIoZSs0LHIsITApLEtuKCkuc2V0SW50MzIoZSswLG4sITApfSxfX3diZ19fX3diaW5kZ2VuX2lzX2Z1bmN0aW9uXzJhOTU0MDY0MjNlYTg2MjY6ZnVuY3Rpb24oZSl7cmV0dXJuImZ1bmN0aW9uIj09dHlwZW9mIGV9LF9fd2JnX19fd2JpbmRnZW5faXNfbnVsbF84ZDkwNTI0YzllMGFmMTgzOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT09ZX0sX193YmdfX193YmluZGdlbl9pc19vYmplY3RfNTlhMDAyZTc2YjA1OTMxMjpmdW5jdGlvbihlKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIGUmJm51bGwhPT1lfSxfX3diZ19fX3diaW5kZ2VuX2lzX3VuZGVmaW5lZF84N2EzYTgzN2YzMzFmZWY1OmZ1bmN0aW9uKGUpe3JldHVybiB2b2lkIDA9PT1lfSxfX3diZ19fX3diaW5kZ2VuX3N0cmluZ19nZXRfZjExNjEzOTA0MTRmOWI1OTpmdW5jdGlvbihlLHQpe2NvbnN0IG49InN0cmluZyI9PXR5cGVvZiB0P3Q6dm9pZCAwO3ZhciByPW5yKG4pPzA6b3Iobix1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGk9X3I7S24oKS5zZXRJbnQzMihlKzQsaSwhMCksS24oKS5zZXRJbnQzMihlKzAsciwhMCl9LF9fd2JnX19fd2JpbmRnZW5fdGhyb3dfNTU0OTQ5MmRhZWRhZDEzOTpmdW5jdGlvbihlLHQpe3Rocm93IG5ldyBFcnJvcihYbihlLHQpKX0sX193YmdfX3diZ19jYl91bnJlZl9mYmU2OWJiMDc2YzE2YmFkOmZ1bmN0aW9uKGUpe2UuX3diZ19jYl91bnJlZigpfSxfX3diZ19idWZmZXJfMGE1Nzc4OGNkZmNlMjFiYTpmdW5jdGlvbihlKXtyZXR1cm4gZS5idWZmZXJ9LF9fd2JnX2J5b2JSZXF1ZXN0X2FiMGU1N2Y1NWJmNzc0ZjI6ZnVuY3Rpb24oZSl7Y29uc3QgdD1lLmJ5b2JSZXF1ZXN0O3JldHVybiBucih0KT8wOlZuKHQpfSxfX3diZ19ieXRlTGVuZ3RoXzk5MzFkYjAwZTU4NjFiZjk6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuYnl0ZUxlbmd0aH0sX193YmdfYnl0ZU9mZnNldF8wYTk4NWE5OGY4ZmZiOGQ3OmZ1bmN0aW9uKGUpe3JldHVybiBlLmJ5dGVPZmZzZXR9LF9fd2JnX2NhbGxfOGY1ZDdiYjA3MDI4MzUwODpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlLmNhbGwodCxuKX0pLGFyZ3VtZW50cyl9LF9fd2JnX2Nsb3NlXzYyZjZhNGVhZGM5NDU2NWY6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe2UuY2xvc2UoKX0pLGFyZ3VtZW50cyl9LF9fd2JnX2Nsb3NlXzg3MWU1MTZhMjczZDE1Zjg6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2xvc2UoKX0sX193YmdfY2xvc2VfZjI4NzA1ODcxNjA4OGE1MDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7ZS5jbG9zZSgpfSksYXJndW1lbnRzKX0sX193YmdfZG9uZV8xOWY5MmNiMWY4NzM4YWJhOmZ1bmN0aW9uKGUpe3JldHVybiBlLmRvbmV9LF9fd2JnX2VucXVldWVfZWUwNTkzY2VhOWJlOTNiZDpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtlLmVucXVldWUodCl9KSxhcmd1bWVudHMpfSxfX3diZ19lcnJvcl9hNmZhMjAyYjU4YWExY2QzOmZ1bmN0aW9uKGUsdCl7bGV0IG4scjt0cnl7bj1lLHI9dCxjb25zb2xlLmVycm9yKFhuKGUsdCkpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKG4sciwxKX19LF9fd2JnX2Vycm9yX2RlNmI4NmU1OTg1MDUyNDY6ZnVuY3Rpb24oZSl7Y29uc29sZS5lcnJvcihlKX0sX193YmdfZXhpc3RzXzNhNzFlODcwYWM3MTk2ZWI6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuKXtsZXQgcixpO3RyeXtyPXQsaT1uO3JldHVybiBlLmV4aXN0cyhYbih0LG4pKX1maW5hbGx5e3VyLl9fd2JpbmRnZW5fZnJlZShyLGksMSl9fSksYXJndW1lbnRzKX0sX193YmdfZmlyZU1vZGVsaW5nQ29tbWFuZEZyb21XYXNtXzVkMWVmY2Y1ZDEzNDhjZjY6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuLHIsaSxvLHMsYSxjKXtsZXQgZixsLHUsXyxnLGgsYixkO3RyeXtmPXQsbD1uLHU9cixfPWksZz1vLGg9cyxiPWEsZD1jLGUuZmlyZU1vZGVsaW5nQ29tbWFuZEZyb21XYXNtKFhuKHQsbiksWG4ocixpKSxYbihvLHMpLFhuKGEsYykpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKGYsbCwxKSx1ci5fX3diaW5kZ2VuX2ZyZWUodSxfLDEpLHVyLl9fd2JpbmRnZW5fZnJlZShnLGgsMSksdXIuX193YmluZGdlbl9mcmVlKGIsZCwxKX19KSxhcmd1bWVudHMpfSxfX3diZ19nZXRBbGxGaWxlc19mN2VjNjVkYTlmMzAxZGY2OmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQsbil7bGV0IHIsaTt0cnl7cj10LGk9bjtyZXR1cm4gZS5nZXRBbGxGaWxlcyhYbih0LG4pKX1maW5hbGx5e3VyLl9fd2JpbmRnZW5fZnJlZShyLGksMSl9fSksYXJndW1lbnRzKX0sX193YmdfZ2V0Q2xpZW50U3RhdGVfNGQ2ZjVhZDQyNTM3YzViMzpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0Q2xpZW50U3RhdGUoKX0pLGFyZ3VtZW50cyl9LF9fd2JnX2dldE9zSW5mb18xNjgxNmU5Yjc4ZjQwOTFlOmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IodC5nZXRPc0luZm8oKSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3I7S24oKS5zZXRJbnQzMihlKzQsciwhMCksS24oKS5zZXRJbnQzMihlKzAsbiwhMCl9KSxhcmd1bWVudHMpfSxfX3diZ19nZXRSYW5kb21WYWx1ZXNfM2Y0NGI3MDAzOTUwNjJlNTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMocW4oZSx0KSl9KSxhcmd1bWVudHMpfSxfX3diZ19nZXRSYW5kb21WYWx1ZXNfZWYxMjU1MmJmNWFjZDJmZTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMocW4oZSx0KSl9KSxhcmd1bWVudHMpfSxfX3diZ19nZXRUaW1lX2MzYWYzNTU5NGUyODMzNTY6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0VGltZSgpfSxfX3diZ19nZXRXZWJydGNTdGF0c185NjU2YzE4ZTJiNDBmMzUyOmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRXZWJydGNTdGF0cygpfSksYXJndW1lbnRzKX0sX193YmdfZ2V0V3JpdGVyXzdjOTUzMTQ5YWYyNzNjMjk6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe3JldHVybiBlLmdldFdyaXRlcigpfSksYXJndW1lbnRzKX0sX193YmdfZ2V0X2ZmNWYxZmIyMjAyMzM0Nzc6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIFJlZmxlY3QuZ2V0KGUsdCl9KSxhcmd1bWVudHMpfSxfX3diZ19pbnN0YW5jZW9mX1VpbnQ4QXJyYXlfY2UyNGQ1OGE1ZjRiZGNjMzpmdW5jdGlvbihlKXtsZXQgdDt0cnl7dD1lIGluc3RhbmNlb2YgVWludDhBcnJheX1jYXRjaChlKXt0PSExfXJldHVybiB0fSxfX3diZ19pbnN0YW5jZW9mX1dpbmRvd18yZmE4ZDljMmQ1YjYxMDRhOmZ1bmN0aW9uKGUpe2xldCB0O3RyeXt0PWUgaW5zdGFuY2VvZiBXaW5kb3d9Y2F0Y2goZSl7dD0hMX1yZXR1cm4gdH0sX193YmdfaW5zdGFuY2VvZl9Xb3JrZXJHbG9iYWxTY29wZV9hNDMwN2M4NWY3M2Q4M2MzOmZ1bmN0aW9uKGUpe2xldCB0O3RyeXt0PWUgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZX1jYXRjaChlKXt0PSExfXJldHVybiB0fSxfX3diZ19pc0Rlc2t0b3BfYjA2ZTdmZjZiNmE5OWExNzpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuaXNEZXNrdG9wKCl9KSxhcmd1bWVudHMpfSxfX3diZ19rY2xDb2RlXzQxNDMzYWM1NjI4YzkyMDg6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1vcih0LmtjbENvZGUoKSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3I7S24oKS5zZXRJbnQzMihlKzQsciwhMCksS24oKS5zZXRJbnQzMihlKzAsbiwhMCl9KSxhcmd1bWVudHMpfSxfX3diZ19sZW5ndGhfZTZlMTYzM2ZiZWE2Y2ZhOTpmdW5jdGlvbihlKXtyZXR1cm4gZS5sZW5ndGh9LF9fd2JnX2xvZ182YTc1YjcxZDYzMTZlOTM1OmZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKGUpfSxfX3diZ19uZXdfMF9lNjQ5Yzk5ZTczODIzMTNmOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlfSxfX3diZ19uZXdfMWQ5NjY3OGFhYWNjYTMyZTpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LF9fd2JnX25ld18yMjdkN2MwNTQxNGViODYxOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBFcnJvcn0sX193YmdfbmV3XzRhODQzZmUyZWU0MDgyYTk6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IEVycm9yKFhuKGUsdCkpfSxfX3diZ19uZXdfZnJvbV9zbGljZV8wYmM1OGUzNmY4MmExYjUwOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBVaW50OEFycmF5KHFuKGUsdCkpfSxfX3diZ19uZXdfdHlwZWRfMjVkZGEyMzg4ZDdlNWU5ZjpmdW5jdGlvbihlLHQpe3RyeXt2YXIgbj17YTplLGI6dH07Y29uc3Qgcj1uZXcgUHJvbWlzZSgoKGUsdCk9Pntjb25zdCByPW4uYTtuLmE9MDt0cnl7cmV0dXJuIGZ1bmN0aW9uKGUsdCxuLHIpe3VyLndhc21fYmluZGdlbl9fY29udmVydF9fY2xvc3VyZXNfX19fX2ludm9rZV9faDIzNmExZTJlNzI0YzcxZDkoZSx0LG4scil9KHIsbi5iLGUsdCl9ZmluYWxseXtuLmE9cn19KSk7cmV0dXJuIHJ9ZmluYWxseXtuLmE9MH19LF9fd2JnX25ld193aXRoX2J5dGVfb2Zmc2V0X2FuZF9sZW5ndGhfYWIxZTEwMDJkN2E2OTRlNDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUsdD4+PjAsbj4+PjApfSxfX3diZ19uZXh0XzFiN2I1YzAwNzk2NjU2MGY6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe3JldHVybiBlLm5leHQoKX0pLGFyZ3VtZW50cyl9LF9fd2JnX25vd19hOWFmNDU1NGVkYjdhYzc4OmZ1bmN0aW9uKGUpe3JldHVybiBlLm5vdygpfSxfX3diZ19ub3dfZTdjNjc5NWE3ZjgxZTEwZjpmdW5jdGlvbihlKXtyZXR1cm4gZS5ub3coKX0sX193YmdfcGFyc2VfZTU3MDNmZDUyMjExZTY4ODpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0KXtyZXR1cm4gSlNPTi5wYXJzZShYbihlLHQpKX0pLGFyZ3VtZW50cyl9LF9fd2JnX3BlcmZvcm1hbmNlXzNmY2Y2ZTMyYTdlMWVkMGE6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucGVyZm9ybWFuY2V9LF9fd2JnX3Byb3RvdHlwZXNldGNhbGxfMzg3NWQ1NGQxMmVmMmVlYzpmdW5jdGlvbihlLHQsbil7VWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwocW4oZSx0KSxuKX0sX193YmdfcXVldWVNaWNyb3Rhc2tfODg2ODM2NTExNGZlMjNiNTpmdW5jdGlvbihlKXtxdWV1ZU1pY3JvdGFzayhlKX0sX193YmdfcXVldWVNaWNyb3Rhc2tfY2ZjNWEwZTYyZjllYmRiZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5xdWV1ZU1pY3JvdGFza30sX193YmdfcmVhZEZpbGVfMjJiMDU3YTMwZWNjNjkxNTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0LG4pe2xldCByLGk7dHJ5e3I9dCxpPW47cmV0dXJuIGUucmVhZEZpbGUoWG4odCxuKSl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUocixpLDEpfX0pLGFyZ3VtZW50cyl9LF9fd2JnX3JlYWR5XzU4NTZkYjZmMDBlM2UyMGE6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVhZHl9LF9fd2JnX3JlbGVhc2VMb2NrXzk1YmJjN2NmN2I4Nzk3N2Q6ZnVuY3Rpb24oZSl7ZS5yZWxlYXNlTG9jaygpfSxfX3diZ19yZXNvbHZlX2Q4MDU5YmMxMTNlMjE1YmY6ZnVuY3Rpb24oZSl7cmV0dXJuIFByb21pc2UucmVzb2x2ZShlKX0sX193YmdfcmVzcG9uZF8xZWMyOTM5NWVkYmU3ZmNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQpe2UucmVzcG9uZCh0Pj4+MCl9KSxhcmd1bWVudHMpfSxfX3diZ19zZW5kTW9kZWxpbmdDb21tYW5kRnJvbVdhc21fMjU2ODc3YjdiM2Y0ZWQ1MzpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSx0LG4scixpLG8scyxhLGMpe2xldCBmLGwsdSxfLGcsaCxiLGQ7dHJ5e2Y9dCxsPW4sdT1yLF89aSxnPW8saD1zLGI9YSxkPWM7cmV0dXJuIGUuc2VuZE1vZGVsaW5nQ29tbWFuZEZyb21XYXNtKFhuKHQsbiksWG4ocixpKSxYbihvLHMpLFhuKGEsYykpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKGYsbCwxKSx1ci5fX3diaW5kZ2VuX2ZyZWUodSxfLDEpLHVyLl9fd2JpbmRnZW5fZnJlZShnLGgsMSksdXIuX193YmluZGdlbl9mcmVlKGIsZCwxKX19KSxhcmd1bWVudHMpfSxfX3diZ19zZXRUaW1lb3V0XzQ2NmQ1MGYzNTEyMjQ1Y2I6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5zZXRUaW1lb3V0KHQsbil9KSxhcmd1bWVudHMpfSxfX3diZ19zZXRUaW1lb3V0X2MxYzlhMThiNjM0M2ViZDM6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5zZXRUaW1lb3V0KHQsbil9KSxhcmd1bWVudHMpfSxfX3diZ19zZXRfMjk1YmFkM2I1ZWFkNGU5OTpmdW5jdGlvbihlLHQsbil7ZS5zZXQocW4odCxuKSl9LF9fd2JnX3N0YWNrXzNiMGQ5NzRiYmYzMWU0NGY6ZnVuY3Rpb24oZSx0KXtjb25zdCBuPW9yKHQuc3RhY2ssdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO0tuKCkuc2V0SW50MzIoZSs0LHIsITApLEtuKCkuc2V0SW50MzIoZSswLG4sITApfSxfX3diZ19zdGFydE5ld1Nlc3Npb25fZDE0YzA4ZjM0MzgxZDE1ZTpmdW5jdGlvbigpe3JldHVybiB0cigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3RhcnROZXdTZXNzaW9uKCl9KSxhcmd1bWVudHMpfSxfX3diZ19zdGF0aWNfYWNjZXNzb3JfR0xPQkFMXzhkZmI3ZjVlMjZlYmU1MjM6ZnVuY3Rpb24oKXtjb25zdCBlPSJ1bmRlZmluZWQiPT10eXBlb2YgZ2xvYmFsP251bGw6Z2xvYmFsO3JldHVybiBucihlKT8wOlZuKGUpfSxfX3diZ19zdGF0aWNfYWNjZXNzb3JfR0xPQkFMX1RISVNfOTQxMTU0ZWZjODM5NWNkZDpmdW5jdGlvbigpe2NvbnN0IGU9InVuZGVmaW5lZCI9PXR5cGVvZiBnbG9iYWxUaGlzP251bGw6Z2xvYmFsVGhpcztyZXR1cm4gbnIoZSk/MDpWbihlKX0sX193Ymdfc3RhdGljX2FjY2Vzc29yX1NFTEZfNThkYWM5YWY4MjJmNTYxZjpmdW5jdGlvbigpe2NvbnN0IGU9InVuZGVmaW5lZCI9PXR5cGVvZiBzZWxmP251bGw6c2VsZjtyZXR1cm4gbnIoZSk/MDpWbihlKX0sX193Ymdfc3RhdGljX2FjY2Vzc29yX1dJTkRPV19lZTY0ZjBiM2Q4MzU0YzBiOmZ1bmN0aW9uKCl7Y29uc3QgZT0idW5kZWZpbmVkIj09dHlwZW9mIHdpbmRvdz9udWxsOndpbmRvdztyZXR1cm4gbnIoZSk/MDpWbihlKX0sX193Ymdfc3RyaW5naWZ5X2I2N2UyYzhjNjBiOTNmNjk6ZnVuY3Rpb24oKXtyZXR1cm4gdHIoKGZ1bmN0aW9uKGUpe3JldHVybiBKU09OLnN0cmluZ2lmeShlKX0pLGFyZ3VtZW50cyl9LF9fd2JnX3RoZW5fMDE1MDM1MmU0YWQyMDM0NDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIGUudGhlbih0LG4pfSxfX3diZ190aGVuXzUxNjA0ODZjNjdkZGI5OGE6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS50aGVuKHQpfSxfX3diZ190b1N0cmluZ181NTNiNWY2ZTk1ZTNlNDFiOmZ1bmN0aW9uKGUpe3JldHVybiBlLnRvU3RyaW5nKCl9LF9fd2JnX3RvU3RyaW5nXzllNzM1M2E3N2NiNDE1YTI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG9TdHJpbmcoKX0sX193YmdfdmFsdWVfZDViMjQ4Y2U4NDE5YmQxYjpmdW5jdGlvbihlKXtyZXR1cm4gZS52YWx1ZX0sX193YmdfdmVyc2lvbl84NTE2MDE1ZGVhNTM5ZTE2OmZ1bmN0aW9uKCl7cmV0dXJuIHRyKChmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IodC52ZXJzaW9uKCksdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxyPV9yO0tuKCkuc2V0SW50MzIoZSs0LHIsITApLEtuKCkuc2V0SW50MzIoZSswLG4sITApfSksYXJndW1lbnRzKX0sX193Ymdfdmlld18zOGE5MzA4NDRjOTY0MTAzOmZ1bmN0aW9uKGUpe2NvbnN0IHQ9ZS52aWV3O3JldHVybiBucih0KT8wOlZuKHQpfSxfX3diZ193YXJuXzg2ZWYwM2RiOGNmYjRkZDQ6ZnVuY3Rpb24oZSl7Y29uc29sZS53YXJuKGUpfSxfX3diZ193cml0ZV9mZjNhM2RlNDkwMmFhOGJmOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUud3JpdGUodCl9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDAxOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJyKGUsdCwkbil9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDAyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJyKGUsdCxMbil9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDAzOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJyKGUsdCxUbil9LF9fd2JpbmRnZW5fY2FzdF8wMDAwMDAwMDAwMDAwMDA0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIFhuKGUsdCl9LF9fd2JpbmRnZW5faW5pdF9leHRlcm5yZWZfdGFibGU6ZnVuY3Rpb24oKXtjb25zdCBlPXVyLl9fd2JpbmRnZW5fZXh0ZXJucmVmcyx0PWUuZ3Jvdyg0KTtlLnNldCgwLHZvaWQgMCksZS5zZXQodCswLHZvaWQgMCksZS5zZXQodCsxLG51bGwpLGUuc2V0KHQrMiwhMCksZS5zZXQodCszLCExKX19O3JldHVybntfX3Byb3RvX186bnVsbCwiLi9rY2xfd2FzbV9saWJfYmcuanMiOmV9fWZ1bmN0aW9uIFRuKGUsdCl7dXIud2FzbV9iaW5kZ2VuX19jb252ZXJ0X19jbG9zdXJlc19fX19faW52b2tlX19oMmY0YWE2M2RjZDU5OWNmNyhlLHQpfWZ1bmN0aW9uICRuKGUsdCxuKXtjb25zdCByPXVyLndhc21fYmluZGdlbl9fY29udmVydF9fY2xvc3VyZXNfX19fX2ludm9rZV9faGYxMzA4MTZjZDkwMDViOTkoZSx0LG4pO2lmKHJbMV0pdGhyb3cgc3IoclswXSl9ZnVuY3Rpb24gTG4oZSx0LG4pe2NvbnN0IHI9dXIud2FzbV9iaW5kZ2VuX19jb252ZXJ0X19jbG9zdXJlc19fX19faW52b2tlX19oZDQ0MGRiNTc2OTY3YzY1ZihlLHQsbik7aWYoclsxXSl0aHJvdyBzcihyWzBdKX1TeW1ib2wuZGlzcG9zZSYmKE5uLnByb3RvdHlwZVtTeW1ib2wuZGlzcG9zZV09Tm4ucHJvdG90eXBlLmZyZWUpO2NvbnN0IEFuPVsiYnl0ZXMiXSxSbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfY29udGV4dF9mcmVlKGU+Pj4wLDEpKSksam49InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JnX2ludG91bmRlcmx5aW5nYnl0ZXNvdXJjZV9mcmVlKGU+Pj4wLDEpKSksRm49InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JnX2ludG91bmRlcmx5aW5nc2lua19mcmVlKGU+Pj4wLDEpKSksa249InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JnX2ludG91bmRlcmx5aW5nc291cmNlX2ZyZWUoZT4+PjAsMSkpKSx6bj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfbHNwc2VydmVyY29uZmlnX2ZyZWUoZT4+PjAsMSkpKSxEbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfcmVzcG9uc2Vjb250ZXh0X2ZyZWUoZT4+PjAsMSkpKSxDbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193YmdfdGFuZ2VudGlhbGFyY2luZm9vdXRwdXR3YXNtX2ZyZWUoZT4+PjAsMSkpKSxNbj0idW5kZWZpbmVkIj09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5P3tyZWdpc3RlcjooKT0+e30sdW5yZWdpc3RlcjooKT0+e319Om5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+dXIuX193Ymdfd2FzbWNpcmNsZXBhcmFtc19mcmVlKGU+Pj4wLDEpKSk7ZnVuY3Rpb24gVm4oZSl7Y29uc3QgdD11ci5fX2V4dGVybnJlZl90YWJsZV9hbGxvYygpO3JldHVybiB1ci5fX3diaW5kZ2VuX2V4dGVybnJlZnMuc2V0KHQsZSksdH1mdW5jdGlvbiBQbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgaW5zdGFuY2Ugb2YgJHt0Lm5hbWV9YCl9Y29uc3QgSm49InVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT97cmVnaXN0ZXI6KCk9Pnt9LHVucmVnaXN0ZXI6KCk9Pnt9fTpuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGU9PnVyLl9fd2JpbmRnZW5fZGVzdHJveV9jbG9zdXJlKGUuYSxlLmIpKSk7ZnVuY3Rpb24gV24oZSl7Y29uc3QgdD10eXBlb2YgZTtpZigibnVtYmVyIj09dHx8ImJvb2xlYW4iPT10fHxudWxsPT1lKXJldHVybmAke2V9YDtpZigic3RyaW5nIj09dClyZXR1cm5gIiR7ZX0iYDtpZigic3ltYm9sIj09dCl7Y29uc3QgdD1lLmRlc2NyaXB0aW9uO3JldHVybiBudWxsPT10PyJTeW1ib2wiOmBTeW1ib2woJHt0fSlgfWlmKCJmdW5jdGlvbiI9PXQpe2NvbnN0IHQ9ZS5uYW1lO3JldHVybiJzdHJpbmciPT10eXBlb2YgdCYmdC5sZW5ndGg+MD9gRnVuY3Rpb24oJHt0fSlgOiJGdW5jdGlvbiJ9aWYoQXJyYXkuaXNBcnJheShlKSl7Y29uc3QgdD1lLmxlbmd0aDtsZXQgbj0iWyI7dD4wJiYobis9V24oZVswXSkpO2ZvcihsZXQgcj0xO3I8dDtyKyspbis9IiwgIitXbihlW3JdKTtyZXR1cm4gbis9Il0iLG59Y29uc3Qgbj0vXFtvYmplY3QgKFteXF1dKylcXS8uZXhlYyh0b1N0cmluZy5jYWxsKGUpKTtsZXQgcjtpZighKG4mJm4ubGVuZ3RoPjEpKXJldHVybiB0b1N0cmluZy5jYWxsKGUpO2lmKHI9blsxXSwiT2JqZWN0Ij09cil0cnl7cmV0dXJuIk9iamVjdCgiK0pTT04uc3RyaW5naWZ5KGUpKyIpIn1jYXRjaChlKXtyZXR1cm4iT2JqZWN0In1yZXR1cm4gZSBpbnN0YW5jZW9mIEVycm9yP2Ake2UubmFtZX06ICR7ZS5tZXNzYWdlfVxuJHtlLnN0YWNrfWA6cn1mdW5jdGlvbiBZbihlLHQpe2U+Pj49MDtjb25zdCBuPUtuKCkscj1bXTtmb3IobGV0IGk9ZTtpPGUrNCp0O2krPTQpci5wdXNoKHVyLl9fd2JpbmRnZW5fZXh0ZXJucmVmcy5nZXQobi5nZXRVaW50MzIoaSwhMCkpKTtyZXR1cm4gdXIuX19leHRlcm5yZWZfZHJvcF9zbGljZShlLHQpLHJ9ZnVuY3Rpb24gcW4oZSx0KXtyZXR1cm4gZT4+Pj0wLGVyKCkuc3ViYXJyYXkoZS8xLGUvMSt0KX1sZXQgSG49bnVsbDtmdW5jdGlvbiBLbigpe3JldHVybihudWxsPT09SG58fCEwPT09SG4uYnVmZmVyLmRldGFjaGVkfHx2b2lkIDA9PT1Ibi5idWZmZXIuZGV0YWNoZWQmJkhuLmJ1ZmZlciE9PXVyLm1lbW9yeS5idWZmZXIpJiYoSG49bmV3IERhdGFWaWV3KHVyLm1lbW9yeS5idWZmZXIpKSxIbn1sZXQgWm49bnVsbDtmdW5jdGlvbiBHbigpe3JldHVybiBudWxsIT09Wm4mJjAhPT1abi5ieXRlTGVuZ3RofHwoWm49bmV3IEZsb2F0NjRBcnJheSh1ci5tZW1vcnkuYnVmZmVyKSksWm59ZnVuY3Rpb24gWG4oZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSx0KXtmcis9dCxmcj49Y3ImJihhcj1uZXcgVGV4dERlY29kZXIoInV0Zi04Iix7aWdub3JlQk9NOiEwLGZhdGFsOiEwfSksYXIuZGVjb2RlKCksZnI9dCk7cmV0dXJuIGFyLmRlY29kZShlcigpLnN1YmFycmF5KGUsZSt0KSl9KGU+Pj49MCx0KX1sZXQgUW49bnVsbDtmdW5jdGlvbiBlcigpe3JldHVybiBudWxsIT09UW4mJjAhPT1Rbi5ieXRlTGVuZ3RofHwoUW49bmV3IFVpbnQ4QXJyYXkodXIubWVtb3J5LmJ1ZmZlcikpLFFufWZ1bmN0aW9uIHRyKGUsdCl7dHJ5e3JldHVybiBlLmFwcGx5KHRoaXMsdCl9Y2F0Y2goZSl7Y29uc3QgdD1WbihlKTt1ci5fX3diaW5kZ2VuX2V4bl9zdG9yZSh0KX19ZnVuY3Rpb24gbnIoZSl7cmV0dXJuIG51bGw9PWV9ZnVuY3Rpb24gcnIoZSx0LG4pe2NvbnN0IHI9e2E6ZSxiOnQsY250OjF9LGk9KC4uLmUpPT57ci5jbnQrKztjb25zdCB0PXIuYTtyLmE9MDt0cnl7cmV0dXJuIG4odCxyLmIsLi4uZSl9ZmluYWxseXtyLmE9dCxpLl93YmdfY2JfdW5yZWYoKX19O3JldHVybiBpLl93YmdfY2JfdW5yZWY9KCk9PnswPT0tLXIuY250JiYodXIuX193YmluZGdlbl9kZXN0cm95X2Nsb3N1cmUoci5hLHIuYiksci5hPTAsSm4udW5yZWdpc3RlcihyKSl9LEpuLnJlZ2lzdGVyKGkscixyKSxpfWZ1bmN0aW9uIGlyKGUsdCl7Y29uc3Qgbj10KDgqZS5sZW5ndGgsOCk+Pj4wO3JldHVybiBHbigpLnNldChlLG4vOCksX3I9ZS5sZW5ndGgsbn1mdW5jdGlvbiBvcihlLHQsbil7aWYodm9pZCAwPT09bil7Y29uc3Qgbj1sci5lbmNvZGUoZSkscj10KG4ubGVuZ3RoLDEpPj4+MDtyZXR1cm4gZXIoKS5zdWJhcnJheShyLHIrbi5sZW5ndGgpLnNldChuKSxfcj1uLmxlbmd0aCxyfWxldCByPWUubGVuZ3RoLGk9dChyLDEpPj4+MDtjb25zdCBvPWVyKCk7bGV0IHM9MDtmb3IoO3M8cjtzKyspe2NvbnN0IHQ9ZS5jaGFyQ29kZUF0KHMpO2lmKHQ+MTI3KWJyZWFrO29baStzXT10fWlmKHMhPT1yKXswIT09cyYmKGU9ZS5zbGljZShzKSksaT1uKGkscixyPXMrMyplLmxlbmd0aCwxKT4+PjA7Y29uc3QgdD1lcigpLnN1YmFycmF5KGkrcyxpK3IpO3MrPWxyLmVuY29kZUludG8oZSx0KS53cml0dGVuLGk9bihpLHIscywxKT4+PjB9cmV0dXJuIF9yPXMsaX1mdW5jdGlvbiBzcihlKXtjb25zdCB0PXVyLl9fd2JpbmRnZW5fZXh0ZXJucmVmcy5nZXQoZSk7cmV0dXJuIHVyLl9fZXh0ZXJucmVmX3RhYmxlX2RlYWxsb2MoZSksdH1sZXQgYXI9bmV3IFRleHREZWNvZGVyKCJ1dGYtOCIse2lnbm9yZUJPTTohMCxmYXRhbDohMH0pO2FyLmRlY29kZSgpO2NvbnN0IGNyPTIxNDY0MzUwNzI7bGV0IGZyPTA7Y29uc3QgbHI9bmV3IFRleHRFbmNvZGVyOyJlbmNvZGVJbnRvImluIGxyfHwobHIuZW5jb2RlSW50bz1mdW5jdGlvbihlLHQpe2NvbnN0IG49bHIuZW5jb2RlKGUpO3JldHVybiB0LnNldChuKSx7cmVhZDplLmxlbmd0aCx3cml0dGVuOm4ubGVuZ3RofX0pO2xldCB1cixfcj0wO2Z1bmN0aW9uIGdyKGUsdCl7cmV0dXJuIHVyPWUuZXhwb3J0cyxIbj1udWxsLFpuPW51bGwsUW49bnVsbCx1ci5fX3diaW5kZ2VuX3N0YXJ0KCksdXJ9YXN5bmMgZnVuY3Rpb24gaHIoZSl7aWYodm9pZCAwIT09dXIpcmV0dXJuIHVyO3ZvaWQgMCE9PWUmJihPYmplY3QuZ2V0UHJvdG90eXBlT2YoZSk9PT1PYmplY3QucHJvdG90eXBlPyh7bW9kdWxlX29yX3BhdGg6ZX09ZSk6Y29uc29sZS53YXJuKCJ1c2luZyBkZXByZWNhdGVkIHBhcmFtZXRlcnMgZm9yIHRoZSBpbml0aWFsaXphdGlvbiBmdW5jdGlvbjsgcGFzcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCIpKSx2b2lkIDA9PT1lJiYoZT1uZXcgVVJMKCJrY2xfd2FzbV9saWJfYmcud2FzbSIsZG9jdW1lbnQuY3VycmVudFNjcmlwdCYmIlNDUklQVCI9PT1kb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSYmZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmN8fG5ldyBVUkwoIndvcmtlci13ZWJydGMuanMiLGRvY3VtZW50LmJhc2VVUkkpLmhyZWYpKTtjb25zdCB0PXZuKCk7KCJzdHJpbmciPT10eXBlb2YgZXx8ImZ1bmN0aW9uIj09dHlwZW9mIFJlcXVlc3QmJmUgaW5zdGFuY2VvZiBSZXF1ZXN0fHwiZnVuY3Rpb24iPT10eXBlb2YgVVJMJiZlIGluc3RhbmNlb2YgVVJMKSYmKGU9ZmV0Y2goZSkpO2NvbnN0e2luc3RhbmNlOm4sbW9kdWxlOnJ9PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUsdCl7aWYoImZ1bmN0aW9uIj09dHlwZW9mIFJlc3BvbnNlJiZlIGluc3RhbmNlb2YgUmVzcG9uc2Upe2lmKCJmdW5jdGlvbiI9PXR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyl0cnl7cmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKGUsdCl9Y2F0Y2godCl7aWYoIWUub2t8fCFmdW5jdGlvbihlKXtzd2l0Y2goZSl7Y2FzZSJiYXNpYyI6Y2FzZSJjb3JzIjpjYXNlImRlZmF1bHQiOnJldHVybiEwfXJldHVybiExfShlLnR5cGUpfHwiYXBwbGljYXRpb24vd2FzbSI9PT1lLmhlYWRlcnMuZ2V0KCJDb250ZW50LVR5cGUiKSl0aHJvdyB0O2NvbnNvbGUud2FybigiYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nYCBmYWlsZWQgYmVjYXVzZSB5b3VyIHNlcnZlciBkb2VzIG5vdCBzZXJ2ZSBXYXNtIHdpdGggYGFwcGxpY2F0aW9uL3dhc21gIE1JTUUgdHlwZS4gRmFsbGluZyBiYWNrIHRvIGBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZWAgd2hpY2ggaXMgc2xvd2VyLiBPcmlnaW5hbCBlcnJvcjpcbiIsdCl9Y29uc3Qgbj1hd2FpdCBlLmFycmF5QnVmZmVyKCk7cmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG4sdCl9e2NvbnN0IG49YXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZSx0KTtyZXR1cm4gbiBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lkluc3RhbmNlP3tpbnN0YW5jZTpuLG1vZHVsZTplfTpufX0oYXdhaXQgZSx0KTtyZXR1cm4gZ3Iobil9dmFyIGJyPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLENvbnRleHQ6bW4sSW50b1VuZGVybHlpbmdCeXRlU291cmNlOlNuLEludG9VbmRlcmx5aW5nU2luazpCbixJbnRvVW5kZXJseWluZ1NvdXJjZTp4bixMc3BTZXJ2ZXJDb25maWc6RW4sUmVzcG9uc2VDb250ZXh0OlVuLFRhbmdlbnRpYWxBcmNJbmZvT3V0cHV0V2FzbTpPbixXYXNtQ2lyY2xlUGFyYW1zOk5uLGJhc2U2NF9kZWNvZGU6ZnVuY3Rpb24oZSl7Y29uc3QgdD1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbj1fcixyPXVyLmJhc2U2NF9kZWNvZGUodCxuKTtpZihyWzNdKXRocm93IHNyKHJbMl0pO3ZhciBpPXFuKHJbMF0sclsxXSkuc2xpY2UoKTtyZXR1cm4gdXIuX193YmluZGdlbl9mcmVlKHJbMF0sMSpyWzFdLDEpLGl9LGNhbGN1bGF0ZV9jaXJjbGVfZnJvbV8zX3BvaW50czpmdW5jdGlvbihlLHQsbixyLGksbyl7Y29uc3Qgcz11ci5jYWxjdWxhdGVfY2lyY2xlX2Zyb21fM19wb2ludHMoZSx0LG4scixpLG8pO3JldHVybiBObi5fX3dyYXAocyl9LGNoYW5nZV9kZWZhdWx0X3VuaXRzOmZ1bmN0aW9uKGUsdCl7bGV0IG4scjt0cnl7Y29uc3Qgcz1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYT1fcixjPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxmPV9yLGw9dXIuY2hhbmdlX2RlZmF1bHRfdW5pdHMocyxhLGMsZik7dmFyIGk9bFswXSxvPWxbMV07aWYobFszXSl0aHJvdyBpPTAsbz0wLHNyKGxbMl0pO3JldHVybiBuPWkscj1vLFhuKGksbyl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUobixyLDEpfX0sY2hhbmdlX2V4cGVyaW1lbnRhbF9mZWF0dXJlczpmdW5jdGlvbihlLHQpe2xldCBuLHI7dHJ5e2NvbnN0IHM9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLGE9X3IsYz1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksZj1fcixsPXVyLmNoYW5nZV9leHBlcmltZW50YWxfZmVhdHVyZXMocyxhLGMsZik7dmFyIGk9bFswXSxvPWxbMV07aWYobFszXSl0aHJvdyBpPTAsbz0wLHNyKGxbMl0pO3JldHVybiBuPWkscj1vLFhuKGksbyl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUobixyLDEpfX0sY29yZWR1bXA6ZnVuY3Rpb24oZSl7cmV0dXJuIHVyLmNvcmVkdW1wKGUpfSxkZWZhdWx0X2FwcF9zZXR0aW5nczpmdW5jdGlvbigpe2NvbnN0IGU9dXIuZGVmYXVsdF9hcHBfc2V0dGluZ3MoKTtpZihlWzJdKXRocm93IHNyKGVbMV0pO3JldHVybiBzcihlWzBdKX0sZGVmYXVsdF9wcm9qZWN0X3NldHRpbmdzOmZ1bmN0aW9uKCl7Y29uc3QgZT11ci5kZWZhdWx0X3Byb2plY3Rfc2V0dGluZ3MoKTtpZihlWzJdKXRocm93IHNyKGVbMV0pO3JldHVybiBzcihlWzBdKX0sZm9ybWF0X251bWJlcl9saXRlcmFsOmZ1bmN0aW9uKGUsdCxuKXtsZXQgcixpO3RyeXtjb25zdCBhPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxjPV9yLGY9dXIuZm9ybWF0X251bWJlcl9saXRlcmFsKGUsYSxjLG5yKG4pPzQyOTQ5NjcyOTc6bj4+PjApO3ZhciBvPWZbMF0scz1mWzFdO2lmKGZbM10pdGhyb3cgbz0wLHM9MCxzcihmWzJdKTtyZXR1cm4gcj1vLGk9cyxYbihvLHMpfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKHIsaSwxKX19LGZvcm1hdF9udW1iZXJfdmFsdWU6ZnVuY3Rpb24oZSx0KXtsZXQgbixyO3RyeXtjb25zdCBzPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yLGM9dXIuZm9ybWF0X251bWJlcl92YWx1ZShlLHMsYSk7dmFyIGk9Y1swXSxvPWNbMV07aWYoY1szXSl0aHJvdyBpPTAsbz0wLHNyKGNbMl0pO3JldHVybiBuPWkscj1vLFhuKGksbyl9ZmluYWxseXt1ci5fX3diaW5kZ2VuX2ZyZWUobixyLDEpfX0sZ2V0X2tjbF92ZXJzaW9uOmZ1bmN0aW9uKCl7bGV0IGUsdDt0cnl7Y29uc3Qgbj11ci5nZXRfa2NsX3ZlcnNpb24oKTtyZXR1cm4gZT1uWzBdLHQ9blsxXSxYbihuWzBdLG5bMV0pfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKGUsdCwxKX19LGdldF90YW5nZW50aWFsX2FyY190b19pbmZvOmZ1bmN0aW9uKGUsdCxuLHIsaSxvLHMpe2NvbnN0IGE9dXIuZ2V0X3RhbmdlbnRpYWxfYXJjX3RvX2luZm8oZSx0LG4scixpLG8scyk7cmV0dXJuIE9uLl9fd3JhcChhKX0saHVtYW5fZGlzcGxheV9udW1iZXI6ZnVuY3Rpb24oZSx0KXtsZXQgbixyO3RyeXtjb25zdCBzPW9yKHQsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yLGM9dXIuaHVtYW5fZGlzcGxheV9udW1iZXIoZSxzLGEpO3ZhciBpPWNbMF0sbz1jWzFdO2lmKGNbM10pdGhyb3cgaT0wLG89MCxzcihjWzJdKTtyZXR1cm4gbj1pLHI9byxYbihpLG8pfWZpbmFsbHl7dXIuX193YmluZGdlbl9mcmVlKG4sciwxKX19LGltcG9ydF9maWxlX2V4dGVuc2lvbnM6ZnVuY3Rpb24oKXtjb25zdCBlPXVyLmltcG9ydF9maWxlX2V4dGVuc2lvbnMoKTtpZihlWzNdKXRocm93IHNyKGVbMl0pO3ZhciB0PVluKGVbMF0sZVsxXSkuc2xpY2UoKTtyZXR1cm4gdXIuX193YmluZGdlbl9mcmVlKGVbMF0sNCplWzFdLDQpLHR9LGlzX2tjbF9lbXB0eV9vcl9vbmx5X3NldHRpbmdzOmZ1bmN0aW9uKGUpe2NvbnN0IHQ9b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLG49X3Iscj11ci5pc19rY2xfZW1wdHlfb3Jfb25seV9zZXR0aW5ncyh0LG4pO2lmKHJbMl0pdGhyb3cgc3IoclsxXSk7cmV0dXJuIHNyKHJbMF0pfSxpc19wb2ludHNfY2N3OmZ1bmN0aW9uKGUpe2NvbnN0IHQ9aXIoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyksbj1fcjtyZXR1cm4gdXIuaXNfcG9pbnRzX2Njdyh0LG4pfSxrY2xfbGludDpmdW5jdGlvbihlKXtjb25zdCB0PW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxuPV9yO3JldHVybiB1ci5rY2xfbGludCh0LG4pfSxrY2xfc2V0dGluZ3M6ZnVuY3Rpb24oZSl7Y29uc3QgdD1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbj1fcixyPXVyLmtjbF9zZXR0aW5ncyh0LG4pO2lmKHJbMl0pdGhyb3cgc3IoclsxXSk7cmV0dXJuIHNyKHJbMF0pfSxsc3BfcnVuX2NvcGlsb3Q6ZnVuY3Rpb24oZSx0LG4pe1BuKGUsRW4pO3ZhciByPWUuX19kZXN0cm95X2ludG9fcmF3KCk7Y29uc3QgaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcixzPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yO3JldHVybiB1ci5sc3BfcnVuX2NvcGlsb3QocixpLG8scyxhKX0sbHNwX3J1bl9rY2w6ZnVuY3Rpb24oZSx0LG4pe1BuKGUsRW4pO3ZhciByPWUuX19kZXN0cm95X2ludG9fcmF3KCk7Y29uc3QgaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcixzPW9yKG4sdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxhPV9yO3JldHVybiB1ci5sc3BfcnVuX2tjbChyLGksbyxzLGEpfSxub2RlX3BhdGhfZnJvbV9yYW5nZTpmdW5jdGlvbihlLHQpe2NvbnN0IG49b3IoZSx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHI9X3IsaT1vcih0LHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbz1fcjtyZXR1cm4gdXIubm9kZV9wYXRoX2Zyb21fcmFuZ2UobixyLGksbyl9LHBhcnNlX2FwcF9zZXR0aW5nczpmdW5jdGlvbihlKXtjb25zdCB0PW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxuPV9yLHI9dXIucGFyc2VfYXBwX3NldHRpbmdzKHQsbik7aWYoclsyXSl0aHJvdyBzcihyWzFdKTtyZXR1cm4gc3IoclswXSl9LHBhcnNlX3Byb2plY3Rfc2V0dGluZ3M6ZnVuY3Rpb24oZSl7Y29uc3QgdD1vcihlLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksbj1fcixyPXVyLnBhcnNlX3Byb2plY3Rfc2V0dGluZ3ModCxuKTtpZihyWzJdKXRocm93IHNyKHJbMV0pO3JldHVybiBzcihyWzBdKX0scGFyc2Vfd2FzbTpJbixwb2ludF90b191bml0OmZ1bmN0aW9uKGUsdCxuKXtjb25zdCByPW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxpPV9yLG89b3IodCx1ci5fX3diaW5kZ2VuX21hbGxvYyx1ci5fX3diaW5kZ2VuX3JlYWxsb2MpLHM9X3IsYT1vcihuLHVyLl9fd2JpbmRnZW5fbWFsbG9jLHVyLl9fd2JpbmRnZW5fcmVhbGxvYyksYz1fcixmPXVyLnBvaW50X3RvX3VuaXQocixpLG8scyxhLGMpO2lmKGZbM10pdGhyb3cgc3IoZlsyXSk7dmFyIGwsdSxfPShsPWZbMF0sdT1mWzFdLGw+Pj49MCxHbigpLnN1YmFycmF5KGwvOCxsLzgrdSkpLnNsaWNlKCk7cmV0dXJuIHVyLl9fd2JpbmRnZW5fZnJlZShmWzBdLDgqZlsxXSw4KSxffSxyZWNhc3Rfd2FzbTpmdW5jdGlvbihlKXtjb25zdCB0PW9yKGUsdXIuX193YmluZGdlbl9tYWxsb2MsdXIuX193YmluZGdlbl9yZWFsbG9jKSxuPV9yLHI9dXIucmVjYXN0X3dhc20odCxuKTtpZihyWzJdKXRocm93IHNyKHJbMV0pO3JldHVybiBzcihyWzBdKX0scmVsZXZhbnRfZmlsZV9leHRlbnNpb25zOmZ1bmN0aW9uKCl7Y29uc3QgZT11ci5yZWxldmFudF9maWxlX2V4dGVuc2lvbnMoKTtpZihlWzNdKXRocm93IHNyKGVbMl0pO3ZhciB0PVluKGVbMF0sZVsxXSkuc2xpY2UoKTtyZXR1cm4gdXIuX193YmluZGdlbl9mcmVlKGVbMF0sNCplWzFdLDQpLHR9LHNlcmlhbGl6ZV9jb25maWd1cmF0aW9uOmZ1bmN0aW9uKGUpe2NvbnN0IHQ9dXIuc2VyaWFsaXplX2NvbmZpZ3VyYXRpb24oZSk7aWYodFsyXSl0aHJvdyBzcih0WzFdKTtyZXR1cm4gc3IodFswXSl9LHNlcmlhbGl6ZV9wcm9qZWN0X2NvbmZpZ3VyYXRpb246ZnVuY3Rpb24oZSl7Y29uc3QgdD11ci5zZXJpYWxpemVfcHJvamVjdF9jb25maWd1cmF0aW9uKGUpO2lmKHRbMl0pdGhyb3cgc3IodFsxXSk7cmV0dXJuIHNyKHRbMF0pfSxza2V0Y2hfY2hlY2twb2ludF9saW1pdDpmdW5jdGlvbigpe3JldHVybiB1ci5za2V0Y2hfY2hlY2twb2ludF9saW1pdCgpPj4+MH0saW5pdFN5bmM6ZnVuY3Rpb24oZSl7aWYodm9pZCAwIT09dXIpcmV0dXJuIHVyO3ZvaWQgMCE9PWUmJihPYmplY3QuZ2V0UHJvdG90eXBlT2YoZSk9PT1PYmplY3QucHJvdG90eXBlPyh7bW9kdWxlOmV9PWUpOmNvbnNvbGUud2FybigidXNpbmcgZGVwcmVjYXRlZCBwYXJhbWV0ZXJzIGZvciBgaW5pdFN5bmMoKWA7IHBhc3MgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQiKSk7Y29uc3QgdD12bigpO3JldHVybiBlIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuTW9kdWxlfHwoZT1uZXcgV2ViQXNzZW1ibHkuTW9kdWxlKGUpKSxncihuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UoZSx0KSl9LGRlZmF1bHQ6aHJ9KTtsZXQgZHI7Y29uc3Qgd3I9e2ZpcmVNb2RlbGluZ0NvbW1hbmRGcm9tV2FzbShlLHQsbixyKXt9LHNlbmRNb2RlbGluZ0NvbW1hbmRGcm9tV2FzbTphc3luYyhlLHQsbixyKT0+KHBvc3RNZXNzYWdlKHt0bzoid2Vic29ja2V0IixwYXlsb2FkOnt0eXBlOiJzZW5kIixkYXRhOm59fSksZHI/LnNlbmQobiksbmV3IFByb21pc2UoKHQ9Pntjb25zdCBuPXI9PntpZihyLmRhdGEuaW5kZXhPZihlKTwwKXJldHVybjtjb25zdCBpPShvPUpTT04ucGFyc2Uoci5kYXRhKSxuZXcgbChzKS5lbmNvZGVTaGFyZWRSZWYobykpO3ZhciBvLHM7dChpKSxkci5yZW1vdmVFdmVudExpc3RlbmVyKCJtZXNzYWdlIixuKX07ZHIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsbil9KSkpLGFzeW5jIHN0YXJ0TmV3U2Vzc2lvbigpe319O3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGU9Pntjb25zdCB0PWUuZGF0YTtzd2l0Y2godC50byl7Y2FzZSJ3b3JrZXIiOnJldHVybiB2b2lkKCJzdGFydCI9PT10LnBheWxvYWQudHlwZSYmKGFzeW5jIGU9Pnthd2FpdCBmZXRjaChuZXcgVVJMKCIva2NsX3dhc21fbGliX2JnLndhc20iLGxvY2F0aW9uLm9yaWdpbikpLnRoZW4oKGU9PmUuYXJyYXlCdWZmZXIoKSkpLnRoZW4oKGU9PmhyKHttb2R1bGVfb3JfcGF0aDplfSkpKSxkcj1uZXcgV2ViU29ja2V0KHluLnVybENvbnN0cnVjdEZyb20oe3dlYnJ0YzohMCwuLi5lfSkpLGRyLmFkZEV2ZW50TGlzdGVuZXIoIm9wZW4iLCgoKT0+e3luLmF1dGhlbnRpY2F0ZSh7Y2xpZW50OmUuY2xpZW50fSxkcil9KSx7b25jZTohMH0pLGRyLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLChlPT57cG9zdE1lc3NhZ2Uoe2Zyb206IndlYnNvY2tldCIscGF5bG9hZDp7dHlwZToibWVzc2FnZSIsZGF0YTplLmRhdGF9fSl9KSksc2V0SW50ZXJ2YWwoKCgpPT57ZHIucmVhZHlTdGF0ZT09PVdlYlNvY2tldC5PUEVOJiZkci5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOiJwaW5nIn0pKX0pLDRlMyl9KSh0LnBheWxvYWQuZGF0YVswXSkpO2Nhc2Uid2Vic29ja2V0IjpyZXR1cm4gdm9pZCBkcj8uW3QucGF5bG9hZC50eXBlXSguLi50LnBheWxvYWQuZGF0YSk7Y2FzZSJ3YXNtIjpyZXR1cm4gdm9pZCgiZXhlY3V0ZSI9PT10LnBheWxvYWQudHlwZT8oKGUsdD17bWFpbktjbFBhdGhOYW1lOiJtYWluLmtjbCJ9KT0+e2NvbnN0IG49InN0cmluZyI9PXR5cGVvZiBlPyhpPWUse3JlYWRGaWxlOmFzeW5jIGU9PihuZXcgVGV4dEVuY29kZXIpLmVuY29kZShpKSxleGlzdHM6YXN5bmMgZT0+ITEsZ2V0QWxsRmlsZXM6YXN5bmMgZT0+W2ldfSk6KHI9ZSx7YXN5bmMgcmVhZEZpbGUoZSl7Y29uc3QgdD1yLmdldChlKT8/IiI7cmV0dXJuKG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKHQpfSxleGlzdHM6YXN5bmMgZT0+ci5oYXMoZSksZ2V0QWxsRmlsZXM6YXN5bmMgZT0+QXJyYXkuZnJvbShyLnZhbHVlcygpKX0pO3ZhciByLGk7Y29uc3Qgbz0ic3RyaW5nIj09dHlwZW9mIGU/ZTplLmdldCh0Lm1haW5LY2xQYXRoTmFtZSkscz1uZXcgbW4od3IsbiksYT1JbihvKVswXTtyZXR1cm4gcy5leGVjdXRlKEpTT04uc3RyaW5naWZ5KGEpLHQubWFpbktjbFBhdGhOYW1lLCJ7fSIpfSkodC5wYXlsb2FkLmRhdGFbMF0sdC5wYXlsb2FkLmRhdGFbMV0pLnRoZW4oKGU9Pntwb3N0TWVzc2FnZSh7ZnJvbToid2FzbSIscGF5bG9hZDp7dHlwZToiZXhlY3V0ZSIsZGF0YTplfX0pfSkpLmNhdGNoKChlPT57cG9zdE1lc3NhZ2Uoe2Zyb206Indhc20iLHBheWxvYWQ6e3R5cGU6ImV4ZWN1dGUiLGRhdGE6ZX19KX0pKTpwb3N0TWVzc2FnZShiclt0LnBheWxvYWQudHlwZV0oLi4udC5wYXlsb2FkLmRhdGEpKSl9fSkpfSgpOwoK", null, false);
var Qn = (t, e) => {
  let n2;
  return { fn: (...t2) => {
    n2 = t2;
  }, intervalId: setInterval((() => {
    if (void 0 === n2) return;
    const e2 = n2;
    n2 = void 0, window.requestAnimationFrame((() => {
      t(...e2);
    }));
  }), e) };
};
var On = (function(t) {
  return t[t.DOWN = 0] = "DOWN", t[t.UP = 1] = "UP", t;
})(On || {});
var En = (function(t) {
  return t[t.MIDDLE = 1] = "MIDDLE", t[t.RIGHT = 2] = "RIGHT", t;
})(En || {});
var _n = { [On.DOWN]: "camera_drag_start", [On.UP]: "camera_drag_end" };
var Dn = { [En.MIDDLE]: "pan", [En.RIGHT]: "rotatetrackball" };
var An = class extends EventTarget {
  removeMouseEvents = () => {
  };
  removeResizeObserver = () => {
  };
  constructor(t) {
    super(), this.zooClientArgs = t, this.workerWebRTC = new Fn(), this.rtcPeerConnection = new RTCPeerConnection({ bundlePolicy: "max-bundle" }), this.rtcPeerConnection.addTransceiver("video", { direction: "recvonly" }), this.rtcPeerConnection.createDataChannel("unreliable_modeling_cmds"), this.ice(), this.rtcPeerConnection.addEventListener("track", this.webRTCOnTrack.bind(this)), this.rtcPeerConnection.addEventListener("datachannel", this.webRTCOnDataChannel.bind(this)), this.rtcPeerConnection.addEventListener("connectionstatechange", this.webRTCOnConnectionStateChange.bind(this));
  }
  deconstructor() {
    this.removeMouseEvents(), this.removeResizeObserver(), this.deice(), this.rtcPeerConnection.removeEventListener("track", this.webRTCOnTrack.bind(this)), this.rtcPeerConnection.removeEventListener("datachannel", this.webRTCOnDataChannel.bind(this)), this.rtcPeerConnection.removeEventListener("connectionstatechange", this.webRTCOnConnectionStateChange.bind(this)), this.workerWebRTC.terminate(), this.rtcPeerConnection.close();
  }
  async start() {
    const t = (e) => {
      const n2 = e.data;
      "from" in n2 && "websocket" === n2.from && "payload" in n2 && "object" == typeof n2.payload && "data" in n2.payload && "string" == typeof n2.payload.data && n2.payload.data.indexOf("auth_token_invalid") >= 0 && (this.workerWebRTC.removeEventListener("message", t), this.zooClientArgs.client.oauth2.fetchAuthorizationCode());
    };
    this.zooClientArgs.client.oauth2.getAccessToken().then(((e) => {
      var n2;
      e?.token?.value && (this.zooClientArgs.client.token = e?.token?.value), void 0 === this.zooClientArgs.client.token && (this.zooClientArgs.client.token = "00000000-0000-0000-0000-000000000000"), this.workerWebRTC.addEventListener("message", t), this.workerWebRTC.postMessage({ to: "worker", payload: { type: "start", data: [(n2 = this.zooClientArgs, JSON.parse(JSON.stringify(n2)))] } });
    })).catch(((t2) => {
      "object" == typeof t2 && "kind" in t2 && [EErrorOAuth2.ErrorNoAuthCode, EErrorOAuth2.ErrorAccessTokenResponse].some(((e) => e === t2.kind)) && this.zooClientArgs.client.oauth2.fetchAuthorizationCode();
    }));
  }
  wasm(t, ...e) {
    return new Promise(((n2) => {
      const i2 = (t2) => {
        const e2 = t2.data;
        "from" in e2 && "wasm" === e2.from && (this.workerWebRTC.removeEventListener("message", i2), n2(e2.payload.data));
      };
      this.workerWebRTC.addEventListener("message", i2), this.workerWebRTC.postMessage({ to: "wasm", payload: { type: t, data: e ?? [] } });
    }));
  }
  executor() {
    return { addEventListener: this.workerWebRTC.addEventListener.bind(this.workerWebRTC, "message"), removeEventListener: this.workerWebRTC.removeEventListener.bind(this.workerWebRTC, "message"), submit: (t, e = { mainKclPathName: "main.kcl" }) => new Promise(((n2) => {
      const i2 = (t2) => {
        const e2 = t2.data;
        "from" in e2 && "wasm" === e2.from && "execute" === e2.payload.type && (this.workerWebRTC.removeEventListener("message", i2), n2(e2.payload.data));
      };
      this.workerWebRTC.addEventListener("message", i2), this.workerWebRTC.postMessage({ to: "wasm", payload: { type: "execute", data: [t, e] } });
    })) };
  }
  webRTCOnConnectionStateChange() {
    if ("disconnected" === this.rtcPeerConnection.connectionState) this.dispatchEvent(new Event("close"));
  }
  webRTCOnTrack(t) {
    this.track = t, this.dispatchEvent(new Event("track"));
  }
  webRTCOnDataChannel(t) {
    this.channel = t.channel, this.dispatchEvent(new Event("datachannel")), this.dispatchEvent(new Event("connected"));
  }
  async iceOnIceServerInfo(t) {
    if (0 == t.data.ice_servers.length) return;
    this.rtcPeerConnection.setConfiguration({ bundlePolicy: "max-bundle", iceServers: t.data.ice_servers, iceTransportPolicy: "relay" });
    const e = await this.rtcPeerConnection.createOffer();
    await this.rtcPeerConnection.setLocalDescription(e), this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: [JSON.stringify({ type: "sdp_offer", offer: e })] } });
  }
  async iceOnSdpAnswer(t) {
    await this.rtcPeerConnection.setRemoteDescription(t.data.answer);
  }
  async iceOnTrickleIce(t) {
    await this.rtcPeerConnection.addIceCandidate(t.data.candidate);
  }
  iceOnIceCandidate(t) {
    null !== t.candidate && this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: [JSON.stringify({ type: "trickle_ice", candidate: { candidate: t.candidate.candidate, sdpMid: t.candidate.sdpMid || void 0, sdpMLineIndex: t.candidate.sdpMLineIndex || void 0, usernameFragment: t.candidate.usernameFragment || void 0 } })] } });
  }
  iceOnMessage(t) {
    const e = In.parseMessage(t);
    if ("resp" in e) switch (e.resp.type) {
      case "ice_server_info":
        this.iceOnIceServerInfo(e.resp);
        break;
      case "sdp_answer":
        this.iceOnSdpAnswer(e.resp);
        break;
      case "trickle_ice":
        this.iceOnTrickleIce(e.resp);
    }
  }
  workerWebRTCOnMessage(t) {
    const e = t.data;
    "from" in e && "websocket" === e.from && "message" === e.payload.type && this.iceOnMessage(e.payload);
  }
  ice() {
    this.workerWebRTC.addEventListener("message", this.workerWebRTCOnMessage.bind(this)), this.rtcPeerConnection.addEventListener("icecandidate", this.iceOnIceCandidate.bind(this));
  }
  deice() {
    this.workerWebRTC.removeEventListener("message", this.workerWebRTCOnMessage.bind(this)), this.rtcPeerConnection.removeEventListener("icecandidate", this.iceOnIceCandidate);
  }
  addMouseEvents(t) {
    let e, n2 = On.UP;
    const i2 = (t2) => (i3) => {
      const l3 = Dn[i3.button];
      if (void 0 === l3) return;
      const o2 = { type: "send", data: [JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: _n[t2], interaction: l3, window: { x: i3.offsetX, y: i3.offsetY } } })] };
      this.workerWebRTC.postMessage({ to: "websocket", payload: o2 }), this.channel?.send(o2.data[0]), e = i3.button, n2 = t2;
    }, l2 = i2(On.DOWN), o = i2(On.UP), c = (t2) => {
      const i3 = Dn[e];
      if (void 0 === i3) return;
      n2 = On.UP;
      const l3 = { type: "send", data: [JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: _n[n2], interaction: i3, window: { x: t2.offsetX, y: t2.offsetY } } })] };
      this.workerWebRTC.postMessage({ to: "websocket", payload: l3 }), this.channel?.send(l3.data[0]);
    };
    let a = 0;
    const s = Qn(((t2) => {
      n2 === On.DOWN && this.channel?.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "camera_drag_move", interaction: Dn[e], window: { x: t2.offsetX, y: t2.offsetY } } })), a += 1, this.channel?.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "mouse_move", sequence: a, window: { x: t2.offsetX, y: t2.offsetY } } }));
    }), 1e3 / 30), d = Qn(((t2) => {
      t2.preventDefault(), this.channel?.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "default_camera_zoom", magnitude: -1 * Math.sign(t2.deltaY) * window.devicePixelRatio * 50 } }));
    }), 1e3 / 30), b = (e2) => {
      this.channel = e2.channel, t.addEventListener("pointerdown", l2), t.addEventListener("pointermove", s.fn), t.addEventListener("pointerup", o), t.addEventListener("pointerleave", c), t.addEventListener("wheel", d.fn, { passive: false });
    };
    this.rtcPeerConnection.addEventListener("datachannel", b), this.removeMouseEvents = () => {
      this.rtcPeerConnection.removeEventListener("datachannel", b), t.removeEventListener("pointerdown", l2), t.removeEventListener("pointermove", s.fn), clearInterval(s.intervalId), t.removeEventListener("pointerup", o), t.removeEventListener("pointerleave", c), t.removeEventListener("wheel", d.fn), clearInterval(d.intervalId);
    };
  }
  resize(t) {
    window.requestAnimationFrame((() => {
      this.send(JSON.stringify({ type: "modeling_cmd_req", cmd_id: "00000000-0000-0000-0000-000000000000", cmd: { type: "reconfigure_stream", ...t, fps: 30 } }));
    }));
  }
  addResizeObserver(t) {
    const e = t.querySelector("video"), n2 = Qn(((t2) => {
      for (const n3 of t2) {
        const t3 = n3.contentRect.width - n3.contentRect.width % 4, i3 = n3.contentRect.height - n3.contentRect.height % 4;
        e.width = t3, e.height = i3, this.resize({ width: t3, height: i3 });
      }
    }), 62.5), i2 = new ResizeObserver(n2.fn);
    i2.observe(t), this.removeResizeObserver = () => {
      clearInterval(n2.intervalId), i2.disconnect();
    };
  }
  send(...t) {
    return new Promise(((e) => {
      const n2 = (t2) => {
        const i2 = t2.data;
        "from" in i2 && "websocket" === i2.from && (this.workerWebRTC.removeEventListener("message", n2), e(i2.payload.data));
      };
      this.workerWebRTC.addEventListener("message", n2), this.workerWebRTC.postMessage({ to: "websocket", payload: { type: "send", data: t } });
    }));
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
var sharedTextEncoder = new TextEncoder();
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
  let offset = inputOffset;
  const end = offset + byteLength;
  const units = [];
  let result = "";
  while (offset < end) {
    const byte1 = bytes[offset++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      const byte4 = bytes[offset++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= CHUNK_SIZE) {
      result += String.fromCharCode(...units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += String.fromCharCode(...units);
  }
  return result;
}
var sharedTextDecoder = new TextDecoder();
var TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
  const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
  return sharedTextDecoder.decode(stringBytes);
}
function utf8Decode(bytes, inputOffset, byteLength) {
  if (byteLength > TEXT_DECODER_THRESHOLD) {
    return utf8DecodeTD(bytes, inputOffset, byteLength);
  } else {
    return utf8DecodeJs(bytes, inputOffset, byteLength);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var ExtData = class {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/DecodeError.mjs
var DecodeError = class _DecodeError extends Error {
  constructor(message) {
    super(message);
    const proto = Object.create(_DecodeError.prototype);
    Object.setPrototypeOf(this, proto);
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: _DecodeError.name
    });
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/int.mjs
var UINT32_MAX = 4294967295;
function setInt64(view, offset, value) {
  const high = Math.floor(value / 4294967296);
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
  const high = view.getInt32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}
function getUint64(view, offset) {
  const high = view.getUint32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}

// node_modules/@msgpack/msgpack/dist.esm/timestamp.mjs
var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({ sec, nsec }) {
  if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
    if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
      const rv = new Uint8Array(4);
      const view = new DataView(rv.buffer);
      view.setUint32(0, sec);
      return rv;
    } else {
      const secHigh = sec / 4294967296;
      const secLow = sec & 4294967295;
      const rv = new Uint8Array(8);
      const view = new DataView(rv.buffer);
      view.setUint32(0, nsec << 2 | secHigh & 3);
      view.setUint32(4, secLow);
      return rv;
    }
  } else {
    const rv = new Uint8Array(12);
    const view = new DataView(rv.buffer);
    view.setUint32(0, nsec);
    setInt64(view, 4, sec);
    return rv;
  }
}
function encodeDateToTimeSpec(date) {
  const msec = date.getTime();
  const sec = Math.floor(msec / 1e3);
  const nsec = (msec - sec * 1e3) * 1e6;
  const nsecInSec = Math.floor(nsec / 1e9);
  return {
    sec: sec + nsecInSec,
    nsec: nsec - nsecInSec * 1e9
  };
}
function encodeTimestampExtension(object) {
  if (object instanceof Date) {
    const timeSpec = encodeDateToTimeSpec(object);
    return encodeTimeSpecToTimestamp(timeSpec);
  } else {
    return null;
  }
}
function decodeTimestampToTimeSpec(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (data.byteLength) {
    case 4: {
      const sec = view.getUint32(0);
      const nsec = 0;
      return { sec, nsec };
    }
    case 8: {
      const nsec30AndSecHigh2 = view.getUint32(0);
      const secLow32 = view.getUint32(4);
      const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
      const nsec = nsec30AndSecHigh2 >>> 2;
      return { sec, nsec };
    }
    case 12: {
      const sec = getInt64(view, 4);
      const nsec = view.getUint32(0);
      return { sec, nsec };
    }
    default:
      throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
  }
}
function decodeTimestampExtension(data) {
  const timeSpec = decodeTimestampToTimeSpec(data);
  return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
  type: EXT_TIMESTAMP,
  encode: encodeTimestampExtension,
  decode: decodeTimestampExtension
};

// node_modules/@msgpack/msgpack/dist.esm/ExtensionCodec.mjs
var ExtensionCodec = class _ExtensionCodec {
  static defaultCodec = new _ExtensionCodec();
  // ensures ExtensionCodecType<X> matches ExtensionCodec<X>
  // this will make type errors a lot more clear
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __brand;
  // built-in extensions
  builtInEncoders = [];
  builtInDecoders = [];
  // custom extensions
  encoders = [];
  decoders = [];
  constructor() {
    this.register(timestampExtension);
  }
  register({ type, encode, decode: decode2 }) {
    if (type >= 0) {
      this.encoders[type] = encode;
      this.decoders[type] = decode2;
    } else {
      const index = -1 - type;
      this.builtInEncoders[index] = encode;
      this.builtInDecoders[index] = decode2;
    }
  }
  tryToEncode(object, context) {
    for (let i2 = 0; i2 < this.builtInEncoders.length; i2++) {
      const encodeExt = this.builtInEncoders[i2];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = -1 - i2;
          return new ExtData(type, data);
        }
      }
    }
    for (let i2 = 0; i2 < this.encoders.length; i2++) {
      const encodeExt = this.encoders[i2];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = i2;
          return new ExtData(type, data);
        }
      }
    }
    if (object instanceof ExtData) {
      return object;
    }
    return null;
  }
  decode(data, type, context) {
    const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
    if (decodeExt) {
      return decodeExt(data, type, context);
    } else {
      return new ExtData(type, data);
    }
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function isArrayBufferLike(buffer) {
  return buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
}
function ensureUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isArrayBufferLike(buffer)) {
    return new Uint8Array(buffer);
  } else {
    return Uint8Array.from(buffer);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function prettyByte(byte) {
  return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}

// node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;
var CachedKeyDecoder = class {
  hit = 0;
  miss = 0;
  caches;
  maxKeyLength;
  maxLengthPerKey;
  constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
    this.maxKeyLength = maxKeyLength;
    this.maxLengthPerKey = maxLengthPerKey;
    this.caches = [];
    for (let i2 = 0; i2 < this.maxKeyLength; i2++) {
      this.caches.push([]);
    }
  }
  canBeCached(byteLength) {
    return byteLength > 0 && byteLength <= this.maxKeyLength;
  }
  find(bytes, inputOffset, byteLength) {
    const records = this.caches[byteLength - 1];
    FIND_CHUNK: for (const record of records) {
      const recordBytes = record.bytes;
      for (let j2 = 0; j2 < byteLength; j2++) {
        if (recordBytes[j2] !== bytes[inputOffset + j2]) {
          continue FIND_CHUNK;
        }
      }
      return record.str;
    }
    return null;
  }
  store(bytes, value) {
    const records = this.caches[bytes.length - 1];
    const record = { bytes, str: value };
    if (records.length >= this.maxLengthPerKey) {
      records[Math.random() * records.length | 0] = record;
    } else {
      records.push(record);
    }
  }
  decode(bytes, inputOffset, byteLength) {
    const cachedValue = this.find(bytes, inputOffset, byteLength);
    if (cachedValue != null) {
      this.hit++;
      return cachedValue;
    }
    this.miss++;
    const str = utf8DecodeJs(bytes, inputOffset, byteLength);
    const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
    this.store(slicedCopyOfBytes, str);
    return str;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/Decoder.mjs
var STATE_ARRAY = "array";
var STATE_MAP_KEY = "map_key";
var STATE_MAP_VALUE = "map_value";
var mapKeyConverter = (key) => {
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  throw new DecodeError("The type of key must be string or number but " + typeof key);
};
var StackPool = class {
  stack = [];
  stackHeadPosition = -1;
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_ARRAY;
    state.position = 0;
    state.size = size;
    state.array = new Array(size);
  }
  pushMapState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_MAP_KEY;
    state.readCount = 0;
    state.size = size;
    state.map = {};
  }
  getUninitializedStateFromPool() {
    this.stackHeadPosition++;
    if (this.stackHeadPosition === this.stack.length) {
      const partialState = {
        type: void 0,
        size: 0,
        array: void 0,
        position: 0,
        readCount: 0,
        map: void 0,
        key: null
      };
      this.stack.push(partialState);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(state) {
    const topStackState = this.stack[this.stackHeadPosition];
    if (topStackState !== state) {
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    }
    if (state.type === STATE_ARRAY) {
      const partialState = state;
      partialState.size = 0;
      partialState.array = void 0;
      partialState.position = 0;
      partialState.type = void 0;
    }
    if (state.type === STATE_MAP_KEY || state.type === STATE_MAP_VALUE) {
      const partialState = state;
      partialState.size = 0;
      partialState.map = void 0;
      partialState.readCount = 0;
      partialState.type = void 0;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0;
    this.stackHeadPosition = -1;
  }
};
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
  EMPTY_VIEW.getInt8(0);
} catch (e) {
  if (!(e instanceof RangeError)) {
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
}
var MORE_DATA = new RangeError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder();
var Decoder = class _Decoder {
  extensionCodec;
  context;
  useBigInt64;
  rawStrings;
  maxStrLength;
  maxBinLength;
  maxArrayLength;
  maxMapLength;
  maxExtLength;
  keyDecoder;
  mapKeyConverter;
  totalPos = 0;
  pos = 0;
  view = EMPTY_VIEW;
  bytes = EMPTY_BYTES;
  headByte = HEAD_BYTE_REQUIRED;
  stack = new StackPool();
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.rawStrings = options?.rawStrings ?? false;
    this.maxStrLength = options?.maxStrLength ?? UINT32_MAX;
    this.maxBinLength = options?.maxBinLength ?? UINT32_MAX;
    this.maxArrayLength = options?.maxArrayLength ?? UINT32_MAX;
    this.maxMapLength = options?.maxMapLength ?? UINT32_MAX;
    this.maxExtLength = options?.maxExtLength ?? UINT32_MAX;
    this.keyDecoder = options?.keyDecoder !== void 0 ? options.keyDecoder : sharedCachedKeyDecoder;
    this.mapKeyConverter = options?.mapKeyConverter ?? mapKeyConverter;
  }
  clone() {
    return new _Decoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack.reset();
  }
  setBuffer(buffer) {
    const bytes = ensureUint8Array(buffer);
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.pos = 0;
  }
  appendBuffer(buffer) {
    if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
      this.setBuffer(buffer);
    } else {
      const remainingData = this.bytes.subarray(this.pos);
      const newData = ensureUint8Array(buffer);
      const newBuffer = new Uint8Array(remainingData.length + newData.length);
      newBuffer.set(remainingData);
      newBuffer.set(newData, remainingData.length);
      this.setBuffer(newBuffer);
    }
  }
  hasRemaining(size) {
    return this.view.byteLength - this.pos >= size;
  }
  createExtraByteError(posToShow) {
    const { view, pos } = this;
    return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
  }
  /**
   * @throws {@link DecodeError}
   * @throws {@link RangeError}
   */
  decode(buffer) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decode(buffer);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      const object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    } finally {
      this.entered = false;
    }
  }
  *decodeMulti(buffer) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMulti(buffer);
      return;
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      while (this.hasRemaining(1)) {
        yield this.doDecodeSync();
      }
    } finally {
      this.entered = false;
    }
  }
  async decodeAsync(stream) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decodeAsync(stream);
    }
    try {
      this.entered = true;
      let decoded = false;
      let object;
      for await (const buffer of stream) {
        if (decoded) {
          this.entered = false;
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        try {
          object = this.doDecodeSync();
          decoded = true;
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
      if (decoded) {
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.totalPos);
        }
        return object;
      }
      const { headByte, pos, totalPos } = this;
      throw new RangeError(`Insufficient data in parsing ${prettyByte(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    } finally {
      this.entered = false;
    }
  }
  decodeArrayStream(stream) {
    return this.decodeMultiAsync(stream, true);
  }
  decodeStream(stream) {
    return this.decodeMultiAsync(stream, false);
  }
  async *decodeMultiAsync(stream, isArray) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMultiAsync(stream, isArray);
      return;
    }
    try {
      this.entered = true;
      let isArrayHeaderRequired = isArray;
      let arrayItemsLeft = -1;
      for await (const buffer of stream) {
        if (isArray && arrayItemsLeft === 0) {
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        if (isArrayHeaderRequired) {
          arrayItemsLeft = this.readArraySize();
          isArrayHeaderRequired = false;
          this.complete();
        }
        try {
          while (true) {
            yield this.doDecodeSync();
            if (--arrayItemsLeft === 0) {
              break;
            }
          }
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = false;
    }
  }
  doDecodeSync() {
    DECODE: while (true) {
      const headByte = this.readHeadByte();
      let object;
      if (headByte >= 224) {
        object = headByte - 256;
      } else if (headByte < 192) {
        if (headByte < 128) {
          object = headByte;
        } else if (headByte < 144) {
          const size = headByte - 128;
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte < 160) {
          const size = headByte - 144;
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else {
          const byteLength = headByte - 160;
          object = this.decodeString(byteLength, 0);
        }
      } else if (headByte === 192) {
        object = null;
      } else if (headByte === 194) {
        object = false;
      } else if (headByte === 195) {
        object = true;
      } else if (headByte === 202) {
        object = this.readF32();
      } else if (headByte === 203) {
        object = this.readF64();
      } else if (headByte === 204) {
        object = this.readU8();
      } else if (headByte === 205) {
        object = this.readU16();
      } else if (headByte === 206) {
        object = this.readU32();
      } else if (headByte === 207) {
        if (this.useBigInt64) {
          object = this.readU64AsBigInt();
        } else {
          object = this.readU64();
        }
      } else if (headByte === 208) {
        object = this.readI8();
      } else if (headByte === 209) {
        object = this.readI16();
      } else if (headByte === 210) {
        object = this.readI32();
      } else if (headByte === 211) {
        if (this.useBigInt64) {
          object = this.readI64AsBigInt();
        } else {
          object = this.readI64();
        }
      } else if (headByte === 217) {
        const byteLength = this.lookU8();
        object = this.decodeString(byteLength, 1);
      } else if (headByte === 218) {
        const byteLength = this.lookU16();
        object = this.decodeString(byteLength, 2);
      } else if (headByte === 219) {
        const byteLength = this.lookU32();
        object = this.decodeString(byteLength, 4);
      } else if (headByte === 220) {
        const size = this.readU16();
        if (size !== 0) {
          this.pushArrayState(size);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 221) {
        const size = this.readU32();
        if (size !== 0) {
          this.pushArrayState(size);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 222) {
        const size = this.readU16();
        if (size !== 0) {
          this.pushMapState(size);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 223) {
        const size = this.readU32();
        if (size !== 0) {
          this.pushMapState(size);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 196) {
        const size = this.lookU8();
        object = this.decodeBinary(size, 1);
      } else if (headByte === 197) {
        const size = this.lookU16();
        object = this.decodeBinary(size, 2);
      } else if (headByte === 198) {
        const size = this.lookU32();
        object = this.decodeBinary(size, 4);
      } else if (headByte === 212) {
        object = this.decodeExtension(1, 0);
      } else if (headByte === 213) {
        object = this.decodeExtension(2, 0);
      } else if (headByte === 214) {
        object = this.decodeExtension(4, 0);
      } else if (headByte === 215) {
        object = this.decodeExtension(8, 0);
      } else if (headByte === 216) {
        object = this.decodeExtension(16, 0);
      } else if (headByte === 199) {
        const size = this.lookU8();
        object = this.decodeExtension(size, 1);
      } else if (headByte === 200) {
        const size = this.lookU16();
        object = this.decodeExtension(size, 2);
      } else if (headByte === 201) {
        const size = this.lookU32();
        object = this.decodeExtension(size, 4);
      } else {
        throw new DecodeError(`Unrecognized type byte: ${prettyByte(headByte)}`);
      }
      this.complete();
      const stack = this.stack;
      while (stack.length > 0) {
        const state = stack.top();
        if (state.type === STATE_ARRAY) {
          state.array[state.position] = object;
          state.position++;
          if (state.position === state.size) {
            object = state.array;
            stack.release(state);
          } else {
            continue DECODE;
          }
        } else if (state.type === STATE_MAP_KEY) {
          if (object === "__proto__") {
            throw new DecodeError("The key __proto__ is not allowed");
          }
          state.key = this.mapKeyConverter(object);
          state.type = STATE_MAP_VALUE;
          continue DECODE;
        } else {
          state.map[state.key] = object;
          state.readCount++;
          if (state.readCount === state.size) {
            object = state.map;
            stack.release(state);
          } else {
            state.key = null;
            state.type = STATE_MAP_KEY;
            continue DECODE;
          }
        }
      }
      return object;
    }
  }
  readHeadByte() {
    if (this.headByte === HEAD_BYTE_REQUIRED) {
      this.headByte = this.readU8();
    }
    return this.headByte;
  }
  complete() {
    this.headByte = HEAD_BYTE_REQUIRED;
  }
  readArraySize() {
    const headByte = this.readHeadByte();
    switch (headByte) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (headByte < 160) {
          return headByte - 144;
        } else {
          throw new DecodeError(`Unrecognized array type byte: ${prettyByte(headByte)}`);
        }
      }
    }
  }
  pushMapState(size) {
    if (size > this.maxMapLength) {
      throw new DecodeError(`Max length exceeded: map length (${size}) > maxMapLengthLength (${this.maxMapLength})`);
    }
    this.stack.pushMapState(size);
  }
  pushArrayState(size) {
    if (size > this.maxArrayLength) {
      throw new DecodeError(`Max length exceeded: array length (${size}) > maxArrayLength (${this.maxArrayLength})`);
    }
    this.stack.pushArrayState(size);
  }
  decodeString(byteLength, headerOffset) {
    if (!this.rawStrings || this.stateIsMapKey()) {
      return this.decodeUtf8String(byteLength, headerOffset);
    }
    return this.decodeBinary(byteLength, headerOffset);
  }
  /**
   * @throws {@link RangeError}
   */
  decodeUtf8String(byteLength, headerOffset) {
    if (byteLength > this.maxStrLength) {
      throw new DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
    }
    if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
      throw MORE_DATA;
    }
    const offset = this.pos + headerOffset;
    let object;
    if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(byteLength)) {
      object = this.keyDecoder.decode(this.bytes, offset, byteLength);
    } else {
      object = utf8Decode(this.bytes, offset, byteLength);
    }
    this.pos += headerOffset + byteLength;
    return object;
  }
  stateIsMapKey() {
    if (this.stack.length > 0) {
      const state = this.stack.top();
      return state.type === STATE_MAP_KEY;
    }
    return false;
  }
  /**
   * @throws {@link RangeError}
   */
  decodeBinary(byteLength, headOffset) {
    if (byteLength > this.maxBinLength) {
      throw new DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
    }
    if (!this.hasRemaining(byteLength + headOffset)) {
      throw MORE_DATA;
    }
    const offset = this.pos + headOffset;
    const object = this.bytes.subarray(offset, offset + byteLength);
    this.pos += headOffset + byteLength;
    return object;
  }
  decodeExtension(size, headOffset) {
    if (size > this.maxExtLength) {
      throw new DecodeError(`Max length exceeded: ext length (${size}) > maxExtLength (${this.maxExtLength})`);
    }
    const extType = this.view.getInt8(this.pos + headOffset);
    const data = this.decodeBinary(
      size,
      headOffset + 1
      /* extType */
    );
    return this.extensionCodec.decode(data, extType, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const value = this.view.getUint8(this.pos);
    this.pos++;
    return value;
  }
  readI8() {
    const value = this.view.getInt8(this.pos);
    this.pos++;
    return value;
  }
  readU16() {
    const value = this.view.getUint16(this.pos);
    this.pos += 2;
    return value;
  }
  readI16() {
    const value = this.view.getInt16(this.pos);
    this.pos += 2;
    return value;
  }
  readU32() {
    const value = this.view.getUint32(this.pos);
    this.pos += 4;
    return value;
  }
  readI32() {
    const value = this.view.getInt32(this.pos);
    this.pos += 4;
    return value;
  }
  readU64() {
    const value = getUint64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readI64() {
    const value = getInt64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readU64AsBigInt() {
    const value = this.view.getBigUint64(this.pos);
    this.pos += 8;
    return value;
  }
  readI64AsBigInt() {
    const value = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return value;
  }
  readF32() {
    const value = this.view.getFloat32(this.pos);
    this.pos += 4;
    return value;
  }
  readF64() {
    const value = this.view.getFloat64(this.pos);
    this.pos += 8;
    return value;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function decode(buffer, options) {
  const decoder = new Decoder(options);
  return decoder.decode(buffer);
}

// node_modules/@kittycad/web-view/svg-zoo.js
var svg_zoo_default = '<svg viewBox="0 -2 245 84" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill="currentcolor" d="M49.1899 14.2024V1.75536H0.0079789V19.3089H44.4824L0.0159578 67.5334H0.0079789V67.5414L0 67.5493L0.0079789 67.5573V79.3501H11.4018L22.8755 66.903V79.3501H72.0574V61.7965H27.591L72.0574 13.5641V1.75536L60.6556 1.77131L49.1899 14.2024Z"></path><path fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd" d="M116.723 17.5536C103.981 17.5536 93.6164 27.9182 93.6164 40.6605C93.6164 45.751 95.276 50.4665 98.0846 54.2884L86.0205 67.2781C79.8129 60.1369 76.0628 50.8256 76.0628 40.6605C76.0628 18.2398 94.3026 0 116.723 0C125.819 0 134.221 3.00007 141.003 8.06666L128.939 21.0563C125.396 18.8382 121.207 17.5536 116.723 17.5536ZM139.83 40.6605C139.83 35.5699 138.171 30.8544 135.37 27.0245L147.426 14.0349C153.634 21.176 157.384 30.4874 157.384 40.6605C157.384 63.0732 139.144 81.3129 116.723 81.3129C107.627 81.3129 99.2256 78.3129 92.4435 73.2542L104.516 60.2566C108.058 62.4748 112.239 63.7594 116.723 63.7594C129.466 63.7594 139.83 53.3948 139.83 40.6605Z"></path><path fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd" d="M204.34 17.5536C191.597 17.5536 181.233 27.9182 181.233 40.6605C181.233 45.751 182.892 50.4665 185.701 54.2884L173.637 67.2781C167.429 60.1369 163.679 50.8256 163.679 40.6605C163.679 18.2398 181.919 0 204.34 0C213.435 0 221.837 3.00007 228.619 8.06666L216.555 21.0563C213.013 18.8382 208.824 17.5536 204.34 17.5536ZM222.986 27.0245L235.042 14.0349C241.25 21.176 245 30.4874 245 40.6605C245 63.0732 226.76 81.3129 204.34 81.3129C195.244 81.3129 186.842 78.3129 180.06 73.2542L192.132 60.2566C195.674 62.4748 199.855 63.7594 204.34 63.7594C217.082 63.7594 227.446 53.3948 227.446 40.6605C227.446 35.5699 225.787 30.8544 222.986 27.0245Z"></path></g></svg>';

// node_modules/@kittycad/web-view/index.js
window.zoo ??= {};
window.zoo.kittycadWebViews ??= [];
var preventDefault = (e) => e.preventDefault();
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
    const startZooWebRTC = () => {
      const zooWebRTC = new An({
        client: args.zooClient,
        video_res_width: sizeAdjusted.width,
        video_res_height: sizeAdjusted.height,
        order_independent_transparency: true,
        show_grid: true,
        post_effect: "ssao",
        fps: 30
      });
      zooWebRTC.addResizeObserver(this.el);
      window.zoo?.kittycadWebViews?.filter((v2) => [ZooWebViewState.Running, ZooWebViewState.Starting].indexOf(v2.state) >= 0).forEach((v2) => v2.deconstructor());
      this.state = ZooWebViewState.Starting;
      const onClose = () => {
        this.deconstructor();
      };
      zooWebRTC.addEventListener("close", onClose, { once: true });
      const onTrack = (event) => {
        if (!(event.target instanceof An))
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
    elStart.style.paddingTop = "0.5em";
    elStart.style.paddingRight = "0.5em";
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
var import_jszip = __toESM(require_jszip_min(), 1);

// node_modules/pako/dist/pako.esm.mjs
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
);
var extra_dbits = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
);
var extra_blbits = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s, w2) => {
  s.pending_buf[s.pending++] = w2 & 255;
  s.pending_buf[s.pending++] = w2 >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(
    s,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h2;
  let n2, m;
  let bits;
  let xbits;
  let f2;
  let overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h2 = s.heap_max + 1; h2 < HEAP_SIZE$1; h2++) {
    n2 = s.heap[h2];
    bits = tree[tree[n2 * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n2 * 2 + 1] = bits;
    if (n2 > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n2 >= base) {
      xbits = extra[n2 - base];
    }
    f2 = tree[n2 * 2];
    s.opt_len += f2 * (bits + xbits);
    if (has_stree) {
      s.static_len += f2 * (stree[n2 * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n2 = s.bl_count[bits];
    while (n2 !== 0) {
      m = s.heap[--h2];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n2--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n2;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n2 = 0; n2 <= max_code; n2++) {
    let len = tree[n2 * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n2 * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n2;
  let bits;
  let length;
  let code;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n2 = 0; n2 < 1 << extra_lbits[code]; n2++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n2 = 0; n2 < 1 << extra_dbits[code]; n2++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n2 = 0; n2 < 1 << extra_dbits[code] - 7; n2++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n2 = 0;
  while (n2 <= 143) {
    static_ltree[n2 * 2 + 1] = 8;
    n2++;
    bl_count[8]++;
  }
  while (n2 <= 255) {
    static_ltree[n2 * 2 + 1] = 9;
    n2++;
    bl_count[9]++;
  }
  while (n2 <= 279) {
    static_ltree[n2 * 2 + 1] = 7;
    n2++;
    bl_count[7]++;
  }
  while (n2 <= 287) {
    static_ltree[n2 * 2 + 1] = 8;
    n2++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n2 = 0; n2 < D_CODES$1; n2++) {
    static_dtree[n2 * 2 + 1] = 5;
    static_dtree[n2 * 2] = bi_reverse(n2, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n2;
  for (n2 = 0; n2 < L_CODES$1; n2++) {
    s.dyn_ltree[n2 * 2] = 0;
  }
  for (n2 = 0; n2 < D_CODES$1; n2++) {
    s.dyn_dtree[n2 * 2] = 0;
  }
  for (n2 = 0; n2 < BL_CODES$1; n2++) {
    s.bl_tree[n2 * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n2, m, depth) => {
  const _n2 = n2 * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n2] <= depth[m];
};
var pqdownheap = (s, tree, k2) => {
  const v2 = s.heap[k2];
  let j2 = k2 << 1;
  while (j2 <= s.heap_len) {
    if (j2 < s.heap_len && smaller(tree, s.heap[j2 + 1], s.heap[j2], s.depth)) {
      j2++;
    }
    if (smaller(tree, v2, s.heap[j2], s.depth)) {
      break;
    }
    s.heap[k2] = s.heap[j2];
    k2 = j2;
    j2 <<= 1;
  }
  s.heap[k2] = v2;
};
var compress_block = (s, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 255;
      dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n2, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n2 = 0; n2 < elems; n2++) {
    if (tree[n2 * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n2;
      s.depth[n2] = 0;
    } else {
      tree[n2 * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n2 = s.heap_len >> 1; n2 >= 1; n2--) {
    pqdownheap(s, tree, n2);
  }
  node = elems;
  do {
    n2 = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n2;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n2 * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n2] >= s.depth[m] ? s.depth[n2] : s.depth[m]) + 1;
    tree[n2 * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n2;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n2 = 0; n2 <= max_code; n2++) {
    curlen = nextlen;
    nextlen = tree[(n2 + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n2;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n2 = 0; n2 <= max_code; n2++) {
    curlen = nextlen;
    nextlen = tree[(n2 + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n2;
  for (n2 = 0; n2 <= 31; n2++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n2 * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n2 = 32; n2 < LITERALS$1; n2++) {
    if (s.dyn_ltree[n2 * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n2 = 0;
  while (len !== 0) {
    n2 = len > 2e3 ? 2e3 : len;
    len -= n2;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n2);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n2 = 0; n2 < 256; n2++) {
    c = n2;
    for (var k2 = 0; k2 < 8; k2++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n2] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i2 = pos; i2 < end; i2++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i2]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var constants$2 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f2) => {
  return f2 * 2 - (f2 > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n2, m;
  let p2;
  let wsize = s.w_size;
  n2 = s.hash_size;
  p2 = n2;
  do {
    m = s.head[--p2];
    s.head[p2] = m >= wsize ? m - wsize : 0;
  } while (--n2);
  n2 = wsize;
  p2 = n2;
  do {
    m = s.prev[--p2];
    s.prev[p2] = m >= wsize ? m - wsize : 0;
  } while (--n2);
};
var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n2, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n2 = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n2;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
      while (s.insert) {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
  s.status !== GZIP_STATE && //#endif
  s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = //#ifdef GZIP
  s.wrap === 2 ? GZIP_STATE : (
    //#endif
    s.wrap ? INIT_STATE : BUSY_STATE
  );
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(
        s,
        (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
      );
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n2 = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n2);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p2 in source) {
      if (_has(source, p2)) {
        obj[p2] = source[p2];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i2 = 0, l2 = chunks.length; i2 < l2; i2++) {
    len += chunks[i2].length;
  }
  const result = new Uint8Array(len);
  for (let i2 = 0, pos = 0, l2 = chunks.length; i2 < l2; i2++) {
    let chunk = chunks[i2];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q2 = 0; q2 < 256; q2++) {
  _utf8len[q2] = q2 >= 252 ? 6 : q2 >= 248 ? 5 : q2 >= 240 ? 4 : q2 >= 224 ? 3 : q2 >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i2, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i2 = 0, m_pos = 0; i2 < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i2++] = c;
    } else if (c < 2048) {
      buf[i2++] = 192 | c >>> 6;
      buf[i2++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i2++] = 224 | c >>> 12;
      buf[i2++] = 128 | c >>> 6 & 63;
      buf[i2++] = 128 | c & 63;
    } else {
      buf[i2++] = 240 | c >>> 18;
      buf[i2++] = 128 | c >>> 12 & 63;
      buf[i2++] = 128 | c >>> 6 & 63;
      buf[i2++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i2 = 0; i2 < len; i2++) {
    result += String.fromCharCode(buf[i2]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i2, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i2 = 0; i2 < len; ) {
    let c = buf[i2++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i2 += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i2 < len) {
      c = c << 6 | buf[i2++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root2 = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root2 = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root2 > max) {
    root2 = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root2 < min) {
    root2 = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root2;
  drop = 0;
  low = -1;
  used = 1 << root2;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root2 && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root2;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root2 << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root2;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q2) => {
  return (q2 >>> 24 & 255) + (q2 >>> 8 & 65280) + ((q2 & 65280) << 8) + ((q2 & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n2;
  const order = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(
                  input.subarray(
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    next + copy
                  ),
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        /* falls through */
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n2 = here_bits + 2;
                while (bits < n2) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n2 = here_bits + 3;
                while (bits < n2) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n2 = here_bits + 7;
                while (bits < n2) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n2 = state.extra;
            while (bits < n2) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n2 = state.extra;
            while (bits < n2) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
              state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended) return false;
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0) continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err) throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var Deflate_1 = Deflate;
var deflate_1 = deflate;
var deflateRaw_1 = deflateRaw;
var gzip_1 = gzip;
var Inflate_1 = Inflate;
var inflate_1 = inflate;
var inflateRaw_1 = inflateRaw;
var ungzip_1 = ungzip;
var constants_1 = constants$2;
var pako = {
  Deflate: Deflate_1,
  deflate: deflate_1,
  deflateRaw: deflateRaw_1,
  gzip: gzip_1,
  Inflate: Inflate_1,
  inflate: inflate_1,
  inflateRaw: inflateRaw_1,
  ungzip: ungzip_1,
  constants: constants_1
};

// src/main.ts
var import_js_untar = __toESM(require_untar(), 1);
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
var zooOAuthClientId = "1f68e219-54a0-4577-bbeb-baa55f4cfbe2";
var zooApiBaseUrl = "https://api.zoo.dev";
var zooOAuthRedirectUrl = "https://viewer.zoo.dev";
var zooOAuthScopes = ["modeling"];
var aiSkillContext = `You are helping edit KCL for Zoo Viewer.

API key:
- Ask the human user for a Zoo API key from their Zoo account developer tab: https://zoo.dev/account
- Use the Zoo API key field so you can connect this viewer to the Zoo service.
- Why an API key, and not login? Because LLM systems typically throw away browser sessions, losing auth tokens. Your LLM can retrieve previously used API keys from other conversations.

After "I understand" is clicked, use the mini project editor:
- The KCL text input edits the currently selected project file.
- The path field below it is the Map key/path for that file, for example main.kcl or parts/gear.kcl.
- Use + to add a new project file and the trash button to delete the selected file.
- Use the dropdown below the path row to switch between project files.
- Imports should reference these paths just like a normal KCL project.
- Execute submits all files as a Map<string, string> project and only runs when Execute is clicked.

Useful references:
- https://docs.zoo.dev for KCL and modeling concepts.
- https://api.zoo.dev for the Zoo OpenAPI spec.
- https://github.com/kittycad/modeling-app, especially the rust directory, for executor behavior.
- https://github.com/kittycad/kcl-cheatsheet for KCL examples and syntax reminders.

Tips:
- Put the entry file in main.kcl unless you intentionally choose another path.
- Split imported code into additional project files instead of pasting everything into one file.
- Press Execute to connect/reconnect the web view, even before writing KCL.
- For bezierCurve, approximate it with lines.
- For tangentArcs, approximate it with arcs.
- For any failed 3D boolean operations, jiggle the position.
- Do not use hole::hole, it's broken right now.
- Tangent arcs carry a direction flag. The long handle arcs weren't wrong because their centers were big; they were wrong because sketch-v2 arc(...) only sweeps counterclockwise, so clockwise original arcs need reversed endpoints and updated coincidences.

API modeling commands are available at https://api.zoo.dev/ as an OpenAPI specification.

If you are searching for a visual defect, such as a massive large circle in the scene, you can use the web view RTC:

const rtc = window.zoo.kittycadWebViews[0].rtc

const send = async (cmd) =>
  JSON.parse(
    await rtc.send(
      JSON.stringify({
        type: 'modeling_cmd_req',
        cmd_id: crypto.randomUUID(),
        cmd,
      })
    )
  )

await send({ type: 'set_selection_filter', filter: ['solid3d'] })

const picked = await send({
  type: 'select_with_point',
  selected_at_window: { x: 664, y: 334 }, // framebuffer coords
  selection_type: 'replace',
})

You can then map those UUIDs to KCL source code using the artifact graph returned from executor. The current artifact graph is available from window.zooExecutorResult.`;
function createApp(root2, partialDeps = {}) {
  const appCommitHash = "4ea7b83" ? "4ea7b83" : "dev";
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
    oauthClientId: zooOAuthClientId,
    createClient: (options) => new n(options),
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
    downloadFile: (name, data) => {
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    },
    ...partialDeps
  };
  const initialRemoteUrlFile = (() => {
    try {
      return new URL(deps.location.href).searchParams.get("fetch") ?? "";
    } catch {
      return "";
    }
  })();
  root2.innerHTML = `
    <div class="app-shell">
      <div class="viewer-wrap">
        <div class="viewer-stage">
          <div class="viewer-ui viewer-ui-left">
            <span class="viewer-version" data-version-badge></span>
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
          <div class="viewer-status-stack">
            <button type="button" data-disconnect aria-label="Disconnect"></button>
            <span data-status aria-label="Connection status"></span>
          </div>
          <div class="meta">
              <button type="button" data-edges aria-label="Toggle edges"></button>
              <div class="xray-group">
                <button type="button" data-xray aria-label="Toggle xray"></button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value="0.22"
                  data-xray-opacity
                  aria-label="Xray opacity"
                >
              </div>
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
            <div class="viewer-connection-row">
              <div class="viewer-source-stack">
                <span data-source>none</span>
                <label class="directory-file-field" data-directory-file-field hidden>
                  <select data-directory-file-select aria-label="Active project file"></select>
                </label>
              </div>
            </div>
            <div class="viewer-connection-file-row" data-directory-file-row hidden>
              <div class="selection-cluster">
                <div class="selection-mode-toggle" role="group" aria-label="Selection mode">
                  <button type="button" data-selection-mode-body aria-label="Select bodies">Body</button>
                  <button type="button" data-selection-mode-feature aria-label="Select faces and edges">Face/Edge</button>
                </div>
                <div class="selection-popover-anchor">
                  <button
                    type="button"
                    class="selection-range"
                    data-selection-range
                    aria-label="Show selected source range"
                    hidden
                  ></button>
                  <div class="selection-overlay-backdrop" data-selection-overlay hidden>
                    <div
                      class="selection-overlay"
                      role="dialog"
                      aria-modal="false"
                      aria-labelledby="selection-overlay-title"
                    >
                      <div class="selection-overlay-header">
                        <span class="selection-overlay-title" id="selection-overlay-title" data-selection-overlay-title></span>
                        <button type="button" class="selection-overlay-close" data-selection-overlay-close aria-label="Close source preview">X</button>
                      </div>
                      <pre class="selection-overlay-code" data-selection-overlay-code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="parameters-shell" data-parameters-shell hidden>
              <div class="parameters-actions">
                <button type="button" class="export-toggle" data-export-toggle aria-label="Show export options">Export</button>
                <button type="button" class="parameters-toggle" data-parameters-toggle aria-label="Show parameters and objects">Parameters and objects</button>
              </div>
              <div class="export-popover" data-export-popover hidden>
                <div class="export-popover-title">Export type</div>
                <div class="export-options" data-export-options></div>
                <div class="export-status" data-export-status></div>
              </div>
              <section class="parameters-panel" data-parameters-panel aria-label="KCL parameters and objects">
                <div class="parameters-header">
                  <span>Parameters and objects</span>
                </div>
                <div class="parameters-list" data-parameters-list></div>
              </section>
            </div>
            <div class="snapshot-dock">
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
              <div class="snapshot-card" data-snapshot-card="isometric">
                  <span class="snapshot-label">Iso</span>
                  <div class="snapshot-frame">
                    <img data-snapshot-image="isometric" alt="Isometric snapshot">
                    <div class="snapshot-empty" data-snapshot-empty="isometric"></div>
                  </div>
                </div>
              </div>
              <div class="snapshot-controls">
                <button type="button" class="no-ui-toggle" data-no-ui-toggle aria-label="Toggle photo view"></button>
                <button type="button" class="snapshot-toggle" data-snapshot-toggle aria-label="Hide snapshots"></button>
              </div>
            </div>
          </div>
          <div class="viewer" data-viewer></div>
        </div>
      </div>
    </div>
  `;
  const tokenInput = root2.querySelector("[data-token-input]");
  const directoryFileRow = root2.querySelector("[data-directory-file-row]");
  const directoryFileField = root2.querySelector("[data-directory-file-field]");
  const directoryFileSelect = root2.querySelector("[data-directory-file-select]");
  const kclError = root2.querySelector("[data-kcl-error]");
  const kclErrorLabel = root2.querySelector("[data-kcl-error-label]");
  const kclErrorText = root2.querySelector("[data-kcl-error-text]");
  const viewerUiLeft = root2.querySelector(".viewer-ui-left");
  const viewerConnection = root2.querySelector(".viewer-connection");
  const viewerStage = root2.querySelector(".viewer-stage");
  const versionBadge = root2.querySelector("[data-version-badge]");
  const sourceValue = root2.querySelector("[data-source]");
  const statusValue = root2.querySelector("[data-status]");
  const edgesButton = root2.querySelector("[data-edges]");
  const xrayButton = root2.querySelector("[data-xray]");
  const xrayOpacityInput = root2.querySelector("[data-xray-opacity]");
  const selectionRangeValue = root2.querySelector("[data-selection-range]");
  const selectionModeBodyButton = root2.querySelector("[data-selection-mode-body]");
  const selectionModeFeatureButton = root2.querySelector("[data-selection-mode-feature]");
  const selectionOverlay = root2.querySelector("[data-selection-overlay]");
  const selectionOverlayTitle = root2.querySelector("[data-selection-overlay-title]");
  const selectionOverlayCode = root2.querySelector("[data-selection-overlay-code]");
  const selectionOverlayClose = root2.querySelector("[data-selection-overlay-close]");
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
  const parametersShell = root2.querySelector("[data-parameters-shell]");
  const parametersPanel = root2.querySelector("[data-parameters-panel]");
  const exportToggleButton = root2.querySelector("[data-export-toggle]");
  const exportPopover = root2.querySelector("[data-export-popover]");
  const exportOptions = root2.querySelector("[data-export-options]");
  const exportStatus = root2.querySelector("[data-export-status]");
  const parametersToggleButton = root2.querySelector("[data-parameters-toggle]");
  const parametersList = root2.querySelector("[data-parameters-list]");
  const viewer = root2.querySelector("[data-viewer]");
  const snapshotRail = root2.querySelector("[data-snapshot-rail]");
  const noUiToggleButton = root2.querySelector("[data-no-ui-toggle]");
  const snapshotToggleButton = root2.querySelector("[data-snapshot-toggle]");
  const snapshotCards = {
    top: root2.querySelector('[data-snapshot-card="top"]'),
    profile: root2.querySelector('[data-snapshot-card="profile"]'),
    front: root2.querySelector('[data-snapshot-card="front"]'),
    isometric: root2.querySelector('[data-snapshot-card="isometric"]')
  };
  const snapshotImages = {
    top: root2.querySelector('[data-snapshot-image="top"]'),
    profile: root2.querySelector('[data-snapshot-image="profile"]'),
    front: root2.querySelector('[data-snapshot-image="front"]'),
    isometric: root2.querySelector('[data-snapshot-image="isometric"]')
  };
  const snapshotEmptyStates = {
    top: root2.querySelector('[data-snapshot-empty="top"]'),
    profile: root2.querySelector('[data-snapshot-empty="profile"]'),
    front: root2.querySelector('[data-snapshot-empty="front"]'),
    isometric: root2.querySelector('[data-snapshot-empty="isometric"]')
  };
  const buttonCheckMarkup = (checked) => `<input class="button-toggle-check" type="checkbox" tabindex="-1" aria-hidden="true" ${checked ? "checked" : ""}>`;
  const labeledIconMarkup = (svg, label, checked) => `${svg}<span>${label}</span>${checked === void 0 ? "" : buttonCheckMarkup(checked)}`;
  diffOriginalButton.innerHTML = labeledIconMarkup(
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7.5a7 7 0 0 1 11 2.1M17 4.5v5h-5M17 16.5a7 7 0 0 1-11-2.1M7 19.5v-5h5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
    "Original"
  );
  diffDirectoryButton.innerHTML = labeledIconMarkup(
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
    "Project"
  );
  diffFileButton.innerHTML = labeledIconMarkup(
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
    "File"
  );
  diffClipboardButton.innerHTML = labeledIconMarkup(
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
    "Clipboard"
  );
  const measured = deps.measure(viewer);
  const size = {
    width: Math.max(320, Math.floor(measured.width || viewer.clientWidth || 960)),
    height: Math.max(240, Math.floor(measured.height || viewer.clientHeight || 540))
  };
  const tokenStorageKey = "zoo-api-token";
  const usesZooCookieAuth = false;
  const usesLocalApiKeyAuth = deps.location.hostname === "localhost" || deps.location.hostname === "127.0.0.1" || deps.location.hostname === "0.0.0.0" || deps.location.hostname === "::1" || deps.location.hostname.endsWith(".localhost");
  const hasOAuthBrowserStorage = typeof globalThis.localStorage?.getItem === "function" && typeof globalThis.localStorage?.setItem === "function" && typeof globalThis.localStorage?.removeItem === "function";
  const usesOAuthAuth = !usesZooCookieAuth && !usesLocalApiKeyAuth && hasOAuthBrowserStorage && Boolean(deps.oauthClientId.trim());
  const isMicrosoftEdge = /Edg\/\d+/.test(deps.navigator.userAgent);
  const isGoogleChrome = deps.navigator.vendor === "Google Inc." && /Chrome\/\d+/.test(deps.navigator.userAgent) && !/Edg\/|OPR\/|Brave\//.test(deps.navigator.userAgent);
  const isSupportedBrowser = isGoogleChrome || isMicrosoftEdge;
  const isJsdomNavigator = /jsdom/i.test(deps.navigator.userAgent);
  const usesRegularPickerFallback = !isSupportedBrowser && !isJsdomNavigator;
  const state = {
    token: usesZooCookieAuth || usesOAuthAuth ? "" : deps.storage.getItem(tokenStorageKey)?.trim() ?? "",
    source: null,
    originalSourceInput: null,
    parameterOverrideInput: null,
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
    directoryFilePaths: [],
    activeDirectoryFilePath: "",
    lastExecutionInput: null,
    edgeLinesVisible: true,
    edgeLinesVisibleBeforeDiff: true,
    xrayVisible: false,
    xrayMenuVisible: false,
    xrayOpacity: 0.22,
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
      front: "",
      isometric: ""
    },
    snapshotRefreshing: false,
    snapshotRailVisible: true,
    noUiMode: false,
    parametersVisible: false,
    exportPopoverVisible: false,
    exportInFlight: false,
    exportStatusMessage: "",
    pendingExportRequestId: "",
    openVariableStructures: /* @__PURE__ */ new Set(),
    variableStructureScrollTop: {},
    selectionMode: "body",
    selectionOverlayOpen: false,
    aiInputVisible: false,
    aiInputContextAcknowledged: false,
    aiInputText: "",
    aiInputFiles: /* @__PURE__ */ new Map([["main.kcl", ""]]),
    activeAiInputPath: "main.kcl",
    aiInputPathDraft: "main.kcl",
    pendingSelectionRequestId: "",
    bodyArtifactIds: [],
    pendingBodyArtifactIds: [],
    materialByObjectId: {},
    pendingMaterialByObjectId: {},
    transformByObjectId: {},
    pendingTransformByObjectId: {},
    explodeOffsetByObjectId: {},
    solidObjectIds: [],
    pendingSolidObjectIdsRequestId: "",
    ignoredOutgoingCommandIds: /* @__PURE__ */ new Set(),
    remoteLoadStatus: "idle",
    remoteLoadError: "",
    remoteLoadUrl: ""
  };
  let requestNumber = 0;
  let selectionMappingsCache = null;
  let selectionDisplayCache = null;
  const selectionOwnerObjectIdByEntityId = /* @__PURE__ */ new Map();
  const nextRequestId = () => globalThis.crypto?.randomUUID?.() ?? `00000000-0000-4000-8000-${`${++requestNumber}`.padStart(12, "0")}`;
  const zooGlobalRecord = () => {
    const zooRecord = window.zoo;
    return zooRecord && typeof zooRecord === "object" ? zooRecord : null;
  };
  const currentExecutorResult = () => {
    const zooRecord = zooGlobalRecord();
    if (zooRecord?.executorResult !== void 0) {
      return zooRecord.executorResult;
    }
    return window.zooExecutorResult;
  };
  const setCurrentExecutorResult = (result) => {
    let zooRecord = zooGlobalRecord();
    if (!zooRecord) {
      zooRecord = {};
      window.zoo = zooRecord;
    }
    zooRecord.executorResult = result;
    window.zooExecutorResult = result;
  };
  const cloneExecutionInput = (input) => typeof input === "string" ? input : new Map(input);
  const errorMessageFromUnknown = (error) => {
    if (error instanceof Error && error.message.trim()) {
      return error.message.trim();
    }
    if (typeof error === "string" && error.trim()) {
      return error.trim();
    }
    return "Unknown error";
  };
  const remoteLoadErrorMessage = (error, url) => {
    const message = errorMessageFromUnknown(error);
    if (message !== "Failed to fetch") {
      return message;
    }
    const origin = (() => {
      try {
        return new URL(deps.location.href).origin;
      } catch {
        return deps.location.href;
      }
    })();
    return `Failed to fetch ${url}. The browser may have blocked the request because the remote server does not allow cross-origin requests from ${origin}.`;
  };
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
  const gridSpacingMultiplier = 7.5;
  const diffBaseMarkerColor = { r: 0, g: 0, b: 1 };
  const diffCompareMarkerColor = { r: 0, g: 1, b: 0 };
  const selectionFiltersByMode = {
    body: ["solid3d"],
    feature: ["face", "edge"]
  };
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
    },
    {
      key: "isometric",
      label: "Iso",
      vantage: { x: 96, y: -96, z: 96 },
      up: { x: 0, y: 0, z: 1 }
    }
  ];
  const exportFormats = [
    { key: "step", label: "STEP" },
    { key: "stl", label: "STL" },
    { key: "obj", label: "OBJ" },
    { key: "ply", label: "PLY" },
    { key: "glb", label: "GLB" },
    { key: "gltf", label: "glTF" },
    { key: "fbx", label: "FBX" }
  ];
  const defaultExportCoords = {
    forward: { axis: "y", direction: "negative" },
    up: { axis: "z", direction: "positive" }
  };
  const outputFormatForExport = (format) => {
    if (format === "glb") {
      return { type: "gltf", storage: "binary", presentation: "pretty" };
    }
    if (format === "gltf") {
      return { type: "gltf", storage: "embedded", presentation: "pretty" };
    }
    if (format === "fbx") {
      return { type: "fbx", storage: "binary" };
    }
    if (format === "obj") {
      return { type: "obj", coords: defaultExportCoords, units: "mm" };
    }
    if (format === "ply") {
      return {
        type: "ply",
        coords: defaultExportCoords,
        units: "mm",
        storage: "ascii",
        selection: { type: "default_scene" }
      };
    }
    if (format === "stl") {
      return {
        type: "stl",
        coords: defaultExportCoords,
        units: "mm",
        storage: "ascii",
        selection: { type: "default_scene" }
      };
    }
    return { type: "step" };
  };
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
  const selectionFilterRequest = (cmd_id) => JSON.stringify({
    type: "modeling_cmd_req",
    cmd_id,
    cmd: {
      type: "set_selection_filter",
      filter: selectionFiltersByMode[state.selectionMode]
    }
  });
  const modelingResponseFromRtcSend = (value) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }
    return value && typeof value === "object" ? value : null;
  };
  const selectedFeaturesFromUnknown = (value, seen = /* @__PURE__ */ new Set()) => {
    if (!value || typeof value !== "object") {
      return [];
    }
    if (Array.isArray(value)) {
      return value.flatMap((entry) => selectedFeaturesFromUnknown(entry, seen));
    }
    const record = value;
    const typeCandidate = typeof record.feature_type === "string" ? record.feature_type : typeof record.entity_type === "string" ? record.entity_type : typeof record.object_type === "string" ? record.object_type : typeof record.kind === "string" ? record.kind : typeof record.type === "string" ? record.type : "";
    const uuidCandidate = typeof record.uuid === "string" ? record.uuid : typeof record.entity_id === "string" ? record.entity_id : typeof record.object_id === "string" ? record.object_id : typeof record.id === "string" ? record.id : "";
    const objectIdCandidate = typeof record.object_id === "string" ? record.object_id : typeof record.entity_id === "string" ? record.entity_id : "";
    const next = uuidCandidate && typeCandidate && !seen.has(`${typeCandidate}\0${uuidCandidate}`) ? (() => {
      seen.add(`${typeCandidate}\0${uuidCandidate}`);
      return [
        {
          type: typeCandidate,
          uuid: uuidCandidate,
          objectId: objectIdCandidate && objectIdCandidate !== uuidCandidate ? objectIdCandidate : void 0
        }
      ];
    })() : [];
    return [
      ...next,
      ...Object.values(record).flatMap((entry) => selectedFeaturesFromUnknown(entry, seen))
    ];
  };
  const selectedFeatureIdsFromUnknown = (value, allowBareString = false, seenObjects = /* @__PURE__ */ new Set(), seenIds = /* @__PURE__ */ new Set()) => {
    if (typeof value === "string") {
      if (!allowBareString || seenIds.has(value)) {
        return [];
      }
      seenIds.add(value);
      return [value];
    }
    if (!value || typeof value !== "object" || seenObjects.has(value)) {
      return [];
    }
    seenObjects.add(value);
    if (Array.isArray(value)) {
      return value.flatMap(
        (entry) => selectedFeatureIdsFromUnknown(entry, true, seenObjects, seenIds)
      );
    }
    const record = value;
    const direct = ["uuid", "entity_id", "object_id", "id"].flatMap((key) => {
      const entry = record[key];
      if (typeof entry !== "string" || seenIds.has(entry)) {
        return [];
      }
      seenIds.add(entry);
      return [entry];
    });
    return [
      ...direct,
      ...Object.entries(record).flatMap(([key, entry]) => {
        if (key === "type" || key === "kind" || key === "feature_type" || key === "entity_type" || key === "object_type") {
          return [];
        }
        const nextAllowBareString = key === "selection" || key === "selected" || key === "entities" || key === "ids" || key === "uuids" || key.endsWith("_ids") || key.endsWith("_uuids");
        return selectedFeatureIdsFromUnknown(
          entry,
          nextAllowBareString,
          seenObjects,
          seenIds
        );
      })
    ];
  };
  const selectedFeaturesForSelectionMode = (value, selectionMode) => {
    const directFeatures = selectedFeaturesFromUnknown(value);
    if (directFeatures.length) {
      return directFeatures;
    }
    if (selectionMode === "feature") {
      return selectedFeatureIdsFromUnknown(value).map((uuid) => ({
        type: "feature",
        uuid
      }));
    }
    return selectedFeatureIdsFromUnknown(value).map((uuid) => ({
      type: "solid3d",
      uuid
    }));
  };
  const selectionFeaturesScore = (features) => features.reduce((score, feature) => {
    const typeScore = feature.type === "feature" ? 0 : feature.type === "solid3d" ? 1 : 2;
    const objectIdScore = feature.objectId ? 1 : 0;
    return score + typeScore + objectIdScore;
  }, 0);
  const preferredSelectionFeatures = (primary, fallback) => {
    if (!primary.length) {
      return fallback;
    }
    if (!fallback.length) {
      return primary;
    }
    const primaryScore = selectionFeaturesScore(primary);
    const fallbackScore = selectionFeaturesScore(fallback);
    if (primaryScore !== fallbackScore) {
      return primaryScore > fallbackScore ? primary : fallback;
    }
    return primary.length >= fallback.length ? primary : fallback;
  };
  const resolveSelectionFeaturesForSourceMapping = async (features) => {
    if (!features.length || !state.executor) {
      return features;
    }
    return Promise.all(
      features.map(async (feature) => {
        if (feature.objectId || feature.type === "solid3d") {
          return feature;
        }
        const cachedObjectId = selectionOwnerObjectIdByEntityId.get(feature.uuid);
        if (cachedObjectId) {
          return {
            ...feature,
            objectId: cachedObjectId
          };
        }
        try {
          const response = await requestModelingResponse({
            type: "entity_get_parent_id",
            entity_id: feature.uuid
          });
          if (!response.success || response.resp?.type !== "modeling" || response.resp.data?.modeling_response?.type !== "entity_get_parent_id") {
            return feature;
          }
          const objectId = response.resp.data.modeling_response.data?.entity_id;
          if (!objectId) {
            return feature;
          }
          selectionOwnerObjectIdByEntityId.set(feature.uuid, objectId);
          return {
            ...feature,
            objectId
          };
        } catch {
          return feature;
        }
      })
    );
  };
  const clearSnapshotUrls = () => {
    state.snapshotUrls = {
      top: "",
      profile: "",
      front: "",
      isometric: ""
    };
  };
  const clearSelectedFeatureState = () => {
    state.pendingSelectionRequestId = "";
    state.selectionOverlayOpen = false;
    selectionOwnerObjectIdByEntityId.clear();
    window.zooSelectedFeatures = [];
    window.zooLastSelectionResponse = void 0;
    window.zooLastSelectionResolvedFeatures = [];
  };
  const clearExecutionFeedback = () => {
    state.executorValues = null;
    setCurrentExecutorResult(void 0);
  };
  const resetSceneObjectTracking = (options = {}) => {
    state.bodyArtifactIds = [];
    state.pendingBodyArtifactIds = [];
    state.materialByObjectId = {};
    state.pendingMaterialByObjectId = {};
    state.transformByObjectId = {};
    state.pendingTransformByObjectId = {};
    state.explodeOffsetByObjectId = {};
    state.solidObjectIds = [];
    if (options.preserveDiffOwnership) {
      state.seenObjectIdsInSendOrder = [];
    } else {
      clearDiffOwnershipTracking();
    }
    state.pendingSolidObjectIdsRequestId = "";
    state.ignoredOutgoingCommandIds.clear();
  };
  const applyResolvedSelection = (features, responseData = window.zooLastSelectionResponse) => {
    window.zooLastSelectionResponse = responseData;
    window.zooSelectedFeatures = features;
    window.zooLastSelectionResolvedFeatures = features;
    focusCameraOnSelection(features);
    render();
  };
  const resolveAndApplySelection = async (features, responseData = window.zooLastSelectionResponse) => {
    applyResolvedSelection(
      await resolveSelectionFeaturesForSourceMapping(features),
      responseData
    );
  };
  const utf8Slice = (sourceText, start, end) => {
    const encoded = new TextEncoder().encode(sourceText);
    const safeStart = Math.max(0, Math.min(encoded.length, Math.floor(start)));
    const safeEnd = Math.max(safeStart, Math.min(encoded.length, Math.floor(end)));
    return new TextDecoder().decode(encoded.slice(safeStart, safeEnd));
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
  const normalizeKclErrorMessages = (messages2) => [...new Set(messages2.map((message) => message.trim()).filter(Boolean))];
  const normalizeKclErrorDisplays = (entries) => {
    const seen = /* @__PURE__ */ new Set();
    return entries.flatMap((entry) => {
      const message = entry.message.trim();
      const location2 = entry.location.trim();
      if (!message) {
        return [];
      }
      const key = `${location2}\0${message}`;
      if (seen.has(key)) {
        return [];
      }
      seen.add(key);
      return [{ message, location: location2 }];
    });
  };
  const basenameFromPath = (path) => {
    const segments = path.split(/[\\/]/).filter(Boolean);
    return segments[segments.length - 1] ?? path;
  };
  const normalizeExecutionPath = (path) => path.trim().replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
  const decodeRemoteFilename = (url) => {
    try {
      const pathname = new URL(url, deps.location.href).pathname;
      return decodeURIComponent(basenameFromPath(pathname)) || "remote.kcl";
    } catch {
      return basenameFromPath(url) || "remote.kcl";
    }
  };
  const arrayBufferView = (buffer) => new Uint8Array(buffer);
  const startsWithBytes = (buffer, bytes) => {
    const view = arrayBufferView(buffer);
    return bytes.every((byte, index) => view[index] === byte);
  };
  const bufferStringAt = (buffer, offset, length) => new TextDecoder().decode(arrayBufferView(buffer).slice(offset, offset + length)).replace(/\0+$/, "");
  const isZipBuffer = (buffer, contentType, name) => /\.zip$/i.test(name) || /(?:^|[/+])zip(?:$|;)/i.test(contentType) || startsWithBytes(buffer, [80, 75, 3, 4]) || startsWithBytes(buffer, [80, 75, 5, 6]) || startsWithBytes(buffer, [80, 75, 7, 8]);
  const isTarBuffer = (buffer, contentType, name) => /\.(?:tar|tgz|tar\.gz)$/i.test(name) || /(?:^|[/+])(?:x-)?(?:gtar|tar|gzip)(?:$|;)/i.test(contentType) || bufferStringAt(buffer, 257, 5) === "ustar" || startsWithBytes(buffer, [31, 139]);
  const sliceArrayBuffer = (view) => view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
  const decodeBufferText = (buffer) => new TextDecoder().decode(buffer);
  const remoteProjectFile = (path, text, modified) => {
    const normalizedPath = normalizeExecutionPath(path);
    if (!normalizedPath || normalizedPath.endsWith("/")) {
      return null;
    }
    return { path: normalizedPath, text, modified };
  };
  const remoteFilesFromZip = async (buffer, modified) => {
    const zip = await import_jszip.default.loadAsync(buffer);
    const entries = await Promise.all(
      Object.values(zip.files).filter((entry) => !entry.dir).map(
        async (entry) => remoteProjectFile(entry.name, await entry.async("string"), modified)
      )
    );
    return entries.filter((entry) => Boolean(entry));
  };
  const fallbackTarFiles = (buffer, modified) => {
    const files = [];
    const view = arrayBufferView(buffer);
    for (let offset = 0; offset + 512 <= view.length; ) {
      if (view.slice(offset, offset + 512).every((byte) => byte === 0)) {
        break;
      }
      const name = bufferStringAt(buffer, offset, 100);
      const sizeText = bufferStringAt(buffer, offset + 124, 12).trim();
      const type = bufferStringAt(buffer, offset + 156, 1);
      const prefix = bufferStringAt(buffer, offset + 345, 155);
      const size2 = Number.parseInt(sizeText || "0", 8) || 0;
      const dataStart = offset + 512;
      const path = prefix ? `${prefix}/${name}` : name;
      if (type !== "5") {
        const data = sliceArrayBuffer(view.slice(dataStart, dataStart + size2));
        const file = remoteProjectFile(path, decodeBufferText(data), modified);
        if (file) {
          files.push(file);
        }
      }
      offset = dataStart + Math.ceil(size2 / 512) * 512;
    }
    return files;
  };
  const tarFilesFromBuffer = async (buffer, modified) => {
    if (typeof Worker === "undefined" || /jsdom/i.test(deps.navigator.userAgent)) {
      return fallbackTarFiles(buffer, modified);
    }
    try {
      const entries = await (0, import_js_untar.default)(buffer.slice(0));
      return entries.filter((entry) => entry.type !== "5").map((entry) => remoteProjectFile(entry.name, decodeBufferText(entry.buffer), modified)).filter((entry) => Boolean(entry));
    } catch {
      return fallbackTarFiles(buffer, modified);
    }
  };
  const remoteFilesFromTar = async (buffer, name, modified) => {
    const tarBuffer = startsWithBytes(buffer, [31, 139]) || /\.(?:tgz|tar\.gz)$/i.test(name) ? sliceArrayBuffer(pako.ungzip(new Uint8Array(buffer))) : buffer;
    return tarFilesFromBuffer(tarBuffer, modified);
  };
  const remoteFilesFromResponse = async (url, response) => {
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") ?? "";
    const modified = Date.now();
    const name = decodeRemoteFilename(url);
    if (isZipBuffer(buffer, contentType, name)) {
      return {
        label: name,
        files: await remoteFilesFromZip(buffer, modified)
      };
    }
    if (isTarBuffer(buffer, contentType, name)) {
      return {
        label: name,
        files: await remoteFilesFromTar(buffer, name, modified)
      };
    }
    return {
      label: name,
      files: [remoteProjectFile(name, decodeBufferText(buffer), modified)].filter(
        (entry) => Boolean(entry)
      )
    };
  };
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
  const defaultDirectoryFilePath = (paths) => {
    const normalizedPaths = paths.map((path) => normalizeExecutionPath(path)).filter(Boolean).sort();
    if (normalizedPaths.includes("main.kcl")) {
      return "main.kcl";
    }
    return normalizedPaths[0] ?? "";
  };
  const aiInputFilePaths = () => [...state.aiInputFiles.keys()].map((path) => normalizeExecutionPath(path)).filter(Boolean).sort();
  const nextAiInputPath = () => {
    for (let index = 1; index < 1e3; index += 1) {
      const path = `file-${index}.kcl`;
      if (!state.aiInputFiles.has(path)) {
        return path;
      }
    }
    return `file-${state.aiInputFiles.size + 1}.kcl`;
  };
  const aiInputProjectInput = () => {
    const activePath = normalizeExecutionPath(state.activeAiInputPath) || "main.kcl";
    const input = new Map(state.aiInputFiles);
    input.set(activePath, state.aiInputText);
    if (!input.size) {
      input.set("main.kcl", "");
    }
    return input;
  };
  const commitAiInputPathDraft = () => {
    const currentPath = normalizeExecutionPath(state.activeAiInputPath) || "main.kcl";
    const nextPath = normalizeExecutionPath(state.aiInputPathDraft) || currentPath;
    state.aiInputFiles.set(currentPath, state.aiInputText);
    if (nextPath !== currentPath) {
      state.aiInputFiles.delete(currentPath);
      state.aiInputFiles.set(nextPath, state.aiInputText);
      state.activeAiInputPath = nextPath;
    }
    state.aiInputPathDraft = state.activeAiInputPath;
  };
  const selectAiInputPath = (path) => {
    const nextPath = normalizeExecutionPath(path);
    if (!nextPath) {
      render();
      return;
    }
    commitAiInputPathDraft();
    state.aiInputFiles.set(state.activeAiInputPath, state.aiInputText);
    state.activeAiInputPath = nextPath;
    state.aiInputPathDraft = nextPath;
    state.aiInputText = state.aiInputFiles.get(nextPath) ?? "";
    render();
  };
  const isDirectorySourceSelection = (source) => source?.kind === "directory" || source?.kind === "browser-directory" || source?.kind === "remote-file" || source?.kind === "ai-input";
  const activeDirectoryFilePathForInput = (input, preferredPath) => {
    if (typeof input === "string") {
      return "main.kcl";
    }
    const normalizedEntries = [...input.keys()].map((path) => normalizeExecutionPath(path));
    const normalizedPreferredPath = normalizeExecutionPath(preferredPath);
    if (normalizedPreferredPath && normalizedEntries.includes(normalizedPreferredPath)) {
      return normalizedPreferredPath;
    }
    return entryPathForInput(input);
  };
  const resolveDirectoryFilePath = (path, candidates) => {
    const normalizedPath = normalizeExecutionPath(path);
    if (!normalizedPath) {
      return "";
    }
    const normalizedCandidates = candidates.map((candidate) => normalizeExecutionPath(candidate));
    const exactIndex = normalizedCandidates.indexOf(normalizedPath);
    if (exactIndex >= 0) {
      return candidates[exactIndex] ?? "";
    }
    const suffixMatches = normalizedCandidates.flatMap(
      (candidate, index) => candidate.endsWith(`/${normalizedPath}`) || normalizedPath.endsWith(`/${candidate}`) ? [candidates[index] ?? ""] : []
    );
    if (suffixMatches.length === 1) {
      return suffixMatches[0];
    }
    const basename = basenameFromPath(normalizedPath);
    if (!basename) {
      return "";
    }
    const basenameMatches = normalizedCandidates.flatMap(
      (candidate, index) => basenameFromPath(candidate) === basename ? [candidates[index] ?? ""] : []
    );
    return basenameMatches.length === 1 ? basenameMatches[0] : "";
  };
  const directoryFilePathForFilename = (filename) => {
    if (!isDirectorySourceSelection(state.source)) {
      return "";
    }
    return resolveDirectoryFilePath(filename, state.directoryFilePaths);
  };
  const currentDirectoryFilePath = () => {
    if (!isDirectorySourceSelection(state.source) || !state.lastExecutionInput) {
      return state.activeDirectoryFilePath;
    }
    return activeDirectoryFilePathForInput(state.lastExecutionInput, state.activeDirectoryFilePath);
  };
  const selectionFeatureKey = (features) => features.map((feature) => `${feature.type}\0${feature.uuid}\0${feature.objectId ?? ""}`).join("");
  const diffEntryPathForInput = (input, prefix) => {
    return `${prefix}/${entryPathForInput(input)}`;
  };
  const sourceCanPoll = (source) => source?.kind === "file" || source?.kind === "directory";
  const sourceExecutesImmediately = (source) => source?.kind === "clipboard" || source?.kind === "browser-file" || source?.kind === "browser-directory" || source?.kind === "remote-file" || source?.kind === "ai-input";
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
  const entriesFromMapLike = (value) => {
    if (value instanceof Map) {
      return [...value.entries()].flatMap(
        (entry) => typeof entry[0] === "string" ? [[entry[0], entry[1]]] : []
      );
    }
    if (Array.isArray(value)) {
      return value.flatMap(
        (entry) => Array.isArray(entry) && entry.length >= 2 && typeof entry[0] === "string" ? [[entry[0], entry[1]]] : []
      );
    }
    if (value && typeof value === "object") {
      return Object.entries(value);
    }
    return [];
  };
  const valueFromMapLike = (value, key) => {
    if (value instanceof Map) {
      return value.get(key) ?? value.get(String(key));
    }
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (Array.isArray(entry) && entry.length >= 2 && (entry[0] === key || entry[0] === String(key))) {
          return entry[1];
        }
      }
      return void 0;
    }
    if (value && typeof value === "object") {
      const record = value;
      if ("map" in record) {
        const nested = valueFromMapLike(record.map, key);
        if (nested !== void 0) {
          return nested;
        }
      }
      return record[String(key)];
    }
    return void 0;
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
    const filename = modulePathValue(valueFromMapLike(filenames, moduleId));
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
  const locationForSourceRange = (sourceRange, filenames, input, source) => {
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
  const labelForSourceRange = (sourceRange, filenames, input, source) => {
    const location2 = locationForSourceRange(sourceRange, filenames, input, source);
    if (location2) {
      return location2;
    }
    const filename = filenameForModuleId(filenames, sourceRange[2], source);
    if (filename) {
      return `${filename} [${sourceRange[0]}, ${sourceRange[1]}, ${sourceRange[2]}]`;
    }
    return `[${sourceRange[0]}, ${sourceRange[1]}, ${sourceRange[2]}]`;
  };
  const locationForErrorLike = (errorLike, filenames, input, source) => {
    const sourceRange = preferredSourceRange(errorLike);
    if (!sourceRange) {
      return "";
    }
    return locationForSourceRange(sourceRange, filenames, input, source);
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
    const location2 = typeof value === "object" && value !== null ? locationForErrorLike(value, filenames, input, source) : "";
    return normalizeKclErrorMessages(kclErrorMessagesFromUnknown(value, depth)).map((message) => ({
      message,
      location: location2
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
    const execOutcome = execOutcomeRecordFromResult(result);
    if (execOutcome && "variables" in execOutcome) {
      return execOutcome.variables;
    }
    if (execOutcome && "values" in execOutcome) {
      return execOutcome.values;
    }
    return null;
  };
  const numberFromExecutorValue = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (!value || typeof value !== "object") {
      return null;
    }
    const record = value;
    if (typeof record.value === "number" && Number.isFinite(record.value)) {
      return record.value;
    }
    if (typeof record.value === "string") {
      const parsed = Number(record.value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  };
  const booleanFromExecutorValue = (value) => {
    if (typeof value === "boolean") {
      return value;
    }
    if (!value || typeof value !== "object") {
      return null;
    }
    const record = value;
    if (typeof record.value === "boolean") {
      return record.value;
    }
    if (record.value === "true") {
      return true;
    }
    if (record.value === "false") {
      return false;
    }
    return null;
  };
  const executorNumberVariables = (values) => {
    const variables = /* @__PURE__ */ new Map();
    if (!values || typeof values !== "object" || Array.isArray(values)) {
      return variables;
    }
    for (const [name, value] of Object.entries(values)) {
      const numberValue = numberFromExecutorValue(value);
      if (numberValue !== null) {
        variables.set(name, numberValue);
      }
    }
    return variables;
  };
  const executorBooleanVariables = (values) => {
    const variables = /* @__PURE__ */ new Map();
    if (!values || typeof values !== "object" || Array.isArray(values)) {
      return variables;
    }
    for (const [name, value] of Object.entries(values)) {
      const booleanValue = booleanFromExecutorValue(value);
      if (booleanValue !== null) {
        variables.set(name, booleanValue);
      }
    }
    return variables;
  };
  const executorVariableEntries = (values) => {
    if (!values || typeof values !== "object" || Array.isArray(values)) {
      return [];
    }
    return Object.entries(values);
  };
  const parameterRangeForValue = (value) => {
    if (value === 0) {
      return { min: -1, max: 1, step: 0.2 };
    }
    const magnitude = 10 ** Math.ceil(Math.log10(Math.max(1, Math.abs(value))));
    const min = value < 0 ? -magnitude : 0;
    const max = value < 0 ? 0 : magnitude;
    return { min, max, step: (max - min) / 10 };
  };
  const formatParameterNumber = (value) => {
    if (Number.isInteger(value)) {
      return String(value);
    }
    return Number(value.toPrecision(12)).toString();
  };
  const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const stringifyVariableStructure = (value) => {
    const seen = /* @__PURE__ */ new WeakSet();
    try {
      return JSON.stringify(
        value,
        (_key, nested) => {
          if (typeof nested === "bigint") {
            return nested.toString();
          }
          if (nested && typeof nested === "object") {
            if (seen.has(nested)) {
              return "[Circular]";
            }
            seen.add(nested);
          }
          return nested;
        },
        2
      ) ?? String(value);
    } catch {
      return String(value);
    }
  };
  const variableStructureTypeLabel = (value) => {
    if (value && typeof value === "object") {
      const type = value.type;
      if (typeof type === "string" && type.trim()) {
        return type;
      }
    }
    return "value";
  };
  const parameterEntriesFromState = () => {
    if (!state.lastExecutionInput) {
      return [];
    }
    const entries = sourceEntriesFromInput(state.lastExecutionInput);
    const activePath = currentDirectoryFilePath();
    const [path, sourceText] = entries.find(([path2]) => normalizeExecutionPath(path2) === activePath) ?? entries[0] ?? [];
    if (!path || sourceText === void 0) {
      return [];
    }
    const executorNumbers = executorNumberVariables(state.executorValues);
    const executorBooleans = executorBooleanVariables(state.executorValues);
    const hasExecutorParameters = executorNumbers.size > 0 || executorBooleans.size > 0;
    const parameters = [];
    const editableNames = /* @__PURE__ */ new Set();
    let lineStart = 0;
    for (const line of sourceText.split("\n")) {
      const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|true|false)(?=\s*(?:$|\/\/|#))/.exec(
        line
      );
      if (match?.[1] && match[2]) {
        const literalText = match[2];
        const valueStart = lineStart + match.index + match[0].lastIndexOf(literalText);
        if (literalText === "true" || literalText === "false") {
          const executorValue2 = executorBooleans.get(match[1]);
          if (!hasExecutorParameters || executorValue2 !== void 0) {
            parameters.push({
              name: match[1],
              path: normalizeExecutionPath(path),
              kind: "boolean",
              value: executorValue2 ?? literalText === "true",
              valueStart,
              valueEnd: valueStart + literalText.length
            });
            editableNames.add(match[1]);
          }
          lineStart += line.length + 1;
          continue;
        }
        const literalValue = Number(literalText);
        const executorValue = executorNumbers.get(match[1]);
        const value = executorValue ?? literalValue;
        if (Number.isFinite(value) && (!hasExecutorParameters || executorValue !== void 0)) {
          const { min, max, step } = parameterRangeForValue(value);
          parameters.push({
            name: match[1],
            path: normalizeExecutionPath(path),
            kind: "number",
            value,
            min,
            max,
            step,
            valueStart,
            valueEnd: valueStart + literalText.length
          });
          editableNames.add(match[1]);
        }
      }
      lineStart += line.length + 1;
    }
    for (const [name, value] of executorVariableEntries(state.executorValues)) {
      if (editableNames.has(name)) {
        continue;
      }
      if (numberFromExecutorValue(value) !== null || booleanFromExecutorValue(value) !== null) {
        continue;
      }
      parameters.push({
        name,
        path: normalizeExecutionPath(path),
        kind: "structure",
        value
      });
    }
    return parameters.sort((a, b) => a.name.localeCompare(b.name));
  };
  const parameterEntryForControl = (control) => {
    const name = control.dataset.parameterName;
    const path = control.dataset.parameterPath;
    if (!name || !path) {
      return null;
    }
    return parameterEntriesFromState().find(
      (entry) => entry.name === name && entry.path === normalizeExecutionPath(path)
    ) ?? null;
  };
  const variableStructureKey = (name, path) => `${normalizeExecutionPath(path)}:${name}`;
  const replaceSourceTextForPath = (input, path, sourceText) => {
    if (typeof input === "string") {
      return sourceText;
    }
    const next = new Map(input);
    for (const candidatePath of next.keys()) {
      if (normalizeExecutionPath(candidatePath) === normalizeExecutionPath(path)) {
        next.set(candidatePath, sourceText);
        return next;
      }
    }
    next.set(path, sourceText);
    return next;
  };
  const parameterLiteral = (entry, value) => {
    if (entry.kind === "boolean") {
      return value ? "true" : "false";
    }
    if (entry.kind !== "number") {
      return "";
    }
    return typeof value === "number" && Number.isFinite(value) ? formatParameterNumber(value) : "";
  };
  const applyParameterValue = (entry, value) => {
    const literal = parameterLiteral(entry, value);
    if (!state.lastExecutionInput || !state.executor || state.execution || !literal) {
      render();
      return;
    }
    const sourceText = sourceTextForExecutionPath(state.lastExecutionInput, entry.path);
    if (!sourceText || entry.valueStart === void 0 || entry.valueEnd === void 0) {
      render();
      return;
    }
    const nextSourceText = sourceText.slice(0, entry.valueStart) + literal + sourceText.slice(entry.valueEnd);
    const nextInput = replaceSourceTextForPath(
      cloneExecutionInput(state.lastExecutionInput),
      entry.path,
      nextSourceText
    );
    clearPoller();
    state.parameterOverrideInput = cloneExecutionInput(nextInput);
    state.lastExecutionInput = cloneExecutionInput(nextInput);
    runStateExecution(() => executeInput(nextInput), resumeSourcePollingOrRender);
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
    const artifactGraph = execOutcome.artifactGraph && typeof execOutcome.artifactGraph === "object" ? execOutcome.artifactGraph : null;
    if (!artifactGraph) {
      return {};
    }
    const next = {};
    const graphMap = "map" in artifactGraph && artifactGraph.map && typeof artifactGraph.map === "object" ? artifactGraph.map : artifactGraph;
    for (const [artifactId, artifact] of entriesFromMapLike(graphMap)) {
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
  const directSourceRangeFromArtifact = (artifact) => {
    const codeRef = artifact.codeRef && typeof artifact.codeRef === "object" ? artifact.codeRef : null;
    return sourceRangeFromUnknown(codeRef?.range) ?? sourceRangeFromUnknown(codeRef?.sourceRange) ?? sourceRangeFromUnknown(artifact.sourceRange);
  };
  const artifactReferenceIds = (value, artifactGraph, seen = /* @__PURE__ */ new Set()) => {
    if (value == null || seen.has(value) || typeof value === "number" || typeof value === "boolean") {
      return [];
    }
    seen.add(value);
    if (typeof value === "string") {
      return artifactGraph[value] ? [value] : [];
    }
    if (Array.isArray(value)) {
      return [...new Set(value.flatMap((entry) => artifactReferenceIds(entry, artifactGraph, seen)))];
    }
    if (typeof value !== "object") {
      return [];
    }
    return [
      ...new Set(
        Object.values(value).flatMap(
          (entry) => artifactReferenceIds(entry, artifactGraph, seen)
        )
      )
    ];
  };
  const relatedArtifactIdsForArtifactId = (artifactId, artifactGraph) => {
    const artifact = artifactGraph[artifactId];
    if (!artifact) {
      return [];
    }
    const childArtifactIds = artifactReferenceIds(artifact, artifactGraph).filter(
      (childArtifactId) => childArtifactId !== artifactId
    );
    const parentArtifactIds = Object.entries(artifactGraph).flatMap(
      ([parentArtifactId, parentArtifact]) => parentArtifactId !== artifactId && artifactReferenceIds(parentArtifact, artifactGraph).includes(artifactId) ? [parentArtifactId] : []
    );
    return [.../* @__PURE__ */ new Set([artifactId, ...childArtifactIds, ...parentArtifactIds])];
  };
  const sourceRangesForArtifactId = (artifactId, artifactGraph) => {
    const seenRanges = /* @__PURE__ */ new Set();
    return relatedArtifactIdsForArtifactId(artifactId, artifactGraph).flatMap((relatedArtifactId) => {
      const directRange = directSourceRangeFromArtifact(artifactGraph[relatedArtifactId] ?? {});
      if (!directRange) {
        return [];
      }
      const key = directRange.join(":");
      if (seenRanges.has(key)) {
        return [];
      }
      seenRanges.add(key);
      return [directRange];
    });
  };
  const sourceRangeForArtifactId = (artifactId, artifactGraph) => sourceRangesForArtifactId(artifactId, artifactGraph)[0] ?? null;
  const recordContainsUuid = (value, uuid, seen = /* @__PURE__ */ new Set()) => {
    if (value == null || seen.has(value)) {
      return false;
    }
    seen.add(value);
    if (typeof value === "string") {
      return value === uuid;
    }
    if (Array.isArray(value)) {
      return value.some((entry) => recordContainsUuid(entry, uuid, seen));
    }
    if (typeof value !== "object") {
      return false;
    }
    const record = value;
    if (record.uuid === uuid || record.entity_id === uuid || record.object_id === uuid || record.id === uuid) {
      return true;
    }
    return Object.values(record).some((entry) => recordContainsUuid(entry, uuid, seen));
  };
  const matchingArtifactIdsForUuid = (uuid, artifactGraph) => Object.entries(artifactGraph).flatMap(
    ([artifactId, artifact]) => artifactId === uuid || recordContainsUuid(artifact, uuid) ? [artifactId] : []
  );
  const selectedFeatureSourceMappingsFromArtifactId = (feature, artifactId, artifactGraph, filenames, input, source) => {
    return sourceRangesForArtifactId(artifactId, artifactGraph).flatMap((sourceRange) => {
      const filename = filenameForModuleId(filenames, sourceRange[2], source);
      const sourceText = filename ? sourceTextForExecutionPath(input, filename) : "";
      const sourceCode = sourceText ? utf8Slice(sourceText, sourceRange[0], sourceRange[1]).trim() : "";
      return [
        {
          type: feature.type,
          uuid: feature.uuid,
          artifactId,
          filename,
          sourceRange,
          sourceCode,
          location: labelForSourceRange(sourceRange, filenames, input, source)
        }
      ];
    });
  };
  const selectedFeatureSourceMappingFromSourceRange = (feature, sourceRange, filenames, input, source, artifactId = "") => {
    const filename = filenameForModuleId(filenames, sourceRange[2], source);
    const sourceText = filename ? sourceTextForExecutionPath(input, filename) : "";
    const sourceCode = sourceText ? utf8Slice(sourceText, sourceRange[0], sourceRange[1]).trim() : "";
    return {
      type: feature.type,
      uuid: feature.uuid,
      artifactId,
      filename,
      sourceRange,
      sourceCode,
      location: labelForSourceRange(sourceRange, filenames, input, source)
    };
  };
  const orderedBodySourceRangesFromResult = (result, filenames, input, source) => {
    const artifactGraph = artifactGraphFromResult(result);
    const bodyArtifactIds = Object.entries(artifactGraph).flatMap(([artifactId, artifact]) => {
      if (artifact.type !== "sweep" && artifact.type !== "compositeSolid" || artifact.consumed === true) {
        return [];
      }
      const sourceRange = sourceRangeForArtifactId(artifactId, artifactGraph);
      const mapping = sourceRange ? selectedFeatureSourceMappingFromSourceRange(
        { type: "solid3d", uuid: artifactId },
        sourceRange,
        filenames,
        input,
        source,
        artifactId
      ) : null;
      return mapping ? [mapping] : [];
    }).sort((left, right) => {
      if (left.sourceRange[2] !== right.sourceRange[2]) {
        return left.sourceRange[2] - right.sourceRange[2];
      }
      if (left.sourceRange[0] !== right.sourceRange[0]) {
        return left.sourceRange[0] - right.sourceRange[0];
      }
      return left.sourceRange[1] - right.sourceRange[1];
    });
    if (bodyArtifactIds.length) {
      return bodyArtifactIds;
    }
    return operationsFromResult(result).flatMap((operation) => {
      if (operation.type !== "StdLibCall" || typeof operation.name !== "string" || !bodyOperationNames.has(operation.name)) {
        return [];
      }
      const sourceRange = sourceRangeFromUnknown(operation.sourceRange) ?? sourceRangeFromUnknown(operation.source_range);
      if (!sourceRange) {
        return [];
      }
      const mapping = selectedFeatureSourceMappingFromSourceRange(
        { type: "solid3d", uuid: `${operation.name}:${sourceRange.join(":")}` },
        sourceRange,
        filenames,
        input,
        source
      );
      return mapping ? [mapping] : [];
    }).sort((left, right) => {
      if (left.sourceRange[2] !== right.sourceRange[2]) {
        return left.sourceRange[2] - right.sourceRange[2];
      }
      if (left.sourceRange[0] !== right.sourceRange[0]) {
        return left.sourceRange[0] - right.sourceRange[0];
      }
      return left.sourceRange[1] - right.sourceRange[1];
    });
  };
  const selectedFeatureSourceMappingFromBodyIndex = (feature, filenames, input, source, result) => {
    const objectIndex = state.solidObjectIds.indexOf(feature.objectId ?? feature.uuid);
    if (objectIndex < 0) {
      return null;
    }
    const orderedMappings = orderedBodySourceRangesFromResult(result, filenames, input, source);
    const mapping = orderedMappings[objectIndex];
    if (!mapping) {
      return null;
    }
    return {
      ...mapping,
      type: feature.type,
      uuid: feature.uuid
    };
  };
  const bodyArtifactIdForObjectId = (objectId) => {
    const objectIndex = state.solidObjectIds.indexOf(objectId);
    if (objectIndex < 0) {
      return "";
    }
    const directArtifactId = state.bodyArtifactIds[objectIndex];
    if (directArtifactId) {
      return directArtifactId;
    }
    const executorResult = currentExecutorResult();
    const fallbackBodyArtifactIds = executorResult ? Object.entries(artifactGraphFromResult(executorResult)).flatMap(([artifactId, artifact]) => {
      if (artifact.type !== "sweep" && artifact.type !== "compositeSolid" || artifact.consumed === true) {
        return [];
      }
      const range = directSourceRangeFromArtifact(artifact);
      return [{ artifactId, range }];
    }).sort((left, right) => {
      if (!left.range && !right.range) {
        return 0;
      }
      if (!left.range) {
        return 1;
      }
      if (!right.range) {
        return -1;
      }
      if (left.range[2] !== right.range[2]) {
        return left.range[2] - right.range[2];
      }
      if (left.range[0] !== right.range[0]) {
        return left.range[0] - right.range[0];
      }
      return left.range[1] - right.range[1];
    }).map((entry) => entry.artifactId) : [];
    return fallbackBodyArtifactIds[objectIndex] ?? "";
  };
  const lineColumnFromLocation = (location2) => {
    const match = /:(\d+):(\d+)$/.exec(location2);
    return match ? { line: match[1], column: match[2] } : null;
  };
  const locationParts = (location2) => {
    const match = /^(.*):(\d+):(\d+)$/.exec(location2);
    if (!match) {
      return null;
    }
    return {
      path: normalizeExecutionPath(match[1] ?? ""),
      line: Number(match[2] ?? 0),
      column: Number(match[3] ?? 0)
    };
  };
  const importedPathFromSourceCode = (sourceCode) => {
    const match = /^\s*import\s+['"]([^'"]+)['"]/m.exec(sourceCode);
    return normalizeExecutionPath(match?.[1] ?? "");
  };
  const escapedRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sourceEntriesFromInput = (input) => typeof input === "string" ? [["main.kcl", input]] : [...input.entries()];
  const variableNamesFromSourceCode = (sourceCode) => {
    const matches = sourceCode.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) ?? [];
    return [...new Set(matches)];
  };
  const lineForOffset = (sourceText, offset) => lineAndColumnFromUtf8Offset(sourceText, offset).line;
  const relatedVariableBlocksFromMappings = (mappings) => {
    if (!state.lastExecutionInput) {
      return [];
    }
    const variableNames = [...new Set(mappings.flatMap((mapping) => variableNamesFromSourceCode(mapping.sourceCode)))];
    const mappingKeys = new Set(
      mappings.map((mapping) => `${mapping.location || "[Unknown source range]"}\0${mapping.sourceCode || "[Source unavailable]"}`)
    );
    const seen = /* @__PURE__ */ new Set();
    const blocks = variableNames.flatMap((name) => {
      const definitionPattern = new RegExp(`^\\s*(?:export\\s+)?${escapedRegex(name)}\\s*=.*$`, "m");
      for (const [path, sourceText] of sourceEntriesFromInput(state.lastExecutionInput)) {
        const match = definitionPattern.exec(sourceText);
        if (!match || match.index == null) {
          continue;
        }
        const line = lineForOffset(sourceText, match.index);
        const location2 = `${normalizeExecutionPath(path)}:${line}:1`;
        const code = match[0].trim();
        const key = `${location2}\0${code}`;
        if (seen.has(key) || mappingKeys.has(key)) {
          return [];
        }
        seen.add(key);
        return [{ location: location2, code }];
      }
      return [];
    });
    return blocks;
  };
  const sourceLineForMapping = (mapping) => {
    if (!state.lastExecutionInput) {
      return mapping.sourceCode || "[Source unavailable]";
    }
    const location2 = locationParts(mapping.location || "");
    const sourceText = mapping.filename ? sourceTextForExecutionPath(state.lastExecutionInput, mapping.filename) : "";
    if (!location2 || !sourceText) {
      return mapping.sourceCode || "[Source unavailable]";
    }
    const lines = sourceText.split("\n");
    return lines[Math.max(0, location2.line - 1)]?.trim() || mapping.sourceCode || "[Source unavailable]";
  };
  const overlayCodeForMappings = (mappings) => {
    if (!mappings.length) {
      return "";
    }
    if (state.selectionMode === "feature") {
      const primary = primarySelectionMapping(mappings) ?? mappings[0];
      const location2 = primary.location || "[Unknown source range]";
      const source = sourceLineForMapping(primary);
      return `${location2}
${source}`;
    }
    const mappingBlocks = mappings.map((mapping) => ({
      location: mapping.location || "[Unknown source range]",
      code: mapping.sourceCode || "[Source unavailable]"
    }));
    const variableBlocks = relatedVariableBlocksFromMappings(mappings);
    return [...mappingBlocks, ...variableBlocks].sort((left, right) => {
      const leftParts = locationParts(left.location);
      const rightParts = locationParts(right.location);
      if (!leftParts && !rightParts) {
        return left.location.localeCompare(right.location);
      }
      if (!leftParts) {
        return 1;
      }
      if (!rightParts) {
        return -1;
      }
      if (leftParts.path !== rightParts.path) {
        return leftParts.path.localeCompare(rightParts.path);
      }
      if (leftParts.line !== rightParts.line) {
        return leftParts.line - rightParts.line;
      }
      return leftParts.column - rightParts.column;
    }).map((block) => `${block.location}
${block.code}`).join("\n\n" + "\u2500".repeat(80) + "\n\n");
  };
  const selectionMappingPriority = (mapping) => {
    const normalizedFilename = normalizeExecutionPath(mapping.filename);
    const directoryFilePath = normalizedFilename ? directoryFilePathForFilename(normalizedFilename) : "";
    const importedDirectoryFilePath = isDirectorySourceSelection(state.source) ? resolveDirectoryFilePath(importedPathFromSourceCode(mapping.sourceCode), state.directoryFilePaths) : "";
    const activeDirectoryFilePath = currentDirectoryFilePath();
    const importTargetDirectoryFilePath = importedDirectoryFilePath && importedDirectoryFilePath !== activeDirectoryFilePath ? importedDirectoryFilePath : "";
    const isImportedFileTarget = Boolean(directoryFilePath) && directoryFilePath !== activeDirectoryFilePath;
    const isOtherFile = Boolean(normalizedFilename) && normalizedFilename !== activeDirectoryFilePath && directoryFilePath !== activeDirectoryFilePath;
    return {
      normalizedFilename,
      directoryFilePath,
      importTargetDirectoryFilePath,
      isImportedFileTarget,
      isOtherFile,
      score: isImportedFileTarget ? 4 : importTargetDirectoryFilePath ? 3 : isOtherFile ? 2 : normalizedFilename ? 1 : 0
    };
  };
  const primarySelectionMapping = (mappings) => mappings.reduce((best, mapping) => {
    if (!best) {
      return mapping;
    }
    const bestPriority = selectionMappingPriority(best);
    const nextPriority = selectionMappingPriority(mapping);
    if (bestPriority.score !== nextPriority.score) {
      return nextPriority.score > bestPriority.score ? mapping : best;
    }
    return best;
  }, null);
  const selectionDisplayFromMappings = (mappings) => {
    const activeDirectoryFilePath = currentDirectoryFilePath();
    if (selectionDisplayCache && selectionDisplayCache.mappings === mappings && selectionDisplayCache.activeDirectoryFilePath === activeDirectoryFilePath) {
      return selectionDisplayCache.display;
    }
    const primary = primarySelectionMapping(mappings);
    if (!primary) {
      const display2 = {
        pillText: "N/A",
        pillTitle: "N/A",
        overlayTitle: "No selection",
        overlayCode: "No selection",
        hasSelection: false,
        targetDirectoryFilePath: ""
      };
      selectionDisplayCache = {
        mappings,
        activeDirectoryFilePath,
        display: display2
      };
      return display2;
    }
    const location2 = primary.location || "[Unknown source range]";
    const lineColumn = lineColumnFromLocation(location2);
    const {
      normalizedFilename,
      directoryFilePath,
      importTargetDirectoryFilePath,
      isOtherFile
    } = selectionMappingPriority(primary);
    const targetDirectoryFilePath = importTargetDirectoryFilePath || directoryFilePath;
    const canJumpToDirectoryFile = Boolean(targetDirectoryFilePath) && targetDirectoryFilePath !== activeDirectoryFilePath;
    const importDisplayPath = importTargetDirectoryFilePath || (isOtherFile ? targetDirectoryFilePath || normalizedFilename : "");
    const pillText = importDisplayPath ? importDisplayPath : lineColumn ? `${lineColumn.line}:${lineColumn.column}` : location2;
    const display = {
      pillText,
      pillTitle: location2,
      overlayTitle: location2,
      overlayCode: overlayCodeForMappings(mappings),
      hasSelection: true,
      targetDirectoryFilePath: canJumpToDirectoryFile ? targetDirectoryFilePath : ""
    };
    selectionDisplayCache = {
      mappings,
      activeDirectoryFilePath,
      display
    };
    return display;
  };
  const candidateArtifactIdsForFeature = (feature, artifactGraph) => {
    const candidateArtifactIds = /* @__PURE__ */ new Set();
    const addDirectFeatureArtifactIds = () => {
      if (artifactGraph[feature.uuid]) {
        candidateArtifactIds.add(feature.uuid);
      }
      matchingArtifactIdsForUuid(feature.uuid, artifactGraph).forEach(
        (artifactId) => candidateArtifactIds.add(artifactId)
      );
    };
    const addBodyArtifactIds = () => {
      const directBodyArtifactId = bodyArtifactIdForObjectId(feature.objectId ?? feature.uuid);
      if (directBodyArtifactId) {
        candidateArtifactIds.add(directBodyArtifactId);
      }
    };
    if (feature.type === "solid3d") {
      addBodyArtifactIds();
      addDirectFeatureArtifactIds();
    } else {
      addDirectFeatureArtifactIds();
      addBodyArtifactIds();
    }
    if (feature.objectId && feature.objectId !== feature.uuid) {
      if (artifactGraph[feature.objectId]) {
        candidateArtifactIds.add(feature.objectId);
      }
      matchingArtifactIdsForUuid(feature.objectId, artifactGraph).forEach(
        (artifactId) => candidateArtifactIds.add(artifactId)
      );
    }
    return candidateArtifactIds;
  };
  const selectedFeatureSourceMappingsForFeature = (feature, artifactGraph, filenames, input, source, result) => {
    const candidateArtifactIds = candidateArtifactIdsForFeature(feature, artifactGraph);
    const mappings = [];
    for (const artifactId of candidateArtifactIds) {
      selectedFeatureSourceMappingsFromArtifactId(
        feature,
        artifactId,
        artifactGraph,
        filenames,
        input,
        source
      ).forEach((mapping) => mappings.push(mapping));
    }
    if (feature.type === "solid3d") {
      const fallbackMapping = selectedFeatureSourceMappingFromBodyIndex(
        feature,
        filenames,
        input,
        source,
        result
      );
      if (fallbackMapping) {
        mappings.push(fallbackMapping);
      }
    }
    return mappings;
  };
  const selectedFeatureSourceMappingsFromFeatures = (features) => {
    const executorResult = currentExecutorResult();
    if (!features.length || !state.lastExecutionInput || !executorResult) {
      return [];
    }
    const featureKey = selectionFeatureKey(features);
    if (selectionMappingsCache && selectionMappingsCache.executorResult === executorResult && selectionMappingsCache.input === state.lastExecutionInput && selectionMappingsCache.featureKey === featureKey) {
      return selectionMappingsCache.mappings;
    }
    const artifactGraph = artifactGraphFromResult(executorResult);
    const filenames = filenamesFromResult(executorResult);
    const mappings = features.flatMap(
      (feature) => selectedFeatureSourceMappingsForFeature(
        feature,
        artifactGraph,
        filenames,
        state.lastExecutionInput,
        state.source,
        executorResult
      )
    );
    const seen = /* @__PURE__ */ new Set();
    const dedupedMappings = mappings.flatMap((mapping) => {
      if (!mapping) {
        return [];
      }
      const key = `${mapping.uuid}\0${mapping.location}\0${mapping.sourceCode}`;
      if (seen.has(key)) {
        return [];
      }
      seen.add(key);
      return [mapping];
    });
    selectionMappingsCache = {
      executorResult,
      input: state.lastExecutionInput,
      featureKey,
      mappings: dedupedMappings
    };
    return dedupedMappings;
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
    const range = directSourceRangeFromArtifact(artifact);
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
      const range = directSourceRangeFromArtifact(artifact);
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
  const replaceKclErrors = (messages2) => {
    replaceKclErrorDisplays(messages2.map((message) => ({ message, location: "" })));
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
  const applySceneMaterials = () => {
    if (state.diffEnabled || state.xrayVisible || !state.solidObjectIds.length) {
      return;
    }
    sendMaterialBatch(state.materialByObjectId);
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
                  a: state.xrayVisible ? state.xrayOpacity : material.color.a
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
  const applyCurrentSceneAppearance = () => {
    if (state.diffEnabled) {
      applyDiffAppearance();
    } else if (state.xrayVisible) {
      applyXrayAppearance();
    } else {
      applySceneMaterials();
    }
    if (state.explodeMode) {
      applyExplodedView();
    }
  };
  const syncAndApplySceneState = () => {
    if (!state.solidObjectIds.length) {
      return;
    }
    syncSceneObjectMaterials();
    syncSceneObjectTransforms();
    applyCurrentSceneAppearance();
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
    state.lastExecutionInput = cloneExecutionInput(input);
    resetSceneObjectTracking({
      preserveDiffOwnership: state.diffEnabled && Boolean(state.diffCompareSource)
    });
    clearExecutionFeedback();
    clearSelectedFeatureState();
    replaceKclErrors([]);
    if (isDirectorySourceSelection(state.source) && typeof input !== "string") {
      state.directoryFilePaths = [...input.keys()].map((path) => normalizeExecutionPath(path)).filter((path) => path.endsWith(".kcl")).sort();
      state.activeDirectoryFilePath = activeDirectoryFilePathForInput(
        input,
        state.activeDirectoryFilePath
      );
    }
    try {
      const shouldProvideMainKclPath = !state.diffEnabled && (state.source?.kind === "file" || state.source?.kind === "browser-file" || state.source?.kind === "directory" || state.source?.kind === "browser-directory" || state.source?.kind === "remote-file" || state.source?.kind === "ai-input");
      const result = await state.executor.submit(
        input,
        shouldProvideMainKclPath ? {
          mainKclPathName: state.source?.kind === "file" || state.source?.kind === "browser-file" ? mainKclPathNameForSource(state.source.label) : activeDirectoryFilePathForInput(input, state.activeDirectoryFilePath)
        } : void 0
      );
      setCurrentExecutorResult(result);
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
      clearExecutionFeedback();
      const errorMessages = kclErrorMessagesFromUnknown(error);
      replaceKclErrors(errorMessages.length ? errorMessages : ["Unable to render KCL."]);
      await appendErrorsLog(state.kclErrors);
      render();
      return void 0;
    }
  };
  const client = deps.createClient(
    usesZooCookieAuth ? { baseUrl: zooApiBaseUrl } : usesOAuthAuth ? {
      baseUrl: zooApiBaseUrl,
      clientId: deps.oauthClientId.trim(),
      redirectUrl: zooOAuthRedirectUrl,
      scopes: zooOAuthScopes
    } : {
      token: state.token,
      baseUrl: zooApiBaseUrl
    }
  );
  const ensureClientOAuth2Compatibility = (target) => {
    if (target.oauth2) {
      const oauth2 = target.oauth2;
      const getAccessToken = oauth2.getAccessToken.bind(oauth2);
      oauth2.getAccessToken = async () => {
        if (state.token) {
          target.token = state.token;
          return { token: { value: state.token } };
        }
        const accessContext = await getAccessToken();
        if (accessContext?.token?.value) {
          target.token = accessContext.token.value;
        }
        return accessContext;
      };
      return target;
    }
    target.oauth2 = {
      getAccessToken: async () => {
        const token = target.token ?? state.token;
        if (token) {
          target.token = token;
        }
        return token ? { token: { value: token } } : void 0;
      },
      fetchAuthorizationCode: () => {
        handleAuthenticationFailure();
      }
    };
    return target;
  };
  ensureClientOAuth2Compatibility(client);
  let webView;
  let startButton;
  let picker;
  let pickerLabel;
  let pickerActions;
  let directoryButton;
  let fileButton;
  let aiInputButton;
  let remoteLoadStatus;
  let aiInputPanel;
  let aiInputContext;
  let aiInputModeTitle;
  let aiInputModeHint;
  let aiInputContextTitle;
  let aiInputContextText;
  let aiInputContextActions;
  let aiInputCancelButton;
  let aiInputUnderstandButton;
  let aiInputTextArea;
  let aiInputFileControls;
  let aiInputPathInput;
  let aiInputAddButton;
  let aiInputDeleteButton;
  let aiInputFileSelect;
  let aiInputActions;
  let aiInputTokenInput;
  let aiInputContinueButton;
  let regularFileInput;
  let regularDirectoryInput;
  let browserBanner;
  let scenePointerDown = null;
  const touchPoints = /* @__PURE__ */ new Map();
  let touchGesture = null;
  const pendingModelingResponses = /* @__PURE__ */ new Map();
  const pendingModelingResponseTypes = /* @__PURE__ */ new Map();
  let snapshotRefreshTimer = 0;
  let snapshotRefreshInFlight = false;
  let snapshotRefreshQueued = false;
  let exportReleaseTimer = 0;
  const elements = {
    get startButton() {
      return startButton;
    },
    tokenInput,
    directoryFileRow,
    directoryFileField,
    directoryFileSelect,
    get browserBanner() {
      return browserBanner;
    },
    snapshotRail,
    noUiToggleButton,
    snapshotToggleButton,
    snapshotCards,
    snapshotImages,
    exportToggleButton,
    exportPopover,
    exportOptions,
    exportStatus,
    kclError,
    kclErrorLabel,
    kclErrorText,
    versionBadge,
    sourceValue,
    statusValue,
    edgesButton,
    xrayButton,
    xrayOpacityInput,
    selectionRangeValue,
    selectionOverlay,
    selectionOverlayTitle,
    selectionOverlayCode,
    selectionOverlayClose,
    selectionModeBodyButton,
    selectionModeFeatureButton,
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
    parametersShell,
    parametersPanel,
    parametersToggleButton,
    parametersList,
    get picker() {
      return picker;
    },
    get pickerLabel() {
      return pickerLabel;
    },
    get fileButton() {
      return fileButton;
    },
    get directoryButton() {
      return directoryButton;
    },
    get aiInputButton() {
      return aiInputButton;
    },
    get remoteLoadStatus() {
      return remoteLoadStatus;
    },
    get aiInputPanel() {
      return aiInputPanel;
    },
    get aiInputContext() {
      return aiInputContext;
    },
    get aiInputModeTitle() {
      return aiInputModeTitle;
    },
    get aiInputModeHint() {
      return aiInputModeHint;
    },
    get aiInputContextTitle() {
      return aiInputContextTitle;
    },
    get aiInputContextText() {
      return aiInputContextText;
    },
    get aiInputCancelButton() {
      return aiInputCancelButton;
    },
    get aiInputUnderstandButton() {
      return aiInputUnderstandButton;
    },
    get aiInputTextArea() {
      return aiInputTextArea;
    },
    get aiInputPathInput() {
      return aiInputPathInput;
    },
    get aiInputAddButton() {
      return aiInputAddButton;
    },
    get aiInputDeleteButton() {
      return aiInputDeleteButton;
    },
    get aiInputFileSelect() {
      return aiInputFileSelect;
    },
    get aiInputTokenInput() {
      return aiInputTokenInput;
    },
    get aiInputContinueButton() {
      return aiInputContinueButton;
    },
    viewer
  };
  const render = () => {
    root2.classList.toggle("no-ui-mode", state.noUiMode);
    const status = deps.document.hidden ? "paused" : state.execution ? "rendering" : state.executor ? "connected" : state.source ? "connecting" : "idle";
    const launcherVisible = !state.source && !state.executor && !state.execution;
    startButton.style.width = launcherVisible ? `${Math.min(224, Math.floor(size.width * 0.4))}px` : "3.5rem";
    startButton.style.textAlign = launcherVisible ? "center" : "right";
    startButton.removeAttribute("title");
    picker.style.opacity = launcherVisible ? "1" : "0";
    picker.style.pointerEvents = launcherVisible ? "auto" : "none";
    picker.hidden = false;
    pickerActions.hidden = state.remoteLoadStatus === "loading";
    directoryButton.hidden = false;
    fileButton.hidden = false;
    aiInputButton.hidden = false;
    remoteLoadStatus.hidden = state.remoteLoadStatus === "idle";
    remoteLoadStatus.dataset.status = state.remoteLoadStatus;
    remoteLoadStatus.replaceChildren();
    if (state.remoteLoadStatus === "loading") {
      const message = deps.document.createElement("span");
      message.textContent = state.remoteLoadUrl;
      remoteLoadStatus.append(message);
    } else if (state.remoteLoadStatus === "failed") {
      const message = deps.document.createElement("span");
      message.textContent = "Failed to load remote content";
      remoteLoadStatus.append(message);
      if (state.remoteLoadError) {
        const errorText = deps.document.createElement("span");
        errorText.className = "remote-load-error";
        errorText.textContent = state.remoteLoadError;
        remoteLoadStatus.append(errorText);
      }
    }
    aiInputPanel.hidden = !state.aiInputVisible;
    aiInputContext.hidden = state.aiInputContextAcknowledged;
    aiInputTextArea.hidden = !state.aiInputContextAcknowledged;
    aiInputFileControls.hidden = !state.aiInputContextAcknowledged;
    aiInputFileSelect.hidden = !state.aiInputContextAcknowledged;
    aiInputActions.hidden = !state.aiInputContextAcknowledged;
    if (aiInputTextArea.value !== state.aiInputText) {
      aiInputTextArea.value = state.aiInputText;
    }
    if (aiInputPathInput.value !== state.aiInputPathDraft) {
      aiInputPathInput.value = state.aiInputPathDraft;
    }
    const aiPaths = aiInputFilePaths();
    aiInputDeleteButton.disabled = aiPaths.length <= 1;
    aiInputDeleteButton.title = aiPaths.length <= 1 ? "Keep at least one project file" : "Delete current project file";
    aiInputFileSelect.replaceChildren(
      ...aiPaths.map((path) => {
        const option = deps.document.createElement("option");
        option.value = path;
        option.textContent = path;
        return option;
      })
    );
    aiInputFileSelect.value = normalizeExecutionPath(state.activeAiInputPath) || "main.kcl";
    aiInputTokenInput.hidden = usesZooCookieAuth || !state.aiInputContextAcknowledged;
    syncTokenInputValue(aiInputTokenInput);
    viewerUiLeft.style.top = "";
    if (!launcherVisible && startButton?.isConnected) {
      const stageRect = viewerStage.getBoundingClientRect();
      const startRect = startButton.getBoundingClientRect();
      const gapPx = Number.parseFloat(globalThis.getComputedStyle(root2).fontSize || "16") || 16;
      const topPx = Math.max(0, startRect.top - stageRect.top + startRect.height + gapPx);
      viewerConnection.style.top = `${topPx}px`;
    } else {
      viewerConnection.style.top = "";
    }
    const shouldShowDisconnectBanner = Boolean(state.disconnectMessage) && launcherVisible;
    browserBanner.hidden = !shouldShowDisconnectBanner && (isSupportedBrowser || !launcherVisible);
    const nextBrowserBannerType = shouldShowDisconnectBanner ? "disconnect" : "browser";
    const nextBrowserBannerMarkup = shouldShowDisconnectBanner ? disconnectBannerMarkup(state.disconnectMessage) : browserBannerMarkup;
    if (browserBanner.dataset.bannerType !== nextBrowserBannerType || browserBanner.dataset.bannerMessage !== state.disconnectMessage) {
      browserBanner.dataset.bannerType = nextBrowserBannerType;
      browserBanner.dataset.bannerMessage = state.disconnectMessage;
      browserBanner.innerHTML = nextBrowserBannerMarkup;
    }
    tokenInput.hidden = usesZooCookieAuth || usesOAuthAuth;
    syncTokenInputValue(tokenInput);
    const showDirectoryFilePicker = !launcherVisible && isDirectorySourceSelection(state.source) && state.directoryFilePaths.length > 0;
    directoryFileField.hidden = !showDirectoryFilePicker;
    directoryFileSelect.replaceChildren(
      ...state.directoryFilePaths.map((path) => {
        const option = deps.document.createElement("option");
        option.value = path;
        option.textContent = path;
        return option;
      })
    );
    directoryFileSelect.value = state.activeDirectoryFilePath;
    kclError.hidden = state.kclErrors.length === 0;
    kclErrorLabel.textContent = state.kclErrors.length > 1 ? `KCL errors (${state.kclErrors.length})` : "KCL error";
    kclErrorText.textContent = state.kclErrors.join("\n\n");
    kclError.dataset.copyable = state.kclErrorLocations.length ? "true" : "false";
    kclError.title = state.kclErrorLocations.length ? "Click to copy file location" : "";
    versionBadge.textContent = appCommitHash;
    versionBadge.title = `Version ${appCommitHash}`;
    versionBadge.setAttribute("aria-label", `Version ${appCommitHash}`);
    noUiToggleButton.hidden = status !== "connected";
    noUiToggleButton.dataset.active = state.noUiMode ? "true" : "false";
    noUiToggleButton.title = state.noUiMode ? "Show UI" : "Photo";
    noUiToggleButton.setAttribute("aria-label", noUiToggleButton.title);
    noUiToggleButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 6.25A1.25 1.25 0 0 1 5.75 5h1.4l1.1-1.25h3.5L12.85 5h1.4a1.25 1.25 0 0 1 1.25 1.25v7.5A1.25 1.25 0 0 1 14.25 15h-8.5A1.25 1.25 0 0 1 4.5 13.75Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.35"/><circle cx="10" cy="10" r="2.65" fill="none" stroke="currentColor" stroke-width="1.35"/><circle cx="13.55" cy="7.25" r=".55" fill="currentColor"/></svg>',
      "Photo",
      state.noUiMode
    );
    const parameterEntries = parameterEntriesFromState();
    parametersShell.hidden = status !== "connected";
    exportPopover.hidden = !state.exportPopoverVisible || status !== "connected";
    exportToggleButton.disabled = status !== "connected" || state.exportInFlight;
    exportToggleButton.title = state.exportPopoverVisible ? "Hide export options" : "Show export options";
    exportToggleButton.setAttribute("aria-label", exportToggleButton.title);
    exportOptions.innerHTML = exportFormats.map(
      (format) => `<button type="button" data-export-format="${format.key}" ${state.exportInFlight ? "disabled" : ""}>${format.label}</button>`
    ).join("");
    exportStatus.textContent = state.exportStatusMessage;
    parametersPanel.hidden = !state.parametersVisible;
    parametersToggleButton.textContent = state.parametersVisible ? "Hide" : "Parameters and objects";
    parametersToggleButton.title = state.parametersVisible ? "Hide parameters and objects" : "Show parameters and objects";
    parametersToggleButton.setAttribute("aria-label", parametersToggleButton.title);
    parametersList.innerHTML = parameterEntries.length ? parameterEntries.map((entry) => {
      if (entry.kind === "boolean") {
        return `
                <label class="parameter-control parameter-control-boolean">
                  <span class="parameter-row">
                    <span class="parameter-name" title="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</span>
                    <input
                      type="checkbox"
                      ${entry.value ? "checked" : ""}
                      data-parameter-checkbox
                      data-parameter-name="${escapeHtml(entry.name)}"
                      data-parameter-path="${escapeHtml(entry.path)}"
                      aria-label="${escapeHtml(`${entry.name} toggle`)}"
                    >
                  </span>
                </label>
              `;
      }
      if (entry.kind === "structure") {
        const typeLabel = variableStructureTypeLabel(entry.value);
        const isolationKey = variableStructureKey(entry.name, entry.path);
        const open = state.openVariableStructures.has(
          isolationKey
        );
        return `
                <details
                  class="parameter-control parameter-control-structure"
                  data-variable-structure
                  data-parameter-name="${escapeHtml(entry.name)}"
                  data-parameter-path="${escapeHtml(entry.path)}"
                  ${open ? "open" : ""}
                >
                  <summary>
                    <span class="parameter-name" title="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</span>
                    <span class="parameter-kind">${escapeHtml(typeLabel)}</span>
                  </summary>
                  <pre>${escapeHtml(stringifyVariableStructure(entry.value))}</pre>
                </details>
              `;
      }
      const value = formatParameterNumber(entry.value);
      return `
              <label class="parameter-control">
                <span class="parameter-row">
                  <span class="parameter-name" title="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</span>
                  <span class="parameter-range">${escapeHtml(formatParameterNumber(entry.min ?? 0))}:${escapeHtml(formatParameterNumber(entry.max ?? 0))}</span>
                </span>
                <span class="parameter-inputs">
                  <input
                    type="range"
                    min="${escapeHtml(formatParameterNumber(entry.min ?? 0))}"
                    max="${escapeHtml(formatParameterNumber(entry.max ?? 0))}"
                    step="${escapeHtml(formatParameterNumber(entry.step ?? 1))}"
                    value="${escapeHtml(value)}"
                    data-parameter-range
                    data-parameter-name="${escapeHtml(entry.name)}"
                    data-parameter-path="${escapeHtml(entry.path)}"
                    aria-label="${escapeHtml(`${entry.name} slider`)}"
                  >
                  <input
                    type="number"
                    step="${escapeHtml(formatParameterNumber(entry.step ?? 1))}"
                    value="${escapeHtml(value)}"
                    data-parameter-value
                    data-parameter-name="${escapeHtml(entry.name)}"
                    data-parameter-path="${escapeHtml(entry.path)}"
                    aria-label="${escapeHtml(`${entry.name} value`)}"
                  >
                </span>
              </label>
            `;
    }).join("") : '<div class="parameters-empty">No top-level variables in the current file.</div>';
    for (const details of parametersList.querySelectorAll(
      "[data-variable-structure]"
    )) {
      const name = details.dataset.parameterName;
      const path = details.dataset.parameterPath;
      const pre = details.querySelector("pre");
      if (!name || !path || !pre) {
        continue;
      }
      pre.scrollTop = state.variableStructureScrollTop[variableStructureKey(name, path)] ?? 0;
    }
    snapshotRail.hidden = state.noUiMode || status !== "connected" || !state.snapshotRailVisible;
    snapshotToggleButton.hidden = state.noUiMode || status !== "connected";
    snapshotToggleButton.dataset.active = state.snapshotRailVisible ? "true" : "false";
    snapshotToggleButton.title = state.snapshotRailVisible ? "Hide snapshots" : "Show snapshots";
    snapshotToggleButton.setAttribute("aria-label", snapshotToggleButton.title);
    snapshotToggleButton.innerHTML = labeledIconMarkup(
      state.snapshotRailVisible ? '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="4.25" width="12" height="11.5" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.35"/><path d="M4 8.1h12M8.1 8.1v7.65M11.9 8.1v7.65" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.2"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="4.25" width="12" height="11.5" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.35"/><path d="M4 8.1h12M7.2 10.1h5.6M7.2 12.45h5.6M7.2 14.8h5.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.2"/></svg>',
      "Views",
      state.snapshotRailVisible
    );
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
    sourceValue.hidden = launcherVisible || showDirectoryFilePicker;
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
    edgesButton.innerHTML = labeledIconMarkup(
      state.edgeLinesVisible ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 3.6 4.9 2.8v5.6L10 14.8l-4.9-2.8V6.4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35"/><path d="M10 3.6v5.6m4.9-2.8L10 9.2 5.1 6.4M10 9.2v5.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 3.6 4.9 2.8v5.6L10 14.8l-4.9-2.8V6.4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35"/><path d="M10 3.6v5.6m4.9-2.8L10 9.2 5.1 6.4M10 9.2v5.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35"/><path d="m4.3 15.7 11.4-11.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.45"/></svg>',
      "Edges",
      state.edgeLinesVisible
    );
    xrayButton.hidden = status !== "connected" || state.diffEnabled;
    xrayButton.dataset.active = state.xrayVisible ? "true" : "false";
    xrayButton.title = state.xrayVisible ? "Disable xray" : "Enable xray";
    xrayButton.setAttribute("aria-label", state.xrayVisible ? "Disable xray" : "Enable xray");
    xrayButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.1c-3.35 0-5.9 2.4-5.9 5.55 0 2.05 1.07 3.67 2.72 4.58v2.03c0 .68.55 1.23 1.23 1.23h3.9c.68 0 1.23-.55 1.23-1.23v-2.03c1.65-.91 2.72-2.53 2.72-4.58 0-3.15-2.55-5.55-5.9-5.55Z" fill="currentColor"/><ellipse cx="7.75" cy="8.7" rx="1.28" ry="1.55" fill="#080d09"/><ellipse cx="12.25" cy="8.7" rx="1.28" ry="1.55" fill="#080d09"/><path d="M10 10.45 8.95 12h2.1Z" fill="#080d09"/><rect x="8.25" y="13.15" width="3.5" height="2.2" rx="0.72" fill="#080d09"/><path d="M9.15 13.25v1.95M10 13.25v1.95M10.85 13.25v1.95" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width=".72"/></svg>',
      "Xray",
      state.xrayVisible
    );
    xrayOpacityInput.hidden = status !== "connected" || state.diffEnabled || !state.xrayMenuVisible;
    xrayOpacityInput.value = `${state.xrayOpacity}`;
    xrayOpacityInput.title = `Xray opacity: ${state.xrayOpacity.toFixed(2)}`;
    const selectionDisplay = selectionDisplayFromMappings(
      selectedFeatureSourceMappingsFromFeatures(window.zooSelectedFeatures ?? [])
    );
    const selectionOverlayOpen = state.selectionOverlayOpen && status === "connected" && selectionDisplay.hasSelection;
    directoryFileRow.hidden = status !== "connected";
    selectionRangeValue.hidden = status !== "connected";
    selectionRangeValue.textContent = selectionOverlayOpen ? "" : selectionDisplay.pillText;
    selectionRangeValue.innerHTML = selectionOverlayOpen ? labeledIconMarkup(
      '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4.25" y="4.25" width="11.5" height="11.5" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.35"/><path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>',
      "Close"
    ) : selectionDisplay.pillText;
    selectionRangeValue.title = selectionOverlayOpen ? "Close source preview" : selectionDisplay.pillTitle;
    selectionRangeValue.dataset.empty = selectionDisplay.hasSelection ? "false" : "true";
    selectionRangeValue.dataset.open = selectionOverlayOpen ? "true" : "false";
    selectionRangeValue.setAttribute(
      "aria-label",
      selectionOverlayOpen ? "Close source preview" : selectionDisplay.hasSelection ? `Selected source range ${selectionDisplay.pillTitle}` : "No selection"
    );
    selectionOverlay.hidden = !selectionOverlayOpen;
    selectionOverlayTitle.textContent = selectionDisplay.overlayTitle;
    selectionOverlayCode.textContent = selectionDisplay.overlayCode;
    selectionModeBodyButton.hidden = status !== "connected";
    selectionModeFeatureButton.hidden = status !== "connected";
    selectionModeBodyButton.dataset.active = state.selectionMode === "body" ? "true" : "false";
    selectionModeFeatureButton.dataset.active = state.selectionMode === "feature" ? "true" : "false";
    selectionModeBodyButton.innerHTML = `Body${buttonCheckMarkup(state.selectionMode === "body")}`;
    selectionModeFeatureButton.innerHTML = `Face/Edge${buttonCheckMarkup(state.selectionMode === "feature")}`;
    selectionModeBodyButton.title = "Select bodies";
    selectionModeFeatureButton.title = "Select faces and edges";
    diffButton.hidden = status !== "connected";
    diffButton.dataset.active = state.diffEnabled ? "true" : "false";
    diffButton.title = state.diffEnabled ? "Exit diff mode" : "Enter diff mode";
    diffButton.setAttribute("aria-label", diffButton.title);
    diffButton.innerHTML = labeledIconMarkup(
      state.diffEnabled ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="6" cy="4.75" r="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="6" cy="15.25" r="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="8.5" r="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M6 6.5v6.9M6 10.1h5.8M11.2 10.1c1.55 0 2.8-1.25 2.8-2.8V6.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/></svg>',
      "Diff",
      state.diffEnabled
    );
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
    explodeButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 6.4 10 4.2l5.5 2.2L10 8.6ZM4.5 10 10 7.8l5.5 2.2L10 12.2ZM4.5 13.6 10 11.4l5.5 2.2L10 15.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.4"/></svg>',
      "Explode",
      Boolean(state.explodeMode)
    );
    explodeHorizontalButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeHorizontalButton.dataset.active = state.explodeMode === "horizontal" ? "true" : "false";
    explodeHorizontalButton.innerHTML = `H${buttonCheckMarkup(state.explodeMode === "horizontal")}`;
    explodeHorizontalButton.title = "Horizontal explode";
    explodeVerticalButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeVerticalButton.dataset.active = state.explodeMode === "vertical" ? "true" : "false";
    explodeVerticalButton.innerHTML = `V${buttonCheckMarkup(state.explodeMode === "vertical")}`;
    explodeVerticalButton.title = "Vertical explode";
    explodeRadialButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeRadialButton.dataset.active = state.explodeMode === "radial" ? "true" : "false";
    explodeRadialButton.innerHTML = `R${buttonCheckMarkup(state.explodeMode === "radial")}`;
    explodeRadialButton.title = "Radial explode";
    explodeGridButton.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeGridButton.dataset.active = state.explodeMode === "grid" ? "true" : "false";
    explodeGridButton.innerHTML = `G${buttonCheckMarkup(state.explodeMode === "grid")}`;
    explodeGridButton.title = "Grid explode";
    explodeSpacingInput.hidden = status !== "connected" || !state.explodeMenuVisible;
    explodeSpacingInput.value = `${state.explodeSpacing}`;
    explodeSpacingInput.title = `Explode spacing: ${state.explodeSpacing}`;
    disconnectButton.hidden = status !== "connected";
    disconnectButton.title = "Disconnect";
    disconnectButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>',
      "Disconnect"
    );
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
    pendingModelingResponses.set(cmd_id, (response) => {
      resolve(response);
    });
    pendingModelingResponseTypes.set(cmd_id, typeof cmd.type === "string" ? cmd.type : "");
    void Promise.resolve(
      state.webView.rtc.send(
        JSON.stringify({
          type: "modeling_cmd_req",
          cmd_id,
          cmd
        })
      )
    ).then((result) => {
      handleIncomingWebSocketResponsePayload(result);
    }).catch((error) => {
      pendingModelingResponses.delete(cmd_id);
      pendingModelingResponseTypes.delete(cmd_id);
      reject(error);
    });
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
        front: "",
        isometric: ""
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
    const fileHandle = await getDirectoryFileHandle(handle, name, true);
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
  const appendErrorsLog = async (messages2) => {
    if (state.source?.kind !== "directory" || !messages2.length) {
      return;
    }
    await appendDirectoryTextFile(
      state.source.handle,
      errorsLogFilename,
      `${messages2.join("\n\n")}
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
  const uint8ArrayFromPayload = (value) => {
    if (value instanceof ArrayBuffer) {
      return new Uint8Array(value);
    }
    if (ArrayBuffer.isView(value)) {
      return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    }
    return null;
  };
  const base64ToUint8Array = (value) => {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  };
  const exportFilesFromResponse = (response) => {
    const files = response.resp?.data?.files ?? response.resp?.data?.modeling_response?.data?.files;
    if (!Array.isArray(files)) {
      return [];
    }
    return files.flatMap((file) => {
      if (!file || typeof file !== "object") {
        return [];
      }
      const record = file;
      const name = typeof record.name === "string" ? record.name : "";
      const contents = record.contents;
      const binaryContents = contents instanceof ArrayBuffer || ArrayBuffer.isView(contents) ? uint8ArrayFromPayload(contents) : null;
      if (!name || typeof contents !== "string" && !binaryContents) {
        return [];
      }
      return [{ name, contents: typeof contents === "string" ? contents : binaryContents }];
    });
  };
  const downloadExportFiles = (files) => {
    for (const file of files) {
      const bytes = typeof file.contents === "string" ? base64ToUint8Array(file.contents) : file.contents;
      deps.downloadFile(file.name, new Blob([bytes]));
    }
  };
  const clearExportReleaseTimer = () => {
    if (exportReleaseTimer) {
      deps.clearTimeout(exportReleaseTimer);
      exportReleaseTimer = 0;
    }
  };
  const finishExportStatus = (message) => {
    clearExportReleaseTimer();
    state.exportInFlight = false;
    state.pendingExportRequestId = "";
    state.exportStatusMessage = message;
    render();
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
  const listDirectoryFilePaths = async (handle, prefix = "") => {
    const paths = [];
    for await (const [name, entry] of handle.entries()) {
      if (name.startsWith(".") || websocketBridgeFilenames.has(name) || entry.kind === "directory" && ignoredDirectoryNames.has(name)) {
        continue;
      }
      if (entry.kind === "directory") {
        paths.push(...await listDirectoryFilePaths(entry, `${prefix}${name}/`));
        continue;
      }
      const path = normalizeExecutionPath(`${prefix}${name}`);
      if (path.endsWith(".kcl")) {
        paths.push(path);
      }
    }
    return paths.sort();
  };
  const directoryFilePathsForSource = async (source) => {
    if (source.kind === "browser-directory") {
      return source.files.map((entry) => normalizeExecutionPath(entry.path)).filter((path) => path.endsWith(".kcl")).sort();
    }
    if (source.kind === "remote-file") {
      return source.files.map((entry) => normalizeExecutionPath(entry.path)).filter((path) => path.endsWith(".kcl")).sort();
    }
    if (source.kind === "directory") {
      return listDirectoryFilePaths(source.handle);
    }
    if (source.kind === "ai-input") {
      return aiInputFilePaths();
    }
    return [];
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
    if (source.kind === "ai-input") {
      return {
        modified: 0,
        input: withInput ? aiInputProjectInput() : ""
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
    if (source.kind === "remote-file") {
      let modified = 0;
      const project = /* @__PURE__ */ new Map();
      for (const entry of source.files) {
        modified = Math.max(modified, entry.modified);
        if (withInput) {
          project.set(entry.path, entry.text);
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
  const clearDiffOwnershipTracking = () => {
    state.diffBodyOwnershipByArtifactId = {};
    state.diffBodyOwnershipSequence = [];
    state.diffObjectOwnershipById = {};
    state.seenObjectIdsInSendOrder = [];
  };
  const scannedExecutionInput = async (source, compareSource = null) => {
    if (!compareSource && state.parameterOverrideInput) {
      return {
        modified: state.lastModified,
        input: cloneExecutionInput(state.parameterOverrideInput)
      };
    }
    const next = await scanSourceOrReset(source, true);
    if (!next) {
      return null;
    }
    if (!compareSource) {
      return next;
    }
    const compareScan = await scanSourceOrReset(compareSource, true);
    if (!compareScan) {
      return null;
    }
    return {
      modified: next.modified,
      input: await buildMergedDiffInput(next.input, compareScan.input)
    };
  };
  const executeScannedSource = async (source, options = {}) => {
    const next = await scannedExecutionInput(source, options.compareSource ?? null);
    if (!next) {
      return void 0;
    }
    if (options.updateLastModified) {
      state.lastModified = next.modified;
    }
    return executeInput(next.input);
  };
  const resumeSourcePollingOrRender = () => {
    if (state.parameterOverrideInput) {
      render();
      return;
    }
    if (!deps.document.hidden && sourceCanPoll(state.source) && (!state.diffEnabled || state.diffCompareSource?.kind === "snapshot")) {
      schedulePoll(1e3);
      return;
    }
    render();
  };
  const runStateExecution = (task, onFinally = render) => {
    state.execution = task();
    render();
    void state.execution.finally(() => {
      state.execution = null;
      onFinally();
    });
  };
  const rerunCurrentSource = () => {
    if (!state.source || !state.executor || state.execution) {
      return;
    }
    clearPoller();
    runStateExecution(
      () => executeScannedSource(state.source, {
        compareSource: state.diffEnabled ? state.diffCompareSource : null,
        updateLastModified: true
      }),
      resumeSourcePollingOrRender
    );
  };
  const schedulePoll = (delay = 1e3) => {
    const diffPollingBlocked = state.diffEnabled && state.diffCompareSource?.kind !== "snapshot";
    if (!state.source || diffPollingBlocked || state.source.kind === "clipboard" || !sourceCanPoll(state.source) || state.parameterOverrideInput || !state.executor || state.execution || deps.document.hidden) {
      render();
      return;
    }
    clearPoller();
    state.pollTimer = deps.setTimeout(async () => {
      state.pollTimer = 0;
      render();
      const nextDiffPollingBlocked = state.diffEnabled && state.diffCompareSource?.kind !== "snapshot";
      if (!state.source || nextDiffPollingBlocked || state.source.kind === "clipboard" || !sourceCanPoll(state.source) || state.parameterOverrideInput || !state.executor || state.execution || deps.document.hidden) {
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
      runStateExecution(
        () => executeScannedSource(state.source, {
          compareSource: state.diffEnabled ? state.diffCompareSource : null
        }),
        resumeSourcePollingOrRender
      );
    }, delay);
    render();
  };
  let allowStartClick = false;
  const clickWebViewStart = () => {
    startButton.click();
  };
  const startConnection = () => {
    if (state.execution || !state.source || state.executor) {
      render();
      return;
    }
    allowStartClick = true;
    clickWebViewStart();
    render();
  };
  const handleReady = (event) => {
    const readyWebView = event.target;
    if (readyWebView && readyWebView !== webView) {
      return;
    }
    const activeWebView = readyWebView ?? webView;
    const nextExecutor = activeWebView.rtc?.executor() ?? null;
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
    activeWebView.rtc?.addEventListener?.("close", state.rtcCloseHandler, {
      once: true
    });
    state.lastModified = 0;
    state.websocketPipeModified = 0;
    replaceKclErrors([]);
    clearExecutionFeedback();
    state.edgeLinesVisible = true;
    state.xrayVisible = false;
    state.xrayMenuVisible = false;
    state.diffEnabled = false;
    state.diffCompareSource = null;
    state.explodeMenuVisible = false;
    state.explodeMode = null;
    state.noUiMode = false;
    resetSceneObjectTracking();
    state.snapshotRefreshing = false;
    clearSelectedFeatureState();
    clearSnapshotUrls();
    clearSnapshotRefresh();
    snapshotRefreshInFlight = false;
    pendingModelingResponses.clear();
    pendingModelingResponseTypes.clear();
    state.executorMessageHandler = (event2) => {
      if (!(event2 instanceof MessageEvent)) {
        return;
      }
      const message = event2.data;
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
        syncAndApplySceneState();
      }
      if (message.from !== "websocket" || message.payload?.type !== "message") {
        return;
      }
      handleIncomingWebSocketResponsePayload(message.payload.data);
    };
    state.executor?.addEventListener?.(state.executorMessageHandler);
    activeWebView.rtc?.send?.(selectionFilterRequest(nextRequestId()));
    if (sourceExecutesImmediately(state.source) && state.executor) {
      runStateExecution(
        () => executeScannedSource(state.source, { updateLastModified: true }),
        render
      );
      return;
    }
    restartBackgroundPollers(0);
  };
  const processModelingCommandResponse = (response) => {
    const exportFiles = exportFilesFromResponse(response);
    const isPendingExportResponse = Boolean(state.pendingExportRequestId) && (response.request_id === state.pendingExportRequestId || response.resp?.type === "export" || response.resp?.data?.modeling_response?.type === "export" || response.resp?.data?.modeling_response?.type === "export2d" || response.resp?.data?.modeling_response?.type === "export3d");
    if (isPendingExportResponse && response.success === false) {
      finishExportStatus("Export failed");
      return;
    }
    if (isPendingExportResponse && exportFiles.length) {
      downloadExportFiles(exportFiles);
      finishExportStatus(
        exportFiles.length === 1 ? `Downloaded ${exportFiles[0].name}` : `Downloaded ${exportFiles.length} files`
      );
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
        pendingModelingResponseTypes.delete(response.request_id);
        pendingModelingResponse(response);
      }
    } else if (response.success && response.resp?.type === "export") {
      const pendingExportEntry = [...pendingModelingResponseTypes.entries()].find(
        ([, type]) => type === "export" || type === "export3d" || type === "export2d"
      );
      if (pendingExportEntry) {
        const [requestId] = pendingExportEntry;
        const pendingModelingResponse = pendingModelingResponses.get(requestId);
        pendingModelingResponses.delete(requestId);
        pendingModelingResponseTypes.delete(requestId);
        pendingModelingResponse?.(response);
      }
    }
    const nextBodyIds = bodyIdsFromWebSocketResponse(response);
    if (nextBodyIds.length) {
      state.pendingBodyArtifactIds.push(...nextBodyIds);
      state.bodyArtifactIds = [...new Set(state.pendingBodyArtifactIds)];
      syncAndApplySceneState();
    }
    if (response.request_id === state.pendingSelectionRequestId) {
      const rawSelectionResponse = response.success && response.resp?.type === "modeling" ? response.resp.data?.modeling_response?.data : null;
      const features = selectedFeaturesForSelectionMode(
        rawSelectionResponse,
        state.selectionMode
      );
      state.pendingSelectionRequestId = "";
      void resolveAndApplySelection(features, rawSelectionResponse);
    }
    if (response.success && response.request_id === state.pendingSolidObjectIdsRequestId && response.resp?.type === "modeling" && response.resp.data?.modeling_response?.type === "scene_get_entity_ids") {
      state.pendingSolidObjectIdsRequestId = "";
      state.solidObjectIds = response.resp.data.modeling_response.data?.entity_ids?.flat().filter(Boolean) ?? [];
      syncAndApplySceneState();
      if (state.diffEnabled && state.diffCompareSource) {
        void syncDiffObjectOwnership();
      }
      queueSnapshotRefresh();
    }
  };
  const handleDecodedWebSocketResponse = (value) => {
    if (!value || typeof value !== "object") {
      return;
    }
    const record = value;
    if ("type" in record && "data" in record && !("resp" in record)) {
      processModelingCommandResponse({
        success: true,
        resp: record
      });
      return;
    }
    processModelingCommandResponse(value);
  };
  const handleIncomingWebSocketResponsePayload = (data) => {
    if (!data) {
      return;
    }
    if (typeof data === "string") {
      try {
        handleDecodedWebSocketResponse(JSON.parse(data));
      } catch {
        return;
      }
      return;
    }
    if (data instanceof Error) {
      return;
    }
    if (data instanceof Blob) {
      void data.arrayBuffer().then((buffer) => {
        try {
          handleDecodedWebSocketResponse(decode(buffer));
        } catch {
          return;
        }
      });
      return;
    }
    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
      const bytes = uint8ArrayFromPayload(data);
      if (!bytes) {
        return;
      }
      try {
        handleDecodedWebSocketResponse(decode(bytes));
      } catch {
        return;
      }
      return;
    }
    if (typeof data === "object") {
      handleDecodedWebSocketResponse(data);
    }
  };
  const associateSource = (source, options = {}) => {
    state.source = source;
    state.originalSourceInput = source.kind === "clipboard" ? source.text : source.kind === "ai-input" ? aiInputProjectInput() : source.kind === "snapshot" ? cloneExecutionInput(source.input) : null;
    state.parameterOverrideInput = null;
    state.exportPopoverVisible = false;
    state.exportInFlight = false;
    state.exportStatusMessage = "";
    state.pendingExportRequestId = "";
    clearExportReleaseTimer();
    state.openVariableStructures.clear();
    state.variableStructureScrollTop = {};
    state.lastExecutionInput = null;
    state.directoryFilePaths = options.directoryFilePaths ?? [];
    state.activeDirectoryFilePath = options.activeDirectoryFilePath ?? "";
    state.disconnectMessage = "";
    state.lastModified = 0;
    state.websocketPipeModified = 0;
    clearExecutionFeedback();
    replaceKclErrors([]);
    if (!state.executor && !state.execution) {
      startConnection();
    } else if (state.executor && !state.execution && sourceExecutesImmediately(source)) {
      runStateExecution(
        () => executeScannedSource(source, { updateLastModified: true }),
        resumeSourcePollingOrRender
      );
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
    clearDiffOwnershipTracking();
    runStateExecution(
      () => executeScannedSource(state.source, {
        compareSource,
        updateLastModified: true
      }),
      resumeSourcePollingOrRender
    );
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
      clearDiffOwnershipTracking();
      runStateExecution(() => executeScannedSource(state.source), resumeSourcePollingOrRender);
      return;
    }
    clearPoller();
    state.xrayVisible = false;
    state.explodeMenuVisible = false;
    state.edgeLinesVisibleBeforeDiff = state.edgeLinesVisible;
    state.edgeLinesVisible = false;
    state.webView?.rtc?.send?.(edgeVisibilityRequest(false));
    state.diffEnabled = true;
    state.xrayMenuVisible = false;
    state.diffCompareSource = null;
    clearDiffOwnershipTracking();
    applyDiffAppearance();
    queueSnapshotRefresh();
    render();
  };
  const syncTokenFromClient = () => {
    if (!usesOAuthAuth) {
      return;
    }
    state.token = client.token ?? "";
  };
  const hasSynchronousAuthentication = () => usesZooCookieAuth || !usesOAuthAuth && Boolean(state.token) || usesOAuthAuth && Boolean(client.token);
  const ensureReadyForAuthenticatedAction = async () => {
    if (hasSynchronousAuthentication()) {
      syncTokenFromClient();
      return true;
    }
    if (usesZooCookieAuth) {
      return true;
    }
    if (!usesOAuthAuth) {
      if (state.token) {
        return true;
      }
      focusAndSelectTokenInput();
      render();
      return false;
    }
    if (client.token) {
      syncTokenFromClient();
      return true;
    }
    if (!client.getAccessToken || !client.authorize) {
      render();
      return false;
    }
    try {
      const accessContext = await client.getAccessToken();
      if (accessContext?.token?.value || client.token) {
        syncTokenFromClient();
        render();
        return true;
      }
    } catch {
    }
    await client.authorize();
    return false;
  };
  const handleStartButtonClick = (event) => {
    if (event.target instanceof Element && event.target.closest(
      "[data-file], [data-directory], [data-ai-input], [data-ai-input-panel]"
    )) {
      return;
    }
    if (allowStartClick) {
      allowStartClick = false;
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    const continueStart = () => {
      if (state.source && !state.executor && !state.execution) {
        startConnection();
        return;
      }
      render();
    };
    if (hasSynchronousAuthentication()) {
      syncTokenFromClient();
      continueStart();
      return;
    }
    void (async () => {
      if (await ensureReadyForAuthenticatedAction()) {
        continueStart();
      }
    })();
  };
  const maskedTokenValue = () => state.token ? `${state.token.slice(0, 8)}${"*".repeat(Math.max(0, state.token.length - 8))}` : "";
  const syncTokenInputValue = (input) => {
    const nextValue = maskedTokenValue();
    if (input.value !== nextValue) {
      input.value = nextValue;
    }
  };
  const setTokenValue = (token) => {
    state.token = token;
    if (state.token) {
      deps.storage.setItem(tokenStorageKey, state.token);
    } else {
      deps.storage.removeItem(tokenStorageKey);
    }
    if (!usesZooCookieAuth) {
      client.token = state.token;
    }
  };
  const handleTokenControlFocus = (input) => {
    input.select();
  };
  const focusAndSelectTokenInput = () => {
    tokenInput.focus();
    tokenInput.select();
  };
  const focusTokenInputAtEnd = (input) => {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  };
  const handleTokenControlBeforeInput = (input, event) => {
    if (event.inputType === "insertFromPaste") {
      return;
    }
    if (event.inputType !== "insertText" && event.inputType !== "deleteContentBackward" && event.inputType !== "deleteContentForward") {
      return;
    }
    event.preventDefault();
    const replaceAll = input.selectionStart === 0 && input.selectionEnd === input.value.length;
    if (event.inputType === "insertText") {
      const next = event.data ?? "";
      setTokenValue(replaceAll ? next : `${state.token}${next}`);
    } else {
      setTokenValue(replaceAll ? "" : state.token.slice(0, -1));
    }
    render();
    focusTokenInputAtEnd(input);
  };
  const handleTokenControlPaste = (input, event) => {
    event.preventDefault();
    const next = event.clipboardData?.getData("text").trim() ?? "";
    if (!next) {
      return;
    }
    const replaceAll = input.selectionStart === 0 && input.selectionEnd === input.value.length;
    setTokenValue(replaceAll ? next : `${state.token}${next}`);
    render();
    focusTokenInputAtEnd(input);
  };
  const handleTokenFocus = () => handleTokenControlFocus(tokenInput);
  const handleTokenBeforeInput = (event) => handleTokenControlBeforeInput(tokenInput, event);
  const handleTokenPaste = (event) => handleTokenControlPaste(tokenInput, event);
  const handleAiInputTokenFocus = () => handleTokenControlFocus(aiInputTokenInput);
  const handleAiInputTokenBeforeInput = (event) => handleTokenControlBeforeInput(aiInputTokenInput, event);
  const handleAiInputTokenPaste = (event) => handleTokenControlPaste(aiInputTokenInput, event);
  const handleKclErrorClick = () => {
    if (!state.kclErrorLocations.length) {
      return;
    }
    void deps.writeClipboardText(state.kclErrorLocations.join("\n"));
  };
  const setActiveDirectoryFilePath = (nextPath) => {
    if (!isDirectorySourceSelection(state.source)) {
      return;
    }
    if (!nextPath || nextPath === state.activeDirectoryFilePath) {
      render();
      return;
    }
    state.activeDirectoryFilePath = nextPath;
    if (state.execution) {
      const pendingExecution = state.execution;
      render();
      void pendingExecution.finally(() => {
        if (state.execution || !state.executor || !isDirectorySourceSelection(state.source) || state.activeDirectoryFilePath !== nextPath) {
          return;
        }
        rerunCurrentSource();
      });
      return;
    }
    if (state.executor) {
      rerunCurrentSource();
      return;
    }
    if (state.source?.kind === "ai-input") {
      startConnection();
      return;
    }
    render();
  };
  const handleDirectoryFileChange = () => {
    setActiveDirectoryFilePath(normalizeExecutionPath(directoryFileSelect.value));
  };
  const handleSelectionRangeClick = () => {
    if (!state.executor) {
      return;
    }
    if (state.selectionOverlayOpen) {
      closeSelectionOverlay();
      return;
    }
    const selectionDisplay = selectionDisplayFromMappings(
      selectedFeatureSourceMappingsFromFeatures(window.zooSelectedFeatures ?? [])
    );
    if (!selectionDisplay.hasSelection) {
      return;
    }
    if (selectionDisplay.targetDirectoryFilePath) {
      directoryFileSelect.value = selectionDisplay.targetDirectoryFilePath;
      setActiveDirectoryFilePath(selectionDisplay.targetDirectoryFilePath);
      return;
    }
    state.selectionOverlayOpen = true;
    render();
  };
  const closeSelectionOverlay = () => {
    if (!state.selectionOverlayOpen) {
      return;
    }
    state.selectionOverlayOpen = false;
    render();
  };
  const handleSelectionOverlayBackdropClick = (event) => {
    if (event.target === selectionOverlay) {
      closeSelectionOverlay();
    }
  };
  const handleRootKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSelectionOverlay();
    }
  };
  const loadPickedSource = async (source) => {
    if (state.diffEnabled && state.source && state.executor) {
      await loadDiffSource(source);
      return;
    }
    const directoryFilePaths = await directoryFilePathsForSource(source);
    associateSource(source, {
      directoryFilePaths,
      activeDirectoryFilePath: defaultDirectoryFilePath(directoryFilePaths)
    });
  };
  const loadRemoteUrlFile = async (url) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      state.remoteLoadStatus = "failed";
      state.remoteLoadError = "Missing fetch value";
      state.remoteLoadUrl = "";
      render();
      return;
    }
    state.remoteLoadStatus = "loading";
    state.remoteLoadError = "";
    state.remoteLoadUrl = trimmedUrl;
    render();
    try {
      const response = await deps.fetch(trimmedUrl);
      if (!response.ok) {
        throw new Error(`Remote file request failed with ${response.status}`);
      }
      const remoteSource = await remoteFilesFromResponse(trimmedUrl, response);
      if (!remoteSource.files.length) {
        throw new Error("Remote file did not contain loadable files");
      }
      state.remoteLoadStatus = "idle";
      state.remoteLoadError = "";
      state.remoteLoadUrl = "";
      state.noUiMode = true;
      await loadPickedSource({
        kind: "remote-file",
        label: remoteSource.label,
        files: remoteSource.files
      });
    } catch (error) {
      state.remoteLoadStatus = "failed";
      state.remoteLoadError = remoteLoadErrorMessage(error, trimmedUrl);
      state.remoteLoadUrl = trimmedUrl;
      render();
    }
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
  directoryFileSelect.addEventListener("change", handleDirectoryFileChange);
  const handleFileButtonClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!usesOAuthAuth && !hasSynchronousAuthentication() && !await ensureReadyForAuthenticatedAction()) {
      return;
    }
    syncTokenFromClient();
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
    if (!usesOAuthAuth && !hasSynchronousAuthentication() && !await ensureReadyForAuthenticatedAction()) {
      return;
    }
    syncTokenFromClient();
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
    if (!usesOAuthAuth && !hasSynchronousAuthentication() && !await ensureReadyForAuthenticatedAction()) {
      return;
    }
    syncTokenFromClient();
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
  const submitAiInputSource = async (options = {}) => {
    commitAiInputPathDraft();
    const aiInputHasContent = [...aiInputProjectInput().values()].some((text) => text.trim());
    if (!aiInputHasContent && !options.allowEmpty) {
      render();
      return;
    }
    if (!usesOAuthAuth && !hasSynchronousAuthentication() && !await ensureReadyForAuthenticatedAction()) {
      return;
    }
    syncTokenFromClient();
    if (state.source?.kind !== "ai-input") {
      await loadPickedSource({
        kind: "ai-input",
        label: "AI input"
      });
      return;
    }
    if (state.execution) {
      const pendingExecution = state.execution;
      render();
      void pendingExecution.finally(() => {
        if (!state.execution && state.source?.kind === "ai-input") {
          rerunCurrentSource();
        }
      });
      return;
    }
    if (state.executor) {
      rerunCurrentSource();
      return;
    }
    if (state.source?.kind === "ai-input" && options.retryConnection) {
      startConnection();
      return;
    }
    render();
  };
  const handleAiInputButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.aiInputVisible = true;
    state.aiInputContextAcknowledged = false;
    render();
    aiInputUnderstandButton.focus();
  };
  const handleAiInputUnderstandClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.aiInputContextAcknowledged = true;
    render();
    aiInputTextArea.focus();
  };
  const handleAiInputCancelClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.aiInputVisible = false;
    state.aiInputContextAcknowledged = false;
    render();
    aiInputButton.focus();
  };
  const handleAiInputChange = () => {
    state.aiInputText = aiInputTextArea.value;
    state.aiInputFiles.set(state.activeAiInputPath, state.aiInputText);
    render();
  };
  const handleAiInputPathInput = () => {
    state.aiInputPathDraft = aiInputPathInput.value;
  };
  const handleAiInputPathChange = () => {
    commitAiInputPathDraft();
    render();
  };
  const handleAiInputAddFileClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    commitAiInputPathDraft();
    state.aiInputFiles.set(state.activeAiInputPath, state.aiInputText);
    const nextPath = nextAiInputPath();
    state.aiInputFiles.set(nextPath, "");
    state.activeAiInputPath = nextPath;
    state.aiInputPathDraft = nextPath;
    state.aiInputText = "";
    render();
    aiInputTextArea.focus();
  };
  const handleAiInputDeleteFileClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    commitAiInputPathDraft();
    const paths = aiInputFilePaths();
    if (paths.length <= 1) {
      render();
      return;
    }
    const deletedPath = state.activeAiInputPath;
    state.aiInputFiles.delete(deletedPath);
    const nextPath = paths.find((path) => path !== deletedPath && path === "main.kcl") ?? paths.find((path) => path !== deletedPath) ?? "main.kcl";
    state.activeAiInputPath = nextPath;
    state.aiInputPathDraft = nextPath;
    state.aiInputText = state.aiInputFiles.get(nextPath) ?? "";
    render();
    aiInputTextArea.focus();
  };
  const handleAiInputFileSelectChange = () => {
    selectAiInputPath(aiInputFileSelect.value);
    aiInputTextArea.focus();
  };
  const handleAiInputContinueClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    commitAiInputPathDraft();
    void submitAiInputSource({ allowEmpty: true, retryConnection: true });
  };
  const sceneFocusTarget = () => webView.el.querySelector("video") ?? webView.el.querySelector("canvas") ?? webView.el;
  const focusSceneSurface = () => {
    const target = sceneFocusTarget();
    if (!target.hasAttribute("tabindex")) {
      target.tabIndex = -1;
    }
    target.focus({ preventScroll: true });
    return target;
  };
  const sendTouchModelingCommand = (cmd) => {
    const channel = state.webView?.rtc?.channel;
    if (channel?.readyState && channel.readyState !== "open") {
      return;
    }
    channel?.send?.(
      JSON.stringify({
        type: "modeling_cmd_req",
        cmd_id: "00000000-0000-0000-0000-000000000000",
        cmd
      })
    );
  };
  const touchPointFrom = (touch, surface) => {
    const rect = surface.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  };
  const touchCenter = (points) => ({
    x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.y, 0) / points.length
  });
  const touchDistance = (points) => points.length < 2 ? 0 : Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  const endTouchCameraDrag = () => {
    if (!touchGesture) {
      return;
    }
    sendTouchModelingCommand({
      type: "camera_drag_end",
      interaction: touchGesture.interaction,
      window: touchGesture.lastCenter
    });
    touchGesture = null;
  };
  const startTouchCameraDrag = (type, center, distance) => {
    endTouchCameraDrag();
    const interaction = type === "rotate" ? "rotatetrackball" : "pan";
    touchGesture = {
      type,
      interaction,
      lastCenter: center,
      lastDistance: distance
    };
    sendTouchModelingCommand({
      type: "camera_drag_start",
      interaction,
      window: center
    });
  };
  const updateTouchCameraGesture = () => {
    const points = Array.from(touchPoints.values());
    if (points.length === 0) {
      endTouchCameraDrag();
      return;
    }
    const nextType = points.length === 1 ? "rotate" : "pan";
    const center = touchCenter(points);
    const distance = touchDistance(points);
    if (!touchGesture || touchGesture.type !== nextType) {
      startTouchCameraDrag(nextType, center, distance);
      return;
    }
    sendTouchModelingCommand({
      type: "camera_drag_move",
      interaction: touchGesture.interaction,
      window: center
    });
    if (nextType === "pan" && distance > 0 && touchGesture.lastDistance > 0) {
      const distanceDelta = distance - touchGesture.lastDistance;
      if (Math.abs(distanceDelta) >= 1) {
        sendTouchModelingCommand({
          type: "default_camera_zoom",
          magnitude: distanceDelta * window.devicePixelRatio * 2.5
        });
      }
    }
    touchGesture.lastCenter = center;
    touchGesture.lastDistance = distance;
  };
  const handleSceneTouchStart = (event) => {
    if (event.target instanceof Element && event.target.closest(".start, .logo-actions, .browser-banner, .ai-input-panel")) {
      return;
    }
    event.preventDefault();
    scenePointerDown = null;
    focusSceneSurface();
    const surface = sceneFocusTarget();
    for (const touch of Array.from(event.changedTouches)) {
      touchPoints.set(touch.identifier, touchPointFrom(touch, surface));
    }
    updateTouchCameraGesture();
  };
  const handleSceneTouchMove = (event) => {
    if (!touchPoints.size) {
      return;
    }
    event.preventDefault();
    const surface = sceneFocusTarget();
    for (const touch of Array.from(event.changedTouches)) {
      if (touchPoints.has(touch.identifier)) {
        touchPoints.set(touch.identifier, touchPointFrom(touch, surface));
      }
    }
    updateTouchCameraGesture();
  };
  const handleSceneTouchEnd = (event) => {
    if (!touchPoints.size) {
      return;
    }
    event.preventDefault();
    for (const touch of Array.from(event.changedTouches)) {
      touchPoints.delete(touch.identifier);
    }
    updateTouchCameraGesture();
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
  const handleSnapshotToggleClick = () => {
    handleSnapshotRailToggle();
  };
  const selectionFocusObjectId = (features) => features.find((feature) => feature.objectId)?.objectId ?? features.find((feature) => feature.type === "solid3d")?.uuid ?? null;
  const focusCameraOnSelection = (features) => {
    const objectId = selectionFocusObjectId(features);
    if (!objectId) {
      return;
    }
    const cameraSettingsFromResponse = (response) => response.success && response.resp?.type === "modeling" && response.resp.data?.modeling_response?.type === "default_camera_get_settings" ? response.resp.data.modeling_response.data?.settings ?? null : null;
    const centerFromBoundingBoxResponse = (response) => response.success && response.resp?.type === "modeling" && response.resp.data?.modeling_response?.type === "bounding_box" ? response.resp.data.modeling_response.data?.center ?? null : null;
    void (async () => {
      try {
        const [cameraResponse, boundingBoxResponse] = await Promise.all([
          requestModelingResponse({
            type: "default_camera_get_settings"
          }),
          requestModelingResponse({
            type: "bounding_box",
            entity_ids: [objectId]
          })
        ]);
        const cameraSettings = cameraSettingsFromResponse(cameraResponse);
        const selectionCenter = centerFromBoundingBoxResponse(boundingBoxResponse);
        if (cameraSettings?.pos && cameraSettings.up && selectionCenter) {
          await requestModelingResponse({
            type: "default_camera_look_at",
            vantage: cameraSettings.pos,
            center: selectionCenter,
            up: cameraSettings.up
          });
          return;
        }
      } catch {
      }
      try {
        await requestModelingResponse({
          type: "default_camera_center_to_selection",
          camera_movement: "none"
        });
      } catch {
      }
    })();
  };
  const handleScenePointerDown = (event) => {
    scenePointerDown = null;
    if (event.pointerType === "touch" || event.button !== 0) {
      return;
    }
    if (event.target instanceof Element && event.target.closest(".start, .logo-actions, .browser-banner, .ai-input-panel")) {
      return;
    }
    const selectionSurface = focusSceneSurface();
    const rect = selectionSurface.getBoundingClientRect();
    scenePointerDown = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      pointerId: event.pointerId
    };
  };
  const handleScenePointerUp = (event) => {
    const pointerDown = scenePointerDown;
    scenePointerDown = null;
    if (event.pointerType === "touch" || event.button !== 0 || !pointerDown || pointerDown.pointerId !== event.pointerId || !state.executor || !state.webView?.rtc?.send) {
      return;
    }
    const framebufferSource = sceneFocusTarget();
    const rect = framebufferSource.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    const movement = Math.hypot(point.x - pointerDown.x, point.y - pointerDown.y);
    if (movement > 4) {
      return;
    }
    const framebufferWidth = framebufferSource instanceof HTMLVideoElement ? framebufferSource.videoWidth || framebufferSource.clientWidth : framebufferSource?.clientWidth ?? 0;
    const framebufferHeight = framebufferSource instanceof HTMLVideoElement ? framebufferSource.videoHeight || framebufferSource.clientHeight : framebufferSource?.clientHeight ?? 0;
    const scaleX = rect.width > 0 && framebufferWidth > 0 ? framebufferWidth / rect.width : 1;
    const scaleY = rect.height > 0 && framebufferHeight > 0 ? framebufferHeight / rect.height : 1;
    const cmd_id = nextRequestId();
    state.pendingSelectionRequestId = cmd_id;
    void (async () => {
      await state.webView.rtc.send(selectionFilterRequest(nextRequestId()));
      const response = await state.webView.rtc.send(
        JSON.stringify({
          type: "modeling_cmd_req",
          cmd_id,
          cmd: {
            type: "select_with_point",
            selected_at_window: {
              x: Math.round(point.x * scaleX),
              y: Math.round(point.y * scaleY)
            },
            selection_type: "replace"
          }
        })
      );
      const parsedResponse = modelingResponseFromRtcSend(response);
      if (parsedResponse.success && parsedResponse.resp?.type === "modeling" && parsedResponse.resp.data?.modeling_response?.type === "select_with_point") {
        const selectWithPointData = parsedResponse.resp.data?.modeling_response?.data;
        const selectWithPointFeatures = selectedFeaturesForSelectionMode(
          selectWithPointData,
          state.selectionMode
        );
        let selectionGetData = null;
        let selectionGetFeatures = [];
        const selectionGetResponse = await state.webView.rtc.send(
          JSON.stringify({
            type: "modeling_cmd_req",
            cmd_id: nextRequestId(),
            cmd: {
              type: "select_get"
            }
          })
        );
        const parsedSelectionGet = modelingResponseFromRtcSend(selectionGetResponse);
        if (parsedSelectionGet?.success && parsedSelectionGet.resp?.type === "modeling" && parsedSelectionGet.resp.data?.modeling_response?.type === "select_get") {
          selectionGetData = parsedSelectionGet.resp.data?.modeling_response?.data;
          selectionGetFeatures = selectedFeaturesForSelectionMode(
            selectionGetData,
            state.selectionMode
          );
        }
        state.pendingSelectionRequestId = "";
        await resolveAndApplySelection(
          preferredSelectionFeatures(selectWithPointFeatures, selectionGetFeatures),
          {
            selectWithPoint: selectWithPointData,
            selectWithPointResolved: selectWithPointFeatures,
            selectGet: selectionGetData,
            selectGetResolved: selectionGetFeatures
          }
        );
      }
    })();
  };
  const handleScenePointerCancel = (event) => {
    if (scenePointerDown?.pointerId === event.pointerId) {
      scenePointerDown = null;
    }
  };
  const unmountWebView = () => {
    state.executor?.removeEventListener?.(state.executorMessageHandler);
    state.executorMessageHandler = null;
    state.webView?.rtc?.removeEventListener?.("close", state.rtcCloseHandler);
    state.rtcCloseHandler = null;
    pendingModelingResponses.clear();
    pendingModelingResponseTypes.clear();
    snapshotRefreshInFlight = false;
    clearSnapshotRefresh();
    clearExportReleaseTimer();
    endTouchCameraDrag();
    touchPoints.clear();
    startButton.removeEventListener("click", handleStartButtonClick, { capture: true });
    webView.removeEventListener("ready", handleReady);
    webView.el.removeEventListener("pointerdown", handleScenePointerDown);
    webView.el.removeEventListener("pointerup", handleScenePointerUp);
    webView.el.removeEventListener("pointercancel", handleScenePointerCancel);
    webView.el.removeEventListener("touchstart", handleSceneTouchStart);
    webView.el.removeEventListener("touchmove", handleSceneTouchMove);
    webView.el.removeEventListener("touchend", handleSceneTouchEnd);
    webView.el.removeEventListener("touchcancel", handleSceneTouchEnd);
    fileButton.removeEventListener("click", handleFileButtonClick);
    directoryButton.removeEventListener("click", handleDirectoryButtonClick);
    aiInputButton.removeEventListener("click", handleAiInputButtonClick);
    aiInputCancelButton.removeEventListener("click", handleAiInputCancelClick);
    aiInputUnderstandButton.removeEventListener("click", handleAiInputUnderstandClick);
    aiInputTextArea.removeEventListener("input", handleAiInputChange);
    aiInputPathInput.removeEventListener("input", handleAiInputPathInput);
    aiInputPathInput.removeEventListener("change", handleAiInputPathChange);
    aiInputAddButton.removeEventListener("click", handleAiInputAddFileClick);
    aiInputDeleteButton.removeEventListener("click", handleAiInputDeleteFileClick);
    aiInputFileSelect.removeEventListener("change", handleAiInputFileSelectChange);
    aiInputTokenInput.removeEventListener("focus", handleAiInputTokenFocus);
    aiInputTokenInput.removeEventListener("beforeinput", handleAiInputTokenBeforeInput);
    aiInputTokenInput.removeEventListener("paste", handleAiInputTokenPaste);
    aiInputContinueButton.removeEventListener("click", handleAiInputContinueClick);
    regularFileInput.removeEventListener("change", handleRegularFileInputChange);
    regularDirectoryInput.removeEventListener("change", handleRegularDirectoryInputChange);
    aiInputPanel.remove();
    regularFileInput.remove();
    regularDirectoryInput.remove();
  };
  const stopCurrentWebViewSession = () => {
    state.executor?.removeEventListener?.(state.executorMessageHandler);
    state.executorMessageHandler = null;
    state.webView?.rtc?.removeEventListener?.("close", state.rtcCloseHandler);
    state.rtcCloseHandler = null;
    pendingModelingResponses.clear();
    pendingModelingResponseTypes.clear();
    endTouchCameraDrag();
    touchPoints.clear();
    void webView.deconstructor?.();
  };
  const mountWebView = () => {
    webView = deps.createWebView({
      zooClient: client,
      size
    });
    state.webView = webView;
    webView.el.style.overflow = "hidden";
    viewer.replaceChildren(webView.el);
    startButton = webView.el.querySelector(".start");
    const startIcon = startButton.querySelector("svg");
    picker = deps.document.createElement("div");
    pickerLabel = deps.document.createElement("div");
    pickerActions = deps.document.createElement("div");
    directoryButton = deps.document.createElement("button");
    fileButton = deps.document.createElement("button");
    aiInputButton = deps.document.createElement("button");
    remoteLoadStatus = deps.document.createElement("div");
    aiInputPanel = deps.document.createElement("div");
    aiInputContext = deps.document.createElement("div");
    aiInputModeTitle = deps.document.createElement("h2");
    aiInputModeHint = deps.document.createElement("p");
    aiInputContextTitle = deps.document.createElement("h2");
    aiInputContextText = deps.document.createElement("pre");
    aiInputContextActions = deps.document.createElement("div");
    aiInputCancelButton = deps.document.createElement("button");
    aiInputUnderstandButton = deps.document.createElement("button");
    aiInputTextArea = deps.document.createElement("textarea");
    aiInputFileControls = deps.document.createElement("div");
    aiInputPathInput = deps.document.createElement("input");
    aiInputAddButton = deps.document.createElement("button");
    aiInputDeleteButton = deps.document.createElement("button");
    aiInputFileSelect = deps.document.createElement("select");
    aiInputActions = deps.document.createElement("div");
    aiInputTokenInput = deps.document.createElement("input");
    aiInputContinueButton = deps.document.createElement("button");
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
    pickerLabel.className = "logo-actions-label";
    pickerLabel.textContent = "Load from:";
    pickerActions.className = "logo-actions-buttons";
    directoryButton.type = "button";
    directoryButton.dataset.directory = "";
    directoryButton.className = "icon-button";
    directoryButton.setAttribute("aria-label", "Load project");
    directoryButton.title = "Load project";
    directoryButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
      "Project"
    );
    fileButton.type = "button";
    fileButton.dataset.file = "";
    fileButton.className = "icon-button";
    fileButton.setAttribute("aria-label", "Load KCL file");
    fileButton.title = "Load KCL file";
    fileButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
      "File"
    );
    fileButton.dataset.pulse = "true";
    aiInputButton.type = "button";
    aiInputButton.dataset.aiInput = "";
    aiInputButton.dataset.aiLoader = "";
    aiInputButton.className = "icon-button";
    aiInputButton.setAttribute("aria-label", "Clipboard mode");
    aiInputButton.title = "Clipboard mode";
    aiInputButton.innerHTML = labeledIconMarkup(
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M8.4 10h7.2M8.4 13h7.2M8.4 16h4.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.35"/></svg>',
      "Clipboard"
    );
    remoteLoadStatus.className = "remote-load-status";
    remoteLoadStatus.dataset.remoteLoadStatus = "";
    remoteLoadStatus.hidden = true;
    aiInputPanel.className = "ai-input-panel";
    aiInputPanel.hidden = true;
    aiInputPanel.dataset.aiInputPanel = "";
    aiInputContext.className = "ai-skill-context";
    aiInputContext.dataset.aiSkillContext = "";
    aiInputModeTitle.className = "ai-input-mode-title";
    aiInputModeTitle.textContent = "Clipboard mode";
    aiInputModeHint.className = "ai-input-mode-hint";
    aiInputModeHint.textContent = "Press I understand to continue - below is to help AI users, and can be ignored by humans.";
    aiInputContextTitle.className = "ai-skill-context-title";
    aiInputContextTitle.textContent = "AI Context";
    aiInputContextText.className = "ai-skill-context-text";
    aiInputContextText.textContent = aiSkillContext;
    aiInputContextActions.className = "ai-skill-context-actions";
    aiInputCancelButton.type = "button";
    aiInputCancelButton.className = "ai-input-cancel";
    aiInputCancelButton.textContent = "Cancel";
    aiInputCancelButton.setAttribute("aria-label", "Cancel AI skill context");
    aiInputUnderstandButton.type = "button";
    aiInputUnderstandButton.className = "ai-input-understand";
    aiInputUnderstandButton.textContent = "I understand";
    aiInputUnderstandButton.setAttribute("aria-label", "I understand AI skill context");
    aiInputContextActions.append(aiInputCancelButton, aiInputUnderstandButton);
    aiInputContext.append(
      aiInputModeTitle,
      aiInputModeHint,
      aiInputContextTitle,
      aiInputContextText,
      aiInputContextActions
    );
    aiInputTextArea.className = "ai-input-text";
    aiInputTextArea.spellcheck = false;
    aiInputTextArea.placeholder = "KCL for the selected project file";
    aiInputTextArea.setAttribute("aria-label", "AI KCL input");
    aiInputTextArea.rows = 1;
    aiInputFileControls.className = "ai-input-file-controls";
    aiInputPathInput.className = "ai-input-path";
    aiInputPathInput.type = "text";
    aiInputPathInput.autocomplete = "off";
    aiInputPathInput.spellcheck = false;
    aiInputPathInput.placeholder = "main.kcl";
    aiInputPathInput.setAttribute("aria-label", "AI project file path");
    aiInputAddButton.type = "button";
    aiInputAddButton.className = "ai-input-file-button";
    aiInputAddButton.textContent = "+";
    aiInputAddButton.title = "Add project file";
    aiInputAddButton.setAttribute("aria-label", "Add AI project file");
    aiInputDeleteButton.type = "button";
    aiInputDeleteButton.className = "ai-input-file-button";
    aiInputDeleteButton.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4.5h6M8.4 4.5l.45-1h2.3l.45 1M5.5 6.5h9M7 6.5l.45 9h5.1l.45-9M9 8.8v4.7M11 8.8v4.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35"/></svg>';
    aiInputDeleteButton.title = "Delete current project file";
    aiInputDeleteButton.setAttribute("aria-label", "Delete AI project file");
    aiInputFileControls.append(aiInputPathInput, aiInputAddButton, aiInputDeleteButton);
    aiInputFileSelect.className = "ai-input-file-select";
    aiInputFileSelect.setAttribute("aria-label", "Select AI project file");
    aiInputActions.className = "ai-input-actions";
    aiInputTokenInput.className = "ai-input-token";
    aiInputTokenInput.type = "text";
    aiInputTokenInput.autocomplete = "off";
    aiInputTokenInput.placeholder = "Zoo API key";
    aiInputTokenInput.setAttribute("aria-label", "Zoo API key");
    aiInputContinueButton.type = "button";
    aiInputContinueButton.className = "ai-input-continue";
    aiInputContinueButton.textContent = "Execute";
    aiInputContinueButton.setAttribute("aria-label", "Execute AI KCL input");
    aiInputActions.append(aiInputContinueButton, aiInputTokenInput);
    aiInputPanel.append(
      aiInputContext,
      aiInputTextArea,
      aiInputFileControls,
      aiInputFileSelect,
      aiInputActions
    );
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
    pickerActions.append(directoryButton, fileButton, aiInputButton);
    picker.append(pickerLabel, pickerActions, remoteLoadStatus);
    startButton.append(picker);
    root2.append(aiInputPanel);
    startButton.append(browserBanner);
    root2.append(regularFileInput, regularDirectoryInput);
    startButton.addEventListener("click", handleStartButtonClick, { capture: true });
    webView.el.addEventListener("pointerdown", handleScenePointerDown);
    webView.el.addEventListener("pointerup", handleScenePointerUp);
    webView.el.addEventListener("pointercancel", handleScenePointerCancel);
    webView.el.addEventListener("touchstart", handleSceneTouchStart, { passive: false });
    webView.el.addEventListener("touchmove", handleSceneTouchMove, { passive: false });
    webView.el.addEventListener("touchend", handleSceneTouchEnd, { passive: false });
    webView.el.addEventListener("touchcancel", handleSceneTouchEnd, { passive: false });
    webView.addEventListener("ready", handleReady);
    fileButton.addEventListener("click", handleFileButtonClick);
    directoryButton.addEventListener("click", handleDirectoryButtonClick);
    aiInputButton.addEventListener("click", handleAiInputButtonClick);
    aiInputCancelButton.addEventListener("click", handleAiInputCancelClick);
    aiInputUnderstandButton.addEventListener("click", handleAiInputUnderstandClick);
    aiInputTextArea.addEventListener("input", handleAiInputChange);
    aiInputPathInput.addEventListener("input", handleAiInputPathInput);
    aiInputPathInput.addEventListener("change", handleAiInputPathChange);
    aiInputAddButton.addEventListener("click", handleAiInputAddFileClick);
    aiInputDeleteButton.addEventListener("click", handleAiInputDeleteFileClick);
    aiInputFileSelect.addEventListener("change", handleAiInputFileSelectChange);
    aiInputTokenInput.addEventListener("focus", handleAiInputTokenFocus);
    aiInputTokenInput.addEventListener("beforeinput", handleAiInputTokenBeforeInput);
    aiInputTokenInput.addEventListener("paste", handleAiInputTokenPaste);
    aiInputContinueButton.addEventListener("click", handleAiInputContinueClick);
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
    stopCurrentWebViewSession();
    unmountWebView();
    state.execution = null;
    state.executor = null;
    state.source = null;
    state.originalSourceInput = null;
    state.parameterOverrideInput = null;
    state.exportPopoverVisible = false;
    state.exportInFlight = false;
    state.exportStatusMessage = "";
    state.pendingExportRequestId = "";
    clearExportReleaseTimer();
    state.openVariableStructures.clear();
    state.variableStructureScrollTop = {};
    state.lastExecutionInput = null;
    state.disconnectMessage = disconnectMessage;
    state.lastModified = 0;
    state.websocketPipeModified = 0;
    replaceKclErrors([]);
    clearExecutionFeedback();
    state.edgeLinesVisible = true;
    state.xrayVisible = false;
    state.xrayMenuVisible = false;
    state.diffEnabled = false;
    state.diffCompareSource = null;
    state.explodeMenuVisible = false;
    state.explodeMode = null;
    resetSceneObjectTracking();
    state.snapshotRefreshing = false;
    clearSnapshotUrls();
    clearSnapshotRefresh();
    snapshotRefreshInFlight = false;
    clearSelectedFeatureState();
    mountWebView();
    render();
  };
  const handleDisconnect = () => {
    resetToLauncherState(defaultDisconnectMessage);
  };
  const setSelectionMode = (mode) => {
    if (state.selectionMode === mode) {
      render();
      return;
    }
    state.selectionMode = mode;
    clearSelectedFeatureState();
    if (state.executor) {
      state.webView?.rtc?.send?.(selectionFilterRequest(nextRequestId()));
    }
    render();
  };
  const handleSelectionModeBody = () => {
    setSelectionMode("body");
  };
  const handleSelectionModeFeature = () => {
    setSelectionMode("feature");
  };
  const closeSecondarySceneMenus = (except = null) => {
    if (except !== "explode") {
      state.explodeMenuVisible = false;
    }
    if (except !== "xray") {
      state.xrayMenuVisible = false;
    }
  };
  const handleEdgesToggle = () => {
    if (!state.executor) {
      return;
    }
    state.edgeLinesVisible = !state.edgeLinesVisible;
    state.webView?.rtc?.send?.(edgeVisibilityRequest(state.edgeLinesVisible));
    render();
  };
  const handleXrayToggle = () => {
    if (!state.executor) {
      return;
    }
    if (state.xrayVisible && !state.xrayMenuVisible) {
      closeSecondarySceneMenus("xray");
      state.xrayMenuVisible = true;
      render();
      return;
    }
    if (!state.xrayVisible) {
      closeSecondarySceneMenus("xray");
      state.xrayMenuVisible = true;
    } else {
      state.xrayMenuVisible = false;
    }
    state.xrayVisible = !state.xrayVisible;
    applyXrayAppearance();
    queueSnapshotRefresh();
    render();
  };
  const handleXrayOpacityInput = () => {
    const opacity = Number(xrayOpacityInput.value);
    state.xrayOpacity = Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 0.22;
    if (state.xrayVisible) {
      applyXrayAppearance();
    }
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
      closeSecondarySceneMenus("explode");
      state.explodeMenuVisible = true;
    }
    render();
  };
  const toggleExplodeMode = (mode) => {
    if (!state.executor) {
      return;
    }
    closeSecondarySceneMenus("explode");
    state.explodeMenuVisible = true;
    state.explodeMode = state.explodeMode === mode ? null : mode;
    applyExplodedView();
    queueSnapshotRefresh();
    render();
  };
  const handleHorizontalExplodeToggle = () => {
    toggleExplodeMode("horizontal");
  };
  const handleVerticalExplodeToggle = () => {
    toggleExplodeMode("vertical");
  };
  const handleRadialExplodeToggle = () => {
    toggleExplodeMode("radial");
  };
  const handleGridExplodeToggle = () => {
    toggleExplodeMode("grid");
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
  const handleTopSnapshotClick = () => {
    handleSnapshotCardClick("top");
  };
  const handleProfileSnapshotClick = () => {
    handleSnapshotCardClick("profile");
  };
  const handleFrontSnapshotClick = () => {
    handleSnapshotCardClick("front");
  };
  const handleIsometricSnapshotClick = () => {
    handleSnapshotCardClick("isometric");
  };
  const handleSnapshotRailToggle = () => {
    state.snapshotRailVisible = !state.snapshotRailVisible;
    render();
  };
  const handleNoUiToggle = () => {
    state.noUiMode = !state.noUiMode;
    render();
  };
  const handleParametersToggle = () => {
    state.parametersVisible = !state.parametersVisible;
    render();
  };
  const handleExportToggle = () => {
    if (!state.executor) {
      return;
    }
    state.exportPopoverVisible = !state.exportPopoverVisible;
    state.exportStatusMessage = "";
    render();
  };
  const handleExportOptionClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.exportFormat) {
      return;
    }
    const format = target.dataset.exportFormat;
    if (!state.executor || !state.webView?.rtc?.send || state.exportInFlight) {
      return;
    }
    state.exportInFlight = true;
    state.exportStatusMessage = `Exporting ${format.toUpperCase()}...`;
    render();
    const cmd_id = nextRequestId();
    state.pendingExportRequestId = cmd_id;
    clearExportReleaseTimer();
    exportReleaseTimer = deps.setTimeout(() => {
      if (state.pendingExportRequestId !== cmd_id) {
        return;
      }
      state.exportInFlight = false;
      state.exportStatusMessage = `${format.toUpperCase()} export requested`;
      render();
    }, 1500);
    void Promise.resolve(
      state.webView.rtc.send(
        JSON.stringify({
          type: "modeling_cmd_req",
          cmd_id,
          cmd: {
            type: "export3d",
            entity_ids: [],
            format: outputFormatForExport(format)
          }
        })
      )
    ).then((result) => {
      handleIncomingWebSocketResponsePayload(result);
    }).catch(() => {
      clearExportReleaseTimer();
      state.pendingExportRequestId = "";
      state.exportInFlight = false;
      state.exportStatusMessage = "Export failed";
      render();
    });
  };
  const handleParameterInput = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !("parameterRange" in target.dataset)) {
      return;
    }
    const valueInput = [...parametersList.querySelectorAll("[data-parameter-value]")].find(
      (input) => input.dataset.parameterName === target.dataset.parameterName && input.dataset.parameterPath === target.dataset.parameterPath
    );
    if (valueInput) {
      valueInput.value = target.value;
    }
  };
  const handleParameterChange = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !("parameterRange" in target.dataset) && !("parameterValue" in target.dataset) && !("parameterCheckbox" in target.dataset)) {
      return;
    }
    const entry = parameterEntryForControl(target);
    const nextValue = "parameterCheckbox" in target.dataset ? target.checked : Number(target.value);
    if (!entry || entry.kind === "number" && (typeof nextValue !== "number" || !Number.isFinite(nextValue))) {
      render();
      return;
    }
    applyParameterValue(entry, nextValue);
  };
  const handleVariableStructureToggle = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLDetailsElement) || !("variableStructure" in target.dataset)) {
      return;
    }
    const name = target.dataset.parameterName;
    const path = target.dataset.parameterPath;
    if (!name || !path) {
      return;
    }
    const key = variableStructureKey(name, path);
    if (target.open) {
      state.openVariableStructures.add(key);
    } else {
      state.openVariableStructures.delete(key);
    }
  };
  const handleVariableStructureScroll = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLPreElement)) {
      return;
    }
    const details = target.closest("[data-variable-structure]");
    const name = details?.dataset.parameterName;
    const path = details?.dataset.parameterPath;
    if (!name || !path) {
      return;
    }
    state.variableStructureScrollTop[variableStructureKey(name, path)] = target.scrollTop;
  };
  mountWebView();
  deps.document.addEventListener("visibilitychange", handleVisibilityChange);
  root2.addEventListener("keydown", handleRootKeyDown);
  kclError.addEventListener("click", handleKclErrorClick);
  edgesButton.addEventListener("click", handleEdgesToggle);
  xrayButton.addEventListener("click", handleXrayToggle);
  xrayOpacityInput.addEventListener("input", handleXrayOpacityInput);
  selectionRangeValue.addEventListener("click", handleSelectionRangeClick);
  selectionOverlay.addEventListener("click", handleSelectionOverlayBackdropClick);
  selectionOverlayClose.addEventListener("click", closeSelectionOverlay);
  selectionModeBodyButton.addEventListener("click", handleSelectionModeBody);
  selectionModeFeatureButton.addEventListener("click", handleSelectionModeFeature);
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
  noUiToggleButton.addEventListener("click", handleNoUiToggle);
  parametersToggleButton.addEventListener("click", handleParametersToggle);
  exportToggleButton.addEventListener("click", handleExportToggle);
  exportOptions.addEventListener("click", handleExportOptionClick);
  parametersList.addEventListener("input", handleParameterInput);
  parametersList.addEventListener("change", handleParameterChange);
  parametersList.addEventListener("toggle", handleVariableStructureToggle, true);
  parametersList.addEventListener("scroll", handleVariableStructureScroll, true);
  snapshotCards.top.addEventListener("click", handleTopSnapshotClick);
  snapshotCards.profile.addEventListener("click", handleProfileSnapshotClick);
  snapshotCards.front.addEventListener("click", handleFrontSnapshotClick);
  snapshotCards.isometric.addEventListener("click", handleIsometricSnapshotClick);
  snapshotToggleButton.addEventListener("click", handleSnapshotToggleClick);
  disconnectButton.addEventListener("click", handleDisconnect);
  if (usesOAuthAuth && client.isReturningFromAuthServer && client.getAccessToken) {
    void client.isReturningFromAuthServer().then((isReturning) => {
      if (!isReturning) {
        return void 0;
      }
      return client.getAccessToken?.();
    }).then(() => {
      syncTokenFromClient();
      render();
    }).catch(() => {
    });
  }
  render();
  if (initialRemoteUrlFile) {
    void loadRemoteUrlFile(initialRemoteUrlFile);
  }
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
      directoryFileSelect.removeEventListener("change", handleDirectoryFileChange);
      deps.document.removeEventListener("visibilitychange", handleVisibilityChange);
      root2.removeEventListener("keydown", handleRootKeyDown);
      kclError.removeEventListener("click", handleKclErrorClick);
      edgesButton.removeEventListener("click", handleEdgesToggle);
      xrayButton.removeEventListener("click", handleXrayToggle);
      xrayOpacityInput.removeEventListener("input", handleXrayOpacityInput);
      selectionRangeValue.removeEventListener("click", handleSelectionRangeClick);
      selectionOverlay.removeEventListener("click", handleSelectionOverlayBackdropClick);
      selectionOverlayClose.removeEventListener("click", closeSelectionOverlay);
      selectionModeBodyButton.removeEventListener("click", handleSelectionModeBody);
      selectionModeFeatureButton.removeEventListener("click", handleSelectionModeFeature);
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
      noUiToggleButton.removeEventListener("click", handleNoUiToggle);
      parametersToggleButton.removeEventListener("click", handleParametersToggle);
      exportToggleButton.removeEventListener("click", handleExportToggle);
      exportOptions.removeEventListener("click", handleExportOptionClick);
      parametersList.removeEventListener("input", handleParameterInput);
      parametersList.removeEventListener("change", handleParameterChange);
      parametersList.removeEventListener("toggle", handleVariableStructureToggle, true);
      parametersList.removeEventListener("scroll", handleVariableStructureScroll, true);
      snapshotCards.top.removeEventListener("click", handleTopSnapshotClick);
      snapshotCards.profile.removeEventListener("click", handleProfileSnapshotClick);
      snapshotCards.front.removeEventListener("click", handleFrontSnapshotClick);
      snapshotCards.isometric.removeEventListener("click", handleIsometricSnapshotClick);
      snapshotToggleButton.removeEventListener("click", handleSnapshotToggleClick);
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
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
