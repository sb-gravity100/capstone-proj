import Announcement from '../models/Announcement.js';

export const getAnnouncement = async (req, res) => {
   try {
      const { id } = req.params;
      const announcement = await Announcement.findById(id);
      await announcement.populate('authorID');
      res.status(200).json(announcement);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const getAnnouncements = async (req, res) => {
   try {
      var page = req.query.page > 0 ? req.query.page - 1 : 0;
      delete req.query.page;
      if (!req.query.tag) {
         delete req.query.tag;
      }
      if (!req.query.authorID) {
         delete req.query.authorID;
      }
      console.log(req.query);
      const announce = await Announcement.find({ ...req.query })
         .skip(page * 10)
         .limit(10);
      for (let index = 0; index < announce.length; index++) {
         const element = announce[index];
         await element.populate('authorID');
      }
      res.status(200).json(announce);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const postAnnouncement = async (req, res) => {
   try {
      const { title, body, tags } = req.body;
      const announcement = new Announcement({
         title,
         body,
         likes: 0,
         authorID: req.auth.id,
         tags,
      });
      const saved = await announcement.save();
      res.status(201).json(saved);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
