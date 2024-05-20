const mongoose = require("mongoose");
const { Schema } = mongoose;

const cancionSchema = new Schema({
  autorID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artista",
      ref: "Usuario",
      required: true,
    },
  ],
  albumID: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  titulo: { type: String, required: true },
  duracion: { type: String, required: true },
  genero: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLPortada: { type: String, required: true },
  URLArchivo: { type: String, required: true },
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true },
});

const Cancion = mongoose.model("Cancion", cancionSchema);

module.exports = Cancion;
