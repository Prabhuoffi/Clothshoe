const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, isAdmin });
    await newUser.save();

    const token = generateAuthToken(newUser);

    res.status(201).json({ token, id: newUser.id, isAdmin: newUser.isAdmin });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User with that email not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    const token = generateAuthToken(user);
    res.status(200).json({ token, userId: user.id, isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

function generateAuthToken(user) {
  const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    secretKey,
    { expiresIn: '1h' } // Optional: Token expiry time
  );
}
