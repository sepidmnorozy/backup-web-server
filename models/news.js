const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  timestamp: Number,
  url: String,
  title: String,
  date: String,
  text: String,
  summary: String,
  tags: [String],
  article_section: [String],
  preprocessed_text : String, 
  w2v : [Number], 
  tfidf: [Number],
  code: String
});

module.exports = {
  schema: newsSchema,
  model: mongoose.model("news", newsSchema, "articles")
};
