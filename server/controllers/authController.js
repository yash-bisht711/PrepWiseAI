const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateTokens");

const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // DO NOT HASH HERE
    // Schema pre("save") middleware will hash it

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("===== LOGIN ATTEMPT =====");
    console.log("EMAIL:", email);

    const user = await User.findOne({
      email,
    });

    console.log(
      "USER FOUND:",
      user ? "YES" : "NO"
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch =
      await user.matchPassword(password);

    console.log(
      "PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
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

      console.log("Generated OTP for",email,":",otp);

      // await sendEmail({
      //   email,
      //   subject:
      //     "Password Reset OTP",

      //   html: `
      //     <div style="font-family:sans-serif">
      //       <h2>Password Reset OTP</h2>

      //       <p>Your OTP is:</p>

      //       <h1>${otp}</h1>

      //       <p>
      //         Valid for 10 minutes.
      //       </p>
      //     </div>
      //   `,
      // });

      await sendEmail({
  email,

  subject: "PrepWise AI Password Reset OTP",

  html: `
    <div style="
      max-width:600px;
      margin:auto;
      padding:20px;
      font-family:Arial,sans-serif;
      border:1px solid #eee;
      border-radius:10px;
    ">
      <h2>
        Password Reset Request
      </h2>

      <p>
        Use the OTP below to reset
        your password:
      </p>

      <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:5px;
        text-align:center;
        margin:20px 0;
      ">
        ${otp}
      </div>

      <p>
        This OTP is valid for
        10 minutes.
      </p>

      <p>
        If you didn't request this,
        ignore this email.
      </p>

      <hr/>

      <p>
        PrepWise AI Team
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