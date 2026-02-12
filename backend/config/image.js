const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    imageUrl: String,
    publicId: String,
});

module.exports = mongoose.model("Image", imageSchema);
