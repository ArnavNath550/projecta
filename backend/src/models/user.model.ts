import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  dateRegistered: Date;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePic: { type: String },
  dateRegistered: { type: Date, default: Date.now },
});

const User = model<IUser>('User', userSchema);

export default User;
