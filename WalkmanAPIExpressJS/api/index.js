const express = require("express");
const connectDB = require("../db");
const albumRouter = require("../routers/album");
const artistasRouter = require("../routers/artistas");
const cancionesRouter = require("../routers/canciones");
const listareproduccionRouter = require("../routers/listareproduccion");
const app = express();
app.use(express.json());
connectDB();

const port = 3000;
app.use("/album", albumRouter);
app.use("/artistas", artistasRouter);
app.use("/canciones", cancionesRouter);
app.use("/listareproduccion", listareproduccionRouter);
app.get("/sembrarDatos", (req, res) => {
  crearDatosIniciales();
  res.send("Datos sembrados correctamente!");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const crearDatosIniciales = async () => {
  const badBunny = await Artista.create({
    nombreArtista: "Bad Bunny",
    biografia:
      "Benito Antonio Martínez Ocasio, conocido por su nombre artístico Bad Bunny, es un cantante puertorriqueño de reggaeton y trap latino.",
  });

  const unVeranoSinTi = await Album.create({
    tituloAlbum: "Un Verano Sin Ti",
    artistaID: badBunny._id,
    fechaLanzamiento: "2022-05-06",
    portada: "URLDeLaPortadaDelAlbum"
  });

  const moscowMule = await Cancion.create({
    titulo: "Moscow Mule",
    artistaID: badBunny._id,
    albumID: unVeranoSinTi._id,
    duracion: "4:06",
    fechaLanzamiento: "2022-05-06",
    URLArchivo: "URLDeLaCancionMoscowMule"
  });
  const favoritosVerano = await ListaReproduccion.create({
    nombreLista: "Favoritos de Verano",
    userID: "1234Abcd",
    publica: true,
    canciones: [moscowMule._id]
  });

  console.log("Datos iniciales creados correctamente");
};
module.exports = app;
