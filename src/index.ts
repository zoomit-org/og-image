import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

import { port } from "./constans/config";
import ogImageRouter from "./routes/og-image";

app.use(ogImageRouter);

app.listen(port, () => {
  console.log(`🚀 server goes brrrrr at http://localhost:${port}`);
});
