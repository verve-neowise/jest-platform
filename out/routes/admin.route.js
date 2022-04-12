"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const nanoid_1 = require("nanoid");
const token_model_1 = __importDefault(require("../model/token.model"));
const user_model_1 = __importStar(require("../model/user.model"));
const user_storage_1 = __importDefault(require("../storage/user.storage"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_storage_1 = __importDefault(require("../storage/token.storage"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => res.redirect('/admin/token'));
router.get('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tokens = yield token_storage_1.default.allTokens();
    res.render('token', { tokens });
}));
router.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { app } = req.body;
    let user = new user_model_1.default(0, (0, nanoid_1.nanoid)(), (0, nanoid_1.nanoid)(), user_model_1.Role.User);
    let id = yield user_storage_1.default.addUser(user);
    let data = { userId: id, role: user.role, username: user.username };
    let jwtToken = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
    let token = new token_model_1.default(0, id, app, jwtToken);
    yield token_storage_1.default.addToken(token);
    res.redirect('/admin');
}));
exports.default = router;
