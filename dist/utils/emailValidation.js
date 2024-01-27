"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
exports.default = validateEmail;
