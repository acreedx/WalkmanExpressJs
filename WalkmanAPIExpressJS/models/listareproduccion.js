const mongoose = require("mongoose");
const { Schema } = mongoose;

const listaReproduccionSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nombreLista: { type: String, required: true },
  nombreUsuario: { type: String, ref: 'Usuario', required: true },
  publica: { type: Boolean, default: false },
  fechaCreacion: { type: Date, required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' }],
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

const ListaReproduccion = mongoose.model(
  "ListaReproduccion",
  listaReproduccionSchema
);

module.exports = ListaReproduccion;
