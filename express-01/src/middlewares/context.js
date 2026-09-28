import { userService } from "../services/index.js";

const contextMiddleware = async (req, res, next) => {
  try {
    const userMe = await userService.getUserByLogin("rwieruch");

    if (!userMe) {
      return res.status(401).send({ error: "Não autorizado. Usuário de contexto não encontrado." });
    }

    req.context = {
      me: userMe,
    };

    next();
    
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao configurar o contexto da requisição." });
  }
};

export default contextMiddleware;