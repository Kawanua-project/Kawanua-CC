import Express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import uploadRoute from "./routes/UploadRoute.js";
import router from "./routes/userRoute.js";
const PORT = process.env.PORT || 5000;
const app = Express();
dotenv.config();

try {
  await db.authenticate();
  console.log("Database conected");
} catch (error) {
console.error(error)
}
app.use(Express.json());
app.use(router);
app.use(uploadRoute);


app.listen(PORT, ()=>{
    console.log(`server berhasil diruning ${PORT}`);
});
