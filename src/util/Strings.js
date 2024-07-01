export default class Strings {
  static cleanStringSpace(text) {
    const trimmed = text.trim();

    return trimmed.replace(/\s{2,}/g, ' ');
  }
}
