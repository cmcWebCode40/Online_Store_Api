const express = require('express');
const ShoesPost = require('../models/shoes');

const router = express();

router.get('/', async (req, res) => {
  try {
    const allPosts = await ShoesPost.find();
    res.json(allPosts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const post = new ShoesPost({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
