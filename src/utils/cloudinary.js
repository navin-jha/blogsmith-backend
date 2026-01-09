import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = async (filePath, options = {}) => {
  if (!filePath) {
    throw new Error("File path is required for upload.");
  }
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary Upload Error: ${error.message}`);
  }
};

const deleteFromCloudinary = async (publicUrl, options = {}) => {
  if (!publicUrl) {
    throw new Error("Public URL is required for deletion.");
  }
  try {
    const result = await cloudinary.uploader.destroy(
      publicUrl.match(/[^/]+(?=\.[^./]*$)/)[0],
      options
    );
    return result;
  } catch (error) {
    throw new Error(`Cloudinary Delete Error: ${error.message}`);
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
