const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: Number,

    question: {
      type: String,
      required: true,
    },

    difficulty: String,

    topic: String,

    role: String,

    type: {
      type: String,
    },

    expected_concepts: [String],
  },
  {
    _id: false,
  }
);

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetCompany: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    questions: [questionSchema],

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);
