const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const userService = require("../services/userService");
const createError = require("../utils/createError");
const bcryptService = require("../services/bcryptService");
const tokenService = require("../services/tokenService");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    const isUserExist = await userService.checkEmailExist(
      value.email 
    );

    if (isUserExist) {
      createError("email already in use", 400);
    }

    value.password = await bcryptService.hash(value.password);

    const user = await userService.createUser(value);
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUserByEmail(value.email);
    if (!user) {
      createError("invalid credential", 400);
    }
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
        createError("invalid credential", 400);
    }
        const accessToken = tokenService.sign({id: user.id})
        res.status(200).json({accessToken})
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req,res,next) => {
  res.status(200).json({user:req.user})
}