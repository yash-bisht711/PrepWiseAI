const express =
require("express");

const router =
express.Router();

const upload =
require(
 "../middleware/upload"
);

const {
 uploadAnswer,
} = require(
 "../controllers/answerController"
);

router.post(
 "/upload",
 upload.single("video"),
 uploadAnswer
);

module.exports =
router;