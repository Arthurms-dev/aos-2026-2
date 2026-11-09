import jwt from "jsonwebtoken";
import models from "../models/index.js";
import AppError from "../utils/appError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError("Token de autenticação não fornecido.", 401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await models.User.findByPk(decoded.id);

    if (!user) {
      throw new AppError("Usuário associado ao token não encontrado.", 401);
    }

    if (!req.context) req.context = {};
    req.context.me = user;

    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError("Token inválido ou expirado.", 401));
    }
    return next(error);
  }
};

export default authMiddleware;