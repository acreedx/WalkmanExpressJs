const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = new Schema({
  tituloAlbum: { type: String, required: true },
  artistaID: { type: Schema.Types.ObjectId, ref: "Artista", required: true },
  fechaLanzamiento: { type: Date, required: true },
  portada: { type: String, required: true },
});
const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
