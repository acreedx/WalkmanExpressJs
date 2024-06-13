const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();
const Usuario = require("../models/usuarios.js");
const bcryptjs = require("bcryptjs");
const userSchema = require("../models/usuariosRequest.js");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const timeLog = (req, res, next) => {
  next();
};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado" });
  }

  jwt.verify(token, "1234", (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token de autenticación inválido" });
    }

    req.user = user;
    next();
  });
};
router.use(timeLog);
//GET
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const Usuarios = await Usuario.find();
    res.status(200).json(Usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const usuario = await Usuario.findOne({ _id: new ObjectId(id) });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//PUT
router.put("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const { idSql, nombre, ...updateData } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
