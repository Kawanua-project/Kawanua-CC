import  Express  from "express";
const uploadRoute = Express.Router();
import {upload,createUpload} from "../controller/upload.js"



// Middleware untuk menangani request POST /stories
uploadRoute.post('/upload', upload.single('photo'), createUpload);

export default uploadRoute;