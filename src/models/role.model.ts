import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Role extends Model {
  public id!: number;
  public name!: string;
  public order:number = 0;
}

Role.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}
  },
  { sequelize, modelName: "Role" }
);

export default Role;
