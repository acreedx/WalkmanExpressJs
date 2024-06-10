const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuariosSchema = new Schema({
  idSql: { type: Number, required: true },
  nombre: { type: String, required: true },
  URLFoto: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: Boolean, default: false },
  artistasSeguidos: [{ type: Schema.Types.ObjectId, ref: "Artista" }],
  usuariosSeguidos: [{ type: Schema.Types.ObjectId, ref: "Usuarios" }],
});
const Usuario = mongoose.model("Usuario", usuariosSchema);

module.exports = Usuario;
