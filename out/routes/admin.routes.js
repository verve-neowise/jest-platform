"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import token routes
const token_routes_1 = __importDefault(require("./token.routes"));
// import test routes
const test_routes_1 = __importDefault(require("./test.routes"));
const result_storage_1 = __importDefault(require("../storage/result.storage"));
const token_storage_1 = __importDefault(require("../storage/token.storage"));
const router = (0, express_1.Router)();
// use token routes
router.use('/token', token_routes_1.default);
// use test routes
router.use('/tests', test_routes_1.default);
// get results by token
router.get('/results/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = +req.params.id;
    let token = yield token_storage_1.default.findToken(id);
    let results = yield result_storage_1.default.allResults(token.user_id);
    res.render('results', { app: token.app, results });
}));
router.get('/', (req, res) => {
    res.render('admin');
});
exports.default = router;
