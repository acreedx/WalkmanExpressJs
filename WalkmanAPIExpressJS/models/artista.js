const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistaSchema = new Schema({
  nombreArtista: { type: String, required: true },
  biografia: { type: String, required: true },
});

const Artista = mongoose.model("Artista", artistaSchema);
module.exports = Artista;
