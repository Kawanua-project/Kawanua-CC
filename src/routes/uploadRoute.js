import  Express  from "express";
const Uploadrouter = Express.Router();
import {createUpload} from "../controller/upload.js"
import { verifyToken } from "../middleware/Verify_Token.js";
import upload from '../Utils/multer.js'

// Middleware untuk menangani request POST /stories
Uploadrouter.post('/upload', verifyToken,upload.single('image'), createUpload);

export default Uploadrouter;