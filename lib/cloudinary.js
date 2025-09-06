import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
      folder: resourceType === 'video' ? 'project-videos' : 'project-images',
      transformation: resourceType === 'image' 
        ? [{ width: 1200, height: 800, crop: 'fill', quality: 'auto' }]
        : [{ width: 1280, height: 720, crop: 'fill', quality: 'auto' }]
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export default cloudinary;