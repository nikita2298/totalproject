const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.DataType.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 4),
    role: req.body.role ? req.body.role : false,
  })

    .then(
      res.status(200).send({
        message: "Your are Successfully Login!!!",
      })
    )

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        message: "Your are Successfully Login!!!",
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        accessToken: token,
        role: user.role,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
