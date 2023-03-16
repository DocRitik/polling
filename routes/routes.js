const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

router.post("/question", controller.createQnO);
router.get("/question/:id", controller.getQnO);
router.get("/questions", controller.getAllQnO);
router.get("/poll", controller.getPoll);
router.post("/login", controller.login);
module.exports = router;
