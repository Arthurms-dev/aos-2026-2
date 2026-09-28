import { userService } from "../services/index.js";

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao buscar usuários." });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    
    if (!user) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }
    
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao buscar o usuário." });
  }
};

const createUser = (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Dados para criação são obrigatórios." });
    }

    return res.status(201).send("POST HTTP method on user resource");
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao criar usuário." });
  }
};

const updateUser = (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).send({ error: "ID do usuário é obrigatório." });
    }

    return res.status(200).send(`PUT HTTP method on user/${userId} resource`);
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao atualizar usuário." });
  }
};

const deleteUser = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ error: "ID do usuário é obrigatório para exclusão." });
    }

    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao deletar usuário." });
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};