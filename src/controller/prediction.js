import axios from "axios";
import path from "path";
import {Storage} from "@google-cloud/storage";
import {upload,createUpload} from "../controller/upload.js"
import Users from "../models/userModels.js";
import Photos_kawanua from "../models/uploadModels.js";
import Species from "../models/SpesiesModels.js";
import { nanoid } from "nanoid";

 export const predictionPlant = async (req, res, Species) => {
 try {
    //mengambil user_id dan photo_id
    const user_id = req.id
    const photo_id = req.photo_id

    //buat variabel untuk prediction id
    const  species_id = nanoid(16)

    // check jika tidak ada file yang diupload
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    
    const uploadedFile = await upload(req.file);
    

     const response = await axios.post(


     )




    
    


    
 } catch (error) {
    
 }
}
