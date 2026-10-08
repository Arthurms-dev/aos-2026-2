const getProjectModel = (sequelize, { DataTypes }) => {
  const Project = sequelize.define("project", {
    nome_projeto: { type: DataTypes.STRING(150), allowNull: false },
    descricao: { type: DataTypes.TEXT },
    tecnologias: { type: DataTypes.STRING(255) },
    link_repositorio: { type: DataTypes.STRING(255) },
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Project;
};

export default getProjectModel;