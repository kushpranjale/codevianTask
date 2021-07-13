const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  file_name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  date: {
      type: Date,
      required: true,
      default: Date.now
  }
});
module.exports = mongoose.model("imageSchema", imageSchema);
