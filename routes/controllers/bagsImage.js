const bagsModel = require('../../models/Bags');
const cloud = require('../config/cloudinaryConfig');

exports.bagsImage = (req, res) => {
  try {
    let imageDetails = { imageName: req.body.image };
    bagsModel.find({ imageName: imageDetails.imageName }, error, callback) => {
      if (error) return res.json({ error, message: 'There was a problem  uploading the image' });
      if (callback.length >= 1) return res.json({ message: 'file already exist' });
      imageDetails = {
        imageName: req.body.imageName,
        cloudImage: req.files[0].path,
      }
      cloud.uploads(imageDetails.cloudImage).then((result) => {
        const imageDetails = {
          imageName: req.body.image,
          cloudImage: result.url,
          imageId: result.id,
        }
      });
      bagsModel.create(imageDetails, (error, created) => {
        if (error) return res.json({ errro, message: 'could not upload image try again' });
        res.json({ created, message: 'image uploaded succesfully' });
      })
    };
  } catch (error) {
    console.log(error);
  }
};
