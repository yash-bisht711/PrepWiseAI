import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    let interval;

    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpTimer]);

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return {
        text: "Weak",
        width: "33%",
        color: "bg-red-500",
      };
    }

    if (password.length < 10) {
      return {
        text: "Medium",
        width: "66%",
        color: "bg-yellow-500",
      };
    }

    return {
      text: "Strong",
      width: "100%",
      color: "bg-green-500",
    };
  };

  const strength = getPasswordStrength(password);

  const sendOTP = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/send-reset-otp", {
        email,
      });

      toast.success(data.message);
      setShowOtpFields(true);
      setOtpTimer(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/reset-password", {
        email,
        otp,
        password,
      });

      toast.success(data.message);
      setResetSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset Failed");
    } finally {
      setLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 border border-white/20 rounded-3xl p-10 text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-white">Password Reset Successful</h2>
          <p className="text-white/60 mt-3">Redirecting to Login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-10 left-10 blur-3xl animate-pulse" />
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-10 right-10 blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.4)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Forgot Password
          </h1>
          <p className="text-white/60 mt-3">Reset password using OTP</p>
        </div>

        <form onSubmit={resetPassword} className="space-y-5">
          <div>
            <label className="block text-white/80 mb-2">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                value={email}
                disabled={showOtpFields}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full pl-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white"
              />
            </div>
          </div>

          {!showOtpFields ? (
            <motion.button
              type="button"
              onClick={sendOTP}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </motion.button>
          ) : (
            <>
              <div>
                <label className="block text-white/80 mb-2">OTP</label>
                <div className="relative">
                  <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full pl-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">New Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-3">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`${strength.color} h-full`} style={{ width: strength.width }} />
                  </div>
                  <p className="text-sm text-white/60 mt-1">Strength: {strength.text}</p>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </motion.button>

              <button
                type="button"
                disabled={otpTimer > 0}
                onClick={sendOTP}
                className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white disabled:opacity-50"
              >
                {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
              </button>
            </>
          )}

          <div className="text-center">
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

