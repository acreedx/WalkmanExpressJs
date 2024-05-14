const mongoose = require("mongoose");
const { Schema } = mongoose;
const listaReproduccionSchema = new Schema({
  nombreLista: { type: String, required: true },
  userID: { type: String, ref: "Usuario", required: true },
  publica: { type: Boolean, default: false },
  canciones: [{ type: Schema.Types.ObjectId, ref: "Cancion" }],
});
const ListaReproduccion = mongoose.model(
  "ListaReproduccion",
  listaReproduccionSchema
);

module.exports = ListaReproduccion;
