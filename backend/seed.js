const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Branch = require('./models/Branch');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Branch.deleteMany();

    // Create branches
    const branches = await Branch.insertMany([
      {
        name: 'Islamabad',
        address: 'F-7 Markaz, Islamabad, Pakistan',
        contactEmail: 'islamabad@company.com',
        contactPhone: '+92-51-1234567',
      },
      {
        name: 'Lahore',
        address: 'Gulberg III, Lahore, Pakistan',
        contactEmail: 'lahore@company.com',
        contactPhone: '+92-42-1234567',
      },
      {
        name: 'Karachi',
        address: 'Clifton, Karachi, Pakistan',
        contactEmail: 'karachi@company.com',
        contactPhone: '+92-21-1234567',
      },
      {
        name: 'Remote',
        address: 'Work from anywhere',
        contactEmail: 'remote@company.com',
        contactPhone: '+92-300-1234567',
      },
    ]);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ats.com',
      password: 'admin123',
      role: 'admin',
      phone: '+92-300-0000001',
    });

    // Create HR user
    const hr = await User.create({
      name: 'HR Manager',
      email: 'hr@ats.com',
      password: 'hr123456',
      role: 'hr',
      phone: '+92-300-0000002',
    });

    // Create candidate user
    const candidate = await User.create({
      name: 'John Doe',
      email: 'candidate@example.com',
      password: 'candidate123',
      role: 'candidate',
      phone: '+92-300-0000003',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '2 years',
      education: 'BS Computer Science',
    });

    console.log('Data seeded successfully!');
    console.log('\n--- Login Credentials ---');
    console.log('Admin: admin@ats.com / admin123');
    console.log('HR: hr@ats.com / hr123');
    console.log('Candidate: candidate@example.com / candidate123');
    console.log('\nBranches created:', branches.length);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
