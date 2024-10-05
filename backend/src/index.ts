import express, { Request, Response } from 'express';
import cors from 'cors';  // Import CORS
import { Database } from '../database.types'; // Import your Database type definition (if you have it)
import { loginOrSignup } from './controllers/auth.controller'; // Make sure to have the controller
// import projectRouter from './routes/project.route';
import { createProject } from './controllers/project.controller';
import projectRouter from './routes/project.route';
import tagRouter from './routes/tag.route';
import issueRouter from './routes/issue.route';


const app = express();

// Use CORS middleware
app.use(cors({ 
  origin: "http://localhost:3000", // Fix the protocol (http instead of https)
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('<span>hello</span>'); // Proper response using res.send()
});

// Route for login/signup
app.post('/api/auth/login', loginOrSignup);
// Create a project
// app.post('/projects', createProject);
app.use('/api', projectRouter);
app.use('/api', tagRouter);
app.use('/api', issueRouter);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
