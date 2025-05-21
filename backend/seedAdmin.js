require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const username = 'admin';
    const password = 'admin123';

    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      console.log('Admin sudah ada');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({ username, password: hashedPassword, role: 'admin' });
    await adminUser.save();
    console.log('Admin berhasil dibuat dengan username: admin dan password: admin123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
