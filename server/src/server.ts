import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server started successfully on port : ${port}`);
});