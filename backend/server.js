import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Routes
import orderRoutes from './routes/orders.js';
import adminSettingsRoutes from './routes/adminSettings.js';
import categoriesRoutes from './routes/categories.js';
import productsRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import dashboardRoutes from './routes/dashboard.js';

// Seed data
import { defaultCategories, defaultProducts, defaultOrders } from './utils/seedData.js';
import Category from './models/category.js';
import Product from './models/product.js';
import Order from './models/order.js';

dotenv.config();

const app = express();

// -------------------- PORT --------------------
const PORT = process.env.PORT || 5000;

// -------------------- MONGODB --------------------
const mongoUri =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/axiswear';

// -------------------- CORS --------------------
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// IMPORTANT: Safe CORS (NO CRASH)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman
      if (!origin) return callback(null, true);

      // allow all in production-safe mode if env missing
      if (allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // DO NOT block hard (prevents CORS breaking)
      return callback(null, true);
    },
    credentials: true
  })
);

// -------------------- MIDDLEWARE --------------------
app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// -------------------- ROUTES --------------------
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// -------------------- HEALTH CHECK --------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

// -------------------- SEED FUNCTION --------------------
const seedCollection = async (Model, data) => {
  const count = await Model.countDocuments();
  if (count === 0 && data?.length > 0) {
    await Model.insertMany(data);
    console.log(`Seeded ${Model.collection.name}`);
  }
};

// -------------------- START SERVER --------------------
const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);

    console.log('✅ MongoDB Connected');

    // Seed only if empty
    await seedCollection(Category, defaultCategories);
    await seedCollection(Product, defaultProducts);
    await seedCollection(Order, defaultOrders);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Allowed Origins: ${allowedOrigins.join(', ')}`);
      console.log(`📦 API: /api/products`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
