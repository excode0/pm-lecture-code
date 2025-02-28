import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';

// Konfigurasi Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  upload.single('profilePicture')(req as any, res as any, (err: any) => {
    if (err) return res.status(500).json({ message: 'Upload failed' });

    res
      .status(200)
      .json({ profilePicture: `/uploads/${(req as any).file.filename}` });
  });
}
