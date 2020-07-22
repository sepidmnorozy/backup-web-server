const mongoose = require("mongoose");
const cluster = require("./cluster.js");

const tfidfclusterSchema = new mongoose.Schema({
  num: Number,
  avr: [Number],
  list: [[String, Number]],
  numofnews: Number
});

module.exports = {
  schema: tfidfclusterSchema,
  model: mongoose.model("tfidfcluster", tfidfclusterSchema, "tfidfclusters")
};
