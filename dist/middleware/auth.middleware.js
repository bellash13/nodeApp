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
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const UserPermission_1 = __importDefault(require("../models/UserPermission"));
const RolePermission_1 = __importDefault(require("../models/RolePermission"));
const dayjs_1 = __importDefault(require("dayjs"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Access denied!" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        const user = yield User_1.default.findByPk(decoded.id, { include: Role_1.default });
        if (!user)
            return res.status(401).json({ error: "Invalid token" });
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});
exports.authenticate = authenticate;
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { path, method } = req;
    if (!req.user)
        return res.status(403).json({ error: "Forbidden" });
    // Check direct user permissions
    const userPermission = yield UserPermission_1.default.findOne({
        where: { userId: req.user.id, path, method },
    });
    if (userPermission && (!userPermission.accessTime || (0, dayjs_1.default)().isBefore(userPermission.accessTime))) {
        return next();
    }
    // Check permissions for all roles the user has
    const userRoles = yield req.user.getRoles();
    for (const role of userRoles) {
        const rolePermission = yield RolePermission_1.default.findOne({
            where: { roleId: role.id, path, method },
        });
        if (rolePermission && (!rolePermission.accessTime || (0, dayjs_1.default)().isBefore(rolePermission.accessTime))) {
            return next();
        }
    }
    return res.status(403).json({ error: "Forbidden" });
});
exports.authorize = authorize;
