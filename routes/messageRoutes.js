const {
  addMessage,
  getAllMessage,
} = require("../controllers/messageControllers");
const router = require("express").Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessage);

module.exports = router;
