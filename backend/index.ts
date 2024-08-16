import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb+srv://arnavnath:theprojectaoffical@projecta-db.ghksrow.mongodb.net/?retryWrites=true&w=majority&appName=projecta-db',  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the RESTful API!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
