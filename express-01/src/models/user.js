const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true, 
    },
    telefone: {
      type: DataTypes.STRING(20),
    },
    resumo_sobre: {
      type: DataTypes.TEXT,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });

    User.hasMany(models.AcademicExperience, { foreignKey: "user_id", onDelete: "CASCADE" });
    User.hasMany(models.ProfessionalExperience, { foreignKey: "user_id", onDelete: "CASCADE" });
    User.hasMany(models.Project, { foreignKey: "user_id", onDelete: "CASCADE" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};

export default getUserModel;