import jwt from "jsonwebtoken";
import models from "../models/index.js";
import AppError from "../utils/appError.js";

const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await models.User.findByLogin(login);

    if (!user || !(await user.validatePassword(password))) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getSession = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
      data: {
        user: req.context.me,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  login,
  getSession,
};