const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const transporter = require("../helpers/nodemailer");
const uploader = require("../helpers/uploader");

class UserController {
    static async getCurrentUser(req, res, next) {
        const { id } = req.userData;
        let data = await User.findOne({ where: { id: id } });
        try {
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

    static async list(req, res, next) {
        try {
            let data = await User.findAll({});
            console.log(data, "data");
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

    static async register(req, res, next) {
        try {
            const upload = uploader("USER_PROFILE_PICTURE").fields([
                { name: "profile_picture" },
            ]);
            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                }
                const { profile_picture } = req.files;
                const imagePath = profile_picture
                    ? "/" + profile_picture[0].filename
                    : null;

                let inputData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    profile_picture: imagePath,
                    password: req.body.password,
                    role: req.body.role,
                    phone: req.body.phone,
                    emergency_contact: req.body.emergency_contact,
                    address: req.body.address,
                    birth_date: req.body.birth_date,
                    academic_year: req.body.academic_year,
                    study_program: req.body.study_program,
                    personal_number: req.body.personal_number,
                };

                User.create(inputData)
                    .then((data) => {
                        transporter.sendMail(
                            {
                                from:
                                    "Tricora Trailblaze <tukangemailalbar@gmail.com>",
                                to: req.body.email,
                                subject: "Berhasil Mendaftarkan Akun",
                                html: `Terimakasih ${req.body.first_name} Telah registrasi akun`,
                            },
                            (err, _result) => {
                                console.log(_result);
                                if (err) {
                                    return res.send(err);
                                }
                                return res.redirect("/");
                            }
                        );
                        return res.status(201).json({
                            code: "201",
                            message: "Succes create account",
                            data,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        return res
                            .status(500)
                            .json({ code: "500", message: error });
                    });
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ code: "400", message: "Bad Request", data: {} });
        }

        const user = await User.findOne({
            where: { email: email },
        });

        try {
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "failed, user not registered" });
            } else if (!comparePassword(password, user.dataValues.password)) {
                return res
                    .status(500)
                    .json({ code: "500", message: "email or password wrong!" });
            } else {
                const token = generateAccessToken({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
                return res.status(200).json({
                    code: "200",
                    message: "OK",
                    data: { access_token: token },
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        const { id } = req.params;

        try {
            const userDataById = await User.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (userDataById) {
                const upload = uploader("USER_PROFILE_PICTURE").fields([
                    { name: "profile_picture" },
                ]);
                upload(req, res, (err) => {
                    if (err) {
                        return res.status(500).json({ msg: err });
                    }
                    const { profile_picture } = req.files;
                    const imagePath = profile_picture
                        ? "/" + profile_picture[0].filename
                        : null;

                    let inputData = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        email: req.body.email,
                        profile_picture: imagePath,
                        password: req.body.password,
                        role: req.body.role,
                        phone: req.body.phone,
                        emergency_contact: req.body.emergency_contact,
                        address: req.body.address,
                        birth_date: req.body.birth_date,
                        academic_year: req.body.academic_year,
                        study_program: req.body.study_program,
                        personal_number: req.body.personal_number,
                    };

                    User.update(inputData, {
                        where: {
                            id: id,
                        },
                        returning: true,
                    })
                        .then((data) => {
                            return res.status(201).json({
                                code: "201",
                                message: "Succes updated account",
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
                });
            } else if (!userDataById) {
                res.status(404).json({
                    code: "200",
                    message: "User not found",
                    data: id,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        const { id } = req.params;
        try {
            const deleteUser = await User.findOne({
                where: { id: id },
            });

            console.log({ deleteUser });
            if (deleteUser) {
                const response = await User.destroy({ where: { id: id } });
                if (response) {
                    return res.status(200).json({
                        code: "200",
                        message: `Success delete user with id ${id}`,
                        data: response,
                    });
                }
            } else {
                return res.status(404).json({
                    code: "404",
                    message: `failed, delete user with id ${id} not found`,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = "";
        let name = "";

        client
            .verifyIdToken({
                idToken: req.headers.google_access_token,
                audience: process.env.CLIENT_ID,
            })
            .then((profile) => {
                let payload = profile.getPayload();
                email = payload["email"];
                email = payload["displayName"];
                return User.findOne({ where: { email } });
            })
            .then((user) => {
                if (!user) {
                    const newUser = {
                        email: email,
                        name: name,
                        phone: "",
                        password: "12345678",
                        role: "customer",
                    };
                    return User.create(newUser);
                } else {
                    return user;
                }
            })
            .then((user) => {
                const access_token = generateAccessToken({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
                return res.status(200).json({
                    code: "200",
                    message: "OK",
                    data: { access_token: access_token },
                });
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }
}

module.exports = UserController;
