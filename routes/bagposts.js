const express = require('express');
const BagsPosts = require('../models/Bags');

const router = express();

router.get('/', async (req, res) => {
  try {
    const posts = await BagsPosts.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});
router.post('/', async (req, res) => {
  const post = new BagsPosts({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
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
