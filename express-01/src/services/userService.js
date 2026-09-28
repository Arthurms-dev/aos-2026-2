import models from "../models/index.js";

const getAllUsers = async () => {
  return await models.User.findAll();
};

const getUserById = async (id) => {
  return await models.User.findByPk(id);
};

const getUserByLogin = async (login) => {
  return await models.User.findOne({ where: { username: login } }); 
};

const createUser = async (data) => {
  return await models.User.create(data);
};

const updateUser = async (id, data) => {
  const user = await models.User.findByPk(id);
  if (!user) return null; 
  
  return await user.update(data);
};

const deleteUser = async (id) => {
  return await models.User.destroy({
    where: { id },
  });
};

export default {
  getAllUsers,
  getUserById,
  getUserByLogin,
  createUser,
  updateUser,
  deleteUser,
};