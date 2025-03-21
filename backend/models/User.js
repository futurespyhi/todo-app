const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Encrypt the password
userSchema.pre('save', async function (next) {
    // make sure the password field is modified
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      // generate salt and encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });
  
  // validate the password
  userSchema.methods.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      console.error('Error comparing passwords:', err);
      return false;
    }
  };

module.exports = mongoose.model('User', userSchema);