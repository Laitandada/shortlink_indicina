import express from "express";
import { decodeUrl, encodeUrl, getAllEncodedUrls, getUrlStats, goToEncodedUrlLink } from "../controllers/urlController";


const router = express.Router();

router.post("/encode", encodeUrl);
router.post("/decode", decodeUrl);
router.get("/statistic/:encodedUrl", getUrlStats);
router.get("/allUrls", getAllEncodedUrls);
router.get("/encodedUrl/:encodedUrl", goToEncodedUrlLink);


export default router;