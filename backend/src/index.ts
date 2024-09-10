import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';  // Import cors

import { loginOrSignup } from './controllers/auth.controller';

import projectRoutes from './routes/project.route';

// Connect to MongoDB
mongoose.connect('mongodb+srv://arnavnath:theprojectaoffical@projecta-db.ghksrow.mongodb.net/?retryWrites=true&w=majority&appName=projecta-db',  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

// Use CORS middleware
app.use(cors({
  origin: ["https://localhost:3000"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

app.post('/api/auth/login', loginOrSignup);
app.use('/api', projectRoutes)

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
