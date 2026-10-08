const getAcademicExperienceModel = (sequelize, { DataTypes }) => {
  const AcademicExperience = sequelize.define("academic_experience", {
    instituicao: { type: DataTypes.STRING(150), allowNull: false },
    curso: { type: DataTypes.STRING(150), allowNull: false },
    data_inicio: { type: DataTypes.DATEONLY },
    data_fim: { type: DataTypes.DATEONLY },
  });

  AcademicExperience.associate = (models) => {
    AcademicExperience.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return AcademicExperience;
};

export default getAcademicExperienceModel;