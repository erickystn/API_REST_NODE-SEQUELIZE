"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(3001, () => console.log('iniciou!'));

// Export the Express API para funcionar no VERCEL
exports. default = _app2.default;
