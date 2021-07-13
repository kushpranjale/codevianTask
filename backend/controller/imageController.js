const imageSchema = require("../schema/imageSchema");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  insertImage(req, res, next) {
    const url = req.protocol + "://" + req.get("host");
    imageDetails = {
      file_name: req.file.originalname,
      image_url: url + "/images/" + req.file.filename,
    };
    imageSchema
      .create(imageDetails)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        throw err;
      });
  },
  getAllImage(req, res, next) {
    imageSchema
      .find({})
      .lean()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteImage(req, res, next) {
    imageSchema
      .deleteOne({ _id: ObjectId(req.body.id) })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        throw err;
      });
  },
};
