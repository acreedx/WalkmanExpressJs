const express = require('express');
const router = express.Router();x
const ListaReproduccion = require('../models/index.js');
const timeLog = (req, res, next) => {
  next()
}
router.use(timeLog)
//listar
router.get('/', async (req, res) => {
    try {
      const ListaReproducciones = await ListaReproduccion.find();
      res.json(ListaReproducciones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//crear
router.post('/listas-reproduccion', async (req, res) => {
    try {
      const nuevaListaReproduccion = new ListaReproduccion(req.body);
      const listaReproduccionGuardada = await nuevaListaReproduccion.save();
      res.json(listaReproduccionGuardada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
//modificar
router.put('/listas-reproduccion/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const listaReproduccionActualizada = await ListaReproduccion.findByIdAndUpdate(id, req.body, { new: true });
      if (!listaReproduccionActualizada) {
        return res.status(404).json({ error: 'Lista de reproducción no encontrada' });
      }
      res.json(listaReproduccionActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });