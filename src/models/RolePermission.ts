import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Role from "./Role";

class RolePermission extends Model {
  public roleId!: number;
  public path!: string;
  public method!: string;
  public accessTime!: Date;
}

RolePermission.init(
  {
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    accessTime: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, modelName: "RolePermission" }
);

RolePermission.belongsTo(Role, { foreignKey: "roleId" });

export default RolePermission;
