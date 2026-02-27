const app = require("./app");
const connectMongo = require("./config/mongo");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();