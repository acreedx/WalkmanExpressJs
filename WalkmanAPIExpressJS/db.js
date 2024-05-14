const mongoose = require("mongoose");
require("dotenv").config();
const key = process.env.MONGO_URI.toString();
const connectDB = async () => {
  try {
    await mongoose.connect(key, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Salir de la aplicación si la conexión falla
  }
};

module.exports = connectDB;
