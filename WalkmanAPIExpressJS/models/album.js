const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = new Schema({
  artistaID: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
  tituloAlbum: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLportada: { type: String, required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' }],
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
