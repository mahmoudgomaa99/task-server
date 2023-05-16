"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var Users_1 = __importDefault(require("./routes/Users"));
var checkToken_1 = __importDefault(require("./middlewares/checkToken"));
var Todos_1 = __importDefault(require("./routes/Todos"));
require("dotenv").config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", Users_1.default);
app.use(checkToken_1.default);
app.use('/api/todos', Todos_1.default);
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
