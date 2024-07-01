"use strict";Object.defineProperty(exports, "__esModule", {value: true}); class Strings {
  static cleanStringSpace(text) {
    const trimmed = text.trim();

    return trimmed.replace(/\s{2,}/g, ' ');
  }
} exports.default = Strings;
