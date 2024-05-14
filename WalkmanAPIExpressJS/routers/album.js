const express = require("express");
const router = express.Router();
const Album = require("../models/album.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//listar
router.get("/", async (req, res) => {
  try {
    const Albumes = await Album.find();
    res.json(Albumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//crear
router.post("/albums", async (req, res) => {
  try {
    const nuevoAlbum = new Album(req.body);
    const albumGuardado = await nuevoAlbum.save();
    res.json(albumGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//modificar
router.put("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const albumActualizado = await Album.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!albumActualizado) {
      return res.status(404).json({ error: "Álbum no encontrado" });
    }
    res.json(albumActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
