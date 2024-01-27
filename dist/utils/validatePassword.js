"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validatePassword(password) {
    if (password.length >= 8) {
        return true;
    }
    else {
        return false;
    }
}
exports.default = validatePassword;
