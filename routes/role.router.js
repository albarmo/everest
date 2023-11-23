const roleRouter = require("express").Router();
const RoleController = require("../controllers/role.controller");
const { authorization, authentification } = require("../middleware/Auth");

roleRouter.get("/", RoleController.list);
roleRouter.post("/", RoleController.createRole);
roleRouter.get("/:id", RoleController.getRoleById);
roleRouter.put("/:id", RoleController.updateRole);
roleRouter.delete("/:id", RoleController.deleteRole);

roleRouter.use(authentification);
roleRouter.use(authorization);

module.exports = roleRouter;
