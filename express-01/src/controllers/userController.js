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

const getUserCurriculum = async (req, res) => {
  try {
    const curriculum = await userService.getUserCurriculumById(req.params.userId);
    if (!curriculum) {
      return res.status(404).send({ error: "Currículo não encontrado para este usuário." });
    }
    return res.status(200).send(curriculum);
  } catch (error) {
    console.error("ERRO NO CURRÍCULO:", error);
    return res.status(500).send({ error: "Erro interno ao buscar o currículo." });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Dados para criação são obrigatórios." });
    }

    const newUser = await userService.createUser(req.body);
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao criar usuário." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId || !req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "ID e dados para atualização são obrigatórios." });
    }

    const updatedUser = await userService.updateUser(userId, req.body);
    
    if (!updatedUser) {
      return res.status(404).send({ error: "Usuário não encontrado para atualização." });
    }

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao atualizar usuário." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ error: "ID do usuário é obrigatório para exclusão." });
    }

    const deleted = await userService.deleteUser(userId);
    
    if (!deleted) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao deletar usuário." });
  }
};

export default {
  getUsers,
  getUser,
  getUserCurriculum,
  createUser,
  updateUser,
  deleteUser,
};