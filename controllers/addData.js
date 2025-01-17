const { User: User, Book } = require("../models/index.js");

const { validateUser } = require("../validations/index");
const addUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    let errors = await validateUser(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(", ") });
    }

    const user = await User.create({ username, email });
    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear } = req.body;

    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Book title and author are required" });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      publicationYear,
    });
    res.status(201).json({ message: "Book added successfully", book: book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToReadingList = async (req, res) => {
  try {
    const { userId, bookId, status } = req.body;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "User ID and Book ID are required" });
    }

    let user = await User.findByPk(userId);
    let book = await Book.findByPk(bookId);
    if (!user || !book) {
      return res.status(404).json({ message: "Invalid user or book ID" });
    }

    const readingList = await user.createReadingList({
      bookId,
      status,
    });
    res.status(201).json({
      message: "Book added to reading list",
      readingList: {
        id: readingList.id,
        userId: readingList.userId,
        bookId: readingList.bookId,
        status: readingList.status,
        ...readingList.dataValues,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { addUser, addBook, addToReadingList };
