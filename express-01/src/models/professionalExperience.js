const getProfessionalExperienceModel = (sequelize, { DataTypes }) => {
  const ProfessionalExperience = sequelize.define("professional_experience", {
    empresa: { type: DataTypes.STRING(150), allowNull: false },
    cargo: { type: DataTypes.STRING(100), allowNull: false },
    descricao_atividades: { type: DataTypes.TEXT },
    data_inicio: { type: DataTypes.DATEONLY },
    data_fim: { type: DataTypes.DATEONLY },
  });

  ProfessionalExperience.associate = (models) => {
    ProfessionalExperience.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return ProfessionalExperience;
};

export default getProfessionalExperienceModel;