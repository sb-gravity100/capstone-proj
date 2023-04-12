import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { adminLogin, register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Admin from './models/Admin.js';
import bcrypt from 'bcrypt';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(
   session({
      secret: 'deeznuts',
      store: MongoStore.create({
         mongoUrl: process.env.MONGO_LOCAL,
         dbName: 'session-storage',
      }),
      saveUninitialized: false,
      resave: true,
   })
);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
console.log(process.env.JWT_SECRET);

/* FILE STORAGE */
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets');
   },
   filename: (req, file, cb) => {
      cb(null, file.uploadDate.getTime());
   },
});
const upload = multer({ storage });

/* ROUTES */
app.post('/auth/register', upload.single('picture'), register);
app.post('/auth/admin/login', adminLogin);

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Database ready!'));
mongoose
   .connect(process.env.MONGO_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
      (async function () {
         const admin = await Admin.findOne({
            username: 'testadmin',
         });
         if (!admin) {
            const salt = await bcrypt.genSalt();
            const pass = await bcrypt.hash('123456789', salt);
            const newadmin = await Admin.create({
               username: 'testadmin',
               firstName: 'test',
               lastName: 'admin',
               IDNumber: '0000001',
               email: 'testadmin@email.com',
               password: pass,
            });
            await newadmin.save();
            console.log('test admin created');
         }
      });
   })
   .catch((e) => console.log(`${e}`));
