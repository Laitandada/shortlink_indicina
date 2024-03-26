import express from "express";
import { urlModel } from "../models/urlSchema";
import bcrypt from 'bcrypt';
import { addHours } from 'date-fns';
// logic for encodiq url
 // Importing from 'date-fns' library for date manipulation

export const encodeUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { decodedUrl, expirationHours, password } = req.body; 
    const urlFound = await urlModel.find({ decodedUrl });
    if (urlFound.length > 0) {
      res.status(409).send({ message: "URL already encoded", foundUrl: urlFound });
    } else {
      let expirationDate: Date | undefined;
      if (expirationHours) {
        expirationDate = addHours(new Date(), expirationHours); 
      }

      const encodedUrlData: any = { decodedUrl };
      if (expirationDate) {
        encodedUrlData.expirationDate = expirationDate; 
      }
      if (password) {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); 
        encodedUrlData.passwordLock = hashedPassword; 
      }

      const encodedUrl = await urlModel.create(encodedUrlData);
      res.status(201).send({ message: "URL encoded successfully", encodedUrl: encodedUrl });
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
      const { encodedUrl,password } = req.body;
      console.log(encodedUrl);
      const decodedUrl = await urlModel.findOne({ encodedUrl: encodedUrl });
      if (!decodedUrl) {
        res.status(404).send({ message: "Encoded URL not found" });
      } else {
        if (password) {
            
        }
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
  
