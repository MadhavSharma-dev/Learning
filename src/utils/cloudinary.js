const cloudinary = require("cloudinary").v2;
const fs = require("fs");


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        //File is uploaded successfully
        console.log("File is uploaded on cloudinary" , response.url);
        return response;
    } catch (error){
        fs.unlinkSync(localFilePath)//Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
} 

module.exports = { uploadOnCloudinary }


    //Cloudinary is your permanent cloud storage. Once the file is sitting in public/temp (thanks to multer), this utility picks it up and uploads it to Cloudinary