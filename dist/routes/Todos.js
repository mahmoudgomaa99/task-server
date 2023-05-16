"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var TodosRouter = express_1.default.Router();
var client_1 = require("@prisma/client");
var Http_Error_1 = __importDefault(require("../models/Http-Error"));
var prisma = new client_1.PrismaClient();
var getAllTodos = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var todos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.tODOS.findMany({
                        where: { userId: req.params.userId },
                    })];
            case 1:
                todos = _a.sent();
                res.status(200).json({ message: "success", data: todos });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, next(new Http_Error_1.default("Fetching todos failed please try again", 500))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var Addtodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newTodo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.tODOS.create({
                        data: __assign({}, req.body),
                    })];
            case 1:
                newTodo = _a.sent();
                res.status(200).json({ message: "success", data: newTodo });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, next(res.status(500).json({ message: "Adding todo failed" }))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var UpdateTodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTodo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.tODOS.update({
                        where: { id: req.body.Todo_id },
                        data: { title: req.body.title, description: req.body.description },
                    })];
            case 1:
                updatedTodo = _a.sent();
                res.status(200).json({ message: "success", data: updatedTodo });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, next(res.status(500).json({ message: "Updating todo failed" }))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var DeleteTodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.tODOS.delete({
                        where: { id: req.params.Todo_id },
                    })];
            case 1:
                _a.sent();
                res.status(200).json({ message: "success" });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, next(res.status(500).json({ message: "Deleting todo failed" }))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getSingleTodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var todo, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.tODOS.findUnique({
                        where: { id: req.params.Todo_id },
                    })];
            case 1:
                todo = _a.sent();
                res.status(200).json({ message: "success", data: todo });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, next(res.status(500).json({ message: "Fetching todo failed" }))];
            case 3: return [2 /*return*/];
        }
    });
}); };
TodosRouter.get("/", getAllTodos);
TodosRouter.post("/", Addtodo);
TodosRouter.put("/", UpdateTodo);
TodosRouter.delete("/delete/:Todo_id", DeleteTodo);
TodosRouter.get("/:Todo_id", getSingleTodo);
exports.default = TodosRouter;
