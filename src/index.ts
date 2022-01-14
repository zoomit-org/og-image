import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";

const app = express();
dotenv.config();

import { port } from "./constants/config";
import ogImageRouter from "./routes/og-image";

app.use(ogImageRouter);

(async () => {
  try {
    const client = createClient({
      url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();

    app.listen(port, () => {
      console.log(`🚀 server goes brrrrr at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
