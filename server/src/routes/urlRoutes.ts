import express from "express";
import { decodeUrl, deleteEncodedUrl, encodeUrl, getAllEncodedUrls, getUrlStats, goToEncodedUrlLink } from "../controllers/urlController";


const router = express.Router();

router.post("/encode", encodeUrl);
router.post("/decode", decodeUrl);
router.get("/statistic/:encodedUrl", getUrlStats);
router.get("/allUrls", getAllEncodedUrls);
router.get("/encodedUrl/:encodedUrl", goToEncodedUrlLink);
router.delete("/deleteUrl/:id", deleteEncodedUrl);


export default router;