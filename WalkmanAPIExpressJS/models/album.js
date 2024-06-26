const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = new Schema({
  autorID: [{ type: Schema.Types.ObjectId, ref: "Artista", required: true }],
  tituloAlbum: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLportada: { type: String, required: true },
  cancionID: [{ type: Schema.Types.ObjectId, ref: "Cancion", required: true }],
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
