import express from 'express';
import upload from '../middleware/multerConfig.js'; 
import authMiddleware from '../middleware/authMiddlware.js';
import { addWorkRequest, getWorkRequest, getWorkRequests, getWorkRequestDetail, updateWorkRequest } from '../controllers/workController.js';

const router = express.Router();

router.post('/add', upload.single('details'), addWorkRequest);
router.get('/detail/:id', authMiddleware, getWorkRequestDetail);
router.get('/:id/:role', authMiddleware, getWorkRequest);
router.get('/', authMiddleware, getWorkRequests);
router.put('/:id', authMiddleware, updateWorkRequest);

export default router;