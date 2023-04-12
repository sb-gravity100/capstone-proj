import express from 'express';
import { login, logout } from '../controllers/auth.js';
import { expressjwt as jwt } from 'express-jwt';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);

export default router;
