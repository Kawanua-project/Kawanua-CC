import { Sequelize } from "sequelize";

const db = new Sequelize('db-kawan','root','',{
host:"localhost",
dialect:"mysql"
  
});
export default db;