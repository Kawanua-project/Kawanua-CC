// models/animalPhoto.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Users from "./userModels.js";

const { DataTypes } = Sequelize;
const Photos_kawanua= db.define('upload_photo', {
  photo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},{
  freezeTableName:true
});

Photos_kawanua.belongsTo(Users, { foreignKey: 'id' });

export default Photos_kawanua;
