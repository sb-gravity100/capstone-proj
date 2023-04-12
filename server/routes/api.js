import express from 'express';
import {
   getAnnouncement,
   getAnnouncements,
   postAnnouncement,
} from '../controllers/api.js';
import { expressjwt as jwt } from 'express-jwt';

const router = express.Router();

// router.post('/info');
router.post(
   '/announcement',
   jwt({
      secret: process.env.JWT_SECRET || 'secretjwtcode',
      algorithms: ['HS256'],
   }),
   postAnnouncement
);
router.get('/announcement/:id', getAnnouncement);
router.get('/announcements', getAnnouncements);

export default router;
