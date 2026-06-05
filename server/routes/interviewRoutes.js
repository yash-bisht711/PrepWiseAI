const express =
  require("express");

const router =
  express.Router();

const {
  createInterview,
  getInterviewById,
  getUserInterviews,
} = require(
  "../controllers/interviewController"
);

const protect =
  require("../middleware/authMiddleware");

router.post(
  "/create",
  protect,
  createInterview
);

router.get(
  "/:id",
  getInterviewById
);

router.get(
  "/user/:userId",
  getUserInterviews
);

module.exports = router;
