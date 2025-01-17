const { User } = require("../models/index");
async function validateUser(user) {
  let errors = [];

  const { username, email } = user;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || username === "" || typeof username !== "string") {
    errors.push("Username is required and must be a string.");
  }
  ``;
  if (!email || email === "") {
    errors.push("Email is required");
  }
  if (!emailPattern.test(email)) {
    errors.push("Invalid email format.");
  }
  if (await User.findOne({ where: { email: email } })) {
    errors.push("Email already exists.");
  }
  return errors;
}

module.exports = { validateUser };
