// import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require("cloudinary").v2;
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

