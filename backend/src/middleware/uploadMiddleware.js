import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "servicehub/services",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    transformation: [
      {
        width: 1200,
        height: 800,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  },
});


const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    
    if (
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files are allowed"
        ),
        false
      );
    }
  },
});


export { upload };