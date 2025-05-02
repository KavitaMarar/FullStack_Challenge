const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");


exports.signup = async (req, res) => {
  const { name, email, address, password, role } = req.body;
  if (!name || !email || !address || !password) return res.status(400).json({ message: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, email: email.toLowerCase(), address, password: hashedPassword, role });

    res.status(201).json({ message: "User registered", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email.toLowerCase() } });


  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
  
};
