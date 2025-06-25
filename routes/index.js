import express from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController';
<<<<<<< HEAD
=======
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
>>>>>>> 086bb10 (Add utils and controllers updates)

const router = express.Router();

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
<<<<<<< HEAD
router.get('/users/:id', UsersController.getUser);
router.post('/users', UsersController.createUser);
=======
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
router.post('/files', FilesController.postUpload);
router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);
router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);
router.get('/files/:id/data', FilesController.getFile);
>>>>>>> 086bb10 (Add utils and controllers updates)

export default router;
