import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const stats = [
    {
      title: "Total Interviews",
      value: "24",
    },
    {
      title: "Average Score",
      value: "84%",
    },
    {
      title: "Confidence",
      value: "78%",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6 relative overflow-hidden text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-8 left-8 blur-2xl animate-pulse" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-16 right-10 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{ duration: 0.6 }}
        whileHover={{
          rotateX: 2,
          scale: 1.005,
        }}
        className="w-full max-w-5xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.4)] p-10 relative z-10"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            x: -3,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition mb-8"
        >
          <FaArrowLeft />
          Back to Dashboard
        </motion.button>

        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{
              scale: 1.05,
              rotateY: 8,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50" />

            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "User"
              }&size=200&background=2563eb&color=fff`}
              alt="Profile"
              className="relative w-40 h-40 rounded-full border-4 border-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.45)]"
            />
          </motion.div>

          <h1 className="text-4xl font-bold mt-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {user?.name}
          </h1>

          <p className="text-white/65 mt-2">
            {user?.email}
          </p>

          <span className="mt-4 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm border border-emerald-300/20">
            Active Candidate
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10 [perspective:1200px]">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 28,
                rotateX: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                rotateX: 8,
                rotateY: -8,
                scale: 1.03,
              }}
              className="bg-white/10 border border-white/15 rounded-2xl p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            >
              <h3 className="text-white/60 text-sm mb-2">
                {item.title}
              </h3>

              <p className="text-3xl font-bold text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {[
            ["Full Name", user?.name],
            ["Email Address", user?.email],
            ["Role", "Candidate"],
            ["Account Status", "Active"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-white/60 mb-2">
                {label}
              </p>

              <div className="bg-white/10 border border-white/15 rounded-xl p-4">
                {value}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          whileHover={{
            rotateX: 4,
            scale: 1.01,
          }}
          className="mt-10 bg-cyan-500/10 border border-cyan-300/25 rounded-2xl p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        >
          <h2 className="text-2xl font-bold mb-3">
            AI Career Recommendation
          </h2>

          <p className="text-white/75 leading-relaxed">
            Your performance shows strong frontend
            development skills. Continue practicing
            React.js, Node.js, System Design, DSA,
            and Behavioral Interviews to improve
            your placement readiness and confidence
            score.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
