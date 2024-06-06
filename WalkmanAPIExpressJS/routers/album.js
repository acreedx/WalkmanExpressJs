const express = require("express");
const router = express.Router();
const Album = require("../models/album.js");
const { ObjectId } = require("mongodb");
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
//listar
router.get("/", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const Albumes = await Album.aggregate([
      {
        $lookup: {
          from: "artistas",
          localField: "autorID",
          foreignField: "_id",
          as: "autor",
        },
      },
      {
        $lookup: {
          from: "cancions",
          localField: "cancionID",
          foreignField: "_id",
          as: "canciones",
        },
      },
    ]);
    res.status(200).json(Albumes);
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
    const Albumes = await Album.aggregate([
      {
        $match: { _id: new ObjectId(id.toString()) },
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
        $lookup: {
          from: "cancions",
          localField: "cancionID",
          foreignField: "_id",
          as: "canciones",
        },
      },
    ]);
    res.status(200).json(Albumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//crear
router.post("/", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
  try {
    const nuevoAlbum = new Album(req.body);
    const albumGuardado = await nuevoAlbum.save();
    res.json(albumGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//modificar
router.put("/:id", async (req, res) => {
  res.header("Access-Controll-Allow-Origin", "*");
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
router.options("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.send(200);
});
module.exports = router;
