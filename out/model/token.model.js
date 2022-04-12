"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    constructor(id, user_id, app, token) {
        this.id = id;
        this.user_id = user_id;
        this.app = app;
        this.token = token;
    }
}
exports.default = Token;
