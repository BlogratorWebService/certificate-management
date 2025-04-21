import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeLocalFile = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.warn("Failed to delete local file:", err.message);
  }
};

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.warn("No file path provided for upload");
    return null;
  }

  const isPDF = localFilePath.endsWith(".pdf");

  try {
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: isPDF ? "raw" : "auto",
    });

    console.log("uploadResult", uploadResult.secure_url);
    removeLocalFile(localFilePath);

    return uploadResult.secure_url;
  } catch (error) {
    removeLocalFile(localFilePath);
    throw new ApiError(400, error.message);
  }
};
