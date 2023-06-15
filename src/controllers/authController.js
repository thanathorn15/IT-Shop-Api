const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.register = (req, res, next) => {
  const { firstName,lastName,email, password } = req.body;
  
  if (!email || !password) throw new Error("must have email & password");

  if (password.length < 4 || password.length > 10)
    throw new Error("Password must be 4-10 characters");

  bcrypt
    .hash(password, 10)
    .then((hashed) => {
      return User.create({
        firstName:firstName,
        lastName:lastName,
        email: email,
        password: hashed,
      });
    })
    .then((rs) => {
      const user = JSON.parse(JSON.stringify(rs))
      console.log(user)
      const payload = {
        id: user.id,
    name: user.firstName
    }

      const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {expiresIn: '60d'})
        res.json({token : token})
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email: email },
  }).then((user) => {
      if (!user) 
        throw new Error("Cannot Login 1");
      return Promise.all([ bcrypt.compare(password, user.password), Promise.resolve(user)]) 
    }).then( ([pwOk, user]) => {
        if(!pwOk)
          throw new Error("Cannot Login 2")
        const payload = {
            id: user.id,
            name: user.firstName
        }
        const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {expiresIn: '60d'})
        res.json({token : token})
    }).catch(next)
};

exports.getMe = (req, res, next) => {
  const {id, firstName,role } = req.user
  res.json({id, firstName,role })
}

