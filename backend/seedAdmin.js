require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    const username = 'admin';
    const password = 'admin123';
    const role = 'admin';

    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      console.log('Admin sudah ada di database');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await adminUser.save();
    console.log('Admin berhasil dibuat dengan username: admin dan password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Gagal membuat admin:', error);
    process.exit(1);
  }
}

createAdmin();
