import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.originalname.split(".").pop() === "exe") {
    cb(new Error("File extension not allow"));
  }
  cb(null, true);
};

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({
  storage,
  limits,
  // fileFilter,
});

export default upload;
