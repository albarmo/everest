const { Role } = require("../models");

class RoleController {
    static async createRole(req, res, next) {
        try {
            const response = await Role.create({
                name: req.body.name,
                organization_id: req.body.organization_id,
            });
            return res
                .status(201)
                .json({ code: "201", message: "Ok", data: response });
        } catch (error) {
            next(error);
        }
    }

    static async list(req, res, next) {
        try {
            let data = await Role.findAll({});
            if (data) {
                return res
                    .status(200)
                    .json({ code: "200", message: "OK", data: data });
            } else {
                return res.status(500).json({
                    code: "500",
                    message: "Internal Server Error",
                    data: null,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async getRoleById(req, res, next) {
        const { id } = req.params;
        console.log("id >>", id);
        try {
            let data = await Role.findOne({ where: { id: id } });
            if (data) {
                return res
                    .status(200)
                    .json({ code: "200", message: "Ok", data: data });
            } else {
                return res.status(500).json({
                    code: "500",
                    message: "Internal Server Error",
                    data: id,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateRole(req, res, next) {
        const { id } = req.params;

        try {
            const role = await Role.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (role) {
                Role.update(
                    {
                        name: req.body.name,
                        organization_id: req.body.organization_id,
                    },
                    {
                        where: {
                            id: id,
                        },
                        returning: true,
                    }
                )
                    .then((data) => {
                        return res.status(201).json({
                            code: "201",
                            message: "Succes updated role",
                            data: data,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                            code: "500",
                            message: error,
                            data: error,
                        });
                    });
            } else if (!role) {
                res.status(404).json({
                    code: "200",
                    message: "Role not found",
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteRole(req, res, next) {
        const { id } = req.params;
        try {
            const response = await Role.findOne({
                where: { id: id },
            });

            if (response) {
                const response = await Role.destroy({ where: { id: id } });
                if (response) {
                    return res.status(200).json({
                        code: "200",
                        message: `Success delete role with id ${id}`,
                        data: response,
                    });
                }
            } else {
                return res.status(404).json({
                    code: "404",
                    message: `failed, delete role with id ${id} not found`,
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoleController;
