"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// create result model
class Result {
    constructor(id, userId, username, count, of, date) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.count = count;
        this.of = of;
        this.date = date;
    }
}
exports.default = Result;
