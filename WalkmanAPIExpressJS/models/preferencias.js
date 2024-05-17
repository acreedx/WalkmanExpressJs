const mongoose = require("mongoose");
const { Schema } = mongoose;

const preferenciasSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' , megusta: { type: Boolean }}],
    generos: [{ type: String, ref: 'Generos' , numeroreproduccionesgenero: { type: Number }}],
    artistas: [{ type: String, ref: 'Artistas' , numeroreproduccionesartista: { type: Number }}],
    usuarios: [{ type: String, ref: 'Usuarios' , numeroreproduccionesusuario: { type: Number }}],
});

const Preferencias = mongoose.model("Preferencias", preferenciasSchema);

module.exports = Preferencias;
