import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  superAdmin: { type: Boolean, select: false },
});

export const UserModel = mongoose.model('User', UserSchema);
