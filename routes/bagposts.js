const express = require('express');
const BagsPosts = require('../models/Bags');
const verify = require('./verifyToken');


const router = express();

router.get('/', async (req, res) => {
  try {
    const posts = await BagsPosts.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/bags-uploads', verify, async (req, res) => {
  try {
    const data = new BagsPosts({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    });
    const postToSave = await data.save();
    res.json(postToSave);
  } catch (error) {
    res.json({ message: error }).status(400);
  }
});

router.get('/:postID', verify, async (req, res) => {
  try {
    const post = await BagsPosts.findById(req.params.postID);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:postID', verify, async (req, res) => {
  try {
    const removePost = await BagsPosts.remove({ _id: req.params.postID });
    res.json(removePost);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/:postID', verify, async (req, res) => {
  try {
    const editPost = await BagsPosts.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title, description: req.body.description, price: req.body.price } },
    );
    res.json(editPost);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/image/:postID', verify, async (req, res) => {
  try {
    const editPost = await BagsPosts.updateOne(
      { _id: req.params.postID },
      { $set: { image: req.body.image } },
    );
    res.json(editPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
