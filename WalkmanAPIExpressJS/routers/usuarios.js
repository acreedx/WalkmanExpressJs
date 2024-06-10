const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();
const Usuario = require("../models/usuarios.js");
const bcryptjs = require("bcryptjs");
const userSchema = require("../models/usuariosRequest.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//GET
router.get("/", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const Usuarios = await Usuario.find();
    res.status(200).json(Usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const usuario = await Usuario.findOne({ _id: id });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//POST
router.post("/", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  const { idSql, nombre } = req.body;
  if (!idSql || !nombre) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const usuario = await Usuario.find({ idSql: idSql, nombre: nombre });
    if (usuario.nombre) {
      return res
        .status(409)
        .json({ message: "Ya existe un usuario con esos datos" });
    }
    const nuevoUsuario = new Usuario(req.body);
    const usuarioCreado = await nuevoUsuario.save();
    res.status(200).json(usuarioCreado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//PUT
router.put("/:id", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
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
//OPTIONS
router.options("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.send(200);
});

module.exports = router;
