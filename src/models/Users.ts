import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createNewUser = (values: Record<string, string | number>) =>
  new UserModel(values).save().then((user) => {
    return user.toObject();
  });
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, number>) =>
  UserModel.findByIdAndUpdate(id, values);
