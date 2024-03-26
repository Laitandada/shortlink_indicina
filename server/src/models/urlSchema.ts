import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchemaModel = new mongoose.Schema(
  {
    decodedUrl: {
      type: String,
      required: true,
    },
    encodedUrl: {
      type: String,
      required: true,
      default: () => nanoid().substring(0, 10),
    },
    passwordLock: {
      type: String,
      required: false,
   
    },
    stats: {
      type: Number,
      default: 0,
    },
    expirationDate: {
      type: Number,
   required: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const urlModel = mongoose.model("UrlShortner", urlSchemaModel);