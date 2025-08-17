import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

// Validation middleware
export const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

export const forgotPasswordValidation = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email address")
];

export const resetPasswordValidation = [
  body("resetToken")
    .trim()
    .notEmpty()
    .withMessage("Reset token is required"),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user and handle case-insensitive email matching
    const user = await User.findOne({ 
      email: { $regex: new RegExp("^" + email + "$", "i") } 
    });
    
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .json({
        success: true,
        token,
        user: { _id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ 
      email: { $regex: new RegExp("^" + email + "$", "i") }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const resetToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset link generated",
      resetToken
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired reset token"
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { login, verify, forgotPassword, resetPassword, handleValidationErrors };