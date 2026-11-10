import argon2 from 'argon2';

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 42]
      },
    }
  }, {
    
    hooks: {
      beforeCreate: async (user) => {
        if(user.password) {
          user.password = await argon2.hash(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await argon2.hash(user.password)
        }
      },
    }
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

  User.prototype.validatePassword = async function (password) {
    return await argon2.verify(this.password, password);
  }

  return User;
};

export default getUserModel;