
const { User } = require("../models");

exports.getUserByEmail = (email) => {
  return User.findOne({
    where: {
      email :email
    },
  });
};

exports.createUser = user => User.create(user)

exports.getUserById = id => User.findByPk(id)