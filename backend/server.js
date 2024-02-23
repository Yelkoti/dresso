import express from "express";
import connectDB from "./configurations/db.js";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRoutes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import shirtRouters from "./routes/shirtRoutes.js";
import pantRouters from "./routes/pantRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use("/users", userRouters);
app.use("/shirt", shirtRouters);
app.use("/pant", pantRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dresso/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../frontend/dresso", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Running");
  });
}

app.listen(port, () => console.log(`server running on port ${port}`));
