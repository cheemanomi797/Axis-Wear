import Admin from '../models/admin.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// =====================
// SETUP ADMIN (SAFE)
// =====================
export const setupAdmin = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    let admin = await Admin.findOne({ email: adminEmail });

    if (!admin) {
      // create new admin
      admin = await Admin.create({
        email: adminEmail,
        password: adminPassword
      });
    } else {
      // update password safely (trigger hash only if schema has pre-save)
      admin.password = adminPassword;
      await admin.save();
    }

    res.json({
      message: 'Admin ready',
      email: admin.email
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================
// LOGIN ADMIN (FIXED)
// =====================
export const authAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isBcryptHash = (value) => typeof value === 'string' && value.startsWith('$2') && value.length >= 60;
    let isMatch = false;

    if (isBcryptHash(admin.password)) {
      try {
        isMatch = await bcrypt.compare(password, admin.password);
      } catch (compareError) {
        console.warn('bcrypt compare failed, falling back to raw password check', compareError);
        isMatch = password === admin.password;
      }
    } else {
      isMatch = password === admin.password;
      if (isMatch) {
        admin.password = password;
        await admin.save();
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id)
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
