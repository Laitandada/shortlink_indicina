import express from "express";
import { urlModel } from "../models/urlSchema";


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
      res.send(urlFound);
    } else {
      const encodedUrl = await urlModel.create({ decodedUrl });
      res.status(201).send({ message: "Url encoded successfully", encodedUrl: encodedUrl });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

export const decodeUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { encodedUrl } = req.body;
    const decodedUrl = await urlModel.findOne({encodedUrl})
    if (decodedUrl) {
      res.status(404).send({ message: "Encoded Url not found" });
    } else {
      res.status(200).send({ message: "Url decoded successfully", decodedUrl: decodedUrl!.decodedUrl });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

