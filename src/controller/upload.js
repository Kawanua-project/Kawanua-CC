import multer from "multer";
import path from "path";
import {Storage} from "@google-cloud/storage";
import Photos_kawanua from "../models/uploadModels.js";
// Konfigurasi multer untuk mengelola file upload

export const upload = multer({
  storage: multer.memoryStorage(),
  limits:{
    fileSize: 5*1024*1024,
  },
});
let projectId='kawanua-project';
let keyFilename='keykawanua.json'

const storage = new Storage({
    projectId,
    keyFilename
  });
  const bucket = storage.bucket('storage-user-kawanua');


  // Controller untuk menangani request POST /stories
export const createUpload = async (req, res) => {
    try {
      // Dapatkan data dari body request
      const { id } = req.body;

      // Dapatkan file gambar dari request
      const photo = req.file;

      // Validasi bahwa file adalah gambar
      if (!photo || !['image/jpeg', 'image/png'].includes(photo.mimetype)) {
        return res.status(400).json({ error: true, message: 'File must be a valid image (JPEG or PNG).' });
      }

       // Simpan data ke Cloud Storage
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(photo.originalname);
      const fileName = 'upload-' + uniqueSuffix + ext;
      const file = bucket.file(fileName);

      // Salin isi file yang diunggah ke Cloud Storage
      const stream = file.createWriteStream();
      stream.end(photo.buffer);

      // Simpan data ke database
      const photos = await Photos_kawanua.create({
      id,
      photo_url: `https://storage.googleapis.com/storage-user-kawanua/${fileName}`,
    });

      res.json({ error: false, message: 'Success', data: photos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };
