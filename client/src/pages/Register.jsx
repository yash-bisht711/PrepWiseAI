import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { register } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6 overflow-hidden text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-8 left-8 blur-2xl animate-pulse" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-16 right-10 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <motion.form
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{ duration: 0.6 }}
        whileHover={{
          rotateX: 4,
          rotateY: -4,
          scale: 1.02,
        }}
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 border border-white/20 p-8 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.4)] w-full max-w-md"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex items-center gap-3 mb-8">
          <FaRobot
            size={36}
            className="text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]"
          />

          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Register
          </h2>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/45 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/45 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/45 mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleChange}
        />

        <motion.button
          whileHover={{
            scale: 1.04,
            boxShadow:
              "0px 0px 30px rgba(59,130,246,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-xl font-semibold"
        >
          Register
        </motion.button>

        <p className="text-sm text-center mt-5 text-white/65">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 hover:text-cyan-200"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
