"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
class User {
    constructor(id, username, password, role = Role.User) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
exports.default = User;
