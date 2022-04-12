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
const test_model_1 = __importDefault(require("../model/test.model"));
const variant_model_1 = __importDefault(require("../model/variant.model"));
const storage_1 = __importDefault(require("./storage"));
function addTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'INSERT INTO tests (question) VALUES($1) RETURNING id;';
        let rows = yield storage_1.default.get(sql, [test.question]);
        let id = rows[0].id;
        for (const variant of test.variants) {
            yield addVariant(id, variant);
        }
    });
}
function allTests() {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'select * from tests;';
        let rows = yield storage_1.default.all(sql);
        let variants = yield getVariants();
        let tests = rows.map(row => {
            return new test_model_1.default(row.id, row.question, variants.filter(v => v.id == row.id));
        });
        return tests;
    });
}
function addVariant(id, variant) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'INSERT INTO variants (test_id, content, is_right) VALUES ($1, $2, $3);';
        yield storage_1.default.run(sql, [id, variant.content, variant.isRight]);
    });
}
function getVariants() {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = 'select * from variants;';
        let rows = yield storage_1.default.all(sql);
        return rows.map(row => new variant_model_1.default(row.id, row.test_id, row.content, row.is_right));
    });
}
exports.default = {
    addTest,
    allTests
};
