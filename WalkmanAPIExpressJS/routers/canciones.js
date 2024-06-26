const express = require("express");
const router = express.Router();
const Cancion = require("../models/canciones.js");
const { ObjectId } = require("mongodb");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//GET
router.get("/", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const Canciones = await Cancion.find();
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/porgenero", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { genero } = req.body;
  if (!genero) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const Canciones = await Cancion.find({ genero: genero });
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/poridartista/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const Canciones = await Cancion.find({ autorID: new ObjectId(id) });
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/pornombreartista", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const Canciones = await Cancion.aggregate([
      {
        $lookup: {
          from: "artistas",
          localField: "autorID",
          foreignField: "_id",
          as: "autor",
        },
      },
      {
        $unwind: "$autor",
      },
      {
        $match: { "autor.nombre": nombre },
      },
    ]);
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/poridalbum/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const Canciones = await Cancion.aggregate([
      {
        $lookup: {
          from: "albums",
          localField: "albumID",
          foreignField: "_id",
          as: "album",
        },
      },
      {
        $unwind: "$album",
      },
      {
        $match: { "album._id": new ObjectId(id.toString()) },
      },
      {
        $unwind: "$autorID",
      },
      {
        $lookup: {
          from: "artistas",
          localField: "autorID",
          foreignField: "_id",
          as: "autor",
        },
      },
      {
        $group: {
          _id: "$album._id",
          album: { $first: "$album" },
          canciones: {
            $push: {
              _id: "$_id",
              autorID: "$autorID",
              autor: "$autor",
              albumID: "$albumID",
              titulo: "$titulo",
              duracion: "$duracion",
              genero: "$genero",
              fechaLanzamiento: "$fechaLanzamiento",
              URLPortada: "$URLPortada",
              URLArchivo: "$URLArchivo",
              estado: "$estado",
              numeroReproducciones: "$numeroReproducciones",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          album: 1,
          canciones: 1,
        },
      },
    ]);
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/poridcancion", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const Canciones = await Cancion.find({ _id: id });
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/pornombrecancion", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const Canciones = await Cancion.find({ titulo: nombre });
    res.status(200).json(Canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//POST
router.post("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const nuevaCancion = new Cancion(req.body);
    const cancionGuardada = await nuevaCancion.save();
    res.status(200).json(cancionGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT
router.put("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const cancionActualizada = await Cancion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!cancionActualizada) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }
    res.status(200).json(cancionActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//OPTIONS
router.options("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});
module.exports = router;
