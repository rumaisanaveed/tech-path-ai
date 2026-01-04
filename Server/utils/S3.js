import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import slugify from "slugify";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// 1. Set up S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 2. Set up multer (local memory storage)
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, WEBP allowed"), false);
    }
  },
});

// 3. Function to manually upload to S3
export const uploadFileToS3 = async (file, folder, title) => {
  const fileExtension = path.extname(file.originalname);
  const safeTitle = slugify(title, { lower: true, strict: true });
  const uniqueFileName = `${folder}/${safeTitle}-${Date.now()}${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
};

export const deleteFileFromS3 = async (imageUrl) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;

    // Extract the key correctly from a full URL
    const url = new URL(imageUrl);
    const key = decodeURIComponent(url.pathname).replace(/^\/+/, ""); // removes leading slash

    if (!key) {
      console.warn("S3 delete skipped: invalid image key extracted");
      return;
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3.send(command);
    //console.log("✅ S3 image deleted:", key);
  } catch (err) {
    console.error("❌ S3 delete error:", err.message);
    throw err;
  }
};
