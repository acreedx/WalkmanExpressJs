const express = require("express");
const router = express.Router();
const Artista = require("../models/artista.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//listar
router.get("/", async (req, res) => {
  try {
    const artistas = await Artista.find();
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//crear
router.post("/artistas", async (req, res) => {
  try {
    const nuevoArtista = new Artista(req.body);
    const artistaGuardado = await nuevoArtista.save();
    res.json(artistaGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//modificar
router.put("/artistas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artistaActualizado = await Artista.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!artistaActualizado) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }
    res.json(artistaActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
