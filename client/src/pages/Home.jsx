import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  FaRobot,
  FaMicrophone,
  FaVideo,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const featureCards = [
  {
    title: "Video Interview",
    description:
      "Practice in a real webcam-based interview flow.",
    icon: <FaVideo size={38} />,
  },
  {
    title: "Voice Analysis",
    description:
      "Measure confidence and communication quality.",
    icon: <FaMicrophone size={38} />,
  },
  {
    title: "AI Interviewer",
    description:
      "Generate focused technical questions instantly.",
    icon: <FaRobot size={38} />,
  },
  {
    title: "Detailed Analytics",
    description:
      "Track performance and improvement areas.",
    icon: <FaChartLine size={38} />,
  },
];

const stats = [
  {
    value: "10K+",
    label: "Mock Interviews",
  },
  {
    value: "5K+",
    label: "Students",
  },
  {
    value: "95%",
    label: "Success Rate",
  },
  {
    value: "24/7",
    label: "AI Availability",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

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

          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="font-medium text-white/80 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold leading-tight">
              Ace Your Next{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Technical Interview
              </span>{" "}
              With AI
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-xl">
              Practice real interview questions,
              improve communication skills, receive
              AI feedback, and track your performance
              like never before.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow:
                    "0px 0px 30px rgba(59,130,246,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Get Started
              </motion.button>

              <Link
                to="/login"
                className="border border-white/20 bg-white/10 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Demo Login
              </Link>
            </div>
          </motion.div>

          <motion.div
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
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            whileHover={{
              rotateX: 5,
              rotateY: -6,
              scale: 1.02,
            }}
            className="bg-white/10 border border-white/20 rounded-3xl p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Interview practice"
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-center mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-4 gap-6 [perspective:1200px]">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
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
                  y: -10,
                  rotateX: 8,
                  rotateY: -8,
                  scale: 1.03,
                }}
                className="bg-white/10 border border-white/15 p-6 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-4 text-cyan-300">
                  {feature.icon}
                </div>

                <h3 className="font-bold text-xl">
                  {feature.title}
                </h3>

                <p className="mt-2 text-white/65">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-6 text-center [perspective:1200px]">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  y: -8,
                  rotateX: 8,
                  scale: 1.03,
                }}
                className="bg-white/10 border border-white/15 rounded-2xl p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
              >
                <h3 className="text-4xl font-bold text-cyan-300">
                  {item.value}
                </h3>

                <p className="mt-2 text-white/65">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            whileHover={{
              rotateX: 4,
              scale: 1.01,
            }}
            className="bg-cyan-500/10 border border-cyan-300/25 rounded-3xl p-10 text-center shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-4xl font-bold">
              Ready To Crack Your Dream Job?
            </h2>

            <p className="mt-4 text-lg text-white/70">
              Start practicing AI-powered interviews
              today.
            </p>

            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow:
                  "0px 0px 30px rgba(59,130,246,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 bg-white/10 border-t border-white/15 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h2 className="text-xl font-bold">
            PrepWise AI Interview Platform
          </h2>

          <p className="mt-2 text-white/55">
            Practice. Improve. Get Hired.
          </p>

          <p className="mt-4 text-white/45">
            (c) 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
