const mongoose = require("mongoose");
const news = require("./news.js");
const searchresultsSchema = new mongoose.Schema({
  search_text: String,
  result: [news.schema],
  type: String
});

module.exports = {
  schema: searchresultsSchema,
  model: mongoose.model("searchresults", searchresultsSchema, "searchresults")
};
