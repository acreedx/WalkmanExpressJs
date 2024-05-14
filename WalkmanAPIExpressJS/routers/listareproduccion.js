const express = require("express");
const router = express.Router();
const ListaReproduccion = require("../models/listareproduccion.js");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//listar
router.get("/", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const ListaReproducciones = await ListaReproduccion.find();
    res.json(ListaReproducciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//crear
router.post("/listas-reproduccion", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const nuevaListaReproduccion = new ListaReproduccion(req.body);
    const listaReproduccionGuardada = await nuevaListaReproduccion.save();
    res.json(listaReproduccionGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//modificar
router.put("/listas-reproduccion/:id", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const listaReproduccionActualizada =
      await ListaReproduccion.findByIdAndUpdate(id, req.body, { new: true });
    if (!listaReproduccionActualizada) {
      return res
        .status(404)
        .json({ error: "Lista de reproducción no encontrada" });
    }
    res.json(listaReproduccionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.options("/listas-reproduccion/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.send(200);
});
module.exports = router;
