import http from "http";

import app from "./app";
import config from "./app/config";
import connectToDB from "./app/db/db";

const server = http.createServer(app);

const startServer = async () => {
  await connectToDB();
  server.listen(config.PORT, async () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};

startServer();
