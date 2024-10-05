import express from 'express';
import { loginOrSignup } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', loginOrSignup);

export default router;
