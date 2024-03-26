import express from "express";
import { urlModel } from "../models/urlSchema";
import bcrypt from "bcrypt";
import { addMinutes } from "date-fns";

// logic for encoding url

export const encodeUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { decodedUrl, expirationMinutes, password } = req.body;
    const urlFound = await urlModel.find({ decodedUrl });
    if (urlFound.length > 0) {
      res
        .status(409)
        .send({ message: "URL already encoded", foundUrl: urlFound });
    } else {
      let expirationDate: Date | undefined;
      if (expirationMinutes) {
        expirationDate = addMinutes(new Date(), expirationMinutes);
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
      res
        .status(201)
        .send({ message: "URL encoded successfully", encodedUrl: encodedUrl });
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
    const { encodedUrl, password } = req.body;

    const decodedUrl = await urlModel.findOne({ encodedUrl: encodedUrl });
    if (!decodedUrl) {
      res.status(404).send({ message: "Encoded URL not found" });
      return;
    }
    if (!decodedUrl.passwordLock && password) {
      res.status(404).send({ message: "Encoded URL does not have a password" });
      return;
    }

    // logic to check if the short URL is password locked
    if (decodedUrl.passwordLock) {
      if (!password) {
        res
          .status(400)
          .send({ message: "Password is required for decoding this URL" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        decodedUrl.passwordLock
      );
      if (!passwordMatch) {
        res.status(401).send({ message: "Incorrect password" });
        return;
      }
    }

    const decodedUrlValue = decodedUrl.decodedUrl;
    res.status(200).send({
      message: "URL decoded successfully",
      decodedUrl: decodedUrlValue,
    });
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
    const shortUrlStats = await urlModel.findOne({
      encodedUrl: req.params.encodedUrl,
    });
    if (!shortUrlStats) {
      res.status(404).send({ message: "Url not found!" });
    } else {
      res.status(200).send({
        message: "URL found successfully",
        shortUrlStats: shortUrlStats,
      });
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
      res.status(200).send({
        message: "All EncodedUrls found successfully",
        allEncodedUrls: allEncodedUrls,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

export const goToEncodedUrlLink = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const encodedUrl = await urlModel.findOne({
      encodedUrl: req.params.encodedUrl,
    });
    if (!encodedUrl) {
      res.status(404).send({ message: "Orginal url not found!" });
      return;
    }

    // Check if the URL has expired
    if (encodedUrl.expirationDate && encodedUrl.expirationDate < Date.now()) {
      res.status(400).send({ message: "Url link has expired" });
      return;
    }
    // Increase the collection stats by 1
    encodedUrl.stats++;

    // Update the collection stats
    await encodedUrl.save();

    // Redirect to the decoded URL
    res.redirect(encodedUrl.decodedUrl);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};
