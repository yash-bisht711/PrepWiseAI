const express = require("express");

const router = express.Router();
const sendEmail = require("../utils/sendEmail");

const {
  register,
  login,
  sendResetOTP,
  verifyOTP,
  resetPassword,
} = require(
  "../controllers/authController"
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/send-reset-otp",
  sendResetOTP
);

router.post(
  "/verify-otp",
  verifyOTP
);

router.post(
  "/reset-password",
  resetPassword
);

router.get(
  "/test-email",
  async (req, res) => {
    try {
      await sendEmail({
        email:
          "whyrush711@gmail.com",

        subject:
          "Resend Test",

        html:
          "<h1>Working!</h1>",
      });

      res.json({
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

module.exports = router;