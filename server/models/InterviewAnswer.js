const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },

    question: String,

    answerText: {
      type: String,
      default: "",
    },

    videoUrl: String,

    duration: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewAnswer",
  answerSchema
);