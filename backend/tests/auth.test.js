const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
  // Create unique test user details with timestamps
  const testUser = {
    username: 'authuser' + Date.now(),
    email: `authtest${Date.now()}@example.com`,
    password: 'password123'
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clean up any existing test users to ensure a clean state
    try {
      await User.deleteMany({ 
        email: { $regex: /^authtest.*@example\.com$/ }
      });
    } catch (err) {
      console.log('Error cleaning users:', err.message);
    }
  });

  afterAll(async () => {
    // Clean up the test user created during testing
    try {
      await User.deleteMany({ email: testUser.email });
    } catch (err) {
      console.log('Error cleaning users:', err.message);
    }
    
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});