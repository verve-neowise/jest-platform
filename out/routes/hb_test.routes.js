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
// import router
const express_1 = require("express");
const test_model_1 = __importDefault(require("../model/test.model"));
const variant_model_1 = __importDefault(require("../model/variant.model"));
const test_storage_1 = __importDefault(require("../storage/test.storage"));
// create router
const router = (0, express_1.Router)();
// get all hb_tests
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all tests and save to variable
    let tests = yield test_storage_1.default.allTests();
    console.log(tests);
    res.render('tests', { tests });
}));
// post new hb_test
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // log body
    let { option_a, option_b, option_c, option_d, question, answer } = req.body;
    // create variants with options
    let variants = [
        new variant_model_1.default(-1, -1, option_a),
        new variant_model_1.default(-1, -1, option_b),
        new variant_model_1.default(-1, -1, option_c),
        new variant_model_1.default(-1, -1, option_d)
    ];
    // change variant with correct answer
    variants[answer].isRight = true;
    // create test
    let test = new test_model_1.default(-1, question, variants);
    // save test
    yield test_storage_1.default.addTest(test);
    res.redirect(req.baseUrl);
}));
// export router
exports.default = router;
