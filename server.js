const http = require("http");
const app = require("./app");
const { PORT } = require("./config");
const connectToDB = require("./db/db");

const server = http.createServer(app);

const startServer = async () => {
  await connectToDB();
  server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
