Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _app = require('./dist/app');

const _app2 = _interopRequireDefault(_app);

_app2.default.listen(3000, () => console.log('iniciou!'));

// Export the Express API para funcionar no VERCEL
exports.default = _app2.default;
