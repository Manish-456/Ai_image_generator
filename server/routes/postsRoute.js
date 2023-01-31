import express from "express";
import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// creating posts;
router.route("/").post(async (req, res) => {
  const { name, prompt, photo } = req.body;
  // upload the image to the cloudinary server and get the image url
  const photoUrl = await cloudinary.uploader.upload(photo);
  const newPost = new Post({
    name,
    prompt,
    photo: photoUrl.url,
  });
  try {
    const savedPost = await newPost.save();
    return res.status(201).json({
      success: true,
      data: savedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
