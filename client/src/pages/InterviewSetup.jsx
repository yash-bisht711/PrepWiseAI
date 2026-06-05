import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createInterviewAction } from "../redux/interviewSlice";

const InterviewSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companies = [
    {
      name: "Google",
      logo: "https://cdn.simpleicons.org/google",
    },
    {
      name: "Microsoft",
      logo: "https://cdn-icons-png.flaticon.com/128/732/732221.png",
    },
    {
      name: "Amazon",
      logo: "https://cdn-icons-png.flaticon.com/128/10096/10096351.png",
    },
    {
      name: "Meta",
      logo: "https://cdn.simpleicons.org/meta",
    },
    {
      name: "Apple",
      logo: "https://cdn.simpleicons.org/apple",
    },
    {
      name: "Netflix",
      logo: "https://cdn.simpleicons.org/netflix",
    },
    {
      name: "Adobe",
      logo: "https://cdn-icons-png.flaticon.com/128/888/888835.png",
    },
    {
      name: "General Fresher",
      logo: "https://cdn-icons-png.flaticon.com/128/16436/16436296.png",
    },
    // {
    //   name: "Other",
    //   logo: null,
    // },
  ];

  const roleOptions = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "React Developer",
    "Angular Developer",
    "Node.js Developer",
    "Java Developer",
    "Python Developer",
    "QA Engineer",
    "Test Engineer",
    "Automation Tester",
    "DevOps Engineer",
    "Cloud Engineer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Engineer",
    "Cyber Security Analyst",
    "UI/UX Designer",
    "General Fresher",
    "Other",
  ];

  const domainOptions = [
    "React",
    "Angular",
    "Node.js",
    "MERN Stack",
    "Java",
    "Spring Boot",
    "Python",
    "Machine Learning",
    "DevOps",
    "Cyber Security",
    "Other",
  ];

  const formControlClass =
    "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition";
  const formSelectClass =
    "w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white appearance-none pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition";
  const formArrowClass =
    "pointer-events-none absolute inset-y-0 right-4 flex items-center text-white";

  const formButtonClass =
    "px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition";

  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(
    companies.find((company) => company.name === "General Fresher") || companies[0]
  );
  const [formData, setFormData] = useState({
    language: "English",
    targetCompany: "General Fresher",
    domain: "React",
    role: "Software Developer",
    level: "Beginner",
    totalQuestions: 5,
  });

  const [isCustomCompany, setIsCustomCompany] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [isCustomRole, setIsCustomRole] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const interview = await dispatch(
        createInterviewAction(formData)
      ).unwrap();

      navigate(`/interview/${interview._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6 overflow-hidden">

      {/* Animated Background */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          rotateX: 4,
          rotateY: -4,
          scale: 1.02,
        }}
        className="
          relative
          z-10
          w-full
          max-w-2xl
          bg-white/10
          border
          border-white/20
          rounded-3xl
          p-8
          shadow-[0_25px_80px_rgba(0,0,0,0.4)]
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className="
              text-4xl
              font-bold
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
            "
          >
            AI Interview Setup
          </h1>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="
              px-5
              py-2
              rounded-xl
              bg-white/10
              text-white
              border
              border-white/20
              hover:bg-white/20
              transition-all
            "
          >
            ← Back
          </motion.button>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <label className="text-white/80 block mb-2">
              Target Company
            </label>

            <button
              type="button"
              onClick={() => setShowCompanies(!showCompanies)}
              className={`w-full ${formControlClass} flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                {selectedCompany.logo && (
                  <img
                    src={selectedCompany.logo}
                    alt=""
                    className="w-6 h-6"
                  />
                )}

                <span>
                  {isCustomCompany
                    ? formData.targetCompany || "Other"
                    : selectedCompany.name}
                </span>
              </div>

              <span className={formArrowClass}>▼</span>
            </button>

            {showCompanies && (
              <div
                className="
        absolute
        mt-2
        w-full
        bg-slate-900
        border
        border-white/20
        rounded-xl
        overflow-hidden
        z-50
      "
              >
                {companies.map((company) => (
                  <button
                    key={company.name}
                    type="button"
                    onClick={() => {
                      const isOther = company.name === "Other";

                      setSelectedCompany(company);
                      setIsCustomCompany(isOther);
                      setFormData({
                        ...formData,
                        targetCompany: isOther
                          ? ""
                          : company.name,
                      });
                      setShowCompanies(false);
                    }}
                    className="
            w-full
            px-4
            py-3
            flex
            items-center
            gap-3
            hover:bg-white/10
            text-white
          "
                  >
                    {company.logo && (
                      <img
                        src={company.logo}
                        alt=""
                        className="w-6 h-6"
                      />
                    )}

                    {company.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isCustomCompany && (
            <div>
              <label className="text-white/80 block mb-2">
                Custom Company
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter company name..."
                  value={formData.targetCompany}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetCompany: e.target.value,
                    })
                  }
                  className={`${formControlClass} placeholder:text-white/40 flex-1`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCompany(false);
                    setSelectedCompany(companies[0]);
                    setFormData({
                      ...formData,
                      targetCompany: companies[0].name,
                    });
                  }}
                  className={formButtonClass}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          <div className="relative">
            <label className="text-white/80 block mb-2">
              Target Role
            </label>

            {!isCustomRole ? (
              <>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setIsCustomRole(true);
                      setFormData({
                        ...formData,
                        role: "",
                      });
                    } else {
                      setFormData({
                        ...formData,
                        role: e.target.value,
                      });
                    }
                  }}
                  className={formSelectClass}
                >
                  {roleOptions.map((role) => (
                    <option
                      key={role}
                      className="bg-slate-900 text-white"
                      value={role}
                    >
                      {role}
                    </option>
                  ))}
                </select>
                <span className={formArrowClass}>▼</span>
              </>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter target role..."
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                  className={`${formControlClass} placeholder:text-white/40 flex-1`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomRole(false);

                    setFormData({
                      ...formData,
                      role: "Software Developer",
                    });
                  }}
                  className={formButtonClass}
                >
                  Back
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="text-white/80 block mb-2">
              Domain
            </label>

            {!isCustomDomain ? (
              <>
                <select
                  value={formData.domain}
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setIsCustomDomain(true);
                      setFormData({
                        ...formData,
                        domain: "",
                      });
                    } else {
                      setFormData({
                        ...formData,
                        domain: e.target.value,
                      });
                    }
                  }}
                  className={formSelectClass}
                >
                  {domainOptions.map((domain) => (
                    <option
                      key={domain}
                      className="bg-slate-900 text-white"
                      value={domain}
                    >
                      {domain}
                    </option>
                  ))}
                </select>
                <span className={formArrowClass}>▼</span>
              </>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your domain..."
                  value={formData.domain}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      domain: e.target.value,
                    })
                  }
                  className={`${formControlClass} placeholder:text-white/40 flex-1`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomDomain(false);

                    setFormData({
                      ...formData,
                      domain: "React",
                    });
                  }}
                  className={formButtonClass}
                >
                  Back
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="text-white/80 block mb-2">
              Difficulty
            </label>
            <>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    level: e.target.value,
                  })
                }
                className={formSelectClass}
              >
                <option className="bg-slate-900 text-white">Fresher</option>
                <option className="bg-slate-900 text-white">Intermediate</option>
                <option className="bg-slate-900 text-white">Senior</option>
              </select>
              <span className={formArrowClass}>▼</span>
            </>
          </div>

          <div>
            <label className="text-white/80 block mb-2">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.totalQuestions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalQuestions: Number(e.target.value),
                })
              }
              className={formControlClass}
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0px 0px 30px rgba(59,130,246,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              text-lg
            "
          >
            🚀 Generate Interview
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default InterviewSetup;