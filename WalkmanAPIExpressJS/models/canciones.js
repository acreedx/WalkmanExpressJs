const mongoose = require("mongoose");
const { Schema } = mongoose;

const cancionSchema = new Schema({
  titulo: { type: String, required: true },
  artistaID: { type: Schema.Types.ObjectId, ref: "Artista", required: true },
  albumID: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  duracion: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLArchivo: { type: String, required: true },
});

const Cancion = mongoose.model("Cancion", cancionSchema);

module.exports = Cancion;
