import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Questions from "../models/Questions.js";
import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }
   console.log(name);
   console.log(email);
   console.log(password);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      pass : hashedPassword
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let id;
  console.log(email)
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.pass);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    id  = existinguser._id.toString();
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(id)
  const question = await Questions.find({});
    //console.log(question.upVote.findIndex((id) => id === String(userId)));
    let value = question[0].upvote;
    console.log(value);
    
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
    console.log(error);
  }
};





























/*import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password} = req.body;

  
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }
  //console.log(pass)
  // const hashedPassword = await bcrypt.hash(password, 12);
  console.log(email);
    const newUser = await users.create({
      name,
      email,
      password
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
    console.log(error)
  }


};

export const login = async (req, res) => {
  const { email, password} = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
     return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    console.log(isPasswordCrt)
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
    console.log(error)
  }
};*/