const User = require("../models/user");
console.log(User);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "1234567";
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User already exists, you can login",
          success: false,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Sign up successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      const errormsg = "Credentials do not match";
  
      if (!existingUser) {
        return res.status(403).json({ message: errormsg, success: false });
      }
  
      const isPassEqual = await bcrypt.compare(password, existingUser.password);
      if (!isPassEqual) {
        return res.status(403).json({ message: errormsg, success: false });
      }
  
      const jwt_token = jwt.sign(
        {
          name:existingUser.name,
          email: existingUser.email,
          _id: existingUser._id,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
  
      res.status(200).json({
        message: 'Login successfully',
        success: true,
        token: jwt_token,
        email,
        name:existingUser.name
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
    }
  };

  module.exports = {signup, login};