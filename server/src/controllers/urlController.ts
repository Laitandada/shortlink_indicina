import express from "express";
import { urlModel } from "../models/urlSchema";

// logic for encodiq url
export const encodeUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
  //get the url from the resonse
    const { decodedUrl } = req.body;
    const urlFound = await urlModel.find({ decodedUrl });
    if (urlFound.length > 0) {
      res.status(409);
      res.send({ message: "Url already encoded", foundUrl: urlFound });
    } else {
      const encodedUrl = await urlModel.create({ decodedUrl });
      res.status(201).send({ message: "Url encoded successfully", encodedUrl: encodedUrl });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// logic for decoding url
export const decodeUrl = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { encodedUrl } = req.body;
      console.log(encodedUrl);
      const decodedUrl = await urlModel.findOne({ encodedUrl: encodedUrl });
      if (!decodedUrl) {
        res.status(404).send({ message: "Encoded URL not found" });
      } else {
       
        const decodedUrlValue = decodedUrl.decodedUrl;
        res.status(200).send({ message: "URL decoded successfully", decodedUrl: decodedUrlValue });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  };
  
//   logic for getting encoded URL statistics
  export const getUrlStats = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
        const shortUrlStats = await urlModel.findOne({ encodedUrl: req.params.encodedUrl });
        if (!shortUrlStats) {
          res.status(404).send({ message: "Url not found!" });
        } else {
            res.status(200).send({ message: "URL found successfully", shortUrlStats: shortUrlStats });
        }
      } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
      }
  };


  export const getAllEncodedUrls = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const allEncodedUrls = await urlModel.find().sort({ createdAt: -1 });
      if (allEncodedUrls.length < 0) {
        res.status(404).send({ message: "EncodedUrls not found!" });
      } else {
        res.status(200).send({ message: "All EncodedUrls found successfully", allEncodedUrls: allEncodedUrls  });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  };
  
  export const goToEncodedUrlLink = async (req: express.Request, res: express.Response) => {
    try {
      const encodedUrl = await urlModel.findOne({ encodedUrl: req.params.encodedUrl });
      if (!encodedUrl) {
        res.status(404).send({ message: "Orginal url not found!" });
      } else {
     // increase the collection stats by 1
        encodedUrl.stats++;

    // Update the collection stats
        encodedUrl.save();
        // after goting to the encoded url on the website redirect us to the dedcode url
        res.redirect(`${encodedUrl.decodedUrl}`);
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  };
  
