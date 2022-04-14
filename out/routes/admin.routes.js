"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import token routes
const token_routes_1 = __importDefault(require("./token.routes"));
// import test routes
const hb_test_routes_1 = __importDefault(require("./hb_test.routes"));
const router = (0, express_1.Router)();
// use token routes
router.use('/token', token_routes_1.default);
// use test routes
router.use('/tests', hb_test_routes_1.default);
router.get('/', (req, res) => {
    res.render('admin');
});
exports.default = router;
