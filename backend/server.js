import express from "express";
import connectDB from "./configurations/db.js";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRoutes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import shirtRouters from "./routes/shirtRoutes.js";
import pantRouters from "./routes/pantRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use("/users", userRouters);
app.use("/shirt", shirtRouters);
app.use("/pant", pantRouters);

app.listen(port, () => console.log(`server running on port ${port}`));
