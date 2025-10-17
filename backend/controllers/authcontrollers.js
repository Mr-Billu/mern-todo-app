import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment");
  }
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const existingByUsername = await User.findOne({ username });
    if (existingByUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const newUser = new User({ email, password, username });
    await newUser.save();

    const token = signToken(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, email: newUser.email, username: newUser.username },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
      
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = signToken(user);

    return res.status(200).json({
        message: "Login successful",
        token,
         user: { id: user._id, email: user.email, username: user.username },

    });
  } catch (err) {

    return res.status(500).json({ message: err.message || "Server error" });
  }
};
