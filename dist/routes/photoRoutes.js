"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _PhotoController = require('../controller/PhotoController'); var _PhotoController2 = _interopRequireDefault(_PhotoController);

const router = new (0, _express.Router)();

router.post('/', _authMiddleware2.default, _PhotoController2.default.store);

exports. default = router;
