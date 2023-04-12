import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
   {
      firstName: { type: String, required: true, min: 2, max: 50 },
      lastName: { type: String, required: true, min: 2, max: 50 },
      email: { type: String, required: false, min: 2, max: 50, unique: true },
      phone: { type: Number, required: false, min: 2, max: 50, unique: true },
      password: { type: String, required: true, min: 5 },
      picturePath: {
         type: String,
         default: '',
      },
      LRN: {
         type: Number,
         required: true,
         min: 2,
         max: 50,
         unique: true,
      },
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model('user', UserSchema);
export default User;
