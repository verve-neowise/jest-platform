"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Variant {
    constructor(id, testId, content, isRight = false) {
        this.id = id;
        this.testId = testId;
        this.content = content;
        this.isRight = isRight;
    }
}
exports.default = Variant;
