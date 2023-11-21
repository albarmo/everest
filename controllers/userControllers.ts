class UserController {
  static async list(req, res, next) {
    return res.status(200).json({ code: '200', message: 'OK', data: [] });
  }

}

export default UserController;
