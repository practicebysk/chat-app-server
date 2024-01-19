const { register, login, setAvatar, getAllUser, test } = require("../controllers/userControllers");
const router = require("express").Router();

router.post("/",test);
router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUser)
module.exports = router;
