const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userSignup = async (req, res) => {
  try {
    const { email, password, username, phone } = req.body;

    if (!email) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");
    if (!username) throw new Error("Please provide name");
    if (!phone) throw new Error("Please provide phone number");

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword)
      throw new Error("Something went wrong while hashing password");

    const userExists = await userModel.findOne({ email });
    if (userExists) throw new Error("User with this email already exists");

    const payload = {
      ...req.body,
      password: hashedPassword,
      role: "GENERAL",
    };

    const userData = new userModel(payload);

    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

module.exports = userSignup;
