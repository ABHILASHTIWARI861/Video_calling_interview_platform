import express from 'express';
import { getStreamToken } from '../controllers/chatController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router =express.Router();

router.get("/token",protectRoute,getStreamToken);
//upsertStreamUser = Stream ke database me user banana
//createToken(i.e,getStreamToken) = User ko Stream use karne ki permission dena

export default router;