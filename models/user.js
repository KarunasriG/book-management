// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true, // Ensure unique username
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true, // Ensure unique email
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // Associations
  User.associate = (models) => {
    User.hasMany(models.ReadingList, { foreignKey: "userId" });
  };

  return User;
};
