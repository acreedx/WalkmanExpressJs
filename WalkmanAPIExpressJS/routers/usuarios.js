const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);

router.get("/", async (req, res) => {
    res.header("Access-Controll-Allow-Origin", "*");
    try 
    {
      const Usuarios = await Usuario.find();
      res.json(Usuarios);
    } 
    catch (error) 
    {
      res.status(500).json({ message: error.message });
    }
});

router.options("/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.send(200);
  });

module.exports = router;