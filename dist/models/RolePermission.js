"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Role_1 = __importDefault(require("./Role"));
class RolePermission extends sequelize_1.Model {
}
RolePermission.init({
    roleId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    path: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    method: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    accessTime: { type: sequelize_1.DataTypes.DATE, allowNull: true },
}, { sequelize: database_1.default, modelName: "RolePermission" });
RolePermission.belongsTo(Role_1.default, { foreignKey: "roleId" });
exports.default = RolePermission;
