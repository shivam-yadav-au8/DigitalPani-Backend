import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { HookNextFunction } from 'src/common/interfaces/hookNextFunction.interface';
export const UserSchema = new mongoose.Schema({
  name: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, unique: false, required: true },
  department: { type: String, unique: false, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, unique: false, required: true },
});

UserSchema.pre('save', async function (next: HookNextFunction) {
  const salt = bcrypt.genSaltSync(10);
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hashSync(this['password'], salt);
    this['password'] = hashed;
  } catch (err) {
    return next(err);
  }
});
