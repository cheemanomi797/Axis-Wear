import express from 'express';
import upload from '../utils/upload.js';
import { protect, admin } from '../utils/authMiddleware.js';
import fs from 'fs';
import cloud from '../utils/cloudinaryConfig.js';
import axios from 'axios';

const router = express.Router();

router.post('/', protect, admin, upload.array('images', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images were uploaded.' });
        }

        // If Cloudinary is configured via env vars, upload files there and return secure URLs
        if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
            const uploadPromises = req.files.map((file) => cloud.uploader.upload(file.path, { folder: 'axis-wear' }));
            const results = await Promise.all(uploadPromises);

            // Clean up local temp files
            req.files.forEach((f) => {
                try { fs.unlinkSync(f.path); } catch (err) { /* ignore */ }
            });

            // Prefer secure_url but fall back to any URL returned by the provider
            const images = results.map(r => r.secure_url || r.url || r.secure_url);
            console.log('Cloudinary upload results:', images);
            return res.status(201).json({ message: 'Images uploaded successfully.', images });
        }

        // If IMGBB API key is provided, upload images to imgbb and return their HTTPS URLs
        if (process.env.IMGBB_API_KEY) {
            try {
                const key = process.env.IMGBB_API_KEY;
                const uploadPromises = req.files.map(async (file) => {
                    const buffer = fs.readFileSync(file.path);
                    const base64 = buffer.toString('base64');
                    const params = new URLSearchParams();
                    params.append('image', base64);
                    params.append('name', file.filename);

                    const resp = await axios.post(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, params.toString(), {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        timeout: 120000,
                    });

                    // imgbb returns the uploaded info in resp.data.data
                    return resp.data;
                });

                const results = await Promise.all(uploadPromises);

                // Clean up local temp files
                req.files.forEach((f) => {
                    try { fs.unlinkSync(f.path); } catch (err) { /* ignore */ }
                });

                const images = results.map(r => (r && r.data && (r.data.url || r.data.display_url || (r.data.image && r.data.image.url))) || null).filter(Boolean);
                console.log('IMGBB upload results:', images);
                return res.status(201).json({ message: 'Images uploaded successfully.', images });
            } catch (err) {
                console.error('IMGBB upload error:', err?.response?.data || err.message || err);
                // fall through to local fallback below
            }
        }

        // Fallback: serve from local uploads directory
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const images = req.files.map((file) => `${baseUrl}/uploads/${file.filename}`);
        res.status(201).json({ message: 'Images uploaded successfully.', images });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Image upload failed.' });
    }
});

export default router;
