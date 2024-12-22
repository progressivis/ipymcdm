var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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

// ../../DensityMaps/dist/densityMaps.js
var require_densityMaps = __commonJS({
  "../../DensityMaps/dist/densityMaps.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["DensityMaps"] = factory();
      else
        root["DensityMaps"] = factory();
    })(self, () => {
      return (
        /******/
        (() => {
          "use strict";
          var __webpack_modules__ = {
            /***/
            "./node_modules/fast-png/lib-esm/PngDecoder.js": (
              /*!*****************************************************!*\
                !*** ./node_modules/fast-png/lib-esm/PngDecoder.js ***!
                \*****************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  "default": () => (
                    /* binding */
                    PngDecoder
                  )
                  /* harmony export */
                });
                var iobuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(
                  /*! iobuffer */
                  "./node_modules/iobuffer/lib-esm/IOBuffer.js"
                );
                var pako__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(
                  /*! pako */
                  "./node_modules/pako/dist/pako.esm.mjs"
                );
                var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(
                  /*! ./common */
                  "./node_modules/fast-png/lib-esm/common.js"
                );
                var _internalTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__2(
                  /*! ./internalTypes */
                  "./node_modules/fast-png/lib-esm/internalTypes.js"
                );
                const empty = new Uint8Array(0);
                const NULL = "\0";
                const uint16 = new Uint16Array([255]);
                const uint8 = new Uint8Array(uint16.buffer);
                const osIsLittleEndian = uint8[0] === 255;
                class PngDecoder extends iobuffer__WEBPACK_IMPORTED_MODULE_0__.IOBuffer {
                  constructor(data, options = {}) {
                    super(data);
                    const { checkCrc = false } = options;
                    this._checkCrc = checkCrc;
                    this._inflator = new pako__WEBPACK_IMPORTED_MODULE_1__.Inflate();
                    this._png = {
                      width: -1,
                      height: -1,
                      channels: -1,
                      data: new Uint8Array(0),
                      depth: 1,
                      text: {}
                    };
                    this._end = false;
                    this._hasPalette = false;
                    this._palette = [];
                    this._hasTransparency = false;
                    this._transparency = new Uint16Array(0);
                    this._compressionMethod = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.CompressionMethod.UNKNOWN;
                    this._filterMethod = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.FilterMethod.UNKNOWN;
                    this._interlaceMethod = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.InterlaceMethod.UNKNOWN;
                    this._colorType = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.UNKNOWN;
                    this.setBigEndian();
                  }
                  decode() {
                    this.decodeSignature();
                    while (!this._end) {
                      this.decodeChunk();
                    }
                    this.decodeImage();
                    return this._png;
                  }
                  // https://www.w3.org/TR/PNG/#5PNG-file-signature
                  decodeSignature() {
                    for (let i = 0; i < _common__WEBPACK_IMPORTED_MODULE_2__.pngSignature.length; i++) {
                      if (this.readUint8() !== _common__WEBPACK_IMPORTED_MODULE_2__.pngSignature[i]) {
                        throw new Error(`wrong PNG signature. Byte at ${i} should be ${_common__WEBPACK_IMPORTED_MODULE_2__.pngSignature[i]}.`);
                      }
                    }
                  }
                  // https://www.w3.org/TR/PNG/#5Chunk-layout
                  decodeChunk() {
                    const length = this.readUint32();
                    const type = this.readChars(4);
                    const offset = this.offset;
                    switch (type) {
                      // 11.2 Critical chunks
                      case "IHDR":
                        this.decodeIHDR();
                        break;
                      case "PLTE":
                        this.decodePLTE(length);
                        break;
                      case "IDAT":
                        this.decodeIDAT(length);
                        break;
                      case "IEND":
                        this._end = true;
                        break;
                      // 11.3 Ancillary chunks
                      case "tRNS":
                        this.decodetRNS(length);
                        break;
                      case "iCCP":
                        this.decodeiCCP(length);
                        break;
                      case "tEXt":
                        this.decodetEXt(length);
                        break;
                      case "pHYs":
                        this.decodepHYs();
                        break;
                      default:
                        this.skip(length);
                        break;
                    }
                    if (this.offset - offset !== length) {
                      throw new Error(`Length mismatch while decoding chunk ${type}`);
                    }
                    if (this._checkCrc) {
                      const expectedCrc = this.readUint32();
                      const crcLength = length + 4;
                      const actualCrc = (0, _common__WEBPACK_IMPORTED_MODULE_2__.crc)(new Uint8Array(this.buffer, this.byteOffset + this.offset - crcLength - 4, crcLength), crcLength);
                      if (actualCrc !== expectedCrc) {
                        throw new Error(`CRC mismatch for chunk ${type}. Expected ${expectedCrc}, found ${actualCrc}`);
                      }
                    } else {
                      this.skip(4);
                    }
                  }
                  // https://www.w3.org/TR/PNG/#11IHDR
                  decodeIHDR() {
                    const image = this._png;
                    image.width = this.readUint32();
                    image.height = this.readUint32();
                    image.depth = checkBitDepth(this.readUint8());
                    const colorType = this.readUint8();
                    this._colorType = colorType;
                    let channels;
                    switch (colorType) {
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.GREYSCALE:
                        channels = 1;
                        break;
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.TRUECOLOUR:
                        channels = 3;
                        break;
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.INDEXED_COLOUR:
                        channels = 1;
                        break;
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.GREYSCALE_ALPHA:
                        channels = 2;
                        break;
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.TRUECOLOUR_ALPHA:
                        channels = 4;
                        break;
                      default:
                        throw new Error(`Unknown color type: ${colorType}`);
                    }
                    this._png.channels = channels;
                    this._compressionMethod = this.readUint8();
                    if (this._compressionMethod !== _internalTypes__WEBPACK_IMPORTED_MODULE_3__.CompressionMethod.DEFLATE) {
                      throw new Error(`Unsupported compression method: ${this._compressionMethod}`);
                    }
                    this._filterMethod = this.readUint8();
                    this._interlaceMethod = this.readUint8();
                  }
                  // https://www.w3.org/TR/PNG/#11PLTE
                  decodePLTE(length) {
                    if (length % 3 !== 0) {
                      throw new RangeError(`PLTE field length must be a multiple of 3. Got ${length}`);
                    }
                    const l = length / 3;
                    this._hasPalette = true;
                    const palette = [];
                    this._palette = palette;
                    for (let i = 0; i < l; i++) {
                      palette.push([this.readUint8(), this.readUint8(), this.readUint8()]);
                    }
                  }
                  // https://www.w3.org/TR/PNG/#11IDAT
                  decodeIDAT(length) {
                    this._inflator.push(new Uint8Array(this.buffer, this.offset + this.byteOffset, length));
                    this.skip(length);
                  }
                  // https://www.w3.org/TR/PNG/#11tRNS
                  decodetRNS(length) {
                    switch (this._colorType) {
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.GREYSCALE:
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.TRUECOLOUR: {
                        if (length % 2 !== 0) {
                          throw new RangeError(`tRNS chunk length must be a multiple of 2. Got ${length}`);
                        }
                        if (length / 2 > this._png.width * this._png.height) {
                          throw new Error(`tRNS chunk contains more alpha values than there are pixels (${length / 2} vs ${this._png.width * this._png.height})`);
                        }
                        this._hasTransparency = true;
                        this._transparency = new Uint16Array(length / 2);
                        for (let i = 0; i < length / 2; i++) {
                          this._transparency[i] = this.readUint16();
                        }
                        break;
                      }
                      case _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.INDEXED_COLOUR: {
                        if (length > this._palette.length) {
                          throw new Error(`tRNS chunk contains more alpha values than there are palette colors (${length} vs ${this._palette.length})`);
                        }
                        let i = 0;
                        for (; i < length; i++) {
                          const alpha = this.readByte();
                          this._palette[i].push(alpha);
                        }
                        for (; i < this._palette.length; i++) {
                          this._palette[i].push(255);
                        }
                        break;
                      }
                      default: {
                        throw new Error(`tRNS chunk is not supported for color type ${this._colorType}`);
                      }
                    }
                  }
                  // https://www.w3.org/TR/PNG/#11iCCP
                  decodeiCCP(length) {
                    let name = "";
                    let char;
                    while ((char = this.readChar()) !== NULL) {
                      name += char;
                    }
                    const compressionMethod = this.readUint8();
                    if (compressionMethod !== _internalTypes__WEBPACK_IMPORTED_MODULE_3__.CompressionMethod.DEFLATE) {
                      throw new Error(`Unsupported iCCP compression method: ${compressionMethod}`);
                    }
                    const compressedProfile = this.readBytes(length - name.length - 2);
                    this._png.iccEmbeddedProfile = {
                      name,
                      profile: (0, pako__WEBPACK_IMPORTED_MODULE_1__.inflate)(compressedProfile)
                    };
                  }
                  // https://www.w3.org/TR/PNG/#11tEXt
                  decodetEXt(length) {
                    let keyword = "";
                    let char;
                    while ((char = this.readChar()) !== NULL) {
                      keyword += char;
                    }
                    this._png.text[keyword] = this.readChars(length - keyword.length - 1);
                  }
                  // https://www.w3.org/TR/PNG/#11pHYs
                  decodepHYs() {
                    const ppuX = this.readUint32();
                    const ppuY = this.readUint32();
                    const unitSpecifier = this.readByte();
                    this._png.resolution = { x: ppuX, y: ppuY, unit: unitSpecifier };
                  }
                  decodeImage() {
                    if (this._inflator.err) {
                      throw new Error(`Error while decompressing the data: ${this._inflator.err}`);
                    }
                    const data = this._inflator.result;
                    if (this._filterMethod !== _internalTypes__WEBPACK_IMPORTED_MODULE_3__.FilterMethod.ADAPTIVE) {
                      throw new Error(`Filter method ${this._filterMethod} not supported`);
                    }
                    if (this._interlaceMethod === _internalTypes__WEBPACK_IMPORTED_MODULE_3__.InterlaceMethod.NO_INTERLACE) {
                      this.decodeInterlaceNull(data);
                    } else {
                      throw new Error(`Interlace method ${this._interlaceMethod} not supported`);
                    }
                  }
                  decodeInterlaceNull(data) {
                    const height = this._png.height;
                    const bytesPerPixel = this._png.channels * this._png.depth / 8;
                    const bytesPerLine = this._png.width * bytesPerPixel;
                    const newData = new Uint8Array(this._png.height * bytesPerLine);
                    let prevLine = empty;
                    let offset = 0;
                    let currentLine;
                    let newLine;
                    for (let i = 0; i < height; i++) {
                      currentLine = data.subarray(offset + 1, offset + 1 + bytesPerLine);
                      newLine = newData.subarray(i * bytesPerLine, (i + 1) * bytesPerLine);
                      switch (data[offset]) {
                        case 0:
                          unfilterNone(currentLine, newLine, bytesPerLine);
                          break;
                        case 1:
                          unfilterSub(currentLine, newLine, bytesPerLine, bytesPerPixel);
                          break;
                        case 2:
                          unfilterUp(currentLine, newLine, prevLine, bytesPerLine);
                          break;
                        case 3:
                          unfilterAverage(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel);
                          break;
                        case 4:
                          unfilterPaeth(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel);
                          break;
                        default:
                          throw new Error(`Unsupported filter: ${data[offset]}`);
                      }
                      prevLine = newLine;
                      offset += bytesPerLine + 1;
                    }
                    if (this._hasPalette) {
                      this._png.palette = this._palette;
                    }
                    if (this._hasTransparency) {
                      this._png.transparency = this._transparency;
                    }
                    if (this._png.depth === 16) {
                      const uint16Data = new Uint16Array(newData.buffer);
                      if (osIsLittleEndian) {
                        for (let k = 0; k < uint16Data.length; k++) {
                          uint16Data[k] = swap16(uint16Data[k]);
                        }
                      }
                      this._png.data = uint16Data;
                    } else {
                      this._png.data = newData;
                    }
                  }
                }
                function unfilterNone(currentLine, newLine, bytesPerLine) {
                  for (let i = 0; i < bytesPerLine; i++) {
                    newLine[i] = currentLine[i];
                  }
                }
                function unfilterSub(currentLine, newLine, bytesPerLine, bytesPerPixel) {
                  let i = 0;
                  for (; i < bytesPerPixel; i++) {
                    newLine[i] = currentLine[i];
                  }
                  for (; i < bytesPerLine; i++) {
                    newLine[i] = currentLine[i] + newLine[i - bytesPerPixel] & 255;
                  }
                }
                function unfilterUp(currentLine, newLine, prevLine, bytesPerLine) {
                  let i = 0;
                  if (prevLine.length === 0) {
                    for (; i < bytesPerLine; i++) {
                      newLine[i] = currentLine[i];
                    }
                  } else {
                    for (; i < bytesPerLine; i++) {
                      newLine[i] = currentLine[i] + prevLine[i] & 255;
                    }
                  }
                }
                function unfilterAverage(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel) {
                  let i = 0;
                  if (prevLine.length === 0) {
                    for (; i < bytesPerPixel; i++) {
                      newLine[i] = currentLine[i];
                    }
                    for (; i < bytesPerLine; i++) {
                      newLine[i] = currentLine[i] + (newLine[i - bytesPerPixel] >> 1) & 255;
                    }
                  } else {
                    for (; i < bytesPerPixel; i++) {
                      newLine[i] = currentLine[i] + (prevLine[i] >> 1) & 255;
                    }
                    for (; i < bytesPerLine; i++) {
                      newLine[i] = currentLine[i] + (newLine[i - bytesPerPixel] + prevLine[i] >> 1) & 255;
                    }
                  }
                }
                function unfilterPaeth(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel) {
                  let i = 0;
                  if (prevLine.length === 0) {
                    for (; i < bytesPerPixel; i++) {
                      newLine[i] = currentLine[i];
                    }
                    for (; i < bytesPerLine; i++) {
                      newLine[i] = currentLine[i] + newLine[i - bytesPerPixel] & 255;
                    }
                  } else {
                    for (; i < bytesPerPixel; i++) {
                      newLine[i] = currentLine[i] + prevLine[i] & 255;
                    }
                    for (; i < bytesPerLine; i++) {
                      newLine[i] = currentLine[i] + paethPredictor(newLine[i - bytesPerPixel], prevLine[i], prevLine[i - bytesPerPixel]) & 255;
                    }
                  }
                }
                function paethPredictor(a, b, c) {
                  const p = a + b - c;
                  const pa = Math.abs(p - a);
                  const pb = Math.abs(p - b);
                  const pc = Math.abs(p - c);
                  if (pa <= pb && pa <= pc)
                    return a;
                  else if (pb <= pc)
                    return b;
                  else
                    return c;
                }
                function swap16(val) {
                  return (val & 255) << 8 | val >> 8 & 255;
                }
                function checkBitDepth(value) {
                  if (value !== 1 && value !== 2 && value !== 4 && value !== 8 && value !== 16) {
                    throw new Error(`invalid bit depth: ${value}`);
                  }
                  return value;
                }
              }
            ),
            /***/
            "./node_modules/fast-png/lib-esm/PngEncoder.js": (
              /*!*****************************************************!*\
                !*** ./node_modules/fast-png/lib-esm/PngEncoder.js ***!
                \*****************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  "default": () => (
                    /* binding */
                    PngEncoder
                  )
                  /* harmony export */
                });
                var iobuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(
                  /*! iobuffer */
                  "./node_modules/iobuffer/lib-esm/IOBuffer.js"
                );
                var pako__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(
                  /*! pako */
                  "./node_modules/pako/dist/pako.esm.mjs"
                );
                var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(
                  /*! ./common */
                  "./node_modules/fast-png/lib-esm/common.js"
                );
                var _internalTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__2(
                  /*! ./internalTypes */
                  "./node_modules/fast-png/lib-esm/internalTypes.js"
                );
                const defaultZlibOptions = {
                  level: 3
                };
                class PngEncoder extends iobuffer__WEBPACK_IMPORTED_MODULE_0__.IOBuffer {
                  constructor(data, options = {}) {
                    super();
                    this._colorType = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.UNKNOWN;
                    this._zlibOptions = { ...defaultZlibOptions, ...options.zlib };
                    this._png = this._checkData(data);
                    this.setBigEndian();
                  }
                  encode() {
                    this.encodeSignature();
                    this.encodeIHDR();
                    this.encodeData();
                    this.encodeIEND();
                    return this.toArray();
                  }
                  // https://www.w3.org/TR/PNG/#5PNG-file-signature
                  encodeSignature() {
                    this.writeBytes(_common__WEBPACK_IMPORTED_MODULE_2__.pngSignature);
                  }
                  // https://www.w3.org/TR/PNG/#11IHDR
                  encodeIHDR() {
                    this.writeUint32(13);
                    this.writeChars("IHDR");
                    this.writeUint32(this._png.width);
                    this.writeUint32(this._png.height);
                    this.writeByte(this._png.depth);
                    this.writeByte(this._colorType);
                    this.writeByte(_internalTypes__WEBPACK_IMPORTED_MODULE_3__.CompressionMethod.DEFLATE);
                    this.writeByte(_internalTypes__WEBPACK_IMPORTED_MODULE_3__.FilterMethod.ADAPTIVE);
                    this.writeByte(_internalTypes__WEBPACK_IMPORTED_MODULE_3__.InterlaceMethod.NO_INTERLACE);
                    this.writeCrc(17);
                  }
                  // https://www.w3.org/TR/PNG/#11IEND
                  encodeIEND() {
                    this.writeUint32(0);
                    this.writeChars("IEND");
                    this.writeCrc(4);
                  }
                  // https://www.w3.org/TR/PNG/#11IDAT
                  encodeIDAT(data) {
                    this.writeUint32(data.length);
                    this.writeChars("IDAT");
                    this.writeBytes(data);
                    this.writeCrc(data.length + 4);
                  }
                  encodeData() {
                    const { width, height, channels, depth, data } = this._png;
                    const slotsPerLine = channels * width;
                    const newData = new iobuffer__WEBPACK_IMPORTED_MODULE_0__.IOBuffer().setBigEndian();
                    let offset = 0;
                    for (let i = 0; i < height; i++) {
                      newData.writeByte(0);
                      if (depth === 8) {
                        offset = writeDataBytes(data, newData, slotsPerLine, offset);
                      } else if (depth === 16) {
                        offset = writeDataUint16(data, newData, slotsPerLine, offset);
                      } else {
                        throw new Error("unreachable");
                      }
                    }
                    const buffer = newData.toArray();
                    const compressed = (0, pako__WEBPACK_IMPORTED_MODULE_1__.deflate)(buffer, this._zlibOptions);
                    this.encodeIDAT(compressed);
                  }
                  _checkData(data) {
                    const { colorType, channels, depth } = getColorType(data);
                    const png = {
                      width: checkInteger(data.width, "width"),
                      height: checkInteger(data.height, "height"),
                      channels,
                      data: data.data,
                      depth,
                      text: {}
                    };
                    this._colorType = colorType;
                    const expectedSize = png.width * png.height * channels;
                    if (png.data.length !== expectedSize) {
                      throw new RangeError(`wrong data size. Found ${png.data.length}, expected ${expectedSize}`);
                    }
                    return png;
                  }
                  writeCrc(length) {
                    this.writeUint32((0, _common__WEBPACK_IMPORTED_MODULE_2__.crc)(new Uint8Array(this.buffer, this.byteOffset + this.offset - length, length), length));
                  }
                }
                function checkInteger(value, name) {
                  if (Number.isInteger(value) && value > 0) {
                    return value;
                  }
                  throw new TypeError(`${name} must be a positive integer`);
                }
                function getColorType(data) {
                  const { channels = 4, depth = 8 } = data;
                  if (channels !== 4 && channels !== 3 && channels !== 2 && channels !== 1) {
                    throw new RangeError(`unsupported number of channels: ${channels}`);
                  }
                  if (depth !== 8 && depth !== 16) {
                    throw new RangeError(`unsupported bit depth: ${depth}`);
                  }
                  const returnValue = { channels, depth, colorType: _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.UNKNOWN };
                  switch (channels) {
                    case 4:
                      returnValue.colorType = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.TRUECOLOUR_ALPHA;
                      break;
                    case 3:
                      returnValue.colorType = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.TRUECOLOUR;
                      break;
                    case 1:
                      returnValue.colorType = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.GREYSCALE;
                      break;
                    case 2:
                      returnValue.colorType = _internalTypes__WEBPACK_IMPORTED_MODULE_3__.ColorType.GREYSCALE_ALPHA;
                      break;
                    default:
                      throw new Error("unsupported number of channels");
                  }
                  return returnValue;
                }
                function writeDataBytes(data, newData, slotsPerLine, offset) {
                  for (let j = 0; j < slotsPerLine; j++) {
                    newData.writeByte(data[offset++]);
                  }
                  return offset;
                }
                function writeDataUint16(data, newData, slotsPerLine, offset) {
                  for (let j = 0; j < slotsPerLine; j++) {
                    newData.writeUint16(data[offset++]);
                  }
                  return offset;
                }
              }
            ),
            /***/
            "./node_modules/fast-png/lib-esm/common.js": (
              /*!*************************************************!*\
                !*** ./node_modules/fast-png/lib-esm/common.js ***!
                \*************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  crc: () => (
                    /* binding */
                    crc
                  ),
                  /* harmony export */
                  pngSignature: () => (
                    /* binding */
                    pngSignature
                  )
                  /* harmony export */
                });
                const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
                const crcTable = [];
                for (let n = 0; n < 256; n++) {
                  let c = n;
                  for (let k = 0; k < 8; k++) {
                    if (c & 1) {
                      c = 3988292384 ^ c >>> 1;
                    } else {
                      c = c >>> 1;
                    }
                  }
                  crcTable[n] = c;
                }
                const initialCrc = 4294967295;
                function updateCrc(currentCrc, data, length) {
                  let c = currentCrc;
                  for (let n = 0; n < length; n++) {
                    c = crcTable[(c ^ data[n]) & 255] ^ c >>> 8;
                  }
                  return c;
                }
                function crc(data, length) {
                  return (updateCrc(initialCrc, data, length) ^ initialCrc) >>> 0;
                }
              }
            ),
            /***/
            "./node_modules/fast-png/lib-esm/index.js": (
              /*!************************************************!*\
                !*** ./node_modules/fast-png/lib-esm/index.js ***!
                \************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  ResolutionUnitSpecifier: () => (
                    /* reexport safe */
                    _types__WEBPACK_IMPORTED_MODULE_2__.ResolutionUnitSpecifier
                  ),
                  /* harmony export */
                  decode: () => (
                    /* binding */
                    decodePng
                  ),
                  /* harmony export */
                  encode: () => (
                    /* binding */
                    encodePng
                  )
                  /* harmony export */
                });
                var _PngDecoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(
                  /*! ./PngDecoder */
                  "./node_modules/fast-png/lib-esm/PngDecoder.js"
                );
                var _PngEncoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(
                  /*! ./PngEncoder */
                  "./node_modules/fast-png/lib-esm/PngEncoder.js"
                );
                var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(
                  /*! ./types */
                  "./node_modules/fast-png/lib-esm/types.js"
                );
                function decodePng(data, options) {
                  const decoder = new _PngDecoder__WEBPACK_IMPORTED_MODULE_0__["default"](data, options);
                  return decoder.decode();
                }
                function encodePng(png, options) {
                  const encoder = new _PngEncoder__WEBPACK_IMPORTED_MODULE_1__["default"](png, options);
                  return encoder.encode();
                }
              }
            ),
            /***/
            "./node_modules/fast-png/lib-esm/internalTypes.js": (
              /*!********************************************************!*\
                !*** ./node_modules/fast-png/lib-esm/internalTypes.js ***!
                \********************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  ColorType: () => (
                    /* binding */
                    ColorType
                  ),
                  /* harmony export */
                  CompressionMethod: () => (
                    /* binding */
                    CompressionMethod
                  ),
                  /* harmony export */
                  FilterMethod: () => (
                    /* binding */
                    FilterMethod
                  ),
                  /* harmony export */
                  InterlaceMethod: () => (
                    /* binding */
                    InterlaceMethod
                  )
                  /* harmony export */
                });
                var ColorType;
                (function(ColorType2) {
                  ColorType2[ColorType2["UNKNOWN"] = -1] = "UNKNOWN";
                  ColorType2[ColorType2["GREYSCALE"] = 0] = "GREYSCALE";
                  ColorType2[ColorType2["TRUECOLOUR"] = 2] = "TRUECOLOUR";
                  ColorType2[ColorType2["INDEXED_COLOUR"] = 3] = "INDEXED_COLOUR";
                  ColorType2[ColorType2["GREYSCALE_ALPHA"] = 4] = "GREYSCALE_ALPHA";
                  ColorType2[ColorType2["TRUECOLOUR_ALPHA"] = 6] = "TRUECOLOUR_ALPHA";
                })(ColorType || (ColorType = {}));
                var CompressionMethod;
                (function(CompressionMethod2) {
                  CompressionMethod2[CompressionMethod2["UNKNOWN"] = -1] = "UNKNOWN";
                  CompressionMethod2[CompressionMethod2["DEFLATE"] = 0] = "DEFLATE";
                })(CompressionMethod || (CompressionMethod = {}));
                var FilterMethod;
                (function(FilterMethod2) {
                  FilterMethod2[FilterMethod2["UNKNOWN"] = -1] = "UNKNOWN";
                  FilterMethod2[FilterMethod2["ADAPTIVE"] = 0] = "ADAPTIVE";
                })(FilterMethod || (FilterMethod = {}));
                var InterlaceMethod;
                (function(InterlaceMethod2) {
                  InterlaceMethod2[InterlaceMethod2["UNKNOWN"] = -1] = "UNKNOWN";
                  InterlaceMethod2[InterlaceMethod2["NO_INTERLACE"] = 0] = "NO_INTERLACE";
                  InterlaceMethod2[InterlaceMethod2["ADAM7"] = 1] = "ADAM7";
                })(InterlaceMethod || (InterlaceMethod = {}));
              }
            ),
            /***/
            "./node_modules/fast-png/lib-esm/types.js": (
              /*!************************************************!*\
                !*** ./node_modules/fast-png/lib-esm/types.js ***!
                \************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  ResolutionUnitSpecifier: () => (
                    /* binding */
                    ResolutionUnitSpecifier
                  )
                  /* harmony export */
                });
                var ResolutionUnitSpecifier;
                (function(ResolutionUnitSpecifier2) {
                  ResolutionUnitSpecifier2[ResolutionUnitSpecifier2["UNKNOWN"] = 0] = "UNKNOWN";
                  ResolutionUnitSpecifier2[ResolutionUnitSpecifier2["METRE"] = 1] = "METRE";
                })(ResolutionUnitSpecifier || (ResolutionUnitSpecifier = {}));
              }
            ),
            /***/
            "./node_modules/iobuffer/lib-esm/IOBuffer.js": (
              /*!***************************************************!*\
                !*** ./node_modules/iobuffer/lib-esm/IOBuffer.js ***!
                \***************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  IOBuffer: () => (
                    /* binding */
                    IOBuffer
                  )
                  /* harmony export */
                });
                var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(
                  /*! ./text */
                  "./node_modules/iobuffer/lib-esm/text.browser.js"
                );
                const defaultByteLength = 1024 * 8;
                const hostBigEndian = (() => {
                  const array = new Uint8Array(4);
                  const view = new Uint32Array(array.buffer);
                  return !((view[0] = 1) & array[0]);
                })();
                const typedArrays = {
                  int8: globalThis.Int8Array,
                  uint8: globalThis.Uint8Array,
                  int16: globalThis.Int16Array,
                  uint16: globalThis.Uint16Array,
                  int32: globalThis.Int32Array,
                  uint32: globalThis.Uint32Array,
                  uint64: globalThis.BigUint64Array,
                  int64: globalThis.BigInt64Array,
                  float32: globalThis.Float32Array,
                  float64: globalThis.Float64Array
                };
                class IOBuffer {
                  /**
                   * @param data - The data to construct the IOBuffer with.
                   * If data is a number, it will be the new buffer's length<br>
                   * If data is `undefined`, the buffer will be initialized with a default length of 8Kb<br>
                   * If data is an ArrayBuffer, SharedArrayBuffer, an ArrayBufferView (Typed Array), an IOBuffer instance,
                   * or a Node.js Buffer, a view will be created over the underlying ArrayBuffer.
                   * @param options
                   */
                  constructor(data = defaultByteLength, options = {}) {
                    let dataIsGiven = false;
                    if (typeof data === "number") {
                      data = new ArrayBuffer(data);
                    } else {
                      dataIsGiven = true;
                      this.lastWrittenByte = data.byteLength;
                    }
                    const offset = options.offset ? options.offset >>> 0 : 0;
                    const byteLength = data.byteLength - offset;
                    let dvOffset = offset;
                    if (ArrayBuffer.isView(data) || data instanceof IOBuffer) {
                      if (data.byteLength !== data.buffer.byteLength) {
                        dvOffset = data.byteOffset + offset;
                      }
                      data = data.buffer;
                    }
                    if (dataIsGiven) {
                      this.lastWrittenByte = byteLength;
                    } else {
                      this.lastWrittenByte = 0;
                    }
                    this.buffer = data;
                    this.length = byteLength;
                    this.byteLength = byteLength;
                    this.byteOffset = dvOffset;
                    this.offset = 0;
                    this.littleEndian = true;
                    this._data = new DataView(this.buffer, dvOffset, byteLength);
                    this._mark = 0;
                    this._marks = [];
                  }
                  /**
                   * Checks if the memory allocated to the buffer is sufficient to store more
                   * bytes after the offset.
                   * @param byteLength - The needed memory in bytes.
                   * @returns `true` if there is sufficient space and `false` otherwise.
                   */
                  available(byteLength = 1) {
                    return this.offset + byteLength <= this.length;
                  }
                  /**
                   * Check if little-endian mode is used for reading and writing multi-byte
                   * values.
                   * @returns `true` if little-endian mode is used, `false` otherwise.
                   */
                  isLittleEndian() {
                    return this.littleEndian;
                  }
                  /**
                   * Set little-endian mode for reading and writing multi-byte values.
                   */
                  setLittleEndian() {
                    this.littleEndian = true;
                    return this;
                  }
                  /**
                   * Check if big-endian mode is used for reading and writing multi-byte values.
                   * @returns `true` if big-endian mode is used, `false` otherwise.
                   */
                  isBigEndian() {
                    return !this.littleEndian;
                  }
                  /**
                   * Switches to big-endian mode for reading and writing multi-byte values.
                   */
                  setBigEndian() {
                    this.littleEndian = false;
                    return this;
                  }
                  /**
                   * Move the pointer n bytes forward.
                   * @param n - Number of bytes to skip.
                   */
                  skip(n = 1) {
                    this.offset += n;
                    return this;
                  }
                  /**
                   * Move the pointer n bytes backward.
                   * @param n - Number of bytes to move back.
                   */
                  back(n = 1) {
                    this.offset -= n;
                    return this;
                  }
                  /**
                   * Move the pointer to the given offset.
                   * @param offset
                   */
                  seek(offset) {
                    this.offset = offset;
                    return this;
                  }
                  /**
                   * Store the current pointer offset.
                   * @see {@link IOBuffer#reset}
                   */
                  mark() {
                    this._mark = this.offset;
                    return this;
                  }
                  /**
                   * Move the pointer back to the last pointer offset set by mark.
                   * @see {@link IOBuffer#mark}
                   */
                  reset() {
                    this.offset = this._mark;
                    return this;
                  }
                  /**
                   * Push the current pointer offset to the mark stack.
                   * @see {@link IOBuffer#popMark}
                   */
                  pushMark() {
                    this._marks.push(this.offset);
                    return this;
                  }
                  /**
                   * Pop the last pointer offset from the mark stack, and set the current
                   * pointer offset to the popped value.
                   * @see {@link IOBuffer#pushMark}
                   */
                  popMark() {
                    const offset = this._marks.pop();
                    if (offset === void 0) {
                      throw new Error("Mark stack empty");
                    }
                    this.seek(offset);
                    return this;
                  }
                  /**
                   * Move the pointer offset back to 0.
                   */
                  rewind() {
                    this.offset = 0;
                    return this;
                  }
                  /**
                   * Make sure the buffer has sufficient memory to write a given byteLength at
                   * the current pointer offset.
                   * If the buffer's memory is insufficient, this method will create a new
                   * buffer (a copy) with a length that is twice (byteLength + current offset).
                   * @param byteLength
                   */
                  ensureAvailable(byteLength = 1) {
                    if (!this.available(byteLength)) {
                      const lengthNeeded = this.offset + byteLength;
                      const newLength = lengthNeeded * 2;
                      const newArray = new Uint8Array(newLength);
                      newArray.set(new Uint8Array(this.buffer));
                      this.buffer = newArray.buffer;
                      this.length = this.byteLength = newLength;
                      this._data = new DataView(this.buffer);
                    }
                    return this;
                  }
                  /**
                   * Read a byte and return false if the byte's value is 0, or true otherwise.
                   * Moves pointer forward by one byte.
                   */
                  readBoolean() {
                    return this.readUint8() !== 0;
                  }
                  /**
                   * Read a signed 8-bit integer and move pointer forward by 1 byte.
                   */
                  readInt8() {
                    return this._data.getInt8(this.offset++);
                  }
                  /**
                   * Read an unsigned 8-bit integer and move pointer forward by 1 byte.
                   */
                  readUint8() {
                    return this._data.getUint8(this.offset++);
                  }
                  /**
                   * Alias for {@link IOBuffer#readUint8}.
                   */
                  readByte() {
                    return this.readUint8();
                  }
                  /**
                   * Read `n` bytes and move pointer forward by `n` bytes.
                   */
                  readBytes(n = 1) {
                    return this.readArray(n, "uint8");
                  }
                  /**
                   * Creates an array of corresponding to the type `type` and size `size`.
                   * For example type `uint8` will create a `Uint8Array`.
                   * @param size - size of the resulting array
                   * @param type - number type of elements to read
                   */
                  readArray(size, type) {
                    const bytes = typedArrays[type].BYTES_PER_ELEMENT * size;
                    const offset = this.byteOffset + this.offset;
                    const slice = this.buffer.slice(offset, offset + bytes);
                    if (this.littleEndian === hostBigEndian && type !== "uint8" && type !== "int8") {
                      const slice2 = new Uint8Array(this.buffer.slice(offset, offset + bytes));
                      slice2.reverse();
                      const returnArray2 = new typedArrays[type](slice2.buffer);
                      this.offset += bytes;
                      returnArray2.reverse();
                      return returnArray2;
                    }
                    const returnArray = new typedArrays[type](slice);
                    this.offset += bytes;
                    return returnArray;
                  }
                  /**
                   * Read a 16-bit signed integer and move pointer forward by 2 bytes.
                   */
                  readInt16() {
                    const value = this._data.getInt16(this.offset, this.littleEndian);
                    this.offset += 2;
                    return value;
                  }
                  /**
                   * Read a 16-bit unsigned integer and move pointer forward by 2 bytes.
                   */
                  readUint16() {
                    const value = this._data.getUint16(this.offset, this.littleEndian);
                    this.offset += 2;
                    return value;
                  }
                  /**
                   * Read a 32-bit signed integer and move pointer forward by 4 bytes.
                   */
                  readInt32() {
                    const value = this._data.getInt32(this.offset, this.littleEndian);
                    this.offset += 4;
                    return value;
                  }
                  /**
                   * Read a 32-bit unsigned integer and move pointer forward by 4 bytes.
                   */
                  readUint32() {
                    const value = this._data.getUint32(this.offset, this.littleEndian);
                    this.offset += 4;
                    return value;
                  }
                  /**
                   * Read a 32-bit floating number and move pointer forward by 4 bytes.
                   */
                  readFloat32() {
                    const value = this._data.getFloat32(this.offset, this.littleEndian);
                    this.offset += 4;
                    return value;
                  }
                  /**
                   * Read a 64-bit floating number and move pointer forward by 8 bytes.
                   */
                  readFloat64() {
                    const value = this._data.getFloat64(this.offset, this.littleEndian);
                    this.offset += 8;
                    return value;
                  }
                  /**
                   * Read a 64-bit signed integer number and move pointer forward by 8 bytes.
                   */
                  readBigInt64() {
                    const value = this._data.getBigInt64(this.offset, this.littleEndian);
                    this.offset += 8;
                    return value;
                  }
                  /**
                   * Read a 64-bit unsigned integer number and move pointer forward by 8 bytes.
                   */
                  readBigUint64() {
                    const value = this._data.getBigUint64(this.offset, this.littleEndian);
                    this.offset += 8;
                    return value;
                  }
                  /**
                   * Read a 1-byte ASCII character and move pointer forward by 1 byte.
                   */
                  readChar() {
                    return String.fromCharCode(this.readInt8());
                  }
                  /**
                   * Read `n` 1-byte ASCII characters and move pointer forward by `n` bytes.
                   */
                  readChars(n = 1) {
                    let result = "";
                    for (let i = 0; i < n; i++) {
                      result += this.readChar();
                    }
                    return result;
                  }
                  /**
                   * Read the next `n` bytes, return a UTF-8 decoded string and move pointer
                   * forward by `n` bytes.
                   */
                  readUtf8(n = 1) {
                    return (0, _text__WEBPACK_IMPORTED_MODULE_0__.decode)(this.readBytes(n));
                  }
                  /**
                   * Read the next `n` bytes, return a string decoded with `encoding` and move pointer
                   * forward by `n` bytes.
                   * If no encoding is passed, the function is equivalent to @see {@link IOBuffer#readUtf8}
                   */
                  decodeText(n = 1, encoding = "utf-8") {
                    return (0, _text__WEBPACK_IMPORTED_MODULE_0__.decode)(this.readBytes(n), encoding);
                  }
                  /**
                   * Write 0xff if the passed value is truthy, 0x00 otherwise and move pointer
                   * forward by 1 byte.
                   */
                  writeBoolean(value) {
                    this.writeUint8(value ? 255 : 0);
                    return this;
                  }
                  /**
                   * Write `value` as an 8-bit signed integer and move pointer forward by 1 byte.
                   */
                  writeInt8(value) {
                    this.ensureAvailable(1);
                    this._data.setInt8(this.offset++, value);
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as an 8-bit unsigned integer and move pointer forward by 1
                   * byte.
                   */
                  writeUint8(value) {
                    this.ensureAvailable(1);
                    this._data.setUint8(this.offset++, value);
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * An alias for {@link IOBuffer#writeUint8}.
                   */
                  writeByte(value) {
                    return this.writeUint8(value);
                  }
                  /**
                   * Write all elements of `bytes` as uint8 values and move pointer forward by
                   * `bytes.length` bytes.
                   */
                  writeBytes(bytes) {
                    this.ensureAvailable(bytes.length);
                    for (let i = 0; i < bytes.length; i++) {
                      this._data.setUint8(this.offset++, bytes[i]);
                    }
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 16-bit signed integer and move pointer forward by 2
                   * bytes.
                   */
                  writeInt16(value) {
                    this.ensureAvailable(2);
                    this._data.setInt16(this.offset, value, this.littleEndian);
                    this.offset += 2;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 16-bit unsigned integer and move pointer forward by 2
                   * bytes.
                   */
                  writeUint16(value) {
                    this.ensureAvailable(2);
                    this._data.setUint16(this.offset, value, this.littleEndian);
                    this.offset += 2;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 32-bit signed integer and move pointer forward by 4
                   * bytes.
                   */
                  writeInt32(value) {
                    this.ensureAvailable(4);
                    this._data.setInt32(this.offset, value, this.littleEndian);
                    this.offset += 4;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 32-bit unsigned integer and move pointer forward by 4
                   * bytes.
                   */
                  writeUint32(value) {
                    this.ensureAvailable(4);
                    this._data.setUint32(this.offset, value, this.littleEndian);
                    this.offset += 4;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 32-bit floating number and move pointer forward by 4
                   * bytes.
                   */
                  writeFloat32(value) {
                    this.ensureAvailable(4);
                    this._data.setFloat32(this.offset, value, this.littleEndian);
                    this.offset += 4;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 64-bit floating number and move pointer forward by 8
                   * bytes.
                   */
                  writeFloat64(value) {
                    this.ensureAvailable(8);
                    this._data.setFloat64(this.offset, value, this.littleEndian);
                    this.offset += 8;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 64-bit signed bigint and move pointer forward by 8
                   * bytes.
                   */
                  writeBigInt64(value) {
                    this.ensureAvailable(8);
                    this._data.setBigInt64(this.offset, value, this.littleEndian);
                    this.offset += 8;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write `value` as a 64-bit unsigned bigint and move pointer forward by 8
                   * bytes.
                   */
                  writeBigUint64(value) {
                    this.ensureAvailable(8);
                    this._data.setBigUint64(this.offset, value, this.littleEndian);
                    this.offset += 8;
                    this._updateLastWrittenByte();
                    return this;
                  }
                  /**
                   * Write the charCode of `str`'s first character as an 8-bit unsigned integer
                   * and move pointer forward by 1 byte.
                   */
                  writeChar(str) {
                    return this.writeUint8(str.charCodeAt(0));
                  }
                  /**
                   * Write the charCodes of all `str`'s characters as 8-bit unsigned integers
                   * and move pointer forward by `str.length` bytes.
                   */
                  writeChars(str) {
                    for (let i = 0; i < str.length; i++) {
                      this.writeUint8(str.charCodeAt(i));
                    }
                    return this;
                  }
                  /**
                   * UTF-8 encode and write `str` to the current pointer offset and move pointer
                   * forward according to the encoded length.
                   */
                  writeUtf8(str) {
                    return this.writeBytes((0, _text__WEBPACK_IMPORTED_MODULE_0__.encode)(str));
                  }
                  /**
                   * Export a Uint8Array view of the internal buffer.
                   * The view starts at the byte offset and its length
                   * is calculated to stop at the last written byte or the original length.
                   */
                  toArray() {
                    return new Uint8Array(this.buffer, this.byteOffset, this.lastWrittenByte);
                  }
                  /**
                   * Update the last written byte offset
                   * @private
                   */
                  _updateLastWrittenByte() {
                    if (this.offset > this.lastWrittenByte) {
                      this.lastWrittenByte = this.offset;
                    }
                  }
                }
              }
            ),
            /***/
            "./node_modules/iobuffer/lib-esm/text-encoding-polyfill.js": (
              /*!*****************************************************************!*\
                !*** ./node_modules/iobuffer/lib-esm/text-encoding-polyfill.js ***!
                \*****************************************************************/
              /***/
              function() {
                (function(scope) {
                  "use strict";
                  if (scope["TextEncoder"] && scope["TextDecoder"]) {
                    return false;
                  }
                  function FastTextEncoder(utfLabel = "utf-8") {
                    if (utfLabel !== "utf-8") {
                      throw new RangeError(`Failed to construct 'TextEncoder': The encoding label provided ('${utfLabel}') is invalid.`);
                    }
                  }
                  Object.defineProperty(FastTextEncoder.prototype, "encoding", {
                    value: "utf-8"
                  });
                  FastTextEncoder.prototype.encode = function(string, options = { stream: false }) {
                    if (options.stream) {
                      throw new Error(`Failed to encode: the 'stream' option is unsupported.`);
                    }
                    let pos = 0;
                    const len = string.length;
                    const out = [];
                    let at = 0;
                    let tlen = Math.max(32, len + (len >> 1) + 7);
                    let target = new Uint8Array(tlen >> 3 << 3);
                    while (pos < len) {
                      let value = string.charCodeAt(pos++);
                      if (value >= 55296 && value <= 56319) {
                        if (pos < len) {
                          const extra = string.charCodeAt(pos);
                          if ((extra & 64512) === 56320) {
                            ++pos;
                            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
                          }
                        }
                        if (value >= 55296 && value <= 56319) {
                          continue;
                        }
                      }
                      if (at + 4 > target.length) {
                        tlen += 8;
                        tlen *= 1 + pos / string.length * 2;
                        tlen = tlen >> 3 << 3;
                        const update = new Uint8Array(tlen);
                        update.set(target);
                        target = update;
                      }
                      if ((value & 4294967168) === 0) {
                        target[at++] = value;
                        continue;
                      } else if ((value & 4294965248) === 0) {
                        target[at++] = value >> 6 & 31 | 192;
                      } else if ((value & 4294901760) === 0) {
                        target[at++] = value >> 12 & 15 | 224;
                        target[at++] = value >> 6 & 63 | 128;
                      } else if ((value & 4292870144) === 0) {
                        target[at++] = value >> 18 & 7 | 240;
                        target[at++] = value >> 12 & 63 | 128;
                        target[at++] = value >> 6 & 63 | 128;
                      } else {
                        continue;
                      }
                      target[at++] = value & 63 | 128;
                    }
                    return target.slice(0, at);
                  };
                  function FastTextDecoder(utfLabel = "utf-8", options = { fatal: false }) {
                    if (utfLabel !== "utf-8") {
                      throw new RangeError(`Failed to construct 'TextDecoder': The encoding label provided ('${utfLabel}') is invalid.`);
                    }
                    if (options.fatal) {
                      throw new Error(`Failed to construct 'TextDecoder': the 'fatal' option is unsupported.`);
                    }
                  }
                  Object.defineProperty(FastTextDecoder.prototype, "encoding", {
                    value: "utf-8"
                  });
                  Object.defineProperty(FastTextDecoder.prototype, "fatal", { value: false });
                  Object.defineProperty(FastTextDecoder.prototype, "ignoreBOM", {
                    value: false
                  });
                  FastTextDecoder.prototype.decode = function(buffer, options = { stream: false }) {
                    if (options["stream"]) {
                      throw new Error(`Failed to decode: the 'stream' option is unsupported.`);
                    }
                    const bytes = new Uint8Array(buffer);
                    let pos = 0;
                    const len = bytes.length;
                    const out = [];
                    while (pos < len) {
                      const byte1 = bytes[pos++];
                      if (byte1 === 0) {
                        break;
                      }
                      if ((byte1 & 128) === 0) {
                        out.push(byte1);
                      } else if ((byte1 & 224) === 192) {
                        const byte2 = bytes[pos++] & 63;
                        out.push((byte1 & 31) << 6 | byte2);
                      } else if ((byte1 & 240) === 224) {
                        const byte2 = bytes[pos++] & 63;
                        const byte3 = bytes[pos++] & 63;
                        out.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
                      } else if ((byte1 & 248) === 240) {
                        const byte2 = bytes[pos++] & 63;
                        const byte3 = bytes[pos++] & 63;
                        const byte4 = bytes[pos++] & 63;
                        let codepoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
                        if (codepoint > 65535) {
                          codepoint -= 65536;
                          out.push(codepoint >>> 10 & 1023 | 55296);
                          codepoint = 56320 | codepoint & 1023;
                        }
                        out.push(codepoint);
                      } else {
                      }
                    }
                    return String.fromCharCode.apply(null, out);
                  };
                  scope["TextEncoder"] = FastTextEncoder;
                  scope["TextDecoder"] = FastTextDecoder;
                })(typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : this);
              }
            ),
            /***/
            "./node_modules/iobuffer/lib-esm/text.browser.js": (
              /*!*******************************************************!*\
                !*** ./node_modules/iobuffer/lib-esm/text.browser.js ***!
                \*******************************************************/
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  decode: () => (
                    /* binding */
                    decode
                  ),
                  /* harmony export */
                  encode: () => (
                    /* binding */
                    encode
                  )
                  /* harmony export */
                });
                var _text_encoding_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(
                  /*! ./text-encoding-polyfill */
                  "./node_modules/iobuffer/lib-esm/text-encoding-polyfill.js"
                );
                var _text_encoding_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__2.n(_text_encoding_polyfill__WEBPACK_IMPORTED_MODULE_0__);
                function decode(bytes, encoding = "utf8") {
                  const decoder = new TextDecoder(encoding);
                  return decoder.decode(bytes);
                }
                const encoder = new TextEncoder();
                function encode(str) {
                  return encoder.encode(str);
                }
              }
            ),
            /***/
            "./node_modules/pako/dist/pako.esm.mjs": (
              /*!*********************************************!*\
                !*** ./node_modules/pako/dist/pako.esm.mjs ***!
                \*********************************************/
              /***/
              (__unused_webpack___webpack_module__, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  Deflate: () => (
                    /* binding */
                    Deflate_1
                  ),
                  /* harmony export */
                  Inflate: () => (
                    /* binding */
                    Inflate_1
                  ),
                  /* harmony export */
                  constants: () => (
                    /* binding */
                    constants_1
                  ),
                  /* harmony export */
                  "default": () => (
                    /* binding */
                    pako
                  ),
                  /* harmony export */
                  deflate: () => (
                    /* binding */
                    deflate_1
                  ),
                  /* harmony export */
                  deflateRaw: () => (
                    /* binding */
                    deflateRaw_1
                  ),
                  /* harmony export */
                  gzip: () => (
                    /* binding */
                    gzip_1
                  ),
                  /* harmony export */
                  inflate: () => (
                    /* binding */
                    inflate_1
                  ),
                  /* harmony export */
                  inflateRaw: () => (
                    /* binding */
                    inflateRaw_1
                  ),
                  /* harmony export */
                  ungzip: () => (
                    /* binding */
                    ungzip_1
                  )
                  /* harmony export */
                });
                const Z_FIXED$1 = 4;
                const Z_BINARY = 0;
                const Z_TEXT = 1;
                const Z_UNKNOWN$1 = 2;
                function zero$1(buf) {
                  let len = buf.length;
                  while (--len >= 0) {
                    buf[len] = 0;
                  }
                }
                const STORED_BLOCK = 0;
                const STATIC_TREES = 1;
                const DYN_TREES = 2;
                const MIN_MATCH$1 = 3;
                const MAX_MATCH$1 = 258;
                const LENGTH_CODES$1 = 29;
                const LITERALS$1 = 256;
                const L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
                const D_CODES$1 = 30;
                const BL_CODES$1 = 19;
                const HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
                const MAX_BITS$1 = 15;
                const Buf_size = 16;
                const MAX_BL_BITS = 7;
                const END_BLOCK = 256;
                const REP_3_6 = 16;
                const REPZ_3_10 = 17;
                const REPZ_11_138 = 18;
                const extra_lbits = (
                  /* extra bits for each length code */
                  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
                );
                const extra_dbits = (
                  /* extra bits for each distance code */
                  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
                );
                const extra_blbits = (
                  /* extra bits for each bit length code */
                  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
                );
                const bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
                const DIST_CODE_LEN = 512;
                const static_ltree = new Array((L_CODES$1 + 2) * 2);
                zero$1(static_ltree);
                const static_dtree = new Array(D_CODES$1 * 2);
                zero$1(static_dtree);
                const _dist_code = new Array(DIST_CODE_LEN);
                zero$1(_dist_code);
                const _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
                zero$1(_length_code);
                const base_length = new Array(LENGTH_CODES$1);
                zero$1(base_length);
                const base_dist = new Array(D_CODES$1);
                zero$1(base_dist);
                function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
                  this.static_tree = static_tree;
                  this.extra_bits = extra_bits;
                  this.extra_base = extra_base;
                  this.elems = elems;
                  this.max_length = max_length;
                  this.has_stree = static_tree && static_tree.length;
                }
                let static_l_desc;
                let static_d_desc;
                let static_bl_desc;
                function TreeDesc(dyn_tree, stat_desc) {
                  this.dyn_tree = dyn_tree;
                  this.max_code = 0;
                  this.stat_desc = stat_desc;
                }
                const d_code = (dist) => {
                  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
                };
                const put_short = (s, w) => {
                  s.pending_buf[s.pending++] = w & 255;
                  s.pending_buf[s.pending++] = w >>> 8 & 255;
                };
                const send_bits = (s, value, length) => {
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
                const send_code = (s, c, tree) => {
                  send_bits(
                    s,
                    tree[c * 2],
                    tree[c * 2 + 1]
                    /*.Len*/
                  );
                };
                const bi_reverse = (code, len) => {
                  let res = 0;
                  do {
                    res |= code & 1;
                    code >>>= 1;
                    res <<= 1;
                  } while (--len > 0);
                  return res >>> 1;
                };
                const bi_flush = (s) => {
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
                const gen_bitlen = (s, desc) => {
                  const tree = desc.dyn_tree;
                  const max_code = desc.max_code;
                  const stree = desc.stat_desc.static_tree;
                  const has_stree = desc.stat_desc.has_stree;
                  const extra = desc.stat_desc.extra_bits;
                  const base = desc.stat_desc.extra_base;
                  const max_length = desc.stat_desc.max_length;
                  let h;
                  let n, m;
                  let bits;
                  let xbits;
                  let f;
                  let overflow = 0;
                  for (bits = 0; bits <= MAX_BITS$1; bits++) {
                    s.bl_count[bits] = 0;
                  }
                  tree[s.heap[s.heap_max] * 2 + 1] = 0;
                  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
                    n = s.heap[h];
                    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
                    if (bits > max_length) {
                      bits = max_length;
                      overflow++;
                    }
                    tree[n * 2 + 1] = bits;
                    if (n > max_code) {
                      continue;
                    }
                    s.bl_count[bits]++;
                    xbits = 0;
                    if (n >= base) {
                      xbits = extra[n - base];
                    }
                    f = tree[n * 2];
                    s.opt_len += f * (bits + xbits);
                    if (has_stree) {
                      s.static_len += f * (stree[n * 2 + 1] + xbits);
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
                    n = s.bl_count[bits];
                    while (n !== 0) {
                      m = s.heap[--h];
                      if (m > max_code) {
                        continue;
                      }
                      if (tree[m * 2 + 1] !== bits) {
                        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
                        tree[m * 2 + 1] = bits;
                      }
                      n--;
                    }
                  }
                };
                const gen_codes = (tree, max_code, bl_count) => {
                  const next_code = new Array(MAX_BITS$1 + 1);
                  let code = 0;
                  let bits;
                  let n;
                  for (bits = 1; bits <= MAX_BITS$1; bits++) {
                    code = code + bl_count[bits - 1] << 1;
                    next_code[bits] = code;
                  }
                  for (n = 0; n <= max_code; n++) {
                    let len = tree[n * 2 + 1];
                    if (len === 0) {
                      continue;
                    }
                    tree[n * 2] = bi_reverse(next_code[len]++, len);
                  }
                };
                const tr_static_init = () => {
                  let n;
                  let bits;
                  let length;
                  let code;
                  let dist;
                  const bl_count = new Array(MAX_BITS$1 + 1);
                  length = 0;
                  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
                    base_length[code] = length;
                    for (n = 0; n < 1 << extra_lbits[code]; n++) {
                      _length_code[length++] = code;
                    }
                  }
                  _length_code[length - 1] = code;
                  dist = 0;
                  for (code = 0; code < 16; code++) {
                    base_dist[code] = dist;
                    for (n = 0; n < 1 << extra_dbits[code]; n++) {
                      _dist_code[dist++] = code;
                    }
                  }
                  dist >>= 7;
                  for (; code < D_CODES$1; code++) {
                    base_dist[code] = dist << 7;
                    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
                      _dist_code[256 + dist++] = code;
                    }
                  }
                  for (bits = 0; bits <= MAX_BITS$1; bits++) {
                    bl_count[bits] = 0;
                  }
                  n = 0;
                  while (n <= 143) {
                    static_ltree[n * 2 + 1] = 8;
                    n++;
                    bl_count[8]++;
                  }
                  while (n <= 255) {
                    static_ltree[n * 2 + 1] = 9;
                    n++;
                    bl_count[9]++;
                  }
                  while (n <= 279) {
                    static_ltree[n * 2 + 1] = 7;
                    n++;
                    bl_count[7]++;
                  }
                  while (n <= 287) {
                    static_ltree[n * 2 + 1] = 8;
                    n++;
                    bl_count[8]++;
                  }
                  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
                  for (n = 0; n < D_CODES$1; n++) {
                    static_dtree[n * 2 + 1] = 5;
                    static_dtree[n * 2] = bi_reverse(n, 5);
                  }
                  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
                  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
                  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
                };
                const init_block = (s) => {
                  let n;
                  for (n = 0; n < L_CODES$1; n++) {
                    s.dyn_ltree[n * 2] = 0;
                  }
                  for (n = 0; n < D_CODES$1; n++) {
                    s.dyn_dtree[n * 2] = 0;
                  }
                  for (n = 0; n < BL_CODES$1; n++) {
                    s.bl_tree[n * 2] = 0;
                  }
                  s.dyn_ltree[END_BLOCK * 2] = 1;
                  s.opt_len = s.static_len = 0;
                  s.sym_next = s.matches = 0;
                };
                const bi_windup = (s) => {
                  if (s.bi_valid > 8) {
                    put_short(s, s.bi_buf);
                  } else if (s.bi_valid > 0) {
                    s.pending_buf[s.pending++] = s.bi_buf;
                  }
                  s.bi_buf = 0;
                  s.bi_valid = 0;
                };
                const smaller = (tree, n, m, depth) => {
                  const _n2 = n * 2;
                  const _m2 = m * 2;
                  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
                };
                const pqdownheap = (s, tree, k) => {
                  const v = s.heap[k];
                  let j = k << 1;
                  while (j <= s.heap_len) {
                    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
                      j++;
                    }
                    if (smaller(tree, v, s.heap[j], s.depth)) {
                      break;
                    }
                    s.heap[k] = s.heap[j];
                    k = j;
                    j <<= 1;
                  }
                  s.heap[k] = v;
                };
                const compress_block = (s, ltree, dtree) => {
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
                const build_tree = (s, desc) => {
                  const tree = desc.dyn_tree;
                  const stree = desc.stat_desc.static_tree;
                  const has_stree = desc.stat_desc.has_stree;
                  const elems = desc.stat_desc.elems;
                  let n, m;
                  let max_code = -1;
                  let node;
                  s.heap_len = 0;
                  s.heap_max = HEAP_SIZE$1;
                  for (n = 0; n < elems; n++) {
                    if (tree[n * 2] !== 0) {
                      s.heap[++s.heap_len] = max_code = n;
                      s.depth[n] = 0;
                    } else {
                      tree[n * 2 + 1] = 0;
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
                  for (n = s.heap_len >> 1; n >= 1; n--) {
                    pqdownheap(s, tree, n);
                  }
                  node = elems;
                  do {
                    n = s.heap[
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
                    s.heap[--s.heap_max] = n;
                    s.heap[--s.heap_max] = m;
                    tree[node * 2] = tree[n * 2] + tree[m * 2];
                    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
                    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
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
                const scan_tree = (s, tree, max_code) => {
                  let n;
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
                  for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];
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
                const send_tree = (s, tree, max_code) => {
                  let n;
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
                  for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];
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
                const build_bl_tree = (s) => {
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
                const send_all_trees = (s, lcodes, dcodes, blcodes) => {
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
                const detect_data_type = (s) => {
                  let block_mask = 4093624447;
                  let n;
                  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
                    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
                      return Z_BINARY;
                    }
                  }
                  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
                    return Z_TEXT;
                  }
                  for (n = 32; n < LITERALS$1; n++) {
                    if (s.dyn_ltree[n * 2] !== 0) {
                      return Z_TEXT;
                    }
                  }
                  return Z_BINARY;
                };
                let static_init_done = false;
                const _tr_init$1 = (s) => {
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
                const _tr_stored_block$1 = (s, buf, stored_len, last) => {
                  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
                  bi_windup(s);
                  put_short(s, stored_len);
                  put_short(s, ~stored_len);
                  if (stored_len) {
                    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
                  }
                  s.pending += stored_len;
                };
                const _tr_align$1 = (s) => {
                  send_bits(s, STATIC_TREES << 1, 3);
                  send_code(s, END_BLOCK, static_ltree);
                  bi_flush(s);
                };
                const _tr_flush_block$1 = (s, buf, stored_len, last) => {
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
                const _tr_tally$1 = (s, dist, lc) => {
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
                const adler32 = (adler, buf, len, pos) => {
                  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
                  while (len !== 0) {
                    n = len > 2e3 ? 2e3 : len;
                    len -= n;
                    do {
                      s1 = s1 + buf[pos++] | 0;
                      s2 = s2 + s1 | 0;
                    } while (--n);
                    s1 %= 65521;
                    s2 %= 65521;
                  }
                  return s1 | s2 << 16 | 0;
                };
                var adler32_1 = adler32;
                const makeTable = () => {
                  let c, table = [];
                  for (var n = 0; n < 256; n++) {
                    c = n;
                    for (var k = 0; k < 8; k++) {
                      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
                    }
                    table[n] = c;
                  }
                  return table;
                };
                const crcTable = new Uint32Array(makeTable());
                const crc32 = (crc, buf, len, pos) => {
                  const t = crcTable;
                  const end = pos + len;
                  crc ^= -1;
                  for (let i = pos; i < end; i++) {
                    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
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
                const { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
                const {
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
                const MAX_MEM_LEVEL = 9;
                const MAX_WBITS$1 = 15;
                const DEF_MEM_LEVEL = 8;
                const LENGTH_CODES = 29;
                const LITERALS = 256;
                const L_CODES = LITERALS + 1 + LENGTH_CODES;
                const D_CODES = 30;
                const BL_CODES = 19;
                const HEAP_SIZE = 2 * L_CODES + 1;
                const MAX_BITS = 15;
                const MIN_MATCH = 3;
                const MAX_MATCH = 258;
                const MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
                const PRESET_DICT = 32;
                const INIT_STATE = 42;
                const GZIP_STATE = 57;
                const EXTRA_STATE = 69;
                const NAME_STATE = 73;
                const COMMENT_STATE = 91;
                const HCRC_STATE = 103;
                const BUSY_STATE = 113;
                const FINISH_STATE = 666;
                const BS_NEED_MORE = 1;
                const BS_BLOCK_DONE = 2;
                const BS_FINISH_STARTED = 3;
                const BS_FINISH_DONE = 4;
                const OS_CODE = 3;
                const err = (strm, errorCode) => {
                  strm.msg = messages[errorCode];
                  return errorCode;
                };
                const rank = (f) => {
                  return f * 2 - (f > 4 ? 9 : 0);
                };
                const zero = (buf) => {
                  let len = buf.length;
                  while (--len >= 0) {
                    buf[len] = 0;
                  }
                };
                const slide_hash = (s) => {
                  let n, m;
                  let p;
                  let wsize = s.w_size;
                  n = s.hash_size;
                  p = n;
                  do {
                    m = s.head[--p];
                    s.head[p] = m >= wsize ? m - wsize : 0;
                  } while (--n);
                  n = wsize;
                  p = n;
                  do {
                    m = s.prev[--p];
                    s.prev[p] = m >= wsize ? m - wsize : 0;
                  } while (--n);
                };
                let HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
                let HASH = HASH_ZLIB;
                const flush_pending = (strm) => {
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
                const flush_block_only = (s, last) => {
                  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
                  s.block_start = s.strstart;
                  flush_pending(s.strm);
                };
                const put_byte = (s, b) => {
                  s.pending_buf[s.pending++] = b;
                };
                const putShortMSB = (s, b) => {
                  s.pending_buf[s.pending++] = b >>> 8 & 255;
                  s.pending_buf[s.pending++] = b & 255;
                };
                const read_buf = (strm, buf, start, size) => {
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
                const longest_match = (s, cur_match) => {
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
                const fill_window = (s) => {
                  const _w_size = s.w_size;
                  let n, more, str;
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
                    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
                    s.lookahead += n;
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
                const deflate_stored = (s, flush) => {
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
                const deflate_fast = (s, flush) => {
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
                const deflate_slow = (s, flush) => {
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
                const deflate_rle = (s, flush) => {
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
                const deflate_huff = (s, flush) => {
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
                const configuration_table = [
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
                const lm_init = (s) => {
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
                const deflateStateCheck = (strm) => {
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
                const deflateResetKeep = (strm) => {
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
                const deflateReset = (strm) => {
                  const ret = deflateResetKeep(strm);
                  if (ret === Z_OK$3) {
                    lm_init(strm.state);
                  }
                  return ret;
                };
                const deflateSetHeader = (strm, head) => {
                  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
                    return Z_STREAM_ERROR$2;
                  }
                  strm.state.gzhead = head;
                  return Z_OK$3;
                };
                const deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
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
                const deflateInit = (strm, level) => {
                  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
                };
                const deflate$2 = (strm, flush) => {
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
                const deflateEnd = (strm) => {
                  if (deflateStateCheck(strm)) {
                    return Z_STREAM_ERROR$2;
                  }
                  const status = strm.state.status;
                  strm.state = null;
                  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
                };
                const deflateSetDictionary = (strm, dictionary) => {
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
                    let n = s.lookahead - (MIN_MATCH - 1);
                    do {
                      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
                      s.prev[str & s.w_mask] = s.head[s.ins_h];
                      s.head[s.ins_h] = str;
                      str++;
                    } while (--n);
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
                const _has = (obj, key) => {
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
                    for (const p in source) {
                      if (_has(source, p)) {
                        obj[p] = source[p];
                      }
                    }
                  }
                  return obj;
                };
                var flattenChunks = (chunks) => {
                  let len = 0;
                  for (let i = 0, l = chunks.length; i < l; i++) {
                    len += chunks[i].length;
                  }
                  const result = new Uint8Array(len);
                  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
                    let chunk = chunks[i];
                    result.set(chunk, pos);
                    pos += chunk.length;
                  }
                  return result;
                };
                var common = {
                  assign,
                  flattenChunks
                };
                let STR_APPLY_UIA_OK = true;
                try {
                  String.fromCharCode.apply(null, new Uint8Array(1));
                } catch (__) {
                  STR_APPLY_UIA_OK = false;
                }
                const _utf8len = new Uint8Array(256);
                for (let q = 0; q < 256; q++) {
                  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
                }
                _utf8len[254] = _utf8len[254] = 1;
                var string2buf = (str) => {
                  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
                    return new TextEncoder().encode(str);
                  }
                  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
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
                  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                      c2 = str.charCodeAt(m_pos + 1);
                      if ((c2 & 64512) === 56320) {
                        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                        m_pos++;
                      }
                    }
                    if (c < 128) {
                      buf[i++] = c;
                    } else if (c < 2048) {
                      buf[i++] = 192 | c >>> 6;
                      buf[i++] = 128 | c & 63;
                    } else if (c < 65536) {
                      buf[i++] = 224 | c >>> 12;
                      buf[i++] = 128 | c >>> 6 & 63;
                      buf[i++] = 128 | c & 63;
                    } else {
                      buf[i++] = 240 | c >>> 18;
                      buf[i++] = 128 | c >>> 12 & 63;
                      buf[i++] = 128 | c >>> 6 & 63;
                      buf[i++] = 128 | c & 63;
                    }
                  }
                  return buf;
                };
                const buf2binstring = (buf, len) => {
                  if (len < 65534) {
                    if (buf.subarray && STR_APPLY_UIA_OK) {
                      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
                    }
                  }
                  let result = "";
                  for (let i = 0; i < len; i++) {
                    result += String.fromCharCode(buf[i]);
                  }
                  return result;
                };
                var buf2string = (buf, max) => {
                  const len = max || buf.length;
                  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
                    return new TextDecoder().decode(buf.subarray(0, max));
                  }
                  let i, out;
                  const utf16buf = new Array(len * 2);
                  for (out = 0, i = 0; i < len; ) {
                    let c = buf[i++];
                    if (c < 128) {
                      utf16buf[out++] = c;
                      continue;
                    }
                    let c_len = _utf8len[c];
                    if (c_len > 4) {
                      utf16buf[out++] = 65533;
                      i += c_len - 1;
                      continue;
                    }
                    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
                    while (c_len > 1 && i < len) {
                      c = c << 6 | buf[i++] & 63;
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
                const toString$1 = Object.prototype.toString;
                const {
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
                const BAD$1 = 16209;
                const TYPE$1 = 16191;
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
                const MAXBITS = 15;
                const ENOUGH_LENS$1 = 852;
                const ENOUGH_DISTS$1 = 592;
                const CODES$1 = 0;
                const LENS$1 = 1;
                const DISTS$1 = 2;
                const lbase = new Uint16Array([
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
                const lext = new Uint8Array([
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
                const dbase = new Uint16Array([
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
                const dext = new Uint8Array([
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
                const inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
                  const bits = opts.bits;
                  let len = 0;
                  let sym = 0;
                  let min = 0, max = 0;
                  let root = 0;
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
                  root = bits;
                  for (max = MAXBITS; max >= 1; max--) {
                    if (count[max] !== 0) {
                      break;
                    }
                  }
                  if (root > max) {
                    root = max;
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
                  if (root < min) {
                    root = min;
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
                  curr = root;
                  drop = 0;
                  low = -1;
                  used = 1 << root;
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
                    if (len > root && (huff & mask) !== low) {
                      if (drop === 0) {
                        drop = root;
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
                      table[low] = root << 24 | curr << 16 | next - table_index | 0;
                    }
                  }
                  if (huff !== 0) {
                    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
                  }
                  opts.bits = root;
                  return 0;
                };
                var inftrees = inflate_table;
                const CODES = 0;
                const LENS = 1;
                const DISTS = 2;
                const {
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
                const HEAD = 16180;
                const FLAGS = 16181;
                const TIME = 16182;
                const OS = 16183;
                const EXLEN = 16184;
                const EXTRA = 16185;
                const NAME = 16186;
                const COMMENT = 16187;
                const HCRC = 16188;
                const DICTID = 16189;
                const DICT = 16190;
                const TYPE = 16191;
                const TYPEDO = 16192;
                const STORED = 16193;
                const COPY_ = 16194;
                const COPY = 16195;
                const TABLE = 16196;
                const LENLENS = 16197;
                const CODELENS = 16198;
                const LEN_ = 16199;
                const LEN = 16200;
                const LENEXT = 16201;
                const DIST = 16202;
                const DISTEXT = 16203;
                const MATCH = 16204;
                const LIT = 16205;
                const CHECK = 16206;
                const LENGTH = 16207;
                const DONE = 16208;
                const BAD = 16209;
                const MEM = 16210;
                const SYNC = 16211;
                const ENOUGH_LENS = 852;
                const ENOUGH_DISTS = 592;
                const MAX_WBITS = 15;
                const DEF_WBITS = MAX_WBITS;
                const zswap32 = (q) => {
                  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
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
                const inflateStateCheck = (strm) => {
                  if (!strm) {
                    return 1;
                  }
                  const state = strm.state;
                  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
                    return 1;
                  }
                  return 0;
                };
                const inflateResetKeep = (strm) => {
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
                const inflateReset = (strm) => {
                  if (inflateStateCheck(strm)) {
                    return Z_STREAM_ERROR$1;
                  }
                  const state = strm.state;
                  state.wsize = 0;
                  state.whave = 0;
                  state.wnext = 0;
                  return inflateResetKeep(strm);
                };
                const inflateReset2 = (strm, windowBits) => {
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
                const inflateInit2 = (strm, windowBits) => {
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
                const inflateInit = (strm) => {
                  return inflateInit2(strm, DEF_WBITS);
                };
                let virgin = true;
                let lenfix, distfix;
                const fixedtables = (state) => {
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
                const updatewindow = (strm, src, end, copy) => {
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
                const inflate$2 = (strm, flush) => {
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
                  let n;
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
                                n = here_bits + 2;
                                while (bits < n) {
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
                                n = here_bits + 3;
                                while (bits < n) {
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
                                n = here_bits + 7;
                                while (bits < n) {
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
                            n = state.extra;
                            while (bits < n) {
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
                            n = state.extra;
                            while (bits < n) {
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
                const inflateEnd = (strm) => {
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
                const inflateGetHeader = (strm, head) => {
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
                const inflateSetDictionary = (strm, dictionary) => {
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
                const toString = Object.prototype.toString;
                const {
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
                const { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
                const { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
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
              }
            )
            /******/
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            __webpack_modules__[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          (() => {
            __webpack_require__.n = (module2) => {
              var getter = module2 && module2.__esModule ? (
                /******/
                () => module2["default"]
              ) : (
                /******/
                () => module2
              );
              __webpack_require__.d(getter, { a: getter });
              return getter;
            };
          })();
          (() => {
            __webpack_require__.d = (exports2, definition) => {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          })();
          (() => {
            __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
          })();
          (() => {
            __webpack_require__.r = (exports2) => {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          })();
          var __webpack_exports__ = {};
          (() => {
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, {
              /* harmony export */
              DensityMaps: () => (
                /* binding */
                DensityMaps
              ),
              /* harmony export */
              load: () => (
                /* binding */
                load2
              )
              /* harmony export */
            });
            var fast_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
              /*! fast-png */
              "./node_modules/fast-png/lib-esm/index.js"
            );
            async function load2(dataSource, containerid = "contforvis", zoom = 1, tagid = null) {
              return DensityMaps.load(dataSource, containerid, zoom, tagid);
            }
            class DensityMaps {
              #hBlurPipeline;
              #vBlurPipeline;
              #device = null;
              #adapter = null;
              #bindGroups = null;
              #step = 0;
              // Track how many 
              #GRID_SIZE_X;
              #GRID_SIZE_Y;
              #WORKGROUP_SIZE = 8;
              #context;
              #cellPipeline;
              #vertexBuffer;
              #vertices;
              #cellStateArray;
              #cellStateStorage;
              #uniformAdjustBuffer;
              #uniformBlurBuffer;
              #img;
              #pipelines = [];
              #gk;
              canvas;
              params = {
                mi: 0,
                ma: 8,
                radius: 4,
                blurtype: "",
                colorscale: ""
              };
              constructor() {
                this.#gk = DensityMaps.makeGaussKernel(this.params.radius);
              }
              static makeGaussKernel(sigma) {
                if (sigma == 0)
                  return new Float32Array(1).fill(1, 0, 1);
                const GAUSSKERN = 6;
                var dim = parseInt(Math.max(3, GAUSSKERN * sigma));
                var sqrtSigmaPi2 = Math.sqrt(Math.PI * 2) * sigma;
                var s2 = 2 * sigma * sigma;
                var sum = 0;
                var kernel = new Float32Array(dim - !(dim & 1));
                const half = parseInt(kernel.length / 2);
                for (var j = 0, i = -half; j < kernel.length; i++, j++) {
                  kernel[j] = Math.exp(-(i * i) / s2) / sqrtSigmaPi2;
                  sum += kernel[j];
                }
                for (i = 0; i < dim; i++) {
                  kernel[i] /= sum;
                }
                return kernel;
              }
              async debug() {
                let gk = DensityMaps.makeGaussKernel(DensityMaps.params.radius);
                let kt = "** ";
                for (let v of gk)
                  kt = kt + v + " ";
                console.log(kt);
                let dm = await load2({
                  width: 8,
                  height: 8,
                  data: new Uint16Array([
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    8,
                    10,
                    8,
                    0,
                    0,
                    0,
                    0,
                    8,
                    13,
                    14,
                    13,
                    8,
                    0,
                    0,
                    0,
                    10,
                    14,
                    16,
                    14,
                    10,
                    0,
                    0,
                    0,
                    8,
                    13,
                    14,
                    13,
                    8,
                    0,
                    0,
                    0,
                    0,
                    8,
                    10,
                    8,
                    0,
                    0,
                    0,
                    0,
                    0,
                    8,
                    10,
                    8,
                    0,
                    0
                  ])
                }, "contid", 4);
                dm.render();
                this.params.mi = 1;
                this.params.ma = 8;
              }
              static async load(dataSource, containerid = "contforvis", zoom = 1, tagid = null) {
                let container = containerid;
                if (typeof container == "string")
                  container = document.getElementById(containerid);
                let newobj = new DensityMaps();
                if (typeof dataSource == "string") {
                  const response = await fetch("/p?dataname=" + dataSource, {
                    method: "GET",
                    headers: {
                      /* Accept: 'image/png',*/
                      "Content-Type": "application/octet-stream"
                    },
                    responseType: "arraybuffer"
                  });
                  if (!response.ok)
                    throw new Error(`Response status: ${response.status}`);
                  const data = await response.arrayBuffer();
                  newobj.#img = (0, fast_png__WEBPACK_IMPORTED_MODULE_0__.decode)(data);
                  dataSource = newobj.#img;
                } else if (typeof dataSource == "object") {
                  if (dataSource.data.length != dataSource.width * dataSource.height)
                    throw new Error(
                      `Inconsistent data source length ${dataSource.data.length} != ${dataSource.width * dataSource.height}`
                    );
                  newobj.#img = dataSource;
                }
                let id = tagid == null ? "" : `id="${tagid}"`;
                container.innerHTML = `<canvas ${id} width="${Math.trunc(dataSource.width * zoom)}" height="${Math.trunc(dataSource.height * zoom)}"></canvas>`;
                newobj.canvas = container.firstChild;
                newobj.#adapter = await navigator.gpu.requestAdapter();
                if (!newobj.#adapter) {
                  throw new Error("WebGPU not supported on this browser.");
                }
                newobj.#device = await newobj.#adapter.requestDevice();
                newobj.init();
                return newobj;
              }
              setDataSource(dataSource) {
                if (typeof dataSource != "object")
                  throw new Error(`Invalid data source ${dataSource}`);
                if (dataSource.data.length != dataSource.width * dataSource.height)
                  throw new Error(
                    `Inconsistent data source length ${dataSource.data.length} != ${dataSource.width * dataSource.height}`
                  );
                if (dataSource.data.length != this.#img.data.length)
                  throw new Error(
                    `Invalid data source size (${dataSource.data.width}, ${dataSource.data.height}) != (${this.#img.data.width},${this.#img.data.height})`
                  );
                this.#img = dataSource;
                this.reset();
              }
              init() {
                if (!this.#img) return;
                this.#GRID_SIZE_X = this.#img.width;
                this.#GRID_SIZE_Y = this.#img.height;
                this.#context = this.canvas.getContext("webgpu");
                const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
                this.#context.configure({
                  device: this.#device,
                  format: canvasFormat,
                  alphaMode: "premultiplied"
                });
                this.#vertices = new Float32Array([
                  //   X,    Y,
                  -1,
                  -1,
                  // Triangle 1 (Blue)
                  1,
                  -1,
                  1,
                  1,
                  -1,
                  -1,
                  // Triangle 2 (Red)
                  1,
                  1,
                  -1,
                  1
                ]);
                this.#vertexBuffer = this.#device.createBuffer({
                  label: "Cell vertices",
                  size: this.#vertices.byteLength,
                  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
                });
                this.#device.queue.writeBuffer(
                  this.#vertexBuffer,
                  /*bufferOffset=*/
                  0,
                  this.#vertices
                );
                const vertexBufferLayout = {
                  arrayStride: 8,
                  attributes: [{
                    format: "float32x2",
                    offset: 0,
                    shaderLocation: 0
                    // Position, see vertex shader
                  }]
                };
                const uniformGridArray = new Float32Array([this.#GRID_SIZE_X, this.#GRID_SIZE_Y]);
                const uniformGridBuffer = this.#device.createBuffer({
                  label: "Grid Uniforms",
                  size: uniformGridArray.byteLength,
                  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
                });
                this.#device.queue.writeBuffer(uniformGridBuffer, 0, uniformGridArray);
                const uniformBlurArray = new Float32Array(this.#gk);
                this.#uniformBlurBuffer = this.#device.createBuffer({
                  label: "Blur Uniforms",
                  size: uniformBlurArray.byteLength,
                  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
                });
                this.#device.queue.writeBuffer(this.#uniformBlurBuffer, 0, uniformBlurArray);
                const uniformAdjustArray = new Float32Array([1e3, 1400, 1e-4]);
                this.#uniformAdjustBuffer = this.#device.createBuffer({
                  label: "Adjust Uniforms",
                  size: uniformAdjustArray.byteLength,
                  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
                });
                this.#device.queue.writeBuffer(this.#uniformAdjustBuffer, 0, uniformAdjustArray);
                this.#cellStateArray = Uint32Array.from(this.#img.data);
                this.#cellStateStorage = [
                  this.#device.createBuffer({
                    label: "Cell State A",
                    size: this.#cellStateArray.byteLength,
                    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
                  }),
                  this.#device.createBuffer({
                    label: "Cell State B",
                    size: this.#cellStateArray.byteLength,
                    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
                  })
                ];
                this.#device.queue.writeBuffer(this.#cellStateStorage[0], 0, this.#cellStateArray);
                this.#device.queue.writeBuffer(this.#cellStateStorage[1], 0, this.#cellStateArray);
                const cellShaderModule = this.#device.createShaderModule({
                  label: "Cell shader",
                  code: `
        struct VertexInput {
          @location(0) pos: vec2f,
          @builtin(instance_index) instance: u32,
        };

        struct VertexOutput {
          @builtin(position) pos: vec4f,
          @location(0) cell: vec2f, 
          @location(1) @interpolate(flat) val: u32 
        };

        @group(0) @binding(0) var<uniform> grid: vec2f;
        @group(0) @binding(1) var<storage> cellState: array<u32>; 
        @group(0) @binding(4) var<uniform> globAdjust: vec2f;


        @vertex
        fn vertexMain(input: VertexInput) -> VertexOutput  {
          let i = f32(input.instance);
          let cell = vec2f(i % grid.x, grid.y-floor(i / grid.x));
          let state = f32(cellState[input.instance]); // New line!            

          let cellOffset = cell / grid * 2;
          let gridPos = (input.pos - vec2(-1,1)) / grid - 1 + cellOffset;
          
          var output: VertexOutput;
          output.pos = vec4f(gridPos, 0, 1);
          output.cell = cell; 
          output.val = cellState[input.instance]; 
          return output;
        }
          
        struct FragInput {
          @location(0) cell: vec2f,
          @location(1) @interpolate(flat)  val: u32,
        };

        @fragment
        fn fragmentMain(input: FragInput) -> @location(0) vec4f {
          let bb1 = 1-max(input.cell.x/grid.x, input.cell.y/grid.y);
          let bb2 = sqrt(max(0.0,f32(input.val)-globAdjust[0]))/(globAdjust[1]-globAdjust[0]); 
          if (f32(input.val)<globAdjust[0]){
            return vec4f(0.0, 0.0, 0.0, 0.0);
          } else {
            return vec4f(bb2, bb2, bb2, 1.0);//input.cell/grid
          }
        }

      `
                });
                const bindGroupLayout = this.#device.createBindGroupLayout({
                  label: "Cell Bind Group Layout",
                  entries: [{
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                    buffer: {}
                    // Grid uniform buffer
                  }, {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                    buffer: { type: "read-only-storage" }
                    // Cell state input buffer
                  }, {
                    binding: 2,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "storage" }
                    // Cell state output buffer
                  }, {
                    binding: 3,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "read-only-storage" }
                    // blur buffer
                  }, {
                    binding: 4,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    buffer: {}
                    // color adjustement uniform buffer
                  }]
                });
                const pipelineLayout = this.#device.createPipelineLayout({
                  label: "Cell Pipeline Layout",
                  bindGroupLayouts: [bindGroupLayout]
                });
                this.#cellPipeline = this.#device.createRenderPipeline({
                  label: "Cell pipeline",
                  layout: pipelineLayout,
                  vertex: {
                    module: cellShaderModule,
                    entryPoint: "vertexMain",
                    buffers: [vertexBufferLayout]
                  },
                  fragment: {
                    module: cellShaderModule,
                    entryPoint: "fragmentMain",
                    targets: [{
                      format: canvasFormat
                    }]
                  }
                });
                this.#bindGroups = [
                  this.#device.createBindGroup({
                    label: "Cell renderer bind group A",
                    layout: bindGroupLayout,
                    entries: [{
                      binding: 0,
                      resource: { buffer: uniformGridBuffer }
                    }, {
                      binding: 1,
                      resource: { buffer: this.#cellStateStorage[0] }
                    }, {
                      binding: 2,
                      resource: { buffer: this.#cellStateStorage[1] }
                    }, {
                      binding: 3,
                      resource: { buffer: this.#uniformBlurBuffer }
                    }, {
                      binding: 4,
                      resource: { buffer: this.#uniformAdjustBuffer }
                    }]
                  }),
                  this.#device.createBindGroup({
                    label: "Cell renderer bind group B",
                    layout: bindGroupLayout,
                    entries: [{
                      binding: 0,
                      resource: { buffer: uniformGridBuffer }
                    }, {
                      binding: 1,
                      resource: { buffer: this.#cellStateStorage[1] }
                    }, {
                      binding: 2,
                      resource: { buffer: this.#cellStateStorage[0] }
                    }, {
                      binding: 3,
                      resource: { buffer: this.#uniformBlurBuffer }
                    }, {
                      binding: 4,
                      resource: { buffer: this.#uniformAdjustBuffer }
                    }]
                  })
                ];
                const hBlurShaderModule = this.#device.createShaderModule({
                  label: "horizontal blur",
                  code: `
        @group(0) @binding(0) var<uniform> grid: vec2f; // New line
        @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
        @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;
        @group(0) @binding(3) var<storage> blur: array<f32>; // New line
        
        fn cellIndex(cell: vec2u) -> u32 {
          return (cell.y % u32(grid.y)) * u32(grid.x) +
                (cell.x % u32(grid.x));
        }

        fn cellActive(x: u32, y: u32) -> u32 {
          return cellStateIn[cellIndex(vec2(x, y))];
        }

        @compute @workgroup_size(${this.#WORKGROUP_SIZE}, ${this.#WORKGROUP_SIZE}) // New line
        fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
          let r:u32 = u32((arrayLength(&blur)-1)/2);
          var sum:f32=0;
          var ws:f32=0;
          for(var i: i32=-i32(r); i<=i32(r); i++) {
            sum += blur[u32(i32(r)-i)]*f32(cellActive(u32(i32(cell.x)+i), cell.y+0));
            ws  += blur[u32(i32(r)-i)];
          }

          let i = cellIndex(cell.xy);
          cellStateOut[i] = u32(sum/ws);
        }
        `
                });
                const vBlurShaderModule = this.#device.createShaderModule({
                  label: "vertical blur",
                  code: `
        @group(0) @binding(0) var<uniform> grid: vec2f; // New line
        @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
        @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;
        @group(0) @binding(3) var<storage> blur: array<f32>; // New line
        
        fn cellIndex(cell: vec2u) -> u32 {
          return (cell.y % u32(grid.y)) * u32(grid.x) +
                (cell.x % u32(grid.x));
        }

        fn cellActive(x: u32, y: u32) -> u32 {
          return cellStateIn[cellIndex(vec2(x, y))];
        }

        @compute @workgroup_size(${this.#WORKGROUP_SIZE}, ${this.#WORKGROUP_SIZE}) // New line
        fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
          let r:u32 = u32((arrayLength(&blur)-1)/2);
          var sum:f32=0;
          var ws:f32=0;
          for(var i: i32=-i32(r); i<=i32(r); i++) {
            sum += blur[u32(i32(r)-i)]*f32(cellActive(cell.x+0, u32(i32(cell.y)+i)));
            ws  += blur[u32(i32(r)-i)];
          }
          let sum2 =  1*cellActive(cell.x+1, cell.y+1) +
                      2*cellActive(cell.x+1, cell.y) +
                      1*cellActive(cell.x+1, cell.y-1) +
                      1*cellActive(cell.x-1, cell.y-1) +
                      2*cellActive(cell.x-1, cell.y) +
                      1*cellActive(cell.x-1, cell.y+1) +
                      2*cellActive(cell.x,   cell.y-1) +
                      4*cellActive(cell.x,   cell.y) +
                      2*cellActive(cell.x,   cell.y+1);
          let i = cellIndex(cell.xy);

          // Conway's game of life rules:
          /*switch sum {
            case 2: { // Active cells with 2 neighbors stay active.
              cellStateOut[i] = cellStateIn[i];
            }
            case 3: { // Cells with 3 neighbors become or stay active.
              cellStateOut[i] = 1;
            }
            default: { // Cells with < 2 or > 3 neighbors become inactive.
              cellStateOut[i] = 0;
            }
          }*/
          cellStateOut[i] = u32(sum/ws);
        }
        `
                });
                this.#hBlurPipeline = this.#device.createComputePipeline({
                  label: "hBlur pipeline",
                  layout: pipelineLayout,
                  compute: {
                    module: hBlurShaderModule,
                    entryPoint: "computeMain"
                  }
                });
                this.#vBlurPipeline = this.#device.createComputePipeline({
                  label: "vBlur pipeline",
                  layout: pipelineLayout,
                  compute: {
                    module: vBlurShaderModule,
                    entryPoint: "computeMain"
                  }
                });
                const encoder = this.#device.createCommandEncoder();
                const pass = encoder.beginRenderPass({
                  colorAttachments: [{
                    view: this.#context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: { r: 0.2, g: 0.1, b: 0.4, a: 1 },
                    // New line
                    storeOp: "store"
                  }]
                });
                pass;
              }
              async applyColorScale() {
              }
              async applyBlur() {
                this.#gk = DensityMaps.makeGaussKernel(this.params.radius);
                this.init();
                this.#pipelines = [];
                if (this.params.blurtype == "h")
                  this.#pipelines = [this.#hBlurPipeline];
                else if (this.params.blurtype == "v")
                  this.#pipelines = [this.#vBlurPipeline];
                else if (this.params.blurtype == "both")
                  this.#pipelines = [this.#hBlurPipeline, this.#vBlurPipeline];
                this.updateData();
              }
              // Move all of our rendering code into a function
              updateData() {
                if (!this.#device) return;
                const encoder = this.#device.createCommandEncoder();
                for (let pipeline of this.#pipelines) {
                  const computePass = encoder.beginComputePass();
                  computePass.setPipeline(pipeline);
                  computePass.setBindGroup(0, this.#bindGroups[this.#step % 2]);
                  const workgroupCountX = Math.ceil(this.#GRID_SIZE_X / this.#WORKGROUP_SIZE);
                  const workgroupCountY = Math.ceil(this.#GRID_SIZE_X / this.#WORKGROUP_SIZE);
                  computePass.dispatchWorkgroups(workgroupCountX, workgroupCountY);
                  computePass.end();
                  this.#step++;
                }
                this.#device.queue.submit([encoder.finish()]);
                this.render();
              }
              render() {
                if (!this.#device) return;
                const uniformAdjustArray = new Float32Array([this.params.mi, this.params.mi + this.params.ma, 1e-4]);
                this.#device.queue.writeBuffer(this.#uniformAdjustBuffer, 0, uniformAdjustArray);
                const encoder = this.#device.createCommandEncoder();
                const pass = encoder.beginRenderPass({
                  colorAttachments: [{
                    view: this.#context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: { r: 0, g: 0, b: 0.4, a: 1 },
                    storeOp: "store"
                  }]
                });
                pass.setPipeline(this.#cellPipeline);
                pass.setBindGroup(0, this.#bindGroups[this.#step % 2]);
                pass.setVertexBuffer(0, this.#vertexBuffer);
                pass.draw(this.#vertices.length / 2, this.#GRID_SIZE_X * this.#GRID_SIZE_Y);
                pass.end();
                this.#device.queue.submit([encoder.finish()]);
              }
              reset() {
                this.#cellStateArray = Uint32Array.from(this.#img.data);
                this.#device.queue.writeBuffer(this.#cellStateStorage[0], 0, this.#cellStateArray);
                this.#device.queue.writeBuffer(this.#cellStateStorage[1], 0, this.#cellStateArray);
                this.render();
              }
            }
          })();
          return __webpack_exports__;
        })()
      );
    });
  }
});

// node_modules/lz4js/util.js
var require_util = __commonJS({
  "node_modules/lz4js/util.js"(exports) {
    exports.hashU32 = function hashU32(a) {
      a = a | 0;
      a = a + 2127912214 + (a << 12) | 0;
      a = a ^ -949894596 ^ a >>> 19;
      a = a + 374761393 + (a << 5) | 0;
      a = a + -744332180 ^ a << 9;
      a = a + -42973499 + (a << 3) | 0;
      return a ^ -1252372727 ^ a >>> 16 | 0;
    };
    exports.readU64 = function readU64(b, n) {
      var x = 0;
      x |= b[n++] << 0;
      x |= b[n++] << 8;
      x |= b[n++] << 16;
      x |= b[n++] << 24;
      x |= b[n++] << 32;
      x |= b[n++] << 40;
      x |= b[n++] << 48;
      x |= b[n++] << 56;
      return x;
    };
    exports.readU32 = function readU32(b, n) {
      var x = 0;
      x |= b[n++] << 0;
      x |= b[n++] << 8;
      x |= b[n++] << 16;
      x |= b[n++] << 24;
      return x;
    };
    exports.writeU32 = function writeU32(b, n, x) {
      b[n++] = x >> 0 & 255;
      b[n++] = x >> 8 & 255;
      b[n++] = x >> 16 & 255;
      b[n++] = x >> 24 & 255;
    };
    exports.imul = function imul(a, b) {
      var ah = a >>> 16;
      var al = a & 65535;
      var bh = b >>> 16;
      var bl = b & 65535;
      return al * bl + (ah * bl + al * bh << 16) | 0;
    };
  }
});

// node_modules/lz4js/xxh32.js
var require_xxh32 = __commonJS({
  "node_modules/lz4js/xxh32.js"(exports) {
    var util = require_util();
    var prime1 = 2654435761;
    var prime2 = 2246822519;
    var prime3 = 3266489917;
    var prime4 = 668265263;
    var prime5 = 374761393;
    function rotl32(x, r) {
      x = x | 0;
      r = r | 0;
      return x >>> (32 - r | 0) | x << r | 0;
    }
    function rotmul32(h, r, m) {
      h = h | 0;
      r = r | 0;
      m = m | 0;
      return util.imul(h >>> (32 - r | 0) | h << r, m) | 0;
    }
    function shiftxor32(h, s) {
      h = h | 0;
      s = s | 0;
      return h >>> s ^ h | 0;
    }
    function xxhapply(h, src, m0, s, m1) {
      return rotmul32(util.imul(src, m0) + h, s, m1);
    }
    function xxh1(h, src, index) {
      return rotmul32(h + util.imul(src[index], prime5), 11, prime1);
    }
    function xxh4(h, src, index) {
      return xxhapply(h, util.readU32(src, index), prime3, 17, prime4);
    }
    function xxh16(h, src, index) {
      return [
        xxhapply(h[0], util.readU32(src, index + 0), prime2, 13, prime1),
        xxhapply(h[1], util.readU32(src, index + 4), prime2, 13, prime1),
        xxhapply(h[2], util.readU32(src, index + 8), prime2, 13, prime1),
        xxhapply(h[3], util.readU32(src, index + 12), prime2, 13, prime1)
      ];
    }
    function xxh32(seed, src, index, len) {
      var h, l;
      l = len;
      if (len >= 16) {
        h = [
          seed + prime1 + prime2,
          seed + prime2,
          seed,
          seed - prime1
        ];
        while (len >= 16) {
          h = xxh16(h, src, index);
          index += 16;
          len -= 16;
        }
        h = rotl32(h[0], 1) + rotl32(h[1], 7) + rotl32(h[2], 12) + rotl32(h[3], 18) + l;
      } else {
        h = seed + prime5 + len >>> 0;
      }
      while (len >= 4) {
        h = xxh4(h, src, index);
        index += 4;
        len -= 4;
      }
      while (len > 0) {
        h = xxh1(h, src, index);
        index++;
        len--;
      }
      h = shiftxor32(util.imul(shiftxor32(util.imul(shiftxor32(h, 15), prime2), 13), prime3), 16);
      return h >>> 0;
    }
    exports.hash = xxh32;
  }
});

// node_modules/lz4js/lz4.js
var require_lz4 = __commonJS({
  "node_modules/lz4js/lz4.js"(exports) {
    var xxhash = require_xxh32();
    var util = require_util();
    var minMatch = 4;
    var minLength = 13;
    var searchLimit = 5;
    var skipTrigger = 6;
    var hashSize = 1 << 16;
    var mlBits = 4;
    var mlMask = (1 << mlBits) - 1;
    var runBits = 4;
    var runMask = (1 << runBits) - 1;
    var blockBuf = makeBuffer(5 << 20);
    var hashTable = makeHashTable();
    var magicNum = 407708164;
    var fdContentChksum = 4;
    var fdContentSize = 8;
    var fdBlockChksum = 16;
    var fdVersion = 64;
    var fdVersionMask = 192;
    var bsUncompressed = 2147483648;
    var bsDefault = 7;
    var bsShift = 4;
    var bsMask = 7;
    var bsMap = {
      4: 65536,
      5: 262144,
      6: 1048576,
      7: 4194304
    };
    function makeHashTable() {
      try {
        return new Uint32Array(hashSize);
      } catch (error) {
        var hashTable2 = new Array(hashSize);
        for (var i = 0; i < hashSize; i++) {
          hashTable2[i] = 0;
        }
        return hashTable2;
      }
    }
    function clearHashTable(table) {
      for (var i = 0; i < hashSize; i++) {
        hashTable[i] = 0;
      }
    }
    function makeBuffer(size) {
      try {
        return new Uint8Array(size);
      } catch (error) {
        var buf = new Array(size);
        for (var i = 0; i < size; i++) {
          buf[i] = 0;
        }
        return buf;
      }
    }
    function sliceArray(array, start, end) {
      if (typeof array.buffer !== void 0) {
        if (Uint8Array.prototype.slice) {
          return array.slice(start, end);
        } else {
          var len = array.length;
          start = start | 0;
          start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
          end = end === void 0 ? len : end | 0;
          end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
          var arraySlice = new Uint8Array(end - start);
          for (var i = start, n = 0; i < end; ) {
            arraySlice[n++] = array[i++];
          }
          return arraySlice;
        }
      } else {
        return array.slice(start, end);
      }
    }
    exports.compressBound = function compressBound(n) {
      return n + n / 255 + 16 | 0;
    };
    exports.decompressBound = function decompressBound(src) {
      var sIndex = 0;
      if (util.readU32(src, sIndex) !== magicNum) {
        throw new Error("invalid magic number");
      }
      sIndex += 4;
      var descriptor = src[sIndex++];
      if ((descriptor & fdVersionMask) !== fdVersion) {
        throw new Error("incompatible descriptor version " + (descriptor & fdVersionMask));
      }
      var useBlockSum = (descriptor & fdBlockChksum) !== 0;
      var useContentSize = (descriptor & fdContentSize) !== 0;
      var bsIdx = src[sIndex++] >> bsShift & bsMask;
      if (bsMap[bsIdx] === void 0) {
        throw new Error("invalid block size " + bsIdx);
      }
      var maxBlockSize = bsMap[bsIdx];
      if (useContentSize) {
        return util.readU64(src, sIndex);
      }
      sIndex++;
      var maxSize = 0;
      while (true) {
        var blockSize = util.readU32(src, sIndex);
        sIndex += 4;
        if (blockSize & bsUncompressed) {
          blockSize &= ~bsUncompressed;
          maxSize += blockSize;
        } else {
          maxSize += maxBlockSize;
        }
        if (blockSize === 0) {
          return maxSize;
        }
        if (useBlockSum) {
          sIndex += 4;
        }
        sIndex += blockSize;
      }
    };
    exports.makeBuffer = makeBuffer;
    exports.decompressBlock = function decompressBlock(src, dst, sIndex, sLength, dIndex) {
      var mLength, mOffset, sEnd, n, i;
      sEnd = sIndex + sLength;
      while (sIndex < sEnd) {
        var token = src[sIndex++];
        var literalCount = token >> 4;
        if (literalCount > 0) {
          if (literalCount === 15) {
            while (true) {
              literalCount += src[sIndex];
              if (src[sIndex++] !== 255) {
                break;
              }
            }
          }
          for (n = sIndex + literalCount; sIndex < n; ) {
            dst[dIndex++] = src[sIndex++];
          }
        }
        if (sIndex >= sEnd) {
          break;
        }
        mLength = token & 15;
        mOffset = src[sIndex++] | src[sIndex++] << 8;
        if (mLength === 15) {
          while (true) {
            mLength += src[sIndex];
            if (src[sIndex++] !== 255) {
              break;
            }
          }
        }
        mLength += minMatch;
        for (i = dIndex - mOffset, n = i + mLength; i < n; ) {
          dst[dIndex++] = dst[i++] | 0;
        }
      }
      return dIndex;
    };
    exports.compressBlock = function compressBlock(src, dst, sIndex, sLength, hashTable2) {
      var mIndex, mAnchor, mLength, mOffset, mStep;
      var literalCount, dIndex, sEnd, n;
      dIndex = 0;
      sEnd = sLength + sIndex;
      mAnchor = sIndex;
      if (sLength >= minLength) {
        var searchMatchCount = (1 << skipTrigger) + 3;
        while (sIndex + minMatch < sEnd - searchLimit) {
          var seq = util.readU32(src, sIndex);
          var hash = util.hashU32(seq) >>> 0;
          hash = (hash >> 16 ^ hash) >>> 0 & 65535;
          mIndex = hashTable2[hash] - 1;
          hashTable2[hash] = sIndex + 1;
          if (mIndex < 0 || sIndex - mIndex >>> 16 > 0 || util.readU32(src, mIndex) !== seq) {
            mStep = searchMatchCount++ >> skipTrigger;
            sIndex += mStep;
            continue;
          }
          searchMatchCount = (1 << skipTrigger) + 3;
          literalCount = sIndex - mAnchor;
          mOffset = sIndex - mIndex;
          sIndex += minMatch;
          mIndex += minMatch;
          mLength = sIndex;
          while (sIndex < sEnd - searchLimit && src[sIndex] === src[mIndex]) {
            sIndex++;
            mIndex++;
          }
          mLength = sIndex - mLength;
          var token = mLength < mlMask ? mLength : mlMask;
          if (literalCount >= runMask) {
            dst[dIndex++] = (runMask << mlBits) + token;
            for (n = literalCount - runMask; n >= 255; n -= 255) {
              dst[dIndex++] = 255;
            }
            dst[dIndex++] = n;
          } else {
            dst[dIndex++] = (literalCount << mlBits) + token;
          }
          for (var i = 0; i < literalCount; i++) {
            dst[dIndex++] = src[mAnchor + i];
          }
          dst[dIndex++] = mOffset;
          dst[dIndex++] = mOffset >> 8;
          if (mLength >= mlMask) {
            for (n = mLength - mlMask; n >= 255; n -= 255) {
              dst[dIndex++] = 255;
            }
            dst[dIndex++] = n;
          }
          mAnchor = sIndex;
        }
      }
      if (mAnchor === 0) {
        return 0;
      }
      literalCount = sEnd - mAnchor;
      if (literalCount >= runMask) {
        dst[dIndex++] = runMask << mlBits;
        for (n = literalCount - runMask; n >= 255; n -= 255) {
          dst[dIndex++] = 255;
        }
        dst[dIndex++] = n;
      } else {
        dst[dIndex++] = literalCount << mlBits;
      }
      sIndex = mAnchor;
      while (sIndex < sEnd) {
        dst[dIndex++] = src[sIndex++];
      }
      return dIndex;
    };
    exports.decompressFrame = function decompressFrame(src, dst) {
      var useBlockSum, useContentSum, useContentSize, descriptor;
      var sIndex = 0;
      var dIndex = 0;
      if (util.readU32(src, sIndex) !== magicNum) {
        throw new Error("invalid magic number");
      }
      sIndex += 4;
      descriptor = src[sIndex++];
      if ((descriptor & fdVersionMask) !== fdVersion) {
        throw new Error("incompatible descriptor version");
      }
      useBlockSum = (descriptor & fdBlockChksum) !== 0;
      useContentSum = (descriptor & fdContentChksum) !== 0;
      useContentSize = (descriptor & fdContentSize) !== 0;
      var bsIdx = src[sIndex++] >> bsShift & bsMask;
      if (bsMap[bsIdx] === void 0) {
        throw new Error("invalid block size");
      }
      if (useContentSize) {
        sIndex += 8;
      }
      sIndex++;
      while (true) {
        var compSize;
        compSize = util.readU32(src, sIndex);
        sIndex += 4;
        if (compSize === 0) {
          break;
        }
        if (useBlockSum) {
          sIndex += 4;
        }
        if ((compSize & bsUncompressed) !== 0) {
          compSize &= ~bsUncompressed;
          for (var j = 0; j < compSize; j++) {
            dst[dIndex++] = src[sIndex++];
          }
        } else {
          dIndex = exports.decompressBlock(src, dst, sIndex, compSize, dIndex);
          sIndex += compSize;
        }
      }
      if (useContentSum) {
        sIndex += 4;
      }
      return dIndex;
    };
    exports.compressFrame = function compressFrame(src, dst) {
      var dIndex = 0;
      util.writeU32(dst, dIndex, magicNum);
      dIndex += 4;
      dst[dIndex++] = fdVersion;
      dst[dIndex++] = bsDefault << bsShift;
      dst[dIndex] = xxhash.hash(0, dst, 4, dIndex - 4) >> 8;
      dIndex++;
      var maxBlockSize = bsMap[bsDefault];
      var remaining = src.length;
      var sIndex = 0;
      clearHashTable(hashTable);
      while (remaining > 0) {
        var compSize = 0;
        var blockSize = remaining > maxBlockSize ? maxBlockSize : remaining;
        compSize = exports.compressBlock(src, blockBuf, sIndex, blockSize, hashTable);
        if (compSize > blockSize || compSize === 0) {
          util.writeU32(dst, dIndex, 2147483648 | blockSize);
          dIndex += 4;
          for (var z = sIndex + blockSize; sIndex < z; ) {
            dst[dIndex++] = src[sIndex++];
          }
          remaining -= blockSize;
        } else {
          util.writeU32(dst, dIndex, compSize);
          dIndex += 4;
          for (var j = 0; j < compSize; ) {
            dst[dIndex++] = blockBuf[j++];
          }
          sIndex += blockSize;
          remaining -= blockSize;
        }
      }
      util.writeU32(dst, dIndex, 0);
      dIndex += 4;
      return dIndex;
    };
    exports.decompress = function decompress2(src, maxSize) {
      var dst, size;
      if (maxSize === void 0) {
        maxSize = exports.decompressBound(src);
      }
      dst = exports.makeBuffer(maxSize);
      size = exports.decompressFrame(src, dst);
      if (size !== maxSize) {
        dst = sliceArray(dst, 0, size);
      }
      return dst;
    };
    exports.compress = function compress(src, maxSize) {
      var dst, size;
      if (maxSize === void 0) {
        maxSize = exports.compressBound(src.length);
      }
      dst = exports.makeBuffer(maxSize);
      size = exports.compressFrame(src, dst);
      if (size !== maxSize) {
        dst = sliceArray(dst, 0, size);
      }
      return dst;
    };
  }
});

// src/index.js
var import_densitymaps = __toESM(require_densityMaps());
var import_lz4js = __toESM(require_lz4());
import confetti from "https://esm.sh/canvas-confetti@1";
var dtypeToArray = {
  int8: Int8Array,
  int16: Int16Array,
  int32: Int32Array,
  uint8: Uint8Array,
  uint16: Uint16Array,
  uint32: Uint32Array,
  float32: Float32Array
};
function decompress(data) {
  if (data == null) {
    return null;
  }
  let dtype = data.dtype;
  let jstype = dtypeToArray[dtype];
  if (!jstype) {
    return null;
  }
  let shape = data.shape;
  let buffer = import_lz4js.default.decompress(
    new Uint8Array(data.buffer.buffer)
  ).buffer;
  let array = new jstype(buffer);
  if (array.length != shape[0] * shape[1])
    throw Error(`Invalid data size ${array.length} instead of ${shape[0] * shape[1]}`);
  return {
    width: shape[0],
    // not sure?
    height: shape[1],
    data: array
  };
}
function updateUI(model, datamap) {
  datamap.params.mi = model.get("minval");
  datamap.params.ma = model.get("maxval");
  datamap.params.blurtype = model.get("blurtype");
  datamap.params.radius = model.get("radius");
}
async function render({ model, el }) {
  let span = document.createElement("span");
  let densitymap = null;
  let randomStr = "mcdm-" + Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
  span.id = randomStr;
  console.log("hello from mcmd");
  el.classList.add("ipymcdm");
  el.appendChild(span);
  async function on_data_change() {
    const zoom = model.get("zoom");
    const array = model.get("array");
    const dataSource = decompress(array);
    if (dataSource != null) {
      if (densitymap == null) {
        console.log("Creating density map");
        densitymap = await (0, import_densitymaps.load)(dataSource, span, model.get("zoom"));
        updateUI(model, densitymap);
        densitymap.render();
      } else {
        updateUI(model, densitymap);
        densitymap.setDataSource(dataSource);
      }
    }
  }
  model.on("change:array", on_data_change);
  async function on_param_change() {
    if (densitymap == null) return;
    updateUI(model, densitymap);
    densitymap.render();
  }
  for (let prop in ["minval", "maxval"]) {
    model.on(`change:${prop}`, on_param_change);
  }
  await on_data_change();
}
var src_default = { render };
export {
  src_default as default
};
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
