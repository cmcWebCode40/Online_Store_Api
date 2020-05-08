const express = require('express');
const cloudinary = require('cloudinary').v2;
const ShoesPost = require('../models/shoes');
const verify = require('./verifyToken');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const router = express();

router.get('/', async (req, res) => {
  try {
    const posts = await ShoesPost.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});
router.post('/shoes-uploads', verify, async (req, res) => {
  try {
    const post = await cloudinary.uploader.upload(req.body.image);
    const data = new ShoesPost({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: post.secure_url,
    });
    const postToSave = await data.save();
    res.json(postToSave);
  } catch (error) {
    res.json({ message: error }).status(400);
  }
});
router.get('/:postID', verify, async (req, res) => {
  try {
    const post = await ShoesPost.findById(req.params.postID);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});
router.delete('/:postID', verify, async (req, res) => {
  try {
    const removePost = await ShoesPost.remove({ _id: req.params.postID });
    res.json(removePost);
  } catch (error) {
    res.json({ message: error });
  }
});
router.patch('/:postID', verify, async (req, res) => {
  try {
    const editPost = await ShoesPost.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title } },
    );
    res.json(editPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
