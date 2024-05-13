const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistaSchema = new Schema({
    nombreArtista: { type: String, required: true },
    biografia: { type: String, required: true }
  });
  
  const albumSchema = new Schema({
    tituloAlbum: { type: String, required: true },
    artistaID: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
    fechaLanzamiento: { type: Date, required: true },
    portada: { type: String, required: true }
  });
  
  const cancionSchema = new Schema({
    titulo: { type: String, required: true },
    artistaID: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
    albumID: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
    duracion: { type: String, required: true },
    fechaLanzamiento: { type: Date, required: true },
    URLArchivo: { type: String, required: true }
  });
  
  const listaReproduccionSchema = new Schema({
    nombreLista: { type: String, required: true },
    userID: { type: String, ref: 'Usuario', required: true },
    publica: { type: Boolean, default: false },
    canciones: [{ type: Schema.Types.ObjectId, ref: 'Cancion' }]
  });
  
  const Artista = mongoose.model('Artista', artistaSchema);
  const Album = mongoose.model('Album', albumSchema);
  const Cancion = mongoose.model('Cancion', cancionSchema);
  const ListaReproduccion = mongoose.model('ListaReproduccion', listaReproduccionSchema);
  
module.exports = Artista;
module.exports = Album;
module.exports = Cancion;
module.exports = ListaReproduccion;