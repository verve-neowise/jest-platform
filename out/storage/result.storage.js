"use strict";
// create result storage
// Language: typescript
// Path: src/storage/result.storage.ts
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
const storage_1 = __importDefault(require("./storage"));
const result_model_1 = __importDefault(require("../model/result.model"));
// add result
function addResult(result) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'INSERT INTO results (user_id, username, count, of, date) VALUES ($1, $2, $3, $4, $5);';
        yield storage_1.default.run(sql, [result.userId, result.username, result.count, result.of, result.date]);
    });
}
// get all results by user id
function allResults(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'select * from results where user_id = $1;';
        let rows = yield storage_1.default.all(sql, [userId]);
        return rows.map(row => {
            return new result_model_1.default(row.id, row.user_id, row.username, row.count, row.of, row.date);
        });
    });
}
exports.default = {
    addResult,
    allResults
};
