import {
  FaRobot,
  FaChartLine,
  FaMicrophone,
  FaVideo,
  FaHistory,
  FaTrophy,
  FaPlus,
} from "react-icons/fa";
import {
  useState,
  useEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { logout } from "../redux/authSlice";

const cardMotion = {
  initial: {
    opacity: 0,
    y: 28,
    rotateX: -8,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
  },
};

const Dashboard = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const [
    showProfile,
    setShowProfile,
  ] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/home");
  };

  const stats = [
    {
      title: "Total Interviews",
      value: 24,
      icon: <FaRobot size={25} />,
    },
    {
      title: "Average Score",
      value: "84%",
      icon: <FaChartLine size={25} />,
    },
    {
      title: "Confidence Score",
      value: "78%",
      icon: <FaMicrophone size={25} />,
    },
    {
      title: "Completed",
      value: 18,
      icon: <FaTrophy size={25} />,
    },
  ];

  const recentInterviews = [
    {
      id: 1,
      domain: "React.js",
      score: 88,
      date: "2 Days Ago",
    },
    {
      id: 2,
      domain: "Node.js",
      score: 82,
      date: "5 Days Ago",
    },
    {
      id: 3,
      domain: "JavaScript",
      score: 91,
      date: "1 Week Ago",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-8 left-8 blur-2xl animate-pulse" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-16 right-10 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <header className="relative z-20 bg-white/10 border-b border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaRobot
              size={35}
              className="text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]"
            />

            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              PrepWise AI
            </h1>
          </div>

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              onClick={() =>
                setShowProfile(!showProfile)
              }
              className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10 transition-all"
            >
              <span className="font-medium text-white">
                {user?.name}
              </span>

              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || "User"
                }&background=2563eb&color=fff`}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-cyan-300"
              />
            </button>

            {showProfile && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                className="absolute right-0 mt-3 w-72 bg-slate-950/95 shadow-[0_25px_80px_rgba(0,0,0,0.45)] rounded-xl border border-white/15 z-50"
              >
                <div className="p-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        user?.name || "User"
                      }&background=2563eb&color=fff`}
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />

                    <div>
                      <h3 className="font-bold">
                        {user?.name}
                      </h3>

                      <p className="text-sm text-white/60">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 rounded text-white/80 hover:bg-white/10"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded text-red-300 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 py-8">
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
            rotateX: 3,
            rotateY: -3,
            scale: 1.01,
          }}
          className="bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <h2 className="text-4xl font-bold mb-3">
            Welcome Back, {user?.name}
          </h2>

          <p className="mb-5 text-white/75">
            Practice AI-powered mock interviews,
            improve confidence and land your dream
            job.
          </p>

          <Link
            to="/interview/setup"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-[0_0_28px_rgba(59,130,246,0.45)] hover:scale-105 transition-transform"
          >
            <FaPlus />
            Start New Interview
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-5 mb-8 [perspective:1200px]">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              {...cardMotion}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: -8,
                scale: 1.03,
              }}
              className="bg-white/10 border border-white/15 rounded-2xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/60">
                    {item.title}
                  </p>

                  <h3 className="text-3xl font-bold text-white">
                    {item.value}
                  </h3>
                </div>

                <div className="text-cyan-300">
                  {item.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8 [perspective:1200px]">
          <motion.div
            whileHover={{
              y: -10,
              rotateX: 8,
              scale: 1.03,
            }}
            className="bg-white/10 border border-white/15 p-6 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <FaVideo
              size={35}
              className="mb-4 text-cyan-300"
            />

            <h3 className="text-xl font-bold">
              Video Interview
            </h3>

            <p className="text-white/65 mt-2">
              Practice real-time AI video
              interviews with webcam.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              rotateX: 8,
              scale: 1.03,
            }}
            className="bg-white/10 border border-white/15 p-6 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <FaMicrophone
              size={35}
              className="mb-4 text-cyan-300"
            />

            <h3 className="text-xl font-bold">
              Voice Analysis
            </h3>

            <p className="text-white/65 mt-2">
              Analyze confidence, communication
              and speech.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              rotateX: 8,
              scale: 1.03,
            }}
            className="bg-white/10 border border-white/15 p-6 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <FaChartLine
              size={35}
              className="mb-4 text-cyan-300"
            />

            <h3 className="text-xl font-bold">
              AI Evaluation
            </h3>

            <p className="text-white/65 mt-2">
              Get detailed feedback and
              improvement suggestions.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="bg-white/10 border border-white/15 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.25)] p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <FaHistory className="text-cyan-300" />
            <h2 className="text-xl font-bold">
              Recent Interviews
            </h2>
          </div>

          <div className="space-y-4">
            {recentInterviews.map(
              (interview) => (
                <motion.div
                  key={interview.id}
                  whileHover={{
                    x: 6,
                    scale: 1.01,
                  }}
                  className="border border-white/10 rounded-xl p-4 flex justify-between bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">
                      {interview.domain}
                    </h3>

                    <p className="text-sm text-white/55">
                      {interview.date}
                    </p>
                  </div>

                  <div className="font-bold text-emerald-300">
                    {interview.score}%
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            rotateX: 4,
            scale: 1.01,
          }}
          className="bg-cyan-500/10 border border-cyan-300/25 rounded-2xl p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        >
          <h2 className="text-xl font-bold mb-3">
            AI Recommendation
          </h2>

          <p className="text-white/75">
            Your React skills are strong. Focus
            more on Node.js, System Design and
            Behavioral Interviews to improve your
            placement chances.
          </p>
        </motion.div>
      </main>

      <footer className="relative z-10 bg-white/10 border-t border-white/15 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-white/50">
          (c) 2026 PrepWise AI Interview Platform
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
