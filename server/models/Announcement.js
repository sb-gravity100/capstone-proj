import mongoose, { ObjectId } from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, min: 1, max: 150 },
      body: { type: String, default: '', min: 1, max: 10000 },
      likes: { type: Number, default: 0 },
      authorID: { type: ObjectId, ref: 'admin' },
      tags: { type: [String] },
   },
   { timestamps: true }
);

const Announcement = mongoose.model('announcement', AnnouncementSchema);
export default Announcement;
