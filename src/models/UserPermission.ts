import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class UserPermission extends Model {
  public userId!: number;
  public path!: string;
  public method!: string;
  public accessTime!: Date;
}

UserPermission.init(
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    accessTime: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, modelName: "UserPermission" }
);

UserPermission.belongsTo(User, { foreignKey: "userId" });

export default UserPermission;
