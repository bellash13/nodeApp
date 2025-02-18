import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserRole extends Model {
  public id!: string;
  public userId!: number;
  public roleId!: number;
}

UserRole.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    roleId: {type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, modelName: "UserRole" }
);

export default UserRole;
