const express =
require("express");

const router =
express.Router();

const {
 evaluateInterview,
 getUserResults
} = require(
 "../controllers/resultController"
);

router.post(
 "/evaluate",
 evaluateInterview
);

router.get(
 "/user/:userId",
 getUserResults
);

module.exports =
router;