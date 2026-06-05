import { useMemo } from "react";

const ProgressBar = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
};

const CircularScore = ({ score }) => {
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={120} width={120}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={60}
          cy={60}
        />
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          r={normalizedRadius}
          cx={60}
          cy={60}
          strokeLinecap="round"
        />
      </svg>

      <div className="text-xl font-bold -mt-16">
        {score}/10
      </div>
    </div>
  );
};

const Result = ({ result }) => {
  const {
    communicationScore = 0,
    technicalScore = 0,
    confidenceScore = 0,
    overallScore = 0,
    feedback = "",
  } = result || {};

  // -----------------------------
  // 🎯 Weak Areas Detection
  // -----------------------------
  const weakAreas = useMemo(() => {
    const arr = [];

    if (communicationScore <= 5) arr.push("Communication");
    if (technicalScore <= 5) arr.push("Technical Skills");
    if (confidenceScore <= 5) arr.push("Confidence");

    return arr;
  }, [
    communicationScore,
    confidenceScore,
    technicalScore,
  ]);

  // -----------------------------
  // 🏆 Badge System
  // -----------------------------
  const badge = useMemo(() => {
    if (overallScore >= 8) return "🏆 Gold Performer";
    if (overallScore >= 6) return "🥈 Silver Performer";
    return "🟡 Needs Improvement";
  }, [overallScore]);

  // -----------------------------
  // 🔊 Voice Playback
  // -----------------------------
  const speakFeedback = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = feedback;
    msg.rate = 1;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
  };

  // -----------------------------
  // 📄 PDF Download (simple print)
  // -----------------------------
  const downloadPDF = () => {
    window.print();
  };

  if (!result) {
    return (
      <div className="p-4 text-center">
        No result found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6">

      {/* Title */}
      <h1 className="text-2xl font-bold text-center">
        Interview Performance Report
      </h1>

      {/* Badge */}
      <div className="text-center">
        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
          {badge}
        </span>
      </div>

      {/* Circular Score */}
      <CircularScore score={overallScore} />

      {/* Skill Bars */}
      <div className="space-y-4">
        <ProgressBar label="Communication" value={communicationScore} />
        <ProgressBar label="Technical" value={technicalScore} />
        <ProgressBar label="Confidence" value={confidenceScore} />
      </div>

      {/* Weak Areas */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <h2 className="font-semibold text-red-600 mb-2">
          Weak Areas Detected
        </h2>

        {weakAreas.length > 0 ? (
          <ul className="list-disc ml-5 text-red-500">
            {weakAreas.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">
            No weak areas detected 🎉
          </p>
        )}
      </div>

      {/* Feedback */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h2 className="font-semibold mb-2">AI Feedback</h2>
        <p className="text-gray-600 leading-relaxed">{feedback}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={speakFeedback}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          🔊 Listen Feedback
        </button>

        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          📄 Download Report
        </button>
      </div>

    </div>
  );
};

export default Result;
