"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserRole extends sequelize_1.Model {
}
UserRole.init({
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    roleId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: database_1.default, modelName: "UserRole" });
exports.default = UserRole;
