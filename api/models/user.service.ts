import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    superAdmin: { type: Boolean, select: false },
    created_at: { type: Date, default: Date.now() },
  },
  {
    strict: true,
  }
);
export const UserModel = mongoose.model('User', UserSchema);
