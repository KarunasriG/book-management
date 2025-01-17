// models/book.js
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
      },
      publicationYear: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );

  // Associations
  Book.associate = (models) => {
    Book.hasMany(models.ReadingList, { foreignKey: "bookId" });
  };

  return Book;
};
