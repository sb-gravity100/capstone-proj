import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
   {
      username: { type: String, required: true, min: 2, max: 50 },
      firstName: { type: String, required: true, min: 2, max: 50 },
      lastName: { type: String, required: true, min: 2, max: 50 },
      email: { type: String, required: false, min: 2, max: 50, unique: true },
      phone: { type: Number, required: false, min: 2, max: 50, unique: true },
      password: { type: String, required: true, min: 5 },
      picturePath: {
         type: String,
         default: '/assets/profile-placeholder.jpg',
      },
      IDNumber: {
         type: Number,
         required: true,
         min: 2,
         max: 100,
         unique: true,
      },
   },
   {
      timestamps: true,
   }
);

const Admin = mongoose.model('admin', AdminSchema);
export default Admin;
