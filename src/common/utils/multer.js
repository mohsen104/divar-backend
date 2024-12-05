import multer from 'multer';
import fs from 'fs';
import path from 'path';
import createError from 'http-errors';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(path.join(process.cwd(), "public", "upload"), { recursive: true });
        cb(null, "public/upload");
    },
    filename: (req, file, cb) => {
        const whiteListFormat = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (whiteListFormat.includes(file.mimetype)) {
            const format = path.extname(file.originalname);
            const filename = new Date().getTime().toString() + format;
            cb(null, filename)
        } else {
            cb(new createError.BadRequest("foramt of picture are wrong!"))
        }
    }
})
const upload = multer({
    storage,
    limits: {
        fileSize: 3 * 1000 * 1000 // "3MB"
    }
});

export default upload;