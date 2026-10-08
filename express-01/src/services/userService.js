import models from "../models/index.js";
import AppError from "../utils/appError.js";

const getAllUsers = async () => {
  return await models.User.findAll();
};

const getUserById = async (id) => {
  const user = await models.User.findByPk(id);
  if (!user) {
    throw new AppError("Usuário não encontrado.", 404);
  }
  return user;
};

const getUserByLogin = async (login) => {
  return await models.User.findOne({ where: { username: login } }); 
};

const getUserCurriculumById = async (id) => {
  return await models.User.findByPk(id, {
    include: [
      { model: models.AcademicExperience },
      { model: models.ProfessionalExperience },
      { model: models.Project }
    ]
  });
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
  getUserCurriculumById,
  createUser,
  updateUser,
  deleteUser,
};