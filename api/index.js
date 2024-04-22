import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT} 🎉 🚀`);
});
