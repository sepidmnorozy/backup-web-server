const mongoose = require("mongoose");

const similarSchema = new mongoose.Schema({
  text: String,
  similar_texts: [String]
});

module.exports = {
  schema: similarSchema,
  model: mongoose.model("similar", similarSchema, "similars")
};
