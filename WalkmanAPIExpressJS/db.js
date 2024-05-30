const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI.toString();
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Salir de la aplicación si la conexión falla
  }
}
run().catch(console.dir);
