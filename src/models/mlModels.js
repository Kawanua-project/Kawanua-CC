// models/animalPhoto.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Users from "./userModels.js";

const { DataTypes } = Sequelize;
const Photos_kawanua= db.define('upload_photo', {
  result_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tingkat_kelangkaan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  habitat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},{
  freezeTableName:true
});

Photos_kawanua.belongsTo(Users, { foreignKey: 'id' });

export default Photos_kawanua;