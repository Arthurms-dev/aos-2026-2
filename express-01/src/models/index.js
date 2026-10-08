import Sequelize from "sequelize";
import pg from "pg";

import getUserModel from "./user.js";
import getMessageModel from "./message.js"; 
import getAcademicExperienceModel from "./academicExperience.js";
import getProfessionalExperienceModel from "./professionalExperience.js";
import getProjectModel from "./project.js";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  AcademicExperience: getAcademicExperienceModel(sequelize, Sequelize),
  ProfessionalExperience: getProfessionalExperienceModel(sequelize, Sequelize),
  Project: getProjectModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;