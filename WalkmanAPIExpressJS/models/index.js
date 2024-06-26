const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistaSchema = new Schema({
  nombre: { type: String, required: true },
  URLFoto: { type: String, required: true },
  biografia: { type: String, required: true }
});

const usuariosSchema = new Schema({
  idSql: { type: Number, required: true},
  nombre: { type: String, required: true },
  URLFoto: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: Boolean, default: false },
  artistasSeguidos: [{ type: Schema.Types.ObjectId, ref: 'Artista' }],
  usuariosSeguidos: [{ type: Schema.Types.ObjectId, ref: 'Usuarios' }]
});

const preferenciasSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' , megusta: { type: Boolean }}],
  generos: [{ type: String, ref: 'Generos' , numeroreproduccionesgenero: { type: Number }}],
  artistas: [{ type: String, ref: 'Artistas' , numeroreproduccionesartista: { type: Number }}],
  usuarios: [{ type: String, ref: 'Usuarios' , numeroreproduccionesusuario: { type: Number }}],
})

const albumSchema = new Schema({
  artistaID: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
  tituloAlbum: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLportada: { type: String, required: true },
  canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' }],
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

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

const cancionSchema = new Schema({
  autorID: { type: Schema.Types.ObjectId, ref: 'Artista', ref: 'Usuario', required: true },
  albumID: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  titulo: { type: String, required: true },
  duracion: { type: String, required: true },
  genero: { type: String, required: true },
  fechaLanzamiento: { type: Date, required: true },
  URLPortada: { type: String, required: true },
  URLArchivo: { type: String, required: true },
  estado: { type: Boolean, default: false },
  numeroReproducciones: { type: Number, required: true }
});

const Artista = mongoose.model('Artista', artistaSchema);
const Usuarios = mongoose.model('Seguidores', usuariosSchema);
const Preferencias = mongoose.model('Seguidores', preferenciasSchema);
const Album = mongoose.model('Album', albumSchema);
const ListaReproduccion = mongoose.model('ListaReproduccion', listaReproduccionSchema);
const Cancion = mongoose.model('Cancion', cancionSchema);
  
module.exports = Artista;
module.exports = Usuarios;
module.exports = Preferencias;
module.exports = Album;
module.exports = Cancion;
module.exports = ListaReproduccion;