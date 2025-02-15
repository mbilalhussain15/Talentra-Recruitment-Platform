import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder to store uploaded resumes
    const resumeFolder = path.join(__dirname, 'uploads', 'resumes');

    // Ensure the 'uploads/resumes' folder exists, create it if not
    if (!fs.existsSync(resumeFolder)) {
      fs.mkdirSync(resumeFolder, { recursive: true });
    }

    cb(null, resumeFolder);
  },
  filename: (req, file, cb) => {
    // Set a unique filename using the current timestamp and file extension
    const fileExtension = path.extname(file.originalname);  // Get file extension (e.g., .pdf)
    const filename = `${Date.now()}${fileExtension}`;  // Unique filename
    cb(null, filename);  // Save the file with this unique name
  },
});

// Initialize multer with this storage configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);  // Accept the file
    } else {
      cb(new Error('Only PDF files are allowed!'), false);  // Reject the file
    }
  },
});

export default upload;
