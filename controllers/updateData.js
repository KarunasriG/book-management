const { Book } = require("../models/index");

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const { title, genre } = req.body;

    let book = await Book.findByPk(bookId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.genre = genre;
    await book.save();
    res
      .status(200)
      .json({ message: "Book details updated successfully", book: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateBook };
