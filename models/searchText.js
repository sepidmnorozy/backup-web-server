const mongoose = require("mongoose");
const news = require("./news.js");
const searchTextSchema = new mongoose.Schema({
  text: String
});

module.exports = {
  schema: searchTextSchema,
  model: mongoose.model("searchtext", searchTextSchema, "searches")
};
