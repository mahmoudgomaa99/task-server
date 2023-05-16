"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Http_Error_1 = __importDefault(require("../models/Http-Error"));
var jwtSecret = process.env.JWT_SECRET;
exports.default = (function (email, name, next) {
    var token;
    try {
        token = jsonwebtoken_1.default.sign({
            email: email,
            name: name,
        }, jwtSecret, { expiresIn: "350d" });
    }
    catch (error) {
        return next(new Http_Error_1.default("something went wrong, please try again", 500));
    }
    return token;
});
