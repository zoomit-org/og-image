import dotenv from "dotenv";
import express from "express";
import path from "path";

const app = express();
dotenv.config();

import { client } from "./app";
import { port } from "./constants/config";
import ogImageRouter from "./routes/og-image";

app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use(ogImageRouter);

(async () => {
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();

    app.listen(port, () => {
      console.log(`🚀 server goes brrrrr at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
