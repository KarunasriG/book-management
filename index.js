const express = require("express");
require("dotenv").config();
const db = require("./models");

const { addUser, addBook, addToReadingList } = require("./controllers/addData");
const { searchBooks, getUsersByReadingList } = require("./controllers/getData");
const { updateBook } = require("./controllers/updateData");
const { removeBookFromReadingList } = require("./controllers/removeData");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/api/books/search", searchBooks);
app.get("/api/reading-list/:userId", getUsersByReadingList);

app.post("/api/users", addUser);
app.post("/api/books", addBook);
app.post("/api/reading-list", addToReadingList);
app.post("/api/books/:bookId", updateBook);
app.post("/api/reading-list/:readingListId", removeBookFromReadingList);

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = app;
