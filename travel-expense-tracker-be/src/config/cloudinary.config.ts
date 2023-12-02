import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET as string,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "travel-expense-tracker", // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other types of files, not just images
  } as any,
});

// Exporting multer instance with Cloudinary storage
export default multer({ storage });
