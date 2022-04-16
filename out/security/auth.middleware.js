"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const permission_1 = require("./permission");
function default_1(req, res, next) {
    if ((0, permission_1.isOpen)(req.url)) {
        return next();
    }
    const token = req.session.token || req.header('Authorization');
    const isApi = req.session.token ? false : true;
    // log token
    console.log('from header:', token);
    // Not authorized
    if (!token) {
        return isApi ? res.sendStatus(401) : res.redirect('/auth');
    }
    console.log('has token:', token);
    let payload = verify(token);
    console.log('verify:', payload);
    // No has token
    if (!payload) {
        return isApi ? res.sendStatus(401) : res.redirect('/auth');
    }
    console.log('success verify:', payload);
    if ((0, permission_1.isPermitted)(req.url, payload.role)) {
        console.log('permitted:', req.url);
        req.payload = payload;
        return next();
    }
    // Not authorized
    else {
        return isApi ? res.sendStatus(401) : res.redirect('/auth');
    }
}
exports.default = default_1;
function verify(token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        return undefined;
    }
}
exports.verify = verify;
