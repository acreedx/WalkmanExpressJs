const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios.js");
const bcryptjs = require("bcryptjs");
const userSchema = require("../models/usuariosRequest.js");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
router.get("/login/:nombre", async (req, res) => {
  const { nombre } = req.params;
  const user = await Usuario.findOne({ nombre: nombre });
  const token = jwt.sign({ id: user._id, nombre: user.nombre }, "1234", {
    expiresIn: "1h",
  });
  res.json({ token, user });
});

module.exports = router;
