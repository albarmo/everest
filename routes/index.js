const router = require("express").Router();
const userRouter = require("./user.router");
const roleRouter = require("./role.router");

router.use("/user", userRouter);
router.use("/role", roleRouter);

module.exports = router;
