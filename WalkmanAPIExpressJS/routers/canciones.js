const express = require("express");
const router = express.Router();
const Cancion = require("../models/canciones.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//listar
router.get("/", async (req, res) => {
  try {
    const Canciones = await Cancion.find();
    res.json(Canciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//crear
router.post("/canciones", async (req, res) => {
  try {
    const nuevaCancion = new Cancion(req.body);
    const cancionGuardada = await nuevaCancion.save();
    res.json(cancionGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//modificar
router.put("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cancionActualizada = await Cancion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!cancionActualizada) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }
    res.json(cancionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
