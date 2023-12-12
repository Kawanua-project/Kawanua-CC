import multer from "multer";
import path from "path";
import FormData from 'form-data';
import fs from "fs";
import { Storage } from "@google-cloud/storage";
import Photos_kawanua from "../models/uploadModels.js";
import axios from "axios";

// Konfigurasi multer untuk mengelola file upload
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


let projectId = 'kawanua-project';
let keyFilename = 'keykawanua.json';

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket('storage-user-kawanua');

  // Fungsi untuk memprediksi gambar menggunakan API eksternal

  const predict = async (imageBuffer) => {
    try {
      const formData = new FormData();
      formData.append('image', imageBuffer);
  
      const response = await axios.post('https://api-ml-detection-qxgwgqaooa-as.a.run.app/prediction', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle response from the external API
      console.log(response.data);
      // Extract prediction results from response.data if needed
      const predictionResult = response.data.data;
      console.log('endangered_prediction:', predictionResult.class_name);
      console.log('confidence:', predictionResult.confidence_score);
      return predictionResult;
    } catch (error) {
      console.error('Error calling prediction API:', error.message);
    }
  };
  
  
export const createUpload = async (req, res) => {
  try {
    // Dapatkan data dari body request
    const { photo_id } = req.body;

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

      stream.on('finish', async () => {
        // File upload successful
  
        // Save a copy to the local server
        const localFilePath = './uploads/${fileName}';
        fs.writeFileSync(localFilePath, photo.buffer);
  
        const serverUploadUrl = 'https://example.com/upload'; // Replace with your server's upload endpoint
  const formData = new FormData();
  formData.append('image', fs.createReadStream('./uploads/' + fileName));

  axios.post("https://api-ml-detection-qxgwgqaooa-as.a.run.app/prediction", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',

      // Add any additional headers if needed
    }
  })
  .then(response => {
    console.log('File uploaded successfully:', response.data);
  })
  .catch(error => {
    console.error('Error uploading file to server:', error);
  });
        // Send a response
        return res.status(200).send('File uploaded successfully.');
      });
    const readStream = file.createReadStream();

   // Create a writable stream to store the data

    const writableStream = fs.createWriteStream('./uploads/' + fileName);

// Pipe the read stream to the write stream

readStream
  .on('error', function(err) {
    console.error('Error reading from Google Cloud Storage:', err);
  })
  .pipe(writableStream);

writableStream.on('finish', function() {
  console.log('File downloaded successfully.');

  // Now, you can upload the downloaded file to another server using Axios
  
});

//     var newFile = file.createReadStream();
//     const prediksi = await newFile.on('end', async function() {
      

// return response;
//     });

    // Panggil API eksternal untuk prediksi

    // const predictionResult = await predict(photo.buffer);

    // Simpan data ke database
    const photos = await Photos_kawanua.create({
      photo_id,
      photo_url: `https://storage.googleapis.com/storage-user-kawanua/${fileName}`,
      prediction: null
    });


    res.json({ error: false, message: 'Success', data: photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

 