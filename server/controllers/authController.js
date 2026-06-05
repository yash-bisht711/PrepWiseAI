const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateTokens");

const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
    await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({ email });

    if (
      user &&
      await bcrypt.compare(
        password,
        user.password
      )
    ) {

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });

    }

    res.status(401).json({
      message: "Invalid Credentials"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// SEND OTP
exports.sendResetOTP =
  async (req, res) => {
    try {
      const { email } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "Email not found",
          });
      }

      const otp =
        Math.floor(
          100000 +
            Math.random() *
              900000
        ).toString();

      const hashedOtp =
        await bcrypt.hash(
          otp,
          10
        );

      user.otp =
        hashedOtp;

      user.otpExpire =
        Date.now() +
        10 *
          60 *
          1000;

      await user.save();

      await sendEmail({
        email,
        subject:
          "Password Reset OTP",

        html: `
          <div style="font-family:sans-serif">
            <h2>Password Reset OTP</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>
              Valid for 10 minutes.
            </p>
          </div>
        `,
      });

      res.json({
        success: true,
        message:
          "OTP sent successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// VERIFY OTP
exports.verifyOTP =
  async (req, res) => {
    try {
      const {
        email,
        otp,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      if (
        !user.otp ||
        !user.otpExpire
      ) {
        return res
          .status(400)
          .json({
            message:
              "OTP not generated",
          });
      }

      if (
        user.otpExpire <
        Date.now()
      ) {
        return res
          .status(400)
          .json({
            message:
              "OTP expired",
          });
      }

      const validOtp =
        await bcrypt.compare(
          otp,
          user.otp
        );

      if (!validOtp) {
        return res
          .status(400)
          .json({
            message:
              "Invalid OTP",
          });
      }

      res.json({
        success: true,
        message:
          "OTP verified",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// RESET PASSWORD
exports.resetPassword =
  async (req, res) => {
    try {
      const {
        email,
        otp,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      if (
        user.otpExpire <
        Date.now()
      ) {
        return res
          .status(400)
          .json({
            message:
              "OTP expired",
          });
      }

      const validOtp =
        await bcrypt.compare(
          otp,
          user.otp
        );

      if (!validOtp) {
        return res
          .status(400)
          .json({
            message:
              "Invalid OTP",
          });
      }

      user.password =
        password;

      user.otp = null;

      user.otpExpire =
        null;

      await user.save();

      res.json({
        success: true,
        message:
          "Password reset successful",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };