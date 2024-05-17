const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistaSchema = new Schema({
  nombre: { type: String, required: true },
  URLFoto: { type: String, required: true },
  biografia: { type: String, required: true }
});

const Artista = mongoose.model("Artista", artistaSchema);
module.exports = Artista;
