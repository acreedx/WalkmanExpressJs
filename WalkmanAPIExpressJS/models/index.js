const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistaSchema = new Schema({
  nombreArtista: { type: String, required: true },
  URLFoto: { type: String, required: true },
  biografia: { type: String, required: true }
});
const albumSchema = new Schema({
  tituloAlbum: { type: String, required: true },
  artistaID: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
  fechaLanzamiento: { type: Date, required: true },
  portada: { type: String, required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' }],
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

const usuariosSchema = new Schema({
  descripcion: { type: String, required: true },
  URLFoto: { type: String, required: true },
  artistas: [{ type: Schema.Types.ObjectId, ref: 'Artista' }],
  usuarios: [{ type: Schema.Types.ObjectId, ref: 'Artista' }]
});

const preferenciasSchema = new Schema({
  userID: { type: Number, ref: 'Usuario', required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' , megusta: { type: Boolean }}],
  generos: [{ type: Schema.Types.ObjectId, ref: 'Generos' , numeroreproduccionesgenero: { type: Number }}],
})

const cancionSchema = new Schema({
  titulo: { type: String, required: true },
  artistaID: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
  albumID: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  duracion: { type: String, required: true },
  genero: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLPortada: { type: String, required: true },
  URLArchivo: { type: String, required: true },
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

const listaReproduccionSchema = new Schema({
  nombreLista: { type: String, required: true },
  userID: { type: Number, ref: 'Usuario', required: true },
  nombreUsuario: { type: String, ref: 'Usuario', required: true },
  publica: { type: Boolean, default: false },
  fechaCreacion: { type: Date, required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' }],
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

const Artista = mongoose.model('Artista', artistaSchema);
const Usuarios = mongoose.model('Seguidores', usuariosSchema);
const Preferencias = mongoose.model('Seguidores', preferenciasSchema);
const Album = mongoose.model('Album', albumSchema);
const Cancion = mongoose.model('Cancion', cancionSchema);
const ListaReproduccion = mongoose.model('ListaReproduccion', listaReproduccionSchema);
  
module.exports = Artista;
module.exports = Usuarios;
module.exports = Preferencias;
module.exports = Album;
module.exports = Cancion;
module.exports = ListaReproduccion;