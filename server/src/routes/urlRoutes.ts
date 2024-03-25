import express from "express";
import { decodeUrl, encodeUrl } from "../controllers/urlController";


const router = express.Router();

router.post("/encode", encodeUrl);
router.get("/decode", decodeUrl);


export default router;