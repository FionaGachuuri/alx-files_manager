import express from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController';

const router = express.Router();

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/users/:id', UsersController.getUser);
router.post('/users', UsersController.createUser);

export default router;
