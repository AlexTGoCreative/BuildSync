import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addWorkRequest, getWorkRequest, getWorkRequests, getWorkRequestDetail, updateWorkRequest } from '../controllers/workController.js'

const router = express.Router()

router.post('/add', authMiddleware, addWorkRequest)
router.get('/detail/:id', authMiddleware, getWorkRequestDetail)
router.get('/:id/:role', authMiddleware, getWorkRequest)
router.get('/', authMiddleware, getWorkRequests)
router.put('/:id', authMiddleware, updateWorkRequest)

export default router