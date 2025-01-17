// models/readingList.js
module.exports = (sequelize, DataTypes) => {
  const ReadingList = sequelize.define(
    "ReadingList",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "User", key: "id" },
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        references: { model: "Book", key: "id" },
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Want to Read", "Reading", "Finished"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // Associations
  ReadingList.associate = (models) => {
    ReadingList.belongsTo(models.User, { foreignKey: "userId" });
    ReadingList.belongsTo(models.Book, { foreignKey: "bookId" });
  };

  return ReadingList;
};
