const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // save user database
  const { username, email, password } = req.body;
  // validate request
  if (!username || !email || !password) {
    res.status(400).send({ message: "Los campos son obligatorios" });
    return;
  }
  // hash password
  const passwordHash = bcrypt.hashSync(password, 8);
  User.create({
    username,
    email,
    password: passwordHash,
  })
    .then((user) => {
      res.status(200).send({ message: "user was resigtered", user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Los campos son obligatorios" });
    return;
  }
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Email o Contraseña incorrectos" });
      }
      let passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Email o Contraseña incorrectos",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 1 hour in seconds
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        message: "Usuario Autenticado",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
// exports.me = (req,res)=>{
//   if(req.headers &&req.headers.x-access-token)
// }
exports.me = function (req, res) {
  if (req.headers && req.headers["x-access-token"]) {
    const authorization = req.headers["x-access-token"];
    const { id } = jwt.verify(authorization, config.secret);
    User.findOne({
      where: { id },
      attributes: ["id", "username", "email"],
    })
      .then((user) => {
        return res.status(200).send({ user, message: "Usuario autenticado" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
  // res.status(500).send({ message: err.message });
};
