const { ReadingList } = require("../models");

const removeBookFromReadingList = async (req, res) => {
  const { readingListId } = req.body;

  try {
    const readingListEntry = await ReadingList.findByPk(readingListId);

    if (!readingListEntry) {
      return res.status(404).json({ message: "Reading list entry not found" });
    }

    await readingListEntry.destroy();
    res.status(200).json({ message: "Book removed from reading list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { removeBookFromReadingList };
