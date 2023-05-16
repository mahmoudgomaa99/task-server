"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecret = process.env.JWT_SECRET;
// @ts-ignore
exports.default = (function (req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1];
        if (!token)
            throw new Error("Authentication failed!");
        jsonwebtoken_1.default.verify(token, jwtSecret);
        next();
    }
    catch (error) {
        console.log(error);
        return next(res.status(403).json({ message: "Authentication failed" }));
    }
});
