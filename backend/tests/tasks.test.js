const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Tasks API', () => {
  let token;
  const testUser = {
    username: 'testuser' + Date.now(), // Add timestamp to ensure unique username
    email: `test${Date.now()}@example.com`, // Add timestamp to ensure unique email
    password: 'password123'
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clean up any existing test users
    try {
      await User.deleteMany({ email: { $regex: /^test.*@example\.com$/ } });
    } catch (err) {
      console.log('Error cleaning users:', err.message);
    }

    // Register and login a user to get the token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    // Ensure token was correctly obtained
    if (registerRes.body && registerRes.body.token) {
      token = registerRes.body.token;
      console.log('Token obtained successfully:', token.substring(0, 10) + '...');
    } else {
      console.error('Unable to obtain token:', registerRes.body);
      throw new Error('Registration failed, unable to obtain token');
    }
  });

  afterAll(async () => {
    // Clean up test users created during testing
    try {
      await User.deleteMany({ email: testUser.email });
    } catch (err) {
      console.log('Error cleaning users:', err.message);
    }
    
    // Ensure mongoose connection is closed
    await mongoose.connection.close();
  });

  it('should create a new task', async () => {
    // Ensure token exists
    expect(token).toBeDefined();
    
    const res = await request(app)
      .post('/api/tasks')
      .set('x-auth-token', token)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  it('should get all tasks', async () => {
    // Ensure token exists
    expect(token).toBeDefined();
    
    const res = await request(app)
      .get('/api/tasks')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});