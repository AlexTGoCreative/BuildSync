import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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
      { expiresIn: "10d" } 
    );

    return res
      .status(200)
      .json({
        success: true, 
        token,
        user: { _id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

const verify = (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    // Generate a reset token that expires in 1 hour
    const resetToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Update user with reset token
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // In a real application, you would send an email here with the reset link
    // For now, we'll just return the token in the response
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

    // Find user with valid reset token
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

    // Hash new password and update user
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

export { login, verify, forgotPassword, resetPassword };
