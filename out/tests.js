"use strict";
// create 10 sample tests
// Language: typescript
// Path: src/model/tests.ts
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
// setup dotenv to use .env file from root
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../.env')
});
const test_model_1 = __importDefault(require("./model/test.model"));
const variant_model_1 = __importDefault(require("./model/variant.model"));
let tests = [
    new test_model_1.default(1, "Какой язык программирования используется для создания приложений на платформе Android?", [
        new variant_model_1.default(1, 1, "Java"),
        new variant_model_1.default(2, 1, "C#"),
        new variant_model_1.default(3, 1, "C++"),
        new variant_model_1.default(4, 1, "Python")
    ]),
    new test_model_1.default(2, "Какой из перечисленных вариантов не является правильным ответом на вопрос?", [
        new variant_model_1.default(1, 2, "В программировании на С++ используется оператор вызова метода"),
        new variant_model_1.default(2, 2, "В программировании на С++ используется оператор вызова метода"),
        new variant_model_1.default(3, 2, "В программировании на С++ используется оператор вызова метода"),
        new variant_model_1.default(4, 2, "В программировании на С++ используется оператор вызова метода")
    ]),
    new test_model_1.default(3, "Какой из перечисленных вариантов не является правильным ответом на вопрос?", [
        new variant_model_1.default(1, 3, "В программировании на С++ используется оператор вызова метода"),
        new variant_model_1.default(2, 3, "В программировании на С++ используется оператор вызова метода"),
        new variant_model_1.default(3, 3, "В программировании на С++ используется оператор вызова метода"),
        new variant_model_1.default(4, 3, "В программировании на С++ используется оператор вызова метода")
    ])
];
// add all tests to test storage
const test_storage_1 = __importDefault(require("./storage/test.storage"));
// add array of tests in for to test storage use async/await
function addTests(tests) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let test of tests) {
            yield test_storage_1.default.addTest(test);
        }
    });
}
addTests(tests);
