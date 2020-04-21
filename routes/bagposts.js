const express = require('express');
const BagsPosts = require('../models/Bags');
const bagsImageController = require('./controllers/bagsImage');
const upload = require('./config/multerConfig');
const cloud = require('./config/cloudinaryConfig');
// const verify = require('./verifyToken');

const router = express();

router.get('/', async (req, res) => {
  try {
    const posts = await BagsPosts.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});
router.post('/', upload.any(), async (req, res) => {
  BagsPosts.find({ imageName: req.body.imageName });
  const post = new BagsPosts({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    bagsImageController,
  });
  try {
    const postToSave = await post.save();
    res.json(postToSave);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get('/:postID', async (req, res) => {
  try {
    const post = await BagsPosts.findById(req.params.postID);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});
router.delete('/:postID', async (req, res) => {
  try {
    const removePost = await BagsPosts.remove({ _id: req.params.postID });
    res.json(removePost);
  } catch (error) {
    res.json({ message: error });
  }
});
router.patch('/:postID', async (req, res) => {
  try {
    const editPost = await BagsPosts.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title } },
    );
    res.json(editPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
