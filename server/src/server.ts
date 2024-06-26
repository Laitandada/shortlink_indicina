import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DbConnection from "./config/mongo";
import  urlShortner from "./routes/urlRoutes";
dotenv.config();

DbConnection()

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/", urlShortner);



app.listen(port, () => {
  console.log(`Server started successfully on port : ${port}`);
});