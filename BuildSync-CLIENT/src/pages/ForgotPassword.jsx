import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      if (response.data.success) {
        setSuccess(true);
        setResetToken(response.data.resetToken);
        setError(null);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { resetToken, newPassword }
      );
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6 select-none">
      <h2 className="font-pacific text-3xl text-white">BuildSync</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">
          {!success ? "Forgot Password" : "Reset Password"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!success ? (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
        <div className="text-center">
          <a href="/login" className="text-teal-600 hover:text-teal-700">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 