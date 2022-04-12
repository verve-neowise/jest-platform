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
const token_model_1 = __importDefault(require("../model/token.model"));
const storage_1 = __importDefault(require("./storage"));
function addToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'INSERT INTO tokens (user_id, app, token) values ($1, $2, $3);';
        yield storage_1.default.run(sql, [token.user_id, token.app, token.token]);
    });
}
function allTokens() {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'SELECT * FROM tokens;';
        let rows = yield storage_1.default.all(sql);
        return rows.map((row) => new token_model_1.default(row.id, row.user_id, row.app, row.token));
    });
}
function removeToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'DELETE FROM tokens WHERE id=$1';
        yield storage_1.default.run(sql, [id]);
    });
}
exports.default = {
    allTokens,
    removeToken,
    addToken
};
