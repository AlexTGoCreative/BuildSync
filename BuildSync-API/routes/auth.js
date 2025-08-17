import express from 'express'
import { 
  login, 
  verify, 
  forgotPassword, 
  resetPassword, 
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  handleValidationErrors
} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddlware.js'

const router = express.Router()

router.post('/login', loginValidation, handleValidationErrors, login)
router.get('/verify', authMiddleware, verify)
router.post('/forgot-password', forgotPasswordValidation, handleValidationErrors, forgotPassword)
router.post('/reset-password', resetPasswordValidation, handleValidationErrors, resetPassword)

export default router;