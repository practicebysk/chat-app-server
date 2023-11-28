const { register } = require("../controllers/usercontrollers");
const router = require("express").Router();

router.post("/register",register);

module.exports = router;
