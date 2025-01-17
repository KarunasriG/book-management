const { Book, User, ReadingList } = require("../models/index.js");

const searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    const books = await Book.findAll({
      where: { title, author },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({ books: books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersByReadingList = async (req, res) => {
  try {
    const userId = req.params.userId;

    let user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: "User doesn't exists!" });
    }

    let readingListData = await ReadingList.findAll({
      where: { userId },
      attributes: { exclude: ["createdAt", "updatedAt", "bookId"] },
      include: [
        {
          model: Book,
          attributes: {
            include: ["title", "author", "genre"],
            exclude: ["id", "createdAt", "updatedAt", "publicationYear"],
          },
        },
      ],
    });

    const readingList = readingListData.map((list) => {
      return {
        ...list.dataValues,
        books: list.book,
      };
    });

    if (readingList.length === 0) {
      return res
        .status(400)
        .json({ message: "No books found in reading list" });
    }
    res.status(200).json({ readingList: readingList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchBooks, getUsersByReadingList };
