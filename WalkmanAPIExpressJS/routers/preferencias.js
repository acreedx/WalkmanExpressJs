const express = require("express");
const router = express.Router();
const Preferencia = require("../models/preferencias.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const Preferencias = await Preferencia.find();
    res.json(Preferencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.options("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

module.exports = router;
