const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.register = async (req, res, next) => {
  try {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) {
    throw new Error("must have email & password");
  }
  
  if (password.length < 4 || password.length > 10) {
    throw new Error("Password must be 4-10 characters");
  }
  
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashed,
  });
  
  const payload = {
    id: user.id,
    name: user.firstName,
  };
  
  const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '100d' });
  res.json({ token: token });
} catch (err) {
  next(err);
  }
  };
  

  exports.login = async (req, res, next) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    
    if (!user) {
      throw new Error("Cannot Login 1");
    }
    
    const pwOk = await bcrypt.compare(password, user.password);
    
    if (!pwOk) {
      throw new Error("Cannot Login 2");
    }
    
    const payload = {
      id: user.id,
      name: user.firstName,
    };
    
    const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '100d' });
    res.json({ token: token });
  } catch (err) {
    next(err);
    }
    };    

exports.getMe = (req, res, next) => {
  const {id, firstName,role } = req.user
  res.json({id, firstName,role })
}

