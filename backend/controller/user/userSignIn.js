const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

    if (!email) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");

    const userExists = await userModel.findOne({ email });

    if (!userExists) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);
    console.log("checkPassword", checkPassword);
    if (checkPassword) {
      const tokenData = {
        _id: userExists.id,
        email: userExists.email,
      };

      const jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "72h",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("jwtToken", jwtToken, tokenOption).status(200).json({
        message: "Login successful",
        data: jwtToken,
        success: true,
        error: false,
      });
    } else {
      throw new Error("please check password!");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};
module.exports = userSignin;
