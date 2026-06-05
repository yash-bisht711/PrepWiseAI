import {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaPaperPlane,
  FaSignOutAlt,
} from "react-icons/fa";
import { getInterviewAction } from "../redux/interviewSlice";
import VideoRecorder from "../component/VideoRecorder";
import api from "../services/api";

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const {
    interview,
    loading,
    error,
  } = useSelector(
    (state) => state.interview
  );

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [answers, setAnswers] =
    useState([]);

  const question =
    interview?.questions?.[currentQuestion];

  const questionText =
    typeof question === "string"
      ? question
      : question?.question || "";

  useEffect(() => {
    dispatch(getInterviewAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!questionText) {
      return;
    }

    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        questionText
      );

    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel();
    };
  }, [questionText]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6 text-white">
        <div className="bg-red-500/10 border border-red-300/25 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <h1 className="text-xl font-semibold text-red-200">
            {error}
          </h1>
        </div>
      </div>
    );
  }

  if (
    loading ||
    !interview ||
    !interview.questions?.length
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
        >
          <h1 className="text-xl font-semibold">
            Loading Interview...
          </h1>
        </motion.div>
      </div>
    );
  }

  const nextQuestion = () => {
    if (
      currentQuestion <
      interview.questions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
    } else {
      speechSynthesis.cancel();
      alert(
        "Interview Completed Successfully!"
      );
    }
  };

  const leaveInterview = () => {
  setShowLeaveModal(true);
};

const confirmLeaveInterview = () => {
  speechSynthesis.cancel();
  navigate("/dashboard");
};

const cancelLeaveInterview = () => {
  setShowLeaveModal(false);
};

  const handleRecordingComplete = (
    recordingData
  ) => {
    const answer = {
      question,
      questionText,
      video:
        recordingData.blob,
      duration:
        recordingData.duration,
    };

    setAnswers((prev) => [
      ...prev,
      answer,
    ]);
  };

  // const submitInterview = () => {
  //   console.log(answers);
  // };

  const submitInterview =
async () => {

 for(
 let answer of answers
 ){

  const formData =
  new FormData();

  formData.append(
   "video",
   answer.video
  );

  formData.append(
   "question",
   answer.questionText
  );

  formData.append(
   "duration",
   answer.duration
  );

  formData.append(
   "interviewId",
   id
  );

  await api.post(
   "/answers/upload",
   formData
  );

 }

 alert(
 "Interview Submitted"
 );

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-8 left-8 blur-2xl animate-pulse" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-16 right-10 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto p-6 py-10">
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
          className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Interview Room
              </h1>

              <p className="text-white/65 mt-2">
                Question {currentQuestion + 1} of{" "}
                {interview.questions.length}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex gap-2 flex-wrap">
                {interview.questions.map(
                  (_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setCurrentQuestion(index)
                      }
                      className={`w-10 h-10 rounded-xl border transition-all ${
                        index === currentQuestion
                          ? "bg-cyan-500 text-white border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                          : "bg-white/10 text-white/70 border-white/15 hover:bg-white/20"
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  )
                )}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={leaveInterview}
                className="bg-red-500/15 border border-red-300/30 text-red-100 px-4 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-red-500/25"
              >
                <FaSignOutAlt />
                Leave
              </motion.button>
            </div>
          </div>

          <motion.div
            whileHover={{
              rotateX: 3,
              scale: 1.01,
            }}
            className="bg-white/10 border border-white/15 p-6 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
          >
            <p className="text-lg leading-relaxed">
              {questionText}
            </p>
          </motion.div>

          <div className="mt-8 bg-white/10 border border-white/15 rounded-2xl p-5">
            <VideoRecorder
              onRecordingComplete={
                handleRecordingComplete
              }
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0px 0px 28px rgba(59,130,246,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={nextQuestion}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
            >
              <FaCheck />
              {currentQuestion ===
              interview.questions.length - 1
                ? "Finish Interview"
                : "Next Question"}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={submitInterview}
              className="bg-white/10 border border-white/20 text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-white/20"
            >
              <FaPaperPlane />
              Submit Interview
            </motion.button>
          </div>
        </motion.div>
      </main>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full top-8 left-8 blur-2xl animate-pulse" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full bottom-16 right-10 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>
      {
  showLeaveModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="bg-slate-900 border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Leave Interview?
        </h2>

        <p className="text-white/70 mb-8">
          Are you sure you want to leave this
          interview session?
          <br />
          Your progress and recorded answers
          may not be submitted.
        </p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={cancelLeaveInterview}
            className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            Continue Interview
          </button>

          <button
            onClick={confirmLeaveInterview}
            className="px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Leave Anyway
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
    </div>
  );
};

export default InterviewRoom;
