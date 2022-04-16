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
// create routes
// Language: typescript
// Path: src/routes/api.routes.ts
//
const express_1 = require("express");
const test_storage_1 = __importDefault(require("../storage/test.storage"));
const result_storage_1 = __importDefault(require("../storage/result.storage"));
const result_model_1 = __importDefault(require("../model/result.model"));
const router = (0, express_1.Router)();
// post results
router.post('/results', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get user id from token
    let userId = req.payload.userId;
    // send result to storage
    yield result_storage_1.default.addResult(new result_model_1.default(0, userId, req.body.username, req.body.count, req.body.of, new Date().toISOString()));
    res.sendStatus(200);
}));
// get all results
router.get('/results', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get user id from token
    let userId = req.payload.userId;
    // get all results by user id
    let results = yield result_storage_1.default.allResults(userId);
    res.send(results);
}));
// get all tests
router.get('/tests', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = shuffle(yield test_storage_1.default.allTests())
        .slice(0, 10)
        .map(test => {
        // shuffle variants
        test.variants = shuffle(test.variants);
        return test;
    });
    res.json(result);
}));
// shuffle array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
exports.default = router;
