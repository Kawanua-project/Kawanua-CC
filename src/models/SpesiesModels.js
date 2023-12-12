import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Photos_kawanua from "./uploadModels.js";
import Users from "./userModels.js";

const { DataTypes } = Sequelize;

const Species = db.define('Species', {
  species_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kingdom: DataTypes.STRING,
  phylum: DataTypes.STRING,
  class: DataTypes.STRING,
  order: DataTypes.STRING,
  family: DataTypes.STRING,
  species: DataTypes.STRING,
  nama: DataTypes.STRING,
  deskripsi: DataTypes.TEXT,
  tingkat_kelangkaan: DataTypes.STRING,
  habitat: DataTypes.STRING,
});


Species.belongsTo(Photos_kawanua, { foreignKey: 'photo_id' });
Users.belongsTo(Photos_kawanua, { foreignKey: 'id' });

export default Species;
