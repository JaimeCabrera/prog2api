const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: "Error, el email esta en uso",
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
};
module.exports = verifySignUp;
