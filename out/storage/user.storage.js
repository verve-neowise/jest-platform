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
const user_model_1 = __importDefault(require("../model/user.model"));
const storage_1 = __importDefault(require("./storage"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'INSERT INTO users (username, password, role) values($1, $2, $3) RETURNING id';
        let hashedPassword = bcryptjs_1.default.hashSync(user.password, 10);
        let row = yield storage_1.default.get(query, [
            user.username,
            hashedPassword,
            user.role
        ]);
        return row.id;
    });
}
function removeUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'DELETE FROM users WHERE id = $1';
        yield storage_1.default.run(query, [id]);
    });
}
function findUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * FROM users WHERE username = $1';
        let data = yield storage_1.default.get(query, [username]);
        return mapUser(data);
    });
}
function allUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * FROM users';
        let datas = yield storage_1.default.all(query);
        return datas.map(mapUser);
    });
}
function mapUser(data) {
    return data ? new user_model_1.default(data.id, data.username, data.password, data.role) : undefined;
}
exports.default = {
    addUser,
    removeUser,
    findUser,
    allUsers
};
