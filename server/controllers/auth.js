import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

/* REGISTER USER */
export const register = async (req, res) => {
   try {
      const { firstName, lastName, email, phone, password, picturePath, LRN } =
         req.body;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
         firstName,
         lastName,
         email,
         phone,
         password: passwordHash,
         picturePath,
         LRN,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

export const login = async (req, res) => {
   try {
      const { LRN, password } = req.body;
      const user = await User.findOne({ LRN });
      if (!user) return res.status(400).json({ message: 'User not found.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
         return res.status(400).json({ message: 'Password incorrect.' });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      });
      delete user.password;
      res.status(200).json({ token, user });
   } catch (error) {}
};

export const adminLogin = async (req, res) => {
   try {
      const { username, password } = req.body;
      const user = await Admin.findOne({ username });
      console.log(user);
      if (!user)
         return res
            .status(404)
            .json({ message: 'User not found.', code: 'NOT_FOUND' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
         return res.status(404).json({
            message: 'Password incorrect.',
            code: 'PASSWORD_INCORRECT',
         });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      });
      delete user.password;
      console.log(user);
      res.status(200).json({ token, user });
   } catch (error) {}
};

export const logout = (req, res) => {
   req.session.destroy();
   res.status(200).send('');
};
